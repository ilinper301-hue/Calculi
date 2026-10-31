/* 5.º · Truco 1 · Multiplicar por 25 (×100 y entre 4) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
ESTR.add({
  id: 'por25', curso: 5, orden: 1, tri: 1,
  n: 'Multiplicar por 25', ic: '×25', desc: '×100 y entre 4',
  truco: 'Multiplico por 100 y divido entre 4',
  tutorial: [
    { txt: '25 es la cuarta parte de 100. Cuatro monedas de 25 céntimos hacen 100.', vis: { t: 'barra', partes: 4, marcadas: 4, total: 100, valor: 25 } },
    { txt: 'Por eso, multiplicar por 25 es multiplicar por 100 y repartir entre 4.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 100, valor: 25 } },
    { txt: '12 × 25. Primero por 100: 12 × 100 = 1200.', vis: { t: 'barra', partes: 4, marcadas: 0, total: 1200 } },
    { txt: 'Ahora entre 4: 1200 : 4 = 300. Así, 12 × 25 = 300.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 1200, valor: 300 } },
    { txt: 'Tu turno: 14 × 25. Ya sé que 14 × 100 = 1400. Toca lo que sale al dividirlo entre 4.', toca: { t: 'elige', q: '1400 : 4 = ?', ops: [700, 350, 560], r: 350 } },
    { txt: 'Truco: ×100 y entre 4 (la mitad de la mitad). 16 × 25 = 1600 : 4 = 400.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 1600, valor: 400 } }
  ],
  guiada() {
    const n = rnd(3, 16), t = 100 * n, r = 25 * n;
    return {
      pasos: [
        { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: t, vis: { t: 'barra', partes: 4, marcadas: 0, total: t, oculto: 'total' }, extra: [10 * n, 25 * n, 1000 * n], errores: ER(t, [[10 * n, 'Por 100 son dos ceros, no uno.'], [1000 * n, 'Por 100 son dos ceros, no tres.'], [25 * n, 'Eso ya es por 25. Aquí toca por 100.']]) },
        { txt: 'Ahora lo reparto entre 4:', q: `${fmt(t)} : 4 = ?`, r, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t / 2, t / 10, r + 25], errores: ER(r, [[t / 2, 'Eso es la mitad. Para dividir entre 4, haz la mitad otra vez.'], [t / 10, 'Es entre 4, no entre 10.'], [t, 'Eso es el total. Repártelo en 4 partes.']]) }
      ],
      final: { txt: 'Entonces:', q: `${n} × 25 = ?`, r, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t, t / 2, 20 * n, r + 25], errores: ER(r, [[t, 'Has hecho ×100. Ahora divide entre 4.'], [t / 2, 'Eso es ×50. Para ×25 falta otra mitad.'], [20 * n, 'Eso es ×20. Piensa en ×100 y luego entre 4.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? pick([4, 8, 12, 16, 20]) : nivel === 2 ? rnd(5, 24) : rnd(12, 80), r = 25 * n, t = 100 * n;
    const vis = { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' };
    const extra = [t, t / 2, 10 * n, 20 * n, r + 25, r - 25];
    const errores = ER(r, [[t, 'Has hecho ×100. Ahora divide entre 4.'], [t / 2, 'Eso es ×50. Para ×25 falta otra mitad.'], [10 * n, 'Eso es ×10. Piensa en ×100 y luego entre 4.'], [20 * n, 'Eso es ×20. Piensa en ×100 y luego entre 4.']]);
    return { q: rnd(0, 1) ? `${n} × 25 = ?` : `25 × ${n} = ?`, r, vis, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([4, 6, 8, 10, 12, 14, 16, 20, 24, 28]).slice(0, 6).map(n => [`${n} × 25`, 25 * n]); }
  }
});
})();
