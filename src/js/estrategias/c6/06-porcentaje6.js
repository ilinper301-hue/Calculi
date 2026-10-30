/* 6.º · Truco 6 · Porcentajes rápidos */
(() => {
  const R = x => +x.toFixed(3);
  ESTR.add({
    id: 'porcentaje6', curso: 6, orden: 6, tri: 2,
    n: 'Porcentajes rápidos', ic: '15%', desc: '1 %, 5 %, 15 % y 75 %',
    truco: 'Parto el porcentaje en trozos fáciles: 10 %, 5 %, 50 %...',
    tutorial: [
      { txt: '1 % es una casilla de 100. Es dividir entre 100: el 1 % de 300 es 3.', vis: { t: 'cien', n: 1 } },
      { txt: '5 % es la mitad del 10 %. El 10 % de 80 es 8; el 5 % es 4.', vis: { t: 'cien', n: 5 } },
      { txt: '15 % es 10 % + 5 %. De 80: 8 + 4 = 12.', vis: { t: 'cien', n: 15 } },
      { txt: '75 % es 50 % + 25 %: la mitad y la cuarta parte. De 80: 40 + 20 = 60.', vis: { t: 'cien', n: 75 } }
    ],
    guiada() {
      if (rnd(0, 1)) {
        const n = 20 * rnd(2, 10);
        return {
          pasos: [
            { txt: 'El 10 % es dividir entre 10:', q: `10 % de ${n} = ?`, r: n / 10, vis: { t: 'cien', n: 10 }, extra: [n / 100, n / 5, n / 2] },
            { txt: 'El 5 % es la mitad del 10 %:', q: `5 % de ${n} = ?`, r: n / 20, vis: { t: 'cien', n: 5 }, extra: [n / 10, n / 5, n / 2] }
          ],
          final: { txt: 'El 15 % es 10 % + 5 %:', q: `15 % de ${n} = ?`, r: 3 * n / 20, vis: { t: 'cien', n: 15 }, extra: [n / 10, n / 20, n * 15 / 100 * 2] }
        };
      }
      const n = 4 * rnd(3, 20);
      return {
        pasos: [
          { txt: 'El 50 % es la mitad:', q: `50 % de ${n} = ?`, r: n / 2, vis: { t: 'cien', n: 50 }, extra: [n / 4, n / 10, n * 2] },
          { txt: 'El 25 % es la mitad de la mitad:', q: `25 % de ${n} = ?`, r: n / 4, vis: { t: 'cien', n: 25 }, extra: [n / 2, n / 10, n / 8] }
        ],
        final: { txt: 'El 75 % es 50 % + 25 %:', q: `75 % de ${n} = ?`, r: 3 * n / 4, vis: { t: 'cien', n: 75 }, extra: [n / 2, n / 4, n * 3 / 10] }
      };
    },
    item(nivel) {
      const p = pick([1, 5, 15, 75]);
      let n;
      if (nivel === 1) n = p === 1 ? 100 * rnd(1, 9) : 20 * rnd(1, p === 5 ? 10 : 5);
      else if (nivel === 2) n = p === 1 ? 100 * rnd(2, 12) : p === 75 ? 4 * rnd(3, 30) : 20 * rnd(2, p === 5 ? 15 : 12);
      else n = p === 1 ? 10 * rnd(11, 99) : 10 * rnd(3, p === 5 ? 50 : 40);
      const r = R(p * n / 100);
      const ex = { 1: [r * 10, R(r / 10), n / 10], 5: [r * 2, R(r / 2), R(r * 10), n / 20 * 3], 15: [n / 10, n / 20, R(r * 2), R(r / 10)], 75: [n / 2, n / 4, R(n * 0.075), R(r + n / 4)] }[p].map(R);
      return { q: `${p} % de ${fmt(n)} = ?`, r, vis: { t: 'cien', n: p }, extra: ex };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada porcentaje con su truco',
      pares() { return shuffle([['50 %', 'entre 2'], ['25 %', 'entre 4'], ['20 %', 'entre 5'], ['10 %', 'entre 10'], ['5 %', 'entre 20'], ['1 %', 'entre 100'], ['75 %', '3/4']]).slice(0, 6); }
    }
  });
})();
