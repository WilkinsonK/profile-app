use rocket::fs::relative;

pub const APPLICATION_ASSETS: &str = relative!("assets");
pub const APPLICATION_STATIC: &str = relative!("static");

/// Gets the personal access token from the
/// environment.
pub fn github_access_token() -> String {
    std::env::var("VLB_GITHUB_ACCESS_TOKEN").unwrap_or_default()
}

/// Gets the GitHub username.
pub fn github_user() -> String {
    std::env::var("VLB_GITHUB_USER").unwrap_or_default()
}

/// Get the version string from pre-build
/// generated file.
pub fn get_version() -> String {
    let data = include_bytes!(
        concat!(env!("CARGO_MANIFEST_DIR"),
        "/",
        "static",
        "/",
        "VERSION.txt"
    ));
    String::from_utf8_lossy(data).to_string()
}

/// Get the assigned hostname of the running
/// application.
///
/// This is not the traditional hostname given
/// to a host machine but instead a name
/// designated by an environment variable,
/// `VLB_HOSTNAME`.
pub fn get_hostname() -> String {
    match std::env::var("VLB_HOSTNAME") {
        Ok(hostname) if hostname != "" => hostname,
        _                              => String::from("devel-shadow")
    }
}
