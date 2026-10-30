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
    ? `<path d="M${cx - 16} ${cy + 4}Q${cx} ${cy - 15} ${cx + 16} ${cy + 4}" fill="none" stroke="#1B1F5C" stroke-width="7" stroke-linecap="round"/>`
    : `<g class="ojo"><circle cx="${cx}" cy="${cy}" r="20.5" fill="#fff"/><circle cx="${cx + mira[0]}" cy="${cy + mira[1]}" r="12.5" fill="#1B1F5C"/><circle cx="${cx + mira[0] - 5}" cy="${cy + mira[1] - 5}" r="4.2" fill="#fff"/></g>`;
  const boca = feliz
    ? '<path d="M72 120Q72 150 100 150Q128 150 128 120Z" fill="var(--mboca)"/><path d="M85 141Q100 130 115 141Q108 150 100 150Q92 150 85 141Z" fill="var(--mlengua)"/>'
    : estado === 'piensa' ? '<path d="M90 130Q100 126 110 130" fill="none" stroke="var(--mboca)" stroke-width="6" stroke-linecap="round"/>'
    : '<path d="M74 120Q74 146 100 146Q126 146 126 120Z" fill="var(--mboca)"/><path d="M86 139Q100 129 114 139Q108 146 100 146Q92 146 86 139Z" fill="var(--mlengua)"/>';
  return `<svg class="mas ${estado}" width="${tam}" height="${tam}" viewBox="0 0 200 200" role="img" aria-label="Mascota de Calculi">
  <ellipse class="sombra" cx="100" cy="186" rx="52" ry="7" fill="currentColor" opacity=".12"/>
  <g class="cuerpo">
    <path d="M183.4 106.0C183.4 107.7 183.3 109.3 183.0 111.0C182.8 112.6 182.4 114.3 181.9 115.9C181.5 117.5 180.9 119.1 180.3 120.6C179.7 122.2 178.9 123.7 178.2 125.2C177.4 126.7 176.6 128.2 175.7 129.6C174.8 131.0 173.9 132.5 173.0 133.8C172.0 135.2 171.0 136.6 170.0 137.9C169.0 139.3 168.0 140.6 167.0 141.9C166.0 143.2 164.9 144.5 163.8 145.7C162.7 147.0 161.6 148.3 160.5 149.5C159.4 150.8 158.2 152.0 157.0 153.2C155.8 154.4 154.5 155.5 153.2 156.7C151.9 157.8 150.6 158.9 149.2 159.9C147.7 161.0 146.3 162.0 144.8 162.9C143.2 163.8 141.7 164.7 140.0 165.5C138.4 166.2 136.7 166.9 135.0 167.6C133.3 168.2 131.5 168.7 129.8 169.1C128.0 169.6 126.1 169.9 124.3 170.2C122.5 170.4 120.6 170.6 118.8 170.7C117.0 170.8 115.1 170.8 113.3 170.7C111.5 170.6 109.7 170.5 107.9 170.3C106.1 170.1 104.3 169.9 102.6 169.6C100.9 169.4 99.1 169.1 97.4 168.7C95.7 168.4 94.1 168.1 92.4 167.8C90.8 167.4 89.1 167.1 87.5 166.7C85.9 166.4 84.3 166.0 82.6 165.7C81.0 165.4 79.4 165.0 77.8 164.7C76.1 164.3 74.5 164.0 72.8 163.6C71.2 163.3 69.5 162.9 67.9 162.5C66.2 162.1 64.5 161.6 62.8 161.2C61.2 160.7 59.5 160.2 57.8 159.6C56.2 159.0 54.5 158.4 52.9 157.7C51.3 157.0 49.7 156.2 48.2 155.3C46.6 154.5 45.1 153.6 43.7 152.6C42.3 151.6 40.9 150.6 39.6 149.4C38.3 148.3 37.1 147.1 36.0 145.9C34.8 144.6 33.8 143.3 32.8 142.0C31.9 140.6 31.0 139.2 30.2 137.8C29.4 136.4 28.6 135.0 28.0 133.5C27.3 132.0 26.7 130.5 26.2 129.0C25.6 127.5 25.1 126.0 24.7 124.5C24.2 123.0 23.9 121.5 23.5 119.9C23.1 118.4 22.8 116.9 22.4 115.3C22.1 113.8 21.8 112.3 21.6 110.7C21.3 109.1 21.1 107.6 20.8 106.0C20.6 104.4 20.4 102.8 20.3 101.2C20.2 99.6 20.1 98.0 20.1 96.4C20.0 94.7 20.0 93.1 20.1 91.5C20.3 89.8 20.4 88.2 20.7 86.5C21.0 84.9 21.3 83.2 21.8 81.6C22.3 80.0 22.9 78.4 23.6 76.8C24.3 75.3 25.1 73.7 26.0 72.3C26.9 70.8 27.9 69.4 29.0 68.0C30.2 66.6 31.4 65.3 32.7 64.1C34.0 62.9 35.5 61.7 36.9 60.6C38.4 59.6 40.0 58.6 41.6 57.6C43.2 56.7 44.8 55.9 46.5 55.1C48.2 54.3 49.9 53.5 51.6 52.9C53.3 52.2 55.0 51.6 56.7 51.0C58.4 50.4 60.2 49.9 61.9 49.4C63.6 48.9 65.3 48.4 67.0 47.9C68.6 47.5 70.3 47.0 72.0 46.6C73.7 46.1 75.3 45.7 77.0 45.3C78.7 44.9 80.3 44.5 82.0 44.1C83.7 43.7 85.3 43.3 87.0 43.0C88.7 42.7 90.4 42.3 92.2 42.1C93.9 41.8 95.6 41.5 97.4 41.4C99.1 41.2 100.9 41.0 102.6 41.0C104.4 40.9 106.2 40.9 108.0 41.0C109.7 41.1 111.5 41.2 113.3 41.5C115.0 41.7 116.8 42.0 118.5 42.4C120.2 42.8 121.9 43.3 123.6 43.9C125.2 44.4 126.8 45.0 128.4 45.7C130.0 46.4 131.5 47.2 133.0 48.0C134.5 48.8 136.0 49.6 137.4 50.5C138.8 51.4 140.2 52.3 141.5 53.3C142.9 54.2 144.2 55.2 145.5 56.1C146.8 57.1 148.0 58.1 149.3 59.1C150.6 60.1 151.8 61.1 153.1 62.1C154.3 63.1 155.6 64.1 156.8 65.1C158.1 66.2 159.3 67.2 160.6 68.3C161.8 69.3 163.1 70.4 164.3 71.5C165.6 72.7 166.8 73.8 168.1 75.0C169.3 76.2 170.5 77.4 171.6 78.7C172.8 79.9 173.9 81.3 174.9 82.6C176.0 84.0 177.0 85.4 177.9 86.9C178.7 88.3 179.6 89.8 180.3 91.4C180.9 92.9 181.6 94.5 182.0 96.1C182.5 97.7 182.9 99.4 183.1 101.0C183.3 102.7 183.4 104.3 183.4 106.0Z" fill="var(--m1)"/>
    <path d="M60 62C76 48 104 44 128 50C108 52 84 60 70 76C64 82 54 72 60 62Z" fill="var(--m2)" opacity=".75"/>
    <path d="M38 132C56 160 98 170 140 160C122 172 70 174 46 150Z" fill="var(--m3)" opacity=".35"/>
    <ellipse cx="56" cy="114" rx="11" ry="6.5" fill="#FF7E7E" opacity=".45"/><ellipse cx="146" cy="111" rx="11" ry="6.5" fill="#FF7E7E" opacity=".45"/>
    ${ojo(75, 92)}${ojo(127, 89)}${boca}
  </g>
  <g class="punto"><circle cx="162" cy="40" r="19" fill="var(--mdot)"/><path d="M152 34C155 30 160 28 165 29" stroke="#fff" stroke-opacity=".5" stroke-width="3" fill="none" stroke-linecap="round"/></g>
</svg>`;
}
const logoMini = (t = 40) => `<span class="lg" style="width:${t}px;height:${t}px">${mascota(Math.round(t * .95)).replace('class="mas ', 'class="mas quieta ')}</span>`;
