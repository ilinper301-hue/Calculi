/* Estrategia 15 · Sumar y restar 10 (solo cambia la decena) */
const _recMM = (a) => { const d = Math.floor(a / 10) * 10; return { t: 'recta', desde: d - 10, hasta: d + 10, inicio: a, saltos: [-10] }; };
const _visMM = (a, suma, antes) => suma ? { t: 'decenas', grupos: antes ? [{ d: 1, u: 0 }, { d: Math.floor(a / 10), u: a % 10 }] : [{ d: Math.floor(a / 10), u: a % 10 }, { d: 1, u: 0 }] } : { t: 'decenas', grupos: [{ d: Math.floor(a / 10), u: a % 10 }], tachar: 1 };
ESTR.add({
  id: 'masmenos10', orden: 15, tri: 3,
  n: 'Sumar y restar 10', ic: '🔟', desc: 'Solo cambia la decena',
  truco: 'Cambio solo las decenas',
  tutorial: [
    { txt: 'El 34 son 3 barras de diez y 4 cubitos.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }] } },
    { txt: 'Si sumo 10, añado una barra más.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }, { d: 1, u: 0 }] } },
    { txt: 'Ahora hay 4 barras y los mismos 4 cubitos: 34 + 10 = 44.', vis: { t: 'decenas', grupos: [{ d: 4, u: 4 }] } },
    { txt: 'Si resto 10, quito una barra. 57 − 10 = 47. ¡Los cubitos no cambian!', vis: { t: 'decenas', grupos: [{ d: 5, u: 7 }], tachar: 1 } },
    { txt: 'Tu turno: ¿qué número tiene una barra de diez más que 52?', toca: { t: 'elige', q: '52 + 10 = ?', ops: [53, 62, 42], r: 62 } },
    { txt: 'Truco: al sumar o restar 10, solo cambia el número de las decenas.', vis: { t: 'decenas', grupos: [{ d: 2, u: 6 }, { d: 1, u: 0 }] } }
  ],
  guiada() {
    const suma = rnd(0, 1) === 1, a = suma ? rnd(11, 89) : rnd(21, 99), d = Math.floor(a / 10), u = a % 10, r = suma ? a + 10 : a - 10;
    return {
      pasos: [
        { txt: `¿Cuántas decenas tiene el ${a}?`, q: '?', r: d, vis: { t: 'decenas', grupos: [{ d, u }] }, errores: [[u, 'Esos son los cubitos sueltos. Cuenta las barras de diez.'], [a, `El ${a} es todo el número. Cuenta solo las barras.`], [d + 1, 'Cuenta otra vez las barras: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== d) },
        { txt: suma ? 'Sumo una decena más:' : 'Quito una decena:', q: suma ? `${d} + 1 = ?` : `${d} − 1 = ?`, r: suma ? d + 1 : d - 1, vis: _visMM(a, suma), errores: [[d, 'Ese es el de antes. Cambia una barra.'], [suma ? d + 2 : d - 2, 'Solo una barra. Te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0) }
      ],
      final: { txt: u ? `Los cubitos siguen siendo ${u}:` : 'No hay cubitos sueltos:', q: suma ? `${a} + 10 = ?` : `${a} − 10 = ?`, r, vis: _visMM(a, suma), errores: [[suma ? a + 1 : a - 1, suma ? 'Has sumado 1. Sumar 10 es una barra entera.' : 'Has quitado 1. Quitar 10 es una barra entera.'], [suma ? a + 20 : a - 20, 'Solo una decena. Te has pasado.'], [a, 'Ese es donde empiezas. Cambia las decenas.'], [r + 1, 'Los cubitos no cambian. Mira solo las decenas.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r) }
    };
  },
  item(nivel) { let it, k = 0; do { it = this._it(nivel); } while (it.q === this._ult && ++k < 8); this._ult = it.q; return it; },
  _it(nivel) {
    const suma = rnd(0, 1) === 1, a = nivel === 1 ? (suma ? rnd(11, 69) : rnd(21, 69)) : nivel === 2 ? (suma ? rnd(11, 89) : rnd(21, 89)) : (suma ? rnd(12, 89) : rnd(22, 99));
    const r = suma ? a + 10 : a - 10;
    const antes = suma && nivel === 3 && rnd(0, 1) === 1;
    const q = suma ? (antes ? `10 + ${a} = ?` : `${a} + 10 = ?`) : `${a} − 10 = ?`;
    const errores = [[suma ? a + 1 : a - 1, suma ? 'Has sumado 1. Sumar 10 es una barra entera.' : 'Has quitado 1. Quitar 10 es una barra entera.'], [suma ? a + 20 : a - 20, 'Solo una decena. Te has pasado.'], [a, 'Ese es donde empiezas. Cambia las decenas.'], [r + 1, 'Los cubitos no cambian. Mira solo las decenas.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r);
    return { q, r, errores, vis: _visMM(a, suma, antes), extra: suma ? [a + 1, a + 20, r + 1, r - 1] : [a - 1, a - 20, r + 1, r - 1] };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca cada cuenta con su resultado',
    pares() {
      const out = [], usados = new Set();
      while (out.length < 6) {
        const suma = rnd(0, 1) === 1, a = suma ? rnd(11, 89) : rnd(21, 99), r = suma ? a + 10 : a - 10;
        if (usados.has(r) || usados.has(a)) continue;
        usados.add(r); usados.add(a); out.push([`${a} ${suma ? '+' : '−'} 10`, String(r)]);
      }
      return out;
    }
  }
});
