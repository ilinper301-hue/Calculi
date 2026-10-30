/* 3.º · Truco 7 · Multiplicar por 10 y 100 (añado ceros) */
const _vis10y100 = (n, f) => f === 10
  ? (n <= 10 ? { t: 'decenas', grupos: [{ d: n }] } : null)          // n barras de 10
  : (n <= 9 ? { t: 'decenas', grupos: [{ c: n }] } : null);          // n placas de 100
const _cero10y100 = n => Number(String(n).slice(0, 1) + '0' + String(n).slice(1)); // error típico: 34 → 304
ESTR.add({
  id: 'por10y100', curso: 3, orden: 7, tri: 2,
  n: 'Multiplicar por 10 y 100', ic: '×100', desc: 'Añado ceros',
  truco: 'Añado un cero (×10) o dos ceros (×100)',
  tutorial: [
    { txt: '4 × 10 son 4 barras de 10. Hay 40.', vis: { t: 'decenas', grupos: [{ d: 4 }] } },
    { txt: 'Por 10, el 4 se convierte en 40: añado un cero a la derecha.', vis: { t: 'decenas', grupos: [{ d: 4 }] } },
    { txt: '3 × 100 son 3 placas de 100. Hay 300.', vis: { t: 'decenas', grupos: [{ c: 3 }] } },
    { txt: 'Por 100, el 3 se convierte en 300: añado dos ceros.', vis: { t: 'decenas', grupos: [{ c: 3 }] } },
    { txt: 'Truco: por 10 añado un cero, por 100 añado dos. 25 × 10 = 250 y 25 × 100 = 2500.', vis: { t: 'decenas', grupos: [{ c: 2, d: 5 }] } }
  ],
  guiada() {
    const n = rnd(2, 9);
    return {
      pasos: [
        { txt: 'Primero, por 10 (un cero):', q: `${n} × 10 = ?`, r: 10 * n, vis: { t: 'decenas', grupos: [{ d: n }] }, extra: [n, 100 * n, _cero10y100(n)] },
        { txt: 'Otra vez por 10, y ya van dos ceros:', q: `${10 * n} × 10 = ?`, r: 100 * n, vis: { t: 'decenas', grupos: [{ c: n }] }, extra: [10 * n, 1000 * n, 10 * n + 10] }
      ],
      final: { txt: 'Entonces, por 100:', q: `${n} × 100 = ?`, r: 100 * n, vis: { t: 'decenas', grupos: [{ c: n }] }, extra: [10 * n, 1000 * n, n + 100] }
    };
  },
  item(nivel) {
    const f = nivel === 1 ? (rnd(0, 1) ? 10 : 100) : rnd(0, 1) ? 10 : 100;
    let n;
    if (nivel === 1) n = f === 10 ? rnd(2, 9) : rnd(2, 6);
    else if (nivel === 2) n = f === 10 ? rnd(11, 99) : rnd(2, 9);
    else n = f === 10 ? rnd(101, 999) : rnd(11, 99);
    const r = n * f;
    const extra = f === 10 ? [n * 100, n, n + 10, _cero10y100(n)] : [n * 10, n * 1000, n + 100, n * 10 + 100];
    const ok = extra.filter(x => x <= 9999);
    const al = nivel > 1 && rnd(0, 3) === 0; // 10 × 34: sin dibujo (el dibujo es de «34 grupos de 10»)
    const vis = al ? null : _vis10y100(n, f);
    return { q: al ? `${f} × ${n} = ?` : `${n} × ${f} = ?`, r, vis, extra: ok };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(n => { const f = rnd(0, 1) ? 10 : 100; return [`${n} × ${f}`, n * f]; }); }
  }
});
