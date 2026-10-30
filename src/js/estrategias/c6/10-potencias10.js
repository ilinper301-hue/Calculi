/* 6.º · Truco 10 · Potencias de 10 */
(() => {
  const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'];
  const P = e => '10' + SUP[e];
  const R = x => +x.toFixed(3);
  ESTR.add({
    id: 'potencias10', curso: 6, orden: 10, tri: 3,
    n: 'Potencias de 10', ic: '10³', desc: 'Un 1 seguido de ceros',
    truco: 'El exponente me dice cuántos ceros pongo',
    tutorial: [
      { txt: '10² es 10 × 10 = 100. El número pequeño (exponente) dice cuántas veces escribo el 10.', vis: { t: 'decenas', grupos: [{ c: 1 }] } },
      { txt: '10³ = 10 × 10 × 10 = 1000. Un 1 y tres ceros: son 10 placas de 100.', vis: { t: 'barra', partes: 10, marcadas: 10, total: 1000, valor: 100 } },
      { txt: 'Para 4 × 10², pongo dos ceros detrás del 4: 400.', vis: { t: 'decenas', grupos: [{ c: 4 }] } },
      { txt: 'Al revés: 3500 = 35 × 100 = 35 × 10². Cuento los ceros que sobran: dos.' }
    ],
    guiada() {
      const a = rnd(2, 9);
      return {
        pasos: [
          { txt: '10² son dos 10 multiplicados:', q: '10 × 10 = ?', r: 100, extra: [20, 1000, 10] },
          { txt: '10³ es una vez más por 10:', q: '100 × 10 = ?', r: 1000, extra: [110, 100, 10000] }
        ],
        final: { txt: 'Ahora con tu número:', q: `${a} × 10³ = ?`, r: a * 1000, extra: [a * 100, a * 10000, a * 10, a + 1000] }
      };
    },
    item(nivel) {
      if (nivel === 1) {
        const k = rnd(0, 2);
        if (k === 0) return { q: `${P(2)} = ?`, r: 100, vis: { t: 'decenas', grupos: [{ c: 1 }] }, extra: [20, 1000, 10] };
        if (k === 1) { const a = rnd(2, 4); return { q: `${a} × ${P(2)} = ?`, r: a * 100, vis: { t: 'decenas', grupos: [{ c: a }] }, extra: [a * 10, a * 1000, a + 100, a * 20] }; }
        const a = rnd(2, 9); return { q: `${a} × ${P(1)} = ?`, r: a * 10, vis: { t: 'decenas', grupos: [{ d: a }] }, extra: [a * 100, a, a + 10] };
      }
      if (nivel === 2) {
        const k = rnd(0, 2);
        if (k === 0) { const e = rnd(3, 4); return { q: `${P(e)} = ?`, r: Math.pow(10, e), extra: [e * 10, Math.pow(10, e - 1), Math.pow(10, e + 1), 10 + e] }; }
        const a = rnd(2, 9), e = k === 1 ? 2 : 3;
        return { q: `${a} × ${P(e)} = ?`, r: a * Math.pow(10, e), extra: [a * Math.pow(10, e - 1), a * Math.pow(10, e + 1), a * e, a + Math.pow(10, e)] };
      }
      const k = rnd(0, 4);
      if (k === 0) { const e = rnd(4, 6); return rnd(0, 1) ? { txt: `¿Cuántos ceros tiene ${P(e)}?`, q: `${P(e)} tiene ? ceros`, r: e, extra: [e + 1, e - 1, e + 2, e * 10] } : { txt: '¿A qué exponente hay que elevar el 10?', q: `${fmt(Math.pow(10, e))} = 10 elevado a ?`, r: e, extra: [e + 1, e - 1, e + 2, e * 10] }; }
      if (k === 4) { const m = rnd(2, 99), e = rnd(2, 3); return { q: `${fmt(m * Math.pow(10, e))} : ${P(e)} = ?`, r: m, extra: [m * 10, m * Math.pow(10, e), R(m / 10), m + e] }; }
      if (k === 1) { const e = rnd(5, 6); return { q: `${P(e)} = ?`, r: Math.pow(10, e), extra: [Math.pow(10, e - 1), Math.pow(10, e + 1), e * 10] }; }
      if (k === 2) { const a = rnd(2, 9), e = rnd(3, 4); return { q: `${a} × ${P(e)} = ?`, r: a * Math.pow(10, e), extra: [a * Math.pow(10, e - 1), a * Math.pow(10, e + 1), a * e] }; }
      const a = pick([1.5, 2.5, 3.5, 4.5, 7.5]), e = rnd(2, 3), r = a * Math.pow(10, e);
      return { q: `${fmt(a)} × ${P(e)} = ?`, r, extra: [r * 10, r / 10, a * e * 10] };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada potencia con su valor',
      pares() {
        for (let k = 0; k < 200; k++) {
          const L = [], pot = shuffle([2, 3, 4, 5]).slice(0, 3).map(e => [P(e), Math.pow(10, e)]);
          const prod = []; for (let i = 0; i < 3; i++) { const a = rnd(2, 9), e = rnd(1, 3); prod.push([`${a} × ${P(e)}`, a * Math.pow(10, e)]); }
          const T = pot.concat(prod);
          if (new Set(T.map(x => x[1])).size === 6 && new Set(prod.map(x => x[0])).size === 3) return shuffle(T).map(x => [x[0], fmt(x[1])]);
        }
        return [[P(2), '100'], [P(3), '1000'], [P(4), '10.000'], ['2 × 10¹', '20'], ['3 × 10²', '300'], ['5 × 10³', '5000']];
      }
    }
  });
})();
