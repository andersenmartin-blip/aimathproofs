// Native fullscreen where available; a viewport-sized fallback for other browsers.
export class BoardFullscreen {
  constructor(section, button, { idleTime = 2800 } = {}) {
    this.section = section; this.button = button; this.idleTime = idleTime;
    this.active = false; this.fallback = false; this.busy = false;
    this.held = false; this.hoveringControls = false;
    section.tabIndex = -1;
    button.setAttribute('aria-keyshortcuts', 'F');
    button.addEventListener('click', () => this.toggle());
    document.addEventListener('fullscreenchange', () => {
      if (!this.fallback) this.setActive(document.fullscreenElement === section);
    });
    document.addEventListener('keydown', event => {
      if (this.active) this.reveal();
      if (event.key === 'Escape' && this.fallback) { event.preventDefault(); this.leaveFallback(); return; }
      if (event.key === 'Tab' && this.active) this.keepFocusInside(event);
      if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,select,textarea,[contenteditable]')) return;
      if (event.key.toLowerCase() === 'f') { event.preventDefault(); this.toggle(); }
    });
    section.addEventListener('pointermove', event => {
      this.hoveringControls = event.pointerType === 'mouse' && !!event.target.closest('.board-header,.board-bottom');
      this.reveal();
    });
    section.addEventListener('pointerdown', () => { this.held = true; this.reveal(); });
    for (const type of ['pointerup', 'pointercancel']) document.addEventListener(type, () => { this.held = false; this.reveal(); });
    section.addEventListener('pointerleave', () => { this.hoveringControls = false; this.reveal(); });
    section.addEventListener('focusin', () => this.reveal());
    section.addEventListener('focusout', () => this.reveal());
    document.addEventListener('visibilitychange', () => { if (!document.hidden) this.reveal(); });
  }

  async toggle() {
    if (this.busy) return;
    this.busy = true;
    try {
      if (this.fallback) this.leaveFallback();
      else if (document.fullscreenElement === this.section) await document.exitFullscreen();
      else {
        try {
          if (!this.section.requestFullscreen) throw new Error('Fullscreen unavailable');
          await this.section.requestFullscreen();
          this.setActive(document.fullscreenElement === this.section);
        } catch {
          this.fallback = true; this.setActive(true);
        }
      }
    } catch {
      // A rejected exit leaves the native fullscreen state intact.
      this.reveal();
    } finally { this.busy = false; }
  }

  leaveFallback() { this.fallback = false; this.setActive(false); }

  setActive(active) {
    if (this.active === active) return;
    this.active = active;
    this.section.classList.toggle('is-fullscreen', active);
    document.body.classList.toggle('board-fullscreen', active);
    this.button.setAttribute('aria-pressed', String(active));
    this.button.setAttribute('aria-label', active ? 'Exit fullscreen' : 'Fullscreen');
    this.button.title = active ? 'Exit fullscreen (Esc or F)' : 'Fullscreen (F)';
    this.button.querySelector('path').setAttribute('d', active
      ? 'M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5'
      : 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5');
    if (active) {
      this.outside = [...document.querySelectorAll('.masthead,.sidebar')].map(element => [element, element.inert]);
      for (const [element] of this.outside) element.inert = true;
      // Keep Space available for playback instead of activating the fullscreen button.
      this.section.focus({ preventScroll: true });
      this.reveal();
    } else {
      clearTimeout(this.idleTimer);
      this.section.classList.remove('controls-hidden');
      for (const [element, inert] of this.outside ?? []) element.inert = inert;
      this.button.focus({ preventScroll: true });
    }
  }

  reveal() {
    if (!this.active) return;
    clearTimeout(this.idleTimer);
    this.section.classList.remove('controls-hidden');
    this.idleTimer = setTimeout(() => {
      const focused = document.activeElement;
      if (this.held || this.hoveringControls || (focused !== this.section && this.section.contains(focused) && focused.matches(':focus-visible'))) return;
      this.section.classList.add('controls-hidden');
    }, this.idleTime);
  }

  keepFocusInside(event) {
    const controls = [...this.section.querySelectorAll('button,a[href],input,select,[tabindex="0"]')]
      .filter(element => !element.disabled && element.getClientRects().length);
    const first = controls[0], last = controls.at(-1);
    if (!first) return;
    if (event.shiftKey && (document.activeElement === first || !this.section.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !this.section.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  }
}
