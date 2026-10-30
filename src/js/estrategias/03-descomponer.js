/* Estrategia 3 · Descomponer hasta 10 */
ESTR.add({
  id: 'descomponer', orden: 3, tri: 1,
  n: 'Descomponer hasta 10', ic: '✂️', desc: 'Un número en dos partes',
  truco: 'Parto el número en dos',
  tutorial: [
    { txt: 'Un número se puede partir en dos trocitos. Mira el 7.', vis: { t: 'parte', total: 7, a: 5, b: 2 } },
    { txt: '7 es 5 y 2. Las fichas azules son 5 y las naranjas son 2.', vis: { t: 'marco', a: 5, b: 2 } },
    { txt: 'Pero 7 también es 4 y 3. ¡Hay muchas formas de partirlo!', vis: { t: 'marco', a: 4, b: 3 } },
    { txt: 'Si sé el todo y una parte, me falta la otra. 7 = 5 + ?', vis: { t: 'parte', total: 7, a: 5, b: 2, oculto: 'b' } },
    { txt: 'Truco: del todo quito la parte que veo y lo que queda es la otra.', vis: { t: 'marco', a: 6, b: 2 } }
  ],
  guiada() {
    const t = rnd(5, 10), a = rnd(1, t - 1), b = t - a;
    return {
      pasos: [
        { txt: `Tengo ${t} fichas en total. ¿Cuántas son azules?`, q: '?', r: a, vis: { t: 'marco', a, b }, extra: [b] },
        { txt: '¿Cuántas son naranjas?', q: '?', r: b, vis: { t: 'marco', a, b }, extra: [a] }
      ],
      final: { txt: 'Ahora la operación:', q: `${t} = ${a} + ?`, r: b, vis: { t: 'parte', total: t, a, b, oculto: 'b' }, extra: [a, t] }
    };
  },
  item(nivel) {
    const t = nivel === 1 ? rnd(4, 10) : rnd(3, 10);
    let a = rnd(nivel === 1 ? 1 : 0, nivel === 1 ? t - 1 : t);
    if (nivel === 1 && t > 5 && rnd(0, 1) === 0) a = 5;
    const b = t - a, forma = rnd(0, nivel === 1 ? 1 : 3);
    let q, r = b, oculto = 'b', aa = a, bb = b;
    if (forma === 0) q = `${t} = ${a} + ?`;
    else if (forma === 1) q = `${a} + ? = ${t}`;
    else if (forma === 2) { q = `${t} = ? + ${b}`; r = a; oculto = 'a'; }
    else { q = `? + ${b} = ${t}`; r = a; oculto = 'a'; }
    return { q, r, vis: { t: 'parte', total: t, a: aa, b: bb, oculto }, extra: [t, a === r ? b : a, r + 1, r - 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada número con su descomposición',
    pares() {
      return shuffle([4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(t => {
        const a = rnd(1, t - 1), b = t - a;
        return [String(t), `${a} + ${b}`];
      });
    }
  }
});
