/* 2.º · Truco 5 · Pasar la decena */
{
  const gen = (nivel) => {
    let ua, b, da;
    do {
      ua = rnd(nivel === 1 ? 7 : nivel === 2 ? 6 : 5, 9);
      b = nivel === 1 ? rnd(3, 6) : rnd(nivel === 2 ? 4 : 3, 9);
      da = rnd(1, nivel === 1 ? 5 : 8);
    } while (ua + b < 11);
    const c = 10 - ua;
    return { a: 10 * da + ua, b, da, ua, c, resto: b - c };
  };
  const vis = (g, n) => ({ t: 'recta', desde: 10 * g.da, hasta: 10 * g.da + 20, inicio: g.a, saltos: n === 1 ? [g.c] : [g.c, g.resto] });
  ESTR.add({
    id: 'pasardecena2', curso: 2, orden: 5, tri: 2,
    n: 'Pasar la decena', ic: '→10', desc: 'Primero llego a la decena',
    truco: 'Primero completo la decena y luego sumo lo que sobra',
    tutorial: [
      { txt: 'Quiero sumar 38 + 7. Empiezo en 38. Para llegar a 40 me faltan 2.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 38, saltos: [2] } },
      { txt: 'Del 7 ya he usado 2. Me quedan 5 por sumar. De 40 salto 5 y llego a 45.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 38, saltos: [2, 5] } },
      { txt: 'Truco: parto el 7 en 2 + 5. 38 + 2 = 40 y 40 + 5 = 45.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 38, saltos: [2, 5] } }
    ],
    guiada() {
      const g = gen(2), r = g.a + g.b, dec = 10 * (g.da + 1);
      return {
        pasos: [
          { txt: `¿Cuánto le falta a ${g.a} para llegar a ${dec}?`, q: `${g.a} + ? = ${dec}`, r: g.c, vis: vis(g, 1), extra: [g.ua, g.c + 1, g.c - 1] },
          { txt: `Del ${g.b} ya he usado ${g.c}. ¿Cuánto me queda?`, q: `${g.b} − ${g.c} = ?`, r: g.resto, vis: vis(g, 2), extra: [g.b + g.c, g.resto + 1, g.resto - 1] }
        ],
        final: { txt: `Ahora sumo ${g.resto} a ${dec}:`, q: `${g.a} + ${g.b} = ?`, r, vis: vis(g, 2), extra: [dec + g.b, r + 10, r - 10, r - 1] }
      };
    },
    item(nivel) {
      const g = gen(nivel), r = g.a + g.b, dec = 10 * (g.da + 1);
      return { q: `${g.a} + ${g.b}`, r, vis: vis(g, 2), extra: [r + 10, r - 10, dec + g.b, dec, 10 * g.da + g.b] };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada suma con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const g = gen(2); if (!us.has(g.a + g.b)) { us.add(g.a + g.b); out.push([`${g.a} + ${g.b}`, g.a + g.b]); } } return out; }
    }
  });
}
