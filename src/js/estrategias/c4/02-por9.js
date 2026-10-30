/* 4.º · Truco 2 · Multiplicar por 9 con números de dos cifras (×10 − el número) */
ESTR.add({
  id: 'por9', curso: 4, orden: 2, tri: 1,
  n: 'Multiplicar por 9', ic: '×9', desc: '×10 y quito el número',
  truco: 'Multiplico por 10 y resto el número',
  tutorial: [
    { txt: '9 × 12 son 9 filas de 12. Es casi 10 filas de 12.', vis: { t: 'matriz', filas: 9, cols: 12 } },
    { txt: '10 × 12 = 120. Pero sobra una fila de 12: 120 − 12 = 108.', vis: { t: 'matriz', filas: 10, cols: 12, tachar: 1 } },
    { txt: 'Con números más grandes pasa igual. 23 × 9: primero 23 × 10 = 230.', vis: { t: 'recta', desde: 200, hasta: 240, inicio: 230 } },
    { txt: 'Quito 23 una vez: 230 − 23 = 207. Así que 23 × 9 = 207.', vis: { t: 'recta', desde: 200, hasta: 240, inicio: 230, saltos: [-23] } }
  ],
  guiada() {
    const n = rnd(13, 39);
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, extra: [9 * n, 100 * n] },
        { txt: 'Ahora quito el número una vez:', q: `${10 * n} − ${n} = ?`, r: 9 * n, vis: this.rec(n), extra: [10 * n - 10, 9 * n + 10, 10 * n + n] }
      ],
      final: { txt: 'Entonces:', q: `${n} × 9 = ?`, r: 9 * n, vis: this.rec(n), extra: [10 * n, 9 * n - 1, 8 * n] }
    };
  },
  rec(n) { return { t: 'recta', desde: Math.floor((9 * n - 1) / 10) * 10, hasta: 10 * n + 10, inicio: 10 * n, saltos: [-n] }; },
  item(nivel) {
    let n, vis;
    let q9;
    if (nivel === 1) { do { n = rnd(3, 12); } while (n === 10); q9 = `9 × ${n}`; vis = { t: 'matriz', filas: 10, cols: n, tachar: 1 }; }
    else if (nivel === 2) { n = rnd(13, 35); vis = this.rec(n); }
    else n = rnd(24, 99);
    return { q: q9 || (rnd(0, 1) ? `${n} × 9` : `9 × ${n}`), r: 9 * n, vis, extra: [10 * n, 9 * n + n, 9 * n - 9, 9 * n + 9, 8 * n, 10 * n - 10] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 30]).slice(0, 6).map(n => [`${n} × 9`, 9 * n]); }
  }
});
