import { BoardView } from './board-view.js';
import { DEMO_PGN, parseGame, splitGames, moveNumber, turnText, enginePosition } from './game.js';
import { EngineEvaluation, formatScore } from './engine.js';
import { BoardFullscreen } from './fullscreen.js';

const $ = id => document.getElementById(id);
let board, game, index = 0, playing = false, timer = null, ready = false, uploadedGames = [], loadGeneration = 0;
let evaluator = null, gameSession = 0;
const interval = () => Number($('speed').value) * 1000;

function message(text = '', error = false) { $('message').textContent = text; $('message').classList.toggle('error', error); }
function evaluatePosition() {
  if (game) evaluator?.evaluate({ ...enginePosition(game, index, gameSession), deep: !playing });
}
function stop(analyze = true) {
  playing = false; clearTimeout(timer); timer = null; board?.finishAnimation(); updateTransport();
  if (analyze) evaluatePosition();
}
function updateTransport() {
  $('play-label').textContent = playing ? 'Pause' : 'Play';
  $('play').setAttribute('aria-label', playing ? 'Pause' : 'Play');
  $('play').setAttribute('aria-pressed', String(playing));
  $('play-icon').innerHTML = playing ? '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>' : '<path d="m8 5 11 7-11 7Z"/>';
  $('play').disabled = !ready || !game?.moves.length;
  for (const id of ['start', 'previous']) $(id).disabled = !ready || index === 0;
  for (const id of ['next', 'end']) $(id).disabled = !ready || !game || index === game.moves.length;
  $('progress').disabled = !ready || !game?.moves.length;
}
function schedule(delay = interval()) { clearTimeout(timer); timer = setTimeout(tick, delay); }
function tick() {
  if (!playing) return;
  if (index >= game.moves.length) { stop(); return; }
  go(index + 1, true);
  if (index === game.moves.length) { playing = false; updateTransport(); evaluatePosition(); }
  else schedule();
}
function togglePlay() {
  if (!ready || !game?.moves.length) return;
  if (playing) { stop(); return; }
  if (index === game.moves.length) go(0, false);
  playing = true; updateTransport(); evaluatePosition(); schedule(150);
}

function go(target, animate = true) {
  if (!game) return;
  index = Math.max(0, Math.min(game.moves.length, target));
  const frame = game.frames[index];
  evaluatePosition();
  if (ready) board.showFrame(frame, animate, Math.min(420, interval() * .72));
  $('progress').value = String(index); $('progress-text').textContent = `${index} / ${game.moves.length}`;
  $('turn-label').textContent = turnText(frame);
  const current = frame.move;
  $('current-move').textContent = current ? `${moveNumber(current)}${current.color === 'w' ? '.' : '…'} ${current.san}${index === game.moves.length ? ' · End of game' : ''}` : 'Starting position';
  $('moves').querySelector('.active')?.classList.remove('active');
  $('moves').querySelector('[aria-current]')?.removeAttribute('aria-current');
  const active = $('moves').querySelector(`[data-ply="${index}"]`);
  if (active) {
    active.classList.add('active'); active.setAttribute('aria-current', 'step');
    const list = $('moves');
    // Scroll only the move list, never the page around the board.
    const ar = active.getBoundingClientRect(), lr = list.getBoundingClientRect();
    if (ar.top < lr.top + 8 || ar.bottom > lr.bottom - 8) list.scrollTop += ar.top - lr.top - list.clientHeight / 2 + active.clientHeight / 2;
  } else $('moves').scrollTop = 0;
  updateTransport();
}

function renderMoves() {
  const fragment = document.createDocumentFragment(); let row, rowNumber;
  game.moves.forEach((move, i) => {
    const number = moveNumber(move);
    if (!row || number !== rowNumber) {
      row = document.createElement('div'); row.className = 'move-row'; rowNumber = number;
      const label = document.createElement('span'); label.textContent = `${number}.`; row.append(label);
      row.append(document.createElement('span'), document.createElement('span')); fragment.append(row);
    }
    const button = document.createElement('button'); button.textContent = move.san; button.dataset.ply = i + 1;
    button.setAttribute('aria-label', `${number}. ${move.color === 'w' ? 'White' : 'Black'}: ${move.san}`);
    row.replaceChild(button, row.children[move.color === 'w' ? 1 : 2]);
  });
  $('moves').replaceChildren(fragment);
  if (!game.moves.length) { const p = document.createElement('p'); p.textContent = 'This game contains no moves.'; $('moves').append(p); }
}

