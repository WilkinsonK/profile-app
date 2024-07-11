use std::{fmt::{Debug, Display}, path::{Path, PathBuf}, process::Command as Subprocess};

/// - * ------------------------------------- * -
/// - * - Command Aliases                   - * -
/// - * ------------------------------------- * -

/// NodeJS `npm` command name.
#[cfg(windows)]
const COMMAND_NPM: &str = "npm.cmd";
/// NodeJS `npm` command name.
#[cfg(not(windows))]
const COMMAND_NPM: &str = "npm";

/// Initializes a `Command` as `npm`.
fn npm() -> Subprocess {
    Subprocess::new(COMMAND_NPM)
}

/// - * ------------------------------------- * -
/// - * - Result Alias Implementations      - * -
/// - * ------------------------------------- * -

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

/// - * ------------------------------------- * -
/// - * - DoCall Types & Interface          - * -
/// - * ------------------------------------- * -

/// Type has, or is, a callable which returns
/// a `BuildResult`.
trait DoCall {
    type Output;
    /// Execute the callback returning its result.
    fn do_call(&self) -> Option<BuildResult<Self::Output>>;
    /// Determines whether `do_call` should be
    /// called.
    #[inline(never)]
    fn should_call(&self) -> bool { true }
}

/// `DoCall` type which allows the callable to
/// only be executed if the build profile is
/// `release`.
struct OnRelease<Call, Ret>
where 
    Call: Fn() -> BuildResult<Ret>,
{
    callback:  Call,
    predicate: Option<fn() -> bool>
}

impl<Call, Ret> OnRelease<Call, Ret>
where
    Call: Fn() -> BuildResult<Ret>,
{
    pub fn new(callback: Call) -> Self {
        Self { callback, predicate: None }
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

impl<Call, Ret> DoCall for OnRelease<Call, Ret>
where
    Call: Fn() -> BuildResult<Ret>,
{
    type Output = Ret;

    fn should_call(&self) -> bool {
        match std::env::var("PROFILE") {
            Ok(profile) if profile == "release" => true,
            _ => false
        }
    }

    fn do_call(&self) -> Option<BuildResult<Self::Output>> {
        match self.predicate {
            Some(p) => {
                p().then(|| (self.callback)()).or_else(|| None)
            }
            None => Some((self.callback)())
        }
    }
}

impl<Call, Ret> From<Call> for OnRelease<Call, Ret>
where
    Call: Fn() -> BuildResult<Ret>,
{
    fn from(value: Call) -> Self {
        Self::new(value)
    }
}

/// Execute the caller if it should be called.
fn do_call<Ret>(doer: &dyn DoCall<Output = Ret>) -> BuildResult<Ret>
where
    Ret: Default,
{
    if doer.should_call() {
        doer.do_call()
    } else {
        None
    }.unwrap_or_else(|| Ok(Ret::default()))
}

/// - * ------------------------------------- * -
/// - * - Main & Other Driver Code          - * -
/// - * ------------------------------------- * -

/// Returns the path to the assets for building
/// the front-end application.
fn client_assets() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("client")
}

/// Determines if `client` subdirectory exists in
/// the project assets.
fn client_assets_exist() -> bool {
    client_assets().exists()
}

/// Returns the path to the data assets related
/// to this application.
fn data_assets() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("data")
}

/// Returns the destination path for where the
/// build front-end application will be moved to.
fn static_assets() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("static")
}

/// Determines if `static` subdirectory exists in
/// the project assets.
fn static_assets_exists() -> bool {
    static_assets().exists()
}

fn main() -> BuildResult<()> {
    do_call(&OnRelease::new(|| {
        println!("BUILD: compiling client front-end app");
        npm()
            .arg("run")
            .arg("build")
            .current_dir("client")
            .spawn()?
            .wait()?;
        Ok(())
    }).only_if(client_assets_exist))?;

    do_call(&OnRelease::new(|| {
        println!("BUILD: moving built front-end assets to `static`");
        if static_assets_exists() {
            std::fs::remove_dir_all(static_assets())?;
        }
        copy_dir::copy_dir(client_assets().join("build"), "static")?;
        Ok(())
    }).only_if(client_assets_exist))?;

    std::fs::write(
        data_assets().join("VERSION.txt"),
        format!("{}/v{}-{}",
            env!("CARGO_PKG_NAME"),
            env!("CARGO_PKG_VERSION"),
            std::env::var("PROFILE").unwrap_or("unknown".into()))
    )?;

    Ok(())
}
