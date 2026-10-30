/* 4.º · Truco 14 · Estimar productos (48 × 3 ≈ 50 × 3 = 150) */
// Número sin 0 ni 5 en la cifra que se redondea (sin empates).
const _redondea = (x, m) => Math.round(x / m) * m;
ESTR.add({
  id: 'estimarprod', curso: 4, orden: 14, tri: 3,
  n: 'Estimar productos', ic: '≈', desc: 'Redondeo y multiplico',
  truco: 'Redondeo y multiplico',
  tutorial: [
    { txt: 'Estimar es calcular rápido un resultado cercano. 48 × 3: ¿a qué decena se parece 48?', vis: { t: 'recta', desde: 40, hasta: 50, inicio: 48 } },
    { txt: '48 está muy cerca de 50. Redondeo: 48 ≈ 50.', vis: { t: 'recta', desde: 40, hasta: 50, inicio: 48, saltos: [2] } },
    { txt: 'Ahora multiplico lo redondeado: 50 × 3 = 150. Son 3 grupos de 5 decenas.', vis: { t: 'decenas', grupos: [{ d: 5 }, { d: 5 }, { d: 5 }] } },
    { txt: 'Así que 48 × 3 es más o menos 150. Lo escribo así: 48 × 3 ≈ 150.', vis: { t: 'decenas', grupos: [{ d: 5 }, { d: 5 }, { d: 5 }] } }
  ],
  // número de 2 cifras que no acaba en 0 ni en 5
  dos(a, b) { let x; do { x = rnd(a, b); } while (x % 5 === 0); return x; },
  crear(nivel) {
    if (nivel === 1) { const x = this.dos(12, 58), n = rnd(2, 4), R = _redondea(x, 10); return { x, n, R, r: R * n, vis: { t: 'decenas', grupos: Array.from({ length: n }, () => ({ d: R / 10 })) }, txt: 'Redondea a la decena y multiplica.' }; }
    if (nivel === 2) { const x = this.dos(12, 98), n = rnd(2, 9), R = _redondea(x, 10), r = R * n; return { x, n, R, r, vis: r <= 300 ? { t: 'decenas', grupos: Array.from({ length: n }, () => ({ d: R / 10 })) } : undefined, txt: 'Redondea a la decena y multiplica.' }; }
    if (rnd(0, 1)) { let x; do { x = rnd(101, 899); } while ([0, 5].includes(Math.floor(x % 100 / 10)) && false || Math.floor(x % 100 / 10) === 5 || x % 100 === 0); const n = rnd(2, 9), R = _redondea(x, 100); return { x, n, R, r: R * n, txt: 'Redondea a la centena y multiplica.' }; }
    const x = this.dos(12, 98), y = this.dos(12, 48), R = _redondea(x, 10), S = _redondea(y, 10);
    return { x, y, n: y, R, S, r: R * S, txt: 'Redondea los dos números a la decena y multiplica.', dos: true };
  },
  texto(o) { return `${o.x} × ${o.n} ≈ ?`; },
  guiada() {
    const x = this.dos(12, 58), n = rnd(2, 4), R = _redondea(x, 10), r = R * n, dif = R - x;
    return {
      pasos: [
        { txt: `Redondeo ${x} a la decena más cercana:`, q: `${x} ≈ ?`, r: R, vis: { t: 'recta', desde: Math.floor(x / 10) * 10, hasta: Math.floor(x / 10) * 10 + 10, inicio: x, saltos: [dif] }, extra: [x < R ? R - 10 : R + 10, x, R + 1] },
        { txt: 'Ahora multiplico el número redondeado:', q: `${R} × ${n} = ?`, r, vis: { t: 'decenas', grupos: Array.from({ length: n }, () => ({ d: R / 10 })) }, extra: [R * n / 10, R * n * 10, x * n] }
      ],
      final: { txt: 'Entonces:', q: `${x} × ${n} ≈ ?`, r, extra: [x * n, R * n / 10, R * n * 10, (R - 10) * n] }
    };
  },
  item(nivel) {
    const o = this.crear(nivel), r = o.r;
    const exacto = o.x * o.n, abajo = Math.floor(o.x / (o.R >= 100 && o.x > 100 ? 100 : 10)) * (o.R >= 100 && o.x > 100 ? 100 : 10) * o.n;
    return { q: this.texto(o), txt: o.txt, r, vis: o.vis, extra: [exacto, abajo, r * 10, r / 10, r + o.n * 10] };
  },
  juego: {
    tipo: 'parejas', meta: 'Redondea a la decena y une cada cuenta con su estimación',
    pares() {
      const out = [], vistos = new Set(), me = ESTR.get('estimarprod');
      while (out.length < 6) { const o = me.crear(2), q = `${o.x} × ${o.n} ≈`; if (!vistos.has(o.r)) { vistos.add(o.r); out.push([q, o.r]); } }
      return out;
    }
  }
});
