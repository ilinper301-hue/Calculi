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
/** Número → texto en español: coma decimal y punto de millares desde 10.000 (fmt(1234.5) → «1234,5»; fmt(25000) → «25.000»). */
function fmt(n) {
  if (typeof n !== 'number' || !isFinite(n)) return String(n);
  const neg = n < 0, [e, d] = Math.abs(+n.toFixed(4)).toString().split('.');
  const ent = e.length > 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : e;
  return (neg ? '−' : '') + ent + (d ? ',' + d : '');
}
/** Texto del teclado → número («0,75» → 0.75). */
const num = t => parseFloat(String(t).replace(/\./g, '').replace(',', '.'));
const decimales = n => { const s = String(+(+n).toFixed(4)); return s.includes('.') ? s.split('.')[1].length : 0; };
const igual = (a, b) => Math.abs(Number(a) - Number(b)) < 1e-9;

/**
 * Opciones de respuesta: la correcta + distractores cercanos y plausibles (sin repetir, nunca negativos).
 * extra: errores típicos que conoce la estrategia (p. ej. contar uno de más, ×10 en vez de ×100).
 * Enteros: ±1, ±2, ±3 y ±10 si hay decenas. Decimales: ± una unidad del último decimal, ×10 y :10.
 */
function opciones(r, n = 3, extra = [], max = Infinity) {
  const d = decimales(r), red = x => +x.toFixed(d), set = new Set([r]);
  const tope = d ? max : Math.min(max, r < 10 ? 10 : r < 20 ? 20 : Infinity);
  const ok = c => Number.isFinite(c) && c >= 0 && c <= tope && !set.has(c) && (d || Number.isInteger(c));
  for (const e of shuffle(extra)) if (set.size < n && ok(e)) set.add(e);
  let cerca;
  if (d) { const u = Math.pow(10, -d); cerca = shuffle([red(r - u), red(r + u), red(r * 10), red(r / 10), red(r + 1), red(r - 1)].map(x => +x.toFixed(4))); }
  else { const g = r >= 1000 ? 100 : r >= 200 ? 10 : 1; cerca = shuffle([r - g, r + g, r - 2 * g, r + 2 * g]).concat(shuffle([r - 3 * g, r + 3 * g]), r >= 10 ? shuffle([r - 10 * g, r + 10 * g]) : []); }
  for (const c of cerca) if (set.size < n && ok(c)) set.add(c);
  for (let k = 4; set.size < n && k < 60; k++) for (const c of [r + k, r - k]) if (set.size < n && c >= 0 && !set.has(c)) set.add(d ? red(c) : c);
  return shuffle([...set]);
}

/* ===== Voz (como Lectori: voz del navegador en español) ===== */
const VOZ = {
  ok: 'speechSynthesis' in window, v: null,
  elegir() { if (!this.ok) return; const vs = speechSynthesis.getVoices(); this.v = vs.find(v => /^es[-_]ES/i.test(v.lang)) || vs.find(v => /^es/i.test(v.lang)) || null; },
  decir(t) {
    if (!this.ok || !t || !EST.ajustes.voz) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(String(t).replace(/[–−]/g, ' menos ').replace(/\+/g, ' más ').replace(/×/g, ' por ').replace(/(\d)\s*[:÷]\s*(\d)/g, '$1 entre $2').replace(/%/g, ' por ciento').replace(/²/g, ' al cuadrado').replace(/=/g, ' es igual a ').replace(/\?/g, ' cuánto ')); u.lang = 'es-ES'; if (this.v) u.voice = this.v; u.rate = .92; speechSynthesis.speak(u); } catch (e) {}
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
