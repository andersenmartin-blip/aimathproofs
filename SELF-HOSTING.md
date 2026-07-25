# AI Math Proofs — Ubuntu server setup

This package runs the site locally in Docker and checks GitHub for updates
every 15 minutes. It rebuilds the container only when the `main` branch has
changed.

## 1. Put the package on GitHub

Open:

https://github.com/andersenmartin-blip/aimathproofs

Choose **Add file → Upload files**, then drag the contents of this extracted
package into the upload area and commit them to `main`.

Do not upload the ZIP file itself. Upload the extracted files and folders.

## 2. Install the website on Ubuntu

Log in to the Ubuntu server and run:

```bash
sudo apt-get update
sudo apt-get install -y git
sudo git clone \
  https://github.com/andersenmartin-blip/aimathproofs.git \
  /opt/aimathproofs
sudo bash /opt/aimathproofs/deploy/install-ubuntu.sh
```

The installer follows Docker's official Ubuntu repository method, builds the
site, starts it on `127.0.0.1:3000`, and enables automatic updates.

Check that it is running:

```bash
curl -I http://127.0.0.1:3000
sudo docker compose -f /opt/aimathproofs/compose.yaml ps
```

## 3. Connect aimathproofs.dk in Cloudflare

In the Cloudflare dashboard:

1. Open **Networking → Tunnels**.
2. Select the tunnel running on this Ubuntu server.
3. Choose **Routes → Add route → Published application**.
4. Set the hostname to `aimathproofs.dk`.
5. Set the service URL to `http://localhost:3000`.
6. Save the route.

Optionally add another published application route for
`www.aimathproofs.dk`, pointing to the same service.

Cloudflare handles the public HTTPS connection. Port 3000 remains bound to
localhost and is not exposed directly to the internet.

## Maintenance

View the website logs:

```bash
sudo docker logs --tail 100 aimathproofs
```

Run an immediate update check:

```bash
sudo systemctl start aimathproofs-update.service
```

Check the update timer:

```bash
systemctl list-timers aimathproofs-update.timer
```

Restart the website:

```bash
cd /opt/aimathproofs
sudo docker compose restart
```
