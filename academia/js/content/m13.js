// Módulo 13 — Examen final práctico. Tres encargos con evaluación por criterios explícitos.
const camNote = 'Los ajustes se evalúan con el mismo cálculo de exposición del simulador A (EV de la escena, parpadeo, ángulo, perfil, óptica).';
export default {
  id: 13, title: 'Examen final', short: 'Examen final', tags: [],
  goal: 'Demostrar que sabes razonar un encargo completo: cámara, exposición, óptica, planificación, luz, montaje, color y entrega.',
  lessons: [
    { id: '13.1', title: 'Cómo funciona y cómo se evalúa', mins: 6, body: `
El examen final simula tres encargos reales de tu día a día. En cada uno tomas decisiones en tres bloques:

| Bloque | Qué haces | Cómo se evalúa |
| **1. Cámara** | eliges fps, obturación, diafragma, ISO, ND, perfil, objetivo y focal | cálculo automático: coherencia de exposición con la luz de la escena, parpadeo, ángulo de obturación, adecuación del perfil y límites reales de tu objetivo |
| **2. Decisiones** | óptica, plan de tomas, iluminación, montaje, color y entrega | cada opción vale 0, 1 o 2 puntos y lleva su explicación; hay opciones aceptables que no son la mejor |
| **3. Justificación** | escribes tu razonamiento con tus palabras | autoevaluación guiada: comparas tu texto con una lista de criterios y marcas con honestidad los que cumples |

> [MODELO] Un programa sin conexión no puede corregir texto libre con fiabilidad, y no voy a fingirlo. Por eso el tercer bloque es una autoevaluación con criterios explícitos: vale para aprender, y su puntuación se muestra aparte de la nota automática.

## Criterios generales
- **Coherencia**: las decisiones encajan entre sí (no S-Log3 con entrega en dos horas; no cámara lenta a 25p).
- **Prioridades**: proteges lo irrepetible y lo que el cliente necesita.
- **Realismo**: usas tu equipo real y sus límites.
- **Justificación**: sabes decir por qué, no solo qué.

## Nota
- Cada encargo se supera con un **70 %** en los bloques 1 y 2 combinados.
- Puedes repetirlos; se guarda tu mejor resultado.
- Los errores van a tu cola de repaso con su explicación.

Hazlos cuando hayas terminado los módulos 1 a 12. Si fallas un bloque, el informe te indica a qué módulo volver.
` }
  ],
  finals: [
    { id: 'A', title: 'A · Videoclip nocturno', mins: 20,
      brief: 'Artista urbano, Madrid, calle estrecha con rótulos de neón y escaparates. Rodaje de 22:00 a 02:00, tú solo con un ayudante. Todo el clip es playback a velocidad normal más planos narrativos. El artista quiere «algo oscuro, con color, tipo cine». Entrega en dos semanas: versión 16:9 para YouTube y un adelanto vertical de 20 s. Hay presupuesto para etalonar.',
      sceneNote: 'Luz medida junto al neón principal, donde colocarás al artista: gris medio a EV 4 (ISO 100). Los neones están 6 stops por encima. Red de 50 Hz. ' + camNote,
      scene: { ev: 4, hz: 50, mode: 'video', needSlow: false, highDR: true, fastDelivery: false, allowFast: false },
      cam: { fps: 25, den: 50, N: 2.8, iso: 800, nd: 0, profile: 'slog3', lens: 'gm', focal: 35 },
      decisions: [
        { q: 'Óptica principal para los planos de playback cercanos', o: [
          ['50 mm f/1.8: gano 1,3 stops y desenfoco los neones del fondo', 2, 'Es tu objetivo de noche. A f/1.8–2 llegas a la exposición con ISO moderado y conviertes los rótulos en discos de color.'],
          ['24–70 GM a f/2.8 para no cambiar de objetivo', 1, 'Práctico y válido para generales, pero a f/2.8 necesitas más del doble de ISO en los planos cercanos. Mejor combinar: GM para generales, 50 mm para playback.'],
          ['28–70 a 70 mm f/5.6', 0, 'A f/5.6 pierdes más de tres stops respecto al 50 mm: ISO inasumible en S-Log3 de noche.']] },
        { q: 'Plan de tomas', o: [
          ['Canción dividida por secciones; por cada localización, playback completo en general, medio y primer plano, más narrativa; orden por localización', 2, 'Cubres cada sección con tres tamaños, lo que permite montar con libertad, y ruedas en el orden eficiente.'],
          ['Ir grabando lo que surja en cada sitio', 0, 'Sin plan, descubrirás en montaje que el último estribillo no tiene primer plano. De noche y con cuatro horas no hay margen.'],
          ['Solo playback en plano medio de toda la canción en tres sitios', 1, 'Tendrás sincronía, pero un único tamaño hace el montaje monótono y sin detalles ni narrativa.']] },
        { q: 'Iluminación con tu equipo', o: [
          ['Neón como principal lateral; LED cálido a mínima potencia para dar brillo a los ojos; escaparates y rótulos al fondo como separación', 2, 'Usas la localización como fuente y tu LED solo donde falta. Mantiene el ambiente oscuro con cara legible.'],
          ['LED frontal a máxima potencia para asegurar la cara', 0, 'Aplana la cara, mata el ambiente de los neones e ilumina la pared de detrás.'],
          ['Sin luz propia: todo ambiente', 1, 'Puede funcionar en puntos muy concretos, pero dependes de que el artista no se mueva de la mejor luz y arriesgas ojos sin vida.']] },
        { q: 'Exposición de los neones y de la piel', o: [
          ['Cebra de límite sobre el neón y su reflejo en la piel; exponer hasta justo antes del recorte y comprobar que la piel no cae más de ~1 stop bajo su referencia', 2, 'Aplicas el método límite → sujeto. La piel teñida de neón recorta un canal muy pronto.'],
          ['+1,7 stops fijos porque es S-Log3', 0, 'Con neones 6 stops sobre el gris, +1,7 los lleva al recorte. La sobreexposición fija no es una regla.'],
          ['Exponer por la imagen del asistente gamma', 0, 'El asistente es visualización. Decide con cebras.']] },
        { q: 'Estructura de montaje', o: [
          ['Tomas de playback sincronizadas con el máster en multicámara; narrativa intercalada; cortes más rápidos hacia el último estribillo', 2, 'Sincronía garantizada, acceso a toda toma en todo momento y progresión de energía.'],
          ['Montar plano a plano sincronizando a ojo', 0, 'Lento y con errores de labios.'],
          ['Un plano secuencia de la mejor toma', 1, 'Opción estética legítima si se ha rodado para ello; como plan de montaje para este material, desaprovecha la cobertura.']] },
        { q: 'Tratamiento de color', o: [
          ['CST S-Log3/S-Gamut3.Cine → trabajo → Rec.709; corrección e igualado; look: negros densos, sombras frías sutiles, neones saturados y piel protegida', 2, 'Gestión correcta, corrección antes del look y piel a salvo del tinte.'],
          ['LUT creativa de un pack directamente sobre el log', 0, 'Resultado arbitrario y distinto en cada plano.'],
          ['Levantar las sombras para que se vea todo', 0, 'De noche, sombras levantadas equivalen a gris ruidoso. El negro es parte del look pedido.']] },
        { q: 'Entrega', o: [
          ['Máster ProRes; H.264 4K 16:9 para YouTube; adelanto 9:16 reencuadrado o rodado en vertical; enlace de descarga; archivo 3-2-1', 2, 'Máster, versiones por plataforma y archivo.'],
          ['Un MP4 por WhatsApp', 0, 'Recompresión destructiva y sin máster.'],
          ['Solo el 16:9; el vertical que lo recorten ellos', 0, 'El adelanto vertical es un entregable pactado.']] }
      ],
      open: [
        { q: 'Justifica tu perfil de imagen y tu estrategia de exposición para esta noche.', rubric: ['Menciono que hay tiempo y presupuesto de etalonaje', 'Menciono el alto contraste (neones) como motivo para el log, o defiendo S-Cinetone asumiendo qué se pierde', 'Explico cómo compruebo el recorte del neón y de la piel (cebras)', 'Indico qué ISO y apertura hacen viable el nivel de piel', 'Menciono 10 bits y balance de blancos fijo'] },
        { q: 'Describe tu plan B si empieza a llover a las 23:30.', rubric: ['Reordeno para rodar lo cubierto o interiores', 'Protejo equipo y electricidad', 'Considero la continuidad con lo ya rodado en seco', 'Tengo una fecha de reserva o una alternativa pactada'] }
      ] },
    { id: 'B', title: 'B · Competición HYROX en interior', mins: 20,
      brief: 'Organizador de una competición tipo HYROX en una nave ferial de Barcelona. Quiere tres reels verticales publicados esa misma noche y 40 fotos al día siguiente. Tú solo, de 9:00 a 15:00. Luz: focos de descarga y LED en el techo, uniforme; sin ventanas en la zona de competición. El cliente quiere ver esfuerzo, ambiente y los logos de dos patrocinadores.',
      sceneNote: 'Configura la cámara para los planos de vídeo a cámara lenta. Luz medida en pista: gris medio a EV 7 (ISO 100). Red de 50 Hz. ' + camNote,
      scene: { ev: 7, hz: 50, mode: 'video', needSlow: true, highDR: false, fastDelivery: true, allowFast: false },
      cam: { fps: 25, den: 50, N: 2.8, iso: 800, nd: 0, profile: 'slog3', lens: 'gm', focal: 35 },
      decisions: [
        { q: 'Objetivo montado durante el evento', o: [
          ['24–70 GM, sabiendo que a 50p encuadra como 36–105 mm', 2, 'Versatilidad total sin cambiar de lente, y cuentas con el recorte de 4K 50p.'],
          ['50 mm f/1.8 todo el día', 1, 'Luminoso, pero a 50p es un 75 mm fijo y su AF es más lento: perderás generales y momentos.'],
          ['28–70 por ser ligero', 0, 'f/3.5–5.6 en interior obliga a ISO muy alto y cambia de exposición al hacer zoom.']] },
        { q: 'Cobertura', o: [
          ['Recorrido estudiado; lista de momentos obligatorios (salida, estaciones, meta, podio, patrocinadores); secuencias de cinco planos por estación; fotos y vídeo alternados por bloques', 2, 'Sin guion, lo que te salva es la lista de cobertura y pensar en secuencias montables.'],
          ['Seguir a un solo atleta toda la carrera', 1, 'Buena historia, pero pierdes ambiente, patrocinadores y variedad para tres reels.'],
          ['Quedarte en la meta', 0, 'Un solo tipo de imagen para tres reels y 40 fotos.']] },
        { q: 'Parpadeo', o: [
          ['Prueba de 5 s a 50p antes de empezar, revisada ampliada; obturación 1/100; en foto, obturador mecánico con toma antiparpadeo', 2, 'Protocolo completo para vídeo y foto con focos de descarga.'],
          ['No hace falta comprobar con luz de techo', 0, 'Los focos de descarga y los LED son precisamente los que parpadean.'],
          ['1/60 por seguridad', 0, '1/60 corresponde a redes de 60 Hz. En España bate con la luz.']] },
        { q: 'Enfoque en vídeo entre atletas y público', o: [
          ['AF continuo, humanos, seguimiento táctil sobre el atleta, sensibilidad de cambio de motivo bloqueada', 2, 'Evita que el foco salte a quien cruza por delante.'],
          ['Área ancha y que elija la cámara', 1, 'Funciona con un sujeto aislado; con público alrededor, elegirá por ti.'],
          ['Manual a f/2.8', 0, 'Inviable con acción impredecible y tú solo.']] },
        { q: 'Montaje de los reels esa noche', o: [
          ['Seleccionar durante el día (marcar tomas en cámara); tres ideas distintas (ambiente, esfuerzo, meta); gancho en el primer segundo; subtítulos; exportar 1080 × 1920', 2, 'Flujo realista para entregar a tiempo, con una idea por pieza.'],
          ['Volcar todo y empezar a mirar a las 21:00', 0, 'Seis horas de brutos no se visionan en una noche de entrega.'],
          ['Un único reel largo con todo', 0, 'Se pactaron tres piezas; una larga retiene peor.']] },
        { q: 'Color', o: [
          ['Balance personalizado en pista y exposición cuidada para que apenas haga falta corregir; ajuste básico de contraste y saturación igual en todos los planos', 2, 'Con entrega inmediata, el color se resuelve en rodaje.'],
          ['Etalonaje plano a plano con secundarias', 0, 'No hay tiempo. Y con un perfil terminado no hace falta.'],
          ['Filtro de la aplicación', 1, 'Rápido, pero poco coherente entre piezas y sin control de piel.']] },
        { q: 'Seguridad del material durante la jornada', o: [
          ['Grabación simultánea en dos tarjetas; al terminar, copia a dos discos verificada antes de formatear nada', 2, 'Evento irrepetible: redundancia en captura y en volcado.'],
          ['Una tarjeta grande y copiar al llegar a casa', 0, 'Punto único de fallo durante todo el día.'],
          ['Relé automático entre tarjetas', 1, 'Amplía capacidad pero no protege frente al fallo de una tarjeta.']] }
      ],
      open: [
        { q: 'Justifica el perfil de imagen elegido para este encargo.', rubric: ['Menciono la entrega la misma noche', 'Menciono que la luz es uniforme y no hay altas luces que proteger', 'Explico cómo expongo la piel con ese perfil (nivel o cebra)', 'Menciono balance de blancos personalizado', 'Si defiendo S-Log3, explico cómo llegaría a tiempo'] },
        { q: 'Enumera tu secuencia de cinco planos para la estación de trineo.', rubric: ['Incluyo un plano de situación', 'Incluyo plano medio de la acción', 'Incluyo primer plano de esfuerzo', 'Incluyo un detalle (manos, pies, trineo)', 'Incluyo reacción o público/juez', 'Mantengo la dirección de pantalla del atleta'] }
      ] },
    { id: 'C', title: 'C · Anuncio cinematográfico para un gimnasio', mins: 20,
      brief: 'Gimnasio boutique. Anuncio de 30 s (16:9 y 9:16) para campaña de pago en redes y pantallas del local. Un día de rodaje con la sala cerrada, dos atletas y una entrenadora. Puedes apagar y encender luces por zonas. Tienes tu LED, un reflector y el RS 3. Entrega en diez días, con etalonaje. El cliente quiere «que parezca una película, no un vídeo de gimnasio».',
      sceneNote: 'Configura la cámara para el plano héroe a cámara lenta (magnesio en contraluz). Con media sala apagada, la luz sobre el atleta da gris medio a EV 6,5 (ISO 100). Red de 50 Hz; has comprobado que no hay PWM. ' + camNote,
      scene: { ev: 6.5, hz: 50, mode: 'video', needSlow: true, highDR: false, fastDelivery: false, allowFast: false },
      cam: { fps: 25, den: 50, N: 2.8, iso: 800, nd: 0, profile: 'scinetone', lens: 'gm', focal: 50 },
      decisions: [
        { q: 'Concepto', o: [
          ['Una frase que decide tono y estructura: por ejemplo, «la hora antes de que abra el gimnasio: silencio, ritual y esfuerzo»', 2, 'Un concepto permite decidir luz, ritmo y sonido. Es lo que separa un anuncio de un catálogo de máquinas.'],
          ['Enseñar todas las instalaciones', 0, 'Es un inventario, no una idea. El cliente pidió película.'],
          ['Copiar plano a plano un anuncio de una gran marca', 1, 'Como referencia de estilo sirve; copiar promete un nivel de producción que no tienes y carece de identidad.']] },
        { q: 'Iluminación del plano héroe', o: [
          ['Media sala apagada; luminarias del fondo como contra; LED lateral bajo para modelar; reflector lejano como relleno mínimo; fondo 1–2 stops por debajo de la piel', 2, 'Contraste, volumen y profundidad apagando más que añadiendo.'],
          ['Todas las luces encendidas para que se vea bien', 0, 'Luz plana y fondo protagonista: «vídeo de gimnasio».'],
          ['Solo el LED frontal en sala a oscuras', 1, 'Tendrás contraste, pero cara plana y fondo negro sin profundidad.']] },
        { q: 'Focales', o: [
          ['24–35 mm cerca para planos de acción con presencia; 50–70 mm para retratos y detalles con fondo limpio', 2, 'Cada focal con su función narrativa.'],
          ['Todo a 24 mm', 1, 'Dinámico, pero sin planos de respiro ni fondos limpios; retratos deformados.'],
          ['Todo a 70 mm desde lejos', 1, 'Limpio pero distante: falta inmersión.']] },
        { q: 'Movimiento de cámara', o: [
          ['Mezcla motivada: trípode para composiciones y cámara lenta, gimbal para acompañar desplazamientos, mano para esfuerzo cercano', 2, 'Cada soporte aporta una textura y el movimiento significa algo.'],
          ['Todo en gimbal orbitando', 0, 'Monótono y sin motivo.'],
          ['Todo en trípode', 1, 'Elegante, pero para 30 s de fitness puede faltar energía.']] },
        { q: 'Shot list y plan', o: [
          ['Planos con prioridad A/B/C; primero generales con sala vacía y los esfuerzos exigentes con atletas frescos; versiones 9:16 de los planos clave', 2, 'Proteges lo imprescindible, cuidas al talento y cubres ambos formatos.'],
          ['Rodar en el orden del guion', 0, 'Obliga a cambiar luz y montaje de cámara continuamente.'],
          ['Rodar solo en horizontal y recortar el vertical', 1, 'Viable si has compuesto con marcadores 9:16; si no, perderás encuadres en la campaña principal, que es en redes.']] },
        { q: 'Sonido', o: [
          ['Grabar ambientes y efectos reales (respiración, discos, magnesio); música licenciada para publicidad; diseño de sonido con silencios', 2, 'El sonido físico es la mitad de «parecer una película».'],
          ['Solo música', 1, 'Funciona, pero pierdes cuerpo y verdad.'],
          ['Una canción conocida de la biblioteca de Instagram', 0, 'No cubre uso publicitario: la campaña de pago será bloqueada.']] },
        { q: 'Color y entrega', o: [
          ['Gestión de color correcta; corrección e igualado; look contenido con piel natural; máster ProRes, 16:9 y 9:16 en H.264, subtítulos y control de calidad en móvil', 2, 'Proceso completo y entregables pactados.'],
          ['LUT «cine» y exportar', 0, 'Sin corrección ni igualado, cada plano tendrá un aspecto distinto.'],
          ['Entregar solo el 16:9 a máxima calidad', 0, 'Falta la versión vertical de la campaña.']] }
      ],
      open: [
        { q: 'Justifica perfil, exposición y por qué has configurado así el plano a cámara lenta.', rubric: ['Menciono tiempo y presupuesto de etalonaje y luz controlada', 'Indico fps ≥ 50 y obturación acorde (1/100 a 50p)', 'Menciono el recorte ×1,5 de 4K 50p y su efecto en la focal', 'Explico cómo expongo la piel y qué desplazamiento elijo en S-Log3 (o defiendo S-Cinetone)', 'Menciono que el contraluz revela el magnesio'] },
        { q: 'Escribe la estructura del anuncio en cuatro bloques con segundos.', rubric: ['Hay un gancho en los primeros 2–3 s', 'Hay progresión (calma → esfuerzo → clímax)', 'Hay un cierre con marca y llamada a la acción', 'Los tiempos suman unos 30 s', 'He pensado dónde va la cámara lenta y por qué'] }
      ] }
  ],
  cases: [], errors: [], checklist: [
    'Módulos 1–12 terminados',
    'Retos de simulador superados en exposición, S-Log3 y color',
    'Cola de repaso vacía o casi vacía',
    'Encargo A superado (≥ 70 %)', 'Encargo B superado (≥ 70 %)', 'Encargo C superado (≥ 70 %)'
  ],
  summary: [
    'Tres encargos: videoclip nocturno, HYROX en interior y anuncio de gimnasio.',
    'Bloque de cámara evaluado por cálculo; decisiones puntuadas con explicación; justificación autoevaluada con criterios.',
    'Se supera con 70 % en cámara + decisiones.',
    'El informe remite al módulo que conviene repasar.'
  ],
  exercise: { title: 'Después del examen', steps: ['Repite cada encargo cambiando una condición (por ejemplo, entrega inmediata en el A) y observa qué decisiones cambian.', 'Escribe tu propio encargo real más reciente con el mismo esquema y evalúalo con los criterios.'], deliver: 'Un encargo propio analizado.' },
  quiz: []
};
