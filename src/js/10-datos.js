/* ===== Datos guardados (solo claves con prefijo calc.: comparte dominio con Lectori y Barri) ===== */
const KEY = 'calc.v1', VERSION_DATOS = 1;
/* Avatares: animalitos sobre un color suave (30 distintos para que cada niño de la clase tenga el suyo) */
const AVATARES = [['🦊','#FED7AA'],['🐢','#BBF7D0'],['🐼','#E2E8F0'],['🦁','#FDE68A'],['🐸','#D9F99D'],['🐙','#F5D0FE'],['🐳','#BAE6FD'],['🦉','#E7D3B5'],
  ['🐝','#FEF08A'],['🐞','#FECACA'],['🦄','#FBCFE8'],['🐨','#CBD5E1'],['🐶','#FDE2C4'],['🐱','#FFE4B5'],['🐰','#FCE7F3'],['🐻','#E8CBA8'],
  ['🐯','#FED7AA'],['🐷','#FBCFE8'],['🐮','#E5E7EB'],['🐵','#E7D3B5'],['🐧','#C7D2FE'],['🐤','#FEF3C7'],['🦋','#BFDBFE'],['🐬','#A5F3FC'],
  ['🦒','#FDE68A'],['🦓','#E5E7EB'],['🐘','#CBD5E1'],['🦔','#E7D3B5'],['🐿️','#FED7AA'],['🦜','#BBF7D0']];
/** Primer animal que no tiene ningún alumno (si están todos, se repite por orden). */
function avLibre() { const usados = new Set(EST.alu.map(a => a.av)); for (let i = 0; i < AVATARES.length; i++) if (!usados.has(i)) return i; return EST.alu.length % AVATARES.length; }

/** Estado por defecto. Cada alumno: {id,n,av,mt,e:{[idEstrategia]:{tut,est,h,ult,n}},dias} */
function estadoVacio() { return { v: VERSION_DATOS, alu: [], act: null, ajustes: { voz: true, sonido: true, tema: 'auto', pin: '', perfil: '', abierto: false, curso: 1, dalton: false, reto: 0 }, gmt: 0 }; }

