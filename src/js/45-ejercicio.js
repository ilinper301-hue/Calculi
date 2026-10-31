/* ===== Tutorial, ejercicios, juego y resultado ===== */

/* ---------- Tutorial ---------- */
SC.tut = () => {
  const e = est(), s = e.tutorial[TUT], ult = TUT === e.tutorial.length - 1, T = s.toca, st = T ? tocaEstado(s) : null, listo = !T || st.ok;
  setTimeout(() => { if (scr === 'tut') decir(s.txt); }, 300);
  const dibujo = T ? `<div class="vis">${tocaHTML(T)}</div><div class="toca-tip${st.ok ? ' ok' : ''}">${st.ok ? ico('check', 18, 3) + '¡Muy bien!' : ico('pencil', 16) + 'Tu turno: toca el dibujo'}</div>` : `<div class="vis">${VIS.dibujar(s.vis)}</div>`;
  return `<div class="top"><button class="rnd" onclick="go('estr')" aria-label="Cerrar">${ico('x', 20, 2.4)}</button>
  <div class="pg"><i style="width:${((TUT + 1) / e.tutorial.length) * 100}%"></i></div><span class="pill" style="background:var(--acs);color:var(--aci)">${ico('book', 18)}${TUT + 1}/${e.tutorial.length}</span></div>
  <div class="card pop"><div class="enun"><span>${esc(e.n)}</span><button class="voz" onclick="decir(${esc(JSON.stringify(s.txt))})" aria-label="Escuchar">${ico('vol', 20)}</button></div>
  ${dibujo}</div>
  <div class="say">${mascota(66, T && st.ok ? 'feliz' : 'normal')}<div class="bub tutt" style="text-align:left">${esc(s.txt)}</div></div>
  <div class="acts">${TUT ? `<button class="bt sec" onclick="TUT--;pintar()">${ico('back', 20, 2.4)}Atrás</button>` : ''}
  ${ult ? `<button class="bt" ${listo ? '' : 'disabled'} onclick="finTutorial()">¡A practicar!</button>` : `<button class="bt" ${listo ? '' : 'disabled'} onclick="TUT++;pintar()">Siguiente${ico('chev', 20, 2.4)}</button>`}</div>`;
};
function finTutorial() { const a = alumno(); progreso(a, EID).tut = true; a.mt = Date.now(); guardar(); empezar('guiada'); }

/* ---------- Sesiones ---------- */
function empezar(tipo) {
  const a = alumno(), e = est();
  SES = { tipo, id: EID, i: 0, ok: 0, paso: 0, fallos: 0, ayuda: false, bloq: false, resp: '', hechos: [], t0: Date.now(), msg: '', porTruco: {} };
  if (tipo === 'guiada') { SES.items = guiadas(e, 4); SES.n = 4; }
  else if (tipo === 'repaso') { SES.items = itemsRepaso(a, 10); SES.n = SES.items.length; if (!SES.n) return go('inicio'); }
  else if (tipo === 'diario') { SES.n = 999; SES.lim = 120; SES.items = [itemDiario(a)]; }
  else if (tipo === 'tablas') { SES.n = 15; SES.items = [itemTabla(a)]; }
  else if (tipo === 'problemas') { SES.n = 6; SES.items = [itemProblema(e)]; }
  else if (tipo === 'diag') { SES.lista = ESTR.delCurso(cursoDe(a)); SES.k = 0; SES.cuenta = []; SES.res = []; SES.n = 999; SES.items = [itemDiag()]; }
  else { SES.nivel = tipo === 'rapido' ? 2 : (dominio(a, e.id) ?? 0) >= .8 ? 2 : 1; SES.racha = 0; SES.n = 10; SES.items = [nuevoItem()]; }
  SES.msg = { guiada: 'Vamos paso a paso.', reto: '¡Tú puedes!', repaso: 'Mezclamos trucos. ¿Te acuerdas?', rapido: '¡A por todas!', diario: '¡Dos minutos! Responde todas las que puedas.', tablas: 'Practicamos las que más te cuestan.', problemas: 'Lee bien: ¿qué truco te ayuda?', diag: 'Vamos a ver qué trucos ya sabes. Sin prisa.' }[tipo];
  go('ej'); if (tipo === 'diario') relojDiario();
}
/** Nuevo ítem del reto, distinto de los 3 anteriores si es posible. */
function nuevoItem() {
  const e = est(), ult = new Set((SES.items || []).slice(-3).map(x => x.q)); let it;
  for (let k = 0; k < 12; k++) { it = e.item(SES.nivel); if (!ult.has(it.q)) break; }
  return Object.assign({ id: e.id, nivel: SES.nivel }, prepararItem(it, SES.nivel));
}
/** Práctica guiada: n ejemplos con operaciones finales distintas. */
function guiadas(e, n) { const out = [], vistos = new Set(); for (let k = 0; out.length < n && k < 40; k++) { const g = e.guiada(); if (!vistos.has(g.final.q) || k > 30) { vistos.add(g.final.q); out.push(g); } } return out; }
function actual() {
  const it = SES.items[SES.i];
  if (SES.tipo !== 'guiada') return it;
  if (SES.paso < it.pasos.length) { const ps = it.pasos[SES.paso]; return ps._p || (ps._p = prepararItem(ps, ps.teclado ? 3 : 1)); }
  return it._final || (it._final = prepararItem(it.final, 1));
}
const huecoHTML = (q, val) => esc(q).split('?').join(`<span class="hueco">${val === '' || val === undefined ? '&nbsp;' : esc(val)}</span>`);
const salirSesion = () => !SES ? "go('inicio')" : SES.tipo === 'tablas' ? "SES=null;go('tablas')" : ['repaso', 'diario', 'diag'].includes(SES.tipo) ? "SES=null;go('inicio')" : "SES=null;go('estr')";

