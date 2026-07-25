#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/aimathproofs"
BRANCH="main"

cd "$APP_DIR"

git fetch --quiet origin "$BRANCH"

current_commit="$(git rev-parse HEAD)"
remote_commit="$(git rev-parse "origin/$BRANCH")"

if [[ "$current_commit" == "$remote_commit" ]]; then
  exit 0
fi

git pull --ff-only origin "$BRANCH"
docker compose up -d --build --remove-orphans