const limpiarDias = o => Object.fromEntries(Object.entries(o && typeof o === 'object' ? o : {}).filter(([d, n]) => /^\d{4}-\d\d-\d\d$/.test(d) && n > 0).sort().slice(-90).map(([d, n]) => [d, Math.min(9999, n | 0)]));
const limpiarErr = o => Object.fromEntries(Object.entries(o && typeof o === 'object' ? o : {}).filter(([k]) => /^[a-z0-9]{2,20}$/.test(k)).map(([k, v]) => [k, Object.fromEntries(Object.entries(v && typeof v === 'object' ? v : {}).filter(([t, n]) => t.length <= 100 && n > 0).sort((x, y) => y[1] - x[1]).slice(0, 8).map(([t, n]) => [t, Math.min(9999, n | 0)]))]));
const ss = (s, n) => String(s ?? '').replace(/[<>&"'`]/g, '').trim().slice(0, n);
function limpiarAlu(a) {
  a = a && typeof a === 'object' ? a : {};
  const e = {};
  for (const [k, v] of Object.entries(a.e && typeof a.e === 'object' ? a.e : {})) {
    if (!/^[a-z0-9]{2,20}$/.test(k) || !v || typeof v !== 'object') continue;
    e[k] = { tut: !!v.tut, est: Math.max(0, Math.min(3, v.est | 0)), h: (Array.isArray(v.h) ? v.h : []).map(x => x ? 1 : 0).slice(-20), ult: String(v.ult || '').slice(0, 10), n: Math.max(0, v.n | 0),
      /* repaso espaciado: caja 0-5 y fecha del próximo repaso */ caja: Math.max(0, Math.min(5, v.caja | 0)), prox: /^\d{4}-\d\d-\d\d$/.test(v.prox || '') ? v.prox : '' };
  }
  return { id: /^[a-z0-9]{6,20}$/.test(a.id || '') ? a.id : nid(), n: ss(a.n, 20) || 'Alumno', curso: [1, 2, 3, 4, 5, 6].includes(a.curso) ? a.curso : 1, av: Math.max(0, Math.min(AVATARES.length - 1, a.av | 0)), mt: +a.mt > 0 ? +a.mt : 0, e, dias: (Array.isArray(a.dias) ? a.dias : []).filter(d => /^\d{4}-\d\d-\d\d$/.test(d)).slice(-400),
    /* cálculo diario: mejor marca y aciertos por día */ diario: { mejor: Math.max(0, (a.diario || {}).mejor | 0), d: Object.fromEntries(Object.entries((a.diario || {}).d || {}).filter(([d]) => /^\d{4}-\d\d-\d\d$/.test(d)).sort().slice(-60).map(([d, n]) => [d, Math.max(0, n | 0)])) },
    /* aciertos por día (reto de clase) */ aci: limpiarDias(a.aci),
    /* errores típicos: {truco: {pista: veces}} */ err: limpiarErr(a.err),
    /* tablas de multiplicar: {'7x8': [1,0,1…]} */ tab: Object.fromEntries(Object.entries(a.tab && typeof a.tab === 'object' ? a.tab : {}).filter(([k, v]) => /^\d{1,2}x\d{1,2}$/.test(k) && Array.isArray(v)).map(([k, v]) => [k, v.map(x => x ? 1 : 0).slice(-8)])),
    /* fecha de la prueba inicial */ diag: /^\d{4}-\d\d-\d\d$/.test(a.diag || '') ? a.diag : '',
    /* ejercicios por día (para la Zona del tutor) */ dia: Object.fromEntries(Object.entries(a.dia && typeof a.dia === 'object' ? a.dia : {}).filter(([d, n]) => /^\d{4}-\d\d-\d\d$/.test(d) && n > 0).sort().slice(-90).map(([d, n]) => [d, Math.min(9999, n | 0)])) };
}
/** Migraciones: nunca se pierde el progreso. Añadir aquí un paso por cada cambio de VERSION_DATOS. */
function migrar(d) {
  if (!d || typeof d !== 'object') return estadoVacio();
  const base = estadoVacio();
  const out = { v: VERSION_DATOS, alu: (Array.isArray(d.alu) ? d.alu : []).map(limpiarAlu).slice(0, 60), act: d.act || null, ajustes: Object.assign(base.ajustes, d.ajustes || {}), gmt: +d.gmt || 0 };
  if (!out.alu.some(a => a.id === out.act)) out.act = null;
  return out;
}
let EST = estadoVacio();
function cargar() { try { EST = migrar(JSON.parse(localStorage.getItem(KEY) || 'null')); } catch (e) { EST = estadoVacio(); } }
let tPub = null;
function guardar() { if (MODO_DOCENTE) return; try { localStorage.setItem(KEY, JSON.stringify(EST)); } catch (e) {} clearTimeout(tPub); tPub = setTimeout(() => typeof publicarTabula === 'function' && publicarTabula(), 2000); }

/** Modo Docente: todo abierto, no se guarda nada (como en Lectori y Barri). */
let MODO_DOCENTE = false;
const ALU_DOCENTE = limpiarAlu({ id: 'docente00', n: 'Docente', av: 5 });
const alumno = () => MODO_DOCENTE ? ALU_DOCENTE : EST.alu.find(a => a.id === EST.act) || null;

function crearAlumno(nombre, av, curso) { const a = limpiarAlu({ n: nombre, av, curso: curso || EST.ajustes.curso || 1, mt: Date.now() }); EST.alu.push(a); EST.act = a.id; guardar(); return a; }
function progreso(a, id) { return a.e[id] || (a.e[id] = { tut: false, est: 0, h: [], ult: '', n: 0, caja: 0, prox: '' }); }

/** Registra un resultado (1 acierto sin ayuda, 0 fallo o con ayuda) para el dominio y el repaso. */
function registrar(id, ok) {
  const a = alumno(); if (!a) return;
  const p = progreso(a, id); p.h.push(ok ? 1 : 0); p.h = p.h.slice(-20); p.ult = hoy(); p.n++;
  if (ok) a.aci[hoy()] = (a.aci[hoy()] || 0) + 1;
  if (!a.dias.includes(hoy())) a.dias.push(hoy());
  a.dia[hoy()] = (a.dia[hoy()] || 0) + 1;
  a.mt = Date.now(); guardar();
}
/** Dominio 0..1 con los últimos 10 resultados; null si aún hay pocos datos. */
function dominio(a, id) { const h = (a.e[id] || {}).h || []; if (h.length < 5) return null; const u = h.slice(-10); return u.reduce((s, x) => s + x, 0) / u.length; }
/** Semáforo: v (≥80 %), a (≥50 %), r (<50 %), g (sin datos). */
function semaforo(a, id) { const d = dominio(a, id); return d === null ? 'g' : d >= .8 ? 'v' : d >= .5 ? 'a' : 'r'; }

/** Importar alumnos de Lectori (ar2) y Barri (barri.v1) del mismo dispositivo: solo lectura. */
function alumnosDeOtrasApps() {
  const out = [];
  try { const L = JSON.parse(localStorage.getItem('ar2') || 'null'); (L && Array.isArray(L.ps) ? L.ps : []).forEach(p => p && p.n && out.push({ n: ss(p.n, 20), de: 'Lectori' })); } catch (e) {}
  try { const B = JSON.parse(localStorage.getItem('barri.v1') || 'null'), pr = B && (B.profs || B.stu || {}); Object.values(pr && typeof pr === 'object' ? pr : {}).forEach(p => p && p.name && out.push({ n: ss(p.name, 20), de: 'Barri' })); } catch (e) {}
  const ya = new Set(EST.alu.map(a => a.n.toLowerCase())), vistos = new Set();
  return out.filter(x => { const k = x.n.toLowerCase(); if (ya.has(k) || vistos.has(k)) return false; vistos.add(k); return true; });
}
