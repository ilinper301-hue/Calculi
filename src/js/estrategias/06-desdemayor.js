/* Estrategia 6 · Contar desde el mayor */
ESTR.add({
  id: 'desdemayor', orden: 6, tri: 2,
  n: 'Contar desde el mayor', ic: '👣', desc: 'Empiezo por el número grande',
  truco: 'Empiezo por el mayor',
  tutorial: [
    { txt: 'Vamos a sumar 3 + 8. ¿Con qué número es más fácil empezar?', vis: { t: 'marco', a: 3, b: 8, tam: 20 } },
    { txt: 'Con el mayor. Empiezo en el 8 y no hace falta contarlo desde el 1.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 8, saltos: [] } },
    { txt: 'Ahora cuento 3 más: 9, 10, 11.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 8, saltos: [1, 1, 1] } },
    { txt: 'Termino en 11. Entonces 3 + 8 = 11.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 8, saltos: [1, 1, 1] } },
    { txt: 'Truco: en 2 + 12 empiezo en el 12, el mayor, y cuento 2 más: 13, 14.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 12, saltos: [1, 1] } }
  ],
  guiada() {
    const p = rnd(2, 4), m = rnd(6, 20 - p), pri = rnd(0, 1);
    const q = pri ? `${p} + ${m}` : `${m} + ${p}`;
    const mv = pri ? { t: 'marco', a: p, b: m, tam: 20 } : { t: 'marco', a: m, b: p, tam: 20 };
    const vis = { t: 'recta', desde: 0, hasta: 20, inicio: m, saltos: Array(p).fill(1) };
    return {
      pasos: [
        { txt: `En ${q}, ¿cuál es el mayor?`, q: '?', r: m, ops: shuffle([m, p, m + 1]), vis: mv },
        { txt: `Empiezo en ${m} y cuento 1 más. ¿Qué número viene?`, q: '?', r: m + 1, ops: opciones(m + 1, 3, [m, m + 2], 20), vis: { t: 'recta', desde: 0, hasta: 20, inicio: m, saltos: [1] } }
      ],
      final: { txt: `Cuento ${p} pasos desde el ${m}:`, q: `${q} = ?`, r: m + p, ops: opciones(m + p, 3, [m, m + p - 1, m + p + 1], 20), vis }
    };
  },
  item(nivel) {
    const p = rnd(1, 4), m = rnd(5, nivel === 1 ? 10 : nivel === 2 ? 14 : 20 - p);
    const mm = Math.min(m, 20 - p), r = mm + p;
    const q = rnd(0, 1) ? `${p} + ${mm}` : `${mm} + ${p}`;
    return { q, r, vis: { t: 'recta', desde: 0, hasta: 20, inicio: mm, saltos: Array(p).fill(1) }, ops: opciones(r, 3, [mm, r - 1, r + 1], 20) };
  },
  juego: {
    tipo: 'parejas', meta: 'Empieza por el mayor',
    pares() {
      return shuffle([9, 10, 11, 12, 13, 14, 15, 16, 17, 18]).slice(0, 6).map(r => { const p = rnd(1, 4); return [`${p} + ${r - p}`, r]; });
    }
  }
});
