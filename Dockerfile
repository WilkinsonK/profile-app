# Builds the client application as static assets
# usable by our backend in production.
FROM node AS client_builder
COPY ./client/ /client/
WORKDIR /client
RUN npm run build


# Builds the server application as a barebones
# executable.
FROM rust:alpine AS server_builder
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
FROM alpine AS final
# Get ONLY the compiled static assets from the
# client building stage.
COPY --from=client_builder /client/build /server/static/
# Get ONLY the compiled binary and the VERSION.txt
# file.
COPY --from=server_builder /server/target/release/server /server/
COPY --from=server_builder /server/static/VERSION.txt /server/static/
COPY ./assets /server/assets
COPY ./Rocket.toml /server/
# Install necessary assets in order to run
# executable.
RUN apk update && apk add openssl ca-certificates

ENV GITHUB_ACCESS_TOKEN=""
ENV GITHUB_USER=""

WORKDIR /server
EXPOSE 8000
CMD [ "/server/server" ]
