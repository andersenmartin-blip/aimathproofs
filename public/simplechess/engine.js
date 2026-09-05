// Stockfish runs in a dedicated worker. Search results belong to one request;
// stop/bestmove is the boundary before another position may be searched.
export function parseScore(line, sideToMove) {
  if (!line.startsWith('info ') || /\b(?:lowerbound|upperbound)\b/.test(line)) return null;
  const match = line.match(/\bscore (cp|mate) (-?\d+)\b/);
  if (!match || /\bmultipv (?!1\b)\d+/.test(line)) return null;
  const value = Number(match[2]) * (sideToMove === 'w' ? 1 : -1);
  return { type: match[1], value: Object.is(value, -0) ? 0 : value };
}

export function formatScore(score) {
  if (!score) return '—';
  if (score.type === 'terminal') return score.value > 0 ? 'White wins by checkmate' : 'Black wins by checkmate';
  const sign = score.value > 0 ? '+' : score.value < 0 ? '−' : '';
  if (score.type === 'mate') return `${sign}M${Math.abs(score.value)}`;
  return sign + (Math.abs(score.value) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export class EngineEvaluation {
  constructor(onUpdate, { workerFactory, thinkTime = 600 } = {}) {
    this.onUpdate = onUpdate; this.thinkTime = thinkTime;
    this.workerFactory = workerFactory || (() => {
      const script = new URL('./stockfish-worker.js', import.meta.url);
      script.hash = encodeURIComponent(new URL('./vendor/stockfish/stockfish-18-lite-single.wasm', import.meta.url).href);
      return new Worker(script);
    });
    this.serial = 0; this.ready = false; this.active = null; this.wanted = null; this.suspended = false; this.failed = false;
  }

  start() {
    if (this.worker || this.failed || this.suspended) return;
    try {
      this.worker = this.workerFactory();
      this.worker.onmessage = event => {
        if (typeof event.data === 'string') for (const line of event.data.split(/\r?\n/)) this.receive(line.trim());
      };
      this.worker.onerror = () => this.fail(); this.worker.onmessageerror = () => this.fail();
      this.startupTimer = setTimeout(() => this.fail(), 45000);
      this.send('uci');
    } catch { this.fail(); }
  }

  send(command) { this.worker?.postMessage(command); }

  evaluate({ fen, command, gameId, terminal = null, deep = false }, force = false) {
    const samePosition = this.wanted?.command === command && this.wanted?.gameId === gameId;
    if (!force && samePosition && this.wanted.deep === deep) return;
    const previous = samePosition ? this.wanted : null;
    this.wanted = { id: ++this.serial, fen, command, gameId, terminal, deep,
      score: previous?.score ?? null, depth: previous?.depth ?? 0 };
    clearTimeout(this.debounce);
    this.stopSearch();
    if (terminal) { this.onUpdate({ state: 'done', score: terminal }); return; }
    if (this.failed) { this.onUpdate({ state: 'error' }); return; }
    if (this.suspended) return;
    this.publish(this.ready ? 'thinking' : 'loading');
    this.start(); this.queue();
  }

  publish(state) {
    const { score, depth, deep } = this.wanted;
    this.onUpdate({ state, score, depth, deep });
  }

  stopSearch() {
    if (!this.active || this.active.stopping) return;
    this.active.stopping = true;
    clearTimeout(this.searchTimer);
    // Infinite analysis has no time limit, but stopping must still be responsive.
    this.stopTimer = setTimeout(() => this.fail(), 7000);
    this.send('stop');
  }

  queue() {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => this.search(), 55);
  }

  search() {
    if (!this.ready || this.active || !this.wanted || this.wanted.terminal || this.suspended || this.failed) return;
    this.active = { ...this.wanted, stopping: false };
    if (this.lastGameId !== this.active.gameId) { this.send('ucinewgame'); this.lastGameId = this.active.gameId; }
    this.send(this.active.command);
    if (!this.active.deep) this.searchTimer = setTimeout(() => this.fail(), this.thinkTime + 7000);
    this.send(this.active.deep ? 'go infinite' : `go movetime ${this.thinkTime}`);
  }

  receive(line) {
    if (this.failed || this.suspended && !this.worker) return;
    if (line === 'uciok') {
      this.send('setoption name Hash value 16');
      this.send('setoption name MultiPV value 1');
      this.send('setoption name UCI_AnalyseMode value true');
      this.send('isready'); return;
    }
    if (line === 'readyok') {
      clearTimeout(this.startupTimer); this.ready = true; this.queue(); return;
    }
    if (!this.active) return;
    const current = this.active.id === this.wanted?.id && !this.suspended && !this.active.stopping;
    if (line.startsWith('bestmove')) {
      clearTimeout(this.searchTimer); clearTimeout(this.stopTimer);
      if (current) this.publish('done');
      const wasReplaced = this.active.id !== this.wanted?.id;
      this.active = null;
      if (wasReplaced) this.queue();
      return;
    }
    if (current) {
      const score = parseScore(line, this.active.fen.split(' ')[1]);
      const depth = Number(line.match(/\bdepth (\d+)/)?.[1] ?? 0);
      // Keep the deeper score while restarting the same position with a new budget.
      if (score && depth >= this.wanted.depth) {
        this.wanted.score = score; this.wanted.depth = depth;
        this.publish('thinking');
      }
    }
  }

  suspend() {
    this.suspended = true; clearTimeout(this.debounce);
    this.stopSearch();
  }

  resume() {
    if (!this.suspended) return;
    this.suspended = false;
    if (this.wanted) this.evaluate(this.wanted, true);
  }

  fail() {
    clearTimeout(this.startupTimer); clearTimeout(this.searchTimer); clearTimeout(this.stopTimer); clearTimeout(this.debounce);
    this.worker?.terminate(); this.worker = null; this.active = null; this.ready = false; this.failed = true;
    if (!this.wanted?.terminal) this.onUpdate({ state: 'error' });
  }

  dispose() {
    clearTimeout(this.startupTimer); clearTimeout(this.searchTimer); clearTimeout(this.stopTimer); clearTimeout(this.debounce);
    this.worker?.terminate(); this.worker = null; this.active = null; this.wanted = null;
  }
}
