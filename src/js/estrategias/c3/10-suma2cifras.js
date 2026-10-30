/* 3.º · Truco 10 · Sumar descomponiendo (47 + 36 = 70 + 13) */
const _par2c = (n) => ({ d: Math.floor(n / 10), u: n % 10 });
const _vis2c = (a, b) => ({ t: 'decenas', grupos: [_par2c(a), _par2c(b)] });
// Dos números de dos cifras cuyas unidades suman 10 o más (hay llevada).
const _pedir2c = (min, max, tope) => { let a, b, k = 0; do { a = rnd(min, max); b = rnd(min, max); } while (((a % 10) + (b % 10) < 10 || a + b > tope || a % 10 === 0 || b % 10 === 0) && ++k < 500); return [a, b]; };
ESTR.add({
  id: 'suma2cifras', curso: 3, orden: 10, tri: 2,
  n: 'Sumar descomponiendo', ic: '+36', desc: 'Primero decenas, luego unidades',
  truco: 'Sumo decenas por un lado y unidades por otro',
  tutorial: [
    { txt: 'Quiero sumar 47 + 36. Veo las barras de 10 y los cubitos de cada número.', vis: _vis2c(47, 36) },
    { txt: 'Primero junto las decenas: 40 + 30 = 70.', vis: { t: 'decenas', grupos: [{ d: 4 }, { d: 3 }] } },
    { txt: 'Después junto las unidades: 7 + 6 = 13. Es más de 10, ¡me llevo una decena!', vis: { t: 'decenas', grupos: [{ u: 7 }, { u: 6 }] } },
    { txt: 'Por último sumo las dos partes: 70 + 13 = 83. Así que 47 + 36 = 83.', vis: _vis2c(47, 36) },
    { txt: 'Truco: separo decenas y unidades, las sumo por separado y junto los resultados.', vis: _vis2c(58, 25) }
  ],
  guiada() {
    const [a, b] = _pedir2c(12, 49, 99), da = a - a % 10, db = b - b % 10, ua = a % 10, ub = b % 10;
    return {
      pasos: [
        { txt: 'Primero, las decenas:', q: `${da} + ${db} = ?`, r: da + db, vis: _vis2c(a, b), extra: [da + db + 10, da + db - 10, a + b] },
        { txt: 'Ahora, las unidades:', q: `${ua} + ${ub} = ?`, r: ua + ub, vis: _vis2c(a, b), extra: [ua + ub + 1, ua + ub - 1, ua + ub - 10] }
      ],
      final: { txt: `Junto las dos partes: ${da + db} + ${ua + ub}.`, q: `${a} + ${b} = ?`, r: a + b, vis: _vis2c(a, b), extra: [a + b - 10, a + b + 10, da + db + ua] }
    };
  },
  item(nivel) {
    const [a, b] = nivel === 1 ? _pedir2c(12, 49, 99) : nivel === 2 ? _pedir2c(21, 79, 150) : _pedir2c(45, 99, 198), r = a + b;
    return { q: `${a} + ${b} = ?`, r, vis: _vis2c(a, b), extra: [r - 10, r + 10, r - 1, r + 1, Math.floor(r / 10) * 10 + ((a % 10) + (b % 10)) % 10 - 10] };
  },
  juego: {
    tipo: 'parejas', meta: 'Une cada suma con su descomposición',
    pares() {
      const vistos = new Set(), out = [];
      for (let k = 0; out.length < 6 && k < 200; k++) {
        const [a, b] = _pedir2c(12, 79, 150), t = a - a % 10 + b - b % 10, u = a % 10 + b % 10, c = t + '-' + u;
        // La descomposición queda fijada por el total, así que no hay dos pares con el mismo total.
        if (!vistos.has(a + b) && !vistos.has(c)) { vistos.add(a + b); vistos.add(c); out.push([`${a} + ${b}`, `${t} + ${u}`]); }
      }
      return out;
    }
  }
});
