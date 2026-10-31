/* ===== Tutoriales para tocar =====
Una pantalla del tutorial puede llevar  toca: {...}  en lugar de (o además de) vis. El niño tiene que hacerlo para seguir.
  {t:'marco', a, tam=10, objetivo}            Marco con a fichas azules; toca casillas vacías para poner fichas naranjas hasta tener «objetivo» fichas en total.
  {t:'recta', desde, hasta, paso=1, inicio, objetivo}  Toca en la recta el número donde llegas (empieza en «inicio», marcado en azul).
  {t:'barra', partes, objetivo, total?}       Toca partes de la barra para colorear exactamente «objetivo» partes.
  {t:'matriz', filas, cols, objetivo}         Toca filas para marcar exactamente «objetivo» filas.
  {t:'elige', q, ops:[…], r}                  Pregunta rápida con botones (q con «?»).
La frase del tutorial (txt) explica qué hay que tocar. Al acertar se ve «¡Muy bien!» y se activa «Siguiente».
*/
let TOQ = null; // estado del dibujo tocable de la pantalla actual: {k: clave, sel: Set, ok, mal}

function tocaEstado(s) { const k = EID + ':' + TUT; if (!TOQ || TOQ.k !== k) TOQ = { k, sel: new Set(), ok: false, mal: 0, eleg: null }; return TOQ; }
function tocaHTML(T) {
  const st = tocaEstado(T), f = v => fmt(+(+v).toFixed(4));
  if (T.t === 'marco') {
    const tam = T.tam || 10, a = T.a || 0, c = 56, nM = tam > 10 ? 2 : 1, W = nM * 5 * c + (nM - 1) * 18 + 8;
    let s = `<svg class="toca" viewBox="0 0 ${W} ${2 * c + 8}" width="${Math.min(W, 640)}">`;
    for (let m = 0; m < nM; m++) { const ox = 4 + m * (5 * c + 18); s += `<rect x="${ox}" y="4" width="${5 * c}" height="${2 * c}" rx="8" style="fill:var(--vacio);stroke:var(--marco);stroke-width:4"/>`; }
    for (let k = 0; k < tam; k++) {
      const m = Math.floor(k / 10), j = k % 10, x = 4 + m * (5 * c + 18) + (j % 5) * c, y = 4 + Math.floor(j / 5) * c;
      const lleno = k < a ? '--f1' : st.sel.has(k) ? '--f2' : null;
      s += `<g ${k >= a && !st.ok ? `onclick="tocar(${k})" style="cursor:pointer"` : ''}><rect x="${x}" y="${y}" width="${c}" height="${c}" style="fill:transparent;stroke:var(--marco);stroke-width:2"/>${lleno ? `<circle cx="${x + c / 2}" cy="${y + c / 2}" r="${c * .36}" style="fill:var(${lleno})" class="pop"/>` : ''}</g>`;
    }
    return s + '</svg>';
  }
  if (T.t === 'recta') {
    const paso = T.paso || 1, n = Math.round((T.hasta - T.desde) / paso), W = 640, m = 30, X = v => m + ((v - T.desde) / (T.hasta - T.desde)) * (W - 2 * m), y = 70;
    let s = `<svg class="toca" viewBox="0 0 ${W} 130" width="${W}"><line x1="${m - 10}" y1="${y}" x2="${W - m + 10}" y2="${y}" style="stroke:var(--marco);stroke-width:4;stroke-linecap:round"/>`;
    const cada = n > 20 ? 5 : 1;
    for (let k = 0; k <= n; k++) {
      const v = +(T.desde + k * paso).toFixed(4), x = X(v), elegido = st.eleg !== null && Math.abs(st.eleg - v) < 1e-9;
      s += `<g onclick="tocarRecta(${v})" style="cursor:pointer"><rect x="${x - Math.max(10, (W - 2 * m) / n / 2)}" y="${y - 34}" width="${Math.max(20, (W - 2 * m) / n)}" height="80" style="fill:transparent"/>
      <line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 10}" style="stroke:var(--marco);stroke-width:2.5"/>${k % cada === 0 || v === T.inicio || elegido ? `<text x="${x}" y="${y + 38}" text-anchor="middle" style="font:500 ${n > 20 ? 16 : 20}px var(--fd);fill:var(--tx)">${f(v)}</text>` : ''}
      ${elegido ? `<circle cx="${x}" cy="${y}" r="12" style="fill:var(${st.ok ? '--ok' : '--no'})"/>` : ''}</g>`;
    }
    s += `<circle cx="${X(T.inicio)}" cy="${y}" r="10" style="fill:var(--f1)"/>`;
    if (st.ok) { const x1 = X(T.inicio), x2 = X(T.objetivo), h = Math.min(50, 20 + Math.abs(x2 - x1) * .3); s += `<path d="M${x1} ${y - 6}Q${(x1 + x2) / 2} ${y - 6 - 2 * h} ${x2} ${y - 6}" style="fill:none;stroke:var(--f2);stroke-width:4"/>`; }
    return s + '</svg>';
  }
  if (T.t === 'barra') {
    const W = 600, w = (W - 20) / T.partes;
    let s = `<svg class="toca" viewBox="0 0 ${W} ${T.total !== undefined ? 130 : 90}" width="${W}">`, y = T.total !== undefined ? 50 : 10;
    if (T.total !== undefined) s += `<text x="${W / 2}" y="32" text-anchor="middle" style="font:600 24px var(--fd);fill:var(--tx)">${f(T.total)}</text><path d="M10 44V38H${W - 10}V44" style="fill:none;stroke:var(--marco);stroke-width:3"/>`;
    for (let i = 0; i < T.partes; i++) s += `<rect onclick="tocar(${i})" style="cursor:pointer;fill:${st.sel.has(i) ? 'var(--f1)' : 'var(--vacio)'};stroke:var(--marco);stroke-width:3" x="${10 + i * w}" y="${y}" width="${w}" height="70"/>`;
    return s + '</svg>';
  }
  if (T.t === 'matriz') {
    const c = Math.max(22, Math.min(44, Math.floor(400 / Math.max(T.filas, T.cols)))), W = T.cols * c + 8;
    let s = `<svg class="toca" viewBox="0 0 ${W} ${T.filas * c + 8}" width="${Math.min(W, 420)}">`;
    for (let i = 0; i < T.filas; i++) {
      s += `<g onclick="tocar(${i})" style="cursor:pointer"><rect x="2" y="${4 + i * c}" width="${W - 4}" height="${c}" rx="8" style="fill:${st.sel.has(i) ? 'var(--acs)' : 'transparent'}"/>`;
      for (let j = 0; j < T.cols; j++) s += `<circle cx="${4 + j * c + c / 2}" cy="${4 + i * c + c / 2}" r="${c * .34}" style="fill:var(${st.sel.has(i) ? '--f2' : '--f1'})"/>`;
      s += '</g>';
    }
    return s + '</svg>';
  }
  if (T.t === 'elige') return `<div class="op">${huecoHTML(T.q, st.ok ? f(T.r) : '')}</div><div class="ops">${T.ops.map(o => `<button class="opc${st.ok && igual(o, T.r) ? ' ok' : ''}" onclick="tocarElige(${o},this)">${f(o)}</button>`).join('')}</div>`;
  return '';
}
function tocaComprobar() {
  const T = est().tutorial[TUT].toca, st = TOQ;
  if (T.t === 'marco') st.ok = (T.a || 0) + st.sel.size === T.objetivo;
  if (T.t === 'barra' || T.t === 'matriz') st.ok = st.sel.size === T.objetivo;
  if (st.ok) { SON.bien(); decir('¡Muy bien!'); }
  pintar();
}
function tocar(i) { const st = TOQ; if (!st || st.ok) return; st.sel.has(i) ? st.sel.delete(i) : st.sel.add(i); SON.tono(520, .06); tocaComprobar(); }
function tocarRecta(v) { const T = est().tutorial[TUT].toca, st = TOQ; if (!st || st.ok) return; st.eleg = v; st.ok = igual(v, T.objetivo); if (st.ok) { SON.bien(); decir('¡Muy bien!'); } else { SON.mal(); st.mal++; } pintar(); }
function tocarElige(v, btn) { const T = est().tutorial[TUT].toca, st = TOQ; if (!st || st.ok) return; if (igual(v, T.r)) { st.ok = true; SON.bien(); pintar(); } else { SON.mal(); btn.classList.add('no'); btn.disabled = true; } }
