/* 3.º · Truco 4 · Tabla del 9 (PLANTILLA de referencia para los cursos de 2.º a 6.º) */
const _er3_04 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'tabla9', curso: 3, orden: 4, tri: 1,
  n: 'Tabla del 9', ic: '×9', desc: '×10 y quito una vez',
  truco: 'Multiplico por 10 y quito una vez',
  tutorial: [
    { txt: '9 × 4 son 9 filas de 4. Es casi lo mismo que 10 filas de 4.', vis: { t: 'matriz', filas: 9, cols: 4 } },
    { txt: '10 × 4 es fácil: 40. Tiene una fila de más.', vis: { t: 'matriz', filas: 10, cols: 4, tachar: 1 } },
    { txt: 'Quito esa fila: 40 − 4 = 36. Así que 9 × 4 = 36.', vis: { t: 'matriz', filas: 10, cols: 4, tachar: 1 } },
    { txt: 'Tu turno: 9 × 6. Parto de 60 (10 × 6) y quito 6. Toca en la recta dónde llegas.', toca: { t: 'recta', desde: 50, hasta: 60, inicio: 60, objetivo: 54 } },
    { txt: 'Truco: multiplico por 10 y quito el número una vez. 9 × 7 = 70 − 7 = 63.', vis: { t: 'recta', desde: 60, hasta: 70, inicio: 70, saltos: [-7] } }
  ],
  guiada() {
    const n = rnd(2, 9);
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `10 × ${n} = ?`, r: 10 * n, vis: { t: 'matriz', filas: 10, cols: n, tachar: 1 }, extra: [9 * n, n], errores: _er3_04(10 * n, [[9 * n, 'Eso es lo que buscamos al final. Ahora solo ×10.'], [n, 'Ese es el número solo. Multiplícalo por 10.']]) },
        { txt: 'Ahora quito una vez el número:', q: `${10 * n} − ${n} = ?`, r: 9 * n, vis: { t: 'matriz', filas: 10, cols: n, tachar: 1 }, extra: [10 * n - 10, 9 * n + 1], errores: _er3_04(9 * n, [[10 * n, 'Te has quedado en el ×10. Falta quitar el número una vez.'], [10 * n - 10, 'Has quitado 10. Quita solo el número, una vez.'], [9 * n + 1, 'Casi: te has pasado por uno.']]) }
      ],
      final: { txt: 'Entonces:', q: `9 × ${n} = ?`, r: 9 * n, vis: { t: 'matriz', filas: 9, cols: n }, extra: [10 * n, 9 * n - 1, 8 * n], errores: _er3_04(9 * n, [[10 * n, 'Has hecho ×10. Ahora quita el número una vez.'], [8 * n, 'Has quitado el número dos veces. Quítalo solo una.'], [9 * n - 1, 'Casi: te falta uno. Revisa la resta.']]) }
    };
  },
  item(nivel) {
    const n = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(2, 10) : rnd(6, 10);
    const errores = _er3_04(9 * n, [[10 * n, 'Has hecho ×10. Ahora quita el número una vez.'], [9 * n + 9, 'Te has pasado: has sumado en vez de quitar.'], [9 * n - 1, 'Casi: te falta uno. Revisa la resta.'], [8 * n, 'Has quitado el número dos veces. Quítalo solo una.']]); // olvidar restar, quitar de más…
    const extra = errores.map(e => e[0]);
    // El dibujo siempre coincide con el texto: «9 × n» = 9 filas de n; «n × 9» = n filas de 9.
    if (rnd(0, 1)) return { q: `9 × ${n} = ?`, r: 9 * n, vis: { t: 'matriz', filas: 9, cols: n }, extra, errores };
    return { q: `${n} × 9 = ?`, r: 9 * n, vis: { t: 'matriz', filas: n, cols: 9 }, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [`9 × ${n}`, 9 * n]); }
  }
});
