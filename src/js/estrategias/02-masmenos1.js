/* Estrategia 2 · Uno más, uno menos */
ESTR.add({
  id: 'masmenos1', orden: 2, tri: 1,
  n: 'Uno más, uno menos', ic: '↔️', desc: 'El vecino de cada número',
  truco: 'Doy un paso en la recta',
  tutorial: [
    { txt: 'Los números están en fila. Cada número tiene un vecino a cada lado.', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 5 } },
    { txt: 'Uno más es dar un paso a la derecha. 5 + 1 = 6.', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 5, saltos: [1] } },
    { txt: 'Uno menos es dar un paso a la izquierda. 5 − 1 = 4.', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 5, saltos: [-1] } },
    { txt: 'Y si sumo o resto 0, me quedo donde estoy. ¡No me muevo!', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 7 } },
    { txt: 'Truco: uno más es el número que viene después. Uno menos, el de antes.', vis: { t: 'recta', desde: 0, hasta: 10, inicio: 8, saltos: [1] } }
  ],
  guiada() {
    const n = rnd(2, 8), mas = rnd(0, 1) === 0, r = mas ? n + 1 : n - 1;
    return {
      pasos: [
        { txt: mas ? `¿Qué número viene justo después del ${n}?` : `¿Qué número viene justo antes del ${n}?`, q: '?', r, vis: { t: 'recta', desde: 0, hasta: 10, inicio: n }, extra: [n] }
      ],
      final: { txt: 'Ahora la cuenta:', q: mas ? `${n} + 1` : `${n} − 1`, r, vis: { t: 'recta', desde: 0, hasta: 10, inicio: n, saltos: [mas ? 1 : -1] }, extra: [n, mas ? n - 1 : n + 1] }
    };
  },
  item(nivel) {
    const max = nivel === 3 ? 20 : 10;
    let mas = rnd(0, 1) === 0;
    const cero = nivel >= 2 && rnd(0, 7) === 0;
    let n, d;
    if (cero) { d = 0; n = rnd(0, max); }
    else { d = mas ? 1 : -1; n = mas ? rnd(0, max - 1) : rnd(1, max); }
    const r = n + d;
    const op = d === 1 ? '+ 1' : d === -1 ? '− 1' : '+ 0';
    const q = (d !== -1 && nivel >= 2 && rnd(0, 3) === 0) ? `${d === 1 ? 1 : 0} + ${n}` : `${n} ${op}`;
    const vis = { t: 'recta', desde: 0, hasta: max, inicio: n, saltos: d ? [d] : [] };
    return { q, r, vis, extra: [n, r + 1, r - 1, n + (d === 1 ? 2 : -2)] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une la cuenta con su resultado',
    pares() {
      return shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 6).map(r => {
        const menos = r < 10 && rnd(0, 1) === 0;
        return [menos ? `${r + 1} − 1` : `${r - 1} + 1`, String(r)];
      });
    }
  }
});
