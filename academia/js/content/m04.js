export default {
  id: 4, title: 'Todas las condiciones de luz', short: 'Luz', tags: ['luz', 'parpadeo', 'wb'],
  goal: 'Leer cualquier situación de luz en un minuto: cuánta hay, de qué calidad, de qué color, si parpadea y dónde está el conflicto de contraste.',
  lessons: [
    { id: '4.1', title: 'Leer la luz en cinco preguntas', mins: 8, body: `
Antes de tocar la cámara, responde siempre a lo mismo. Con práctica son treinta segundos.

1. **¿Cuánta?** Estima el EV (módulo 2). Te dice de inmediato si necesitarás ND o ISO alto y qué perfil es viable.
2. **¿De dónde viene y cómo es?** Dirección (frontal, lateral, cenital, contra) y calidad (dura o suave). Mira las sombras: su borde te dice el tamaño de la fuente; su dirección, dónde está.
3. **¿De qué color?** Temperatura (cálida o fría) y limpieza (¿tiñe la piel de verde o magenta?). ¿Hay más de una fuente?
4. **¿Parpadea?** Toda luz artificial es sospechosa hasta que lo compruebas.
5. **¿Dónde está el conflicto?** Localiza lo más brillante y lo más oscuro que te importan. ¿Caben en tu perfil con el sujeto en su nivel?

> [PRINCIPIO] Los ajustes de cámara son la consecuencia de estas respuestas. Por eso no existen recetas universales: dos gimnasios con el mismo aspecto pueden diferir en dos stops y en tipo de parpadeo.

## Un truco para estimar el contraste
Entorna los ojos o mira la escena a través de la cámara con el asistente gamma desactivado en S-Log3: lo que siga destacando como muy brillante o muy oscuro es tu conflicto.

## La biblioteca de escenarios
Esta app incluye 19 escenarios con once apartados cada uno. Estúdialos como casos, no como tablas que memorizar: fíjate en **por qué** cambia cada decisión.

[[#/escenarios|Abrir la biblioteca de escenarios de luz →]]
` },
    { id: '4.2', title: 'Parpadeo: red eléctrica, LED y Japón', mins: 9, body: `
Muchas luces artificiales no emiten de forma continua. Si el tiempo de obturación no encaja con su ritmo, cada fotograma (o cada franja del sensor, por el rolling shutter) recibe una cantidad distinta de luz: aparecen pulsaciones de brillo o bandas que se desplazan.

## Parpadeo por la red eléctrica
La corriente alterna hace que la luz pulse al **doble** de la frecuencia de la red: 100 veces por segundo con 50 Hz, 120 con 60 Hz. Si la obturación dura un número entero de pulsos, todos los fotogramas reciben lo mismo.

| Red | Pulsos de luz | Obturaciones seguras |
| 50 Hz (Europa, este de Japón) | 100 por segundo | 1/100, 1/50, 1/33, 1/25 |
| 60 Hz (América, oeste de Japón) | 120 por segundo | 1/120, 1/60, 1/40, 1/30 |

{{fig:hz|Japón es uno de los pocos países con las dos frecuencias.}}

> [PRINCIPIO] Japón tiene dos redes: 50 Hz en el este (Tokio, Yokohama, Tohoku, Hokkaido) y 60 Hz en el oeste (Osaka, Kioto, Nagoya, Hiroshima, Kyushu). En un mismo viaje tendrás que cambiar de obturación segura según la ciudad.

Consecuencia práctica para tu viaje, grabando a 25p con 1/50: en Tokio no tendrás problema con luces ligadas a la red; en Osaka o Kioto, 1/50 puede producir batido con algunas fuentes y tendrás que pasar a 1/60 (ángulo de 150°, visualmente casi idéntico). No hace falta cambiar la cámara a NTSC.

## Parpadeo por atenuación (PWM)
Muchos LED regulan su intensidad encendiéndose y apagándose a alta frecuencia, sin relación con la red. Aquí las obturaciones «seguras» no garantizan nada.

Qué probar, por orden:
1. Pedir que suban la luminaria al 100 % (a máxima potencia muchos LED dejan de pulsar).
2. Probar varias obturaciones cercanas mirando la pantalla ampliada.
3. Usar la función de obturador variable de la cámara, si tu firmware la ofrece, para afinar la obturación en pasos muy pequeños hasta que las bandas se detengan.
4. Evitar esa luminaria o apagarla.

> [OFICIAL] En foto, la A7 IV dispone de «Toma antiparpadeo», que sincroniza el disparo con el pico de luz (requiere obturador mecánico). Consulta en la Guía de ayuda de tu versión de firmware las opciones de ajuste antiparpadeo disponibles en vídeo.

## Pantallas y proyectores
Pantallas LED de escenario, monitores y proyectores tienen su propia frecuencia de refresco. Las bandas sobre una pantalla en plano se ajustan con el obturador variable o cambiando la obturación en pequeños pasos; a veces solo se minimizan.

## Protocolo de 20 segundos
Antes de cualquier rodaje con luz artificial: graba cinco segundos, reprodúcelos ampliados y busca bandas o pulsación. Repite a 50p si vas a usar cámara lenta: a más fotogramas, obturación más corta y parpadeo más visible.
` },
    { id: '4.3', title: 'Color de la luz y balance de blancos', mins: 8, body: `
## Temperatura de color
Se mide en Kelvin. Números bajos son luz cálida; altos, fría.

| Fuente | Kelvin aproximado |
| Vela | 1900 |
| Bombilla cálida / tungsteno | 2700–3200 |
| Golden hour | 3000–4000 |
| Fluorescente neutro | 4000 |
| Sol de mediodía, flash, LED «daylight» | 5500–5600 |
| Nublado | 6500 |
| Sombra abierta, blue hour | 7000–10000 |

El balance de blancos le dice a la cámara qué luz debe considerar neutra. Si pones el mismo valor que la fuente, sale neutra; si pones un valor mayor, la imagen se calienta; si menor, se enfría.

?? Luz de tungsteno a 3200 K y cámara a 5600 K. ¿Cómo se ve? || Naranja. La cámara espera una luz más azul de la que hay, y compensa calentando.

## El segundo eje: verde–magenta
La temperatura solo describe el eje azul–ámbar. Fluorescentes y LED baratos tienen además un exceso de verde (o de magenta) que el ajuste Kelvin no corrige. Para eso sirve el balance **personalizado** con carta gris, o el ajuste fino de tinte.

## Neutro no siempre es correcto
> [ESTETICA] Corregir todo a neutro es una opción, no una obligación. Un atardecer neutralizado pierde su razón de ser; un bar con luz cálida se siente falso si la piel es «blanca de estudio». La pregunta es qué debe sentir el espectador.

Reglas de trabajo razonables:
- **Vídeo**: balance fijo por escena. Decídelo una vez y no lo toques entre planos que van juntos.
- **Luz que cuenta la hora del día** (amanecer, atardecer, blue hour): fija un valor diurno y deja que el color exista.
- **Luz artificial fea** (LED verdoso de gimnasio): personalizado con carta.
- **Foto RAW**: el automático es aceptable, porque el balance se reescribe sin pérdida.

## Luz mixta
Cuando conviven dos temperaturas, tienes cuatro salidas: apagar una, filtrar una con gel para igualarla a la otra, separarlas para que cada una ilumine una cosa distinta, o aceptar el contraste de color como estilo. Lo que no funciona es esperar que un balance global arregle dos colores.
` },
    { id: '4.4', title: 'Luz natural a lo largo del día', mins: 7, body: `
| Momento | Calidad | Contraste | Qué favorece |
| Antes de amanecer / blue hour | muy suave, fría | bajo | paisaje urbano con luces, atmósfera |
| Amanecer y golden hour | direccional, cálida | medio-alto | retrato, contraluces, textura |
| Media mañana y media tarde | direccional, neutra | alto | deporte, arquitectura, color |
| Mediodía | cenital, dura | muy alto | poco: busca sombra o difunde |
| Nublado | envolvente | bajo | retrato sin modificadores, producto |
| Sombra abierta | suave, azulada | bajo | retrato rápido |

## Trabajar con el sol que hay
- **Sol alto**: no puedes moverlo, pero sí mover al sujeto. Sombra abierta con el sujeto en el borde mirando hacia fuera es la «ventana» más grande del mundo.
- **Sol bajo**: decide entre luz frontal (plana, saturada), lateral (volumen, textura) o contra (halo, separación; exige relleno).
- **Nublado**: crea volumen restando luz. Una pared oscura o una tela negra a un lado añade sombra donde no la hay.

## Planificar con la luz
La posición del sol es predecible. Para un rodaje exterior, comprueba el día anterior a qué hora ilumina tu localización y desde dónde. En noviembre en Japón el sol se pone hacia las 16:30–17:00: la golden hour llega pronto y dura poco.

> [PRACTICA] Organiza el plan de rodaje por la luz: planos generales y contraluces en la mejor hora; primeros planos, que puedes controlar con un reflector o tu LED, en las horas difíciles.
` },
    { id: '4.5', title: 'Interiores y noche: buscar, sumar, restar', mins: 8, body: `
En interior y de noche el problema casi nunca es «cómo configuro la cámara» sino «dónde pongo al sujeto».

## Buscar
Recorre el espacio antes de sacar la cámara. Localiza la mejor luz existente: una ventana lateral, un panel LED limpio, un escaparate, un rótulo. Mueve la acción allí. Un metro de diferencia puede ser un stop.

## Sumar
Tu LED pequeño no ilumina una sala, pero a medio metro de una cara cambia un plano:
- **Rebotado** en una pared o techo blanco: principal suave.
- **Directo desde atrás o lateral**: contra que separa del fondo oscuro.
- **A baja potencia, de frente**: brillo en los ojos y limpieza de piel bajo luces de color.

## Restar
Apagar es iluminar. Apaga el plafón del techo, la línea de tubos que parpadea, la lámpara que mezcla color. Menos fuentes, más control.

## Gimnasios
- Luz cenital dura: coloca al atleta ligeramente por delante de la luminaria, no justo debajo, para que la luz entre en la cara.
- Usa las luminarias del fondo como contraluz colocándote frente a ellas.
- Fondos: los gimnasios son ruidosos visualmente. Busca fondos oscuros y profundidad; cierra el encuadre.
- Espejos: decide si los usas (duplican al atleta y la luz) o los evitas (te reflejan a ti y a tu LED).

## Noche urbana
- El ojo se adapta a la oscuridad; la cámara no. Lo que tú ves «bien iluminado» está a EV 3.
- Los suelos mojados duplican las luces: tras la lluvia, la noche se ilumina sola.
- Deja que el negro sea negro. Una imagen nocturna con sombras levantadas es gris y ruidosa.

?? Estás en un callejón con un rótulo luminoso a dos metros. ¿Dónde colocas al cantante: de espaldas al rótulo, de frente o de lado? || De lado o en tres cuartos suele ser lo más rico: el rótulo modela la cara con volumen. De frente da luz plana pero limpia. De espaldas da silueta y halo; necesita un relleno para ver la cara.
` }
  ],
  cases: [
    { t: 'Kioto de noche a 1/50', b: 'Grabas farolillos y rótulos en Gion a 25p y 1/50. En el hotel ves un pulso lento de brillo en varios planos. Kioto está en la zona de 60 Hz: la luz pulsa 120 veces por segundo y 1/50 no integra ciclos completos. **Solución:** 1/60 en el oeste de Japón (150°) y prueba de cinco segundos antes de cada localización.' },
    { t: 'Box de CrossFit con LED regulados', b: 'Con 1/50 hay bandas; con 1/100, también. No es la red: es PWM. El dueño sube los paneles del 60 al 100 % y las bandas desaparecen. Sobra un stop de luz, que absorbes bajando ISO. **Lección:** pregunta siempre si las luces están reguladas.' },
    { t: 'Retrato en Shibuya', b: 'Fondo de pantallas gigantes a EV 9, modelo en la acera a EV 3. Seis stops de diferencia. **Decisión:** acercar a la modelo a un escaparate iluminado (EV 6), 50 mm f/1.8, y dejar que las pantallas queden algo altas y desenfocadas. La localización de la luz resolvió lo que el ISO no podía.' }
  ],
  errors: [
    'Copiar ajustes de otro rodaje «parecido» sin medir.',
    'No hacer la prueba de parpadeo antes de empezar.',
    'Usar 1/50 en el oeste de Japón (60 Hz) con luz artificial ligada a la red.',
    'Balance de blancos automático en vídeo.',
    'Neutralizar el color de un amanecer o de un neón.',
    'Colocar al sujeto justo debajo de una luz cenital.',
    'Levantar las sombras de una escena nocturna hasta dejarla gris.',
    'Intentar resolver con ISO lo que se resuelve moviendo al sujeto dos metros.'
  ],
  exercise: {
    title: 'Diagnóstico de seis escenarios',
    steps: [
      'Abre la biblioteca de escenarios y elige seis que vayas a encontrar en Japón.',
      'Para cada uno, tapa el contenido y responde por escrito a las cinco preguntas (cuánta, cómo, color, parpadeo, conflicto).',
      'Compara con la ficha y anota dónde te equivocaste.',
      'En el avión: observa la cabina con las luces de lectura. ¿De dónde viene la luz? ¿Dura o suave? ¿Qué temperatura? Estima el EV.',
      'Al llegar: haz la prueba de parpadeo de 5 segundos en el hotel a 1/50 y a 1/60 y comprueba en qué zona eléctrica estás.'
    ],
    deliver: 'Seis diagnósticos escritos y el resultado de tu prueba de parpadeo.'
  },
  checklist: [
    'EV estimado: sé si necesito ND o ISO alto',
    'Dirección y calidad de la luz identificadas',
    'Fuentes de color contadas; dominante decidida',
    'Balance de blancos fijado (Kelvin o personalizado)',
    'Prueba de parpadeo de 5 s grabada y revisada ampliada',
    'Obturación acorde a la red local (50 Hz: 1/50–1/100; 60 Hz: 1/60–1/120)',
    'Conflicto de contraste localizado y resuelto',
    'Sujeto colocado en la mejor luz disponible',
    'Luces sobrantes apagadas'
  ],
  summary: [
    'Cinco preguntas: cuánta, cómo, de qué color, parpadea, dónde está el conflicto.',
    'La luz artificial pulsa al doble de la frecuencia de red: 1/50–1/100 con 50 Hz, 1/60–1/120 con 60 Hz.',
    'Japón: 50 Hz al este (Tokio), 60 Hz al oeste (Osaka, Kioto).',
    'El PWM de los LED no depende de la red: subir al 100 %, afinar obturación o evitar la luminaria.',
    'Kelvin corrige azul–ámbar; el verde–magenta exige balance personalizado.',
    'Neutro es una opción estética, no una obligación.',
    'En interior y de noche: buscar la luz, sumar la tuya cerca, restar la que estorba.',
    'Los 19 escenarios son casos para razonar, no recetas.'
  ],
  quiz: [
    { q: 'Grabas en Osaka a 25p bajo fluorescentes y ves un pulso de brillo con 1/50. ¿Qué obturación pruebas primero?', o: ['1/100', '1/60', '1/25', '1/200'], a: 1, w: 'Osaka usa 60 Hz: la luz pulsa a 120 Hz y las obturaciones seguras son 1/60 y 1/120. 1/100 y 1/25 son seguras con 50 Hz.', t: 'parpadeo' },
    { q: 'Con 1/50 y 1/100 sigue habiendo bandas en un gimnasio de Madrid. La causa más probable es…', o: ['Red de 60 Hz', 'Atenuación PWM de los LED', 'ISO demasiado alto', 'Rolling shutter defectuoso'], a: 1, w: 'Si las obturaciones acordes a la red no lo eliminan, el parpadeo no viene de la red sino de la regulación del LED. Prueba a subir las luces al 100 % o afinar la obturación.', t: 'parpadeo' },
    { q: 'Sombra abierta en día soleado con la cámara a 5600 K. La piel sale…', o: ['anaranjada', 'azulada', 'verde', 'neutra'], a: 1, w: 'La sombra la ilumina el cielo azul (7000 K o más). Con la cámara a 5600 K la imagen queda fría; sube a ~7000 K o usa personalizado.', t: 'wb' },
    { q: 'Un LED de gimnasio tiñe la piel de verde. ¿Qué lo corrige mejor en rodaje?', o: ['Bajar los Kelvin', 'Subir los Kelvin', 'Balance personalizado con carta gris', 'Subir la saturación'], a: 2, w: 'El ajuste Kelvin solo actúa en el eje azul–ámbar. El personalizado mide la luz real, incluido el desvío verde–magenta.', t: 'wb' },
    { q: 'Mediodía con sol duro y tienes que hacer un retrato. ¿Primera opción?', o: ['Subir ISO', 'Llevar al sujeto al borde de una sombra abierta', 'Cerrar a f/16', 'Usar flash directo a máxima potencia'], a: 1, w: 'No puedes mover el sol, pero sí al sujeto. La sombra abierta da luz grande y suave.', t: 'luz' },
    { q: 'Noche urbana: el sujeto está en una zona oscura a EV 1 y hay un escaparate a diez metros. ¿Qué haces?', o: ['ISO 51200', 'Llevar al sujeto junto al escaparate', 'Obturación 1/10', 'S-Log3 para recuperar'], a: 1, w: 'Buscar luz antes que amplificar. Junto al escaparate ganarás varios stops y una luz con dirección.', t: 'luz' },
    { q: 'Ventana lateral (5600 K) y lámpara de mesa (2800 K) iluminan la misma cara. Lo más limpio es…', o: ['Balance automático', 'Apagar una de las dos o separarlas', 'Fijar 4200 K y olvidarse', 'Rodar en blanco y negro'], a: 1, w: 'El balance es global y no puede neutralizar dos colores a la vez. Simplificar o separar las fuentes es la solución en rodaje.', t: 'wb' },
    { q: '¿Por qué el parpadeo se nota más a 50p que a 25p?', o: ['Porque hay más ruido', 'Porque la obturación es más corta y abarca menos ciclos de luz', 'Porque el sensor recorta', 'No se nota más'], a: 1, w: 'A 50p con 180° obturas a 1/100: un solo ciclo de luz con 50 Hz. Cualquier desajuste o PWM se hace más evidente.', t: 'parpadeo' }
  ]
};
