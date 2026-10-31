/* ===== Cálculo diario, colección de piedrecitas, modo daltonismo y resumen para Tabula ===== */

/* ---------- Cálculo diario: 2 minutos mezclando trucos, contra tu propio récord ---------- */
function trucosDiario(a) {
  const L = ESTR.lista.filter(e => e.curso <= cursoDe(a) && abierta(a, e) && (a.e[e.id] || {}).n > 0);
  return L.length ? L : ESTR.delCurso(cursoDe(a)).filter(e => abierta(a, e)).slice(0, 3);
}
function itemDiario(a, prev) {
  const L = trucosDiario(a); let e, it, nivel;
  for (let k = 0; k < 10; k++) { e = pick(L); nivel = (dominio(a, e.id) ?? 0) >= .8 ? 3 : 2; it = e.item(nivel); if (!prev || it.q !== prev.q) break; }
  return Object.assign({ id: e.id, nivel }, prepararItem(it, nivel));
}
const tiempoDiario = () => { const q = Math.max(0, SES.lim - Math.floor((Date.now() - SES.t0) / 1000)); return `${Math.floor(q / 60)}:${String(q % 60).padStart(2, '0')}`; };
function relojDiario() {
  const s = SES, t = setInterval(() => {
    if (SES !== s || scr !== 'ej') return clearInterval(t);
    const r = $('#reloj'), g = $('#pgi'); if (r) r.textContent = tiempoDiario(); if (g) g.style.width = Math.min(100, ((Date.now() - SES.t0) / 1000 / SES.lim) * 100) + '%';
    if (Date.now() - SES.t0 >= SES.lim * 1000 && !SES.bloq) { clearInterval(t); terminar(); }
  }, 250);
}
const diarioHoy = a => (a.diario.d || {})[hoy()] !== undefined;
function terminarDiario(a, antes) {
  const ok = SES.ok, rec = ok > (a.diario.mejor || 0) && !MODO_DOCENTE;
  if (!MODO_DOCENTE) { a.diario.d[hoy()] = Math.max(ok, a.diario.d[hoy()] || 0); if (rec) a.diario.mejor = ok; a.mt = Date.now(); guardar(); }
  RES = { tipo: 'diario', ok, rec, mejor: a.diario.mejor, nuevas: piedrasDe(a) - antes, desde: antes };
  SON.fin(); go('res');
}
function resDiario(r) {
  setTimeout(() => { if (scr === 'res') decir(r.rec ? '¡Nuevo récord!' : '¡Bien hecho!'); }, 300);
  return `<div class="res pop">${mascota(140, 'feliz')}<div class="big-n">${r.ok}</div><h2>${r.rec ? '¡Nuevo récord!' : r.ok ? '¡Bien hecho!' : '¡Mañana más!'}</h2>
  <p class="mut" style="margin:0;font-size:1.1rem">${r.ok} ${r.ok === 1 ? 'acierto' : 'aciertos'} en 2 minutos · Tu récord: ${r.mejor}</p>${nuevaPiedra(r)}</div>
  <div class="acts"><button class="bt sec" onclick="empezar('diario')">${ico('refresh', 20)}Otra vez</button><button class="bt" onclick="go('inicio')">Seguir${ico('chev', 20, 2.4)}</button></div>`;
}

/* ---------- Colección de piedrecitas (los «calculi» romanos) ----------
   Cada estrella ganada y cada día de cálculo diario dan una piedrecita. Cada una es distinta (color, forma y dibujo);
   una de cada diez es dorada. No se guarda nada nuevo: se calculan a partir del progreso. */
const piedrasDe = a => a && !MODO_DOCENTE ? totalEstrellas(a) + Object.keys(a.diario.d || {}).length : 0;
const PCOL = [['#F87171', '#B91C1C'], ['#FB923C', '#C2410C'], ['#FBBF24', '#B45309'], ['#A3E635', '#4D7C0F'], ['#34D399', '#047857'], ['#22D3EE', '#0E7490'],
  ['#60A5FA', '#1D4ED8'], ['#A78BFA', '#6D28D9'], ['#F472B6', '#BE185D'], ['#94A3B8', '#475569'], ['#D6B58C', '#8A6A3F']];
