/* ===== Repaso por días, errores frecuentes, tablas, problemas, prueba inicial y reto de clase ===== */

/* ---------- Repaso espaciado (cajas de Leitner) ----------
   Cada truco practicado tiene una «caja» (0-5). Si sale bien, sube de caja y vuelve más tarde; si sale mal, vuelve mañana. */
const INTERVALOS = [1, 1, 3, 7, 15, 30];
const masDias = (n, d = new Date()) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
function agendar(a, id, bien) {
  if (!a || MODO_DOCENTE) return; const p = progreso(a, id);
  p.caja = bien ? Math.min(5, (p.caja || 0) + 1) : Math.max(0, Math.min(1, (p.caja || 0) - 1));
  p.prox = masDias(INTERVALOS[p.caja]);
}
/** Trucos que tocan repasar hoy (ya practicados y con la fecha cumplida). */
const tocaRepasar = a => a ? ESTR.lista.filter(e => { const p = a.e[e.id]; return p && p.n > 0 && p.prox && p.prox <= hoy() && e.curso <= cursoDe(a); }) : [];

/* ---------- Errores frecuentes ---------- */
function registrarError(a, id, pista) {
  if (!a || MODO_DOCENTE || !pista) return;
  const m = a.err[id] || (a.err[id] = {}); m[pista] = (m[pista] || 0) + 1;
}
/** Errores de un grupo de alumnos: [{id, truco, pista, alumnos, veces}] ordenados por nº de alumnos. */
function erroresClase(alumnos) {
  const m = new Map();
  for (const a of alumnos) for (const [id, ps] of Object.entries(a.err || {})) for (const [pista, n] of Object.entries(ps)) {
    const k = id + '|' + pista, x = m.get(k) || { id, truco: (ESTR.get(id) || {}).n || id, pista, alumnos: [], veces: 0 };
    x.alumnos.push(a.n); x.veces += n; m.set(k, x);
  }
  return [...m.values()].sort((x, y) => y.alumnos.length - x.alumnos.length || y.veces - x.veces);
}

/* ---------- Tablas de multiplicar: dominio de cada multiplicación ---------- */
const claveTab = (x, y) => `${Math.min(x, y)}x${Math.max(x, y)}`;
function registrarTabla(a, q, ok) {
  const m = /^(\d{1,2}) × (\d{1,2}) = \?$/.exec(q); if (!a || !m || MODO_DOCENTE) return;
  const x = +m[1], y = +m[2]; if (x < 1 || y < 1 || x > 10 || y > 10) return;
  const k = claveTab(x, y), h = a.tab[k] || (a.tab[k] = []); h.push(ok ? 1 : 0); a.tab[k] = h.slice(-8);
}
function nivelTab(a, x, y) { const h = (a.tab || {})[claveTab(x, y)] || []; if (h.length < 2) return 'g'; const u = h.slice(-5), p = u.reduce((s, v) => s + v, 0) / u.length; return p >= .8 ? 'v' : p >= .5 ? 'a' : 'r'; }
let TABSEL = 0; // 0 = todas; n = solo la tabla del n
function itemTabla(a, prev) {
  const cand = [];
  for (let x = 2; x <= 10; x++) for (let y = 1; y <= 10; y++) {
    if (TABSEL && x !== TABSEL) continue;
    const nv = nivelTab(a, x, y), peso = { r: 6, a: 4, g: 3, v: 1 }[nv];
    for (let k = 0; k < peso; k++) cand.push([x, y]);
  }
  let x, y; for (let k = 0; k < 10; k++) { [x, y] = pick(cand); if (!prev || prev.q !== `${x} × ${y} = ?`) break; }
  if (rnd(0, 1)) [x, y] = [y, x];
  const r = x * y, vis = { t: 'matriz', filas: x, cols: y };
  const errores = [[r + x, `Eso es ${x} × ${y + 1}. Una vez menos.`], [r - x, `Eso es ${x} × ${y - 1}. Una vez más.`], [r + y, `Eso es ${x + 1} × ${y}.`], [x + y, 'Has sumado. Hay que multiplicar.']].filter(e => e[0] > 0 && e[0] !== r);
  return Object.assign({ id: 'tablas', nivel: 3 }, prepararItem({ q: `${x} × ${y} = ?`, r, vis, errores }, 3));
}
SC.tablas = () => {
  const a = alumno(), N = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const resumen = { v: 0, a: 0, r: 0, g: 0 }; for (const x of N) for (const y of N) resumen[nivelTab(a, x, y)]++;
  return `${atras('Inicio', "go('inicio')", 'home')}<h1 class="ttl">Tablas de multiplicar</h1>
  <p class="mut" style="margin:0">Cada casilla es una multiplicación. Verde: la sabes. Ámbar: casi. Rojo: a practicar. Toca un número para practicar su tabla.</p>
  <div class="mtab"><span></span>${N.map(y => `<b>${y}</b>`).join('')}${N.map(x => `<button onclick="TABSEL=${x};empezar('tablas')" aria-label="Practicar la tabla del ${x}">${x}</button>${N.map(y => `<i class="${nivelTab(a, x, y)}" title="${x} × ${y}"></i>`).join('')}`).join('')}</div>
  <p class="note" style="font-family:var(--fi)"><i class="sem v"></i> ${resumen.v} sabidas · <i class="sem a"></i> ${resumen.a} casi · <i class="sem r"></i> ${resumen.r} a practicar · <i class="sem g"></i> ${resumen.g} sin probar</p>
  <button class="bt w" onclick="TABSEL=0;empezar('tablas')">${ico('target', 20)}Practicar las que más fallo</button>`;
};

