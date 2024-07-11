use std::path::Path;

use rocket::fs::NamedFile;

use crate::config::APPLICATION_STATIC;

/// Reads for the static file at the **relative**
/// path. If the file is not found, then returns
/// `%STATIC%/index.html` instead to assume the
/// client is requesting from the front-end.
pub async fn static_read<F: AsRef<Path>>(file: F) -> Option<NamedFile> {
    let static_files = Path::new(APPLICATION_STATIC);
    let tf = static_files.join(file);
    NamedFile::open(if tf.exists() {
        tf
    } else { static_files.join("index.html") }).await.ok()
}
