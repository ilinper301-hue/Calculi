/* 6.º · Truco 2 · Dividir entre 0,5 */
(() => {
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
ESTR.add({
  id: 'entremedio', curso: 6, orden: 2, tri: 1,
  n: 'Dividir entre 0,5', ic: ':0,5', desc: '¿Cuántas mitades caben?',
  truco: 'Dividir entre 0,5 es multiplicar por 2',
  tutorial: [
    { txt: '0,5 es media unidad. Dividir entre 0,5 es preguntar: ¿cuántas mitades caben? En 1 caben 2.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 1, valor: 0.5 } },
    { txt: 'En 3 caben 6 mitades, porque en cada unidad caben 2. Así, 3 : 0,5 = 6.', vis: { t: 'barra', partes: 6, marcadas: 6, total: 3, valor: 0.5 } },
    { txt: 'Truco: dividir entre 0,5 es multiplicar por 2. 5 : 0,5 = 5 × 2 = 10.', vis: { t: 'recta', desde: 0, hasta: 5, paso: 0.5, inicio: 0, saltos: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] } },
    { txt: 'Tu turno: ¿cuánto es 7 : 0,5? Toca la respuesta.', toca: { t: 'elige', q: '7 : 0,5 = ?', ops: [3.5, 14, 35, 7], r: 14 } },
    { txt: 'Con números grandes también: 18 : 0,5 = 18 × 2 = 36. Cada unidad da dos mitades.', vis: { t: 'parte', total: 36, a: 18, b: 18 } }
  ],
  guiada() {
    const n = rnd(3, 6);
    return {
      pasos: [
        { txt: '¿Cuántas mitades caben en 1?', q: '1 : 0,5 = ?', r: 2, vis: { t: 'barra', partes: 2, marcadas: 2, total: 1, valor: 0.5 }, extra: [1, 0.5, 4], errores: ER(2, [[1, 'En 1 entero caben más mitades que 1. Piensa en dos mitades.'], [0.5, 'Eso es lo que vale cada mitad. ¿Cuántas caben en 1?'], [4, 'Te has pasado: en 1 solo caben dos mitades.']]) },
        { txt: `En cada unidad caben 2 mitades. En ${n} unidades:`, q: `${n} × 2 = ?`, r: 2 * n, vis: { t: 'barra', partes: 2 * n, marcadas: 2 * n, total: n, valor: 0.5 }, extra: [n, n + 2, n * 3], errores: ER(2 * n, [[n, 'Eso son las unidades. En cada una caben 2 mitades.'], [n * 3, 'Son 2 mitades por unidad, no 3.'], [n + 2, 'No es sumar 2: es 2 mitades en cada unidad.']]) }
      ],
      final: { txt: 'Entonces:', q: `${n} : 0,5 = ?`, r: 2 * n, vis: { t: 'barra', partes: 2 * n, marcadas: 2 * n, total: n, valor: 0.5 }, extra: [n / 2, n * 5, n], errores: ER(2 * n, [[n / 2, 'Has dividido entre 2. Entre 0,5 sale un número mayor.'], [n * 5, 'Has multiplicado por 5. Es por 2.'], [n, 'Eso son las unidades. En cada una caben 2 mitades.']]) }
    };
  },
  item(nivel) {
    let n;
    if (nivel === 1) n = rnd(2, 6);
    else if (nivel === 2) n = rnd(0, 2) === 0 ? rnd(7, 19) + 0.5 : rnd(7, 40);
    else n = rnd(0, 2) === 0 ? rnd(20, 60) + 0.5 : rnd(21, 99);
    const r = 2 * n;
    const errores = ER(r, [[n / 2, 'Has dividido entre 2. Entre 0,5 el resultado es mayor.'], [n * 5, 'Has multiplicado por 5. Dividir entre 0,5 es por 2.'], [n, 'En cada unidad caben 2 mitades, no 1.'], [n + 0.5, 'No es sumar media: hay 2 mitades en cada unidad.']]);
    const it = { q: `${fmt(n)} : 0,5 = ?`, r, errores, extra: [n / 2, +(n * 5).toFixed(3), r + 1, r - 2, n + 0.5].map(x => +x.toFixed(3)) };
    if (n <= 6) it.vis = { t: 'barra', partes: 2 * n, marcadas: 2 * n, total: n, valor: 0.5 };
    return it;
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada división con su resultado',
    pares() { return shuffle([3, 5, 7, 8, 9, 12, 15, 16, 20, 25, 30, 45]).slice(0, 6).map(n => [`${n} : 0,5`, 2 * n]); }
  }
});
})();
