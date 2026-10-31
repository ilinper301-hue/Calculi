/* 6.º · Truco 14 · Estimar operaciones (la respuesta es la estimación) */
(() => {
  const R = x => +x.toFixed(3);
  const ER = (r, l) => l.filter(x => x[0] >= 0 && Math.abs(x[0] - r) > 1e-9).map(x => [+x[0].toFixed(3), x[1]]);
  const est = x => { const m = Math.pow(10, Math.floor(Math.log10(Math.abs(x)) + 1e-9)); return R(Math.round(x / m + 1e-9) * m); };
  // Números «casi redondos» cuya primera cifra manda: tipo 'd' (decimal casi entero), 't' (casi decena), 'c' (casi centena)
  const casi = (tipo, base) => {
    for (let k = 0; k < 100; k++) {
      const b = base || (tipo === 'd' ? rnd(2, 9) : rnd(2, 9) * (tipo === 't' ? 10 : 100));
      const o = tipo === 'd' ? pick([-0.2, -0.1, 0.1, 0.2]) : tipo === 't' ? pick([-3, -2, -1, 1, 2, 3]) : pick([-1, 1]) * rnd(2, 40);
      const x = R(b + o);
      if (est(x) === b) return { x, b };
    }
    return { x: base || 20, b: base || 20 };
  };
  const TXT = 'Redondea cada número a una sola cifra (y ceros) y calcula.';
  const suma = (tipo, resta) => {
    let A = casi(tipo), B = casi(tipo);
    if (resta && A.b <= B.b) { const t = A; A = B; B = t; if (A.b === B.b) A = casi(tipo, B.b + (tipo === 't' ? 10 : 100)); }
    const r = resta ? A.b - B.b : A.b + B.b, s = resta ? '−' : '+';
    return { q: `${fmt(A.x)} ${s} ${fmt(B.x)} ≈ ?`, txt: TXT, r, A, B, extra: [R(resta ? A.x - B.x : A.x + B.x), r + (tipo === 't' ? 10 : 100), r - (tipo === 't' ? 10 : 100), r + (tipo === 't' ? 20 : 200)],
      errores: ER(r, [[R(resta ? A.x - B.x : A.x + B.x), `Esa es la cuenta exacta. Redondea antes de ${resta ? 'restar' : 'sumar'}.`], [r + (tipo === 't' ? 10 : 100), 'Revisa cómo has redondeado: te has pasado.'], [r - (tipo === 't' ? 10 : 100), 'Revisa cómo has redondeado: te falta.'], [r + (tipo === 't' ? 20 : 200), 'Revisa cómo has redondeado: te has pasado.']]) };
  };
  const prod = (ta, tb) => {
    const A = casi(ta), B = casi(tb), r = R(A.b * B.b);
    return { q: `${fmt(A.x)} × ${fmt(B.x)} ≈ ?`, txt: TXT, r, A, B, extra: [R(A.x * B.x), R(A.b * B.x), R(A.x * B.b), R(r * 10), R(r / 10)],
      errores: ER(r, [[R(A.x * B.x), 'Esa es la cuenta exacta. Redondea antes de multiplicar.'], [R(A.b * B.x), 'Falta redondear el segundo número.'], [R(A.x * B.b), 'Falta redondear el primer número.'], [R(r * 10), 'Te sobra un cero al multiplicar.'], [R(r / 10), 'Te falta un cero al multiplicar.']]) };
  };
  const divi = tipo => {
    const d = pick([2, 3, 4, 5, 6]), mult = [];
    for (let b = (tipo === 't' ? 20 : 200); b <= (tipo === 't' ? 90 : 900); b += (tipo === 't' ? 10 : 100)) if (b % d === 0) mult.push(b);
    const A = casi(tipo, pick(mult)), r = R(A.b / d);
    return { q: `${fmt(A.x)} : ${d} ≈ ?`, txt: TXT, r, A, extra: [R(A.x / d), R(r * 10), R(r / 10), R(r + 10)],
      errores: ER(r, [[R(A.x / d), 'Redondea el número antes de dividir.'], [R(r * 10), 'Te sobra un cero al dividir.'], [R(r / 10), 'Te falta un cero al dividir.'], [R(r + 10), 'Revisa la división con el número redondeado.']]) };
  };
  ESTR.add({
    id: 'estimar6', curso: 6, orden: 14, tri: 3,
    n: 'Estimar operaciones', ic: '≈', desc: 'Redondeo y calculo',
    truco: 'Redondeo cada número y calculo con los redondos',
    tutorial: [
      { txt: 'Estimar es calcular rápido un resultado cercano. Redondeo cada número a una sola cifra y ceros: 39 a 40 y 21 a 20.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
      { txt: '39 + 21 ≈ 40 + 20 = 60. Dos saltos fáciles en vez de uno difícil.', vis: { t: 'recta', desde: 0, hasta: 60, inicio: 0, saltos: [40, 20] } },
      { txt: '4,9 × 21: redondeo 4,9 a 5 y 21 a 20. Calculo 5 × 20 = 100.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 100, valor: 20 } },
      { txt: 'Tu turno: estima 5,1 × 39. Redondea a 5 y a 40, y toca la respuesta.', toca: { t: 'elige', q: '5,1 × 39 ≈ ?', ops: [200, 20, 2000, 199], r: 200 } },
      { txt: 'El resultado exacto es 102,9, muy cerca de 100. Con ≈ digo «más o menos». ¡Y vale para comprobar cuentas!', vis: { t: 'barra', partes: 5, marcadas: 5, total: 100, valor: 20 } }
    ],
    guiada() {
      const A = casi('d'), B = casi('t'), r = R(A.b * B.b);
      return {
        pasos: [
          { txt: `Redondeo ${fmt(A.x)} a una sola cifra:`, q: `${fmt(A.x)} ≈ ?`, r: A.b, extra: [Math.floor(A.x), Math.ceil(A.x) + 1, A.b * 10], errores: ER(A.b, [[Math.floor(A.x), 'Redondear no es cortar: mira a qué entero está más cerca.'], [Math.ceil(A.x) + 1, 'Te has pasado de entero. Busca el más cercano.'], [A.b * 10, 'Aquí redondeas a unidades, no a decenas.']]) },
          { txt: `Redondeo ${fmt(B.x)} a una sola cifra:`, q: `${fmt(B.x)} ≈ ?`, r: B.b, extra: [B.b + 10, B.b - 10, Math.round(B.x)], errores: ER(B.b, [[B.b + 10, 'Mira las unidades: ¿a qué decena está más cerca?'], [B.b - 10, 'Mira las unidades: ¿a qué decena está más cerca?'], [Math.round(B.x), 'Redondea a una sola cifra y ceros detrás.']]) }
        ],
        final: { txt: 'Calculo con los números redondeados:', q: `${fmt(A.x)} × ${fmt(B.x)} ≈ ?`, r, extra: [R(A.x * B.x), R(A.b * B.x), R(r * 10), R(r / 10)], errores: ER(r, [[R(A.x * B.x), 'Esa es la cuenta exacta. Usa los números redondeados.'], [R(A.b * B.x), 'Falta usar el segundo número redondeado.'], [R(r * 10), 'Te sobra un cero al multiplicar.'], [R(r / 10), 'Te falta un cero al multiplicar.']]) }
      };
    },
    item(nivel) {
      let it;
      if (nivel === 1) {
        it = suma('t', rnd(0, 1) === 1);
        const A = it.A, B = it.B, add = it.q.includes('+');
        it.vis = add ? { t: 'recta', desde: 0, hasta: it.r, inicio: 0, saltos: [A.b, B.b] } : { t: 'recta', desde: 0, hasta: A.b, inicio: A.b, saltos: [-B.b] };
        it.txt = 'Redondea a la decena y calcula.';
      } else if (nivel === 2) {
        const k = rnd(0, 3);
        it = k === 0 ? suma('c', rnd(0, 1) === 1) : k === 1 ? prod('d', 't') : k === 2 ? prod('t', 'd') : prod('t', 'd');
        if (it.q.includes('×') && it.A.b < 10 === false && it.B.b < 10 === false) it = prod('d', 't');
      } else {
        const k = rnd(0, 5);
        it = k === 0 ? prod('t', 't') : k === 1 ? prod('c', 'd') : k === 2 ? prod('d', 'd') : k === 3 ? divi('c') : k === 4 ? prod('d', 't') : suma('c', rnd(0, 1) === 1);
      }
      delete it.A; delete it.B; return it;
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuenta con su estimación',
      pares() {
        for (let k = 0; k < 300; k++) {
          const T = [];
          for (let i = 0; i < 3; i++) { const it = prod('d', 't'); T.push([it.q.replace(' ≈ ?', ''), fmt(it.r)]); }
          for (let i = 0; i < 3; i++) { const it = suma('c', i === 2); T.push([it.q.replace(' ≈ ?', ''), fmt(it.r)]); }
          if (new Set(T.map(x => x[0])).size === 6 && new Set(T.map(x => x[1])).size === 6 && T.every(x => x[0].length <= 9)) return T;
        }
        return [['4,9 × 21', '100'], ['2,1 × 39', '80'], ['6,8 × 31', '210'], ['398 + 205', '600'], ['602 − 197', '400'], ['499 + 302', '800']];
      }
    }
  });
})();
