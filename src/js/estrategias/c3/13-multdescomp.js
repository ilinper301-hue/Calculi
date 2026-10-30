/* 3.º · Truco 13 · Multiplicar descomponiendo (6 × 14 = 6 × 10 + 6 × 4) */
const _vis13 = (a, b) => ({ t: 'decenas', grupos: Array.from({ length: a }, () => ({ d: 1, u: b - 10 })) });
ESTR.add({
  id: 'multdescomp', curso: 3, orden: 13, tri: 3,
  n: 'Multiplicar partiendo', ic: '×14', desc: 'Parto el número en dos',
  truco: 'Parto el número en decenas y unidades',
  tutorial: [
    { txt: '6 × 14 son 6 grupos de 14. Cada grupo tiene una barra de 10 y 4 cubitos.', vis: _vis13(6, 14) },
    { txt: 'Parto el 14 en 10 + 4. Primero las barras: 6 × 10 = 60.', vis: { t: 'decenas', grupos: [{ d: 6 }] } },
    { txt: 'Después los cubitos: 6 × 4 = 24.', vis: { t: 'decenas', grupos: [{ u: 24 }] } },
    { txt: 'Sumo las dos partes: 60 + 24 = 84. Así que 6 × 14 = 84.', vis: _vis13(6, 14) },
    { txt: 'Truco: parto el número grande en 10 + lo que sobra, multiplico cada parte y sumo.', vis: _vis13(4, 17) }
  ],
  guiada() {
    const a = rnd(3, 8), b = rnd(12, 18), u = b - 10;
    return {
      pasos: [
        { txt: `Para ${a} × ${b}, parto ${b} en 10 + ${u}. Primero por 10:`, q: `${a} × 10 = ?`, r: a * 10, vis: _vis13(a, b), extra: [a, a * 100, a * b] },
        { txt: `Ahora por ${u}:`, q: `${a} × ${u} = ?`, r: a * u, vis: _vis13(a, b), extra: [a + u, a * u + a, a * u - a] }
      ],
      final: { txt: `Junto las dos partes: ${a * 10} + ${a * u}.`, q: `${a} × ${b} = ?`, r: a * b, vis: _vis13(a, b), extra: [a * 10 + u, a * b + 10, a * b - 10, a * u] }
    };
  },
  item(nivel) {
    const a = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 9) : rnd(6, 9), b = nivel === 1 ? rnd(11, 14) : nivel === 2 ? rnd(12, 17) : rnd(13, 19), u = b - 10, r = a * b;
    const extra = [a * 10 + u, r + 10, r - 10, a * 10 + a, a * u, r + a];
    if (nivel > 1 && rnd(0, 3) === 0) return { q: `${b} × ${a} = ?`, r, extra };
    return { q: `${a} × ${b} = ?`, r, vis: _vis13(a, b), extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) { const a = rnd(3, 9), b = rnd(12, 19), r = a * b; if (!vistos.has(r)) { vistos.add(r); out.push([`${a} × ${b}`, r]); } }
      return out;
    }
  }
});
