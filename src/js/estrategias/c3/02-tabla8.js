/* 3.º · Truco 2 · Tabla del 8 (doble de la del 4) */
ESTR.add({
  id: 'tabla8', curso: 3, orden: 2, tri: 1,
  n: 'Tabla del 8', ic: '×8', desc: 'El doble de la del 4',
  truco: 'Hago la del 4 y la doblo',
  tutorial: [
    { txt: '8 × 3 son 8 filas de 3. Mira: 4 filas azules y 4 filas naranjas.', vis: { t: 'matriz', filas: 8, cols: 3, partir: 4 } },
    { txt: 'Las 4 filas azules son 4 × 3 = 12.', vis: { t: 'matriz', filas: 4, cols: 3 } },
    { txt: 'Las naranjas son otras 12. Entonces 12 + 12 = 24. Así que 8 × 3 = 24.', vis: { t: 'matriz', filas: 8, cols: 3, partir: 4 } },
    { txt: 'Truco: para multiplicar por 8, hago la tabla del 4 y la doblo. 8 × 6: 4 × 6 = 24 y el doble es 48.', vis: { t: 'matriz', filas: 8, cols: 6, partir: 4 } }
  ],
  guiada() {
    const n = rnd(3, 9);
    return {
      pasos: [
        { txt: 'Primero, la mitad de las filas (la tabla del 4):', q: `4 × ${n} = ?`, r: 4 * n, vis: { t: 'matriz', filas: 8, cols: n, partir: 4 }, extra: [2 * n, 3 * n, 8 * n] },
        { txt: 'Ahora, el doble de ese resultado:', q: `${4 * n} + ${4 * n} = ?`, r: 8 * n, vis: { t: 'matriz', filas: 8, cols: n, partir: 4 }, extra: [4 * n, 7 * n, 8 * n + 2] }
      ],
      final: { txt: 'Entonces:', q: `8 × ${n} = ?`, r: 8 * n, vis: { t: 'matriz', filas: 8, cols: n, partir: 4 }, extra: [4 * n, 7 * n, 9 * n] }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(6, 10);
    const extra = [4 * n, 7 * n, 9 * n, 8 * n + 8, 8 * n - 8];
    if (nivel > 1 && rnd(0, 1)) return { q: `${n} × 8 = ?`, r: 8 * n, vis: { t: 'matriz', filas: n, cols: 8 }, extra };
    return { q: `8 × ${n} = ?`, r: 8 * n, vis: { t: 'matriz', filas: 8, cols: n, partir: 4 }, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`8 × ${n}`, 8 * n]); }
  }
});
