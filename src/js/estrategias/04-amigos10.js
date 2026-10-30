/* Estrategia 4 · Amigos del 10 (plantilla de referencia para las demás) */
ESTR.add({
  id: 'amigos10', orden: 4, tri: 1,
  n: 'Amigos del 10', ic: '🤝', desc: 'Parejas que suman 10',
  truco: 'Busco el amigo del 10',
  tutorial: [
    { txt: 'Este es el marco del 10. Tiene 10 casillas.', vis: { t: 'marco', a: 0 } },
    { txt: 'Aquí hay 7 fichas azules. ¿Cuántas casillas quedan vacías?', vis: { t: 'marco', a: 7 } },
    { txt: 'Quedan 3. Con 3 fichas naranjas, el marco se llena: 7 y 3 son amigos del 10.', vis: { t: 'marco', a: 7, b: 3 } },
    { txt: 'Los amigos del 10 siempre llenan el marco: 6 y 4, 8 y 2, 5 y 5…', vis: { t: 'marco', a: 6, b: 4 } },
    { txt: 'Truco: mira los huecos vacíos y sabrás el amigo del 10.', vis: { t: 'parte', total: 10, a: 8, b: 2, oculto: 'b' } }
  ],
  guiada() {
    const a = rnd(1, 9), b = 10 - a;
    return {
      pasos: [
        { txt: '¿Cuántas fichas azules hay?', q: '?', r: a, vis: { t: 'marco', a } },
        { txt: '¿Cuántos huecos vacíos hay?', q: '?', r: b, vis: { t: 'marco', a } }
      ],
      final: { txt: 'Ahora la operación:', q: `${a} + ? = 10`, r: b, vis: { t: 'marco', a, b } }
    };
  },
  item(nivel) {
    const a = rnd(nivel === 1 ? 1 : 0, nivel === 1 ? 9 : 10), b = 10 - a;
    const forma = rnd(0, 2);
    if (forma === 2) return { q: `10 = ${a} + ?`, r: b, vis: { t: 'marco', a }, extra: [a, b + 1, b - 1] };
    if (forma === 1) return { q: `? + ${a} = 10`, r: b, vis: { t: 'marco', a }, extra: [a, b + 1, b - 1] };
    return { q: `${a} + ? = 10`, r: b, vis: { t: 'marco', a }, extra: [a, b + 1, b - 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca parejas que sumen 10',
    pares() { return shuffle([[1, 9], [2, 8], [3, 7], [4, 6], [5, 5], [0, 10]]).slice(0, 6); }
  }
});
