/* 5.º · Truco 14 · ¿Es divisible? (criterios del 2, 3, 5 y 10) */
(function () {
  const cifras = n => String(n).split('').map(Number);
  const suma = n => cifras(n).reduce((s, c) => s + c, 0);
  // Dibujo del número con barras de 10 y cubitos (solo hasta 399, para que quepa)
  const num = n => n < 400 ? { t: 'decenas', grupos: [{ c: Math.floor(n / 100), d: Math.floor(n / 10) % 10, u: n % 10 }] } : undefined;
  const R3 = n => n; // sin cambios (r siempre entero)
  const barra = (n, d) => ({ t: 'barra', partes: d, marcadas: 1, total: n, valor: n / d, oculto: 'valor' });
  const pista = (n, d) => d === 3 ? `Las cifras de ${n} suman ${suma(n)}, que está en la tabla del 3.` : d === 2 ? `${n} acaba en ${n % 10}, una cifra par.` : d === 5 ? `${n} acaba en ${n % 10}.` : `${n} acaba en 0.`;
  ESTR.add({
    id: 'divisible', curso: 5, orden: 14, tri: 3,
    n: '¿Es divisible?', ic: ':3', desc: 'Criterios del 2, 3, 5 y 10',
    truco: 'Miro la última cifra o sumo las cifras',
    tutorial: [
      { txt: 'Un número es divisible entre otro si al dividir no sobra nada.', vis: { t: 'barra', partes: 3, marcadas: 1, total: 12, valor: 4 } },
      { txt: 'Entre 2: si acaba en cifra par (0, 2, 4, 6 u 8). Entre 5: si acaba en 0 o en 5.', vis: { t: 'barra', partes: 2, marcadas: 1, total: 18, valor: 9 } },
      { txt: 'Entre 10: si acaba en 0. Por eso 470 : 10 = 47.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 470, valor: 47 } },
      { txt: 'Entre 3: sumo las cifras. 2 + 4 + 6 = 12. Como 12 está en la tabla del 3, 246 es divisible.', vis: num(246) },
      { txt: 'Y ahora lo comprobamos: 246 : 3 = 82. No sobra nada.', vis: { t: 'barra', partes: 3, marcadas: 1, total: 246, valor: 82 } }
    ],
    guiada() {
      const k = rnd(20, 130), n = 3 * k, c = cifras(n), S = suma(n);
      return {
        pasos: [
          { txt: `Sumo las cifras de ${n}:`, q: `${c.join(' + ')} = ?`, r: S, vis: num(n), extra: [S + 1, S - 1, S + 3, c.reduce((p, x) => p * x, 1)] },
          { txt: `¿Está el ${S} en la tabla del 3?`, q: `3 × ? = ${S}`, r: S / 3, extra: [S / 3 + 1, S / 3 - 1, S - 3] }
        ],
        final: { txt: `Está en la tabla del 3, así que ${n} se puede dividir entre 3:`, q: `${n} : 3 = ?`, r: k, vis: barra(n, 3), extra: [k + 1, k - 1, k + 10, k - 10] }
      };
    },
    item(nivel) {
      // tipos: 0 suma de cifras · 1 entre 3 · 2 entre 2 · 3 entre 5 · 4 entre 10
      const tipo = nivel === 1 ? pick([0, 1, 2, 3, 4]) : pick([0, 1, 1, 2, 3, 4]);
      if (tipo === 0) {
        const n = nivel === 1 ? rnd(12, 99) : nivel === 2 ? rnd(100, 399) : rnd(100, 9999), c = cifras(n), S = suma(n);
        return { q: `${c.join(' + ')} = ?`, txt: `Suma las cifras de ${n}. Si la suma está en la tabla del 3, ${n} se divide entre 3.`, r: S, vis: num(n), extra: [S + 1, S - 1, S + 3, c.reduce((p, x) => p * x, 1)] };
      }
      const d = [0, 3, 2, 5, 10][tipo];
      let k;
      if (nivel === 1) k = d === 3 ? rnd(4, 15) : d === 10 ? rnd(2, 9) : rnd(3, 19);
      else if (nivel === 2) k = d === 3 ? rnd(15, 130) : d === 10 ? rnd(11, 99) : rnd(12, 100);
      else k = d === 3 ? rnd(100, 3300) : d === 10 ? rnd(100, 990) : d === 2 ? rnd(100, 4900) : rnd(100, 1990);
      let n = d * k;
      if (d === 2 && n % 4 === 0 && rnd(0, 1)) { k += 1; n = d * k; }
      return { q: `${n} : ${d} = ?`, txt: pista(n, d), r: k, vis: n <= 1000 ? barra(n, d) : undefined, extra: [k + 1, k - 1, k * 2, Math.floor(k / 2), k + 10] };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada división con su resultado',
      pares() {
        const out = [], vistos = new Set(); let guard = 0;
        while (out.length < 6 && guard++ < 300) {
          const d = pick([2, 3, 5, 10, 3]), k = rnd(11, 99), n = d * k, t = `${n} : ${d}`;
          if (vistos.has(t) || vistos.has(String(k)) || t.length > 9 || vistos.has(String(n))) continue;
          vistos.add(t); vistos.add(String(k)); vistos.add(String(n)); out.push([t, k]);
        }
        return out;
      }
    }
  });
})();
