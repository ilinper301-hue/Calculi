/* ===== Herramientas de aula: modo proyector, duelo por equipos, fichas para imprimir ===== */
/* Configuración común: curso, trucos elegidos y nivel. */
const AULA = { curso: 0, ids: null, nivel: 2, tiempo: 0, meta: 5, n: 20, sol: true, dib: false, modo: 'proy' };
function aulaCurso() { return AULA.curso || EST.ajustes.curso || 1; }
function aulaTrucos() { const L = ESTR.delCurso(aulaCurso()); const ids = AULA.ids && AULA.ids.filter(id => L.some(e => e.id === id)); return ids && ids.length ? L.filter(e => ids.includes(e.id)) : L; }
function abrirAula(modo) { AULA.modo = modo; if (!AULA.curso) AULA.curso = EST.ajustes.curso || 1; go('aulacfg'); }
function aulaItem(nivel = AULA.nivel, prev) {
  const L = aulaTrucos(); let e, it;
  for (let k = 0; k < 10; k++) { e = pick(L); it = prepararItem(e.item(nivel), nivel); if (!prev || it.q !== prev.q) break; }
  if (!it.ops) it.ops = opciones(it.r, 3, (it.errores || []).map(x => x[0]).concat(it.extra || []));
  return Object.assign(it, { id: e.id, nombre: e.n });
}
const segBtns = (val, opciones, clave) => `<div class="cchips">${opciones.map(([v, t]) => `<button class="${val === v ? 'on' : ''}" onclick="aulaSet('${clave}',${v})">${t}</button>`).join('')}</div>`;

/* ---------- Configuración ---------- */
SC.aulacfg = () => {
  const L = ESTR.delCurso(aulaCurso()), sel = new Set(aulaTrucos().map(e => e.id)), m = AULA.modo;
  const titulo = { proy: 'Modo proyector', duelo: 'Duelo por equipos', ficha: 'Fichas para imprimir' }[m];
  const desc = { proy: 'Una operación en grande para toda la clase. Tú decides cuándo se ve la respuesta.', duelo: 'Dos equipos responden a la vez en la pizarra. El primero que acierta gana el punto.', ficha: 'Ejercicios de los trucos elegidos, con hoja de soluciones.' }[m];
  const extra = m === 'proy' ? `<div class="gt">Cuenta atrás</div>${segBtns(AULA.tiempo, [[0, 'Sin tiempo'], [10, '10 s'], [20, '20 s'], [30, '30 s']], 'tiempo')}`
    : m === 'duelo' ? `<div class="gt">Gana el primero en llegar a</div>${segBtns(AULA.meta, [[5, '5 puntos'], [10, '10 puntos'], [15, '15 puntos']], 'meta')}`
    : `<div class="gt">Número de ejercicios</div>${segBtns(AULA.n, [[12, '12'], [20, '20'], [30, '30'], [40, '40']], 'n')}
       <div class="list">${fila('', 'Hoja de soluciones', 'Una segunda página con las respuestas', 'AULA.sol=!AULA.sol;pintar()', `<span class="sw${AULA.sol ? ' on' : ''}"></span>`)}${fila('', 'Con dibujos', 'Ayuda visual en los primeros ejercicios', 'AULA.dib=!AULA.dib;pintar()', `<span class="sw${AULA.dib ? ' on' : ''}"></span>`)}</div>`;
  return `<div class="tz" style="display:flex;flex-direction:column;gap:12px">${atras(MODO_DOCENTE ? 'Inicio' : 'Zona del tutor', MODO_DOCENTE ? "go('inicio')" : "go('tz')")}
  <h2 style="font-size:1.4rem;font-weight:600">${titulo}</h2><p class="note">${desc}</p>
  <div class="gt">Curso</div>${chipsCurso(aulaCurso(), 'aulaCursoSet', ESTR.cursos())}
  <div class="gt">Dificultad</div>${segBtns(AULA.nivel, [[1, 'Fácil'], [2, 'Media'], [3, 'Difícil']], 'nivel')}
  ${extra}
  <div class="gt">Trucos (${sel.size} de ${L.length})</div>
  <div class="list">${fila('', 'Todos', '', 'AULA.ids=null;pintar()', `<span class="sw${sel.size === L.length ? ' on' : ''}"></span>`)}${L.map(e => fila('', esc(e.n), `${['', '1.er', '2.º', '3.er'][e.tri]} trimestre`, `aulaToggle('${e.id}')`, `<span class="sw${sel.has(e.id) ? ' on' : ''}"></span>`)).join('')}</div>
  <button class="bt" onclick="${m === 'proy' ? 'empezarProy()' : m === 'duelo' ? 'empezarDuelo()' : "go('ficha')"}">${ico(m === 'ficha' ? 'download' : 'play', 18)}${m === 'ficha' ? 'Ver la ficha' : 'Empezar'}</button></div>`;
};
function aulaSet(k, v) { AULA[k] = v; pintar(); }
function aulaCursoSet(c) { AULA.curso = c; AULA.ids = null; pintar(); }
function aulaToggle(id) {
  const L = ESTR.delCurso(aulaCurso()), s = new Set(aulaTrucos().map(e => e.id));
  if (s.size === L.length) { s.clear(); s.add(id); } else if (s.has(id)) s.delete(id); else s.add(id);
  AULA.ids = s.size ? [...s] : null; pintar();
}

