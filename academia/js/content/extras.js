// Chuletas, misiones reales, bibliografía y plantillas de memorias.

export const CHEATS = [
  { id: 'expo', t: 'Exposición en 20 segundos', b: `
1. **Fps** → 25p normal · 50p para ralentizar (recorte ×1,5 en 4K).
2. **Obturación** → 1/50 a 25p · 1/100 a 50p. Con luz artificial: 50 Hz → 1/50, 1/100 · 60 Hz → 1/60, 1/120.
3. **Diafragma** → por estética y margen de foco.
4. **ISO** → base del perfil; sube solo al final.
5. **ND** → si aún sobra luz.
6. **Comprobar** → cebra de límite (¿qué recorta?) → sujeto (¿en su nivel?).` },
  { id: 'slog', t: 'S-Log3: niveles de referencia', b: `
| Tono | Referencia | A +1 | A +1,7 |
| Gris 18 % | 41 % | ~50 % | ~55 % |
| Piel clara | ~49–52 % | ~58 % | ~64 % |
| Blanco 90 % | 61 % | ~70 % | ~76 % |
| Recorte | ~94 % | | |

- ISO base 800. 10 bits siempre. S-Gamut3.Cine.
- Asistente gamma activado (solo afecta a la pantalla).
- Cada stop que subes es un stop menos de altas luces.
- Contraste alto → cerca de la referencia. Contraste bajo → +1 a +1,5.` },
  { id: 'scine', t: 'S-Cinetone', b: `
- Imagen casi terminada. Entregas rápidas, poca luz, contraste moderado.
- Piel clara hacia el 60 % (referencia de profesionales, no de Sony); por encima del 70 % se aplana.
- Balance de blancos exacto en cámara: margen de corrección pequeño.
- Comprueba que el perfil seleccionado contiene de verdad S-Cinetone.` },
  { id: 'perfil', t: '¿S-Log3 o S-Cinetone?', b: `
| Pregunta | S-Log3 | S-Cinetone |
| ¿Hay tiempo de etalonaje? | sí | no |
| ¿Contraste de la escena? | alto | bajo o controlado |
| ¿Luz disponible? | suficiente para piel en su nivel a ISO ≤ 3200 | poca |
| ¿Entrega? | días | horas |` },
  { id: 'hz', t: 'Parpadeo y Japón', b: `
| Zona | Red | Obturación segura |
| España y Europa | 50 Hz | 1/50 · 1/100 |
| Tokio, Yokohama, norte de Japón | 50 Hz | 1/50 · 1/100 |
| Osaka, Kioto, Nagoya, Hiroshima, Fukuoka | 60 Hz | 1/60 · 1/120 |

- Prueba de 5 s y revisión ampliada antes de rodar.
- Si las obturaciones seguras fallan: es PWM. Luces al 100 %, afinar obturación o evitar la luminaria.
- Japón: 100 V, clavija tipo A.` },
  { id: 'ev', t: 'EV orientativos (ISO 100)', b: `
| EV | Escena |
| 15–16 | sol directo |
| 12–13 | nublado luminoso, sombra abierta |
| 9–11 | atardecer |
| 7–8 | pabellón, interior junto a ventanal |
| 5–6 | gimnasio, interior doméstico |
| 3–4 | calle de noche con escaparates |
| 0–2 | calle oscura |

Sunny 16: a pleno sol, f/16 y 1/ISO.` },
  { id: 'nd', t: 'Filtros ND', b: `
| ND | Stops |
| ND2 | 1 |
| ND4 | 2 |
| ND8 | 3 |
| ND16 | 4 |
| ND32 | 5 |
| ND64 | 6 |
| ND1000 | 10 |

Sol a 25p y f/2.8: unos 6,5 stops a ISO 100; unos 9,5 con S-Log3 a ISO 800.` },
  { id: 'foto', t: 'Foto: obturación por acción', b: `
| Acción | Punto de partida |
| Posado | 1/125–1/200 |
| Caminar, gestos | 1/250–1/500 |
| Correr, levantamientos | 1/800–1/1000 |
| Saltos, sprints | 1/1600–1/2500 |
| Barrido | 1/30–1/60 |

M + ISO AUTO · AF-C seguimiento · mecánico + antiparpadeo en interior · RAW. Sincronización de flash 1/250.` },
  { id: 'focal', t: 'Focales y recorte', b: `
| Focal | Full frame | En 4K 50p (×1,5) | Uso |
| 24 mm | 74° | 36 mm | espacios, gimbal |
| 35 mm | 54° | 52 mm | reportaje |
| 50 mm | 40° | 75 mm | retrato, noche (f/1.8) |
| 70 mm | 29° | 105 mm | primeros planos, detalle |

La perspectiva la decide la distancia, no la focal. Separa al sujeto del fondo.` },
  { id: 'luz', t: 'Luz en un minuto', b: `
1. Apaga lo que estorba.
2. Principal a 30–45°, grande y cerca.
3. ¿Sombras densas? Relleno. ¿Plano? Negro al lado.
4. Contra para separar.
5. Fondo 1–2 stops bajo la piel, con una práctica.

Doble distancia = −2 stops. LED pequeño: contra, rebote cercano o brillo de ojos.` },
  { id: 'cobertura', t: 'Cobertura de cinco planos', b: `
General (dónde) → medio (qué hace) → primer plano (qué siente) → detalle (qué importa) → reacción.

- Mismo lado del eje. Misma dirección de pantalla.
- Cambia 30° o de tamaño entre planos seguidos.
- Movimiento con motivo, principio y final.` },
  { id: 'audio', t: 'Sonido', b: `
- Micro a un palmo de la boca. Antiviento en exterior.
- Picos de voz −12 a −6 dBFS. Cámara con nivel bajo.
- Grabación interna del micro activada. Auriculares.
- 30 s de tono de sala.
- Mezcla web: ≈ −14 LUFS, pico real ≤ −1 dBTP. Música con licencia.` },
  { id: 'color', t: 'Color en Resolve', b: `
1. Entrada: S-Gamut3.Cine / S-Log3 → trabajo: DaVinci Wide Gamut / Intermediate → salida: Rec.709 Gamma 2.4.
2. Exposición → contraste → balance → saturación.
3. Igualar con plano héroe y pantalla partida.
4. Piel en el vectorscopio.
5. Look en nodos aparte, piel protegida.

Forma de onda = niveles · Parade = balance · Vectorscopio = tono y saturación.` },
  { id: 'export', t: 'Exportación', b: `
| Destino | Ajuste |
| Instagram / TikTok | MP4 H.264 · 1080 × 1920 · 10–20 Mb/s · AAC |
| YouTube 4K | MP4 H.264/H.265 · 3840 × 2160 · 35–45 Mb/s |
| Máster | ProRes 422 HQ o DNxHR |
| Foto para redes | JPEG sRGB · lado largo 2048–2560 px |

Las plataformas cambian sus especificaciones: comprueba las vigentes.` },
  { id: 'copias', t: 'Copias 3-2-1', b: `
- Grabación simultánea en lo irrepetible.
- Cada noche: tarjeta completa → dos discos → verificar → solo entonces formatear en cámara.
- Los dos discos viajan separados. Baterías de litio, en cabina.` },
  { id: 'antes', t: 'Antes de pulsar REC', b: `
- Formato, fps y 10 bits
- Perfil abierto y verificado
- Obturación (180° y red local)
- Balance de blancos fijo
- Cebras: límite y sujeto
- Foco: modo, área, sensibilidad
- Audio: nivel y auriculares
- Tarjeta y batería
- Lente limpia, horizonte nivelado` }
];

