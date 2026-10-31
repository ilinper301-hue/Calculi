/* 4.º · Truco 1 · Multiplicar por 5 (×10 y la mitad) */
// Ayuda de 4.º: errores típicos [valor, pista] sin repetidos, sin la respuesta y con valores ≥ 0
const _errc4 = (r, L) => { const seen = new Set([+(+r).toFixed(2)]); return L.map(([v, p]) => [+(+v).toFixed(2), p]).filter(([v]) => Number.isFinite(v) && v >= 0 && !seen.has(v) && seen.add(v)); };
ESTR.add({
  id: 'por5', curso: 4, orden: 1, tri: 1,
  n: 'Multiplicar por 5', ic: '×5', desc: '×10 y la mitad',
  truco: 'Multiplico por 10 y calculo la mitad',
  tutorial: [
    { txt: '5 × 6 son 5 filas de 6. Es la mitad de 10 filas de 6.', vis: { t: 'matriz', filas: 10, cols: 6, tachar: 5 } },
    { txt: '10 × 6 = 60. La mitad de 60 es 30. Así que 5 × 6 = 30.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 60, valor: 30 } },
    { txt: 'Con números más grandes es igual. 24 × 5: primero 24 × 10 = 240.', vis: { t: 'decenas', grupos: [{ d: 24 }] } },
    { txt: 'Tu turno: 5 × 6 es la mitad de 10 filas de 6. Toca la mitad de las filas.', toca: { t: 'matriz', filas: 10, cols: 6, objetivo: 5 } },
    { txt: 'Ahora la mitad: 240 : 2 = 120. Así que 24 × 5 = 120.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 240, valor: 120 } }
  ],
  guiada() {
    const n = pick([12, 14, 16, 18, 22, 24, 26, 28, 32, 34, 36, 38, 42, 44, 46, 48]);
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, extra: [5 * n, 100 * n], errores: _errc4(10 * n, [[100 * n, 'Por 10 solo se añade un cero.'], [5 * n, 'Primero por 10: añade un cero al número.']]) },
        { txt: 'Ahora, la mitad:', q: `${10 * n} : 2 = ?`, r: 5 * n, vis: { t: 'barra', partes: 2, marcadas: 1, total: 10 * n, valor: 5 * n, oculto: 'valor' }, extra: [10 * n - 2, 20 * n], errores: _errc4(5 * n, [[20 * n, 'Eso es el doble. La mitad es repartir entre 2.'], [10 * n, 'Ese es el número de antes. Ahora toca partirlo por la mitad.']]) }
      ],
      final: { txt: 'Entonces:', q: `${n} × 5 = ?`, r: 5 * n, extra: [10 * n, 5 * n + 5, n / 2], errores: _errc4(5 * n, [[10 * n, 'Has multiplicado por 10. Te falta hacer la mitad.'], [n / 2, 'Has partido el número. Primero ×10 y después la mitad.'], [50 * n, 'Te has pasado de ceros. Por 5 es la mitad de por 10.']]) }
    };
  },
  item(nivel) {
    let n, q, vis;
    if (nivel === 1) { n = rnd(2, 9); q = `5 × ${n}`; vis = { t: 'matriz', filas: 10, cols: n, tachar: 5 }; }
    else if (nivel === 2) { n = pick([12, 14, 16, 18, 22, 24, 26, 28, 32, 34, 36, 38, 42, 44, 46, 48]); q = rnd(0, 1) ? `${n} × 5` : `5 × ${n}`; vis = { t: 'barra', partes: 2, marcadas: 1, total: 10 * n, valor: 5 * n, oculto: 'valor' }; }
    else { n = rnd(20, 99); q = rnd(0, 1) ? `${n} × 5` : `5 × ${n}`; }
    const errores = _errc4(5 * n, [[10 * n, 'Has multiplicado por 10. Te falta hacer la mitad.'], [n / 2, 'Has partido el número. Primero ×10 y después la mitad.'], [50 * n, 'Te sobra un cero. Por 5 es la mitad de por 10.']]);
    return { q, r: 5 * n, vis, extra: [5 * n + 5, 5 * n - 5], errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([12, 14, 15, 16, 18, 22, 24, 25, 26, 28, 32, 34, 36, 38, 42, 44, 46, 48]).slice(0, 6).map(n => [`${n} × 5`, 5 * n]); }
  }
});
