export default {
  id: 3, title: 'S-Log3 y S-Cinetone', short: 'S-Log3', tags: ['slog'],
  goal: 'Decidir con criterio entre S-Log3 y S-Cinetone, exponer cada uno con instrumentos y convertir a Rec.709 sin perder lo que protegiste en rodaje.',
  lessons: [
    { id: '3.1', title: 'Qué es una curva logarítmica y por qué existe', mins: 9, body: `
El sensor es **lineal**: el doble de luz produce el doble de señal. Eso significa que el stop más brillante ocupa la mitad de todos los valores disponibles, el siguiente una cuarta parte, y así sucesivamente. Las sombras se quedan con unas migajas.

Una curva **logarítmica** reparte los valores de forma parecida para cada stop. No añade rango dinámico al sensor: evita que el códec de 10 bits lo tire al grabar.

> [PRINCIPIO] S-Log3 es una forma de **empaquetar** la información del sensor para grabarla. No es un «look». La imagen gris y lavada es un archivo intermedio que debe transformarse antes de verse.

## Los números de S-Log3
> [OFICIAL] Según la documentación técnica de Sony: negro en 3,5 %, gris medio (18 % de reflectancia) en 41 % y blanco de 90 % de reflectancia en 61 % de señal. Con el gris en 41 % se obtiene un rango de 1300 % por encima.

Lectura práctica: en la exposición de referencia, todo lo «normal» de la escena vive entre el 3 y el 61 % de la señal. Lo que hay por encima del 61 % es margen para altas luces: unos seis stops sobre el gris, hasta que la señal satura en torno al 94 %.

{{sim:slog}}

Abre el simulador y observa tres cosas antes de seguir:
1. La línea azul (S-Log3) sube con pendiente casi constante por stop; la gris discontinua (Rec.709) se dispara y se recorta poco más de dos stops por encima del gris.
2. Con exposición 0, el gris cae en ~41 % y el blanco en ~61 %.
3. Al mover la exposición, toda la escena se desplaza por la curva: lo que ganas por abajo lo pierdes por arriba.

## S-Gamut3.Cine: el otro 50 %
La curva (gamma) describe el brillo; el **gamut** describe qué colores caben. S-Gamut3.Cine es un espacio de color amplio pensado para etalonar con comodidad hacia Rec.709 o P3. S-Gamut3 es aún más amplio y algo más delicado de manejar.

> [OFICIAL] De fábrica, PP8 combina S-Log3 con S-Gamut3.Cine y PP9 con S-Gamut3.

> [PRACTICA] Usa S-Log3 con S-Gamut3.Cine y dile siempre al programa de edición exactamente esa pareja. Declarar un gamut distinto del grabado produce colores erróneos que luego intentarás «arreglar» a mano.
` },
    { id: '3.2', title: 'S-Cinetone: imagen terminada con margen', mins: 7, body: `
S-Cinetone no es log. Es una curva de visualización con una matriz de color derivadas de la gama de cine de Sony (VENICE), pensada para verse bien directamente.

> [OFICIAL] Sony lo describe como un aspecto con medios tonos naturales, colores suaves y altas luces agradables, orientado a reducir la posproducción. De fábrica está en PP11.

Rasgos descritos por Sony y por pruebas publicadas:
- El contraste de las altas luces se reduce gradualmente a partir de un nivel de vídeo en torno al 70 %, con una caída suave hasta la saturación.
- El negro se sitúa algo más bajo que en un Rec.709 estándar: imagen con cuerpo sin tocar.
- Tonos de piel favorecedores sin etalonar.

## Lo que no hace
- No guarda tantas altas luces como S-Log3: un contraluz duro recortará antes.
- No tolera grandes correcciones de exposición o de balance: lo que grabas es casi lo que entregas.

## Exposición de S-Cinetone
Se expone como una imagen normal: lo que ves (con una pantalla fiable y las cebras) es lo que hay.

> [PRACTICA] Referencias publicadas por profesionales, no por Sony: Alister Chapman recomienda caras en torno al 60 % y advierte de que hacia el 70 % la piel entra en la zona de compresión de altas luces y se aplana. Otros operadores hablan de piel hacia el 63 % y blancos hacia el 81 %. Tómalo como punto de partida: una cebra de rango en 60 % ±3 sobre piel clara es razonable.

> [OJO] Estos porcentajes solo valen para S-Cinetone. En S-Log3 serían una sobreexposición de varios stops.
` },
    { id: '3.3', title: 'Cuándo elegir cada uno', mins: 8, body: `
No hay perfil «mejor». Hay tres preguntas.

## 1. ¿Hay tiempo y manos para etalonar?
S-Log3 exige transformar y corregir cada plano. Si la entrega es el mismo día, o editas en el móvil, o el cliente no paga color, S-Cinetone es la opción profesional.

## 2. ¿Cuánto contraste tiene la escena?
- Contraste alto que quieres conservar (sol y sombra, ventanas en plano, neones sobre negro): S-Log3 te da varios stops más de altas luces.
- Contraste bajo o controlado (nublado, interior uniforme, estudio): S-Cinetone llega de sobra.

## 3. ¿Cuánta luz hay?
> [OFICIAL] La sensibilidad base de S-Log3 en la A7 IV es ISO 800; puede bajarse a 200–640 a costa de margen en altas luces. Sony advierte en la Guía de ayuda de que con S-Log3 el ruido es más perceptible que con otras gammas y recomienda hacer pruebas.

Con poca luz, S-Log3 tiene dos problemas: el ISO mínimo es alto y la curva deja las sombras en niveles de señal bajos que luego tendrás que levantar. Si la escena no tiene altas luces que proteger, no hay nada que ganar con log y sí ruido que perder.

| Situación | Tendencia | Por qué |
| Videoclip con etalonaje | S-Log3 | look a medida, contraste alto, tiempo de color |
| Reels de evento para hoy | S-Cinetone | sin tiempo de etalonaje |
| HYROX en nave con portones al sol | S-Log3 si etalonas; si no, S-Cinetone protegiendo piel | contraste muy alto |
| Gimnasio oscuro y uniforme | S-Cinetone | poca luz, poco contraste |
| Anuncio con luz controlada | S-Log3 | máxima flexibilidad, hay presupuesto de color |
| Entrevista corporativa rápida | S-Cinetone | piel correcta directa |
| Noche urbana con neones | depende | S-Log3 protege neones pero ensucia sombras; S-Cinetone al revés |

> [ESTETICA] «S-Log3 se ve más cine» es una preferencia, no un hecho: el aspecto final lo decide el etalonaje. Un S-Cinetone bien iluminado supera a un S-Log3 mal expuesto.

?? Vas a grabar un directo en una sala oscura con focos de colores saturados y entregar un resumen en 48 horas. ¿Qué eliges y por qué? || No hay respuesta única. Argumento S-Cinetone: poca luz, plazo corto. Argumento S-Log3: los focos saturados recortan canales de color con facilidad y 48 horas permiten un etalonaje básico. Una decisión defendible: S-Log3 si puedes exponer la piel en su nivel a ISO 3200 o menos; si no llegas, S-Cinetone.
` },
    { id: '3.4', title: 'Exponer S-Log3: tres cosas que no hay que confundir', mins: 11, body: `
Este es el punto donde más gente se pierde, porque se mezclan tres capas distintas.

| Capa | Qué es | Dónde se ve |
| **Exposición de captura** | la luz que llega al sensor (diafragma, obturación, ND, luz) y el ISO | en el archivo |
| **Valores de señal** | en qué porcentaje cae cada tono dentro de la curva S-Log3 | cebras, forma de onda |
| **Visualización** | cómo te lo enseña la pantalla (log crudo o con asistente gamma) | solo en el monitor |

> [PRINCIPIO] El asistente gamma cambia la tercera capa y nada más. Si con el asistente la imagen «se ve bien» pero las cebras dicen que la piel está en 35 %, el archivo está subexpuesto. Y al revés: un cielo que el asistente muestra blanco puede estar intacto en la señal log.

## Exposición de referencia
Gris medio en 41 %, blanco en 61 %, piel clara aproximadamente en 48–52 %.

> [PRACTICA] En la guía de exposición publicada por Sony Cine, su autor (Alister Chapman) propone medir con carta gris a 41 %, carta blanca a 61 % o, para caras, una cebra en torno al 52 %, advirtiendo de la gran variación entre pieles.

## ¿Sobreexponer? El compromiso real
Exponer por encima de la referencia desplaza toda la escena hacia arriba en la curva. Al normalizar en posproducción bajas la señal y, con ella, el ruido: sombras más limpias. El precio es exacto: **cada stop que subes es un stop de altas luces que pierdes**.

| Desplazamiento | Gris | Piel clara | Blanco 90 % | Margen sobre el gris |
| 0 (referencia) | 41 % | ~49 % | 61 % | ~6 stops |
| +1 | ~50 % | ~58 % | ~70 % | ~5 stops |
| +1,7 | ~55 % | ~64 % | ~76 % | ~4,3 stops |
| +2 | ~58 % | ~67 % | ~79 % | ~4 stops |

(Valores calculados con la fórmula de S-Log3; redondeados.)

> [DEBATIDO] «S-Log3 hay que sobreexponerlo siempre +1,7 (o +2)». Es una costumbre extendida que nació con cámaras de 8 bits y sensores más ruidosos. No es una regla: es una apuesta a favor de las sombras y en contra de las luces. En una escena de bajo contraste es una buena apuesta. En un contraluz con cielo, o con neones en plano, puede hacerte recortar justo lo que querías proteger con log.

## Método de decisión
1. **Activa la cebra de límite** (C2 en 94 %+). Ajusta la exposición hasta que solo recorten las luces que aceptas perder.
2. **Mira dónde ha quedado el sujeto** con la cebra de rango o la medición puntual.
   - Si la piel está en su nivel de referencia o por encima (hasta ~+1,5): perfecto, tienes señal limpia.
   - Si la piel queda por debajo de la referencia: la escena tiene más contraste del que puedes abarcar. Añade luz al sujeto, reduce la del fondo, o elige qué sacrificar.
3. **Anota el desplazamiento** (en la claqueta, en el nombre del clip o en una nota). En color lo vas a necesitar.
4. **Sé consistente** dentro de una misma escena: planos expuestos cada uno a su manera multiplican el trabajo de igualado.

## Configuración práctica de cebras
- **C1 (rango)**: 52 % ±2 para piel clara en referencia, o el valor de la tabla si has decidido desplazar (por ejemplo 58 % para +1).
- **C2 (límite)**: 94 %+. Hay quien prefiere 93–95; el recorte real de tu cámara lo ves grabando un foco y mirando la forma de onda.

## Límites en baja iluminación
Si a ISO 800 y máxima apertura la piel no llega a su nivel, tienes que subir ISO. En log, cada stop de ISO reduce la señal real que recibe el sensor: el ruido crece y el etalonaje lo amplifica.

> [DEBATIDO] Pruebas independientes y usuarios describen que la A7 IV en S-Log3 se limpia al llegar a ISO 3200 (segundo escalón de ganancia), de modo que ISO 3200 daría mejor resultado que 2000 o 2500. Sony no lo documenta para este modelo. Compruébalo con la prueba del módulo 1 antes de fiarte.

Cuando ni así llegas: S-Cinetone, más luz, o un objetivo más luminoso (tu 50 mm f/1.8 gana 1,3 stops al 24–70).
` },
    { id: '3.5', title: 'De S-Log3 a Rec.709 sin estropearlo', mins: 10, body: `
{{fig:flujocolor|Cada flecha es una transformación; un error en una se hereda en las siguientes.}}

## Tres formas de convertir
**1. Gestión de color del proyecto (DaVinci YRGB Color Managed).** Declaras que el material es S-Gamut3.Cine / S-Log3 y cuál es la salida (Rec.709 Gamma 2.4). Resolve transforma por ti y todas las herramientas trabajan en un espacio coherente.

**2. Color Space Transform (CST) en nodos.** Un nodo de entrada convierte S-Log3/S-Gamut3.Cine a un espacio de trabajo y un nodo de salida a Rec.709. Más control y muy explícito: ves cada paso.

**3. LUT técnica.** Una tabla que convierte S-Log3/S-Gamut3.Cine a Rec.709 (Sony publica las suyas, como las de la familia s709 o LC-709). Rápido y funciona en Premiere, pero es rígido: una LUT es una foto fija de una transformación y recorta lo que quede fuera de su rango de salida.

> [PRINCIPIO] Corrige la exposición y el balance **antes** de la conversión, sobre el material log o en lineal. Si aplicas la LUT y después intentas bajar un cielo quemado por la LUT, la información ya se perdió en ese paso. En Resolve: nodo de corrección antes del CST o de la LUT. En Premiere: ajustes básicos de Lumetri por encima de la LUT creativa, o LUT de entrada y corrección en una capa de ajuste anterior.

## Normalizar un material sobreexpuesto
Si expusiste a +1,5, el plano convertido se verá claro. Baja la exposición en lineal (rueda Offset o control Global de las ruedas HDR en Resolve; exposición en Lumetri antes de la LUT) hasta que el gris vuelva a su sitio. Verás que el ruido baja con la imagen: ese era el objetivo.

## Premiere Pro
Las versiones recientes detectan el material log de Sony y pueden transformarlo automáticamente a Rec.709 (ajuste de gestión de color del clip o de la secuencia). Comprueba qué está haciendo: si además aplicas una LUT de conversión, la imagen quedará doblemente contrastada. Las opciones exactas han cambiado entre versiones; revisa la documentación de la tuya.

## LUT técnica frente a LUT creativa
- **Técnica**: convierte de un espacio a otro. Hay una correcta para cada material.
- **Creativa**: aplica un estilo sobre una imagen ya normalizada. Hay infinitas y ninguna es obligatoria.

> [OJO] Una LUT creativa diseñada para Rec.709 aplicada directamente sobre S-Log3 da un resultado arbitrario. Y una LUT «S-Log3 a look» de un pack comercial fue construida para una exposición concreta: si la tuya es distinta, el resultado también.

## Errores de exposición típicos y cómo se ven tras convertir
- **Subexpuesto 2 stops**: al subir aparece grano grueso de color en sombras y piel, y bandas en degradados oscuros. Solución parcial: reducción de ruido, aceptar un negro más denso.
- **Sobreexpuesto con recorte**: zonas planas blancas o de color uniforme (un canal saturado) con borde duro. Sin solución; se disimula bajando el nivel de blancos y con un poco de difusión.
- **Balance equivocado**: se corrige bien en log de 10 bits si el error es moderado; un error grande con un canal recortado deja pieles sin vida.
` }
  ],
  cases: [
    { t: 'Videoclip nocturno con neones', b: 'Cantante bajo un neón rojo, calle oscura. A +1,7 «por norma», el canal rojo del neón y el reflejo en la piel recortan: la cara queda como una mancha naranja plana. **Decisión correcta:** cebra de límite sobre el neón y su reflejo en piel, exponer hasta justo antes del recorte, y levantar el ambiente con tu LED rebotado. La apuesta de sobreexponer no vale cuando lo más importante de la imagen es una alta luz saturada.' },
    { t: 'Entrevista junto a una ventana, día nublado', b: 'Contraste bajo, luz suave. Altas luces máximas a +3 sobre el gris. **Decisión:** S-Log3 a +1,5 sin ningún riesgo: señal muy limpia. O directamente S-Cinetone si la entrega es rápida: aquí el log no aporta rango que la escena necesite.' },
    { t: 'HYROX: nave oscura con portones al sol', b: 'Atletas a EV 6, portón a EV 14. Ningún perfil abarca ocho stops entre la piel y el fondo con la piel en su sitio. **Decisión:** exponer para la piel, dejar que el portón recorte y componer para minimizarlo. Elegir log no resuelve un problema que es de iluminación y encuadre.' }
  ],
  errors: [
    'Aplicar «+1,7 siempre» sin mirar qué altas luces hay en la escena.',
    'Exponer por la imagen del asistente gamma en lugar de por cebras o forma de onda.',
    'Usar niveles de cebra de S-Cinetone (60–70 %) en S-Log3.',
    'Grabar S-Log3 en escenas oscuras y sin contraste, donde solo aporta ruido.',
    'Declarar S-Gamut3 en el programa cuando se grabó S-Gamut3.Cine (o al revés).',
    'Aplicar la LUT de conversión y corregir la exposición después.',
    'Aplicar dos conversiones (automática del programa + LUT).',
    'Exponer cada plano de una escena con un desplazamiento distinto y no anotarlo.',
    'Mezclar S-Log3 y S-Cinetone en un mismo proyecto sin plan de igualado.'
  ],
  exercise: {
    title: 'Prueba de latitud de tu cámara',
    steps: [
      'Completa los tres retos del simulador de S-Log3.',
      'Al aterrizar: monta una escena con una carta gris (o un folio gris), una cara y una ventana o lámpara en plano.',
      'Graba en S-Log3 10 bits la misma escena a −2, −1, 0, +1 y +2 stops respecto a la referencia (gris en 41 %), cambiando solo el ND o la obturación.',
      'En Resolve, convierte con CST y normaliza todos los planos para que el gris coincida.',
      'Compara ruido en sombras, textura de piel y estado de las altas luces. Decide TU desplazamiento habitual para escenas de bajo y de alto contraste.',
      'Repite el plano de referencia en S-Cinetone y compara con el S-Log3 etalonado.'
    ],
    deliver: 'Una tabla propia: desplazamiento → estado de sombras / piel / altas luces, y tu criterio personal por tipo de escena.'
  },
  checklist: [
    'Perfil abierto y verificado: S-Log3 + S-Gamut3.Cine (o S-Cinetone)',
    '10 bits activados',
    'ISO 800 o superior en S-Log3 (o decisión consciente de usar 200–640)',
    'Asistente gamma activado para componer y enfocar',
    'Cebra de límite (≈94 %+) revisada: sé qué recorta',
    'Cebra de rango o puntual sobre piel/gris: sujeto en su nivel',
    'Desplazamiento de exposición decidido por contraste de la escena y anotado',
    'Balance de blancos fijo',
    'Misma estrategia de exposición en todos los planos de la escena'
  ],
  summary: [
    'S-Log3 empaqueta el rango del sensor; no es un look ni añade rango.',
    'Referencia oficial: negro 3,5 %, gris 41 %, blanco 61 %. Recorte ≈ 94 %, unos 6 stops sobre el gris.',
    'S-Cinetone es imagen casi terminada: piel en torno al 60 % (referencia de profesionales, no de Sony).',
    'Elegir perfil: tiempo de etalonaje, contraste de la escena, luz disponible.',
    'Captura, señal y visualización son capas distintas; el asistente gamma solo toca la última.',
    'Sobreexponer es cambiar altas luces por sombras limpias, stop a stop. No es una regla fija.',
    'Método: primero el límite (¿qué recorta?), después el sujeto, anotar el desplazamiento.',
    'Corregir exposición y balance antes de la conversión a Rec.709.',
    'LUT técnica convierte; LUT creativa estiliza. No se intercambian.'
  ],
  quiz: [
    { q: 'En S-Log3, según Sony, el gris medio del 18 % debe caer en…', o: ['18 %', '41 %', '50 %', '61 %'], a: 1, w: 'Gris 18 % → 41 % de señal; el 61 % corresponde al blanco de 90 % de reflectancia.', t: 'slog' },
    { q: 'Escena: cielo con nubes detrás del sujeto, a +6 stops sobre el gris. Si expones S-Log3 a +2, ¿qué ocurre con las nubes?', o: ['Nada, el log lo aguanta todo', 'Recortan: el margen sobre el gris baja de ~6 a ~4 stops', 'Ganan detalle', 'Solo se ven peor con el asistente'], a: 1, w: 'Cada stop de sobreexposición resta un stop de margen. A +2 quedan unos 4 stops sobre el gris y las nubes a +6 se pierden.', t: 'slog' },
    { q: 'Con el asistente gamma la imagen se ve correcta, pero la cebra de rango indica piel en 34 %. El archivo está…', o: ['bien: manda la pantalla', 'subexpuesto alrededor de 1,5–2 stops respecto a la referencia', 'sobreexpuesto', 'recortado'], a: 1, w: 'El asistente solo afecta a la visualización. La piel clara en referencia ronda el 48–52 %; a 34 % está muy por debajo y habrá ruido al normalizar.', t: 'slog' },
    { q: '¿Cuál es el argumento correcto para sobreexponer S-Log3 en una escena de bajo contraste?', o: ['Es obligatorio en Sony', 'Se captura más luz, y al normalizar el ruido baja; no hay altas luces en riesgo', 'Así no hace falta etalonar', 'El códec funciona solo por encima del 50 %'], a: 1, w: 'Es un intercambio: más señal a cambio de margen superior. Con bajo contraste, ese margen no se necesita.', t: 'slog' },
    { q: 'Tienes que publicar tres reels esta noche editando en el móvil. ¿Perfil?', o: ['S-Log3 con S-Gamut3', 'S-Cinetone', 'S-Log2', 'HLG para SDR'], a: 1, w: 'Sin tiempo de etalonaje, la opción profesional es una imagen terminada en cámara. S-Cinetone está diseñado para minimizar posproducción.', t: 'slog' },
    { q: 'En Resolve aplicas la LUT de conversión en el nodo 1 y bajas la exposición en el nodo 2 para recuperar un cielo. ¿Problema?', o: ['Ninguno', 'La LUT ya recortó el cielo en su salida: la corrección debe ir antes', 'El nodo 2 no puede bajar la exposición', 'Las LUT no funcionan en nodos'], a: 1, w: 'El orden importa: lo que la LUT lleva fuera del rango de salida ya no está disponible después. Corrige antes de convertir.', t: 'color' },
    { q: '¿Qué es S-Gamut3.Cine?', o: ['Una curva de contraste', 'Un espacio de color amplio que acompaña a S-Log3', 'Un look creativo', 'El nombre antiguo de S-Cinetone'], a: 1, w: 'S-Log3 define la curva de brillo; S-Gamut3.Cine, el conjunto de colores representables. Ambos deben declararse correctamente en posproducción.', t: 'slog' },
    { q: 'Gimnasio oscuro, luz uniforme, sin ventanas ni focos en plano. A ISO 800 y f/2.8 la piel queda en 30 % en S-Log3. ¿Mejor decisión?', o: ['Seguir y levantar en color', 'Subir ISO o añadir luz hasta que la piel alcance su nivel, o pasar a S-Cinetone', 'Bajar a ISO 200', 'Poner +1,7 de compensación'], a: 1, w: 'No hay altas luces que proteger, así que subexponer no compra nada. Hay que dar más señal a la piel; y sin contraste que conservar, S-Cinetone es una alternativa sólida. La compensación no actúa en M con ISO fijo.', t: 'slog' },
    { q: 'Alister Chapman sugiere caras hacia el 60 % en S-Cinetone. ¿Qué tipo de afirmación es?', o: ['Especificación oficial de Sony', 'Consejo práctico de un profesional reconocido', 'Ley física', 'Rumor de foro sin valor'], a: 1, w: 'Es una recomendación profesional útil como punto de partida, no una especificación. Otros operadores usan valores ligeramente distintos.', t: 'slog' },
    { q: 'La A7 IV, para monitorizar S-Log3, ofrece…', o: ['Carga de LUT de usuario', 'Asistente de visualización gamma', 'Modo Cine EI', 'Nada'], a: 1, w: 'La A7 IV no carga LUT de usuario ni tiene modo Cine EI; dispone del Asistente de visualización gamma (S-Log3 → 709).', t: 'slog' }
  ]
};