/* ---------- Problemas cortos con el truco ----------
   Se construyen a partir de la operación del truco (a + b, a − b, a × b, a : b, % de, fracción de…) con plantillas de la vida diaria. */
const COSAS = [['cromos', 'm'], ['canicas', 'f'], ['pegatinas', 'f'], ['galletas', 'f'], ['cuentos', 'm'], ['lápices', 'm'], ['conchas', 'f'], ['piedrecitas', 'f'], ['coches de juguete', 'm'], ['flores', 'f'], ['caramelos', 'm'], ['botones', 'm']];
const NOMBRES = ['Lucía', 'Mateo', 'Sara', 'Hugo', 'Martina', 'Leo', 'Vega', 'Daniel', 'Alba', 'Marco', 'Noa', 'Pablo'];
function problemaDe(e, nivel) {
  const it = e.item(nivel); if (!it || typeof it.q !== 'string') return null;
  let q = it.q.replace(/\s+/g, ' ').replace(/[–-]/g, '−').trim(); if (!q.includes('?')) q += ' = ?';
  const N = '(\\d+(?:[.,]\\d+)*)';
  const nm = t => num(t), dec = !Number.isInteger(it.r) || /,/.test(q);
  const [cosa, g] = pick(COSAS), quien = pick(NOMBRES), cuantos = g === 'f' ? 'Cuántas' : 'Cuántos', otro = pick(NOMBRES.filter(n => n !== quien));
  let txt = null, ud = dec ? '€' : cosa, m;
  const R = (re) => (m = new RegExp('^' + re + '$').exec(q)) && m.slice(1).every(x => nm(x) > 0);
  if (R(`${N} \\+ ${N} = \\?`)) { const [a, b] = [m[1], m[2]];
    txt = dec ? `Un cuaderno cuesta ${a} € y un lápiz ${b} €. ¿Cuánto cuestan juntos?` : pick([`${quien} tiene ${a} ${cosa}. ${otro} le da ${b} más. ¿${cuantos} ${cosa} tiene ahora?`, `En una caja hay ${a} ${cosa} y en otra ${b}. ¿${cuantos} hay en total?`]); }
  else if (R(`${N} − ${N} = \\?`)) { const [a, b] = [m[1], m[2]];
    txt = dec ? `${quien} tiene ${a} € y gasta ${b} €. ¿Cuánto dinero le queda?` : pick([`${quien} tiene ${a} ${cosa} y regala ${b}. ¿${cuantos} le quedan?`, `Había ${a} ${cosa} en la mesa. Se llevan ${b}. ¿${cuantos} quedan?`]); }
  else if (R(`${N} \\+ \\? = ${N}`) || R(`\\? \\+ ${N} = ${N}`) || R(`${N} = ${N} \\+ \\?`)) { const v = m.slice(1).map(nm), tot = Math.max(...v), a = Math.min(...v);
    txt = dec ? `${quien} tiene ${fmt(a)} € y quiere un libro de ${fmt(tot)} €. ¿Cuánto dinero le falta?` : `${quien} tiene ${fmt(a)} ${cosa}. Quiere tener ${fmt(tot)}. ¿${cuantos} le faltan?`; }
  else if (R(`${N} × ${N} = \\?`)) { let [a, b] = [m[1], m[2]];
    if (dec) { if (!Number.isInteger(nm(a)) && Number.isInteger(nm(b))) [a, b] = [b, a]; if (!Number.isInteger(nm(a)) || nm(a) > 60 || nm(a) < 2) return null;
      txt = `Una entrada cuesta ${b} €. ¿Cuánto cuestan ${a} entradas?`; }
    else { if (nm(a) > 30 && nm(b) <= 30) [a, b] = [b, a]; txt = pick([`Hay ${a} cajas con ${b} ${cosa} cada una. ¿${cuantos} ${cosa} hay en total?`, `${quien} hace ${a} montones de ${b} ${cosa}. ¿${cuantos} ${cosa} tiene en total?`]); } }
  else if (R(`${N} : ${N} = \\?`)) { const [a, b] = [m[1], m[2]];
    if (dec || nm(b) > 20 || !Number.isInteger(nm(b))) return null;
    txt = `${quien} reparte ${a} ${cosa} entre ${b} amigos a partes iguales. ¿${cuantos} le tocan a cada uno?`; }
  else if (R(`${N} % de ${N} = \\?`)) { const [p, t] = [m[1], m[2]]; ud = '€';
    txt = `Una mochila cuesta ${t} € y tiene un ${p} % de descuento. ¿Cuántos euros te descuentan?`; }
  else if (R(`(\\d+)/(\\d+) de ${N} = \\?`)) { const [n, d, t] = [m[1], m[2], m[3]];
    txt = `${quien} tiene ${t} ${cosa} y regala ${n}/${d}. ¿${cuantos} regala?`; }
  else return null;
  return Object.assign({}, it, { txt, q: `? ${ud}`, voz: txt, visSiempre: false });
}
const tieneProblemas = e => { for (let k = 0; k < 6; k++) if (problemaDe(e, 2)) return true; return false; };
function itemProblema(e, prev) {
  let it = null;
  for (let k = 0; k < 20 && !it; k++) { const p = problemaDe(e, k < 10 ? 2 : 1); if (p && (!prev || p.txt !== prev.txt)) it = p; }
  return Object.assign({ id: e.id, nivel: 2 }, prepararItem(it || { txt: 'Sin problemas para este truco', q: '?', r: 0 }, 2));
}

