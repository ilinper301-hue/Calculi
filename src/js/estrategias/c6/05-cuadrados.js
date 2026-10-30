/* 6.º · Truco 5 · Cuadrados */
(() => {
  const vis = n => n <= 10 ? { t: 'matriz', filas: n, cols: n } : n <= 12 ? { t: 'matriz', filas: n, cols: n, partir: 10 } : undefined;
  ESTR.add({
    id: 'cuadrados', curso: 6, orden: 5, tri: 1,
    n: 'Cuadrados', ic: '5²', desc: 'Un número por sí mismo',
    truco: 'En los acabados en 5: decena × la siguiente, y detrás 25',
    tutorial: [
      { txt: '4² se lee «cuatro al cuadrado» y es 4 × 4: un cuadrado de 4 filas de 4 puntos.', vis: { t: 'matriz', filas: 4, cols: 4 } },
      { txt: 'Para 12²: 10 filas de 12 y 2 filas más. 120 + 24 = 144.', vis: { t: 'matriz', filas: 12, cols: 12, partir: 10 } },
      { txt: 'Truco para los que acaban en 5. En 35²: 3 × 4 = 12, y detrás pongo 25. Sale 1225.', vis: { t: 'parte', total: 1225, a: 1200, b: 25 } },
      { txt: '15²: 1 × 2 = 2, y detrás 25. Sale 225. ¡Siempre funciona con los acabados en 5!', vis: { t: 'parte', total: 225, a: 200, b: 25 } }
    ],
    guiada() {
      const d = rnd(1, 8), n = 10 * d + 5, p = d * (d + 1);
      return {
        pasos: [
          { txt: `En ${n}² miro la decena (${d}) y la siguiente (${d + 1}):`, q: `${d} × ${d + 1} = ?`, r: p, extra: [d * d, p + 1, 2 * d + 1] },
          { txt: `Ese ${p} son las centenas; detrás va el 25:`, q: `${p} × 100 = ?`, r: p * 100, extra: [p * 10, p * 1000, p + 25] }
        ],
        final: { txt: 'Le sumo el 25:', q: `${n}² = ?`, r: p * 100 + 25, vis: { t: 'parte', total: p * 100 + 25, a: p * 100, b: 25, oculto: 'total' }, extra: [p * 100, d * d * 100 + 25, p * 100 + 5, 2 * n] }
      };
    },
    item(nivel) {
      let n;
      if (nivel === 1) n = rnd(2, 10);
      else if (nivel === 2) n = rnd(11, 20);
      else n = rnd(0, 2) ? 10 * rnd(1, 9) + 5 : rnd(13, 25);
      const r = n * n, extra = [2 * n, 10 * n, r + 10, r - 10];
      if (n % 10 === 5) { const d = (n - 5) / 10; extra.push(d * (d + 1) * 100, d * d * 100 + 25, r + 100, r - 100); }
      else extra.push(100 + (n - 10) * (n - 10), r + n, r - n);
      return { q: `${n}² = ?`, r, vis: vis(n), extra };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuadrado con su resultado',
      pares() { return shuffle([4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 20, 25]).slice(0, 6).map(n => [`${n}²`, n * n]); }
    }
  });
})();
