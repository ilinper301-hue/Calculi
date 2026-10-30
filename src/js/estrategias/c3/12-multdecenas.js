/* 3.º · Truco 12 · Multiplicar decenas (3 × 40 = 3 × 4 decenas) */
const _vis12 = (a, t) => (a * t <= 30 ? { t: 'decenas', grupos: Array.from({ length: a }, () => ({ d: t })) } : null);
ESTR.add({
  id: 'multdecenas', curso: 3, orden: 12, tri: 3,
  n: 'Multiplicar decenas', ic: '×40', desc: 'Multiplico las decenas',
  truco: 'Multiplico las decenas y añado un cero',
  tutorial: [
    { txt: '3 × 40 son 3 grupos de 40. Cada grupo son 4 barras de 10.', vis: _vis12(3, 4) },
    { txt: 'En total hay 3 × 4 = 12 barras de 10. Son 12 decenas.', vis: _vis12(3, 4) },
    { txt: '12 decenas son 120. Así que 3 × 40 = 120.', vis: { t: 'decenas', grupos: [{ c: 1, d: 2 }] } },
    { txt: 'Truco: multiplico 3 × 4 = 12 y añado el cero de las decenas. 5 × 60: 5 × 6 = 30, y con el cero, 300.', vis: _vis12(5, 6) }
  ],
  guiada() {
    const a = rnd(2, 6), t = rnd(2, 6);
    return {
      pasos: [
        { txt: `${a} × ${t * 10} son ${a} grupos de ${t} decenas. ¿Cuántas decenas hay?`, q: `${a} × ${t} = ?`, r: a * t, vis: _vis12(a, t), extra: [a + t, a * t + t, a * t * 10] },
        { txt: `Esas ${a * t} decenas valen:`, q: `${a * t} × 10 = ?`, r: a * t * 10, vis: _vis12(a, t), extra: [a * t, a * t * 100, a * t * 10 + 10] }
      ],
      final: { txt: 'Entonces:', q: `${a} × ${t * 10} = ?`, r: a * t * 10, vis: _vis12(a, t), extra: [a * t, a * t * 100, a * t * 10 + a] }
    };
  },
  item(nivel) {
    if (nivel === 3 && rnd(0, 2) === 0) { // por centenas: 4 × 300
      const a = rnd(2, 9), c = rnd(2, 9);
      return { q: `${a} × ${c * 100} = ?`, r: a * c * 100, extra: [a * c * 10, a * c * 1000, a * c, a * c * 100 + a * 10] };
    }
    const a = nivel === 1 ? rnd(2, 4) : nivel === 2 ? rnd(2, 9) : rnd(3, 9), t = nivel === 1 ? rnd(2, 4) : nivel === 2 ? rnd(2, 9) : rnd(3, 9), r = a * t * 10;
    const extra = [a * t, a * t * 100, a * t * 10 + a, a * t * 10 + t * 10, a + t * 10];
    if (nivel > 1 && rnd(0, 3) === 0) return { q: `${t * 10} × ${a} = ?`, r, extra };
    return { q: `${a} × ${t * 10} = ?`, r, vis: _vis12(a, t), extra };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) { const a = rnd(2, 9), t = rnd(2, 9), r = a * t * 10; if (!vistos.has(r)) { vistos.add(r); out.push([`${a} × ${t * 10}`, r]); } }
      return out;
    }
  }
});
