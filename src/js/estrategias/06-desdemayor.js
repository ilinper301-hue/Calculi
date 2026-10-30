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
    { txt: 'Truco: busco el número mayor, empiezo ahí y cuento los pasos que faltan.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 12, saltos: [1, 1] } }
  ],
  guiada() {
    const p = rnd(2, 4), m = rnd(6, 20 - p), pri = rnd(0, 1);
    const q = pri ? `${p} + ${m}` : `${m} + ${p}`;
    const vis = { t: 'recta', desde: 0, hasta: 20, inicio: m, saltos: Array(p).fill(1) };
    return {
      pasos: [
        { txt: `En ${q}, ¿cuál es el mayor?`, q: '?', r: m, ops: shuffle([m, p, m + p]), vis: { t: 'marco', a: m, b: p, tam: 20 } },
        { txt: `Empiezo en ${m} y cuento 1 más. ¿Qué número viene?`, q: '?', r: m + 1, vis: { t: 'recta', desde: 0, hasta: 20, inicio: m, saltos: [1] } }
      ],
      final: { txt: `Cuento ${p} pasos desde el ${m}:`, q: `${q} = ?`, r: m + p, vis }
    };
  },
  item(nivel) {
    const p = rnd(1, 4), m = rnd(5, nivel === 1 ? 10 : nivel === 2 ? 14 : 20 - p);
    const mm = Math.min(m, 20 - p), r = mm + p;
    const q = rnd(0, 1) ? `${p} + ${mm}` : `${mm} + ${p}`;
    return { q, r, vis: { t: 'recta', desde: 0, hasta: 20, inicio: mm, saltos: Array(p).fill(1) }, extra: [mm, r - 1, r + 1, mm + p + 2] };
  },
  juego: {
    tipo: 'parejas', meta: 'Empieza por el mayor',
    pares() {
      return shuffle([9, 10, 11, 12, 13, 14, 15, 16, 17, 18]).slice(0, 6).map(r => { const p = rnd(1, 4); return [`${p} + ${r - p}`, r]; });
    }
  }
});
