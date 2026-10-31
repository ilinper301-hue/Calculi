/* 3.º · Truco 6 · El orden en las tablas (conmutativa: 8 × 3 = 3 × 8) */
const _er3_06 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'conmutar', curso: 3, orden: 6, tri: 2,
  n: 'El orden en las tablas', ic: '3×8', desc: 'Doy la vuelta y elijo la fácil',
  truco: 'Doy la vuelta a la multiplicación',
  tutorial: [
    { txt: '3 × 8 son 3 filas de 8 puntos. Hay 24.', vis: { t: 'matriz', filas: 3, cols: 8 } },
    { txt: 'Giro el dibujo: ahora son 8 filas de 3 puntos. Siguen siendo 24.', vis: { t: 'matriz', filas: 8, cols: 3 } },
    { txt: 'Por eso 8 × 3 = 3 × 8. Puedo cambiar el orden y el resultado es igual.', vis: { t: 'matriz', filas: 8, cols: 3 } },
    { txt: 'Tu turno: 9 × 4 es lo mismo que 4 × 9. Elige el número que falta.', toca: { t: 'elige', q: '9 × 4 = 4 × ?', ops: [4, 9, 13, 36], r: 9 } },
    { txt: 'Truco: si una tabla me cuesta, la doy la vuelta y uso la fácil. 9 × 2 es lo mismo que 2 × 9 = 18.', vis: { t: 'matriz', filas: 2, cols: 9 } }
  ],
  guiada() {
    const s = rnd(2, 5), g = rnd(6, 9);
    return {
      pasos: [
        { txt: `Doy la vuelta a ${g} × ${s}. ¿Qué número falta?`, q: `${g} × ${s} = ${s} × ?`, r: g, vis: { t: 'matriz', filas: s, cols: g }, extra: [s, g + s, g - 1], errores: _er3_06(g, [[s, 'Ese es el otro número. Al dar la vuelta, cambian de sitio.'], [g + s, 'Eso es sumar. Solo se cambia el orden.']]) },
        { txt: `Ahora hago la tabla fácil, la del ${s}:`, q: `${s} × ${g} = ?`, r: s * g, vis: { t: 'matriz', filas: s, cols: g }, extra: [s + g, s * g + s, s * g - g], errores: _er3_06(s * g, [[s + g, 'Eso es sumar. Aquí se multiplica.'], [s * g + s, 'Te has pasado: sobra un grupo. Revisa la tabla.']]) }
      ],
      final: { txt: 'El resultado es el mismo:', q: `${g} × ${s} = ?`, r: s * g, vis: { t: 'matriz', filas: g, cols: s }, extra: [s + g, s * g + g, s * g - s], errores: _er3_06(s * g, [[s + g, 'Eso es sumar. Aquí se multiplica.'], [s * g + g, 'Te has pasado. Da la vuelta y usa la tabla fácil.']]) }
    };
  },
  item(nivel) {
    const s = nivel === 1 ? rnd(2, 3) : rnd(2, 5), g = nivel === 1 ? rnd(6, 9) : nivel === 2 ? rnd(6, 10) : rnd(7, 10);
    const extra = [s + g, s * g + s, s * g - s, s * g + g, s * g - g];
    const errores = _er3_06(s * g, [[s + g, 'Eso es sumar. Aquí hay que multiplicar.'], [s * g + s, 'Te has pasado: sobra un grupo. Da la vuelta y cuenta.'], [s * g - s, 'Te falta un grupo. Da la vuelta y usa la tabla fácil.'], [s * g - g, 'Te falta un grupo. Da la vuelta y usa la tabla fácil.']]);
    if (nivel > 1 && rnd(0, 3) === 0) return { q: `${s} × ${g} = ?`, r: s * g, vis: { t: 'matriz', filas: s, cols: g }, extra, errores };
    return { q: `${g} × ${s} = ?`, r: s * g, vis: { t: 'matriz', filas: g, cols: s }, extra, errores };
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
