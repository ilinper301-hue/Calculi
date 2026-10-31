// Vuelca, en palabras, ejemplos de cada estrategia para revisarlos a mano:
//   node tests/muestras.js [id … | c2 … c6]   → escribe tests/muestras/<id>.txt (c3 = todas las de 3.º)
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..', 'src', 'js');
const listar = d => fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(x => x.isDirectory() ? listar(path.join(d, x.name)) : x.name.endsWith('.js') ? [path.join(d, x.name)] : []);

const ctx = { console, window: {}, document: { querySelector: () => null }, localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }), navigator: {}, location: {}, setTimeout, Math, Date, JSON };
vm.createContext(ctx);
const files = ['00-util.js', '10-datos.js', '20-visual.js', '30-motor.js'].map(f => path.join(R, f))
  .concat(listar(path.join(R, 'estrategias')));
for (const f of files) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.fmt=fmt;globalThis.ESTR=ESTR;globalThis.prepararItem=prepararItem', ctx);
const { ESTR, prepararItem, fmt } = ctx;

function describir(v) {
  if (!v) return '(sin dibujo)';
  switch (v.t) {
    case 'marco': { const tam = v.tam || 10, a = v.a || 0, b = v.b || 0; return `MARCO de ${tam}: ${a} fichas AZULES` + (b ? ` + ${b} NARANJAS` : '') + `, ${tam - a - b} huecos vacíos` + (v.tachar ? `; las ${v.tachar} últimas TACHADAS` : ''); }
    case 'puntos': return v.n <= 6 ? `UN DADO AZUL con ${v.n} puntos` : `DOS DADOS: azul con 5 puntos y naranja con ${v.n - 5}`;
    case 'dedos': return `MANOS: ${Math.min(5, v.n)} dedos azules en la primera mano y ${Math.max(0, v.n - 5)} naranjas en la segunda`;
    case 'parte': return `PARTE-TODO: total ${v.oculto === 'total' ? '?' : v.total}, partes ${v.oculto === 'a' ? '?' : v.a} y ${v.oculto === 'b' ? '?' : v.b}`;
    case 'recta': { let p = v.inicio, pas = [p]; for (const s of v.saltos || []) pas.push(p = +(p + s).toFixed(4)); return `RECTA de ${v.desde} a ${v.hasta}${v.paso && v.paso !== 1 ? ' (marcas cada ' + v.paso + ')' : ''}` + (v.inicio !== undefined && v.inicio !== null ? `: empieza en ${v.inicio}, saltos ${JSON.stringify(v.saltos || [])} → recorre ${pas.join(' → ')}` : ''); }
    case 'decenas': return `DECENAS: ` + (v.grupos || []).map((g, i) => `${i ? 'naranja' : 'azul'} ${g.c ? g.c + ' placas de 100, ' : ''}${g.d || 0} barras de 10 y ${g.u || 0} cubitos`).join(' + ') + (v.tachar ? `; las ${v.tachar} últimas barras TACHADAS` : '');
    case 'matriz': return `MATRIZ de ${v.filas} filas × ${v.cols} columnas` + (v.partir ? ` (las ${v.partir} primeras filas azules, el resto naranjas)` : '') + (v.tachar ? `; las ${v.tachar} últimas filas TACHADAS` : '');
    case 'barra': return `BARRA de ${v.partes} partes iguales, ${v.marcadas || 0} sombreadas` + (v.total !== undefined && v.total !== null ? `; total encima: ${v.oculto === 'total' ? '?' : v.total}` : '') + (v.valor !== undefined && v.valor !== null ? `; cada parte sombreada vale ${v.oculto === 'valor' ? '?' : v.valor}` : '');
    case 'cien': return `CUADRÍCULA de 100: ${v.n || 0} azules` + (v.m ? ` + ${v.m} naranjas` : '');
    default: return JSON.stringify(v);
  }
}
const linea = (it, n) => { const p = prepararItem(it, n); return `  ${it.txt ? `[${it.txt}] ` : ''}${it.q}${it.errores ? `   PISTAS: ${it.errores.map(e => F(e[0]) + ' → «' + e[1] + '»').join(' · ')}` : ''}   → respuesta ${F(it.r)}${p.ops ? `   opciones [${p.ops.map(F).join(' | ')}]` : ''}${it.visSiempre ? '   (dibujo siempre visible)' : ''}\n      dibujo: ${describir(it.vis)}`; };
const out = path.join(__dirname, 'muestras');
const F = x => typeof x === 'number' ? fmt(x) : x; fs.mkdirSync(out, { recursive: true });
const pedir = process.argv.slice(2);
for (const e of ESTR.lista.filter(e => !pedir.length || pedir.includes(e.id) || pedir.includes('c' + e.curso))) {
  let t = `#${e.orden} ${e.n} (${e.id}) · trimestre ${e.tri}${e.curso ? ' · curso ' + e.curso : ''}\n${e.desc} · Truco: «${e.truco}»\n\n== TUTORIAL ==\n`;
  e.tutorial.forEach((s, i) => t += `${i + 1}. ${s.txt}\n   ${s.toca ? 'PARA TOCAR: ' + JSON.stringify(s.toca) : 'dibujo: ' + describir(s.vis)}\n`);
  t += '\n== PRÁCTICA GUIADA (4 ejemplos) ==\n';
  for (let k = 0; k < 4; k++) { const g = e.guiada(); t += `-- ejemplo ${k + 1}\n` + g.pasos.map((p, i) => `  Paso ${i + 1}:` + linea(p, 1).slice(1)).join('\n') + '\n  FINAL:' + linea(g.final, 1).slice(1) + '\n'; }
  for (const n of [1, 2, 3]) { t += `\n== RETO nivel ${n} (6 ejemplos) ==\n`; for (let k = 0; k < 6; k++) t += linea(e.item(n), n) + '\n'; }
  if (e.juego) t += `\n== JUEGO == ${e.juego.tipo}${e.juego.meta ? ': ' + e.juego.meta : ''}\n` + (e.juego.pares ? e.juego.pares().map(p => `  ${F(p[0])}  ↔  ${F(p[1])}`).join('\n') : '') + '\n';
  fs.writeFileSync(path.join(out, e.id + '.txt'), t);
}
console.log('Muestras en tests/muestras/');
