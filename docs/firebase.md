# Firebase en Calculi

Proyecto compartido con Lectori y Barri: `mis-apps-educativas` (SDK compat 10.12.2, inicio de sesión con Google). Código: `src/js/52-cuenta.js`.

## Estructura en Firestore
- `calculo/{uid}`: `{meta: JSON, ts}`. `meta` = `{aj: {pin, perfil, curso, abierto, reto}, gmt, del: {idAlumno: fecha}}`.
- `calculo/{uid}/alu/{idAlumno}`: `{d: JSON del alumno, mt}`.
- Fusión: por alumno gana el `mt` más reciente; los ajustes, el `gmt` más reciente; un alumno borrado queda en `del` con su fecha. Sincroniza a los 15 s de guardar, al ocultar la app y al entrar. El modo Docente no sincroniza.
- Local (solo `calc.*`): `calc.v1` (datos), `calc.sync.uid`, `calc.sync.t`, `calc.wel`.

## Reglas de Firestore (pegar en la consola › Firestore › Reglas, junto a las de las otras apps)
```
match /calculo/{uid}/{document=**} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```

## Dominios autorizados
Authentication › Configuración › Dominios autorizados: debe estar `ilinper301-hue.github.io` (probablemente ya está por Lectori).
