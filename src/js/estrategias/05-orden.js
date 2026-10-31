/* Estrategia 5 · El orden no importa (conmutativa) */
ESTR.add({
  id: 'orden', orden: 5, tri: 1,
  n: 'El orden no importa', ic: '🔄', desc: 'Empiezo por el grande',
  truco: 'Empiezo por el número grande',
  tutorial: [
    { txt: 'Tengo 2 fichas azules y 7 naranjas. ¿Cuántas hay en total?', vis: { t: 'marco', a: 2, b: 7 } },
    { txt: 'Si giro el marco, tengo 7 azules y 2 naranjas. ¡Siguen siendo 9!', vis: { t: 'marco', a: 7, b: 2 } },
    { txt: '2 + 7 = 7 + 2. Da igual el orden: la suma es la misma.', vis: { t: 'parte', total: 9, a: 2, b: 7 } },
    { txt: 'Es más fácil empezar por el grande: 7 y dos más… ¡8, 9!', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 7, saltos: [1, 1] } },
    { txt: 'Tu turno: en 2 + 7 empiezas en el 7, el grande. Toca el número al que llegas sumando 2.', toca: { t: 'recta', desde: 0, hasta: 10, inicio: 7, objetivo: 9 } },
    { txt: 'Truco: en 2 + 7 empiezo por el 7 y sumo 2 más.', vis: { t: 'marco', a: 7, b: 2 } }
  ],
  guiada() {
    const a = rnd(1, 4), b = rnd(a + 1, Math.min(9, 10 - a)), t = a + b;
    return {
      pasos: [
        { txt: `${a} + ${b} es lo mismo que ${b} + ${a}. ¿Cuál es el número grande?`, q: '?', r: b, errores: [[a, `El ${a} es el pequeño. Busca el grande.`], [t, `El ${t} es el total. Busca el mayor de los dos números.`]], vis: { t: 'marco', a: b, b: a }, ops: opciones(b, 3, [a, t, b - 1], 10) }
      ],
      final: { txt: `Empiezo por el ${b} y sumo ${a}:`, q: `${b} + ${a}`, r: t, errores: [[b, `Ese es donde empiezas. Suma ${a} más.`], [t - 1, `Casi. Empieza en el ${b} y no lo cuentes.`], [t + 1, `Te has pasado. Desde el ${b}, suma solo ${a}.`]].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i), vis: { t: 'marco', a: b, b: a }, ops: opciones(t, 3, [b, t - 1, t + 1], 10) }
    };
  },
  item(nivel) {
    const a = rnd(1, 4), b = rnd(a + 1, Math.min(9, 10 - a)), t = a + b;
    const forma = nivel === 1 ? rnd(0, 1) : rnd(0, 2);
    // formas 1 y 2: el dibujo muestra el lado derecho ya girado; forma 0: el dibujo es la suma tal cual
    const vis = { t: 'marco', a: b, b: a };
    const E = (r, l) => l.filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r);
    const o = (r, ex) => nivel < 3 ? opciones(r, 3, ex, 10) : undefined;
    if (forma === 1) return { q: `${a} + ${b} = ${b} + ?`, r: a, vis, errores: E(a, [[b, `El ${b} ya está escrito. Al girar, el otro número cambia de sitio.`], [t, `El ${t} es el resultado. Busca el número que falta.`], [a + 1, 'Casi. Es el mismo número que al principio, pero al otro lado.']]), ops: o(a, [b, t, a + 1]) };
    if (forma === 2) return { q: `${a} + ${b} = ? + ${a}`, r: b, vis, errores: E(b, [[a, `El ${a} ya está escrito. Al girar, el otro número cambia de sitio.`], [t, `El ${t} es el resultado. Busca el número que falta.`], [b + 1, 'Casi. Es el mismo número que al principio, pero al otro lado.']]), ops: o(b, [a, t, b + 1]) };
    return { q: `${a} + ${b}`, r: t, vis: { t: 'marco', a, b }, errores: E(t, [[b, `Has puesto solo el ${b}. Suma también el ${a}.`], [t - 1, `Casi. Empieza por el ${b} y suma ${a} más.`], [t + 1, `Te has pasado. Empieza por el ${b} y suma solo ${a}.`]]), ops: o(t, [b, t - 1, t + 1]) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une las sumas que dan igual',
    pares() {
      // una pareja por cada total distinto (así cada tarjeta solo encaja con una)
      const C = { 4: [[1, 3]], 5: [[1, 4], [2, 3]], 6: [[1, 5], [2, 4]], 7: [[1, 6], [2, 5], [3, 4]], 8: [[1, 7], [2, 6], [3, 5]], 9: [[1, 8], [2, 7], [3, 6], [4, 5]], 10: [[1, 9], [2, 8], [3, 7], [4, 6]] };
      return shuffle([4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(t => pick(C[t])).map(([a, b]) => rnd(0, 1) ? [`${a} + ${b}`, `${b} + ${a}`] : [`${b} + ${a}`, `${a} + ${b}`]);
    }
  }
});
