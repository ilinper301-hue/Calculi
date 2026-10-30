/* 6.º · Truco 3 · Multiplicar por 15 */
ESTR.add({
  id: 'por15', curso: 6, orden: 3, tri: 1,
  n: 'Multiplicar por 15', ic: '×15', desc: '×10 y le sumo su mitad',
  truco: 'Multiplico por 10 y sumo la mitad',
  tutorial: [
    { txt: '15 es 10 y 5. Para 4 × 15, empiezo por 4 × 10 = 40.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40] } },
    { txt: '5 es la mitad de 10, así que 4 × 5 es la mitad de 40: 20.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
    { txt: 'Sumo: 40 + 20 = 60. Por tanto, 4 × 15 = 60.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
    { txt: 'Truco: × 10 y le sumo su mitad. 6 × 15 = 60 + 30 = 90.', vis: { t: 'recta', desde: 0, hasta: 90, inicio: 0, saltos: [60, 30] } }
  ],
  guiada() {
    const n = rnd(2, 8), v = { t: 'recta', desde: 0, hasta: 15 * n, inicio: 0, saltos: [10 * n, 5 * n] };
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, vis: { t: 'recta', desde: 0, hasta: 15 * n, inicio: 0, saltos: [10 * n] }, extra: [n * 5, n * 15, 10 + n] },
        { txt: 'Ahora, la mitad de ese resultado:', q: `${10 * n} : 2 = ?`, r: 5 * n, vis: v, extra: [10 * n - 5, 2 * n, 20 * n] }
      ],
      final: { txt: 'Sumo las dos partes:', q: `${n} × 15 = ?`, r: 15 * n, vis: v, extra: [10 * n, 15 * n + 5, 15 * n - 10, 20 * n] }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 8) : nivel === 2 ? rnd(11, 30) : rnd(31, 99), r = 15 * n;
    const q = rnd(0, 1) ? `${n} × 15 = ?` : `15 × ${n} = ?`;
    const it = { q, r, extra: [10 * n, 11 * n, 10 * n + 5, r + 10, r - 10, 20 * n - 5] };
    if (n <= 8) it.vis = { t: 'recta', desde: 0, hasta: r, inicio: 0, saltos: [10 * n, 5 * n] };
    return it;
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]).slice(0, 6).map(n => [`${n} × 15`, 15 * n]); }
  }
});
