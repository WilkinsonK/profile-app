use std::{fmt::{Debug, Display}, process::Command as Subprocess};

/// NodeJS `npm` command name.
#[cfg(windows)]
const COMMAND_NPM: &str = "npm.cmd";
/// NodeJS `npm` command name.
#[cfg(not(windows))]
const COMMAND_NPM: &str = "npm";

/// `Result` alias for our build scripts to allow
/// for custom error handles.
type BuildResult<R> = Result<R, BuildErr>;

/// Custom error handle for when `BuildResult`
/// goes awry.
#[allow(dead_code)]
#[derive(Debug)]
struct BuildErr(String);

impl Display for BuildErr {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "BuildErr({})", self.0)
    }
}

impl std::error::Error for BuildErr {}

impl From<&str> for BuildErr {
    fn from(value: &str) -> Self {
        Self(value.to_owned())
    }
}

impl From<std::io::Error> for BuildErr {
    fn from(value: std::io::Error) -> Self {
        Self(value.to_string())
    }
}

impl<R> Into<BuildResult<R>> for BuildErr {
    fn into(self) -> BuildResult<R> {
        Err(self)
    }
}

/// Initializes a `Command` as `npm`.
fn npm() -> Subprocess {
    Subprocess::new(COMMAND_NPM)
}

/// Only calls the function if running as a
/// release build.
fn release_only<F, R>(once: F) -> BuildResult<R>
where
    F: FnOnce() -> BuildResult<R>,
    R: Default
{
    match std::env::var("PROFILE") {
        Ok(value) if value == "release" => once(),
        _ => Ok(R::default())
    }
}

fn main() -> BuildResult<()> {
    release_only(|| {
        println!("BUILD: compiling client front-end app");
        npm()
            .arg("run")
            .arg("build")
            .current_dir("client")
            .spawn()?
            .wait()?;
        Ok(())
    })?;

    Ok(())
}
