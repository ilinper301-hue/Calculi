/* 2.º · Truco 6 · Sumar 9 y 19 */
{
  // k = 9 → +10 −1 ; k = 19 → +20 −1
  const rect = (a, k, pasos) => { const lo = 10 * Math.floor(a / 10), s = k === 9 ? [10, -1] : [20, -1]; return { t: 'recta', desde: lo, hasta: Math.min(100, lo + (k === 9 ? 20 : 30)), inicio: a, saltos: s.slice(0, pasos) }; };
  const gen = (nivel) => {
    const k = nivel === 1 ? 9 : pick([9, 19]);
    const a = nivel === 1 ? rnd(11, 59) : nivel === 2 ? rnd(11, 70) : rnd(21, 80);
    return { a, k };
  };
  ESTR.add({
    id: 'sumar919', curso: 2, orden: 6, tri: 2,
    n: 'Sumar 9 y 19', ic: '+9', desc: 'Sumo 10 (o 20) y quito 1',
    truco: 'Sumo 10 o 20 y quito 1',
    tutorial: [
      { txt: '9 es casi 10. Para sumar 9, sumo 10 y me paso por 1. Empiezo en 36.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 36, saltos: [10] } },
      { txt: '36 + 10 = 46. Me he pasado 1, así que quito 1: llego a 45.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 36, saltos: [10, -1] } },
      { txt: 'Truco: 36 + 9 = 36 + 10 − 1 = 45.', vis: { t: 'recta', desde: 30, hasta: 50, inicio: 36, saltos: [10, -1] } },
      { txt: 'Con 19 pasa igual: sumo 20 y quito 1. 36 + 19 = 36 + 20 − 1 = 55.', vis: { t: 'recta', desde: 30, hasta: 70, inicio: 36, saltos: [20, -1] } }
    ],
    guiada() {
      const { a, k } = gen(2), m = k === 9 ? 10 : 20, r = a + k;
      return {
        pasos: [
          { txt: `${k} es casi ${m}. Primero sumo ${m}:`, q: `${a} + ${m} = ?`, r: a + m, vis: rect(a, k, 1), extra: [r, a + m + 1, a + m - 10] },
          { txt: 'Me he pasado 1. Ahora quito 1:', q: `${a + m} − 1 = ?`, r, vis: rect(a, k, 2), extra: [a + m, a + m - 2, a + m + 1] }
        ],
        final: { txt: 'Entonces:', q: `${a} + ${k} = ?`, r, vis: rect(a, k, 2), extra: [a + m, r + 2, r - 2, a + k + 10] }
      };
    },
    item(nivel) {
      const { a, k } = gen(nivel), r = a + k, m = k === 9 ? 10 : 20;
      const extra = k === 9 ? [a + 10, a + 8, a + 11, a + 19] : [a + 20, a + 10, a + 18, a + 21];
      return { q: `${a} + ${k}`, r, vis: rect(a, k, 2), extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada suma con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { a, k } = gen(3); if (!us.has(a + k)) { us.add(a + k); out.push([`${a} + ${k}`, a + k]); } } return out; }
    }
  });
}
