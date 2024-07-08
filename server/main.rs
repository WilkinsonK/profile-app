mod models;

use std::path::{Path, PathBuf};

use rocket::serde::{de::DeserializeOwned, json::Json};

use models::{ContactItem, FAQItem};

const APPLICATION_NAME: &str = concat!(
    env!("CARGO_PKG_NAME"),
    "-API/v",
    env!("CARGO_PKG_VERSION"));

fn data_path() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("data")
}

fn data_get_items<T: DeserializeOwned, P: AsRef<Path>>(subpath: P) -> T {
    let dat = std::fs::read_to_string(data_path().join(subpath));
    let par = serde_json::from_str;
    par(&dat.expect("data collected")).expect("data parsed")
}

fn data_get_contact_items() -> Vec<ContactItem> {
    data_get_items("contact.json")
}

fn data_get_faq_items() -> Vec<FAQItem> {
    data_get_items("faq.json")
}

#[rocket::get("/")]
async fn index() -> &'static str {
    APPLICATION_NAME
}

#[rocket::get("/")]
async fn contact_getall() -> Json<Vec<ContactItem>> {
    Json(data_get_contact_items())
}

#[rocket::get("/")]
async fn faq_getall() -> Json<Vec<FAQItem>> {
    Json(data_get_faq_items())
}

#[rocket::get("/<index>")]
async fn faq_getone(index: usize) -> Json<Vec<FAQItem>> {
    let data = data_get_faq_items()
        .iter()
        .enumerate()
        .filter(|(idx, _)| *idx == index)
        .map(|(_, item)| item.to_owned())
        .collect::<Vec<_>>();
    Json(data)
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", rocket::routes![index])
        .mount("/contact", rocket::routes![contact_getall])
        .mount("/faq", rocket::routes![faq_getall, faq_getone])
}
