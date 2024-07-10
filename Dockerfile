# Builds the client application as static assets
# usable by our backend in production.
FROM node AS ClientBuilder
COPY ./client/ /client/
WORKDIR /client
RUN npm run build

# Builds the server application as a barebones
# executable.
FROM rust:alpine AS ServerBuilder
# Collect necessary assets.
COPY ./server/ /server/server
COPY ./Cargo.toml ./Cargo.lock ./build.rs /server/
# Install required library files.
# This includes OpenSSL and basic build tools.
RUN apk update && apk add pkgconfig openssl-dev libc-dev
WORKDIR /server
RUN cargo build --release

# Copies all assets from prior stages, as well as
# other necessary assets to run the application.
FROM alpine AS Final
# Get ONLY the compiled binary.
COPY --from=ServerBuilder /server/target/release/server /server/
# Get ONLY the compiled static assets from the
# client building stage.
COPY --from=ClientBuilder /client/build /server/static/
COPY ./Rocket.toml /server/
# Install necessary assets in order to run
# executable.
RUN apk update && apk add openssl ca-certificates

# This docker image requires a path mount be
# provided to the data files.
# i.e. `--mount type=bind,source="$(pwd)"/data,target=server/data`.
WORKDIR /server
EXPOSE 8000
CMD [ "/server/server" ]
