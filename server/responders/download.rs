//! Custom responders where `Rocket` provided responders are not
//! viable options.
use std::fmt::Display;
use std::fs::File;
use std::io::Cursor;
use std::path::{Path, PathBuf};
use std::pin::Pin;

use rocket::{Request, Response};
use rocket::http::{ContentType, Header, Status};
use rocket::response::Responder;
use rocket::tokio::{fs::File as AsyncFile, io::AsyncRead};

enum ContentDisposition {
    #[allow(dead_code)]
    Inline,
    Attachment(Option<String>)
}

impl Display for ContentDisposition {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let repr = match self {
            Self::Inline => {
                String::from("inline")
            },
            Self::Attachment(None) => {
                String::from("attachment;")
            },
            Self::Attachment(Some(n)) => {
                format!(r#"attachment; filename*="{n}"; filename="{n}""#)
            }
        };
        write!(f, "{}", repr)
    }
}

impl<'h> From<ContentDisposition> for Header<'h> {
    fn from(val: ContentDisposition) -> Self {
        Self::new("Content-Disposition", val.to_string())
    }
}

/// Represents the states related to when a client
/// requests a file for download. Either the file
/// is found and we can proceed to send it as a
/// stream to the user, or it isn't found and we
/// send a complaint to the client. There is an
/// additional case, but not likely, where
/// something internal goes wrong also.
#[derive(Clone, Debug)]
enum DownloadFileStatus {
    Error(String),
    Found,
    NotFound,
}

impl From<DownloadFileStatus> for Status {
    fn from(val: DownloadFileStatus) -> Self {
        match val {
            DownloadFileStatus::Error(_) => Self::InternalServerError,
            DownloadFileStatus::Found    => Self::Ok,
            DownloadFileStatus::NotFound => Self::NotFound,
        }
    }
}

/// Wrapper around the file being streamed to the
/// client requesting it for download.
struct DownloadFileReader(AsyncFile);

impl DownloadFileReader {
    fn new<F: Into<AsyncFile>>(f: F) -> Self {
        Self(f.into())
    }
}

impl AsyncRead for DownloadFileReader {
    fn poll_read(
            mut self: std::pin::Pin<&mut Self>,
            cx: &mut std::task::Context<'_>,
            buf: &mut rocket::tokio::io::ReadBuf<'_>,
        ) -> std::task::Poll<std::io::Result<()>>
    {
        Pin::new(&mut self.0).poll_read(cx, buf)
    }
}

/// Sends a file to the client as a download
/// stream.
#[derive(Debug)]
pub struct DownloadFile {
    name:   PathBuf,
    file:   Option<File>,
    status: DownloadFileStatus
}

impl DownloadFile {
    /// Creates a new instance of `DownloadFile`
    /// responder by attempting to open a file
    /// `name` relative to the `rel` path.
    /// 
    /// The full file path is obfuscated like this
    /// so as to ensure, when an error occurs,
    /// that `NotFound` messages only produce
    /// relavent information for the end-user and
    /// does not expose what they don't need to
    /// know.
    pub fn open_rel<P>(rel: P, name: P) -> Self
    where
        P: AsRef<Path> + Clone,
    {
        let pb = rel.as_ref().join(&name).to_path_buf();
        match File::open(&pb) {
            Ok(file) => Self {
                name:   name.as_ref().to_path_buf(),
                file:   Some(file),
                status: DownloadFileStatus::Found,
            },
            Err(_) if !pb.exists() => Self {
                name:   name.as_ref().to_path_buf(),
                file:   None,
                status: DownloadFileStatus::NotFound,
            },
            Err(m) => Self {
                name:   name.as_ref().to_path_buf(),
                file:   None,
                status: DownloadFileStatus::Error(m.to_string())
            }
        }
    }

    fn content_type(&self) -> ContentType {
        self
            .name
            .extension()
            .and_then(|ext| ext.to_str())
            .and_then(ContentType::from_extension)
            .or_else(|| Some(ContentType::Plain))
            .unwrap()
    }

    fn disposition(&self) -> ContentDisposition {
        ContentDisposition::Attachment(self.filename())
    }

    fn filename(&self) -> Option<String> {
        self
            .name
            .file_name()
            .and_then(|s| s.to_str())
            .map(|s| s.to_owned())
    }

    fn status(&self) -> Status {
        self.status.clone().into()
    }

    fn stream(self) -> DownloadFileReader {
        DownloadFileReader::new(self.file.unwrap())
    }
}

impl<'r> Responder<'r, 'static> for DownloadFile {
    fn respond_to(self, _: &'r Request<'_>) -> rocket::response::Result<'static> {
        let mut res = Response::build();
        res.status(self.status());

        match self.status {
            DownloadFileStatus::Found => {
                res
                    .header(self.disposition())
                    .header(self.content_type())
                    .streamed_body(self.stream());
            },
            DownloadFileStatus::Error(m) => {
                res.sized_body(m.len(), Cursor::new(m));
            },
            DownloadFileStatus::NotFound => {
                let m = format!("{:?} not found", self.name);
                res.sized_body(m.len(), Cursor::new(m));
            }
        }
        res.ok()
    }
}
