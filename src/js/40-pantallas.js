/* ===== Pantallas ===== */
let scr = 'inicio', EID = null, SES = null, TUT = 0, NUEVO = { n: '', av: 0 }, AJ_OK = false, AJ_Q = null;
const SC = {};
const est = () => ESTR.get(EID);

function aplicarTema() {
  const t = EST.ajustes.tema, osc = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = osc ? 'dark' : 'light';
}
function go(s) { scr = s; VOZ.callar(); pintar(); window.scrollTo(0, 0); }
function pintar() { aplicarTema(); const A = $('#app'); A.innerHTML = SC[scr](); A.dataset.sc = scr; }
const barra = (titulo, atras, der = '') => `<div class="top"><button class="ib${atras ? '' : ' hid'}" onclick="${atras || ''}" aria-label="Volver">←</button><h1>${titulo}</h1>${der || '<span class="ib hid"></span>'}</div>`;
const avatar = a => { const [e, c] = AVATARES[a.av] || AVATARES[0]; return `<span class="av" style="background:${c}">${e}</span>`; };
const totalEstrellas = a => Object.values(a.e).reduce((s, p) => s + (p.est || 0), 0);
const decir = t => VOZ.decir(t);

/* ---------- Inicio: elegir alumno ---------- */
SC.inicio = () => {
  const pf = EST.alu.map(a => `<button class="pf" onclick="entrar('${a.id}')">${avatar(a)}${esc(a.n)}</button>`).join('');
  return `${barra('', '', '<button class="ib" onclick="abrirAjustes()" aria-label="Zona adultos">⚙️</button>')}
  <div class="splash"><div class="piedras"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="logo">Calculi<small>Trucos de cálculo mental</small></div>
  <div class="perfiles">${pf}<button class="pf nuevo" onclick="NUEVO={n:'',av:${EST.alu.length % AVATARES.length}};go('nuevo')"><span style="font-size:2rem">＋</span>Nuevo</button>
  <button class="pf md" onclick="MODO_DOCENTE=true;go('mapa')"><span style="font-size:2rem">🧑‍🏫</span>Modo Docente</button></div></div>`;
};
function entrar(id) { MODO_DOCENTE = false; EST.act = id; guardar(); go('mapa'); }

SC.nuevo = () => {
  const avs = AVATARES.map(([e, c], i) => `<button class="pf${NUEVO.av === i ? ' sel' : ''}" style="padding:8px;${NUEVO.av === i ? 'outline:4px solid var(--ac2)' : ''}" onclick="NUEVO.av=${i};pintar()"><span class="av" style="background:${c}">${e}</span></button>`).join('');
  const imp = alumnosDeOtrasApps().slice(0, 30).map(x => `<button class="bt sec" style="font-size:1rem;min-height:48px;padding:8px 14px" onclick="crearAlumno('${esc(x.n)}',${EST.alu.length % AVATARES.length});pintar()">＋ ${esc(x.n)} <small style="color:var(--mu)">(${x.de})</small></button>`).join('');
  return `${barra('Nuevo alumno', "go('inicio')")}<div class="main" style="align-items:center;text-align:center">
  <input class="inp" id="nom" maxlength="20" placeholder="Nombre" value="${esc(NUEVO.n)}" oninput="NUEVO.n=this.value" autocomplete="off">
  <div class="perfiles" style="grid-template-columns:repeat(6,1fr);max-width:520px">${avs}</div>
  <button class="bt" onclick="if(NUEVO.n.trim()){crearAlumno(NUEVO.n,NUEVO.av);go('mapa')}else $('#nom').focus()">Crear</button>
  ${imp ? `<p style="color:var(--mu);margin:10px 0 0">Alumnos de tus otras apps en este dispositivo:</p><div class="fila">${imp}</div>` : ''}</div>`;
};

