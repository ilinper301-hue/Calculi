/* Estrategia 10 · Casi dobles */
ESTR.add({
  id: 'casidobles', orden: 10, tri: 2,
  n: 'Casi dobles', ic: '🪞', desc: 'Un doble y uno más',
  truco: 'Busco el doble y sumo 1',
  tutorial: [
    { txt: 'Mira 6 + 7. Los números son casi iguales: se parecen mucho.', vis: { t: 'marco', a: 6, b: 7, tam: 20 } },
    { txt: 'Conozco el doble: 6 + 6 = 12.', vis: { t: 'marco', a: 6, b: 6, tam: 20 } },
    { txt: 'Pero en 6 + 7 hay una ficha más. Entonces sumo 1.', vis: { t: 'marco', a: 6, b: 7, tam: 20 } },
    { txt: '12 y 1 más son 13. Entonces 6 + 7 = 13.', vis: { t: 'parte', total: 13, a: 12, b: 1 } },
    { txt: 'Tu turno: 7 + 8 es el doble de 7 y ¿cuántos más?', toca: { t: 'elige', q: '7 + 8 = 14 + ?', ops: [1, 7, 2], r: 1 } },
    { txt: 'Truco: en 8 + 9 el doble de 8 es 16, y sumo 1: 17.', vis: { t: 'marco', a: 8, b: 9, tam: 20 } }
  ],
  guiada() {
    const n = rnd(3, 9), arriba = rnd(0, 1), m = n + 1;
    const q = arriba ? `${m} + ${n}` : `${n} + ${m}`, vis = arriba ? { t: 'marco', a: m, b: n, tam: 20 } : { t: 'marco', a: n, b: m, tam: 20 };
    return {
      pasos: [
        { txt: `En ${q}, ¿qué número doblo? (el pequeño)`, q: '?', r: n, errores: [[m, `El ${m} es el grande. Dobla el pequeño.`], [n + 2, 'Ese número no está en la suma. Mira bien.']], ops: opciones(n, 3, [m, n + 2], 20), vis },
        { txt: 'Hago el doble:', q: `${n} + ${n} = ?`, r: 2 * n, errores: [[n, 'Es un doble: suma el número dos veces.'], [2 * n - 1, 'Casi. Junta bien los dos grupos iguales.'], [2 * n + 1, 'Aún no sumes la ficha que sobra.']], ops: opciones(2 * n, 3, [2 * n - 1, 2 * n + 1, n], 20), vis: { t: 'marco', a: n, b: n, tam: 20 } },
        { txt: 'Y sumo la ficha que sobra:', q: `${2 * n} + 1 = ?`, r: 2 * n + 1, errores: [[2 * n, 'Falta sumar la ficha que sobra.'], [2 * n + 2, 'Solo una ficha más. Te has pasado.']], ops: opciones(2 * n + 1, 3, [2 * n, 2 * n + 2], 20), vis: { t: 'parte', total: 2 * n + 1, a: 2 * n, b: 1, oculto: 'total' } }
      ],
      final: { txt: 'Ahora la suma completa:', q: `${q} = ?`, r: n + m, errores: [[2 * n, 'Ese es el doble del pequeño. Falta la ficha que sobra.'], [2 * m, 'Ese es el doble del grande. Parte del pequeño y suma 1.'], [m, 'Ese es uno de los números. Suma los dos.']], ops: opciones(n + m, 3, [2 * n, 2 * m, n + m + 1, n + m - 1], 20), vis }
    };
  },
  item(nivel) {
    const n = rnd(nivel === 1 ? 3 : 4, nivel === 1 ? 7 : 9), m = n + 1, r = n + m, arriba = rnd(0, 1);
    const q = arriba ? `${m} + ${n}` : `${n} + ${m}`;
    const errores = [[2 * n, 'Ese es el doble del pequeño. Falta la ficha que sobra.'], [2 * m, 'Ese es el doble del grande. Parte del pequeño y suma 1.'], [m, 'Ese es uno de los números. Suma los dos.'], [n, 'Ese es uno de los números. Suma los dos.']];
    return { q, r, errores, vis: arriba ? { t: 'marco', a: m, b: n, tam: 20 } : { t: 'marco', a: n, b: m, tam: 20 }, ops: opciones(r, 3, [2 * n, 2 * m, r + 1, r - 1], 20) };
  },
  juego: {
    tipo: 'parejas', meta: 'Casi dobles y su resultado',
    pares() { return shuffle([3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(n => [`${n} + ${n + 1}`, 2 * n + 1]); }
  }
});
