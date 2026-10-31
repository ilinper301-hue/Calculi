/* 5.º · Truco 3 · Por 4 y por 8 duplicando */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
  // Recta del 0 al resultado con los saltos de cada doble: n → 2n → 4n (→ 8n)
  const rc = (n, k) => ({ t: 'recta', desde: 0, hasta: k * n, inicio: n, saltos: k === 4 ? [n, 2 * n] : [n, 2 * n, 4 * n] });
  ESTR.add({
    id: 'por4y8', curso: 5, orden: 3, tri: 1,
    n: 'Por 4 y por 8', ic: '×4 ×8', desc: 'Duplico una y otra vez',
    truco: 'Duplico dos veces (×4) o tres (×8)',
    tutorial: [
      { txt: 'Multiplicar por 4 es duplicar dos veces. 6 × 4: el doble de 6 es 12.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 12, valor: 6 } },
      { txt: 'Y el doble de 12 es 24. Así, 6 × 4 = 24.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 24, valor: 12 } },
      { txt: 'Multiplicar por 8 es duplicar tres veces. 5 × 8: 5, 10, 20 y 40.', vis: { t: 'recta', desde: 0, hasta: 40, inicio: 5, saltos: [5, 10, 20] } },
      { txt: 'Truco: ×4 = doble del doble. ×8 = doble, doble y doble. Mira 3 × 8: 3, 6, 12 y 24.', vis: { t: 'recta', desde: 0, hasta: 24, inicio: 3, saltos: [3, 6, 12] } },
      { txt: 'Tu turno: 5 × 4. Empiezas en 5 y duplicas dos veces. Toca el número al que llegas.', toca: { t: 'recta', desde: 0, hasta: 20, inicio: 5, objetivo: 20 } },
    { txt: 'Otro ejemplo: 7 × 8. El doble de 7 es 14, de 14 es 28 y de 28 es 56.', vis: { t: 'recta', desde: 0, hasta: 56, inicio: 7, saltos: [7, 14, 28] } }
    ],
    guiada() {
      const por8 = rnd(0, 1), n = por8 ? rnd(2, 7) : rnd(3, 9);
      if (!por8) return {
        pasos: [
          { txt: 'Primero, el doble:', q: `${n} × 2 = ?`, r: 2 * n, vis: { t: 'recta', desde: 0, hasta: 4 * n, inicio: n, saltos: [n] }, extra: [n + 1, 4 * n, 3 * n], errores: ER(2 * n, [[n + 1, 'El doble es sumar el número a sí mismo.'], [4 * n, 'Eso son dos dobles. Ahora solo uno.'], [3 * n, 'Eso es el triple. Busca el doble.']]) },
          { txt: 'Ahora, el doble de ese doble:', q: `${2 * n} × 2 = ?`, r: 4 * n, vis: { t: 'recta', desde: 0, hasta: 4 * n, inicio: 2 * n, saltos: [2 * n] }, extra: [2 * n + 2, 8 * n, 3 * n], errores: ER(4 * n, [[2 * n + 2, 'El doble es sumar el número a sí mismo.'], [8 * n, 'Duplica solo una vez el resultado anterior.'], [3 * n, 'Eso es el triple. Busca el doble del anterior.']]) }
        ],
        final: { txt: 'Entonces:', q: `${n} × 4 = ?`, r: 4 * n, vis: rc(n, 4), extra: [2 * n, 8 * n, 4 * n + 4, 3 * n], errores: ER(4 * n, [[2 * n, 'Eso es solo un doble. Duplica otra vez.'], [8 * n, 'Te has pasado: ×4 son dos dobles.'], [3 * n, 'Eso es ×3. Duplica y vuelve a duplicar.']]) }
      };
      return {
        pasos: [
          { txt: 'Primero, el doble:', q: `${n} × 2 = ?`, r: 2 * n, vis: { t: 'recta', desde: 0, hasta: 8 * n, inicio: n, saltos: [n] }, extra: [n + 1, 4 * n, 3 * n], errores: ER(2 * n, [[n + 1, 'El doble es sumar el número a sí mismo.'], [4 * n, 'Eso son dos dobles. Ahora solo uno.'], [3 * n, 'Eso es el triple. Busca el doble.']]) },
          { txt: 'Otra vez el doble:', q: `${2 * n} × 2 = ?`, r: 4 * n, vis: { t: 'recta', desde: 0, hasta: 8 * n, inicio: 2 * n, saltos: [2 * n] }, extra: [2 * n + 2, 8 * n, 3 * n], errores: ER(4 * n, [[2 * n + 2, 'El doble es sumar el número a sí mismo.'], [8 * n, 'Duplica solo una vez el resultado anterior.'], [3 * n, 'Eso es el triple. Busca el doble del anterior.']]) },
          { txt: 'Y una tercera vez el doble:', q: `${4 * n} × 2 = ?`, r: 8 * n, vis: { t: 'recta', desde: 0, hasta: 8 * n, inicio: 4 * n, saltos: [4 * n] }, extra: [4 * n + 4, 16 * n, 6 * n], errores: ER(8 * n, [[16 * n, 'Duplica solo una vez el resultado anterior.'], [4 * n + 4, 'El doble es sumar el número a sí mismo.'], [6 * n, 'Eso no es el doble del anterior. Revísalo.']]) }
        ],
        final: { txt: 'Entonces:', q: `${n} × 8 = ?`, r: 8 * n, vis: rc(n, 8), extra: [4 * n, 16 * n, 8 * n + 8, 6 * n], errores: ER(8 * n, [[4 * n, 'Eso es ×4. Duplica una vez más.'], [16 * n, 'Te has pasado: ×8 son tres dobles.'], [6 * n, 'Eso es ×6. Duplica, duplica y duplica.']]) }
      };
    },
    item(nivel) {
      const por8 = rnd(0, 2) === 0 ? 1 : rnd(0, 1); // algo más de ×4
      const k = por8 ? 8 : 4;
      const n = nivel === 1 ? (por8 ? rnd(3, 6) : rnd(3, 9)) : nivel === 2 ? (por8 ? rnd(4, 15) : rnd(6, 25)) : (por8 ? rnd(12, 60) : rnd(12, 99));
      const r = k * n, extra = por8 ? [4 * n, 16 * n, 6 * n, r + 8, r - 8] : [2 * n, 8 * n, 3 * n, r + 4, r - 4];
      const vis = nivel === 1 || r <= 400 ? rc(n, k) : undefined;
      const errores = por8 ? ER(r, [[4 * n, 'Eso es ×4. Duplica una vez más.'], [16 * n, 'Te has pasado: ×8 son tres dobles.'], [6 * n, 'Eso es ×6. Duplica, duplica y duplica.']]) : ER(r, [[2 * n, 'Eso es solo un doble. Duplica otra vez.'], [8 * n, 'Te has pasado: ×4 son dos dobles.'], [3 * n, 'Eso es ×3. Duplica y vuelve a duplicar.']]);
      return { q: rnd(0, 1) ? `${n} × ${k} = ?` : `${k} × ${n} = ?`, r, vis, extra, errores };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
      pares() {
        const usados = new Set(), out = [];
        for (const [n, k] of shuffle([[3, 4], [6, 4], [7, 4], [9, 4], [12, 4], [15, 4], [4, 8], [5, 8], [6, 8], [7, 8], [9, 8], [11, 8]])) {
          if (out.length < 6 && !usados.has(n * k)) { usados.add(n * k); out.push([`${n} × ${k}`, n * k]); }
        }
        return out;
      }
    }
  });
})();
