/* 5.º · Truco 2 · Multiplicar por 50 (×100 y entre 2) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
ESTR.add({
  id: 'por50', curso: 5, orden: 2, tri: 1,
  n: 'Multiplicar por 50', ic: '×50', desc: '×100 y la mitad',
  truco: 'Multiplico por 100 y hago la mitad',
  tutorial: [
    { txt: '50 es la mitad de 100. Dos monedas de 50 céntimos hacen 100.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 100, valor: 50 } },
    { txt: 'Por eso, multiplicar por 50 es multiplicar por 100 y coger la mitad.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 100, valor: 50 } },
    { txt: '8 × 50. Primero por 100: 8 × 100 = 800.', vis: { t: 'barra', partes: 2, marcadas: 0, total: 800 } },
    { txt: 'Ahora la mitad: 800 : 2 = 400. Así, 8 × 50 = 400.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 800, valor: 400 } },
    { txt: 'Tu turno: la barra vale 800, que es 8 × 100. Toca la parte que es la mitad.', toca: { t: 'barra', partes: 2, objetivo: 1, total: 800 } },
    { txt: 'Truco: ×100 y la mitad. 36 × 50 = 3600 : 2 = 1800.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 3600, valor: 1800 } }
  ],
  guiada() {
    const n = rnd(3, 19), t = 100 * n, r = 50 * n;
    return {
      pasos: [
        { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: t, vis: { t: 'barra', partes: 2, marcadas: 0, total: t, oculto: 'total' }, extra: [10 * n, 50 * n, 1000 * n], errores: ER(t, [[10 * n, 'Por 100 son dos ceros, no uno.'], [1000 * n, 'Por 100 son dos ceros, no tres.'], [50 * n, 'Eso ya es por 50. Aquí toca por 100.']]) },
        { txt: 'Ahora cojo la mitad:', q: `${fmt(t)} : 2 = ?`, r, vis: { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t / 4, t / 10, r + 50], errores: ER(r, [[t / 4, 'Eso es la cuarta parte. Aquí solo la mitad.'], [t / 10, 'Es entre 2, no entre 10.'], [t, 'Eso es el total. Coge solo la mitad.']]) }
      ],
      final: { txt: 'Entonces:', q: `${n} × 50 = ?`, r, vis: { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t, t / 4, 5 * n, r + 50], errores: ER(r, [[t, 'Has hecho ×100. Ahora coge la mitad.'], [t / 4, 'Eso es ×25. Para ×50 basta la mitad.'], [5 * n, 'Eso es ×5. Piensa en ×100 y la mitad.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 9) : nivel === 2 ? rnd(6, 30) : rnd(12, 99), r = 50 * n, t = 100 * n;
    const vis = { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' };
    const extra = [t, t / 4, 5 * n, 25 * n, r + 50, r - 50];
    const errores = ER(r, [[t, 'Has hecho ×100. Ahora coge la mitad.'], [t / 4, 'Eso es ×25. Para ×50 basta la mitad.'], [5 * n, 'Eso es ×5. Piensa en ×100 y la mitad.'], [t / 10, 'Eso es ×10. Piensa en ×100 y la mitad.']]);
    return { q: rnd(0, 1) ? `${n} × 50 = ?` : `50 × ${n} = ?`, r, vis, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 18, 20]).slice(0, 6).map(n => [`${n} × 50`, 50 * n]); }
  }
});
})();
