/* 2.º · Truco 15 · Restar hacia delante */
{
  // b acaba en 6-9; salta a la decena (c1) y luego hasta a (c2)
  const gen = (nivel) => {
    const ub = rnd(nivel === 1 ? 7 : 6, 9), db = rnd(1, 8), b = 10 * db + ub, c1 = 10 - ub;
    const c2 = Math.min(99 - 10 * (db + 1), nivel === 1 ? rnd(1, 4) : nivel === 2 ? rnd(1, 8) : rnd(5, 19));
    return { a: 10 * (db + 1) + c2, b, c1, c2, dec: 10 * (db + 1) };
  };
  const vis = (g, n) => ({ t: 'recta', desde: 10 * Math.floor(g.b / 10), hasta: 10 * Math.ceil(g.a / 10), inicio: g.b, saltos: [g.c1, g.c2].slice(0, n) });
  ESTR.add({
    id: 'restaradelante', curso: 2, orden: 15, tri: 3,
    n: 'Restar hacia delante', ic: '62−58', desc: 'Cuento cuánto falta de un número a otro',
    truco: 'Cuento hacia delante desde el número pequeño',
    tutorial: [
      { txt: '62 − 58. Los números están muy cerca. Cuento cuánto falta de 58 a 62.', vis: { t: 'recta', desde: 50, hasta: 70, inicio: 58 } },
      { txt: 'De 58 a 60 hay 2.', vis: { t: 'recta', desde: 50, hasta: 70, inicio: 58, saltos: [2] } },
      { txt: 'De 60 a 62 hay otros 2. Llego a 62.', vis: { t: 'recta', desde: 50, hasta: 70, inicio: 58, saltos: [2, 2] } },
      { txt: 'Truco: 2 + 2 = 4. Entonces 62 − 58 = 4. Resto contando hacia delante.', vis: { t: 'recta', desde: 50, hasta: 70, inicio: 58, saltos: [2, 2] } }
    ],
    guiada() {
      const g = gen(2), r = g.c1 + g.c2;
      return {
        pasos: [
          { txt: `¿Cuánto hay de ${g.b} a ${g.dec}?`, q: `${g.b} + ? = ${g.dec}`, r: g.c1, vis: vis(g, 1), extra: [g.c2, g.c1 + 1, g.c1 - 1] },
          { txt: `¿Cuánto hay de ${g.dec} a ${g.a}?`, q: `${g.dec} + ? = ${g.a}`, r: g.c2, vis: vis(g, 2), extra: [g.c1, g.c2 + 1, g.c2 - 1] }
        ],
        final: { txt: `Junto los dos saltos, ${g.c1} + ${g.c2}:`, q: `${g.a} − ${g.b} = ?`, r, vis: vis(g, 2), extra: [r + 1, r - 1, Math.abs(g.a % 10 - g.b % 10), r + 10].filter(x => x > 0 && x !== r) }
      };
    },
    item(nivel) {
      const g = gen(nivel), r = g.c1 + g.c2;
      return { q: `${g.a} − ${g.b}`, r, vis: vis(g, 2), extra: [r + 1, r - 1, Math.abs(g.a % 10 - g.b % 10), r + 10, g.c2].filter(x => x > 0 && x !== r) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada resta con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const g = gen(2), r = g.c1 + g.c2; if (!us.has(r)) { us.add(r); out.push([`${g.a} − ${g.b}`, r]); } } return out; }
    }
  });
}
