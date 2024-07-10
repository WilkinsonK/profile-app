use std::{fmt::{Debug, Display}, path::Path, process::Command as Subprocess};

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

impl<R> From<BuildErr> for BuildResult<R> {
    fn from(val: BuildErr) -> Self {
        Err(val)
    }
}

/// Wrapper around a callable. Allows for a user
/// to apply additional attributes or conditions
/// to the callback.
struct OnRelease<Call, Ret>
where 
    Call: FnOnce() -> BuildResult<Ret>,
{
    callback:  Call,
    predicate: Option<fn() -> bool>
}

impl<Call, Ret> OnRelease<Call, Ret>
where
    Call: FnOnce() -> BuildResult<Ret>,
{
    pub fn new(callback: Call) -> Self {
        Self { callback, predicate: None }
    }

    /// Calls the wrapped function. If a
    /// predictate was declared, first check if
    /// the result is `true` and then executes the
    /// callback.
    pub fn call(self) -> Option<BuildResult<Ret>> {
        match self.predicate {
            Some(p) => {
                p().then(|| (self.callback)()).or_else(|| None)
            }
            None => Some((self.callback)())
        }
    }

    /// Declares a callaback function to use as
    /// validation prior to executing the
    /// callaback.
    pub fn only_if(mut self, p: fn() -> bool) -> Self
    {
        self.predicate.replace(p);
        self
    }
}

impl<Call, Ret> From<Call> for OnRelease<Call, Ret>
where
    Call: FnOnce() -> BuildResult<Ret>,
{
    fn from(value: Call) -> Self {
        Self::new(value)
    }
}

/// Initializes a `Command` as `npm`.
fn npm() -> Subprocess {
    Subprocess::new(COMMAND_NPM)
}

/// Only calls the function if running as a
/// release build.
fn release_only<O, Call, Ret>(once: O) -> BuildResult<Ret>
where
    O:    Into<OnRelease<Call, Ret>>,
    Call: FnOnce() -> BuildResult<Ret>,
    Ret:  Default,
{
    match std::env::var("PROFILE") {
        Ok(value) if value == "release" => once.into().call(),
        _ => None
    }.unwrap_or_else(|| Ok(Ret::default()))
}

fn client_assets_exist() -> bool {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("client").exists()
}

fn main() -> BuildResult<()> {
    release_only(OnRelease::new(|| {
        println!("BUILD: compiling client front-end app");
        npm()
            .arg("run")
            .arg("build")
            .current_dir("client")
            .spawn()?
            .wait()?;
        Ok(())
    }).only_if(client_assets_exist))?;

    release_only(OnRelease::new(|| {
        println!("BUILD: moving built front-end assets to `static`");
        copy_dir::copy_dir("client/build", "static")?;
        Ok(())
    }).only_if(client_assets_exist))?;

    Ok(())
}
