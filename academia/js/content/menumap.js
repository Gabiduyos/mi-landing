// Mapa de menús de la A7 IV (ILCE-7M4) en español.
// Los nombres siguen la estructura de la Guía de ayuda de Sony; la redacción exacta puede variar
// ligeramente según la versión de firmware y el idioma. `def` = valor de fábrica documentado o habitual.
export const MENU = [
  { id: 'toma', name: 'Toma', color: '#ff5263', groups: [
    { name: 'Calidad img/grabación', items: [
      { id: 'fotoFmt', name: 'Formato archivo (foto)', opts: ['JPEG', 'HEIF', 'RAW', 'RAW+JPEG'], def: 'JPEG', only: 'foto', note: 'RAW conserva los datos del sensor (14 bits) y permite recuperar luces y sombras; JPEG/HEIF ya llevan el aspecto «cocinado».' },
      { id: 'rawTipo', name: 'Tipo archivo RAW', opts: ['Sin comprimir', 'Compr. sin pérdida', 'Comprimido'], def: 'Comprimido', only: 'foto', note: 'Compresión sin pérdida: misma calidad que sin comprimir con archivos más pequeños. El comprimido clásico es con pérdida.' },
      { id: 'vidFmt', name: 'Formato archivo (vídeo)', opts: ['XAVC HS 4K', 'XAVC S 4K', 'XAVC S HD', 'XAVC S-I 4K', 'XAVC S-I HD'], def: 'XAVC S 4K', only: 'video', note: 'HS = H.265 (eficiente, exigente al editar). S = H.264 Long GOP. S-I = H.264 All-Intra (cada fotograma completo: archivos grandes, edición fluida).' },
      { id: 'fps', name: 'Velocidad fotogr. grab.', opts: ['24p', '25p', '50p', '100p'], def: '25p', only: 'video', note: 'Con el selector en PAL: 25/50/100p. En NTSC: 24/30/60/120p. 4K 50/60p fuerza recorte Super 35. 100/120p solo en HD.' },
      { id: 'grabar', name: 'Grabar ajuste', opts: ['4:2:2 10 bits (alto)', '4:2:0 10 bits', '4:2:0 8 bits'], def: '4:2:0 8 bits', only: 'video', note: 'Las opciones reales combinan tasa de bits y muestreo (p. ej. 140M 4:2:2 10 bits). Para S-Log3, 10 bits.' },
      { id: 's35', name: 'APS-C S35 (Super 35mm)', opts: ['Automático', 'Activar', 'Desactivar'], def: 'Automático', note: 'Recorte ×1,5. En 4K 50/60p se aplica siempre, elijas lo que elijas.' }
    ] },
    { name: 'Soporte', items: [
      { id: 'soporte', name: 'Ajustes soportes grab. → Modo de grabación', opts: ['Normal', 'Grabac. simult.', 'Ordenar (RAW/JPEG)', 'Relé automático'], def: 'Normal', note: 'Grabación simultánea = copia de seguridad instantánea en la segunda tarjeta. Recomendable en encargos irrepetibles.' },
      { id: 'formatear', name: 'Formatear', opts: ['—'], def: '—', note: 'Formatea SIEMPRE en la cámara y solo después de verificar dos copias del material anterior.' }
    ] },
    { name: 'Modo manejo', items: [
      { id: 'drive', name: 'Modo manejo', opts: ['Captura única', 'Continua Lo', 'Continua Mid', 'Continua Hi', 'Continua Hi+'], def: 'Captura única', only: 'foto', note: 'Hasta 10 fps (Hi+). Con RAW sin comprimir o sin pérdida la cadencia máxima baja (≈6 fps según Sony).' },
      { id: 'obtTipo', name: 'Tipo de obturador', opts: ['Automático', 'Obtur. mecánico', 'Obtur. electrónico'], def: 'Obtur. mecánico', only: 'foto', note: 'El electrónico es silencioso pero puede deformar sujetos rápidos (rolling shutter) y generar bandas con luz artificial.' },
      { id: 'antiflicker', name: 'Ajuste antiparpadeo → Toma antiparp.', opts: ['Desactivar', 'Activar'], def: 'Desactivar', only: 'foto', note: 'Sincroniza el disparo con el parpadeo de la luz (100/120 Hz). Solo con obturador mecánico.' }
    ] },
    { name: 'Grabación de audio', items: [
      { id: 'audio', name: 'Grabación de audio', opts: ['Activar', 'Desactivar'], def: 'Activar', only: 'video', note: 'Déjalo activado aunque uses DJI Mic con grabación interna: la pista de cámara sirve para sincronizar.' },
      { id: 'audioNivel', name: 'Nivel grabac. audio', opts: ['Bajo (≈8)', 'Medio (≈16)', 'Alto (≈26)'], def: 'Alto (≈26)', only: 'video', note: 'Escala real 0–31. Con micro externo con salida fuerte, baja el nivel en cámara y sube en el micro: el previo de la cámara es el eslabón ruidoso.' },
      { id: 'viento', name: 'Reducc. ruido viento', opts: ['Desactivar', 'Activar'], def: 'Desactivar', only: 'video', note: 'Actúa sobre el micro interno. Filtra graves: no lo dejes puesto en interiores.' }
    ] },
    { name: 'Estabiliz. imagen', items: [
      { id: 'ss', name: 'SteadyShot', opts: ['Desactivar', 'Estándar', 'Activo'], def: 'Estándar', note: 'En foto solo Activar/Desactivar. «Activo» (vídeo) añade estabilización electrónica con un ligero recorte adicional y no está disponible en todos los modos (consulta la Guía de ayuda para 100/120p). En gimbal: Desactivar o Estándar, según pruebas.' }
    ] },
    { name: 'Modo de toma', items: [
      { id: 'memoria', name: 'Config. recuerdo cámara / Memoria ajuste cámara', opts: ['M1', 'M2', 'M3', 'M4 (tarjeta)'], def: '—', note: 'Guarda el estado actual (modo, exposición, enfoque, perfil…) en las posiciones 1, 2 y 3 del dial. Foto y vídeo guardan juegos distintos según la posición del selector Foto/Vídeo/S&Q.' }
    ] }
  ] },
  { id: 'expo', name: 'Exposición/Color', color: '#ff8a1f', groups: [
    { name: 'Exposición', items: [
      { id: 'isoAuto', name: 'ISO → Rango ISO AUTO', opts: ['100–12800', '100–6400', '800–12800'], def: '100–12800', note: 'Limita el máximo para que el automático no dispare el ruido. En S-Log3 el mínimo normal es 800.' },
      { id: 'expComp', name: 'Compensar exp. (dial)', opts: ['−2', '−1', '0', '+1', '+2'], def: '0', note: 'En P/A/S desplaza la exposición que elige la cámara. En M con ISO AUTO también actúa. En M con ISO fijo no hace nada: solo cambia la referencia del medidor.' },
      { id: 'medicion', name: 'Modo medición', opts: ['Multi', 'Centro', 'Puntual', 'Promedio pantalla comp.', 'Resaltes'], def: 'Multi', note: '«Resaltes» expone para proteger las altas luces: útil en conciertos y escenarios con focos.' },
      { id: 'caraMulti', name: 'Prior. cara en multimed.', opts: ['Activar', 'Desactivar'], def: 'Activar', note: 'La medición Multi pondera las caras detectadas.' }
    ] },
    { name: 'Balance blanco', items: [
      { id: 'wb', name: 'Balance blanco', opts: ['Automático', 'Luz diurna', 'Sombra', 'Nublado', 'Incandescente', 'Fluorescente', 'Temp. color (K)', 'Personalizado'], def: 'Automático', note: 'En vídeo, fija el balance (preset, Kelvin o personalizado con carta gris): el automático deriva entre planos y complica el etalonaje.' },
      { id: 'wbBloq', name: 'Bloq. AWB disparador', opts: ['Desactivar', 'Pulsar disparador', 'Cambio (tecla)'], def: 'Desactivar', note: 'Permite congelar el AWB cuando lo necesites.' }
    ] },
    { name: 'Color/Tono', items: [
      { id: 'pp', name: 'Perfil de imagen', opts: ['Desactivar', 'PP1', 'PP2', 'PP3', 'PP4', 'PP5', 'PP6', 'PP7', 'PP8', 'PP9', 'PP10', 'PP11'], def: 'Desactivar', note: 'De fábrica: PP1 Movie, PP2 Still, PP3–4 ITU709, PP5 Cine1, PP6 Cine2, PP7 S-Log2, PP8 S-Log3/S-Gamut3.Cine, PP9 S-Log3/S-Gamut3, PP10 HLG2, PP11 S-Cinetone. TODOS son editables: una cámara usada o prestada puede tener cualquier cosa en cualquier número. Compruébalo siempre dentro del perfil.' },
      { id: 'aspecto', name: 'Aspecto creativo', opts: ['ST', 'PT', 'NT', 'VV', 'FL', 'IN', 'SH', 'BW', 'SE'], def: 'ST', note: 'Estilos para JPEG/HEIF y vídeo sin perfil de imagen. No afecta al RAW (solo a su previsualización).' },
      { id: 'dro', name: 'Optimiz. gama diná. (DRO)', opts: ['Desactivar', 'Automático', 'Lv1–Lv5'], def: 'Automático', note: 'Levanta sombras en JPEG. No disponible con perfiles de imagen.' }
    ] },
    { name: 'Visual. cebra', items: [
      { id: 'cebra', name: 'Visual. cebra', opts: ['Desactivar', 'Activar'], def: 'Desactivar', note: 'Rayado sobre las zonas que alcanzan un nivel de señal.' },
      { id: 'cebraNivel', name: 'Nivel cebra', opts: ['70', '80', '95', '100+', 'C1 (rango, p. ej. 52 ±2)', 'C2 (límite inferior, p. ej. 94+)'], def: '70', note: 'C1 y C2 son personalizables: un rango (Est. + margen) para medir un tono o un límite inferior para avisar del recorte. Los niveles son de señal de vídeo (%), así que dependen del perfil.' }
    ] }
  ] },
  { id: 'enfoque', name: 'Enfoque', color: '#c58bff', groups: [
    { name: 'AF/MF', items: [
      { id: 'afModo', name: 'Modo de enfoque', opts: ['AF-S', 'AF-A', 'AF-C', 'DMF', 'MF'], def: 'AF-A', note: 'AF-C para todo lo que se mueve. En vídeo solo existen AF continuo y MF.' },
      { id: 'afVel', name: 'Vel. transición AF', opts: ['1 (lenta)', '3', '5', '7 (rápida)'], def: '5', only: 'video', note: 'Lenta = cambios de foco cinematográficos. Rápida = deporte.' },
      { id: 'afSens', name: 'Sens. cambio motivo AF', opts: ['1 (bloqueado)', '3', '5 (receptivo)'], def: '5 (receptivo)', only: 'video', note: 'Bloqueado: el foco no salta si alguien cruza por delante. Receptivo: cambia rápido de sujeto.' }
    ] },
    { name: 'Área de enfoque', items: [
      { id: 'afArea', name: 'Área de enfoque', opts: ['Ancho', 'Zona', 'Fijo centro', 'Puntual', 'Puntual ampliado', 'Seguimiento'], def: 'Ancho', note: 'Seguimiento (solo AF-C en foto): fijas el sujeto y la cámara lo sigue por el encuadre. En vídeo, el seguimiento se inicia tocando la pantalla (Seguimiento táctil).' }
    ] },
    { name: 'AF en cara/ojos', items: [
      { id: 'ojos', name: 'Prior. cara/ojos AF', opts: ['Activar', 'Desactivar'], def: 'Activar', note: 'Detección de ojo en tiempo real en foto y vídeo.' },
      { id: 'motivo', name: 'Detección de motivo', opts: ['Humano', 'Animal', 'Ave'], def: 'Humano', note: 'Elige el tipo antes de empezar: no cambia solo.' }
    ] },
    { name: 'Asistente de enfoque', items: [
      { id: 'peaking', name: 'Visual. resaltado (peaking)', opts: ['Desactivar', 'Activar'], def: 'Desactivar', note: 'Colorea los bordes enfocados. En S-Log3, con poco contraste, sube el nivel o combínalo con la ampliación.' },
      { id: 'mapa', name: 'Mapa de enfoque', opts: ['Desactivar', 'Activar'], def: 'Desactivar', only: 'video', note: 'Muestra en color qué queda delante o detrás del plano de foco.' },
      { id: 'ampli', name: 'Amplific. enfoque', opts: ['—'], def: '—', note: 'Amplía la imagen para afinar el foco manual. Asígnalo a un botón.' }
    ] }
  ] },
  { id: 'repro', name: 'Reproducción', color: '#35c98a', groups: [
    { name: 'Selección/Notas', items: [
      { id: 'valorar', name: 'Clasificación / Proteger', opts: ['—'], def: '—', note: 'Marca con estrellas o protege tomas buenas durante el rodaje: aparecerán marcadas al importar.' }
    ] }
  ] },
  { id: 'red', name: 'Red', color: '#7fb0ff', groups: [
    { name: 'Transferencia/Remoto', items: [
      { id: 'modoAvion', name: 'Modo avión', opts: ['Desactivar', 'Activar'], def: 'Desactivar', note: 'Activarlo ahorra batería cuando no usas el móvil como mando.' }
    ] }
  ] },
  { id: 'ajustes', name: 'Ajustes', color: '#ffd23f', groups: [
    { name: 'Área/Fecha', items: [
      { id: 'pal', name: 'Selector NTSC/PAL', opts: ['PAL', 'NTSC'], def: 'PAL', note: 'Cambia el juego de fotogramas disponible (25/50/100 ↔ 24/30/60/120). Cambiarlo puede exigir formatear la tarjeta: decide antes del rodaje.' }
    ] },
    { name: 'Personalizar operac.', items: [
      { id: 'teclas', name: 'Ajuste tecla person. (foto / vídeo / reprod.)', opts: ['—'], def: '—', note: 'C1–C4, AF-ON, AEL, rueda, botones del objetivo. Foto y vídeo tienen asignaciones independientes.' },
      { id: 'fn', name: 'Ajustes menú Fn', opts: ['—'], def: '—', note: '12 huecos para foto y 12 para vídeo. Pon ahí lo que cambias a mitad de rodaje: perfil, balance, área de enfoque, cebra, asistente gamma, SteadyShot, nivel de audio…' },
      { id: 'dialSep', name: 'Dif. ajuste foto/vídeo', opts: ['—'], def: '—', note: 'Decide qué ajustes (apertura, obturación, ISO, balance, perfil…) son independientes entre foto y vídeo. Clave para una cámara híbrida.' }
    ] },
    { name: 'Opción de ajuste', items: [
      { id: 'gda', name: 'Asist. visual. Gamma', opts: ['Desactivar', 'Activar'], def: 'Desactivar', note: 'Muestra la imagen log con contraste normal SOLO en pantalla y visor. No altera la grabación. La A7 IV no admite LUT de usuario: esta es su «LUT de monitorización».' },
      { id: 'gdaTipo', name: 'Tipo asist. vis. Gamma', opts: ['Automático', 'S-Log2→709(800%)', 'S-Log3→709(800%)', 'HLG(BT.2020)', 'HLG(709)'], def: 'Automático', note: 'En Automático sigue al perfil activo.' }
    ] },
    { name: 'Restablecer/Guardar ajust.', items: [
      { id: 'guardar', name: 'Guardar/Cargar ajustes', opts: ['—'], def: '—', note: 'Exporta toda la configuración a la tarjeta. Haz una copia cuando la cámara esté a tu gusto.' }
    ] }
  ] }
];
export const allItems = () => MENU.flatMap(s => s.groups.flatMap(g => g.items.map(i => ({ ...i, path: `MENU → ${s.name} → ${g.name}`, sec: s }))));
