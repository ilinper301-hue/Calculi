/* ===== Zona del tutor (sobria, letra Inter), protegida con PIN de 4 cifras ===== */
const TZ = { curso: 0, tab: 'prog', fase: '', pin: '', pin1: '', hasta: 0, destino: 'tz', sub: '' };

function abrirTutor(destino = 'tz') {
  TZ.destino = destino; TZ.pin = '';
  if (Date.now() < TZ.hasta && EST.ajustes.pin) return irDestino();
  TZ.fase = EST.ajustes.pin ? 'pedir' : 'crear'; go('pin');
}
function irDestino() { if (TZ.destino === 'docente') { MODO_DOCENTE = true; ALU_DOCENTE.curso = VCURSO = EST.ajustes.curso || 1; go('inicio'); } else { TZ.sub = ''; go('tz'); } }

SC.pin = () => {
  const T = { crear: ['Crea un PIN de 4 cifras', 'Se pedirá para entrar en la Zona del tutor y en el Modo Docente. Tras escribirlo, no se vuelve a pedir durante 5 minutos.'],
    repetir: ['Repite el PIN', 'Escríbelo otra vez para confirmarlo.'], pedir: ['Zona del tutor', 'Escribe el PIN de 4 cifras.'] }[TZ.fase];
  const k = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button onclick="pinTecla('${n}')">${n}</button>`).join('');
  return `<div class="tz">${atras('Inicio', "go('inicio')", 'home')}</div><div class="gcard tz pinw pop" style="margin-top:6px">
  <span class="lk">${ico('lock', 26)}</span><h2>${T[0]}</h2><p>${T[1]}</p>
  <div class="pd" id="pd">${[0, 1, 2, 3].map(i => `<i class="${i < TZ.pin.length ? 'f' : ''}"></i>`).join('')}</div>
  <div class="pk">${k}<span></span><button onclick="pinTecla('0')">0</button><button onclick="pinTecla('b')" aria-label="Borrar">${ico('backspace', 22)}</button></div>
  ${TZ.fase === 'pedir' ? '<p style="font-size:.8rem">¿Lo has olvidado? Borra los datos del sitio en el navegador (se pierde el progreso) o restaura una copia.</p>' : ''}</div>`;
};
function pinTecla(t) {
  if (t === 'b') TZ.pin = TZ.pin.slice(0, -1); else if (TZ.pin.length < 4) TZ.pin += t;
  pintar(); if (TZ.pin.length < 4) return;
  setTimeout(() => {
    if (TZ.fase === 'crear') { TZ.pin1 = TZ.pin; TZ.pin = ''; TZ.fase = 'repetir'; pintar(); }
    else if (TZ.fase === 'repetir') {
      if (TZ.pin === TZ.pin1) { EST.ajustes.pin = TZ.pin; guardarAjustes(); TZ.hasta = Date.now() + 3e5; toast('PIN guardado'); irDestino(); }
      else { TZ.pin = ''; TZ.fase = 'crear'; mal(); }
    } else { if (TZ.pin === EST.ajustes.pin) { TZ.hasta = Date.now() + 3e5; irDestino(); } else { TZ.pin = ''; mal(); } }
  }, 180);
  function mal() { SON.mal(); pintar(); const d = $('#pd'); if (d) d.classList.add('mal'); }
}
/** Los ajustes se guardan aunque se esté en Modo Docente (el progreso no). */
function guardarAjustes() { const md = MODO_DOCENTE; MODO_DOCENTE = false; guardar(); MODO_DOCENTE = md; }

/* ---------- Pantalla principal de la zona ---------- */
SC.tz = () => {
  if (TZ.sub === 'resumen') return resumenFamilias();
  if (TZ.sub.startsWith('animal:')) { const al = EST.alu.find(x => x.id === TZ.sub.slice(7)); if (al) return `<div class="tz" style="display:flex;flex-direction:column;gap:14px">${atras('Alumnos', "TZ.sub='';pintar()")}<h2 style="font-size:1.3rem;font-weight:600">Animalito de ${esc(al.n)}</h2>${elegirAnimal(al.av, 'cambiarAnimal')}<p class="note">Los animalitos que ya tiene otro alumno también se pueden elegir.</p></div>`; }
  const a = EST.alu.find(x => x.id === EST.act) || null, doc = EST.ajustes.perfil === 'docente' || EST.alu.length > 1;
  const tabs = [['prog', 'Progreso'], ...(doc ? [['clase', 'Clase']] : []), ['aula', 'Aula'], ['alu', 'Alumnos'], ['aj', 'Ajustes']];
  if (!tabs.some(t => t[0] === TZ.tab)) TZ.tab = 'prog';
  const cab = `<div class="tzh">${a ? avatar(a) : `<span class="av" style="background:var(--ac)">${ico('users', 22)}</span>`}<div class="tzn"><b>${a ? esc(a.n) : 'Sin alumnos'}</b><small>Zona del tutor</small></div>
  <button class="rnd" onclick="go('inicio')" aria-label="Cerrar">${ico('x', 20, 2.4)}</button></div>`;
  const cuerpo = { prog: () => tzProgreso(a), clase: tzClase, aula: tzAula, alu: tzAlumnos, aj: tzAjustes }[TZ.tab]();
  return `<div class="tz" style="display:flex;flex-direction:column;gap:14px">${cab}
  <div class="seg">${tabs.map(([k, t]) => `<button class="${TZ.tab === k ? 'on' : ''}" onclick="TZ.tab='${k}';pintar()">${t}</button>`).join('')}</div>${cuerpo}</div>`;
};
const fila = (icono, t, s, act, der = `<span class="chev">${ico('chev', 18)}</span>`, cls = '') => `<button class="row ${cls}" onclick="${act}">${icono ? ico(icono, 20) : ''}<span class="tx2"><span>${t}</span>${s ? `<small>${s}</small>` : ''}</span>${der}</button>`;
function barraDom(a, e) {
  const d = dominio(a, e.id), s = semaforo(a, e.id);
  return `<span class="dom"><span class="bar"><i class="${s}" style="width:${d === null ? 0 : Math.max(6, Math.round(d * 100))}%"></i></span><span class="pc">${d === null ? '—' : Math.round(d * 100) + '%'}</span></span>`;
}
function semana(a) {
  const hoyD = new Date(), lunes = new Date(hoyD); lunes.setDate(hoyD.getDate() - ((hoyD.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(lunes); d.setDate(lunes.getDate() + i); const k = d.toISOString().slice(0, 10); return { k, n: a.dia[k] || 0, l: 'LMXJVSD'[i] }; });
}
function racha(a) { let n = 0; const d = new Date(); for (;;) { const k = d.toISOString().slice(0, 10); if (a.dias.includes(k)) n++; else if (n || k !== hoy()) break; d.setDate(d.getDate() - 1); if (n > 400) break; } return n; }

function tzProgreso(a) {
  if (!a) return `<p class="note">Añade un alumno en la pestaña Alumnos.</p>`;
  const sem = semana(a), max = Math.max(5, ...sem.map(x => x.n)), L = ESTR.delCurso(cursoDe(a)), dom = L.filter(e => semaforo(a, e.id) === 'v').length;
  const reforzar = ESTR.lista.filter(e => e.curso <= cursoDe(a) && ['r', 'a'].includes(semaforo(a, e.id)));
  return `<div class="stats"><div><b>${sem.reduce((s, x) => s + x.n, 0)}</b><small>Esta semana</small></div><div><b>${racha(a)} ${racha(a) === 1 ? 'día' : 'días'}</b><small>Racha</small></div>
  <div><b>${totalEstrellas(a)}</b><small>Estrellas</small></div><div><b>${dom}/${L.length}</b><small>Dominados ${nomCurso(cursoDe(a))}</small></div></div>
  <div class="wk">${sem.map(x => `<div><i class="${x.n ? 'on' : ''}" style="height:${Math.round((x.n / max) * 100)}%"></i><small>${x.l}</small></div>`).join('')}</div>
  <div class="gt">Para reforzar</div><div class="list">${reforzar.length ? reforzar.map(e => fila('', esc(e.n), `Truco: ${esc(e.truco)}`, `EID='${e.id}';go('estr')`, barraDom(a, e))).join('') : `<div class="row"><span class="tx2"><span>Nada pendiente</span><small>Aparecen aquí los trucos con menos del 80 % de aciertos.</small></span></div>`}</div>
  <div class="gt">Dominio por truco · ${nomCurso(cursoDe(a))}</div><div class="list">${L.map(e => fila('', esc(e.n), `${['', '1.er', '2.º', '3.er'][e.tri]} trimestre · ${'★'.repeat((a.e[e.id] || {}).est || 0) || 'sin estrellas'}`, `EID='${e.id}';go('estr')`, barraDom(a, e))).join('')}</div>
  ${(() => { const E = erroresClase([a]).slice(0, 4); return E.length ? `<div class="gt">Sus errores más repetidos</div><div class="list">${E.map(x => `<div class="row"><span class="tx2"><span>${esc(x.pista)}</span><small>${esc(x.truco)} · ${x.veces} ${x.veces === 1 ? 'vez' : 'veces'}</small></span></div>`).join('')}</div>` : ''; })()}
  <div class="gt">Seguimiento</div><div class="list">
  ${fila('target', 'Prueba inicial', a.diag ? `Hecha el ${a.diag.split('-').reverse().join('/')}. Se puede repetir.` : 'Decide por qué truco empieza', "EST.act='" + a.id + "';guardarAjustes();empezar('diag')")}
  ${fila('family', 'Resumen para las familias', 'Texto de la semana para enviar', "TZ.sub='resumen';pintar()")}
  ${fila('monitor', 'Herramientas de aula', 'Proyector, duelo, fichas y evaluación', "TZ.tab='aula';pintar()")}</div>
  <p class="note">El dominio se calcula con los 10 últimos intentos sin ayuda de cada truco (verde ≥ 80 %, ámbar ≥ 50 %).</p>`;
}
function tzClase() {
  if (!EST.alu.length) return '<p class="note">Aún no hay alumnos.</p>';
  const c = TZ.curso || EST.ajustes.curso || 1, L = ESTR.delCurso(c), AL = EST.alu.filter(a => cursoDe(a) === c);
  const sel = chipsCurso(c, 'cursoClase', ESTR.cursos());
  if (!AL.length) return sel + `<p class="note">No hay alumnos de ${nomCurso(c)}. Cambia el curso de cada alumno en la pestaña Alumnos.</p>`;
  return `${sel}<div class="tbl"><table><tr><th>Alumno</th>${L.map(e => `<th title="${esc(e.n)}">${e.orden}</th>`).join('')}<th>★</th></tr>
  ${AL.map(a => `<tr><td><button onclick="EST.act='${a.id}';guardarAjustes();TZ.tab='prog';pintar()" style="font-weight:500">${esc(a.n)}</button></td>${L.map(e => `<td><i class="sem ${semaforo(a, e.id)}"></i></td>`).join('')}<td>${totalEstrellas(a)}</td></tr>`).join('')}</table></div>
  ${(() => { const E = erroresClase(AL).filter(x => (ESTR.get(x.id) || {}).curso === c).slice(0, 8); return `<div class="gt">Errores más frecuentes de la clase</div>` + (E.length ? `<div class="list">${E.map(x => `<div class="row"><span class="tx2"><span>${esc(x.pista)}</span><small>${esc(x.truco)} · ${x.alumnos.length} ${x.alumnos.length === 1 ? 'alumno' : 'alumnos'} (${esc(x.alumnos.slice(0, 4).join(', '))}${x.alumnos.length > 4 ? '…' : ''}) · ${x.veces} veces</small></span></div>`).join('')}</div><p class="note">Ideas para trabajar en la pizarra: empieza por el error que comparten más alumnos.</p>` : '<p class="note">Aún no hay errores registrados.</p>'); })()}
  <p class="note"><i class="sem v"></i> ≥ 80 % · <i class="sem a"></i> ≥ 50 % · <i class="sem r"></i> menos · <i class="sem g"></i> sin datos. Números = orden de los trucos:</p>
  <div class="list">${L.map(e => `<div class="row"><span class="val" style="width:22px">${e.orden}</span><span class="tx2"><span>${esc(e.n)}</span></span><span class="val">${AL.filter(a => semaforo(a, e.id) === 'v').length}/${AL.length} dominan</span></div>`).join('')}</div>`;
}
function cursoClase(c) { TZ.curso = c; pintar(); }
function tzAula() {
  return `<div class="gt">En clase</div><div class="list">
  ${fila('monitor', 'Modo proyector', 'Una operación en grande, con cuenta atrás opcional', "abrirAula('proy')")}
  ${fila('users', 'Duelo por equipos', 'Azul contra naranja en la pizarra digital', "abrirAula('duelo')")}
  ${fila('grad', 'Bingo de cálculo', 'Cartones para imprimir y operaciones en la pizarra', "abrirAula('bingo')")}
  ${fila('star', 'Reto de la clase', 'Meta de aciertos de la semana entre todos', "EST.ajustes.reto=({0:200,200:500,500:1000,1000:2000,2000:0})[EST.ajustes.reto|0]??0;guardarAjustes();pintar()", `<span class="val">${EST.ajustes.reto ? EST.ajustes.reto + ' aciertos' : 'Desactivado'}</span>`)}
  ${fila('grad', 'Modo Docente', 'Todo abierto, sin guardar: para explicar un truco', "MODO_DOCENTE=true;ALU_DOCENTE.curso=VCURSO=EST.ajustes.curso||1;go('inicio')")}</div>
  ${retoHTML()}
  <div class="gt">Para imprimir</div><div class="list">${fila('download', 'Fichas de ejercicios', 'Elige trucos y número de ejercicios; con soluciones', "abrirAula('ficha')")}
  ${fila('family', 'Informes para familias', 'Una página por alumno con su progreso y consejos', "INF.ids=null;go('informe')")}</div>
  <div class="gt">Evaluación</div><div class="list">
  ${fila('chart', 'Descargar evaluación (CSV)', 'Dominio, estrellas e intentos de cada alumno en cada truco', 'csvTabula()')}
  ${fila('book', 'Datos para Tabula', 'Calculi deja el resumen en este dispositivo para que Tabula lo lea', "publicarTabula();toast('Resumen actualizado para Tabula')", `<span class="val">Actualizar</span>`)}</div>
  <p class="note">Tabula y Calculi comparten dirección (ilinper301-hue.github.io), así que en el mismo navegador Tabula puede leer el resumen sin conexión ni cuentas.</p>`;
}
function tzAlumnos() {
  const imp = alumnosDeOtrasApps();
  return `<div style="display:flex;gap:8px"><input class="inp" id="nn" maxlength="20" placeholder="Nombre del alumno" style="font-size:1rem;padding:10px 12px;border-radius:12px" onkeydown="if(event.key==='Enter')anadirTz()"><button class="bt" onclick="anadirTz()">${ico('plus', 18)}Añadir</button></div><p class="note">Los alumnos nuevos se crean en ${nomCurso(EST.ajustes.curso || 1)} (cámbialo en Ajustes › Curso de la clase).</p>
  <div class="list">${EST.alu.map(a => `<div class="row"><button onclick="TZ.sub='animal:${a.id}';pintar()" aria-label="Cambiar animal">${avatar(a, 'style="width:38px;height:38px;font-size:1.3rem;box-shadow:none"')}</button><span class="tx2"><span>${esc(a.n)}${a.id === EST.act ? ' · activo' : ''}</span><small>${nomCurso(cursoDe(a))} · ${totalEstrellas(a)} estrellas · ${a.dias.length ? 'último día ' + a.dias[a.dias.length - 1].split('-').reverse().join('/') : 'sin actividad'}</small></span>
  <select onchange="cambiarCurso('${a.id}',+this.value)" aria-label="Curso" style="font:500 .85rem var(--fi);padding:6px;border-radius:10px;border:1px solid var(--bd);background:var(--card);color:var(--tx)">${[1, 2, 3, 4, 5, 6].map(c => `<option value="${c}" ${cursoDe(a) === c ? 'selected' : ''}>${nomCurso(c)}</option>`).join('')}</select><button class="rnd" style="width:36px;height:36px" onclick="renombrar('${a.id}')" aria-label="Renombrar">${ico('pencil', 16)}</button><button class="rnd" style="width:36px;height:36px;color:var(--no)" onclick="borrarAlu('${a.id}')" aria-label="Borrar">${ico('trash', 16)}</button></div>`).join('') || '<div class="row"><span class="tx2"><span>Aún no hay alumnos</span></span></div>'}</div>
  ${imp.length ? `<div class="gt">De tus otras apps en este dispositivo</div><div class="list">${imp.slice(0, 40).map(x => fila('plus', esc(x.n), x.de, `crearAlumno(${esc(JSON.stringify(x.n))},${x.av ?? 'avLibre()'});guardarAjustes();toast('Añadido');pintar()`, '')).join('')}</div>` : ''}`;
}
function anadirTz() { const n = $('#nn').value.trim(); if (!n) return $('#nn').focus(); const act = EST.act; crearAlumno(n, avLibre()); if (act) EST.act = act; guardarAjustes(); pintar(); }
function cambiarAnimal(i) { const al = EST.alu.find(x => x.id === TZ.sub.slice(7)); if (al) { al.av = i; al.mt = Date.now(); guardarAjustes(); } TZ.sub = ''; pintar(); }
function cambiarCurso(id, c) { const a = EST.alu.find(x => x.id === id); a.curso = c; a.mt = Date.now(); guardarAjustes(); pintar(); }
function renombrar(id) { const a = EST.alu.find(x => x.id === id), n = prompt('Nuevo nombre', a.n); if (n && n.trim()) { a.n = ss(n, 20); a.mt = Date.now(); guardarAjustes(); pintar(); } }
function borrarAlu(id) { const a = EST.alu.find(x => x.id === id); if (!confirm(`¿Borrar a ${a.n} y todo su progreso?`)) return; EST.alu = EST.alu.filter(x => x.id !== id); if (EST.act === id) EST.act = EST.alu[0] ? EST.alu[0].id : null; guardarAjustes(); pintar(); }

function tzAjustes() {
  const A = EST.ajustes, sw = (k, t, s) => fila('', t, s, `EST.ajustes.${k}=!EST.ajustes.${k};guardarAjustes();pintar()`, `<span class="sw${A[k] ? ' on' : ''}"></span>`);
  const tema = { auto: 'Automático', light: 'Claro', dark: 'Oscuro' }[A.tema];
  return `<div class="gt">Aula</div><div class="list">
  ${fila('users', 'Perfil', A.perfil === 'docente' ? 'Docente: toda la clase' : 'Familias: en casa', "EST.ajustes.perfil=EST.ajustes.perfil==='docente'?'familia':'docente';guardarAjustes();pintar()", `<span class="val">Cambiar</span>`)}
  ${fila('grad', 'Curso de la clase', 'Para los alumnos nuevos y la pestaña Clase', "EST.ajustes.curso=(EST.ajustes.curso||1)%6+1;guardarAjustes();pintar()", `<span class="val">${nomCurso(EST.ajustes.curso || 1)}</span>`)}
  ${sw('abierto', 'Todos los trucos abiertos', 'También los de cursos superiores')}
  ${fila('monitor', 'Modo Docente', 'Todo abierto, sin guardar progreso', "MODO_DOCENTE=true;ALU_DOCENTE.curso=VCURSO=EST.ajustes.curso||1;go('inicio')")}</div>
  <div class="gt">Sonido y aspecto</div><div class="list">${sw('voz', 'Voz', 'Lee en voz alta las explicaciones')}${sw('sonido', 'Sonidos', 'Aciertos, fallos y final')}${sw('dalton', 'Colores para daltonismo', 'Acierto en azul y error en bermellón')}
  ${fila(temaOscuro() ? 'moon' : 'sun', 'Tema', '', "EST.ajustes.tema={auto:'light',light:'dark',dark:'auto'}[EST.ajustes.tema];guardarAjustes();pintar()", `<span class="val">${tema}</span>`)}</div>
  <div class="gt">Seguridad y datos</div><div class="list">
  ${fila('key', 'Cambiar PIN', '', "EST.ajustes.pin='';TZ.hasta=0;abrirTutor()")}
  ${fila('download', 'Guardar copia de seguridad', 'Archivo con todos los alumnos y su progreso', 'exportar()')}
  ${fila('upload', 'Restaurar copia', '', 'importar()')}
  ${fila('trash', 'Borrar todos los datos', 'No se puede deshacer', 'borrarTodo()', '', 'dz')}</div>
  <p class="note">Calculi · Los datos se guardan solo en este dispositivo. La sincronización con Google llegará pronto.</p>`;
}
function exportar() { const b = new Blob([JSON.stringify(EST, null, 1)], { type: 'application/json' }), u = URL.createObjectURL(b), l = document.createElement('a'); l.href = u; l.download = `calculi-copia-${hoy()}.json`; l.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); try { localStorage.setItem('calc.bk', Date.now()); } catch (e) {} toast('Copia descargada'); }
function importar() {
  const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
  i.onchange = () => { const f = i.files[0]; if (!f) return; f.text().then(t => { try { const d = migrar(JSON.parse(t)); if (confirm(`La copia tiene ${d.alu.length} alumnos. ¿Sustituir los datos actuales?`)) { EST = d; guardarAjustes(); pintar(); toast('Copia restaurada'); } } catch (e) { alert('Ese archivo no es una copia de Calculi.'); } }); };
  i.click();
}
function borrarTodo() { if (!confirm('¿Borrar todos los alumnos, el progreso y los ajustes de Calculi?')) return; EST = estadoVacio(); guardarAjustes(); try { localStorage.removeItem('calc.wel'); } catch (e) {} WEL = 0; go('wel'); }

/* ---------- Resumen para las familias ---------- */
function textoResumen(a) {
  const sem = semana(a), n = sem.reduce((s, x) => s + x.n, 0), d = sem.filter(x => x.n).length;
  const dom = ESTR.delCurso(cursoDe(a)).filter(e => semaforo(a, e.id) === 'v'), ref = ESTR.lista.filter(e => e.curso <= cursoDe(a) && ['r', 'a'].includes(semaforo(a, e.id)));
  const ahora = sugerida(a);
  let t = `Resumen de cálculo mental de ${a.n}\n\nEsta semana ha hecho ${n} ejercicios en ${d} ${d === 1 ? 'día' : 'días'} y lleva ${totalEstrellas(a)} estrellas en total.\n`;
  if (dom.length) t += `\nYa domina: ${dom.map(e => e.n.toLowerCase()).join(', ')}.\n`;
  t += `\nAhora está aprendiendo: ${ahora.n.toLowerCase()} («${ahora.truco.toLowerCase()}»).\n`;
  if (ref.length) t += `\nPara reforzar en casa:\n${ref.slice(0, 3).map(e => `· ${e.n}: ${e.truco.toLowerCase()}.`).join('\n')}\n`;
  return t + '\nCinco minutos al día de cálculo mental marcan la diferencia. ¡Gracias por vuestra ayuda!';
}
function resumenFamilias() {
  const a = alumno(), t = a ? textoResumen(a) : '';
  return `<div class="tz" style="display:flex;flex-direction:column;gap:14px">${atras('Zona del tutor', "TZ.sub='';pintar()")}<h2 style="font-size:1.4rem;font-weight:600">Resumen para las familias</h2>
  <p class="note">Puedes editar el texto antes de copiarlo.</p><textarea class="txa" id="txr">${esc(t)}</textarea>
  <button class="bt" onclick="navigator.clipboard&&navigator.clipboard.writeText($('#txr').value).then(()=>toast('Texto copiado'),()=>{$('#txr').select();document.execCommand('copy');toast('Texto copiado')})">${ico('copy', 18)}Copiar texto</button></div>`;
}