/* ---------- Modo proyector ---------- */
let PRY = null;
function empezarProy() { PRY = { it: aulaItem(), n: 1, ver: false, dib: false, t0: Date.now() }; go('proy'); proyReloj(); }
function proyReloj() {
  clearInterval(PRY && PRY.int); if (!PRY || !AULA.tiempo) return;
  PRY.int = setInterval(() => { if (scr !== 'proy' || !PRY) return clearInterval(PRY && PRY.int); const q = AULA.tiempo - Math.floor((Date.now() - PRY.t0) / 1000), el = $('#prt');
    if (el) el.textContent = Math.max(0, q); if (q <= 0 && !PRY.ver) { PRY.ver = true; SON.fin(); pintar(); } }, 250);
}
function proySig() { PRY = Object.assign(PRY, { it: aulaItem(AULA.nivel, PRY.it), n: PRY.n + 1, ver: false, dib: false, t0: Date.now() }); pintar(); proyReloj(); }
SC.proy = () => {
  const it = PRY.it, q = AULA.tiempo ? Math.max(0, AULA.tiempo - Math.floor((Date.now() - PRY.t0) / 1000)) : null;
  return `<div class="proy"><div class="top"><button class="rnd" onclick="clearInterval(PRY.int);go('aulacfg')" aria-label="Salir">${ico('x', 20, 2.4)}</button>
  <span class="pill" style="background:var(--acs);color:var(--aci)">${esc(it.nombre)}</span><span style="flex:1"></span>${q !== null ? `<span class="pill" id="prt">${q}</span>` : ''}<span class="pill" style="background:var(--card);color:var(--mu)">${PRY.n}</span></div>
  <div class="proy-op">${it.txt ? `<div class="proy-txt">${esc(it.txt)}</div>` : ''}<div class="op">${huecoHTML(it.q, PRY.ver ? fmt(it.r) : '')}</div>
  ${PRY.dib && it.vis ? `<div class="vis">${VIS.dibujar(Object.assign({ ocultarFin: !PRY.ver }, it.vis))}</div>` : ''}</div>
  <div class="acts">${it.vis ? `<button class="bt sec" onclick="PRY.dib=!PRY.dib;pintar()">${ico('bulb', 20)}${PRY.dib ? 'Quitar dibujo' : 'Dibujo'}</button>` : ''}
  ${PRY.ver ? `<button class="bt" onclick="proySig()">Siguiente${ico('chev', 20, 2.4)}</button>` : `<button class="bt" onclick="PRY.ver=true;SON.bien();pintar()">${ico('check', 20, 3)}Respuesta</button>`}</div></div>`;
};

