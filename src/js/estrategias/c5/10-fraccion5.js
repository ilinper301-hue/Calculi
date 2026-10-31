/* 5.º · Truco 10 · Fracción de una cantidad (entre el de abajo, por el de arriba) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && Number.isInteger(x[0]) && !v.has(x[0]) && v.add(x[0])); };
ESTR.add({
  id: 'fraccion5', curso: 5, orden: 10, tri: 2,
  n: 'Fracción de una cantidad', ic: '3/5', desc: 'Entre el de abajo, por el de arriba',
  truco: 'Divido entre el de abajo y multiplico por el de arriba',
  tutorial: [
    { txt: 'Queremos 3/5 de 40. Primero reparto el 40 en 5 partes iguales.', vis: { t: 'barra', partes: 5, marcadas: 0, total: 40 } },
    { txt: 'Cada parte vale 40 : 5 = 8.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 40, valor: 8 } },
    { txt: 'Ahora cojo 3 partes: 3 × 8 = 24. Así, 3/5 de 40 = 24.', vis: { t: 'barra', partes: 5, marcadas: 3, total: 40, valor: 8 } },
    { txt: 'Tu turno: 2/5 de 30. La barra son 30 en 5 partes de 6. Toca 2 partes.', toca: { t: 'barra', partes: 5, objetivo: 2, total: 30 } },
    { txt: 'Truco: divido entre el de abajo y multiplico por el de arriba. Mira 2/3 de 90.', vis: { t: 'barra', partes: 3, marcadas: 2, total: 90, valor: 30 } },
    { txt: '2/3 de 90: 90 : 3 = 30 y 30 × 2 = 60.', vis: { t: 'barra', partes: 3, marcadas: 2, total: 90, valor: 30 } }
  ],
  guiada() {
    const q = rnd(3, 6), p = rnd(2, q - 1), v = rnd(2, 9), t = q * v;
    return {
      pasos: [
        { txt: 'Primero, lo que vale cada parte:', q: `${t} : ${q} = ?`, r: v, vis: { t: 'barra', partes: q, marcadas: 0, total: t }, extra: [t - q, v + 1, v - 1, t / p], errores: ER(v, [[t - q, `Es una división: reparte ${t} en ${q} partes.`], [v + 1, `Casi. Comprueba multiplicando por ${q}.`], [v - 1, `Casi. Comprueba multiplicando por ${q}.`], [t / p, `Se divide entre el de abajo (${q}), no entre el de arriba.`]]) },
        { txt: `Ahora cojo ${p} ${p === 1 ? 'parte' : 'partes'}:`, q: `${p} × ${v} = ?`, r: p * v, vis: { t: 'barra', partes: q, marcadas: p, total: t, valor: v }, extra: [p + v, v, (q - p) * v], errores: ER(p * v, [[p + v, `Es una multiplicación: ${p} partes de ${v}.`], [v, `Esa es una parte. Coge ${p}.`], [(q - p) * v, 'Esas son las partes que no coges.']]) }
      ],
      final: { txt: 'Entonces:', q: `${p}/${q} de ${t} = ?`, r: p * v, vis: { t: 'barra', partes: q, marcadas: p, total: t, valor: v }, extra: [v, (q - p) * v, p * t, p * v + v], errores: ER(p * v, [[v, `Esa es una sola parte. Coge ${p}.`], [(q - p) * v, 'Esas son las partes que no coges.'], [p * t, `Primero divide entre ${q}; después multiplica por ${p}.`], [p * v + v, `Coge ${p} partes, no ${p + 1}.`]]) }
    };
  },
  item(nivel) {
    const q = nivel === 1 ? rnd(2, 5) : nivel === 2 ? rnd(3, 8) : rnd(3, 10), p = rnd(1, q - 1);
    const v = nivel === 1 ? rnd(2, 8) : nivel === 2 ? rnd(3, 12) : rnd(4, 25), t = q * v, r = p * v;
    const vis = { t: 'barra', partes: q, marcadas: p, total: t, valor: nivel === 1 ? v : null };
    return { q: `${p}/${q} de ${t} = ?`, r, vis, extra: [v, (q - p) * v, r + v, r - v, t - r, t].filter(x => x > 0), errores: ER(r, [[v, `Esa es una sola parte. Coge ${p}.`], [(q - p) * v, 'Esas son las partes que no coges.'], [t, `Ese es el total. Coge solo ${p} de ${q} partes.`], [r + v, `Coge ${p} partes, no ${p + 1}.`]]) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada fracción con su resultado',
    pares() {
      const out = [], vistos = new Set(); let guard = 0;
      while (out.length < 6 && guard++ < 300) {
        const q = rnd(2, 9), p = rnd(1, q - 1), v = rnd(2, 9), t = q * v;
        if (t < 10 || t > 99) continue;
        const a = `${p}/${q} de ${t}`, b = p * v;
        if (vistos.has(a) || vistos.has(String(b))) continue;
        vistos.add(a); vistos.add(String(b)); out.push([a, b]);
      }
      return out;
    }
  }
});
})();
