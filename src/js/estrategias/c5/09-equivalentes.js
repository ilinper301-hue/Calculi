/* 5.º · Truco 9 · Fracciones equivalentes (lo que hago abajo, lo hago arriba) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
  const mcd = (a, b) => b ? mcd(b, a % b) : a;
  // Fracción reducida p/q (p<q) y factor k
  const base = (qMax, kMax, den) => {
    let p, q, k;
    do { q = rnd(2, qMax); p = rnd(1, q - 1); } while (mcd(p, q) !== 1);
    k = rnd(2, kMax); if (den) while (q * k > den) k--;
    return { p, q, k: Math.max(2, k) };
  };
  const bar = (a, b) => ({ t: 'barra', partes: b, marcadas: a });
  ESTR.add({
    id: 'equivalentes', curso: 5, orden: 9, tri: 2,
    n: 'Fracciones equivalentes', ic: '2/4', desc: 'Arriba y abajo, lo mismo',
    truco: 'Lo que hago abajo, lo hago arriba',
    tutorial: [
      { txt: 'Esta barra está dividida en 2 partes y una está sombreada: es 1/2.', vis: bar(1, 2) },
      { txt: 'Partimos cada trozo en 2. Ahora hay 4 trozos y 2 sombreados: 2/4.', vis: bar(2, 4) },
      { txt: 'Se ve la misma cantidad: 1/2 = 2/4. Multiplico arriba y abajo por 2.', vis: bar(2, 4) },
      { txt: 'También al revés: 6/8 = ?/4. Divido arriba y abajo entre 2: 3/4.', vis: bar(6, 8) },
      { txt: 'Tu turno: 3/4 = ?/8. Toca las partes de la barra de 8 que valen lo mismo que 3/4.', toca: { t: 'barra', partes: 8, objetivo: 6 } },
    { txt: 'Truco: lo que hago abajo, lo hago arriba. 3/4 = 6/8, porque 3 × 2 = 6 y 4 × 2 = 8.', vis: bar(6, 8) }
    ],
    guiada() {
      const { p, q, k } = base(6, 4, 20);
      if (rnd(0, 1)) { // ampliar: p/q = ?/(q·k)
        const d = q * k;
        return {
          pasos: [
            { txt: `¿Por cuánto multiplico el ${q} para llegar a ${d}?`, q: `${q} × ? = ${d}`, r: k, vis: bar(p, q), extra: [k + 1, k - 1, d - q], errores: ER(k, [[k + 1, `Comprueba: multiplica ${q} por tu número.`], [k - 1, `Comprueba: multiplica ${q} por tu número.`], [d - q, 'Eso es una resta. Busca por cuánto se multiplica.']]) },
            { txt: `Lo mismo arriba: multiplico el ${p} por ${k}.`, q: `${p} × ${k} = ?`, r: p * k, vis: bar(p, q), extra: [p + k, p * k + k, d], errores: ER(p * k, [[p + k, 'Es una multiplicación, no una suma.'], [d, 'Ese es el de abajo. Aquí va el de arriba.']]) }
          ],
          final: { txt: 'Entonces:', q: `${p}/${q} = ?/${d}`, r: p * k, vis: bar(p, q), extra: [p + (d - q), p + k, d, p * k + 1], errores: ER(p * k, [[p + (d - q), `No sumes: abajo multiplicaste por ${k}. Arriba, lo mismo.`], [d, 'Ese es el de abajo. Arriba va otro número.'], [p + k, `Con ${k} se multiplica, no se suma.`]]) }
        };
      }
      const a = p * k, b = q * k; // simplificar: a/b = p/?
      return {
        pasos: [
          { txt: `¿Entre cuánto divido el ${a} para llegar a ${p}?`, q: `${a} : ? = ${p}`, r: k, vis: bar(a, b), extra: [k + 1, k - 1, a - p], errores: ER(k, [[k + 1, `Comprueba: divide ${a} entre tu número.`], [k - 1, `Comprueba: divide ${a} entre tu número.`], [a - p, 'Eso es una resta. Busca entre cuánto se divide.']]) },
          { txt: `Lo mismo abajo: divido el ${b} entre ${k}.`, q: `${b} : ${k} = ?`, r: q, vis: bar(a, b), extra: [b - k, q + 1, q - 1], errores: ER(q, [[b - k, 'Es una división, no una resta.'], [q + 1, 'Revisa la división.'], [q - 1, 'Revisa la división.']]) }
        ],
        final: { txt: 'Entonces:', q: `${a}/${b} = ${p}/?`, r: q, vis: bar(a, b), extra: [b - (a - p), b, q + 1, q - 1], errores: ER(q, [[b - (a - p), `No restes: arriba dividiste entre ${k}. Abajo, lo mismo.`], [b, 'Ese es el de abajo de antes. Hay que dividirlo.'], [p, 'Ese es el de arriba. Abajo va otro número.']]) }
      };
    },
    item(nivel) {
      const { p, q, k } = nivel === 1 ? base(5, 2, 12) : nivel === 2 ? base(6, 4, 16) : base(8, 6, 20);
      const a = p * k, b = q * k, tipo = rnd(0, 3);
      if (tipo === 0) return { q: `${a}/${b} = ?/${q}`, r: p, vis: bar(a, b), extra: [a - (b - q), a, p + 1, q], errores: ER(p, [[a - (b - q), `No restes: abajo dividiste entre ${k}. Arriba, lo mismo.`], [a, 'Ese es el de arriba de antes. Hay que dividirlo.'], [q, 'Ese es el de abajo. Arriba va otro número.']]) };  // simplificar: falta el numerador
      if (tipo === 1) return { q: `${a}/${b} = ${p}/?`, r: q, vis: bar(a, b), extra: [b - (a - p), b, q + 1, q - 1], errores: ER(q, [[b - (a - p), `No restes: arriba dividiste entre ${k}. Abajo, lo mismo.`], [b, 'Ese es el de abajo de antes. Hay que dividirlo.'], [p, 'Ese es el de arriba. Abajo va otro número.']]) };   // simplificar: falta el denominador
      if (tipo === 2) return { q: `${p}/${q} = ?/${b}`, r: a, vis: bar(p, q), extra: [p + (b - q), b, p + k, a + 1], errores: ER(a, [[p + (b - q), `No sumes: abajo multiplicaste por ${k}. Arriba, lo mismo.`], [b, 'Ese es el de abajo. Arriba va otro número.'], [p + k, `Con ${k} se multiplica, no se suma.`]]) };   // ampliar: falta el numerador
      return { q: `${p}/${q} = ${a}/?`, r: b, vis: bar(p, q), extra: [q + (a - p), a, b + 1, b - 1], errores: ER(b, [[q + (a - p), `No sumes: arriba multiplicaste por ${k}. Abajo, lo mismo.`], [a, 'Ese es el de arriba. Abajo va otro número.'], [q + k, `Con ${k} se multiplica, no se suma.`]]) };                  // ampliar: falta el denominador
    },
    juego: {
      tipo: 'parejas', meta: 'Une las fracciones que valen lo mismo',
      pares() {
        const bases = shuffle([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]]).slice(0, 6);
        const ks = shuffle([2, 3, 4, 5, 2, 3]);
        return bases.map(([p, q], i) => [`${p}/${q}`, `${p * ks[i]}/${q * ks[i]}`]);
      }
    }
  });
})();
