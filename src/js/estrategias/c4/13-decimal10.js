/* 4.º · Truco 13 · Decimales ×10 y :10 (la coma salta un lugar) */
const _D = x => +x.toFixed(2);
ESTR.add({
  id: 'decimal10', curso: 4, orden: 13, tri: 3,
  n: 'Decimales ×10 y :10', ic: '3,4', desc: 'Cada cifra salta un lugar',
  truco: 'Cada cifra se mueve un lugar',
  tutorial: [
    { txt: 'En 3,4 hay 3 unidades y 4 décimas. Mira las 4 décimas: son 40 de las 100 casillas de una unidad.', vis: { t: 'cien', n: 40 } },
    { txt: 'Al multiplicar 3,4 × 10, las 3 unidades pasan a ser 3 decenas. 4 décimas pasan a ser 4 unidades.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }] } },
    { txt: 'Así que 3,4 × 10 = 34. La coma parece moverse un lugar a la derecha.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }] } },
    { txt: `Tu turno: ${fmt(5.2)} × 10. Cada cifra sube un lugar. Toca el resultado.`, toca: { t: 'elige', q: `${fmt(5.2)} × 10 = ?`, ops: [0.52, 52, 520], r: 52 } },
    { txt: 'Al dividir entre 10 pasa al revés. 56 : 10 = 5,6. Cada cifra baja un lugar.', vis: { t: 'decenas', grupos: [{ d: 5, u: 6 }] } }
  ],
  crear(nivel) {
    if (nivel === 1) {
      const d = rnd(1, 9), u = rnd(1, 9);
      return rnd(0, 1) ? { op: '×', a: _D(d + u / 10), r: 10 * d + u, vis: { t: 'decenas', grupos: [{ d, u }] } } : { op: ':', a: 10 * d + u, r: _D(d + u / 10), vis: { t: 'decenas', grupos: [{ d, u }] } };
    }
    if (nivel === 2) {
      const t = pick([0, 0, 1, 1, 2]);
      if (t === 0) { const a = _D(rnd(11, 99) + rnd(1, 9) / 10); return { op: '×', a, r: _D(a * 10) }; }
      if (t === 1) { const a = rnd(101, 999); return { op: ':', a, r: _D(a / 10) }; }
      const a = _D(rnd(1, 9) / 10); return { op: '×', a, r: _D(a * 10) };
    }
    const t = rnd(0, 3);
    if (t === 0) { const a = _D(rnd(1, 99) + rnd(1, 99) / 100); if (Math.round(a * 100) % 10 === 0) return this.crear(3); return { op: '×', a, r: _D(a * 10) }; }
    if (t === 1) { const a = _D(rnd(1, 99) / 10); return { op: ':', a, r: _D(a / 10) }; }
    if (t === 2) { const a = _D(rnd(1, 99) / 100); if (Math.round(a * 100) % 10 === 0) return this.crear(3); return { op: '×', a, r: _D(a * 10) }; }
    const a = rnd(1, 9); return { op: ':', a, r: _D(a / 10) };
  },
  guiada() {
    const d = rnd(1, 9), u = rnd(1, 9);
    if (rnd(0, 1)) {
      const a = _D(d + u / 10);
      return {
        pasos: [
          { txt: `Primero las ${d} unidades:`, q: `${d} × 10 = ?`, r: 10 * d, vis: { t: 'decenas', grupos: [{ d }] }, extra: [d + 10], errores: _errc4(10 * d, [[d, 'Multiplicar por 10 hace el número más grande.'], [100 * d, 'Por 10 cada cifra sube un solo lugar.']]) },
          { txt: `Ahora las ${u} décimas:`, q: `${fmt(_D(u / 10))} × 10 = ?`, r: u, vis: { t: 'cien', n: 10 * u }, extra: [_D(u / 100)], errores: _errc4(u, [[_D(u / 10), 'Al multiplicar por 10 las décimas pasan a ser unidades.'], [10 * u, 'Las décimas pasan a unidades, no a decenas.']]) }
        ],
        final: { txt: 'Junto las dos partes:', q: `${fmt(a)} × 10 = ?`, r: 10 * d + u, vis: { t: 'decenas', grupos: [{ d, u }] }, extra: [10 * d * u], errores: _errc4(10 * d + u, [[a, 'Al multiplicar el número tiene que crecer.'], [100 * d + 10 * u, 'Has movido la coma dos lugares. Solo hay que mover uno.'], [_D(a / 10), 'Multiplicar agranda: la coma va hacia la derecha.']]) }
      };
    }
    const n = 10 * d + u;
    return {
      pasos: [
        { txt: `Separo ${n} en ${10 * d} y ${u}. Primero ${10 * d}:`, q: `${10 * d} : 10 = ?`, r: d, vis: { t: 'decenas', grupos: [{ d }] }, extra: [d * 10 + 1], errores: _errc4(d, [[10 * d, 'Dividir hace el número más pequeño.'], [10 * d / 100, 'Entre 10 se quita un solo cero.']]) },
        { txt: `Ahora ${u}:`, q: `${u} : 10 = ?`, r: _D(u / 10), vis: { t: 'cien', n: 10 * u }, extra: [10 * u], errores: _errc4(_D(u / 10), [[u, 'Al dividir entre 10 el número se hace más pequeño.'], [_D(u / 100), 'Solo hay que bajar un lugar, no dos.']]) }
      ],
      final: { txt: 'Junto las dos partes:', q: `${n} : 10 = ?`, r: _D(d + u / 10), vis: { t: 'decenas', grupos: [{ d, u }] }, extra: [10 * n], errores: _errc4(_D(d + u / 10), [[n, 'Dividir hace el número más pequeño. Mueve la coma.'], [_D(n / 100), 'Has movido la coma dos lugares. Solo hay que mover uno.'], [_D(u / 10), 'Te falta la parte de las decenas: junta las dos partes.']]) }
    };
  },
  item(nivel) {
    const o = this.crear(nivel), r = o.r, n = o.a;
    const errores = _errc4(r, o.op === '×'
      ? [[n, 'El número tiene que cambiar: cada cifra salta un lugar.'], [r * 10, 'Has movido la coma dos lugares. Solo hay que mover uno.'], [n / 10, 'Al multiplicar el número crece: la coma va a la derecha.']]
      : [[n, 'El número tiene que cambiar: cada cifra salta un lugar.'], [n * 10, 'Al dividir el número se hace más pequeño: la coma va a la izquierda.'], [r / 10, 'Has movido la coma dos lugares. Solo hay que mover uno.']]);
    return { q: `${fmt(n)} ${o.op} 10`, r, vis: o.vis, extra: [_D(r + 0.1)], errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada cuenta con su resultado',
    pares() {
      const out = [], vistos = new Set(), me = ESTR.get('decimal10');
      while (out.length < 6) { const o = me.crear(rnd(2, 3)), q = `${fmt(o.a)} ${o.op} 10`; if (!vistos.has(o.r) && q.length <= 9) { vistos.add(o.r); out.push([q, o.r]); } }
      return out;
    }
  }
});
