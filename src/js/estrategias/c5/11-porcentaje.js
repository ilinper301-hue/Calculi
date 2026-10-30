/* 5.º · Truco 11 · 10 %, 50 % y 25 % (décima parte, mitad y cuarta parte) */
(function () {
  const R = x => +x.toFixed(3), PARTES = { 10: 10, 50: 2, 25: 4 };
  ESTR.add({
    id: 'porcentaje', curso: 5, orden: 11, tri: 3,
    n: '10 %, 50 % y 25 %', ic: '25%', desc: 'Décima, mitad y cuarta parte',
    truco: 'Calculo la décima parte, la mitad o la cuarta parte',
    tutorial: [
      { txt: 'Por ciento es «de cada 100». El 50 % son 50 casillas de 100: la mitad.', vis: { t: 'cien', n: 50 } },
      { txt: 'El 10 % son 10 casillas de 100: la décima parte. Se divide entre 10.', vis: { t: 'cien', n: 10 } },
      { txt: 'El 25 % son 25 casillas de 100: la cuarta parte. Se divide entre 4.', vis: { t: 'cien', n: 25 } },
      { txt: '10 % de 80: dividimos entre 10 y queda 8.', vis: { t: 'barra', partes: 10, marcadas: 1, total: 80, valor: 8 } },
      { txt: 'El 50 % de 60 es la mitad: 30. El 25 % es la mitad de la mitad: 15.', vis: { t: 'barra', partes: 4, marcadas: 1, total: 60, valor: 15 } }
    ],
    guiada() {
      const p = pick([10, 25, 50]);
      if (p === 25) {
        const v = 2 * rnd(1, 6), t = 4 * v;
        return {
          pasos: [
            { txt: 'El 50 % es la mitad. Primero:', q: `${t} : 2 = ?`, r: t / 2, vis: { t: 'barra', partes: 2, marcadas: 1, total: t, valor: t / 2, oculto: 'valor' }, extra: [t / 4, t / 2 + 2, t - 2] },
            { txt: 'El 25 % es la mitad de la mitad:', q: `${t / 2} : 2 = ?`, r: v, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: v, oculto: 'valor' }, extra: [t / 2, v + 1, v - 1] }
          ],
          final: { txt: 'Entonces:', q: `25 % de ${t} = ?`, r: v, vis: { t: 'barra', partes: 4, marcadas: 1, total: t, valor: v, oculto: 'valor' }, extra: [t / 2, t / 10, 2 * v + 2, v + 1] }
        };
      }
      const k = PARTES[p], v = rnd(2, 9), t = k * v;
      return {
        pasos: [
          { txt: `El ${p} % es ${p === 10 ? 'la décima parte' : 'la mitad'}. ¿En cuántas partes iguales divido?`, q: '?', r: k, vis: { t: 'barra', partes: k, marcadas: 0, total: t }, ops: opciones(k, 3, [k === 10 ? 100 : 4, 5, k === 10 ? 4 : 10]) },
          { txt: `Ahora, el ${p} % de ${t}:`, q: `${t} : ${k} = ?`, r: v, vis: { t: 'barra', partes: k, marcadas: 1, total: t, valor: v, oculto: 'valor' }, extra: [R(t / 100), t / 5, t / 4, v + 1] }
        ],
        final: { txt: 'Entonces:', q: `${p} % de ${t} = ?`, r: v, vis: { t: 'barra', partes: k, marcadas: 1, total: t, valor: v, oculto: 'valor' }, extra: [R(t / 100), t / 5, t / 4, t / 2] }
      };
    },
    item(nivel) {
      const p = pick([10, 50, 25]), k = PARTES[p];
      let t;
      if (nivel === 1) t = p === 10 ? 10 * rnd(1, 10) : p === 50 ? 2 * rnd(2, 20) : 4 * rnd(2, 10);
      else if (nivel === 2) t = p === 10 ? 10 * rnd(4, 40) : p === 50 ? 2 * rnd(10, 100) : 4 * rnd(5, 50);
      else t = p === 25 ? 2 * rnd(5, 100) : rnd(11, 500);
      const r = R(t / k), vis = { t: 'barra', partes: k, marcadas: 1, total: t, valor: r, oculto: 'valor' };
      const extra = p === 10 ? [R(t / 100), t / 5, t / 2, R(t / 20), t] : p === 50 ? [t / 4, t / 5, t / 10, 2 * t, R(t / 100)] : [t / 2, t / 5, t / 10, t / 8, R(t / 100)];
      return { q: `${p} % de ${fmt(t)} = ?`, r, vis, extra: extra.map(R) };
    },
    juego: {
      tipo: 'parejas', meta: 'Une cada porcentaje con su resultado',
      pares() {
        const out = [], vistos = new Set(); let guard = 0;
        while (out.length < 6 && guard++ < 300) {
          const p = pick([10, 25, 50]), k = PARTES[p], v = rnd(2, 12), t = k * v;
          if (t < 10 || t > 99) continue;
          const a = `${p} % de ${t}`, b = String(v);
          if (vistos.has(a) || vistos.has(b)) continue;
          vistos.add(a); vistos.add(b); out.push([a, v]);
        }
        return out;
      }
    }
  });
})();
