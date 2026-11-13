export default {
  id: 12, title: 'VFX, sonido y entrega', short: 'VFX y sonido', tags: ['sonido', 'audio', 'entrega', 'datos'],
  goal: 'Resolver gráficos y efectos esenciales en After Effects, grabar y mezclar un sonido limpio, y entregar y archivar como un profesional.',
  lessons: [
    { id: '12.1', title: 'After Effects: keyframes y motion graphics', mins: 9, body: `
After Effects trabaja por **capas** en una **composición**, no por clips en una línea de tiempo de montaje. Sirve para animar, componer y rotular; no para montar.

## Fotogramas clave (keyframes)
Animar es decir «en este instante la propiedad vale A; en este otro, B». El programa calcula lo intermedio.
- Las cinco propiedades de transformación: Punto de anclaje (A), Posición (P), Escala (S), Rotación (R) y Opacidad (T).
- Activa el cronómetro de la propiedad para crear el primer fotograma clave.

## Lo que separa una animación amateur de una profesional
- **Suavizado (easing)**: selecciona los fotogramas clave y aplica Easy Ease (F9). Nada en el mundo real arranca ni frena en seco.
- **Editor de gráficos**: ajusta la curva de velocidad para que el movimiento arranque rápido y frene largo. Es donde se da «peso».
- **Desenfoque de movimiento**: actívalo en la capa y en la composición; integra la animación con el vídeo.
- **Escalonar (offset)**: que los elementos no entren todos a la vez; uno o dos fotogramas de desfase entre ellos.
- **Anticipación y exceso**: un pequeño rebote antes y después del movimiento principal.

## Texto y rótulos
- Animadores de texto por carácter, palabra o línea.
- Jerarquía: un tamaño principal, uno secundario; dos tipografías como máximo; márgenes de seguridad.
- Usa la identidad del cliente: tipografías, colores, logo en vectorial.

## Capas de forma y precomposiciones
Las capas de forma generan líneas, cajas y máscaras animables (Recortar trazados para dibujar una línea progresivamente). Las precomposiciones agrupan capas para tratarlas como una sola.

## Flujo con Premiere
- **Dynamic Link**: clic derecho en un clip de Premiere → Reemplazar por composición de After Effects. Los cambios se actualizan sin exportar.
- **Plantillas de gráficos animados (.mogrt)**: diseñas el rótulo en After Effects, expones los campos editables y lo usas en Premiere cambiando solo el texto.

> [PRACTICA] Para rótulos sencillos, el panel Gráficos esenciales de Premiere o Fusion/Text+ en Resolve bastan. After Effects se justifica cuando hay animación compleja, seguimiento o composición.
` },
    { id: '12.2', title: 'Máscaras, tracking, rotoscopia y compositing', mins: 9, body: `
## Máscaras y mates
- **Máscara**: trazado sobre una capa que define qué parte se ve. Animable y con calado (borde suave).
- **Mate de seguimiento (track matte)**: una capa usa la luminancia o el alfa de otra como recorte. Clásico: vídeo visible solo dentro de un texto.

## Tracking (seguimiento)
Consiste en analizar el movimiento de la imagen para que otro elemento lo siga.

| Tipo | Qué sigue | Para qué |
| Seguimiento de punto | uno o dos puntos de alto contraste | pegar un texto o un objeto a algo que se mueve |
| Seguimiento planar (Mocha AE) | una superficie plana | reemplazar pantallas, carteles, logos en una pared |
| Cámara 3D | el movimiento de la cámara en el espacio | colocar texto u objetos «dentro» de la escena |
| Estabilización de deformación | toda la imagen | suavizar un plano tembloroso |

Requisitos para que funcione: puntos con contraste y textura, poco desenfoque de movimiento y paralaje suficiente (para el 3D). Si sabes en rodaje que harás tracking, obtura algo más rápido y deja marcas de referencia.

## Rotoscopia
Recortar un sujeto fotograma a fotograma para separarlo del fondo.
- **Pincel tipo Roto Brush**: marcas al sujeto y el programa propaga la selección; corriges donde falla. Las versiones recientes con IA ahorran mucho trabajo.
- Los bordes difíciles (pelo, desenfoque de movimiento) siguen exigiendo paciencia.
- Uso típico: texto que pasa **por detrás** del atleta, o separar al sujeto para tratar el fondo aparte.

> [PRINCIPIO] La mejor rotoscopia es la que no hay que hacer: un fondo limpio y contrastado en rodaje, o un croma, ahorran horas.

## Compositing
Combinar varias imágenes para que parezcan una sola. Lo que delata un compuesto:
- **Luz**: dirección, dureza y color incoherentes.
- **Negros y contraste**: el elemento añadido tiene negros más densos o más lavados que el plano.
- **Nitidez y grano**: el añadido está demasiado limpio. Iguala desenfoque y añade grano por encima de todo.
- **Bordes**: halos o recortes duros.
- **Modos de fusión**: Pantalla o Añadir para luz (destellos, humo sobre negro, chispas); Multiplicar para sombras y suciedad.

## Transiciones y efectos de moda
Los zooms, giros, deformaciones y «glitches» de reels son combinaciones de escala, rotación, desenfoque direccional y una capa de ajuste a caballo entre dos clips. Tres avisos: úsalos con motivo y con el ritmo de la música; rueda pensando en ellos (movimientos de cámara que casen); y recuerda que fechan la pieza.
` },
    { id: '12.3', title: 'Grabar sonido: micrófonos y niveles', mins: 10, body: `
> [PRINCIPIO] El público perdona una imagen mediocre mucho antes que un sonido malo. Y el sonido se arregla en la toma: en posproducción se mejora, casi nunca se rescata.

## Tipos de micrófono
| Micrófono | Captación | Uso | Limitación |
| De corbata (lavalier) inalámbrico, como tu DJI Mic | muy cercana a la boca | entrevistas, presentadores, movimiento | roces de ropa, viento, interferencias |
| De cañón (shotgun) | direccional, rechaza los lados | sobre cámara para ambiente; en pértiga para diálogo | sobre cámara y a distancia recoge mucha sala |
| Interno de la cámara | todo alrededor | referencia para sincronizar | no sirve como audio principal |
| De mano / dinámico | muy cercana | reporteo en ambientes ruidosos | se ve en plano |

La distancia manda: un micro modesto a 20 cm de la boca suena mejor que uno excelente a tres metros. Al alejarte, capturas más sala (eco) y más ruido.

## Colocar el micro de corbata
- A un palmo de la boca, centrado en el pecho; no bajo la barbilla.
- Evita roces: fíjalo donde la ropa no se mueva; cuidado con collares, cremalleras y barbas.
- En exterior, siempre con el antiviento.
- En atletas: el sudor y los impactos lo complican; para testimonios, grábalos en parado.

## Niveles
El audio digital tiene un techo absoluto: **0 dBFS**. Por encima, satura y la forma de onda se corta. No se recupera.

- Voz hablada: picos entre **−12 y −6 dBFS**, con el nivel medio hacia −18.
- Deja margen: una risa o un grito suben 10 dB sin avisar.
- Mejor algo bajo que saturado: 24 bits toleran subir en posproducción; nada tolera la saturación.

> [OFICIAL] El sistema DJI Mic permite grabar en la memoria del propio transmisor y dispone de una pista de seguridad a menor nivel, además de versiones con grabación en 32 bits en coma flotante. Las funciones concretas dependen de tu modelo (DJI Mic, Mic 2, Mic Mini…): revisa el manual del tuyo y activa la grabación interna como copia de seguridad.

## Cadena de ganancia con DJI Mic y A7 IV
1. Nivel de grabación de la cámara **bajo** (su previo es el eslabón ruidoso).
2. Ganancia del receptor ajustada para que la cámara reciba picos en torno a −12 dB.
3. Prueba con la persona hablando a su volumen real, no en susurros.
4. Auriculares conectados a la cámara: escucha roces, interferencias y saturación.

## El entorno
- Apaga lo que zumba: aire acondicionado, neveras, música ambiente (además de problemas de derechos, hace imposible montar).
- Salas con eco: acércate más, elige una sala con muebles, cortinas o gente; aléjate de paredes desnudas.
- **Tono de sala**: graba 30 segundos de silencio del lugar. Sirve para rellenar huecos entre cortes sin que el fondo «salte».
- **Sonido ambiente y efectos**: graba aparte golpes de discos, respiraciones, público, pasos. Dan verdad al montaje deportivo.
` },
    { id: '12.4', title: 'Diseño de sonido, música y mezcla', mins: 10, body: `
## Capas de una banda sonora
1. **Voz** (diálogo, locución): lo que debe entenderse siempre.
2. **Ambientes**: el fondo continuo del lugar.
3. **Efectos**: sonidos concretos sincronizados (golpes, pasos, barridos).
4. **Música**.

## Diseño de sonido
Añadir y dar forma a los sonidos para que la imagen se sienta física.
- **Efectos sincronizados**: cada impacto, agarre o salto con su sonido, grabado en rodaje o de librería.
- **Transiciones sonoras**: barridos (whoosh) en movimientos rápidos, subidas (riser) antes de un cambio, golpes graves (impact) en cortes fuertes. Con moderación.
- **Silencio**: quitar todo un instante antes del momento cumbre lo hace más grande.
- **Perspectiva**: un primer plano suena cercano; un general, lejano.

## Música y derechos
> [OJO] No puedes usar música comercial en trabajos de cliente sin licencia. Que una canción esté disponible en la biblioteca de una red social para usuarios particulares no autoriza su uso en contenido de marca ni en anuncios.

Opciones legales: librerías por suscripción o por licencia individual, música libre con la licencia adecuada (lee si permite uso comercial y si exige atribución), música compuesta por encargo, o la del propio artista en un videoclip (con acuerdo escrito). Guarda el justificante de cada licencia con el proyecto.

Elegir música: tempo acorde al ritmo de montaje, estructura con cambios que puedas aprovechar, y espacio para la voz si la hay (las pistas instrumentales o con poca densidad en medios conviven mejor con la palabra).

## Mezcla: orden de trabajo
1. **Limpieza de voz**: cortes limpios, fundidos cortos en cada corte, tono de sala en los huecos; reducción de ruido moderada.
2. **Ecualización de voz**: filtro de paso alto hacia 80–100 Hz para quitar retumbes; atenuar si suena encajonada (zona de 200–400 Hz); un poco de presencia (3–5 kHz) si falta claridad.
3. **Compresión de voz**: suave (proporción 2:1–4:1) para igualar frases fuertes y débiles.
4. **Niveles relativos**: la voz manda; la música baja bajo la voz (ducking, automático o manual) y sube en los huecos.
5. **Limitador** en la salida para sujetar los picos.

| Elemento | Nivel orientativo de picos |
| Voz | −12 a −6 dBFS |
| Música bajo voz | −25 a −18 dBFS |
| Música sola | −12 a −8 dBFS |
| Efectos | −18 a −8 dBFS según importancia |

## Normalización y sonoridad
La sonoridad percibida se mide en **LUFS** (unidades de sonoridad integrada), no en picos.

> [OFICIAL] La televisión europea trabaja a −23 LUFS (recomendación EBU R 128). Las plataformas de vídeo y música normalizan la reproducción a un objetivo propio; el valor más citado para YouTube y Spotify es en torno a −14 LUFS. Cada plataforma publica y actualiza el suyo.

> [PRACTICA] Objetivo razonable para redes y web: alrededor de **−14 LUFS integrados** con pico real máximo de **−1 dBTP**. Si entregas más fuerte, la plataforma te bajará; si entregas muy bajo, algunas no suben.

- **Premiere**: panel Sonido esencial (etiqueta cada clip como Diálogo, Música, Efectos o Ambiente y usa los ajustes de volumen automático y atenuación) y el medidor de sonoridad (Loudness Meter) en la pista de mezcla.
- **Resolve**: página Fairlight, con ecualizador y dinámica por pista y medidor de sonoridad integrado.

Escucha la mezcla final en auriculares, en altavoces y en el **altavoz del móvil**: si la voz se entiende ahí, la mezcla funciona.
` },
    { id: '12.5', title: 'Códecs, exportación, copias y entrega', mins: 10, body: `
## Contenedor, códec y tasa de bits
- **Contenedor** (MP4, MOV, MXF): la caja.
- **Códec** (H.264, H.265, ProRes, DNxHR): cómo se comprime lo que va dentro.
- **Tasa de bits**: cuántos datos por segundo. A más tasa, más calidad y más peso, con rendimientos decrecientes.

| Códec | Tipo | Para qué |
| H.264 | distribución, muy compatible | entrega web y redes |
| H.265 (HEVC) | distribución, más eficiente | 4K, HDR; comprueba la compatibilidad del destinatario |
| ProRes 422 / 422 HQ | intermedio, poco comprimido | máster, intercambio entre programas |
| ProRes 4444 | intermedio con canal alfa | gráficos con transparencia |
| DNxHR | intermedio (equivalente de Avid) | máster en entornos Windows |

**VBR de dos pasadas** reparte mejor los datos que CBR a igual tamaño; para entregas rápidas, una pasada con tasa suficiente.

## Ajustes por plataforma
Las especificaciones cambian. Lo estable:
- **Instagram y TikTok**: vertical 1080 × 1920, H.264, 25 o 30 fps, AAC. Suben también 4K, pero reescalan.
- **YouTube**: acepta casi todo; la calidad con la que reproduce mejora al subir en 4K incluso para ver en 1080p, porque asigna más tasa y otro códec a las resoluciones altas (comportamiento ampliamente observado por creadores).
- Espacio de color Rec.709; niveles de vídeo; fotogramas de la secuencia sin conversión.

> [OJO] Consulta las guías vigentes de cada plataforma antes de una entrega importante; resoluciones, duraciones máximas y tasas recomendadas se actualizan con frecuencia.

## Copias de seguridad: regla 3-2-1
> [PRINCIPIO] **3** copias de todo, en **2** tipos de soporte distintos, **1** de ellas fuera del lugar (otra ubicación física o la nube).

En rodaje y viaje:
1. Al terminar el día, copia cada tarjeta completa a **dos** discos distintos.
2. Verifica: abre clips del principio, del medio y del final; o usa un programa de copia con suma de verificación.
3. No formatees la tarjeta hasta tener dos copias verificadas. Si puedes, rota tarjetas y no reutilices las del día.
4. Los dos discos viajan separados (uno contigo, otro en otra bolsa o en el hotel).
5. Si hay buena conexión, sube lo esencial a la nube.

Para Japón: dos SSD portátiles y tarjetas suficientes para no tener que formatear en varios días. Rótulalas y lleva las llenas en un estuche aparte, con el cierre «bloqueado» en las SD.

## Entrega profesional
- **Qué**: las piezas pactadas, en los formatos pactados, con nombres claros (Cliente_Pieza_Formato_v03.mp4).
- **Cómo**: enlace de descarga (servicio de transferencia o carpeta en la nube) con caducidad conocida. Nunca por mensajería que recomprime.
- **Con qué**: miniaturas, subtítulos en SRT si procede, texto con créditos y licencias de música, instrucciones breves de publicación (qué versión para qué plataforma).
- **Revisión**: usa plataformas de revisión con comentarios por minutaje cuando haya varias rondas.
- **Cierre**: factura, confirmación de recepción y política de archivo comunicada («conservo el proyecto seis meses»).

## Archivo
Al cerrar el proyecto: máster en ProRes, exportaciones finales, proyecto con sus medios (o una versión consolidada), gráficos, música con licencias y documentos. Brutos según lo pactado. Dos copias en soportes distintos y una revisión anual: los discos mueren en silencio.
` }
  ],
  cases: [
    { t: 'Entrevista con el micro saturado', b: 'El entrevistado se ríe y el nivel satura en tres frases. La grabación interna del transmisor, a menor nivel, las salva. Sin esa copia, habría que repetir o cortar. Desde entonces: grabación interna siempre activa y prueba de nivel con la persona hablando alto.' },
    { t: 'Reel reclamado por la música', b: 'Reel para una marca con una canción popular de la biblioteca de la aplicación. La plataforma silencia el audio al promocionarlo como anuncio. Rehacer con música de librería licenciada para uso comercial y guardar el certificado.' },
    { t: 'Disco caído en el viaje', b: 'Un único SSD con diez días de material cae al suelo y deja de montar. Recuperación profesional: cara y sin garantías. Con dos discos separados, habría sido una anécdota.' }
  ],
  errors: [
    'Usar After Effects para montar o Premiere para animar complejo.',
    'Animaciones sin suavizado ni desenfoque de movimiento.',
    'Compuestos con negros, grano o luz que no casan con el plano.',
    'Confiar en el micro interno de la cámara como audio principal.',
    'No monitorizar con auriculares.',
    'Niveles al límite: saturación irreparable.',
    'No grabar tono de sala ni ambiente.',
    'Música sin licencia en trabajos de cliente.',
    'Música tapando la voz.',
    'Una sola copia del material; formatear sin verificar.',
    'Entregar por mensajería que recomprime; nombres de archivo confusos.'
  ],
  exercise: {
    title: 'Sonido y entrega',
    steps: [
      'En el avión: escucha con auriculares una escena de una película y enumera sus capas de sonido (voz, ambiente, efectos, música). Anota un momento en que el silencio haga el trabajo.',
      'Escribe tu protocolo de copias 3-2-1 para este viaje: qué discos, cuándo copias, cómo verificas, dónde va cada copia.',
      'Al aterrizar: graba 30 s de voz con el DJI Mic con picos a −12 dB, 30 s de tono de sala y tres efectos (pasos, puerta, objeto).',
      'Mézclalo con una música libre: voz a −12/−6 de pico, música bajo voz a unos −20, y mide la sonoridad integrada hasta acercarte a −14 LUFS.',
      'En After Effects o en tu editor: anima un rótulo de nombre con entrada suavizada y desenfoque de movimiento.',
      'Exporta un máster y una versión vertical H.264, y revísalas en el altavoz del móvil.'
    ],
    deliver: 'Protocolo de copias escrito, mezcla medida y dos exportaciones revisadas.'
  },
  checklist: [
    'Micro colocado a un palmo de la boca, sin roces, con antiviento en exterior',
    'Grabación interna de seguridad del micro activada',
    'Nivel de cámara bajo; picos en torno a −12 dB',
    'Auriculares puestos durante la toma',
    'Tono de sala y ambientes grabados',
    'Música con licencia y justificante guardado',
    'Voz inteligible en el altavoz del móvil',
    'Sonoridad medida (≈ −14 LUFS, pico real ≤ −1 dBTP)',
    'Máster exportado y revisado; versiones derivadas',
    'Tres copias, dos soportes, una fuera; verificadas',
    'Entrega por enlace con nombres claros y documentación'
  ],
  summary: [
    'After Effects: capas, fotogramas clave, suavizado, desenfoque de movimiento.',
    'Tracking de punto, planar o 3D según lo que haya que pegar; rueda pensando en ello.',
    'Un compuesto convence cuando casan luz, negros, nitidez y grano.',
    'El micro cerca de la boca vale más que un micro caro lejos.',
    'Picos de voz entre −12 y −6 dBFS; la saturación no se repara.',
    'Mezcla: la voz manda; música por debajo; limitador al final.',
    'Sonoridad para web ≈ −14 LUFS; cada plataforma publica su objetivo.',
    'Música: siempre con licencia válida para el uso.',
    'H.264 para distribuir, ProRes para máster. Regla 3-2-1 para no perder nada.'
  ],
  quiz: [
    { q: 'En After Effects, ¿qué aporta aplicar Easy Ease (F9) a los fotogramas clave?', o: ['Más resolución', 'Aceleración y frenado suaves en lugar de movimiento lineal', 'Desenfoque de movimiento', 'Sincronía con el audio'], a: 1, w: 'El suavizado cambia la interpolación temporal para que el movimiento arranque y pare de forma natural.', t: 'entrega' },
    { q: 'Quieres reemplazar el contenido de una pantalla de televisión en un plano con cámara en movimiento. ¿Qué seguimiento es el adecuado?', o: ['De un punto', 'Planar', 'Ninguno', 'Estabilización de deformación'], a: 1, w: 'Una pantalla es una superficie plana: el seguimiento planar recoge posición, escala, rotación y perspectiva.', t: 'entrega' },
    { q: 'Dónde colocar los picos de una voz al grabar en digital:', o: ['Justo en 0 dBFS', 'Entre −12 y −6 dBFS', 'Por debajo de −40 dBFS', 'En +3 dB'], a: 1, w: 'Deja margen para subidas inesperadas sin acercarte al ruido de fondo. A 0 dBFS cualquier pico satura.', t: 'audio' },
    { q: 'Con el DJI Mic conectado a la A7 IV, ¿cómo conviene repartir la ganancia?', o: ['Cámara alta, micro bajo', 'Cámara baja, salida del receptor suficiente', 'Ambas al máximo', 'Da igual'], a: 1, w: 'El previo de la cámara añade ruido al amplificar. Es mejor enviarle una señal fuerte y que amplifique poco.', t: 'audio' },
    { q: '¿Para qué sirve grabar 30 segundos de tono de sala?', o: ['Para calibrar el micro', 'Para rellenar huecos entre cortes sin que cambie el fondo', 'Para medir LUFS', 'Para sincronizar'], a: 1, w: 'Cada lugar tiene su ruido de fondo. Sin él, los cortes de diálogo dejan silencios digitales que se notan.', t: 'audio' },
    { q: 'Un cliente quiere en su anuncio una canción de moda que «está en Instagram». ¿Qué le dices?', o: ['Que sin problema', 'Que la biblioteca para particulares no cubre uso comercial: hace falta licencia o música de librería', 'Que basta con citar al artista', 'Que con 10 segundos es legal'], a: 1, w: 'El uso comercial requiere una licencia específica. Ni la atribución ni una duración corta lo sustituyen.', t: 'entrega' },
    { q: 'Sonoridad de referencia razonable para vídeo en redes:', o: ['−23 LUFS', '−14 LUFS aproximadamente', '0 LUFS', '−40 LUFS'], a: 1, w: '−23 LUFS es la norma de televisión europea. Para web se trabaja en torno a −14 LUFS, valor al que muchas plataformas normalizan.', t: 'sonido' },
    { q: 'Regla 3-2-1:', o: ['3 tarjetas, 2 baterías, 1 cámara', '3 copias, 2 soportes distintos, 1 fuera del lugar', '3 exportaciones, 2 formatos, 1 cliente', '3 discos iguales en la misma mochila'], a: 1, w: 'Protege frente a fallo de un soporte y frente a pérdida, robo o accidente en un lugar.', t: 'datos' },
    { q: '¿Qué códec eliges para el máster de archivo?', o: ['H.264 a 5 Mb/s', 'ProRes 422 HQ o DNxHR', 'GIF', 'H.265 a mínima tasa'], a: 1, w: 'Un códec intermedio poco comprimido conserva calidad para futuras versiones. Los de distribución se derivan del máster.', t: 'entrega' },
    { q: 'La mezcla suena bien en tus auriculares. ¿Última comprobación imprescindible?', o: ['Ninguna', 'Escucharla en el altavoz del móvil', 'Subir todo 6 dB', 'Añadir reverberación'], a: 1, w: 'Es donde la oirá la mayoría. Si la voz se pierde ahí, hay que rebajar música o reforzar la presencia de la voz.', t: 'sonido' }
  ]
};
