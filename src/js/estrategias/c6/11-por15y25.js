/* 6.º · Truco 11 · Por 1,5 y por 2,5 */
(() => {
  const R = x => +x.toFixed(3);
  const vis = (n, f) => ({ t: 'barra', partes: f === 1.5 ? 3 : 5, marcadas: f === 1.5 ? 3 : 5, total: R(n * f), valor: R(n / 2), oculto: 'total' });
  const mk = (n, f) => ({
    q: `${fmt(n)} × ${fmt(f)} = ?`, r: R(n * f), vis: vis(n, f),
    extra: f === 1.5 ? [2 * n, R(n / 2), R(n + 1.5), R(n * 1.5 + 10), R(n * 1.5 - 5)] : [2 * n, 3 * n, R(n + 2.5), R(2 * n + 5), R(n / 2 + n)]
  });
  ESTR.add({
    id: 'por15y25', curso: 6, orden: 11, tri: 3,
    n: 'Por 1,5 y por 2,5', ic: '×1,5', desc: 'El número y su mitad',
    truco: 'Por 1,5: el número y su mitad. Por 2,5: el doble y la mitad',
    tutorial: [
      { txt: '1,5 es 1 y medio. 8 × 1,5 es 8 y su mitad, que es 4.', vis: { t: 'barra', partes: 3, marcadas: 3, total: 12, valor: 4, oculto: 'total' } },
      { txt: 'Dos trozos de 4 forman el 8 y un trozo más es la mitad. 8 + 4 = 12.', vis: { t: 'barra', partes: 3, marcadas: 3, total: 12, valor: 4 } },
      { txt: '2,5 es 2 y medio. 8 × 2,5 es el doble (16) más la mitad (4): 20.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 20, valor: 4 } },
      { txt: 'Truco: × 1,5 = el número + su mitad. × 2,5 = el doble + la mitad. 30 × 2,5 = 60 + 15 = 75.', vis: { t: 'parte', total: 75, a: 60, b: 15 } }
    ],
    guiada() {
      const n = 2 * rnd(2, 12);
      if (rnd(0, 1)) return {
        pasos: [
          { txt: 'Primero, la mitad del número:', q: `${n} : 2 = ?`, r: n / 2, vis: vis(n, 1.5), extra: [n * 2, n / 2 + n, n - 2] },
          { txt: 'Ahora, el número más su mitad:', q: `${n} + ${n / 2} = ?`, r: 1.5 * n, vis: vis(n, 1.5), extra: [n / 2, 2 * n, n + 5] }
        ],
        final: { txt: 'Por 1,5 es el número y su mitad:', q: `${n} × 1,5 = ?`, r: 1.5 * n, vis: vis(n, 1.5), extra: [2 * n, n / 2, n * 15] }
      };
      return {
        pasos: [
          { txt: 'Primero, el doble:', q: `${n} × 2 = ?`, r: 2 * n, vis: vis(n, 2.5), extra: [n, 3 * n, n + 2] },
          { txt: 'Después, la mitad del número:', q: `${n} : 2 = ?`, r: n / 2, vis: vis(n, 2.5), extra: [n * 2, n - 2, n] }
        ],
        final: { txt: 'Por 2,5 es el doble y la mitad:', q: `${n} × 2,5 = ?`, r: 2.5 * n, vis: vis(n, 2.5), extra: [2 * n, 3 * n, n * 25] }
      };
    },
    item(nivel) {
      const f = rnd(0, 1) ? 1.5 : 2.5;
      const n = nivel === 1 ? 2 * rnd(1, 6) : nivel === 2 ? 2 * rnd(6, 25) : rnd(11, 99);
      return mk(n, f);
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() {
        for (let k = 0; k < 200; k++) {
          const T = shuffle([4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 40]).slice(0, 6).map((n, i) => { const f = i % 2 ? 2.5 : 1.5; return [`${n} × ${fmt(f)}`, fmt(R(n * f))]; });
          if (new Set(T.map(x => x[1])).size === 6) return T;
        }
        return [['4 × 1,5', '6'], ['6 × 2,5', '15'], ['8 × 1,5', '12'], ['10 × 2,5', '25'], ['12 × 1,5', '18'], ['20 × 2,5', '50']];
      }
    }
  });
})();
