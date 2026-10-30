# Calculín (nombre provisional)

App web (PWA) de **cálculo mental** para Primaria, empezando por 1.º. Cada estrategia sigue el ciclo **Aprender (tutorial) → Practicar (guiada) → Automatizar (juegos y repaso)**.
Forma parte del ecosistema de Iván junto a **Lectori** (lectura) y **Barri** (problemas con barras), y en el futuro enviará datos a **Tabula** (cuaderno docente).

Se publicará en GitHub Pages: `https://ilinper301-hue.github.io/<Repo>/` (lo que se sube a `main` es lo que ven los usuarios).

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
   - `manifest.webmanifest` con `id` propio (`calculin-app`), `start_url` y `scope` = `./`.
2. **Firebase compartido**: proyecto `mis-apps-educativas`, SDK compat `10.12.2`, Google como inicio de sesión.
   - Colección `calculo` → documento `{uid}` (`meta`, `ts`) → subcolección `alu` (un documento por alumno: `{d: JSON, mt}`). Mismo patrón y misma lógica de fusión (`syncNow`, `syncSoon` a los 15 s, `cleanX` al leer, `del` para borrados) que Lectori/Barri.
   - Las reglas de Firestore deben permitir `calculo/{uid}/**` solo al propio `uid`.
3. **Diseño**: zona infantil con Fredoka, botones grandes y textos cortos; Zona del tutor sobria con Inter (mismo estilo que las otras dos). Tema claro y oscuro.
   - Color propio: naranja (`--ac:#EA580C`, oscuro `#FB923C`), distinto del verde azulado de Lectori y el morado de Barri.
   - Modo Docente con el degradado común del ecosistema.
4. **Mismas piezas**: perfiles (Familias / Docente), Zona del tutor con PIN, Modo Docente (todo abierto, sin guardar), copia de seguridad JSON, modo proyector.
5. **Datos de menores**: no se envía nada a servicios nuevos sin preguntarme. Si cambia la estructura de datos, añade una migración: nunca se pierde el progreso.

## Estructura
- `src/` código por partes (`estilos.css`, `datos/estrategias.js`, `motor.js`, `pantallas/*.js`, `sync.js`).
- `tools/build.py` une todo en `index.html` (raíz, la que publica Pages). No editar `index.html` a mano.
- `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `fonts/` (copiadas de Barri).
- `tests/` pruebas del motor (generación de operaciones, repaso espaciado, migraciones).
- `ESTADO.md` lista de pasos; si escribo «Continúa», léela y sigue por el primer paso sin marcar.

## Cómo probar
`python3 tools/build.py && python3 -m http.server` y abrir en el navegador (también en móvil horizontal y vertical). Sin errores en consola; crear perfil, hacer una actividad y entrar en la Zona del tutor. Si hay cambios para móviles instalados, subir la versión de `sw.js`.
