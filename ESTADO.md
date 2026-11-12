# Plan de ejecución · Calculi

## Fase 0 · Esqueleto del ecosistema
- [x] Crear repositorio en GitHub y activar Pages (rama `main`, raíz)
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

## Rediseño (v1.1)
- [x] Mascota piedrecita animada (flota, parpadea, cierra los ojos al alegrarse)
- [x] Inicio, bienvenida, mapa, truco, ejercicios y resultados al estilo de Lectori y Barri
- [x] Iconos de línea y glifos propios por estrategia; barras del móvil del color del fondo
- [x] Paleta «Sol»: mascota amarilla, interfaz gris azulada y azul marino; icono nuevo
- [ ] Nombre de la mascota

## Fase 3 · Aula
- [x] Zona de adultos sencilla: ajustes, semáforo de dominio por alumno, copia de seguridad, importar alumnos de Lectori/Barri
- [x] Zona del tutor con PIN, Modo Docente y copia de seguridad
- [x] Panel por alumno: semáforo de dominio de cada estrategia (y tabla de clase)
- [ ] Modo pizarra/proyector: «5 minutos de cálculo» para toda la clase
- [x] Resumen para familias

## Fase 4 · Ecosistema
- [x] Sincronización con Firebase (colección `calculo`, subcolección `alu`)
- [ ] Importar alumnos de Lectori (`ar2`) y Barri (`barri.v1`) del mismo dispositivo
- [ ] Resumen de evaluación en formato común para Tabula

## Fase 5 · Ampliar a 2.º–6.º
- [x] Motor multicurso: curso por alumno, selector en mapa y Zona del tutor, decimales con coma, dibujos matriz/barra/cien/centenas/recta decimal
- [x] 72 trucos nuevos (2.º 15, 3.º 15, 4.º 14, 5.º 14, 6.º 14) según docs/plan-cursos.md, con revisión independiente por curso
- [ ] Probar en el aula y ajustar

## Mejoras (v1.3)
- [x] Pistas según el error en los 88 trucos (+ pistas generales del motor)
- [x] Un paso para tocar en cada tutorial (marco, recta, barra, matriz, elige)
- [x] Modo proyector, duelo por equipos y fichas para imprimir (Zona del tutor › Aula)
- [x] Cálculo diario (2 minutos, récord personal) y colección de piedrecitas
- [x] Colores para daltonismo (Ajustes)
- [x] Resumen para Tabula en `calc.tabula` y CSV de evaluación
- [x] Lector en Tabula: botón «Calculi» en el Cuaderno (PR #15 de Tabula, pendiente de fusionar)
- [x] Sincronización con Firebase

## Mejoras (v1.4)
- [x] Animalitos como avatar (30), elegibles al crear y en la Zona del tutor
- [x] Prueba inicial por curso (2 operaciones por truco; para al fallar dos seguidos)
- [x] Repaso por días (cajas de Leitner: 1, 3, 7, 15, 30 días) y «Hoy toca» en el inicio
- [x] Tablas de multiplicar con mapa de calor y práctica de las que más fallan
- [x] Problemas cortos generados a partir del truco (73 de 88 trucos)
- [x] Errores más frecuentes de la clase y de cada alumno
- [x] Bingo de cálculo (cartones imprimibles + proyector), reto semanal de la clase
- [x] Informes para familias imprimibles (una página por alumno)
- [x] Animalitos en Lectori (mismo animal al importar en Calculi)
- [ ] Animalitos en Barri (pendiente: su código fuente está fuera del repositorio)

## Tablet y proyector (nov 2026)
- [x] Tablet apaisada (≥900 px horizontal): ejercicio y tutorial a dos columnas, tamaños grandes; tablet vertical más grande
- [x] Proyector y duelo: pantalla completa y atajos (Espacio/→/mando = respuesta y siguiente; D = dibujo)
- [ ] Probar en tablet y pizarra digital reales (pantalla completa y mando presentador)
- [x] Tablet vertical: hueco vacío en la tarjeta del ejercicio
- [x] Zona del tutor a dos columnas en tablet apaisada
