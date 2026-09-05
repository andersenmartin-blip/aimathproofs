# SimpleChess

The English chess viewer is available at `/simplechess` and linked from the site navigation. It runs entirely in the browser and keeps imported PGN games on the visitor's device. No API keys, server analysis process or separate service are needed.

The complete standalone app lives in `public/simplechess/`. `next.config.ts` rewrites `/simplechess` to its HTML entry point; its base URL keeps all modules, board assets and the Stockfish worker under `/simplechess/`. `/simplechess/index.html` also works directly. The existing Docker deployment copies these assets with the rest of the site.

Features include matching 2D/3D boards, PGN collections, automatic playback, adjustable move intervals, pause, timeline navigation, board flipping, fullscreen (F; Escape to exit) and Stockfish evaluation from White's perspective. Paused positions receive continuous analysis; playback uses a short search per position. Analysis suspends when the tab is hidden.

## Asset provenance and licenses

The chess set, board textures and 2D sprites were created for Martin Andersen's Skakatelier/SimpleChess project. The English port retains the original board artwork and playback implementation.

Third-party libraries are vendored with their licenses:

- Three.js 0.185.1: MIT, `public/simplechess/vendor/LICENSE`.
- chess.js 1.4.0: BSD-2-Clause, `public/simplechess/vendor/chess-LICENSE`.
- Stockfish.js 18.0.8 / Stockfish 18 Lite: GPLv3, `public/simplechess/vendor/stockfish/Copying.txt`.

The unchanged Stockfish JavaScript/WASM and complete corresponding source archive, including its NNUE network and build instructions, are provided together. The app's engine information page links to both the license and source download. The source archive is not fetched during normal playback.

The small `stockfish-worker.js` bootstrap corrects the WASM response MIME type inside the worker. This supports static hosts that send `.wasm` as `application/octet-stream`, including the existing Vinext production server, while leaving the upstream engine files unchanged.

## Deployment

The existing `aimathproofs-update.timer` checks GitHub `main` every 15 minutes (plus its randomized delay) and rebuilds the Docker site when the commit changes. To request an immediate check on the server:

```bash
sudo systemctl start aimathproofs-update.service
```

Cloudflare Tunnel must be connected for the public domain to be reachable. An HTTP 530 / Cloudflare 1033 response indicates a tunnel problem outside the chess app; publishing a source update cannot restart the tunnel.
