#[cfg(target_os = "linux")]
const STATIC_ASSETS: &str = concat!(env!("PWD"), "/", "client/build");
#[cfg(target_os = "windows")]
const STATIC_ASSETS: &str = concat!("client/build");

#[rocket::get("/")]
async fn index() -> Option<rocket::fs::NamedFile> {
    rocket::fs::NamedFile::open([STATIC_ASSETS, "/", "index.html"].concat()).await.ok()
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/public", rocket::fs::FileServer::from(STATIC_ASSETS))
        .mount("/", rocket::routes![index])
}
