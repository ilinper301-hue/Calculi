/* 2.º · Truco 12 · Tabla del 5 */
{
  const rect = (n) => ({ t: 'recta', desde: 0, hasta: 5 * n, paso: 5, inicio: 0, saltos: Array(n).fill(5) });
  ESTR.add({
    id: 'tabla5', curso: 2, orden: 12, tri: 3,
    n: 'Tabla del 5', ic: '×5', desc: 'Cuento de 5 en 5',
    truco: 'Cuento de 5 en 5',
    tutorial: [
      { txt: 'Una mano tiene 5 dedos. Dos manos tienen 10.', vis: { t: 'dedos', n: 10 } },
      { txt: 'Cuento de 5 en 5: 5, 10, 15, 20. Son 4 saltos de 5.', vis: rect(4) },
      { txt: '4 × 5 son 4 filas de 5 puntos. Cada fila es un salto de 5: llego a 20.', vis: { t: 'matriz', filas: 4, cols: 5 } },
      { txt: 'Truco: los resultados de la tabla del 5 acaban en 0 o en 5. Mira la recta: 5, 10, 15, 20, 25…', vis: rect(8) }
    ],
    guiada() {
      const n = rnd(3, 5), r = 5 * n;
      const seg2 = n === 3 ? `10 + 5 = ?` : n === 4 ? `10 + 10 = ?` : `10 + 10 + 5 = ?`;
      return {
        pasos: [
          { txt: 'Cuento de 5 en 5. Dos saltos:', q: '5 + 5 = ?', r: 10, vis: { t: 'recta', desde: 0, hasta: r, paso: 5, inicio: 0, saltos: [5, 5] }, extra: [5, 15, 20] },
          { txt: 'Sigo contando hasta el último salto:', q: seg2, r, vis: rect(n), extra: [r - 5, r + 5, 10 * n] }
        ],
        final: { txt: `${n} saltos de 5:`, q: `${n} × 5 = ?`, r, vis: rect(n), extra: [r - 5, r + 5, 10 * n, n + 5] }
      };
    },
    item(nivel) {
      if (nivel === 1) { const n = rnd(2, 6); return { q: `${n} × 5`, r: 5 * n, vis: { t: 'matriz', filas: n, cols: 5 }, extra: [10 * n, 5 * n + 5, 5 * n - 5, n + 5] }; }
      const n = nivel === 2 ? rnd(3, 8) : rnd(3, 10), orden = nivel === 3 && rnd(0, 1) === 1;
      return { q: orden ? `5 × ${n}` : `${n} × 5`, r: 5 * n, vis: orden ? { t: 'matriz', filas: 5, cols: n } : rect(n), extra: [10 * n, 5 * n + 5, 5 * n - 5, n + 5, 5 * n + 1] };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`5 × ${n}`, 5 * n]); }
    }
  });
}
