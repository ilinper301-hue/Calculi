/* ===== Iconos de línea (estilo común con Lectori y Barri) ===== */
const ICP = {
  play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
  shuffle: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
  book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M8 7h8"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  star: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="currentColor" stroke="none"/>',
  starO: '<path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  chev: '<path d="M9 5l7 7-7 7"/>',
  home: '<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h14V9.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  vol: '<path d="M4 9.5h3.5L12 5v14l-4.5-4.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  bulb: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 3.5V8h4.5M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20.5V16h-4.5"/>',
  download: '<path d="M12 4v11M7 10l5 5 5-5M4 20h16"/>',
  upload: '<path d="M12 16V5M7 10l5-5 5 5M4 20h16"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
  family: '<circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 20c0-3.5 2.2-6 5-6s5 2.5 5 6M13.5 20c0-2.6 1.6-4.5 3.5-4.5s3.5 1.9 3.5 4.5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  medal: '<circle cx="12" cy="15" r="5.5"/><path d="M8.5 10.5 6 3h4l2 5 2-5h4l-2.5 7.5"/>',
  flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.3 2-4.3.2 1.8 1 2.8 2 2.8 0-3.2-.6-5.6 1-8.5z"/>',
  backspace: '<path d="M21 5H9l-6 7 6 7h12z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/>',
  game: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M7.5 12.5h3M9 11v3"/><circle cx="15.5" cy="11.5" r=".9" fill="currentColor"/><circle cx="17.5" cy="13.5" r=".9" fill="currentColor"/>'
};
const ico = (n, s = 22, sw = 2) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICP[n] || ''}</svg>`;

/* ===== Glifo de cada estrategia (en vez de emojis): texto corto o dibujo mínimo ===== */
const GLIFO = {
  versincontar: '<svg viewBox="0 0 24 24" width="26" height="26"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="8.3" cy="8.3" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="15.7" cy="15.7" r="1.8" fill="currentColor"/></svg>',
  masmenos1: '±1',
  descomponer: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="6" r="3.6"/><circle cx="6" cy="18" r="3.3"/><circle cx="18" cy="18" r="3.3"/><path d="M10 9 7.6 15M14 9l2.4 6"/></svg>',
  amigos10: '10',
  orden: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5"/></svg>',
  desdemayor: '8<small>+</small>',
  haciaatras: '<small>−</small>2',
  usar5: '5',
  dobles: '×2',
  casidobles: '×2<small>+1</small>',
  familias: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3.5 21 19H3z"/><path d="M9 14h6"/></svg>',
  completar10: '<small>→</small>10',
  sumar9: '+9',
  restarsumando: '<small>−</small><small>+</small>',
  masmenos10: '±10',
  decenas: '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><rect x="3" y="3" width="4.2" height="18" rx="1.4"/><rect x="9.9" y="3" width="4.2" height="18" rx="1.4"/><rect x="16.8" y="3" width="4.2" height="18" rx="1.4"/></svg>'
};
const glifo = e => GLIFO[e.id] || esc(e.ic);

/* ===== Mascota: una piedrecita (los «calculi» con los que contaban los romanos) =====
   Flota suavemente, parpadea y cierra los ojos al alegrarse. Sin brazos ni pies.
   estado: 'normal' | 'feliz' (ojos cerrados en arco) | 'piensa' (mira hacia arriba) */
function mascota(tam = 120, estado = 'normal') {
  const feliz = estado === 'feliz', mira = estado === 'piensa' ? [-3, -5] : [2, 2];
  const ojo = (cx, cy) => feliz
    ? `<path d="M${cx - 14} ${cy + 4}Q${cx} ${cy - 13} ${cx + 14} ${cy + 4}" fill="none" stroke="#1B1F5C" stroke-width="7" stroke-linecap="round"/>`
    : `<g class="ojo"><circle cx="${cx}" cy="${cy}" r="17" fill="#fff"/><circle cx="${cx + mira[0]}" cy="${cy + mira[1]}" r="10.5" fill="#1B1F5C"/><circle cx="${cx + mira[0] - 4}" cy="${cy + mira[1] - 4.5}" r="3.6" fill="#fff"/></g>`;
  const boca = feliz
    ? '<path d="M78 124Q100 150 122 124Z" fill="#7A2A0C"/><path d="M89 135Q100 129 111 135Q106 142 100 142Q94 142 89 135Z" fill="#FDBA74"/>'
    : estado === 'piensa' ? '<path d="M90 130Q100 126 110 130" fill="none" stroke="#7A2A0C" stroke-width="6" stroke-linecap="round"/>'
    : '<path d="M80 122Q100 144 120 122Z" fill="#7A2A0C"/><path d="M90 133Q100 128 110 133Q105 139 100 139Q95 139 90 133Z" fill="#FDBA74"/>';
  return `<svg class="mas ${estado}" width="${tam}" height="${tam}" viewBox="0 0 200 200" role="img" aria-label="Mascota de Calculi">
  <ellipse class="sombra" cx="100" cy="186" rx="52" ry="7" fill="currentColor" opacity=".12"/>
  <g class="cuerpo">
    <path d="M100 38C146 34 178 62 178 104C178 146 148 172 102 172C56 172 24 150 24 108C24 64 56 41 100 38Z" fill="#F26B1D"/>
    <path d="M60 62C76 48 104 44 128 50C108 52 84 60 70 76C64 82 54 72 60 62Z" fill="#FF9A52" opacity=".75"/>
    <path d="M38 132C56 160 98 170 140 160C122 172 70 174 46 150Z" fill="#C2410C" opacity=".35"/>
    <ellipse cx="62" cy="118" rx="11" ry="6.5" fill="#FF7E7E" opacity=".45"/><ellipse cx="140" cy="118" rx="11" ry="6.5" fill="#FF7E7E" opacity=".45"/>
    ${ojo(78, 96)}${ojo(124, 94)}${boca}
  </g>
  <g class="punto"><path d="M160 26C172 25 180 32 180 42C180 52 172 58 162 58C151 58 145 51 145 42C145 32 150 27 160 26Z" fill="#3B82F6"/><path d="M152 34C156 30 162 29 167 31" stroke="#93C5FD" stroke-width="3" fill="none" stroke-linecap="round"/></g>
</svg>`;
}
const logoMini = (t = 40) => `<span class="lg" style="width:${t}px;height:${t}px">${mascota(Math.round(t * .95)).replace('class="mas ', 'class="mas quieta ')}</span>`;
