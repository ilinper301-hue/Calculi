/* 2.º · Truco 13 · Tabla del 10 */
{
  const E = (r, l) => l.filter(x => x[0] >= 0 && x[0] !== r);
  ESTR.add({
    id: 'tabla10', curso: 2, orden: 13, tri: 3,
    n: 'Tabla del 10', ic: '×10', desc: 'Pongo un cero detrás',
    truco: 'Por 10 pongo un cero detrás',
    tutorial: [
      { txt: 'Una barra es una decena: tiene 10 cubitos.', vis: { t: 'decenas', grupos: [{ d: 1 }] } },
      { txt: '3 × 10 son 3 barras de 10.', vis: { t: 'decenas', grupos: [{ d: 3 }] } },
      { txt: 'Cuento de 10 en 10: 10, 20, 30. Son 30.', vis: { t: 'recta', desde: 0, hasta: 30, paso: 10, inicio: 0, saltos: [10, 10, 10] } },
      { txt: 'Tu turno: 6 × 10. Pon un cero detrás del 6 y toca el resultado.', toca: { t: 'elige', q: '6 × 10 = ?', ops: [16, 60, 600], r: 60 } },
      { txt: 'Truco: pongo un 0 detrás del número. 7 × 10 = 70.', vis: { t: 'decenas', grupos: [{ d: 7 }] } }
    ],
    guiada() {
      const n = rnd(3, 5), r = 10 * n;
      return {
        pasos: [
          { txt: '¿Cuántas barras de 10 hay?', q: '?', r: n, vis: { t: 'decenas', grupos: [{ d: n }] }, extra: [r, n + 1, n - 1], errores: E(n, [[r, 'Eso es todo junto. Cuenta solo las barras.'], [n + 1, 'Cuenta otra vez las barras: te pasas por una.'], [n - 1, 'Cuenta otra vez las barras: te falta una.']]) },
          { txt: 'Cuento de 10 en 10:', q: Array(n).fill(10).join(' + ') + ' = ?', r, vis: { t: 'decenas', grupos: [{ d: n }] }, extra: [n, r + 10, r - 10], errores: E(r, [[n, 'Eso es el número de barras. Cada barra vale 10.'], [r + 10, 'Te has pasado una barra. Cuenta de 10 en 10.'], [r - 10, 'Te falta una barra. Cuenta de 10 en 10.']]) }
        ],
        final: { txt: `${n} barras de 10:`, q: `${n} × 10 = ?`, r, vis: { t: 'decenas', grupos: [{ d: n }] }, extra: [n, n + 10, r + 10, r - 10, 100], errores: E(r, [[n, `Falta el cero: ${n} barras de 10 no son ${n}.`], [n + 10, 'Es multiplicar, no sumar 10. Pon un cero detrás.'], [r + 10, 'Te has pasado una barra de 10.'], [r - 10, 'Te falta una barra de 10.']]) }
      };
    },
    item(nivel) {
      const n = nivel === 1 ? rnd(2, 6) : rnd(2, 10), orden = nivel > 1 && rnd(0, 1) === 1, r = 10 * n;
      return { q: orden ? `10 × ${n}` : `${n} × 10`, r, vis: orden ? { t: 'matriz', filas: 10, cols: n } : { t: 'decenas', grupos: [{ d: n }] }, extra: [n, n + 10, r + 10, r - 10, 100], errores: E(r, [[n, `Falta el cero: pon un 0 detrás del ${n}.`], [n + 10, 'Es multiplicar, no sumar 10. Pon un cero detrás.'], [r + 10, 'Te has pasado una barra de 10.'], [r - 10, 'Te falta una barra de 10.'], [100, 'Ese es el 100. Cuenta cuántas decenas hay.']]) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`10 × ${n}`, 10 * n]); }
    }
  });
}
