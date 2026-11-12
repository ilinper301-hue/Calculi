/* ===== Navegación, cabecera y pantallas de inicio ===== */
let NUEVO_AV = null, VCURSO = 1, scr = 'inicio', EID = null, SES = null, TUT = 0, RES = null, JG = null, WEL = 0, NUEVO = '';
const SC = {};
const est = () => ESTR.get(EID);
const decir = t => VOZ.decir(t);

function temaOscuro() { const t = EST.ajustes.tema; return t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches); }
function aplicarTema() {
  document.documentElement.dataset.theme = temaOscuro() ? 'dark' : 'light';
  // Barras del sistema (arriba y abajo en el móvil) del mismo color que el fondo: así no se ven bandas.
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#F6F7FB';
  let m = document.querySelector('meta[name="theme-color"]'); if (!m) { m = document.createElement('meta'); m.name = 'theme-color'; document.head.appendChild(m); }
  m.content = bg; document.body.style.background = bg;
}
function cambiarTema() { EST.ajustes.tema = temaOscuro() ? 'light' : 'dark'; guardar(); pintar(); }
function go(s) { scr = s; VOZ.callar(); pintar(); window.scrollTo(0, 0); }
function pintar() { aplicarTema(); aplicarDalton(); const A = $('#app'); A.innerHTML = SC[scr](); A.dataset.sc = scr; }
function toast(t) { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }

const colorAv = a => (AVATARES[a.av] || AVATARES[0])[1];
const avatar = (a, extra = '') => `<span class="av ani" style="background:${colorAv(a)}" ${extra}>${(AVATARES[a.av] || AVATARES[0])[0]}</span>`;
/** Selector de animalitos. act = función que recibe el índice. */
const elegirAnimal = (sel, act) => `<div class="animales">${AVATARES.map(([e, c], i) => `<button class="${i === sel ? 'on' : ''}" style="background:${c}" onclick="${act}(${i})" aria-label="Animal ${i + 1}">${e}</button>`).join('')}</div>`;
const totalEstrellas = a => Object.values(a.e).reduce((s, p) => s + (p.est || 0), 0);
const estrellasHTML = (n, max = 3, t = 16) => Array.from({ length: max }, (_, i) => `<span class="${i < n ? '' : 'off'}">${ico(i < n ? 'star' : 'starO', t, 2)}</span>`).join('');

/** Cabecera común: logo + nombre · avatar, estrellas, tema */
function cabecera() {
  const a = alumno();
  const der = MODO_DOCENTE
    ? `<button class="pill" style="background:var(--md);color:#fff" onclick="salirDocente()">${ico('grad', 18)} Salir</button>`
    : a ? `<button onclick="go('quien')" aria-label="Cambiar de alumno">${avatar(a)}</button><span class="pill">${ico('star', 18)}${totalEstrellas(a)}</span>` : '';
  return `<div class="hd"><div class="brand">${logoMini(40)}<span class="wm">Calculi</span></div><div class="hr">${der}
  <button class="rnd" onclick="cambiarTema()" aria-label="Cambiar tema">${ico(temaOscuro() ? 'sun' : 'moon', 20)}</button></div></div>`;
}
const nomCurso = c => `${c}.º`;
/** Fila de botones para elegir curso. act = función que recibe el número de curso. */
const chipsCurso = (sel, act, cursos = [1, 2, 3, 4, 5, 6]) => `<div class="cchips">${cursos.map(c => `<button class="${c === sel ? 'on' : ''}" onclick="${act}(${c})">${nomCurso(c)}</button>`).join('')}</div>`;
function verCurso(c) { VCURSO = c; if (MODO_DOCENTE) ALU_DOCENTE.curso = c; pintar(); }
const atras = (txt, act, icono = 'back') => `<button class="back" onclick="${act}">${ico(icono, 20, 2.4)}${txt}</button>`;
function salirDocente() { MODO_DOCENTE = false; go('inicio'); }

