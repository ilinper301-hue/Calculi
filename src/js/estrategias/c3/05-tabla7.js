/* 3.º · Truco 5 · Tabla del 7 (×5 + ×2) */
const _er3_05 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'tabla7', curso: 3, orden: 5, tri: 1,
  n: 'Tabla del 7', ic: '×7', desc: 'Cinco más dos',
  truco: 'Hago ×5 y ×2 y lo sumo',
  tutorial: [
    { txt: '7 × 4 son 7 filas de 4. Las parto en 5 filas azules y 2 filas naranjas.', vis: { t: 'matriz', filas: 7, cols: 4, partir: 5 } },
    { txt: 'Las 5 filas azules son 5 × 4 = 20. Esta tabla es fácil.', vis: { t: 'matriz', filas: 5, cols: 4 } },
    { txt: 'Las 2 filas naranjas son 2 × 4 = 8. Es el doble de 4.', vis: { t: 'matriz', filas: 2, cols: 4 } },
    { txt: 'Tu turno: hay 7 filas. Toca 5 filas: son la parte fácil, la tabla del 5.', toca: { t: 'matriz', filas: 7, cols: 4, objetivo: 5 } },
    { txt: 'Junto las dos partes: 20 + 8 = 28. Así que 7 × 4 = 28.', vis: { t: 'matriz', filas: 7, cols: 4, partir: 5 } },
    { txt: 'Truco: para multiplicar por 7, hago ×5 y ×2 y lo sumo. 7 × 6 = 30 + 12 = 42.', vis: { t: 'matriz', filas: 7, cols: 6, partir: 5 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Las 5 filas azules:', q: `5 × ${n} = ?`, r: 5 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [4 * n, 2 * n, 5 * n + 5], errores: _er3_05(5 * n, [[2 * n, 'Esa es la tabla del 2. Son 5 filas azules.'], [4 * n, 'Esa es la tabla del 4. Son 5 filas azules.']]) },
        { txt: 'Las 2 filas naranjas:', q: `2 × ${n} = ?`, r: 2 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [n, 3 * n, 2 * n + 2], errores: _er3_05(2 * n, [[n, 'Eso es una sola fila. Son 2 filas naranjas.'], [3 * n, 'Eso son 3 filas. Solo son 2 naranjas.']]) }
      ],
      final: { txt: `Junto las dos partes: ${5 * n} + ${2 * n}.`, q: `7 × ${n} = ?`, r: 7 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [5 * n, 6 * n, 8 * n], errores: _er3_05(7 * n, [[5 * n, 'Eso son solo las azules. Suma también las naranjas.'], [6 * n, 'Has hecho la del 6. Hoy toca la del 7.'], [8 * n, 'Has hecho la del 8. Hoy toca la del 7.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 10);
    const extra = [5 * n, 6 * n, 8 * n, 5 * n + 2, 7 * n + 7, 7 * n - 7];
    const errores = _er3_05(7 * n, [[5 * n, 'Esa es solo la parte del 5. Falta sumar la del 2.'], [5 * n + 2, 'Has sumado solo 2. Son 2 filas: 2 × el número.'], [8 * n, 'Has hecho la del 8. Haz ×5 y ×2 y suma.'], [7 * n + 7, 'Te has pasado: has contado una fila de más.']]);
    if (nivel > 1 && rnd(0, 1)) return { q: `${n} × 7 = ?`, r: 7 * n, vis: { t: 'matriz', filas: n, cols: 7 }, extra, errores };
    return { q: `7 × ${n} = ?`, r: 7 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`7 × ${n}`, 7 * n]); }
  }
});
