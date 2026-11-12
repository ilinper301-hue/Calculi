/* ===== Cuenta de Google (Firebase) y sincronización. Mismo patrón que Lectori y Barri.
   Proyecto compartido «mis-apps-educativas». Firestore: calculo/{uid} (campos meta: ajustes y borrados, y ts) y calculo/{uid}/alu/{id} ({d: JSON del alumno, mt}).
   Fusión: por alumno gana el más reciente (mt); ajustes, el más reciente (gmt); borrados con fecha (del). Solo claves calc.* ===== */
const GLG = '<svg class="glogo" width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
const FBV = '10.12.2', FB_COL = 'calculo', FB_CFG = { apiKey: 'AIzaSyC00dEFMyJ48KM--iClXSFUbbMtoHV3ejc', authDomain: 'mis-apps-educativas.firebaseapp.com', projectId: 'mis-apps-educativas', storageBucket: 'mis-apps-educativas.firebasestorage.app', messagingSenderId: '98830326152', appId: '1:98830326152:web:bd3ff75a1f83ac5fd2c23d' };
let FB = null, FBU = null, SYNC = { busy: false, last: +(localStorage.getItem('calc.sync.t') || 0), err: '', t: null };

function fbLoad() {
  if (window.firebase && firebase.firestore) return Promise.resolve();
  const ld = f => new Promise((ok, ko) => { const x = document.createElement('script'); x.src = `https://www.gstatic.com/firebasejs/${FBV}/${f}`; x.onload = ok; x.onerror = () => ko(Error('No se pudo cargar Firebase (¿sin conexión?)')); document.head.appendChild(x); });
  return ld('firebase-app-compat.js').then(() => Promise.all([ld('firebase-auth-compat.js'), ld('firebase-firestore-compat.js')]));
}
async function fbInit() {
  await fbLoad();
  if (!FB) {
    if (!firebase.apps.length) firebase.initializeApp(FB_CFG);
    FB = { auth: firebase.auth(), db: firebase.firestore() };
    FB.auth.onAuthStateChanged(u => { FBU = u; if (u) syncNow().catch(() => {}); accRefresh(); });
    try { await FB.auth.getRedirectResult(); } catch (e) { SYNC.err = fbErr(e); }
  }
  return FB;
}
async function fbLogin() {
  SYNC.err = '';
  try {
    const f = await fbInit(), pv = new firebase.auth.GoogleAuthProvider(); pv.setCustomParameters({ prompt: 'select_account' });
    try { await f.auth.signInWithPopup(pv); } catch (e) { if (/popup|operation-not-supported/.test(e.code || '')) await f.auth.signInWithRedirect(pv); else throw e; }
  } catch (e) { SYNC.err = fbErr(e); accRefresh(); if (scr === 'wel') toast(SYNC.err); }
}
async function fbLogout() { try { if (FB) await FB.auth.signOut(); } catch (e) {} FBU = null; try { localStorage.removeItem('calc.sync.uid'); } catch (e) {} accRefresh(); }
const fbErr = e => { const c = e && e.code || ''; return c.includes('unauthorized-domain') ? 'Este dominio no está autorizado en Firebase (Authentication › Configuración › Dominios autorizados).' : c.includes('permission-denied') ? 'Firebase rechaza el acceso: revise las reglas de Firestore (docs/firebase.md).' : c.includes('popup-closed') || c.includes('cancelled-popup') ? 'Se cerró la ventana de Google antes de terminar.' : c.includes('network') ? 'Sin conexión. Se sincronizará cuando vuelva internet.' : (e && e.message) || 'Error desconocido'; };

