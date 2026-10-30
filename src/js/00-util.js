'use strict';
/* ===== Utilidades comunes ===== */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/** Entero aleatorio entre a y b (ambos incluidos). */
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const hoy = () => new Date().toISOString().slice(0, 10);
const nid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/**
 * Opciones de respuesta: la correcta + distractores cercanos y plausibles (sin repetir, >= 0).
 * extra: distractores típicos que la estrategia sabe que aparecen (p. ej. contar uno de más).
 */
function opciones(r, n = 3, extra = [], max = 100) {
  const set = new Set([r]);
  for (const e of shuffle(extra)) if (set.size < n && Number.isInteger(e) && e >= 0 && e <= max) set.add(e);
  const cerca = shuffle([r - 1, r + 1, r - 2, r + 2, r + 10, r - 10, r - 3, r + 3]);
  for (const c of cerca) if (set.size < n && c >= 0 && c <= max) set.add(c);
  let k = 4; while (set.size < n) { const c = r + k++; if (c <= max) set.add(c); else set.add(Math.max(0, r - k)); }
  return shuffle([...set]);
}

/* ===== Voz (como Lectori: voz del navegador en español) ===== */
const VOZ = {
  ok: 'speechSynthesis' in window, v: null,
  elegir() { if (!this.ok) return; const vs = speechSynthesis.getVoices(); this.v = vs.find(v => /^es[-_]ES/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; },
  decir(t) {
    if (!this.ok || !t || !EST.ajustes.voz) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(t).replace(/[–−]/g, ' menos ').replace(/\+/g, ' más ').replace(/=/g, ' es igual a ').replace(/\?/g, ' cuánto ')); u.lang = 'es-ES'; if (this.v) u.voice = this.v; u.rate = .92; speechSynthesis.speak(u); } catch (e) {}
  },
  callar() { try { this.ok && speechSynthesis.cancel(); } catch (e) {} }
};
if (VOZ.ok) { VOZ.elegir(); speechSynthesis.onvoiceschanged = () => VOZ.elegir(); }

/* ===== Sonidos cortos (sin archivos) ===== */
const SON = {
  ctx: null,
  tono(f, d = .12, t = 'sine', vol = .12, delay = 0) {
    if (!EST.ajustes.sonido) return;
    try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + delay;
      o.type = t; o.frequency.value = f; g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + d); o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + d); } catch (e) {}
  },
  bien() { this.tono(660, .1); this.tono(880, .16, 'sine', .12, .09); },
  mal() { this.tono(220, .18, 'triangle', .1); },
  fin() { [523, 659, 784, 1046].forEach((f, i) => this.tono(f, .18, 'sine', .11, i * .11)); }
};
