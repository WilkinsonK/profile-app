use rocket::fs::relative;

#[allow(dead_code)]
pub const APPLICATION_NAME: &str = concat!(
    env!("CARGO_PKG_NAME"),
    "/v",
    env!("CARGO_PKG_VERSION"));
pub const APPLICATION_STATIC: &str = relative!("static");
pub const APPLICATION_DATA:   &str = relative!("data");

/// Gets the personal access token from the
/// environment.
pub fn github_access_token() -> String {
    std::env::var("GITHUB_ACCESS_TOKEN").unwrap_or_default()
}

/// Gets the GitHub username.
pub fn github_user() -> String {
    std::env::var("GITHUB_USER").unwrap_or_default()
}
