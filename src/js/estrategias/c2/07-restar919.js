/* 2.º · Truco 7 · Restar 9 y 19 */
{
  const E = (r, l) => l.filter(x => x[0] >= 0 && x[0] !== r);
  // k = 9 → −10 +1 ; k = 19 → −20 +1
  const rect = (a, k, pasos) => { const dd = 10 * Math.floor(a / 10), s = k === 9 ? [-10, 1] : [-20, 1]; return { t: 'recta', desde: Math.max(0, dd - (k === 9 ? 10 : 20)), hasta: dd + 10, inicio: a, saltos: s.slice(0, pasos) }; };
  const gen = (nivel) => {
    const k = nivel === 1 ? 9 : pick([9, 19]);
    const a = nivel === 1 ? rnd(21, 69) : nivel === 2 ? rnd(k === 9 ? 21 : 30, 85) : rnd(k === 9 ? 21 : 30, 99);
    return { a, k };
  };
  ESTR.add({
    id: 'restar919', curso: 2, orden: 7, tri: 2,
    n: 'Restar 9 y 19', ic: '−9', desc: 'Resto 10 (o 20) y devuelvo 1',
    truco: 'Resto 10 o 20 y devuelvo 1',
    tutorial: [
      { txt: 'Para restar 9, resto 10 y me paso por 1. Empiezo en 52.', vis: { t: 'recta', desde: 40, hasta: 60, inicio: 52, saltos: [-10] } },
      { txt: '52 − 10 = 42. He quitado 1 de más, así que lo devuelvo: 42 + 1 = 43.', vis: { t: 'recta', desde: 40, hasta: 60, inicio: 52, saltos: [-10, 1] } },
      { txt: 'Truco: 52 − 9 = 52 − 10 + 1 = 43.', vis: { t: 'recta', desde: 40, hasta: 60, inicio: 52, saltos: [-10, 1] } },
      { txt: 'Tu turno: 57 − 9. Resta 10 y devuelve 1. Toca el número donde llegas.', toca: { t: 'recta', desde: 40, hasta: 60, inicio: 57, objetivo: 48 } },
      { txt: 'Con 19 pasa igual: resto 20 y devuelvo 1. 52 − 19 = 52 − 20 + 1 = 33.', vis: { t: 'recta', desde: 30, hasta: 60, inicio: 52, saltos: [-20, 1] } }
    ],
    guiada() {
      const { a, k } = gen(2), m = k === 9 ? 10 : 20, r = a - k;
      return {
        pasos: [
          { txt: `${k} es casi ${m}. Primero resto ${m}:`, q: `${a} − ${m} = ?`, r: a - m, vis: rect(a, k, 1), extra: [r, a - m - 1, a - m + 10], errores: E(a - m, [[r, `Eso es el resultado final. Ahora solo resta ${m}.`], [a - m - 1, `Solo restas ${m}, nada más.`], [a - m + 10, `Has restado ${m - 10}. Resta ${m}.`]]) },
          { txt: 'He quitado 1 de más. Lo devuelvo:', q: `${a - m} + 1 = ?`, r, vis: rect(a, k, 2), extra: [a - m, a - m + 2, a - m - 1], errores: E(r, [[a - m, 'Has quitado 1 de más. Devuélvelo.'], [a - m + 2, 'Solo hay que devolver 1.'], [a - m - 1, 'Hay que devolver 1: es sumar, no restar.']]) }
        ],
        final: { txt: 'Entonces:', q: `${a} − ${k} = ?`, r, vis: rect(a, k, 2), extra: [a - m, r + 2, r - 2, a - k - 10], errores: E(r, [[a - m, `Has restado ${m}. Quitaste 1 de más: devuélvelo.`], [r + 2, 'Solo hay que devolver 1.'], [r - 2, 'Devuelve 1, no sigas quitando.']]) }
      };
    },
    item(nivel) {
      const { a, k } = gen(nivel), r = a - k;
      const extra = k === 9 ? [a - 10, a - 8, a - 11, a - 20] : [a - 20, a - 10, a - 18, a - 22];
      const m = k === 9 ? 10 : 20;
      const errores = E(r, [[a - m, `Has restado ${m}. Te pasaste: devuelve 1.`], [r - 2, 'Devuelve 1 al final, no sigas quitando.'], [r + 2, 'Solo hay que devolver 1.'], [a - k - 10, `Restas ${m} y devuelves 1. No restes ${k} y ${m}.`]]);
      return { q: `${a} − ${k}`, r, vis: rect(a, k, 2), extra, errores };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada resta con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { a, k } = gen(3); if (!us.has(a - k)) { us.add(a - k); out.push([`${a} − ${k}`, a - k]); } } return out; }
    }
  });
}
