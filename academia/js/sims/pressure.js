// SIMULADOR H — Rodajes bajo presión. Incidencias reales con cuenta atrás; cada opción tiene consecuencias explicadas.
import { $, esc, goalsHTML, toast } from '../ui.js';
import { state, markGoal, srsAnswer } from '../store.js';

const GOALS = [{ id: 'H1', text: 'Completa una tanda de 6 incidencias con un 80 % o más.' }];
const SECS = 45;
export const INCIDENTS = [
  { id: 'h1', tag: 'exposicion', s: 'HYROX, interior. Vas en S-Log3 a ISO 800, f/2.8, 1/100, 50p. De repente la organización apaga la mitad de las luces para la final: tu medidor marca −2,3.', o: [
    ['Subir a ISO 3200–4000 y seguir en S-Log3', 2, 'Recuperas los ~2 stops con el ISO. En torno a ISO 3200 las pruebas independientes describen un comportamiento de ruido favorable en S-Log3 en la A7 IV. Vigila que la piel siga en su nivel.'],
    ['Bajar la obturación a 1/25 para ganar 2 stops', 0, 'A 50p no puedes obturar más lento que 1/50, y aunque pudieras emborronarías la acción deportiva. El tiempo de obturación no es tu comodín aquí.'],
    ['Dejarlo así y levantarlo luego en color', 0, 'Subexponer 2,3 stops en log hunde la piel en la zona ruidosa; al subirla en etalonaje sube el ruido con ella. Es el error clásico de S-Log3.'],
    ['Cambiar a S-Cinetone a mitad de evento', 1, 'Funciona técnicamente y aguanta bien la poca luz, pero ahora tendrás dos perfiles que igualar en montaje. Aceptable si lo decides para todo lo que queda y lo anotas.']] },
  { id: 'h2', tag: 'parpadeo', s: 'Gimnasio con tubos LED. En pantalla ves bandas oscuras que suben lentamente. Estás a 25p y 1/160 porque querías movimiento nítido.', o: [
    ['Pasar a 1/50 o 1/100', 2, 'En España la red es de 50 Hz y la luz parpadea a 100 Hz: 1/50 y 1/100 integran ciclos completos. Si aún quedan bandas, es atenuación PWM del LED: prueba el obturador variable de la cámara o cambia de luminaria.'],
    ['Subir el ISO', 0, 'El ISO no tiene relación con las bandas: son un desajuste entre tiempo de obturación y parpadeo de la luz.'],
    ['Pasar a 1/60', 0, '1/60 corresponde a redes de 60 Hz (oeste de Japón, América). Con 50 Hz seguirá habiendo batido.'],
    ['Activar SteadyShot Activo', 0, 'La estabilización no afecta al parpadeo.']] },
  { id: 'h3', tag: 'audio', s: 'Entrevista con el dueño del gimnasio. A mitad de respuesta el DJI Mic empieza a marcar picos en rojo porque se ha emocionado y habla más alto.', o: [
    ['Esperar al final de la frase, bajar ganancia y pedirle que repita la idea', 2, 'El audio saturado digitalmente no se repara. Interrumpir con tacto al final de la frase y repetir cuesta 30 segundos; perder la mejor respuesta, el vídeo entero. Si tu receptor graba pista de seguridad a −6 dB, tenla siempre activada.'],
    ['Seguir: lo arreglo en posproducción', 0, 'La saturación (clipping) destruye la forma de onda. Las herramientas de reparación la disimulan, no la recuperan.'],
    ['Bajar el nivel de grabación de la cámara', 1, 'Solo ayuda si lo que satura es la entrada de la cámara. Si el pico está en el transmisor, lo que llega ya viene roto: hay que bajar la ganancia del micro.'],
    ['Alejar la cámara', 0, 'La distancia de la cámara no cambia nada: el micro va en el entrevistado.']] },
  { id: 'h4', tag: 'direccion', s: 'Videoclip. El cantante lleva seis tomas del estribillo, cada vez más rígido. El equipo está mirando el reloj.', o: [
    ['Parar, cambiar algo concreto (acción, punto de mirada, movimiento) y darle una sola indicación', 2, 'Repetir «otra, con más energía» no da información. Una tarea física concreta («camina hacia cámara y párate en la marca al entrar el estribillo») saca a la persona de su cabeza. Una indicación por toma.'],
    ['Pedir «otra más, pero más natural»', 0, '«Natural» no es una instrucción ejecutable; aumenta la autoconciencia, que es justo el problema.'],
    ['Enseñarle en el monitor lo mal que queda', 0, 'A una persona insegura, verse mal la bloquea más. Enseña monitor cuando haya algo bueno que reforzar.'],
    ['Seguir rodando sin cortar hasta que salga', 1, 'A veces el plano largo relaja, pero sin cambiar nada sueles obtener la misma toma con más cansancio.']] },
  { id: 'h5', tag: 'datos', s: 'Fin de jornada. Has volcado la tarjeta al portátil. El cliente te pide la cámara lista para mañana a primera hora y solo tienes esa tarjeta.', o: [
    ['Hacer segunda copia en otro disco, verificar que los clips abren y entonces formatear en cámara', 2, 'Regla 3-2-1 mínima de rodaje: nunca borres el original hasta tener dos copias verificadas en soportes distintos. Verificar es abrir clips del principio, el medio y el final (o usar copia con suma de verificación).'],
    ['Formatear ya: el volcado se ha completado', 0, 'Una única copia en un portátil es un punto único de fallo. Un volcado «completado» puede tener archivos corruptos.'],
    ['Borrar los clips desde el ordenador para liberar la tarjeta', 0, 'Borrar desde el ordenador deja la estructura de la tarjeta inconsistente; se formatea siempre en la cámara, y solo tras verificar copias.'],
    ['Guardar la tarjeta sin tocar y comprar otra mañana', 1, 'Es seguro para el material, pero dependes de encontrar una tarjeta adecuada a primera hora. Mejor llevar siempre tarjetas de sobra.']] },
  { id: 'h6', tag: 'exposicion', s: 'Retrato a contraluz en golden hour con el 50 mm a f/1.8, 25p, S-Log3 ISO 800. A 1/50 todo está quemado. No llevas el ND variable montado.', o: [
    ['Montar el ND variable y mantener 1/50 y f/1.8', 2, 'Es exactamente para lo que sirve el ND: conservar apertura (desenfoque) y obturación (movimiento) cuando sobra luz. Vigila el viñeteo en cruz si lo llevas al extremo.'],
    ['Cerrar a f/11', 1, 'Expone bien, pero pierdes el desenfoque que buscabas con el 50 mm f/1.8. Válido si el fondo te da igual.'],
    ['Subir la obturación a 1/2000', 1, 'Expone bien y conserva la apertura, pero el movimiento se vuelve entrecortado. En un retrato casi estático puede pasar; con pelo al viento o gestos, se nota.'],
    ['Bajar el ISO a 100 en S-Log3', 0, 'En S-Log3 el mínimo normal es 800; la zona ampliada baja hasta 200 pero recorta margen en altas luces, justo lo que necesitas en un contraluz. Y aun así te faltarían stops.']] },
  { id: 'h7', tag: 'cliente', s: 'Anuncio de gimnasio. En pleno rodaje, el cliente pide «un par de planos de dron del edificio» que no estaban en el presupuesto ni en el plan.', o: [
    ['Explicar el impacto (tiempo, permisos) y ofrecer opciones: sustituir otro plano hoy o presupuestarlo aparte', 2, 'Gestión de alcance: ni «no» seco ni «sí» gratis. Además, volar un dron en zona urbana exige comprobar normativa y permisos; no es improvisable.'],
    ['Decir que sí y sacar el Mini 2', 0, 'Regalas trabajo, descuadras el plan y quizá incumplas la normativa de vuelo en zona urbana o cerca de personas.'],
    ['Decir que eso no está en el contrato y seguir', 1, 'Tienes razón en el fondo, pero pierdes la oportunidad de vender un extra y tensas la relación.'],
    ['Prometerlo «si sobra tiempo»', 0, 'Nunca sobra tiempo, y el cliente recordará la promesa.']] },
  { id: 'h8', tag: 'foco', s: 'Seguimiento con gimbal de un atleta entre el público. El AF salta a espectadores que cruzan por delante.', o: [
    ['Sensibilidad de cambio de motivo a «bloqueado» y seguimiento táctil sobre el atleta', 2, 'Le dices a la cámara que sea terca con el sujeto elegido. Cerrar un poco el diafragma (f/4) añade margen.'],
    ['Pasar a foco manual', 1, 'En gimbal sin follow focus es difícil de sostener; solo funciona si fijas distancia e hiperfocal con angular y diafragma cerrado.'],
    ['Abrir a f/1.8 para aislarlo', 0, 'Menos profundidad de campo hace cada salto de foco más evidente.'],
    ['Subir la velocidad de transición AF al máximo', 0, 'Así el foco saltará a los espectadores todavía más rápido.']] },
  { id: 'h9', tag: 'wb', s: 'Interior con ventanal (luz día) y lámparas cálidas. La piel sale naranja por un lado y azulada por el otro.', o: [
    ['Elegir una fuente dominante: apagar las cálidas (o tapar ventana) y fijar el balance a la que quede', 2, 'La luz mixta no se arregla con un solo balance: el balance es global. Simplificar las fuentes es la solución más limpia; la alternativa es igualarlas con geles.'],
    ['Balance automático', 0, 'Elegirá un término medio que variará al reencuadrar. Sigues teniendo dos dominantes.'],
    ['Fijar 4300 K, a medio camino', 1, 'Reparte el error: ambos lados quedan «un poco mal». A veces es el compromiso si no puedes tocar las luces, y puede quedar estético.'],
    ['Arreglarlo en color con una máscara', 1, 'Posible pero lento y frágil si el sujeto se mueve. Mejor resolverlo en rodaje.']] },
  { id: 'h10', tag: 'planificacion', s: 'Videoclip nocturno en exterior. Empieza a llover con fuerza y te quedan 5 planos de exterior y 3 de interior de coche.', o: [
    ['Reordenar: rodar ya los interiores de coche (la lluvia en los cristales suma) y proteger el equipo', 2, 'Eso es tener plan B: el plan de rodaje ordena por condiciones, no por guion. Cubre la cámara y cuida la electricidad.'],
    ['Esperar a que pare', 0, 'Quemas tiempo de equipo y localización sin garantía.'],
    ['Seguir con los exteriores tal cual', 0, 'La A7 IV y tus objetivos no están sellados para lluvia intensa; además cambia la continuidad con lo ya rodado en seco.'],
    ['Cancelar y volver otro día', 1, 'A veces es lo correcto, pero es lo más caro. Antes agota lo que sí puedes rodar hoy.']] },
  { id: 'h11', tag: 'slog', s: 'Reels para un evento: el cliente quiere tres piezas publicadas esta misma noche y tú editas en el móvil y el portátil del hotel.', o: [
    ['S-Cinetone 10 bits, exponiendo y balanceando bien en cámara', 2, 'Con entrega inmediata no hay tiempo de etalonar: un perfil con aspecto acabado es la decisión profesional. Sony describe S-Cinetone como pensado para minimizar la posproducción.'],
    ['S-Log3 para tener la máxima calidad', 0, 'S-Log3 mal o apresuradamente convertido queda peor que S-Cinetone bien expuesto. La «máxima calidad» incluye llegar a tiempo.'],
    ['S-Log3 y aplicar una LUT en CapCut', 1, 'Puede salir, pero una LUT genérica no corrige exposición ni balance plano a plano. Arriesgas consistencia.'],
    ['HLG', 1, 'Válido en flujos HDR; para redes en SDR con prisas añade una conversión que no necesitas.']] },
  { id: 'h12', tag: 'seguridad', s: 'Rodaje en sala de pesas. Necesitas un plano contrapicado y la mejor posición es tumbado junto a la jaula donde alguien hace sentadillas con mucho peso.', o: [
    ['Coordinar con el atleta y un ayudante, usar peso seguro para el plano o colocar la cámara sola en el suelo', 2, 'Ningún plano justifica ponerse bajo una barra cargada. Cámara en el suelo con angular, control desde el móvil, y carga reducida si solo es para imagen.'],
    ['Tumbarte rápido: es un momento', 0, 'Los accidentes de rodaje ocurren en «un momento». Y eres responsable de tu equipo.'],
    ['Usar el 70 mm desde lejos', 1, 'Seguro, pero cambia la perspectiva: el contrapicado cercano con angular es otra imagen. Válido si aceptas el cambio.'],
    ['Pedir al atleta que cargue más para que impresione', 0, 'Aumentas el riesgo para una mejora que la cámara apenas distingue.']] }
];

