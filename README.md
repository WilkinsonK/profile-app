# Every Last Byte #
## A Profile Web Application ##

This application is a web server intended for the purpose of acting
as a "living resume" as it were. Proof of compentency.

## The Tech Stack ##
This project in particular was built using `Rocket-rs`, a web
framework for the `Rust` programming language, as the back-end REST
API and a `React` application as the front-end; leveraging Bootstrap
for styling and layouts.

### Top 2 Bottom ###
The front-end, when running in production, is precompiled and readily
served by our backend. This is to cut down (hopefully) the amount of
complication that can occur during deployment. In addition to this,
other measures have been taken to hopefully mitigate complexity even
further.

For example, when building the backend in `release` mode, `cargo`
should build the front-end application automatically and make it
available to our API accordingly. This is assuming you're running
directly on your OS, of course. We do take a separate route when
building as a docker image.

### Crates & Containers ###
This project contains a `Dockerfile` file. This allows us to create an
image of the built, release, instance that can be distributed across
multiple containers (hooray).

#### Building the Container ####
To build the container you need to ensure that you mount to the `assets`
directory, but otherwise it should be as simple as:

```bash
$ docker build -t wilkinsonk/vlb-profile-app .
$ docker run -it --name monsterous-fart -p 8000:8000 profile-app -e GITHUB_ACCESS_TOKEN=<person_access_token> -e GITHUB_USER=<username>
```

#### Container Composition ####
The alternative is to allow the preconfigured compose file, using
`docker compose` to orchestrate containter runtime instead. This comes
with a few additional features like accepting a `.env` file with all
environment variables preset and auto mounts the `assets` directory as
mentioned.

```bash
$ docker compose up
```

It is important to know that the initial container must be built. In
spite of efforts to lessen the production costs of build-time... it
still takes awhile. Especially where compose will try to build the
image for every single instance **VLB** listed in the compose file.

## Remaining Tasks ##
- [x] setup docker and docker compose.
- [x] expose my top pinned projects on GitHub.
- [ ] expose commits to main for this project.
- [ ] enable Prometheus metrics for API calls.
- [ ] restrict access with token authentication.
