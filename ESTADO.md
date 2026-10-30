# Plan de ejecución · Calculín

## Fase 0 · Esqueleto del ecosistema
- [ ] Crear repositorio en GitHub y activar Pages (rama `main`, raíz)
- [x] `src/` + `tools/build.py` → `index.html`; `sw.js` (`calc-pwa-1`), manifest, iconos y fuentes
- [x] Tema claro/oscuro, colores propios, tipografías Fredoka + Inter
- [x] Perfiles de alumno y guardado en `calc.v1` con migración versionada

## Fase 1 · Prototipo: «Amigos del 10» (1.º)
- [x] Tutorial animado con marco del 10 y fichas de dos colores
- [x] Práctica guiada (con marco) → sin ayuda
- [x] Juego: parejas que suman 10 (arrastrar o tocar)
- [x] Resultado con estrellas y registro (acierto, tiempo, ayuda usada)
- [ ] Probar en el aula y ajustar

## Fase 2 · Las 16 estrategias de 1.º
- [x] T1: ver sin contar · ±1 · descomponer hasta 10 · amigos del 10 · el orden no importa
- [x] T2: contar desde el mayor · contar hacia atrás · usar el 5 · dobles · casi dobles · familias de operaciones
- [x] T3: completar la decena · +9 · restar pensando en sumar · ±10 · decenas completas
- [ ] Prueba inicial que sitúa a cada alumno (pendiente)
- [x] Repaso espaciado (lo que falla vuelve más) y actividad «¿Qué truco usarías?»
- [x] Lectura en voz alta de las instrucciones (voz del navegador, como Lectori)

## Fase 3 · Aula
- [x] Zona de adultos sencilla: ajustes, semáforo de dominio por alumno, copia de seguridad, importar alumnos de Lectori/Barri
- [ ] Zona del tutor con PIN, Modo Docente y copia de seguridad
- [ ] Panel por alumno: semáforo de dominio de cada estrategia
- [ ] Modo pizarra/proyector: «5 minutos de cálculo» para toda la clase
- [ ] Informe para familias

## Fase 4 · Ecosistema
- [ ] Sincronización con Firebase (colección `calculo`, subcolección `alu`)
- [ ] Importar alumnos de Lectori (`ar2`) y Barri (`barri.v1`) del mismo dispositivo
- [ ] Resumen de evaluación en formato común para Tabula

## Fase 5 · Ampliar a 2.º–6.º
