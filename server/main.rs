mod config;
mod models;
mod responders;
mod routes;
mod public;

#[rocket::launch]
fn rocket() -> _ {
    let mut rck = rocket::build();
    rck = routes::mount_all(rck);
    rck
}
