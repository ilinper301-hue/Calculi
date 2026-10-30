/* Estrategia 5 · El orden no importa (conmutativa) */
ESTR.add({
  id: 'orden', orden: 5, tri: 1,
  n: 'El orden no importa', ic: '🔄', desc: 'Empiezo por el grande',
  truco: 'Empiezo por el número grande',
  tutorial: [
    { txt: 'Tengo 2 fichas azules y 7 naranjas. ¿Cuántas hay en total?', vis: { t: 'marco', a: 2, b: 7 } },
    { txt: 'Si giro el marco, tengo 7 azules y 2 naranjas. ¡Siguen siendo 9!', vis: { t: 'marco', a: 7, b: 2 } },
    { txt: '2 + 7 = 7 + 2. Da igual el orden: la suma es la misma.', vis: { t: 'parte', total: 9, a: 2, b: 7 } },
    { txt: 'Es más fácil empezar por el grande: 7 y dos más… ¡8, 9!', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 7, saltos: [1, 1] } },
    { txt: 'Truco: en 2 + 7 empiezo por el 7 y sumo 2 más.', vis: { t: 'marco', a: 7, b: 2 } }
  ],
  guiada() {
    const a = rnd(1, 4), b = rnd(a + 1, Math.min(9, 10 - a)), t = a + b;
    return {
      pasos: [
        { txt: `${a} + ${b} es lo mismo que ${b} + ${a}. ¿Cuál es el número grande?`, q: '?', r: b, vis: { t: 'marco', a: b, b: a }, extra: [a, t] }
      ],
      final: { txt: `Empiezo por el ${b} y sumo ${a}:`, q: `${b} + ${a}`, r: t, vis: { t: 'marco', a: b, b: a }, extra: [b, t - 1, t + 1] }
    };
  },
  item(nivel) {
    const a = rnd(1, 4), b = rnd(a + 1, Math.min(9, 10 - a)), t = a + b;
    const forma = nivel === 1 ? rnd(0, 1) : rnd(0, 2);
    const vis = { t: 'marco', a: b, b: a };
    if (forma === 1) return { q: `${a} + ${b} = ${b} + ?`, r: a, vis, extra: [b, t, a + 1] };
    if (forma === 2) return { q: `${a} + ${b} = ? + ${a}`, r: b, vis, extra: [a, t, b + 1] };
    return { q: `${a} + ${b}`, r: t, vis, extra: [b, t - 1, t + 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une las sumas que dan igual',
    pares() {
      const C = [[1, 4], [2, 7], [3, 6], [1, 8], [2, 5], [3, 4], [1, 6], [4, 5], [2, 8], [3, 5], [1, 9], [2, 6]];
      return shuffle(C).slice(0, 6).map(([a, b]) => rnd(0, 1) ? [`${a} + ${b}`, `${b} + ${a}`] : [`${b} + ${a}`, `${a} + ${b}`]);
    }
  }
});
