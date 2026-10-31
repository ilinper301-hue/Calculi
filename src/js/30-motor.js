/* ===== Motor de estrategias =====
Cada archivo de src/js/estrategias/ registra UNA estrategia con ESTR.add({...}). Contrato:

  id:       'amigos10'           identificador único [a-z0-9] (único en TODOS los cursos)
  curso:    1                    curso de Primaria (1..6); si falta, 1
  orden:    4                    posición dentro de su curso (1..16); marca el orden de desbloqueo
  tri:      1                    trimestre (1, 2, 3)
  n:        'Amigos del 10'      nombre para el niño (corto)
  ic:       '×9'                 icono: texto matemático corto (1-4 caracteres, sin emojis): '×9', '25%', '½', '0,5'
  desc:     'Parejas que suman 10'  subtítulo (corto)
  truco:    'Busco el amigo del 10'  frase para «¿Qué truco usarías?» (repaso mixto)
  tutorial: [{txt, vis}, …]      3-6 pantallas: frase corta (se lee en voz alta) + modelo visual (ver 20-visual.js)
  guiada(): {pasos:[{txt?, q, r, vis?, ops?, errores?}], final:{txt?, q, r, vis?, errores?}}
            Práctica guiada: 2-3 pasos pequeños que llevan al resultado. q usa «?» para el hueco: '8 + ? = 10'.
            txt = instrucción corta encima (p. ej. '¿Cuánto le falta al 8 para llegar a 10?') con q:'?' o q:'8 + ? = 10'.
            Pasos y final se responden con 3 botones (opciones automáticas, o ops propias); teclado:true en un paso fuerza teclado.
  item(nivel): {q, r, txt?, vis?, ops?, voz?, extra?}
            nivel 1: con modelo visual y 3 opciones · nivel 2: sin visual (se puede pedir ayuda), 3 opciones · nivel 3: sin visual, teclado.
            vis se usa en nivel 1 y como «ayuda» en 2 y 3. extra = distractores típicos (errores frecuentes) para las opciones.
            errores: [[valor, 'pista'], …] → si el niño responde «valor», la mascota le da esa pista (errores típicos del truco).
                     Esos valores también se usan como opciones. Si no hay pista propia, el motor usa pistas generales.
            visSiempre:true → el visual se ve en todos los niveles (cuando el visual ES la pregunta, p. ej. «¿Cuántos hay?»).
  juego:    {tipo:'parejas', meta:'Suman 10', pares(): [[a,b]×6]}   (tarjetas que hay que emparejar; a y b son textos o números)
            {tipo:'rapido'}  (10 operaciones seguidas de nivel 2, sin cronómetro visible)
*/
const ESTR = {
  lista: [],
  add(e) {
    if (!e || !/^[a-z0-9]{2,20}$/.test(e.id) || this.lista.some(x => x.id === e.id)) { console.error('Estrategia no válida o repetida', e && e.id); return; }
    e.curso = e.curso || 1;
    this.lista.push(e); this.lista.sort((a, b) => a.curso - b.curso || a.orden - b.orden);
  },
  get(id) { return this.lista.find(e => e.id === id); },
  delCurso(c) { return this.lista.filter(e => e.curso === c); },
  cursos() { return [...new Set(this.lista.map(e => e.curso))].sort(); }
};
const cursoDe = a => (a && a.curso) || 1;

/** Desbloqueo: dentro de su curso, la primera siempre y las demás cuando la anterior tiene ≥ 1 estrella.
    Cursos anteriores al del alumno: abiertos. Posteriores: cerrados (salvo «todo abierto» o Modo Docente). */
