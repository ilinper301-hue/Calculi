/* Estrategia 1 · Ver sin contar (subitización) */
ESTR.add({
  id: 'versincontar', orden: 1, tri: 1,
  n: 'Ver sin contar', ic: '👀', desc: 'Lo veo de un vistazo',
  truco: 'Lo veo de un vistazo',
  tutorial: [
    { txt: 'Mira este dado. ¿Ves cuántos puntos hay sin contar uno a uno?', vis: { t: 'puntos', n: 4 } },
    { txt: 'Con los puntos del dado, el 3, el 4 y el 5 se reconocen enseguida.', vis: { t: 'puntos', n: 5 } },
    { txt: 'Para el 7, mira un dado de 5 y otro de 2. ¡5 y 2 son 7!', vis: { t: 'puntos', n: 7 } },
    { txt: 'En el marco del 10 también: una fila llena son 5 y las fichas de abajo se suman.', vis: { t: 'marco', a: 8 } },
    { txt: 'Y con los dedos: una mano es 5. Mano y tres dedos más, ¡8!', vis: { t: 'dedos', n: 8 } }
  ],
  guiada() {
    const n = rnd(6, 9);
    return {
      pasos: [
        { txt: '¿Cuántos puntos tiene el dado azul?', q: '?', r: 5, vis: { t: 'puntos', n }, extra: [4, 6] },
        { txt: '¿Cuántos puntos tiene el dado naranja?', q: '?', r: n - 5, vis: { t: 'puntos', n } }
      ],
      final: { txt: '5 y ' + (n - 5) + '. ¿Cuántos hay en total?', q: '?', r: n, vis: { t: 'puntos', n }, extra: [n - 1, n + 1] }
    };
  },
  item(nivel) {
    let n, t;
    if (nivel === 1) { n = rnd(1, 6); t = 'puntos'; }
    else if (nivel === 2) { n = rnd(2, 10); t = pick(n <= 10 ? ['puntos', 'marco', 'dedos'] : ['puntos']); }
    else { n = rnd(3, 10); t = pick(['marco', 'dedos', 'puntos']); }
    const vis = t === 'marco' ? { t: 'marco', a: n } : { t, n };
    return { visSiempre: true, txt: '¿Cuántos hay?', q: '?', r: n, vis, extra: [n - 1, n + 1, n + 2] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada número con su palabra',
    pares() {
      const P = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez'];
      return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(n => [String(n), P[n]]);
    }
  }
});
