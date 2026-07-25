#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/aimathproofs"

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this installer with sudo."
  exit 1
fi

if [[ ! -d "$APP_DIR/.git" ]]; then
  echo "The repository must be cloned to $APP_DIR first."
  exit 1
fi

apt-get update
apt-get install -y ca-certificates curl git

if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc

  . /etc/os-release
  architecture="$(dpkg --print-architecture)"
  codename="${UBUNTU_CODENAME:-$VERSION_CODENAME}"

  echo \
    "deb [arch=$architecture signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $codename stable" \
    > /etc/apt/sources.list.d/docker.list

  apt-get update
  apt-get install -y \
    docker-ce \
    docker-ce-cli \
    containerd.io \
    docker-buildx-plugin \
    docker-compose-plugin
fi

systemctl enable --now docker

cd "$APP_DIR"
docker compose up -d --build

install -m 0755 deploy/auto-update.sh /opt/aimathproofs/deploy/auto-update.sh
install -m 0644 \
  deploy/aimathproofs-update.service \
  /etc/systemd/system/aimathproofs-update.service
install -m 0644 \
  deploy/aimathproofs-update.timer \
  /etc/systemd/system/aimathproofs-update.timer

systemctl daemon-reload
systemctl enable --now aimathproofs-update.timer

echo
echo "AI Math Proofs is running on http://127.0.0.1:3000"
echo "Point the Cloudflare Tunnel route for aimathproofs.dk to that address."
