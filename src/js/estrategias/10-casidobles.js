/* Estrategia 10 · Casi dobles */
ESTR.add({
  id: 'casidobles', orden: 10, tri: 2,
  n: 'Casi dobles', ic: '🪞', desc: 'Un doble y uno más',
  truco: 'Busco el doble y sumo 1',
  tutorial: [
    { txt: 'Mira 6 + 7. Los números son casi iguales: se parecen mucho.', vis: { t: 'marco', a: 6, b: 7, tam: 20 } },
    { txt: 'Conozco el doble: 6 + 6 = 12.', vis: { t: 'marco', a: 6, b: 6, tam: 20 } },
    { txt: 'Pero en 6 + 7 hay una ficha más. Entonces sumo 1.', vis: { t: 'marco', a: 6, b: 7, tam: 20 } },
    { txt: '12 y 1 más son 13. Entonces 6 + 7 = 13.', vis: { t: 'parte', total: 13, a: 12, b: 1 } },
    { txt: 'Truco: busco el doble del número pequeño y le sumo 1.', vis: { t: 'marco', a: 8, b: 9, tam: 20 } }
  ],
  guiada() {
    const n = rnd(3, 9), arriba = rnd(0, 1), m = n + 1;
    const q = arriba ? `${m} + ${n}` : `${n} + ${m}`, vis = { t: 'marco', a: n, b: m, tam: 20 };
    return {
      pasos: [
        { txt: `En ${q}, ¿qué número doblo? (el pequeño)`, q: '?', r: n, ops: shuffle([n, m, n + m]), vis },
        { txt: 'Hago el doble:', q: `${n} + ${n} = ?`, r: 2 * n, vis: { t: 'marco', a: n, b: n, tam: 20 } },
        { txt: 'Y sumo la ficha que sobra:', q: `${2 * n} + 1 = ?`, r: 2 * n + 1, vis: { t: 'parte', total: 2 * n + 1, a: 2 * n, b: 1 } }
      ],
      final: { txt: 'Ahora la suma completa:', q: `${q} = ?`, r: n + m, vis }
    };
  },
  item(nivel) {
    const dif = nivel === 3 && rnd(0, 2) === 0 ? 2 : 1;
    const n = rnd(nivel === 1 ? 3 : 4, nivel === 1 ? 7 : 9), m = n + dif, r = n + m;
    const q = rnd(0, 1) ? `${n} + ${m}` : `${m} + ${n}`;
    return { q, r, vis: { t: 'marco', a: n, b: m, tam: 20 }, extra: [2 * n, 2 * m, r + 1, r - 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Casi dobles y su resultado',
    pares() { return shuffle([3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(n => [`${n} + ${n + 1}`, 2 * n + 1]); }
  }
});
