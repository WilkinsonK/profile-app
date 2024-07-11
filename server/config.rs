use rocket::fs::relative;

#[allow(dead_code)]
pub const APPLICATION_NAME: &str = concat!(
    env!("CARGO_PKG_NAME"),
    "/v",
    env!("CARGO_PKG_VERSION"));
pub const APPLICATION_STATIC: &str = relative!("static");
pub const APPLICATION_DATA:   &str = relative!("data");
