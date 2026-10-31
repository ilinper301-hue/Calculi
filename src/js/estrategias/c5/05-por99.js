/* 5.º · Truco 5 · Por 99 y por 101 (×100 menos o más el número) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
  // Recta cerca de n × 100; 'm' = salto (−n para ×99, +n para ×101); sin salto: solo el punto 100n
  const rc = (n, d, conSalto) => {
    const base = 100 * n, w = 10 * Math.ceil(n / 10);
    return d === 99 ? { t: 'recta', desde: base - w, hasta: base, inicio: base, saltos: conSalto ? [-n] : [] } : { t: 'recta', desde: base, hasta: base + w, inicio: base, saltos: conSalto ? [n] : [] };
  };
  ESTR.add({
    id: 'por99', curso: 5, orden: 5, tri: 1,
    n: 'Por 99 y por 101', ic: '×99', desc: '×100 y quito o añado',
    truco: 'Multiplico por 100 y quito o añado el número',
    tutorial: [
      { txt: '99 es casi 100: le falta 1. Entonces 6 × 99 es casi 6 × 100 = 600.', vis: { t: 'recta', desde: 590, hasta: 600, inicio: 600, saltos: [] } },
      { txt: 'Con 6 × 100 he puesto una vez 6 de más. Lo quito: 600 − 6 = 594.', vis: { t: 'recta', desde: 590, hasta: 600, inicio: 600, saltos: [-6] } },
      { txt: 'Por 101 es al revés: 101 es 100 y uno más. 6 × 101 = 600 + 6 = 606.', vis: { t: 'recta', desde: 600, hasta: 610, inicio: 600, saltos: [6] } },
      { txt: 'Truco: ×99 = ×100 y quito el número. ×101 = ×100 y añado el número.', vis: { t: 'recta', desde: 590, hasta: 610, inicio: 600, saltos: [6] } },
      { txt: 'Tu turno: 7 × 99 es 700 − 7. Toca en la recta el número al que llegas.', toca: { t: 'recta', desde: 690, hasta: 700, inicio: 700, objetivo: 693 } },
    { txt: 'Otro ejemplo: 23 × 99 = 2300 − 23 = 2277.', vis: { t: 'recta', desde: 2250, hasta: 2300, inicio: 2300, saltos: [-23] } }
    ],
    guiada() {
      const n = rnd(3, 9), d = pick([99, 101]), base = 100 * n, r = d * n, s = d === 99 ? '−' : '+';
      return {
        pasos: [
          { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: base, vis: rc(n, d, false), extra: [10 * n, 1000 * n, r], errores: ER(base, [[10 * n, 'Por 100 son dos ceros, no uno.'], [1000 * n, 'Por 100 son dos ceros, no tres.'], [r, 'Aún no: primero solo ×100.']]) },
          { txt: d === 99 ? `Me he pasado una vez ${n}. Lo quito:` : `Falta una vez ${n}. Lo añado:`, q: `${base} ${s} ${n} = ?`, r, vis: rc(n, d, true), extra: [base, d === 99 ? base - 1 : base + 1, d === 99 ? base + n : base - n], errores: ER(r, [[base, `Aún falta ${d === 99 ? 'quitar' : 'añadir'} ${n}.`], [d === 99 ? base - 1 : base + 1, `No es 1: es ${n}.`], [d === 99 ? base + n : base - n, d === 99 ? 'Es una resta: quita, no sumes.' : 'Es una suma: añade, no restes.']]) }
        ],
        final: { txt: 'Entonces:', q: `${n} × ${d} = ?`, r, vis: rc(n, d, true), extra: [base, d === 99 ? base - 1 : base + 1, d === 99 ? 101 * n : 99 * n], errores: ER(r, [[base, 'Has hecho ×100. Ajusta con el número.'], [d === 99 ? 101 * n : 99 * n, d === 99 ? 'Eso es ×101. Para ×99 hay que quitar.' : 'Eso es ×99. Para ×101 hay que añadir.'], [d === 99 ? base - 1 : base + 1, `No es 1: ajusta con ${n}.`]]) }
      };
    },
    item(nivel) {
      const d = pick([99, 101]), n = nivel === 1 ? rnd(2, 9) : nivel === 2 ? rnd(11, 30) : rnd(12, 99), r = d * n, base = 100 * n;
      const extra = d === 99 ? [base, base - 1, base - 10, 101 * n] : [base, base + 1, base + 10, 99 * n];
      const errores = ER(r, [[base, d === 99 ? 'Has hecho ×100. Ahora quita el número.' : 'Has hecho ×100. Ahora añade el número.'], [d === 99 ? 101 * n : 99 * n, d === 99 ? 'Eso es ×101. Para ×99 hay que quitar.' : 'Eso es ×99. Para ×101 hay que añadir.'], [d === 99 ? base - 1 : base + 1, `No es 1: ajusta con ${n}.`], [d === 99 ? base - 10 : base + 10, `Ajusta con ${n}, no con 10.`]]);
      return { q: rnd(0, 1) ? `${n} × ${d} = ?` : `${d} × ${n} = ?`, r, vis: rc(n, d, true), extra, errores };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { return shuffle([[2, 99], [3, 99], [5, 99], [7, 99], [9, 99], [12, 99], [2, 101], [4, 101], [6, 101], [8, 101], [11, 101], [15, 101]]).slice(0, 6).map(([n, d]) => [`${n} × ${d}`, n * d]); }
    }
  });
})();
