/* 3.º · Truco 5 · Tabla del 7 (×5 + ×2) */
ESTR.add({
  id: 'tabla7', curso: 3, orden: 5, tri: 1,
  n: 'Tabla del 7', ic: '×7', desc: 'Cinco más dos',
  truco: 'Hago ×5 y ×2 y lo sumo',
  tutorial: [
    { txt: '7 × 4 son 7 filas de 4. Las parto en 5 filas azules y 2 filas naranjas.', vis: { t: 'matriz', filas: 7, cols: 4, partir: 5 } },
    { txt: 'Las 5 filas azules son 5 × 4 = 20. Esta tabla es fácil.', vis: { t: 'matriz', filas: 5, cols: 4 } },
    { txt: 'Las 2 filas naranjas son 2 × 4 = 8. Es el doble de 4.', vis: { t: 'matriz', filas: 2, cols: 4 } },
    { txt: 'Junto las dos partes: 20 + 8 = 28. Así que 7 × 4 = 28.', vis: { t: 'matriz', filas: 7, cols: 4, partir: 5 } },
    { txt: 'Truco: para multiplicar por 7, hago ×5 y ×2 y lo sumo. 7 × 6 = 30 + 12 = 42.', vis: { t: 'matriz', filas: 7, cols: 6, partir: 5 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Las 5 filas azules:', q: `5 × ${n} = ?`, r: 5 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [4 * n, 2 * n, 5 * n + 5] },
        { txt: 'Las 2 filas naranjas:', q: `2 × ${n} = ?`, r: 2 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [n, 3 * n, 2 * n + 2] }
      ],
      final: { txt: `Junto las dos partes: ${5 * n} + ${2 * n}.`, q: `7 × ${n} = ?`, r: 7 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra: [5 * n, 6 * n, 8 * n] }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 10);
    const extra = [5 * n, 6 * n, 8 * n, 5 * n + 2, 7 * n + 7, 7 * n - 7];
    if (nivel > 1 && rnd(0, 1)) return { q: `${n} × 7 = ?`, r: 7 * n, vis: { t: 'matriz', filas: n, cols: 7 }, extra };
    return { q: `7 × ${n} = ?`, r: 7 * n, vis: { t: 'matriz', filas: 7, cols: n, partir: 5 }, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`7 × ${n}`, 7 * n]); }
  }
});
