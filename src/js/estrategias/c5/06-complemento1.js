/* 5.º · Truco 6 · Completar la unidad (lo que falta para llegar a 1) */
(function () {
  const ER = (r, l) => { const v = new Set([+(+r).toFixed(3)]); return l.map(x => [+(+x[0]).toFixed(3), x[1]]).filter(x => Number.isFinite(x[0]) && x[0] >= 0 && !v.has(x[0]) && v.add(x[0])); };
ESTR.add({
  id: 'complemento1', curso: 5, orden: 6, tri: 2,
  n: 'Completar la unidad', ic: '+?=1', desc: 'Lo que falta para llegar a 1',
  truco: 'Busco lo que falta para llegar a 1',
  tutorial: [
    { txt: 'Esta cuadrícula es 1 entero. Tiene 100 casillas y cada una vale 0,01.', vis: { t: 'cien', n: 100 } },
    { txt: 'Aquí hay 35 casillas azules: son 0,35. ¿Cuántas faltan para llenarla?', vis: { t: 'cien', n: 35 } },
    { txt: 'Faltan 65 casillas, es decir, 0,65. Así, 0,35 + 0,65 = 1.', vis: { t: 'cien', n: 35, m: 65 } },
    { txt: 'Con décimas es igual: a 0,8 le faltan 0,2 para llegar a 1.', vis: { t: 'recta', desde: 0, hasta: 1, paso: 0.1, inicio: 0.8, saltos: [0.2] } },
    { txt: 'Tu turno: ¿cuánto le falta a 0,35 para llegar a 1? Toca la respuesta.', toca: { t: 'elige', q: '0,35 + ? = 1', ops: [0.55, 0.65, 0.75], r: 0.65 } },
    { txt: 'Truco: cada cifra suma 9 y la última suma 10. En 0,35: 3 y 6, 5 y 5. Faltan 0,65.', vis: { t: 'cien', n: 35, m: 65 } }
  ],
  guiada() {
    const t = rnd(1, 8), u = rnd(1, 9), a = 10 * t + u, f = x => +(x / 100).toFixed(2);
    return {
      pasos: [
        { txt: `Primero, hasta la siguiente décima:`, q: `${fmt(f(a))} + ? = ${fmt(f(10 * (t + 1)))}`, r: f(10 - u), vis: { t: 'cien', n: a }, extra: [f(u), f(10 - u + 10), f(100 - a)], errores: ER(f(10 - u), [[f(10 - u + 10), 'Te has pasado una décima.'], [f(100 - a), 'Eso es lo que falta hasta 1. Aquí solo hasta la décima.'], [f(u), 'Cuenta cuánto falta para la siguiente décima.']]) },
        { txt: `Ahora, de ${fmt(f(10 * (t + 1)))} hasta 1:`, q: `${fmt(f(10 * (t + 1)))} + ? = 1`, r: f(100 - 10 * (t + 1)), vis: { t: 'cien', n: 10 * (t + 1) }, extra: [f(10 * (t + 1)), f(100 - 10 * (t + 1) + 10), f(100 - 10 * (t + 1) - 10)], errores: ER(f(100 - 10 * (t + 1)), [[f(10 * (t + 1)), 'Ese es el número de partida. Busca lo que falta hasta 1.'], [f(100 - 10 * (t + 1) + 10), 'Te has pasado una décima.'], [f(100 - 10 * (t + 1) - 10), 'Te falta una décima.']]) }
      ],
      final: { txt: 'Junto las dos partes:', q: `${fmt(f(a))} + ? = 1`, r: f(100 - a), vis: { t: 'cien', n: a }, extra: [f(110 - a), f(90 - a), f(99 - a), f(a)], errores: ER(f(100 - a), [[f(110 - a), 'Te has pasado una décima. Revisa las cifras.'], [f(90 - a), 'Te falta una décima. Revisa las cifras.'], [f(99 - a), 'La última cifra suma 10, no 9.'], [f(a), 'Ese número ya lo tienes. Busca lo que falta.']].filter(e => e[0] < 1)) }
    };
  },
  item(nivel) {
    let a; // a = centésimas que ya hay
    if (nivel === 1) a = 10 * rnd(1, 9);
    else if (nivel === 2) a = pick([5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10 * rnd(1, 9), 10 * rnd(1, 9)]);
    else { a = rnd(1, 99); }
    const x = +(a / 100).toFixed(2), r = +((100 - a) / 100).toFixed(2), f = v => +(v / 100).toFixed(3);
    const vis = { t: 'cien', n: a };
    const extra = [f(110 - a), f(90 - a), f(99 - a), +(r / 10).toFixed(3), x].filter(v => v > 0 && v < 1);
    const forma = nivel === 1 ? rnd(0, 1) : rnd(0, 2);
    const q = forma === 0 ? `${fmt(x)} + ? = 1` : forma === 1 ? `? + ${fmt(x)} = 1` : `1 − ${fmt(x)} = ?`;
    const errores = ER(r, [[f(110 - a), 'Te has pasado una décima. Revisa las cifras.'], [f(90 - a), 'Te falta una décima. Revisa las cifras.'], [f(99 - a), 'La última cifra suma 10, no 9.'], [f(a), 'Ese número ya lo tienes. Busca lo que falta.']].filter(e => e[0] < 1));
    return { q, r, vis, extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une los números que suman 1',
    pares() { return shuffle([5, 10, 15, 20, 25, 30, 35, 40, 45, 12, 18, 22, 33, 48]).slice(0, 6).map(a => { const p = [fmt(a / 100), fmt((100 - a) / 100)]; return rnd(0, 1) ? p : [p[1], p[0]]; }); }
  }
});
})();