/* Ajustes generales que viajan a la nube (los de este dispositivo, como voz, sonido o tema, no) */
const metaOf = () => { const A = EST.ajustes; return { aj: { pin: A.pin || '', perfil: A.perfil || '', curso: A.curso || 1, abierto: !!A.abierto, reto: A.reto | 0 }, gmt: EST.gmt || 0, del: EST.del || {} }; };
function applyMeta(m) {
  const a = m && m.aj && typeof m.aj === 'object' ? m.aj : {}, A = EST.ajustes;
  if (a.perfil === 'docente' || a.perfil === 'familia') A.perfil = a.perfil;
  if (typeof a.pin === 'string' && /^\d{4}$/.test(a.pin)) A.pin = a.pin;
  if ([1, 2, 3, 4, 5, 6].includes(a.curso)) A.curso = a.curso;
  if (typeof a.abierto === 'boolean') A.abierto = a.abierto;
  if ([0, 200, 500, 1000, 2000].includes(a.reto)) A.reto = a.reto;
  EST.gmt = +m.gmt || 0;
}
/** Sanea lo que llega de la nube (equivale a cleanP de Lectori): pasa por la misma validación que la migración. */
const cleanAlu = o => limpiarAlu(o);
const isBlank = () => !EST.alu.length || EST.alu.every(a => !Object.values(a.e).some(p => p.n || p.tut) && !a.dias.length);
function setLocal(id, o) {
  const i = EST.alu.findIndex(q => q.id === id);
  if (o === null) { if (i >= 0) { EST.alu.splice(i, 1); if (EST.act === id) EST.act = null; } return; }
  if (i >= 0) EST.alu[i] = o; else EST.alu.push(o);
}
const saveRaw = () => { try { localStorage.setItem(KEY, JSON.stringify(EST)); } catch (e) {} };
function syncSoon() { if (!FBU || SYNC.busy || MODO_DOCENTE) return; clearTimeout(SYNC.t); SYNC.t = setTimeout(() => syncNow().catch(() => {}), 15000); }
async function syncNow(force) {
  if (!FBU || !FB || SYNC.busy || MODO_DOCENTE) return;
  SYNC.busy = true; SYNC.err = ''; accRefresh();
  try {
    const u = FBU.uid, mref = FB.db.collection(FB_COL).doc(u), col = mref.collection('alu'), [md, cs] = await Promise.all([mref.get(), col.get()]);
    const R = {}; cs.forEach(d => { try { const o = cleanAlu(JSON.parse(d.data().d)); o.id = d.id; R[d.id] = o; } catch (e) {} });
    const RM = md.exists ? JSON.parse(md.data().meta || '{}') : null, first = localStorage.getItem('calc.sync.uid') !== u, remoteEmpty = !RM && !Object.keys(R).length;
    let mode = 'merge';
    if (first && !remoteEmpty) mode = isBlank() ? 'down' : (force || confirm('Su cuenta ya tiene datos de otro dispositivo.\n\nAceptar: usar los datos de la cuenta (se sustituyen los de este dispositivo).\nCancelar: subir los de este dispositivo a la cuenta (se sustituyen los de la cuenta).')) ? 'down' : 'up';
    const L = {}; EST.alu.forEach(q => { L[q.id] = q; });
    const del = Object.assign({}, mode === 'up' ? {} : RM && RM.del || {}, EST.del || {}), push = {}, kill = [];
    if (mode === 'down') {
      EST.alu = Object.values(R).sort((a, b) => (a.n || '').localeCompare(b.n || '')).slice(0, 60);
      if (!EST.alu.some(a => a.id === EST.act)) EST.act = null;
      if (RM) applyMeta(RM); EST.del = RM && RM.del || {};
    } else {
      if (mode === 'up') Object.keys(R).forEach(id => { if (!L[id]) kill.push(id); });
      new Set([...Object.keys(L), ...(mode === 'up' ? [] : Object.keys(R))]).forEach(id => {
        const l = L[id], r = mode === 'up' ? null : R[id], dt = del[id] || 0;
        if (dt && dt >= Math.max(l ? l.mt || 0 : 0, r ? r.mt || 0 : 0)) { if (r) kill.push(id); if (l) setLocal(id, null); return; }
        if (l && (!r || (l.mt || 0) >= (r.mt || 0))) { if (!r || (l.mt || 0) > (r.mt || 0)) push[id] = l; } else if (r) setLocal(id, r);
      });
      if (RM && mode !== 'up' && (RM.gmt || 0) > (EST.gmt || 0)) applyMeta(RM);
      EST.del = del;
      const b = FB.db.batch();
      Object.entries(push).forEach(([id, o]) => b.set(col.doc(id), { d: JSON.stringify(o), mt: o.mt || 0 }));
      kill.forEach(id => b.delete(col.doc(id)));
      b.set(mref, { meta: JSON.stringify(metaOf()), ts: Date.now() });
      await b.commit();
    }
    localStorage.setItem('calc.sync.uid', u); saveRaw(); SYNC.last = Date.now(); localStorage.setItem('calc.sync.t', SYNC.last);
  } catch (e) { SYNC.err = fbErr(e); }
  finally {
    SYNC.busy = false; accRefresh();
    try {
      if (scr === 'wel' && FBU && EST.alu.length) { localStorage.setItem('calc.wel', '1'); go('inicio'); }
      else if (['inicio', 'mapa', 'logros', 'tz'].includes(scr) && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '')) pintar();
    } catch (e) {}
  }
}

