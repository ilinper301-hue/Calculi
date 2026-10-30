/* 6.º · Truco 13 · Raíces exactas */
(() => {
  const vis = r => r <= 12 ? { t: 'matriz', filas: r, cols: r } : undefined;
  ESTR.add({
    id: 'raices', curso: 6, orden: 13, tri: 3,
    n: 'Raíces exactas', ic: '√', desc: 'El lado del cuadrado',
    truco: 'Busco el número que multiplicado por sí mismo da el resultado',
    tutorial: [
      { txt: '√49 se lee «raíz cuadrada de 49». Es el número que, multiplicado por sí mismo, da 49.', vis: { t: 'matriz', filas: 7, cols: 7 } },
      { txt: 'Con 49 puntos formo un cuadrado perfecto: 7 filas de 7. El lado mide 7, así que √49 = 7.', vis: { t: 'matriz', filas: 7, cols: 7 } },
      { txt: 'Si me sé las tablas, es fácil: 8 × 8 = 64, así que √64 = 8.', vis: { t: 'matriz', filas: 8, cols: 8 } },
      { txt: 'Para raíces grandes: 20 × 20 = 400, así que √400 = 20. Los acabados en 00 tienen una raíz acabada en 0.', vis: { t: 'barra', partes: 20, marcadas: 20, total: 400, valor: 20 } }
    ],
    guiada() {
      const r = rnd(4, 12), n = r * r;
      return {
        pasos: [
          { txt: `Pruebo con ${r - 1}. ¿Cuánto es ${r - 1} × ${r - 1}?`, q: `${r - 1} × ${r - 1} = ?`, r: (r - 1) * (r - 1), vis: { t: 'matriz', filas: r - 1, cols: r - 1 }, extra: [n, 2 * (r - 1), (r - 1) * (r - 2)] },
          { txt: `Se queda corto. Pruebo con ${r}:`, q: `${r} × ${r} = ?`, r: n, vis: { t: 'matriz', filas: r, cols: r }, extra: [(r - 1) * (r - 1), 2 * r, n + r] }
        ],
        final: { txt: `¡Justo ${n}! Entonces:`, q: `√${n} = ?`, r, vis: { t: 'matriz', filas: r, cols: r }, extra: [r - 1, r + 1, n / 2, n / 4] }
      };
    },
    item(nivel) {
      const r = nivel === 1 ? rnd(2, 10) : nivel === 2 ? rnd(4, 15) : rnd(10, 20), n = r * r;
      const it = { q: `√${n} = ?`, r, extra: [n / 2, r + 1, r - 1, 2 * r, n / 4] };
      if (nivel === 1 || r <= 12) it.vis = vis(r);
      return it;
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada raíz con su resultado',
      pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20]).slice(0, 6).map(r => [`√${r * r}`, r]); }
    }
  });
})();
