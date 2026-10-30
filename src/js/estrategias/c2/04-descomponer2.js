/* 2.º · Truco 4 · Decenas y unidades (sumar sin llevar) */
{
  const gen = (nivel) => {
    const ua = rnd(1, 8), ub = rnd(1, 9 - ua), tope = nivel === 1 ? 4 : nivel === 2 ? 6 : 8, min = nivel === 3 ? 2 : 1;
    const da = rnd(min, tope), db = rnd(min, Math.min(tope, 9 - da));
    return { a: 10 * da + ua, b: 10 * db + ub, da, db, ua, ub };
  };
  ESTR.add({
    id: 'descomponer2', curso: 2, orden: 4, tri: 1,
    n: 'Decenas y unidades', ic: 'D+U', desc: 'Sumo por separado decenas y unidades',
    truco: 'Sumo decenas con decenas y unidades con unidades',
    tutorial: [
      { txt: '34 es 3 barras de 10 y 4 cubitos. 25 es 2 barras y 5 cubitos.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }, { d: 2, u: 5 }] } },
      { txt: 'Junto las barras: 3 decenas y 2 decenas son 5 decenas, es decir, 50.', vis: { t: 'decenas', grupos: [{ d: 3 }, { d: 2 }] } },
      { txt: 'Junto los cubitos: 4 y 5 son 9.', vis: { t: 'decenas', grupos: [{ u: 4 }, { u: 5 }] } },
      { txt: 'Truco: 34 + 25 = (30 + 20) + (4 + 5) = 50 + 9 = 59.', vis: { t: 'decenas', grupos: [{ d: 5, u: 9 }] } }
    ],
    guiada() {
      const { a, b, da, db, ua, ub } = gen(2), r = a + b;
      return {
        pasos: [
          { txt: 'Primero, las decenas:', q: `${10 * da} + ${10 * db} = ?`, r: 10 * (da + db), vis: { t: 'decenas', grupos: [{ d: da }, { d: db }] }, extra: [da + db, r, 10 * (da + db) + 10].filter(x => x <= 99) },
          { txt: 'Ahora, las unidades:', q: `${ua} + ${ub} = ?`, r: ua + ub, vis: { t: 'decenas', grupos: [{ u: ua }, { u: ub }] }, extra: [ua + ub + 1, ua + ub - 1, 10 * (ua + ub)] }
        ],
        final: { txt: `Junto ${10 * (da + db)} y ${ua + ub}:`, q: `${a} + ${b} = ?`, r, vis: { t: 'decenas', grupos: [{ d: da, u: ua }, { d: db, u: ub }] }, extra: [da + db + ua + ub, r + 10, r - 10, 10 * (ua + ub) + da + db].filter(x => x <= 99) }
      };
    },
    item(nivel) {
      const { a, b, da, db, ua, ub } = gen(nivel), r = a + b;
      const extra = [da + db + ua + ub, 10 * (ua + ub) + da + db, r + 10, r - 10].filter(x => x <= 99);
      return { q: `${a} + ${b}`, r, vis: { t: 'decenas', grupos: [{ d: da, u: ua }, { d: db, u: ub }] }, extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada suma con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { a, b } = gen(2); if (!us.has(a + b)) { us.add(a + b); out.push([`${a} + ${b}`, a + b]); } } return out; }
    }
  });
}
