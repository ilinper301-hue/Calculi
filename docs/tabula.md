# Calculi → Tabula

Calculi y Tabula se publican en el mismo dominio (`ilinper301-hue.github.io`), así que comparten el `localStorage` del navegador.
Calculi escribe (2 s después de cada cambio) un resumen en la clave **`calc.tabula`**. Tabula solo tiene que leerlo (nunca escribirlo).

```json
{
  "app": "calculi", "v": 1, "ts": 1761876000000,
  "alumnos": [
    { "id": "k3j2…", "n": "Lucía", "curso": 1, "estrellas": 12, "diasPractica": 9, "ultimoDia": "2026-10-30",
      "trucos": [
        { "id": "amigos10", "nombre": "Amigos del 10", "curso": 1, "trimestre": 1,
          "dominio": 90, "semaforo": "v", "estrellas": 3, "intentos": 24, "ultimo": "2026-10-30" }
      ] }
  ]
}
```

- `dominio`: % de aciertos sin ayuda en los 10 últimos intentos (null si hay menos de 5).
- `semaforo`: `v` (≥ 80 %), `a` (≥ 50 %), `r` (< 50 %), `g` (sin datos).
- Se incluyen los trucos del curso del alumno y cualquier otro que haya practicado.

## Qué haría falta en Tabula (pendiente)
1. Añadir Calculi a `APPS_AMIGAS` (js/nav-model.js) con su icono.
2. En el Cuaderno, un botón «Traer de Calculi» que lea `localStorage['calc.tabula']`, empareje alumnos por nombre con el grupo y cree una actividad de evaluación por truco (nota = dominio/10 o nivel según el semáforo).
3. Para otros dispositivos: leer la colección `calculo` de Firestore cuando Calculi sincronice (mismo `uid` de Google).

Mientras tanto, la Zona del tutor de Calculi › Aula › «Descargar evaluación (CSV)» da los mismos datos en una hoja de cálculo.
