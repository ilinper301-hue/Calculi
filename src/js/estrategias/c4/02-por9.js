/* 4.º · Truco 2 · Multiplicar por 9 con números de dos cifras (×10 − el número) */
ESTR.add({
  id: 'por9', curso: 4, orden: 2, tri: 1,
  n: 'Multiplicar por 9', ic: '×9', desc: '×10 y quito el número',
  truco: 'Multiplico por 10 y resto el número',
  tutorial: [
    { txt: '9 × 12 son 9 filas de 12. Es casi 10 filas de 12.', vis: { t: 'matriz', filas: 9, cols: 12 } },
    { txt: '10 × 12 = 120. Pero sobra una fila de 12: 120 − 12 = 108.', vis: { t: 'matriz', filas: 10, cols: 12, tachar: 1 } },
    { txt: 'Con números más grandes pasa igual. 23 × 9: primero 23 × 10 = 230.', vis: { t: 'recta', desde: 200, hasta: 240, inicio: 230 } },
    { txt: 'Tu turno: 10 × 12 tiene una fila de más para llegar a 9 × 12. Toca la fila que sobra.', toca: { t: 'matriz', filas: 10, cols: 12, objetivo: 1 } },
    { txt: 'Quito 23 una vez: 230 − 23 = 207. Así que 23 × 9 = 207.', vis: { t: 'recta', desde: 200, hasta: 240, inicio: 230, saltos: [-23] } }
  ],
  guiada() {
    const n = rnd(13, 39);
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, extra: [9 * n, 100 * n], errores: _errc4(10 * n, [[100 * n, 'Por 10 solo se añade un cero.'], [9 * n, 'Primero por 10: añade un cero al número.']]) },
        { txt: 'Ahora quito el número una vez:', q: `${10 * n} − ${n} = ?`, r: 9 * n, vis: this.rec(n), extra: [9 * n + 10], errores: _errc4(9 * n, [[10 * n - 10, `Quita ${n}, el número, y no 10.`], [10 * n + n, 'Es una resta: hay que quitar, no sumar.'], [8 * n, 'Solo se quita el número una vez.']]) }
      ],
      final: { txt: 'Entonces:', q: `${n} × 9 = ?`, r: 9 * n, vis: this.rec(n), extra: [9 * n - 1], errores: _errc4(9 * n, [[10 * n, 'Has multiplicado por 10. Te falta quitar el número una vez.'], [8 * n, 'Solo se quita el número una vez, no dos.'], [10 * n - 10, `Al ×10 se le quita ${n}, no 10.`]]) }
    };
  },
  rec(n) { return { t: 'recta', desde: Math.floor((9 * n - 1) / 10) * 10, hasta: 10 * n + 10, inicio: 10 * n, saltos: [-n] }; },
  item(nivel) {
    let n, vis;
    let q9;
    if (nivel === 1) { do { n = rnd(3, 12); } while (n === 10); q9 = `9 × ${n}`; vis = { t: 'matriz', filas: 10, cols: n, tachar: 1 }; }
    else if (nivel === 2) { n = rnd(13, 35); vis = this.rec(n); }
    else n = rnd(24, 99);
    const errores = _errc4(9 * n, [[10 * n, 'Has multiplicado por 10. Te falta quitar el número una vez.'], [8 * n, 'Solo se quita el número una vez, no dos.'], [10 * n - 10, `Al ×10 se le quita ${n}, no 10.`], [10 * n + n, 'Es por 9: hay que quitar el número, no sumarlo.']]);
    return { q: q9 || (rnd(0, 1) ? `${n} × 9` : `9 × ${n}`), r: 9 * n, vis, extra: [9 * n + 9, 9 * n - 9], errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 25, 30]).slice(0, 6).map(n => [`${n} × 9`, 9 * n]); }
  }
});