/* ---------- Bienvenida (primera vez) ---------- */
SC.wel = () => {
  const pasos = `<div class="steps">${[0, 1, 2].map(i => `<i class="${i <= WEL ? 'on' : ''}"></i>`).join('')}</div>`;
  if (WEL === 0) return `${cabecera()}<div class="wel"><div class="gcard pop">${mascota(124)}<h2>¡Bienvenido a Calculi!</h2>
    <p class="mut">Trucos de cálculo mental explicados paso a paso y practicados jugando. Sin anuncios y sin conexión.</p>
    <button class="bt w" onclick="WEL=1;pintar()">Empezar</button>
    <button class="bt w ggl" onclick="welGo()">${GLG} Entrar con Google</button>
    <p class="mut" style="font-size:.85rem">El progreso se guarda en este dispositivo. Con tu cuenta de Google también se guarda en la nube.</p></div></div>`;
  if (WEL === 1) return `${cabecera()}<div class="wel"><div class="gcard pop">${pasos}<h2>¿Quién usa Calculi?</h2>
    <p class="mut">Elige tu perfil. Podrás cambiarlo en la Zona del tutor.</p>
    <button class="prf" onclick="EST.ajustes.perfil='docente';WEL=2;pintar()">${ico('grad', 26)}<span><b>Perfil Docente</b><small>Toda la clase, dominio de cada truco e informes</small></span></button>
    <button class="prf" onclick="EST.ajustes.perfil='familia';WEL=2;pintar()">${ico('home', 26)}<span><b>Perfil Familias</b><small>Practicar en casa y ver el progreso</small></span></button></div></div>`;
  const doc = EST.ajustes.perfil === 'docente';
  return `${cabecera()}<div class="wel"><div class="gcard pop" style="align-items:stretch;text-align:left">${pasos}<h2>Primer alumno</h2>
    <p class="mut">${doc ? 'Escribe el nombre de un alumno. Podrás añadir al resto de la clase desde la Zona del tutor.' : 'Escribe el nombre del niño o la niña que va a practicar. Podrás añadir más después.'}</p>
    <p class="mut" style="margin:0;font-size:.95rem">${doc ? 'Curso de tu clase' : 'Curso'}</p>${chipsCurso(EST.ajustes.curso || 1, 'cursoWel')}
    <input class="inp" id="nom" maxlength="20" placeholder="Nombre" autocomplete="off" onkeydown="if(event.key==='Enter')finWel(true)">
    <p class="mut" style="margin:0;font-size:.95rem">Su animalito</p>${elegirAnimal(NUEVO_AV ?? avLibre(), 'animalWel')}
    ${importables()}
    <div class="acts"><button class="bt sec" onclick="finWel(false)">Lo haré después</button><button class="bt" onclick="finWel(true)">Continuar</button></div></div></div>`;
};
function importables() {
  const xs = alumnosDeOtrasApps().slice(0, 12); if (!xs.length) return '';
  return `<p class="mut" style="margin:0;font-size:.9rem">O añade alumnos de tus otras apps:</p><div class="fila" style="justify-content:flex-start">${xs.map(x => `<button class="bt sec" style="min-height:42px;font-size:1rem;padding:0 14px" onclick="crearAlumno(${esc(JSON.stringify(x.n))},${x.av ?? 'avLibre()'});toast('Añadido: ${esc(x.n)}');pintar()">${ico('plus', 16)}${esc(x.n)}</button>`).join('')}</div>`;
}
function animalWel(i) { const v = $('#nom') ? $('#nom').value : ''; NUEVO_AV = i; pintar(); if ($('#nom')) $('#nom').value = v; }
function cursoWel(c) { const v = $('#nom') ? $('#nom').value : ''; EST.ajustes.curso = c; pintar(); if ($('#nom')) $('#nom').value = v; }
function finWel(conNombre) {
  const n = conNombre && $('#nom') ? $('#nom').value.trim() : '';
  if (conNombre && !n && !EST.alu.length) { $('#nom').focus(); return; }
  if (n) crearAlumno(n, NUEVO_AV ?? avLibre());
  try { localStorage.setItem('calc.wel', '1'); } catch (e) {}
  guardar(); go('inicio');
}

