/* 4.º · Truco 6 · Por 20, 30 y 50 */
ESTR.add({
  id: 'por20y50', curso: 4, orden: 6, tri: 2,
  n: 'Por 20, 30 y 50', ic: '×20', desc: 'Primero la cifra, luego el cero',
  truco: 'Multiplico por 2, 3 o 5 y añado un cero',
  tutorial: [
    { txt: '4 × 20 son 4 grupos de 20. Cada 20 son 2 barras de 10.', vis: { t: 'decenas', grupos: [{ d: 2 }, { d: 2 }, { d: 2 }, { d: 2 }] } },
    { txt: 'Primero 4 × 2 = 8 decenas. Son 80. Así que 4 × 20 = 80.', vis: { t: 'decenas', grupos: [{ d: 8 }] } },
    { txt: 'Con 30 igual: 3 × 30 = 3 × 3 decenas = 9 decenas = 90.', vis: { t: 'decenas', grupos: [{ d: 3 }, { d: 3 }, { d: 3 }] } },
    { txt: 'Con 50 hay otro truco: × 100 y la mitad. 6 × 50 = 600 : 2 = 300.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 600, valor: 300 } }
  ],
  guiada() {
    if (rnd(0, 1)) {
      const t = pick([2, 3]), n = rnd(2, 4);
      return {
        pasos: [
          { txt: `Primero, ${n} × ${t}:`, q: `${n} × ${t} = ?`, r: n * t, extra: [n + t, n * t * 10] },
          { txt: 'Ahora añado un cero (× 10):', q: `${n * t} × 10 = ?`, r: n * t * 10, extra: [n * t, n * t * 100] }
        ],
        final: { txt: 'Entonces:', q: `${n} × ${t * 10} = ?`, r: n * t * 10, vis: { t: 'decenas', grupos: Array.from({ length: n }, () => ({ d: t })) }, extra: [n * t, n * t * 100, n * t * 10 + 10] }
      };
    }
    const n = pick([2, 4, 6, 8]);
    return {
      pasos: [
        { txt: 'Primero, por 100:', q: `${n} × 100 = ?`, r: n * 100, extra: [n * 10, n * 1000] },
        { txt: 'Ahora, la mitad:', q: `${n * 100} : 2 = ?`, r: n * 50, vis: { t: 'barra', partes: 2, marcadas: 1, total: n * 100, valor: n * 50, oculto: 'valor' }, extra: [n * 100 - 2, n * 25] }
      ],
      final: { txt: 'Entonces:', q: `${n} × 50 = ?`, r: n * 50, extra: [n * 100, n * 5, n * 25] }
    };
  },
  item(nivel) {
    let n, t;
    if (nivel === 1) { t = pick([2, 3, 5]); n = t === 2 ? rnd(2, 5) : rnd(2, 4); }
    else if (nivel === 2) { t = pick([2, 3, 5, 5]); n = rnd(6, 16); }
    else { t = pick([2, 3, 5, 5]); n = rnd(12, 99); }
    const r = n * t * 10, vis = nivel === 1 ? { t: 'decenas', grupos: Array.from({ length: n }, () => ({ d: t })) } : undefined;
    const extra = [n * t, n * t * 100, r + 10 * t, r - 10 * t];
    if (t === 5) extra.push(n * 100, n * 25, n * 500);
    return { q: rnd(0, 1) ? `${n} × ${t * 10}` : `${t * 10} × ${n}`, r, vis, extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { const out = [], vistos = new Set(); while (out.length < 6) { const n = rnd(3, 19), t = pick([20, 30, 50]), k = n * t; if (!vistos.has(k)) { vistos.add(k); out.push([`${n} × ${t}`, k]); } } return out; }
  }
});
