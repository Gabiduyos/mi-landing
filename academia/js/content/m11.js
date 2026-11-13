export default {
  id: 11, title: 'Color profesional', short: 'Color', tags: ['color'],
  goal: 'Gestionar el color de S-Log3 en DaVinci Resolve, corregir con scopes, igualar cámaras y construir un look sin confundir corrección con estilo.',
  lessons: [
    { id: '11.1', title: 'Corrección y etalonaje: dos trabajos distintos', mins: 7, body: `
> [PRINCIPIO] **Corrección** (técnica): llevar cada plano a un estado neutro, coherente y dentro de los límites de la señal. Tiene respuestas correctas. **Etalonaje** o look (creativo): dar al conjunto un carácter. Tiene intenciones, no respuestas.

Mezclarlos es la causa de casi todos los problemas de color: quien aplica un look sobre planos sin corregir pasa horas persiguiendo diferencias entre ellos.

## Orden de trabajo
1. **Gestión de color**: decirle al programa qué es el material y hacia dónde va.
2. **Corrección primaria**: exposición, contraste, balance, saturación, plano a plano.
3. **Igualado** (matching): que los planos de una escena coincidan entre sí.
4. **Secundarias**: zonas concretas (piel, cielo, un objeto).
5. **Look**: contraste final, tinte de sombras y luces, saturación selectiva.
6. **Acabado**: grano, viñeta, nitidez, reducción de ruido.
7. **Control de salida**: niveles legales y exportación.

{{fig:nodos|El orden de los nodos refleja el orden del razonamiento.}}

## El entorno de visionado
Tu pantalla es tu instrumento, y probablemente miente.
- Pantalla calibrada si es posible; si no, conoce sus defectos comparando con otras.
- Habitación con luz tenue y constante, sin colores fuertes alrededor.
- Brillo de la pantalla moderado y fijo.
- Comprueba el resultado en un móvil: es donde se verá.

Por eso existen los **scopes**: miden la señal, no dependen de tu pantalla ni del cansancio de tus ojos.
` },
    { id: '11.2', title: 'Scopes: forma de onda, parade y vectorscopio', mins: 10, body: `
## Forma de onda (waveform)
Muestra la luminancia de la imagen de izquierda a derecha (igual que el encuadre) y de abajo (negro, 0) arriba (blanco, 100 % o 1023 en 10 bits).
- ¿Toca el suelo? Negros aplastados. ¿Toca el techo? Blancos recortados.
- La piel bien expuesta en Rec.709 suele caer entre el 50 y el 70 % según el tono; el gris medio, hacia el 40–45 %.
- A diferencia del histograma, sabes **dónde** está cada nivel en la imagen.

## RGB Parade
Tres formas de onda, una por canal. Es la herramienta de balance:
- En algo que debe ser neutro (blanco, gris, negro), los tres canales deben estar **a la misma altura**.
- Si el rojo está más alto en las luces, las luces tiran a rojo. Si el azul está más alto abajo, las sombras son azuladas.
- Permite ver si un canal recorta antes que los otros.

## Vectorscopio
{{fig:vector|El ángulo indica el tono; la distancia al centro, la saturación.}}
- Centro = sin color. Cuanto más lejos, más saturado.
- Las casillas marcan los primarios y secundarios; una traza que sale del círculo exterior supera los límites de emisión.
- **Línea de piel**: una diagonal entre amarillo y rojo sobre la que tienden a alinearse los tonos de piel humana, con independencia de lo clara u oscura que sea, porque comparten el color de la sangre bajo la piel.

> [PRACTICA] La línea de piel es una referencia muy útil y no una ley: la luz de la escena (un atardecer, un neón) desplaza legítimamente la piel. Aísla la piel con una ventana o un cualificador para verla sola en el vectorscopio.

{{sim:color}}

Con el simulador abierto, comprueba:
1. Material «S-Log3 bien expuesto» sin transformar: la forma de onda ocupa una franja estrecha en el centro. Eso es el log.
2. Activa la transformación: la franja se abre a todo el rango.
3. Carga «Dominante cálida» y mira el parade: el rojo queda por encima y el azul por debajo. Corrige con Temperatura hasta alinearlos en la carta gris.

## Niveles legales
Para entrega web en Rec.709 trabaja con negro en 0 y blanco en 100. Evita trazas clavadas en los extremos salvo en negros puros y especulares.
` },
    { id: '11.3', title: 'Gestión de color en Resolve: S-Log3 a Rec.709', mins: 10, body: `
{{fig:flujocolor}}

## Opción A: DaVinci YRGB Color Managed
En Ajustes del proyecto → Gestión de color:
- Ciencia de color: **DaVinci YRGB Color Managed**.
- Modo personalizado para controlar los campos.
- Espacio de color de entrada: **S-Gamut3.Cine / S-Log3** (Resolve suele detectarlo por los metadatos; compruébalo o asígnalo con clic derecho en los clips).
- Espacio de trabajo (timeline): **DaVinci Wide Gamut / Intermediate**, un espacio amplio diseñado para etalonar.
- Espacio de salida: **Rec.709 Gamma 2.4**.

Ventaja: todo el material se interpreta bien de entrada, y puedes mezclar cámaras (cada clip con su espacio de entrada).

## Opción B: Color Space Transform en nodos
Proyecto en DaVinci YRGB (sin gestión). En el árbol de nodos:
1. **Primer nodo, CST de entrada**: de S-Gamut3.Cine / S-Log3 a DaVinci Wide Gamut / Intermediate.
2. **Nodos intermedios**: todas tus correcciones.
3. **Último nodo, CST de salida**: de DaVinci Wide Gamut / Intermediate a Rec.709 / Gamma 2.4, con mapeo de tonos activado (DaVinci) para comprimir con suavidad las altas luces.

Ventaja: lo ves todo, decides plano a plano. Muy didáctico y habitual entre coloristas.

> [OFICIAL] Blackmagic documenta ambos flujos en el manual de DaVinci Resolve y en sus materiales de formación gratuitos. El plugin Color Space Transform está en la librería de efectos de la página Color.

## Opción C: LUT técnica
Clic derecho en el nodo → LUT → Sony → la conversión de S-Log3/S-Gamut3.Cine a Rec.709. Rápido; menos flexible. Coloca siempre las correcciones en un nodo **anterior**.

## ¿Gamma 2.4, 2.2 o Rec.709-A?
> [DEBATIDO] El estándar de referencia para vídeo en sala oscura es Rec.709 con gamma 2.4. La mayoría de la gente ve vídeo web en pantallas sRGB (~2.2) y en entornos luminosos. En macOS, además, la gestión de color del sistema hace que las exportaciones se vean distintas en QuickTime, Chrome o VLC (el conocido «cambio de gamma»). Existen varias estrategias (etiquetar como Rec.709-A, exportar con gamma 2.2…) y los coloristas no se ponen de acuerdo en una única solución. Elige una, pruébala en tus dispositivos de destino y sé constante.

## Errores de gestión que se pagan caros
- Doble transformación (gestión de proyecto + CST o LUT).
- Entrada mal declarada (S-Gamut3 por S-Gamut3.Cine, o material de la Pocket 3 tratado como S-Log3).
- Corregir después de la transformación de salida.
` },
    { id: '11.4', title: 'Primarias, curvas e igualado de planos', mins: 10, body: `
## Corrección primaria en orden
1. **Exposición**: con la rueda Offset, o con Global de las ruedas HDR, lleva el plano a su nivel (trabajando antes de la transformación de salida equivale a mover la exposición). Mira la forma de onda.
2. **Contraste**: Contraste y Pivote, o Lift y Gain: fija negro y blanco sin aplastar ni recortar.
3. **Balance**: iguala los canales en el parade sobre algo neutro. Temperatura y Tinte para el conjunto; Lift/Gamma/Gain por zonas si la dominante cambia entre sombras y luces.
4. **Saturación**: lo justo. El vectorscopio no debe salirse.

## Las ruedas
| Control | Afecta sobre todo a | Úsalo para |
| Lift | sombras (ancla en el blanco) | nivel y color de negros |
| Gamma | medios tonos | brillo general percibido |
| Gain | luces (ancla en el negro) | nivel y color de blancos |
| Offset | todo por igual | exposición y balance global |

Los tres primeros se solapan mucho. En material log o en espacios amplios, las ruedas **Log** y **HDR** dan zonas más estrechas y predecibles.

## Curvas
- **Curva personalizada**: la «S» suave (bajar un punto en sombras, subir uno en luces) es la base de casi todo contraste cinematográfico. El hombro de la curva decide cómo mueren las altas luces.
- **Tono frente a tono**: cambia un color concreto (acercar un verde amarillento a un verde más frío).
- **Tono frente a saturación**: satura o desatura un color (bajar un naranja de pared que compite con la piel).
- **Luminancia frente a saturación**: desaturar las sombras profundas y las luces extremas es un rasgo muy asociado al aspecto «de cine».

## Igualar planos (matching)
1. Elige un **plano héroe** de la escena y corrígelo bien.
2. Guarda una imagen fija de referencia (still) y actívala a pantalla partida.
3. Iguala en este orden: niveles (forma de onda), balance (parade), saturación (vectorscopio), y por último la piel.
4. Compara alternando deprisa: el ojo detecta diferencias al saltar, no al mirar fijamente.

## Igualar cámaras distintas
Tu A7 IV, la Pocket 3 y el Mini 2 tienen sensores, curvas y colores distintos.
- Graba cada una en su mejor modo plano o estándar y **declara cada entrada correctamente** (la Pocket 3 en D-Log M, el dron en su perfil).
- En rodaje: mismo balance de blancos en Kelvin en todas, y un plano de una carta de color con cada cámara bajo la misma luz.
- En color: iguala la cámara secundaria a la principal con el método anterior. La carta permite hacerlo con criterio (Resolve incluye una herramienta de igualado con carta de color).

> [PRACTICA] Las cámaras de sensor pequeño no igualarán en ruido ni en rango. Úsalas para planos donde su diferencia sea asumible (generales de día, aéreos) y evita cortar entre cámaras en el mismo plano de un rostro.
` },
    { id: '11.5', title: 'Piel, ventanas, tracking y el look final', mins: 10, body: `
## Secundarias: actuar sobre una parte
- **Cualificador (HSL)**: selecciona por tono, saturación y luminancia. Con el cuentagotas sobre la piel, afina, suaviza el borde y limpia la máscara.
- **Power Window**: una forma (círculo, lineal, curva, degradado) que limita la corrección a una zona.
- **Tracking**: la ventana sigue al sujeto. En la paleta Tracker, pulsa seguir hacia delante y hacia atrás; corrige a mano donde se pierda.
- **Magic Mask** (Studio): selección de personas u objetos por IA.

Usos habituales:
- **Cara**: ventana ovalada con borde muy suave y seguimiento; subir un cuarto o medio stop. Dirige la mirada sin que se note.
- **Viñeta**: oscurecer ligeramente los bordes para centrar la atención.
- **Cielo**: degradado para recuperar densidad.
- **Piel**: cualificador + ventana para ajustar solo su tono o suavizarla ligeramente.

## Corrección de piel
1. Aísla la piel y mírala en el vectorscopio.
2. Si se aparta de la línea de piel sin motivo (verde por LED, magenta por una mala corrección), gírala con la rueda de tono del nodo o con Tono frente a Tono.
3. Nivel: que no se aplaste ni brille en exceso; baja las altas luces de la piel si hay sudor quemado.
4. Saturación de la piel moderada: la piel sobresaturada parece naranja; la desaturada, gris.

> [PRINCIPIO] Si el look tiñe toda la imagen, la piel se va con él. Para un look con piel natural, protege la piel (excluyéndola con un cualificador invertido) o aplica el tinte por luminancia en zonas donde la piel no está.

## Construir un look: piel natural, sombras frías sutiles, contraste controlado
1. **Base corregida** e igualada.
2. **Contraste**: curva en S suave; negro ligeramente por encima de cero si quieres un negro «de película», hombro suave en las luces.
3. **Sombras frías**: con las ruedas Log o con la curva de luminancia, añade un poco de azul-cian solo en las sombras. Sutil significa que en el parade el azul de las sombras queda apenas por encima del rojo.
4. **Luces**: neutras o un punto cálidas para compensar.
5. **Piel**: comprueba en el vectorscopio que sigue en su línea. Si las sombras de la cara se han enfriado demasiado, protege la piel.
6. **Saturación**: baja la global un poco y recupera la de la piel si hace falta; desatura sombras profundas.
7. **Compara** con la versión corregida sin look y con tu referencia.

Practica este proceso en el simulador (reto G3) antes de hacerlo en Resolve.

> [ESTETICA] «Teal and orange», negros levantados, desaturación: son modas con fecha. Un look es bueno cuando sirve a la pieza y no se nota como filtro.

## LUT creativas
Una LUT de look puede ser un punto de partida. Aplícala **después** de la corrección, en su propio nodo, y regula su intensidad (ganancia de clave del nodo). Si con una LUT la piel se rompe, no fuerces: no es para ese material.

## Acabado
- **Reducción de ruido**: temporal antes que espacial; lo mínimo necesario. En exceso da piel de plástico. (En Resolve gratuito está limitada; la completa es de Studio.)
- **Grano**: une planos de distinta procedencia y disimula bandas. Sutil; recuerda que la compresión de las plataformas lo emborrona y que consume tasa de bits.
- **Nitidez**: poca, al final.

## Exportación desde color
Página Deliver. Comprueba que el espacio de salida es el previsto, niveles en automático, y exporta un máster. Vuelve a mirar el archivo exportado en el móvil y en otra pantalla.
` }
  ],
  cases: [
    { t: 'Anuncio de gimnasio con tres cámaras', b: 'A7 IV en S-Log3, Pocket 3 en D-Log M, Mini 2 en normal. Proyecto con gestión de color: cada clip con su entrada declarada. Plano héroe de la A7 IV corregido; las otras se igualan a él con pantalla partida y parade. El dron, con menos rango, se reserva para dos aéreos de día. Look único aplicado a nivel de línea de tiempo: coherencia inmediata.' },
    { t: 'Piel verde bajo LED', b: 'Box con paneles verdosos y sin balance personalizado. En el parade, el verde sobresale en medios tonos. Corrección global con Tinte hacia magenta hasta alinear la carta gris (o una pared blanca); después, piel aislada y girada a su línea. Queda bien, pero cuesta veinte minutos por escena: un balance personalizado en rodaje habría costado veinte segundos.' },
    { t: 'El look que rompía las caras', b: 'LUT «cinemática» de un pack sobre S-Log3 directamente: caras naranjas y sombras verdosas. Rehecho: CST de entrada, corrección, CST de salida, y la LUT (diseñada para Rec.709) después, al 40 % de intensidad. Mismo carácter, piel intacta.' }
  ],
  errors: [
    'Aplicar un look antes de corregir e igualar.',
    'Etalonar a ojo sin scopes, en una pantalla sin calibrar y con luz cambiante.',
    'Doble transformación de color o entrada mal declarada.',
    'Corregir después del nodo de salida.',
    'Teñir toda la imagen y perder la piel.',
    'Negros aplastados y blancos recortados por exceso de contraste.',
    'Saturación excesiva: piel naranja.',
    'Reducción de ruido agresiva.',
    'Confiar en una LUT de pack como solución universal.',
    'No comprobar la exportación en el dispositivo de destino.'
  ],
  exercise: {
    title: 'Tres prácticas de color',
    steps: [
      'Completa los tres retos del simulador de color: corrección técnica, piel natural y look de sombras frías.',
      'En el simulador, con la imagen corregida, sube «Sombras frías» al máximo sin proteger la piel y observa el vectorscopio; activa «Proteger piel» y compara.',
      'Al aterrizar, en Resolve: crea un proyecto con CST en nodos para un clip S-Log3 propio. Corrige exposición antes de la transformación de salida.',
      'Iguala dos planos de la misma escena usando pantalla partida y parade.',
      'Construye el look de siete pasos de la lección 11.5 y guárdalo como PowerGrade.'
    ],
    deliver: 'Tres retos superados y un PowerGrade propio con su árbol de nodos etiquetado.'
  },
  checklist: [
    'Gestión de color configurada; entradas declaradas por cámara',
    'Sin doble transformación',
    'Scopes visibles: forma de onda, parade, vectorscopio',
    'Plano héroe corregido por escena',
    'Planos igualados con pantalla partida',
    'Piel comprobada en el vectorscopio',
    'Look en nodos propios, tras la corrección',
    'Negros y blancos dentro de límites',
    'Ruido y grano moderados',
    'Exportación revisada en móvil y en otra pantalla'
  ],
  summary: [
    'Corrección (técnica, con respuestas) antes que look (creativo, con intención).',
    'Forma de onda = niveles; parade = balance; vectorscopio = tono y saturación.',
    'Línea de piel: referencia útil, no ley.',
    'Resolve: Color Managed, o CST entrada → correcciones → CST salida.',
    'Entrada S-Gamut3.Cine/S-Log3, trabajo DaVinci Wide Gamut, salida Rec.709 Gamma 2.4.',
    'Primarias: exposición → contraste → balance → saturación.',
    'Igualar con plano héroe, pantalla partida y scopes.',
    'Look con piel natural: tinte por luminancia y piel protegida.',
    'Las LUT creativas van después de corregir y con intensidad regulada.'
  ],
  quiz: [
    { q: 'En el RGB Parade, sobre una pared blanca, el canal azul queda claramente por debajo de rojo y verde. La imagen tiene dominante…', o: ['azul', 'amarilla/cálida', 'magenta', 'verde'], a: 1, w: 'Falta azul: el complementario, amarillo, domina. Se corrige enfriando hasta alinear los canales.', t: 'color' },
    { q: '¿Qué mide el vectorscopio?', o: ['Luminancia por columnas', 'Tono (ángulo) y saturación (distancia al centro)', 'Nitidez', 'Ruido'], a: 1, w: 'No informa de brillo. Para niveles se usa la forma de onda.', t: 'color' },
    { q: 'Flujo con CST en nodos. ¿Dónde van tus correcciones?', o: ['Antes del CST de entrada', 'Entre el CST de entrada y el de salida', 'Después del CST de salida', 'En cualquier sitio'], a: 1, w: 'Entre ambos trabajas en el espacio amplio con toda la información. Después de la salida, lo recortado ya no existe.', t: 'color' },
    { q: 'Proyecto en DaVinci YRGB Color Managed con entrada S-Log3 y, además, aplicas una LUT S-Log3 → Rec.709 a cada clip. Resultado:', o: ['Correcto', 'Doble transformación: contraste y saturación excesivos', 'Imagen plana', 'Sin cambios'], a: 1, w: 'El material ya se convierte por la gestión del proyecto; la LUT lo convierte otra vez.', t: 'color' },
    { q: '¿Cuál es el primer paso al igualar los planos de una escena?', o: ['Aplicar el look a todos', 'Corregir bien un plano héroe y usarlo de referencia', 'Añadir grano', 'Subir la saturación'], a: 1, w: 'Necesitas una referencia fiable. Luego igualas niveles, balance y saturación con pantalla partida.', t: 'color' },
    { q: 'Quieres sombras frías pero la cara se vuelve azulada en su lado oscuro. ¿Qué haces?', o: ['Subir la saturación', 'Proteger la piel con un cualificador o limitar el tinte a luminancias más bajas', 'Quitar el contraste', 'Cambiar de LUT sin más'], a: 1, w: 'El tinte por luminancia afecta a todo lo que esté en ese rango, incluida la piel en sombra. Excluirla o estrechar la zona lo resuelve.', t: 'color' },
    { q: 'La línea de piel del vectorscopio es…', o: ['una ley: toda piel debe caer exactamente sobre ella', 'una referencia hacia la que tienden los tonos de piel con luz neutra', 'un indicador de exposición', 'exclusiva de pieles claras'], a: 1, w: 'Es orientativa y común a todos los tonos de piel; una luz de color intencionada desplaza la piel legítimamente.', t: 'color' },
    { q: 'Una LUT creativa diseñada para Rec.709 debe aplicarse…', o: ['directamente sobre S-Log3', 'después de convertir y corregir, con intensidad ajustable', 'antes del CST de entrada', 'solo en la exportación'], a: 1, w: 'Espera una imagen normalizada. Sobre log da resultados arbitrarios.', t: 'color' },
    { q: 'La rueda Offset actúa…', o: ['solo en sombras', 'solo en luces', 'sobre toda la señal por igual', 'solo en la saturación'], a: 2, w: 'Desplaza todos los valores; antes de la transformación de salida funciona como un control de exposición y balance global.', t: 'color' },
    { q: 'Cambio de gamma entre reproductores en macOS: ¿qué afirmación es correcta?', o: ['Tiene una única solución oficial universal', 'Es un problema conocido con varias estrategias y sin consenso total', 'No existe', 'Se arregla subiendo la tasa de bits'], a: 1, w: 'Depende de cómo cada aplicación interpreta las etiquetas de color. Elige una estrategia, pruébala en destino y sé constante.', t: 'color' }
  ]
};