/* ---------- Inicio ---------- */
function continuar() {
  const a = alumno(), e = sugerida(a); EID = e.id; const p = a.e[e.id] || {};
  if (!p.tut) { TUT = 0; go('tut'); } else if (!p.n) empezar('guiada'); else empezar('reto');
}
SC.inicio = () => {
  const a = alumno();
  if (!a) return EST.alu.length ? SC.quien() : `${cabecera()}<div class="wel"><div class="gcard">${mascota(110)}<h2>¡Hola!</h2><p class="mut">Crea un alumno para empezar a practicar.</p>
    <input class="inp" id="nom" maxlength="20" placeholder="Nombre" autocomplete="off"><button class="bt w" onclick="const n=$('#nom').value.trim();if(n){crearAlumno(n,avLibre());pintar()}">Crear alumno</button>${importables()}</div>
    <button class="tzb" onclick="abrirTutor()">${ico('lock', 18)}Zona del tutor</button></div>`;
  const e = sugerida(a), p = a.e[e.id] || {}, hayRepaso = ESTR.lista.some(x => (a.e[x.id] || {}).n > 0);
  const sigTxt = MODO_DOCENTE ? 'Todos los trucos abiertos, sin guardar' : !p.tut ? `Aprender: ${e.n}` : !p.n ? `Practicar: ${e.n}` : `Reto: ${e.n}`;
  const saludo = MODO_DOCENTE ? '¡Modo Docente!' : `¡Hola, ${esc(a.n)}!`;
  const frase = MODO_DOCENTE ? 'Proyecta y practica con la clase' : pick(['¿Practicamos un truco?', '¿Seguimos aprendiendo?', '¡Vamos a calcular!']);
  return `${cabecera()}
  <div class="greet">${mascota(96)}<div><div class="hi">${saludo}</div><p>${frase}</p></div></div>${EST.ajustes.perfil === 'docente' ? retoHTML() : ''}
  <div class="home-grid">
  <button class="lc hero" onclick="${MODO_DOCENTE ? "VCURSO=cursoDe(alumno());go('mapa')" : 'continuar()'}"><span class="ico">${ico('play', 26)}</span><span class="tx2"><b>${MODO_DOCENTE ? 'Trucos' : 'Seguir'}</b><small>${esc(sigTxt)}</small></span></button>
  ${!MODO_DOCENTE && !a.diag && !ESTR.delCurso(cursoDe(a)).some(x => (a.e[x.id] || {}).n) ? `<button class="lc" onclick="empezar('diag')"><span class="ico">${ico('target', 24)}</span><span class="tx2"><b>Prueba inicial</b><small>5 minutos para empezar por tu nivel</small></span></button>` : ''}
  <button class="lc" onclick="${hayRepaso ? "empezar('repaso')" : "toast('Primero practica algún truco')"}" ${hayRepaso ? '' : 'style="opacity:.6"'}><span class="ico">${ico('shuffle', 24)}</span><span class="tx2"><b>Repaso del día</b><small>${!hayRepaso ? 'Se abre cuando practiques un truco' : (() => { const t = tocaRepasar(a); return t.length ? `Hoy toca: ${esc(t.slice(0, 3).map(x => x.n).join(', '))}${t.length > 3 ? '…' : ''}` : 'Mezcla de los trucos que ya conoces'; })()}</small></span></button>
  ${cursoDe(a) >= 2 || MODO_DOCENTE ? `<button class="lc" onclick="go('tablas')"><span class="ico">${ico('chart', 24)}</span><span class="tx2"><b>Tablas de multiplicar</b><small>Tu mapa de las tablas: practica las que fallas</small></span></button>` : ''}
  ${MODO_DOCENTE ? `<button class="lc" onclick="abrirAula('proy')"><span class="ico">${ico('monitor', 24)}</span><span class="tx2"><b>Proyectar</b><small>Una operación en grande para toda la clase</small></span></button>
  <button class="lc" onclick="abrirAula('duelo')"><span class="ico">${ico('users', 24)}</span><span class="tx2"><b>Duelo por equipos</b><small>Azul contra naranja en la pizarra</small></span></button>`
  : `<button class="lc" onclick="empezar('diario')"><span class="ico">${ico('flame', 24)}</span><span class="tx2"><b>Cálculo diario</b><small>${diarioHoy(a) ? `Hecho hoy ✓ · Récord: ${a.diario.mejor}` : `2 minutos · Tu récord: ${a.diario.mejor || 0}`}</small></span></button>`}
  </div>
  <div class="trio"><button class="hc" onclick="VCURSO=cursoDe(alumno());go('mapa')">${ico('map', 22)}Trucos</button><button class="hc" onclick="go('piedras')">${piedra(Math.max(0, piedrasDe(a) - 1), 26)}Piedras</button><button class="hc" onclick="go('logros')">${ico('medal', 22)}Logros</button></div>
  ${MODO_DOCENTE ? '' : `<button class="tzb" onclick="abrirTutor()">${ico('lock', 18)}Zona del tutor</button>`}`;
};

