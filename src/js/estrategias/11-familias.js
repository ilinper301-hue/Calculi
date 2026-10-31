/* Estrategia 11 · Familias de operaciones */
(function () {
  // Devuelve {a, b, t} con a + b = t; a y b distintos si dist
  function suma(nivel, dist) {
    const max = nivel === 3 ? 20 : 10, min = nivel === 3 ? 11 : 3;
    for (;;) {
      const t = rnd(min, max), a = rnd(1, t - 1), b = t - a;
      if (!dist || a !== b) return { a, b, t };
    }
  }
  ESTR.add({
    id: 'familias', orden: 11, tri: 2,
    n: 'Familias de operaciones', ic: '👨‍👩‍👧', desc: 'Sumas y restas hermanas',
    truco: 'Uso la suma para restar',
    tutorial: [
      { txt: 'Los números 3, 4 y 7 son una familia.', vis: { t: 'parte', total: 7, a: 3, b: 4 } },
      { txt: 'Juntos: 3 + 4 = 7. Y también 4 + 3 = 7.', vis: { t: 'marco', a: 3, b: 4, tam: 10 } },
      { txt: 'Si quito las 4 naranjas, quedan 3. Entonces 7 − 4 = 3.', vis: { t: 'marco', a: 3, b: 4, tam: 10, tachar: 4 } },
      { txt: 'Y si quito las 3 azules, quedan 4. Entonces 7 − 3 = 4.', vis: { t: 'parte', total: 7, a: 3, b: 4, oculto: 'b' } },
      { txt: 'Tu turno: sé que 5 + 4 = 9. ¿Cuánto es 9 − 4?', toca: { t: 'elige', q: '9 − 4 = ?', ops: [4, 5, 13], r: 5 } },
      { txt: 'Truco: para 9 − 4 pienso en la suma de su familia: ? + 4 = 9.', vis: { t: 'parte', total: 9, a: 5, b: 4, oculto: 'a' } }
    ],
    guiada() {
      const { a, b, t } = suma(2, true);
      return {
        pasos: [
          { txt: `Sé que ${a} + ${b} = ${t}. ¿Cuánto es ${b} + ${a}?`, q: `${b} + ${a} = ?`, r: t, errores: [[a, 'Es la misma suma con el orden cambiado. Junta los dos números.'], [b, 'Es la misma suma con el orden cambiado. Junta los dos números.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] !== t), vis: { t: 'parte', total: t, a, b } },
          { txt: `Si de ${t} quito ${b}, ¿cuántos quedan?`, q: `${t} − ${b} = ?`, r: a, errores: [[b, 'Ese ya lo quitas. Piensa: ¿qué número y ' + b + ' hacen ' + t + '?'], [t, `El ${t} es el total. Busca el número que queda.`]].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] !== a), vis: { t: 'parte', total: t, a, b, oculto: 'a' } }
        ],
        final: { txt: 'Ahora la otra resta de la familia:', q: `${t} − ${a} = ?`, r: b, errores: [[a, 'Ese ya lo quitas. Piensa: ' + a + ' y ¿cuánto? hacen ' + t + '.'], [t, `El ${t} es el total. Busca el número que queda.`]].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] !== b), vis: { t: 'parte', total: t, a, b, oculto: 'b' } }
      };
    },
    item(nivel) {
      const { a, b, t } = suma(nivel, false);
      const quitar = rnd(0, 1), x = quitar ? a : b, r = quitar ? b : a;
      return {
        txt: `Si ${a} + ${b} = ${t}…`, q: `${t} − ${x} = ?`, r,
        errores: [[t, `El ${t} es el total. Piensa: ¿qué número y ${x} hacen ${t}?`], [x, 'Ese ya lo quitas. Busca el otro número de la familia.'], [r + 1, `Casi. Piensa en la suma: ? + ${x} = ${t}.`], [r - 1, `Casi. Piensa en la suma: ? + ${x} = ${t}.`]].filter((e, i, l) => l.findIndex(y => y[0] === e[0]) === i && e[0] >= 0 && e[0] !== r),
        vis: { t: 'parte', total: t, a, b, oculto: quitar ? 'b' : 'a' },
        ops: opciones(r, 3, [t, x, t + x, r + 1], 20)
      };
    },
    juego: {
      tipo: 'parejas', meta: 'Une la suma con su resta',
      pares() {
        const ts = shuffle([5, 6, 7, 8, 9, 10, 11, 12]).slice(0, 6);
        return ts.map(t => { const a = rnd(1, Math.floor((t - 1) / 2)), b = t - a; return [`${a} + ${b} = ${t}`, `${t} − ${a} = ${b}`]; });
      }
    }
  });
})();
