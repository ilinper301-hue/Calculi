/* 4.º · Truco 5 · Dividir entre 10, 100 y 1000 (quitar ceros) */
ESTR.add({
  id: 'dividir10', curso: 4, orden: 5, tri: 1,
  n: 'Entre 10, 100 y 1000', ic: ':10', desc: 'Quito ceros',
  truco: 'Quito tantos ceros como tiene el divisor',
  tutorial: [
    { txt: '30 : 10 es repartir 30 en grupos de 10. Salen 3 grupos.', vis: { t: 'decenas', grupos: [{ d: 3 }] } },
    { txt: 'Entre 10 quito un cero: 30 : 10 = 3 y 450 : 10 = 45.', vis: { t: 'decenas', grupos: [{ d: 45 }] } },
    { txt: 'Entre 100 quito dos ceros: 300 : 100 = 3.', vis: { t: 'decenas', grupos: [{ c: 3 }] } },
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
        { txt: 'Divido entre 10 y quito un cero:', q: `${fmt(n)} : 10 = ?`, r: n / 10, extra: [n / 100, n, n * 10] },
        { txt: `Ahora ${d === 100 ? 'otra vez entre 10' : 'entre 100'}:`, q: `${fmt(n / 10)} : ${d === 100 ? 10 : 100} = ?`, r: m, extra: [m * 10, m / 10, n / 10] }
      ],
      final: { txt: `He quitado ${d === 100 ? 'dos' : 'tres'} ceros. Entonces:`, q: `${fmt(n)} : ${fmt(d)} = ?`, r: m, extra: [m * 10, m / 10, n / 10] }
    };
  },
  item(nivel) {
    const { m, d, n } = this.elegir(nivel);
    let vis;
    if (nivel === 1) vis = d === 10 ? { t: 'decenas', grupos: [{ d: m }] } : { t: 'decenas', grupos: [{ c: m }] };
    const extra = [10, 100, 1000].filter(x => x !== d && n % x === 0).map(x => n / x).concat([n]);
    return { q: `${fmt(n)} : ${fmt(d)}`, r: m, vis, extra };
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
