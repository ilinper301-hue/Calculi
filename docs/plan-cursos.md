# Plan de trucos de 2.º a 6.º

Cada curso tiene su carpeta: `src/js/estrategias/c2/` … `c6/`. Archivo `NN-id.js` (NN = orden con dos cifras).
Todas las estrategias llevan `curso: N`. Los `id` son únicos en toda la app (no repetir los de 1.º: versincontar, masmenos1, descomponer, amigos10, orden, desdemayor, haciaatras, usar5, dobles, casidobles, familias, completar10, sumar9, restarsumando, masmenos10, decenas).
Plantillas: `src/js/estrategias/04-amigos10.js` (1.º) y `src/js/estrategias/c3/04-tabla9.js` (cursos superiores: tabla, matriz, teclado).

## Normas comunes
- `ic`: texto matemático corto, sin emojis (`×9`, `25%`, `½`, `0,5`, `±19`).
- Números en `q` y `txt` escritos con `fmt(n)` cuando puedan tener decimales o ≥ 10.000 (coma decimal; punto de millares desde 10.000). Nunca punto decimal.
- Signos: `+`, `−` (U+2212), `×`, `:` (división). Porcentaje `25 %` (con espacio). Fracción como texto `3/4`.
- `r` es un número (puede ser decimal desde 4.º, con ≤ 3 decimales).
- Niveles: 1 = números pequeños y dibujo + 3 botones; 2 = medianos, 3 botones; 3 = más grandes, teclado.
- Dibujos: marco, puntos, dedos, parte, recta (admite `paso: 0.1`), decenas (admite placas `c`), matriz, barra, cien. Ver comentario de `src/js/20-visual.js`.
- La guiada desmonta el truco en 2-3 pasos y termina en la operación.
- `extra`: errores típicos reales (p. ej. en ×9: multiplicar por 10 y no restar).
- Juego de parejas: 6 pares; textos de tarjetas cortos (≤ 9 caracteres), ninguno igual en dos pares distintos.

## 2.º (hasta 999)
| # | id | Nombre | Tri | Idea, rangos y dibujo |
|---|----|--------|-----|------------------------|
| 1 | amigos100 | Amigos del 100 | 1 | Decenas que suman 100 (30+70) y luego números como 45+55. Dibujo: decenas / cien. |
| 2 | sumadecenas | Sumar decenas | 1 | 47 + 30 → solo cambian las decenas. Hasta 99. Decenas o recta con saltos de 10. |
| 3 | restadecenas | Restar decenas | 1 | 85 − 40. Decenas con tachar o recta. |
| 4 | descomponer2 | Decenas y unidades | 1 | 34 + 25 = (30+20) + (4+5), sin llevar. Decenas con dos grupos. |
| 5 | pasardecena2 | Pasar la decena | 2 | 38 + 7 = 38 + 2 + 5. Recta con dos saltos. Hasta 99. |
| 6 | sumar919 | Sumar 9 y 19 | 2 | +10 −1 / +20 −1. Recta. |
| 7 | restar919 | Restar 9 y 19 | 2 | −10 +1 / −20 +1. Recta. |
| 8 | compensar2 | Redondear y compensar | 2 | 48 + 25 = 50 + 25 − 2. Recta. |
| 9 | doblesmitades | Dobles y mitades | 2 | Dobles hasta 50 (doble de 25) y mitades de pares hasta 100. Barra de 2 partes. |
| 10 | multsuma | Multiplicar es sumar | 3 | 3 × 4 = 4 + 4 + 4. Matriz. Tablas hasta ×5. |
| 11 | tabla2 | Tabla del 2 | 3 | Es el doble. Matriz 2 × n. |
| 12 | tabla5 | Tabla del 5 | 3 | Contar de 5 en 5 (manos, reloj). Matriz o recta con saltos de 5. |
| 13 | tabla10 | Tabla del 10 | 3 | Se añade un cero. Decenas. |
| 14 | centenas | Sumar y restar centenas | 3 | 300 + 400, 700 − 200, 250 + 100. Decenas con placas. |
| 15 | restaradelante | Restar hacia delante | 3 | 62 − 58: de 58 a 62 hay 4. Recta. |

