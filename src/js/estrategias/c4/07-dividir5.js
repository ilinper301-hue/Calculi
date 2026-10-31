/* 4.º · Truco 7 · Dividir entre 5 (×2 y :10) */
ESTR.add({
  id: 'dividir5', curso: 4, orden: 7, tri: 2,
  n: 'Dividir entre 5', ic: ':5', desc: 'El doble y entre 10',
  truco: 'Multiplico por 2 y divido entre 10',
  tutorial: [
    { txt: '35 : 5 es repartir 35 en grupos de 5. Salen 7 grupos.', vis: { t: 'matriz', filas: 7, cols: 5 } },
    { txt: 'Truco: en vez de entre 5, hago el doble y divido entre 10. El doble de 35 son 70.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 70, valor: 35 } },
    { txt: 'Ahora 70 : 10 = 7. Así que 35 : 5 = 7.', vis: { t: 'decenas', grupos: [{ d: 7 }] } },
    { txt: 'Tu turno: 60 : 5. El doble de 60 son 120. Toca cuánto es 120 : 10.', toca: { t: 'elige', q: '120 : 10 = ?', ops: [6, 12, 120], r: 12 } },
    { txt: 'Con 85 : 5. El doble de 85 es 170. Y 170 : 10 = 17.', vis: { t: 'decenas', grupos: [{ d: 17 }] } }
  ],
  elegir(nivel) { return nivel === 1 ? rnd(3, 10) : nivel === 2 ? rnd(12, 39) : rnd(40, 199); },
  guiada() {
    const m = rnd(8, 39), x = 5 * m;
    return {
      pasos: [
        { txt: 'Primero, el doble:', q: `${x} × 2 = ?`, r: 2 * x, extra: [x + 2], errores: _errc4(2 * x, [[x / 2, 'Eso es la mitad. El doble es multiplicar por 2.'], [10 * x, 'Doble es por 2, no por 10.']]) },
        { txt: 'Ahora, entre 10:', q: `${2 * x} : 10 = ?`, r: m, vis: { t: 'decenas', grupos: [{ d: Math.floor(2 * x / 10) }] }, extra: [2 * m], errores: _errc4(m, [[2 * x / 100, 'Entre 10 se quita un solo cero.'], [x, 'Ese no es el número de antes: tienes que hacer el doble y dividir.']]) }
      ],
      final: { txt: 'Entonces:', q: `${x} : 5 = ?`, r: m, extra: [2 * m], errores: _errc4(m, [[2 * x, 'Has hecho el doble. Te falta dividir entre 10.'], [x / 10, 'Has dividido entre 10 sin hacer antes el doble.']]) }
    };
  },
  item(nivel) {
    const m = this.elegir(nivel), x = 5 * m;
    const vis = nivel === 1 ? { t: 'matriz', filas: m, cols: 5 } : undefined;
    const errores = _errc4(m, [[2 * x, 'Has hecho el doble. Te falta dividir entre 10.'], [x / 10, 'Has dividido entre 10 sin hacer antes el doble.'], [m + 1, 'Casi. Revisa el doble y la división entre 10.'], [m - 1, 'Casi. Revisa el doble y la división entre 10.']]);
    return { q: `${x} : 5`, r: m, vis, extra: [2 * m, Math.floor(x / 10)], errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada división con su resultado',
    pares() { return shuffle(Array.from({ length: 40 }, (_, i) => i + 10)).slice(0, 6).map(m => [`${5 * m} : 5`, m]); }
  }
});