/* ---------- Prueba inicial: decide dónde empieza cada alumno ----------
   Dos operaciones de cada truco de su curso, en orden y sin ayudas. Si acierta las dos, ese truco queda superado (1 estrella).
   Termina al fallar dos trucos seguidos (o al acabar el curso). */
function itemDiag() {
  const e = SES.lista[SES.k]; return Object.assign({ id: e.id, nivel: 2, diag: true }, prepararItem(e.item(2), 2));
}
function avanzarDiag(bien) {
  SES.cuenta.push(bien);
  if (SES.cuenta.length < 2 && bien) return itemDiag();          // segunda pregunta del mismo truco
  const ok = SES.cuenta.length === 2 && SES.cuenta.every(Boolean);
  SES.res.push({ id: SES.lista[SES.k].id, ok }); SES.fallos2 = ok ? 0 : (SES.fallos2 || 0) + 1; SES.cuenta = []; SES.k++;
  if (SES.fallos2 >= 2 || SES.k >= SES.lista.length) return null;
  return itemDiag();
}
function terminarDiag(a) {
  const sup = SES.res.filter(x => x.ok).map(x => x.id);
  if (!MODO_DOCENTE) { for (const id of sup) { const p = progreso(a, id); if (!p.est) p.est = 1; p.tut = true; if (!p.n) p.n = 1; p.h = (p.h || []).concat([1, 1]).slice(-20); agendar(a, id, true); } a.diag = hoy(); a.mt = Date.now(); guardar(); }
  const sig = ESTR.delCurso(cursoDe(a)).find(e => !sup.includes(e.id));
  RES = { tipo: 'diag', sup, sig: sig && sig.id };
  SON.fin(); go('res');
}
function resDiag(r) {
  const s = ESTR.get(r.sig);
  return `<div class="res pop">${mascota(130, 'feliz')}<h2>¡Prueba terminada!</h2>
  <p class="mut" style="margin:0;font-size:1.1rem">${r.sup.length ? `Ya sabes ${r.sup.length} ${r.sup.length === 1 ? 'truco' : 'trucos'}: ${esc(r.sup.map(id => ESTR.get(id).n).join(', '))}.` : 'Empezamos desde el principio. ¡Vas a aprender mucho!'}</p>
  ${s ? `<div class="bub" style="text-align:left">Empiezas por: <b>${esc(s.n)}</b></div>` : '<div class="bub">¡Ya dominas todos los trucos de tu curso!</div>'}</div>
  <div class="acts"><button class="bt" onclick="${s ? `EID='${s.id}';TUT=0;go('tut')` : "go('inicio')"}">${s ? 'Aprender ese truco' : 'Seguir'}${ico('chev', 20, 2.4)}</button></div>`;
}

/* ---------- Reto de la clase: meta de aciertos de la semana entre todos ---------- */
function retoClase() {
  const meta = EST.ajustes.reto | 0; if (!meta) return null;
  const lunes = new Date(); lunes.setDate(lunes.getDate() - ((lunes.getDay() + 6) % 7)); const desde = lunes.toISOString().slice(0, 10);
  const hechos = EST.alu.reduce((s, a) => s + Object.entries(a.aci || {}).filter(([d]) => d >= desde).reduce((t, [, n]) => t + n, 0), 0);
  return { meta, hechos, pc: Math.min(100, Math.round((hechos / meta) * 100)) };
}
const retoHTML = (grande = false) => { const r = retoClase(); if (!r) return '';
  return `<div class="reto${grande ? ' grande' : ''}"><div class="reto-h">${ico('users', grande ? 26 : 18)}<b>Reto de la clase</b><span>${r.hechos} / ${r.meta} aciertos</span></div><div class="pg"><i style="width:${r.pc}%"></i></div>${r.hechos >= r.meta ? '<small>¡Reto conseguido! 🎉</small>' : `<small>Entre todos, esta semana. ¡Faltan ${r.meta - r.hechos}!</small>`}</div>`; };