export const MISSIONS = [
  { id: 'j1', g: 'Primeras 24 horas', t: 'Auditoría de cámara', d: 'Abre los 11 perfiles de imagen y anota Gamma y Modo de color reales. Registra tus memorias en «Sony A7 IV → Mis memorias».', m: 1 },
  { id: 'j2', g: 'Primeras 24 horas', t: 'Prueba de parpadeo en el hotel', d: 'Graba 5 s a 1/50 y a 1/60 bajo la luz de la habitación. Averigua si estás en zona de 50 o 60 Hz y anótalo.', m: 4 },
  { id: 'j3', g: 'Primeras 24 horas', t: 'Prueba de ISO en S-Log3', d: 'Con la tapa puesta, graba a ISO 800, 1600, 2500, 3200 y 6400. Compara el ruido al igualar exposición en edición.', m: 1 },
  { id: 'j4', g: 'Exposición', t: 'Escalera de latitud', d: 'Misma escena en S-Log3 a −2, −1, 0, +1 y +2. Normaliza en Resolve y decide tu desplazamiento habitual.', m: 3 },
  { id: 'j5', g: 'Exposición', t: 'Gris y piel', d: 'Mide con puntual una superficie gris y tu mano bajo la misma luz. Anota la diferencia en stops.', m: 2 },
  { id: 'j6', g: 'Exposición', t: 'Contraluz resuelto de tres formas', d: 'Un retrato a contraluz: silueta, expuesto para la piel y con relleno. Compara.', m: 2 },
  { id: 'j7', g: 'Luz', t: 'Golden hour con plan', d: 'Llega 40 minutos antes con cinco planos decididos. Rueda generales primero y primeros planos al final.', m: 4 },
  { id: 'j8', g: 'Luz', t: 'Blue hour en la ciudad', d: 'Quince minutos, balance fijo en luz día, 50 mm f/1.8. Tres planos con luces artificiales y cielo azul.', m: 4 },
  { id: 'j9', g: 'Luz', t: 'Retrato de neón', d: 'Un neón como principal lateral y tu LED como brillo de ojos. Vigila el recorte del canal de color en la piel.', m: 7 },
  { id: 'j10', g: 'Luz', t: 'Una cara, cinco luces', d: 'Mismo sujeto con luz frontal, lateral, contra, lateral con relleno y lateral con negativo.', m: 7 },
  { id: 'j11', g: 'Óptica', t: 'Mismo tamaño, tres focales', d: 'Retrato a 24, 50 y 70 mm manteniendo el tamaño del sujeto. Compara fondos.', m: 8 },
  { id: 'j12', g: 'Óptica', t: 'Vertical nativo', d: 'Rueda un mismo momento en horizontal y en vertical real. Compón el vertical por alturas y en profundidad.', m: 8 },
  { id: 'j13', g: 'Cinematografía', t: 'Secuencia de cinco planos', d: 'Una acción cotidiana (un puesto de comida, un andén) con general, medio, primer plano, detalle y reacción, sin cruzar el eje.', m: 6 },
  { id: 'j14', g: 'Cinematografía', t: 'Movimiento motivado', d: 'Tres planos de gimbal con inicio y final estables y un motivo claro para cada movimiento.', m: 6 },
  { id: 'j15', g: 'Cinematografía', t: 'Cámara lenta con sentido', d: 'Un plano a 50p y otro a 100p de algo que gane con la lentitud (agua, humo, tela, un salto).', m: 6 },
  { id: 'j16', g: 'Fotografía', t: 'Escenario y actor', d: 'Encuentra un encuadre con buena luz y espera a que alguien entre. Diez fotos, tres seleccionadas.', m: 5 },
  { id: 'j17', g: 'Fotografía', t: 'Barrido', d: 'Un ciclista o un tren a 1/30–1/60 con AF-C y ráfaga. Busca una buena entre veinte.', m: 5 },
  { id: 'j18', g: 'Fotografía', t: 'Noche con trípode', d: 'ISO 100, f/8, varios segundos: estelas de tráfico. Estabilizador desactivado.', m: 5 },
  { id: 'j19', g: 'Sonido', t: 'Paisaje sonoro', d: 'Graba un minuto de ambiente de tres lugares (templo, estación, mercado) y 30 s de tono de sala de tu habitación.', m: 12 },
  { id: 'j20', g: 'Montaje y color', t: 'Pieza de 30 segundos', d: 'Con material del viaje: gancho, tres tamaños de plano, un J-cut, un L-cut y una rampa. Exporta en 9:16.', m: 10 },
  { id: 'j21', g: 'Montaje y color', t: 'Tu primer PowerGrade', d: 'CST de entrada y salida, corrección y el look de piel natural con sombras frías sutiles. Guárdalo.', m: 11 },
  { id: 'j22', g: 'Flujo profesional', t: 'Protocolo 3-2-1 real', d: 'Durante todo el viaje: cada noche dos copias verificadas antes de formatear. Sin excepciones.', m: 12 },
  { id: 'j23', g: 'Flujo profesional', t: 'Pieza de portfolio', d: 'Planifica y rueda una pieza con concepto, shot list y prioridades: un retrato nocturno, un mini documental de un lugar o un «spec» de marca.', m: 9 },
  { id: 'j24', g: 'De vuelta', t: 'Encargo completo', d: 'Aplica el flujo de 21 pasos de la biblioteca a tu próximo trabajo real para un gimnasio o evento.', m: 9 }
];