/* ---------- ¿Quién juega? ---------- */
SC.quien = () => `${cabecera()}${EST.alu.length && alumno() ? atras('Inicio', "go('inicio')") : ''}<h1 class="ttl">¿Quién juega?</h1>
  <div class="quien">${EST.alu.map(a => `<button class="qa${a.id === EST.act ? ' on' : ''}" onclick="entrar('${a.id}')">${avatar(a)}${esc(a.n)}</button>`).join('')}
  <button class="qa add" onclick="NUEVO='';go('nuevo')"><span class="av" style="background:var(--bd2);color:var(--mu)">+</span>Añadir</button></div>
  <button class="tzb" onclick="abrirTutor()">${ico('lock', 18)}Zona del tutor</button>`;
function entrar(id) { MODO_DOCENTE = false; EST.act = id; guardar(); go('inicio'); }
SC.nuevo = () => `${cabecera()}${atras('Volver', "go('quien')")}<div class="gcard" style="align-items:stretch;text-align:left"><h2>Nuevo alumno</h2>
  <input class="inp" id="nom" maxlength="20" placeholder="Nombre" autocomplete="off" onkeydown="if(event.key==='Enter')crearDesdeForm()">
  <p class="mut" style="margin:0;font-size:.95rem">Elige tu animalito</p>${elegirAnimal(NUEVO_AV ?? avLibre(), 'animalWel')}${importables()}
  <button class="bt w" onclick="crearDesdeForm()">Crear</button></div>`;
function crearDesdeForm() { const n = $('#nom').value.trim(); if (!n) return $('#nom').focus(); crearAlumno(n, NUEVO_AV ?? avLibre()); NUEVO_AV = null; MODO_DOCENTE = false; go('inicio'); }

/* ---------- Mapa de trucos ---------- */
SC.mapa = () => {
  const a = alumno(), sug = sugerida(a), cs = ESTR.cursos();
  if (!cs.includes(VCURSO)) VCURSO = cursoDe(a);
  const tri = [1, 2, 3].map(t => {
    const ts = ESTR.delCurso(VCURSO).filter(e => e.tri === t).map(e => {
      const p = a.e[e.id] || {}, ab = abierta(a, e), d = dominio(a, e.id);
      return `<button class="mw t${t}${ab ? '' : ' lock'}${e === sug && !MODO_DOCENTE ? ' sug' : ''}" onclick="${ab ? `EID='${e.id}';go('estr')` : `toast(${e.curso > cursoDe(a) ? "'Es de un curso más adelante'" : "'Consigue una estrella en el truco anterior'"})`}">
      <span class="gl">${glifo(e)}</span>${ab ? '' : `<span class="lk">${ico('lock', 16)}</span>`}<b>${esc(e.n)}</b>
      <span class="es">${p.est ? '★'.repeat(p.est) + '☆'.repeat(3 - p.est) : ''}</span><span class="br"><i style="width:${Math.round((d ?? 0) * 100)}%"></i></span></button>`;
    }).join('');
    return ts ? `<div class="tri">${['', '1.er', '2.º', '3.er'][t]} trimestre</div><div class="mapa">${ts}</div>` : '';
  }).join('');
  return `${atras('Inicio', "go('inicio')", 'home')}<h1 class="ttl">Mapa de trucos</h1>${cs.length > 1 ? chipsCurso(VCURSO, 'verCurso', cs) : ''}${tri}`;
};

