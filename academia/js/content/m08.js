export default {
  id: 8, title: 'Ópticas y composición', short: 'Ópticas', tags: ['optica'],
  goal: 'Elegir focal y distancia por la perspectiva que producen, controlar la profundidad de campo y componer para horizontal y vertical.',
  lessons: [
    { id: '8.1', title: 'Focal, distancia y perspectiva', mins: 9, body: `
> [PRINCIPIO] La perspectiva (la relación de tamaños entre lo cercano y lo lejano) depende solo de **dónde está la cámara**. La focal decide cuánto de esa vista recortas.

Esto desmonta dos ideas muy repetidas:
- «El teleobjetivo comprime»: lo que comprime es alejarse. El tele solo permite encuadrar desde lejos.
- «El angular deforma las caras»: lo que deforma es acercarse. El angular solo permite encuadrar desde muy cerca.

{{sim:optics}}

Haz el reto E2: activa «Mantener tamaño del sujeto» y pasa de 24 a 70 mm. La persona no cambia; el pórtico del fondo crece hasta llenar el cuadro. Eso es elegir focal: decidir **cuánto fondo** acompaña a tu sujeto y qué tamaño tiene.

## Tus focales, una a una
| Focal | Ángulo horizontal (full frame) | Carácter | Úsala para |
| 24 mm | ~74° | amplio, inmersivo; exagera la profundidad | espacios, generales, gimbal, acción muy cercana |
| 35 mm | ~54° | natural, cercana; «estar allí» | reportaje, medio cuerpo con entorno, calle |
| 50 mm | ~40° | neutra; proporciones tranquilas | retrato de medio cuerpo, entrevista, noche (f/1.8) |
| 70 mm | ~29° | selectiva; fondo grande y limpio | primeros planos, detalles, deporte a distancia |

Recuerda el recorte: en 4K 50/60p cada focal se convierte en ×1,5 (24 → 36, 50 → 75, 70 → 105).

## Elegir en la práctica
1. ¿Qué quiero que se vea del fondo? Mucho entorno: angular. Un trozo limpio: tele.
2. ¿A qué distancia puedo o quiero estar? Cerca crea intimidad y energía; lejos, observación.
3. ¿Qué pasa con la cara? Entre 1,5 y 3 m los rasgos se perciben naturales.
4. ¿Qué estabilidad tengo? A más focal, más se nota el temblor.

> [ESTETICA] Acercarse con angular a un atleta (24–35 mm a un metro) transmite fuerza y presencia, y es un recurso constante en fitness. Es una deformación deliberada: funciona en cuerpos y acción, y favorece poco en retratos de belleza.
` },
    { id: '8.2', title: 'Tus tres objetivos', mins: 7, body: `
## Sony 24–70 mm f/2.8 GM
Tu objetivo de trabajo. Apertura constante: la exposición no cambia al hacer zoom, imprescindible en vídeo. Cubre del general al primer plano sin cambiar de lente, lo que en eventos significa no perder momentos. Limitaciones: peso (el gimbal hay que equilibrarlo con cuidado y reequilibrar si pasas de 24 a 70) y f/2.8 como máximo.

## Sony 50 mm f/1.8
Ligero y 1,3 stops más luminoso que el zoom. Es tu objetivo de noche y de retrato con fondo muy desenfocado.

> [PRACTICA] Opiniones de usuarios y análisis coinciden en que su motor de enfoque es más lento y ruidoso que el de los objetivos de gama alta, y en que a f/1.8 pierde algo de contraste. Para vídeo con AF continuo y sujetos rápidos, pruébalo antes de confiarle un plano irrepetible; en foto y en vídeo pausado rinde muy bien por lo que pesa y cuesta.

## Sony 28–70 mm f/3.5–5.6
Ligero, con estabilización óptica. Su apertura variable (f/3.5 a 28 mm, f/5.6 a 70 mm) cambia la exposición al hacer zoom y limita el desenfoque y la poca luz. Su sitio: respaldo si falla el GM, exteriores de día cuando el peso importa, o segunda cámara en trípode a diafragma fijo (f/5.6–8).

## Qué llevar montado
| Situación | Montado | En la bolsa |
| Evento, HYROX | 24–70 GM | 50 f/1.8 por si cae la luz |
| Videoclip nocturno | 50 f/1.8 | 24–70 para generales |
| Viaje de día | 24–70 GM (o 28–70 si quieres ir ligero) | 50 f/1.8 para la noche |
| Retrato | 50 f/1.8 o GM a 70 mm | — |
| Gimbal todo el día | 24–70 GM fijo a 24–35 mm | — |

## Nitidez y diafragma
Casi todos los objetivos mejoran al cerrar uno o dos pasos desde su máxima apertura y empeoran por difracción a partir de f/11–16. En vídeo 4K (8 MP) estas diferencias pesan menos que en una foto de 33 MP: elige diafragma por la profundidad de campo y la luz.
` },
    { id: '8.3', title: 'Profundidad de campo y separación del fondo', mins: 9, body: `
La profundidad de campo es la zona que se percibe aceptablemente nítida por delante y por detrás del plano enfocado. La controlan cuatro cosas:

| Factor | Menos profundidad (más desenfoque) | Más profundidad |
| Diafragma | abierto (f/1.8) | cerrado (f/8) |
| Distancia al sujeto | cerca | lejos |
| Focal (a igual distancia) | larga | corta |
| Formato | full frame | Super 35 (a igual encuadre y diafragma) |

## Separar del fondo: el factor olvidado
El desenfoque del fondo depende tanto de la **distancia entre el sujeto y el fondo** como del diafragma. Un sujeto pegado a la pared tendrá el fondo nítido incluso a f/1.8; a cinco metros de ella, el fondo se disuelve incluso a f/4.

> [PRACTICA] Antes de abrir más el diafragma, separa al sujeto del fondo y acércate tú. Es gratis y no compromete el foco.

## Cuánta profundidad necesito
Menos no es siempre mejor.
- **Primer plano a f/1.8 con el 50 mm a 1 m**: unos 4 cm de profundidad. Un ojo nítido y la oreja no. Cualquier balanceo saca de foco.
- **Dos personas a distancias distintas**: cierra hasta que ambas quepan, o alinéalas.
- **Acción en gimbal**: f/4–5.6 da margen al AF.
- **Planos de contexto**: el fondo es información; déjalo legible.

## Hiperfocal
Distancia de enfoque a partir de la cual todo, desde la mitad de esa distancia hasta el infinito, queda aceptablemente nítido. Con el 24 mm a f/8 son unos 2,4 m: enfocas ahí y tienes de 1,2 m al infinito. Es la base del enfoque por zona en calle y de los generales con todo nítido. Compruébalo en el simulador (reto E3).

## Bokeh
La calidad del desenfoque depende del diseño óptico y de la forma del diafragma. Los puntos de luz se convierten en discos; a los lados del encuadre, en «ojos de gato». Luces pequeñas y lejanas detrás del sujeto (farolas, guirnaldas, coches) dan el fondo más agradecido.

> [ESTETICA] El desenfoque extremo como norma es una moda de la era full frame. Mucho cine clásico trabaja a f/4–5.6: la separación la crean la luz y la composición, no solo la óptica.
` },
    { id: '8.4', title: 'Composición: ordenar el encuadre', mins: 9, body: `
{{fig:tercios|Tercios y simetría son puntos de partida para repartir pesos.}}

## Regla de tercios
Divide el cuadro en tres franjas horizontales y tres verticales. Colocar al sujeto o el horizonte sobre esas líneas suele dar un equilibrio dinámico. En personas: ojos sobre la línea superior; cuerpo sobre una vertical, con el espacio libre hacia donde mira o se mueve.

## Simetría y centro
Sujeto centrado y encuadre simétrico transmiten orden, poder, formalidad o inquietud. Exige precisión: una simetría casi lograda parece un error. Nivel de cámara activado.

## Líneas guía
Pasillos, barras, líneas del suelo, pasamanos, sombras. Conducen la mirada hacia el sujeto. Colócalo donde las líneas convergen. Las diagonales añaden energía; las horizontales, calma; las verticales, fuerza.

## Espacio negativo
Zona vacía alrededor del sujeto. Aísla, da respiro y deja sitio para texto en piezas publicitarias. Pregunta al cliente si irán titulares o logos y dónde.

## Aire
- **Aire de mirada**: espacio delante de hacia donde mira el sujeto.
- **Aire de movimiento**: espacio delante de hacia donde se desplaza.
- **Aire de cabeza**: poco espacio sobre la cabeza; en primeros planos se corta la frente antes que la barbilla.

## Marcos y capas
Enmarcar con elementos del lugar (una puerta, una máquina, hombros de otra persona) y colocar algo en primer término da profundidad y contexto.

## Puntos de corte en la figura
Corta a media pierna, a media cadera, a medio pecho o por los hombros. Evita cortar justo en articulaciones (tobillos, rodillas, muñecas, cuello): el cuerpo parece amputado.

## Fondo y bordes
Antes de grabar, recorre con la vista los cuatro bordes y lo que queda detrás de la cabeza: postes que «salen» del cráneo, extintores, bolsas, salidas de emergencia iluminadas. Dos pasos a un lado lo resuelven.

> [ESTETICA] Todas estas «reglas» son descripciones de lo que suele funcionar. Descentrar, cortar o dejar sin aire son decisiones expresivas válidas cuando sirven a lo que cuentas.
` },
    { id: '8.5', title: 'Horizontal y vertical', mins: 8, body: `
Hoy casi todo encargo pide ambos formatos. No son el mismo encuadre girado: se componen distinto.

## Horizontal (16:9)
- Describe espacios y relaciones entre varios elementos.
- Admite al sujeto descentrado con entorno a un lado.
- Movimientos laterales y panorámicas funcionan de forma natural.

## Vertical (9:16)
- El formato de una persona de pie: figura entera y retratos funcionan muy bien.
- Poco ancho: los movimientos laterales sacan al sujeto de cuadro enseguida. Favorece el movimiento en profundidad (hacia cámara o alejándose) y los tilts.
- Composición por alturas: tres pisos (arriba, centro, abajo). El sujeto en el centro-superior.
- **Zonas seguras**: las aplicaciones tapan parte de la imagen con interfaz (nombre, descripción y botones abajo y a la derecha; cabecera arriba). Mantén caras y textos en la zona central. Las medidas exactas cambian con cada plataforma y versión: comprueba la guía vigente antes de maquetar.

## Rodar para los dos
| Estrategia | Cómo | Coste |
| Rodar en horizontal y recortar | 4K 16:9 → recorte 9:16 de 1215 × 2160 px (se escala a 1080 × 1920) | compón con el sujeto centrado y aire lateral; pierdes resolución |
| Rodar en vertical nativo | cámara girada (placa en L, o el RS 3 en modo vertical) | máxima calidad vertical; no sirve para horizontal |
| Rodar dos veces | planos clave en ambos formatos | tiempo |

> [PRACTICA] Si el destino principal es vertical (reels), rueda en vertical. Recortar del horizontal es un seguro, no un plan: un 24 mm horizontal recortado a 9:16 da el ancho de un ~75 mm, y pierdes los generales.

## Encuadre protegido
Si debes entregar ambos desde una sola toma horizontal, activa las guías de aspecto de la cámara (marcadores) y mantén la acción dentro del rectángulo vertical central. Los laterales quedan como «relleno» válido para la versión horizontal.

?? Vas a grabar un reel vertical de un atleta haciendo zancadas. ¿Lo sigues de lado o de frente? || De frente o en tres cuartos, retrocediendo con él: en vertical el movimiento en profundidad se mantiene dentro del cuadro. De lado, con tan poco ancho, tendrás que hacer una panorámica constante o se saldrá de cuadro.
` }
  ],
  cases: [
    { t: 'Mismo retrato, tres focales', b: 'Entrenadora delante de la zona de pesas. A 24 mm y 0,8 m: ella grande, todo el gimnasio detrás, rasgos exagerados: enérgico. A 50 mm y 1,7 m: proporciones naturales, parte de la sala reconocible. A 70 mm y 2,4 m: fondo reducido a dos máquinas desenfocadas: limpio, corporativo. Tres mensajes distintos con el mismo tamaño de sujeto.' },
    { t: 'Fondo imposible', b: 'Sala pequeña con paredes llenas de carteles. A f/1.8 siguen leyéndose porque el sujeto está a medio metro de la pared. Se le separa 3 m, se pasa a 70 mm y la cámara retrocede: los carteles se convierten en manchas de color.' },
    { t: 'El reel recortado', b: 'Todo el evento rodado en horizontal con el sujeto en el tercio izquierdo. Al recortar a 9:16, o se corta al sujeto o se pierde el contexto. Lección: con entrega vertical, centra al sujeto dentro del marcador 9:16 o rueda en vertical.' }
  ],
  errors: [
    'Elegir focal por comodidad (hacer zoom) en lugar de por perspectiva (moverse).',
    'Retratos de cerca con angular sin intención.',
    'Olvidar el recorte ×1,5 en 4K 50p.',
    'Abrir a f/1.8 con el sujeto pegado al fondo y esperar desenfoque.',
    'Profundidad de campo tan corta que el AF no puede sostenerla.',
    'No reequilibrar el gimbal al cambiar de focal.',
    'Cortar la figura por las articulaciones.',
    'No mirar bordes y fondo.',
    'Componer vertical como un horizontal girado; ignorar las zonas tapadas por la interfaz.'
  ],
  exercise: {
    title: 'Focal y distancia',
    steps: [
      'Completa los tres retos del simulador de ópticas.',
      'En el simulador: encuadra un plano medio con 24, 35, 50 y 70 mm manteniendo el tamaño del sujeto. Anota la distancia de cámara y el tamaño aparente del pórtico en cada caso.',
      'Con el 50 mm a f/1.8, busca la distancia de sujeto a la que la profundidad de campo baja de 10 cm. ¿Rodarías un plano en movimiento así?',
      'Cambia a Super 35 con el 24 mm: ¿qué focal equivalente obtienes y qué ha pasado con el plano general?',
      'Al aterrizar: fotografía a la misma persona u objeto llenando el cuadro igual a 24, 50 y 70 mm, y compara el fondo.'
    ],
    deliver: 'Tabla focal → distancia → fondo, y tres fotos comparadas.'
  },
  checklist: [
    'Focal elegida por el fondo y la distancia que quiero',
    'Recorte ×1,5 considerado si ruedo a 50p',
    'Sujeto separado del fondo',
    'Diafragma con margen de foco suficiente para el movimiento',
    'Bordes y fondo revisados',
    'Ojos en el tercio superior; aire en la dirección de mirada',
    'Formato de entrega claro: marcadores 9:16 activados si hay versión vertical',
    'Zonas de interfaz libres de caras y texto',
    'Gimbal reequilibrado tras cambiar focal u objetivo'
  ],
  summary: [
    'La perspectiva depende de la posición de la cámara; la focal solo recorta.',
    'Elegir focal es elegir cuánto fondo y a qué tamaño.',
    '24 inmersivo, 35 natural, 50 neutro, 70 selectivo. En 4K 50p, ×1,5.',
    '24–70 GM para trabajar; 50 f/1.8 para noche y retrato; 28–70 como respaldo ligero.',
    'Profundidad de campo: diafragma, distancia, focal y formato. Separa al sujeto del fondo.',
    'Menos profundidad no es mejor: debe poder sostenerla el foco.',
    'Tercios, simetría, líneas, espacio negativo y aire son herramientas, no leyes.',
    'Vertical se compone por alturas y en profundidad; respeta las zonas de interfaz.'
  ],
  quiz: [
    { q: '¿De qué depende la perspectiva (tamaño relativo entre sujeto y fondo)?', o: ['De la focal', 'De la posición de la cámara', 'Del diafragma', 'Del tamaño del sensor'], a: 1, w: 'Solo cambia al mover la cámara. La focal recorta más o menos de esa misma vista.', t: 'optica' },
    { q: 'Mantienes el tamaño del sujeto y pasas de 24 a 70 mm retrocediendo. El fondo…', o: ['se ve más pequeño y abarca más', 'se ve más grande y abarca menos', 'no cambia', 'se enfoca más'], a: 1, w: 'Al alejarte, el fondo queda relativamente más cerca del sujeto en proporción y el ángulo estrecho muestra solo una parte, ampliada.', t: 'optica' },
    { q: 'Quieres más desenfoque de fondo y ya estás a f/2.8 con el 24–70. ¿Qué es lo más eficaz y seguro?', o: ['Subir el ISO', 'Separar al sujeto del fondo y acercarte o alargar focal', 'Usar ND', 'Cerrar a f/4'], a: 1, w: 'La distancia sujeto–fondo y la ampliación pesan tanto como el diafragma. El ND y el ISO no afectan al desenfoque.', t: 'optica' },
    { q: 'Con el 50 mm a f/1.8 y a 1 m, la profundidad de campo es de unos…', o: ['4 cm', '40 cm', '1 m', 'infinito'], a: 0, w: 'A esa distancia y apertura la zona nítida es de pocos centímetros: un ojo sí, la oreja no.', t: 'optica' },
    { q: 'El 28–70 f/3.5–5.6 en vídeo, al hacer zoom de 28 a 70 mm a máxima apertura…', o: ['mantiene la exposición', 'oscurece la imagen más de un stop', 'aclara la imagen', 'cambia el balance'], a: 1, w: 'La apertura máxima pasa de f/3.5 a f/5.6: alrededor de 1,3 stops menos de luz.', t: 'optica' },
    { q: 'Reel vertical: ¿dónde NO debes colocar caras o texto importantes?', o: ['En el centro', 'En el tercio central-superior', 'En el borde inferior y el lateral derecho', 'A la altura de los ojos'], a: 2, w: 'La interfaz de las aplicaciones cubre la parte inferior (texto, audio) y el lateral derecho (botones), además de una franja superior.', t: 'optica' },
    { q: 'Hiperfocal con 24 mm a f/8 ≈ 2,4 m. Si enfocas ahí, queda nítido…', o: ['solo a 2,4 m', 'de 1,2 m al infinito aproximadamente', 'de 2,4 m a 5 m', 'nada'], a: 1, w: 'Enfocando a la hiperfocal, la nitidez aceptable va desde la mitad de esa distancia hasta el infinito.', t: 'optica' },
    { q: '¿Dónde es preferible cortar una figura humana en el encuadre?', o: ['Por las rodillas', 'Por los tobillos', 'A medio muslo', 'Por las muñecas'], a: 2, w: 'Los cortes en articulaciones producen sensación de amputación; se corta entre ellas.', t: 'optica' }
  ]
};
