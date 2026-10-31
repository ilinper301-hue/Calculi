/* Estrategia 12 · Completar la decena (8 + 5 = 8 + 2 + 3) */
ESTR.add({
  id: 'completar10', orden: 12, tri: 3,
  n: 'Completar la decena', ic: '🧩', desc: 'Primero lleno el 10',
  truco: 'Primero lleno la decena',
  tutorial: [
    { txt: 'Quiero sumar 8 + 5. Pongo 8 fichas azules en el marco.', vis: { t: 'marco', a: 8, tam: 20 } },
    { txt: 'Al 8 le faltan 2 para llegar a 10. Las cojo del 5.', vis: { t: 'marco', a: 8, b: 2, tam: 20 } },
    { txt: 'Ya tengo un 10 lleno. Del 5 me sobran 3.', vis: { t: 'marco', a: 8, b: 5, tam: 20 } },
    { txt: '10 y 3 son 13. Así 8 + 5 = 13.', vis: { t: 'marco', a: 10, b: 3, tam: 20 } },
    { txt: 'Tu turno: tengo 8 fichas azules. Toca 2 casillas para llenar la decena (llegar a 10).', toca: { t: 'marco', a: 8, tam: 20, objetivo: 10 } },
    { txt: 'Truco: primero lleno la decena y después sumo lo que sobra.', vis: { t: 'marco', a: 9, b: 4, tam: 20 } }
  ],
  guiada() {
    const a = rnd(6, 9), f = 10 - a, b = rnd(Math.max(f + 1, 11 - a), Math.min(9, 18 - a)), s = b - f;
    return {
      pasos: [
        { txt: `¿Cuánto le falta al ${a} para llegar a 10?`, q: `${a} + ? = 10`, r: f, errores: [[a, `El ${a} ya está. ¿Cuántas faltan para el 10?`], [10, 'El 10 es el total. ¿Cuántas faltan?'], [f + 1, 'Cuenta otra vez los huecos del marco: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== f), vis: { t: 'marco', a, tam: 20 } },
        { txt: `Del ${b} cojo ${f}. ¿Cuántos me sobran?`, q: `${b} = ${f} + ?`, r: s, errores: [[f, `El ${f} es lo que has cogido. Mira cuántos sobran.`], [b, `El ${b} es todo. Quita lo que cogiste.`], [s + 1, 'Cuenta otra vez lo que sobra: te has pasado.'], [s - 1, 'Cuenta otra vez lo que sobra: te falta.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== s), vis: { t: 'marco', a, b, tam: 20 } },
        { txt: 'Ahora sumo 10 y lo que sobra:', q: `10 + ${s} = ?`, r: 10 + s, errores: [[s, 'Falta el 10 lleno.'], [10, 'Falta sumar lo que sobra.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] !== 10 + s), vis: { t: 'marco', a: 10, b: s, tam: 20 } }
      ],
      final: { txt: 'Y ya tengo la suma:', q: `${a} + ${b} = ?`, r: a + b, vis: { t: 'marco', a, b, tam: 20 }, errores: [[10, 'El 10 es la decena llena. Falta lo que sobra.'], [10 + b, 'Has sumado el ' + b + ' entero. Del ' + b + ' cogiste ' + f + ' para el 10.'], [a + b - 1, 'Casi. Cuenta otra vez lo que sobra.'], [a + b + 1, 'Casi. Cuenta otra vez lo que sobra.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a + b) }
    };
  },
  item(nivel) { let it, k = 0; do { it = this._it(nivel); } while (it.q === this._ult && ++k < 8); this._ult = it.q; return it; },
  _it(nivel) {
    let a, b;
    if (nivel === 1) { a = rnd(8, 9); b = rnd(Math.max(3, 11 - a), 6); }
    else if (nivel === 2) { a = rnd(6, 9); b = rnd(Math.max(2, 11 - a), Math.min(9, 18 - a)); }
    else { a = rnd(6, 9); b = rnd(Math.max(5, 11 - a), 9); }
    const r = a + b, f = 10 - a;
    return { q: `${a} + ${b} = ?`, r, vis: { t: 'marco', a, b, tam: 20 }, errores: [[10, 'El 10 es la decena llena. Falta lo que sobra.'], [10 + b, `Has sumado el ${b} entero. Del ${b} cogiste ${f} para llegar a 10.`], [r - 1, 'Casi. Cuenta otra vez lo que sobra.'], [r + 1, 'Casi. Cuenta otra vez lo que sobra.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r), extra: [10 + b, r + 1, r - 1, a + f] };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca cada suma con su resultado',
    pares() {
      const rs = shuffle([11, 12, 13, 14, 15, 16, 17, 18]).slice(0, 6);
      return rs.map(r => { const a = pick([6, 7, 8, 9].filter(x => r - x >= 2 && r - x <= 9 && r - x > 10 - x)); return [`${a} + ${r - a}`, String(r)]; });
    }
  }
});