/* ---------- Mapa de estrategias ---------- */
SC.mapa = () => {
  const a = alumno(); if (!a) { scr = 'inicio'; return SC.inicio(); }
  const sug = sugerida(a), hayRepaso = ESTR.lista.some(e => (a.e[e.id] || {}).n > 0);
  const tri = [1, 2, 3].map(t => {
    const cs = ESTR.lista.filter(e => e.tri === t).map(e => {
      const p = a.e[e.id] || {}, ab = abierta(a, e), s = semaforo(a, e.id);
      return `<button class="es${ab ? '' : ' lock'}${e === sug && !MODO_DOCENTE ? ' sug' : ''}" onclick="${ab ? `EID='${e.id}';go('estr')` : 'SON.mal()'}">
      <span class="ic">${ab ? esc(e.ic) : '🔒'}</span><span><b>${esc(e.n)}</b><small>${s !== 'g' ? `<i class="sem ${s}"></i>` : ''}${esc(e.desc)}</small></span>
      <span class="st">${'⭐'.repeat(p.est || 0)}</span></button>`;
    }).join('');
    return cs ? `<p class="tri">${['', 'Primer', 'Segundo', 'Tercer'][t]} trimestre</p><div class="mapa">${cs}</div>` : '';
  }).join('');
  return `${barra(`${MODO_DOCENTE ? '🧑‍🏫' : AVATARES[a.av][0]} ${esc(a.n)}`, "MODO_DOCENTE=false;go('inicio')", `<span class="est">⭐ ${totalEstrellas(a)}</span>`)}
  <div class="main">${hayRepaso ? `<button class="repaso" onclick="empezar('repaso')"><span>🔁</span><span>Repaso del día<small>Mezcla de los trucos que ya conoces</small></span></button>` : ''}${tri}</div>`;
};

/* ---------- Menú de una estrategia ---------- */
SC.estr = () => {
  const e = est(), a = alumno(), p = a.e[e.id] || {};
  const f = (n, t, s, act, extra = '') => `<button class="fase" onclick="${act}"><span class="n">${n}</span><b>${t}</b><small>${s}</small>${extra}</button>`;
  return `${barra(esc(e.n), "go('mapa')")}<div class="main">
  <div class="fases">
  ${f('📖', 'Aprender', 'Mira cómo funciona el truco', 'TUT=0;go(\'tut\')', p.tut ? '<small class="ok">✓ Visto</small>' : '')}
  ${f('✏️', 'Practicar', 'Paso a paso, con ayuda', "empezar('guiada')")}
  ${f('🏆', 'Reto', '10 operaciones', "empezar('reto')", `<small>${p.est ? '⭐'.repeat(p.est) : 'Consigue estrellas'}</small>`)}
  ${f('🎲', 'Jugar', e.juego && e.juego.tipo === 'parejas' ? esc(e.juego.meta) : 'Operaciones rápidas', 'empezarJuego()')}
  </div></div>`;
};

/* ---------- Tutorial ---------- */
SC.tut = () => {
  const e = est(), s = e.tutorial[TUT], ult = TUT === e.tutorial.length - 1;
  setTimeout(() => decir(s.txt), 250);
  return `${barra(esc(e.n), "go('estr')")}<div class="main"><div class="tut pop">
  <div class="vis">${VIS.dibujar(s.vis)}</div>
  <div class="txt"><button class="voz" onclick="decir(${esc(JSON.stringify(s.txt))})" aria-label="Escuchar">🔊</button><span>${esc(s.txt)}</span></div>
  <div class="puntos-n">${e.tutorial.map((_, i) => `<i class="${i <= TUT ? 'on' : ''}"></i>`).join('')}</div>
  <div class="fila">${TUT ? '<button class="bt sec" onclick="TUT--;pintar()">← Atrás</button>' : ''}
  ${ult ? `<button class="bt" onclick="finTutorial()">¡A practicar!</button>` : '<button class="bt" onclick="TUT++;pintar()">Siguiente →</button>'}</div></div></div>`;
};
function finTutorial() { const a = alumno(); progreso(a, EID).tut = true; a.mt = Date.now(); guardar(); empezar('guiada'); }

