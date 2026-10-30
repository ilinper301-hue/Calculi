/* 5.º · Truco 9 · Fracciones equivalentes (lo que hago abajo, lo hago arriba) */
(function () {
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
      { txt: 'Truco: lo que hago abajo, lo hago arriba. 3/4 = 6/8, porque 3 × 2 = 6 y 4 × 2 = 8.', vis: bar(6, 8) }
    ],
    guiada() {
      const { p, q, k } = base(6, 4, 20);
      if (rnd(0, 1)) { // ampliar: p/q = ?/(q·k)
        const d = q * k;
        return {
          pasos: [
            { txt: `¿Por cuánto multiplico el ${q} para llegar a ${d}?`, q: `${q} × ? = ${d}`, r: k, vis: bar(p, q), extra: [k + 1, k - 1, d - q] },
            { txt: `Lo mismo arriba: multiplico el ${p} por ${k}.`, q: `${p} × ${k} = ?`, r: p * k, vis: bar(p, q), extra: [p + k, p * k + k, d] }
          ],
          final: { txt: 'Entonces:', q: `${p}/${q} = ?/${d}`, r: p * k, vis: bar(p, q), extra: [p + (d - q), p + k, d, p * k + 1] }
        };
      }
      const a = p * k, b = q * k; // simplificar: a/b = p/?
      return {
        pasos: [
          { txt: `¿Entre cuánto divido el ${a} para llegar a ${p}?`, q: `${a} : ? = ${p}`, r: k, vis: bar(a, b), extra: [k + 1, k - 1, a - p] },
          { txt: `Lo mismo abajo: divido el ${b} entre ${k}.`, q: `${b} : ${k} = ?`, r: q, vis: bar(a, b), extra: [b - k, q + 1, q - 1] }
        ],
        final: { txt: 'Entonces:', q: `${a}/${b} = ${p}/?`, r: q, vis: bar(a, b), extra: [b - (a - p), b, q + 1, q - 1] }
      };
    },
    item(nivel) {
      const { p, q, k } = nivel === 1 ? base(5, 2, 12) : nivel === 2 ? base(6, 4, 16) : base(8, 6, 20);
      const a = p * k, b = q * k, tipo = rnd(0, 3);
      if (tipo === 0) return { q: `${a}/${b} = ?/${q}`, r: p, vis: bar(a, b), extra: [a - (b - q), a, p + 1, q] };  // simplificar: falta el numerador
      if (tipo === 1) return { q: `${a}/${b} = ${p}/?`, r: q, vis: bar(a, b), extra: [b - (a - p), b, q + 1, q - 1] };   // simplificar: falta el denominador
      if (tipo === 2) return { q: `${p}/${q} = ?/${b}`, r: a, vis: bar(p, q), extra: [p + (b - q), b, p + k, a + 1] };   // ampliar: falta el numerador
      return { q: `${p}/${q} = ${a}/?`, r: b, vis: bar(p, q), extra: [q + (a - p), a, b + 1, b - 1] };                  // ampliar: falta el denominador
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