export function mount(el) {
  let run = null, timer = null;
  const start = () => {
    const pool = [...INCIDENTS].sort(() => Math.random() - 0.5).slice(0, 6);
    run = { pool, i: 0, pts: 0, log: [] }; show();
  };
  function show() {
    clearInterval(timer);
    const q = run.pool[run.i]; let left = SECS;
    const opts = q.o.map((o, i) => [o, i]).sort(() => Math.random() - 0.5);
    el.innerHTML = `<div class="row sp"><span class="chip o">Incidencia ${run.i + 1} / 6</span><span class="timer" id="sh-t" aria-live="off">${left}s</span></div>
      <div class="bar o" style="margin:10px 0"><i id="sh-b" style="width:100%"></i></div>
      <div class="q"><h3>${esc(q.s)}</h3><div id="sh-o">${opts.map(([o, i]) => `<button class="opt" data-i="${i}">${esc(o[0])}</button>`).join('')}</div><div id="sh-fb"></div></div>`;
    const done = i => {
      clearInterval(timer);
      const pick = i >= 0 ? q.o[i] : null, best = q.o.find(o => o[1] === 2), pts = pick ? pick[1] : 0;
      run.pts += pts; srsAnswer('H:' + q.id, pts === 2, q.tag);
      el.querySelectorAll('.opt').forEach(b => { b.disabled = true; const o = q.o[+b.dataset.i]; if (o[1] === 2) b.classList.add('right'); else if (+b.dataset.i === i) b.classList.add('wrong'); });
      $('#sh-fb', el).innerHTML = `<div class="fb ${pts === 2 ? 'ok' : 'ko'}"><b>${pick ? (pts === 2 ? 'Decisión correcta.' : pts === 1 ? 'Salida aceptable, no la mejor (1 de 2 puntos).' : 'Decisión incorrecta.') : 'Tiempo agotado: en rodaje, no decidir también es una decisión.'}</b>${pick ? esc(pick[2]) : ''}${pts < 2 ? `<br><br><b>Mejor opción: ${esc(best[0])}</b>${esc(best[2])}` : ''}</div>
        <button class="btn mt" id="sh-n">${run.i < 5 ? 'Siguiente incidencia' : 'Ver resultado'}</button>`;
      $('#sh-n', el).onclick = () => { run.i++; run.i < 6 ? show() : end(); };
    };
    $('#sh-o', el).onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) done(+b.dataset.i); };
    timer = setInterval(() => { if (!el.isConnected) return clearInterval(timer); left--; const t = $('#sh-t', el); if (t) { t.textContent = left + 's'; $('#sh-b', el).style.width = (left / SECS * 100) + '%'; } if (left <= 0) done(-1); }, 1000);
  }
  function end() {
    const pct = Math.round(run.pts / 12 * 100);
    if (pct >= 80 && markGoal('H1')) toast('Reto superado · +30 XP');
    home(`<div class="fb ${pct >= 80 ? 'ok' : 'ko'}"><b>Resultado: ${run.pts}/12 puntos · ${pct} %</b>${pct >= 80 ? 'Has decidido con criterio bajo presión.' : 'No alcanzas el 80 %. Las incidencias falladas han pasado a tu cola de repaso; vuelve a intentarlo cuando las hayas revisado.'}</div>`);
  }
  function home(extra = '') {
    el.innerHTML = `${extra}<p>Seis incidencias al azar de un banco de ${INCIDENTS.length}. Tienes <strong>${SECS} segundos</strong> para cada decisión. Algunas opciones son aceptables pero no óptimas (1 punto); solo la mejor suma 2.</p>
      <button class="btn" id="sh-go">Empezar tanda</button><div class="mt">${goalsHTML(GOALS, state().goals)}</div>
      <p class="note"><strong>Límite del modelo:</strong> son casos cerrados con una «mejor» respuesta razonada; en un rodaje real pesan matices (cliente, presupuesto, equipo) que pueden cambiar la decisión. Lo que entrenas aquí es el razonamiento rápido.</p>`;
    $('#sh-go', el).onclick = start;
  }
  home();
}
