/* 3.º · Truco 1 · Tabla del 4 (doble del doble) */
const _er3_01 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'tabla4', curso: 3, orden: 1, tri: 1,
  n: 'Tabla del 4', ic: '×4', desc: 'El doble del doble',
  truco: 'Hago el doble del doble',
  tutorial: [
    { txt: '4 × 3 son 4 filas de 3. Fíjate: son dos filas azules y dos filas naranjas.', vis: { t: 'matriz', filas: 4, cols: 3, partir: 2 } },
    { txt: 'Dos filas son 2 × 3 = 6. Es el doble de 3.', vis: { t: 'matriz', filas: 2, cols: 3 } },
    { txt: 'Y las otras dos filas son otros 6. Entonces 6 + 6 = 12. Así que 4 × 3 = 12.', vis: { t: 'matriz', filas: 4, cols: 3, partir: 2 } },
    { txt: 'Tu turno: hay 4 filas. Toca las 2 primeras filas: son el primer doble.', toca: { t: 'matriz', filas: 4, cols: 5, objetivo: 2 } },
    { txt: 'Truco: para multiplicar por 4, hago el doble y otra vez el doble. 4 × 7: doble de 7 es 14, doble de 14 es 28.', vis: { t: 'matriz', filas: 4, cols: 7, partir: 2 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Primero, el doble del número:', q: `${n} + ${n} = ?`, r: 2 * n, vis: { t: 'matriz', filas: 4, cols: n, partir: 2 }, extra: [n, 3 * n, 2 * n + 1], errores: _er3_01(2 * n, [[n, 'Ese es el número solo. Súmalo consigo mismo.'], [3 * n, 'Eso es ×3. El doble es sumar el número dos veces.']]) },
        { txt: 'Ahora, el doble de ese resultado:', q: `${2 * n} + ${2 * n} = ?`, r: 4 * n, vis: { t: 'matriz', filas: 4, cols: n, partir: 2 }, extra: [2 * n, 3 * n, 4 * n + 2], errores: _er3_01(4 * n, [[2 * n, 'Ese es el primer doble. Ahora dóblalo otra vez.'], [3 * n, 'Eso es ×3. Aquí se dobla el resultado de antes.']]) }
      ],
      final: { txt: 'Entonces:', q: `4 × ${n} = ?`, r: 4 * n, vis: { t: 'matriz', filas: 4, cols: n, partir: 2 }, extra: [2 * n, 3 * n, 5 * n], errores: _er3_01(4 * n, [[2 * n, 'Solo has hecho un doble. Para ×4 hay que doblar dos veces.'], [3 * n, 'Has hecho ×3. Para ×4: el doble del doble.'], [5 * n, 'Has hecho ×5. Para ×4: el doble del doble.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 10);
    const extra = [2 * n, 3 * n, 5 * n, 4 * n + 4, 4 * n - 4];
    const errores = _er3_01(4 * n, [[2 * n, 'Solo has hecho un doble. Falta doblar otra vez.'], [3 * n, 'Has hecho ×3. Para ×4: el doble del doble.'], [4 * n + 4, 'Te has pasado: has contado una fila de más.'], [4 * n - 4, 'Te falta una fila. Revisa el segundo doble.']]);
    if (nivel > 1 && rnd(0, 1)) return { q: `${n} × 4 = ?`, r: 4 * n, vis: { t: 'matriz', filas: n, cols: 4 }, extra, errores };
    return { q: `4 × ${n} = ?`, r: 4 * n, vis: { t: 'matriz', filas: 4, cols: n, partir: 2 }, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`4 × ${n}`, 4 * n]); }
  }
});
