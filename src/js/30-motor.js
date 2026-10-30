/* ===== Motor de estrategias =====
Cada archivo de src/js/estrategias/ registra UNA estrategia con ESTR.add({...}). Contrato:

  id:       'amigos10'           identificador único [a-z0-9]
  orden:    4                    posición en el curso (1..16); marca el orden de desbloqueo
  tri:      1                    trimestre (1, 2, 3)
  n:        'Amigos del 10'      nombre para el niño (corto)
  ic:       '10'                 icono: emoji o texto de 1-3 caracteres
  desc:     'Parejas que suman 10'  subtítulo (corto)
  truco:    'Busco el amigo del 10'  frase para «¿Qué truco usarías?» (repaso mixto)
  tutorial: [{txt, vis}, …]      3-6 pantallas: frase corta (se lee en voz alta) + modelo visual (ver 20-visual.js)
  guiada(): {pasos:[{txt?, q, r, vis?, ops?}], final:{txt?, q, r, vis?}}
            Práctica guiada: 2-3 pasos pequeños que llevan al resultado. q usa «?» para el hueco: '8 + ? = 10'.
            txt = instrucción corta encima (p. ej. '¿Cuánto le falta al 8 para llegar a 10?') con q:'?' o q:'8 + ? = 10'.
            Pasos y final se responden con 3 botones (opciones automáticas, o ops propias); teclado:true en un paso fuerza teclado.
  item(nivel): {q, r, txt?, vis?, ops?, voz?, extra?}
            nivel 1: con modelo visual y 3 opciones · nivel 2: sin visual (se puede pedir ayuda), 3 opciones · nivel 3: sin visual, teclado.
            vis se usa en nivel 1 y como «ayuda» en 2 y 3. extra = distractores típicos (errores frecuentes) para las opciones.
            visSiempre:true → el visual se ve en todos los niveles (cuando el visual ES la pregunta, p. ej. «¿Cuántos hay?»).
  juego:    {tipo:'parejas', meta:'Suman 10', pares(): [[a,b]×6]}   (tarjetas que hay que emparejar; a y b son textos o números)
            {tipo:'rapido'}  (10 operaciones seguidas de nivel 2, sin cronómetro visible)
*/
const ESTR = {
  lista: [],
  add(e) {
    if (!e || !/^[a-z0-9]{2,20}$/.test(e.id) || this.lista.some(x => x.id === e.id)) { console.error('Estrategia no válida o repetida', e && e.id); return; }
    this.lista.push(e); this.lista.sort((a, b) => a.orden - b.orden);
  },
  get(id) { return this.lista.find(e => e.id === id); }
};

/** Desbloqueo: la primera siempre; las demás cuando la anterior tiene al menos 1 estrella (o todo abierto / Modo Docente). */
function abierta(a, e) {
  if (MODO_DOCENTE || EST.ajustes.abierto) return true;
  const i = ESTR.lista.indexOf(e); if (i <= 0) return true;
  const prev = ESTR.lista[i - 1]; return ((a.e[prev.id] || {}).est || 0) >= 1;
}
/** Sugerida: la primera abierta sin estrellas, o la de peor dominio. */
function sugerida(a) {
  const ab = ESTR.lista.filter(e => abierta(a, e));
  return ab.find(e => !((a.e[e.id] || {}).est)) || ab.slice().sort((x, y) => (dominio(a, x.id) ?? 1) - (dominio(a, y.id) ?? 1))[0];
}

/** Normaliza un ítem: opciones si faltan, enteros, hueco presente. */
function prepararItem(it, nivel) {
  it = Object.assign({}, it); it.r = Number(it.r);
  if (!String(it.q).includes('?')) it.q = it.q + ' = ?';
  if (nivel < 3 && !it.ops) it.ops = opciones(it.r, 3, it.extra || []);
  if (it.ops && !it.ops.includes(it.r)) it.ops = shuffle([it.r, ...it.ops.slice(0, it.ops.length - 1)]);
  return it;
}

/** Repaso mixto: estrategias ya trabajadas, más peso a las de menos dominio y a las que hace más que no se practican. */
function itemsRepaso(a, n = 10) {
  const vistas = ESTR.lista.filter(e => abierta(a, e) && (a.e[e.id] || {}).n > 0);
  if (!vistas.length) return [];
  const peso = e => { const d = dominio(a, e.id) ?? .5, ult = (a.e[e.id] || {}).ult || '2000-01-01', dias = Math.min(14, (Date.now() - new Date(ult)) / 864e5); return .3 + (1 - d) * 2 + dias / 7; };
  const out = [];
  for (let k = 0; k < n; k++) {
    let tot = vistas.reduce((s, e) => s + peso(e), 0), x = Math.random() * tot, e = vistas[0];
    for (const v of vistas) { x -= peso(v); if (x <= 0) { e = v; break; } }
    const nivel = (dominio(a, e.id) ?? 0) >= .8 ? 3 : 2;
    // Cada 4.º ítem (si hay ≥3 estrategias): «¿Qué truco usarías?»
    const it = e.item(2);
    if (k % 4 === 3 && vistas.length >= 3 && e.truco && !it.visSiempre && /\d/.test(it.q)) {
      const otras = shuffle(vistas.filter(v => v !== e && v.truco)).slice(0, 2);
      out.push({ id: e.id, nivel, truco: true, q: it.q, voz: it.voz, ops: shuffle([e, ...otras].map(v => v.truco)), r: e.truco });
    } else out.push(Object.assign({ id: e.id, nivel }, prepararItem(e.item(nivel), nivel)));
  }
  return out;
}

/** Estrellas de un reto de 10: 9-10 → 3 · 7-8 → 2 · 5-6 → 1. */
const estrellasDe = (ok, n) => { const p = ok / n; return p >= .9 ? 3 : p >= .7 ? 2 : p >= .5 ? 1 : 0; };