// Bibliografía. `k`: tipo de fuente. Las URL se consultaron o localizaron en noviembre de 2026;
// algunas no pudieron abrirse desde el entorno de construcción y se citan a partir de resultados de búsqueda.
export const SOURCES = [
  { k: 'Oficial', a: 'Sony', t: 'Guía de ayuda ILCE-7M4 (α7 IV)', u: 'https://helpguide.sony.net/ilc/2110/v1/es/index.html', n: 'Menús, perfiles de imagen PP1–PP11, formatos, tarjetas, cebras, asistente gamma, antiparpadeo.' },
  { k: 'Oficial', a: 'Sony', t: 'Guía de ayuda: Perfil de imagen (foto/película)', u: 'https://helpguide.sony.net/ilc/2110/v1/en/index.html', n: 'Valores de fábrica de PP1–PP11; aviso sobre el ruido en S-Log3.' },
  { k: 'Oficial', a: 'Sony', t: 'α7 IV: características de vídeo', u: 'https://www.sony.co.uk/interchangeable-lens-cameras/products/ilce-7m4/feature4', n: '4K 60p, sobremuestreo, 10 bits 4:2:2, XAVC S-I.' },
  { k: 'Oficial', a: 'Sony', t: 'α7 IV: lista de características y especificaciones', u: 'https://www.sony.co.in/interchangeable-lens-cameras/products/ilce-7m4/feature61', n: 'ISO base 800 en S-Log; zona ampliada 200–640.' },
  { k: 'Oficial', a: 'Sony', t: 'Formatos de vídeo XAVC HS / S / S-I y tarjetas compatibles', u: 'https://support.d-imaging.sony.co.jp/support/ilc/hevc/03/en/index.html', n: 'Códecs, tasas de bits y requisitos de tarjeta.' },
  { k: 'Oficial', a: 'Sony', t: 'Technical Summary for S-Gamut3.Cine/S-Log3 and S-Gamut3/S-Log3', u: 'https://pro.sony/s3/cms-static-content/uploadfile/06/1237494271406.pdf', n: 'Fórmula de S-Log3 y niveles: negro 3,5 %, gris 41 %, blanco 61 %.' },
  { k: 'Oficial', a: 'Sony', t: 'Guía de ayuda: ajustes de gamma y modo de color (Picture Profile)', u: 'https://helpguide.sony.net/di/pp/v1/en/contents/TP0000909109.html', n: 'Descripción de gammas y rango de S-Log3.' },
  { k: 'Oficial / profesional', a: 'Sony Cine · Alister Chapman', t: 'How to correctly expose S-Log3', u: 'https://sony-cinematography.com/articles/how-correctly-expose-s-log3-a7s-iii-fx3-fx6-fx9/', n: 'Método con carta gris 41 %, blanca 61 % y cebras para piel ~52 %.' },
  { k: 'Artículo', a: 'Newsshooter', t: 'Sony S-Cinetone White Paper (reseña del documento técnico de Sony)', u: 'https://www.newsshooter.com/2020/08/19/sony-s-cinetone-white-paper/', n: 'Origen en VENICE, medios tonos y caída de altas luces desde ~70 %.' },
  { k: 'Práctica profesional', a: 'Alister Chapman (XDCAM-User / foro Sony Cine)', t: 'Exposing S-Cinetone', u: 'https://community.sonycine.com/forums/topic/4-exposing-s-cinetone/', n: 'Caras hacia el 60 %; por encima del 70 % se aplanan. Opinión de un profesional, no especificación.' },
  { k: 'Prueba independiente', a: 'CineD', t: 'Sony a7 IV Lab Test: Rolling Shutter, Dynamic Range and Latitude', u: 'https://www.cined.com/sony-a7-iv-lab-test-rolling-shutter-dynamic-range-and-latitude/', n: '12,9 stops (SNR = 2) en S-Log3 ISO 800; rolling shutter 26,8 ms (FF) y ~13 ms (S35).' },
  { k: 'Prueba independiente', a: 'Photons to Photos (Bill Claff)', t: 'Photographic Dynamic Range charts', u: 'https://www.photonstophotos.net/Charts/PDR.htm', n: 'Rango dinámico fotográfico por ISO y escalones de ganancia medidos.' },
  { k: 'Artículo', a: 'No Film School', t: "Sony's S-Cinetone Explained", u: 'https://nofilmschool.com/sony-s-cinetone-explained', n: 'Resumen del documento técnico de Sony.' },
  { k: 'Oficial', a: 'Blackmagic Design', t: 'DaVinci Resolve: manual de referencia', u: 'https://www.blackmagicdesign.com/products/davinciresolve/training', n: 'Gestión de color, Color Space Transform, scopes, nodos, Fairlight, Deliver.' },
  { k: 'Oficial', a: 'Blackmagic Design', t: 'Formación oficial de DaVinci Resolve (libros y vídeos gratuitos)', u: 'https://www.blackmagicdesign.com/products/davinciresolve/training', n: 'Guías de colorista, edición y Fairlight.' },
  { k: 'Oficial', a: 'Adobe', t: 'Guía del usuario de Premiere Pro', u: 'https://helpx.adobe.com/premiere-pro/user-guide.html', n: 'Proxies, multicámara, reasignación de tiempo, subtítulos, Lumetri, exportación.' },
  { k: 'Oficial', a: 'Adobe', t: 'Guía del usuario de After Effects', u: 'https://helpx.adobe.com/after-effects/user-guide.html', n: 'Fotogramas clave, seguimiento, Roto Brush, Dynamic Link.' },
  { k: 'Oficial', a: 'Adobe', t: 'Guía del usuario de Lightroom (nube)', u: 'https://helpx.adobe.com/lightroom-cc/user-guide.html', n: 'Álbumes, almacenamiento local, máscaras, exportación.' },
  { k: 'Oficial', a: 'YouTube', t: 'Configuración de codificación recomendada para subidas', u: 'https://support.google.com/youtube/answer/1722171', n: 'Tasas de bits por resolución y cadencia.' },
  { k: 'Norma', a: 'EBU', t: 'R 128: Loudness normalisation and permitted maximum level', u: 'https://tech.ebu.ch/publications/r128', n: 'Sonoridad de programa −23 LUFS.' },
  { k: 'Norma', a: 'ITU-R', t: 'BT.709 y BT.1886', u: 'https://www.itu.int/rec/R-REC-BT.709', n: 'Espacio de color y función de transferencia de referencia para HD.' },
  { k: 'Oficial', a: 'WebKit', t: 'Updates to Storage Policy', u: 'https://webkit.org/blog/14403/updates-to-storage-policy/', n: 'Cuotas y almacenamiento de las aplicaciones web en iOS/Safari 17+.' },
  { k: 'Oficial', a: 'MLIT (Japón)', t: 'Normativa de vuelo de aeronaves no tripuladas', u: 'https://www.mlit.go.jp/en/koku/uas.html', n: 'Registro a partir de 100 g y zonas restringidas.' },
  { k: 'Libro', a: 'Blain Brown', t: 'Cinematography: Theory and Practice', u: '', n: 'Manual de referencia de dirección de fotografía.' },
  { k: 'Libro', a: 'Walter Murch', t: 'In the Blink of an Eye', u: '', n: 'Criterios de corte («regla de seis»).' },
  { k: 'Libro', a: 'Alexis Van Hurkman', t: 'Color Correction Handbook', u: '', n: 'Corrección, scopes, tonos de piel.' },
  { k: 'Libro', a: 'Judith Weston', t: 'Directing Actors', u: '', n: 'Dirección por verbos de acción.' },
  { k: 'Comunidad', a: 'Reddit', t: 'r/SonyAlpha, r/videography, r/cinematography, r/colorists, r/Filmmakers', u: 'https://www.reddit.com/r/colorists/', n: 'Experiencias de usuarios. Usadas solo como contexto de prácticas debatidas (sobreexposición de S-Log3, «ISO dual» de la A7 IV, cambio de gamma en macOS); nunca como especificación.' },
  { k: 'Comunidad', a: 'Alpha Shooters Forum', t: 'Hilos sobre ISO nativo y escalones de ganancia en cámaras Sony', u: 'https://www.alphashooters.com/community/', n: 'Opinión de usuarios; el segundo escalón en torno a ISO 3200 en S-Log3 no figura en la documentación de la A7 IV.' }
];

