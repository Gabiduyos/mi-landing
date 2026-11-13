export default {
  id: 2, title: 'Exposición profesional', short: 'Exposición', tags: ['exposicion'],
  goal: 'Pensar en stops, decidir qué parámetro mover en cada situación y comprobar la exposición con instrumentos en lugar de a ojo.',
  lessons: [
    { id: '2.1', title: 'Stops y EV: el idioma de la luz', mins: 8, body: `
Un **stop** (paso) es duplicar o reducir a la mitad la cantidad de luz. Todo en exposición se mide así, y por eso los parámetros son intercambiables: un stop de diafragma equivale a un stop de obturación, de ISO o de filtro.

{{fig:stops|Las tres escalas avanzan en stops: cada casilla duplica la luz de la anterior.}}

## Las tres escalas
- **Diafragma (f/)**: f/1.4 · 2 · 2.8 · 4 · 5.6 · 8 · 11 · 16. Cada salto multiplica por 1,4 el número y divide por dos la luz. Número pequeño = mucha luz.
- **Obturación**: 1/25 · 1/50 · 1/100 · 1/200 · 1/400… Cada salto a la mitad de tiempo es un stop menos.
- **ISO**: 100 · 200 · 400 · 800 · 1600… Cada duplicación es un stop más de amplificación.

?? Estás a f/4, 1/50, ISO 400 y quieres pasar a f/2.8 sin cambiar el brillo ni la obturación. ¿Qué haces con el ISO? || Bajarlo a 200. Abrir de f/4 a f/2.8 es +1 stop; compensas con −1 stop de ISO.

## EV: un número para la luz de la escena
El valor de exposición (EV, referido a ISO 100) resume cuánta luz hay. Cada unidad es un stop.

| EV 100 | Situación típica (orientativa) |
| 15–16 | sol directo, mediodía despejado |
| 12–13 | cielo cubierto luminoso; sombra abierta en día soleado |
| 9–11 | atardecer, golden hour avanzada |
| 7–8 | interior muy iluminado junto a ventanal; pabellón deportivo bueno |
| 5–6 | interior doméstico; gimnasio corriente |
| 3–4 | calle de noche con farolas y escaparates |
| 0–2 | calle poco iluminada, luz de luna llena en torno a −2 |

> [PRINCIPIO] Regla «Sunny 16»: a pleno sol, con f/16 la obturación correcta es aproximadamente 1/ISO (f/16, 1/100, ISO 100). Es una comprobación mental rápida, no un sustituto del medidor.

Los valores de la tabla son aproximados y varían con la hora, la latitud y la escena. Sirven para anticipar: entre un mediodía (EV 15) y un gimnasio (EV 6) hay **nueve stops**, es decir, 512 veces menos luz.
` },
    { id: '2.2', title: 'El triángulo: cada parámetro tiene un precio', mins: 9, body: `
{{fig:triangulo|Cada lado cambia la exposición y, a la vez, la estética.}}

| Parámetro | Efecto de exposición | Efecto estético | Límite práctico |
| Diafragma | más abierto = más luz | menos profundidad de campo, más desenfoque | la apertura máxima del objetivo; nitidez y foco crítico |
| Obturación | más lenta = más luz | más desenfoque de movimiento | en vídeo, atada a los fps; en foto, trepidación |
| ISO | más alto = imagen más clara | más ruido, menos rango dinámico | el ruido que acepte el encargo |
| ND | resta luz | ninguno (idealmente) | calidad del filtro, viñeteo en cruz en ND variables |

## Orden de decisiones en vídeo
1. **Fotogramas por segundo**: lo decide el uso (25p normal, 50p para ralentizar).
2. **Obturación**: sale de los fps (regla de 180°: 1/50 a 25p, 1/100 a 50p) y de la frecuencia de la luz artificial.
3. **Diafragma**: lo decide la estética (cuánto desenfoque) y lo que tolere el foco.
4. **ISO**: el base del perfil si hay luz; sube solo cuando lo demás está agotado.
5. **ND**: si aún sobra luz, es lo único que queda sin tocar la estética.

> [PRINCIPIO] En vídeo, la obturación casi no es una variable de exposición. Por eso el ND es imprescindible en exteriores y el ISO o la luz añadida lo son en interiores.

## Orden de decisiones en foto
En foto la obturación es libre, así que la pregunta es: ¿qué es innegociable? En deporte, congelar (obturación primero). En retrato, el desenfoque (diafragma primero). En paisaje con trípode, el ISO base (calidad primero).

?? Mediodía, 25p, quieres f/2.8 con tu 24–70 en S-Log3 (ISO 800). ¿Cuántos stops de ND necesitas aproximadamente? || EV 15 de escena. f/2.8 a 1/50 equivale a EV ≈ 8,6 a ISO 100; con ISO 800 (3 stops) baja a 5,6. Faltan unos 9,4 stops. Un ND variable típico (2–5 stops, o hasta 8–9 los de doble rango) puede no bastar: tendrás que cerrar diafragma o usar un ND más fuerte. Por eso conviene saber el rango real de tu filtro.

{{sim:exposure}}
` },
    { id: '2.3', title: 'Rango dinámico, altas luces y sombras', mins: 8, body: `
La escena tiene su propio rango (de la sombra más oscura a la luz más intensa) y la cámara el suyo. Cuando el de la escena es mayor, tienes que **elegir qué sacrificar**.

## Altas luces
Cuando un fotosito se llena, deja de contar: se **recorta**. Lo recortado no tiene detalle ni color y no se recupera, porque no hay información. Una zona recortada grande y con borde brusco delata el vídeo «digital».

No todo recorte es un error:
- **Especulares** (reflejo del sol en un cromado, una bombilla): es normal que recorten.
- **Difusas con detalle** (piel, nubes, una camiseta blanca, la pared tras la ventana): si recortan, se nota.

## Sombras
En las sombras la información no desaparece de golpe: se hunde en el ruido. Puedes subirlas, pero subes también el ruido y, en vídeo comprimido, los artefactos del códec.

> [PRINCIPIO] Asimetría fundamental: la alta luz recortada es irrecuperable; la sombra subexpuesta es recuperable con un coste. De ahí sale la regla de proteger las altas luces que importan y dar a las sombras toda la luz posible sin romper eso.

## Recuperación real: foto frente a vídeo
- **RAW de foto**: 14 bits y sin revelado. Recuperas con facilidad 2–3 stops de sombra a ISO bajo y en torno a 1 stop de luces (lo que el JPEG mostraba quemado a veces existe en el RAW).
- **Vídeo 10 bits**: el aspecto ya está «horneado» en la curva. El margen es el que te da el perfil: amplio en S-Log3, reducido en S-Cinetone, mínimo en perfiles estándar.

## Subexponer o sobreexponer
- **Subexponer** protege luces y ensucia sombras y medios tonos (incluida la piel).
- **Sobreexponer** limpia sombras y arriesga luces.

La decisión depende de dónde está tu sujeto y de qué altas luces te importan. Un retrato a contraluz con el sol en plano no se resuelve con exposición: se resuelve con luz de relleno, moviendo al sujeto o aceptando una pérdida.
` },
    { id: '2.4', title: 'Medir: histograma, cebras, puntual y matricial', mins: 9, body: `
## Histograma: lectura práctica
{{fig:histos}}
- Pico pegado a la derecha: algo recorta. Pregúntate qué es y si importa.
- Hueco grande a la derecha en una escena con blancos: probablemente subexpuesto.
- No existe la forma «correcta»: una escena nocturna tiene un histograma cargado a la izquierda y está bien expuesta.

## Cebras: el histograma con mapa
La cebra te dice **dónde** está el nivel que vigilas. Dos usos, que puedes alternar con un botón:
- Límite alto para ver qué se quema.
- Rango para colocar un tono (piel o carta gris) en su nivel.

## Medición puntual sobre piel o gris
El medidor siempre propone llevar lo que mide a un gris medio. Por tanto:
- Mides una **carta gris 18 %**: el medidor en 0 es la exposición de referencia.
- Mides **piel clara**: está aproximadamente un stop por encima del gris, así que el medidor debe marcar alrededor de +1.
- Mides **piel oscura**: puede estar entre 0 y −1 respecto al gris.

> [PRACTICA] Los niveles de piel son rangos, no constantes. La piel varía mucho entre personas y con el maquillaje, el sudor y el ángulo de la luz. Usa la referencia para empezar y decide mirando la imagen.

## Medición matricial (Multi)
Analiza toda la escena y aplica su criterio, incluida la prioridad a caras. Es rápida y suele acertar en escenas normales. Falla de forma previsible cuando el fondo domina: contraluces (subexpone al sujeto), escenarios oscuros (sobreexpone al artista), nieve o paredes blancas (subexpone todo).

## Método en tres pasos para cualquier escena
1. **Límite**: cebra alta activada. ¿Qué recorta? ¿Importa?
2. **Sujeto**: medición puntual o cebra de rango sobre la piel o la carta gris. ¿Está en su nivel?
3. **Conflicto**: si proteger el límite hunde al sujeto, la exposición ya no lo arregla: añade luz al sujeto, quita luz al fondo, cambia el encuadre o elige conscientemente qué perder.

## Contraluz
Es el conflicto típico. Opciones, de más a menos control: rellenar al sujeto (reflector, LED), girar para que el fondo sea más oscuro, exponer para la piel y dejar que el cielo se vaya, exponer para el cielo y buscar silueta. Las cuatro son válidas si son una decisión.
` },
    { id: '2.5', title: 'ND, ruido y decisiones límite', mins: 8, body: `
## Filtro ND
Un filtro de densidad neutra es «gafas de sol» para el objetivo. Se nombra por factor (ND8 = 3 stops, ND64 = 6 stops) o por stops.

| ND | Stops | Uso típico en vídeo a 1/50 |
| ND4 | 2 | nublado, f/4–5.6 |
| ND8 | 3 | nublado luminoso, f/2.8 |
| ND64 | 6 | sol, f/4 con S-Cinetone |
| ND1000 | 10 | sol, f/2.8 con S-Log3; larga exposición en foto |

**ND variable**: dos polarizadores girados. Cómodo para vídeo, con tres precauciones: en el extremo puede aparecer una cruz oscura (más con angular), puede teñir el color, y al ser polarizadores alteran reflejos y cielos de forma desigual. Conoce el rango útil del tuyo antes de un encargo.

> [PRACTICA] Tu Black Diffusion 1/4 no es un ND: suaviza el contraste local y hace florecer las altas luces. Puede combinarse con el ND, pero cada cristal añade riesgo de reflejos internos con luces en plano (neones, farolas).

## Ruido: de dónde sale
- **Ruido de fotones**: la luz llega de forma irregular. Con poca luz esa irregularidad pesa más. Es física, no un defecto de la cámara.
- **Ruido de lectura**: el que añade la electrónica. Domina en las sombras profundas.

Consecuencia: el ruido lo decide la **luz total capturada**. A igual exposición del sensor, ISO alto y «subir en edición» dan resultados parecidos; a igual ISO, exponer más siempre es más limpio.

## Qué sacrificar cuando no hay luz
Cuando ya estás a máxima apertura y 180°, te quedan cuatro salidas, en orden de preferencia habitual:
1. **Añadir luz** (tu LED, acercar al sujeto a una fuente, mover la acción).
2. **Subir ISO** hasta el límite que acepte la entrega (redes tolera más ruido que una pantalla grande).
3. **Obturación más lenta** (1/25 a 25p da un stop a cambio de más desenfoque de movimiento): válido en planos tranquilos.
4. **Cambiar de perfil** a uno que no exija ISO 800 de base.

> [OPINION] En foros se repiten cifras de «ISO máximo utilizable» de la A7 IV (6400, 12800…). Son preferencias ligadas a cada entrega y a cuánta reducción de ruido aplica cada persona. Haz tu propia prueba y decide tu límite para redes y para pantalla grande.
` }
  ],
  cases: [
    { t: 'Sesión de retrato al mediodía', b: 'Sol alto, quieres f/1.8 con el 50 mm. En foto: 1/8000 e ISO 100 dan EV ≈ 14,7 con f/1.8; llegas justo, y con obturador electrónico más. En vídeo a 25p y 1/50 necesitas entre 7,5 stops de ND (ISO 100) y 10,5 (S-Log3 a ISO 800), o renunciar a f/1.8. **Decisión razonable:** mover al sujeto a sombra abierta (EV 12): ganas una luz más favorecedora y la necesidad de ND baja tres stops.' },
    { t: 'Wall balls a contraluz de un portón', b: 'Nave de HYROX con el portón abierto detrás de los atletas. Matricial expone para el portón y las caras quedan a −3. **Decisión:** medir puntual en piel, aceptar que el portón recorte y recolocarse 30° para sacarlo de cuadro en los planos importantes. Proteger un rectángulo blanco sin interés a costa de la cara no tiene sentido.' },
    { t: 'Concierto con focos cambiantes', b: 'La luz cambia cada segundo. Medición «Resaltes» en foto con M + ISO AUTO evita quemar caras bajo el cañón. En vídeo, exposición manual fijada para el momento más brillante que quieras conservar y asumir que lo demás quede oscuro: en un concierto, el negro es parte de la imagen.' }
  ],
  errors: [
    'Exponer mirando el brillo de la pantalla.',
    'Usar la obturación como control de exposición en vídeo y romper el movimiento.',
    'Cerrar a f/16 para compensar la falta de ND: pierdes nitidez por difracción y todo el desenfoque.',
    'Proteger altas luces sin importancia a costa de hundir la piel.',
    'Subexponer «para estar seguro» y luego levantar: ruido en la piel.',
    'Confiar en la medición matricial a contraluz.',
    'Creer que el ISO bajo siempre es mejor: un ISO bajo con subexposición es peor que un ISO alto bien expuesto.',
    'Llevar el ND variable al extremo con angular y encontrarse la cruz en montaje.'
  ],
  exercise: {
    title: 'Diez escenas, diez exposiciones',
    steps: [
      'En el simulador de exposición, completa los cuatro retos.',
      'Para cada escena del simulador, encuentra dos combinaciones distintas que den la misma exposición y describe en una frase qué cambia estéticamente entre ellas.',
      'Calcula de cabeza: de f/2.8, 1/100, ISO 1600 a f/4, 1/50, ISO ¿? para mantener la exposición. (Respuesta: f/4 es −1, 1/50 es +1: el ISO no cambia.)',
      'Al aterrizar: con medición puntual, mide una carta gris o un folio gris y la palma de tu mano bajo la misma luz. Anota la diferencia en stops.'
    ],
    deliver: 'Tabla con las combinaciones equivalentes y la diferencia medida entre gris y tu piel.'
  },
  checklist: [
    'Fps decididos → obturación derivada (180° y frecuencia de red)',
    'Diafragma elegido por estética y por margen de foco',
    'ISO en el base del perfil si hay luz',
    'ND montado y probado en su rango útil',
    'Cebra de límite activada: sé qué recorta y si importa',
    'Sujeto medido (puntual, cebra de rango o carta gris)',
    'Conflicto de contraste resuelto con luz o encuadre, no solo con exposición',
    'Histograma revisado tras el primer plano'
  ],
  summary: [
    'Un stop = doble o mitad de luz; diafragma, obturación, ISO y ND se intercambian stop a stop.',
    'EV resume la luz de la escena: del sol (15) al gimnasio (6) hay nueve stops.',
    'Vídeo: fps → obturación → diafragma → ISO → ND. La obturación no es para exponer.',
    'Lo recortado no vuelve; lo subexpuesto vuelve con ruido. Protege las luces que importan.',
    'El medidor lleva lo medido a gris medio: piel clara ≈ +1 sobre el gris (orientativo).',
    'Método: límite (¿qué recorta?) → sujeto (¿en su nivel?) → conflicto (luz o encuadre).',
    'El ruido lo decide la luz capturada, no el número de ISO.',
    'ND variable: conoce su rango, su cruz y su dominante.'
  ],
  quiz: [
    { q: 'De f/2.8 a f/5.6 hay…', o: ['1 stop', '2 stops', '3 stops', 'medio stop'], a: 1, w: 'f/2.8 → f/4 → f/5.6: dos pasos, cuatro veces menos luz.', t: 'exposicion' },
    { q: 'Grabas a 25p y te sobra luz a f/2.8 e ISO base. ¿Qué haces primero?', o: ['Subir la obturación a 1/1000', 'Cerrar a f/16', 'Poner ND', 'Bajar los fps'], a: 2, w: 'El ND resta luz sin tocar el desenfoque de movimiento (obturación) ni la profundidad de campo (diafragma).', t: 'exposicion' },
    { q: 'Mides con puntual la mejilla de una persona de piel clara y pones el medidor en 0. La piel quedará…', o: ['correcta', 'aproximadamente un stop oscura', 'aproximadamente un stop clara', 'quemada'], a: 1, w: 'El medidor lleva lo medido a gris medio, y la piel clara está alrededor de un stop por encima del gris. Deberías dejar el medidor en torno a +1.', t: 'exposicion' },
    { q: '¿Qué afirmación es correcta?', o: ['Las sombras subexpuestas no se recuperan', 'Las altas luces recortadas se recuperan en 10 bits', 'Lo recortado no contiene información; las sombras se recuperan con ruido', 'El RAW recupera cualquier recorte'], a: 2, w: 'El recorte es saturación del sensor: no queda nada que recuperar. Las sombras conservan señal mezclada con ruido.', t: 'exposicion' },
    { q: 'Contraluz fuerte y la medición matricial deja la cara muy oscura. ¿Cuál NO es una solución válida?', o: ['Rellenar con un reflector', 'Medir puntual en la piel y aceptar que el fondo recorte', 'Girar el encuadre hacia un fondo más oscuro', 'Subir la saturación en cámara'], a: 3, w: 'La saturación no altera la exposición. Las otras tres resuelven el conflicto de contraste de formas distintas.', t: 'exposicion' },
    { q: 'Un ND64 resta…', o: ['3 stops', '6 stops', '64 stops', '8 stops'], a: 1, w: '64 = 2⁶: seis stops.', t: 'exposicion' },
    { q: 'Misma escena y misma exposición del sensor. Opción A: ISO 3200 en cámara. Opción B: ISO 800 y +2 stops en edición. El ruido será…', o: ['mucho menor en B porque el ISO es bajo', 'similar, con ligera ventaja habitual para A', 'mucho menor en A siempre', 'idéntico por definición'], a: 1, w: 'El sensor recibió la misma luz en ambos casos. La amplificación en cámara suele ser algo más limpia que estirar un archivo comprimido, pero la diferencia es pequeña.', t: 'exposicion' },
    { q: 'Regla Sunny 16: a pleno sol, f/16 e ISO 200, ¿qué obturación?', o: ['1/50', '1/200', '1/800', '1/16'], a: 1, w: 'Con f/16 a pleno sol, la obturación es aproximadamente 1/ISO.', t: 'exposicion' },
    { q: 'Cierras a f/16 en vídeo para no usar ND. ¿Qué pierdes?', o: ['Solo luz', 'Desenfoque de fondo y algo de nitidez por difracción', 'Rango dinámico', 'Fotogramas'], a: 1, w: 'A f/16 todo queda en foco, la difracción ablanda la imagen y cualquier mota del sensor se hace visible.', t: 'exposicion' },
    { q: 'El histograma muestra un pico estrecho pegado al borde derecho. Lo primero es…', o: ['Bajar la exposición hasta que desaparezca', 'Identificar qué zona recorta y decidir si importa', 'Ignorarlo', 'Subir el ISO'], a: 1, w: 'El histograma no dice qué recorta. Si es un foco o un reflejo especular, bajar la exposición hundiría al sujeto sin beneficio.', t: 'exposicion' }
  ]
};
