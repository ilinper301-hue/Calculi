/* 6.º · Truco 10 · Potencias de 10 */
(() => {
  const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'];
  const P = e => '10' + SUP[e];
  const R = x => +x.toFixed(3);
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
  const F = 'Te falta un cero.', S = 'Te sobra un cero.';
  ESTR.add({
    id: 'potencias10', curso: 6, orden: 10, tri: 3,
    n: 'Potencias de 10', ic: '10³', desc: 'Un 1 seguido de ceros',
    truco: 'El exponente me dice cuántos ceros pongo',
    tutorial: [
      { txt: '10² es 10 × 10 = 100. El número pequeño (exponente) dice cuántas veces escribo el 10.', vis: { t: 'decenas', grupos: [{ c: 1 }] } },
      { txt: '10³ = 10 × 10 × 10 = 1000. Un 1 y tres ceros: son 10 placas de 100.', vis: { t: 'barra', partes: 10, marcadas: 10, total: 1000, valor: 100 } },
      { txt: 'Para 4 × 10², pongo dos ceros detrás del 4: 400.', vis: { t: 'decenas', grupos: [{ c: 4 }] } },
      { txt: 'Tu turno: ¿cuánto es 6 × 10³? Toca la respuesta.', toca: { t: 'elige', q: '6 × 10³ = ?', ops: [600, 6000, 60000, 18], r: 6000 } },
      { txt: 'Al revés: 3500 = 35 × 100 = 35 × 10². Cuento los ceros que sobran: dos.' }
    ],
    guiada() {
      const a = rnd(2, 9);
      return {
        pasos: [
          { txt: '10² son dos 10 multiplicados:', q: '10 × 10 = ?', r: 100, extra: [20, 1000, 10], errores: ER(100, [[20, 'Eso es 10 + 10. Aquí se multiplica.'], [1000, 'Te has pasado: son solo dos dieces.'], [10, 'Eso es un solo 10. Multiplica dos.']]) },
          { txt: '10³ es una vez más por 10:', q: '100 × 10 = ?', r: 1000, extra: [110, 100, 10000], errores: ER(1000, [[110, 'Eso es sumar. Hay que multiplicar por 10.'], [100, 'Eso es el paso anterior. Multiplica otra vez por 10.'], [10000, S]]) }
        ],
        final: { txt: 'Ahora con tu número:', q: `${a} × 10³ = ?`, r: a * 1000, extra: [a * 100, a * 10000, a * 10, a + 1000], errores: ER(a * 1000, [[a * 100, 'Son tres ceros, no dos.'], [a * 10000, 'Te sobra un cero: 10³ lleva tres.'], [a * 10, 'Faltan ceros: 10³ lleva tres.'], [a + 1000, 'No es sumar: pon tres ceros detrás.']]) }
      };
    },
    item(nivel) {
      if (nivel === 1) {
        const k = rnd(0, 2);
        if (k === 0) return { q: `${P(2)} = ?`, r: 100, vis: { t: 'decenas', grupos: [{ c: 1 }] }, extra: [20, 1000, 10], errores: ER(100, [[20, '10² es 10 × 10, no 10 + 10.'], [1000, 'Te has pasado: el exponente 2 son dos ceros.'], [10, '10² tiene dos ceros, no uno.']]) };
        if (k === 1) { const a = rnd(2, 4); return { q: `${a} × ${P(2)} = ?`, r: a * 100, vis: { t: 'decenas', grupos: [{ c: a }] }, extra: [a * 10, a * 1000, a + 100, a * 20], errores: ER(a * 100, [[a * 10, 'Con 10² van dos ceros, no uno.'], [a * 1000, S], [a + 100, 'No es sumar: pon dos ceros detrás.'], [a * 20, 'No se multiplica por 20: son dos ceros.']]) }; }
        const a = rnd(2, 9); return { q: `${a} × ${P(1)} = ?`, r: a * 10, vis: { t: 'decenas', grupos: [{ d: a }] }, extra: [a * 100, a, a + 10], errores: ER(a * 10, [[a * 100, 'Con 10¹ solo va un cero.'], [a, 'Falta el cero de 10¹.'], [a + 10, 'No es sumar: pon un cero detrás.']]) };
      }
      if (nivel === 2) {
        const k = rnd(0, 2);
        if (k === 0) { const e = rnd(3, 4); return { q: `${P(e)} = ?`, r: Math.pow(10, e), extra: [e * 10, Math.pow(10, e - 1), Math.pow(10, e + 1), 10 + e], errores: ER(Math.pow(10, e), [[e * 10, `${P(e)} no es ${e} × 10. Es un 1 con ${e} ceros.`], [Math.pow(10, e - 1), F], [Math.pow(10, e + 1), S], [10 + e, 'No es sumar: es 10 multiplicado varias veces.']]) }; }
        const a = rnd(2, 9), e = k === 1 ? 2 : 3;
        return { q: `${a} × ${P(e)} = ?`, r: a * Math.pow(10, e), extra: [a * Math.pow(10, e - 1), a * Math.pow(10, e + 1), a * e, a + Math.pow(10, e)], errores: ER(a * Math.pow(10, e), [[a * Math.pow(10, e - 1), F], [a * Math.pow(10, e + 1), S], [a * e, `No es ${a} × ${e}: pon ${e} ceros detrás del ${a}.`], [a + Math.pow(10, e), 'No es sumar: añade ceros detrás.']]) };
      }
      const k = rnd(0, 4);
      if (k === 0) { const e = rnd(4, 6); return rnd(0, 1) ? { txt: `¿Cuántos ceros tiene ${P(e)}?`, q: `${P(e)} tiene ? ceros`, r: e, extra: [e + 1, e - 1, e + 2, e * 10], errores: ER(e, [[e + 1, 'El exponente es justo el número de ceros.'], [e - 1, 'Cuenta otra vez: el exponente son los ceros.'], [e * 10, 'No multipliques: cuenta los ceros.']]) } : { txt: '¿A qué exponente hay que elevar el 10?', q: `${fmt(Math.pow(10, e))} = 10 elevado a ?`, r: e, extra: [e + 1, e - 1, e + 2, e * 10], errores: ER(e, [[e + 1, 'Cuenta los ceros: el exponente es ese número.'], [e - 1, 'Cuenta otra vez los ceros: te falta uno.'], [e * 10, 'No multipliques: cuenta los ceros.']]) }; }
      if (k === 4) { const m = rnd(2, 99), e = rnd(2, 3); return { q: `${fmt(m * Math.pow(10, e))} : ${P(e)} = ?`, r: m, extra: [m * 10, m * Math.pow(10, e), R(m / 10), m + e], errores: ER(m, [[m * 10, 'Te sobra un cero: quita tantos como dice el exponente.'], [m * Math.pow(10, e), 'Has multiplicado. Aquí se divide.'], [R(m / 10), 'Has quitado un cero de más.'], [m + e, 'No es restar: quita ceros.']]) }; }
      if (k === 1) { const e = rnd(5, 6); return { q: `${P(e)} = ?`, r: Math.pow(10, e), extra: [Math.pow(10, e - 1), Math.pow(10, e + 1), e * 10], errores: ER(Math.pow(10, e), [[Math.pow(10, e - 1), F], [Math.pow(10, e + 1), S], [e * 10, `${P(e)} es un 1 con ${e} ceros, no ${e} × 10.`]]) }; }
      if (k === 2) { const a = rnd(2, 9), e = rnd(3, 4); return { q: `${a} × ${P(e)} = ?`, r: a * Math.pow(10, e), extra: [a * Math.pow(10, e - 1), a * Math.pow(10, e + 1), a * e], errores: ER(a * Math.pow(10, e), [[a * Math.pow(10, e - 1), F], [a * Math.pow(10, e + 1), S], [a * e, `No es ${a} × ${e}: pon ${e} ceros detrás del ${a}.`]]) }; }
      const a = pick([1.5, 2.5, 3.5, 4.5, 7.5]), e = rnd(2, 3), r = a * Math.pow(10, e);
      return { q: `${fmt(a)} × ${P(e)} = ?`, r, extra: [r * 10, r / 10, a * e * 10], errores: ER(r, [[r * 10, S + ' Mueve la coma ' + e + ' lugares.'], [R(r / 10), F + ' Mueve la coma ' + e + ' lugares.'], [R(a * e * 10), 'Mueve la coma tantos lugares como ceros tiene la potencia.']]) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada potencia con su valor',
      pares() {
        for (let k = 0; k < 200; k++) {
          const L = [], pot = shuffle([2, 3, 4, 5]).slice(0, 3).map(e => [P(e), Math.pow(10, e)]);
          const prod = []; for (let i = 0; i < 3; i++) { const a = rnd(2, 9), e = rnd(1, 3); prod.push([`${a} × ${P(e)}`, a * Math.pow(10, e)]); }
          const T = pot.concat(prod);
          if (new Set(T.map(x => x[1])).size === 6 && new Set(prod.map(x => x[0])).size === 3) return shuffle(T).map(x => [x[0], fmt(x[1])]);
        }
        return [[P(2), '100'], [P(3), '1000'], [P(4), '10.000'], ['2 × 10¹', '20'], ['3 × 10²', '300'], ['5 × 10³', '5000']];
      }
    }
  });
})();
