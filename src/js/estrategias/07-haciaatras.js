/* Estrategia 7 · Contar hacia atrás */
ESTR.add({
  id: 'haciaatras', orden: 7, tri: 2,
  n: 'Contar hacia atrás', ic: '⏪', desc: 'Restar 1, 2 o 3',
  truco: 'Cuento hacia atrás',
  tutorial: [
    { txt: 'Restar es quitar. Vamos a hacer 9 − 2. Empiezo en el 9.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [] } },
    { txt: 'Quito 2, así que doy 2 pasos hacia atrás: 8, 7.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [-1, -1] } },
    { txt: 'Aquí se ve igual: hay 9 fichas y tacho las 2 últimas.', vis: { t: 'marco', a: 9, tam: 10, tachar: 2 } },
    { txt: 'Me quedo en el 7. Entonces 9 − 2 = 7.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 9, saltos: [-1, -1] } },
    { txt: 'Truco: en 15 − 3 empiezo en el 15 y doy 3 pasos atrás: 14, 13, 12. El 15 no se cuenta.', vis: { t: 'recta', desde: 0, hasta: 20, inicio: 15, saltos: [-1, -1, -1] } }
  ],
  guiada() {
    const s = rnd(2, 3), a = rnd(5, 20);
    const pasos = [{ txt: `Empiezo en ${a}. Doy un paso atrás. ¿Dónde estoy?`, q: '?', r: a - 1, ops: opciones(a - 1, 3, [a, a - 2], 20), vis: { t: 'recta', desde: 0, hasta: 20, inicio: a, saltos: [-1] } }];
    if (s === 3) pasos.push({ txt: 'Otro paso atrás. ¿Y ahora?', q: '?', r: a - 2, ops: opciones(a - 2, 3, [a - 1, a - 3], 20), vis: { t: 'recta', desde: 0, hasta: 20, inicio: a, saltos: [-1, -1] } });
    return { pasos, final: { txt: `Quito ${s} en total:`, q: `${a} − ${s} = ?`, r: a - s, ops: opciones(a - s, 3, [a, a - s + 1, a - s - 1], 20), vis: { t: 'recta', desde: 0, hasta: 20, inicio: a, saltos: Array(s).fill(-1) } } };
  },
  item(nivel) {
    const s = rnd(1, 3), a = rnd(s + 1, nivel === 1 ? 10 : 20), r = a - s;
    const vis = nivel === 1 && rnd(0, 1) ? { t: 'marco', a, tam: a > 10 ? 20 : 10, tachar: s } : { t: 'recta', desde: 0, hasta: 20, inicio: a, saltos: Array(s).fill(-1) };
    return { q: `${a} − ${s}`, r, vis, ops: opciones(r, 3, [a, r + 1, r - 1, a + s], 20) };
  },
  juego: {
    tipo: 'parejas', meta: 'Cuenta hacia atrás',
    pares() {
      const out = [], vistos = new Set();
      for (const [a, s] of shuffle([[8, 1], [10, 2], [12, 3], [15, 2], [17, 1], [20, 3], [11, 2], [14, 3], [9, 2], [13, 1]])) {
        if (vistos.has(a - s)) continue;
        vistos.add(a - s); out.push([`${a} − ${s}`, a - s]);
        if (out.length === 6) break;
      }
      return out;
    }
  }
});