function useGame(next, demo = false) {
  stop(false); board?.reset(); game = next; gameSession++;
  const h = game.headers;
  const white = h.White && h.White !== '?' ? h.White : 'White';
  const black = h.Black && h.Black !== '?' ? h.Black : 'Black';
  $('white-name').textContent = white; $('black-name').textContent = black;
  $('game-title').textContent = demo ? 'The Opera Game' : `${white} — ${black}`;
  $('game-meta').textContent = demo ? 'Paul Morphy — the Duke & Count' : (h.Event && h.Event !== '?' ? h.Event : 'Imported game');
  const details = [h.Site, h.Date?.replace(/\.\?\?/g, '')].filter(x => x && x !== '?');
  $('game-event').textContent = (demo ? 'Example · ' : '') + (details.join(' · ') || 'Date not specified');
  $('game-result').textContent = game.result === '*' ? 'Unfinished' : game.result.replaceAll('-', '–');
  $('progress').max = String(game.moves.length); renderMoves(); go(0, false);
}

async function openFile(file) {
  if (!file) return;
  stop(); const generation = ++loadGeneration;
  if (file.size > 5 * 1024 * 1024) { message('The file is too large. Choose a PGN file up to 5 MB.', true); return; }
  message('Reading game…');
  try {
    const raw = await file.text(); if (generation !== loadGeneration) return;
    const chunks = splitGames(raw);
    if (!chunks.length) throw new Error('The file is empty. Choose a PGN file containing a chess game.');
    const first = parseGame(chunks[0]);
    uploadedGames = chunks;
    const options = chunks.map((pgn, i) => {
      const white = pgn.match(/^\[White\s+"([^"\n]*)"\]/m)?.[1] || 'White';
      const black = pgn.match(/^\[Black\s+"([^"\n]*)"\]/m)?.[1] || 'Black';
      return new Option(`${i + 1}. ${white} — ${black}`, String(i));
    });
    $('game-picker').replaceChildren(...options); $('game-picker-label').hidden = chunks.length < 2;
    useGame(first);
    message(`${file.name} · ${chunks.length > 1 ? `${chunks.length} games` : `${first.moves.length} half-moves`}`);
  } catch (error) { message(error.message || 'The file could not be read.', true); }
  finally { $('file-input').value = ''; }
}

for (const id of ['open-file', 'open-file-top']) $(id).addEventListener('click', () => $('file-input').click());
$('file-input').addEventListener('change', e => openFile(e.target.files[0]));
$('game-picker').addEventListener('change', () => {
  try { useGame(parseGame(uploadedGames[Number($('game-picker').value)])); message(); }
  catch (e) { message(e.message, true); }
});
for (const type of ['dragenter', 'dragover']) $('drop-zone').addEventListener(type, e => { e.preventDefault(); $('drop-zone').classList.add('dragging'); });
$('drop-zone').addEventListener('dragleave', e => { if (!$('drop-zone').contains(e.relatedTarget)) $('drop-zone').classList.remove('dragging'); });
$('drop-zone').addEventListener('drop', e => { e.preventDefault(); $('drop-zone').classList.remove('dragging'); openFile(e.dataTransfer.files[0]); });
// Avoid navigating away if a file is dropped just outside the upload area.
window.addEventListener('dragover', e => { if (e.dataTransfer.types.includes('Files')) e.preventDefault(); });
window.addEventListener('drop', e => { if (e.dataTransfer.types.includes('Files')) e.preventDefault(); });
$('demo').addEventListener('click', () => { loadGeneration++; $('game-picker-label').hidden = true; message(); useGame(parseGame(DEMO_PGN), true); });
$('play').addEventListener('click', togglePlay);
for (const [id, target] of [['start', () => 0], ['previous', () => index - 1], ['next', () => index + 1], ['end', () => game.moves.length]]) {
  $(id).addEventListener('click', () => { stop(false); go(target(), id === 'previous' || id === 'next'); });
}
$('progress').addEventListener('input', e => { stop(false); go(Number(e.target.value), false); });
$('speed').addEventListener('input', () => { $('speed-value').textContent = `${Number($('speed').value).toLocaleString('en-US')} s / move`; if (playing) schedule(); });
$('flip').addEventListener('click', () => board?.setView({ flip: true }));
$('view').addEventListener('click', () => { board?.setView({ toggleTop: true }); $('view').textContent = board?.top ? '3D view' : 'Top view'; });
for (const mode of ['2d', '3d']) $('mode-' + mode).addEventListener('click', () => chooseBoardMode(mode));
$('moves').addEventListener('click', e => { const button = e.target.closest('[data-ply]'); if (button) { stop(false); go(Number(button.dataset.ply), false); } });
document.addEventListener('keydown', e => {
  if (!ready || !game || e.ctrlKey || e.metaKey || e.altKey || e.target.closest('input,select,textarea,[contenteditable]')) return;
  if (e.code === 'Space') { if (e.target.closest('button,a')) return; e.preventDefault(); togglePlay(); }
  else if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
    e.preventDefault(); stop(false); go(e.key === 'Home' ? 0 : e.key === 'End' ? game.moves.length : index + (e.key === 'ArrowLeft' ? -1 : 1));
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { stop(); evaluator?.suspend(); }
  else evaluator?.resume();
});
window.addEventListener('pagehide', () => evaluator?.suspend());
window.addEventListener('pageshow', () => { if (!document.hidden) evaluator?.resume(); });

