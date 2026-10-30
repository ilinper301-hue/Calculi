/* 6.º · Truco 7 · Aumentos y descuentos */
(() => {
  const R = x => +x.toFixed(3);
  const OBJ = [['Un', 'balón'], ['Una', 'mochila'], ['Un', 'juego'], ['Una', 'camiseta'], ['Un', 'libro']];
  const CARO = [['Un', 'abrigo'], ['Una', 'mochila'], ['Una', 'chaqueta'], ['Un', 'videojuego'], ['Un', 'reloj']];
  const vis = (P, p) => p % 10 === 0 ? { t: 'barra', partes: 10, marcadas: p / 10, total: P, valor: R(P / 10) }
    : p === 25 ? { t: 'barra', partes: 4, marcadas: 1, total: P, valor: R(P / 4) }
    : { t: 'barra', partes: 20, marcadas: p / 5, total: P };
  const problema = (P, p, baja, caro) => {
    const [a, o] = pick(caro ? CARO : OBJ), d = R(P * p / 100), r = R(baja ? P - d : P + d);
    return {
      txt: `${a} ${o} cuesta ${fmt(P)} €. ${baja ? `Le hacen un descuento del ${p} %.` : `Su precio sube un ${p} %.`} ¿Cuánto cuesta ahora?`,
      q: `${fmt(P)} ${baja ? '−' : '+'} ${p} % de ${fmt(P)} = ?`, r, vis: vis(P, p),
      extra: [d, R(baja ? P + d : P - d), R(P - p), R(P + p), R(baja ? P - d / 2 : P + d / 2)]
    };
  };
  ESTR.add({
    id: 'descuento', curso: 6, orden: 7, tri: 2,
    n: 'Aumentos y descuentos', ic: '−20%', desc: 'Calcula el precio final',
    truco: 'Calculo el porcentaje y lo resto o lo sumo al precio',
    tutorial: [
      { txt: 'Una camiseta cuesta 80 €. Con un 20 % de descuento, ¿cuánto se paga? Primero miro el 10 %: 8 €.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 80, valor: 8 } },
      { txt: 'El 20 % son dos trozos de 10 %: 8 + 8 = 16 €. Es lo que me quitan.', vis: { t: 'barra', partes: 10, marcadas: 2, total: 80, valor: 8 } },
      { txt: 'Se paga 80 − 16 = 64 €. Si en vez de bajar el precio sube un 20 %, sumo: 80 + 16 = 96 €.', vis: { t: 'recta', desde: 60, hasta: 100, inicio: 80, saltos: [-16] } },
      { txt: 'Truco: calculo el porcentaje (10 % y sus múltiplos) y lo resto si baja o lo sumo si sube.', vis: { t: 'recta', desde: 60, hasta: 100, inicio: 80, saltos: [16] } }
    ],
    guiada() {
      const P = 10 * rnd(3, 10), p = pick([20, 30]), d = R(P * p / 100);
      return {
        pasos: [
          { txt: `Un artículo cuesta ${P} €. Primero, ¿cuánto es el 10 %?`, q: `10 % de ${P} = ?`, r: P / 10, vis: { t: 'barra', partes: 10, marcadas: 1, total: P, valor: P / 10 }, extra: [P / 100, P / 5, P * 10] },
          { txt: `El ${p} % son ${p / 10} trozos de 10 %. ¿Cuánto es el ${p} %?`, q: `${p / 10} × ${P / 10} = ?`, r: d, vis: { t: 'barra', partes: 10, marcadas: p / 10, total: P, valor: P / 10 }, extra: [P / 10, P - d, d + P / 10] }
        ],
        final: { txt: `Con un ${p} % de descuento, pagas el precio menos el descuento:`, q: `${P} − ${p} % de ${P} = ?`, r: P - d, vis: { t: 'barra', partes: 10, marcadas: p / 10, total: P, valor: P / 10 }, extra: [d, P + d, P - p, P - P / 10] }
      };
    },
    item(nivel) {
      if (nivel === 1) return problema(10 * rnd(2, 10), pick([10, 20, 50]), rnd(0, 1) === 0);
      if (nivel === 2) return problema(20 * rnd(1, 8), pick([10, 20, 25, 30, 50]), rnd(0, 2) > 0, true);
      return problema(20 * rnd(2, 12), pick([5, 10, 15, 20, 25, 30, 40]), rnd(0, 1) === 0, true);
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada cambio con el % del precio que pagas',
      pares() {
        const T = [['−10 %', '90 %'], ['−20 %', '80 %'], ['−25 %', '75 %'], ['−30 %', '70 %'], ['−40 %', '60 %'], ['−50 %', '50 %'], ['+10 %', '110 %'], ['+20 %', '120 %'], ['+25 %', '125 %'], ['+50 %', '150 %']];
        return shuffle(T).slice(0, 6);
      }
    }
  });
})();
