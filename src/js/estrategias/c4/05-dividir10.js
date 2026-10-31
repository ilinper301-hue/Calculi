/* 4.º · Truco 5 · Dividir entre 10, 100 y 1000 (quitar ceros) */
ESTR.add({
  id: 'dividir10', curso: 4, orden: 5, tri: 1,
  n: 'Entre 10, 100 y 1000', ic: ':10', desc: 'Quito ceros',
  truco: 'Quito tantos ceros como tiene el divisor',
  tutorial: [
    { txt: '30 : 10 es repartir 30 en grupos de 10. Salen 3 grupos.', vis: { t: 'decenas', grupos: [{ d: 3 }] } },
    { txt: 'Entre 10 quito un cero: 30 : 10 = 3 y 450 : 10 = 45.', vis: { t: 'decenas', grupos: [{ d: 45 }] } },
    { txt: 'Entre 100 quito dos ceros: 300 : 100 = 3.', vis: { t: 'decenas', grupos: [{ c: 3 }] } },
    { txt: `Tu turno: ${fmt(6000)} : 100. Quito tantos ceros como tiene el 100. ¿Cuánto sale?`, toca: { t: 'elige', q: `${fmt(6000)} : 100 = ?`, ops: [6, 60, 600], r: 60 } },
    { txt: 'Entre 1000 quito tres ceros: 7000 : 1000 = 7. Un cero por cada cero del divisor.', vis: { t: 'barra', partes: 7, marcadas: 7, total: 7000, valor: 1000 } }
  ],
  elegir(nivel) {
    const d = nivel === 1 ? pick([10, 10, 100]) : pick([10, 100, 1000]);
    let m;
    if (nivel === 1) m = d === 10 ? rnd(2, 9) : rnd(2, 5);
    else if (nivel === 2) m = d === 10 ? rnd(11, 99) : d === 100 ? rnd(2, 99) : rnd(2, 20);
    else m = d === 10 ? rnd(100, 999) : d === 100 ? rnd(12, 999) : rnd(12, 99);
    return { m, d, n: m * d };
  },
  guiada() {
    const d = pick([100, 1000]), m = d === 100 ? rnd(3, 60) : rnd(3, 30), n = m * d;
    return {
      pasos: [
        { txt: 'Divido entre 10 y quito un cero:', q: `${fmt(n)} : 10 = ?`, r: n / 10, extra: [n * 10], errores: _errc4(n / 10, [[n / 100, 'Entre 10 se quita un solo cero.'], [n, 'Entre 10 el número se hace más pequeño: quita un cero.']]) },
        { txt: `Ahora ${d === 100 ? 'otra vez entre 10' : 'entre 100'}:`, q: `${fmt(n / 10)} : ${d === 100 ? 10 : 100} = ?`, r: m, extra: [m / 10], errores: _errc4(m, [[m * 10, 'Has quitado un cero de menos.'], [n / 10, 'Ese es el número de partida. Ahora vuelve a dividir entre 10.']]) }
      ],
      final: { txt: `He quitado ${d === 100 ? 'dos' : 'tres'} ceros. Entonces:`, q: `${fmt(n)} : ${fmt(d)} = ?`, r: m, extra: [m / 10], errores: _errc4(m, [[m * 10, 'Te queda un cero de más. Cuenta los ceros del divisor.'], [n / 10, 'Has quitado un solo cero. Cuenta los ceros del divisor.'], [n / 100, d === 1000 ? 'Has quitado dos ceros. El divisor tiene tres.' : 'Has quitado un cero. El divisor tiene dos.']]) }
    };
  },
  item(nivel) {
    const { m, d, n } = this.elegir(nivel);
    let vis;
    if (nivel === 1) vis = d === 10 ? { t: 'decenas', grupos: [{ d: m }] } : { t: 'decenas', grupos: [{ c: m }] };
    const extra = [10, 100, 1000].filter(x => x !== d && n % x === 0).map(x => n / x).concat([n]);
    const errores = [[n, 'Eso es el número de partida. Hay que quitar ceros.']];
    [10, 100, 1000].forEach(x => { if (x !== d && n % x === 0) errores.push([n / x, x < d ? `Has quitado pocos ceros. Cuenta los del ${fmt(d)}.` : `Has quitado demasiados ceros. Cuenta los del ${fmt(d)}.`]); });
    return { q: `${fmt(n)} : ${fmt(d)}`, r: m, vis, extra: [], errores: _errc4(m, errores) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada división con su resultado',
    pares() {
      const out = [], vistos = new Set();
      const mk = (d, a, b) => { for (let i = 0; i < 40 && out.filter(p => p.d === d).length < 2; i++) { const m = rnd(a, b), n = m * d; if (!vistos.has(m)) { vistos.add(m); out.push({ d, c: [`${n}:${d}`, m] }); } } };
      mk(10, 12, 99); mk(100, 2, 90); mk(1000, 2, 9);
      return shuffle(out.map(p => p.c));
    }
  }
});
