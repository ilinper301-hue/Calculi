/* 5.º · Truco 4 · Entre 4 y entre 8 (mitades seguidas) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && Number.isInteger(x[0]) && !v.has(x[0]) && v.add(x[0])); };
  // Recta que baja haciendo la mitad una y otra vez
  const rb = (n, k) => ({ t: 'recta', desde: 0, hasta: n, inicio: n, saltos: k === 4 ? [-n / 2, -n / 4] : [-n / 2, -n / 4, -n / 8] });
  ESTR.add({
    id: 'entre4y8', curso: 5, orden: 4, tri: 1,
    n: 'Entre 4 y entre 8', ic: ':4 :8', desc: 'Mitad de la mitad',
    truco: 'Hago la mitad dos veces (:4) o tres (:8)',
    tutorial: [
      { txt: 'Dividir entre 4 es hacer la mitad dos veces. 24 : 4: la mitad de 24 es 12.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 24, valor: 12 } },
      { txt: 'Y la mitad de 12 es 6. Así, 24 : 4 = 6.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 12, valor: 6 } },
      { txt: 'Lo comprobamos: 24 en 4 partes iguales, cada parte vale 6.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 24, valor: 6 } },
      { txt: 'Entre 8 son tres mitades. 40 : 8: 40, 20, 10 y 5.', vis: { t: 'recta', desde: 0, hasta: 40, inicio: 40, saltos: [-20, -10, -5] } },
      { txt: 'Tu turno: 24 : 4. Haz la mitad dos veces desde el 24. Toca el número al que llegas.', toca: { t: 'recta', desde: 0, hasta: 24, inicio: 24, objetivo: 6 } },
    { txt: 'Truco: entre 4 = mitad de la mitad. Entre 8 = mitad, mitad y mitad. Mira 56 : 8 = 7.', vis: { t: 'barra', partes: 8, marcadas: 1, total: 56, valor: 7 } }
    ],
    guiada() {
      const por8 = rnd(0, 1), r = por8 ? rnd(2, 7) : rnd(3, 9), k = por8 ? 8 : 4, n = k * r;
      const pasos = [
        { txt: 'Primero, la mitad:', q: `${n} : 2 = ?`, r: n / 2, vis: { t: 'recta', desde: 0, hasta: n, inicio: n, saltos: [-n / 2] }, extra: [n / 4, n / 2 + 2, n - 2], errores: ER(n / 2, [[n / 4, 'Eso es entre 4. Aquí solo una mitad.'], [n - 2, 'La mitad no es quitar 2. Reparte en 2 partes iguales.']]) },
        { txt: 'Otra vez la mitad:', q: `${n / 2} : 2 = ?`, r: n / 4, vis: { t: 'recta', desde: 0, hasta: n, inicio: n / 2, saltos: [-n / 4] }, extra: [n / 8, n / 4 + 1, n / 2 - 2], errores: ER(n / 4, [[n / 8, 'Eso son tres mitades. Aquí solo dos.'], [n / 2, 'Esa es la primera mitad. Haz otra más.']]) }
      ];
      if (por8) pasos.push({ txt: 'Y una tercera vez la mitad:', q: `${n / 4} : 2 = ?`, r: n / 8, vis: { t: 'recta', desde: 0, hasta: n, inicio: n / 4, saltos: [-n / 8] }, extra: [n / 8 + 1, n / 8 - 1, n / 4 - 2], errores: ER(n / 8, [[n / 4, 'Esa es la mitad anterior. Haz otra mitad.'], [n / 8 + 1, 'Revisa la mitad de ese número.'], [n / 8 - 1, 'Revisa la mitad de ese número.']]) });
      return { pasos, final: { txt: 'Entonces:', q: `${n} : ${k} = ?`, r, vis: rb(n, k), extra: por8 ? [n / 4, n / 2, r + 1, r - 1] : [n / 2, n / 8, r + 1, r - 1], errores: por8 ? ER(r, [[n / 2, 'Eso es entre 2. Haz la mitad tres veces.'], [n / 4, 'Eso es entre 4. Falta otra mitad.']]) : ER(r, [[n / 2, 'Eso es entre 2. Haz la mitad dos veces.'], [n / 8, 'Te has pasado: entre 4 son dos mitades.']]) } };
    },
    item(nivel) {
      const por8 = rnd(0, 2) === 0 ? 1 : rnd(0, 1), k = por8 ? 8 : 4;
      const r = nivel === 1 ? (por8 ? rnd(2, 6) : rnd(2, 9)) : nivel === 2 ? (por8 ? rnd(4, 15) : rnd(6, 25)) : (por8 ? rnd(12, 60) : rnd(12, 99)), n = k * r;
      const vis = nivel === 1 || n <= 200 ? { t: 'barra', partes: k, marcadas: 1, total: n, valor: r, oculto: 'valor' } : undefined;
      return { q: `${n} : ${k} = ?`, r, vis, extra: por8 ? [n / 4, n / 2, r + 1, r - 1, n / 16] : [n / 2, n / 8, r + 1, r - 1], errores: por8 ? ER(r, [[n / 2, 'Eso es entre 2. Haz la mitad tres veces.'], [n / 4, 'Eso es entre 4. Falta otra mitad.'], [n / 16, 'Te has pasado: entre 8 son tres mitades.']]) : ER(r, [[n / 2, 'Eso es entre 2. Haz la mitad dos veces.'], [n / 8, 'Te has pasado: entre 4 son dos mitades.'], [r + 1, 'Casi. Comprueba multiplicando por 4.'], [r - 1, 'Casi. Comprueba multiplicando por 4.']]) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada división con su resultado',
      pares() {
        const usados = new Set(), out = [];
        for (const [r, k] of shuffle([[3, 4], [6, 4], [7, 4], [9, 4], [12, 4], [15, 4], [4, 8], [5, 8], [6, 8], [7, 8], [9, 8], [11, 8]])) {
          if (out.length < 6 && !usados.has(r)) { usados.add(r); out.push([`${r * k} : ${k}`, r]); }
        }
        return out;
      }
    }
  });
})();
