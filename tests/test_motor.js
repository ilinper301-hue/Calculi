// Prueba todas las estrategias: node tests/test_motor.js
// Comprueba el contrato de 30-motor.js generando muchos ítems de cada estrategia.
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..', 'src', 'js');
const ctx = { console, window: {}, document: { querySelector: () => null }, localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }), navigator: {}, location: {}, setTimeout, Math, Date, JSON };
vm.createContext(ctx);
const files = ['00-util.js', '10-datos.js', '20-visual.js', '30-motor.js'].map(f => path.join(R, f))
  .concat(fs.readdirSync(path.join(R, 'estrategias')).sort().map(f => path.join(R, 'estrategias', f)));
for (const f of files) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.ESTR=ESTR;globalThis.VIS=VIS;globalThis.prepararItem=prepararItem;globalThis.itemsRepaso=itemsRepaso;globalThis.limpiarAlu=limpiarAlu', ctx);
const { ESTR, VIS, prepararItem } = ctx;
let err = 0; const fallo = (e, m) => { err++; console.log(`✗ [${e}] ${m}`); };
const visOk = (id, v, d) => { if (!v) return; if (!VIS[v.t]) return fallo(id, `${d}: modelo visual desconocido "${v.t}"`); const s = VIS.dibujar(v); if (!/^<svg/.test(s) || /NaN|undefined/.test(s)) fallo(id, `${d}: SVG roto (${JSON.stringify(v)})`); };
const qOk = (id, it, d) => {
  if (typeof it.q !== 'string' || !it.q.length) return fallo(id, `${d}: q vacío`);
  if ((it.q.match(/\?/g) || []).length > 1) fallo(id, `${d}: más de un «?» en "${it.q}"`);
  if (!Number.isInteger(it.r) || it.r < 0 || it.r > 100) fallo(id, `${d}: r no es entero 0-100 (${it.r}) en "${it.q}"`);
  // Comprobar la aritmética si la expresión es evaluable
  const exp = it.q.includes('?') ? it.q.replace('?', it.r) : it.q + ' = ' + it.r;
  const lados = exp.replace(/−/g, '-').split('=');
  if (lados.length === 2 && lados.every(l => /^[\d\s+\-]+$/.test(l))) { const [a, b] = lados.map(l => Function(`return (${l})`)()); if (a !== b) fallo(id, `${d}: cuenta incorrecta "${exp}"`); }
  const p = prepararItem(it, 1); if (!p.ops.includes(p.r) || new Set(p.ops).size !== p.ops.length || p.ops.some(o => o < 0)) fallo(id, `${d}: opciones mal ${JSON.stringify(p.ops)}`);
  visOk(id, it.vis, d);
};
const ordenes = new Set();
console.log(`Estrategias: ${ESTR.lista.length}`);
for (const e of ESTR.lista) {
  for (const k of ['id', 'orden', 'tri', 'n', 'ic', 'desc', 'truco']) if (e[k] === undefined || e[k] === '') fallo(e.id, `falta ${k}`);
  if (ordenes.has(e.orden)) fallo(e.id, `orden repetido ${e.orden}`); ordenes.add(e.orden);
  if (![1, 2, 3].includes(e.tri)) fallo(e.id, 'tri debe ser 1, 2 o 3');
  if (!Array.isArray(e.tutorial) || e.tutorial.length < 3 || e.tutorial.length > 6) fallo(e.id, 'tutorial: 3-6 pantallas');
  (e.tutorial || []).forEach((s, i) => { if (!s.txt || s.txt.length > 140) fallo(e.id, `tutorial ${i}: txt vacío o > 140`); visOk(e.id, s.vis, `tutorial ${i}`); });
  for (let k = 0; k < 300; k++) {
    const g = e.guiada(); if (!g || !Array.isArray(g.pasos) || !g.pasos.length || !g.final) { fallo(e.id, 'guiada sin pasos/final'); break; }
    g.pasos.forEach((p, i) => qOk(e.id, p, `guiada paso ${i}`)); qOk(e.id, g.final, 'guiada final');
    for (const n of [1, 2, 3]) { const it = e.item(n); qOk(e.id, it, `item nivel ${n}`); if (n === 1 && !it.vis) fallo(e.id, 'item nivel 1 sin vis'); }
    if (e.juego && e.juego.tipo === 'parejas') { const ps = e.juego.pares(); if (ps.length < 6) fallo(e.id, 'juego: menos de 6 pares'); const t = ps.slice(0, 6).flat().map(String); /* textos repetidos entre pares distintos hacen el juego ambiguo */ const vist = new Map(); ps.slice(0, 6).forEach((p, i) => p.map(String).forEach(x => { if (vist.has(x) && vist.get(x) !== i) fallo(e.id, `juego: «${x}» aparece en dos pares distintos`); vist.set(x, i); })); }
    if (err > 25) break;
  }
}
// Repaso mixto
const a = ctx.limpiarAlu({ n: 'Prueba' }); ESTR.lista.forEach(e => a.e[e.id] = { tut: true, est: 2, h: [1, 0, 1, 1, 1, 0], ult: '2026-10-01', n: 6 });
vm.runInContext('MODO_DOCENTE=true', ctx);
const rep = ctx.itemsRepaso(a, 40); if (rep.length !== 40) fallo('repaso', 'no genera 40 ítems');
console.log(err ? `\n${err} errores` : 'Todo correcto ✓'); process.exit(err ? 1 : 0);
