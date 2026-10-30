/* 3.º · Truco 11 · Restar compensando (73 − 28 = 73 − 30 + 2) */
const _rec11 = (a, b0, r) => { const v = [a, a - b0, r]; return { desde: Math.max(0, Math.floor((Math.min(...v) - 1) / 10) * 10), hasta: Math.ceil(Math.max(...v) / 10) * 10 }; };
const _vis11 = (a, t, k) => { const r = a - (10 * t - k), rc = _rec11(a, 10 * t, r); return { t: 'recta', desde: rc.desde, hasta: rc.hasta, inicio: a, saltos: [-10 * t, k] }; };
const _pedir11 = (amin, amax, tmin, tmax, kmax) => { let a, t, k, n = 0; do { t = rnd(tmin, tmax); k = rnd(1, kmax); a = rnd(amin, amax); } while (a - (10 * t - k) < 10 && ++n < 300); return { a, t, k, b: 10 * t - k }; };
ESTR.add({
  id: 'resta2cifras', curso: 3, orden: 11, tri: 3,
  n: 'Restar compensando', ic: '−28', desc: 'Resto de más y devuelvo',
  truco: 'Resto la decena de al lado y devuelvo lo que sobra',
  tutorial: [
    { txt: 'Quiero restar 73 − 28. El 28 está cerca de 30.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 73, saltos: [] } },
    { txt: 'Restar 30 es fácil: de 73 salto atrás hasta 43.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 73, saltos: [-30] } },
    { txt: 'Pero solo debía restar 28. He quitado 2 de más, así que los devuelvo: 43 + 2 = 45.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 73, saltos: [-30, 2] } },
    { txt: 'Truco: resto la decena redonda y después devuelvo lo que me pasé. 73 − 28 = 45.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 73, saltos: [-30, 2] } }
  ],
  guiada() {
    const { a, t, k, b } = _pedir11(41, 95, 2, 7, 3), r = a - b;
    return {
      pasos: [
        { txt: `Para ${a} − ${b}, resto primero la decena redonda, ${10 * t}:`, q: `${a} − ${10 * t} = ?`, r: a - 10 * t, vis: { t: 'recta', desde: _vis11(a, t, k).desde, hasta: _vis11(a, t, k).hasta, inicio: a, saltos: [-10 * t] }, extra: [a - b, a - 10 * t - k, a - 10 * t + 10] },
        { txt: `Me pasé ${k}. Los devuelvo:`, q: `${a - 10 * t} + ${k} = ?`, r, vis: _vis11(a, t, k), extra: [a - 10 * t - k, a - 10 * t, r + 1] }
      ],
      final: { txt: 'Entonces:', q: `${a} − ${b} = ?`, r, vis: _vis11(a, t, k), extra: [a - 10 * t, a - 10 * t - k, r + 10] }
    };
  },
  item(nivel) {
    const { a, t, k, b } = nivel === 1 ? _pedir11(31, 69, 2, 4, 2) : nivel === 2 ? _pedir11(41, 99, 2, 9, 3) : _pedir11(101, 199, 2, 9, 4), r = a - b;
    return { q: `${a} − ${b} = ?`, r, vis: _vis11(a, t, k), extra: [r - k, r - 2 * k, r + 10, r - 10, a - 10 * t] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada resta con su resultado',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 200; k++) { const { a, b } = _pedir11(41, 99, 2, 9, 3), r = a - b; if (!vistos.has(r)) { vistos.add(r); out.push([`${a} − ${b}`, r]); } }
      return out;
    }
  }
});
