fn static_assets() -> String {
    let mut dir = std::env::current_dir().unwrap();
    dir.push("client");
    dir.push("build");
    dir.to_str().unwrap().to_owned()
}

#[rocket::get("/api")]
async fn index() -> &'static str {
    "Hello, World"
}

#[rocket::launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", rocket::fs::FileServer::from(&static_assets()))
        .mount("/api", rocket::routes![index])
}
