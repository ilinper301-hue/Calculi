/* 5.º · Truco 8 · Multiplicar por 0,5 (es la mitad) */
(function () {
  const R = x => +x.toFixed(3);
  ESTR.add({
    id: 'pormedio', curso: 5, orden: 8, tri: 2,
    n: 'Multiplicar por 0,5', ic: '×0,5', desc: 'Por 0,5 es la mitad',
    truco: 'Por 0,5 hago la mitad',
    tutorial: [
      { txt: '0,5 es medio. Multiplicar por 0,5 es coger medio, es decir, la mitad.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 1, valor: 0.5 } },
      { txt: '8 × 0,5 es la mitad de 8. Son 4.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 8, valor: 4 } },
      { txt: 'Con números grandes igual: 36 × 0,5 = 18, la mitad de 36.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 36, valor: 18 } },
      { txt: 'Si el número es impar, la mitad lleva coma: 7 × 0,5 = 3,5.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 7, valor: 3.5 } },
      { txt: 'Truco: multiplicar por 0,5 es dividir entre 2.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 20, valor: 10 } }
    ],
    guiada() {
      const n = rnd(3, 21), r = R(n / 2), vis = { t: 'barra', partes: 2, marcadas: 1, total: n, valor: r, oculto: 'valor' };
      return {
        pasos: [
          { txt: 'Por 0,5 cojo la mitad. ¿En cuántas partes iguales reparto?', q: '?', r: 2, vis: { t: 'barra', partes: 2, marcadas: 0, total: n }, ops: opciones(2, 3, [4, 5, 1, 10]) },
          { txt: 'Ahora, la mitad:', q: `${n} : 2 = ?`, r, vis, extra: [R(n / 4), n * 2, R(n - 0.5)] }
        ],
        final: { txt: 'Entonces:', q: `${n} × 0,5 = ?`, r, vis, extra: [R(n / 4), n * 2, n * 5, R(n - 0.5)] }
      };
    },
    item(nivel) {
      let n;
      if (nivel === 1) n = 2 * rnd(1, 10);
      else if (nivel === 2) n = rnd(10, 60);
      else n = rnd(0, 3) === 0 ? rnd(11, 99) / 10 : rnd(30, 250);
      n = R(n);
      const r = R(n / 2), vis = { t: 'barra', partes: 2, marcadas: 1, total: n, valor: r, oculto: 'valor' };
      const extra = [n * 2, n * 5, R(n / 4), R(n - 0.5), Math.floor(r), Math.ceil(r)];
      return { q: rnd(0, 1) ? `${fmt(n)} × 0,5 = ?` : `0,5 × ${fmt(n)} = ?`, r, vis, extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { return shuffle([4, 6, 7, 9, 10, 12, 14, 15, 18, 20, 21, 24, 30]).slice(0, 6).map(n => [`${n} × 0,5`, R(n / 2)]); }
    }
  });
})();
