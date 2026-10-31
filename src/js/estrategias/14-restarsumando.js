/* Estrategia 14 · Restar pensando en sumar (12 − 9: ¿cuánto falta de 9 a 12?) */
const _recRS = (s, t) => ({ t: 'recta', desde: 0, hasta: 20, inicio: s, saltos: [10 - s, t - 10] });
ESTR.add({
  id: 'restarsumando', orden: 14, tri: 3,
  n: 'Restar sumando', ic: '🔁', desc: '¿Cuánto falta para llegar?',
  truco: 'Cuento lo que falta para llegar',
  tutorial: [
    { txt: 'Quiero restar 12 − 9. Puedo pensar: ¿cuánto falta de 9 a 12?', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [] } },
    { txt: 'De 9 a 10 falta 1. Es un saltito.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [1] } },
    { txt: 'De 10 a 12 faltan 2. Es otro salto.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [1, 2] } },
    { txt: 'Junto los saltos: 1 + 2 = 3. Entonces 12 − 9 = 3.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [1, 2] } },
    { txt: 'Tu turno: en 13 − 8 empiezas en el 8. Toca el 10, adonde llegas con el primer salto.', toca: { t: 'recta', desde: 0, hasta: 20, inicio: 8, objetivo: 10 } },
    { txt: 'Truco: para restar, cuento cuánto falta para llegar.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 8, saltos: [2, 4] } }
  ],
  guiada() {
    const s = rnd(7, 9), t = rnd(11, 18), a = 10 - s, b = t - 10;
    return {
      pasos: [
        { txt: `¿Cuánto falta del ${s} al 10?`, q: `${s} + ? = 10`, r: a, errores: [[s, `El ${s} ya está. ¿Cuánto falta para el 10?`], [10, 'El 10 es adonde llegas. ¿Cuánto falta?'], [a + 1, 'Cuenta otra vez el saltito: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== a), vis: { t: 'recta', desde: 0, hasta: 20, inicio: s, saltos: [a] } },
        { txt: `¿Y cuánto falta del 10 al ${t}?`, q: `10 + ? = ${t}`, r: b, errores: [[t, `El ${t} es adonde llegas. Cuenta desde el 10.`], [a, `Ese era el primer salto. Ahora del 10 al ${t}.`], [b + 1, 'Cuenta otra vez el salto: te has pasado.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== b), vis: { t: 'recta', desde: 0, hasta: 20, inicio: s, saltos: [a, b] } }
      ],
      final: { txt: `Junto los saltos y sé cuánto es:`, q: `${t} − ${s} = ?`, r: t - s, vis: _recRS(s, t), errores: [[a, 'Ese es solo el primer salto. Suma los dos.'], [b, 'Ese es solo el segundo salto. Suma los dos.'], [t, `El ${t} es adonde llegas. Busca cuánto hay que saltar.`], [t - s + 1, 'Casi. Suma bien los dos saltos.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== t - s) }
    };
  },
  item(nivel) { let it, k = 0; do { it = this._it(nivel); } while (it.q === this._ult && ++k < 8); this._ult = it.q; return it; },
  _it(nivel) {
    const s = nivel === 1 ? rnd(8, 9) : rnd(7, 9), t = nivel === 1 ? rnd(11, 14) : rnd(11, 18), r = t - s;
    const q = nivel > 1 && rnd(0, 2) === 0 ? `${s} + ? = ${t}` : `${t} − ${s} = ?`;
    const errores = [[10 - s, 'Ese es solo el primer salto. Falta el segundo.'], [t - 10, 'Ese es solo el segundo salto. Falta el primero.'], [t, `El ${t} es adonde llegas. Busca cuánto hay que saltar.`], [r + 1, 'Casi. Suma bien los dos saltos.'], [r - 1, 'Casi. Suma bien los dos saltos.']].filter((x, i, l) => l.findIndex(y => y[0] === x[0]) === i && x[0] >= 0 && x[0] !== r).slice(0, 4);
    return { q, r, errores, vis: _recRS(s, t), extra: [r + 1, r - 1, t - 10, 10 - s, t - s + 2].filter(x => x > 0) };
  },
  juego: {
    tipo: 'parejas', meta: 'Busca cada resta con su resultado',
    pares() {
      return shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 11]).slice(0, 6).map(r => {
        const s = pick([7, 8, 9].filter(x => r + x >= 11 && r + x <= 18));
        return [`${r + s} − ${s}`, String(r)];
      });
    }
  }
});