/* ---- Tarjeta «Cuenta» (Zona del tutor › Ajustes) ---- */
function accRefresh() { try { const e = document.getElementById('acc'); if (e) e.outerHTML = accSec(); } catch (e) {} }
function accSec() {
  const ago = SYNC.last ? Math.round((Date.now() - SYNC.last) / 60000) : null, when = ago === null ? 'aún no' : ago < 1 ? 'hace un momento' : ago < 60 ? `hace ${ago} min` : `hace ${Math.round(ago / 60)} h`;
  const er = SYNC.err ? `<p class="note" style="margin:8px 0 0;color:var(--no)">${esc(SYNC.err)}</p>` : '';
  if (!FBU) return `<div id="acc"><div class="gt">Cuenta</div><div class="list" style="padding:14px"><p class="note" style="margin:0 0 10px">Entre con su cuenta de Google para guardar el progreso en la nube y tenerlo igual en todos sus dispositivos.</p><button class="bt ggl" onclick="fbLogin()">${GLG} Entrar con Google</button>${er}</div></div>`;
  return `<div id="acc"><div class="gt">Cuenta</div><div class="list" style="padding:14px"><div class="accu"><span class="av" style="background:var(--ac);color:var(--on)">${esc(((FBU.displayName || FBU.email || 'D')[0] || 'D').toUpperCase())}</span><div><b>${esc(FBU.displayName || 'Docente')}</b><small>${esc(FBU.email || '')}</small></div></div>
  <p class="note" style="margin:10px 0">${SYNC.busy ? 'Sincronizando…' : 'Última sincronización: ' + when}. Se sincroniza sola al usar la app y al cerrarla.</p>${er}
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="bt" onclick="syncNow()"${SYNC.busy ? ' disabled' : ''}>Sincronizar ahora</button><button class="bt sec" onclick="fbLogout()">Cerrar sesión</button></div>
  <p class="note" style="margin:10px 0 0">Los datos se guardan en la nube de forma privada: solo su cuenta puede leerlos.</p></div></div>`;
}
/* ---- Bienvenida: botón «Entrar con Google» ---- */
function welGo() { fbLogin(); }
/* ---- Arranque: si ya había sesión, se reconecta; y se sincroniza al cerrar o ocultar la app ---- */
function cuentaArranque() {
  try { if (localStorage.getItem('calc.sync.uid') && navigator.onLine !== false) fbInit().catch(() => {}); document.addEventListener('visibilitychange', () => { if (document.hidden && FBU && !MODO_DOCENTE) { clearTimeout(SYNC.t); syncNow().catch(() => {}); } }); } catch (e) {}
}