export const MEM_FIELDS = [
  ['uso', 'Para qué la uso'], ['modo', 'Modo (P/A/S/M)'], ['formato', 'Formato y fps / calidad de foto'], ['perfil', 'Perfil de imagen (contenido real)'],
  ['obt', 'Obturación'], ['diaf', 'Diafragma'], ['iso', 'ISO'], ['wb', 'Balance de blancos'], ['af', 'Enfoque (modo, área, motivo)'],
  ['estab', 'SteadyShot'], ['otros', 'Cebras, asistente gamma, audio, notas']
];
// Plantillas ORIENTATIVAS: no son tus ajustes. Sirven como punto de partida para comparar.
export const MEM_TEMPLATES = {
  'video-1': { uso: 'Vídeo general para etalonar', modo: 'M', formato: 'XAVC S 4K 25p · 10 bits 4:2:2', perfil: 'S-Log3 / S-Gamut3.Cine (comprobar)', obt: '1/50', diaf: 'f/2.8', iso: '800', wb: 'Kelvin fijo según escena', af: 'AF continuo · Ancho · Humano · sensibilidad 2', estab: 'Estándar', otros: 'Cebra C2 94+ · asistente gamma ON' },
  'video-2': { uso: 'Cámara lenta deporte', modo: 'M', formato: 'XAVC S 4K 50p · 10 bits (recorte ×1,5)', perfil: 'S-Cinetone o S-Log3 según entrega', obt: '1/100', diaf: 'f/2.8', iso: 'según luz', wb: 'Personalizado', af: 'AF continuo · seguimiento táctil · sensibilidad 1 · velocidad 5', estab: 'Estándar / desactivado en gimbal', otros: 'Prueba de parpadeo' },
  'video-3': { uso: 'Entrega rápida / poca luz', modo: 'M', formato: 'XAVC S 4K 25p · 10 bits', perfil: 'S-Cinetone (comprobar)', obt: '1/50', diaf: 'f/1.8–2.8', iso: 'según luz', wb: 'Personalizado', af: 'AF continuo · ojos', estab: 'Activo a mano', otros: 'Cebra rango 60 ±3 en piel clara' },
  'foto-1': { uso: 'Acción / deporte', modo: 'M + ISO AUTO', formato: 'RAW comprimido · ráfaga Hi', perfil: 'Desactivado', obt: '1/1000', diaf: 'f/2.8', iso: 'AUTO 100–6400', wb: 'Automático', af: 'AF-C · Seguimiento · Humano', estab: 'Activado', otros: 'Mecánico · antiparpadeo en interior' },
  'foto-2': { uso: 'Retrato', modo: 'A', formato: 'RAW sin pérdida', perfil: 'Desactivado', obt: 'mín. 1/200', diaf: 'f/1.8–2.8', iso: 'AUTO 100–3200', wb: 'Automático', af: 'AF-C · Ancho · ojos', estab: 'Activado', otros: '' },
  'foto-3': { uso: 'Viaje / calle', modo: 'A', formato: 'RAW + JPEG', perfil: 'Desactivado', obt: 'mín. 1/250', diaf: 'f/5.6–8', iso: 'AUTO 100–12800', wb: 'Automático', af: 'AF-C · Zona', estab: 'Activado', otros: 'Obturador silencioso donde se requiera discreción' }
};

export const TAG_MODULE = { camara: 1, foco: 1, exposicion: 2, slog: 3, luz: 4, parpadeo: 4, wb: 4, foto: 5, cine: 6, iluminacion: 7, optica: 8, prepro: 9, direccion: 9, cliente: 9, planificacion: 9, seguridad: 9, montaje: 10, color: 11, sonido: 12, audio: 12, entrega: 12, datos: 12, equipo: 14, japon: 15 };
export const TAG_NAME = { camara: 'Cámara', foco: 'Enfoque', exposicion: 'Exposición', slog: 'S-Log3 / S-Cinetone', luz: 'Lectura de la luz', parpadeo: 'Parpadeo', wb: 'Balance de blancos', foto: 'Fotografía', cine: 'Cinematografía', iluminacion: 'Iluminación', optica: 'Ópticas y composición', prepro: 'Preproducción', direccion: 'Dirección de personas', cliente: 'Clientes', planificacion: 'Planificación', seguridad: 'Seguridad', montaje: 'Montaje', color: 'Color', sonido: 'Mezcla', audio: 'Grabación de audio', entrega: 'Entrega y VFX', datos: 'Copias y datos', equipo: 'Equipo secundario', japon: 'Rodar en Japón' };
