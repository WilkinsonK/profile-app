use std::process::Command as Subprocess;

#[cfg(windows)]
const COMMAND_NPM: &'static str = "npm.cmd";
#[cfg(not(windows))]
const COMMAND_NPM: &'static str = "npm";

fn npm() -> Subprocess {
    Subprocess::new(COMMAND_NPM)
}

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
