/* 5.º · Truco 13 · Estimar con decimales (3,8 × 5 ≈ 4 × 5 = 20) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
  const R = x => +x.toFixed(3);
  // Decimal cercano a un entero N: N ± (0,1 a 0,4). Se redondea sin dudas a N.
  const cerca = (a, b) => { const N = rnd(a, b), s = pick([-0.4, -0.3, -0.2, -0.1, 0.1, 0.2, 0.3, 0.4]); return { N, x: R(N + s) }; };
  // Recta que muestra cómo se redondea x hasta N
  const red = (x, N) => ({ t: 'recta', desde: N - 1, hasta: N + 1, paso: 0.1, inicio: x, saltos: [R(N - x)] });
  const TXT = 'Redondea los decimales al entero más cercano.';
  ESTR.add({
    id: 'estimar5', curso: 5, orden: 13, tri: 3,
    n: 'Estimar con decimales', ic: '≈', desc: 'Redondeo y calculo fácil',
    truco: 'Redondeo al entero y calculo',
    tutorial: [
      { txt: 'Estimar es hacer una cuenta rápida que se acerque al resultado. Se usa ≈.', vis: { t: 'recta', desde: 3, hasta: 5, paso: 0.1, inicio: 3.8, saltos: [0.2] } },
      { txt: '3,8 × 5: redondeo 3,8 al entero más cercano. Está cerca de 4.', vis: { t: 'recta', desde: 3, hasta: 5, paso: 0.1, inicio: 3.8, saltos: [0.2] } },
      { txt: 'Ahora hago la cuenta fácil: 4 × 5 = 20. Así, 3,8 × 5 ≈ 20.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 20, valor: 4 } },
      { txt: 'Acaba en 1, 2, 3 o 4: bajo al entero (6,2 → 6). Acaba en 6, 7, 8 o 9: subo (3,8 → 4).', vis: { t: 'recta', desde: 5, hasta: 7, paso: 0.1, inicio: 6.2, saltos: [-0.2] } },
      { txt: 'Tu turno: toca en la recta el entero más cercano a 6,8.', toca: { t: 'recta', desde: 6, hasta: 8, paso: 0.1, inicio: 6.8, objetivo: 7 } },
    { txt: 'Truco: redondeo cada número al entero más cercano y calculo con ellos. 2,9 + 5,1 ≈ 3 + 5 = 8.', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 3, saltos: [5] } }
    ],
    guiada() {
      const { N, x } = cerca(3, 9), b = rnd(2, 8);
      return {
        pasos: [
          { txt: `¿A qué entero se acerca más ${fmt(x)}?`, q: '?', r: N, vis: red(x, N), ops: opciones(N, 3, [N - 1, N + 1, Math.floor(x), Math.ceil(x)], 20), errores: ER(N, [[N - 1, `Mira la recta: ${fmt(x)} está más cerca de otro entero.`], [N + 1, `Mira la recta: ${fmt(x)} está más cerca de otro entero.`]]) },
          { txt: `Hago la cuenta con ese entero:`, q: `${N} × ${b} = ?`, r: N * b, vis: { t: 'barra', partes: b, marcadas: b, total: N * b, valor: N }, extra: [(N - 1) * b, (N + 1) * b, N + b], errores: ER(N * b, [[N + b, 'Es una multiplicación, no una suma.'], [(N - 1) * b, `Revisa la tabla del ${N}.`], [(N + 1) * b, `Revisa la tabla del ${N}.`]]) }
        ],
        final: { txt: 'Entonces, la estimación es:', q: `${fmt(x)} × ${b} ≈ ?`, r: N * b, vis: red(x, N), extra: [R(x * b), (N - 1) * b, (N + 1) * b, N * b + 10], errores: ER(N * b, [[R(x * b), 'Eso es la cuenta exacta. Redondea primero.'], [(N - 1) * b, `Revisa a qué entero se acerca ${fmt(x)}.`], [(N + 1) * b, `Revisa a qué entero se acerca ${fmt(x)}.`]]) }
      };
    },
    item(nivel) {
      const tipo = nivel === 1 ? 0 : pick([0, 0, 1, 2, 3]);
      if (tipo === 0) { // decimal × entero
        const { N, x } = cerca(nivel === 1 ? 2 : 3, nivel === 1 ? 9 : nivel === 2 ? 12 : 30), b = nivel === 1 ? rnd(2, 5) : rnd(2, 9);
        const r = N * b, q = rnd(0, 1) || nivel === 1 ? `${fmt(x)} × ${b} ≈ ?` : `${b} × ${fmt(x)} ≈ ?`;
        return { q, txt: TXT, r, vis: red(x, N), extra: [R(x * b), (N - 1) * b, (N + 1) * b, r + 10], errores: ER(r, [[R(x * b), 'Eso es la cuenta exacta. Redondea primero y calcula.'], [(N - 1) * b, `¿A qué entero se acerca más ${fmt(x)}?`], [(N + 1) * b, `¿A qué entero se acerca más ${fmt(x)}?`], [r + 10, 'Revisa la cuenta con el entero redondeado.']]) };
      }
      if (tipo === 1) { // suma o resta de dos decimales
        const A = cerca(3, nivel === 2 ? 9 : 40), B = cerca(2, nivel === 2 ? 9 : 30), suma = rnd(0, 1) === 1 || A.N <= B.N;
        const r = suma ? A.N + B.N : A.N - B.N, ex = suma ? R(A.x + B.x) : R(A.x - B.x);
        return { q: `${fmt(A.x)} ${suma ? '+' : '−'} ${fmt(B.x)} ≈ ?`, txt: TXT, r, vis: { t: 'recta', desde: 0, hasta: Math.max(A.N, r) + (A.N > 20 ? 0 : 1), inicio: A.N, saltos: [suma ? B.N : -B.N] }, extra: [ex, r + 1, r - 1, r + 10, r - 10], errores: ER(r, [[ex, 'Eso es el resultado exacto. Aquí se redondea antes.'], [r + 1, 'Redondea cada número y calcula con enteros.'], [r - 1, 'Redondea cada número y calcula con enteros.']]) };
      }
      if (tipo === 2) { // decimal : entero (el entero redondeado es múltiplo)
        const b = rnd(2, 9), k = nivel === 2 ? rnd(2, 9) : rnd(3, 12), N = b * k, s = pick([-0.3, -0.2, -0.1, 0.1, 0.2, 0.3]), x = R(N + s);
        return { q: `${fmt(x)} : ${b} ≈ ?`, txt: TXT, r: k, vis: red(x, N), extra: [k + 1, k - 1, R(x / b), k * 10, N], errores: ER(k, [[R(x / b), 'Eso es la división exacta. Redondea antes.'], [N, `Ese es el ${N} redondeado. Falta dividirlo entre ${b}.`], [k * 10, `Revisa los ceros: ¿cuántas veces cabe ${b}?`], [k + 1, `Casi. Divide el entero redondeado entre ${b}.`]]) };
      }
      // decimal × decimal
      const A = cerca(2, nivel === 2 ? 9 : 15), B = cerca(2, 9);
      return { q: `${fmt(A.x)} × ${fmt(B.x)} ≈ ?`, txt: TXT, r: A.N * B.N, vis: red(A.x, A.N), extra: [R(A.x * B.x), (A.N + 1) * B.N, A.N * (B.N + 1), A.N + B.N], errores: ER(A.N * B.N, [[R(A.x * B.x), 'Eso es la cuenta exacta. Redondea los dos números.'], [(A.N + 1) * B.N, 'Revisa los redondeos: ¿a qué entero se acerca cada uno?'], [A.N * (B.N + 1), 'Revisa los redondeos: ¿a qué entero se acerca cada uno?'], [A.N + B.N, 'Es una multiplicación, no una suma.']]) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cuenta con su estimación',
      pares() {
        const out = [], vistos = new Set(); let guard = 0;
        while (out.length < 6 && guard++ < 300) {
          const { N, x } = cerca(2, 9), b = rnd(2, 6), r = N * b, t = `${fmt(x)} × ${b}`;
          if (vistos.has(t) || vistos.has(String(r))) continue;
          vistos.add(t); vistos.add(String(r)); out.push([t, r]);
        }
        return out;
      }
    }
  });
})();
