/* 3.º · Truco 9 · Mitad, tercio y cuarto */
const _er3_09 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
const _nomFr3 = { 2: 'la mitad', 3: 'un tercio', 4: 'un cuarto' };
const _fr3 = (d, n, oc = 'valor') => ({ t: 'barra', partes: d, marcadas: 1, total: n, valor: '?', oculto: oc });
ESTR.add({
  id: 'fraccion3', curso: 3, orden: 9, tri: 2,
  n: 'Mitad, tercio y cuarto', ic: '1/3', desc: 'Reparto en partes iguales',
  truco: 'Reparto en partes iguales',
  tutorial: [
    { txt: 'La mitad de 12 es repartir 12 en 2 partes iguales. Cada parte es 6.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 12, valor: 6 } },
    { txt: 'Un tercio de 12 es repartir 12 en 3 partes iguales. Cada parte es 4.', vis: { t: 'barra', partes: 3, marcadas: 1, total: 12, valor: 4 } },
    { txt: 'Un cuarto de 12 es repartir 12 en 4 partes iguales. Cada parte es 3.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 12, valor: 3 } },
    { txt: 'Tu turno: reparto 15 en 3 partes iguales. Toca 1 parte: es un tercio de 15.', toca: { t: 'barra', partes: 3, objetivo: 1, total: 15 } },
    { txt: 'Truco: la mitad es dividir entre 2, un tercio entre 3 y un cuarto entre 4. 1/4 de 20 es 20 : 4 = 5.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 20, valor: 5 } }
  ],
  guiada() {
    const d = pick([2, 3, 4]), v = rnd(2, 9), n = d * v;
    return {
      pasos: [
        { txt: `Para hallar ${_nomFr3[d]} de ${n}, la barra se reparte en partes iguales. ¿Cuántas partes tiene la barra?`, q: '?', r: d, vis: _fr3(d, n), extra: [d + 1, d - 1, 2, 3, 4], errores: _er3_09(d, [[d + 1, 'Cuenta bien las partes de la barra: te sobra una.'], [d - 1, 'Cuenta bien las partes de la barra: te falta una.']]) },
        { txt: 'Reparto el número entre esas partes:', q: `${n} : ${d} = ?`, r: v, vis: _fr3(d, n), extra: [v + 1, v - 1, n - d, d], errores: _er3_09(v, [[d, 'Ese es el número de partes. Reparte el total entre ellas.'], [n - d, 'Eso es restar. Repartir es dividir.'], [v + 1, 'Casi. Multiplica tu respuesta por las partes y comprueba.']]) }
      ],
      final: { txt: 'Entonces:', q: `1/${d} de ${n} = ?`, r: v, vis: _fr3(d, n), extra: [v + 1, v - 1, n - d, d], errores: _er3_09(v, [[d, 'Ese es el número de partes. Reparte el total entre ellas.'], [n - d, 'Eso es restar. Repartir es dividir.'], [v + 1, 'Casi. Multiplica tu respuesta por las partes y comprueba.']]) }
    };
  },
  item(nivel) {
    const d = pick([2, 3, 4]);
    const v = nivel === 1 ? rnd(2, 6) : nivel === 2 ? rnd(4, 20) : rnd(21, 50), n = d * v;
    const extra = [n - v, Math.floor(n / (d === 2 ? 3 : 2)), Math.floor(n / (d === 4 ? 3 : 4)), v + 1, v - 1, v * 2].filter(x => x !== v && x > 0);
    const errores = _er3_09(v, [[Math.floor(n / (d === 2 ? 3 : 2)), `Has dividido entre otro número. Divide entre ${d}, el de abajo.`], [Math.floor(n / (d === 4 ? 3 : 4)), `Has dividido entre otro número. Divide entre ${d}, el de abajo.`], [n - v, 'Eso es lo que queda al quitar una parte. Busca solo una parte.'], [v + 1, 'Casi. Multiplica tu respuesta por el de abajo y mira si da el total.']]);
    return { q: `1/${d} de ${n} = ?`, txt: d === 2 ? 'La mitad es 1/2.' : d === 3 ? 'Un tercio es 1/3.' : 'Un cuarto es 1/4.', r: v, vis: _fr3(d, n), extra, errores };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada fracción con su resultado',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 120; k++) {
        const d = pick([2, 3, 4]), v = rnd(2, 24), n = d * v;
        if (n <= 99 && !vistos.has(v)) { vistos.add(v); out.push([`1/${d} de ${n}`, v]); }
      }
      return out;
    }
  }
});