function showEvaluation({ state, score, depth = 0, deep = false }) {
  const output = $('engine-score');
  output.textContent = score ? formatScore(score) : state === 'loading' ? 'Loading…' : state === 'thinking' ? 'Evaluating…' : state === 'error' ? 'Unavailable' : '—';
  output.classList.toggle('engine-pending', !score);
  $('engine-detail').textContent = deep && state === 'thinking' ? `${depth ? 'Depth ' + depth : 'Analyzing…'} · White perspective` : 'White perspective';
  output.title = state === 'error' ? 'The engine could not start. You can still replay the game. Try reloading the page.' : score?.type === 'mate' ? `${score.value > 0 ? 'White' : 'Black'} has mate in ${Math.abs(score.value)} moves.` : 'Evaluation from White’s perspective. Positive favors White; negative favors Black. 1.00 is roughly one pawn. The engine keeps analyzing while paused; the evaluation may change.';
}

async function chooseBoardMode(mode, remember = true) {
  if (!board) return;
  try {
    const selected = await board.selectMode(mode); if (!selected) return;
    ready = true; $('loading').hidden = true;
    $('mode-2d').setAttribute('aria-pressed', String(selected === '2d'));
    $('mode-3d').setAttribute('aria-pressed', String(selected === '3d'));
    $('view').hidden = selected === '2d';
    $('view').textContent = board.top ? '3D view' : 'Top view';
    $('board-hint').hidden = selected === '2d';
    $('viewport').setAttribute('aria-label', selected === '2d' ? 'Flat 2D chessboard' : '3D chessboard. Drag to rotate, scroll to zoom.');
    if (remember) { try { localStorage.setItem('simplechess-board-mode', selected); } catch {} }
    board.showFrame(game.frames[index], false);
    if (!evaluator) {
      evaluator = new EngineEvaluation(showEvaluation);
      if (document.hidden) evaluator.suspend();
      evaluatePosition();
    }
    updateTransport();
  } catch (error) {
    console.error('Unable to load board:', error);
    if (ready) { message('This view could not be loaded. The current view is still available.', true); return; }
    $('loading').replaceChildren();
    const p = document.createElement('p'); p.textContent = 'The board could not be loaded. Try reloading the page.';
    p.style.maxWidth = '36ch'; p.style.textAlign = 'center'; $('loading').append(p); updateTransport();
  }
}

new BoardFullscreen(document.querySelector('.board-section'), $('fullscreen'));
useGame(parseGame(DEMO_PGN), true);
board = new BoardView($('viewport'));
let preferredMode = '3d';
try { if (localStorage.getItem('simplechess-board-mode') === '2d') preferredMode = '2d'; } catch {}
await chooseBoardMode(preferredMode, false);
