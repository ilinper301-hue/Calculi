/* 2.º · Truco 8 · Redondear y compensar */
{
  const E = (r, l) => l.filter(x => x[0] >= 0 && x[0] !== r);
  const gen = (nivel) => {
    const fin = nivel === 1 ? pick([8, 9]) : pick([7, 8, 9]);
    const da = rnd(1, nivel === 1 ? 4 : nivel === 2 ? 6 : 7);
    const a = 10 * da + fin, red = 10 * (da + 1), c = red - a;
    const hi = Math.min(nivel === 1 ? 29 : nivel === 2 ? 39 : 49, 99 - red), lo = Math.min(nivel === 3 ? 21 : 11, hi);
    let b; do { b = rnd(lo, hi); } while (b % 10 === 0 && hi >= lo + 3);
    return { a, b, red, c };
  };
  const vis = (g, pasos) => ({ t: 'recta', desde: 10 * Math.floor(g.a / 10), hasta: Math.min(100, 10 * Math.ceil((g.red + g.b) / 10)), inicio: g.a, saltos: [g.c, g.b, -g.c].slice(0, pasos) });
  ESTR.add({
    id: 'compensar2', curso: 2, orden: 8, tri: 2,
    n: 'Redondear y compensar', ic: '≈+', desc: 'Redondeo, sumo y quito lo que me pasé',
    truco: 'Redondeo a la decena, sumo y compenso',
    tutorial: [
      { txt: '48 + 25. El 48 está muy cerca de 50. Subo 2 y llego a 50.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 48, saltos: [2] } },
      { txt: 'Desde 50 sumo 25 y llego a 75. Es muy fácil.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 48, saltos: [2, 25] } },
      { txt: 'Pero he subido 2 de más. Los quito: 75 − 2 = 73.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 48, saltos: [2, 25, -2] } },
      { txt: 'Tu turno: 39 + 24. Redondea a 40, suma 24 y quita 1. Toca dónde llegas.', toca: { t: 'recta', desde: 30, hasta: 66, inicio: 39, objetivo: 63 } },
      { txt: 'Truco: 48 + 25 = 50 + 25 − 2 = 73. Redondeo, sumo y quito lo que me pasé.', vis: { t: 'recta', desde: 40, hasta: 80, inicio: 48, saltos: [2, 25, -2] } }
    ],
    guiada() {
      const g = gen(2), r = g.a + g.b;
      return {
        pasos: [
          { txt: `Redondeo ${g.a} a ${g.red}. Sumo:`, q: `${g.red} + ${g.b} = ?`, r: g.red + g.b, vis: vis(g, 2), extra: [r, g.red + g.b + 10, g.red + g.b - 10], errores: E(g.red + g.b, [[r, `Eso es el final. Ahora solo suma ${g.red} + ${g.b}.`], [g.red + g.b + 10, 'Te has pasado una decena. Suma otra vez.'], [g.red + g.b - 10, 'Te falta una decena. Suma otra vez.']]) },
          { txt: `Me he pasado ${g.c}. Los quito:`, q: `${g.red + g.b} − ${g.c} = ?`, r, vis: vis(g, 3), extra: [g.red + g.b, g.red + g.b + g.c, g.red + g.b - 2 * g.c], errores: E(r, [[g.red + g.b, 'Has redondeado, pero te falta compensar.'], [g.red + g.b + g.c, 'Hay que quitar lo que te pasaste, no sumarlo.'], [g.red + g.b - 2 * g.c, `Solo se quita ${g.c}, una vez.`]]) }
        ],
        final: { txt: 'Entonces:', q: `${g.a} + ${g.b} = ?`, r, vis: vis(g, 3), extra: [g.red + g.b, r + g.c, r - g.c, r + 10], errores: E(r, [[g.red + g.b, 'Has redondeado, pero te falta compensar.'], [g.red + g.b + g.c, 'Has compensado al revés: hay que quitar.'], [r - g.c, 'Has quitado dos veces. Compensa solo una vez.']]) }
      };
    },
    item(nivel) {
      const g = gen(nivel), r = g.a + g.b;
      const errores = E(r, [[g.red + g.b, 'Has redondeado, pero te falta compensar.'], [g.red + g.b + g.c, 'Has compensado al revés: hay que quitar.'], [r - g.c, 'Has quitado dos veces. Compensa solo una vez.'], [r + 10, 'Te has pasado una decena. Revisa la suma.']]);
      return { q: `${g.a} + ${g.b}`, r, vis: vis(g, 3), extra: [g.red + g.b, r + g.c, r - g.c, r + 10, r - 10], errores };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada suma con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const g = gen(3), r = g.a + g.b; if (!us.has(r)) { us.add(r); out.push([`${g.a} + ${g.b}`, r]); } } return out; }
    }
  });
}
