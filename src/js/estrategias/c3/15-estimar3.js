/* 3.º · Truco 15 · Estimar redondeando (49 + 32 ≈ 50 + 30 = 80) */
const _er3_15 = (r, l) => l.filter((x, i) => x[0] >= 0 && x[0] !== r && l.findIndex(y => y[0] === x[0]) === i); // errores típicos sin repetidos ni la respuesta
const _red15 = (x, u) => Math.round(x / u) * u;
const _vis15 = (a, b) => ({ t: 'decenas', grupos: [{ d: Math.floor(a / 10), u: a % 10 }, { d: Math.floor(b / 10), u: b % 10 }] });
// Números sin acabar en 0 ni en 5 (para que el redondeo sea claro).
const _num15 = (min, max, u) => { let x, k = 0; do { x = rnd(min, max); } while ((x % u === 0 || x % u === u / 2) && ++k < 200); return x; };
const _item15 = (nivel, intento = 0) => {
  const u = nivel === 3 ? 100 : 10;
  let a, b, op = '+';
  if (nivel === 1) { a = _num15(12, 69, 10); b = _num15(12, 69, 10); if (a + b > 99) b = _num15(12, 29, 10); }
  else if (nivel === 2) { op = rnd(0, 2) ? '+' : '−'; a = _num15(31, 99, 10); b = _num15(11, 79, 10); if (op === '−' && a < b) [a, b] = [b, a]; }
  else { op = rnd(0, 2) ? '+' : '−'; a = _num15(210, 890, 100); b = _num15(110, 690, 100); if (op === '−' && a < b) [a, b] = [b, a]; }
  const ra = _red15(a, u), rb = _red15(b, u);
  // En las restas, los redondeados no pueden quedar iguales (47 − 44 ≈ 0 no enseña nada).
  if (op === '−' && ra - rb < u && intento < 50) return _item15(nivel, intento + 1);
  const r = op === '+' ? ra + rb : ra - rb, ex = op === '+' ? a + b : a - b;
  const sa = Math.floor(a / u) * u, sb = Math.floor(b / u) * u, ca = sa + u, cb = sb + u;
  const f = (x, y) => op === '+' ? x + y : x - y;
  return { a, b, op, u, ra, rb, r, ex, extra: [ex, f(sa, sb), f(ca, cb), f(ra, b), f(a, rb)] };
};
ESTR.add({
  id: 'estimar3', curso: 3, orden: 15, tri: 3,
  n: 'Estimar redondeando', ic: '≈80', desc: 'Redondeo y calculo',
  truco: 'Redondeo a la decena y calculo',
  tutorial: [
    { txt: 'Estimar es calcular un resultado que se parece al verdadero, rápido y sin papel.', vis: _vis15(49, 32) },
    { txt: 'Redondeo cada número a la decena más cercana. 49 está casi en 50.', vis: { t: 'recta', desde: 40, hasta: 60, inicio: 49, saltos: [1] } },
    { txt: '32 está cerca de 30.', vis: { t: 'recta', desde: 30, hasta: 40, inicio: 32, saltos: [-2] } },
    { txt: 'Tu turno: ¿a qué decena está más cerca el 38? Toca esa decena en la recta.', toca: { t: 'recta', desde: 30, hasta: 40, inicio: 38, objetivo: 40 } },
    { txt: 'Ahora hago una suma fácil: 50 + 30 = 80. Así que 49 + 32 ≈ 80. El signo ≈ significa «más o menos».', vis: _vis15(49, 32) }
  ],
  guiada() {
    let it, k = 0; do { it = _item15(2); } while ((it.op !== '+' || it.a > 90) && ++k < 100);
    const { a, b, ra, rb, r } = it;
    const rv = (x, y) => ({ t: 'recta', desde: Math.floor(Math.min(x, y) / 10) * 10 - (x === y ? 0 : 0), hasta: Math.ceil(Math.max(x, y) / 10) * 10 + (Math.max(x, y) % 10 === 0 ? 10 : 0), inicio: x, saltos: [y - x] });
    return {
      pasos: [
        { txt: 'Redondeo el primer número a la decena:', q: `${a} ≈ ?`, r: ra, vis: rv(a, ra), extra: [ra + 10, ra - 10, Math.floor(a / 10) * 10], ops: undefined, errores: _er3_15(ra, [[a, 'Ese es el número sin redondear. Busca la decena más cercana.'], [Math.floor(a / 10) * 10, 'Mira las unidades: con 5 o más, subes a la siguiente decena.'], [ra + 10, 'Has subido de más. ¿Cuál es la decena más cercana?'], [ra - 10, 'Has bajado de más. ¿Cuál es la decena más cercana?']]) },
        { txt: 'Redondeo el segundo número a la decena:', q: `${b} ≈ ?`, r: rb, vis: rv(b, rb), extra: [rb + 10, rb - 10, Math.floor(b / 10) * 10 + 10], errores: _er3_15(rb, [[b, 'Ese es el número sin redondear. Busca la decena más cercana.'], [Math.floor(b / 10) * 10 + 10, 'Mira las unidades: con menos de 5 te quedas en la decena de abajo.'], [rb + 10, 'Has subido de más. ¿Cuál es la decena más cercana?'], [rb - 10, 'Has bajado de más. ¿Cuál es la decena más cercana?']]) }
      ],
      final: { txt: `Sumo los números redondos: ${ra} + ${rb}.`, q: `${a} + ${b} ≈ ?`, r, vis: _vis15(a, b), extra: [a + b, r + 10, r - 10], errores: _er3_15(r, [[a + b, 'Esa es la suma exacta. Suma los números redondeados.'], [r + 10, 'Te has pasado una decena. Revisa la suma de los redondos.'], [r - 10, 'Te falta una decena. Revisa la suma de los redondos.']]) }
    };
  },
  item(nivel) {
    const it = _item15(nivel), nom = it.u === 100 ? 'centena' : 'decena';
    return { q: `${it.a} ${it.op} ${it.b} ≈ ?`, txt: `Redondea a la ${nom} y calcula.`, r: it.r, vis: it.u === 10 && it.op === '+' ? _vis15(it.a, it.b) : null, extra: it.extra.filter(x => x > 0), errores: _er3_15(it.r, [[it.extra[0], 'Esa es la cuenta exacta. Aquí hay que redondear antes de calcular.'], [it.extra[1], 'Has redondeado los dos hacia abajo. Redondea al más cercano.'], [it.extra[2], 'Has redondeado los dos hacia arriba. Redondea al más cercano.'], [it.extra[3], 'Redondea los dos números, no solo uno.']]) };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada cuenta con su redondeo',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 300; k++) {
        const it = _item15(rnd(1, 2)), izq = `${it.a} ${it.op} ${it.b}`, der = `${it.ra} ${it.op} ${it.rb}`;
        if (!vistos.has(der) && !vistos.has(izq) && it.u === 10) { vistos.add(der); vistos.add(izq); out.push([izq, der]); }
      }
      return out;
    }
  }
});
