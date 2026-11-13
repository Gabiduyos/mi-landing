export default {
  id: 6, title: 'Cinematografía', short: 'Cinematografía', tags: ['cine'],
  goal: 'Elegir cadencia, obturación, tamaño de plano y movimiento por lo que cuentan, y mantener la continuidad para que el montaje funcione.',
  lessons: [
    { id: '6.1', title: 'Fotogramas, obturación y movimiento', mins: 9, body: `
## Qué cadencia elegir
| Cadencia | Sensación | Uso |
| 24 / 25p | la «textura» del cine: cada fotograma lleva desenfoque de movimiento | narrativa, videoclip, anuncios, casi todo |
| 30p | algo más fluido | contenido para pantallas a 60 Hz, cierto contenido web |
| 50 / 60p | muy fluido si se reproduce tal cual; o cámara lenta al 50 %/40 % en línea de 25/24p | deporte, material para ralentizar |
| 100 / 120p | cámara lenta ×4/×5 (Full HD en la A7 IV) | gestos, impactos, agua, magnesio |

> [PRINCIPIO] Elige una cadencia base para el proyecto (25p en Europa) y graba a más fotogramas solo los planos que vayas a ralentizar. Mezclar 24 y 25 en una misma línea de tiempo produce tirones o cambios de velocidad.

## Regla de los 180° de obturación
{{fig:angulo|El ángulo de obturación relaciona el tiempo de exposición con la duración del fotograma.}}
En cámaras de cine la obturación se expresa como ángulo. 180° significa exponer durante la mitad de la duración del fotograma: 1/50 a 25p, 1/100 a 50p, 1/200 a 100p. Produce un desenfoque de movimiento que percibimos como natural.

> [OFICIAL] La A7 IV no ofrece ajuste por ángulo: se trabaja en tiempo de obturación. Al cambiar de fotogramas tienes que cambiar la obturación tú mismo.

## Cuándo romper los 180°
- **Más cerrado (90°–45°: 1/100–1/200 a 25p)**: movimiento entrecortado y nítido. Combate, acción nerviosa, lluvia y salpicaduras visibles gota a gota. También es lo que obtienes sin querer cuando falta ND.
- **Más abierto (270°–360°: 1/33–1/25 a 25p)**: movimiento onírico, estelas. Sirve además para ganar hasta un stop de luz en planos tranquilos.
- **Parpadeo**: la frecuencia de la luz manda sobre la regla (1/60 a 25p en redes de 60 Hz).

> [ESTETICA] La regla describe una convención perceptiva muy asentada, no una ley. Romperla funciona cuando es coherente con la escena y se mantiene; molesta cuando aparece en un plano aislado por descuido.

## Cámara lenta
- Se decide **en rodaje**: grabas a más fotogramas de los que reproduces. Ralentizar material de 25p obliga al programa a inventar fotogramas.
- Cuesta luz: 50p a 1/100 es un stop menos que 25p a 1/50; 100p, dos.
- Ralentiza lo que gana con ello: peso, esfuerzo, impacto, elegancia. Un plano sin movimiento interesante a cámara lenta es solo un plano largo.
- En 4K 50p recuerda el recorte ×1,5.
` },
    { id: '6.2', title: 'Tamaños de plano y lo que cuenta cada uno', mins: 8, body: `
{{fig:planos|De lo general a lo particular: cada tamaño responde a una pregunta distinta.}}

| Plano | Responde a | Efecto |
| Gran plano general / general | ¿dónde estamos? | contexto, escala, soledad |
| Entero / americano | ¿quién y qué hace? | acción completa, lenguaje corporal |
| Medio | ¿cómo se relaciona? | conversación, gesto |
| Primer plano | ¿qué siente? | emoción, identificación |
| Detalle | ¿qué es importante? | información, textura, ritmo |

## Cobertura
Cubrir una escena es rodarla con suficientes tamaños y ángulos para poder montarla. La secuencia mínima que siempre funciona: **general → medio → primer plano → detalle → reacción**. Con esas cinco piezas puedes contar casi cualquier acción y controlar su duración en montaje.

> [PRACTICA] En un evento sin guion, piensa en «secuencias de cinco planos» de cada situación en lugar de planos sueltos bonitos. Un wall ball: general de la estación, medio del atleta, primer plano de la cara, detalle de las manos y el balón, reacción de un compañero o del juez.

## Ángulo y altura
- **A la altura de los ojos**: neutral, cercano.
- **Contrapicado**: engrandece, da poder. Natural para atletas.
- **Picado**: empequeñece o muestra geometría.
- **Cenital**: abstracto, gráfico.
- **Aberrante (cámara inclinada)**: inestabilidad; se agota pronto.

## Regla de los 30°
Entre dos planos consecutivos del mismo sujeto, cambia al menos unos 30° de ángulo o cambia claramente de tamaño. Si no, el corte se percibe como un salto.
` },
    { id: '6.3', title: 'Continuidad y el eje de acción', mins: 9, body: `
## El eje de 180°
{{fig:eje180|Mientras la cámara permanezca a un lado del eje, las direcciones se mantienen.}}
Entre dos personajes que se miran, o a lo largo de la dirección de un movimiento, existe una línea imaginaria: el eje. Si todas las cámaras se quedan en el mismo lado, el personaje A mira siempre hacia la derecha y B hacia la izquierda, y el espectador entiende el espacio. Si cruzas, ambos parecen mirar hacia el mismo lado o un corredor parece dar media vuelta.

No confundas las dos «reglas de 180»: la de **obturación** trata del desenfoque de movimiento; la del **eje**, de la geografía de la escena.

## Cómo cruzar el eje sin que moleste
- Mostrando el cruce: la cámara se mueve de un lado a otro dentro del plano.
- Con un plano neutro intermedio: sobre el eje (frontal o de espaldas) o un detalle.
- Cuando el propio sujeto cambia de dirección en plano.
- Deliberadamente, para desorientar (peleas, confusión).

## Continuidad de movimiento
Si alguien sale de cuadro por la derecha, debe entrar por la izquierda en el siguiente plano para que parezca que sigue avanzando. En una carrera, mantén al atleta moviéndose en la misma dirección de pantalla durante toda la secuencia.

## Continuidad de detalle
Posición de manos, objetos, ropa, sudor, luz, hora del día. En videoclip y publicidad, haz una foto de referencia al final de cada plano. En evento real no la controlas: por eso se montan secuencias, no acciones continuas.

## Raccord de mirada
Si un personaje mira fuera de cuadro y cortas a lo que ve, la dirección y la altura de la mirada deben coincidir con la posición del objeto. Es lo que permite construir espacio con planos rodados en momentos distintos.

?? Grabas a un atleta empujando el trineo de izquierda a derecha. Para el siguiente plano te cruzas al otro lado de la pista porque hay mejor luz. ¿Qué verá el espectador al cortar? || Al atleta empujando de derecha a izquierda: parecerá que ha dado la vuelta o que es otro atleta en sentido contrario. Soluciones: un plano frontal o un detalle entre ambos, o quedarte en tu lado.
` },
    { id: '6.4', title: 'Movimientos de cámara con intención', mins: 9, body: `
> [PRINCIPIO] Movimiento motivado: la cámara se mueve porque algo en la escena lo pide (un personaje se desplaza, se revela información, crece una emoción). El movimiento sin motivo llama la atención sobre sí mismo.

| Movimiento | Qué es | Qué aporta |
| Panorámica / tilt | giro horizontal / vertical sobre el eje | seguir, descubrir, relacionar dos elementos |
| Travelling (dolly) hacia dentro / fuera | la cámara se acerca o se aleja | intensificar / liberar, revelar contexto |
| Travelling lateral | desplazamiento paralelo | acompañar, dar profundidad por paralaje |
| Orbital | giro alrededor del sujeto | énfasis, heroísmo |
| Grúa / elevación | cambio de altura | abrir o cerrar una escena |
| Cámara en mano | movimiento orgánico | presencia, urgencia, documental |
| Estático | sin movimiento | observación, tensión, composición |

Zoom y travelling no son lo mismo: el zoom cambia el encuadre sin cambiar la perspectiva; el travelling cambia la relación entre el sujeto y el fondo.

## Cámara en mano
Tres puntos de apoyo (dos manos y el cuerpo o la correa), codos pegados, rodillas flexionadas, respiración tranquila. Angular para disimular el temblor; con 70 mm cada vibración se amplifica. La jaula con asa superior añade masa y un agarre bajo para planos a ras de suelo. El temblor leve y continuo se lee como «documental»; el golpe brusco, como error.

## Gimbal (RS 3)
- **Equilibra de verdad** antes de encender: los motores trabajan menos y la batería dura más. Reequilibra si cambias de objetivo o de focal de forma notable.
- Camina con las rodillas flexionadas y pasos rodados; el gimbal no elimina el sube-baja vertical.
- Usa el modo adecuado: seguimiento de panorámica para acompañar, bloqueo para travellings rectos, modo de giro completo solo cuando la toma lo pida.
- Movimiento con principio, desarrollo y final: empieza quieto, muévete, termina quieto. El montador te lo agradecerá.
- Primer término cerca de la cámara (una columna, una máquina, una persona) para que el desplazamiento se perciba.

> [OPINION] «Todo con gimbal» es una tendencia de redes, no una norma. Un proyecto entero flotando resulta monótono; alternar trípode, mano y gimbal da textura y permite que el movimiento signifique algo.

## Trípode
Infravalorado. Un plano fijo bien compuesto descansa la vista, da autoridad y es el mejor soporte para cámara lenta, entrevistas y planos generales.
` },
    { id: '6.5', title: 'Narrativa visual y lenguaje', mins: 9, body: `
## Mostrar, no explicar
Cada plano debe aportar información o emoción nuevas. Pregunta de control: si quito este plano, ¿se pierde algo? Si no, sobra.

## Estructura mínima
Incluso un reel de 20 segundos tiene tres partes: **planteamiento** (quién, dónde, qué quiere), **desarrollo** (esfuerzo, obstáculo, proceso) y **resolución** (resultado, emoción, llamada). En redes se añade un **gancho** antes del planteamiento.

## Efecto Kuleshov
El significado nace de la relación entre planos. La misma cara neutra seguida de un plato de comida, de un niño o de un ataúd se lee como hambre, ternura o tristeza. Consecuencia práctica: rueda planos de reacción y de miradas; multiplican lo que puedes contar en montaje.

## Profundidad
La pantalla es plana; la sensación de espacio se construye:
- **Capas**: primer término, sujeto, fondo.
- **Líneas** que convergen.
- **Luz**: sujeto separado del fondo por brillo o color.
- **Enfoque selectivo** y cambios de foco para dirigir la atención.
- **Paralaje** al mover la cámara.

## Motivos visuales
Repetir un encuadre, un color o un objeto crea coherencia y permite contar el cambio: el mismo plano del atleta al principio (nervioso) y al final (agotado y feliz) funciona sin palabras.

## Romper las reglas deliberadamente
| Regla | Cuándo romperla | Efecto |
| 180° de obturación | acción, combate, sueño | nerviosismo o irrealidad |
| Eje de acción | desorientación, caos | el espectador pierde el suelo |
| Horizonte nivelado | tensión, locura | inestabilidad |
| Aire en la mirada | encierro, amenaza | el personaje «choca» con el borde |
| Continuidad | paso del tiempo, energía (jump cut) | ritmo, elipsis |

> [ESTETICA] Romper una regla funciona cuando el espectador percibe intención: se hace con claridad, se repite o coincide con un giro de la historia. Una sola infracción tímida parece un fallo.
` }
  ],
  cases: [
    { t: 'Entrada del artista en un videoclip', b: 'Opción A: gimbal orbitando sin motivo. Opción B: plano fijo general del callejón vacío; el artista entra al fondo y camina hacia cámara; al llegar a primer plano entra el estribillo y la cámara retrocede con él. B usa composición, tiempo y un movimiento motivado: cuenta más con menos.' },
    { t: 'Carrera de HYROX montable', b: 'Decisión previa: el atleta siempre avanza de izquierda a derecha en pantalla. Todas las posiciones se eligen en el mismo lado del recorrido. Cuando la organización obliga a cambiar de lado, se rueda un frontal con el 70 mm como plano puente.' },
    { t: 'Cámara lenta que no aporta', b: 'Un reel entero a 50 % de velocidad pierde energía. Remontado: velocidad real para la acción, cámara lenta solo en tres momentos (magnesio, salto, meta). El contraste entre velocidades es lo que hace especial la cámara lenta.' }
  ],
  errors: [
    'Olvidar cambiar la obturación al pasar de 25p a 50p.',
    'Mezclar 24p y 25p en el mismo proyecto.',
    'Ralentizar en montaje material grabado a 25p.',
    'Cruzar el eje sin plano puente.',
    'Mover la cámara porque sí.',
    'Planos sueltos bonitos sin cobertura: imposible montar una secuencia.',
    'Cortes entre planos casi iguales (menos de 30° o mismo tamaño).',
    'Gimbal sin equilibrar o caminando erguido.',
    'Movimientos sin inicio ni final estables.'
  ],
  exercise: {
    title: 'Una acción en cinco planos',
    steps: [
      'Elige una acción cotidiana de 20 segundos (preparar un té, atarse las zapatillas). En el avión puedes planificarla sobre papel.',
      'Dibuja o describe cinco planos: general, medio, primer plano, detalle, reacción. Indica tamaño, altura, focal y si hay movimiento y por qué.',
      'Marca el eje y comprueba que los cinco planos están en el mismo lado.',
      'Al aterrizar, ruédala a 25p y 1/50 (1/60 si estás en el oeste de Japón con luz artificial) y móntala en el móvil.',
      'Rueda una versión rompiendo una regla a propósito y compara.'
    ],
    deliver: 'El guion de cinco planos con el eje dibujado y, después, las dos versiones montadas.'
  },
  checklist: [
    'Cadencia base del proyecto decidida y única',
    'Obturación ajustada a cada cadencia (y a la red eléctrica)',
    'Planos a cámara lenta identificados antes de rodar',
    'Cobertura: general, medio, primer plano, detalle, reacción',
    'Eje de acción identificado; cámara siempre en el mismo lado',
    'Dirección de pantalla coherente en desplazamientos',
    'Cada movimiento de cámara tiene motivo, inicio y final',
    'Gimbal equilibrado; modo correcto',
    'Foto de continuidad al terminar cada plano (ficción y publicidad)'
  ],
  summary: [
    '25p como base; 50p/100p solo para lo que se va a ralentizar.',
    '180° de obturación: 1/50 a 25p, 1/100 a 50p. La A7 IV trabaja en tiempo, no en ángulo.',
    'Romper los 180° es válido si es coherente; el parpadeo manda sobre la regla.',
    'Cada tamaño de plano responde a una pregunta; cubre en secuencias de cinco.',
    'Eje de 180°: quédate en un lado o usa un plano puente.',
    'Movimiento motivado, con principio y final.',
    'El significado nace de la relación entre planos: rueda reacciones.',
    'Las reglas se rompen con intención visible.'
  ],
  quiz: [
    { q: 'Pasas de 25p a 50p para un plano a cámara lenta. Para mantener 180°, la obturación debe ser…', o: ['1/25', '1/50', '1/100', '1/200'], a: 2, w: '180° equivale a 1/(2 × fps): 1/100 a 50p. Y recuerda que pierdes un stop de luz.', t: 'cine' },
    { q: 'Dos personas conversan. Ruedas a A desde su izquierda y a B cruzando al otro lado de la línea que los une. En montaje…', o: ['se verán enfrentados correctamente', 'parecerá que ambos miran hacia el mismo lado', 'B saldrá desenfocado', 'no hay diferencia'], a: 1, w: 'Has cruzado el eje de acción: las direcciones de mirada dejan de oponerse y se pierde la geografía.', t: 'cine' },
    { q: '¿Qué diferencia hay entre un zoom hacia dentro y un travelling hacia dentro?', o: ['Ninguna', 'El travelling cambia la perspectiva entre sujeto y fondo; el zoom solo recorta', 'El zoom desenfoca más', 'El travelling es más rápido'], a: 1, w: 'Al mover la cámara cambian las distancias relativas y aparece paralaje; el zoom amplía la misma perspectiva.', t: 'cine' },
    { q: 'Has grabado todo a 25p y en montaje quieres un plano al 40 % de velocidad. ¿Qué ocurre?', o: ['Queda perfecto', 'El programa debe duplicar o interpolar fotogramas: tirones o artefactos', 'Mejora la nitidez', 'Se convierte en 100p'], a: 1, w: 'No hay fotogramas suficientes. La cámara lenta se decide en rodaje grabando a 50p o más.', t: 'cine' },
    { q: 'A 25p con 1/200, el movimiento se verá…', o: ['más emborronado', 'entrecortado y nítido (45°)', 'igual que a 1/50', 'más lento'], a: 1, w: '1/200 a 25p es un ángulo de 45°: muy poco desenfoque por fotograma y sensación estroboscópica.', t: 'cine' },
    { q: '¿Cuál es el mejor motivo para un travelling hacia el personaje?', o: ['Tener un gimbal', 'Intensificar un momento de decisión o emoción', 'Que el plano dure más', 'Evitar el trípode'], a: 1, w: 'El movimiento debe responder a algo de la escena. Acercarse subraya lo que el personaje siente o decide.', t: 'cine' },
    { q: 'Regla de los 30°: sirve para…', o: ['elegir la obturación', 'evitar que un corte entre dos planos del mismo sujeto parezca un salto', 'equilibrar el gimbal', 'medir la luz'], a: 1, w: 'Dos planos demasiado parecidos en ángulo y tamaño se perciben como un salto de imagen.', t: 'cine' },
    { q: 'Secuencia mínima de cobertura recomendada para una acción:', o: ['cinco generales', 'general, medio, primer plano, detalle y reacción', 'solo primeros planos', 'un plano secuencia siempre'], a: 1, w: 'Esa combinación da contexto, acción, emoción, información y respuesta: se monta con cualquier duración.', t: 'cine' },
    { q: 'Rodando a 25p en Kioto con luz artificial eliges 1/60 en lugar de 1/50. ¿Es un error respecto a los 180°?', o: ['Sí, grave', 'No: 150° es visualmente casi igual y evita el parpadeo de una red de 60 Hz', 'Sí, cambia los fps', 'No se puede seleccionar'], a: 1, w: 'La compatibilidad con la frecuencia de la luz tiene prioridad; la diferencia entre 180° y 150° es imperceptible.', t: 'parpadeo' }
  ]
};
