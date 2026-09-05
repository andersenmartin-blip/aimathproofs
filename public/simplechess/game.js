import { Chess } from './vendor/chess.js';

export const DEMO_PGN = `[Event "The Opera Game"]
[Site "Paris"]
[Date "1858.??.??"]
[White "Paul Morphy"]
[Black "The Duke & Count"]
[Result "1-0"]

1. e4 e5 2. Nf3 d6 3. d4 Bg4 4. dxe5 Bxf3 5. Qxf3 dxe5
6. Bc4 Nf6 7. Qb3 Qe7 8. Nc3 c6 9. Bg5 b5 10. Nxb5 cxb5
11. Bxb5+ Nbd7 12. O-O-O Rd8 13. Rxd7 Rxd7 14. Rd1 Qe6
15. Bxd7+ Nxd7 16. Qb8+ Nxb8 17. Rd8# 1-0`;

export function splitGames(text) {
  const lines = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const chunks = []; let current = []; let hasMoves = false; let commentDepth = 0;
  for (const line of lines) {
    const isHeader = commentDepth === 0 && /^\s*\[\w+\s+"/.test(line);
    if (isHeader && hasMoves) { chunks.push(current.join('\n')); current = []; hasMoves = false; }
    current.push(line);
    if (!isHeader) {
      let visible = '';
      for (const char of line) {
        if (char === ';' && commentDepth === 0) break;
        if (char === '{') { commentDepth++; continue; }
        if (char === '}') { commentDepth = Math.max(0, commentDepth - 1); continue; }
        if (commentDepth === 0) visible += char;
      }
      if (visible.trim() && !visible.trim().startsWith('%')) hasMoves = true;
    }
  }
  if (current.join('\n').trim()) chunks.push(current.join('\n'));
  return chunks.filter(x => x.trim());
}

export function parseGame(pgn) {
  if (!pgn.trim()) throw new Error('The file is empty. Choose a PGN file containing a chess game.');
  const chess = new Chess();
  try { chess.loadPgn(pgn); }
  catch (error) { throw new Error('The game could not be read. Check that the file contains a valid PGN game. ' + String(error.message).slice(0, 140)); }
  const moves = chess.history({ verbose: true });
  if (moves.length > 10000) throw new Error('The game is too long for this viewer.');
  const initial = new Chess(moves[0]?.before || chess.fen());
  let pieces = initial.board().flat().filter(Boolean).map(p => ({ id: `${p.color}-${p.square}`, color: p.color, type: p.type, square: p.square }));
  const frames = [{ pieces: pieces.map(p => ({ ...p })), fen: initial.fen(), move: null }];
  for (const move of moves) {
    pieces = pieces.map(p => ({ ...p }));
    const moving = pieces.find(p => p.square === move.from);
    if (!moving) throw new Error('The game position could not be reconstructed.');
    const capturedSquare = move.flags.includes('e') ? move.to[0] + move.from[1] : move.to;
    pieces = pieces.filter(p => p.square !== capturedSquare);
    moving.square = move.to;
    if (move.promotion) moving.type = move.promotion;
    if (move.flags.includes('k') || move.flags.includes('q')) {
      const kingSide = move.flags.includes('k');
      const rook = pieces.find(p => p.square === (kingSide ? 'h' : 'a') + move.from[1]);
      if (!rook) throw new Error('The castling move could not be reconstructed.');
      rook.square = (kingSide ? 'f' : 'd') + move.from[1];
    }
    frames.push({ pieces: pieces.map(p => ({ ...p })), fen: move.after, move });
  }
  return { headers: chess.getHeaders(), moves, frames, result: chess.getHeaders().Result || '*', pgn };
}

export function moveNumber(move) { return Number(move.before.split(' ')[5]); }
export function enginePosition(game, index, gameId) {
  const fen = game.frames[index].fen;
  const chess = new Chess(fen);
  const moves = game.moves.slice(0, index).map(m => m.from + m.to + (m.promotion || '')).join(' ');
  const command = `position fen ${game.frames[0].fen}${moves ? ' moves ' + moves : ''}`;
  let terminal = null;
  if (chess.isCheckmate()) terminal = { type: 'terminal', value: chess.turn() === 'w' ? -1 : 1 };
  else if (chess.isDraw()) terminal = { type: 'cp', value: 0 };
  return { fen, command, gameId, terminal };
}
export function turnText(frame) {
  const chess = new Chess(frame.fen);
  if (chess.isCheckmate()) return 'Checkmate';
  if (chess.isStalemate()) return 'Stalemate';
  const side = chess.turn() === 'w' ? 'White' : 'Black';
  return `${side} to move${chess.isCheck() ? ' · check' : ''}`;
}
