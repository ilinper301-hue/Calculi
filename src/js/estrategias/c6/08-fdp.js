/* 6.º · Truco 8 · Fracción, decimal y % */
(() => {
  const R = x => +x.toFixed(3);
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
  const FR1 = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];
  const FR2 = FR1.concat([[1, 20], [3, 20], [7, 20], [9, 20], [1, 25], [3, 25], [4, 25], [7, 25]]);
  const FR3 = FR2.concat([[1, 8], [3, 8], [5, 8], [7, 8], [1, 50], [7, 50]]);
  const A = (n, d) => ({ q: `${n}/${d} = ? %`, r: R(n * 100 / d), vis: d <= 20 ? { t: 'barra', partes: d, marcadas: n } : undefined, extra: [n * d, R(100 / d), R(n * 10 / d), R(100 - n * 100 / d), n + d],
    errores: ER(R(n * 100 / d), [[n * d, 'Has multiplicado arriba por abajo. Piensa: ¿cuántos de 100?'], [R(100 / d), `Eso es lo que vale un trozo. Hay ${n}.`], [R(n * 10 / d), 'Es sobre 100, no sobre 10: te falta un cero.'], [R(100 - n * 100 / d), 'Eso es lo que falta hasta 100. Cuenta los trozos pintados.'], [n + d, 'No es sumar. Cada trozo vale 100 : ' + d + '.']]) });
  const B = (x, v) => { const r = R(x * 100); return { q: `${fmt(x)} = ? %`, r, vis: v, extra: [R(r / 10), R(r * 10), R(x * 10), R(x)],
    errores: ER(r, [[R(r / 10), 'Mueve la coma dos lugares a la derecha, no uno.'], [R(r * 10), 'Te has pasado: solo hay que mover la coma dos lugares.'], [R(x * 10), 'Para pasar a % se multiplica por 100.'], [R(x), 'Falta pasarlo a porcentaje: ×100.']]) }; };
  const C = (k, d) => { const p = k * 100 / d; return { q: `${p} % = ?/${d}`, r: k, vis: d <= 10 ? { t: 'barra', partes: d, marcadas: k } : { t: 'cien', n: p }, extra: [p, R(p / 10), k + 1, k - 1, d - k],
    errores: ER(k, [[p, `Eso es el porcentaje. Busca cuántas partes de ${d} son.`], [R(p / 10), `Piensa en cuánto vale cada parte de ${d}.`], [d - k, 'Eso es lo que sobra. Cuenta las partes que ocupa el porcentaje.'], [k + 1, 'Te has pasado por una parte.'], [k - 1, 'Te falta una parte.']]) }; };
  ESTR.add({
    id: 'fdp', curso: 6, orden: 8, tri: 2,
    n: 'Fracción, decimal y %', ic: '¾', desc: 'Tres formas de decir lo mismo',
    truco: 'Paso a centésimas: cuántos de 100',
    tutorial: [
      { txt: 'Fracción, decimal y porcentaje dicen lo mismo. 3/4 son 3 trozos de una barra partida en 4.', vis: { t: 'barra', partes: 4, marcadas: 3 } },
      { txt: 'Un trozo de 4 es 25 de 100. Tres trozos: 3 × 25 = 75. Así, 3/4 = 75 %.', vis: { t: 'cien', n: 75 } },
      { txt: 'Un decimal con décimas: 0,2 son 2 décimas, es decir, 20 de 100. Así, 0,2 = 20 %.', vis: { t: 'barra', partes: 10, marcadas: 2 } },
      { txt: 'Y 0,35 son 35 centésimas: 35 casillas de 100. Así, 0,35 = 35 %.', vis: { t: 'cien', n: 35 } },
      { txt: 'Tu turno: esta barra de 5 partes es el 100 %. Toca las partes que forman el 60 %.', toca: { t: 'barra', partes: 5, objetivo: 3 } },
    { txt: 'Al revés: 40 % son 40 casillas. En una barra de 5 partes, ocupan 2: 40 % = 2/5.', vis: { t: 'barra', partes: 5, marcadas: 2 } }
    ],
    guiada() {
      const d = pick([4, 5, 10]), n = rnd(2, d - 1), u = 100 / d;
      return {
        pasos: [
          { txt: `Una barra de ${d} partes es el 100 %. ¿Cuánto vale una parte?`, q: `100 : ${d} = ?`, r: u, vis: { t: 'barra', partes: d, marcadas: 1 }, extra: [d, u * 2, u + 5], errores: ER(u, [[d, 'Eso es el número de partes. Reparte 100 entre ellas.'], [u * 2, 'Te has pasado: 100 entre ' + d + ' es menos.']]) },
          { txt: `Ahora cojo ${n} partes:`, q: `${n} × ${u} = ?`, r: n * u, vis: { t: 'barra', partes: d, marcadas: n }, extra: [u, n * d, u + n], errores: ER(n * u, [[u, `Eso es una sola parte. Cogemos ${n}.`], [n * d, 'No multipliques por el nº de partes, sino por lo que vale cada una.']]) }
        ],
        final: { txt: 'Entonces:', q: `${n}/${d} = ? %`, r: n * u, vis: { t: 'barra', partes: d, marcadas: n }, extra: [u, n * d, n * 10], errores: ER(n * u, [[u, `Eso es una sola parte. Aquí hay ${n} pintadas.`], [n * d, 'Has multiplicado arriba por abajo. Cada parte vale ' + u + '.'], [n * 10, `Cada parte vale ${u}, no 10.`]]) }
      };
    },
    item(nivel) {
      const tipo = nivel === 1 ? pick(['A', 'A', 'B']) : pick(['A', 'B', 'C']);
      if (tipo === 'A') { const [n, d] = pick(nivel === 1 ? FR1.filter(f => f[1] <= 10) : nivel === 2 ? FR2 : FR3); return A(n, d); }
      if (tipo === 'B') {
        if (nivel === 1) { const x = rnd(1, 9) / 10; return B(x, { t: 'barra', partes: 10, marcadas: Math.round(x * 10) }); }
        if (nivel === 2) { const x = pick([0.25, 0.75, 0.4, 0.6, 0.05, 0.15, 0.35, 0.8]); return B(x, { t: 'cien', n: Math.round(x * 100) }); }
        const x = pick([0.35, 0.62, 0.08, 1.2, 1.5, 0.125, 0.07, 0.48, 2]); return B(x, undefined);
      }
      const ds = nivel <= 2 ? [2, 4, 5, 10] : [4, 5, 10, 20, 25], d = pick(ds), k = rnd(1, d - 1);
      return C(k, d);
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada número con su porcentaje',
      pares() {
        const T = { 10: ['1/10', '0,1'], 20: ['1/5', '0,2'], 25: ['1/4', '0,25'], 30: ['3/10', '0,3'], 40: ['2/5', '0,4'], 50: ['1/2', '0,5'], 60: ['3/5', '0,6'], 70: ['7/10', '0,7'], 75: ['3/4', '0,75'], 80: ['4/5', '0,8'], 90: ['9/10', '0,9'] };
        return shuffle(Object.keys(T)).slice(0, 6).map(p => [pick(T[p]), `${p} %`]);
      }
    }
  });
})();
