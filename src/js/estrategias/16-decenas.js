/* Estrategia 16 · Decenas completas (30 + 20 = 3 decenas + 2 decenas) */
ESTR.add({
  id: 'decenas', orden: 16, tri: 3,
  n: 'Decenas completas', ic: '🧱', desc: 'Sumo y resto decenas',
  truco: 'Cuento decenas como si fueran unidades',
  tutorial: [
    { txt: 'El 30 son 3 barras de diez. Son 3 decenas.', vis: { t: 'decenas', grupos: [{ d: 3 }] } },
    { txt: 'El 20 son 2 barras de diez. Son 2 decenas.', vis: { t: 'decenas', grupos: [{ d: 2 }] } },
    { txt: 'Para sumar 30 + 20, junto las barras: 3 decenas y 2 decenas.', vis: { t: 'decenas', grupos: [{ d: 3 }, { d: 2 }] } },
    { txt: '3 + 2 = 5, así que son 5 decenas. ¡30 + 20 = 50!', vis: { t: 'decenas', grupos: [{ d: 5 }] } },
    { txt: 'Con las restas pasa igual: 70 − 30 es 7 decenas menos 3 decenas: 4 decenas, 40.', vis: { t: 'decenas', grupos: [{ d: 7 }], tachar: 3 } }
  ],
  guiada() {
    const suma = rnd(0, 1) === 1;
    let x, y;
    if (suma) { x = rnd(1, 7); y = rnd(1, 9 - x); } else { x = rnd(3, 9); y = rnd(1, x - 1); }
    const r = suma ? x + y : x - y, vis = suma ? { t: 'decenas', grupos: [{ d: x }, { d: y }] } : { t: 'decenas', grupos: [{ d: x }], tachar: y };
    return {
      pasos: [
        { txt: 'Cuento las barras de diez:', q: `${x * 10} = ? decenas`, r: x, vis: { t: 'decenas', grupos: [{ d: x }] } },
        { txt: `${y * 10} ${y === 1 ? 'es 1 decena' : `son ${y} decenas`}. ${suma ? 'Las junto:' : 'Las quito:'}`, q: suma ? `${x} + ${y} = ?` : `${x} − ${y} = ?`, r, vis }
      ],
      final: { txt: 'Ahora lo digo en decenas completas:', q: suma ? `${x * 10} + ${y * 10} = ?` : `${x * 10} − ${y * 10} = ?`, r: r * 10, vis }
    };
  },
  item(nivel) { let it, k = 0; do { it = this._it(nivel); } while (it.q === this._ult && ++k < 8); this._ult = it.q; return it; },
  _it(nivel) {
    const suma = rnd(0, 1) === 1;
    let x, y;
    if (nivel === 1) { if (suma) { x = rnd(1, 4); y = rnd(1, 5 - x); } else { x = rnd(3, 6); y = rnd(1, x - 1); } }
    else if (suma) { x = rnd(1, 7); y = rnd(1, 9 - x); } else { x = rnd(3, 9); y = rnd(1, x - 1); }
    const r = (suma ? x + y : x - y) * 10;
    const vis = suma ? { t: 'decenas', grupos: [{ d: x }, { d: y }] } : { t: 'decenas', grupos: [{ d: x }], tachar: y };
    let q = suma ? `${x * 10} + ${y * 10} = ?` : `${x * 10} − ${y * 10} = ?`;
    if (nivel === 3 && rnd(0, 2) === 0) q = suma ? `${x * 10} + ? = ${r}` : `${x * 10} − ? = ${r}`;
    const rr = nivel === 3 && q.includes('? =') ? y * 10 : r;
    return { q, r: rr, vis, extra: suma ? [x + y, rr + 10, rr - 10, rr + 1].filter(v => v > 0) : [x - y, rr + 10, rr - 10, rr + 1].filter(v => v > 0) };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca cada cuenta con su resultado',
    pares() {
      return shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(t => {
        if (t <= 8 && rnd(0, 1)) { const y = rnd(1, 9 - t); return [`${(t + y) * 10} − ${y * 10}`, String(t * 10)]; }
        const x = rnd(1, t - 1); return [`${x * 10} + ${(t - x) * 10}`, String(t * 10)];
      });
    }
  }
});
