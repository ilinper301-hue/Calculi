/* 4.º · Truco 11 · Sumar décimas (0,7 + 0,3 = 1; 2,6 + 0,7 = 3,3) */
const _R1 = x => +x.toFixed(2);
ESTR.add({
  id: 'decimas', curso: 4, orden: 11, tri: 3,
  n: 'Sumar décimas', ic: '0,1', desc: 'Completo la unidad',
  truco: 'Completo hasta el siguiente entero',
  tutorial: [
    { txt: 'Una unidad tiene 10 décimas. 0,7 son 7 décimas.', vis: { t: 'recta', desde: 0, hasta: 1, paso: 0.1, inicio: 0.7 } },
    { txt: 'Para llegar a 1 faltan 3 décimas. 0,7 + 0,3 = 1.', vis: { t: 'recta', desde: 0, hasta: 1, paso: 0.1, inicio: 0.7, saltos: [0.3] } },
    { txt: '2,6 + 0,4: primero completo la unidad. Llego a 3.', vis: { t: 'recta', desde: 2, hasta: 3, paso: 0.1, inicio: 2.6, saltos: [0.4] } },
    { txt: 'Y 2,6 + 0,7: sumo 0,4 para llegar a 3 y 0,3 más. Son 3,3.', vis: { t: 'recta', desde: 2.5, hasta: 3.5, paso: 0.1, inicio: 2.6, saltos: [0.4, 0.3] } }
  ],
  rec(ini, saltos) {
    const ps = [ini]; saltos.forEach(s => ps.push(_R1(ps[ps.length - 1] + s)));
    const lo = Math.min(...ps), hi = Math.max(...ps);
    let desde = Math.floor(lo + 1e-9), hasta = Math.max(Math.ceil(hi - 1e-9), desde + 1);
    // Si ocupa más de una unidad, ventana ajustada a medias unidades (con 20 marcas los números se pisan)
    if (hasta - desde > 1) { desde = Math.floor(lo * 2 + 1e-9) / 2; hasta = Math.max(Math.ceil(hi * 2 - 1e-9) / 2, desde + 1); }
    return { t: 'recta', desde, hasta, paso: 0.1, inicio: ini, saltos };
  },
  guiada() {
    const w = rnd(1, 8), k = rnd(2, 8), j = rnd(10 - k + 1, 9), a = _R1(w + k / 10), c1 = _R1((10 - k) / 10), c2 = _R1((j - (10 - k)) / 10), b = _R1(j / 10), r = _R1(a + b);
    return {
      pasos: [
        { txt: `Primero completo la unidad: de ${fmt(a)} a ${w + 1}.`, q: `${fmt(a)} + ${fmt(c1)} = ?`, r: w + 1, vis: this.rec(a, [c1]), extra: [_R1(w + 1.1), _R1(a + 0.1), w] },
        { txt: `${fmt(b)} son ${fmt(c1)} y ${fmt(c2)}. Ya sumé ${fmt(c1)}; ahora sumo ${fmt(c2)}:`, q: `${w + 1} + ${fmt(c2)} = ?`, r, vis: this.rec(w + 1, [c2]), extra: [_R1(r + 0.1), _R1(r - 0.1), _R1(w + 1 + c2 * 10)] }
      ],
      final: { txt: 'Entonces:', q: `${fmt(a)} + ${fmt(b)} = ?`, r, vis: this.rec(a, [c1, c2]), extra: [w + 1, _R1(r + 0.1), _R1(r - 0.1), _R1(w + k / 10 + j)] }
    };
  },
  item(nivel) {
    if (nivel === 1) {
      const k = rnd(1, 9), a = k / 10, b = _R1((10 - k) / 10);
      return { q: `${fmt(a)} + ${fmt(b)}`, r: 1, vis: this.rec(a, [b]), extra: [0.1, 10, _R1(a + b - 0.1), 1.1, 0.9] };
    }
    if (nivel === 2) {
      const w = rnd(1, 9), k = rnd(1, 9), a = _R1(w + k / 10), b = _R1((10 - k) / 10), r = w + 1;
      const q = rnd(0, 1) ? `${fmt(a)} + ${fmt(b)}` : `${fmt(b)} + ${fmt(a)}`;
      return { q, r, vis: this.rec(a, [b]), extra: [_R1(r + 0.1), _R1(r - 0.1), w, _R1(w + 0.9), 10 * r] };
    }
    if (rnd(0, 1)) {
      const w = rnd(1, 8), k = rnd(2, 9), j = rnd(10 - k + 1, 9), a = _R1(w + k / 10), b = _R1(j / 10), r = _R1(a + b);
      return { q: `${fmt(a)} + ${fmt(b)}`, r, vis: this.rec(a, [b]), extra: [_R1(r + 0.1), _R1(r - 0.1), _R1(r - 1), _R1(r + 1), _R1(w + 1 + j / 10), _R1(r / 10)] };
    }
    const k = rnd(2, 9), j = rnd(10 - k + 1, 9), a = _R1(k / 10), b = _R1(j / 10), r = _R1(a + b);
    return { q: `${fmt(a)} + ${fmt(b)}`, r, vis: this.rec(a, [b]), extra: [_R1(r + 0.1), _R1(r - 0.1), 1, _R1(r + 1), _R1(r - 1), _R1(r * 10)] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada suma con su resultado',
    pares() { return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(w => { const k = rnd(1, 9); return [`${fmt(_R1(w + k / 10))} + ${fmt(_R1((10 - k) / 10))}`, w + 1]; }); }
  }
});
