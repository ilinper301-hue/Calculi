/* Estrategia 9 · Dobles */
ESTR.add({
  id: 'dobles', orden: 9, tri: 2,
  n: 'Dobles', ic: '👯', desc: 'El mismo número dos veces',
  truco: 'Me sé los dobles',
  tutorial: [
    { txt: 'Un doble es sumar un número consigo mismo. 3 + 3 es el doble de 3.', vis: { t: 'dedos', n: 6 } },
    { txt: '3 + 3 = 6. Hay dos grupos iguales de 3 fichas.', vis: { t: 'marco', a: 3, b: 3, tam: 10 } },
    { txt: 'El doble de 5 es 10: dos manos llenas.', vis: { t: 'dedos', n: 10 } },
    { txt: 'El doble de 8 es 16. 8 + 8 = 16.', vis: { t: 'marco', a: 8, b: 8, tam: 20 } },
    { txt: 'Truco: si me sé los dobles, ¡me ayudan a hacer muchas sumas!', vis: { t: 'marco', a: 10, b: 10, tam: 20 } }
  ],
  guiada() {
    const n = rnd(2, 9);
    return {
      pasos: [
        { txt: `Hay ${n} fichas azules. ¿Cuántas naranjas hay para hacer un doble?`, q: '?', r: n, vis: { t: 'marco', a: n, b: n, tam: 20 } }
      ],
      final: { txt: 'Junto las dos partes iguales:', q: `${n} + ${n} = ?`, r: 2 * n, vis: { t: 'marco', a: n, b: n, tam: 20 } }
    };
  },
  item(nivel) {
    const n = rnd(1, nivel === 1 ? 6 : 10), r = 2 * n;
    const vis = { t: 'marco', a: n, b: n, tam: 20 };
    const forma = nivel === 3 ? rnd(0, 2) : 0;
    if (forma === 1) return { q: `${n} + ? = ${r}`, r: n, vis, extra: [r, n + 1, n - 1] };
    if (forma === 2) return { q: `${r} = ${n} + ?`, r: n, vis, extra: [r, n + 1, n - 1] };
    return { q: `${n} + ${n}`, r, vis, extra: [r + 1, r - 1, n, n + 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada doble con su resultado',
    pares() { return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`${n} + ${n}`, 2 * n]); }
  }
});