function abierta(a, e) {
  if (MODO_DOCENTE || EST.ajustes.abierto) return true;
  const c = cursoDe(a); if (e.curso < c) return true; if (e.curso > c) return false;
  const L = ESTR.delCurso(e.curso), i = L.indexOf(e); if (i <= 0) return true;
  return ((a.e[L[i - 1].id] || {}).est || 0) >= 1;
}
/** Sugerida: en el curso del alumno, la primera abierta sin estrellas, o la de peor dominio. */
function sugerida(a) {
  const L = ESTR.delCurso(cursoDe(a)).length ? ESTR.delCurso(cursoDe(a)) : ESTR.lista, ab = L.filter(e => abierta(a, e));
  return ab.find(e => !((a.e[e.id] || {}).est)) || ab.slice().sort((x, y) => (dominio(a, x.id) ?? 1) - (dominio(a, y.id) ?? 1))[0] || L[0];
}

/** Normaliza un ítem: opciones si faltan, enteros, hueco presente. */
function prepararItem(it, nivel) {
  it = Object.assign({}, it); it.r = Number(it.r);
  if (!String(it.q).includes('?')) it.q = it.q + ' = ?';
  const deErrores = (it.errores || []).map(e => e[0]);
  if (nivel < 3 && !it.ops) it.ops = opciones(it.r, 3, deErrores.concat(it.extra || []));
  if (it.ops && !it.ops.includes(it.r)) it.ops = shuffle([it.r, ...it.ops.slice(0, it.ops.length - 1)]);
  return it;
}

/** Repaso mixto: estrategias ya trabajadas, más peso a las de menos dominio y a las que hace más que no se practican. */
function itemsRepaso(a, n = 10) {
  const vistas = ESTR.lista.filter(e => e.curso <= cursoDe(a) && abierta(a, e) && (a.e[e.id] || {}).n > 0);
  if (!vistas.length) return [];
  const peso = e => { const d = dominio(a, e.id) ?? .5, ult = (a.e[e.id] || {}).ult || '2000-01-01', dias = Math.min(14, (Date.now() - new Date(ult)) / 864e5); const p = a.e[e.id] || {}, toca = p.prox && p.prox <= hoy() ? 3 : 0; return .3 + (1 - d) * 2 + dias / 7 + toca; };
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

/** Pista para una respuesta equivocada: primero las del truco (it.errores), después pistas generales. */
function pistaPara(it, v, e) {
  const prop = (it.errores || []).find(x => igual(x[0], v)); if (prop) return prop[1];
  const r = it.r, q = String(it.q).replace(/\?/g, ''), nums = (q.match(/\d+(?:,\d+)?/g) || []).map(num);
  if (decimales(r) || decimales(v)) { if (igual(v, r * 10) || igual(v, r / 10) || igual(v, r * 100) || igual(v, r / 100)) return 'Los números están bien, pero revisa dónde va la coma.'; }
  if (nums.length === 2) {
    const [a, b] = nums;
    if (q.includes('−') && igual(v, a + b)) return 'Cuidado: es una resta, no una suma.';
    if (q.includes('+') && igual(v, Math.abs(a - b))) return 'Cuidado: es una suma, no una resta.';
    if (q.includes('×') && igual(v, a + b)) return 'Es multiplicar, no sumar.';
    if (q.includes(':') && igual(v, a * b)) return 'Es dividir, no multiplicar.';
  }
  if (Number.isInteger(r) && r > 9 && String(v) === String(r).split('').reverse().join('')) return 'Tienes las cifras, pero en otro orden.';
  if (Number.isInteger(r) && Math.abs(v - r) === 1) return v > r ? 'Casi: te has pasado por uno.' : 'Casi: te falta uno.';
  if (Number.isInteger(r) && r >= 10 && Math.abs(v - r) === 10) return 'Las unidades están bien; revisa las decenas.';
  if (Number.isInteger(r) && r >= 100 && Math.abs(v - r) === 100) return 'Revisa las centenas.';
  return e && e.truco ? `Acuérdate del truco: ${e.truco.charAt(0).toLowerCase() + e.truco.slice(1)}.` : 'Casi. Prueba otra vez.';
}
