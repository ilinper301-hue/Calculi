/* 3.º · Truco 3 · Tablas del 3 y del 6 (la del 6 es el doble de la del 3) */
const _er3_03 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'tabla3y6', curso: 3, orden: 3, tri: 1,
  n: 'Tablas del 3 y del 6', ic: '×3·6', desc: 'El 6 es el doble del 3',
  truco: 'Hago la del 3 y la doblo',
  tutorial: [
    { txt: '3 × 4 son 3 filas de 4. Son 4 + 4 + 4 = 12.', vis: { t: 'matriz', filas: 3, cols: 4 } },
    { txt: '6 × 4 son 6 filas de 4. Mira: 3 filas azules y 3 filas naranjas.', vis: { t: 'matriz', filas: 6, cols: 4, partir: 3 } },
    { txt: 'Las azules son 3 × 4 = 12. Las naranjas, otras 12. Entonces 12 + 12 = 24.', vis: { t: 'matriz', filas: 6, cols: 4, partir: 3 } },
    { txt: 'Tu turno: hay 6 filas. Toca 3 filas: son la tabla del 3.', toca: { t: 'matriz', filas: 6, cols: 4, objetivo: 3 } },
    { txt: 'Truco: la tabla del 6 es el doble de la tabla del 3. 6 × 7: 3 × 7 = 21 y el doble es 42.', vis: { t: 'matriz', filas: 6, cols: 7, partir: 3 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Primero, la tabla del 3:', q: `3 × ${n} = ?`, r: 3 * n, vis: { t: 'matriz', filas: 6, cols: n, partir: 3 }, extra: [2 * n, 4 * n, 3 * n + 3], errores: _er3_03(3 * n, [[2 * n, 'Esa es la tabla del 2. Necesitas la del 3.'], [4 * n, 'Esa es la tabla del 4. Necesitas la del 3.']]) },
        { txt: 'Ahora, el doble de ese resultado:', q: `${3 * n} + ${3 * n} = ?`, r: 6 * n, vis: { t: 'matriz', filas: 6, cols: n, partir: 3 }, extra: [3 * n, 5 * n, 6 * n + 2], errores: _er3_03(6 * n, [[3 * n, 'Ese es el primer resultado. Ahora dóblalo.'], [5 * n, 'Eso no es el doble. Suma el resultado de antes consigo mismo.']]) }
      ],
      final: { txt: 'Entonces:', q: `6 × ${n} = ?`, r: 6 * n, vis: { t: 'matriz', filas: 6, cols: n, partir: 3 }, extra: [3 * n, 5 * n, 7 * n], errores: _er3_03(6 * n, [[3 * n, 'Esa es la tabla del 3. Falta doblarla.'], [5 * n, 'Has hecho la del 5. Hoy toca la del 6.'], [7 * n, 'Has hecho la del 7. Hoy toca la del 6.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 10);
    const f = rnd(0, 1) ? 3 : 6, errores = _er3_03(f * n, f === 3 ? [[2 * n, 'Esa es la tabla del 2. Piensa en la del 3.'], [4 * n, 'Esa es la tabla del 4. Piensa en la del 3.'], [3 * n + 3, 'Te has pasado: has contado una fila de más.'], [3 * n - 3, 'Te falta una fila. Revisa la tabla del 3.']] : [[3 * n, 'Esa es la tabla del 3. Falta doblarla.'], [5 * n, 'Has hecho la del 5. Haz la del 3 y dóblala.'], [7 * n, 'Has hecho la del 7. Haz la del 3 y dóblala.'], [6 * n + 6, 'Te has pasado: has contado un grupo de más.']]), extra = f === 3 ? [2 * n, 4 * n, 3 * n + 3, 3 * n - 3] : [3 * n, 5 * n, 7 * n, 6 * n + 6, 6 * n - 6];
    if (nivel > 1 && rnd(0, 1)) return { q: `${n} × ${f} = ?`, r: f * n, vis: { t: 'matriz', filas: n, cols: f }, extra, errores };
    return { q: `${f} × ${n} = ?`, r: f * n, vis: f === 6 ? { t: 'matriz', filas: 6, cols: n, partir: 3 } : { t: 'matriz', filas: 3, cols: n }, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() {
      // Resultados distintos entre sí (3 × 4 y 6 × 2 darían los dos 12).
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) {
        const f = rnd(0, 1) ? 3 : 6, n = rnd(2, 10), r = f * n;
        if (!vistos.has(r)) { vistos.add(r); out.push([`${f} × ${n}`, r]); }
      }
      return out;
    }
  }
});