SC.ej = () => {
  const c = actual(), it = SES.items[SES.i], nivel = it.nivel || 1, guiada = SES.tipo === 'guiada';
  const verVis = c.vis && (c.visSiempre || guiada || nivel === 1 || SES.ayuda || SES.fallos > 0);
  const teclado = !c.ops;
  const chips = guiada ? `<div class="chips">${it.pasos.map((_, k) => `<span class="${k === SES.paso ? 'on' : ''}">Paso ${k + 1}</span>`).join('')}<span class="${SES.paso >= it.pasos.length ? 'on' : ''}">Operación</span></div>` : '';
  let pregunta, respuesta;
  if (c.truco) {
    pregunta = `<div class="card pop"><div class="enun"><span>¿Qué truco usarías?</span></div><div class="op">${esc(c.q)}</div></div>`;
    respuesta = `<div class="ops una">${c.ops.map(o => `<button class="opc" onclick="responder(this.dataset.v,this)" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  } else {
    pregunta = `<div class="card pop">${c.txt || !guiada ? `<div class="enun"><span>${esc(c.txt || '')}</span><button class="voz" onclick="decir(${esc(JSON.stringify(c.voz || c.txt || c.q))})" aria-label="Escuchar">${ico('vol', 20)}</button></div>` : ''}
      ${guiada && SES.hechos.length ? `<div class="pasos">${SES.hechos.map(h => `<div>${ico('check', 18, 3)}${esc(h)}</div>`).join('')}</div>` : ''}
      <div class="op${c.q.length > 18 ? ' muy' : c.q.length > 12 ? ' larga' : ''}">${huecoHTML(c.q, teclado ? SES.resp : '')}</div>${verVis ? `<div class="vis">${VIS.dibujar(Object.assign({ ocultarFin: true }, c.vis))}</div>` : ''}</div>`;
    respuesta = teclado ? tecladoHTML(decimales(c.r) > 0 || c.coma) : `<div class="ops">${c.ops.map(o => `<button class="opc" onclick="responder(${o},this)">${fmt(o)}</button>`).join('')}</div>`;
  }
  const ayuda = !guiada && !c.truco && !it.diag && c.vis && !verVis ? `<button class="ayuda" onclick="SES.ayuda=true;SES.msg='Mira el dibujo: te ayuda a pensar.';pintar()">${ico('bulb', 18)}Ayuda</button>` : '';
  const prog = SES.tipo === 'diario' ? Math.min(100, ((Date.now() - SES.t0) / 1000 / SES.lim) * 100) : SES.tipo === 'diag' ? (SES.k / SES.lista.length) * 100 : (SES.i / SES.n) * 100;
  return `<div class="top"><button class="rnd" onclick="${salirSesion()}" aria-label="Salir">${ico('x', 20, 2.4)}</button>
  <div class="pg"><i id="pgi" style="width:${prog}%"></i></div>${SES.tipo === 'diario' ? `<span class="pill" style="background:var(--card);color:var(--tx)" id="reloj">${tiempoDiario()}</span>` : ''}<span class="pill">${ico(SES.tipo === 'diario' ? 'check' : 'star', 18)}${SES.ok}</span></div>${chips}
  <div class="ej-lado"><div class="ej-cuerpo">${pregunta}</div>
  <div class="ej-cuerpo"><div class="say">${mascota(58, SES.fb === 'ok' ? 'feliz' : SES.fb === 'no' ? 'piensa' : 'normal')}<div class="bub ${SES.fb || ''}" id="fb">${esc(SES.msg)}</div></div>${respuesta}${ayuda}</div></div>`;
};
function tecladoHTML(coma) {
  const dig = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button onclick="tecla('${n}')">${n}</button>`).join('');
  if (coma) return `<div class="kp dec">${dig}<button onclick="tecla(',')" aria-label="Coma">,</button><button onclick="tecla('0')">0</button><button onclick="tecla('b')" aria-label="Borrar">${ico('backspace', 24)}</button><button class="ok" onclick="tecla('ok')">OK</button></div>`;
  return `<div class="kp">${dig}<button onclick="tecla('b')" aria-label="Borrar">${ico('backspace', 24)}</button><button onclick="tecla('0')">0</button><button class="ok" onclick="tecla('ok')">OK</button></div>`;
}
function tecla(t) {
  if (!SES || SES.bloq) return;
  if (t === 'b') SES.resp = SES.resp.slice(0, -1);
  else if (t === 'ok') { if (SES.resp !== '' && SES.resp !== ',') responder(num(SES.resp)); return; }
  else if (t === ',') { if (!SES.resp.includes(',')) SES.resp = (SES.resp || '0') + ','; }
  else if (SES.resp.replace(',', '').length < 7) SES.resp = SES.resp === '0' ? t : SES.resp + t;
  const h = document.querySelector('.op .hueco'); if (h) h.innerHTML = SES.resp || '&nbsp;';
}
const BIEN = ['¡Muy bien!', '¡Genial!', '¡Eso es!', '¡Perfecto!', '¡Bravo!', '¡Qué rápido!'];
function feedback(txt, tipo) {
  SES.msg = txt; SES.fb = tipo;
  const f = $('#fb'); if (f) { f.className = 'bub ' + tipo; f.textContent = txt; }
  const m = document.querySelector('.say .mas'); if (m) m.outerHTML = mascota(58, tipo === 'ok' ? 'feliz' : 'piensa');
}
function limpiarPaso() { SES.bloq = false; SES.resp = ''; SES.fallos = 0; SES.fb = ''; }

/** Ejecuta fn más tarde solo si sigue abierta la misma sesión (evita que un temporizador pendiente cambie otra sesión). */
function despues(ms, fn) { const s = SES; setTimeout(() => { if (SES === s && scr === 'ej') fn(); }, ms); }
function responder(v, btn) {
  if (!SES || SES.bloq) return;
  const c = actual(), it = SES.items[SES.i], bien = c.truco ? String(v) === String(c.r) : igual(v, c.r), hueco = document.querySelector('.op .hueco');
  if (bien) {
    SES.bloq = true; SON.bien(); if (btn) btn.classList.add('ok');
    if (hueco) { hueco.textContent = fmt(c.r); hueco.classList.add('ok'); }
    feedback(pick(BIEN), 'ok');
    if (SES.tipo === 'guiada') {
      despues(800, () => {
        if (SES.paso < it.pasos.length) { SES.hechos.push((c.txt ? c.txt + ' ' : '') + c.q.replace('?', fmt(c.r))); SES.paso++; limpiarPaso(); SES.msg = 'Ahora el siguiente paso.'; pintar(); }
        else { SES.ok++; siguiente(); }
      });
      return;
    }
    const limpio = SES.fallos === 0 && !SES.ayuda;
    if (SES.tipo === 'diag') { SES.ultBien = true; SES.ok++; despues(450, siguiente); return; }
    registrar(it.id, limpio); if (SES.fallos === 0) SES.ok++;
    registrarTabla(alumno(), c.q, limpio); (SES.porTruco[it.id] = SES.porTruco[it.id] || []).push(limpio ? 1 : 0);
    if (SES.tipo === 'reto') { if (limpio) { if (++SES.racha >= 2 && SES.nivel < 3) { SES.nivel++; SES.racha = 0; } } else SES.racha = 0; }
    despues(SES.tipo === 'diario' ? 450 : 850, siguiente);
  } else {
    SON.mal(); SES.fallos++; if (btn) { btn.classList.add('no'); btn.disabled = true; }
    const pista = c.truco ? 'Piensa qué truco va mejor.' : pistaPara(c, v, ESTR.get(it.id));
    if (!c.truco && !SES.errLog && pista !== 'Casi. Prueba otra vez.' && !pista.startsWith('Acuérdate')) { SES.errLog = true; registrarError(alumno(), it.id, pista); }
    if (SES.tipo === 'diag') { SES.ultBien = false; SES.bloq = true; if (hueco) { hueco.textContent = fmt(c.r); hueco.classList.add('ok'); } feedback('No pasa nada. Seguimos.', 'no'); despues(900, siguiente); return; }
    if (hueco) { hueco.classList.add('no'); setTimeout(() => hueco.classList.remove('no'), 400); }
    SES.resp = ''; if (hueco && !c.ops) hueco.innerHTML = '&nbsp;';
    if (SES.fallos >= 2 || c.truco || SES.tipo === 'diario') {
      SES.bloq = true;
      if (SES.tipo !== 'guiada') { registrar(it.id, false); registrarTabla(alumno(), c.q, false); (SES.porTruco[it.id] = SES.porTruco[it.id] || []).push(0); if (SES.tipo === 'reto') { SES.racha = 0; SES.nivel = Math.max(1, SES.nivel - 1); } }
      if (hueco) { hueco.textContent = fmt(c.r); hueco.classList.remove('no'); hueco.classList.add('ok'); }
      feedback(c.truco ? `Era: «${c.r}»` : `Era ${fmt(c.r)}. ¡La próxima sale!`, 'no');
      despues(SES.tipo === 'diario' ? 1100 : 2000, () => {
        if (SES.tipo === 'guiada') { if (SES.paso < it.pasos.length) { SES.hechos.push((c.txt ? c.txt + ' ' : '') + c.q.replace('?', fmt(c.r))); SES.paso++; limpiarPaso(); SES.msg = 'Sigamos.'; pintar(); } else siguiente(); }
        else siguiente();
      });
    } else {
      if (c.vis && !SES.ayuda && !(SES.tipo !== 'guiada' && (it.nivel || 1) === 1) && !c.visSiempre) { SES.ayuda = true; SES.msg = pista + ' Mira el dibujo.'; SES.fb = 'no'; pintar(); }
      else feedback(pista, 'no');
    }
  }
}
function siguiente() {
  SES.i++; SES.paso = 0; SES.ayuda = false; SES.hechos = []; SES.errLog = false; limpiarPaso();
  if (SES.tipo === 'diag') { const nx = avanzarDiag(SES.ultBien); if (!nx) return terminarDiag(alumno()); SES.items.push(nx); SES.msg = pick(['Otra.', '¿Y esta?', 'Sigue así.']); return pintar(); }
  if (SES.i >= SES.n) return terminar();
  SES.msg = pick(['¿Y esta?', 'Otra más.', 'Piensa en el truco.', '¡Sigue así!']);
  if (SES.tipo === 'reto' || SES.tipo === 'rapido') SES.items.push(nuevoItem());
  if (SES.tipo === 'tablas') SES.items.push(itemTabla(alumno(), SES.items[SES.items.length - 1]));
  if (SES.tipo === 'problemas') SES.items.push(itemProblema(est(), SES.items[SES.items.length - 1]));
  if (SES.tipo === 'diario') { if (Date.now() - SES.t0 >= SES.lim * 1000) return terminar(); SES.items.push(itemDiario(alumno(), SES.items[SES.items.length - 1])); }
  pintar();
}
function terminar() {
  const a = alumno(), antes = piedrasDe(a);
  if (SES.tipo === 'diario') return terminarDiario(a, antes);
  const estrellas = SES.tipo === 'guiada' ? 3 : estrellasDe(SES.ok, SES.n);
  let mejora = false;
  if (SES.tipo === 'reto') { const p = progreso(a, SES.id); if (estrellas > p.est) { p.est = estrellas; mejora = true; } a.mt = Date.now(); guardar(); }
  if (SES.tipo === 'reto') { agendar(a, SES.id, estrellas >= 2); guardar(); }
  if (SES.tipo === 'repaso' || SES.tipo === 'problemas') { for (const [id, h] of Object.entries(SES.porTruco)) if (ESTR.get(id)) agendar(a, id, h.reduce((x, y) => x + y, 0) / h.length >= .75); guardar(); }
  if (SES.tipo === 'guiada') { const p = progreso(a, SES.id); if (!p.n) p.n = 1; guardar(); }
  RES = { estrellas, ok: SES.ok, n: SES.n, tipo: SES.tipo, mejora, nuevas: piedrasDe(a) - antes, desde: antes };
  SON.fin(); go('res');
}

/* ---------- Juego de parejas ---------- */
function empezarJuego() {
  const e = est();
  if (!e.juego || e.juego.tipo !== 'parejas') return empezar('rapido');
  const pares = e.juego.pares().slice(0, 6);
  JG = { cartas: shuffle(pares.flatMap((p, k) => [{ t: typeof p[0] === 'number' ? fmt(p[0]) : String(p[0]), k }, { t: typeof p[1] === 'number' ? fmt(p[1]) : String(p[1]), k }])), sel: null, hechas: new Set(), err: 0 };
  go('juego');
}
SC.juego = () => `<div class="top"><button class="rnd" onclick="go('estr')" aria-label="Salir">${ico('x', 20, 2.4)}</button>
  <div class="pg"><i style="width:${(JG.hechas.size / JG.cartas.length) * 100}%"></i></div><span class="pill">${ico('game', 18)}${JG.hechas.size / 2}/6</span></div>
  <div class="say">${mascota(58)}<div class="bub">${esc(est().juego.meta)}. Toca dos tarjetas que vayan juntas.</div></div>
  <div class="tablero">${JG.cartas.map((c, i) => `<button class="carta${JG.hechas.has(i) ? ' hecha' : ''}${JG.sel === i ? ' sel' : ''}${c.t.length > 7 ? ' xl' : c.t.length > 4 ? ' l' : ''}" onclick="carta(${i},this)">${esc(c.t)}</button>`).join('')}</div>`;
function carta(i, el) {
  if (JG.hechas.has(i)) return;
  if (JG.sel === null) { JG.sel = i; el.classList.add('sel'); return; }
  if (JG.sel === i) { JG.sel = null; el.classList.remove('sel'); return; }
  const a = JG.cartas[JG.sel], b = JG.cartas[i];
  if (a.k === b.k) {
    JG.hechas.add(JG.sel).add(i); JG.sel = null; SON.bien();
    if (JG.hechas.size === JG.cartas.length) { RES = { estrellas: JG.err <= 1 ? 3 : JG.err <= 3 ? 2 : 1, tipo: 'juego', err: JG.err }; SON.fin(); const j = JG; setTimeout(() => { if (JG === j && scr === 'juego') go('res'); }, 450); } else pintar();
  } else { JG.err++; SON.mal(); el.classList.add('mal'); const j = JG; setTimeout(() => { if (JG === j && scr === 'juego') { JG.sel = null; pintar(); } }, 380); }
}

/* ---------- Resultado ---------- */
SC.res = () => {
  const r = RES;
  const titulo = r.estrellas === 3 ? '¡Fantástico!' : r.estrellas === 2 ? '¡Muy bien!' : r.estrellas === 1 ? '¡Buen trabajo!' : '¡Sigue practicando!';
  if (r.tipo === 'diario') return resDiario(r);
  if (r.tipo === 'diag') return resDiag(r);
  const det = r.tipo === 'juego' ? `Parejas encontradas con ${r.err} ${r.err === 1 ? 'fallo' : 'fallos'}.` : r.tipo === 'guiada' ? 'Has practicado el truco paso a paso.' : `${r.ok} de ${r.n} a la primera.${r.mejora ? ' ¡Nuevo récord de estrellas!' : ''}`;
  setTimeout(() => { if (scr === 'res') decir(titulo); }, 300);
  const otra = r.tipo === 'juego' ? 'empezarJuego()' : `empezar('${r.tipo}')`, volver = r.tipo === 'repaso' ? "go('inicio')" : r.tipo === 'tablas' ? "go('tablas')" : "go('estr')";
  const sig = r.tipo === 'guiada' ? `<button class="bt w" onclick="empezar('reto')">${ico('star', 20)}Hacer el reto</button>` : '';
  return `<div class="res pop">${mascota(140, r.estrellas >= 2 ? 'feliz' : 'normal')}<div class="estr">${estrellasHTML(r.estrellas, 3, 50)}</div>
  <h2>${titulo}</h2><p class="mut" style="margin:0;font-size:1.1rem">${det}</p>${nuevaPiedra(r)}</div>
  <div style="display:flex;flex-direction:column;gap:10px">${sig}<div class="acts"><button class="bt sec" onclick="${otra}">${ico('refresh', 20)}Otra vez</button><button class="bt${sig ? ' sec' : ''}" onclick="${volver}">Seguir${ico('chev', 20, 2.4)}</button></div></div>`;
};
