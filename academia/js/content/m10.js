export default {
  id: 10, title: 'Edición profesional', short: 'Edición', tags: ['montaje'],
  goal: 'Organizar un proyecto para no perder nada, seleccionar con criterio y montar con ritmo en Premiere Pro y DaVinci Resolve.',
  lessons: [
    { id: '10.1', title: 'Organización de archivos y proxies', mins: 9, body: `
El montaje empieza en el volcado. Un proyecto desordenado se paga con horas y, a veces, con material perdido.

## Estructura de carpetas (plantilla)
- **AAAA-MM-DD_Cliente_Proyecto/**
- 01_Material/ (por día y cámara: Dia1_A7IV, Dia1_Pocket3, Dia1_Mini2)
- 02_Audio/ (micro externo, música, locución, efectos)
- 03_Proyecto/ (archivos de Premiere o Resolve, con versiones)
- 04_Graficos/ (logos, textos, LUT)
- 05_Exportaciones/ (versiones fechadas)
- 06_Documentos/ (guion, shot list, contrato, cesiones)

Reglas: copia la **tarjeta completa** con su estructura, no clips sueltos; no renombres los originales de cámara; guarda versiones del proyecto (v01, v02) en lugar de sobrescribir.

## Dentro del programa
Bins o carpetas por tipo: Entrevistas, Acción, Recursos, Dron, Música, Gráficos, Secuencias. Usa metadatos y etiquetas de color. Una secuencia por versión.

## Proxies
Tus archivos XAVC HS (H.265) y los XAVC S de 10 bits 4:2:2 son pesados de decodificar: el ordenador se arrastra aunque sea potente. Un **proxy** es una copia ligera (por ejemplo ProRes Proxy o H.264 a baja resolución) que usas para montar; al exportar, el programa vuelve al original.

- **Premiere Pro**: en la importación (ajustes de ingesta) o después, con clic derecho → Proxy → Crear proxies. Un botón en el monitor alterna proxy y original.
- **DaVinci Resolve**: clic derecho → Generar medios proxy, o medios optimizados. En el menú Reproducción eliges qué usar.

> [PRACTICA] Crea los proxies mientras haces otra cosa (por la noche tras el rodaje). Etalona siempre sobre el original, no sobre el proxy.

## Sincronizar audio externo
Si grabaste con el DJI Mic en interno además de en cámara, sincroniza por forma de onda: en Premiere, seleccionar clip y audio → Combinar clips o Sincronizar; en Resolve, sincronización automática por audio en el Media Pool. Por eso se graba siempre audio de referencia en cámara.
` },
    { id: '10.2', title: 'Selección y estructura narrativa', mins: 9, body: `
## Visionar todo, una vez, bien
Mira todo el material antes de montar y marca. Es tedioso y es donde aparece la película.
- **Premiere**: marca entrada (I) y salida (O) en el monitor de origen y crea subclips, o usa marcadores con color.
- **Resolve**: página Cut o Edit; marcadores, colores de clip y palabras clave; las «smart bins» filtran por ellas.

## Secuencia de selección (stringout)
Arrastra a una secuencia todos los fragmentos buenos, en orden de rodaje o por tema. De ahí seleccionas otra vez: la «selección de la selección». Montar desde una secuencia de 8 minutos de material bueno es mucho más rápido que buscar en 90 minutos de brutos.

## Estructura antes que estética
Monta primero el **esqueleto**: orden de bloques, duración aproximada, principio y final. Sin efectos, sin color, sin música definitiva si no es un videoclip.

| Tipo de pieza | Columna vertebral | Se construye sobre |
| Entrevista / testimonio | lo que se dice | la voz; después se cubre con recursos |
| Videoclip | la canción | la estructura musical |
| Deportivo / evento | la progresión del evento o una emoción | la música y los momentos cumbre |
| Anuncio | el mensaje | el guion y la locución |
| Reel | el gancho y una sola idea | los tres primeros segundos |

## La pregunta del montador
Para cada plano: ¿qué aporta de nuevo? Y para cada corte: ¿por qué aquí? Si no hay respuesta, el plano sobra o el corte está en otro sitio.

> [PRINCIPIO] Walter Murch, montador y teórico, propone priorizar en cada corte la emoción por encima de la historia, el ritmo, la dirección de la mirada y la continuidad espacial, en ese orden. Es un criterio de autor muy influyente, no una norma: un corte «incorrecto» en continuidad puede ser el mejor si la emoción es la justa.

## Matar a tus favoritos
El plano más bonito del rodaje puede no caber en la pieza. Guárdalo para el portfolio o para otra versión.
` },
    { id: '10.3', title: 'Ritmo, cortes musicales, J-cuts y L-cuts', mins: 10, body: `
## Ritmo
No es cortar rápido: es la relación entre la duración de los planos, el movimiento dentro de ellos y el sonido. Un plano largo con mucho movimiento interno puede sentirse más rápido que cinco planos estáticos cortos.

- **Acelerar**: planos más cortos, más movimiento, más cambios de tamaño.
- **Respirar**: un plano largo y quieto tras una ráfaga hace que ambos funcionen mejor.
- **Progresión**: la energía debe ir a algún sitio. Si todo es intenso, nada lo es.

## Cortar con la música
- Localiza pulsos, compases y cambios de sección. En Premiere y Resolve puedes poner marcadores sobre la marcha (tecla M) mientras suena la canción.
- Corta **sobre** el pulso en los momentos fuertes, pero no en todos: un montaje que cae en cada golpe resulta mecánico.
- Los cambios grandes (entrada del estribillo, bajada) piden un cambio visual grande: de localización, de tamaño de plano, de velocidad.
- Cortar con la **acción** dentro del plano (un golpe, un salto, un giro) y hacer que esa acción coincida con el pulso es más potente que el corte solo.

> [PRACTICA] Truco de percepción muy extendido entre montadores: adelantar el corte uno o dos fotogramas respecto al golpe hace que se sienta «a tiempo», porque el ojo tarda un instante en registrar la imagen nueva. Pruébalo y decide.

{{sim:timeline}}

## J-cut y L-cut
{{fig:jlcut|El audio y la imagen no tienen por qué cortar a la vez.}}
- **J-cut**: oyes el plano siguiente antes de verlo. Anticipa, tira del espectador hacia delante.
- **L-cut**: sigues oyendo el plano anterior sobre la imagen del siguiente. Permite ver la reacción de quien escucha o cubrir con recursos.

Son la diferencia entre un montaje de aficionado (todo corta a la vez) y uno fluido. En entrevistas, casi todos los cortes deberían ser J o L.

## Continuidad y corte en movimiento
- Corta **en el movimiento**: empieza la acción en un plano y termínala en el siguiente. El ojo sigue el gesto y no percibe el corte.
- Respeta eje y dirección de pantalla (módulo 6), o usa un plano neutro.
- **Jump cut**: salto dentro del mismo plano. Como error, molesta; como estilo (vlogs, energía, paso del tiempo), funciona si es constante y deliberado.
- **Inserto y recurso**: tapar un corte de entrevista con un plano de recurso es el uso más habitual del B-roll.
` },
    { id: '10.4', title: 'Velocidad, transiciones y géneros', mins: 10, body: `
## Cámara lenta en montaje
Material a 50p en una línea de 25p:
- **Premiere**: clic derecho → Modificar → Interpretar material → asumir 25 fps (todo el clip al 50 %, sin interpolación), o Velocidad/Duración al 50 %.
- **Resolve**: atributos del clip → fotogramas por segundo, o Cambiar velocidad al 50 %.

Ralentizar por debajo de lo que permiten los fotogramas grabados obliga a interpolar: fusión de fotogramas (borroso) o flujo óptico (inventa fotogramas; puede crear deformaciones en fondos complejos). Úsalo con moderación y revisa el resultado.

## Speed ramping
Cambiar la velocidad dentro de un mismo plano: rápido → lento en el momento clave → rápido.
- **Premiere**: Reasignación de tiempo (clic derecho en el clip → Mostrar fotogramas clave del clip → Reasignación de tiempo → Velocidad); divide el fotograma clave para crear la rampa y suaviza con las manijas.
- **Resolve**: Retime Controls (Ctrl/Cmd + R) y Retime Curve; añade puntos de velocidad y suaviza la curva.

Claves: graba a 50p o 100p para tener fotogramas; coloca la zona lenta en el instante de máximo interés (el impacto, el punto más alto del salto); rampa suave; sincroniza la rampa con la música. Es un recurso muy visto en deporte: una o dos por pieza pesan más que diez.

## Transiciones
> [PRINCIPIO] El corte es la transición por defecto. Cualquier otra debe significar algo.

| Transición | Significado habitual |
| Corte | continuidad, ritmo |
| Encadenado (fundido cruzado) | paso del tiempo, suavidad, evocación |
| Fundido a negro / desde negro | final o inicio de un bloque |
| Corte por coincidencia (match cut) | relaciona dos imágenes por forma o movimiento |
| Barrido (whip pan) | cambio enérgico de lugar o tiempo |
| Tapado (un objeto cruza y tapa el cuadro) | cambio invisible de plano |

Las mejores transiciones se **ruedan**: termina un plano con un barrido rápido a la derecha y empieza el siguiente con otro en el mismo sentido; tapa la lente con un objeto al final de uno y destápala al inicio del otro. En montaje solo se unen.

> [OPINION] Las transiciones de plantilla (zooms, glitches, giros) marcan modas en redes y envejecen rápido. Úsalas si el cliente y el formato lo piden, sabiendo que fechan la pieza.

## Géneros
- **Deportivo**: construye una curva (preparación → esfuerzo → clímax → celebración). Alterna acción a velocidad real con momentos lentos. El sonido ambiente (respiración, golpes, público) da verdad.
- **Videoclip**: la canción manda. Decide la proporción entre interpretación y narrativa por secciones; reserva lo mejor para el último estribillo. Sincronía labial perfecta, al fotograma.
- **Reel**: gancho visual o textual en el primer segundo; una idea; cortes cada 1–2 s salvo intención; texto en pantalla porque muchos lo ven sin sonido; final que invite a repetir o a actuar. Las recomendaciones de duración cambian con cada plataforma: comprueba las actuales.
` },
    { id: '10.5', title: 'Subtítulos, multicámara y exportación', mins: 9, body: `
## Subtítulos
Gran parte del vídeo en redes se ve sin sonido; los subtítulos son accesibilidad y retención.
- **Premiere**: panel Texto → Transcribir secuencia → Crear subtítulos. Corrige nombres propios y puntuación.
- **Resolve**: Timeline → Crear subtítulos desde audio (versión Studio); en la gratuita, pista de subtítulos manual o importación de un archivo SRT.
- Estilo: tipografía clara, tamaño generoso, contraste o caja semitransparente, una o dos líneas, dentro de la zona segura del formato vertical.
- Subtítulos **incrustados** (siempre visibles, a tu gusto) o **archivo aparte** (SRT, que la plataforma muestra y el usuario puede desactivar).

## Edición multicámara
Para entrevistas a dos cámaras, directos o playbacks rodados varias veces.
1. Sincroniza los ángulos por audio (o por código de tiempo o claqueta).
2. **Premiere**: seleccionar clips → Crear secuencia de origen multicámara; activa la vista multicámara y cambia de ángulo con las teclas numéricas mientras reproduces.
3. **Resolve**: Crear clip multicámara; en la página Edit, modo Multicam, clic en el ángulo.
4. Refina después los cortes con la herramienta de desplazamiento.

Para un videoclip: sincroniza todas las tomas de playback con la canción máster, apílalas y monta como multicámara. Toda toma queda disponible en cualquier momento de la canción.

## Exportación
Primero, los ajustes de la **secuencia**: resolución y fotogramas de la entrega (por ejemplo 3840 × 2160 a 25p, o 1080 × 1920 a 25p para vertical).

| Destino | Contenedor y códec | Resolución | Tasa orientativa | Audio |
| YouTube 4K | MP4, H.264 o H.265 | 3840 × 2160 | 35–45 Mb/s (SDR, 25p) | AAC 320 kb/s, 48 kHz |
| Instagram / TikTok | MP4, H.264 | 1080 × 1920 | 10–20 Mb/s | AAC 256–320 kb/s |
| Máster de archivo | MOV ProRes 422 HQ o DNxHR HQX | la de la secuencia | muy alta | PCM 48 kHz 24 bits |
| Revisión del cliente | MP4, H.264 | 1920 × 1080 | 8–12 Mb/s | AAC |

> [OFICIAL] Las tasas recomendadas proceden de las guías de las propias plataformas, que las actualizan. YouTube publica una tabla por resolución y cadencia; consulta la vigente.

> [PRACTICA] Las plataformas recomprimen todo. Subir con algo más de tasa de la recomendada da margen al recompresor; subir un archivo gigantesco no mejora el resultado. Exporta siempre un máster de alta calidad y saca de él las versiones.

- **Premiere**: Exportar → ajuste preestablecido H.264 «Igualar origen – Alta velocidad de bits», y ajusta la tasa. Activa «Máxima calidad de procesamiento» si reescalas.
- **Resolve**: página Deliver → Custom Export o los preajustes de YouTube; comprueba códec, resolución, tasa y nivel de datos automático.

## Control de calidad antes de entregar
Mira la exportación completa, con auriculares y en el móvil: fotogramas negros, saltos, texto con erratas, audio descompensado, bandas en degradados, sincronía labial.
` }
  ],
  cases: [
    { t: 'Resumen de competición en 60 s', b: 'Tres horas de brutos. Visionado con marcadores; selección de 9 minutos; esqueleto sobre la música con cuatro bloques (ambiente, esfuerzo, clímax, celebración). Dos rampas de velocidad, en el trineo y en la meta. Sonido ambiente por debajo de la música. Subtítulos para los dos testimonios. Tres exportaciones desde el máster: 16:9, 9:16 reencuadrado y versión corta de 20 s.' },
    { t: 'Entrevista que saltaba', b: 'Una sola cámara, muchas frases cortadas. Solución: recursos sobre cada corte con L-cuts, y donde no hay recurso, punch-in del 120 % (el 4K lo permite en línea de 1080p) para simular una segunda cámara. Los cortes desaparecen.' },
    { t: 'Videoclip sin sincronía', b: 'Se montó cada playback «a ojo». En la exportación los labios bailan. Rehecho: todas las tomas sincronizadas por forma de onda con el máster y agrupadas en multicámara. Media hora de preparación ahorra días.' }
  ],
  errors: [
    'Copiar clips sueltos en lugar de la tarjeta completa.',
    'Montar sin haber visto todo el material.',
    'Pulir efectos y color antes de tener la estructura aprobada.',
    'Cortar audio e imagen siempre a la vez.',
    'Cortar en todos los pulsos de la música.',
    'Ralentizar material que no tiene fotogramas suficientes.',
    'Transiciones de adorno en cada corte.',
    'Etalonar sobre proxies.',
    'Exportar sin revisar la pieza completa.',
    'Sobrescribir el proyecto sin guardar versiones.'
  ],
  exercise: {
    title: 'Ordena y corta',
    steps: [
      'En el simulador de montaje, supera los tres proyectos (reel HYROX, testimonio y estribillo) con un 85 % o más.',
      'En el proyecto del reel, construye a propósito una versión que falle tres criterios y lee el informe.',
      'Sobre el esquema de J y L-cuts: escribe en qué cortes del testimonio usarías cada uno y por qué.',
      'Al aterrizar: monta con material del viaje una pieza de 30 s con gancho, tres tamaños de plano, un J-cut, un L-cut y una rampa de velocidad. Expórtala en 9:16 y revísala en el móvil.'
    ],
    deliver: 'Tres proyectos superados y una pieza de 30 s exportada.'
  },
  checklist: [
    'Tarjetas copiadas completas en dos destinos; estructura de carpetas creada',
    'Proxies generados si el material es pesado',
    'Audio externo sincronizado',
    'Todo el material visionado y marcado',
    'Secuencia de selección creada',
    'Esqueleto aprobado antes de pulir',
    'J/L-cuts en diálogos; cortes en movimiento',
    'Cámaras lentas y rampas solo donde hay fotogramas',
    'Subtítulos revisados',
    'Máster exportado y versiones derivadas; control de calidad completo'
  ],
  summary: [
    'Organización y copias antes de abrir el programa; versiones del proyecto.',
    'Proxies para montar XAVC HS y 10 bits 4:2:2 con fluidez; color sobre el original.',
    'Visionar, marcar, secuencia de selección, esqueleto. Estructura antes que estética.',
    'Ritmo es contraste entre duración, movimiento y sonido.',
    'Cortar con la música y con la acción, no en cada pulso.',
    'J-cut anticipa; L-cut prolonga. Casi todos los cortes de diálogo lo son.',
    'Cámara lenta y rampas necesitan fotogramas grabados.',
    'El corte es la transición por defecto; las mejores se ruedan.',
    'Máster de calidad → versiones por plataforma → control de calidad.'
  ],
  quiz: [
    { q: '¿Para qué sirve un proxy?', o: ['Para mejorar la calidad final', 'Para montar con fluidez usando una copia ligera y exportar desde el original', 'Para reducir el tamaño de la exportación', 'Para etalonar'], a: 1, w: 'El proxy solo se usa durante el montaje. La exportación y el etalonaje se hacen con el original.', t: 'montaje' },
    { q: 'En un J-cut…', o: ['la imagen del plano siguiente entra antes que su audio', 'el audio del plano siguiente entra antes que su imagen', 'audio e imagen cortan a la vez', 'se funde a negro'], a: 1, w: 'Oyes antes de ver: la forma de la J en la línea de tiempo lo recuerda, con el audio extendido hacia la izquierda.', t: 'montaje' },
    { q: 'Tienes un plano a 25p y lo pones al 25 % de velocidad. ¿Qué hace el programa?', o: ['Usa fotogramas reales', 'Repite o interpola fotogramas: posibles tirones o deformaciones', 'Lo convierte en 100p real', 'Sube la resolución'], a: 1, w: 'No existen los fotogramas intermedios. La fusión de fotogramas emborrona y el flujo óptico los inventa con riesgo de artefactos.', t: 'montaje' },
    { q: '¿Qué debe aprobarse primero con el cliente?', o: ['El color', 'Los gráficos', 'La estructura del montaje', 'La mezcla de sonido'], a: 2, w: 'Cambiar la estructura después de etalonar y mezclar obliga a rehacer ese trabajo.', t: 'montaje' },
    { q: 'Montaje deportivo: todos los cortes caen exactamente en cada golpe de bombo durante 60 s. ¿Resultado probable?', o: ['Dinámico', 'Mecánico y previsible', 'Lento', 'Sin sincronía'], a: 1, w: 'La sincronía total cansa. Variar (cortar con la acción, saltarse pulsos, respirar) mantiene la atención.', t: 'montaje' },
    { q: '¿Cuál es la mejor forma de tapar un corte entre dos frases de una entrevista rodada con una cámara?', o: ['Encadenado', 'Plano de recurso encima con L-cut', 'Fundido a blanco', 'Dejar el salto siempre'], a: 1, w: 'El recurso cubre el salto y además ilustra lo que se dice. El encadenado entre dos planos casi iguales delata el corte.', t: 'montaje' },
    { q: 'Para un videoclip con seis tomas de playback, ¿qué método ahorra más tiempo?', o: ['Sincronizar a ojo cada fragmento', 'Sincronizar todas con el máster y montar en multicámara', 'Usar solo una toma', 'Exportar cada toma por separado'], a: 1, w: 'Con todas las tomas alineadas a la canción, cualquier ángulo está disponible y sincronizado en cualquier punto.', t: 'montaje' },
    { q: 'Vas a entregar para Instagram, YouTube y archivo. ¿Flujo correcto?', o: ['Exportar tres veces desde la línea de tiempo con ajustes distintos sin revisar', 'Exportar un máster de alta calidad, revisarlo y derivar las versiones', 'Subir el máster ProRes a Instagram', 'Exportar solo en H.264 baja tasa'], a: 1, w: 'El máster es tu referencia de calidad y de archivo; las versiones comprimidas se generan a partir de él.', t: 'entrega' },
    { q: 'Speed ramp: ¿dónde colocas la parte lenta?', o: ['Al principio del clip siempre', 'En el instante de mayor interés de la acción', 'Donde no pasa nada', 'En los créditos'], a: 1, w: 'La rampa subraya un momento: el impacto, el punto más alto, la expresión. Fuera de ahí solo alarga.', t: 'montaje' }
  ]
};
