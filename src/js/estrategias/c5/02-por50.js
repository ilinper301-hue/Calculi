/* 5.º · Truco 2 · Multiplicar por 50 (×100 y entre 2) */
ESTR.add({
  id: 'por50', curso: 5, orden: 2, tri: 1,
  n: 'Multiplicar por 50', ic: '×50', desc: '×100 y la mitad',
  truco: 'Multiplico por 100 y hago la mitad',
  tutorial: [
    { txt: '50 es la mitad de 100. Dos monedas de 50 céntimos hacen 100.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 100, valor: 50 } },
    { txt: 'Por eso, multiplicar por 50 es multiplicar por 100 y coger la mitad.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 100, valor: 50 } },
    { txt: '8 × 50. Primero por 100: 8 × 100 = 800.', vis: { t: 'barra', partes: 2, marcadas: 0, total: 800 } },
    { txt: 'Ahora la mitad: 800 : 2 = 400. Así, 8 × 50 = 400.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 800, valor: 400 } },
    { txt: 'Truco: ×100 y la mitad. 36 × 50 = 3600 : 2 = 1800.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 3600, valor: 1800 } }
  ],
  guiada() {
    const n = rnd(3, 19), t = 100 * n, r = 50 * n;
    return {
      pasos: [
        { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: t, vis: { t: 'barra', partes: 2, marcadas: 0, total: t, oculto: 'total' }, extra: [10 * n, 50 * n, 1000 * n] },
        { txt: 'Ahora cojo la mitad:', q: `${fmt(t)} : 2 = ?`, r, vis: { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t / 4, t / 10, r + 50] }
      ],
      final: { txt: 'Entonces:', q: `${n} × 50 = ?`, r, vis: { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t, t / 4, 5 * n, r + 50] }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 9) : nivel === 2 ? rnd(6, 30) : rnd(12, 99), r = 50 * n, t = 100 * n;
    const vis = { t: 'barra', partes: 2, marcadas: 1, total: t, valor: r, oculto: 'valor' };
    const extra = [t, t / 4, 5 * n, 25 * n, r + 50, r - 50];
    return { q: rnd(0, 1) ? `${n} × 50 = ?` : `50 × ${n} = ?`, r, vis, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([3, 4, 5, 6, 7, 8, 9, 12, 14, 15, 18, 20]).slice(0, 6).map(n => [`${n} × 50`, 50 * n]); }
  }
});
