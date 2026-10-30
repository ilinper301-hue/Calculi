/* 2.º · Truco 10 · Multiplicar es sumar */
{
  const gen = (nivel) => {
    const n = nivel === 1 ? rnd(2, 3) : rnd(2, 5), m = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(2, 8) : rnd(3, 10);
    return { n, m };
  };
  ESTR.add({
    id: 'multsuma', curso: 2, orden: 10, tri: 3,
    n: 'Multiplicar es sumar', ic: '×', desc: 'Grupos iguales: sumo varias veces',
    truco: 'Multiplicar es sumar varias veces el mismo número',
    tutorial: [
      { txt: 'Aquí hay 3 filas con 4 puntos en cada fila.', vis: { t: 'matriz', filas: 3, cols: 4 } },
      { txt: 'Puedo sumar fila a fila: 4 + 4 + 4 = 12.', vis: { t: 'matriz', filas: 3, cols: 4, partir: 1 } },
      { txt: '3 filas de 4 se escribe 3 × 4. Y es lo mismo que 4 + 4 + 4.', vis: { t: 'matriz', filas: 3, cols: 4 } },
      { txt: 'Truco: 3 × 4 es sumar el 4 tres veces: 4 + 4 + 4 = 12.', vis: { t: 'recta', desde: 0, hasta: 12, inicio: 0, saltos: [4, 4, 4] } }
    ],
    guiada() {
      const n = rnd(3, 4), m = rnd(2, 6), r = n * m;
      return {
        pasos: [
          { txt: 'Sumo las dos primeras filas:', q: `${m} + ${m} = ?`, r: 2 * m, vis: { t: 'matriz', filas: 2, cols: m }, extra: [m, 2 * m + 1, 2 * m - 1] },
          { txt: n === 3 ? 'Añado la fila que falta:' : 'Hay otras dos filas iguales. Las sumo:', q: n === 3 ? `${2 * m} + ${m} = ?` : `${2 * m} + ${2 * m} = ?`, r, vis: { t: 'matriz', filas: n, cols: m, partir: 2 }, extra: [2 * m, r + m, r - m] }
        ],
        final: { txt: `${n} filas de ${m}:`, q: `${n} × ${m} = ?`, r, vis: { t: 'matriz', filas: n, cols: m }, extra: [n + m, r + m, r - m, (n + 1) * m] }
      };
    },
    item(nivel) {
      const { n, m } = gen(nivel), r = n * m;
      return { q: `${n} × ${m}`, r, vis: { t: 'matriz', filas: n, cols: m }, extra: [n + m, r + m, r - m, (n + 1) * m, (n - 1) * m], txt: nivel === 1 ? `${n} filas de ${m}` : undefined };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { n, m } = gen(3); if (!us.has(n * m)) { us.add(n * m); out.push([`${n} × ${m}`, n * m]); } } return out; }
    }
  });
}
