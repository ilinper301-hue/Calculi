/* 2.º · Truco 1 · Amigos del 100 */
{
  ESTR.add({
    id: 'amigos100', curso: 2, orden: 1, tri: 1,
    n: 'Amigos del 100', ic: '100', desc: 'Parejas que suman 100',
    truco: 'Busco el amigo del 100',
    tutorial: [
      { txt: 'Esta cuadrícula tiene 100 cuadraditos. Aquí hay 30 azules. ¿Cuántos faltan para llenarla?', vis: { t: 'cien', n: 30 } },
      { txt: 'Cada barra es una decena. 3 barras azules y 7 naranjas llenan 10 barras: son 100.', vis: { t: 'decenas', grupos: [{ d: 3 }, { d: 7 }] } },
      { txt: '30 y 70 son amigos del 100. Se parecen a 3 y 7, los amigos del 10.', vis: { t: 'parte', total: 100, a: 30, b: 70 } },
      { txt: 'Con 45: primero sumo 5 y llego a 50. Luego sumo 50 y llego a 100.', vis: { t: 'recta', desde: 0, hasta: 100, inicio: 45, saltos: [5, 50] } },
      { txt: 'Truco: 5 + 50 = 55. El amigo del 100 de 45 es 55.', vis: { t: 'parte', total: 100, a: 45, b: 55, oculto: 'b' } }
    ],
    guiada() {
      const d = rnd(1, 8), u = rnd(1, 9), a = 10 * d + u, sig = 10 * (d + 1), r = 100 - a;
      return {
        pasos: [
          { txt: `¿Cuánto le falta a ${a} para llegar a ${sig}?`, q: `${a} + ? = ${sig}`, r: 10 - u, vis: { t: 'recta', desde: 10 * d, hasta: sig, inicio: a, saltos: [10 - u] }, extra: [u, 10 - u + 1, 10 - u - 1].filter(x => x > 0) },
          { txt: `Ahora, ¿cuánto falta de ${sig} a 100?`, q: `${sig} + ? = 100`, r: 100 - sig, vis: { t: 'cien', n: sig }, extra: [100 - a, 100 - sig + 10, 100 - sig - 10] }
        ],
        final: { txt: 'Junto los dos saltos. ¿Cuál es el amigo del 100?', q: `${a} + ? = 100`, r, vis: { t: 'cien', n: a, m: r }, extra: [100 - sig, r + 10, r - 10, 100 - 10 * d] }
      };
    },
    item(nivel) {
      let a;
      if (nivel === 1) a = 10 * rnd(1, 9);
      else if (nivel === 2) a = rnd(0, 1) ? 10 * rnd(1, 9) : 10 * rnd(1, 9) + 5;
      else { do { a = rnd(11, 99); } while (a % 10 === 0 || a === 50); }
      const b = 100 - a, d = Math.floor(a / 10);
      const extra = (nivel === 3 ? [b + 10, b - 10, 100 - 10 * d, b + 1, b - 1] : [b + 10, b - 10, b + 5, b - 5]).filter(x => x !== b && x > 0 && x < 100);
      const vis = { t: 'cien', n: a };
      const f = rnd(0, 2);
      const q = f === 0 ? `${a} + ? = 100` : f === 1 ? `? + ${a} = 100` : `100 = ${a} + ?`;
      return { q, r: b, vis, extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une los amigos del 100',
      pares() { return shuffle([[10, 90], [20, 80], [30, 70], [40, 60], [15, 85], [25, 75], [35, 65], [45, 55]]).slice(0, 6).map(p => rnd(0, 1) ? p : [p[1], p[0]]); }
    }
  });
}