/* ---------- Sesiones de ejercicios ---------- */
function empezar(tipo) {
  const a = alumno(), e = est();
  SES = { tipo, id: EID, i: 0, ok: 0, paso: 0, fallos: 0, ayuda: false, bloq: false, resp: '', hechos: [], t0: Date.now() };
  if (tipo === 'guiada') { SES.items = Array.from({ length: 4 }, () => e.guiada()); SES.n = 4; }
  else if (tipo === 'repaso') { SES.items = itemsRepaso(a, 10); SES.n = SES.items.length; if (!SES.n) return go('mapa'); }
  else { const p = a.e[e.id] || {}; SES.nivel = tipo === 'rapido' ? 2 : (dominio(a, e.id) ?? 0) >= .8 ? 2 : 1; SES.racha = 0; SES.n = 10; SES.items = [nuevoItem()]; }
  go('ej');
}
function nuevoItem() { const e = est(); return Object.assign({ id: e.id, nivel: SES.nivel }, prepararItem(e.item(SES.nivel), SES.nivel)); }
/** Pregunta actual: en la guiada, el paso actual (o la operación final con opciones). */
function actual() {
  const it = SES.items[SES.i];
  if (SES.tipo !== 'guiada') return it;
  if (SES.paso < it.pasos.length) { const ps = it.pasos[SES.paso]; return ps._p || (ps._p = prepararItem(ps, ps.teclado ? 3 : 1)); }
  return it._final || (it._final = prepararItem(it.final, 1));
}
const huecoHTML = (q, val, cls = '') => esc(q).split('?').join(`<span class="hueco ${cls}">${val === '' || val === undefined ? '&nbsp;' : esc(val)}</span>`);

