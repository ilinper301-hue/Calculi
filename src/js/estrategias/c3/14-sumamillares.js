/* 3.º · Truco 14 · Sumar centenas y millares (2500 + 300 = 28 centenas) */
const _er3_14 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
// Recta que empieza en a y acaba en a + b con un paso que deja ≤ 10 marcas; null si no hay.
const _rec14 = (a, b) => { for (const p of [100, 200, 250, 500, 1000]) if (b % p === 0 && b / p <= 10) return p; return null; };
const _vis14 = (a, b, saltos) => { const p = _rec14(a, b); return p ? { t: 'recta', desde: a, hasta: a + b, paso: p, inicio: a, saltos: saltos || [b] } : null; };
const _pedir14 = (nivel) => {
  for (let k = 0; k < 500; k++) {
    let a, b;
    if (nivel === 1) { a = rnd(1, 8) * 1000; b = rnd(1, 9) * 100; }
    else if (nivel === 2) { a = rnd(1, 8) * 1000 + rnd(1, 9) * 100; b = rnd(1, 9) * 100; }
    else { a = rnd(1, 7) * 1000 + rnd(0, 9) * 100; b = rnd(1, 3) * 1000 + rnd(0, 9) * 100; }
    if (a + b <= 9900 && _rec14(a, b)) return { a, b };
  }
  return { a: 2500, b: 300 };
};
ESTR.add({
  id: 'sumamillares', curso: 3, orden: 14, tri: 3,
  n: 'Centenas y millares', ic: '+300', desc: 'Cuento en centenas',
  truco: 'Cuento en centenas',
  tutorial: [
    { txt: 'Quiero sumar 2500 + 300. Son números redondos: acaban en dos ceros.', vis: _vis14(2500, 300, []) },
    { txt: '2500 son 25 centenas y 300 son 3 centenas.', vis: _vis14(2500, 300, [100, 100, 100]) },
    { txt: 'Sumo las centenas: 25 + 3 = 28 centenas. Eso es 2800.', vis: _vis14(2500, 300, [300]) },
    { txt: 'Tu turno: parto de 3200 y sumo 4 centenas, de 100 en 100. Toca dónde llegas.', toca: { t: 'recta', desde: 3200, hasta: 3600, paso: 100, inicio: 3200, objetivo: 3600 } },
    { txt: 'Truco: cuento en centenas, sumo y añado dos ceros. 4200 + 1800: 42 + 18 = 60 centenas, es decir, 6000.', vis: _vis14(4200, 1800, [1800]) }
  ],
  guiada() {
    const { a, b } = _pedir14(2), ca = a / 100, cb = b / 100;
    return {
      pasos: [
        { txt: `${a} son ${ca} centenas y ${b} son ${cb}. Sumo las centenas:`, q: `${ca} + ${cb} = ?`, r: ca + cb, vis: _vis14(a, b), extra: [ca + cb + 10, ca + cb - 1, ca + cb + 1, ca + cb - 10], errores: _er3_14(ca + cb, [[ca + cb + 10, 'Te has pasado en diez centenas. Súmalas otra vez.'], [ca + cb + 1, 'Casi: te has pasado por una centena.'], [ca + cb - 1, 'Casi: te falta una centena.']]) },
        { txt: 'Ahora, esas centenas son:', q: `${ca + cb} × 100 = ?`, r: a + b, vis: _vis14(a, b), extra: [(ca + cb) * 10, a + b + 100, a + b - 100, a + b + 1000].filter(x => x <= 9999), errores: _er3_14(a + b, [[(ca + cb) * 10, 'Una centena son 100: se añaden dos ceros, no uno.'], [a + b - 100, 'Casi: te falta una centena.'], [a + b + 100, 'Casi: te has pasado en una centena.']]) }
      ],
      final: { txt: 'Entonces:', q: `${a} + ${b} = ?`, r: a + b, vis: _vis14(a, b), extra: [a + b - 100, a + b + 100, a + b - 1000, a + b + 1000].filter(x => x <= 9999), errores: _er3_14(a + b, [[a + b - 100, 'Revisa las centenas: te falta una.'], [a + b + 100, 'Revisa las centenas: te has pasado en una.'], [a + b - 1000, 'Revisa los millares: te falta uno.'], [a + b + 1000, 'Revisa los millares: te has pasado en uno.']]) }
    };
  },
  item(nivel) {
    const { a, b } = _pedir14(nivel), r = a + b;
    return { q: `${a} + ${b} = ?`, r, vis: _vis14(a, b), extra: [r - 100, r + 100, r - 1000, r + 1000, r - 200, r + 200].filter(x => x > 0 && x <= 9999), errores: _er3_14(r, [[r - 100, 'Revisa las centenas: te falta una.'], [r + 100, 'Revisa las centenas: te has pasado en una.'], [r - 1000, 'Revisa los millares: te falta uno.'], [r + 1000, 'Revisa los millares: te has pasado en uno.']].filter(x => x[0] <= 9999)) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada suma con su resultado',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) { const { a, b } = _pedir14(rnd(1, 3)), r = a + b; if (!vistos.has(r)) { vistos.add(r); out.push([`${a}+${b}`, r]); } }
      return out;
    }
  }
});