const PNOM = ['Ágata', 'Jaspe', 'Ámbar', 'Jade', 'Malaquita', 'Turquesa', 'Lapislázuli', 'Amatista', 'Cuarzo rosa', 'Granito', 'Arenisca'];
function piedra(k, tam = 64) {
  let x = (k + 1) * 2654435761 % 4294967296; const r = () => (x = (x * 1103515245 + 12345) % 2147483648) / 2147483648;
  const oro = (k + 1) % 10 === 0, [c1, c2] = oro ? ['#FCD34D', '#B45309'] : PCOL[k % PCOL.length];
  const pts = []; for (let i = 0; i < 12; i++) { const t = i / 12 * Math.PI * 2, rr = 34 + r() * 8; pts.push([50 + Math.cos(t) * rr * 1.1, 52 + Math.sin(t) * rr * .86]); }
  let d = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 0; i < 12; i++) { const p = pts[i], q = pts[(i + 1) % 12]; d += `Q${p[0]} ${p[1]} ${(p[0] + q[0]) / 2} ${(p[1] + q[1]) / 2}`; } d += 'Z';
  const tipo = Math.floor(r() * 4), id = 'pd' + k;
  const dib = tipo === 0 ? Array.from({ length: 5 }, () => `<circle cx="${30 + r() * 40}" cy="${34 + r() * 36}" r="${2 + r() * 4}" fill="${c2}" opacity=".45"/>`).join('')
    : tipo === 1 ? `<path d="M14 ${44 + r() * 8}Q50 ${30 + r() * 20} 88 ${46 + r() * 8}M16 ${60 + r() * 6}Q50 ${50 + r() * 16} 86 ${62 + r() * 6}" stroke="${c2}" stroke-width="3" fill="none" opacity=".4"/>`
    : tipo === 2 ? `<circle cx="50" cy="52" r="${10 + r() * 8}" fill="none" stroke="${c2}" stroke-width="3" opacity=".35"/><circle cx="50" cy="52" r="${20 + r() * 6}" fill="none" stroke="${c2}" stroke-width="2.5" opacity=".25"/>` : '';
  return `<svg width="${tam}" height="${tam}" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs>
  <ellipse cx="50" cy="92" rx="30" ry="4" fill="currentColor" opacity=".12"/><path d="${d}" fill="${c1}"/><g clip-path="url(#${id})">${dib}<path d="M20 70Q50 92 84 66L90 100H10Z" fill="${c2}" opacity=".25"/></g>
  <path d="M32 30Q44 22 58 25" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity="${oro ? .9 : .55}"/>${oro ? '<path d="M74 22l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z" fill="#fff"/>' : ''}</svg>`;
}
const nombrePiedra = k => (k + 1) % 10 === 0 ? 'Piedra dorada' : PNOM[k % PNOM.length];
function nuevaPiedra(r) {
  if (!r.nuevas || r.nuevas < 1) return '';
  const ks = Array.from({ length: Math.min(3, r.nuevas) }, (_, i) => r.desde + i);
  return `<button class="nueva-p" onclick="go('piedras')">${ks.map(k => piedra(k, 52)).join('')}<span><b>${r.nuevas === 1 ? '¡Nueva piedrecita!' : `¡${r.nuevas} piedrecitas nuevas!`}</b><small>${esc(ks.map(nombrePiedra).join(', '))} · Ver mi colección</small></span></button>`;
}
SC.piedras = () => {
  const a = alumno(), n = piedrasDe(a), hasta = Math.max(20, Math.ceil((n + 1) / 10) * 10);
  return `${atras('Inicio', "go('inicio')", 'home')}<h1 class="ttl">Mis piedrecitas</h1>
  <div class="greet" style="justify-content:flex-start">${mascota(70, 'feliz')}<div><div class="hi" style="font-size:1.4rem">${n} ${n === 1 ? 'piedrecita' : 'piedrecitas'}</div><p>Los romanos contaban con piedrecitas: los <i>calculi</i>. Gana más con estrellas y con el cálculo diario.</p></div></div>
  <div class="piedras-g">${Array.from({ length: hasta }, (_, k) => k < n ? `<div class="pz" title="${nombrePiedra(k)}">${piedra(k, 58)}<small>${nombrePiedra(k)}</small></div>` : `<div class="pz no">${ico('lock', 18)}<small>${(k + 1) % 10 === 0 ? 'Dorada' : '?'}</small></div>`).join('')}</div>`;
};

/* ---------- Modo daltonismo: correcto en azul y error en bermellón (paleta Okabe-Ito), semáforo con letras ---------- */
function aplicarDalton() { document.documentElement.classList.toggle('dalton', !!EST.ajustes.dalton); }

/* ---------- Resumen para Tabula ----------
   Calculi deja en este dispositivo (clave «calc.tabula», formato en docs/tabula.md) el dominio de cada alumno en cada truco.
   Tabula está en el mismo dominio y puede leerlo. También se puede descargar en CSV desde la Zona del tutor. */
function resumenTabula() {
  return { app: 'calculi', v: 1, ts: Date.now(), alumnos: EST.alu.map(a => ({ id: a.id, n: a.n, curso: cursoDe(a), estrellas: totalEstrellas(a), diasPractica: a.dias.length, ultimoDia: a.dias[a.dias.length - 1] || null,
    trucos: ESTR.lista.filter(e => (a.e[e.id] || {}).n > 0 || e.curso === cursoDe(a)).map(e => { const p = a.e[e.id] || {}, d = dominio(a, e.id); return { id: e.id, nombre: e.n, curso: e.curso, trimestre: e.tri, dominio: d === null ? null : Math.round(d * 100), semaforo: semaforo(a, e.id), estrellas: p.est || 0, intentos: p.n || 0, ultimo: p.ult || null }; }) })) };
}
function publicarTabula() { try { localStorage.setItem('calc.tabula', JSON.stringify(resumenTabula())); } catch (e) {} }
function csvTabula() {
  const R = resumenTabula(), q = v => `"${String(v ?? '').replace(/"/g, '""')}"`, filas = [['Alumno', 'Curso', 'Truco', 'Trimestre', 'Dominio (%)', 'Semáforo', 'Estrellas', 'Intentos', 'Última práctica']];
  const sem = { v: 'Verde', a: 'Ámbar', r: 'Rojo', g: 'Sin datos' };
  R.alumnos.forEach(a => a.trucos.forEach(t => filas.push([a.n, `${a.curso}.º`, t.nombre, t.trimestre, t.dominio ?? '', sem[t.semaforo], t.estrellas, t.intentos, t.ultimo || ''])));
  const b = new Blob(['﻿' + filas.map(f => f.map(q).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }), u = URL.createObjectURL(b), l = document.createElement('a');
  l.href = u; l.download = `calculi-evaluacion-${hoy()}.csv`; l.click(); setTimeout(() => URL.revokeObjectURL(u), 2000); toast('CSV descargado');
}
