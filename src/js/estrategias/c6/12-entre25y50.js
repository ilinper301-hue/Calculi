/* 6.º · Truco 12 · Dividir entre 25 y entre 50 */
(() => {
  const R = x => +x.toFixed(3);
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
  const rect = (n, d) => ({ t: 'recta', desde: 0, hasta: n, paso: d, inicio: 0, saltos: Array(n / d).fill(d) });
  const barra = (n, d) => ({ t: 'barra', partes: n / d, marcadas: n / d, total: n, valor: d });
  ESTR.add({
    id: 'entre25y50', curso: 6, orden: 12, tri: 3,
    n: 'Entre 25 y entre 50', ic: ':25', desc: '×4 o ×2, y entre 100',
    truco: 'Entre 25: por 4 y entre 100. Entre 50: por 2 y entre 100',
    tutorial: [
      { txt: '¿Cuántos 25 caben en 100? Cuatro: 25, 50, 75, 100. Por eso 100 : 25 = 4.', vis: rect(100, 25) },
      { txt: 'Truco: dividir entre 25 es multiplicar por 4 y dividir entre 100. 300 × 4 = 1200 y 1200 : 100 = 12.', vis: barra(300, 25) },
      { txt: '¿Y entre 50? En 100 caben 2 cincuentas. Dividir entre 50 es multiplicar por 2 y dividir entre 100.', vis: rect(100, 50) },
      { txt: 'Tu turno: ¿cuánto es 400 : 25? Primero ×4 y luego : 100. Toca la respuesta.', toca: { t: 'elige', q: '400 : 25 = ?', ops: [16, 160, 1600, 100], r: 16 } },
    { txt: '350 : 50 → 350 × 2 = 700 → 700 : 100 = 7. Hay 7 trozos de 50 en 350.', vis: barra(350, 50) }
    ],
    guiada() {
      const d = pick([25, 50]), f = 100 / d, k = rnd(4, 16), n = d * k;
      return {
        pasos: [
          { txt: `En 100 caben ${f} trozos de ${d}. Multiplico por ${f}:`, q: `${n} × ${f} = ?`, r: n * f, extra: [n * f * 10, n / f, n * f + 100], errores: ER(n * f, [[n * f * 10, `Te sobra un cero: solo ×${f}.`], [n / f, `Has dividido. Para dividir entre ${d} se multiplica por ${f}.`], [n * f + 100, 'No sumes: multiplica.']]) },
          { txt: 'Ahora divido entre 100:', q: `${n * f} : 100 = ?`, r: k, extra: [k * 10, k / 10, n / 10], errores: ER(k, [[k * 10, 'Te sobra un cero. Dividir entre 100 quita dos ceros.'], [k / 10, 'Has quitado un cero de más.'], [n / 10, 'Entre 10 no: entre 100.']]) }
        ],
        final: { txt: `Así, dividir entre ${d} es × ${f} y : 100:`, q: `${n} : ${d} = ?`, r: k, vis: k <= 12 ? barra(n, d) : undefined, extra: [n * f, k * 10, n / 10, n / f], errores: ER(k, [[n * f, 'Falta dividir entre 100.'], [k * 10, 'Te sobra un cero.'], [n / 10, 'Dividir entre ' + d + ' no es dividir entre 10.'], [n / f, `Has dividido entre ${f}. Entre ${d} es ×${f} y : 100.`]]) }
      };
    },
    item(nivel) {
      const d = rnd(0, 1) ? 25 : 50;
      let n;
      if (nivel === 1) { const k = d === 25 ? rnd(2, 8) : rnd(2, 6); n = d * k; return { q: `${n} : ${d} = ?`, r: k, vis: rect(n, d), extra: [k + 1, k - 1, n / 10, n / 5], errores: ER(k, [[k + 1, `Cuenta otra vez los saltos de ${d}: te has pasado.`], [k - 1, `Cuenta otra vez los saltos de ${d}: te falta uno.`], [n / 10, `No es entre 10: cuenta trozos de ${d}.`], [n / 5, `No es entre 5: cuenta trozos de ${d}.`]]) }; }
      if (nivel === 2) n = d === 25 ? 25 * rnd(4, 20) : 50 * rnd(3, 16);
      else n = rnd(0, 1) ? d * rnd(d === 25 ? 12 : 8, d === 25 ? 60 : 40) : (d === 25 ? 5 * rnd(30, 300) : 10 * rnd(15, 150));
      const r = R(n * (100 / d) / 100), it = { q: `${fmt(n)} : ${d} = ?`, r, extra: [R(n * 100 / d), R(r * 10), R(r / 10), R(n / 4), R(n / 5)],
        errores: ER(r, [[R(n * 100 / d), 'Falta dividir entre 100.'], [R(r * 10), 'Te sobra un cero.'], [R(r / 10), 'Has quitado un cero de más.'], [R(n * (100 / (75 - d)) / 100), `Has usado el truco del ${75 - d}. Aquí se divide entre ${d}.`]]) };
      if (Number.isInteger(r) && r <= 12) it.vis = barra(n, d);
      return it;
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada división con su resultado',
      pares() {
        for (let k = 0; k < 200; k++) {
          const T = [];
          for (let i = 0; i < 6; i++) { const d = i % 2 ? 50 : 25, c = rnd(3, 24); T.push([`${d * c} : ${d}`, c]); }
          if (new Set(T.map(x => x[0])).size === 6 && new Set(T.map(x => x[1])).size === 6) return T;
        }
        return [['100 : 25', 4], ['150 : 50', 3], ['300 : 25', 12], ['400 : 50', 8], ['500 : 25', 20], ['600 : 50', 12]];
      }
    }
  });
})();
