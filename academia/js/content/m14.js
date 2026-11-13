export default {
  id: 14, extra: true, title: 'Tu equipo secundario: Pocket 3, Mini 2, RS 3 y filtros', short: 'Equipo DJI', tags: ['equipo'],
  goal: 'Sacar partido al resto de tu mochila y saber cuándo cada herramienta suma y cuándo estorba.',
  lessons: [
    { id: '14.1', title: 'Osmo Pocket 3: la segunda cámara', mins: 9, body: `
> [OFICIAL] Según DJI: sensor CMOS de 1 pulgada, estabilización mecánica en tres ejes, vídeo 4K hasta 120 fps, modos de color de 10 bits D-Log M y HLG, y pantalla giratoria de 2 pulgadas. Comprueba las cifras exactas y las novedades de firmware en la página de especificaciones de tu unidad.

## Para qué es mejor que la A7 IV
- **Discreción y rapidez**: sale del bolsillo estabilizada en dos segundos. En calles concurridas, templos o transporte, pasa desapercibida donde una cámara con jaula y gimbal no.
- **Movimiento**: caminar, seguir, planos a ras de suelo o por huecos estrechos.
- **Vertical nativo** girando la pantalla.
- **Time-lapse y motion-lapse** sin montar nada.
- **Cámara B** en entrevistas y eventos, en un trípode pequeño.

## Sus límites
- Sensor más pequeño: más ruido de noche y menos rango que la A7 IV. De día igualan bien; de noche, la diferencia se ve.
- Focal fija angular: poca separación de fondo.
- Menos control de profundidad de campo y de filtros.

## Ajustes para que iguale con la A7 IV
- **Modo Pro** activado: exposición manual, balance en Kelvin fijo, igual que en la A7 IV.
- **25 fps** (o los del proyecto) y obturación a 180° cuando haya luz que lo permita; con mucho sol necesitarás sus filtros ND magnéticos.
- **D-Log M 10 bits** si vas a etalonar; **Normal** si es entrega rápida.
- ISO lo más bajo posible; de noche, limita el ISO máximo.
- Nitidez y reducción de ruido en valores bajos para que no parezca «de móvil».

> [PRACTICA] D-Log M es un log suave pensado para corregirse con facilidad; no es S-Log3. Decláralo como tal en posproducción (LUT oficial de DJI o transformación equivalente) y exponlo cerca de lo normal, sin grandes desplazamientos.

## Audio
Se enlaza directamente con transmisores DJI Mic compatibles (según generación): un micro de corbata sin receptor. Comprueba la compatibilidad de tu modelo.
` },
    { id: '14.2', title: 'DJI Mini 2: aéreos con criterio', mins: 9, body: `
> [OFICIAL] Según DJI: peso inferior a 249 g, sensor de 1/2,3 pulgadas de 12 MP, vídeo 4K hasta 30 fps a 100 Mb/s y fotos en RAW (DNG). No dispone de perfil logarítmico ni de 10 bits.

## Lo que eso implica
- **8 bits y perfil normal**: poco margen de etalonaje. Hay que exponer y balancear bien en vuelo.
- **Sensor pequeño**: vuela con buena luz. Golden hour sí; noche, no.
- **Apertura fija**: la exposición se controla con ISO y obturación. Para 180° de día necesitas **filtros ND** en el dron.

## Ajustes
- Modo manual; ISO 100; obturación 1/50 a 25 fps con el ND adecuado (de ND8 a ND64 según la luz).
- Balance de blancos **fijo**: el automático cambia a mitad de plano al girar.
- Activa el histograma y el aviso de sobreexposición. Protege el cielo: en 8 bits un cielo quemado no vuelve.
- Fotos en RAW: ahí sí hay margen.

## Movimientos que funcionan
| Movimiento | Cómo | Efecto |
| Revelación | avanzar bajo o tras un obstáculo y subir | descubre el lugar |
| Retroceso con ascenso | alejarse del sujeto subiendo | cierre, escala |
| Cenital | cámara a −90°, avance lento | gráfico, abstracto |
| Órbita | giro lento alrededor de un punto | presenta un edificio o un paisaje |
| Seguimiento lateral | vuelo paralelo al sujeto | acompaña un desplazamiento |

Movimientos **lentos y continuos**, de 10–15 segundos, con un solo eje a la vez al principio. En montaje usarás tres segundos; necesitas margen.

## Normativa
> [OJO] Volar es una actividad regulada en todas partes. En la Unión Europea, incluso por debajo de 250 g hay obligaciones (registro como operador si el dron lleva cámara, zonas restringidas, no sobrevolar concentraciones de personas). En Japón, el umbral de regulación es de **100 g**: tu Mini 2 queda dentro, con registro obligatorio de la aeronave y restricciones en zonas densamente pobladas, cerca de aeropuertos, por encima de cierta altura, de noche o sobre personas, además de prohibiciones específicas en muchos parques, templos y santuarios. Los requisitos de registro e identificación para visitantes extranjeros son exigentes y han cambiado varias veces.

Mi recomendación honesta para este viaje: salvo que hayas completado el registro y tengas claras las zonas permitidas, **deja el dron en casa** o úsalo solo en lugares autorizados expresamente. Una multa o la confiscación no compensan un plano.
` },
    { id: '14.3', title: 'RS 3, jaula y DJI Mic en la práctica', mins: 9, body: `
## DJI RS 3
> [OFICIAL] Según DJI: estabilizador de tres ejes con bloqueos de eje automatizados, pantalla táctil y control del obturador de la cámara por Bluetooth con cámaras compatibles. Consulta la carga máxima y la lista de compatibilidad para tu combinación de cámara y objetivo.

### Equilibrado en cinco pasos
1. Monta la cámara **tal como rodarás**: objetivo, filtro, tapa quitada, tarjeta, batería, pantalla abierta si la usarás así.
2. **Inclinación vertical**: con el objetivo mirando al cielo, que no caiga hacia ningún lado.
3. **Inclinación profunda**: con el objetivo al frente, que se quede donde lo sueltes.
4. **Balanceo (roll)**: que el brazo quede horizontal.
5. **Panorámica**: inclinando el mango, que no gire solo.
Después, calibración automática de motores desde el menú.

El 24–70 GM cambia su centro de gravedad al hacer zoom: equilibra a la focal que vayas a usar (a menudo 24–35 mm) y no la cambies mucho, o reequilibra.

### Modos y uso
- **Seguimiento de panorámica (PF)**: el más usado; sigue tus giros horizontales y mantiene el horizonte.
- **Panorámica e inclinación (PTF)**: sigue también el cabeceo; para subir y bajar.
- **FPV**: sigue los tres ejes; planos inmersivos o inclinados.
- **Bloqueo**: la cámara mantiene la dirección aunque muevas el mango; para travellings rectos.
- Ajusta la velocidad de seguimiento y la zona muerta: lenta y suave para planos elegantes, rápida para acción.

### Con la A7 IV
SteadyShot desactivado o en Estándar (prueba cuál da menos microvibración con tu objetivo). AF continuo con seguimiento táctil. f/4 para tener margen. Y recuerda: el gimbal no corrige el sube-baja al andar; lo corrigen tus rodillas.

## Jaula y asa superior
Añaden puntos de agarre y de montaje (micro, monitor, luz). El asa superior permite planos bajos estables llevando la cámara colgada cerca del suelo. A mano, más masa es más estabilidad; a cambio, cansa.

## DJI Mic
- Un transmisor por persona; el receptor a la cámara por el cable adecuado o la zapata, según tu modelo.
- Nivel de cámara bajo y ganancia del receptor para picos de −12 dB (módulo 12).
- **Grabación interna** del transmisor siempre activada: es tu copia si hay interferencias o saturación.
- Modo estéreo o mono según quieras cada transmisor en un canal (útil para dos voces) o mezclados; si tu modelo ofrece pista de seguridad, actívala cuando solo uses un micro.
- Antiviento en exterior, siempre.
- Cárgalo la noche anterior: el estuche carga transmisores y receptor.
` },
    { id: '14.4', title: 'Filtros: ND variable y Black Diffusion 1/4', mins: 8, body: `
## ND variable
Dos polarizadores que se oscurecen al girar uno respecto al otro.

**Ventajas**: ajuste continuo, un solo filtro para muchas situaciones, rapidez.

**Problemas conocidos**:
- **Cruz o X oscura** cerca del extremo de densidad, sobre todo con angulares. Los filtros con topes limitan el recorrido para evitarla.
- **Dominante de color** (verdosa o magenta), que varía con la densidad.
- **Efecto polarizador desigual**: cielos y reflejos cambian según el ángulo; en angular el cielo puede oscurecerse a franjas.
- Pérdida leve de nitidez en modelos económicos.

**Uso correcto**:
- Averigua el rango real del tuyo (viene marcado: por ejemplo 2–5 stops o 6–9) y dónde aparece la cruz. Marca ese punto.
- Balance de blancos personalizado **con el filtro puesto**.
- Si vas a rodar una secuencia, no cambies la densidad entre planos sin motivo: cambia la dominante.
- Límpialo: un ND sucio a contraluz arruina el contraste.

## Black Diffusion 1/4
Un filtro de difusión con partículas negras: suaviza la transición de las altas luces, crea un halo alrededor de las fuentes y baja ligeramente el contraste local sin emborronar la imagen como un filtro blanco.

| Situación | Efecto | ¿Usarlo? |
| Noche con neones y farolas | halos alrededor de las luces | sí, es su terreno |
| Retrato | piel algo más amable | sí |
| Contraluz fuerte | más velo, menos contraste | depende: puede ser demasiado |
| Deporte, detalle, producto | resta definición | normalmente no |
| Dron o planos generales diurnos | apenas se nota | innecesario |

> [ESTETICA] La difusión es una decisión de textura que queda grabada: no se quita en posproducción. Si dudas, rueda una toma con y otra sin. La intensidad 1/4 es moderada; aun así, mantén coherencia: una pieza con unos planos difuminados y otros no se percibe irregular.

## Apilar filtros
ND + difusión funciona, pero cada cristal añade riesgo de reflejos internos (imágenes fantasma de las luces) y de viñeteo en angular. De noche con luces en plano, usa uno solo, el que aporte, y quita el ND.
` }
  ],
  cases: [
    { t: 'Mercado nocturno', b: 'Callejones abarrotados. La A7 IV con gimbal bloquea el paso y llama la atención. Decisión: Pocket 3 para los recorridos y la A7 IV con el 50 mm f/1.8 a mano para retratos y detalles en los puestos mejor iluminados. En color, la Pocket se iguala a la A7 IV y se reserva para planos en movimiento donde el ruido se nota menos.' },
    { t: 'Gimbal que vibraba', b: 'Microvibración en todos los planos de un día. Causa: equilibrado hecho con la tapa del objetivo puesta y sin el filtro ND; al montarlo, el conjunto quedó adelantado y los motores trabajaban forzados. Solución: equilibrar con la configuración final y recalibrar.' },
    { t: 'Aéreo que no igualaba', b: 'Plano de dron con balance automático: el color cambia durante el giro. En 8 bits, corregirlo fotograma a fotograma es inviable. Desde entonces: balance fijo y exposición manual antes de despegar.' }
  ],
  errors: [
    'Usar la Pocket 3 en automático junto a una A7 IV en manual: no igualarán.',
    'Tratar D-Log M como S-Log3 en posproducción.',
    'Volar el dron con balance automático o sin ND.',
    'Volar sin conocer la normativa local.',
    'Equilibrar el gimbal sin la configuración final de cámara.',
    'Hacer zoom en el 24–70 tras equilibrar y no reequilibrar.',
    'Olvidar la grabación interna del DJI Mic.',
    'Llevar el ND variable al extremo con angular.',
    'Usar el Black Diffusion en todo por costumbre.',
    'Apilar filtros de noche con luces en plano.'
  ],
  exercise: {
    title: 'Pon a punto la mochila',
    steps: [
      'Pocket 3: activa el modo Pro, fija 25 fps y un balance en Kelvin; graba el mismo plano en Normal y en D-Log M.',
      'Graba un plano con la A7 IV y otro con la Pocket 3 de la misma escena con el mismo balance; iguálalos en color.',
      'RS 3: cronometra un equilibrado completo con el 24–70 a 24 mm. Objetivo: menos de cinco minutos.',
      'ND variable: gira hasta que aparezca la cruz a 24 mm y marca el punto con cinta.',
      'Black Diffusion: mismo plano nocturno con y sin filtro; decide cuándo te gusta.',
      'DJI Mic: comprueba que la grabación interna está activa y dónde se guardan los archivos.'
    ],
    deliver: 'Una nota con tus ajustes base de Pocket 3, el punto límite de tu ND y tu criterio para la difusión.'
  },
  checklist: [
    'Pocket 3: modo Pro, fps del proyecto, balance fijo, perfil decidido',
    'Dron: normativa comprobada, balance fijo, ND, histograma',
    'RS 3 equilibrado con la configuración final; motores calibrados',
    'SteadyShot decidido para gimbal',
    'DJI Mic cargado, grabación interna activa, antiviento',
    'ND limpio; rango útil conocido',
    'Difusión: decisión tomada para toda la pieza',
    'Baterías de todo en equipaje de mano'
  ],
  summary: [
    'Pocket 3: discreción, movimiento y vertical; peor de noche. Modo Pro y balance fijo para igualar.',
    'D-Log M no es S-Log3: declara cada cámara con su entrada.',
    'Mini 2: 8 bits sin log; exponer y balancear en vuelo; ND; movimientos lentos.',
    'Japón regula drones desde 100 g: sin registro y zonas claras, no vueles.',
    'RS 3: equilibra con la configuración final; el sube-baja lo corrigen tus rodillas.',
    'DJI Mic: grabación interna siempre.',
    'ND variable: conoce su cruz y su dominante.',
    'Black Diffusion: textura irreversible; brilla de noche y en retrato.'
  ],
  quiz: [
    { q: 'Vas a intercalar planos de la Pocket 3 con los de la A7 IV. ¿Qué es imprescindible en la Pocket?', o: ['Dejarla en automático', 'Modo Pro con exposición manual y balance fijo en los mismos Kelvin', 'Subir la nitidez', 'Grabar a 60 fps siempre'], a: 1, w: 'Para igualar necesitas que el color y la exposición no cambien solos y partan del mismo balance.', t: 'equipo' },
    { q: 'El material D-Log M de la Pocket 3 debe interpretarse en posproducción como…', o: ['S-Log3', 'Rec.709 sin más', 'D-Log M, con la LUT o transformación de DJI', 'HLG'], a: 2, w: 'Cada curva necesita su transformación. Tratarlo como S-Log3 da contraste y color incorrectos.', t: 'equipo' },
    { q: '¿Por qué conviene balance de blancos fijo en el dron?', o: ['Ahorra batería', 'El automático puede cambiar durante el plano y en 8 bits apenas hay margen para corregirlo', 'Mejora el alcance', 'No conviene'], a: 1, w: 'Un cambio de color a mitad de un giro es casi imposible de arreglar con material de 8 bits.', t: 'equipo' },
    { q: 'Tu Mini 2 pesa menos de 250 g. En Japón…', o: ['queda exento de toda norma', 'está dentro de la regulación, cuyo umbral es de 100 g', 'solo necesita seguro', 'puede volar en parques y templos'], a: 1, w: 'El umbral japonés es de 100 g. Hay registro obligatorio y zonas restringidas; muchos recintos lo prohíben expresamente.', t: 'japon' },
    { q: 'Equilibras el RS 3 a 24 mm y después ruedas a 70 mm con el 24–70 GM. ¿Qué puede pasar?', o: ['Nada', 'El centro de gravedad se adelanta: motores forzados y vibración', 'Mejora la estabilidad', 'Cambia la exposición'], a: 1, w: 'El objetivo se alarga al hacer zoom y desplaza el peso. Hay que reequilibrar o rodar cerca de la focal de equilibrado.', t: 'equipo' },
    { q: 'Con ND variable al máximo y 24 mm aparece una X oscura. ¿Solución?', o: ['Subir ISO', 'Reducir la densidad por debajo de ese punto y compensar con diafragma u otro ND', 'Cambiar el balance', 'Usar el Black Diffusion'], a: 1, w: 'Es un efecto de la polarización cruzada en el extremo del filtro, más visible en angular. Solo desaparece alejándose de ese extremo.', t: 'equipo' },
    { q: '¿Dónde aporta más el Black Diffusion 1/4?', o: ['Fotografía de producto', 'Noche con fuentes de luz en plano y retrato', 'Aéreos de día', 'Deporte con detalle'], a: 1, w: 'Crea halo en las altas luces y suaviza la piel. En detalle y producto resta definición.', t: 'equipo' },
    { q: 'El DJI Mic sufre una interferencia de dos segundos durante una entrevista. ¿Qué te salva?', o: ['Subir la ganancia', 'La grabación interna del transmisor', 'El micro de la cámara', 'Nada'], a: 1, w: 'El transmisor graba localmente sin depender del enlace de radio. Sincronizas ese archivo por forma de onda.', t: 'audio' }
  ]
};
