/* 6.º · Truco 1 · Por 0,1 y por 0,01 */
(() => {
  const R = x => +x.toFixed(3);
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
  ESTR.add({
    id: 'por01', curso: 6, orden: 1, tri: 1,
    n: 'Por 0,1 y por 0,01', ic: '×0,1', desc: 'Es dividir entre 10 y entre 100',
    truco: 'Por 0,1 divido entre 10; por 0,01, entre 100',
    tutorial: [
      { txt: '0,1 es una décima: uno de los 10 trozos en que partimos la unidad.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 1, valor: 0.1 } },
      { txt: 'Multiplicar por 0,1 es coger una décima parte. 50 × 0,1 = 50 : 10 = 5.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 50, valor: 5 } },
      { txt: 'Tu turno: ¿cuánto es 30 × 0,1? Toca la respuesta.', toca: { t: 'elige', q: '30 × 0,1 = ?', ops: [3, 300, 0.3, 30], r: 3 } },
      { txt: '0,01 es una centésima: una casilla de 100. Multiplicar por 0,01 es dividir entre 100.', vis: { t: 'cien', n: 1 } },
      { txt: '45 × 0,01 = 45 : 100 = 0,45. La coma se mueve dos lugares a la izquierda.', vis: { t: 'cien', n: 45 } }
    ],
    guiada() {
      const dec = rnd(0, 1) === 0, n = pick([23, 47, 36, 58, 64, 75, 82, 19, 34, 91]);
      if (dec) return {
        pasos: [
          { txt: 'Una décima es 1 partido en 10:', q: '1 : 10 = ?', r: 0.1, vis: { t: 'barra', partes: 10, marcadas: 1, total: 1, valor: 0.1, oculto: 'valor' }, extra: [10, 1, 0.01], errores: ER(0.1, [[10, 'Eso es 1 × 10. Una décima es 1 partido en 10.'], [1, 'Una décima es menos que 1: es un trozo de 10.'], [0.01, 'Eso es una centésima. Una décima es 1 : 10.']]) },
          { txt: `Ahora con tu número, ${fmt(n)} entre 10:`, q: `${fmt(n)} : 10 = ?`, r: R(n / 10), vis: { t: 'barra', partes: 10, marcadas: 1, total: n, valor: R(n / 10), oculto: 'valor' }, extra: [n * 10, R(n / 100)], errores: ER(R(n / 10), [[n * 10, 'Has multiplicado por 10. Aquí hay que dividir entre 10.'], [R(n / 100), 'Has dividido entre 100. Ahora es entre 10.']]) }
        ],
        final: { txt: 'Entonces:', q: `${fmt(n)} × 0,1 = ?`, r: R(n / 10), vis: { t: 'barra', partes: 10, marcadas: 1, total: n, valor: R(n / 10), oculto: 'valor' }, extra: [n * 10, R(n / 100), n], errores: ER(R(n / 10), [[n * 10, 'Has multiplicado por 10. ×0,1 es dividir entre 10.'], [R(n / 100), 'Has dividido entre 100. 0,1 es una décima: entre 10.'], [n, 'Multiplicar por 0,1 hace el número más pequeño.']]) }
      };
      return {
        pasos: [
          { txt: 'Una centésima es 1 partido en 100:', q: '1 : 100 = ?', r: 0.01, vis: { t: 'cien', n: 1 }, extra: [0.1, 100, 1], errores: ER(0.01, [[0.1, 'Eso es 1 : 10. Una centésima es 1 : 100.'], [100, 'Has multiplicado. Una centésima es 1 partido en 100.'], [1, 'Una centésima es mucho menos que 1.']]) },
          { txt: `Ahora con tu número, ${fmt(n)} entre 100:`, q: `${fmt(n)} : 100 = ?`, r: R(n / 100), extra: [R(n / 10), n * 100, R(n / 1000)], errores: ER(R(n / 100), [[R(n / 10), 'Eso es entre 10. Aquí es entre 100: dos lugares.'], [n * 100, 'Has multiplicado por 100. Hay que dividir.'], [R(n / 1000), 'Te has pasado: solo dos lugares con la coma.']]) }
        ],
        final: { txt: 'Entonces:', q: `${fmt(n)} × 0,01 = ?`, r: R(n / 100), extra: [R(n / 10), n, R(n / 1000)], errores: ER(R(n / 100), [[R(n / 10), 'Has movido la coma un lugar. ×0,01 la mueve dos.'], [R(n / 1000), 'Has movido la coma tres lugares. Son solo dos.'], [n * 100, 'Has multiplicado por 100. ×0,01 es dividir entre 100.']]) }
      };
    },
    item(nivel) {
      let n, f;
      if (nivel === 1) { n = 10 * rnd(2, 9); f = 0.1; }
      else if (nivel === 2) {
        if (rnd(0, 1)) { f = 0.1; n = rnd(0, 1) ? rnd(12, 99) : 10 * rnd(10, 99); if (n % 10 === 0 && n < 100) n += 3; }
        else { f = 0.01; n = rnd(0, 1) ? 100 * rnd(2, 9) : rnd(11, 99); }
      } else { f = rnd(0, 1) ? 0.1 : 0.01; n = f === 0.1 ? rnd(101, 999) : rnd(101, 2999); }
      const r = R(n * f), txtF = f === 0.1 ? '0,1' : '0,01';
      const extra = f === 0.1 ? [R(n * 10), R(n / 100), n] : [R(n / 10), R(n * 10), R(n / 1000)];
      const errores = ER(r, f === 0.1
        ? [[R(n * 10), 'Has multiplicado por 10. ×0,1 es dividir entre 10.'], [R(n / 100), 'Has dividido entre 100. ×0,1 es solo entre 10.'], [n, 'Multiplicar por 0,1 hace el número más pequeño.']]
        : [[R(n / 10), 'Eso es ×0,1. Con ×0,01 la coma se mueve dos lugares.'], [R(n * 100), 'Has multiplicado por 100. ×0,01 es dividir entre 100.'], [R(n / 1000), 'Te has pasado: ×0,01 es entre 100, no entre 1000.']]);
      const it = { q: `${fmt(n)} × ${txtF} = ?`, r, extra, errores };
      if (f === 0.1) it.vis = { t: 'barra', partes: 10, marcadas: 1, total: n, valor: r, oculto: 'valor' };
      return it;
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() {
        const a = shuffle([12, 23, 34, 45, 56, 67, 78, 89, 91, 38]).slice(0, 3), b = shuffle([14, 25, 36, 47, 58, 69, 72, 83, 95, 16]).slice(0, 3);
        return shuffle([...a.map(n => [`${fmt(n)} × 0,1`, fmt(R(n / 10))]), ...b.map(n => [`${fmt(n)} × 0,01`, fmt(R(n / 100))])]);
      }
    }
  });
})();
