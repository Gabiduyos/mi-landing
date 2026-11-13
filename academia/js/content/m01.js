export default {
  id: 1, title: 'Dominar la Sony A7 IV', short: 'Cámara', tags: ['camara'],
  goal: 'Conocer qué hace cada sistema de la cámara, dónde está en los menús y dejarla preparada para pasar de foto a vídeo en segundos.',
  lessons: [
    { id: '1.1', title: 'El sensor: resolución, rango dinámico y ruido', mins: 9, body: `
La A7 IV (ILCE-7M4) es una cámara híbrida: hace foto y vídeo con el mismo sensor, pero cada modo usa ese sensor de forma distinta. Entender esa diferencia evita la mitad de las sorpresas.

> [OFICIAL] Sensor CMOS Exmor R retroiluminado de formato completo (35,9 × 23,9 mm) con unos 33 megapíxeles efectivos y procesador BIONZ XR. ISO estándar 100–51200 (ampliable a 50–204800 en foto). Vídeo 4K hasta 30p con sobremuestreo desde 7K usando todo el ancho; 4K 50/60p con recorte Super 35. Grabación interna 10 bits 4:2:2.

## Resolución: para qué sirven 33 MP
En foto, 33 MP (7008 × 4672) permiten recortar con margen: un recorte a la mitad del ancho sigue dando más de 8 MP, suficiente para redes y web. En vídeo 4K solo se graban unos 8,3 MP por fotograma; la cámara lee más píxeles de los necesarios (7K) y los reduce, lo que da más detalle y menos ruido que leer un 4K «justo».

## Rango dinámico
Es la distancia, en stops, entre la luz más intensa que el sensor registra sin saturar y la más débil que distingue del ruido. No es un número único: depende del ISO, del modo y de cuánto ruido consideres aceptable.

> [OFICIAL] Sony anuncia más de 15 stops en S-Log3 para esta cámara.

> [PRACTICA] El laboratorio independiente CineD midió 12,9 stops (criterio señal/ruido = 2) en 4K S-Log3 a ISO 800, y un rolling shutter de 26,8 ms en 4K full frame y unos 13 ms en Super 35. Las cifras de fabricante y de laboratorio usan criterios distintos; para planificar, quédate con la medida conservadora.

## ISO y ruido
El ISO no «añade luz»: amplifica la señal que ya ha captado el sensor. Menos luz capturada significa peor relación señal/ruido, la amplifiques donde la amplifiques. Por eso el ruido se combate primero con luz (más apertura, más tiempo, más iluminación) y solo después aceptando ISO.

?? Si subexpones dos stops a ISO 800 y lo corriges en edición, ¿queda mejor o peor que exponer bien a ISO 3200? || En general queda igual o peor: en ambos casos el sensor recibió la misma luz. Exponer bien en cámara suele ser preferible porque la amplificación analógica es más limpia que estirar un archivo comprimido, y porque el códec reparte mejor sus bits.

> [DEBATIDO] Mucha gente habla de «ISO nativo dual» 800/3200 en S-Log3 para la A7 IV. Sony documenta ISO 800 como sensibilidad base de S-Log; el segundo escalón de ganancia en torno a ISO 3200 lo describen pruebas independientes y usuarios, no la documentación de esta cámara. Úsalo como hipótesis de trabajo y compruébalo con tu propia cámara (ejercicio de este módulo).

## Rolling shutter
El sensor se lee línea a línea. Si la cámara o el sujeto se mueven rápido durante esa lectura, las verticales se inclinan. Con 26,8 ms en 4K full frame, los barridos rápidos y los golpes de cámara en mano se notan. En Super 35 la lectura es aproximadamente el doble de rápida: otro motivo para valorar 4K 50p en deporte.
` },
    { id: '1.2', title: 'Foto: RAW, JPEG y modos P, A, S, M', mins: 8, body: `
## RAW frente a JPEG/HEIF
- **RAW**: datos del sensor con 14 bits por canal. El balance de blancos, el estilo y la reducción de ruido son solo etiquetas: se deciden después. Permite recuperar varios stops de sombras y algo más de un stop de altas luces.
- **JPEG / HEIF**: imagen terminada de 8 bits (HEIF, 10 bits) con el aspecto ya aplicado. Poco margen de corrección, pero lista para entregar.

> [PRACTICA] Para trabajo de cliente dispara RAW (o RAW+JPEG si necesitas entregar algo en el momento). El RAW «comprimido sin pérdida» mantiene la calidad con archivos más pequeños; con RAW sin comprimir o sin pérdida la ráfaga máxima baja de 10 a unos 6 fps según Sony, dato a tener en cuenta en deporte.

## Los modos del dial
| Modo | Tú decides | La cámara decide | Cuándo |
| P | ISO, compensación | diafragma y obturación | recuerdo rápido; poco control |
| A | diafragma | obturación (e ISO si está en AUTO) | retrato, viaje: controlas el desenfoque |
| S | obturación | diafragma (e ISO AUTO) | deporte en foto: controlas el movimiento |
| M | todo | nada (o solo ISO si está en AUTO) | vídeo siempre; foto con luz estable |
| 1, 2, 3 | — | recupera un estado guardado | cambiar de «cámara» en un segundo |

> [PRINCIPIO] En vídeo se trabaja en M porque la exposición no debe cambiar sola durante un plano: un salto de brillo a mitad de toma es inutilizable.

Un truco de foto muy usado es **M con ISO AUTO**: fijas diafragma (estética) y obturación (movimiento) y dejas que el ISO absorba los cambios de luz. La compensación de exposición sigue funcionando en ese modo.

## Compensación de exposición
En P, A, S (y M con ISO AUTO) le dice al medidor «más claro» o «más oscuro» que su propuesta. El medidor intenta llevar la escena a un gris medio: una escena dominada por blanco (nieve, pared clara) la oscurecerá de más y necesitará compensación positiva; un escenario negro con un artista iluminado, negativa.

## Diferencias entre foto y vídeo en la misma cámara
- El selector bajo el dial (Foto / Vídeo / S&Q) cambia el modo. Cada posición recuerda sus propios ajustes si lo configuras en **Dif. ajuste foto/vídeo**.
- La obturación en foto es libre; en vídeo queda atada a los fotogramas por segundo.
- El perfil de imagen afecta al vídeo y al JPEG, no al RAW.
- Los botones personalizados y el menú Fn son independientes para foto y vídeo.
` },
    { id: '1.3', title: 'Vídeo: formatos, bits, croma y fotogramas', mins: 10, body: `
## Tres familias de archivo
| Formato | Códec | Estructura | Ventaja | Coste |
| XAVC S | H.264 | Long GOP | compatible, tamaño moderado | edición exigente en 10 bits |
| XAVC HS | H.265 (HEVC) | Long GOP | misma calidad con menos datos | muy exigente al editar: proxies |
| XAVC S-I | H.264 | All-Intra | cada fotograma independiente: edición fluida | archivos enormes (hasta 600 Mb/s) |

**Long GOP** guarda algunos fotogramas completos y, entre ellos, solo las diferencias. **All-Intra** guarda todos completos. La calidad de imagen de ambos es alta; lo que cambia es el tamaño y la carga para el ordenador.

> [OFICIAL] XAVC S-I 4K exige tarjetas rápidas: SDXC V90 o CFexpress Tipo A. La ranura 1 acepta CFexpress A o SD; la ranura 2, solo SD. Consulta en la Guía de ayuda la tabla exacta de tarjeta por formato.

## 8 bits y 10 bits
8 bits son 256 niveles por canal; 10 bits, 1024. La diferencia no se ve en un plano normal sin tocar: aparece cuando estiras la imagen. Un perfil logarítmico comprime mucho rango en poca señal; al devolverle el contraste, 8 bits se rompen en bandas (cielos, paredes lisas, piel).

> [PRINCIPIO] Regla operativa: S-Log3 siempre en 10 bits. S-Cinetone aguanta 8 bits mejor, pero si la tarjeta lo permite, 10 bits es la opción segura.

## 4:2:0 y 4:2:2
{{fig:croma|La luminancia se guarda completa; el color se submuestrea.}}
El ojo distingue peor el detalle de color que el de brillo, así que el vídeo guarda menos muestras de color. 4:2:2 conserva el doble que 4:2:0: se nota en chroma key, en bordes de color saturado (neones, camisetas rojas) y en etalonajes agresivos.

## Fotogramas por segundo y el selector PAL/NTSC
- **PAL** (Europa): 25p, 50p, 100p. **NTSC** (América, Japón): 24p, 30p, 60p, 120p.
- 24/25p: cadencia «de cine». 50/60p: movimiento fluido o material para ralentizar al 50 %/40 %. 100/120p: cámara lenta marcada, solo en Full HD.

> [OJO] Cambiar entre PAL y NTSC puede exigir formatear la tarjeta. Decide el sistema antes del rodaje. En Japón, la red eléctrica es de 50 Hz al este (Tokio) y 60 Hz al oeste (Osaka, Kioto): lo verás en el módulo 4 porque afecta al parpadeo de las luces, no a tu elección de PAL o NTSC.

## El recorte de 4K 50/60p
{{fig:crop|El recorte cambia el encuadre, no la perspectiva.}}
A 50/60p en 4K la cámara solo lee la zona Super 35 del sensor. Consecuencias: tu 24 mm encuadra como un 36 mm, necesitas alejarte para el mismo plano, y la profundidad de campo para un encuadre igual es algo mayor. Planifica: si un plano va a ir a cámara lenta, el angular «real» que te queda es 36 mm.

## S&Q (cámara lenta y rápida)
Graba a una cadencia y reproduce a otra dentro de la cámara, sin audio. Ejemplo: 100 fps en una línea de 25p da cámara lenta ×4 directa. Alternativa: grabar 50p normal (con audio) y ralentizar en edición. La segunda es más flexible.
` },
    { id: '1.4', title: 'Enfoque: AF, ojos, seguimiento y manual', mins: 8, body: `
> [OFICIAL] 759 puntos de detección de fase que cubren alrededor del 94 % del sensor. AF de ojos en tiempo real para humanos, animales y aves, en foto y en vídeo. Seguimiento en tiempo real.

## Modos de enfoque (foto)
- **AF-S**: enfoca y bloquea. Sujetos quietos, paisaje.
- **AF-C**: enfoca continuamente mientras mantienes pulsado. Todo lo que se mueve, incluidas personas «quietas» a f/1.8.
- **DMF / MF**: manual, con o sin ayuda inicial.

## Área de enfoque
- **Ancho**: la cámara elige. Funciona bien con detección de ojos y un solo sujeto.
- **Zona / Puntual**: tú delimitas. Imprescindible cuando hay varias personas (HYROX, público).
- **Seguimiento**: colocas el punto sobre el sujeto, medio pulsas y la cámara lo sigue por todo el encuadre. Es la herramienta principal en deporte.

## En vídeo
Solo hay AF continuo o manual. Dos ajustes definen su «carácter»:
- **Velocidad de transición AF** (1–7): lenta para cambios de foco suaves, rápida para acción.
- **Sensibilidad de cambio de motivo** (1 bloqueado – 5 receptivo): bloqueado mantiene al sujeto aunque alguien cruce; receptivo salta enseguida a lo nuevo.

El seguimiento en vídeo se inicia tocando al sujeto en la pantalla (Seguimiento táctil).

> [PRACTICA] Videoclip con un artista: sensibilidad 1–2, velocidad 3–4. Deporte con un atleta entre público: sensibilidad 1, velocidad 5–6 y seguimiento táctil. Entrevista: ojos activados, área Ancho, sensibilidad baja.

## Enfoque manual con ayudas
- **Amplificación de enfoque**: amplía la imagen para afinar. Asígnala a un botón.
- **Resaltado (peaking)**: pinta los bordes nítidos. Orientativo: con angular y diafragma cerrado lo marca casi todo.
- **Mapa de enfoque** (vídeo): colorea lo que queda delante y detrás del plano enfocado.

?? Estás a f/1.8 con el 50 mm a 1,5 m. ¿Por qué AF-C aunque el retratado esté «quieto»? || Porque la profundidad de campo es de pocos centímetros: basta con que tú o la persona os balanceéis un poco para perder el ojo. AF-C con detección de ojos corrige continuamente.
` },
    { id: '1.5', title: 'Herramientas de exposición en cámara', mins: 9, body: `
La pantalla trasera no es un instrumento de medida: su brillo cambia con el ajuste, el ángulo y la luz ambiente. Estas cuatro herramientas sí lo son.

## Histograma
{{fig:histos|El histograma cuenta píxeles por nivel de brillo; no dice dónde están.}}
Muestra cuántos píxeles hay en cada nivel, de negro (izquierda) a blanco (derecha). Un montón pegado a un extremo indica recorte. Limitación: se calcula sobre la imagen procesada (JPEG o el perfil de vídeo), no sobre el RAW, y no indica qué objeto está recortando.

## Cebras
{{fig:zebra|Dos formas de usar las cebras.}}
Rayas sobre las zonas que alcanzan un nivel de señal. La A7 IV ofrece niveles fijos (70 a 100+) y dos personalizados:
- **C1 como rango** (por ejemplo 52 % ±2): las rayas aparecen solo en ese tono. Sirve para colocar la piel o una carta gris.
- **C2 como límite inferior** (por ejemplo 94 %+): todo lo que supere ese nivel se raya. Sirve para vigilar el recorte.

> [OJO] Los niveles de cebra se refieren a la señal de vídeo del perfil activo. Un 70 % en S-Cinetone y un 70 % en S-Log3 corresponden a luminosidades de escena completamente distintas. Lo trabajarás en el módulo 3.

## Medidor y modos de medición
El indicador M.M. (en modo M) dice cuántos stops te separas de lo que el medidor considera correcto según el modo:
- **Multi**: evalúa toda la escena por zonas. Punto de partida general.
- **Centro / Promedio**: útiles cuando quieres un comportamiento predecible.
- **Puntual**: mide un círculo pequeño. Úsalo sobre la piel o una carta gris.
- **Resaltes**: prioriza no quemar lo más brillante. Conciertos, focos.

## Asistente de visualización gamma
En S-Log3 la imagen se ve gris y lavada. El asistente muestra en pantalla una versión con contraste normal sin tocar la grabación.

> [OFICIAL] La A7 IV no permite cargar LUT de usuario para monitorizar (función presente en otras cámaras de Sony). Su equivalente es el **Asistente de visualización gamma** (S-Log3 → 709 800 %).

## Balance de blancos
- **Automático**: aceptable en foto RAW (se cambia después sin pérdida). En vídeo, evítalo.
- **Preajustes y Kelvin**: fija un valor coherente con la luz dominante (luz día ≈ 5600 K, tungsteno ≈ 3200 K).
- **Personalizado**: mides sobre una carta gris o blanca bajo la luz del sujeto. Es la opción más fiable con LED de gimnasio o luz mixta.
` },
    { id: '1.6', title: 'Personalización: Fn, botones, memorias, tarjetas y audio', mins: 10, body: `
## Perfiles de imagen: de fábrica frente a personalizados
> [OFICIAL] La cámara trae once perfiles (PP1–PP11) con valores iniciales: PP1 Movie, PP2 Still, PP3 y PP4 ITU709, PP5 Cine1, PP6 Cine2, PP7 S-Log2, PP8 S-Log3 con S-Gamut3.Cine, PP9 S-Log3 con S-Gamut3, PP10 HLG2 y PP11 S-Cinetone.

> [OJO] Todos son editables. El número no garantiza nada: en una cámara de segunda mano, prestada o que tú mismo tocaste hace meses, PP1 puede contener S-Cinetone y PP8 cualquier otra cosa. Antes de un rodaje entra en el perfil y lee Gamma y Modo de color. Nunca digas «pon PP11» sin comprobarlo.

## Menú Fn
Doce huecos para foto y doce para vídeo. Criterio: pon lo que cambias a mitad de rodaje y no tiene botón propio. Una base razonable para vídeo: perfil de imagen, balance de blancos, área de enfoque, sensibilidad de cambio de motivo, velocidad de transición AF, cebra, asistente gamma, SteadyShot, formato/fotogramas, nivel de audio, resaltado y APS-C/S35.

## Botones personalizados
C1–C4, AF-ON, AEL y la rueda se asignan por separado en foto y en vídeo. Ideas con sentido: amplificación de enfoque, alternar AF/MF, alternar APS-C/S35 (un «zoom ×1,5» inmediato), cebra, y en foto, «Recuperar ajuste personalizado mientras se mantiene» para saltar a una configuración de acción.

## Memorias 1, 2 y 3
Guardan el estado completo de disparo. Con el selector en Foto guardas memorias de foto; en Vídeo, de vídeo: en total seis «cámaras» distintas en el dial. Existen además M1–M4 en la tarjeta.

> [PRACTICA] No te propongo «las» memorias correctas: dependen de tu trabajo. En la sección **Sony A7 IV → Mis memorias** de esta app puedes anotar las tuyas reales, revisarlas y comparar con plantillas orientativas.

## Tarjetas
- **Grabación simultánea**: el mismo archivo en las dos ranuras. Es tu copia de seguridad en bodas, competiciones y cualquier cosa irrepetible. La tarjeta más lenta limita el formato.
- **Relé**: al llenarse una, sigue en la otra.
- Formatea en la cámara, nunca en el ordenador, y solo con dos copias verificadas.

## Estabilización
> [OFICIAL] Estabilización en el cuerpo de 5 ejes, hasta 5,5 stops según el estándar CIPA. En vídeo existe además el modo Activo, que suma estabilización electrónica con un ligero recorte.

En gimbal, la estabilización del cuerpo puede «pelearse» con los motores en algunos movimientos; prueba Desactivar o Estándar. A mano, Activo ayuda en planos estáticos y pasos lentos, pero no convierte el caminar en un travelling.

## Audio
- Nivel de grabación 0–31. El previo interno de la cámara es mediocre: con el DJI Mic, sube la salida del receptor y baja el nivel en cámara hasta que los picos queden en torno a −12 dB.
- Graba siempre audio de cámara aunque sea de referencia: sirve para sincronizar.
- Usa auriculares en entrevistas. Ver las barras moverse no garantiza que el sonido sea bueno.

{{sim:camera}}
` }
  ],
  cases: [
    { t: 'La cámara prestada', b: 'Un compañero te deja su A7 IV como segunda cámara para un videoclip. Le dices «las dos en PP8». En montaje, su material no encaja: su PP8 tenía el modo de color en S-Gamut3 y el nivel de negro modificado. **Lección:** antes de rodar con dos cuerpos, abre el perfil en ambos y compara Gamma, Modo de color y Nivel de negro; lo más seguro es restablecer el perfil y copiar ajustes a mano.' },
    { t: 'El angular que desapareció', b: 'Plan: seguir a un atleta de HYROX con el 24–70 a 24 mm y a 50p para ralentizar. En el pasillo, el encuadre es mucho más cerrado de lo previsto y no puedes recular. **Lección:** 4K 50p recorta ×1,5: tu 24 mm es un 36 mm. O aceptas el recorte en la planificación, o ruedas esos planos a 25p, o bajas a Full HD donde el comportamiento es distinto.' },
    { t: 'Tarjeta llena en la final', b: 'Final de una competición, XAVC S-I 4K en una V90 de 64 GB: a 250 Mb/s caben unos 30 minutos. Se llena en la penúltima serie. **Lección:** elige formato por la duración del evento, no por «el mejor». XAVC S 4K 10 bits a 100–140 Mb/s rinde más del doble de tiempo con calidad sobrada para redes.' }
  ],
  errors: [
    'Dar por hecho qué contiene un número de perfil de imagen sin abrirlo.',
    'Grabar S-Log3 en 8 bits: aparecerán bandas al etalonar.',
    'Dejar el balance de blancos en automático en vídeo.',
    'Olvidar el recorte ×1,5 de 4K 50/60p al elegir focal.',
    'Juzgar la exposición por el brillo de la pantalla en lugar de por histograma, cebras o medidor.',
    'Usar AF-S con sujetos vivos a gran apertura.',
    'Formatear la tarjeta sin tener dos copias verificadas.',
    'Dejar el nivel de audio de cámara alto con un micro externo de salida fuerte: ruido de previo o saturación.'
  ],
  exercise: {
    title: 'Auditoría de tu cámara (al aterrizar, 30 minutos)',
    steps: [
      'Abre cada perfil de imagen del 1 al 11 y anota Gamma y Modo de color reales. Compáralos con los valores de fábrica de esta lección.',
      'En vídeo, recorre el menú Fn y anota los 12 huecos actuales. Tacha los que no hayas usado en tus tres últimos rodajes.',
      'Con la cámara en trípode y la tapa puesta, graba 5 segundos en S-Log3 a ISO 800, 1600, 2500, 3200 y 6400. En el ordenador, sube la exposición de todos por igual y compara el ruido: ¿se limpia la imagen al pasar de 2500 a 3200 en TU cámara?',
      'Graba el mismo encuadre a 4K 25p y 4K 50p con el 24 mm y compara el campo de visión.',
      'Registra tus memorias 1–3 de foto y de vídeo en «Sony A7 IV → Mis memorias».'
    ],
    deliver: 'Una nota con los perfiles reales, tu menú Fn revisado y la conclusión de la prueba de ISO.'
  },
  checklist: [
    'Baterías cargadas y tarjetas formateadas en cámara (tras verificar copias)',
    'Selector PAL/NTSC decidido antes de empezar',
    'Formato, fotogramas y 10 bits comprobados',
    'Perfil de imagen abierto y verificado (Gamma + Modo de color)',
    'Balance de blancos fijado (no automático en vídeo)',
    'Cebras y asistente gamma según el perfil',
    'Modo y área de enfoque adecuados al sujeto',
    'Grabación simultánea activada si el evento es irrepetible',
    'Nivel de audio probado con auriculares',
    'Sensor y lentes limpios'
  ],
  summary: [
    '33 MP full frame; 4K hasta 30p con todo el ancho (7K sobremuestreado); 4K 50/60p recorta a Super 35 (×1,5).',
    'ISO amplifica, no añade luz: el ruido se decide por la luz que llega al sensor.',
    'Vídeo en modo M, 10 bits, balance fijo. S-Log3 siempre en 10 bits.',
    'XAVC S (compatible), HS (compacto, pesado de editar), S-I (enorme, fluido). Elige por duración y ordenador.',
    'PP1–PP11 tienen valores de fábrica pero son editables: comprueba siempre.',
    'Histograma, cebras, medidor y asistente gamma son tus instrumentos; la pantalla no.',
    'AF-C + seguimiento para lo que se mueve; en vídeo ajusta velocidad de transición y sensibilidad de cambio.',
    'Memorias 1–3 distintas para foto y vídeo: seis configuraciones en el dial.'
  ],
  quiz: [
    { q: 'Vas a grabar 4K a 50p con el 24–70 a 24 mm. ¿Qué campo de visión obtienes aproximadamente?', o: ['El de un 24 mm', 'El de un 36 mm', 'El de un 16 mm', 'El de un 48 mm'], a: 1, w: 'En 4K 50/60p la A7 IV recorta a Super 35 (factor ×1,5): 24 × 1,5 = 36 mm equivalentes.', t: 'camara' },
    { q: '¿Por qué S-Log3 debe grabarse en 10 bits?', o: ['Porque en 8 bits la cámara no lo permite', 'Porque el log comprime mucho rango y al devolver el contraste 8 bits producen bandas', 'Porque 10 bits tiene menos ruido', 'Porque 10 bits ocupa menos'], a: 1, w: 'La cámara sí deja grabar log en 8 bits; el problema es que 256 niveles no bastan cuando estiras la señal en etalonaje. El ruido no depende de la profundidad de bits.', t: 'slog' },
    { q: 'Un compañero te dice «pon PP11 y ya tienes S-Cinetone». ¿Qué haces?', o: ['Poner PP11 y rodar', 'Abrir PP11 y comprobar que Gamma es S-Cinetone', 'Usar PP1, que es lo mismo', 'Desactivar los perfiles'], a: 1, w: 'PP11 es S-Cinetone solo de fábrica. Los perfiles son editables y el número no garantiza el contenido.', t: 'camara' },
    { q: 'Subir el ISO…', o: ['aumenta la luz que llega al sensor', 'amplifica la señal ya captada, junto con su ruido', 'reduce el rango dinámico solo en foto', 'no tiene efecto en vídeo'], a: 1, w: 'La luz que llega la deciden diafragma, obturación, ND y la escena. El ISO amplifica después.', t: 'exposicion' },
    { q: '¿Qué formato elegirías para una competición de 3 horas con entrega para redes y un portátil modesto?', o: ['XAVC S-I 4K a máxima tasa', 'XAVC S 4K 10 bits a tasa media', 'XAVC HS 4K sin proxies', 'XAVC S HD 8 bits'], a: 1, w: 'S-I llenaría las tarjetas enseguida; HS sin proxies ahogaría el portátil; HD 8 bits limita recorte y color. XAVC S 10 bits equilibra duración, calidad y edición.', t: 'camara' },
    { q: 'En vídeo, el AF salta a quien cruza por delante de tu sujeto. ¿Qué ajuste lo corrige?', o: ['Velocidad de transición AF al máximo', 'Sensibilidad de cambio de motivo hacia «bloqueado»', 'Área de enfoque Ancho', 'Resaltado de enfoque'], a: 1, w: 'La sensibilidad de cambio de motivo determina cuánto tarda la cámara en abandonar al sujeto actual. La velocidad de transición solo regula lo rápido que se mueve el foco.', t: 'foco' },
    { q: 'Pones la cebra en 70 % en S-Log3 para la piel, como hacías en un perfil estándar. ¿Qué ocurre?', o: ['Nada, 70 % siempre es piel', 'Sobreexpones mucho: en S-Log3 la piel se sitúa bastante más abajo', 'Subexpones', 'La cebra no funciona en log'], a: 1, w: 'Los niveles de cebra son de señal. En S-Log3 el gris medio está en 41 % y la piel clara ronda el 48–52 % en la exposición de referencia; 70 % sería casi 3 stops de más.', t: 'slog' },
    { q: '¿Qué hace el Asistente de visualización gamma?', o: ['Graba el vídeo ya convertido a Rec.709', 'Muestra en pantalla el log con contraste normal sin alterar la grabación', 'Sube la exposición un stop', 'Aplica una LUT de usuario'], a: 1, w: 'Solo cambia la visualización. La A7 IV no carga LUT de usuario.', t: 'slog' },
    { q: 'Evento irrepetible con dos tarjetas. ¿Qué modo de grabación eliges?', o: ['Relé automático', 'Normal en la ranura 1', 'Grabación simultánea', 'Ordenar por formato'], a: 2, w: 'La simultánea escribe el mismo archivo en ambas: si una tarjeta falla, tienes la otra. El relé solo amplía capacidad.', t: 'datos' },
    { q: 'CineD midió 26,8 ms de rolling shutter en 4K full frame. ¿Qué consecuencia práctica tiene?', o: ['Más ruido en sombras', 'Verticales inclinadas en barridos y golpes rápidos', 'Menos rango dinámico', 'Parpadeo con LED'], a: 1, w: 'El sensor tarda ese tiempo en leerse de arriba abajo; lo que se mueva durante la lectura se deforma. En Super 35 baja a unos 13 ms.', t: 'camara' }
  ]
};