SC.ej = () => {
  const c = actual(), it = SES.items[SES.i], nivel = it.nivel || 1, guiada = SES.tipo === 'guiada';
  const titulo = { guiada: 'Practicar', reto: 'Reto', repaso: 'Repaso', rapido: 'Rápido' }[SES.tipo];
  const verVis = c.vis && (c.visSiempre || guiada || nivel === 1 || SES.ayuda || SES.fallos > 0);
  const usarTeclado = !c.ops;
  let cuerpo;
  if (c.truco) cuerpo = `<div class="enun">¿Qué truco usarías?</div><div class="op">${esc(c.q)}</div>
    <div class="ops" style="grid-template-columns:1fr">${c.ops.map(o => `<button class="opc" style="font-size:1.3rem" onclick="responder(this.dataset.v,this)" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
  else cuerpo = `${guiada && SES.hechos.length ? `<div class="pasos-ok">${SES.hechos.map(h => `<div>✓ ${esc(h)}</div>`).join('')}</div>` : ''}
    ${guiada && SES.paso < it.pasos.length ? `<div class="paso">Paso ${SES.paso + 1}</div>` : ''}
    <div class="op pop">${huecoHTML(c.q, usarTeclado ? SES.resp : '')}</div>
    ${verVis ? `<div class="vis">${VIS.dibujar(c.vis)}</div>` : ''}
    <div class="fb" id="fb"></div>
    ${usarTeclado ? teclado() : `<div class="ops">${c.ops.map(o => `<button class="opc" onclick="responder(${o},this)">${o}</button>`).join('')}</div>`}
    ${!guiada && c.vis && !verVis ? '<button class="ayuda" onclick="SES.ayuda=true;pintar()">💡 Ayuda</button>' : ''}`;
  return `${barra(titulo, SES.tipo === 'repaso' ? "SES=null;go('mapa')" : "SES=null;go('estr')")}
  <div class="main"><div class="ej"><div class="prog"><i style="width:${(SES.i / SES.n) * 100}%"></i></div>
  <div class="enun"><button class="voz" onclick="decir(${esc(JSON.stringify(c.voz || c.txt || c.q))})" aria-label="Escuchar">🔊</button>${c.txt ? `<span>${esc(c.txt)}</span>` : ''}</div>${cuerpo}</div></div>`;
};
function teclado() {
  const k = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button onclick="tecla('${n}')">${n}</button>`).join('');
  return `<div class="teclado">${k}<button onclick="tecla('b')" aria-label="Borrar">⌫</button><button onclick="tecla('0')">0</button><button class="okb" onclick="tecla('ok')">OK</button></div>`;
}
function tecla(t) {
  if (SES.bloq) return;
  if (t === 'b') SES.resp = SES.resp.slice(0, -1);
  else if (t === 'ok') { if (SES.resp !== '') responder(+SES.resp); return; }
  else if (SES.resp.length < 3) SES.resp += t;
  const h = document.querySelector('.op .hueco'); if (h) h.innerHTML = SES.resp || '&nbsp;';
}
const BIEN = ['¡Muy bien!', '¡Genial!', '¡Eso es!', '¡Perfecto!', '¡Bravo!'], CASI = ['Casi. Mira la ayuda y prueba otra vez.', 'Uy, otra vez. Fíjate en el dibujo.'];
function feedback(txt, ok) { const f = $('#fb'); if (f) { f.className = 'fb ' + (ok ? 'ok' : 'no'); f.textContent = txt; } }

function responder(v, btn) {
  if (SES.bloq) return;
  const c = actual(), it = SES.items[SES.i], bien = String(v) === String(c.r);
  const hueco = document.querySelector('.op .hueco');
  if (bien) {
    SES.bloq = true; SON.bien(); if (btn) btn.classList.add('ok');
    if (hueco) { hueco.textContent = c.r; hueco.classList.add('ok'); }
    feedback(pick(BIEN), true);
    if (SES.tipo === 'guiada') {
      setTimeout(() => {
        if (SES.paso < it.pasos.length) { SES.hechos.push((c.txt ? c.txt + ' ' : '') + c.q.replace('?', c.r)); SES.paso++; SES.bloq = false; SES.resp = ''; SES.fallos = 0; pintar(); }
        else { SES.ok++; siguiente(); }
      }, 750);
      return;
    }
    const limpio = SES.fallos === 0 && !SES.ayuda;
    registrar(it.id, limpio); if (SES.fallos === 0) SES.ok++;
    if (SES.tipo === 'reto') { if (limpio) { if (++SES.racha >= 2 && SES.nivel < 3) { SES.nivel++; SES.racha = 0; } } else SES.racha = 0; }
    setTimeout(siguiente, 800);
  } else {
    SON.mal(); SES.fallos++; if (btn) { btn.classList.add('no'); btn.disabled = true; }
    if (hueco) { hueco.classList.add('no'); setTimeout(() => hueco.classList.remove('no'), 500); }
    SES.resp = '';
    if (SES.fallos >= 2 || c.truco) {
      SES.bloq = true;
      if (SES.tipo !== 'guiada') { registrar(it.id, false); if (SES.tipo === 'reto') { SES.racha = 0; SES.nivel = Math.max(1, SES.nivel - 1); } }
      if (hueco) { hueco.textContent = c.r; hueco.classList.add('ok'); }
      feedback(c.truco ? `Era: ${c.r}` : `Era ${c.r}. ¡La próxima sale!`, false);
      setTimeout(() => { if (SES.tipo === 'guiada') { if (SES.paso < it.pasos.length) { SES.hechos.push((c.txt ? c.txt + ' ' : '') + c.q.replace('?', c.r)); SES.paso++; } else { siguiente(); return; } SES.bloq = false; SES.fallos = 0; pintar(); } else siguiente(); }, 1900);
    } else if (SES.fallos === 1 && !SES.ayuda && c.vis && !(SES.tipo !== 'guiada' && (it.nivel || 1) === 1)) { SES.ayuda = true; pintar(); feedback(pick(CASI), false); }
    else feedback('Prueba otra vez.', false);
  }
}
function siguiente() {
  SES.i++; SES.paso = 0; SES.fallos = 0; SES.ayuda = false; SES.bloq = false; SES.resp = ''; SES.hechos = [];
  if (SES.i >= SES.n) return terminar();
  if (SES.tipo === 'reto' || SES.tipo === 'rapido') SES.items.push(nuevoItem());
  pintar();
}
function terminar() {
  const a = alumno(); let estrellas;
  if (SES.tipo === 'guiada') estrellas = 3;
  else estrellas = estrellasDe(SES.ok, SES.n);
  if (SES.tipo === 'reto') { const p = progreso(a, SES.id); if (estrellas > p.est) p.est = estrellas; a.mt = Date.now(); guardar(); }
  RES = { estrellas, ok: SES.ok, n: SES.n, tipo: SES.tipo, seg: Math.round((Date.now() - SES.t0) / 1000) };
  SON.fin(); go('res');
}

/* ---------- Juego de parejas ---------- */
let JG = null, RES = null;
function empezarJuego() {
  const e = est();
  if (!e.juego || e.juego.tipo !== 'parejas') return empezar('rapido');
  const pares = e.juego.pares().slice(0, 6);
  JG = { cartas: shuffle(pares.flatMap((p, k) => [{ t: String(p[0]), k }, { t: String(p[1]), k }])), sel: null, hechas: new Set(), err: 0, t0: Date.now() };
  go('juego');
}
SC.juego = () => {
  const e = est();
  return `${barra('Jugar', "go('estr')")}<div class="main" style="align-items:center"><div class="meta">${esc(e.juego.meta)}</div>
  <div class="tablero">${JG.cartas.map((c, i) => `<button class="carta${JG.hechas.has(i) ? ' hecha' : ''}${JG.sel === i ? ' sel' : ''}" onclick="carta(${i},this)">${esc(c.t)}</button>`).join('')}</div>
  <p style="color:var(--mu);margin:0">Toca dos tarjetas que vayan juntas</p></div>`;
};
function carta(i, el) {
  if (JG.hechas.has(i)) return;
  if (JG.sel === null) { JG.sel = i; el.classList.add('sel'); return; }
  if (JG.sel === i) { JG.sel = null; el.classList.remove('sel'); return; }
  const a = JG.cartas[JG.sel], b = JG.cartas[i];
  if (a.k === b.k) { JG.hechas.add(JG.sel).add(i); JG.sel = null; SON.bien(); if (JG.hechas.size === JG.cartas.length) { RES = { estrellas: JG.err <= 1 ? 3 : JG.err <= 3 ? 2 : 1, tipo: 'juego', err: JG.err, seg: Math.round((Date.now() - JG.t0) / 1000) }; SON.fin(); setTimeout(() => go('res'), 500); } else pintar(); }
  else { JG.err++; SON.mal(); el.classList.add('mal'); setTimeout(() => { JG.sel = null; pintar(); }, 380); }
}

/* ---------- Resultado ---------- */
SC.res = () => {
  const r = RES, s = [1, 2, 3].map(k => `<span class="${k <= r.estrellas ? '' : 'off'}">⭐</span>`).join('');
  const titulo = r.estrellas === 3 ? '¡Fantástico!' : r.estrellas === 2 ? '¡Muy bien!' : r.estrellas === 1 ? '¡Buen trabajo!' : '¡Sigue practicando!';
  const det = r.tipo === 'juego' ? `Parejas encontradas con ${r.err} ${r.err === 1 ? 'fallo' : 'fallos'}.` : r.tipo === 'guiada' ? 'Has practicado el truco paso a paso.' : `${r.ok} de ${r.n} a la primera.`;
  setTimeout(() => decir(titulo), 300);
  const otra = r.tipo === 'juego' ? 'empezarJuego()' : `empezar('${r.tipo}')`;
  const sig = r.tipo === 'guiada' ? `<button class="bt" onclick="empezar('reto')">🏆 Hacer el reto</button>` : '';
  return `${barra('', '')}<div class="res pop"><div class="estrellas">${s}</div><h2>${titulo}</h2><p>${det}</p>
  <div class="fila"><button class="bt sec" onclick="${otra}">↻ Otra vez</button>${sig}<button class="bt${sig ? ' sec' : ''}" onclick="go(${r.tipo === 'repaso' ? "'mapa'" : "'estr'"})">Seguir</button></div></div>`;
};

/* ---------- Zona de adultos (sencilla; la Zona del tutor con PIN llegará en la fase 3) ---------- */
function abrirAjustes() { AJ_OK = false; AJ_Q = [rnd(6, 9), rnd(6, 9)]; go('ajustes'); }
SC.ajustes = () => {
  if (!AJ_OK) return `${barra('Zona de adultos', "go('inicio')")}<div class="main adulto" style="align-items:center;text-align:center">
  <p>Para entrar, responde: ¿cuánto es ${AJ_Q[0]} × ${AJ_Q[1]}?</p><input class="inp" id="aj" inputmode="numeric" autocomplete="off">
  <button class="bt" onclick="if(+$('#aj').value===${AJ_Q[0] * AJ_Q[1]}){AJ_OK=true;pintar()}else{$('#aj').value='';SON.mal()}">Entrar</button></div>`;
  const A = EST.ajustes, sw = (k, t) => `<label style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">${t}<input type="checkbox" ${A[k] ? 'checked' : ''} onchange="EST.ajustes.${k}=this.checked;guardar()" style="width:24px;height:24px"></label>`;
  const filas = EST.alu.map(a => `<tr><td>${esc(a.n)}</td>${ESTR.lista.map(e => `<td title="${esc(e.n)}"><i class="sem ${semaforo(a, e.id)}"></i></td>`).join('')}<td><button class="bt sec" style="min-height:32px;padding:4px 10px" onclick="if(confirm('¿Borrar a ${esc(a.n)} y su progreso?')){EST.alu=EST.alu.filter(x=>x.id!=='${a.id}');guardar();pintar()}">Borrar</button></td></tr>`).join('');
  return `${barra('Zona de adultos', "go('inicio')")}<div class="main adulto">
  <div class="tarj"><b>Ajustes</b>${sw('voz', 'Voz')}${sw('sonido', 'Sonidos')}${sw('abierto', 'Todas las estrategias abiertas')}
  <label style="display:flex;justify-content:space-between;align-items:center;padding:8px 0">Tema<select onchange="EST.ajustes.tema=this.value;guardar();pintar()" style="font:inherit;padding:6px">${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([v, t]) => `<option value="${v}" ${A.tema === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label></div>
  <div class="tarj" style="overflow-x:auto"><b>Dominio por estrategia</b> <small style="color:var(--mu)">(<i class="sem v"></i>≥80 % · <i class="sem a"></i>≥50 % · <i class="sem r"></i>menos · <i class="sem g"></i>sin datos)</small>
  <table><tr><th>Alumno</th>${ESTR.lista.map(e => `<th title="${esc(e.n)}">${esc(e.ic)}</th>`).join('')}<th></th></tr>${filas || '<tr><td>Aún no hay alumnos.</td></tr>'}</table></div>
  <div class="tarj fila" style="justify-content:flex-start"><button class="bt sec" onclick="exportar()">⬇ Copia de seguridad</button><button class="bt sec" onclick="importar()">⬆ Restaurar copia</button></div></div>`;
};
function exportar() { const b = new Blob([JSON.stringify(EST, null, 1)], { type: 'application/json' }), u = URL.createObjectURL(b), l = document.createElement('a'); l.href = u; l.download = `calculi-copia-${hoy()}.json`; l.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); }
function importar() {
  const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
  i.onchange = () => { const f = i.files[0]; if (!f) return; f.text().then(t => { try { const d = migrar(JSON.parse(t)); if (confirm(`La copia tiene ${d.alu.length} alumnos. ¿Sustituir los datos actuales?`)) { EST = d; guardar(); pintar(); } } catch (e) { alert('Ese archivo no es una copia de Calculi.'); } }); };
  i.click();
}
