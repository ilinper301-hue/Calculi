/* 5.º · Truco 1 · Multiplicar por 25 (×100 y entre 4) */
ESTR.add({
  id: 'por25', curso: 5, orden: 1, tri: 1,
  n: 'Multiplicar por 25', ic: '×25', desc: '×100 y entre 4',
  truco: 'Multiplico por 100 y divido entre 4',
  tutorial: [
    { txt: '25 es la cuarta parte de 100. Cuatro monedas de 25 céntimos hacen 100.', vis: { t: 'barra', partes: 4, marcadas: 4, total: 100, valor: 25 } },
    { txt: 'Por eso, multiplicar por 25 es multiplicar por 100 y repartir entre 4.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 100, valor: 25 } },
    { txt: '12 × 25. Primero por 100: 12 × 100 = 1200.', vis: { t: 'barra', partes: 4, marcadas: 0, total: 1200 } },
    { txt: 'Ahora entre 4: 1200 : 4 = 300. Así, 12 × 25 = 300.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 1200, valor: 300 } },
    { txt: 'Truco: ×100 y entre 4 (la mitad de la mitad). 16 × 25 = 1600 : 4 = 400.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 1600, valor: 400 } }
  ],
  guiada() {
    const n = rnd(3, 16), t = 100 * n, r = 25 * n;
    return {
      pasos: [
        { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: t, vis: { t: 'barra', partes: 4, marcadas: 0, total: t, oculto: 'total' }, extra: [10 * n, 25 * n, 1000 * n] },
        { txt: 'Ahora lo reparto entre 4:', q: `${fmt(t)} : 4 = ?`, r, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t / 2, t / 10, r + 25] }
      ],
      final: { txt: 'Entonces:', q: `${n} × 25 = ?`, r, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' }, extra: [t, t / 2, 20 * n, r + 25] }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? pick([4, 8, 12, 16, 20]) : nivel === 2 ? rnd(5, 24) : rnd(12, 80), r = 25 * n, t = 100 * n;
    const vis = { t: 'barra', partes: 4, marcadas: 1, total: t, valor: r, oculto: 'valor' };
    const extra = [t, t / 2, 10 * n, 20 * n, r + 25, r - 25];
    return { q: rnd(0, 1) ? `${n} × 25 = ?` : `25 × ${n} = ?`, r, vis, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([4, 6, 8, 10, 12, 14, 16, 20, 24, 28]).slice(0, 6).map(n => [`${n} × 25`, 25 * n]); }
  }
});
