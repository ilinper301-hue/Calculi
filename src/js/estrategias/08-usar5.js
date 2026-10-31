/* Estrategia 8 · Usar el 5 */
ESTR.add({
  id: 'usar5', orden: 8, tri: 2,
  n: 'Usar el 5', ic: '🖐️', desc: 'Un 5 y lo que sobra',
  truco: 'Separo el 5 y sumo',
  tutorial: [
    { txt: 'Una mano tiene 5 dedos. El 6 es una mano y un dedo más.', vis: { t: 'dedos', n: 6 } },
    { txt: 'En el marco se ve igual: 6 es una fila de 5 y 1 más.', vis: { t: 'marco', a: 6, tam: 10 } },
    { txt: 'Para 6 + 7 separo los cincos: 5 + 1 y 5 + 2.', vis: { t: 'marco', a: 6, b: 7, tam: 20 } },
    { txt: 'Junto los dos cincos y hacen 10. Me sobran 1 y 2, que son 3.', vis: { t: 'parte', total: 13, a: 10, b: 3 } },
    { txt: 'Tu turno: el 7 es una mano y ¿cuántos dedos más?', toca: { t: 'elige', q: '7 = 5 + ?', ops: [2, 5, 3], r: 2 } },
    { txt: 'Truco: 6 + 7 = 10 + 3 = 13. Siempre saco el 5 de cada número.', vis: { t: 'marco', a: 10, b: 3, tam: 20 } }
  ],
  guiada() {
    const a = rnd(6, 9), b = rnd(6, 9);
    return {
      pasos: [
        { txt: `El ${a} es una mano y ¿cuántos dedos más?`, q: `${a} = 5 + ?`, r: a - 5, errores: [[5, 'El 5 es la mano llena. ¿Cuántos dedos más hay?'], [a, `El ${a} es todo. Quita la mano de 5.`], [a - 4, 'Cuenta otra vez los dedos de la segunda mano.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a - 5), ops: opciones(a - 5, 3, [a - 4, a - 6, 5], 20), vis: { t: 'dedos', n: a } },
        { txt: `Y el ${b}, ¿cuántos más que 5?`, q: `${b} = 5 + ?`, r: b - 5, errores: [[5, 'El 5 es la mano llena. ¿Cuántos dedos más hay?'], [b, `El ${b} es todo. Quita la mano de 5.`], [b - 4, 'Cuenta otra vez los dedos de la segunda mano.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== b - 5), ops: opciones(b - 5, 3, [b - 4, b - 6, 5], 20), vis: { t: 'dedos', n: b } },
        { txt: 'Junto lo que me sobra de cada número:', q: `${a - 5} + ${b - 5} = ?`, r: a + b - 10, errores: [[a - 5, 'Falta sumar lo que sobra del otro número.'], [b - 5, 'Falta sumar lo que sobra del otro número.'], [a + b - 9, 'Casi. Cuenta otra vez los dedos que sobran.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a + b - 10), ops: opciones(a + b - 10, 3, [a - 5, b - 5], 20), vis: { t: 'marco', a: a - 5, b: b - 5, tam: 10 } }
      ],
      final: { txt: `Dos manos son 10 y sobran ${a + b - 10}. Entonces:`, q: `${a} + ${b} = ?`, r: a + b, errores: [[10, 'Las dos manos son 10, pero aún sobran dedos.'], [a + b - 1, 'Casi. Cuenta otra vez los dedos que sobran.'], [a + b + 1, 'Casi. Cuenta otra vez los dedos que sobran.'], [a + b - 5, 'Has olvidado una mano. Hay dos.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a + b), ops: opciones(a + b, 3, [10, a + b - 1, a + b + 1], 20), vis: { t: 'marco', a, b, tam: 20 } }
    };
  },
  item(nivel) {
    if (nivel === 1) {
      const a = rnd(6, 9);
      return { q: `${a} = 5 + ?`, r: a - 5, errores: [[5, 'El 5 es la mano llena. ¿Cuántos dedos más hay?'], [a, `El ${a} es todo. Quita la mano de 5.`], [a - 4, 'Cuenta otra vez los dedos de la segunda mano.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a - 5), vis: rnd(0, 1) ? { t: 'marco', a, tam: 10 } : { t: 'dedos', n: a }, ops: opciones(a - 5, 3, [a - 4, a - 6, 5], 20) };
    }
    const a = rnd(5, 9), b = rnd(5, 9), r = a + b, vis = { t: 'marco', a, b, tam: 20 };
    const ops = opciones(r, 3, [10, r + 1, r - 1, r - 5], 20);
    const errores = [[10, 'Las dos manos son 10, pero aún sobran dedos.'], [r - 1, 'Casi. Cuenta otra vez lo que sobra.'], [r + 1, 'Casi. Cuenta otra vez lo que sobra.'], [r - 5, 'Has olvidado una mano. Hay dos.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r);
    if (nivel === 2 && a > 5 && b > 5 && rnd(0, 2) === 0) return { q: `5 + ${a - 5} + 5 + ${b - 5}`, r, vis, errores, ops };
    return { q: `${a} + ${b}`, r, vis, errores, ops };
  },
  juego: {
    tipo: 'parejas', meta: 'Separa el 5 y suma',
    pares() {
      const ps = shuffle([[5, 5], [6, 5], [6, 6], [7, 5], [7, 6], [7, 7], [8, 5], [8, 6], [9, 5], [9, 6], [8, 7], [9, 8]]);
      const out = [], vistos = new Set();
      for (const [a, b] of ps) { if (vistos.has(a + b)) continue; vistos.add(a + b); out.push([`${a} + ${b}`, a + b]); if (out.length === 6) break; }
      return out;
    }
  }
});
