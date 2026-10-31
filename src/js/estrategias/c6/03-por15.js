/* 6.º · Truco 3 · Multiplicar por 15 */
(() => {
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
ESTR.add({
  id: 'por15', curso: 6, orden: 3, tri: 1,
  n: 'Multiplicar por 15', ic: '×15', desc: '×10 y le sumo su mitad',
  truco: 'Multiplico por 10 y sumo la mitad',
  tutorial: [
    { txt: '15 es 10 y 5. Para 4 × 15, empiezo por 4 × 10 = 40.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40] } },
    { txt: '5 es la mitad de 10, así que 4 × 5 es la mitad de 40: 20.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
    { txt: 'Sumo: 40 + 20 = 60. Por tanto, 4 × 15 = 60.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
    { txt: 'Tu turno: 6 × 15. Ya tienes 60 (6 × 10). Toca en la recta dónde llegas al sumar su mitad.', toca: { t: 'recta', desde: 50, hasta: 100, paso: 5, inicio: 60, objetivo: 90 } },
    { txt: 'Truco: × 10 y le sumo su mitad. 6 × 15 = 60 + 30 = 90.', vis: { t: 'recta', desde: 0, hasta: 90, inicio: 0, saltos: [60, 30] } }
  ],
  guiada() {
    const n = rnd(2, 8), v = { t: 'recta', desde: 0, hasta: 15 * n, inicio: 0, saltos: [10 * n, 5 * n] };
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, vis: { t: 'recta', desde: 0, hasta: 15 * n, inicio: 0, saltos: [10 * n] }, extra: [n * 5, n * 15, 10 + n], errores: ER(10 * n, [[n * 5, 'Eso es por 5. Por 10 se añade un cero.'], [n * 15, 'Eso es ya por 15. Ahora solo por 10.'], [10 + n, 'No es sumar 10: es multiplicar por 10.']]) },
        { txt: 'Ahora, la mitad de ese resultado:', q: `${10 * n} : 2 = ?`, r: 5 * n, vis: v, extra: [10 * n - 5, 2 * n, 20 * n], errores: ER(5 * n, [[10 * n - 5, 'No quites 5: la mitad es dividir entre 2.'], [2 * n, 'Eso es dividir entre 5. La mitad es entre 2.'], [20 * n, 'Has doblado. La mitad es dividir entre 2.']]) }
      ],
      final: { txt: 'Sumo las dos partes:', q: `${n} × 15 = ?`, r: 15 * n, vis: v, extra: [10 * n, 15 * n + 5, 15 * n - 10, 20 * n], errores: ER(15 * n, [[10 * n, 'Falta sumar la mitad. ×15 es ×10 más ×5.'], [20 * n, 'Has sumado el doble en vez de la mitad.'], [15 * n + 5, 'Casi: revisa la suma de las dos partes.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 8) : nivel === 2 ? rnd(11, 30) : rnd(31, 99), r = 15 * n;
    const q = rnd(0, 1) ? `${n} × 15 = ?` : `15 × ${n} = ?`;
    const errores = ER(r, [[10 * n, 'Eso es ×10. Falta sumarle su mitad.'], [11 * n, 'Para 15 no sumes el número: suma la mitad de ×10.'], [10 * n + 5, 'No sumes 5: suma 5 veces el número (la mitad).'], [20 * n - 5, 'Has sumado el doble en vez de la mitad.'], [r + 10, 'Revisa la suma: ×10 más su mitad.'], [r - 10, 'Revisa la suma: ×10 más su mitad.']]);
    const it = { q, r, errores, extra: [10 * n, 11 * n, 10 * n + 5, r + 10, r - 10, 20 * n - 5] };
    if (n <= 8) it.vis = { t: 'recta', desde: 0, hasta: r, inicio: 0, saltos: [10 * n, 5 * n] };
    return it;
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]).slice(0, 6).map(n => [`${n} × 15`, 15 * n]); }
  }
});
})();
