/* 5.º · Truco 12 · Compensar con decimales (4,9 + 2,6 = 5 + 2,6 − 0,1) */
(function () {
  const R = x => +x.toFixed(3);
  // Recta que abarca todos los puntos del recorrido; marcas cada 0,1 si es corta
  const rc = (inicio, saltos) => {
    let p = inicio, lo = inicio, hi = inicio;
    for (const s of saltos) { p = R(p + s); lo = Math.min(lo, p); hi = Math.max(hi, p); }
    const desde = Math.floor(lo), hasta = Math.max(Math.ceil(hi), desde + 1), ancho = hasta - desde;
    return { t: 'recta', desde, hasta, paso: ancho <= 6 ? 0.1 : ancho <= 12 ? 0.5 : 1, inicio, saltos };
  };
  // Genera un caso: a = N − d (cerca de un entero), b decimal. tipo 'suma' o 'resta'
  const caso = (nivel) => {
    const d = nivel === 1 ? 0.1 : nivel === 2 ? pick([0.1, 0.1, 0.2]) : pick([0.1, 0.2, 0.3]);
    const N = nivel === 1 ? rnd(3, 9) : nivel === 2 ? rnd(3, 12) : rnd(4, 20);
    const a = R(N - d), suma = nivel === 1 ? true : rnd(0, 1) === 1;
    if (suma) {
      let b; do { b = R(nivel === 3 && rnd(0, 1) ? rnd(11, 99) / 10 + rnd(1, 9) / 100 : rnd(11, nivel === 1 ? 39 : 99) / 10); } while (Number.isInteger(b));
      return { suma, N, d, a, b, r: R(N + b - d), vis: rc(N, [b, -d]), extra: [R(N + b), R(N + b - 2 * d), R(N + b - 1), R(N + b + d)] };
    }
    let b; do { b = R(rnd(N * 10 + 11, N * 10 + 60) / 10); } while (Number.isInteger(b));
    return { suma, N, d, a, b, r: R(b - N + d), vis: rc(b, [-N, d]), extra: [R(b - N), R(b - N + 2 * d), R(b - N + 1), R(b - N - d)] };
  };
  ESTR.add({
    id: 'decimalcomp', curso: 5, orden: 12, tri: 3,
    n: 'Compensar con decimales', ic: '4,9+', desc: 'Redondeo al entero y corrijo',
    truco: 'Redondeo al entero y luego corrijo',
    tutorial: [
      { txt: '4,9 está muy cerca de 5: solo le faltan 0,1.', vis: { t: 'recta', desde: 4, hasta: 6, paso: 0.1, inicio: 4.9, saltos: [0.1] } },
      { txt: 'Cambio 4,9 por 5. Es más fácil: 5 + 2,6 = 7,6.', vis: { t: 'recta', desde: 5, hasta: 8, paso: 0.1, inicio: 5, saltos: [2.6] } },
      { txt: 'Pero he sumado 0,1 de más. Se lo quito: 7,6 − 0,1 = 7,5.', vis: { t: 'recta', desde: 5, hasta: 8, paso: 0.1, inicio: 5, saltos: [2.6, -0.1] } },
      { txt: 'Truco: redondeo, hago la cuenta y corrijo. 4,9 + 2,6 = 5 + 2,6 − 0,1 = 7,5.', vis: { t: 'recta', desde: 5, hasta: 8, paso: 0.1, inicio: 5, saltos: [2.6, -0.1] } },
      { txt: 'En una resta se corrige al revés: 7,5 − 2,9 = 7,5 − 3 + 0,1 = 4,6.', vis: { t: 'recta', desde: 4, hasta: 8, paso: 0.1, inicio: 7.5, saltos: [-3, 0.1] } }
    ],
    guiada() {
      const c = caso(rnd(1, 2)), { N, d, a, b } = c, ds = fmt(d);
      if (c.suma) return {
        pasos: [
          { txt: `Cambio ${fmt(a)} por ${N}:`, q: `${N} + ${fmt(b)} = ?`, r: R(N + b), vis: rc(N, [b]), extra: [R(N + b - d), R(a + b), R(N + b + 1)] },
          { txt: `Me he pasado ${ds}. Lo quito:`, q: `${fmt(R(N + b))} − ${ds} = ?`, r: c.r, vis: c.vis, extra: [R(N + b), R(N + b + d), R(N + b - 2 * d)] }
        ],
        final: { txt: 'Entonces:', q: `${fmt(a)} + ${fmt(b)} = ?`, r: c.r, vis: c.vis, extra: c.extra }
      };
      return {
        pasos: [
          { txt: `Quito ${N} en lugar de ${fmt(a)}:`, q: `${fmt(b)} − ${N} = ?`, r: R(b - N), vis: rc(b, [-N]), extra: [R(b - N + d), R(b - a), R(b - N - 1)] },
          { txt: `Quité ${ds} de más. Lo devuelvo:`, q: `${fmt(R(b - N))} + ${ds} = ?`, r: c.r, vis: c.vis, extra: [R(b - N), R(b - N - d), R(b - N + 2 * d)] }
        ],
        final: { txt: 'Entonces:', q: `${fmt(b)} − ${fmt(a)} = ?`, r: c.r, vis: c.vis, extra: c.extra }
      };
    },
    item(nivel) {
      const c = caso(nivel);
      if (c.suma) return { q: rnd(0, 1) ? `${fmt(c.a)} + ${fmt(c.b)} = ?` : `${fmt(c.b)} + ${fmt(c.a)} = ?`, r: c.r, vis: c.vis, extra: c.extra };
      return { q: `${fmt(c.b)} − ${fmt(c.a)} = ?`, r: c.r, vis: c.vis, extra: c.extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuenta con su resultado',
      pares() {
        const out = [], vistos = new Set(); let guard = 0;
        while (out.length < 6 && guard++ < 300) {
          const c = caso(2);
          if (c.a >= 10 || c.b >= 10) continue;
          const t = c.suma ? `${fmt(c.a)} + ${fmt(c.b)}` : `${fmt(c.b)} − ${fmt(c.a)}`, s = fmt(c.r);
          if (vistos.has(t) || vistos.has(s)) continue;
          vistos.add(t); vistos.add(s); out.push([t, c.r]);
        }
        return out;
      }
    }
  });
})();
