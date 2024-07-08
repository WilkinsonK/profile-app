use std::process::Command as Subprocess;

#[cfg(windows)]
const COMMAND_NPM: &str = "npm.cmd";
#[cfg(not(windows))]
const COMMAND_NPM: &str = "npm";

fn npm() -> Subprocess {
    Subprocess::new(COMMAND_NPM)
}

#[cfg(release)]
fn main() {
    npm()
        .arg("run")
        .arg("build")
        .current_dir("client")
        .spawn()
        .expect("Must be able to execute `npm run build`")
        .wait()
        .expect("Must be able to build frontend application");
}

#[cfg(not(release))]
fn main() {}
