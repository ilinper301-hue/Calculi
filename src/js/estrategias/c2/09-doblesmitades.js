/* 2.º · Truco 9 · Dobles y mitades */
{
  const E = (r, l) => l.filter(x => x[0] >= 0 && x[0] !== r);
  const doble = (n) => ({ q: `${n} + ${n}`, r: 2 * n, vis: { t: 'barra', partes: 2, marcadas: 2, total: 2 * n, valor: n, oculto: 'total' }, txt: `Doble de ${n}: dos partes iguales de ${n}.` });
  const mitad = (n) => ({ q: `${n} : 2`, r: n / 2, vis: { t: 'barra', partes: 2, marcadas: 1, total: n, valor: n / 2, oculto: 'valor' }, txt: `Mitad de ${n}: repartimos en dos partes iguales.` });
  const tam = { d: [[11, 25], [21, 40], [25, 50]], m: [[12, 50], [30, 80], [40, 100]] };
  const par = (x) => x - (x % 2);
  ESTR.add({
    id: 'doblesmitades', curso: 2, orden: 9, tri: 2,
    n: 'Dobles y mitades', ic: '2×½', desc: 'Doble: dos partes. Mitad: reparto en dos',
    truco: 'Calculo el doble o la mitad por partes',
    tutorial: [
      { txt: 'El doble de 25 son dos partes iguales de 25: 25 + 25 = 50.', vis: { t: 'barra', partes: 2, marcadas: 2, total: 50, valor: 25 } },
      { txt: 'La mitad es repartir en dos partes iguales. La mitad de 50 es 25.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 50, valor: 25 } },
      { txt: 'Truco para dobles: separo decenas y unidades. Doble de 36: 30 + 30 = 60 y 6 + 6 = 12. Total: 72.', vis: { t: 'decenas', grupos: [{ d: 3, u: 6 }, { d: 3, u: 6 }] } },
      { txt: 'Tu turno: la mitad de 30 es 15 y la mitad de 6 es 3. Toca la mitad de 36.', toca: { t: 'elige', q: '36 : 2 = ?', ops: [17, 18, 72], r: 18 } },
      { txt: 'Truco para mitades: mitad de las decenas y mitad de las unidades. Mitad de 84: la mitad de 80 es 40 y la mitad de 4 es 2. Total: 42.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 84, valor: 42 } }
    ],
    guiada() {
      if (rnd(0, 1)) {
        const t = rnd(1, 4), u = rnd(2, 9), n = 10 * t + u;
        return {
          pasos: [
            { txt: 'Doble de las decenas:', q: `${10 * t} + ${10 * t} = ?`, r: 20 * t, vis: { t: 'decenas', grupos: [{ d: t }, { d: t }] }, extra: [10 * t, 2 * t, 20 * t + 10], errores: E(20 * t, [[10 * t, 'Eso es una parte. El doble son dos partes iguales.'], [2 * t, 'Son decenas: cada una vale 10.'], [20 * t + 10, 'Te has pasado una decena.']]) },
            { txt: 'Doble de las unidades:', q: `${u} + ${u} = ?`, r: 2 * u, vis: { t: 'marco', a: u, b: u, tam: 20 }, extra: [u, 2 * u + 1, 2 * u - 1], errores: E(2 * u, [[u, 'Eso es una parte. El doble son dos partes iguales.'], [2 * u + 1, 'Cuenta otra vez: te has pasado por uno.'], [2 * u - 1, 'Cuenta otra vez: te falta uno.']]) }
          ],
          final: { txt: `Junto ${20 * t} y ${2 * u}:`, q: `${n} + ${n} = ?`, r: 2 * n, vis: { t: 'barra', partes: 2, marcadas: 2, total: 2 * n, valor: n, oculto: 'total' }, extra: [20 * t + u, 2 * n + 10, 2 * n - 10, 10 * t + 2 * u], errores: E(2 * n, [[20 * t + u, 'Has doblado las decenas, pero no las unidades.'], [10 * t + 2 * u, 'Has doblado las unidades, pero no las decenas.'], [2 * n + 10, 'Te has pasado una decena.']]) }
        };
      }
      const t = rnd(2, 9), u = pick([2, 4, 6, 8]), n = 10 * t + u;
      return {
        pasos: [
          { txt: 'Mitad de las decenas:', q: `${10 * t} : 2 = ?`, r: 5 * t, vis: { t: 'decenas', grupos: [{ d: t }] }, extra: [t, 10 * t, 5 * t + 5], errores: E(5 * t, [[10 * t, 'Eso es el número entero. Reparte en dos partes iguales.'], [t, 'Son decenas: cada una vale 10. Reparte las barras.'], [5 * t + 5, 'Te has pasado una decena.']]) },
          { txt: 'Mitad de las unidades:', q: `${u} : 2 = ?`, r: u / 2, vis: { t: 'marco', a: u }, extra: [u, u / 2 + 1, u / 2 - 1], errores: E(u / 2, [[u, 'Eso es el número entero. Reparte en dos partes iguales.'], [u / 2 + 1, 'Reparte otra vez: te has pasado por uno.'], [u / 2 - 1, 'Reparte otra vez: te falta uno.']]) }
        ],
        final: { txt: `Junto ${5 * t} y ${u / 2}:`, q: `${n} : 2 = ?`, r: n / 2, vis: { t: 'barra', partes: 2, marcadas: 1, total: n, valor: n / 2, oculto: 'valor' }, extra: [5 * t + u, n / 2 + 10, n / 2 - 10, t + u / 2], errores: E(n / 2, [[5 * t + u, 'Has partido las decenas, pero no las unidades.'], [t + u / 2, 'Son decenas: cada una vale 10.'], [n / 2 + 10, 'Te has pasado una decena.']]) }
      };
    },
    item(nivel) {
      if (rnd(0, 1)) {
        const [lo, hi] = tam.d[nivel - 1], n = rnd(lo, hi), t = Math.floor(n / 10), u = n % 10;
        return Object.assign(doble(n), { extra: [20 * t + u, 2 * n + 10, 2 * n - 10, 2 * n + 2], errores: E(2 * n, [[20 * t + u, 'Has doblado las decenas, pero no las unidades.'], [10 * t + 2 * u, 'Has doblado las unidades, pero no las decenas.'], [2 * n + 10, 'Te has pasado una decena.'], [n, 'Eso es una parte. El doble son dos partes iguales.']]) });
      }
      const [lo, hi] = tam.m[nivel - 1], n = par(rnd(lo, hi)), t = Math.floor(n / 10), u = n % 10;
      return Object.assign(mitad(n), { extra: [n / 2 + 10, n / 2 - 10, n / 2 + 5, 5 * t + u, t + u / 2], errores: E(n / 2, [[5 * t + u, 'Has partido las decenas, pero no las unidades.'], [n / 2 + 10, 'Te has pasado una decena.'], [n / 2 - 10, 'Te falta una decena.'], [n * 2, 'Eso es el doble. Mitad es repartir en dos.']]) });
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada doble o mitad con su resultado',
      pares() {
        const ds = shuffle([12, 15, 18, 22, 25, 30, 35, 40, 45, 50]).slice(0, 3).map(n => [`doble ${n}`, 2 * n]);
        const ms = shuffle([24, 36, 50, 62, 70, 84, 90, 96]).slice(0, 3).map(n => [`mitad ${n}`, n / 2]);
        const todo = ds.concat(ms), rs = new Set(todo.map(p => p[1]));
        if (rs.size < 6) return this.pares();
        return shuffle(todo);
      }
    }
  });
}
