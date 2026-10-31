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
    { txt: 'Tu turno: estás en 3,7. Quiero sumar 0,6: primero 0,3 hasta el 4 y luego 0,3 más. Toca dónde llegas.', toca: { t: 'recta', desde: 3.5, hasta: 4.5, paso: 0.1, inicio: 3.7, objetivo: 4.3 } },
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
        { txt: `Primero completo la unidad: de ${fmt(a)} a ${w + 1}.`, q: `${fmt(a)} + ${fmt(c1)} = ?`, r: w + 1, vis: this.rec(a, [c1]), extra: [_R1(w + 1.1), _R1(a + 0.1), w], errores: _errc4(w + 1, [[_R1(w + 1.1), 'Solo hasta el siguiente entero, ni una décima más.'], [w, 'Hay que llegar al siguiente entero, no quedarse atrás.'], [_R1(a + 0.1), 'Sumas lo que falta para llegar al entero, no solo una décima.']]) },
        { txt: `${fmt(b)} son ${fmt(c1)} y ${fmt(c2)}. Ya sumé ${fmt(c1)}; ahora sumo ${fmt(c2)}:`, q: `${w + 1} + ${fmt(c2)} = ?`, r, vis: this.rec(w + 1, [c2]), extra: [], errores: _errc4(r, [[_R1(r + 0.1), 'Te has pasado una décima. Cuenta las que sobran.'], [_R1(r - 0.1), 'Te falta una décima. Cuenta las que sobran.'], [_R1(w + 1 + c2 * 10), 'Son décimas, no unidades: revisa dónde va la coma.']]) }
      ],
      final: { txt: 'Entonces:', q: `${fmt(a)} + ${fmt(b)} = ?`, r, vis: this.rec(a, [c1, c2]), extra: [], errores: _errc4(r, [[w + 1, 'Llegaste al entero, pero te faltan las décimas que sobran.'], [_R1(r + 0.1), 'Te has pasado una décima. Cuenta las que sobran.'], [_R1(r - 0.1), 'Te falta una décima. Cuenta las que sobran.'], [_R1(w + k / 10 + j), 'Las décimas se suman como décimas, no como unidades.']]) }
    };
  },
  item(nivel) {
    if (nivel === 1) {
      const k = rnd(1, 9), a = k / 10, b = _R1((10 - k) / 10);
      return { q: `${fmt(a)} + ${fmt(b)}`, r: 1, vis: this.rec(a, [b]), extra: [], errores: _errc4(1, [[0.1, '10 décimas hacen 1 unidad entera, no 0,1.'], [10, '10 décimas son 1 unidad entera, no 10.'], [1.1, `${fmt(a)} y ${fmt(b)} llegan justo a la unidad, sin pasarse.`], [0.9, `Te falta una décima: ${fmt(a)} y ${fmt(b)} llegan justo al entero.`]]) };
    }
    if (nivel === 2) {
      const w = rnd(1, 9), k = rnd(1, 9), a = _R1(w + k / 10), b = _R1((10 - k) / 10), r = w + 1;
      const q = rnd(0, 1) ? `${fmt(a)} + ${fmt(b)}` : `${fmt(b)} + ${fmt(a)}`;
      return { q, r, vis: this.rec(a, [b]), extra: [10 * r], errores: _errc4(r, [[w, 'Te has quedado corto: hay que llegar al siguiente entero.'], [_R1(r + 0.1), 'Te has pasado una décima. Completa solo hasta el entero.'], [_R1(r - 0.1), 'Te falta una décima. Cuenta las que faltan para el entero.'], [_R1(w + 0.9), 'Casi, pero la décima que falta lleva al siguiente entero.']]) };
    }
    if (rnd(0, 1)) {
      const w = rnd(1, 8), k = rnd(2, 9), j = rnd(10 - k + 1, 9), a = _R1(w + k / 10), b = _R1(j / 10), r = _R1(a + b);
      return { q: `${fmt(a)} + ${fmt(b)}`, r, vis: this.rec(a, [b]), extra: [_R1(r - 1), _R1(r + 1)], errores: _errc4(r, [[_R1(w + 1 + j / 10), 'Tras llegar al entero, solo sumas las décimas que te sobran.'], [w + 1, 'Llegaste al entero, pero te faltan las décimas que sobran.'], [_R1(r + 0.1), 'Te has pasado una décima. Cuenta las que sobran.'], [_R1(r - 0.1), 'Te falta una décima. Cuenta las que sobran.'], [_R1(r / 10), 'Revisa dónde va la coma: son décimas.']]) };
    }
    const k = rnd(2, 9), j = rnd(10 - k + 1, 9), a = _R1(k / 10), b = _R1(j / 10), r = _R1(a + b);
    return { q: `${fmt(a)} + ${fmt(b)}`, r, vis: this.rec(a, [b]), extra: [_R1(r + 1), _R1(r - 1)], errores: _errc4(r, [[1, 'Llegaste a la unidad, pero te faltan las décimas que sobran.'], [_R1(r + 0.1), 'Te has pasado una décima. Cuenta las que sobran.'], [_R1(r - 0.1), 'Te falta una décima. Cuenta las que sobran.'], [_R1(r * 10), 'Son décimas, no unidades: revisa dónde va la coma.']]) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada suma con su resultado',
    pares() { return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(w => { const k = rnd(1, 9); return [`${fmt(_R1(w + k / 10))} + ${fmt(_R1((10 - k) / 10))}`, w + 1]; }); }
  }
});
