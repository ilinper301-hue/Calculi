/* 5.º · Truco 7 · Mover la coma (decimales × 10, 100, 1000 y : 10, : 100, : 1000) */
(function () {
  const R = x => +x.toFixed(3);
  // Distractores típicos: la coma se mueve un lugar de menos, de más, o no se mueve
  const errores = (x, k, mul) => {
    const f = Math.pow(10, k), g = mul ? (e => x * Math.pow(10, e)) : (e => x / Math.pow(10, e));
    return [g(k - 1), g(k + 1), x, g(k) * (mul ? 10 : 0.1)].map(R).filter(v => v !== R(g(k)) && Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-6 && v < 1e6);
  };
  ESTR.add({
    id: 'decimal100', curso: 5, orden: 7, tri: 2,
    n: 'Mover la coma', ic: '×100', desc: 'Decimales × 10, 100, 1000',
    truco: 'Muevo la coma tantos lugares como ceros',
    tutorial: [
      { txt: 'Diez partes de 3,4 hacen 34. Por 10, la coma salta un lugar a la derecha.', vis: { t: 'barra', partes: 10, marcadas: 10, total: 34, valor: 3.4 } },
      { txt: 'Si cada casilla vale 0,01, 56 casillas son 0,56. Si valen 1, son 56. Por 100: 0,56 × 100 = 56.', vis: { t: 'cien', n: 56 } },
      { txt: 'Dividir hace lo contrario. Entre 10, la coma salta un lugar a la izquierda: 45 : 10 = 4,5.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 45, valor: 4.5 } },
      { txt: 'Entre 100, dos lugares a la izquierda: 7 : 100 = 0,07. Son 7 casillas de 100.', vis: { t: 'cien', n: 7 } },
      { txt: 'Truco: la coma se mueve tantos lugares como ceros tiene el 10, el 100 o el 1000.', vis: { t: 'barra', partes: 10, marcadas: 10, total: 34, valor: 3.4 } }
    ],
    guiada() {
      if (rnd(0, 1)) { // × 100 en dos pasos
        const c = 10 * rnd(1, 9) + rnd(1, 9), x = c / 100;
        return {
          pasos: [
            { txt: 'Primero, por 10:', q: `${fmt(x)} × 10 = ?`, r: R(x * 10), vis: { t: 'barra', partes: 10, marcadas: 10, total: R(x * 10), valor: x, oculto: 'total' }, extra: [x, R(x * 100), R(x / 10)] },
            { txt: 'Otra vez por 10:', q: `${fmt(R(x * 10))} × 10 = ?`, r: c, vis: { t: 'barra', partes: 10, marcadas: 10, total: c, valor: R(x * 10), oculto: 'total' }, extra: [R(x * 10 * 100), R(x * 10), R(x)] }
          ],
          final: { txt: 'Por 100 es mover la coma dos lugares:', q: `${fmt(x)} × 100 = ?`, r: c, vis: { t: 'cien', n: c }, extra: [R(x * 10), R(x * 1000), x] }
        };
      }
      const n = 10 * rnd(1, 9) + rnd(1, 9);
      return {
        pasos: [
          { txt: 'Primero, entre 10:', q: `${n} : 10 = ?`, r: R(n / 10), vis: { t: 'barra', partes: 10, marcadas: 1, total: n, valor: R(n / 10), oculto: 'valor' }, extra: [n * 10, R(n / 100), n] },
          { txt: 'Otra vez entre 10:', q: `${fmt(R(n / 10))} : 10 = ?`, r: R(n / 100), vis: { t: 'barra', partes: 10, marcadas: 1, total: R(n / 10), valor: R(n / 100), oculto: 'valor' }, extra: [R(n / 10), R(n / 1000), n] }
        ],
        final: { txt: 'Entre 100 es mover la coma dos lugares:', q: `${n} : 100 = ?`, r: R(n / 100), vis: { t: 'cien', n }, extra: [R(n / 10), R(n / 1000), n] }
      };
    },
    item(nivel) {
      let x, k, mul;
      const nz = (a, b) => { let v; do { v = rnd(a, b); } while (v % 10 === 0); return v; };
      if (nivel === 1) {
        mul = rnd(0, 1); k = 1;
        x = mul ? nz(11, 99) / 10 : nz(11, 99);
      } else if (nivel === 2) {
        k = pick([1, 1, 2, 2]); mul = rnd(0, 1);
        x = mul ? (k === 1 ? nz(11, 99) / 10 : nz(11, 99) / 100) : nz(11, 99);
      } else {
        k = pick([1, 2, 3]); mul = rnd(0, 1);
        x = mul ? pick([nz(11, 99) / 10, nz(101, 999) / 100, nz(1, 99) / 100, nz(11, 99) / 10]) : pick([nz(11, 999), nz(11, 99), nz(101, 999)]);
        if (mul && k === 3 && x * 1000 > 9999) x = nz(11, 99) / 10;
        if (!mul && k === 3) x = nz(11, 999);
      }
      x = R(x); const f = Math.pow(10, k), r = R(mul ? x * f : x / f);
      let vis;
      if (k === 1) vis = mul ? { t: 'barra', partes: 10, marcadas: 10, total: r, valor: x, oculto: 'total' } : { t: 'barra', partes: 10, marcadas: 1, total: x, valor: r, oculto: 'valor' };
      else if (k === 2 && mul && x < 1) vis = { t: 'cien', n: Math.round(x * 100) };
      else if (k === 2 && !mul && x < 100) vis = { t: 'cien', n: x };
      return { q: `${fmt(x)} ${mul ? '×' : ':'} ${f} = ?`, r, vis, extra: errores(x, k, mul) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuenta con su resultado',
      pares() {
        const out = [], vistos = new Set();
        let guard = 0;
        while (out.length < 6 && guard++ < 200) {
          const mul = rnd(0, 1), k = rnd(1, 2), nz = (a, b) => { let v; do { v = rnd(a, b); } while (v % 10 === 0); return v; };
          const x = mul ? (k === 1 ? nz(11, 99) / 10 : nz(11, 99) / 10) : nz(11, 99), f = Math.pow(10, k), r = R(mul ? x * f : x / f);
          const a = `${fmt(R(x))} ${mul ? '×' : ':'} ${f}`, b = fmt(r);
          if (vistos.has(a) || vistos.has(b) || a === b) continue;
          vistos.add(a); vistos.add(b); out.push([a, b]);
        }
        return out;
      }
    }
  });
})();
