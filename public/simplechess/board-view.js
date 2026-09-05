import { ChessBoard } from './board.js';
import { ChessBoard2D } from './board-2d.js';

// Rendering mode is independent of game position, engine state and playback.
export class BoardView {
  constructor(container) {
    this.container = container; this.renderers = new Map(); this.promises = new Map();
    this.active = null; this.mode = null; this.frame = null; this.flipped = false; this.selection = 0;
  }
  get top() { return this.renderers.get('3d')?.top || false; }

  prepare(mode) {
    if (this.promises.has(mode)) return this.promises.get(mode);
    const promise = (async () => {
      const renderer = mode === '2d' ? new ChessBoard2D(this.container) : new ChessBoard(this.container);
      this.renderers.set(mode, renderer); renderer.setEnabled(false); await renderer.load(); return renderer;
    })();
    this.promises.set(mode, promise); return promise;
  }

  async selectMode(mode) {
    if (!['2d', '3d'].includes(mode)) return null;
    const selection = ++this.selection;
    let renderer;
    try { renderer = await this.prepare(mode); }
    catch (error) {
      if (selection !== this.selection) return null;
      if (mode !== '3d') throw error;
      renderer = await this.prepare('2d'); mode = '2d';
    }
    if (selection !== this.selection) return null;
    this.active?.finishAnimation();
    for (const other of this.renderers.values()) other.setEnabled(false);
    this.active = renderer; this.mode = mode;
    if (renderer.flipped !== this.flipped) renderer.setView({ flip: true });
    renderer.setEnabled(true);
    if (this.frame) renderer.showFrame(this.frame, false);
    return mode;
  }

  showFrame(frame, animate = false, duration = 420) { this.frame = frame; this.active?.showFrame(frame, animate, duration); }
  finishAnimation() { this.active?.finishAnimation(); }
  setView(options) { if (options.flip) this.flipped = !this.flipped; this.active?.setView(options); }
  reset() { this.frame = null; for (const renderer of this.renderers.values()) renderer.reset(); }
}
