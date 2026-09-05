export function screenSquare(square, flipped = false) {
  const file = square.charCodeAt(0) - 97, rank = Number(square[1]) - 1;
  return { column: flipped ? 7 - file : file, row: flipped ? rank : 7 - rank };
}

const loadImage = source => new Promise((resolve, reject) => {
  const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = source;
});

export class ChessBoard2D {
  constructor(container) {
    this.container = container; this.flipped = false; this.enabled = false;
    this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.canvas = document.createElement('canvas'); this.canvas.className = 'board-2d'; this.canvas.hidden = true;
    this.canvas.setAttribute('role', 'img'); this.canvas.setAttribute('aria-label', 'Chess game on a flat 2D board');
    this.context = this.canvas.getContext('2d');
    if (!this.context) throw new Error('The 2D board could not start.');
    container.prepend(this.canvas);
    this.observer = new ResizeObserver(() => this.resize()); this.observer.observe(container);
    this.pieces = new Map(); this.images = new Map(); this.resize();
  }

  async load() {
    const keys = ['wp', 'wn', 'wb', 'wr', 'wq', 'wk', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'];
    const images = await Promise.all(keys.map(key => loadImage(`./assets/pieces-2d/${key}.png`)));
    keys.forEach((key, i) => this.images.set(key, images[i]));
    this.surface = await loadImage('./assets/board-2d-surface.png');
    this.loaded = true; this.draw();
  }

  resize() {
    const width = this.container.clientWidth, height = this.container.clientHeight;
    if (!width || !height) return;
    this.width = width; this.height = height; this.pixelRatio = Math.min(devicePixelRatio, 2);
    this.canvas.width = Math.round(width * this.pixelRatio); this.canvas.height = Math.round(height * this.pixelRatio);
    this.draw();
  }

  setEnabled(enabled) { this.enabled = enabled; this.canvas.hidden = !enabled; if (enabled) this.resize(); else this.finishAnimation(); }
  setView({ flip = false } = {}) { if (flip) { this.finishAnimation(); this.flipped = !this.flipped; if (this.frame) this.showFrame(this.frame); } }
  finishAnimation() {
    cancelAnimationFrame(this.raf); this.raf = null;
    for (const piece of this.pieces.values()) { piece.column = piece.target.column; piece.row = piece.target.row; }
    this.draw();
  }

  showFrame(frame, animate = false, duration = 420) {
    this.finishAnimation(); this.frame = frame;
    const next = new Map(), moving = [];
    for (const piece of frame.pieces) {
      const target = screenSquare(piece.square, this.flipped), previous = this.pieces.get(piece.id);
      const item = { ...piece, ...target, target };
      if (animate && !this.reducedMotion && previous && (previous.column !== target.column || previous.row !== target.row)) {
        item.column = previous.column; item.row = previous.row;
        moving.push({ item, from: { column: previous.column, row: previous.row } });
      }
      next.set(piece.id, item);
    }
    this.pieces = next; this.draw();
    if (!moving.length) return;
    const start = performance.now();
    const step = time => {
      const t = Math.min(1, (time - start) / duration), ease = t * t * (3 - 2 * t);
      for (const { item, from } of moving) {
        item.column = from.column + (item.target.column - from.column) * ease;
        item.row = from.row + (item.target.row - from.row) * ease;
      }
      this.draw(); if (t < 1 && this.enabled) this.raf = requestAnimationFrame(step); else this.raf = null;
    };
    this.raf = requestAnimationFrame(step);
  }

  draw() {
    if (!this.enabled || !this.loaded || !this.width || !this.height) return;
    const ctx = this.context, size = Math.min(this.width - 12, this.height - 12);
    if (size <= 0) return;
    const left = (this.width - size) / 2, top = (this.height - size) / 2;
    // The surface is an exact 10.1-unit orthographic render of the original
    // Blender board; its 8.8-unit playing field determines every overlay.
    const border = size * ((10.1 - 8.8) / 2 / 10.1), gridSize = size * (8.8 / 10.1), cell = gridSize / 8;
    const x = left + border, y = top + border;
    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.save();
    ctx.shadowColor = '#0009'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
    ctx.drawImage(this.surface, left, top, size, size);
    ctx.shadowColor = 'transparent';
    if (this.frame?.move) for (const [i, square] of [this.frame.move.from, this.frame.move.to].entries()) {
      const pos = screenSquare(square, this.flipped);
      ctx.fillStyle = i ? '#f4c75b55' : '#f4c75b33'; ctx.fillRect(x + pos.column * cell, y + pos.row * cell, cell, cell);
      if (i) { ctx.strokeStyle = '#dcb45de0'; ctx.lineWidth = 2; ctx.strokeRect(x + pos.column * cell + 1, y + pos.row * cell + 1, cell - 2, cell - 2); }
    }
    ctx.fillStyle = '#e3c895'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `500 ${Math.max(11, Math.min(16, size * .022))}px Arial, sans-serif`;
    for (let i = 0; i < 8; i++) {
      const file = String.fromCharCode(65 + (this.flipped ? 7 - i : i));
      const rank = String(this.flipped ? i + 1 : 8 - i);
      ctx.fillText(file, x + (i + .5) * cell, top + border * .48);
      ctx.fillText(file, x + (i + .5) * cell, y + gridSize + border * .52);
      ctx.fillText(rank, left + border * .48, y + (i + .5) * cell);
      ctx.fillText(rank, x + gridSize + border * .52, y + (i + .5) * cell);
    }
    // Moving pieces paint last so they pass visibly over intermediate squares.
    const pieces = [...this.pieces.values()].sort((a, b) => Number(a.column !== a.target.column || a.row !== a.target.row) - Number(b.column !== b.target.column || b.row !== b.target.row));
    for (const piece of pieces) {
      ctx.drawImage(this.images.get(piece.color + piece.type), x + piece.column * cell, y + piece.row * cell, cell, cell);
    }
    ctx.restore();
  }

  reset() { this.finishAnimation(); this.pieces.clear(); this.frame = null; this.draw(); }
}
