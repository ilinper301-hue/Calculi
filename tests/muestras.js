// Vuelca, en palabras, ejemplos de cada estrategia para revisarlos a mano:
//   node tests/muestras.js [id …]   → escribe tests/muestras/<id>.txt
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..', 'src', 'js');
const ctx = { console, window: {}, document: { querySelector: () => null }, localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }), navigator: {}, location: {}, setTimeout, Math, Date, JSON };
vm.createContext(ctx);
const files = ['00-util.js', '10-datos.js', '20-visual.js', '30-motor.js'].map(f => path.join(R, f))
  .concat(fs.readdirSync(path.join(R, 'estrategias')).sort().map(f => path.join(R, 'estrategias', f)));
for (const f of files) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.ESTR=ESTR;globalThis.prepararItem=prepararItem', ctx);
const { ESTR, prepararItem } = ctx;

function describir(v) {
  if (!v) return '(sin dibujo)';
  switch (v.t) {
    case 'marco': { const tam = v.tam || 10, a = v.a || 0, b = v.b || 0; return `MARCO de ${tam}: ${a} fichas AZULES` + (b ? ` + ${b} NARANJAS` : '') + `, ${tam - a - b} huecos vacíos` + (v.tachar ? `; las ${v.tachar} últimas TACHADAS` : ''); }
    case 'puntos': return v.n <= 6 ? `UN DADO AZUL con ${v.n} puntos` : `DOS DADOS: azul con 5 puntos y naranja con ${v.n - 5}`;
    case 'dedos': return `MANOS: ${Math.min(5, v.n)} dedos azules en la primera mano y ${Math.max(0, v.n - 5)} naranjas en la segunda`;
    case 'parte': return `PARTE-TODO: total ${v.oculto === 'total' ? '?' : v.total}, partes ${v.oculto === 'a' ? '?' : v.a} y ${v.oculto === 'b' ? '?' : v.b}`;
    case 'recta': { let p = v.inicio, pas = [p]; for (const s of v.saltos || []) pas.push(p += s); return `RECTA de ${v.desde} a ${v.hasta}` + (v.inicio !== undefined && v.inicio !== null ? `: empieza en ${v.inicio}, saltos ${JSON.stringify(v.saltos || [])} → recorre ${pas.join(' → ')}` : ''); }
    case 'decenas': return `DECENAS: ` + (v.grupos || []).map((g, i) => `${i ? 'naranja' : 'azul'} ${g.d || 0} barras de 10 y ${g.u || 0} cubitos`).join(' + ') + (v.tachar ? `; las ${v.tachar} últimas barras TACHADAS` : '');
    default: return JSON.stringify(v);
  }
}
const linea = (it, n) => { const p = prepararItem(it, n); return `  ${it.txt ? `[${it.txt}] ` : ''}${it.q}   → respuesta ${it.r}${p.ops ? `   opciones ${JSON.stringify(p.ops)}` : ''}${it.visSiempre ? '   (dibujo siempre visible)' : ''}\n      dibujo: ${describir(it.vis)}`; };
const out = path.join(__dirname, 'muestras'); fs.mkdirSync(out, { recursive: true });
const pedir = process.argv.slice(2);
for (const e of ESTR.lista.filter(e => !pedir.length || pedir.includes(e.id))) {
  let t = `#${e.orden} ${e.n} (${e.id}) · trimestre ${e.tri}${e.curso ? ' · curso ' + e.curso : ''}\n${e.desc} · Truco: «${e.truco}»\n\n== TUTORIAL ==\n`;
  e.tutorial.forEach((s, i) => t += `${i + 1}. ${s.txt}\n   dibujo: ${describir(s.vis)}\n`);
  t += '\n== PRÁCTICA GUIADA (4 ejemplos) ==\n';
  for (let k = 0; k < 4; k++) { const g = e.guiada(); t += `-- ejemplo ${k + 1}\n` + g.pasos.map((p, i) => `  Paso ${i + 1}:` + linea(p, 1).slice(1)).join('\n') + '\n  FINAL:' + linea(g.final, 1).slice(1) + '\n'; }
  for (const n of [1, 2, 3]) { t += `\n== RETO nivel ${n} (6 ejemplos) ==\n`; for (let k = 0; k < 6; k++) t += linea(e.item(n), n) + '\n'; }
  if (e.juego) t += `\n== JUEGO == ${e.juego.tipo}${e.juego.meta ? ': ' + e.juego.meta : ''}\n` + (e.juego.pares ? e.juego.pares().map(p => `  ${p[0]}  ↔  ${p[1]}`).join('\n') : '') + '\n';
  fs.writeFileSync(path.join(out, e.id + '.txt'), t);
}
console.log('Muestras en tests/muestras/');
