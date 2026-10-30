/* 3.º · Truco 8 · Dividir con la tabla (24 : 6 → 6 × ? = 24) */
ESTR.add({
  id: 'dividirtabla', curso: 3, orden: 8, tri: 2,
  n: 'Dividir con la tabla', ic: '12:3', desc: 'Busco en la tabla',
  truco: 'Busco en la tabla de multiplicar',
  tutorial: [
    { txt: '24 : 6 es repartir 24 en 6 partes iguales. ¿Cuánto vale cada parte?', vis: { t: 'barra', partes: 6, marcadas: 6, total: 24, valor: '?', oculto: 'valor' } },
    { txt: 'Dividir es lo contrario de multiplicar. Pienso: 6 × ? = 24.', vis: { t: 'matriz', filas: 6, cols: 4 } },
    { txt: 'Busco en la tabla del 6: 6 × 4 = 24. Entonces 24 : 6 = 4.', vis: { t: 'matriz', filas: 6, cols: 4 } },
    { txt: 'Truco: para dividir, pienso en la tabla. 35 : 7, ¿qué número por 7 da 35? 7 × 5 = 35, así que 35 : 7 = 5.', vis: { t: 'matriz', filas: 7, cols: 5 } }
  ],
  guiada() {
    const b = rnd(3, 9), q = rnd(3, 9), a = b * q;
    return {
      pasos: [
        { txt: `Busco en la tabla del ${b}. ¿Qué número falta?`, q: `${b} × ? = ${a}`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, a - b] },
        { txt: 'Compruebo la multiplicación:', q: `${b} × ${q} = ?`, r: a, vis: { t: 'matriz', filas: b, cols: q }, extra: [a + b, a - b, a + q] }
      ],
      final: { txt: 'Dividir es lo contrario:', q: `${a} : ${b} = ?`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, a - b] }
    };
  },
  item(nivel) {
    const b = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 9) : rnd(4, 10);
    const q = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 10) : rnd(5, 10), a = b * q;
    return { q: `${a} : ${b} = ?`, r: q, vis: { t: 'barra', partes: b, marcadas: b, total: a, valor: '?', oculto: 'valor' }, extra: [q + 1, q - 1, q + 2, b, a - b] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada división con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(q => { const b = rnd(2, 9); return [`${b * q} : ${b}`, q]; }); }
  }
});
