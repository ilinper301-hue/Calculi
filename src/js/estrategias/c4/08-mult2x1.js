/* 4.º · Truco 8 · Dos cifras por una (descomponer) */
ESTR.add({
  id: 'mult2x1', curso: 4, orden: 8, tri: 2,
  n: 'Dos cifras por una', ic: '7×26', desc: 'Decenas por un lado, unidades por otro',
  truco: 'Separo decenas y unidades y multiplico cada parte',
  tutorial: [
    { txt: '12 × 4 son 12 filas de 4. Las parto: 10 filas y 2 filas.', vis: { t: 'matriz', filas: 12, cols: 4, partir: 10 } },
    { txt: '10 × 4 = 40 y 2 × 4 = 8. Junto las dos partes: 40 + 8 = 48.', vis: { t: 'matriz', filas: 12, cols: 4, partir: 10 } },
    { txt: 'Con 7 × 26 separo 26 en 20 y 6. 7 × 20 = 140 y 7 × 6 = 42.', vis: { t: 'decenas', grupos: [{ d: 14 }, { d: 4, u: 2 }] } },
    { txt: 'Sumo: 140 + 42 = 182. Así que 7 × 26 = 182.', vis: { t: 'recta', desde: 140, hasta: 190, inicio: 140, saltos: [42] } }
  ],
  rec(A, B) { return { t: 'recta', desde: A, hasta: Math.ceil((A + B) / 10) * 10, inicio: A, saltos: [B] }; },
  guiada() {
    const n = rnd(3, 9), t = rnd(1, 4), u = rnd(3, 9), tw = 10 * t + u, A = n * t * 10, B = n * u;
    return {
      pasos: [
        { txt: `Separo ${tw} en ${t * 10} y ${u}. Primero las decenas:`, q: `${n} × ${t * 10} = ?`, r: A, extra: [n * t, A + n, n * t * 100] },
        { txt: 'Ahora las unidades:', q: `${n} × ${u} = ?`, r: B, extra: [n + u, B + 10, B - n] }
      ],
      final: { txt: `Sumo ${A} + ${B}. Entonces:`, q: `${n} × ${tw} = ?`, r: A + B, vis: this.rec(A, B), extra: [A, A + u, n * t + B, A + B + 10] }
    };
  },
  item(nivel) {
    let n, tw, vis;
    if (nivel === 1) { n = rnd(2, 9); tw = rnd(11, 12); vis = { t: 'matriz', filas: tw, cols: n, partir: 10 }; }
    else if (nivel === 2) { n = rnd(2, 5); do { tw = rnd(13, 29); } while (tw % 10 === 0); }
    else { n = rnd(3, 9); do { tw = rnd(24, 99); } while (tw % 10 === 0); }
    const t = Math.floor(tw / 10), u = tw % 10, A = n * t * 10, B = n * u, r = n * tw;
    if (nivel === 2 && u) vis = this.rec(A, B);
    const q = nivel === 1 ? `${tw} × ${n}` : rnd(0, 1) ? `${n} × ${tw}` : `${tw} × ${n}`;
    return { q, r, vis, extra: [A, n * (t + u), A + u, r + 10, r - 10, n * t + B] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { const out = [], vistos = new Set(); while (out.length < 6) { const n = rnd(3, 9), tw = rnd(12, 48); if (tw % 10 && !vistos.has(n * tw)) { vistos.add(n * tw); out.push([`${n} × ${tw}`, n * tw]); } } return out; }
  }
});