## 3.º (hasta 9.999; tablas y división)
| # | id | Nombre | Tri | Idea |
|---|----|--------|-----|------|
| 1 | tabla4 | Tabla del 4 | 1 | Doble del doble. Matriz partida en 2+2 filas. |
| 2 | tabla8 | Tabla del 8 | 1 | Doble de la del 4. |
| 3 | tabla3y6 | Tablas del 3 y del 6 | 1 | ×6 = doble de ×3. Matriz partir 3. |
| 4 | tabla9 | Tabla del 9 | 1 | ×10 y quito una vez (PLANTILLA YA HECHA). |
| 5 | tabla7 | Tabla del 7 | 1 | ×5 + ×2. Matriz partir 5. |
| 6 | conmutar | El orden en las tablas | 2 | 3 × 8 = 8 × 3: elige la tabla fácil. Matriz girada. |
| 7 | por10y100 | Multiplicar por 10 y 100 | 2 | Añadir ceros (decenas/centenas). Hasta 9.999. |
| 8 | dividirtabla | Dividir con la tabla | 2 | 24 : 6 → 6 × ? = 24. Matriz o barra con partes. |
| 9 | fraccion3 | Mitad, tercio y cuarto | 2 | Mitad/tercio/cuarto de un número (barra 2/3/4 partes, total arriba, valor ?). |
| 10 | suma2cifras | Sumar descomponiendo | 2 | 47 + 36 = 70 + 13 (con llevadas). Decenas. |
| 11 | resta2cifras | Restar compensando | 3 | 73 − 28 = 73 − 30 + 2. Recta. |
| 12 | multdecenas | Multiplicar decenas | 3 | 3 × 40 = 3 × 4 decenas. Decenas. |
| 13 | multdescomp | Multiplicar descomponiendo | 3 | 6 × 14 = 6 × 10 + 6 × 4. Matriz partir (o pasos). Hasta ×19. |
| 14 | sumamillares | Sumar centenas y millares | 3 | 2500 + 300, 4200 + 1800. |
| 15 | estimar3 | Estimar redondeando | 3 | 49 + 32 ≈ 50 + 30 = 80 (respuesta = la estimación). txt explica «redondea a la decena». |

## 4.º (millones; primeros decimales y fracciones)
| # | id | Nombre | Tri | Idea |
|---|----|--------|-----|------|
| 1 | por5 | Multiplicar por 5 | 1 | ×10 y la mitad (24 × 5 = 240 : 2). |
| 2 | por9 | Multiplicar por 9 | 1 | ×10 − el número (dos cifras: 23 × 9). |
| 3 | por11 | Multiplicar por 11 | 1 | ×10 + el número; truco de 2 cifras (23 × 11 = 253). |
| 4 | dobleymitad | Doble y mitad | 1 | 16 × 5 = 8 × 10; 14 × 15 = 7 × 30. |
| 5 | dividir10 | Dividir entre 10, 100 y 1000 | 1 | Quitar ceros (números redondos). |
| 6 | por20y50 | Por 20, 30 y 50 | 2 | ×2 ×10; ×50 = ×100 : 2. |
| 7 | dividir5 | Dividir entre 5 | 2 | ×2 y : 10 (85 : 5 = 170 : 10). |
| 8 | mult2x1 | Dos cifras por una | 2 | 7 × 26 = 7 × 20 + 7 × 6. |
| 9 | compensar4 | Compensar con centenas | 2 | 498 + 235 = 500 + 235 − 2; 600 − 198. |
| 10 | fraccioncant | Fracción de una cantidad | 2 | 3/4 de 20: entre 4 y por 3. Barra (total, valor). |
| 11 | decimas | Sumar décimas | 3 | 0,7 + 0,3 = 1; 2,6 + 0,4. Recta paso 0.1 o cien. |
| 12 | medio | Sumar y restar 0,5 | 3 | 3,5 + 0,5; 6 − 0,5; 2,5 + 2,5. Recta paso 0.5. |
| 13 | decimal10 | Decimales × 10 y : 10 | 3 | 3,4 × 10 = 34; 56 : 10 = 5,6. |
| 14 | estimarprod | Estimar productos | 3 | 48 × 3 ≈ 50 × 3 = 150 (respuesta = estimación). |

