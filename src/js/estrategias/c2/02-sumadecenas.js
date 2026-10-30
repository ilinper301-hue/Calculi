/* 2.º · Truco 2 · Sumar decenas */
{
  const gen = (nivel) => {
    const k = nivel === 1 ? rnd(1, 3) : nivel === 2 ? rnd(2, 5) : rnd(2, 7);
    const b = 10 * k;
    const da = rnd(1, Math.min(nivel === 1 ? 5 : 9, 9 - k)), ua = rnd(1, 9);
    return { a: 10 * da + ua, b, da, ua, k };
  };
  ESTR.add({
    id: 'sumadecenas', curso: 2, orden: 2, tri: 1,
    n: 'Sumar decenas', ic: '+10', desc: 'Solo cambian las decenas',
    truco: 'Sumo las decenas y las unidades no cambian',
    tutorial: [
      { txt: 'Tengo 47: 4 barras de 10 y 7 cubitos.', vis: { t: 'decenas', grupos: [{ d: 4, u: 7 }] } },
      { txt: 'Sumo 30: añado 3 barras naranjas de 10. Los cubitos no cambian.', vis: { t: 'decenas', grupos: [{ d: 4, u: 7 }, { d: 3 }] } },
      { txt: 'Ahora hay 7 barras y 7 cubitos: 77.', vis: { t: 'decenas', grupos: [{ d: 7, u: 7 }] } },
      { txt: 'Truco: al sumar decenas, solo cambian las decenas. 47 + 30 = 77.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 47, saltos: [10, 10, 10] } }
    ],
    guiada() {
      const { a, b, da, ua, k } = gen(2);
      return {
        pasos: [
          { txt: 'Primero, solo las decenas:', q: `${10 * da} + ${b} = ?`, r: 10 * da + b, vis: { t: 'decenas', grupos: [{ d: da }, { d: k }] }, extra: [a + b, 10 * da + k, b] },
          { txt: 'Ahora añado las unidades, que no cambian:', q: `${10 * da + b} + ${ua} = ?`, r: a + b, vis: { t: 'decenas', grupos: [{ d: da + k, u: ua }] }, extra: [10 * da + b, a + b + 10, a + b - 10] }
        ],
        final: { txt: 'Entonces:', q: `${a} + ${b} = ?`, r: a + b, vis: { t: 'decenas', grupos: [{ d: da, u: ua }, { d: k }] }, extra: [a + b + 10, a + b - 10, a + k, 10 * da + b].filter(x => x <= 99) }
      };
    },
    item(nivel) {
      const { a, b, da, ua, k } = gen(nivel), r = a + b;
      const extra = [r + 10, r - 10, a + k, 10 * da + b, r + ua].filter(x => x <= 99);
      const lo = 10 * Math.floor(a / 10), hi = Math.min(100, 10 * Math.floor(r / 10) + 10);
      const vis = nivel === 1 ? { t: 'decenas', grupos: [{ d: da, u: ua }, { d: k }] } : { t: 'recta', desde: lo, hasta: hi, inicio: a, saltos: Array(k).fill(10) };
      if (nivel >= 2 && rnd(0, 1)) return { q: `${b} + ${a}`, r, vis, extra };
      return { q: `${a} + ${b}`, r, vis, extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada suma con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { a, b } = gen(2); if (!us.has(a + b)) { us.add(a + b); out.push([`${a} + ${b}`, a + b]); } } return out; }
    }
  });
}
