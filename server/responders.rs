//! Custom responders where `Rocket` provided responders are not
//! viable options.
use std::fs::File;
use std::io::Cursor;
use std::path::{Path, PathBuf};

use rocket::response::stream::ReaderStream;
use rocket::{Request, Response};
use rocket::http::Status;
use rocket::response::Responder;

#[derive(Clone, Copy, Debug)]
pub enum DownloadFileStatus {
    Error,
    Found,
    NotFound,
}

impl Into<Status> for DownloadFileStatus {
    fn into(self) -> Status {
        match self {
            Self::Error    => Status::InternalServerError,
            Self::Found    => Status::Ok,
            Self::NotFound => Status::NotFound,
        }
    }
}

/// Sends a file to the client as a download
/// stream.
#[derive(Debug)]
pub struct DownloadFile(PathBuf, Option<File>, DownloadFileStatus);

impl DownloadFile {
    /// Creates a new instance of `DownloadFile`
    /// responder by opening the `file`.
    pub fn open<P>(file: P) -> Self
    where
        P: AsRef<Path> + Clone,
    {
        let pb = file.as_ref().to_path_buf();
        match File::open(&file) {
            Ok(file) => Self(pb, Some(file), DownloadFileStatus::Found),
            Err(_) if !pb.exists() => Self(pb, None, DownloadFileStatus::NotFound),
            Err(_) => Self(pb, None, DownloadFileStatus::Error)
        }
    }

    pub fn disposition(&self) -> String {
        match self.filename() {
            Some(n) => format!("attachment;filename={n}"),
            None    => String::from("attachment;")
        }
    }

    pub fn filename(&self) -> Option<String> {
        self.0
            .file_name()
            .and_then(|s| s.to_str())
            .and_then(|s| Some(s.to_owned()))
    }

    pub fn is_found(&self) -> bool {
        matches!(self.2, DownloadFileStatus::Found)
    }

    pub fn status(&self) -> Status {
        self.2.into()
    }
}

impl<'r> Responder<'r, 'static> for DownloadFile {
    fn respond_to(self, request: &'r Request<'_>) -> rocket::response::Result<'static> {
        let mut res = Response::build();
        res
            .status(self.status())
            .raw_header("Content-Disposition", self.disposition());

        if self.is_found() {
            todo!()
        }
        res.ok()
    }
}
