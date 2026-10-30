/* 3.º · Truco 6 · El orden en las tablas (conmutativa: 8 × 3 = 3 × 8) */
ESTR.add({
  id: 'conmutar', curso: 3, orden: 6, tri: 2,
  n: 'El orden en las tablas', ic: '3×8', desc: 'Doy la vuelta y elijo la fácil',
  truco: 'Doy la vuelta a la multiplicación',
  tutorial: [
    { txt: '3 × 8 son 3 filas de 8 puntos. Hay 24.', vis: { t: 'matriz', filas: 3, cols: 8 } },
    { txt: 'Giro el dibujo: ahora son 8 filas de 3 puntos. Siguen siendo 24.', vis: { t: 'matriz', filas: 8, cols: 3 } },
    { txt: 'Por eso 8 × 3 = 3 × 8. Puedo cambiar el orden y el resultado es igual.', vis: { t: 'matriz', filas: 8, cols: 3 } },
    { txt: 'Truco: si una tabla me cuesta, la doy la vuelta y uso la fácil. 9 × 2 es lo mismo que 2 × 9 = 18.', vis: { t: 'matriz', filas: 2, cols: 9 } }
  ],
  guiada() {
    const s = rnd(2, 5), g = rnd(6, 9);
    return {
      pasos: [
        { txt: `Doy la vuelta a ${g} × ${s}. ¿Qué número falta?`, q: `${g} × ${s} = ${s} × ?`, r: g, vis: { t: 'matriz', filas: s, cols: g }, extra: [s, g + s, g - 1] },
        { txt: `Ahora hago la tabla fácil, la del ${s}:`, q: `${s} × ${g} = ?`, r: s * g, vis: { t: 'matriz', filas: s, cols: g }, extra: [s + g, s * g + s, s * g - g] }
      ],
      final: { txt: 'El resultado es el mismo:', q: `${g} × ${s} = ?`, r: s * g, vis: { t: 'matriz', filas: g, cols: s }, extra: [s + g, s * g + g, s * g - s] }
    };
  },
  item(nivel) {
    const s = nivel === 1 ? rnd(2, 3) : rnd(2, 5), g = nivel === 1 ? rnd(6, 9) : nivel === 2 ? rnd(6, 10) : rnd(7, 10);
    const extra = [s + g, s * g + s, s * g - s, s * g + g, s * g - g];
    if (nivel > 1 && rnd(0, 3) === 0) return { q: `${s} × ${g} = ?`, r: s * g, vis: { t: 'matriz', filas: s, cols: g }, extra };
    return { q: `${g} × ${s} = ?`, r: s * g, vis: { t: 'matriz', filas: g, cols: s }, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su vuelta',
    pares() {
      // Productos distintos (8 × 3 y 6 × 4 darían los dos 24 y se podrían confundir).
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) {
        const s = rnd(2, 5), g = rnd(6, 9);
        if (!vistos.has(s * g)) { vistos.add(s * g); out.push([`${g} × ${s}`, `${s} × ${g}`]); }
      }
      return out;
    }
  }
});
