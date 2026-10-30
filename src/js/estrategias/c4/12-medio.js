/* 4.º · Truco 12 · Sumar y restar 0,5 (la mitad de la unidad) */
const _M = x => +x.toFixed(2);
ESTR.add({
  id: 'medio', curso: 4, orden: 12, tri: 3,
  n: 'Sumar y restar 0,5', ic: '0,5', desc: 'Dos mitades hacen una unidad',
  truco: 'Dos medios son una unidad',
  tutorial: [
    { txt: '0,5 es la mitad de una unidad. Con 3 + 0,5 llego a 3,5.', vis: { t: 'recta', desde: 3, hasta: 5, paso: 0.5, inicio: 3, saltos: [0.5] } },
    { txt: 'Dos mitades hacen una unidad. 3,5 + 0,5 = 4.', vis: { t: 'recta', desde: 3, hasta: 5, paso: 0.5, inicio: 3.5, saltos: [0.5] } },
    { txt: 'Para restar 0,5 voy hacia atrás media unidad. 6 − 0,5 = 5,5.', vis: { t: 'recta', desde: 5, hasta: 7, paso: 0.5, inicio: 6, saltos: [-0.5] } },
    { txt: 'Dos mitades se juntan: 2,5 + 2,5 = 2 + 2 + 1 = 5.', vis: { t: 'recta', desde: 2, hasta: 6, paso: 0.5, inicio: 2.5, saltos: [2, 0.5] } }
  ],
  rec(ini, saltos) {
    const ps = [ini]; saltos.forEach(s => ps.push(_M(ps[ps.length - 1] + s)));
    const desde = Math.floor(Math.min(...ps) + 1e-9), hasta = Math.max(Math.ceil(Math.max(...ps) - 1e-9), desde + 1);
    // Recta larga: marcas de 1 en 1 (con media marca cada 0,5 los números se pisan); los puntos de salida y llegada llevan su número.
    return { t: 'recta', desde, hasta, paso: hasta - desde > 6 ? 1 : 0.5, inicio: ini, saltos };
  },
  // devuelve {q, r, vis} según tipo
  crear(nivel) {
    const tipos = nivel === 1 ? ['w+', 'h+'] : nivel === 2 ? ['w-', 'h-', 'h+', 'hh'] : ['hh', 'w-h', 'h+1.5', 'hh', 'w-h'];
    const t = pick(tipos), mx = nivel === 1 ? 8 : nivel === 2 ? 20 : 9;
    let a, b, op = '+';
    if (t === 'w+') { a = rnd(1, mx); b = 0.5; }
    else if (t === 'h+') { a = rnd(1, mx) + 0.5; b = 0.5; }
    else if (t === 'w-') { a = rnd(2, mx); b = 0.5; op = '−'; }
    else if (t === 'h-') { a = rnd(2, mx) + 0.5; b = 0.5; op = '−'; }
    else if (t === 'hh') { a = rnd(1, Math.min(mx, 9)) + 0.5; b = rnd(1, Math.min(mx, 9)) + 0.5; }
    else if (t === 'w-h') { a = rnd(3, 12); b = rnd(1, a - 2) + 0.5; op = '−'; }
    else { a = rnd(1, mx) + 0.5; b = 1.5; }
    const r = op === '+' ? _M(a + b) : _M(a - b);
    return { q: `${fmt(a)} ${op} ${fmt(b)}`, r, a, b, op, vis: this.rec(a, [op === '+' ? b : -b]) };
  },
  guiada() {
    const x = rnd(1, 4), y = rnd(1, 4), a = x + 0.5, b = y + 0.5, r = x + y + 1;
    return {
      pasos: [
        { txt: 'Junto las dos mitades:', q: '0,5 + 0,5 = ?', r: 1, vis: { t: 'recta', desde: 0, hasta: 2, paso: 0.5, inicio: 0.5, saltos: [0.5] }, extra: [0.1, 0.5, 5] },
        { txt: 'Ahora sumo las unidades enteras:', q: `${x} + ${y} = ?`, r: x + y, extra: [x + y + 1, x + y - 1, x * y] }
      ],
      final: { txt: 'Entonces:', q: `${fmt(a)} + ${fmt(b)} = ?`, r, vis: this.rec(a, [y, 0.5]), extra: [x + y, r + 0.5, x + y + 0.5] }
    };
  },
  item(nivel) {
    const o = this.crear(nivel), r = o.r;
    const extra = [_M(r + 0.5), _M(r - 0.5), _M(r + 1), _M(r - 1)];
    return { q: o.q, r, vis: o.vis, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada cuenta con su resultado',
    pares() {
      const out = [], vistos = new Set(), me = ESTR.get('medio');
      while (out.length < 6) { const o = me.crear(rnd(1, 3)); if (!vistos.has(o.r) && o.q.length <= 9) { vistos.add(o.r); out.push([o.q, o.r]); } }
      return out;
    }
  }
});
