/* Estrategia 15 · Sumar y restar 10 (solo cambia la decena) */
const _recMM = (a) => { const d = Math.floor(a / 10) * 10; return { t: 'recta', desde: d - 10, hasta: d + 10, inicio: a, saltos: [-10] }; };
const _visMM = (a, suma) => suma ? { t: 'decenas', grupos: [{ d: Math.floor(a / 10), u: a % 10 }, { d: 1, u: 0 }] } : _recMM(a);
ESTR.add({
  id: 'masmenos10', orden: 15, tri: 3,
  n: 'Sumar y restar 10', ic: '🔟', desc: 'Solo cambia la decena',
  truco: 'Cambio solo las decenas',
  tutorial: [
    { txt: 'El 34 son 3 barras de diez y 4 cubitos.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }] } },
    { txt: 'Si sumo 10, añado una barra más.', vis: { t: 'decenas', grupos: [{ d: 3, u: 4 }, { d: 1, u: 0 }] } },
    { txt: 'Ahora hay 4 barras y los mismos 4 cubitos: 34 + 10 = 44.', vis: { t: 'decenas', grupos: [{ d: 4, u: 4 }] } },
    { txt: 'Si resto 10, quito una barra. 57 − 10 = 47. ¡Los cubitos no cambian!', vis: { t: 'recta', desde: 40, hasta: 60, inicio: 57, saltos: [-10] } },
    { txt: 'Truco: al sumar o restar 10, solo cambia el número de las decenas.', vis: { t: 'decenas', grupos: [{ d: 2, u: 6 }, { d: 1, u: 0 }] } }
  ],
  guiada() {
    const suma = rnd(0, 1) === 1, a = suma ? rnd(11, 89) : rnd(21, 99), d = Math.floor(a / 10), u = a % 10, r = suma ? a + 10 : a - 10;
    return {
      pasos: [
        { txt: `¿Cuántas decenas tiene el ${a}?`, q: '?', r: d, vis: { t: 'decenas', grupos: [{ d, u }] } },
        { txt: suma ? 'Sumo una decena más:' : 'Quito una decena:', q: suma ? `${d} + 1 = ?` : `${d} − 1 = ?`, r: suma ? d + 1 : d - 1, vis: _visMM(a, suma) }
      ],
      final: { txt: `Las unidades siguen siendo ${u}:`, q: suma ? `${a} + 10 = ?` : `${a} − 10 = ?`, r, vis: _visMM(a, suma) }
    };
  },
  item(nivel) {
    const suma = rnd(0, 1) === 1, a = nivel === 1 ? (suma ? rnd(11, 69) : rnd(21, 69)) : nivel === 2 ? (suma ? rnd(11, 89) : rnd(21, 89)) : (suma ? rnd(12, 89) : rnd(22, 99));
    const r = suma ? a + 10 : a - 10;
    const q = suma ? (nivel === 3 && rnd(0, 1) ? `10 + ${a} = ?` : `${a} + 10 = ?`) : `${a} − 10 = ?`;
    return { q, r, vis: _visMM(a, suma), extra: suma ? [a + 1, a + 20, r + 1, r - 1] : [a - 1, a - 20, r + 1, r - 1] };
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
