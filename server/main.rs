mod models;
mod responders;

use std::path::{Path, PathBuf};

use rocket::fs::{relative, NamedFile};
use rocket::response::Redirect;

use responders::DownloadFile;

const APPLICATION_NAME: &str = concat!(
    env!("CARGO_PKG_NAME"),
    "/v",
    env!("CARGO_PKG_VERSION"));
const APPLICATION_STATIC: &str = relative!("client/build");

/// Reads for the static file at the **relative**
/// path. If the file is not found, then returns
/// `%STATIC%/index.html` instead to assume the
/// client is requesting from the front-end.
async fn static_read<F: AsRef<Path>>(file: F) -> Option<NamedFile> {
    let static_files = Path::new(APPLICATION_STATIC);
    let tf = static_files.join(file);
    NamedFile::open(if tf.exists() {
        tf
    } else { static_files.join("index.html") }).await.ok()
}

#[rocket::get("/")]
async fn index() -> Redirect {
    // Default behavior should be to send the
    // user directly to our home page.
    Redirect::permanent(rocket::uri!("/home"))
}

#[rocket::get("/download/<file..>")]
async fn download(file: PathBuf) -> DownloadFile {
    todo!()
}

#[rocket::get("/version")]
async fn version() -> &'static str {
    APPLICATION_NAME
}

#[rocket::get("/<file..>", rank = 99)]
async fn files(file: PathBuf) -> Option<NamedFile> {
    static_read(file).await
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build().mount("/", rocket::routes![index, files, version])
}
