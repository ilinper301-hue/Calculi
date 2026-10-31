/* 3.º · Truco 8 · Dividir con la tabla (24 : 6 → 6 × ? = 24) */
const _er3_08 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
ESTR.add({
  id: 'dividirtabla', curso: 3, orden: 8, tri: 2,
  n: 'Dividir con la tabla', ic: '12:3', desc: 'Busco en la tabla',
  truco: 'Busco en la tabla de multiplicar',
  tutorial: [
    { txt: '24 : 6 es repartir 24 en 6 partes iguales. ¿Cuánto vale cada parte?', vis: { t: 'barra', partes: 6, marcadas: 6, total: 24, valor: '?', oculto: 'valor' } },
    { txt: 'Dividir es lo contrario de multiplicar. Pienso: 6 × ? = 24.', vis: { t: 'matriz', filas: 6, cols: 4 } },
    { txt: 'Busco en la tabla del 6: 6 × 4 = 24. Entonces 24 : 6 = 4.', vis: { t: 'matriz', filas: 6, cols: 4 } },
    { txt: 'Tu turno: 28 : 4. Pienso en la tabla del 4. ¿Qué número falta?', toca: { t: 'elige', q: '4 × ? = 28', ops: [6, 7, 8, 24], r: 7 } },
    { txt: 'Truco: para dividir, pienso en la tabla. 35 : 7, ¿qué número por 7 da 35? 7 × 5 = 35, así que 35 : 7 = 5.', vis: { t: 'matriz', filas: 7, cols: 5 } }
  ],
  guiada() {
    const b = rnd(3, 9), q = rnd(3, 9), a = b * q;
    return {
      pasos: [
        { txt: `Busco en la tabla del ${b}. ¿Qué número falta?`, q: `${b} × ? = ${a}`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, a - b], errores: _er3_08(q, [[q + 1, 'Casi. Multiplica ese número por tu tabla y mira si sale.'], [a - b, 'Eso es restar. Busca qué número por la tabla da el total.']]) },
        { txt: 'Compruebo la multiplicación:', q: `${b} × ${q} = ?`, r: a, vis: { t: 'matriz', filas: b, cols: q }, extra: [a + b, a - b, a + q], errores: _er3_08(a, [[a + b, 'Eso es sumar. Aquí se multiplica.'], [a - b, 'Eso es restar. Aquí se multiplica.']]) }
      ],
      final: { txt: 'Dividir es lo contrario:', q: `${a} : ${b} = ?`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, a - b], errores: _er3_08(q, [[a - b, 'Eso es restar. Dividir es buscar en la tabla.'], [b, 'Ese es el número entre el que divides. Busca en su tabla.'], [q + 1, 'Casi. Multiplica tu respuesta y comprueba.']]) }
    };
  },
  item(nivel) {
    const b = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 9) : rnd(4, 10);
    const q = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(5, 10), a = b * q;
    return { q: `${a} : ${b} = ?`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, q + 2, b, a - b], errores: _er3_08(q, [[b, 'Ese es el número entre el que divides. Busca en su tabla.'], [a - b, 'Eso es restar. Dividir es buscar en la tabla.'], [q + 1, 'Casi. Multiplica tu respuesta por el divisor y comprueba.'], [q - 1, 'Casi. Multiplica tu respuesta por el divisor y comprueba.']]) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada división con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(q => { const b = rnd(2, 9); return [`${b * q} : ${b}`, q]; }); }
  }
});
