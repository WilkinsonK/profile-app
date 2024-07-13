use std::path::{Path, PathBuf};

use rocket::{Build, Rocket};
use rocket::fs::NamedFile;
use rocket::response::Redirect;
use rocket::serde::json::{serde_json, Json};

use crate::config::{get_version, APPLICATION_ASSETS};
use crate::models::ContactItem;
use crate::responders::DownloadFile;
use crate::public::static_read;

pub fn mount(rck: Rocket<Build>) -> Rocket<Build> {
    rck.mount("/", rocket::routes![
        index,
        contact,
        download,
        files,
        version,
    ])
}

#[rocket::get("/")]
async fn index() -> Redirect {
    // Default behavior should be to send the
    // user directly to our home page.
    Redirect::permanent(rocket::uri!("/home"))
}

#[rocket::get("/info/contact")]
async fn contact() -> Json<Vec<ContactItem>> {
    let path = Path::new(APPLICATION_ASSETS).join("contact.json");
    let data = std::fs::read_to_string(path).expect("contact.json must exist");
    Json(serde_json::from_str(&data).expect("parse ContactItem from meta"))
}

#[rocket::get("/download/<file..>")]
async fn download(file: PathBuf) -> DownloadFile {
    DownloadFile::open_rel(Path::new(APPLICATION_ASSETS), &file)
}

#[rocket::get("/version")]
async fn version() -> String {
    get_version()
}

#[rocket::get("/<file..>", rank = 99)]
async fn files(file: PathBuf) -> Option<NamedFile> {
    static_read(file).await
}
