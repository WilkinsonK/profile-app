//! Custom responders where `Rocket` provided responders are not
//! viable options.
use std::fs::File;
use std::io::Cursor;
use std::path::{Path, PathBuf};

use rocket::{Request, Response};
use rocket::http::Status;
use rocket::response::Responder;

/// Sends a file to the client as a download
/// stream.
#[derive(Clone, Debug)]
pub enum DownloadFile{
    Error(String),
    Found(PathBuf),
    NotFound(PathBuf),
}

impl DownloadFile {
    /// Creates a new instance of `DownloadFile`
    /// responder by opening the `file`.
    pub fn open<F: AsRef<Path>>(file: F) -> Self {
        let pb = file.as_ref().into();
        match File::open(file) {
            Ok(f) => Self::Found(pb),
            Err(_) if !pb.exists() => Self::NotFound(pb),
            Err(m) => Self::Error(m.to_string())
        }
    }
}

impl Into<Status> for DownloadFile {
    fn into(self) -> Status {
        match self {
            Self::Error(_)    => Status::InternalServerError,
            Self::Found(_)    => Status::Ok,
            Self::NotFound(_) => Status::NotFound,
        }
    }
}

impl<'r> Responder<'r, 'static> for DownloadFile {
    fn respond_to(self, request: &'r Request<'_>) -> rocket::response::Result<'static> {
        let mut res = Response::build();
        res.status(self.clone().into());

        let body = match self {
            Self::Error(s) => {
                Cursor::new(s)
            },
            Self::NotFound(path) => {
                let pathc = path.to_owned();
                let fln = pathc
                    .file_name()
                    .unwrap();
                Cursor::new(fln.to_str().unwrap().to_owned())
            },
            Self::Found(_) => {
                todo!()
            }
        };
        res.sized_body(body.get_ref().len(), body);
        res.ok()
    }
}
