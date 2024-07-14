#!/bin/sh

set -eu

# Build the docker image and orchestrate
# containers via compose.
docker build -t wilkinsonk/vlb-profile-app .
docker compose up
