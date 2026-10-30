/* 2.º · Truco 14 · Sumar y restar centenas */
{
  // Operación: {a (centenas), r (decenas sueltas 0..9), b (centenas), op}
  const val = (o) => o.a * 100 + o.r * 10;
  const gen = (nivel) => {
    const op = nivel === 1 ? '+' : pick(['+', '−']);
    const r = nivel === 1 ? 0 : nivel === 2 ? pick([0, 0, 5]) : pick([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let a, b;
    if (op === '+') { a = rnd(1, 7); b = rnd(1, Math.min(nivel === 1 ? 6 : 8, 9 - a)); }
    else { a = rnd(2, 9); b = rnd(1, a - 1); }
    return { a, r, b, op };
  };
  const visSuma = (o) => ({ t: 'decenas', grupos: [{ c: o.a, d: o.r }, { c: o.b }] });
  const visResta = (o) => ({ t: 'recta', desde: 100 * Math.floor((val(o) - 100 * o.b) / 100), hasta: 100 * Math.ceil(val(o) / 100), paso: 100, inicio: val(o), saltos: [-100 * o.b] });
  const vis = (o) => o.op === '+' ? visSuma(o) : visResta(o);
  const res = (o) => o.op === '+' ? val(o) + 100 * o.b : val(o) - 100 * o.b;
  ESTR.add({
    id: 'centenas', curso: 2, orden: 14, tri: 3,
    n: 'Sumar y restar centenas', ic: '100', desc: 'Cuento centenas como si fueran unidades',
    truco: 'Sumo o resto las centenas',
    tutorial: [
      { txt: 'Una placa grande es una centena: 100. Aquí hay 3 azules y 4 naranjas.', vis: { t: 'decenas', grupos: [{ c: 3 }, { c: 4 }] } },
      { txt: '3 centenas y 4 centenas son 7 centenas: 300 + 400 = 700.', vis: { t: 'decenas', grupos: [{ c: 7 }] } },
      { txt: 'Para restar es igual. 700 − 200: de 7 centenas quito 2 y quedan 5. Son 500.', vis: { t: 'recta', desde: 400, hasta: 700, paso: 100, inicio: 700, saltos: [-100, -100] } },
      { txt: 'Truco: cuando hay decenas, no se tocan. 250 + 100: 2 + 1 = 3 centenas y quedan los 50. Son 350.', vis: { t: 'decenas', grupos: [{ c: 2, d: 5 }, { c: 1 }] } }
    ],
    guiada() {
      const o = gen(3), t = res(o), cen = o.op === '+' ? o.a + o.b : o.a - o.b;
      return {
        pasos: [
          { txt: 'Primero, solo las centenas:', q: `${o.a} ${o.op} ${o.b} = ?`, r: cen, vis: o.op === '+' ? { t: 'decenas', grupos: [{ c: o.a }, { c: o.b }] } : { t: 'recta', desde: 100 * (o.a - o.b), hasta: 100 * o.a, paso: 100, inicio: 100 * o.a, saltos: [-100 * o.b] }, extra: [cen + 1, cen - 1, o.a * o.b] },
          { txt: `${cen} ${cen === 1 ? 'centena es' : 'centenas son'} ${100 * cen}. Añado las decenas que no he tocado:`, q: `${100 * cen} + ${10 * o.r} = ?`, r: t, vis: { t: 'decenas', grupos: [{ c: cen, d: o.r }] }, extra: [100 * cen, t + 100, t - 100, 100 * cen + o.r].filter(x => x <= 999) }
        ],
        final: { txt: 'Entonces:', q: `${val(o)} ${o.op} ${100 * o.b} = ?`, r: t, vis: vis(o), extra: [100 * cen, t + 100, t - 100, t + 10 * o.r].filter(x => x <= 999) }
      };
    },
    item(nivel) {
      const o = gen(nivel), t = res(o), cen = o.op === '+' ? o.a + o.b : o.a - o.b;
      return { q: `${val(o)} ${o.op} ${100 * o.b}`, r: t, vis: vis(o), extra: [t + 100, t - 100, t + 10, t - 10, 100 * cen].filter(x => x <= 999) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuenta con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const o = gen(2); const t = res(o); if (!us.has(t)) { us.add(t); out.push([`${val(o)} ${o.op} ${100 * o.b}`, t]); } } return out; }
    }
  });
}
