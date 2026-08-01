#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/aimathproofs"
BRANCH="main"
STATE_DIR="/var/lib/aimathproofs"
DEPLOYED_COMMIT_FILE="$STATE_DIR/deployed-commit"

cd "$APP_DIR"

git fetch --quiet origin "$BRANCH"

current_commit="$(git rev-parse HEAD)"
remote_commit="$(git rev-parse "origin/$BRANCH")"

if [[ "$current_commit" != "$remote_commit" ]]; then
  git pull --ff-only origin "$BRANCH"
fi

deployed_commit=""
if [[ -f "$DEPLOYED_COMMIT_FILE" ]]; then
  deployed_commit="$(<"$DEPLOYED_COMMIT_FILE")"
fi

if [[ "$deployed_commit" == "$remote_commit" ]]; then
  exit 0
fi

# Record the commit only after Docker has built and started it successfully.
# If this command fails, the next timer run will retry the same deployment.
docker compose up -d --build --remove-orphans

install -d -m 0755 "$STATE_DIR"
printf '%s\n' "$remote_commit" > "$DEPLOYED_COMMIT_FILE.tmp"
mv "$DEPLOYED_COMMIT_FILE.tmp" "$DEPLOYED_COMMIT_FILE"
