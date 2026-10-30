// Llama a cada generador miles de veces y mide el tiempo (detecta bucles lentos o infinitos).
//   node tests/estres.js
const fs = require('fs'), path = require('path'), vm = require('vm');
const R = path.join(__dirname, '..', 'src', 'js');
const listar = d => fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(x => x.isDirectory() ? listar(path.join(d, x.name)) : x.name.endsWith('.js') ? [path.join(d, x.name)] : []);
const ctx = { console, window: {}, document: { querySelector: () => null }, localStorage: { getItem: () => null, setItem() {} }, matchMedia: () => ({ matches: false }), navigator: {}, location: {}, setTimeout, Math, Date, JSON };
vm.createContext(ctx);
for (const f of ['00-util.js', '10-datos.js', '20-visual.js', '30-motor.js'].map(f => path.join(R, f)).concat(listar(path.join(R, 'estrategias')))) vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
vm.runInContext('globalThis.ESTR=ESTR', ctx);
let malos = 0;
for (const e of ctx.ESTR.lista) {
  process.stdout.write(`${e.id} … `);
  const t0 = Date.now();
  for (let k = 0; k < 2000; k++) { e.guiada(); e.item(1); e.item(2); e.item(3); if (e.juego && e.juego.pares) e.juego.pares(); }
  const ms = Date.now() - t0; console.log(ms + ' ms'); if (ms > 1500) { malos++; console.log('   ⚠ lento'); }
}
console.log(malos ? `${malos} lentos` : 'Sin bucles lentos ✓');