/* ---------- Un truco ---------- */
SC.estr = () => {
  const e = est(), a = alumno(), p = a.e[e.id] || {};
  const fila = (n, ok, t, s, act, extra = '') => `<button class="lvr" onclick="${act}"><span class="n${ok ? ' ok' : ''}">${ok ? ico('check', 20, 3) : n}</span><span class="tx2"><b>${t}</b><small>${s}</small>${extra}</span><span class="go">${ico('play', 20)}</span></button>`;
  return `${atras('Mapa de trucos', "go('mapa')")}
  <div class="shead"><span class="gl t${e.tri}">${glifo(e)}</span><span><b>${esc(e.n)}</b><small>${esc(e.desc)}</small></span></div>
  ${fila(1, p.tut, 'Aprender', 'Mira cómo funciona el truco', "TUT=0;go('tut')")}
  ${fila(2, p.n > 0, 'Practicar', 'Paso a paso, con ayuda', "empezar('guiada')")}
  ${fila(3, p.est >= 3, 'Reto', '10 operaciones para ganar estrellas', "empezar('reto')", `<span class="es">${'★'.repeat(p.est || 0)}${'☆'.repeat(3 - (p.est || 0))}</span>`)}
  ${fila(4, false, 'Jugar', e.juego && e.juego.tipo === 'parejas' ? esc(e.juego.meta) : 'Operaciones rápidas', 'empezarJuego()')}
  ${tieneProblemas(e) ? fila(5, false, 'Problemas', 'El truco en situaciones de la vida', "empezar('problemas')") : ''}
  <div class="say">${mascota(60, 'piensa')}<div class="bub">Truco: «${esc(e.truco)}»</div></div>`;
};

/* ---------- Mis logros ---------- */
SC.logros = () => {
  const a = alumno(), nEst = totalEstrellas(a), dom = ESTR.lista.filter(e => semaforo(a, e.id) === 'v').length, ej = Object.values(a.dia).reduce((s, n) => s + n, 0);
  const tri = t => ESTR.delCurso(cursoDe(a)).filter(e => e.tri === t).every(e => (a.e[e.id] || {}).est >= 1);
  const L = [['star', 'Primera estrella', 'Gana una estrella en un reto', nEst >= 1], ['flame', 'Constancia', 'Practica 5 días distintos', a.dias.length >= 5],
    ['target', 'Puntería', 'Domina 3 trucos', dom >= 3], ['check', 'Cien cuentas', 'Haz 100 ejercicios', ej >= 100],
    ['medal', `${nomCurso(cursoDe(a))} · 1.er trimestre`, 'Una estrella en todos sus trucos', tri(1)], ['medal', `${nomCurso(cursoDe(a))} · 2.º trimestre`, 'Una estrella en todos sus trucos', tri(2)],
    ['medal', `${nomCurso(cursoDe(a))} · 3.er trimestre`, 'Una estrella en todos sus trucos', tri(3)], ['star', 'Coleccionista', 'Consigue 30 estrellas', nEst >= 30]];
  return `${atras('Inicio', "go('inicio')", 'home')}<h1 class="ttl">Mis logros</h1>
  <div class="greet" style="justify-content:flex-start">${mascota(70, 'feliz')}<div><div class="hi" style="font-size:1.5rem">${nEst} estrellas</div><p>${dom} ${dom === 1 ? 'truco dominado' : 'trucos dominados'} · ${ej} ejercicios</p></div></div>
  ${L.map(([i, t, s, ok]) => `<div class="lc" style="${ok ? '' : 'opacity:.55'}"><span class="ico" style="${ok ? 'background:#FEF3C7;color:#B45309' : ''}">${ico(i, 24)}</span><span class="tx2"><b>${t}</b><small>${s}</small></span>${ok ? `<span style="color:var(--ok)">${ico('check', 24, 3)}</span>` : ''}</div>`).join('')}`;
};
