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
    { txt: 'Tu turno: estás en 9,5. Suma 0,5 y toca dónde llegas.', toca: { t: 'recta', desde: 8, hasta: 11, paso: 0.5, inicio: 9.5, objetivo: 10 } },
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
        { txt: 'Junto las dos mitades:', q: '0,5 + 0,5 = ?', r: 1, vis: { t: 'recta', desde: 0, hasta: 2, paso: 0.5, inicio: 0.5, saltos: [0.5] }, extra: [0.1, 0.5, 5], errores: _errc4(1, [[0.5, 'Eso es solo una mitad. Junta las dos mitades.'], [0.1, 'Media unidad más media unidad llegan a la unidad entera.'], [5, 'Es 0,5, no 5: es media unidad.']]) },
        { txt: 'Ahora sumo las unidades enteras:', q: `${x} + ${y} = ?`, r: x + y, extra: [x + y - 1], errores: _errc4(x + y, [[x + y + 1, 'Aquí solo sumas las unidades enteras.'], [x * y, 'Es una suma, no una multiplicación.']]) }
      ],
      final: { txt: 'Entonces:', q: `${fmt(a)} + ${fmt(b)} = ?`, r, vis: this.rec(a, [y, 0.5]), extra: [], errores: _errc4(r, [[x + y, 'Falta contar la unidad que forman los dos medios.'], [x + y + 0.5, 'Los dos medios forman una unidad entera, no media.'], [r + 0.5, 'Te has pasado media unidad.']]) }
    };
  },
  item(nivel) {
    const o = this.crear(nivel), r = o.r;
    const a = o.a, b = o.b, medA = a % 1 !== 0, medB = b % 1 !== 0;
    let E;
    if (o.op === '+') E = medA ? [[_M(r - 1), 'Dos medios hacen una unidad entera. ¿La has contado?'], [_M(r + 0.5), 'Te has pasado media unidad. Junta bien los medios.'], [_M(r - 0.5), 'Te falta media unidad. Junta bien los medios.']] : [[_M(a + 5), 'Es 0,5, no 5: es media unidad.'], [a + 1, 'Sumar 0,5 es media unidad, no una entera.'], [a, 'Sumar 0,5 sí cambia el número: es media unidad.']];
    else if (!medB) E = [[_M(a - 1), 'Restar 0,5 es ir atrás media unidad, no una entera.'], [_M(a - 5), 'Es 0,5, no 5: es media unidad.'], [_M(a + 0.5), 'Es una resta: vas hacia atrás, no hacia delante.']];
    else E = [[_M(r + 0.5), 'Te falta quitar el 0,5 del segundo número.'], [_M(r - 0.5), 'Has quitado media unidad de más. Cuenta los medios.'], [_M(r + 1), 'Falta quitar algo más: mira bien el segundo número.']];
    return { q: o.q, r, vis: o.vis, extra: [_M(r + 1), _M(r - 1)], errores: _errc4(r, E) };
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
