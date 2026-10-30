/* 4.º · Truco 3 · Multiplicar por 11 (×10 + el número; truco de las cifras) */
ESTR.add({
  id: 'por11', curso: 4, orden: 3, tri: 1,
  n: 'Multiplicar por 11', ic: '×11', desc: '×10 y sumo el número',
  truco: 'Multiplico por 10 y sumo el número',
  tutorial: [
    { txt: '11 × 4 son 11 filas de 4. Es 10 filas más 1 fila.', vis: { t: 'matriz', filas: 11, cols: 4, partir: 10 } },
    { txt: '10 × 4 = 40 y una fila más son 4. Total: 40 + 4 = 44.', vis: { t: 'matriz', filas: 11, cols: 4, partir: 10 } },
    { txt: 'Con 23 × 11: primero 23 × 10 = 230. Luego sumo 23.', vis: { t: 'recta', desde: 230, hasta: 260, inicio: 230, saltos: [23] } },
    { txt: '230 + 23 = 253. Truco: pongo la suma de las cifras en medio. 2 y 3, con 2 + 3 = 5 en medio: 253.', vis: { t: 'recta', desde: 230, hasta: 260, inicio: 230, saltos: [23] } }
  ],
  rec(n) { return { t: 'recta', desde: 10 * n, hasta: Math.ceil(11 * n / 10) * 10, inicio: 10 * n, saltos: [n] }; },
  guiada() {
    const a = rnd(1, 8), b = rnd(1, 9 - a), n = 10 * a + b;
    return {
      pasos: [
        { txt: 'Primero, por 10:', q: `${n} × 10 = ?`, r: 10 * n, extra: [11 * n, 100 * n] },
        { txt: 'Ahora sumo el número una vez:', q: `${10 * n} + ${n} = ?`, r: 11 * n, vis: this.rec(n), extra: [10 * n + 10, 10 * n - n, 12 * n] }
      ],
      final: { txt: 'Entonces:', q: `${n} × 11 = ?`, r: 11 * n, vis: this.rec(n), extra: [10 * n, 11 * n + 11, 11 * n - 10] }
    };
  },
  item(nivel) {
    let n, vis, q11;
    if (nivel === 1) { n = rnd(2, 12); q11 = `11 × ${n}`; vis = { t: 'matriz', filas: 11, cols: n, partir: 10 }; }
    else if (nivel === 2) { const a = rnd(1, 8), b = rnd(1, 9 - a); n = 10 * a + b; vis = this.rec(n); }
    else n = rnd(12, 99);
    const a = Math.floor(n / 10), b = n % 10, extra = [10 * n, 11 * n + 11, 11 * n - 11, 11 * n + 10];
    if (n >= 10 && a + b >= 10) extra.push(+`${a}${a + b}${b}`);
    return { q: q11 || (rnd(0, 1) ? `${n} × 11` : `11 × ${n}`), r: 11 * n, vis, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([12, 14, 15, 16, 17, 21, 23, 24, 25, 32, 34, 35, 43, 45, 52, 54]).slice(0, 6).map(n => [`${n} × 11`, 11 * n]); }
  }
});
