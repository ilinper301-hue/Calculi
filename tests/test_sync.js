// Prueba de la fusión de syncNow (src/js/52-cuenta.js) con dos «dispositivos» y un Firestore simulado. Sin red.
const fs = require('fs'), vm = require('vm'), assert = require('assert');
const src = f => fs.readFileSync(__dirname + '/../src/js/' + f, 'utf8');
const nube = {}; // ruta -> datos
const ref = p => ({
  get: async () => ({ exists: p in nube, data: () => nube[p] }),
  collection: n => ({ doc: id => ref(p + '/' + n + '/' + id), get: async () => { const pre = p + '/' + n + '/', ds = Object.keys(nube).filter(k => k.startsWith(pre)).map(k => ({ id: k.slice(pre.length), data: () => nube[k] })); return { forEach: f => ds.forEach(f) }; } }),
  _p: p });
const dbStub = { collection: n => ({ doc: id => ref(n + '/' + id) }), batch: () => { const ops = []; return { set: (r, d) => ops.push(() => nube[r._p] = d), delete: r => ops.push(() => delete nube[r._p]), commit: async () => ops.forEach(o => o()) }; } };
function dispositivo(confirmar = true) {
  const ls = {}, ctx = { localStorage: { getItem: k => k in ls ? ls[k] : null, setItem: (k, v) => ls[k] = String(v), removeItem: k => delete ls[k] }, console, Date, JSON, Math, Object, Set, Array, String, Number, RegExp, Error, Promise, setTimeout, clearTimeout,
    document: { getElementById: () => null, activeElement: {}, addEventListener() {} }, navigator: {}, window: {}, nid: () => Math.random().toString(36).slice(2, 12), esc: s => s, toast() {}, go() {}, pintar() {}, scr: 'inicio', confirm: () => confirmar };
  vm.createContext(ctx);
  vm.runInContext(src('10-datos.js') + '\n' + src('52-cuenta.js') + '\nthis.T={get EST(){return EST},set EST(v){EST=v},guardar,syncNow,borrar(id){EST.alu=EST.alu.filter(x=>x.id!==id);EST.del[id]=Date.now()},ponerFB(){FB={db:DB};FBU={uid:"u1"}},crear:crearAlumno,KEY};', ctx);
  ctx.DB = dbStub; ctx.T.ponerFB(); return { ctx, T: ctx.T, ls };
}
const esperar = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const T0 = Date.now(), A = dispositivo(), B = dispositivo();
  // A crea dos alumnos y sincroniza (nube vacía: sube)
  const x = A.T.crear('Ana', 0, 1), y = A.T.crear('Beto', 1, 1); await A.T.syncNow();
  assert.strictEqual(Object.keys(nube).filter(k => k.includes('/alu/')).length, 2, 'sube 2 alumnos');
  // B está en blanco: primer inicio, baja sin preguntar
  await B.T.syncNow(); assert.strictEqual(B.T.EST.alu.map(a => a.n).sort().join(), 'Ana,Beto', 'B baja los datos');
  // A modifica Ana (mt 1000), B modifica Beto y Ana (Ana más antiguo)
  const ana = e => e.alu.find(a => a.id === x.id), beto = e => e.alu.find(a => a.id === y.id);
  ana(A.T.EST).n = 'Ana A'; ana(A.T.EST).mt = T0 + 5; await A.T.syncNow();
  ana(B.T.EST).n = 'Ana B'; ana(B.T.EST).mt = T0 + 2; beto(B.T.EST).n = 'Beto B'; beto(B.T.EST).mt = T0 + 9;
  await B.T.syncNow(); // gana el mt más reciente por alumno
  assert.strictEqual(ana(B.T.EST).n, 'Ana A', 'Ana: gana A (más reciente)'); assert.strictEqual(beto(B.T.EST).n, 'Beto B', 'Beto: gana B');
  await A.T.syncNow(); assert.strictEqual(beto(A.T.EST).n, 'Beto B', 'A recibe a Beto B'); assert.strictEqual(ana(A.T.EST).n, 'Ana A');
  // B borra a Beto: se registra en del, desaparece en la nube y en A
  await esperar(30); B.T.borrar(beto(B.T.EST).id); await B.T.syncNow();
  assert.ok(!Object.keys(nube).some(k => k.includes('/alu/' + y.id)), 'Beto borrado de la nube');
  await A.T.syncNow(); assert.strictEqual(A.T.EST.alu.map(a => a.n).join(), 'Ana A', 'A también lo pierde'); assert.ok(A.T.EST.del[y.id] > 0);
  // Un alumno borrado no resucita aunque A lo tenga viejo: simulamos que A lo recrea con mt anterior al borrado
  A.T.EST.alu.push(Object.assign({}, x, { id: y.id, n: 'Beto', mt: 1 })); await A.T.syncNow(); assert.ok(!A.T.EST.alu.some(a => a.id === y.id), 'no resucita');
  // Ajustes: gana el gmt más reciente
  A.T.EST.ajustes.curso = 4; A.T.EST.gmt = Date.now() + 1; await A.T.syncNow(); await B.T.syncNow(); assert.strictEqual(B.T.EST.ajustes.curso, 4, 'ajustes por gmt');
  // Primer inicio con datos locales y remotos: confirm elige (aceptar = bajar, cancelar = subir)
  const C = dispositivo(false); const lo = C.T.crear('Local', 2, 1); lo.dias.push('2026-11-01'); await C.T.syncNow();
  assert.deepStrictEqual(Object.keys(nube).filter(k => k.includes('/alu/')).length, 1, 'cancelar: sube lo local y sustituye la nube');
  assert.ok(Object.values(nube).some(v => v.d && JSON.parse(v.d).n === 'Local'));
  // Solo claves calc.* y nada de datos del modo docente
  assert.ok(Object.keys(C.ls).every(k => k.startsWith('calc.')), 'claves calc.*: ' + Object.keys(C.ls));
  console.log('Sincronización: todo correcto ✓');
})().catch(e => { console.error('FALLO', e); process.exit(1); });
