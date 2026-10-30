/* 4.º · Truco 9 · Compensar con centenas (498 + 235 = 500 + 235 − 2; 600 − 198 = 600 − 200 + 2) */
ESTR.add({
  id: 'compensar4', curso: 4, orden: 9, tri: 2,
  n: 'Compensar con centenas', ic: '±99', desc: 'Redondeo y arreglo la diferencia',
  truco: 'Redondeo a la centena y compenso',
  tutorial: [
    { txt: '298 + 150: 298 está muy cerca de 300. Sumo 300 + 150 = 450.', vis: { t: 'recta', desde: 100, hasta: 500, paso: 100, inicio: 150, saltos: [300] } },
    { txt: 'Pero sumé 2 de más. Quito 2: 450 − 2 = 448.', vis: { t: 'recta', desde: 100, hasta: 500, paso: 100, inicio: 450, saltos: [-2] } },
    { txt: 'En una resta es al revés. 600 − 198: quito 200, que es 2 de más.', vis: { t: 'recta', desde: 300, hasta: 700, paso: 100, inicio: 600, saltos: [-200] } },
    { txt: 'Me pasé 2 quitando. Los devuelvo: 400 + 2 = 402. Así que 600 − 198 = 402.', vis: { t: 'recta', desde: 300, hasta: 700, paso: 100, inicio: 400, saltos: [2] } }
  ],
  // genera una operación; tipo 's' (suma) o 'r' (resta)
  crear(nivel, tipo) {
    const e = nivel === 1 ? 1 : nivel === 2 ? rnd(1, 3) : rnd(1, 9) ;
    if (tipo === 's') {
      const H = nivel === 1 ? rnd(2, 9) : nivel === 2 ? rnd(2, 9) : rnd(5, 40), a = H * 100 - e;
      const b = nivel === 1 ? rnd(11, 48) * 10 : nivel === 2 ? rnd(101, 899) : rnd(300, 4999);
      return { tipo, a, b, H, e, redondo: H * 100, r: a + b };
    }
    const H = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(2, 8) : rnd(2, 9) , bb = H * 100 - e;
    const a = nivel === 1 ? rnd(H + 2, 9) * 100 : nivel === 2 ? rnd(bb + 50 + 100, 999) : rnd(bb + 1000, 9999);
    return { tipo, a, b: bb, H, e, redondo: H * 100, r: a - bb };
  },
  rec(ini, saltos) {
    const ps = [ini]; saltos.forEach(s => ps.push(ps[ps.length - 1] + s));
    const mn = Math.min(...ps), mx = Math.max(...ps);
    let paso = 100; if ((Math.ceil(mx / 100) - Math.floor(mn / 100)) > 12) paso = 1000;
    const desde = Math.floor(mn / paso) * paso, hasta = Math.max(Math.ceil(mx / paso) * paso, desde + 2 * paso);
    return { t: 'recta', desde, hasta, paso, inicio: ini, saltos };
  },
  texto(o) { return o.tipo === 's' ? `${fmt(o.a)} + ${fmt(o.b)}` : `${fmt(o.a)} − ${fmt(o.b)}`; },
  vista(o) { return o.tipo === 's' ? this.rec(o.b, [o.redondo, -o.e]) : this.rec(o.a, [-o.redondo, o.e]); },
  guiada() {
    const o = this.crear(2, rnd(0, 1) ? 's' : 'r');
    if (o.tipo === 's') {
      const R = o.redondo + o.b;
      return {
        pasos: [
          { txt: `${fmt(o.a)} es casi ${fmt(o.redondo)}. Sumo ${fmt(o.redondo)}:`, q: `${fmt(o.redondo)} + ${fmt(o.b)} = ?`, r: R, vis: this.rec(o.b, [o.redondo]), extra: [o.a + o.b, R - o.e, R + 100] },
          { txt: `Me he pasado ${o.e}. Los quito:`, q: `${fmt(R)} − ${o.e} = ?`, r: o.r, vis: this.rec(R, [-o.e]), extra: [R + o.e, R - 2 * o.e, R - 10] }
        ],
        final: { txt: 'Entonces:', q: `${this.texto(o)} = ?`, r: o.r, vis: this.vista(o), extra: [R, R + o.e, R - 2 * o.e] }
      };
    }
    const X = o.a - o.redondo;
    return {
      pasos: [
        { txt: `${fmt(o.b)} es casi ${fmt(o.redondo)}. Quito ${fmt(o.redondo)}:`, q: `${fmt(o.a)} − ${fmt(o.redondo)} = ?`, r: X, vis: this.rec(o.a, [-o.redondo]), extra: [o.a - o.b, X - o.e, X + 100] },
        { txt: `He quitado ${o.e} de más. Los devuelvo:`, q: `${fmt(X)} + ${o.e} = ?`, r: o.r, vis: this.rec(X, [o.e]), extra: [X - o.e, X + 2 * o.e, X + 10] }
      ],
      final: { txt: 'Entonces:', q: `${this.texto(o)} = ?`, r: o.r, vis: this.vista(o), extra: [X, X - o.e, X + 2 * o.e] }
    };
  },
  item(nivel) {
    const o = this.crear(nivel, rnd(0, 1) ? 's' : 'r'), r = o.r, e = o.e;
    const extra = o.tipo === 's' ? [r + e, r + 2 * e, r - e, r + 10, r - 10] : [r - e, r - 2 * e, r + 2 * e, r + 100, r - 100];
    return { q: this.texto(o), r, vis: this.vista(o), extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada operación con su resultado',
    pares() {
      const out = [], vistos = new Set();
      while (out.length < 6) { const o = ESTR.get('compensar4').crear(2, out.length % 2 ? 'r' : 's'); const t = ESTR.get('compensar4').texto(o); if (!vistos.has(o.r) && t.length <= 9) { vistos.add(o.r); out.push([t, o.r]); } }
      return out;
    }
  }
});
