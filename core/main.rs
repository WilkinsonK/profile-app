use std::sync::Arc;
use std::process::Command as Subprocess;
use std::thread;

use clap::{arg, command, ArgAction, ArgMatches, Command};

const CARGO: &'static str = "cargo";
#[cfg(windows)]
const NPM: &'static str = "npm.cmd";
#[cfg(not(windows))]
const NPM: &'static str = "npm";

fn subprocess_cargo() -> Subprocess {
    Subprocess::new(CARGO)
}

fn subprocess_npm() -> Subprocess {
    Subprocess::new(NPM)
}

fn cli() -> Command {
    command!()
        .about("Manage Profile-App")
        .arg_required_else_help(true)
        .subcommand_required(true)
        .propagate_version(true)
        .subcommand(cli_start_init())
}

fn cli_start_call(matches: &ArgMatches) {
    let as_release = Arc::new(matches
        .get_one::<bool>("release")
        .expect(
        r#"
            `release` is required to determine how
            to run application services
        "#)
        .to_owned());

    let use_release = as_release.clone();
    let server = thread::spawn(move || {
        let mut cmd = &mut subprocess_cargo();

        if *use_release {
            cmd = cmd.arg("--release")
        };

        cmd = cmd
            .arg("run")
            .arg("--bin")
            .arg("server");

        cmd
            .spawn()
            .expect("Must be able to start server binary")
            .wait()
            .expect("Must wait for server to terminate");
    });

    let use_release = as_release.clone();
    let client = thread::spawn(move || {
        let mut cmd = &mut subprocess_npm();

        if *use_release {
            // Compiles a build of our client
            // application to be used by the
            // server.
            cmd = cmd
                .arg("run")
                .arg("build")
        } else {
            // Runs a development instance of the
            // client-side application.
            cmd = cmd
                .arg("run")
                .arg("start")
        }

        let curr_dir = std::env::current_dir().unwrap();
        std::env::set_current_dir("client").unwrap();

        cmd
            .spawn()
            .expect("Must be able to init client app")
            .wait()
            .expect("Must wait for client to terminate");

        std::env::set_current_dir(curr_dir).unwrap();
    });

    client.join().expect("Must run client successfully");
    server.join().expect("Must run server successfully");
}

fn cli_start_init() -> Command {
    Command::new("start")
        .about("Start Profile-App")
        .arg(arg!(--release "Build as a release").action(ArgAction::SetTrue))
}

fn main() {
    match cli().get_matches().subcommand() {
        Some(("start", start)) => cli_start_call(start),
        _ => unreachable!("unexpected sub-command")
    }
}
