/* ===== Modelos visuales (SVG). Cada estrategia los pide con un objeto {t:'tipo', ...}. =====
  marco   {t:'marco', a, b=0, tam=10|20, tachar=0}  Marco del 10 (o doble marco del 20). a fichas azules + b naranjas; tachar = últimas fichas tachadas (restar).
  puntos  {t:'puntos', n}                            Constelación de puntos (como en un dado) para reconocer sin contar (n ≤ 10).
  parte   {t:'parte', total, a, b, oculto}           Vínculo parte-todo (Singapur). oculto: 'total' | 'a' | 'b' | null → se ve «?».
  recta   {t:'recta', desde, hasta, inicio, saltos}  Recta numérica; saltos: lista de saltos (+1, -1, +10…) dibujados como arcos desde inicio.
  decenas {t:'decenas', grupos:[{d,u}], tachar=0}     Barras de 10 y cubitos sueltos; varios grupos = varios sumandos (colores alternos). tachar = últimas barras tachadas (restar decenas).
  dedos   {t:'dedos', n}                             Manos con n dedos levantados (n ≤ 10).
  matriz  {t:'matriz', filas, cols, partir=0, tachar=0}  Filas × columnas de puntos (multiplicar). partir = las primeras k filas en azul y el resto naranja (p. ej. ×6 = ×3 + ×3); tachar = últimas filas tachadas.
  barra   {t:'barra', partes, marcadas=0, total, valor, oculto}  Barra de Singapur partida en partes iguales; marcadas = partes sombreadas. total = número encima de la barra ('?' si se pregunta);
                                                     valor = número dentro de cada parte marcada. oculto: 'total' | 'valor'. Para fracciones y porcentajes.
  cien    {t:'cien', n, m=0}                         Cuadrícula de 10×10: n casillas azules (+ m naranjas). Porcentajes y centésimas.
  (decenas admite también placas de 100: grupos:[{c,d,u}])
  (recta admite decimales: paso = distancia entre marcas, p. ej. 0.1; saltos y números pueden ser decimales.
   En los ejercicios el motor pasa ocultarFin: el punto de llegada se rotula «?» para no dar la respuesta; en el tutorial se ve.)
*/
const VIS = {
  ficha(cx, cy, r, color, cls = 'f', i = 0) { return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}" style="fill:var(${color});animation-delay:${i * 45}ms"/>`; },

  marco({ a = 0, b = 0, tam = 10, tachar = 0 }) {
    const c = 56, nM = tam > 10 ? 2 : 1, W = nM * 5 * c + (nM - 1) * 18 + 8, H = 2 * c + 8;
    let s = `<svg class="fichas-anim" viewBox="0 0 ${W} ${H}" width="${Math.min(W, 640)}" role="img" aria-label="Marco con ${a + b} fichas">`;
    for (let m = 0; m < nM; m++) {
      const ox = 4 + m * (5 * c + 18);
      s += `<rect x="${ox}" y="4" width="${5 * c}" height="${2 * c}" rx="8" style="fill:var(--vacio);stroke:var(--marco);stroke-width:4"/>`;
      for (let i = 1; i < 5; i++) s += `<line x1="${ox + i * c}" y1="4" x2="${ox + i * c}" y2="${4 + 2 * c}" style="stroke:var(--marco);stroke-width:2.5"/>`;
      s += `<line x1="${ox}" y1="${4 + c}" x2="${ox + 5 * c}" y2="${4 + c}" style="stroke:var(--marco);stroke-width:2.5"/>`;
    }
    const total = a + b;
    for (let k = 0; k < Math.min(total, tam); k++) {
      const m = Math.floor(k / 10), j = k % 10, fila = Math.floor(j / 5), col = j % 5;
      const cx = 4 + m * (5 * c + 18) + col * c + c / 2, cy = 4 + fila * c + c / 2;
      s += this.ficha(cx, cy, c * .36, k < a ? '--f1' : '--f2', 'f', k);
      if (k >= total - tachar) s += `<path d="M${cx - 16} ${cy - 16}L${cx + 16} ${cy + 16}M${cx + 16} ${cy - 16}L${cx - 16} ${cy + 16}" style="stroke:var(--tx);stroke-width:5;stroke-linecap:round"/>`;
    }
    return s + '</svg>';
  },

  puntos({ n = 5 }) {
    // Posiciones de dado (1-6) y combinaciones 5+x para 7-10, en una rejilla 3x3 (o dos dados).
    const D = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
    const dados = n <= 6 ? [n] : [5, n - 5].filter(x => x > 0);
    const c = 40, L = 3 * c + 20, W = dados.length * L + (dados.length - 1) * 20;
    let s = `<svg class="fichas-anim" viewBox="0 0 ${W} ${L}" width="${Math.min(W, 420)}" role="img" aria-label="${n} puntos">`, i = 0;
    dados.forEach((d, k) => {
      const ox = k * (L + 20);
      s += `<rect x="${ox + 2}" y="2" width="${L - 4}" height="${L - 4}" rx="22" style="fill:var(--card);stroke:var(--marco);stroke-width:4"/>`;
      D[d].forEach(([x, y]) => { s += this.ficha(ox + 10 + x * c + c / 2, 10 + y * c + c / 2, 14, k ? '--f2' : '--f1', 'f', i++); });
    });
    return s + '</svg>';
  },

  parte({ total, a, b, oculto = null }) {
    const v = (k, x) => oculto === k ? '?' : x;
    const nodo = (cx, cy, r, txt, k) => `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:${oculto === k ? 'var(--soft)' : 'var(--card)'};stroke:var(${k === 'total' ? '--ac2' : '--f1'});stroke-width:5"/><text x="${cx}" y="${cy + 14}" text-anchor="middle" style="font:600 40px var(--fd);fill:${oculto === k ? 'var(--ac)' : 'var(--tx)'}">${v(k, txt)}</text>`;
    return `<svg viewBox="0 0 300 220" width="300" role="img" aria-label="Parte y todo"><line x1="150" y1="60" x2="70" y2="160" style="stroke:var(--marco);stroke-width:4"/><line x1="150" y1="60" x2="230" y2="160" style="stroke:var(--marco);stroke-width:4"/>${nodo(150, 56, 48, total, 'total')}${nodo(70, 162, 46, a, 'a')}${nodo(230, 162, 46, b, 'b')}</svg>`;
  },

  recta({ desde = 0, hasta = 20, inicio = null, saltos = [], paso = 1, ocultarFin = false }) {
    const n = Math.round((hasta - desde) / paso), W = 640, m = 30, X = v => m + ((v - desde) / (hasta - desde)) * (W - 2 * m), y = 120;
    const f = v => typeof fmt === 'function' ? fmt(+v.toFixed(4)) : v;
    let s = `<svg viewBox="0 0 ${W} 194" width="${W}" role="img" aria-label="Recta numérica"><line x1="${m - 10}" y1="${y}" x2="${W - m + 10}" y2="${y}" style="stroke:var(--marco);stroke-width:4;stroke-linecap:round"/>`;
    const cada = n > 40 ? 10 : n > 20 ? 5 : 1;
    // Puntos de salida y llegada de los saltos: siempre con su número (aunque caigan entre marcas)
    const marcas = []; if (inicio !== null) { let q = inicio; marcas.push(q); for (const d of saltos) marcas.push(q = +(q + d).toFixed(4)); }
    const fin = marcas.length > 1 ? marcas[marcas.length - 1] : null, esFin = v => ocultarFin && fin !== null && Math.abs(v - fin) < 1e-9;
    for (let k = 0; k <= n; k++) {
      const v = +(desde + k * paso).toFixed(4), g = paso === 1 ? v % 10 === 0 : Math.abs(v - Math.round(v)) < 1e-9, lab = (k % cada === 0 || g) && !esFin(v) && !marcas.some(m => m !== v && Math.abs(X(m) - X(v)) < 34);
      if (n <= 50 || k % 5 === 0) s += `<line x1="${X(v)}" y1="${y - (g ? 14 : 9)}" x2="${X(v)}" y2="${y + (g ? 14 : 9)}" style="stroke:var(--marco);stroke-width:${g ? 4 : 2.5}"/>`;
      if (lab) s += `<text x="${X(v)}" y="${y + 40}" text-anchor="middle" style="font:${g ? 600 : 500} ${n > 20 ? 18 : 22}px var(--fd);fill:var(--tx)">${f(v)}</text>`;
    }
    const puestas = []; // si dos números quedan pegados, el segundo baja una línea
    marcas.forEach((m, i) => { if (marcas.indexOf(m) !== i) return; const baja = puestas.some(x => Math.abs(X(x) - X(m)) < 34); puestas.push(m);
      s += `<line x1="${X(m)}" y1="${y - 9}" x2="${X(m)}" y2="${y + (baja ? 22 : 9)}" style="stroke:var(--marco);stroke-width:2.5"/><text x="${X(m)}" y="${y + (baja ? 64 : 40)}" text-anchor="middle" style="font:600 ${n > 20 ? 18 : 22}px var(--fd);fill:${esFin(m) ? 'var(--aci)' : 'var(--tx)'}">${esFin(m) ? '?' : f(m)}</text>`; });
    if (inicio !== null) {
      let p = inicio;
      s += `<circle cx="${X(p)}" cy="${y}" r="9" style="fill:var(--f1)"/>`;
      saltos.forEach((d, i) => {
        const q = +(p + d).toFixed(4), x1 = X(p), x2 = X(q), h = Math.min(70, 26 + Math.abs(x2 - x1) * .35), col = d > 0 ? '--f2' : '--f1';
        s += `<path d="M${x1} ${y - 6}Q${(x1 + x2) / 2} ${y - 6 - 2 * h} ${x2} ${y - 6}" style="fill:none;stroke:var(${col});stroke-width:4;stroke-dasharray:420;stroke-dashoffset:420;animation:trazo .5s ${i * .45}s ease forwards"/>`;
        s += `<text x="${(x1 + x2) / 2}" y="${y - 12 - h}" text-anchor="middle" style="font:600 20px var(--fd);fill:var(${col});opacity:0;animation:aparece .3s ${i * .45 + .3}s forwards">${d > 0 ? '+' : '−'}${f(Math.abs(d))}</text>`;
        p = q;
      });
      s += `<circle cx="${X(p)}" cy="${y}" r="9" style="fill:var(--f2);opacity:0;animation:aparece .3s ${saltos.length * .45}s forwards"/>`;
    }
    return s + '<style>@keyframes trazo{to{stroke-dashoffset:0}}@keyframes aparece{to{opacity:1}}</style></svg>';
  },

  decenas({ grupos = [], tachar = 0 }) {
    const u = 18, gap = 6, cols = ['--f1', '--f2'], totD = grupos.reduce((s, g) => s + (g.d || 0), 0);
    let x = 6, partes = '', nb = 0;
    grupos.forEach((g, k) => {
      const col = cols[k % 2];
      for (let i = 0; i < (g.c || 0); i++) { partes += `<rect x="${x}" y="6" width="${10 * u}" height="${10 * u}" rx="5" style="fill:var(${col});stroke:var(--card);stroke-width:2"/>`; for (let j = 1; j < 10; j++) partes += `<line x1="${x + j * u}" y1="6" x2="${x + j * u}" y2="${6 + 10 * u}" style="stroke:var(--card);stroke-width:1.2"/><line x1="${x}" y1="${6 + j * u}" x2="${x + 10 * u}" y2="${6 + j * u}" style="stroke:var(--card);stroke-width:1.2"/>`; x += 10 * u + gap + 4; }
      for (let i = 0; i < (g.d || 0); i++) { partes += `<rect x="${x}" y="6" width="${u}" height="${10 * u}" rx="4" style="fill:var(${col});stroke:var(--card);stroke-width:2"/>`; for (let j = 1; j < 10; j++) partes += `<line x1="${x}" y1="${6 + j * u}" x2="${x + u}" y2="${6 + j * u}" style="stroke:var(--card);stroke-width:1.5"/>`; if (++nb > totD - tachar) partes += `<path d="M${x - 3} 10L${x + u + 3} ${10 * u + 2}" style="stroke:var(--tx);stroke-width:4;stroke-linecap:round"/>`; x += u + gap; }
      for (let i = 0; i < (g.u || 0); i++) { const fila = i % 5, col2 = Math.floor(i / 5); partes += `<rect x="${x + col2 * (u + 4)}" y="${6 + 10 * u - (fila + 1) * (u + 4) + 4}" width="${u}" height="${u}" rx="4" style="fill:var(${col})"/>`; }
      if (g.u) x += Math.ceil(g.u / 5) * (u + 4);
      x += 22;
    });
    const W = Math.max(60, x - 10);
    return `<svg viewBox="0 0 ${W} ${10 * u + 12}" width="${Math.min(W * 1.4, 640)}" role="img" aria-label="Decenas y unidades">${partes}</svg>`;
  },

  dedos({ n = 5 }) {
    const mano = (ox, k, color) => { let s = `<path d="M${ox + 10} 150 Q${ox} 110 ${ox + 12} 92 L${ox + 108} 92 Q${ox + 120} 110 ${ox + 110} 150 Z" style="fill:var(--soft);stroke:var(--marco);stroke-width:3"/>`;
      for (let i = 0; i < 5; i++) { const up = i < k, h = up ? 70 : 18, x = ox + 14 + i * 19; s += `<rect x="${x}" y="${92 - h}" width="16" height="${h + 6}" rx="8" style="fill:${up ? `var(${color})` : 'var(--vacio)'};stroke:var(--marco);stroke-width:2.5"/>`; }
      return s; };
    return `<svg viewBox="0 0 260 160" width="300" role="img" aria-label="${n} dedos">${mano(5, Math.min(5, n), '--f1')}${mano(135, Math.max(0, n - 5), '--f2')}</svg>`;
  },

  matriz({ filas = 3, cols = 4, partir = 0, tachar = 0 }) {
    const c = Math.max(18, Math.min(44, Math.floor(400 / Math.max(filas, cols)))), r = c * .34, W = cols * c + 8, H = filas * c + 8;
    let s = `<svg class="fichas-anim" viewBox="0 0 ${W} ${H}" width="${Math.min(W, 420)}" role="img" aria-label="${filas} filas de ${cols}">`, k = 0;
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < cols; j++) s += this.ficha(4 + j * c + c / 2, 4 + i * c + c / 2, r, partir && i >= partir ? '--f2' : '--f1', 'f', Math.min(k++, 40));
      if (i >= filas - tachar) s += `<line x1="2" y1="${4 + i * c + c / 2}" x2="${W - 2}" y2="${4 + i * c + c / 2}" style="stroke:var(--tx);stroke-width:4;stroke-linecap:round"/>`;
    }
    return s + '</svg>';
  },

  barra({ partes = 4, marcadas = 0, total = null, valor = null, oculto = null }) {
    const W = 600, x0 = 10, w = (W - 20) / partes, y = 62, h = 70, f = v => (v === null || v === undefined) ? '' : (typeof fmt === 'function' && typeof v === 'number' ? fmt(v) : v);
    let s = `<svg viewBox="0 0 ${W} ${y + h + 12}" width="${W}" role="img" aria-label="Barra de ${partes} partes">`;
    if (total !== null) { const t = oculto === 'total' ? '?' : f(total);
      s += `<path d="M${x0} 46V34H${W - 10}V46" style="fill:none;stroke:var(--marco);stroke-width:3"/><rect x="${W / 2 - 46}" y="8" width="92" height="38" rx="12" style="fill:${oculto === 'total' ? 'var(--acs)' : 'var(--card)'};stroke:var(--marco);stroke-width:2"/><text x="${W / 2}" y="35" text-anchor="middle" style="font:600 24px var(--fd);fill:var(--tx)">${t}</text>`; }
    for (let i = 0; i < partes; i++) {
      const on = i < marcadas;
      s += `<rect x="${x0 + i * w}" y="${y}" width="${w}" height="${h}" style="fill:${on ? 'var(--f1)' : 'var(--vacio)'};stroke:var(--marco);stroke-width:3"/>`;
      if (on && valor !== null && partes <= 12) s += `<text x="${x0 + i * w + w / 2}" y="${y + h / 2 + 9}" text-anchor="middle" style="font:600 ${partes > 6 ? 18 : 24}px var(--fd);fill:#fff">${oculto === 'valor' ? '?' : f(valor)}</text>`;
    }
    return s + `<rect x="${x0}" y="${y}" width="${W - 20}" height="${h}" rx="4" style="fill:none;stroke:var(--marco);stroke-width:4"/></svg>`;
  },

  cien({ n = 0, m = 0 }) {
    const c = 26, W = 10 * c + 8;
    let s = `<svg viewBox="0 0 ${W} ${W}" width="${W}" role="img" aria-label="Cuadrícula de 100 con ${n} casillas">`;
    for (let k = 0; k < 100; k++) { const i = Math.floor(k / 10), j = k % 10, col = k < n ? 'var(--f1)' : k < n + m ? 'var(--f2)' : 'var(--vacio)';
      s += `<rect x="${4 + j * c}" y="${4 + i * c}" width="${c}" height="${c}" style="fill:${col};stroke:var(--marco);stroke-width:1"/>`; }
    return s + `<rect x="4" y="4" width="${10 * c}" height="${10 * c}" style="fill:none;stroke:var(--marco);stroke-width:3"/><line x1="${4 + 5 * c}" y1="4" x2="${4 + 5 * c}" y2="${4 + 10 * c}" style="stroke:var(--marco);stroke-width:2"/></svg>`;
  },

  dibujar(v) { return v && this[v.t] ? this[v.t](v) : ''; }
};