/* ---------- Duelo por equipos ---------- */
let DUE = null;
function empezarDuelo() { DUE = { p: [0, 0], it: null, bloq: [false, false], ronda: 0, gana: null }; dueloRonda(); go('duelo'); }
function dueloRonda() { DUE.it = aulaItem(AULA.nivel, DUE.it); DUE.ops = [shuffle(DUE.it.ops), shuffle(DUE.it.ops)]; DUE.bloq = [false, false]; DUE.ganaRonda = null; DUE.ronda++; }
SC.duelo = () => {
  const it = DUE.it, lado = k => {
    const nom = ['Equipo azul', 'Equipo naranja'][k], fin = DUE.ganaRonda !== null;
    return `<div class="dl dl${k}${DUE.bloq[k] ? ' bloq' : ''}${DUE.ganaRonda === k ? ' gana' : ''}"><div class="dl-h"><b>${nom}</b><span class="dl-p">${DUE.p[k]}</span></div>
    <div class="ops">${DUE.ops[k].map(o => `<button class="opc${fin && igual(o, it.r) ? ' ok' : ''}" ${DUE.bloq[k] || fin ? 'disabled' : ''} onclick="dueloResp(${k},${o})">${fmt(o)}</button>`).join('')}</div>
    <div class="dl-m">${DUE.ganaRonda === k ? '¡Punto!' : DUE.bloq[k] ? 'Fallo: esperad a la siguiente' : ''}</div></div>`;
  };
  if (DUE.gana !== null) return `<div class="res pop">${mascota(150, 'feliz')}<h2>¡Gana el ${['equipo azul', 'equipo naranja'][DUE.gana]}!</h2><p class="mut" style="margin:0;font-size:1.2rem">${DUE.p[0]} – ${DUE.p[1]}</p></div>
    <div class="acts"><button class="bt sec" onclick="go('aulacfg')">Ajustes</button><button class="bt" onclick="empezarDuelo()">${ico('refresh', 20)}Revancha</button></div>`;
  return `<div class="top"><button class="rnd" onclick="go('aulacfg')" aria-label="Salir">${ico('x', 20, 2.4)}</button><span class="pill" style="background:var(--acs);color:var(--aci)">${esc(it.nombre)}</span><span style="flex:1"></span><span class="pill">A ${AULA.meta}</span></div>
  <div class="card"><div class="op">${huecoHTML(it.q, DUE.ganaRonda !== null || (DUE.bloq[0] && DUE.bloq[1]) ? fmt(it.r) : '')}</div></div>
  <div class="duelo">${lado(0)}${lado(1)}</div>
  ${DUE.ganaRonda !== null || (DUE.bloq[0] && DUE.bloq[1]) ? `<button class="bt" onclick="dueloRonda();pintar()">Siguiente${ico('chev', 20, 2.4)}</button>` : ''}`;
};
function dueloResp(k, v) {
  if (DUE.bloq[k] || DUE.ganaRonda !== null) return;
  if (igual(v, DUE.it.r)) { DUE.p[k]++; DUE.ganaRonda = k; SON.bien(); if (DUE.p[k] >= AULA.meta) { DUE.gana = k; SON.fin(); } }
  else { DUE.bloq[k] = true; SON.mal(); }
  pintar();
}

/* ---------- Fichas para imprimir ---------- */
SC.ficha = () => {
  const items = [], L = aulaTrucos(), vistos = new Set();
  for (let k = 0; items.length < AULA.n && k < AULA.n * 20; k++) { const e = L[items.length % L.length], it = prepararItem(e.item(AULA.nivel), 3); if (vistos.has(it.q)) continue; vistos.add(it.q); items.push(Object.assign(it, { e })); }
  const nombres = L.length <= 3 ? L.map(e => e.n).join(', ') : `${L.length} trucos de ${nomCurso(aulaCurso())}`;
  const cab = sol => `<div class="hj-cab"><div><b>Calculi · Cálculo mental${sol ? ' · Soluciones' : ''}</b><small>${esc(nombres)}</small></div>${sol ? '' : '<div class="hj-nom">Nombre: <span></span> Fecha: <span class="c"></span></div>'}</div>`;
  const truco = L.length <= 3 ? `<div class="hj-truco">${L.map(e => `<b>${esc(e.n)}:</b> ${esc(e.truco)}.`).join(' ')}</div>` : '';
  const celda = (it, k, sol) => `<div class="hj-it"><span class="hj-n">${k + 1}</span><div>${it.txt ? `<small>${esc(it.txt)}</small>` : ''}<div class="hj-q">${esc(it.q).split('?').join(sol ? `<b class="hj-r">${fmt(it.r)}</b>` : '<span class="hj-h"></span>')}</div>
    ${AULA.dib && !sol && k < 4 && it.vis ? `<div class="hj-v">${VIS.dibujar(Object.assign({ ocultarFin: true }, it.vis))}</div>` : ''}</div></div>`;
  return `<div class="noimp tz" style="display:flex;flex-direction:column;gap:10px">${atras('Ajustes de la ficha', "go('aulacfg')")}
  <div class="acts"><button class="bt sec" onclick="pintar()">${ico('refresh', 18)}Otros ejercicios</button><button class="bt" onclick="window.print()">${ico('download', 18)}Imprimir o guardar PDF</button></div></div>
  <div class="hoja">${cab(false)}${truco}<div class="hj-grid">${items.map((it, k) => celda(it, k, false)).join('')}</div></div>
  ${AULA.sol ? `<div class="hoja salto">${cab(true)}<div class="hj-grid">${items.map((it, k) => celda(it, k, true)).join('')}</div></div>` : ''}`;
};