## 5.º
| # | id | Nombre | Tri | Idea |
|---|----|--------|-----|------|
| 1 | por25 | Multiplicar por 25 | 1 | ×100 : 4. |
| 2 | por50 | Multiplicar por 50 | 1 | ×100 : 2. |
| 3 | por4y8 | Por 4 y por 8 duplicando | 1 | ×4 = doble del doble; ×8 = tres dobles. |
| 4 | entre4y8 | Entre 4 y entre 8 | 1 | Mitad de la mitad (de la mitad). |
| 5 | por99 | Por 99 y por 101 | 1 | ×100 − n / ×100 + n. |
| 6 | complemento1 | Completar la unidad | 2 | 0,35 + ? = 1; 0,8 + ? = 1. Cien. |
| 7 | decimal100 | Decimales × 10, 100, 1000 | 2 | Mover la coma (y : 10, : 100). |
| 8 | pormedio | Multiplicar por 0,5 | 2 | × 0,5 = la mitad. Barra 2 partes. |
| 9 | equivalentes | Fracciones equivalentes | 2 | 2/4 = ?/2; 6/8 = 3/?. Barra. r entero (numerador o denominador). |
| 10 | fraccion5 | Fracción de una cantidad | 2 | 3/5 de 40, 2/3 de 90. Barra. |
| 11 | porcentaje | 10 %, 50 % y 25 % | 3 | 10 % = : 10; 50 % = mitad; 25 % = cuarta parte. Cien o barra. |
| 12 | decimalcomp | Compensar con decimales | 3 | 4,9 + 2,6 = 5 + 2,6 − 0,1. |
| 13 | estimar5 | Estimar con decimales | 3 | 3,8 × 5 ≈ 4 × 5 (respuesta = estimación). |
| 14 | divisible | ¿Es divisible? | 3 | Criterios del 2, 3, 5 y 10: q «¿Es 246 divisible entre 3?», r 1 = sí, 0 = no, con ops [1,0] mostrados… (usar en su lugar: «Suma de cifras de 246 = ?» y luego «246 : 3 = ?» con números que sí lo son). |

## 6.º
| # | id | Nombre | Tri | Idea |
|---|----|--------|-----|------|
| 1 | por01 | Por 0,1 y por 0,01 | 1 | ×0,1 = : 10; ×0,01 = : 100. |
| 2 | entremedio | Dividir entre 0,5 | 1 | : 0,5 = × 2. |
| 3 | por15 | Multiplicar por 15 | 1 | ×10 + la mitad (24 × 15 = 240 + 120). |
| 4 | por12 | Multiplicar por 12 | 1 | ×10 + ×2. |
| 5 | cuadrados | Cuadrados | 1 | Hasta 20²; truco de los acabados en 5 (35² = 1225). Matriz cuadrada hasta 12. Escribir «35²». |
| 6 | porcentaje6 | Porcentajes rápidos | 2 | 1 %, 5 % (mitad del 10 %), 15 %, 75 %. Cien. |
| 7 | descuento | Aumentos y descuentos | 2 | Precio con 20 % menos / 10 % más (r = precio final). |
| 8 | fdp | Fracción, decimal y % | 2 | 3/4 = ? % ; 0,2 = ? %; 40 % = ?/5. Cien/barra. |
| 9 | proporcion | Regla de tres simple | 2 | 3 kg cuestan 6 €; ¿y 5 kg? Barra. |
| 10 | potencias10 | Potencias de 10 | 3 | 10³ = ?; 4 × 10² = ?; 3.500 = 35 × 10^? (r exponente). Escribir «10³». |
| 11 | por15y25 | Por 1,5 y por 2,5 | 3 | ×1,5 = n + mitad; ×2,5 = doble + mitad. |
| 12 | entre25y50 | Entre 25 y entre 50 | 3 | : 25 = × 4 : 100; : 50 = × 2 : 100. |
| 13 | raices | Raíces exactas | 3 | √49 = ?, hasta √400. Matriz cuadrada (≤ 12). Escribir «√49». |
| 14 | estimar6 | Estimar operaciones | 3 | 4,9 × 21 ≈ 5 × 20 (respuesta = estimación). |
