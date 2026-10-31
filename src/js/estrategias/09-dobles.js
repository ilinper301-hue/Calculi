/* Estrategia 9 · Dobles */
ESTR.add({
  id: 'dobles', orden: 9, tri: 2,
  n: 'Dobles', ic: '👯', desc: 'El mismo número dos veces',
  truco: 'Me sé los dobles',
  tutorial: [
    { txt: 'Un doble es sumar un número consigo mismo. 3 + 3 es el doble de 3.', vis: { t: 'marco', a: 3, b: 3, tam: 10 } },
    { txt: '3 + 3 = 6. Hay dos grupos iguales de 3 fichas.', vis: { t: 'parte', total: 6, a: 3, b: 3 } },
    { txt: 'El doble de 5 es 10: dos manos llenas.', vis: { t: 'dedos', n: 10 } },
    { txt: 'El doble de 8 es 16. 8 + 8 = 16.', vis: { t: 'marco', a: 8, b: 8, tam: 20 } },
    { txt: 'Tu turno: hay 4 fichas azules. Toca 4 casillas para hacer su doble.', toca: { t: 'marco', a: 4, tam: 20, objetivo: 8 } },
    { txt: 'El doble de 10 es 20. Truco: si me sé los dobles, ¡me ayudan a hacer muchas sumas!', vis: { t: 'marco', a: 10, b: 10, tam: 20 } }
  ],
  guiada() {
    const n = rnd(2, 9);
    return {
      pasos: [
        { txt: `Hay ${n} fichas azules. Para hacer un doble pongo otro grupo igual. ¿Cuántas fichas pongo?`, q: '?', r: n, errores: [[2 * n, 'Ese son todas. Pon un grupo igual al de arriba.'], [n + 1, 'Un doble lleva el mismo número, ni uno más.'], [n - 1, 'Un doble lleva el mismo número, ni uno menos.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== n), ops: opciones(n, 3, [n + 1, n - 1], 20), vis: { t: 'marco', a: n, tam: 20 } }
      ],
      final: { txt: 'Junto las dos partes iguales:', q: `${n} + ${n} = ?`, r: 2 * n, errores: [[n, 'Ese es un solo grupo. El doble son dos grupos iguales.'], [2 * n - 1, 'Casi. Junta bien los dos grupos iguales.'], [2 * n + 1, 'Doble no es sumar 1: es sumar el mismo número.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== 2 * n), ops: opciones(2 * n, 3, [2 * n - 1, 2 * n + 1, n], 20), vis: { t: 'marco', a: n, b: n, tam: 20 } }
    };
  },
  item(nivel) {
    const n = rnd(1, nivel === 1 ? 6 : 10), r = 2 * n;
    const vis = { t: 'marco', a: n, b: n, tam: 20 };
    const forma = nivel === 3 ? rnd(0, 2) : 0;
    const errD = [[n, 'Ese es un solo grupo. El doble son dos grupos iguales.'], [r - 1, 'Casi. Junta bien los dos grupos iguales.'], [r + 1, 'Doble no es sumar 1: es sumar el mismo número.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r);
    const errM = [[r, `El ${r} es el doble. Busca el número que se repite.`], [n + 1, `Piensa: ¿qué número sumado a sí mismo da ${r}?`], [n - 1, `Piensa: ¿qué número sumado a sí mismo da ${r}?`]].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== n);
    if (forma === 1) return { q: `${n} + ? = ${r}`, r: n, vis, errores: errM, extra: [r, n + 1, n - 1] };
    if (forma === 2) return { q: `${r} = ${n} + ?`, r: n, vis, errores: errM, extra: [r, n + 1, n - 1] };
    return { q: `${n} + ${n}`, r, vis, errores: errD, ops: opciones(r, 3, [r + 1, r - 1, n, n + 1], 20) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada doble con su resultado',
    pares() { return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`${n} + ${n}`, 2 * n]); }
  }
});
