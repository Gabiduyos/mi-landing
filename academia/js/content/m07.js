export default {
  id: 7, title: 'Iluminación', short: 'Iluminación', tags: ['iluminacion'],
  goal: 'Construir una imagen con luz: decidir dirección, calidad, proporción y color, con mucho equipo o con un LED pequeño y un rebote.',
  lessons: [
    { id: '7.1', title: 'Las cuatro propiedades de la luz', mins: 8, body: `
Toda luz se describe con cuatro propiedades. Si las controlas, iluminas; el equipo es secundario.

## 1. Intensidad
Cuánta luz llega al sujeto. Depende de la potencia y, sobre todo, de la distancia.

{{fig:cuadrado|Para fuentes pequeñas, la intensidad cae con el cuadrado de la distancia.}}

> [PRINCIPIO] Ley del cuadrado inverso: al doble de distancia llega una cuarta parte de la luz (−2 stops). Vale estrictamente para fuentes puntuales; las fuentes grandes y cercanas caen más despacio.

Dos consecuencias prácticas:
- Tu LED pequeño a 50 cm da cuatro veces más luz que a 1 m. Acercar es la forma más barata de ganar potencia.
- **Caída**: con la luz muy cerca del sujeto, el fondo recibe mucha menos luz y se oscurece. Con la luz lejos, sujeto y fondo reciben casi lo mismo. Controlas la oscuridad del fondo con la distancia de la luz.

## 2. Calidad: dura o suave
{{fig:durasuave|La dureza depende del tamaño aparente de la fuente visto desde el sujeto.}}
Lo que hace suave a una luz es su **tamaño relativo al sujeto**. El sol es enorme pero está tan lejos que es un punto: luz dura. Un cielo nublado es una fuente del tamaño del cielo: luz suave. Para suavizar tu LED hay que agrandarlo: rebotarlo en una pared o pasarlo por un difusor grande, y acercar el conjunto.

## 3. Dirección
Dónde está la luz respecto al eje cámara–sujeto. Frontal aplana; lateral da volumen y textura; contra separa y dibuja el contorno; cenital marca cuencas; desde abajo resulta antinatural.

## 4. Color
Temperatura (cálido–frío), tinte (verde–magenta) y calidad espectral.

> [PRINCIPIO] **CRI** y **TLCI** miden la fidelidad con que una fuente reproduce los colores (máximo 100). CRI se diseñó para el ojo humano; TLCI, para cámaras de televisión. Por encima de 95 la piel se reproduce bien; fuentes por debajo de 90 pueden dejar la piel apagada o con dominantes que el balance no arregla, porque al espectro le faltan colores. Son índices orientativos: dos luces con el mismo CRI pueden no coincidir entre sí.
` },
    { id: '7.2', title: 'Principal, relleno, contra y fondo', mins: 9, body: `
{{fig:trespuntos|El esquema de tres puntos es un vocabulario, no una obligación.}}

- **Principal (key)**: la luz que define la forma del sujeto y la dirección de las sombras. Es la primera que colocas.
- **Relleno (fill)**: controla lo oscuras que son las sombras que crea la principal. No tiene por qué ser una lámpara: un reflector, una pared blanca o el propio ambiente rellenan.
- **Contra / separación**: desde atrás, dibuja un borde de luz en pelo y hombros y despega al sujeto del fondo. Si viene muy lateral-trasera y roza la mejilla se suele llamar *kicker*.
- **Luz de fondo**: ilumina el decorado, no al sujeto. Decide el brillo y el color de lo que hay detrás.

## Proporción (ratio) de contraste
La relación entre el lado iluminado y el lado en sombra de la cara.

| Diferencia | Proporción | Sensación |
| 1 stop | 2:1 | limpio, comercial, belleza |
| 2 stops | 4:1 | retrato con volumen, corporativo con carácter |
| 3 stops | 8:1 | dramático, videoclip, cine negro |
| 4+ stops | 16:1 o más | sombra casi negra, misterio |

> [ESTETICA] No hay proporción correcta. Fitness y deporte suelen favorecer el contraste alto (músculo y textura); belleza y corporativo, el bajo.

## Relleno negativo
Cuando el ambiente rellena demasiado (sala blanca, día nublado), en lugar de añadir luz se **quita**: una tela o panel negro junto al lado de sombra absorbe el rebote y recupera el contraste.

## Orden de trabajo
1. Apaga todo y mira qué hay.
2. Coloca la principal y juzga solo esa.
3. ¿Sombras demasiado densas? Añade relleno poco a poco.
4. ¿Se funde con el fondo? Añade contra o ilumina el fondo.
5. Ajusta la exposición del fondo de forma independiente.

{{sim:lighting}}
` },
    { id: '7.3', title: 'Esquemas de retrato y control del fondo', mins: 8, body: `
## Posición de la principal
| Esquema | Posición | Rasgo | Uso |
| Frontal / mariposa | sobre el eje de cámara, alta | sombra pequeña bajo la nariz | belleza, simetría |
| Loop | ~30° lateral, algo alta | pequeña sombra de la nariz hacia la mejilla | retrato versátil |
| Rembrandt | ~45° lateral y alta | triángulo de luz en la mejilla de sombra | carácter, drama clásico |
| Lateral (split) | 90° | media cara en sombra | dramático, deportivo |
| Contra con relleno | detrás, 135°+ | contorno luminoso, cara por relleno | videoclip, atmósfera |

## Lado ancho y lado corto
Con la cara girada tres cuartos, puedes iluminar el lado que da a la cámara (**ancho**: la cara parece más ancha y plana) o el que queda más lejos (**corto**: más volumen, más sombra hacia cámara). El lado corto es el recurso más repetido del retrato cinematográfico.

> [PRACTICA] Receta de partida para retrato cinematográfico con poco equipo: sujeto separado 2–3 m del fondo; principal suave y grande a 45° por el lado corto, algo por encima de los ojos; sin relleno o con un rebote lejano; una contra pequeña por el lado opuesto; fondo uno o dos stops por debajo de la piel, con algún punto de luz práctica.

## Exposición del fondo
El fondo se ilumina y se expone aparte. Tres herramientas:
- **Distancia sujeto–fondo**: cuanto más separas, menos le llega tu principal y más se desenfoca.
- **Caída de la luz**: principal muy cerca del sujeto = fondo oscuro.
- **Banderas**: cualquier cosa opaca que corte la luz antes de que llegue al fondo.

## Luces prácticas
Lámparas que aparecen en plano (una lámpara de mesa, un neón, una pantalla). Justifican la luz de la escena y añaden profundidad. Una práctica al fondo, desenfocada, convierte una pared plana en un decorado.

## Sombras bajo control
- Sombra del sujeto sobre el fondo: sepáralo de la pared o sube la luz.
- Sombras dobles: dos luces duras de fuerza parecida; baja una o suavízala.
- Sombra de la nariz que cruza el labio: la principal está demasiado lateral o baja.
` },
    { id: '7.4', title: 'Modificadores, rebotes y luz natural', mins: 9, body: `
## Modificadores
| Herramienta | Qué hace | Versión improvisada |
| Difusor (softbox, tela, marco) | agranda la fuente: suaviza | cortina blanca, papel vegetal, sábana |
| Reflector blanco | relleno suave | cartón pluma, pared, camiseta blanca |
| Reflector plateado / dorado | relleno fuerte / cálido | papel de aluminio arrugado |
| Bandera / negro | corta luz o resta relleno | cartón negro, chaqueta oscura |
| Rejilla (grid) | suave pero direccional: no se derrama | — |
| Gel CTO / CTB | calienta / enfría una fuente | — |
| Viseras | recortan el haz | cartón y cinta |

> [PRINCIPIO] Difundir y rebotar cuesta luz: una tela de difusión puede quitar entre uno y dos stops, y un rebote en pared, dos o más. Por eso las luces suaves necesitan potencia o cercanía.

## Tu LED Neewer pequeño: qué puede hacer
- **Contra o kicker** a 1–1,5 m: basta poca potencia para dibujar un borde.
- **Principal rebotada** en pared o techo blanco cercanos, para planos cortos.
- **Relleno de ojos** de frente a muy baja potencia.
- **Luz práctica o de acento** sobre el fondo, con color si tu modelo es RGB.
- Lo que no puede: competir con el sol, iluminar una sala, ser principal suave a tres metros.

## Luz natural modificada
- **Ventana**: es tu softbox gratuita. Sujeto cerca = luz suave y caída rápida; lejos = más dura y uniforme. Visillo para difundir sol directo.
- **Sol + difusor** sobre el sujeto: convierte el mediodía en luz de estudio.
- **Sol de contra + reflector**: el sol hace de contra y el reflector devuelve luz a la cara.
- **Negativo en nublado**: un negro a un lado crea la sombra que falta.

## Gimnasios
- Las luminarias del techo son tu contra y tu ambiente: colócate para aprovecharlas.
- Añade una fuente lateral baja para modelar músculo: la luz rasante revela textura; la frontal la borra.
- El sudor y el magnesio se ven con contraluz.
- Apaga líneas de luz por zonas si te dejan: un gimnasio con media sala a oscuras tiene más profundidad.
` },
    { id: '7.5', title: 'Videoclips, color y seguridad eléctrica', mins: 9, body: `
## Iluminar un videoclip con poco
Un videoclip tolera y agradece la estilización: contraste alto, color saturado, luces en plano, humo.
- **Contra fuerte + relleno mínimo**: silueta con borde, cara leída por un rebote. Barato y efectivo.
- **Contraste de color**: principal cálida y contra fría (o al revés), o dos colores complementarios. Separa planos sin necesidad de potencia.
- **Luces prácticas**: neones, tubos LED, faros de coche, pantallas, bengalas. La localización ilumina por ti.
- **Atmósfera**: una máquina de humo o neblina hace visibles los haces y suaviza el fondo. Comprueba detectores de incendio y permisos.
- **Movimiento de luz**: una luz que pasa, parpadea o gira añade ritmo.

> [PRACTICA] Con cámara a 3200 K, tu LED a 3200 K se ve neutro y cualquier luz día del entorno (ventana, pantallas) se vuelve azul: obtienes separación cálido–frío sin geles. Pruébalo en el reto D3 del simulador.

## Exponer con luces de color
Un LED rojo o azul saturado recorta su canal mucho antes de que la luminancia parezca alta. Expón por debajo, vigila la piel y evita que el color puro sea la única luz de la cara salvo que busques ese efecto.

## Seguridad eléctrica
> [OJO] La seguridad no es opcional y es responsabilidad de quien coloca la luz.

- **Carga**: suma los vatios de lo que enchufas a un mismo circuito. En España, un circuito doméstico de 16 A a 230 V admite unos 3600 W; en Japón la tensión es de 100 V y los circuitos habituales de 15–20 A admiten solo 1500–2000 W. Los LED consumen poco, pero un calefactor o una máquina de humo en el mismo circuito puede hacer saltar la protección.
- **Tensión y enchufes en Japón**: 100 V y clavijas de tipo A (dos patillas planas). Comprueba que tus cargadores y fuentes indican 100–240 V. Lleva adaptador de clavija; no necesitas transformador si el equipo es multivoltaje.
- **Cables**: desenrolla por completo los alargadores con cargas altas (enrollados se calientan), fíjalos con cinta donde pase gente y no cruces puertas sin proteger.
- **Trípodes de luz**: pata hacia el peso, saco de arena o contrapeso, nunca extendidos al máximo con gente alrededor.
- **Calor**: las luces de tungsteno y algunos LED potentes queman; geles y difusores, a distancia.
- **Agua**: nada de equipos a red cerca de duchas, piscinas o lluvia sin protección adecuada. Usa baterías.
- **Baterías de litio**: en avión, en cabina y nunca facturadas; protege los contactos. Consulta los límites de vatios-hora de tu aerolínea.
- **Estrobos y destellos**: avisa siempre; pueden afectar a personas con epilepsia fotosensible.
` }
  ],
  cases: [
    { t: 'Entrevista en un despacho blanco', b: 'Todo rebota: la cara queda plana. En lugar de añadir luces, se apagan los fluorescentes, se lleva al entrevistado a 1 m de la ventana (principal lateral) y se coloca una tela negra al otro lado (relleno negativo). Una lámpara de mesa encendida al fondo. Cero vatios añadidos, imagen con volumen.' },
    { t: 'Atleta con una sola luz', b: 'Box oscuro, un LED pequeño. Se coloca detrás y a un lado del atleta, a 1,5 m, como contra; la cara se lee con el rebote del suelo y una luminaria lejana. Se añade magnesio al aire. El resultado es más potente que usar el LED de frente, que habría aplanado el músculo e iluminado el fondo.' },
    { t: 'Playback bajo un rótulo', b: 'El neón rosa es la principal lateral. Cámara a 4300 K. El LED, a 3200 K y mínima potencia, rellena los ojos desde el eje de cámara; un segundo punto de luz lo da un escaparate al fondo. Tres «luces», una sola propia.' }
  ],
  errors: [
    'Luz frontal desde la cámara como principal: imagen plana.',
    'Encender todas las luces disponibles en lugar de decidir.',
    'Sujeto pegado a la pared: sombra proyectada y fondo imposible de controlar.',
    'Creer que una luz es suave por llevar un difusor pequeño a tres metros.',
    'Rellenar tanto que desaparece el volumen.',
    'Mezclar temperaturas sin intención.',
    'Olvidar el fondo: bien iluminado el sujeto, decorado muerto.',
    'Trípodes de luz sin lastre y cables sin fijar.',
    'Enchufar en Japón equipos que no son multivoltaje.'
  ],
  exercise: {
    title: 'Una cara, cinco luces',
    steps: [
      'Completa los tres retos del simulador de iluminación.',
      'En el simulador, con solo la principal: recorre 0°, 30°, 45°, 90° y 135° y anota el contraste y el esquema en cada posición.',
      'Fija la principal a 45° y acerca y aleja la luz: observa cómo cambia la intensidad. Explica por qué en un set real también cambiaría la suavidad.',
      'Al aterrizar: con el LED del móvil o tu Neewer y un folio blanco como reflector, fotografía un objeto o tu mano con luz frontal, lateral, contra, lateral con relleno y lateral con relleno negativo.',
      'Coloca el LED a 30 cm y a 1,2 m del sujeto con la misma exposición en la cara y compara el brillo del fondo.'
    ],
    deliver: 'Cinco fotos etiquetadas y una frase sobre qué cambia en cada una.'
  },
  checklist: [
    'Luces existentes revisadas; apagadas las que estorban',
    'Principal colocada primero y juzgada sola',
    'Proporción de contraste decidida (relleno o negativo)',
    'Separación del fondo: contra, color o distancia',
    'Fondo expuesto aparte; alguna luz práctica',
    'Temperaturas de color coherentes o contrastadas a propósito',
    'Prueba de parpadeo con todas las fuentes encendidas',
    'Cables fijados, trípodes lastrados, cargas por circuito comprobadas',
    'Baterías cargadas y transportadas con seguridad'
  ],
  summary: [
    'Cuatro propiedades: intensidad, calidad, dirección y color.',
    'Doble distancia, un cuarto de luz; luz cercana = fondo oscuro.',
    'Suave = fuente grande respecto al sujeto. Difundir y rebotar cuesta stops.',
    'Principal define, relleno controla sombras, contra separa, fondo se expone aparte.',
    'Proporciones: 2:1 limpio, 4:1 con volumen, 8:1 dramático.',
    'Relleno negativo: quitar luz también es iluminar.',
    'Un LED pequeño rinde como contra, rebote cercano o acento.',
    'Japón: 100 V, clavija tipo A, circuitos de menos potencia. Seguridad primero.'
  ],
  quiz: [
    { q: 'Alejas una luz pequeña de 1 m a 2 m del sujeto. La luz que recibe…', o: ['se reduce a la mitad', 'se reduce a una cuarta parte (−2 stops)', 'no cambia', 'se reduce a un octavo'], a: 1, w: 'Cuadrado inverso: doble distancia, una cuarta parte de la intensidad.', t: 'iluminacion' },
    { q: '¿Qué hace que una luz sea suave?', o: ['Su baja potencia', 'Su temperatura de color', 'Su tamaño aparente respecto al sujeto', 'Su marca'], a: 2, w: 'Una fuente grande vista desde el sujeto envuelve y produce transiciones graduales. Potencia y color no influyen en la dureza.', t: 'iluminacion' },
    { q: 'Quieres el fondo más oscuro sin cambiar la exposición de la cara ni mover al sujeto. ¿Qué haces?', o: ['Alejar la principal y subir su potencia', 'Acercar la principal al sujeto y bajar su potencia', 'Subir el ISO', 'Añadir relleno'], a: 1, w: 'Con la luz cerca, la caída entre el sujeto y el fondo es mucho mayor: el fondo recibe proporcionalmente menos.', t: 'iluminacion' },
    { q: 'Una proporción principal:relleno que deja el lado de sombra 3 stops por debajo se percibe como…', o: ['plana', 'limpia y comercial', 'dramática', 'sobreexpuesta'], a: 2, w: 'Tres stops (8:1) es un contraste alto, propio de videoclip o drama.', t: 'iluminacion' },
    { q: 'Sala blanca: la cara queda plana aunque solo usas la ventana lateral. ¿Solución más eficaz?', o: ['Añadir un relleno', 'Colocar un negro en el lado de sombra', 'Subir la exposición', 'Usar flash frontal'], a: 1, w: 'El problema es el exceso de rebote. El relleno negativo lo absorbe y devuelve el contraste.', t: 'iluminacion' },
    { q: 'Un LED con CRI 80 ilumina la piel. ¿Qué puedes esperar?', o: ['Reproducción perfecta', 'Colores de piel menos fieles que el balance no corrige del todo', 'Más potencia', 'Luz más suave'], a: 1, w: 'A un espectro pobre le faltan longitudes de onda; el balance desplaza el conjunto pero no puede crear el color que no se emitió.', t: 'iluminacion' },
    { q: 'En Japón vas a enchufar tu cargador. ¿Qué debes comprobar?', o: ['Que sea de 230 V exclusivamente', 'Que admita 100–240 V y llevar adaptador de clavija tipo A', 'Nada', 'Que tenga toma de tierra obligatoria'], a: 1, w: 'Japón usa 100 V y clavijas de tipo A. La mayoría de cargadores modernos son multivoltaje, pero hay que leer la etiqueta.', t: 'seguridad' },
    { q: 'Con un único LED pequeño en un box oscuro, ¿qué posición suele dar más resultado para un atleta?', o: ['Frontal sobre la cámara', 'Detrás y lateral, como contra', 'En el suelo apuntando al techo lejano', 'Apagado'], a: 1, w: 'Como contra dibuja el contorno, revela sudor y magnesio y no aplana el músculo; de frente consumirías su poca potencia en una luz plana.', t: 'iluminacion' },
    { q: 'Iluminación «por el lado corto» significa…', o: ['iluminar el lado de la cara más cercano a cámara', 'iluminar el lado de la cara más alejado de cámara', 'usar una luz pequeña', 'iluminar desde abajo'], a: 1, w: 'El lado corto es el que se ve menos por el giro de la cara; iluminarlo deja la sombra hacia cámara y da volumen.', t: 'iluminacion' }
  ]
};
