/* 4.º · Truco 4 · Doble y mitad (16 × 5 = 8 × 10) */
ESTR.add({
  id: 'dobleymitad', curso: 4, orden: 4, tri: 1,
  n: 'Doble y mitad', ic: '½×2', desc: 'La mitad de uno, el doble del otro',
  truco: 'Calculo la mitad de un número y el doble del otro',
  tutorial: [
    { txt: '6 × 5 son 6 filas de 5. Parto las filas en dos grupos iguales.', vis: { t: 'matriz', filas: 6, cols: 5, partir: 3 } },
    { txt: 'Pongo un grupo al lado del otro: ahora son 3 filas de 10. Hay los mismos puntos.', vis: { t: 'matriz', filas: 3, cols: 10 } },
    { txt: 'Truco: la mitad de un número y el doble del otro. 6 × 5 = 3 × 10 = 30.', vis: { t: 'matriz', filas: 3, cols: 10 } },
    { txt: '¡Y sirve con números grandes! 14 × 15 = 7 × 30 = 210.', vis: { t: 'barra', partes: 7, marcadas: 7, total: 210, valor: 30 } }
  ],
  guiada() {
    const pequeño = rnd(0, 1), a = pequeño ? pick([4, 6, 8, 10, 12]) : pick([14, 16, 18, 24, 26, 28]), c = pequeño ? 5 : pick([5, 15]), h = a / 2;
    return {
      pasos: [
        { txt: 'La mitad del primero:', q: `${a} : 2 = ?`, r: h, extra: [a * 2, a - 2] },
        { txt: 'El doble del segundo:', q: `${c} × 2 = ?`, r: 2 * c, extra: [c + 2, c / 2, 10 * c] }
      ],
      final: { txt: `Ahora multiplico las dos: ${h} × ${2 * c}. Es lo mismo que ${a} × ${c}.`, q: `${h} × ${2 * c} = ?`, r: a * c, vis: pequeño ? { t: 'matriz', filas: h, cols: 2 * c } : undefined, extra: [a * c + c, a * c - h, h * c, a * 2 * c] }
    };
  },
  item(nivel) {
    let a, c, vis;
    if (nivel === 1) { a = pick([4, 6, 8, 10, 12]); c = pick([3, 5, 5, 5, 6, 7, 9]); if (a === 12 && c > 9) c = 5; vis = { t: 'matriz', filas: a, cols: c, partir: a / 2 }; }
    else if (nivel === 2) { if (rnd(0, 1)) { a = rnd(6, 24) * 2; c = 5; } else { a = pick([4, 6, 8, 10, 12, 14]); c = 15; } }
    else { c = pick([15, 25, 35, 45]); a = c === 15 ? pick([14, 16, 18, 22, 24, 26, 36, 44]) : c === 25 ? pick([12, 16, 24, 28, 32, 36, 44]) : pick([12, 14, 16, 18]); }
    const h = a / 2;
    return { q: `${a} × ${c}`, r: a * c, vis, extra: [h * c, a * 2 * c, a * c + c, a * c - a] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada multiplicación con su resultado',
    pares() { const out = [], vistos = new Set(); shuffle([[16, 5], [14, 15], [12, 25], [18, 5], [24, 5], [8, 15], [6, 15], [28, 5], [16, 25], [22, 5], [32, 5], [12, 15]]).forEach(([a, c]) => { if (out.length < 6 && !vistos.has(a * c)) { vistos.add(a * c); out.push([`${a} × ${c}`, a * c]); } }); return out; }
  }
});
