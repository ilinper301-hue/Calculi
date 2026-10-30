/* 2.º · Truco 11 · Tabla del 2 */
{
  const mat = (orden, n) => orden ? { t: 'matriz', filas: 2, cols: n, partir: 1 } : { t: 'matriz', filas: n, cols: 2 };
  ESTR.add({
    id: 'tabla2', curso: 2, orden: 11, tri: 3,
    n: 'Tabla del 2', ic: '×2', desc: 'Multiplicar por 2 es el doble',
    truco: 'Por 2 es el doble',
    tutorial: [
      { txt: '2 × 6 son 2 filas de 6. Una fila azul y otra naranja.', vis: { t: 'matriz', filas: 2, cols: 6, partir: 1 } },
      { txt: 'Las dos filas son iguales: 6 + 6 = 12. Es el doble de 6.', vis: { t: 'parte', total: 12, a: 6, b: 6 } },
      { txt: 'Truco: la tabla del 2 es la de los dobles. 2 × 8 = 8 + 8 = 16.', vis: { t: 'matriz', filas: 2, cols: 8, partir: 1 } },
      { txt: 'Si el 2 va detrás, sale igual: 8 × 2 también es 16.', vis: { t: 'matriz', filas: 8, cols: 2 } }
    ],
    guiada() {
      const n = rnd(3, 9);
      return {
        pasos: [
          { txt: 'Mira una fila. ¿Cuántos puntos tiene?', q: '?', r: n, vis: { t: 'matriz', filas: 2, cols: n, partir: 1 }, extra: [2 * n, n + 1, n - 1] },
          { txt: 'Hay dos filas iguales. Sumo:', q: `${n} + ${n} = ?`, r: 2 * n, vis: { t: 'matriz', filas: 2, cols: n, partir: 1 }, extra: [n, 2 * n + 1, 2 * n - 1] }
        ],
        final: { txt: 'Entonces:', q: `2 × ${n} = ?`, r: 2 * n, vis: { t: 'matriz', filas: 2, cols: n, partir: 1 }, extra: [n, n + 2, 2 * n + 2, 2 * n - 1] }
      };
    },
    item(nivel) {
      const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 12), orden = nivel === 1 ? true : rnd(0, 1) === 1;
      return { q: orden ? `2 × ${n}` : `${n} × 2`, r: 2 * n, vis: mat(orden, n), extra: [n, n + 2, 2 * n + 2, 2 * n - 1, 2 * n + 1] };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 6).map(n => [`2 × ${n}`, 2 * n]); }
    }
  });
}
