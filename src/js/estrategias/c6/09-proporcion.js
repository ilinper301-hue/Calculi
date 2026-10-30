/* 6.º · Truco 9 · Regla de tres simple */
(() => {
  const R = x => +x.toFixed(3);
  // [nombre, precios por unidad razonables en €]
  const OBJ = [['cuadernos', [2, 3, 4, 5]], ['bolígrafos', [1, 2, 3, 4]], ['helados', [2, 3, 4, 5]], ['metros de cinta', [2, 3, 4, 5, 6]], ['kilos de manzanas', [2, 3, 4]], ['entradas de cine', [5, 6, 7, 8, 9]], ['paquetes de folios', [3, 4, 5, 6]]];
  const DEC = [['cuadernos', [1.5, 2.5, 3.5]], ['bolígrafos', [0.5, 1.5, 2.5]], ['helados', [1.5, 2.5, 3.5]], ['metros de cinta', [1.5, 2.5, 3.5]], ['kilos de manzanas', [1.5, 2.5, 3.5]], ['paquetes de folios', [2.5, 3.5]]];
  const vis = (a, p, u) => ({ t: 'barra', partes: a, marcadas: a, total: p, valor: u, oculto: 'valor' });
  const prob = (a, o, u, b) => {
    const p = R(a * u);
    return { txt: `${a} ${o} cuestan ${fmt(p)} €. ¿Cuánto cuestan ${b} ${o}?`, q: `${b} ${o} = ? €`, r: R(b * u), vis: vis(a, p, u), extra: [R(p + (b - a)), R(b * u + u), R(b * u - u), R(a * b), R(p + u)] };
  };
  ESTR.add({
    id: 'proporcion', curso: 6, orden: 9, tri: 2,
    n: 'Regla de tres simple', ic: '€', desc: 'Busco lo que vale 1',
    truco: 'Calculo lo que vale uno y lo multiplico',
    tutorial: [
      { txt: '3 cuadernos cuestan 6 €. ¿Cuánto cuesta cada uno? Reparto 6 € entre 3.', vis: { t: 'barra', partes: 3, marcadas: 3, total: 6, valor: 2, oculto: 'valor' } },
      { txt: '6 : 3 = 2. Cada cuaderno cuesta 2 €. Esto se llama «buscar el valor de uno».', vis: { t: 'barra', partes: 3, marcadas: 3, total: 6, valor: 2 } },
      { txt: 'Ahora, 5 cuadernos: 5 × 2 = 10 €. Los 5 trozos valen 2 € cada uno.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 10, valor: 2 } },
      { txt: 'Cuidado: no vale sumar. Con 2 cuadernos más no pagas 2 € más, sino 2 × 2 = 4 € más.', vis: { t: 'barra', partes: 5, marcadas: 5, total: 10, valor: 2 } }
    ],
    guiada() {
      const [o, us] = pick(OBJ), u = pick(us), a = rnd(2, 5);
      let b = rnd(2, 8); if (b === a) b = a + 3;
      const p = a * u;
      return {
        pasos: [
          { txt: `${a} ${o} cuestan ${p} €. ¿Cuánto cuesta 1?`, q: `${p} : ${a} = ?`, r: u, vis: vis(a, p, u), extra: [p - a, a, p + a, p] },
          { txt: `Ahora, ¿cuánto cuestan ${b} ${o}? Multiplico el precio de uno:`, q: `${u} × ${b} = ?`, r: u * b, vis: { t: 'barra', partes: b, marcadas: b, total: u * b, valor: u, oculto: 'total' }, extra: [p + b - a, u + b, a * b, p] }
        ],
        final: { txt: `${a} ${o} cuestan ${p} €. ¿Cuánto cuestan ${b} ${o}?`, q: `${b} ${o} = ? €`, r: u * b, vis: vis(a, p, u), extra: [p + b - a, u * b + u, a * b] }
      };
    },
    item(nivel) {
      let a, b;
      const [o, us] = pick(nivel === 3 && rnd(0, 1) ? DEC : OBJ), u = pick(us);
      if (nivel === 1) { a = rnd(2, 5); b = rnd(2, 8); }
      else if (nivel === 2) { a = rnd(3, 8); b = rnd(2, 12); }
      else { a = rnd(2, 12); b = rnd(3, 15); }
      if (b === a) b = a + 2;
      return prob(a, o, u, b);
    },
    juego: {
      tipo: 'parejas', meta: 'Si 3 cuestan 12 €, ¿cuánto cuesta 1?',
      pares() { return shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 6).map(u => { const a = rnd(2, 9); return [`${a} = ${a * u} €`, `1 = ${u} €`]; }); }
    }
  });
})();
