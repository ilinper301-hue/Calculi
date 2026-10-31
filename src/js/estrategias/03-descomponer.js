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
    { txt: 'Tu turno: esta barra es el 8. Toca 6 trocitos; los que quedan sin tocar son la otra parte.', toca: { t: 'barra', partes: 8, total: 8, objetivo: 6 } },
    { txt: 'Truco: del todo (8) quito la parte que veo (6) y lo que queda (2) es la otra.', vis: { t: 'parte', total: 8, a: 6, b: 2, oculto: 'b' } }
  ],
  guiada() {
    const t = rnd(5, 10), a = rnd(1, t - 1), b = t - a;
    return {
      pasos: [
        { txt: `Tengo ${t} fichas en total. ¿Cuántas son azules?`, q: '?', r: a, errores: [[b, 'Ese son las naranjas. Cuenta las azules.'], [t, `El ${t} son todas. Cuenta solo las azules.`], [a + 1, 'Cuenta otra vez las azules: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a), vis: { t: 'marco', a, b }, ops: opciones(a, 3, [b, a + 1, a - 1], t) },
        { txt: '¿Cuántas son naranjas?', q: '?', r: b, errores: [[a, 'Ese son las azules. Cuenta las naranjas.'], [t, `El ${t} son todas. Cuenta solo las naranjas.`], [b + 1, 'Cuenta otra vez las naranjas: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== b), vis: { t: 'marco', a, b }, ops: opciones(b, 3, [a, b + 1, b - 1], t) }
      ],
      final: { txt: 'Ahora la operación:', q: `${t} = ${a} + ?`, r: b, vis: { t: 'parte', total: t, a, b, oculto: 'b' }, errores: [[a, `El ${a} ya está. Busca lo que falta hasta ${t}.`], [t, `El ${t} es el total, no un trozo.`], [b + 1, 'Casi. Cuenta otra vez lo que falta.'], [b - 1, 'Casi. Cuenta otra vez lo que falta.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== b), ops: opciones(b, 3, [a, t, b + 1], t) }
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
    const conocido = t - r;
    const errores = [[conocido, `El ${conocido} ya está. Busca el trozo que falta.`], [t, `El ${t} es el total, no un trozo.`], [r + 1, 'Casi. Mira cuánto falta para llegar al total.'], [r - 1, 'Casi. Mira cuánto falta para llegar al total.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] <= t && x[0] !== r);
    return { q, r, vis: { t: 'parte', total: t, a: aa, b: bb, oculto }, errores, ops: nivel < 3 ? opciones(r, 3, [t, a === r ? b : a, r + 1, r - 1], t) : undefined };
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
