/* Estrategia 13 · Sumar 9 (sumo 10 y quito 1) */
const _rectaS9 = (n) => { if (n < 20) return { desde: 0, hasta: 30 }; const d = Math.floor(n / 10) * 10; return { desde: d, hasta: d + 20 }; };
ESTR.add({
  id: 'sumar9', orden: 13, tri: 3,
  n: 'Sumar 9', ic: '9️⃣', desc: 'Sumo 10 y quito 1',
  truco: 'Sumo 10 y quito 1',
  tutorial: [
    { txt: 'El 9 es casi un 10. Le falta solo 1.', vis: { t: 'marco', a: 9 } },
    { txt: 'Quiero sumar 6 + 9. Empiezo en el 6 de la recta.', vis: { t: 'recta', desde: 0, hasta: 30, inicio: 6, saltos: [] } },
    { txt: 'Sumar 10 es fácil: salto de 6 a 16.', vis: { t: 'recta', desde: 0, hasta: 30, inicio: 6, saltos: [10] } },
    { txt: 'Pero solo quería sumar 9, así que quito 1: 16 − 1 = 15.', vis: { t: 'recta', desde: 0, hasta: 30, inicio: 6, saltos: [10, -1] } },
    { txt: 'Tu turno: en 7 + 9 sumas 10 y quitas 1. Toca el número al que llegas.', toca: { t: 'recta', desde: 0, hasta: 20, inicio: 7, objetivo: 16 } },
    { txt: 'Truco: para sumar 9, sumo 10 y quito 1.', vis: { t: 'recta', desde: 0, hasta: 30, inicio: 8, saltos: [10, -1] } }
  ],
  guiada() {
    const n = rnd(4, 9);
    return {
      pasos: [
        { txt: `Primero sumo 10 al ${n}:`, q: `${n} + 10 = ?`, r: n + 10, errores: [[n + 9, 'Todavía no quites 1. Primero suma 10.'], [n + 11, 'Solo diez. Una decena, no más.'], [n, 'Ese es donde empiezas. Salta 10.']], vis: { t: 'recta', desde: 0, hasta: 30, inicio: n, saltos: [10] } },
        { txt: `Me pasé 1, así que lo quito:`, q: `${n + 10} − 1 = ?`, r: n + 9, errores: [[n + 10, 'Falta quitar 1. Solo sumabas 9.'], [n + 8, 'Solo quito 1. Te has pasado.'], [n + 11, 'Quitar es ir hacia atrás, no hacia delante.']], vis: { t: 'recta', desde: 0, hasta: 30, inicio: n, saltos: [10, -1] } }
      ],
      final: { txt: 'Y ya tengo la suma:', q: `${n} + 9 = ?`, r: n + 9, errores: [[n + 10, 'Has sumado 10. Solo había que sumar 9: quita 1.'], [n + 8, 'Sumas 10 y quitas solo 1, no 2.'], [n + 11, 'Sumas 10 y quitas 1. Te has pasado.']], vis: { t: 'recta', desde: 0, hasta: 30, inicio: n, saltos: [10, -1] } }
    };
  },
  item(nivel) { let it, k = 0; do { it = this._it(nivel); } while (it.q === this._ult && ++k < 8); this._ult = it.q; return it; },
  _it(nivel) {
    const n = nivel === 1 ? rnd(4, 9) : nivel === 2 ? rnd(11, 29) : rnd(21, 40);
    const r = n + 9, rc = _rectaS9(n);
    const q = nivel > 1 && rnd(0, 1) ? `9 + ${n} = ?` : `${n} + 9 = ?`;
    const errores = [[n + 10, 'Has sumado 10. Solo había que sumar 9: quita 1.'], [n + 8, 'Sumas 10 y quitas solo 1, no 2.'], [n + 11, 'Sumas 10 y quitas 1. Te has pasado.'], [n + 2, 'Eso no es sumar 9. Salta 10 y quita 1.']];
    return { q, r, errores, vis: { t: 'recta', desde: rc.desde, hasta: rc.hasta, inicio: n, saltos: [10, -1] }, extra: [n + 10, n + 8, r + 2, n + 11] };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca cada suma con su resultado',
    pares() {
      const ns = shuffle([4, 5, 6, 7, 8, 9, 12, 14, 15, 17, 23, 25]).slice(0, 6);
      return ns.map(n => [`${n} + 9`, String(n + 9)]);
    }
  }
});
