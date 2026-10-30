# Calculi

App web (PWA) de **cálculo mental** para toda la Primaria (1.º a 6.º). Cada estrategia sigue el ciclo **Aprender (tutorial) → Practicar (guiada) → Automatizar (juegos y repaso)**.
Forma parte del ecosistema de Iván junto a **Lectori** (lectura) y **Barri** (problemas con barras), y en el futuro enviará datos a **Tabula** (cuaderno docente).

Se publicará en GitHub Pages: `https://ilinper301-hue.github.io/Calculi/` (lo que se sube a `main` es lo que ven los usuarios).

## Sobre mí y cómo quiero trabajar
- No sé programar. Explícame los cambios en lenguaje sencillo y dime qué tengo que probar.
- Responde siempre en español, breve y por partes.
- Antes de un cambio grande, cuéntame el plan en pocas líneas y espera mi sí. Las cosas pequeñas, hazlas y pruébalas sin preguntar.
- No cambies diseño, textos ni orden de estrategias sin pedírmelo; propón mejoras aparte.
- Commits pequeños con mensaje claro en español.

## Reglas del ecosistema (iguales que Lectori y Barri)
1. **Mismo dominio** (`ilinper301-hue.github.io`): el navegador comparte `localStorage` entre las tres apps.
   - Todas las claves llevan prefijo `calc.` (`calc.v1`, `calc.fb`, `calc.sync.uid`, `calc.sync.t`, `calc.bk`, `calc.wel`, `calc.th`).
   - Nunca escribir en claves de otras apps (`ar2`, `arth`… de Lectori; `barri.*` de Barri). Solo **leerlas** para importar alumnos.
   - Caché del service worker con prefijo propio: `calc-pwa-N`; borrar solo las cachés `calc-pwa-*`.
   - `manifest.webmanifest` con `id` propio (`calculi-app`), `start_url` y `scope` = `./`.
2. **Firebase compartido**: proyecto `mis-apps-educativas`, SDK compat `10.12.2`, Google como inicio de sesión.
   - Colección `calculo` → documento `{uid}` (`meta`, `ts`) → subcolección `alu` (un documento por alumno: `{d: JSON, mt}`). Mismo patrón y misma lógica de fusión (`syncNow`, `syncSoon` a los 15 s, `cleanX` al leer, `del` para borrados) que Lectori/Barri.
   - Las reglas de Firestore deben permitir `calculo/{uid}/**` solo al propio `uid`.
3. **Diseño**: zona infantil con Fredoka, botones grandes y textos cortos; Zona del tutor sobria con Inter (mismo estilo que las otras dos). Tema claro y oscuro.
   - Paleta «Sol»: mascota piedrecita amarilla (`--m1:#FBBF24`, punto azul `#3B82F6`), interfaz gris azulada con botones azul marino (`--ac:#1E2A5A`) y tarjeta principal amarilla. En oscuro, los botones pasan a amarillo. Distinta del verde azulado de Lectori y el morado de Barri.
   - Colores de la mascota en variables `--m1…--mlengua`: se cambian en un solo sitio.
   - Modo Docente con el degradado común del ecosistema.
4. **Mismas piezas**: perfiles (Familias / Docente), Zona del tutor con PIN, Modo Docente (todo abierto, sin guardar), copia de seguridad JSON, modo proyector.
5. **Datos de menores**: no se envía nada a servicios nuevos sin preguntarme. Si cambia la estructura de datos, añade una migración: nunca se pierde el progreso.

## Estructura
- `src/estilos.css` y `src/js/`: `00-util.js` (ayudas, voz, sonidos), `10-datos.js` (guardado y migraciones), `20-visual.js` (dibujos SVG: marco, puntos, parte, recta, decenas, dedos), `15-iconos.js` (iconos de línea, glifos y mascota), `30-motor.js` (contrato de una estrategia, desbloqueo, repaso), `40-inicio.js` (cabecera, bienvenida, inicio, mapa, logros), `45-ejercicio.js` (tutorial, ejercicios, juego, resultado), `50-tutor.js` (PIN y Zona del tutor), `zz-arranque.js`.
- `src/js/estrategias/NN-id.js` (1.º) y `src/js/estrategias/cN/NN-id.js` (2.º–6.º): una estrategia por archivo con `curso`. Plantillas: `04-amigos10.js` (1.º) y `c3/04-tabla9.js` (cursos superiores). Plan de cada curso en `docs/plan-cursos.md`.
- Números: `fmt(n)` escribe con coma decimal; `r` puede ser decimal desde 4.º; el teclado muestra la coma cuando hace falta.
- Cada alumno tiene `curso` (Zona del tutor › Alumnos); el mapa muestra su curso y deja consultar otros.
- `tools/build.py` une todo en `index.html` (raíz, la que publica Pages). No editar `index.html` a mano.
- `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `fonts/` (copiadas de Barri).
- `tests/test_motor.js` (`node tests/test_motor.js`): comprueba todas las estrategias (cuentas, opciones, coherencia dibujo ↔ pregunta, juegos, repaso).
- `tests/muestras.js` (`node tests/muestras.js c4`): describe en palabras cada ejercicio para revisarlo a mano.
- `ESTADO.md` lista de pasos; si escribo «Continúa», léela y sigue por el primer paso sin marcar.

## Cómo probar
`python3 tools/build.py && python3 -m http.server` y abrir en el navegador (también en móvil horizontal y vertical). Sin errores en consola; crear perfil, hacer una actividad y entrar en la Zona del tutor. Si hay cambios para móviles instalados, subir la versión de `sw.js`.
