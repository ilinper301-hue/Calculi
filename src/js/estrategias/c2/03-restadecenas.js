/* 2.º · Truco 3 · Restar decenas */
{
  const E = (r, l) => l.filter(x => x[0] >= 0 && x[0] !== r);
  const gen = (nivel) => {
    const k = nivel === 1 ? rnd(1, 3) : nivel === 2 ? rnd(2, 5) : rnd(2, 8);
    const da = rnd(k + 1, nivel === 1 ? 6 : 9), ua = rnd(1, 9);
    return { a: 10 * da + ua, b: 10 * k, da, ua, k };
  };
  ESTR.add({
    id: 'restadecenas', curso: 2, orden: 3, tri: 1,
    n: 'Restar decenas', ic: '−10', desc: 'Quito decenas, las unidades se quedan',
    truco: 'Resto las decenas y las unidades no cambian',
    tutorial: [
      { txt: 'Tengo 85: 8 barras de 10 y 5 cubitos.', vis: { t: 'decenas', grupos: [{ d: 8, u: 5 }] } },
      { txt: 'Resto 40: tacho 4 barras. Los cubitos no se tocan.', vis: { t: 'decenas', grupos: [{ d: 8, u: 5 }], tachar: 4 } },
      { txt: 'Quedan 4 barras y 5 cubitos: 45.', vis: { t: 'decenas', grupos: [{ d: 4, u: 5 }] } },
      { txt: 'Tu turno: empiezas en 76. Resta 30 y toca el número donde llegas.', toca: { t: 'recta', desde: 40, hasta: 76, inicio: 76, objetivo: 46 } },
      { txt: 'Truco: bajo de 10 en 10. 85, 75, 65, 55, 45. Así 85 − 40 = 45.', vis: { t: 'recta', desde: 40, hasta: 90, inicio: 85, saltos: [-10, -10, -10, -10] } }
    ],
    guiada() {
      const { a, b, da, ua, k } = gen(2), r = a - b;
      return {
        pasos: [
          { txt: 'Primero, solo las decenas:', q: `${10 * da} − ${b} = ?`, r: 10 * da - b, vis: { t: 'decenas', grupos: [{ d: da }], tachar: k }, extra: [a - b, da - k, 10 * da + b], errores: E(10 * da - b, [[a - b, 'Todavía no restes las unidades. Solo las decenas.'], [da - k, `Son decenas: ${da} decenas son ${10 * da}.`], [10 * da + b, 'Es una resta. Hay que quitar, no añadir.']]) },
          { txt: 'Ahora añado las unidades, que no cambian:', q: `${10 * da - b} + ${ua} = ?`, r, vis: { t: 'decenas', grupos: [{ d: da - k, u: ua }] }, extra: [10 * da - b, r + 10, r - 10], errores: E(r, [[10 * da - b, 'Falta añadir las unidades. Ellas no cambian.'], [r + 10, 'Te has pasado una decena.'], [r - 10, 'Te falta una decena.']]) }
        ],
        final: { txt: 'Entonces:', q: `${a} − ${b} = ?`, r, vis: { t: 'decenas', grupos: [{ d: da, u: ua }], tachar: k }, extra: [r + 10, r - 10, a - k, 10 * da - b], errores: E(r, [[r + 10, 'Has quitado una decena de menos. Cuenta los tachados.'], [r - 10, 'Has quitado una decena de más. Cuenta los tachados.'], [10 * da - b, 'Te has dejado las unidades. Ellas no cambian.'], [a - k, 'Quitas decenas, no unidades. Cada barra vale 10.']]) }
      };
    },
    item(nivel) {
      const { a, b, da, ua, k } = gen(nivel), r = a - b;
      const extra = [r + 10, r - 10, a - k, 10 * da - b, r + ua];
      const errores = E(r, [[r + 10, 'Has bajado una decena de menos. Cuenta los saltos.'], [r - 10, 'Has bajado una decena de más. Cuenta los saltos.'], [10 * da - b, 'Te has dejado las unidades. Ellas no cambian.'], [a - k, 'Cada salto baja 10, no 1. Baja de 10 en 10.']]);
      const lo = 10 * Math.floor(r / 10), hi = 10 * Math.floor(a / 10) + 10;
      const vis = nivel === 1 ? { t: 'decenas', grupos: [{ d: da, u: ua }], tachar: k } : { t: 'recta', desde: lo, hasta: hi, inicio: a, saltos: Array(k).fill(-10) };
      return { q: `${a} − ${b}`, r, vis, extra, errores };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada resta con su resultado',
      pares() { const out = [], us = new Set(); while (out.length < 6) { const { a, b } = gen(2); if (!us.has(a - b)) { us.add(a - b); out.push([`${a} − ${b}`, a - b]); } } return out; }
    }
  });
}
