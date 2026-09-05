// Some static servers send WASM as application/octet-stream. Supply the correct
// MIME type to streaming compilation without changing the vendored engine.
const wasmURL = decodeURIComponent(self.location.hash.slice(1));
const originalFetch = self.fetch.bind(self);
self.fetch = async (input, options) => {
  const response = await originalFetch(input, options);
  const requestedURL = input instanceof Request ? input.url : String(input);
  if (!response.ok || new URL(requestedURL, self.location.href).href !== wasmURL) return response;
  const headers = new Headers(response.headers);
  headers.set('Content-Type', 'application/wasm');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
importScripts('./vendor/stockfish/stockfish-18-lite-single.js');
