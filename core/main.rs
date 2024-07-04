use std::sync::Arc;
use std::process::Command as Subprocess;
use std::thread;

use clap::{arg, command, ArgAction, ArgMatches, Command};

#[cfg(target_os = "linux")]
const CLIENT_SOURCE: &str = concat!(env!("PWD"), "/", "client");
#[cfg(target_os = "windows")]
const CLIENT_SOURCE: &str = concat!("client");

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
        .expect("`release` is required to determine how to run application services")
        .to_owned());

    let use_release = as_release.clone();
    let server = thread::spawn(move || {
        let mut cmd = &mut Subprocess::new("cargo");

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
        std::env::set_current_dir(CLIENT_SOURCE)
            .expect("client source directory must be available");

        if *use_release {
            // Compiles a build of our client
            // application to be used by the
            // server.
            Subprocess::new("npm")
                .arg("run")
                .arg("build")
                .spawn()
                .expect("Must be able to build client app")
        } else {
            // Runs a development instance of the
            // client-side application.
            Subprocess::new("npm")
                .arg("run")
                .arg("start")
                .spawn()
                .expect("Must be able to start client app")
        }
        .wait()
        .expect("Must wait for client to terminate");
    });

    client.join().expect("Must run client successfully");
    server.join().expect("Must run server successfully");
}

fn cli_start_init() -> Command {
    Command::new("start")
        .about("Start Profile-App")
        .arg(arg!(--release).action(ArgAction::SetTrue))
}

fn main() {
    match cli().get_matches().subcommand() {
        Some(("start", start)) => cli_start_call(start),
        _ => unreachable!("unexpected sub-command")
    }
}
