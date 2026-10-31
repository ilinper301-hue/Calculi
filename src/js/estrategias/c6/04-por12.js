/* 6.º · Truco 4 · Multiplicar por 12 */
(() => {
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
ESTR.add({
  id: 'por12', curso: 6, orden: 4, tri: 1,
  n: 'Multiplicar por 12', ic: '×12', desc: '×10 y ×2, y sumo',
  truco: 'Multiplico por 10 y por 2, y sumo',
  tutorial: [
    { txt: '12 es 10 y 2. 12 × 4 son 12 filas de 4: 10 filas azules y 2 naranjas.', vis: { t: 'matriz', filas: 12, cols: 4, partir: 10 } },
    { txt: 'Las 10 primeras filas: 10 × 4 = 40.', vis: { t: 'matriz', filas: 10, cols: 4 } },
    { txt: 'Las otras 2 filas: 2 × 4 = 8.', vis: { t: 'matriz', filas: 2, cols: 4, partir: 0 } },
    { txt: 'Sumo: 40 + 8 = 48. Truco: × 10 y × 2, y sumo. 12 × 4 = 48.', vis: { t: 'matriz', filas: 12, cols: 4, partir: 10 } },
    { txt: 'Tu turno: 12 × 3. Toca las 10 filas que van con el ×10 (el resto son el ×2).', toca: { t: 'matriz', filas: 12, cols: 3, objetivo: 10 } },
    { txt: 'Con números más grandes funciona igual: 23 × 12 = 230 + 46 = 276.', vis: { t: 'parte', total: 276, a: 230, b: 46 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, vis: { t: 'matriz', filas: 10, cols: n }, extra: [n * 2, n * 12, 10 + n], errores: ER(10 * n, [[n * 2, 'Eso es por 2. Ahora toca por 10.'], [n * 12, 'Eso es ya por 12. Primero solo por 10.'], [10 + n, 'No es sumar 10: es multiplicar por 10.']]) },
        { txt: 'Ahora, por 2 (el doble):', q: `${n} × 2 = ?`, r: 2 * n, vis: { t: 'matriz', filas: 2, cols: n }, extra: [n + 2, n, 10 * n], errores: ER(2 * n, [[n + 2, 'No es sumar 2: es el doble del número.'], [n, 'Eso es el número. Por 2 es el doble.'], [10 * n, 'Eso es por 10. Aquí es por 2.']]) }
      ],
      final: { txt: 'Sumo las dos partes:', q: `${n} × 12 = ?`, r: 12 * n, vis: { t: 'matriz', filas: 12, cols: n, partir: 10 }, extra: [10 * n, 10 * n + 2, 11 * n, 12 + n], errores: ER(12 * n, [[10 * n, 'Falta sumar el ×2. ×12 es ×10 más ×2.'], [10 * n + 2, 'No sumes 2: suma el doble del número.'], [11 * n, 'Eso es ×11. Para 12 suma ×10 y ×2.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 6) : nivel === 2 ? rnd(6, 19) : rnd(15, 60), r = 12 * n;
    const q = rnd(0, 1) ? `${n} × 12 = ?` : `12 × ${n} = ?`;
    const errores = ER(r, [[10 * n, 'Eso es ×10. Falta sumar el doble del número.'], [10 * n + 2, 'No sumes 2: suma el doble del número.'], [11 * n, 'Eso es ×11. Para 12 suma ×10 y ×2.'], [12 + n, 'No es sumar: 12 × n es multiplicar.'], [r + 10, 'Revisa la suma de ×10 y ×2.'], [r - 12, 'Revisa la suma de ×10 y ×2.']]);
    const it = { q, r, errores, extra: [10 * n, 10 * n + 2, 11 * n, 12 + n, r + 10, r - 12] };
    if (n <= 12) it.vis = { t: 'matriz', filas: 12, cols: n, partir: 10 };
    return it;
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 20, 25]).slice(0, 6).map(n => [`${n} × 12`, 12 * n]); }
  }
});
})();
