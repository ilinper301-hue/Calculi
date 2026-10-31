/* 4.º · Truco 10 · Fracción de una cantidad (3/4 de 20) */
ESTR.add({
  id: 'fraccioncant', curso: 4, orden: 10, tri: 2,
  n: 'Fracción de una cantidad', ic: '¾', desc: 'Entre abajo, por arriba',
  truco: 'Divido entre el número de abajo y multiplico por el de arriba',
  tutorial: [
    { txt: '3/4 de 20. Parto 20 en 4 partes iguales.', vis: { t: 'barra', partes: 4, marcadas: 0, total: 20 } },
    { txt: 'Cada parte vale 20 : 4 = 5.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 20, valor: 5 } },
    { txt: 'Cojo 3 partes: 3 × 5 = 15.', vis: { t: 'barra', partes: 4, marcadas: 3, total: 20, valor: 5 } },
    { txt: 'Tu turno: para 3/5 de 20, la barra tiene 5 partes iguales. Toca las 3 partes que coges.', toca: { t: 'barra', partes: 5, objetivo: 3, total: 20 } },
    { txt: 'Truco: entre el número de abajo y por el de arriba. 3/4 de 20 = 15.', vis: { t: 'barra', partes: 4, marcadas: 3, total: 20 } }
  ],
  crear(nivel) {
    let d, u, num;
    if (nivel === 1) { d = pick([2, 3, 4, 5]); u = rnd(2, 6); }
    else if (nivel === 2) { d = pick([2, 3, 4, 5, 6, 8, 10]); u = rnd(2, 9); }
    else { d = pick([3, 4, 5, 6, 8, 10]); u = rnd(5, 25); }
    num = rnd(1, d - 1);
    if (d === 2) num = 1;
    return { d, u, num, total: d * u, r: num * u };
  },
  guiada() {
    let o; do { o = this.crear(2); } while (o.num < 2);
    const tex = `${o.num}/${o.d} de ${o.total}`;
    return {
      pasos: [
        { txt: `Parto ${o.total} en ${o.d} partes iguales. ¿Cuánto vale cada parte?`, q: `${o.total} : ${o.d} = ?`, r: o.u, vis: { t: 'barra', partes: o.d, marcadas: 1, total: o.total, valor: o.u, oculto: 'valor' }, extra: [o.u + 1], errores: _errc4(o.u, [[o.total - o.d, 'Es repartir en partes iguales: una división, no una resta.'], [o.total * o.d, 'Es repartir entre el número de abajo: dividir, no multiplicar.']]) },
        { txt: `Cojo ${o.num} ${o.num === 1 ? 'parte' : 'partes'}:`, q: `${o.num} × ${o.u} = ?`, r: o.r, vis: { t: 'barra', partes: o.d, marcadas: o.num, total: o.total, valor: o.u }, extra: [], errores: _errc4(o.r, [[o.u + o.num, 'Es multiplicar: cada parte vale lo mismo, cuenta cuántas coges.'], [o.u * o.d, 'Esa es la barra entera. Solo coges las partes de arriba.'], [(o.d - o.num) * o.u, 'Has cogido las partes que NO están coloreadas.']]) }
      ],
      final: { txt: 'Entonces:', q: `${tex} = ?`, r: o.r, vis: { t: 'barra', partes: o.d, marcadas: o.num, total: o.total }, extra: [o.total - o.num], errores: _errc4(o.r, [[o.u, 'Eso es una sola parte. Coge tantas como dice el número de arriba.'], [(o.d - o.num) * o.u, 'Has cogido las partes que sobran. Coge las de arriba.'], [o.total, 'Esa es la cantidad entera. Solo coges algunas partes.']]) }
    };
  },
  item(nivel) {
    const o = this.crear(nivel);
    const vis = { t: 'barra', partes: o.d, marcadas: o.num, total: o.total };
    const errores = _errc4(o.r, [[o.u, 'Eso es una sola parte. Coge tantas como dice el número de arriba.'], [(o.d - o.num) * o.u, 'Has cogido las partes que sobran. Coge las de arriba.'], [o.total - o.num, 'Has restado. Primero divide entre abajo y luego multiplica por arriba.'], [o.total, 'Esa es la cantidad entera. Solo coges algunas partes.']]);
    return { q: `${o.num}/${o.d} de ${o.total}`, r: o.r, vis, extra: [o.num * o.d], errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada fracción con su resultado',
    pares() {
      const out = [], vistos = new Set(), me = ESTR.get('fraccioncant');
      while (out.length < 6) { const o = me.crear(2); const t = `${o.num}/${o.d} de ${o.total}`; if (o.d <= 8 && o.total < 100 && t.length <= 9 && !vistos.has(o.r) && o.num > 0) { vistos.add(o.r); out.push([t, o.r]); } }
      return out;
    }
  }
});
