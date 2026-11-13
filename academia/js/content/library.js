// Biblioteca avanzada: 21 temas para seguir después del curso intensivo.
export const LIBRARY = [
  { id: 'dop', t: 'Dirección de fotografía avanzada', min: 12, b: `
## Pensar por escenas, no por planos
El director de fotografía decide un **sistema visual** para la pieza: qué focales, qué contraste, qué movimiento y qué color corresponden a cada estado de la historia. Antes de rodar, escribe tres reglas para el proyecto («nunca luz frontal», «cámara fija hasta el clímax», «50 mm para ella, 24 mm para él») y cúmplelas.

## Contraste como herramienta narrativa
- **Proporción de iluminación** entre lados de la cara (módulo 7) y **proporción de escena** entre sujeto y fondo son dos decisiones distintas.
- Anota los niveles: piel en su valor, fondo a −2, práctica a +2. Trabajar con números permite repetir un look otro día.

## Exposición por valores
Con un fotómetro o con el modo puntual, mide cada zona en stops respecto al gris medio y decide dónde debe caer. Es el sistema de zonas aplicado al vídeo: no «¿está bien expuesto?» sino «¿está cada cosa donde quiero?».

## Textura de imagen
La nitidez, la difusión (tu Black Diffusion), el grano y la profundidad de campo forman la textura. Decídela como conjunto: un filtro de difusión con óptica moderna muy nítida no da lo mismo que una óptica antigua.

## Para profundizar
- Blain Brown, *Cinematography: Theory and Practice*.
- John Alton, *Painting with Light*.
- La revista *American Cinematographer* publica desgloses técnicos de rodajes reales.
- Analiza una escena que te guste fotograma a fotograma: ¿de dónde viene cada luz?` },
  { id: 'luzpro', t: 'Iluminación profesional', min: 12, b: `
## Fuentes grandes y control
El salto profesional no es más potencia sino más **control**: banderas, negros, rejillas y difusores grandes. Una luz suave de 1,2 m con rejilla ilumina la cara sin tocar el fondo.

## Luz de libro y rebotes
«Book light»: una luz rebota en una superficie blanca y después atraviesa una difusión. Fuente muy grande y suave, a costa de varios stops. Con LED modernos es viable en espacios pequeños.

## Motivar la luz
Cada luz debería poder explicarse por algo de la escena (una ventana, una lámpara, una pantalla). La luz motivada se percibe natural aunque esté muy trabajada.

## Medir
Un fotómetro de luz incidente da la exposición en f/ para un ISO y una obturación: permite fijar proporciones exactas (principal f/4, relleno f/2 = 4:1) y repetir montajes.

## Equipo que escala bien
- Un LED COB de 60–150 W con softbox y rejilla.
- Tubos LED RGB como prácticas y acentos.
- Un marco de difusión plegable de 1 × 1 m y una tela negra del mismo tamaño.
- Trípodes de luz con lastre.

> [OJO] A más potencia, más responsabilidad eléctrica y de sujeción: repasa la seguridad del módulo 7.` },
  { id: 'teoriacolor', t: 'Teoría del color', min: 10, b: `
## Tres dimensiones
**Tono** (qué color), **saturación** (cuánto) y **luminosidad** (cómo de claro). Casi todas las decisiones de color de una pieza son de saturación y luminosidad, no de tono.

## Armonías
- **Complementarios** (opuestos en el círculo): máximo contraste. Cálido-frío es el caso más usado porque la piel es cálida y las sombras admiten frío.
- **Análogos** (vecinos): calma, unidad.
- **Monocromo**: un tono con variaciones de luz; muy gráfico.
- **Acento**: una paleta apagada y un único color saturado que dirige la mirada.

## El color se diseña antes de rodar
Vestuario, localización, atrezo y luces definen la paleta. El etalonaje refuerza lo que hay; no puede crear una paleta que no se rodó sin que parezca un filtro.

## Contraste simultáneo
Un color cambia según lo que tiene alrededor: la piel parece más cálida junto al azul y más pálida junto al naranja. Úsalo para que la piel destaque sin saturarla.

## Significado
Las asociaciones (rojo = peligro, azul = frío) son culturales y contextuales. Lo fiable es la **coherencia interna**: si en tu pieza el verde acompaña a un personaje, el espectador lo aprende.

## Para profundizar
- Patti Bellantoni, *If It's Purple, Someone's Gonna Die* (ensayo, no ciencia).
- Josef Albers, *Interacción del color*.` },
  { id: 'colorcamaras', t: 'Gestión de color entre cámaras', min: 10, b: `
## El principio
Cada cámara codifica la escena con su propia curva y su propio gamut. Si le dices al programa cuáles son, puede llevarlas todas a un mismo espacio de trabajo. A partir de ahí, las diferencias que queden son de sensor y de óptica.

## Tu equipo
| Cámara | Modo recomendable para igualar | Entrada a declarar |
| Sony A7 IV | S-Log3 / S-Gamut3.Cine 10 bits | S-Gamut3.Cine / S-Log3 |
| DJI Osmo Pocket 3 | D-Log M 10 bits | la transformación o LUT oficial de DJI para D-Log M |
| DJI Mini 2 | perfil normal (no dispone de log de 10 bits) | Rec.709 |

> [OFICIAL] DJI publica LUT de conversión de D-Log M a Rec.709 para sus productos. Comprueba en la página de descargas de tu modelo cuál corresponde.

## Método
1. Mismo balance de blancos en Kelvin en todas las cámaras.
2. Carta de color y gris grabada con cada cámara bajo la misma luz, por escena.
3. Proyecto con gestión de color; cada clip con su entrada.
4. Iguala la secundaria a la principal: niveles, balance, saturación, piel.
5. Guarda la corrección de igualado como preajuste por cámara y escena.

## Límites honestos
Un sensor de 1 pulgada o menor tendrá más ruido y menos rango. Compensa con el uso: aéreos y generales de día, no primeros planos nocturnos intercalados con la A7 IV.

## ACES
Sistema abierto de gestión de color usado en cine. Mismo concepto (transformaciones de entrada y de salida) con un estándar común. Útil cuando colaboras con VFX o varios programas; para tu flujo, DaVinci Wide Gamut cubre lo mismo con menos fricción.` },
  { id: 'fotometria', t: 'Fotometría', min: 9, b: `
## Magnitudes
- **Flujo luminoso (lumen)**: luz total que emite una fuente.
- **Intensidad (candela)**: luz en una dirección.
- **Iluminancia (lux)**: luz que **llega** a una superficie. Es lo que mide un fotómetro de luz incidente.
- **Luminancia (cd/m², nit)**: luz que **sale** de una superficie hacia el observador. Es lo que mide el medidor de la cámara y el brillo de una pantalla.

## Incidente frente a reflejada
- La medición **reflejada** (cámara) depende del tono del objeto: por eso se equivoca con nieve y con escenarios negros.
- La medición **incidente** (fotómetro con semiesfera, desde el sujeto hacia la cámara) mide la luz, no el objeto: da la exposición que coloca un gris medio en su sitio, sea cual sea el sujeto.

## De lux a exposición
Relación aproximada con calibración habitual: EV (ISO 100) ≈ log2(lux / 2,5). Así, 2500 lux ≈ EV 10; 160 lux ≈ EV 6. Sirve para leer fichas técnicas de luces: «1000 lux a 1 m» equivale a EV ~8,6 a esa distancia, y por el cuadrado inverso, EV ~6,6 a 2 m.

## Reflectancias útiles
Gris medio 18 %; piel clara ~35 %; piel oscura ~10–15 %; papel blanco ~90 %; terciopelo negro ~2 %. Cada duplicación es un stop.

## Uso práctico
Con estas relaciones puedes prever si una luz bastará antes de alquilarla, y fijar proporciones de iluminación con números.` },
  { id: 'sonidoavanzado', t: 'Sonido avanzado', min: 10, b: `
## Grabación doble
Grabadora externa con previos mejores que los de la cámara, sincronizada por forma de onda o código de tiempo. Permite pistas separadas por micrófono.

## 32 bits en coma flotante
Formato de grabación con un margen dinámico tan amplio que la saturación del **archivo** deja de ser un problema práctico: puedes bajar en posproducción una señal «pasada». No protege de la saturación del propio micrófono o de la etapa analógica, ni mejora una mala colocación.

## Pértiga
Un micro de cañón en pértiga, por encima y delante del hablante, apuntando a la boca, suena más natural que un micro de corbata. Exige un operador. La combinación de pértiga y corbata es el estándar en ficción.

## Acústica
El eco (reverberación) se combate en origen: salas con mobiliario, mantas, distancia a paredes, micro cerca. Las herramientas de eliminación de reverberación por IA han mejorado mucho, pero dejan artefactos si se fuerzan.

## Restauración
Reducción de ruido, eliminación de clics, de zumbidos de red (50 Hz en España y este de Japón, 60 Hz en el oeste) y de siseos. Regla: lo mínimo; una voz con algo de ruido suena mejor que una voz «submarina».

## Mezcla por buses
Agrupa diálogo, música y efectos en buses para procesarlos en conjunto y exportar «stems» (pistas separadas) cuando el cliente necesite versiones.

## Entregas con norma
Televisión: EBU R 128 (−23 LUFS). Plataformas de streaming: especificaciones propias. Pide siempre la hoja técnica.` },
  { id: 'documental', t: 'Cine documental', min: 10, b: `
## Modos
Observacional (no intervienes), participativo (tu presencia forma parte), expositivo (una voz guía), poético (asociación de imágenes). Decide el modo: cambia cómo ruedas.

## Acceso y confianza
El documental se hace con tiempo. La cámara aparece después de la relación, y los mejores momentos llegan cuando dejan de notarte. Equipo pequeño, discreto, y muchas horas.

## Rodar sin guion
- Busca **escenas**, no declaraciones: gente haciendo cosas, con principio y final.
- Cobertura mínima de cada situación: general, acción, caras, detalles, sonido ambiente largo.
- Graba silencios y transiciones: llegar, esperar, irse.

## La historia aparece en montaje
Transcribe, etiqueta y construye en papel antes de cortar. Un documental suele reescribirse tres o cuatro veces en la sala.

## Ética
Consentimiento informado, especialmente con personas vulnerables. Representar con justicia: el montaje puede hacer decir a alguien lo que no dijo. Qué enseñar a los protagonistas antes de publicar es una decisión que conviene pactar.

## Para tu trabajo
Un «mini documental» de un atleta preparando HYROX (tres jornadas, una entrevista, una competición) es un formato excelente de portfolio y de venta a gimnasios.` },
  { id: 'entrevistas', t: 'Entrevistas', min: 9, b: `
## Encuadre
- Mirada a cámara (directo, testimonial) o fuera de cámara, hacia el entrevistador sentado junto al objetivo (conversación).
- Ojos en el tercio superior; aire hacia donde mira.
- Fondo con profundidad: entrevistado a 2–3 m de la pared, alguna práctica desenfocada.
- Dos cámaras: principal en plano medio y segunda más cerrada, a unos 30° del mismo lado del eje.

## Luz
Principal suave por el lado corto, relleno según el tono, contra sutil. La ventana es tu aliada; vigila que no cambie durante una hora de entrevista.

## Sonido
Corbata y, si puedes, cañón como respaldo. Auriculares. Tono de sala.

## Preguntar
- Preguntas abiertas: «Cuéntame cómo fue…», no «¿Fue duro?».
- Pide que incluyan la pregunta en la respuesta: tu voz no estará en el montaje.
- Escucha y repregunta: «¿Por qué?», «¿Qué sentiste?», «Ponme un ejemplo».
- Deja silencios: la gente los llena con lo importante.
- Lo emocional, al final, cuando ya hay confianza.

## Antes y después
Charla previa sin cámara; explica qué pasará. Al terminar: «¿Hay algo que no te haya preguntado y quieras decir?». Suele ser lo mejor.` },
  { id: 'publicidad', t: 'Publicidad', min: 9, b: `
## Una idea, un mensaje
Un anuncio comunica **una** cosa. Si el cliente quiere tres mensajes, son tres piezas.

## Estructuras frecuentes
- Problema → solución → marca.
- Demostración del producto.
- Testimonio.
- Estilo de vida: el producto como parte de una vida deseable.
- Giro: expectativa → sorpresa → marca.

## Los primeros segundos
En redes, la marca o el beneficio deben aparecer pronto; muchas plataformas recomiendan mostrarlos en los primeros instantes y diseñar para reproducción sin sonido. Consulta las guías creativas vigentes de cada plataforma.

## Versiones
Una campaña son muchas piezas: 30, 15 y 6 segundos; 16:9, 9:16 y 1:1; con y sin texto. Planifica el rodaje para todas (encuadre protegido, planos que funcionen solos).

## Aprobaciones
Guion y storyboard aprobados por escrito antes de rodar; presencia del cliente o envío de capturas durante el rodaje para evitar sorpresas.

## Lo legal
Derechos de imagen, música con licencia publicitaria, afirmaciones verificables (ojo con promesas de salud o resultados físicos), identificación de publicidad en colaboraciones con creadores según la normativa de cada país.` },
  { id: 'actores', t: 'Dirección de actores', min: 9, b: `
## Objetivo y obstáculo
Un actor no interpreta emociones: persigue algo y algo se lo impide. Dirige con **verbos de acción** («convéncela», «escóndeselo», «provócalo»), no con resultados («ponte triste»).

## Ensayo
Leer juntos, hablar de qué quiere el personaje en cada escena, probar variaciones. En rodaje, ensaya el movimiento (bloqueo) con la cámara antes de la primera toma.

## Notas
- Una nota por toma.
- En privado, cerca, en voz baja.
- «Como si…»: propón circunstancias imaginarias («como si llegaras tarde y no pudieras decirlo»).
- Pide siempre una toma «para ti» al actor: a veces es la mejor.

## No actores
Con atletas y clientes: tareas reales, repeticiones cortas, humor. Evita el diálogo memorizado; usa entrevistas y acciones.

## Continuidad emocional
Se rueda fuera de orden: recuerda al actor de dónde viene su personaje en cada plano.

## Para profundizar
- Judith Weston, *Directing Actors*.
- Las técnicas de Stanislavski y Meisner como base de vocabulario.` },
  { id: 'produccion', t: 'Producción', min: 9, b: `
## Las tres fases
**Preproducción** (decidir y preparar), **rodaje** (ejecutar) y **posproducción** (terminar). El dinero y el tiempo se salvan en la primera.

## Desglose
Lee el guion y lista por escena: localización, personajes, vestuario, atrezo, equipo especial, efectos. De ahí salen el plan y el presupuesto.

## Equipo mínimo y roles
Aunque seas una persona, los roles existen: dirección, producción, fotografía, sonido, arte. Saber cuál estás desatendiendo en cada momento evita los fallos típicos (casi siempre sonido y producción).

## Un ayudante cambia todo
Alguien que sujete el reflector, vigile el equipo, lleve el tiempo y guíe tus pasos con el gimbal multiplica tu capacidad.

## Documentos
Presupuesto, calendario, plan de rodaje, hoja de llamada, cesiones, permisos, seguro, listado de equipo.

## Logística
Transporte, aparcamiento, comidas, agua, baños, electricidad, meteorología, cargadores. Un equipo con hambre o frío rinde mal.

## Cierre
Devoluciones, pagos, copias verificadas, agradecimientos. Quien cierra bien, repite.` },
  { id: 'presupuestos', t: 'Presupuestos', min: 9, b: `
## Calcula tu coste real
Suma tus gastos anuales (cuota de autónomos, impuestos, seguros, amortización de equipo, programas, transporte, formación) y lo que necesitas ganar. Divide entre los días que **realmente** puedes facturar (no 220: quita comercial, gestión, vacaciones, huecos). Ese es tu coste por jornada: por debajo, pierdes dinero.

## Partidas de un presupuesto
- Preproducción (reuniones, guion, localización).
- Rodaje (jornadas o medias jornadas; tú y ayudantes).
- Equipo (propio amortizado o alquilado).
- Posproducción (montaje, color, sonido, gráficos), por días.
- Música y licencias.
- Desplazamientos y dietas.
- Rondas de cambios incluidas y precio de las extra.
- Derechos de uso (ámbito, duración, medios).

## Tres opciones
Presenta tres niveles (esencial, recomendado, completo). El cliente compara entre tus opciones en vez de compararte con otro.

## Precio por valor
Un anuncio que traerá socios a un gimnasio vale más que las horas que te cuesta. El uso (orgánico o campaña de pago, local o nacional) justifica precios distintos.

## Condiciones
Anticipo, plazos de pago, cancelaciones, validez de la oferta.

> [OJO] Las obligaciones fiscales (IVA, retenciones, facturación) dependen del país y de tu situación: consulta a una asesoría.` },
  { id: 'contratos', t: 'Contratos y derechos', min: 10, b: `
> [OJO] Información general, no asesoramiento jurídico. Las leyes varían por país; para contratos importantes, consulta a un profesional.

## Qué debe recoger un acuerdo
Partes, descripción del trabajo, entregables, calendario, precio y pagos, rondas de cambios, cancelación, propiedad intelectual y licencia de uso, derecho a mostrar el trabajo en portfolio, confidencialidad si procede, responsabilidad y seguros.

## Autoría y cesión
En muchos ordenamientos (también el español) quien crea la obra es su autor y conserva derechos morales irrenunciables; lo que se pacta con el cliente es la **cesión de derechos de explotación**: para qué usos, en qué territorio, por cuánto tiempo y si es en exclusiva. Lo no cedido expresamente suele entenderse no cedido.

## Derechos de imagen
Autorización escrita de las personas reconocibles para uso comercial: quién, qué material, qué usos, cuánto tiempo, si hay contraprestación. Menores: sus tutores.

## Localizaciones y propiedad
Autorización del titular del espacio. Atención a obras protegidas visibles (murales, esculturas), marcas y logos de terceros.

## Brutos
Por defecto, entregas piezas terminadas. Si el cliente quiere los brutos, es un servicio y una cesión aparte: decídelo en el contrato.

## Protección de datos
Si tratas datos personales (imágenes de personas identificables, listas de clientes) en la Unión Europea, aplica el RGPD.` },
  { id: 'licencias', t: 'Licencias musicales', min: 9, b: `
## Dos derechos en cada canción
- La **composición** (letra y música): autores y editoriales.
- La **grabación** (el fonograma): intérpretes y discográfica.
Para usar una canción comercial en un vídeo necesitas permiso de ambos (licencia de sincronización y licencia del máster). Es caro y lento; por eso existen las librerías.

## Librerías de música
Suscripción o pago por pista. Lee qué cubre tu plan: uso personal o comercial, trabajos para clientes, publicidad de pago, emisión en televisión, número de proyectos, y qué pasa con los vídeos publicados si cancelas la suscripción.

## Creative Commons
- **BY**: exige atribución.
- **NC**: no comercial (no sirve para trabajos de cliente).
- **ND**: sin obra derivada (sincronizar con vídeo puede considerarse obra derivada).
- **SA**: compartir igual.
- **CC0**: dominio público.

## Redes sociales
La biblioteca musical de las aplicaciones cubre, en general, el uso personal dentro de la plataforma. Las cuentas de empresa suelen tener una biblioteca comercial distinta y más limitada, y los anuncios de pago exigen música con licencia propia.

## Videoclips
Acuerdo escrito con el artista o su sello: quién es titular del vídeo, dónde se publica, si puedes usarlo en tu portfolio.

## Guarda las pruebas
Certificado o factura de cada licencia en la carpeta del proyecto. Las reclamaciones automáticas llegan años después.` },
  { id: 'clientes', t: 'Gestión de clientes', min: 8, b: `
## Embudo sencillo
Contacto → llamada de descubrimiento → propuesta → cierre → producción → entrega → seguimiento. Anota en qué fase está cada cliente potencial.

## Llamada de descubrimiento
Escucha más de lo que hablas. Objetivo, público, plazo, presupuesto, decisor. Resume al final y di cuándo enviarás la propuesta.

## Propuesta
Empieza por **su** objetivo, no por tu equipo. Tres opciones. Ejemplos de trabajos similares. Próximos pasos claros y fecha de validez.

## Durante el proyecto
Comunicación proactiva: avisa de hitos y de problemas antes de que pregunten. Un único canal para comentarios.

## Después
- Pide una valoración o testimonio.
- Pregunta por resultados (visualizaciones, altas): alimentan tu siguiente propuesta.
- Propón el siguiente paso: contenido mensual, otra pieza, fotos.

## Clientes recurrentes
Un acuerdo mensual (un día de rodaje y un número de piezas) da estabilidad a ambos. Para gimnasios encaja muy bien.

## Clientes difíciles
Señales: regateo agresivo, urgencia sin motivo, «es muy fácil», falta de decisor, cambios antes de empezar. Puedes subir el precio, acotar más el contrato o decir que no.` },
  { id: 'portfolio', t: 'Construcción de portfolio', min: 8, b: `
## Enseña lo que quieres que te contraten
Si quieres hacer anuncios de fitness, tu portfolio debe estar lleno de eso, aunque al principio sean proyectos propios.

## Menos y mejor
De cinco a ocho piezas excelentes. La más floja define tu nivel a ojos del cliente.

## Reel
Entre 45 y 75 segundos. Lo mejor en los primeros cinco. Solo trabajo tuyo, indicando tu papel si fue en equipo. Actualízalo cada seis o doce meses.

## Casos, no solo vídeos
Para cada proyecto: el objetivo del cliente, tu solución, el resultado. Vende mucho más que el vídeo solo.

## Proyectos propios
Rueda la pieza que nadie te ha encargado todavía: un «spec» para una marca que te guste, un mini documental. Demuestra criterio y atrae encargos de ese tipo.

## Dónde
Web propia sencilla y rápida con contacto visible; perfiles en las redes donde están tus clientes; una plataforma de vídeo con buena calidad de reproducción.

## Este viaje
Japón es una oportunidad de portfolio: planifica dos o tres piezas con intención (una nocturna, una de retrato, una de viaje con narrativa) en lugar de mil clips sueltos.` },
  { id: 'marketing', t: 'Marketing audiovisual', min: 8, b: `
## Posicionamiento
«Hago vídeo» compite con todo el mundo. «Hago contenido para gimnasios y eventos deportivos que llena clases» compite con pocos. Especializarse en un nicho que ya conoces (fitness, HYROX) es una ventaja real.

## Contenido que demuestra
Publica el proceso: antes y después de color, desglose de un plano, cómo iluminaste con un solo LED. Enseña criterio y atrae a clientes y a colegas.

## Constancia razonable
Mejor una pieza buena a la semana durante un año que diez en un mes y silencio.

## Red de contactos
Organizadores de eventos, entrenadores, marcas locales, otros creadores. La mayoría de encargos llegan por recomendación: haz fácil que te recomienden (trabajo bueno, trato fácil, plazos cumplidos).

## Medir
Para tus clientes: qué querían conseguir y si se consiguió. Para ti: de dónde vino cada encargo.

## Precios y percepción
Tu web, tus correos y tus presupuestos son parte del producto: claridad y cuidado en todo.

> [OPINION] Las «fórmulas» de algoritmo que circulan (duraciones mágicas, horas de publicación) cambian constantemente y rara vez tienen respaldo público de las plataformas. Lo estable es retención, claridad y regularidad.` },
  { id: 'fotocomercial', t: 'Fotografía comercial', min: 9, b: `
## El encargo comercial
La foto sirve a un uso: web, catálogo, cartel, redes. Pregunta formatos, proporciones, espacio para texto y dónde irá el logo antes de disparar.

## Producto
- Fondo limpio, luz grande y suave lateral o cenital, reflectores para controlar brillos.
- Trípode, ISO base, f/8–11; apilado de enfoque si hace falta nitidez total.
- Limpieza obsesiva del producto: el retoque más caro es el polvo.

## Espacios (interiorismo, gimnasios)
- Trípode, cámara nivelada, verticales rectas.
- 24 mm con cuidado: no exagerar el espacio hasta falsearlo.
- Horquillado de exposición para ventanas; luces del local encendidas o apagadas con criterio.
- Orden: retira lo que sobra antes de cada foto.

## Retrato corporativo
Fondo coherente para todo el equipo, luz repetible, misma focal y altura. Entrega rápida y uniforme.

## Lookbook y fitness
Dirección de poses con acciones; ráfagas cortas; variedad de planos; detalles de producto.

## Flujo
Disparo conectado al ordenador (tethering) cuando hay cliente presente: ve y aprueba al momento.

## Licencias
En fotografía comercial se licencia el **uso**: medios, territorio y duración. Una misma foto vale distinto en una web local que en una campaña nacional.` },
  { id: 'seguridadcopias', t: 'Seguridad y copias de material', min: 8, b: `
## En rodaje
- Tarjetas numeradas y estuche con dos estados claros (vacías boca arriba, llenas boca abajo).
- Grabación simultánea en lo irrepetible.
- Nunca borres en cámara para hacer sitio.

## Volcado
- Copia de la tarjeta completa a dos discos con una herramienta que verifique mediante suma de verificación.
- Informe de copia guardado con el proyecto.
- Formateo solo tras verificar ambas copias.

## En viaje
- Dos SSD que viajan separados; nunca ambos en la misma mochila.
- Equipaje de mano para cámara, tarjetas y discos.
- Copia en la nube de lo esencial cuando haya buena conexión.
- Cifrado de discos si contienen material de clientes.

## En casa
- 3-2-1: disco de trabajo, copia local (NAS o segundo disco) y copia fuera (nube u otro domicilio).
- Copias automáticas programadas; una copia manual que nunca se hace no existe.
- Prueba de restauración periódica: una copia que no se ha probado es una hipótesis.

## Soportes
Los SSD son rápidos y resistentes a golpes pero pueden fallar sin aviso; los discos mecánicos son baratos para archivo y sensibles a caídas. Ninguno es eterno: renueva y migra cada pocos años.

## Seguridad personal
Contraseñas únicas con gestor, verificación en dos pasos en correo, nube y redes. Tu cuenta de Instagram es un activo de negocio.` },
  { id: 'etica', t: 'Ética y uso de IA', min: 10, b: `
## Honestidad con el espectador
- En documental y periodismo, no se fabrica ni se altera lo que se presenta como real.
- En publicidad, las afirmaciones deben ser ciertas, y lo ficticio no debe engañar sobre el producto.
- Retoque corporal en fitness: decide tu límite. Corregir luz y color no es lo mismo que cambiar cuerpos; lo segundo alimenta expectativas falsas y en algunos países tiene obligaciones de etiquetado.

## Consentimiento
Personas informadas de para qué se usará su imagen. Derecho a retirarse cuando sea razonable. Cuidado especial con menores y con momentos de vulnerabilidad (un atleta desplomado en meta).

## IA generativa: qué puede hacer hoy por ti
Transcripción y subtítulos, traducción, reducción de ruido, mejora de voz, rotoscopia y máscaras, relleno y extensión de imagen, búsqueda en el material, borradores de guion, generación de imagen y vídeo.

## Riesgos y deberes
- **Transparencia**: informa al cliente de qué has generado o alterado con IA. Varias plataformas exigen etiquetar el contenido realista generado o modificado con IA, y la normativa europea de IA incluye obligaciones de transparencia para contenido sintético.
- **Derechos**: la titularidad del material generado y el uso de obras ajenas para entrenar modelos son cuestiones jurídicas aún en disputa en muchos países. Revisa las condiciones de cada herramienta antes de usarla en un encargo comercial.
- **Identidad**: no clones voces ni caras sin autorización expresa.
- **Datos**: no subas material confidencial de un cliente a servicios cuyo tratamiento de datos no conoces.
- **Verificación**: la IA se equivoca con seguridad aparente. Revisa transcripciones, datos y traducciones.

## Criterio
La herramienta no decide qué contar ni por qué. Tu valor está en el criterio, la relación con las personas y la responsabilidad sobre el resultado.` },
  { id: 'flujoreal', t: 'Flujo de trabajo de proyectos reales', min: 10, b: `
## De principio a fin: anuncio para un gimnasio
**Semana 1 · Preproducción**
1. Llamada de descubrimiento y resumen por escrito.
2. Propuesta con tres opciones; aceptación y anticipo.
3. Concepto, moodboard y guion; aprobación.
4. Visita a la localización a la hora de rodaje; fotos, medición de luz, prueba de parpadeo.
5. Shot list con prioridades; plan de rodaje; hoja de llamada; cesiones preparadas.
6. Revisión de equipo: baterías, tarjetas, firmware, limpieza, memorias de cámara.

**Día de rodaje**
7. Llegada con margen; montar; prueba de parpadeo y balance.
8. Planos A primero; fotos de continuidad; anotar desplazamientos de exposición.
9. Sonido: ambientes, efectos y tono de sala.
10. Volcado a dos discos, verificado, antes de salir o esa misma noche.

**Semana 2 · Posproducción**
11. Estructura de carpetas, proxies, sincronización.
12. Visionado completo y secuencia de selección.
13. Montaje de estructura → envío al cliente (ronda 1).
14. Ajustes → bloqueo de imagen.
15. Color: gestión, corrección, igualado, look.
16. Sonido: limpieza, diseño, música, mezcla a sonoridad objetivo.
17. Gráficos y subtítulos.
18. Máster, versiones y control de calidad en móvil → envío (ronda 2).

**Cierre**
19. Entrega final por enlace, con documentación.
20. Factura, archivo 3-2-1, petición de testimonio y de resultados.
21. Revisión propia: qué funcionó, qué cambiarías, plantillas actualizadas.

## Plantillas que conviene tener
Cuestionario de briefing, propuesta, contrato, cesión de imagen, shot list, plan de rodaje, hoja de llamada, lista de equipo, estructura de carpetas, proyecto base de Resolve con nodos y gestión de color, ajustes de exportación.

## Mejora continua
Tras cada proyecto, apunta un error y un acierto. En diez proyectos tendrás tu propio manual.` }
];
