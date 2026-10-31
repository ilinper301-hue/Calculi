// Prueba todas las estrategias: node tests/test_motor.js
// Comprueba el contrato de 30-motor.js generando muchos ítems de cada estrategia.
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..', 'src', 'js');
const listar = d => fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(x => x.isDirectory() ? listar(path.join(d, x.name)) : x.name.endsWith('.js') ? [path.join(d, x.name)] : []);

const ctx = { console, window: {}, document: { querySelector: () => null }, localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }), navigator: {}, location: {}, setTimeout, Math, Date, JSON };
vm.createContext(ctx);
const files = ['00-util.js', '10-datos.js', '20-visual.js', '30-motor.js'].map(f => path.join(R, f))
  .concat(listar(path.join(R, 'estrategias')));
for (const f of files) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.fmt=fmt;globalThis.ESTR=ESTR;globalThis.VIS=VIS;globalThis.prepararItem=prepararItem;globalThis.itemsRepaso=itemsRepaso;globalThis.limpiarAlu=limpiarAlu', ctx);
const { ESTR, VIS, prepararItem } = ctx;
let err = 0; const fallo = (e, m) => { err++; console.log(`✗ [${e}] ${m}`); };
const visCoh = (id, it, d) => {
  const v = it.vis; if (!v) return; const txt = (it.txt || '') + ' ' + it.q, sumG = (v.grupos || []).reduce((s, g) => s + (g.d || 0), 0);
  if (v.t === 'marco') { const tam = v.tam || 10; if ((v.a || 0) + (v.b || 0) > tam) fallo(id, `${d}: el marco no cabe (${v.a}+${v.b} > ${tam})`); if ((v.tachar || 0) > (v.a || 0) + (v.b || 0)) fallo(id, `${d}: tacha más fichas de las que hay`); }
  if (v.t === 'puntos' && !(v.n >= 1 && v.n <= 10)) fallo(id, `${d}: puntos fuera de 1-10 (${v.n})`);
  if (v.t === 'dedos' && !(v.n >= 0 && v.n <= 10)) fallo(id, `${d}: dedos fuera de 0-10 (${v.n})`);
  if (v.t === 'parte' && [v.total, v.a, v.b].every(Number.isFinite) && v.total !== v.a + v.b) fallo(id, `${d}: parte-todo no cuadra (${v.a}+${v.b}≠${v.total})`);
  if (v.t === 'matriz' && !(v.filas >= 1 && v.filas <= 12 && v.cols >= 1 && v.cols <= 12)) fallo(id, `${d}: matriz fuera de 1-12 (${v.filas}×${v.cols})`);
  if (v.t === 'matriz' && (v.partir || 0) >= v.filas && v.partir) fallo(id, `${d}: partir ≥ filas`);
  if (v.t === 'barra' && !(v.partes >= 1 && v.partes <= 20 && (v.marcadas || 0) <= v.partes)) fallo(id, `${d}: barra mal (${v.marcadas}/${v.partes})`);
  if (v.t === 'cien' && (v.n || 0) + (v.m || 0) > 100) fallo(id, `${d}: más de 100 casillas`);
  if (v.t === 'decenas' && (v.tachar || 0) > sumG) fallo(id, `${d}: tacha más barras de las que hay`);
  if (v.t === 'recta') { let p = v.inicio; if (v.desde >= v.hasta) fallo(id, `${d}: recta vacía`); if (p !== null && p !== undefined) { if (p < v.desde || p > v.hasta) fallo(id, `${d}: inicio fuera de la recta (${p} en ${v.desde}-${v.hasta})`); for (const sj of v.saltos || []) { p += sj; if (p < v.desde || p > v.hasta) { fallo(id, `${d}: un salto se sale de la recta (${JSON.stringify(v)})`); break; } } } }
  if (/dado naranja/.test(txt) && !(v.t === 'puntos' && v.n > 6)) fallo(id, `${d}: habla del dado naranja pero no hay dos dados (${JSON.stringify(v)})`);
  if (/naranja/.test(txt) && v.t === 'marco' && !(v.b > 0) && !/huecos?|vac/.test(txt)) fallo(id, `${d}: habla de fichas naranjas pero no hay (${JSON.stringify(v)})`);
  if (it.q === '?' && /cuánt[oa]s (hay|puntos|fichas)/i.test(txt) && !/azul|naranja|vac|hueco|dado/i.test(txt)) { const tot = v.t === 'marco' ? (v.a || 0) + (v.b || 0) : v.t === 'puntos' || v.t === 'dedos' ? v.n : null; if (tot !== null && tot !== it.r) fallo(id, `${d}: «${it.txt}» responde ${it.r} pero el dibujo tiene ${tot}`); }
  if (it.q === '?' && /fichas azules/i.test(txt) && v.t === 'marco' && /cuántas/i.test(txt) && it.r !== (v.a || 0)) fallo(id, `${d}: fichas azules = ${v.a} pero responde ${it.r}`);
  if (it.q === '?' && /dado azul/i.test(txt) && v.t === 'puntos' && it.r !== (v.n > 6 ? 5 : v.n)) fallo(id, `${d}: el dado azul tiene ${v.n > 6 ? 5 : v.n} pero responde ${it.r}`);
  if (it.q === '?' && /dado naranja/i.test(txt) && v.t === 'puntos' && v.n > 6 && it.r !== v.n - 5) fallo(id, `${d}: dado naranja tiene ${v.n - 5} pero responde ${it.r}`);
};
const visOk = (id, v, d) => { if (!v) return; if (!VIS[v.t]) return fallo(id, `${d}: modelo visual desconocido "${v.t}"`); const s = VIS.dibujar(v); if (!/^<svg/.test(s) || /NaN|undefined/.test(s)) fallo(id, `${d}: SVG roto (${JSON.stringify(v)})`); };
const qOk = (id, it, d) => {
  if (typeof it.q !== 'string' || !it.q.length) return fallo(id, `${d}: q vacío`);
  if ((it.q.match(/\?/g) || []).length > 1) fallo(id, `${d}: más de un «?» en "${it.q}"`);
  const e = ESTR.get(id), maxR = { 1: 100, 2: 1000, 3: 10000 }[e ? e.curso : 1] || 1e7;
  if (typeof it.r !== 'number' || !isFinite(it.r) || it.r < 0 || it.r > maxR) fallo(id, `${d}: r fuera de 0-${maxR} (${it.r}) en "${it.q}"`);
  else if ((e ? e.curso : 1) < 4 && !Number.isInteger(it.r)) fallo(id, `${d}: decimal antes de 4.º (${it.r})`);
  else if (Math.abs(it.r * 1000 - Math.round(it.r * 1000)) > 1e-6) fallo(id, `${d}: más de 3 decimales (${it.r})`);
  if (/\d\.\d/.test(it.q) && !/\d{1,3}(\.\d{3})+/.test(it.q)) fallo(id, `${d}: usa punto decimal en "${it.q}" (debe ser coma)`);
  // Comprobar la aritmética si la expresión es evaluable
  const exp = it.q.includes('?') ? it.q.replace('?', String(it.r).replace('.', ',')) : it.q + ' = ' + String(it.r).replace('.', ',');
  const norm = l => l.replace(/(\d)\.(?=\d{3})/g, '$1').replace(/,/g, '.').replace(/−/g, '-').replace(/×/g, '*').replace(/[:÷]/g, '/');
  const lados = exp.split('=').map(norm);
  if (lados.length === 2 && lados.every(l => /^[\d\s+\-*/.()]+$/.test(l))) { const [a, b] = lados.map(l => Function(`return (${l})`)()); if (Math.abs(a - b) > 1e-9) fallo(id, `${d}: cuenta incorrecta "${exp}"`); }
  const p = prepararItem(it, 1); if (!p.ops.some(o => Math.abs(o - p.r) < 1e-9) || new Set(p.ops).size !== p.ops.length || p.ops.some(o => o < 0)) fallo(id, `${d}: opciones mal ${JSON.stringify(p.ops)}`);
  visOk(id, it.vis, d); visCoh(id, it, d);
  for (const er of it.errores || []) { if (!Array.isArray(er) || typeof er[0] !== 'number' || typeof er[1] !== 'string') { fallo(id, `${d}: errores mal formado`); break; } if (Math.abs(er[0] - it.r) < 1e-9) fallo(id, `${d}: una pista de error usa la respuesta correcta (${er[0]})`); if (er[1].length > 90) fallo(id, `${d}: pista larga (${er[1].length} > 90)`); }
};
const tocaOk = (id, T, d) => {
  if (!T) return;
  const ok = { marco: () => T.objetivo > (T.a || 0) && T.objetivo <= (T.tam || 10), recta: () => T.objetivo >= T.desde && T.objetivo <= T.hasta && T.inicio >= T.desde && T.inicio <= T.hasta && Math.abs(((T.objetivo - T.desde) / (T.paso || 1)) - Math.round((T.objetivo - T.desde) / (T.paso || 1))) < 1e-6 && (T.hasta - T.desde) / (T.paso || 1) <= 40,
    barra: () => T.objetivo >= 1 && T.objetivo <= T.partes && T.partes <= 20, matriz: () => T.objetivo >= 1 && T.objetivo <= T.filas && T.filas <= 12 && T.cols <= 12,
    elige: () => Array.isArray(T.ops) && T.ops.some(o => Math.abs(o - T.r) < 1e-9) && String(T.q).includes('?') }[T.t];
  if (!ok) fallo(id, `${d}: toca de tipo desconocido "${T.t}"`); else if (!ok()) fallo(id, `${d}: toca imposible o mal definido ${JSON.stringify(T)}`);
};
const ordenes = new Set();
console.log(`Estrategias: ${ESTR.lista.length} (${ESTR.cursos().map(c => c + '.º: ' + ESTR.delCurso(c).length).join(', ')})`);
const nArch = files.filter(f => f.includes('estrategias')).length; if (nArch !== ESTR.lista.length) fallo('carga', `${nArch} archivos pero ${ESTR.lista.length} estrategias (¿id repetido o error al cargar?)`);
for (const e of ESTR.lista) {
  for (const k of ['id', 'orden', 'tri', 'n', 'ic', 'desc', 'truco']) if (e[k] === undefined || e[k] === '') fallo(e.id, `falta ${k}`);
  if (ordenes.has(e.curso + '-' + e.orden)) fallo(e.id, `orden repetido ${e.orden} en ${e.curso}.º`); ordenes.add(e.curso + '-' + e.orden);
  if (e.curso > 1 && !/^[^\p{Extended_Pictographic}]{1,5}$/u.test(e.ic)) fallo(e.id, `ic debe ser texto corto sin emojis («${e.ic}»)`);
  if (e.n.length > 24) fallo(e.id, `nombre largo (${e.n.length} > 24)`);
  if (![1, 2, 3].includes(e.tri)) fallo(e.id, 'tri debe ser 1, 2 o 3');
  if (!Array.isArray(e.tutorial) || e.tutorial.length < 3 || e.tutorial.length > 7) fallo(e.id, 'tutorial: 3-7 pantallas');
  (e.tutorial || []).forEach((s, i) => { if (!s.txt || s.txt.length > 140) fallo(e.id, `tutorial ${i}: txt vacío o > 140`); visOk(e.id, s.vis, `tutorial ${i}`); tocaOk(e.id, s.toca, `tutorial ${i}`); });
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
