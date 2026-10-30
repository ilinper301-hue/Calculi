/* ===== Datos guardados (solo claves con prefijo calc.: comparte dominio con Lectori y Barri) ===== */
const KEY = 'calc.v1', VERSION_DATOS = 1;
const AVATARES = [['🦊','#EA580C'],['🐢','#15803D'],['🐼','#475569'],['🦁','#B45309'],['🐸','#16A34A'],['🐙','#9333EA'],['🐳','#2563EB'],['🦉','#78350F'],['🐝','#CA8A04'],['🐞','#DC2626'],['🦄','#DB2777'],['🐨','#64748B']];

/** Estado por defecto. Cada alumno: {id,n,av,mt,e:{[idEstrategia]:{tut,est,h,ult,n}},dias} */
function estadoVacio() { return { v: VERSION_DATOS, alu: [], act: null, ajustes: { voz: true, sonido: true, tema: 'auto', pin: '' }, gmt: 0 }; }

const ss = (s, n) => String(s ?? '').replace(/[<>&"'`]/g, '').trim().slice(0, n);
function limpiarAlu(a) {
  a = a && typeof a === 'object' ? a : {};
  const e = {};
  for (const [k, v] of Object.entries(a.e && typeof a.e === 'object' ? a.e : {})) {
    if (!/^[a-z0-9]{2,20}$/.test(k) || !v || typeof v !== 'object') continue;
    e[k] = { tut: !!v.tut, est: Math.max(0, Math.min(3, v.est | 0)), h: (Array.isArray(v.h) ? v.h : []).map(x => x ? 1 : 0).slice(-20), ult: String(v.ult || '').slice(0, 10), n: Math.max(0, v.n | 0) };
  }
  return { id: /^[a-z0-9]{6,20}$/.test(a.id || '') ? a.id : nid(), n: ss(a.n, 20) || 'Alumno', av: Math.max(0, Math.min(AVATARES.length - 1, a.av | 0)), mt: +a.mt > 0 ? +a.mt : 0, e, dias: (Array.isArray(a.dias) ? a.dias : []).filter(d => /^\d{4}-\d\d-\d\d$/.test(d)).slice(-400) };
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
function guardar() { if (MODO_DOCENTE) return; try { localStorage.setItem(KEY, JSON.stringify(EST)); } catch (e) {} }

/** Modo Docente: todo abierto, no se guarda nada (como en Lectori y Barri). */
let MODO_DOCENTE = false;
const ALU_DOCENTE = limpiarAlu({ id: 'docente00', n: 'Docente', av: 5 });
const alumno = () => MODO_DOCENTE ? ALU_DOCENTE : EST.alu.find(a => a.id === EST.act) || null;

function crearAlumno(nombre, av) { const a = limpiarAlu({ n: nombre, av, mt: Date.now() }); EST.alu.push(a); EST.act = a.id; guardar(); return a; }
function progreso(a, id) { return a.e[id] || (a.e[id] = { tut: false, est: 0, h: [], ult: '', n: 0 }); }

/** Registra un resultado (1 acierto sin ayuda, 0 fallo o con ayuda) para el dominio y el repaso. */
function registrar(id, ok) {
  const a = alumno(); if (!a) return;
  const p = progreso(a, id); p.h.push(ok ? 1 : 0); p.h = p.h.slice(-20); p.ult = hoy(); p.n++;
  if (!a.dias.includes(hoy())) a.dias.push(hoy());
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
