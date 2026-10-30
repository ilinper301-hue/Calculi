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
      { txt: 'Truco: si no sé restar, pienso en la suma de su familia.', vis: { t: 'parte', total: 9, a: 5, b: 4, oculto: 'a' } }
    ],
    guiada() {
      const { a, b, t } = suma(2, true);
      return {
        pasos: [
          { txt: `Sé que ${a} + ${b} = ${t}. ¿Cuánto es ${b} + ${a}?`, q: `${b} + ${a} = ?`, r: t, vis: { t: 'parte', total: t, a, b } },
          { txt: `Si de ${t} quito ${b}, ¿cuántos quedan?`, q: `${t} − ${b} = ?`, r: a, vis: { t: 'parte', total: t, a, b, oculto: 'a' } }
        ],
        final: { txt: 'Ahora la otra resta de la familia:', q: `${t} − ${a} = ?`, r: b, vis: { t: 'parte', total: t, a, b, oculto: 'b' } }
      };
    },
    item(nivel) {
      const { a, b, t } = suma(nivel, false);
      const quitar = rnd(0, 1), x = quitar ? a : b, r = quitar ? b : a;
      return {
        txt: `Si ${a} + ${b} = ${t}…`, q: `${t} − ${x} = ?`, r,
        vis: { t: 'parte', total: t, a, b, oculto: quitar ? 'b' : 'a' },
        extra: [t, x, t + x > 20 ? r + 2 : t + x, r + 1]
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
