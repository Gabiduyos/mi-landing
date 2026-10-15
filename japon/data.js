// Itinerario Japón · 15–29 nov 2026 (versión revisada).
// Coordenadas: los lugares conocidos van con precisión de calle; los marcados con
// approx:true son aproximados y la navegación usa el nombre (q) en Google Maps.
window.TRIP = {
  start: '2026-11-15',
  end: '2026-11-29',

  phases: {
    osaka: { name: 'Osaka', ja: '大阪' },
    kyoto: { name: 'Kioto y Nara', ja: '京都・奈良' },
    tokyo: { name: 'Tokio', ja: '東京' },
    car: { name: 'Ruta en coche', ja: 'ドライブ' }
  },

  // Direcciones editables desde Info → Alojamientos.
  lodging: {
    osaka: {
      label: 'Alojamiento Osaka',
      name: '白樺の宿 (Rikuto)',
      addr: 'Zona Nipponbashi / Kuromon (aproximado)',
      q: 'Nipponbashi Station, Osaka',
      ll: [34.6658, 135.5058],
      approx: true,
      note: 'El anfitrión «白樺の宿-Rikuto» gestiona muchos pisos en Osaka. Pon la dirección exacta de tu reserva para que «Volver a casa» sea preciso.'
    },
    kyoto: {
      label: 'Alojamiento Kioto',
      name: 'Zona de Kamigyō',
      addr: 'Kamigyō-ku, Kioto (aproximado)',
      q: 'Imadegawa Station, Kyoto',
      ll: [35.0292, 135.7555],
      approx: true
    },
    tokyo: {
      label: 'Alojamiento Tokio',
      name: 'Zona de Taitō',
      addr: 'Taitō-ku, Tokio (aproximado)',
      q: 'Ueno Station, Tokyo',
      ll: [35.7115, 139.7830],
      approx: true
    },
    fuji: {
      label: 'Noche en el Fuji (propuesta)',
      name: 'Ryokan en Kawaguchiko',
      addr: 'Orilla del lago Kawaguchiko',
      q: 'Lake Kawaguchiko',
      ll: [35.5130, 138.7560],
      approx: true,
      note: 'Opcional: dormir aquí la noche del 25 en vez de volver a Tokio.'
    }
  },

  days: [
    {
      n: 1, date: '2026-11-15', phase: 'osaka', base: 'osaka', mode: 'transit',
      title: 'Llegada y neones de Minami',
      sub: 'Día suave por el jet lag: santuario, barrio retro y Dōtonbori de noche.',
      temp: [17, 9],
      changes: [
        'Orden ajustado: Namba Yasaka primero (es mejor con luz y su oficina cierra hacia las 17:00), Shinsekai al atardecer y Dōtonbori al final, cuando los neones lucen más.'
      ],
      rain: 'Galerías cubiertas de Shinsaibashi-suji y Namba Parks.',
      stops: [
        {
          id: 'kix', t: '—', kind: 'move', far: true, name: 'Aeropuerto de Kansai (KIX)', ja: '関西国際空港',
          q: 'Kansai International Airport', ll: [34.4352, 135.2440],
          note: 'Nankai Rapi:t o Express hasta Namba (≈40–45 min). Desde Namba, 1 parada a Nipponbashi o 10 min a pie.',
          tips: ['Activar la tarjeta IC (ICOCA/Suica) y la eSIM antes de salir del aeropuerto.', 'Si el vuelo llega a Tokio, ver Info → Transporte.']
        },
        {
          id: 'd1-home', t: '15:00', kind: 'home', lodge: 'osaka', name: 'Check-in en el alojamiento',
          how: 'Nankai → Namba · ≈45 min',
          note: 'Autocheck-in con caja de llaves (según el anuncio, desde las 16:00: preguntar si se pueden dejar maletas antes).'
        },
        {
          id: 'yasaka', t: '16:00', kind: 'sight', name: 'Santuario Namba Yasaka', ja: '難波八阪神社',
          q: 'Namba Yasaka Shrine', ll: [34.6613, 135.4973], how: 'A pie · ≈15 min',
          note: 'Escenario con forma de cabeza de león gigante (mide 12 m). Entrada libre.'
        },
        {
          id: 'shinsekai', t: '17:00', kind: 'sight', name: 'Shinsekai y torre Tsūtenkaku', ja: '新世界・通天閣',
          q: 'Tsutenkaku Tower', ll: [34.6525, 135.5063], how: 'A pie ≈25 min o metro Sakaisuji hasta Ebisuchō',
          note: 'Barrio retro de los años 50. La torre abre de 10:00 a 20:00 (última entrada 19:30).',
          tips: ['Cena: kushikatsu (brochetas rebozadas). Regla de la casa: no mojar dos veces en la salsa común.']
        },
        {
          id: 'dotonbori', t: '19:30', kind: 'sight', name: 'Dōtonbori de noche', ja: '道頓堀',
          q: 'Glico Sign Dotonbori', ll: [34.6688, 135.5013], how: 'Metro Sakaisuji Ebisuchō → Nipponbashi + a pie · ≈15 min',
          note: 'Cartel de Glico desde el puente Ebisubashi, cangrejo gigante y takoyaki.',
          tips: ['Al lado: Hōzenji Yokochō, callejón empedrado con farolillos y una estatua cubierta de musgo.']
        }
      ]
    },

    {
      n: 2, date: '2026-11-16', phase: 'osaka', base: 'osaka', mode: 'transit',
      title: 'Den Den Town, Kuromon y Pokémon',
      sub: 'Todo a pie desde el alojamiento: mercado, barrio otaku y Shinsaibashi.',
      temp: [17, 9],
      changes: [
        'El Pokémon Center Osaka DX está en la planta 9 de Daimaru Shinsaibashi (no en PARCO), a 20 min a pie de Den Den Town.',
        'Animate Umeda pasa al día 3: está en Umeda, al lado del Umeda Sky Building.',
        'Añadidos Super Potato (retro) y Mandarake Grand Chaos, que encajan con el plan.',
        '«OS Camera Service» no aparece en ninguna búsqueda. Si tienes la dirección, apúntala; si no, el día 3 tienes Yodobashi, Kamera no Naniwa y Yaotomi en Umeda.'
      ],
      rain: 'Casi todo es interior o bajo galería cubierta.',
      stops: [
        {
          id: 'kuromon', t: '9:30', kind: 'food', name: 'Mercado de Kuromon', ja: '黒門市場',
          q: 'Kuromon Market', ll: [34.6656, 135.5067], how: 'A pie desde el alojamiento',
          note: 'Desayuno de puestos: wagyu en brocheta, vieiras, fruta. Turístico y algo caro, pero está al lado.'
        },
        {
          id: 'denden', t: '11:00', kind: 'shop', name: 'Nipponbashi Den Den Town (Otaroad)', ja: '日本橋でんでんタウン',
          q: 'Den Den Town Osaka', ll: [34.6606, 135.5047], how: 'A pie · ≈10 min',
          note: 'Calle Otaroad y alrededores. La mayoría de tiendas abre entre 10:00 y 11:00.',
          shops: [
            { n: 'Surugaya', ja: '駿河屋', q: '駿河屋 日本橋' },
            { n: 'Lashinbang', ja: 'らしんばん', q: 'らしんばん 大阪日本橋' },
            { n: 'Super Potato', ja: 'スーパーポテト', q: 'スーパーポテト 大阪日本橋店' },
            { n: 'Joshin Super Kids Land', ja: 'ジョーシン キッズランド', q: 'Joshin Super Kids Land Nipponbashi' }
          ],
          tips: ['Llevar el pasaporte: hace falta para el tax-free (ojo, sistema nuevo: ver Info).']
        },
        {
          id: 'osakacam', t: '—', kind: 'shop', opt: true, name: 'OS Camera Service (por localizar)',
          q: 'OS Camera Service Osaka', ll: null,
          note: 'No he podido verificar esta tienda. El botón busca el nombre en Google Maps por si aparece.'
        },
        {
          id: 'pkdx-osaka', t: '15:00', kind: 'shop', name: 'Pokémon Center Osaka DX', ja: 'ポケモンセンターオーサカDX（大丸心斎橋店 本館9F）',
          q: 'Pokémon Center Osaka DX Daimaru Shinsaibashi', ll: [34.6727, 135.5011], how: 'A pie por Shinsaibashi-suji · ≈20 min',
          note: 'Planta 9 de Daimaru Shinsaibashi. Al lado está el Pokémon Café, solo con reserva.',
          tips: ['Las reservas del café abren 31 días antes a las 18:00 de Japón (11:00 en España peninsular) y vuelan en minutos.']
        },
        {
          id: 'grandchaos', t: '16:30', kind: 'shop', name: 'Mandarake Grand Chaos', ja: 'まんだらけ グランドカオス',
          q: 'Mandarake Grand Chaos', ll: [34.6718, 135.4981], approx: true, how: 'A pie · ≈8 min (Amerikamura)',
          note: 'La Mandarake más grande de Osaka, en el barrio juvenil de Amerika-mura.'
        },
        {
          id: 'uranamba', t: '19:00', kind: 'food', name: 'Cena en Ura-Namba', ja: '裏なんば',
          q: 'Ura Namba', ll: [34.6653, 135.5040], approx: true, how: 'A pie · ≈15 min',
          note: 'Callejuelas con izakayas pequeñas detrás de Namba, más de barrio que Dōtonbori.'
        }
      ]
    },

    {
      n: 3, date: '2026-11-17', phase: 'osaka', base: 'osaka', mode: 'transit',
      title: 'Acuario, Umeda y atardecer en el Sky Building',
      sub: 'Bahía por la mañana; tiendas de Umeda y puesta de sol a 173 m de altura.',
      temp: [16, 9],
      changes: [
        'Tiendas de Umeda (Animate, Pokémon Center Osaka, cámaras) agrupadas aquí, a 10 min del Sky Building.'
      ],
      rain: 'Todo el día funciona con lluvia, salvo la terraza al aire libre del Sky Building.',
      stops: [
        {
          id: 'kaiyukan', t: '9:45', kind: 'sight', name: 'Acuario Kaiyukan', ja: '海遊館',
          q: 'Osaka Aquarium Kaiyukan', ll: [34.6545, 135.4290], how: 'Metro Chūō hasta Ōsakakō · ≈30 min',
          note: 'Tiburón ballena en el tanque central de 9 m de profundidad. Abre a las 10:00; dedicarle ≈2,5 h.',
          tips: ['Entrada online con fecha para saltarse la cola de taquilla.']
        },
        {
          id: 'tempozan', t: '12:30', kind: 'sight', opt: true, name: 'Noria de Tempozan', ja: '天保山大観覧車',
          q: 'Tempozan Ferris Wheel', ll: [34.6563, 135.4313], how: 'A pie · 3 min',
          note: 'Opcional: vistas de la bahía. Comida en Tempozan Marketplace (zona retro Naniwa Kuishinbo Yokochō).'
        },
        {
          id: 'umeda', t: '14:30', kind: 'shop', name: 'Tiendas de Umeda', ja: '梅田',
          q: 'Yodobashi Umeda', ll: [34.7046, 135.4962], how: 'Metro Chūō → Hommachi → Midōsuji → Umeda · ≈30 min',
          note: 'Anime, Pokémon y cámaras en un radio de 10 minutos a pie.',
          shops: [
            { n: 'Animate Umeda', ja: 'アニメイト梅田', q: 'Animate Umeda' },
            { n: 'Pokémon Center Osaka (Daimaru Umeda 13F)', ja: 'ポケモンセンターオーサカ', q: 'Pokémon Center Osaka Daimaru Umeda' },
            { n: 'Yodobashi Camera Umeda', ja: 'ヨドバシカメラ梅田', q: 'Yodobashi Camera Multimedia Umeda' },
            { n: 'Kamera no Naniwa (usadas)', ja: 'カメラのナニワ', q: 'カメラのナニワ 梅田' },
            { n: 'Yaotomi (carrete y usadas)', ja: '八百富写真機店', q: '八百富写真機店 大阪駅前' }
          ]
        },
        {
          id: 'umedasky', t: '16:10', kind: 'sight', name: 'Umeda Sky Building', ja: '梅田スカイビル 空中庭園展望台',
          q: 'Umeda Sky Building', ll: [34.7053, 135.4903], how: 'A pie · ≈10 min por el túnel bajo las vías',
          note: 'Puesta de sol ≈16:55. Llegar 30–40 min antes para coger sitio en la terraza circular y quedarse a ver las luces. Abre hasta las 22:30.'
        },
        {
          id: 'shinumeda', t: '18:30', kind: 'food', name: 'Shin-Umeda Shokudōgai', ja: '新梅田食道街',
          q: 'Shin Umeda Shokudogai', ll: [34.7024, 135.4987], approx: true, how: 'A pie · ≈10 min',
          note: 'Galería de bares y restaurantes bajo las vías del tren. Okonomiyaki, kushikatsu, izakayas.'
        }
      ]
    },

    {
      n: 4, date: '2026-11-18', phase: 'osaka', base: 'osaka', mode: 'transit',
      title: 'Katsuō-ji y el valle de Minō en otoño',
      sub: 'Templo de los daruma con arces rojos y bajada a pie junto al río.',
      temp: [16, 8],
      changes: [
        'El Crayon Shin-chan Buriburi Cinema Studio no está en Osaka: está en Kasukabe (Saitama), al norte de Tokio. Lo he movido al día 13, que ya va a Saitama en coche.',
        'En su lugar, la cascada de Minō: está al lado de Katsuō-ji y es uno de los mejores paseos de otoño de Osaka.',
        'Tarde para enviar las maletas a Tokio y viajar a Kioto solo con mochila.'
      ],
      rain: 'Katsuō-ji con lluvia sigue siendo bonito; saltarse el paseo del río y volver en bus. Alternativa cubierta: castillo de Osaka (museo).',
      stops: [
        {
          id: 'kayano', t: '8:30', kind: 'move', name: 'Estación Minō-Kayano', ja: '箕面萱野駅',
          q: 'Minoh-Kayano Station', ll: [34.8295, 135.4886], approx: true, how: 'Metro Midōsuji directo desde Namba · ≈40 min',
          note: 'Bus Hankyū hacia Hokusetsu Reien, bajar en Katsuō-ji (≈20–25 min, 2–3 buses por hora: mirar horario).'
        },
        {
          id: 'katsuoji', t: '9:30', kind: 'sight', name: 'Templo Katsuō-ji', ja: '勝尾寺',
          q: 'Katsuoji Temple', ll: [34.8684, 135.4917], how: 'Bus Hankyū · ≈25 min',
          note: 'Miles de daruma por escaleras, muros y faroles. Temporada de arces del 1 nov al 13 dic. Entre semana 8:00–17:00; entrada 500 ¥.',
          tips: ['Tradición: comprar un daruma de la victoria, pintar un ojo al pedir el deseo y el otro cuando se cumpla.']
        },
        {
          id: 'minofalls', t: '12:30', kind: 'sight', name: 'Cascada de Minō', ja: '箕面大滝',
          q: 'Minoh Falls', ll: [34.8533, 135.4717], how: 'Taxi ≈15 min (pedir con la app GO) o sendero Tōkai ≈1 h 30',
          note: 'Cascada de 33 m rodeada de arces. Bajada a pie de 2,8 km (≈45 min) junto al río hasta la estación.',
          tips: ['Probar momiji tempura: hojas de arce rebozadas y fritas, típicas de Minō.']
        },
        {
          id: 'minoh-st', t: '14:30', kind: 'move', name: 'Estación Hankyū Minō', ja: '阪急箕面駅',
          q: 'Minoh Station', ll: [34.8362, 135.4706], how: 'A pie río abajo · ≈45 min',
          note: 'Hankyū Minō → Ishibashi Handai-mae → Umeda (≈30 min).'
        },
        {
          id: 'takkyubin', t: '18:00', kind: 'task', lodge: 'osaka', name: 'Enviar las maletas a Tokio',
          note: 'Takkyūbin (Yamato) desde un konbini o el propio alojamiento, con entrega el 21 nov en el alojamiento de Taitō (confirmar que lo aceptan). Unos 2.500–3.500 ¥ por maleta.',
          tips: ['Kioto se hace con mochila: sin maletas en buses ni en el Shinkansen.']
        }
      ]
    },

    {
      n: 5, date: '2026-11-19', phase: 'kyoto', base: 'kyoto', mode: 'transit',
      title: 'Kioto clásico: Higashiyama y Gion',
      sub: 'Ruta en bajada desde Kiyomizu-dera hasta Gion al atardecer.',
      temp: [16, 7],
      changes: [
        'Ruta en sentido único (cuesta abajo): Kiyomizu → Ninenzaka → pagoda Yasaka → Gion, sin desandar.',
        'La iluminación nocturna de otoño de Kiyomizu suele empezar hacia el 20–22 nov. Si este año se anuncia antes, mejor venir de noche.'
      ],
      rain: 'Museo Nacional de Kioto o el mercado cubierto de Nishiki.',
      stops: [
        {
          id: 'kyoto-st', t: '9:30', kind: 'move', name: 'Tren a Kioto', ja: '京都駅',
          q: 'Kyoto Station', ll: [34.9858, 135.7588], how: 'JR Special Rapid desde Osaka · ≈30 min',
          note: 'Alternativa más barata: Hankyū de Umeda a Karasuma (≈45 min). Luego metro Karasuma hasta Imadegawa.'
        },
        {
          id: 'd5-home', t: '11:00', kind: 'home', lodge: 'kyoto', name: 'Dejar mochilas en Kamigyō',
          how: 'Metro Karasuma · ≈10 min'
        },
        {
          id: 'kiyomizu', t: '13:30', kind: 'sight', name: 'Templo Kiyomizu-dera', ja: '清水寺',
          q: 'Kiyomizu-dera', ll: [34.9949, 135.7850], how: 'Taxi ≈20 min o bus (ver Google Maps)',
          note: 'Gran terraza de madera sobre el bosque. Abre a las 6:00. Bajar a la fuente Otowa.'
        },
        {
          id: 'ninenzaka', t: '15:00', kind: 'sight', name: 'Sannenzaka y Ninenzaka', ja: '三年坂・二年坂',
          q: 'Ninenzaka', ll: [34.9978, 135.7809], how: 'A pie · 5 min',
          note: 'Cuestas empedradas con casas de madera. Hay un Starbucks dentro de una casa tradicional.'
        },
        {
          id: 'yasakapagoda', t: '15:45', kind: 'sight', name: 'Pagoda Yasaka', ja: '八坂の塔（法観寺）',
          q: 'Yasaka Pagoda Hokanji', ll: [34.9986, 135.7793], how: 'A pie · 3 min',
          note: 'La foto clásica de Kioto, desde la calle Yasaka-dōri.'
        },
        {
          id: 'hanamikoji', t: '16:30', kind: 'sight', name: 'Gion: Hanamikōji', ja: '花見小路',
          q: 'Hanamikoji Street', ll: [35.0028, 135.7751], how: 'A pie · ≈15 min por Nene-no-michi',
          note: 'Atardecer ≈16:50 y farolillos encendidos.',
          tips: ['Desde 2024 está prohibido hacer fotos en los callejones privados junto a Hanamikōji (multa de 10.000 ¥). No seguir ni fotografiar de cerca a geiko y maiko.']
        },
        {
          id: 'shirakawa', t: '17:15', kind: 'sight', name: 'Canal Shirakawa', ja: '白川・巽橋',
          q: 'Tatsumi Bridge Gion', ll: [35.0058, 135.7747], how: 'A pie · 5 min',
          note: 'Sauces, canal y casas de té. La zona más fotogénica de Gion de noche.'
        },
        {
          id: 'pontocho', t: '18:30', kind: 'food', name: 'Cena en Pontochō', ja: '先斗町',
          q: 'Pontocho Alley', ll: [35.0053, 135.7707], how: 'A pie · 5 min',
          note: 'Callejón estrecho junto al río Kamo. Muchos sitios piden reserva: mirar antes de ir.'
        }
      ]
    },

    {
      n: 6, date: '2026-11-20', phase: 'kyoto', base: 'kyoto', mode: 'transit',
      title: 'Torii al amanecer y ciervos de Nara',
      sub: 'Fushimi Inari casi vacío a primera hora, luego Nara hasta el atardecer.',
      temp: [16, 7],
      changes: [
        'De Inari a Nara por Keihan + Kintetsu: llega a Kintetsu-Nara, a 5 min de los ciervos (la estación JR queda más lejos).',
        'Atardecer en la terraza de Nigatsu-dō, gratis y con vistas sobre el Daibutsuden.',
        'Ojo: la pagoda de Kōfuku-ji está cubierta por andamios por restauración.'
      ],
      rain: 'Fushimi Inari con lluvia y niebla es precioso. En Nara, Tōdai-ji y el Museo Nacional son interiores.',
      stops: [
        {
          id: 'inari', t: '6:45', kind: 'sight', name: 'Fushimi Inari-taisha', ja: '伏見稲荷大社',
          q: 'Fushimi Inari Taisha', ll: [34.9671, 135.7727], how: 'Metro a Kioto + JR Nara hasta Inari · ≈30 min (o taxi ≈25 min)',
          note: 'Abierto 24 h. Amanecer ≈6:35: los Senbon Torii están casi vacíos para grabar. Subir al menos hasta el cruce de Yotsutsuji (≈45 min) por las vistas.'
        },
        {
          id: 'tofukuji', t: '9:00', kind: 'sight', opt: true, name: 'Templo Tōfuku-ji', ja: '東福寺',
          q: 'Tofukuji Temple', ll: [34.9762, 135.7740], how: 'A pie · ≈20 min',
          note: 'Opcional. El puente Tsūtenkyō sobre un mar de arces es de los mejores momiji de Kioto. Con la previsión de 2026 el 20 nov puede estar a medio color.'
        },
        {
          id: 'nakatanidou', t: '11:30', kind: 'food', name: 'Nakatanidō (mochi)', ja: '中谷堂',
          q: 'Nakatanidou Nara', ll: [34.6820, 135.8290], approx: true, how: 'Keihan → Tambabashi → Kintetsu → Kintetsu-Nara · ≈50 min',
          note: 'Machacan el mochi a mano a una velocidad de vértigo (el espectáculo es intermitente).'
        },
        {
          id: 'narapark', t: '12:15', kind: 'sight', name: 'Parque de Nara (ciervos)', ja: '奈良公園',
          q: 'Nara Park', ll: [34.6850, 135.8430], how: 'A pie · ≈10 min',
          note: 'Galletas shika senbei ≈200 ¥. Si te inclinas, muchos ciervos se inclinan.',
          tips: ['Guardar mapas y bolsas de papel: se los comen. Pueden dar cabezazos si ven comida.']
        },
        {
          id: 'todaiji', t: '13:30', kind: 'sight', name: 'Tōdai-ji (Gran Buda)', ja: '東大寺 大仏殿',
          q: 'Todaiji Temple', ll: [34.6890, 135.8398], how: 'A pie · ≈10 min',
          note: 'Buda de bronce de 15 m en uno de los mayores edificios de madera del mundo. Nov–mar 8:00–17:00.',
          tips: ['Detrás del Buda hay un pilar con un agujero del tamaño de su fosa nasal: cruzarlo trae suerte.']
        },
        {
          id: 'kasuga', t: '14:45', kind: 'sight', opt: true, name: 'Kasuga-taisha', ja: '春日大社',
          q: 'Kasuga Taisha', ll: [34.6813, 135.8484], how: 'A pie · ≈20 min por el bosque',
          note: 'Opcional: miles de faroles de piedra y bronce.'
        },
        {
          id: 'nigatsudo', t: '16:15', kind: 'sight', name: 'Nigatsu-dō al atardecer', ja: '二月堂',
          q: 'Nigatsudo Hall', ll: [34.6893, 135.8445], how: 'A pie · ≈20 min',
          note: 'Terraza de madera gratuita con vistas sobre Nara. Puesta de sol ≈16:50.'
        },
        {
          id: 'kintetsu-nara', t: '17:30', kind: 'move', name: 'Vuelta a Kioto', ja: '近鉄奈良駅',
          q: 'Kintetsu Nara Station', ll: [34.6844, 135.8277], how: 'A pie · ≈20 min',
          note: 'Kintetsu a Kyoto (≈35 min en Limited Express, con suplemento; ≈50 min en Express) y metro a Kamigyō.'
        }
      ]
    },

    {
      n: 7, date: '2026-11-21', phase: 'kyoto', base: 'tokyo', mode: 'transit', to: 'tokyo',
      title: 'Arashiyama al alba, Kinkaku-ji y Shinkansen',
      sub: 'Bambú sin gente a las 7, Pabellón Dorado y tarde en Akihabara.',
      temp: [15, 7],
      changes: [
        'El PDF tenía dos «Día 7»: ahora es un único día Kioto → Tokio.',
        'Caben Arashiyama y Kinkaku-ji si se madruga y se usa taxi entre los dos (≈20 min).',
        'Sábado en pleno otoño: reservar el Shinkansen en cuanto se abra la venta, un mes antes.'
      ],
      rain: 'Con lluvia, quedarse solo con Kinkaku-ji y salir antes hacia Tokio.',
      stops: [
        {
          id: 'bamboo', t: '7:15', kind: 'sight', name: 'Bosque de bambú de Arashiyama', ja: '竹林の小径',
          q: 'Arashiyama Bamboo Grove', ll: [35.0170, 135.6713], how: 'JR Sagano desde Nijō · ≈12 min, o taxi ≈25 min',
          note: 'Abierto siempre. A las 7:00 aún no llegan los grupos: el mejor momento para grabar.'
        },
        {
          id: 'tenryuji', t: '8:30', kind: 'sight', name: 'Jardín de Tenryū-ji', ja: '天龍寺',
          q: 'Tenryuji Temple', ll: [35.0156, 135.6737], how: 'A pie · 3 min',
          note: 'Jardín zen Patrimonio de la Humanidad. Abre a las 8:30; su puerta norte da al bambú.'
        },
        {
          id: 'togetsukyo', t: '9:30', kind: 'sight', name: 'Puente Togetsukyō', ja: '渡月橋',
          q: 'Togetsukyo Bridge', ll: [35.0129, 135.6778], how: 'A pie · 8 min',
          note: 'Puente sobre el río Katsura con las montañas de arces detrás.'
        },
        {
          id: 'kinkakuji', t: '10:15', kind: 'sight', name: 'Kinkaku-ji (Pabellón Dorado)', ja: '金閣寺（鹿苑寺）',
          q: 'Kinkakuji', ll: [35.0394, 135.7292], how: 'Taxi ≈20 min (≈2.500 ¥)',
          note: 'Abre a las 9:00. La visita es un recorrido de sentido único de unos 45 min.'
        },
        {
          id: 'd7-home', t: '11:30', kind: 'home', lodge: 'kyoto', name: 'Recoger mochilas',
          how: 'Taxi o bus · ≈15 min'
        },
        {
          id: 'shinkansen', t: '12:30', kind: 'move', name: 'Shinkansen Kioto → Tokio', ja: '京都駅 新幹線',
          q: 'Kyoto Station Shinkansen', ll: [34.9858, 135.7588], how: 'Metro Karasuma · ≈15 min',
          note: 'Nozomi ≈2 h 15. Asiento E: ventanilla del lado del Fuji. Comprar ekiben (bentō de tren) en la estación.',
          tips: ['Maletas de más de 160 cm (alto + ancho + fondo) obligan a reservar asiento con espacio para equipaje.']
        },
        {
          id: 'd7-tokyo', t: '15:30', kind: 'home', lodge: 'tokyo', name: 'Check-in en Taitō',
          how: 'JR Yamanote desde Tokio · ≈10 min',
          note: 'Las maletas enviadas desde Osaka deberían estar esperando.'
        },
        {
          id: 'akiba', t: '17:00', kind: 'shop', name: 'Akihabara', ja: '秋葉原',
          q: 'Akihabara Radio Kaikan', ll: [35.6987, 139.7713], how: 'JR · 1–2 paradas desde Ueno',
          note: 'Muchas tiendas cierran entre las 20:00 y las 21:00.',
          shops: [
            { n: 'TRADER', ja: 'トレーダー', q: 'トレーダー 秋葉原' },
            { n: 'AmiAmi (Radio Kaikan)', ja: 'あみあみ', q: 'あみあみ 秋葉原ラジオ会館店' },
            { n: 'Hard Off', ja: 'ハードオフ', q: 'ハードオフ 秋葉原' },
            { n: 'Super Potato', ja: 'スーパーポテト', q: 'スーパーポテト 秋葉原店' },
            { n: 'Mandarake Complex', ja: 'まんだらけコンプレックス', q: 'Mandarake Complex Akihabara' }
          ]
        }
      ]
    },

    {
      n: 8, date: '2026-11-22', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Shibuya, Shinjuku y Nakano',
      sub: 'Un recorrido en línea: Shibuya → Shinjuku → Nakano → Shinjuku de noche.',
      temp: [15, 7],
      changes: [
        'La Tokyu Kabukichō Tower está en Shinjuku, no en Shibuya. Reordenado para no cruzar la ciudad dos veces.',
        'Shibuya a primera hora de un domingo, con menos gente; Shinjuku vuelve por la noche, cuando luce el neón.',
        'Desde Ueno, la línea Ginza llega directa a Shibuya.'
      ],
      rain: 'Todo funciona con lluvia; cambiar el cruce de Shibuya por la vista desde una cafetería.',
      stops: [
        {
          id: 'hachiko', t: '9:00', kind: 'sight', name: 'Hachikō y el cruce de Shibuya', ja: 'ハチ公像・スクランブル交差点',
          q: 'Hachiko Statue', ll: [35.6591, 139.7006], how: 'Metro Ginza directo desde Ueno · ≈30 min',
          note: 'Para verlo desde arriba: Shibuya Sky (con reserva) o la azotea de Magnet by Shibuya109.'
        },
        {
          id: 'parco', t: '11:00', kind: 'shop', name: 'Shibuya PARCO', ja: '渋谷PARCO',
          q: 'Shibuya PARCO', ll: [35.6620, 139.6987], how: 'A pie · ≈7 min',
          note: 'Planta 6: Pokémon Center Shibuya, Nintendo TOKYO, Capcom Store y Jump Shop.',
          shops: [
            { n: 'Mandarake Shibuya', ja: 'まんだらけ渋谷店', q: 'Mandarake Shibuya' }
          ]
        },
        {
          id: 'shinjukucam', t: '13:00', kind: 'shop', name: 'Cámaras en Shinjuku', ja: '新宿 カメラ店',
          q: 'Map Camera Shinjuku', ll: [35.6918, 139.6975], approx: true, how: 'JR Yamanote · ≈7 min',
          note: 'Lado oeste de la estación: usadas y nuevas, con mucho stock de objetivos.',
          shops: [
            { n: 'Map Camera', ja: 'マップカメラ', q: 'Map Camera Shinjuku' },
            { n: 'Kitamura Camera', ja: 'カメラのキタムラ', q: 'カメラのキタムラ 新宿' },
            { n: 'Yodobashi Camera (tienda principal)', ja: 'ヨドバシカメラ 新宿西口本店', q: 'Yodobashi Camera Shinjuku Nishiguchi' }
          ]
        },
        {
          id: 'nakano', t: '15:00', kind: 'shop', name: 'Nakano Broadway', ja: '中野ブロードウェイ',
          q: 'Nakano Broadway', ll: [35.7090, 139.6656], how: 'JR Chūō rápido · ≈5 min',
          note: 'Mandarake (una veintena de locales), Lashinbang, relojes y juguetes retro. Muchas tiendas abren a las 12:00 y cierran a las 20:00.'
        },
        {
          id: 'kabukicho', t: '18:30', kind: 'sight', name: 'Kabukichō y Tokyu Kabukichō Tower', ja: '東急歌舞伎町タワー',
          q: 'Tokyu Kabukicho Tower', ll: [35.6958, 139.7005], how: 'JR Chūō · ≈5 min',
          note: 'Neones, la cabeza de Godzilla del Hotel Gracery y la torre nueva de Kabukichō.'
        },
        {
          id: 'omoide', t: '19:30', kind: 'food', name: 'Omoide Yokochō', ja: '思い出横丁',
          q: 'Omoide Yokocho', ll: [35.6930, 139.6997], how: 'A pie · ≈8 min',
          note: 'Yakitori en el «callejón del humo». Después, copa en Golden Gai.'
        }
      ]
    },

    {
      n: 9, date: '2026-11-23', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Rastro de Ōi, teamLab y la bahía',
      sub: 'Festivo nacional (Día de Acción de Gracias por el Trabajo): mercado, arte digital y atardecer.',
      temp: [15, 7],
      changes: [
        'teamLab Planets está en Toyosu, no en Odaiba. Se enlaza con Odaiba en el tren Yurikamome.',
        'La Doraemon Future Department Store de DiverCity está cerrada por reforma (1 oct – principios de dic.). Su tienda temporal en Tokyo Dome City abre justo hasta hoy, 23 nov.',
        'La estatua del Gundam Unicorn de DiverCity se desmontó en agosto de 2026.',
        'El Pokémon Center Tokyo DX está en Nihonbashi (no en Odaiba): ver día 15.'
      ],
      rain: 'El rastro se cancela con lluvia. Plan B: teamLab por la mañana y tienda Doraemon por la tarde.',
      stops: [
        {
          id: 'oiflea', t: '8:45', kind: 'shop', name: 'Tokyo City Flea Market (Ōi)', ja: '大井競馬場フリーマーケット',
          q: '大井競馬場 フリーマーケット', ll: [35.5937, 139.7440], approx: true, how: 'JR a Hamamatsuchō + monorraíl a Ōi Keibajō-mae · ≈35 min',
          note: 'Para el 23 nov aparece con horario reducido, 8:45–13:30. Se cancela si llueve: mirar la web o redes la víspera.',
          tips: ['Efectivo en billetes pequeños y monedas. Regatear con educación y sin insistir.']
        },
        {
          id: 'teamlab', t: '13:30', kind: 'sight', name: 'teamLab Planets', ja: 'チームラボプラネッツ TOKYO',
          q: 'teamLab Planets TOKYO', ll: [35.6491, 139.7899], how: 'Tren · ≈40 min',
          note: 'Se va descalzo y en algunas salas el agua llega a las rodillas: pantalón que se pueda remangar. Entrada con hora: en festivo se agota.'
        },
        {
          id: 'odaiba', t: '16:00', kind: 'sight', name: 'Atardecer en Odaiba', ja: 'お台場海浜公園',
          q: 'Odaiba Seaside Park', ll: [35.6298, 139.7745], how: 'Yurikamome desde Shin-Toyosu · ≈20 min',
          note: 'Puesta de sol ≈16:30 con el Rainbow Bridge y la réplica de la Estatua de la Libertad.',
          tips: ['En la Yurikamome, primer vagón: la vista frontal del recorrido por la bahía merece la pena.']
        },
        {
          id: 'doraemon', t: '17:45', kind: 'shop', name: 'Doraemon: tienda temporal', ja: 'ドラえもん未来デパート（東京ドームシティ期間限定店）',
          q: 'Tokyo Dome City', ll: [35.7056, 139.7519], how: 'Yurikamome + JR · ≈45 min',
          note: 'En Tokyo Dome City (zona Central Park), del 9 oct al 23 nov, 11:00–19:00. Si no llega a tiempo, la tienda online vende desde el 12 nov.'
        }
      ]
    },

    {
      n: 10, date: '2026-11-24', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Tokyo DisneySea',
      sub: 'Día completo en el parque, en su 25º aniversario.',
      temp: [15, 7],
      changes: [
        'Martes: buena elección, entre semana hay menos colas que en fin de semana.',
        '2026 es el 25º aniversario de DisneySea («Sparkling Jubilee») y ya hay decoración navideña: contar con más gente de lo normal.'
      ],
      rain: 'Muchas atracciones son cubiertas; llevar chubasquero (los paraguas estorban en las colas).',
      stops: [
        {
          id: 'maihama', t: '7:15', kind: 'move', name: 'Tren a Maihama', ja: '舞浜駅',
          q: 'Maihama Station', ll: [35.6366, 139.8838], how: 'JR a Tokio + línea Keiyō · ≈45 min',
          note: 'En Tokyo Station el andén de la línea Keiyō está a 10–15 min a pie: contar con ello. Luego Disney Resort Line (o 15 min a pie).'
        },
        {
          id: 'disneysea', t: '8:15', kind: 'sight', name: 'Tokyo DisneySea', ja: '東京ディズニーシー',
          q: 'Tokyo DisneySea', ll: [35.6267, 139.8851], how: 'Disney Resort Line · 5 min',
          note: 'Estar en la puerta antes de la apertura. Instalar la app Tokyo Disney Resort antes del viaje.',
          tips: [
            'Premier Access (de pago) para Fantasy Springs: Anna and Elsa\'s Frozen Journey, Peter Pan\'s Never Land Adventure y Rapunzel\'s Lantern Festival.',
            'Priority Pass (gratis) para otras atracciones, desde la app en cuanto se entra.'
          ]
        }
      ]
    },

    {
      n: 11, date: '2026-11-25', phase: 'car', base: 'fuji', mode: 'car',
      title: 'Rumbo al Fuji',
      sub: 'Pagoda Chūreitō con luz de mañana, Oshino Hakkai y atardecer en el lago.',
      temp: [12, 0],
      changes: [
        'Chūreitō a primera hora: el Fuji suele estar despejado por la mañana y se nubla a partir de mediodía.',
        'Propuesta: dormir en Kawaguchiko (ryokan con onsen) en vez de volver de noche. El día 12 se va directo a Hachiōji, a 1 h, sin pasar por Tokio.'
      ],
      rain: 'Si el Fuji está tapado: museo Itchiku Kubota y onsen. Mirar la webcam del Fuji antes de salir y, si el día 26 se presenta mejor, invertir el orden.',
      stops: [
        {
          id: 'rentacar', t: '7:30', kind: 'move', name: 'Recogida del coche', ja: 'レンタカー（上野）',
          q: 'レンタカー 上野駅', ll: [35.7128, 139.7768], approx: true,
          note: 'Pedir tarjeta ETC para los peajes y GPS en inglés. Llevar carné español + Permiso Internacional.'
        },
        {
          id: 'chureito', t: '10:00', kind: 'sight', name: 'Pagoda Chūreitō', ja: '新倉山浅間公園（忠霊塔）',
          q: 'Chureito Pagoda', ll: [35.5012, 138.8019], how: 'Shuto → Chūō Expressway → Kawaguchiko IC · ≈2 h',
          note: 'La foto de la pagoda con el Fuji detrás. 398 escalones hasta el mirador; aparcamiento junto al parque.',
          tips: ['Salir antes de las 8:00 evita lo peor del tráfico de salida de Tokio.']
        },
        {
          id: 'oshino', t: '11:30', kind: 'sight', name: 'Oshino Hakkai', ja: '忍野八海',
          q: 'Oshino Hakkai', ll: [35.4604, 138.8329], how: 'Coche · ≈20 min',
          note: 'Ocho estanques de agua del deshielo del Fuji, transparente como el cristal.'
        },
        {
          id: 'hoto', t: '13:00', kind: 'food', name: 'Comida: hōtō', ja: 'ほうとう',
          q: 'ほうとう 河口湖', ll: null, how: 'Coche · ≈20 min',
          note: 'Fideos anchos con calabaza en caldo de miso, plato típico de Yamanashi. Ideal con frío.'
        },
        {
          id: 'momiji', t: '14:30', kind: 'sight', name: 'Corredor de arces de Kawaguchiko', ja: '河口湖 もみじ回廊',
          q: 'Momiji Corridor Kawaguchiko', ll: [35.5176, 138.7470], approx: true, how: 'Coche · ≈15 min',
          note: 'Túnel de arces en la orilla norte. A finales de noviembre puede quedar color.'
        },
        {
          id: 'oishi', t: '15:45', kind: 'sight', name: 'Parque Ōishi', ja: '大石公園',
          q: 'Oishi Park Kawaguchiko', ll: [35.5266, 138.7428], approx: true, how: 'Coche · ≈5 min',
          note: 'El Fuji al otro lado del lago. Puesta de sol ≈16:35; abrigarse, al anochecer se baja de 5 °C.'
        },
        {
          id: 'd11-home', t: '17:30', kind: 'home', lodge: 'fuji', name: 'Ryokan en Kawaguchiko',
          note: 'Si al final se vuelve a Tokio: ≈2 h de coche.'
        }
      ]
    },

    {
      n: 12, date: '2026-11-26', phase: 'car', base: 'tokyo', mode: 'car',
      title: 'Ruta de megatiendas: Hachiōji y Machida',
      sub: 'Del Fuji a las tiendas de segunda mano de la periferia oeste.',
      temp: [15, 6],
      changes: [
        'Desde Kawaguchiko, Hachiōji queda en el camino de vuelta por la Chūō Expressway.',
        'Eco Town Hachiōji reúne BOOKOFF y varias tiendas «Off»: puede que el BOOKOFF SUPER BAZAAR apuntado esté ahí mismo. Confirmar en la web de BOOKOFF.'
      ],
      rain: 'Todo es interior.',
      stops: [
        {
          id: 'sunrise-fuji', t: '6:25', kind: 'sight', opt: true, name: 'Amanecer en el lago', ja: '河口湖',
          q: 'Lake Kawaguchiko north shore', ll: [35.5214, 138.7525], approx: true,
          note: 'Si se duerme en Kawaguchiko: el Fuji se tiñe de rosa con las primeras luces.'
        },
        {
          id: 'ecotown', t: '10:00', kind: 'shop', name: 'Eco Town Hachiōji', ja: 'エコタウン八王子',
          q: 'エコタウン八王子 大和田町', ll: [35.6620, 139.3545], approx: true, how: 'Chūō Expressway → Hachiōji IC · ≈1 h',
          note: 'Complejo de segunda mano en Ōwada-machi: BOOKOFF, Hard Off, Off House, Hobby Off…',
          shops: [
            { n: 'BOOKOFF SUPER BAZAAR Hachiōji', ja: 'ブックオフ スーパーバザー 八王子', q: 'BOOKOFF SUPER BAZAAR 八王子' }
          ]
        },
        {
          id: 'machida', t: '14:00', kind: 'shop', name: 'BOOKOFF SUPER BAZAAR Machida', ja: 'ブックオフ スーパーバザー 町田',
          q: 'BOOKOFF SUPER BAZAAR 町田', ll: [35.5450, 139.4455], approx: true, how: 'Ruta 16 hacia el sur · ≈40 min',
          note: 'Libros, juegos, figuras, ropa y electrónica en varias plantas.'
        },
        {
          id: 'd12-home', t: '17:30', kind: 'home', lodge: 'tokyo', name: 'Vuelta a Taitō',
          how: 'Tōmei + Shuto · ≈1 h 30 (hora punta)',
          note: 'Aparcamiento: preguntar al alojamiento. Si no tiene, parking de monedas cercano (≈2.000–3.500 ¥ por 24 h).'
        }
      ]
    },

    {
      n: 13, date: '2026-11-27', phase: 'car', base: 'tokyo', mode: 'car',
      title: 'Saitama retro, Shin-chan y el templo de los gatos',
      sub: 'Kasukabe, la ciudad de Shin-chan, Hard Off en Ōmiya y Gōtokuji.',
      temp: [15, 6],
      changes: [
        'Aquí va el Crayon Shin-chan Buriburi Cinema Studio: está en Kasukabe (Saitama), a 40 min de Ōmiya.',
        'Cafe Capyba no hace falta hacerlo en coche: está en Higashimukōjima (Sumida), a 10 min de Asakusa. Pasa al día 14, que además es cuando abre (su ficha indica lun, mar, vie y fines de semana).',
        'Gōtokuji antes de las 15:00: la oficina donde se compran los maneki-neko cierra a esa hora.'
      ],
      rain: 'Todo menos Gōtokuji es interior.',
      stops: [
        {
          id: 'buriburi', t: '10:00', kind: 'shop', name: 'Crayon Shin-chan Buriburi Cinema Studio', ja: 'ブリブリシネマスタジオ（ララガーデン春日部 3F）',
          q: 'Lala Garden Kasukabe', ll: [35.9770, 139.7520], approx: true, how: 'Coche · ≈1 h',
          note: 'Recreativo temático en la 3.ª planta de Lala Garden Kasukabe: pósters de las películas, photo spots con la familia Nohara y tienda. 10:00–20:00, entrada libre.',
          tips: ['Los datos publicados son antiguos: confirmar que sigue abierto antes de ir.', 'Por Kasukabe hay tapas de alcantarilla y carteles de Shin-chan.']
        },
        {
          id: 'omiya', t: '11:45', kind: 'shop', name: 'Hard Off / Off House Ōmiya', ja: 'ハードオフ・オフハウス 大宮',
          q: 'ハードオフ 大宮', ll: [35.9064, 139.6240], approx: true, how: 'Coche · ≈40 min',
          note: 'Consolas, cámaras y la sección «junk» (vendido tal cual, sin garantía).'
        },
        {
          id: 'gotokuji', t: '14:15', kind: 'sight', name: 'Templo Gōtokuji', ja: '豪徳寺',
          q: 'Gotokuji Temple', ll: [35.6486, 139.6475], how: 'Shuto · ≈1 h 15',
          note: 'Cientos de maneki-neko blancos con la pata levantada. Recinto 6:00–17:00, entrada libre.',
          tips: ['No tiene aparcamiento para visitantes: parking de monedas cerca.', 'Zona residencial y templo en uso: silencio y nada de drones.']
        },
        {
          id: 'd13-home', t: '16:30', kind: 'home', lodge: 'tokyo', name: 'Vuelta a Taitō',
          how: 'Shuto · ≈1 h'
        }
      ]
    },

    {
      n: 14, date: '2026-11-28', phase: 'car', base: 'tokyo', mode: 'car', to: 'tokyo',
      title: 'Últimas compras, capibaras y Asakusa',
      sub: 'Treasure Factory, devolución del coche y tarde a pie cerca de casa.',
      temp: [14, 6],
      changes: [
        'Añadido Sensō-ji: estáis alojados en Taitō y no aparecía en el plan.',
        'Cafe Capyba y el Pokémon Center de Skytree Town están a 1 km uno del otro, a 10 min de Asakusa.'
      ],
      rain: 'Skytree Town y Sensō-ji funcionan igual con lluvia.',
      stops: [
        {
          id: 'treasure', t: '10:00', kind: 'shop', name: 'Treasure Factory', ja: 'トレジャーファクトリー',
          q: 'トレジャーファクトリー', ll: null,
          note: 'Cadena de segunda mano (ropa, hogar, hobby). Elegir la tienda grande que quede de camino; el botón busca las más cercanas.'
        },
        {
          id: 'd14-home', t: '13:00', kind: 'home', lodge: 'tokyo', name: 'Descargar compras en el alojamiento'
        },
        {
          id: 'returncar', t: '14:00', kind: 'move', name: 'Devolver el coche', ja: 'レンタカー返却',
          q: 'レンタカー 上野駅', ll: [35.7128, 139.7768], approx: true,
          note: 'Llenar el depósito en una gasolinera cercana y guardar el ticket: lo piden al devolver.',
          tips: ['En la gasolinera: «regyurā mantan» = gasolina normal, lleno (ver Info → Frases).']
        },
        {
          id: 'capyba', t: '15:30', kind: 'sight', name: 'Cafe Capyba', ja: 'cafe capyba（東向島）',
          q: 'cafe capyba 東向島', ll: [35.7193, 139.8146], approx: true, how: 'Metro/Tobu · ≈20 min',
          note: 'Café con capibaras. Sábados 10:00–17:30; consumición obligatoria; desde 6 años.',
          tips: ['Reserva obligatoria; se abre 2 semanas antes (≈14 nov). Puede cerrar sin aviso si los animales no están bien.']
        },
        {
          id: 'skytree', t: '17:00', kind: 'shop', name: 'Tokyo Skytree Town', ja: '東京スカイツリータウン（ソラマチ）',
          q: 'Tokyo Solamachi', ll: [35.7101, 139.8107], how: 'A pie · ≈15 min',
          note: 'Pokémon Center Skytree Town en la 4.ª planta de Solamachi. Subir a la torre es opcional.'
        },
        {
          id: 'sensoji', t: '19:00', kind: 'sight', name: 'Sensō-ji de noche', ja: '浅草寺',
          q: 'Sensoji Temple', ll: [35.7148, 139.7967], how: 'A pie cruzando el río · ≈20 min',
          note: 'Templo y pagoda iluminados, casi sin gente. Cena en Hoppy-dōri (guisos y cerveza en la calle).'
        }
      ]
    },

    {
      n: 15, date: '2026-11-29', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Ueno, Akihabara y vuelo',
      sub: 'Paseo de despedida cerca de casa. Ajustar a la hora del vuelo.',
      temp: [14, 6],
      changes: [
        'Con el nuevo tax-free (desde el 1 nov 2026) hay que enseñar las compras en aduana antes de facturar: llegar al aeropuerto con margen.',
        'Opción para el Pokémon Center Tokyo DX: está en Nihonbashi, a 10 min de Ueno en la línea Ginza.'
      ],
      rain: 'Museo Nacional de Tokio en Ueno o tiendas de Akihabara.',
      stops: [
        {
          id: 'uenopark', t: '8:30', kind: 'sight', name: 'Parque de Ueno', ja: '上野恩賜公園',
          q: 'Ueno Park', ll: [35.7148, 139.7731], how: 'A pie',
          note: 'A finales de noviembre los ginkgos se ponen amarillos.'
        },
        {
          id: 'ameyoko', t: '9:30', kind: 'shop', name: 'Ameyoko', ja: 'アメ横',
          q: 'Ameyoko', ll: [35.7103, 139.7745], how: 'A pie · 5 min',
          note: 'Mercado callejero bajo las vías: snacks, especias, cosmética y zapatillas.'
        },
        {
          id: 'akiba2', t: '10:30', kind: 'shop', name: 'Akihabara (último repaso)', ja: '秋葉原',
          q: 'Akihabara Station', ll: [35.6995, 139.7712], how: 'JR · 2 paradas',
          note: 'Los domingos, Chūō-dōri es peatonal por la tarde (≈13:00–17:00).'
        },
        {
          id: 'pkdx-tokyo', t: '12:00', kind: 'shop', opt: true, name: 'Pokémon Center Tokyo DX', ja: 'ポケモンセンタートウキョーDX（日本橋髙島屋S.C.東館5F）',
          q: 'Pokémon Center Tokyo DX', ll: [35.6813, 139.7737], approx: true, how: 'Metro Ginza · ≈10 min',
          note: 'El más grande de Tokio, con Pokémon Café (también con reserva).'
        },
        {
          id: 'airport', t: '—', kind: 'move', name: 'Al aeropuerto', ja: '京成上野駅（スカイライナー）',
          q: 'Keisei Ueno Station', ll: [35.7114, 139.7740],
          note: 'Narita: Keisei Skyliner desde Keisei Ueno (≈41 min). Haneda: ≈45 min en tren. Llegar 3 h antes del vuelo.'
        }
      ]
    }
  ],

  // Errores del PDF original y cambios principales (d = día afectado).
  summary: [
    { d: 4, t: 'El Crayon Shin-chan Buriburi Cinema Studio está en Kasukabe (Saitama), no en Osaka. Movido al día 13, que ya va a Saitama.' },
    { d: 8, t: 'La Tokyu Kabukichō Tower está en Shinjuku, no en Shibuya. Día reordenado: Shibuya → Shinjuku → Nakano → Shinjuku de noche.' },
    { d: 9, t: 'teamLab Planets está en Toyosu y el Pokémon Center Tokyo DX en Nihonbashi; ninguno en Odaiba.' },
    { d: 9, t: 'La Doraemon Future Department Store de Odaiba está cerrada por reforma hasta diciembre. Su tienda temporal en Tokyo Dome City abre hasta el 23 nov, justo ese día.' },
    { d: 9, t: 'La estatua del Gundam Unicorn de Odaiba se retiró en agosto de 2026.' },
    { d: 2, t: 'El Pokémon Center Osaka DX está en Daimaru Shinsaibashi (9F), a 20 min a pie de Den Den Town.' },
    { d: 3, t: 'Animate Umeda y las tiendas de cámaras de Umeda, juntas con el Umeda Sky Building.' },
    { d: 2, t: '«OS Camera Service» no aparece en ninguna búsqueda: confirmar la dirección.' },
    { d: 7, t: 'El PDF tenía dos «Día 7». Ahora es un único día Kioto → Tokio, con Arashiyama y Kinkaku-ji.' },
    { d: 4, t: 'Envío de maletas Osaka → Tokio para hacer Kioto solo con mochila.' },
    { d: 11, t: 'Fuji por la mañana, que es cuando suele estar despejado, y noche propuesta en Kawaguchiko.' },
    { d: 13, t: 'Cafe Capyba está en Sumida, a 10 min de Asakusa: pasa al día 14, sin coche.' },
    { d: 14, t: 'Añadido Sensō-ji: estáis alojados en Taitō y no aparecía.' },
    { d: 15, t: 'Nuevo sistema tax-free desde el 1 nov 2026: compras a mano y margen extra en el aeropuerto.' }
  ],

  // Reservas y trámites. due = fecha límite recomendada (o fecha de apertura si opens:true).
  bookings: [
    { id: 'idp', due: '2026-10-23', crit: true, title: 'Permiso Internacional de Conducción', who: 'DGT · cita previa',
      body: 'Imprescindible para alquilar el coche (días 11–14). España está en la Convención de Ginebra de 1949, así que es válido en Japón durante un año. Llevar también el carné español.' },
    { id: 'disney', due: '2026-10-20', crit: true, title: 'Entradas Tokyo DisneySea · 24 nov', who: 'Web o app oficial de Tokyo Disney Resort',
      body: 'Entrada con fecha y precio variable (≈7.900–10.900 ¥). Instalar la app para Premier Access.' },
    { id: 'teamlab', due: '2026-10-25', crit: true, title: 'teamLab Planets · 23 nov', who: 'Web oficial de teamLab',
      body: 'Es festivo nacional: las franjas se agotan. Elegir sobre las 13:30.' },
    { id: 'car', due: '2026-10-31', crit: true, title: 'Coche de alquiler 25–28 nov', who: 'Toyota / Times / Nippon Rent-a-Car',
      body: 'Recogida y devolución cerca de Ueno. Pedir tarjeta ETC. Preguntar al alojamiento de Taitō por aparcamiento.' },
    { id: 'shinkansen', due: '2026-10-21', opens: true, crit: true, title: 'Shinkansen Kioto → Tokio · 21 nov', who: 'App smartEX',
      body: 'La venta abre un mes antes, a las 10:00 de Japón (3:00 en España peninsular). Asiento E para ver el Fuji. Si llevas maleta grande, asiento con espacio para equipaje.' },
    { id: 'ryokan', due: '2026-10-25', title: 'Ryokan en Kawaguchiko · noche del 25 nov', who: 'Booking / Jalan / Rakuten Travel',
      body: 'Recomendado: con onsen y vistas al Fuji. Ver amanecer y ahorrar 2 h de coche nocturno.' },
    { id: 'pokecafe', due: '2026-10-16', opens: true, title: 'Pokémon Café Osaka · 16 nov (opcional)', who: 'Web oficial del Pokémon Café',
      body: 'Abre 31 días antes a las 18:00 de Japón (11:00 en España peninsular). Se llena en minutos.' },
    { id: 'insurance', due: '2026-10-31', title: 'Seguro de viaje', who: 'Con cobertura médica alta',
      body: 'La sanidad en Japón es cara para turistas. Incluir cobertura de coche de alquiler si es posible.' },
    { id: 'capyba', due: '2026-11-14', opens: true, title: 'Cafe Capyba · 28 nov', who: 'Web de cafe capyba (TableCheck)',
      body: 'Las reservas se abren con 2 semanas de antelación.' },
    { id: 'vjw', due: '2026-11-12', title: 'Visit Japan Web', who: 'vjw-lp.digital.go.jp',
      body: 'Registrar pasaporte y vuelo: genera los QR de inmigración y aduana y agiliza la llegada.' },
    { id: 'esim', due: '2026-11-12', title: 'eSIM o datos móviles', who: 'Ubigi, Airalo, Holafly…',
      body: 'Con unos 20 GB sobra para dos semanas de mapas.' },
    { id: 'ic', due: '2026-11-12', title: 'Tarjeta IC en el móvil', who: 'Apple Wallet (Suica / PASMO / ICOCA)',
      body: 'En iPhone se crea desde Wallet. En Android europeo normalmente no funciona: comprar tarjeta física al llegar.' },
    { id: 'kaiyukan', due: '2026-11-10', title: 'Entrada Kaiyukan · 17 nov (opcional)', who: 'Web oficial',
      body: 'Con fecha, para no hacer cola en taquilla.' },
    { id: 'buriburi', due: '2026-11-20', title: 'Confirmar Buriburi Cinema Studio', who: 'Web oficial o Google Maps',
      body: 'La información publicada es antigua: comprobar que sigue abierto antes del día 13.' },
    { id: 'flea', due: '2026-11-22', title: 'Comprobar el rastro de Ōi · 23 nov', who: 'Web o redes de Tokyo City Flea Market',
      body: 'Horario previsto 8:45–13:30; se cancela si llueve.' },
    { id: 'address', due: '2026-11-14', title: 'Direcciones exactas de los alojamientos', who: 'Info → Alojamientos',
      body: 'Para que el mapa y el botón «Volver a casa» apunten al sitio correcto.' }
  ],

  phrases: [
    { ja: 'ありがとうございます', ro: 'arigatō gozaimasu', es: 'Muchas gracias' },
    { ja: 'すみません', ro: 'sumimasen', es: 'Perdón / disculpe (también para llamar al camarero)' },
    { ja: '〜はどこですか？', ro: '… wa doko desu ka?', es: '¿Dónde está …?' },
    { ja: 'これをください', ro: 'kore o kudasai', es: 'Esto, por favor' },
    { ja: 'いくらですか？', ro: 'ikura desu ka?', es: '¿Cuánto cuesta?' },
    { ja: 'カードで払えますか？', ro: 'kādo de haraemasu ka?', es: '¿Puedo pagar con tarjeta?' },
    { ja: '免税できますか？', ro: 'menzei dekimasu ka?', es: '¿Se puede hacer tax-free?' },
    { ja: '動作確認できますか？', ro: 'dōsa kakunin dekimasu ka?', es: '¿Puedo comprobar que funciona? (cámaras, consolas)' },
    { ja: '写真を撮ってもいいですか？', ro: 'shashin o totte mo ii desu ka?', es: '¿Puedo hacer fotos?' },
    { ja: '予約しています', ro: 'yoyaku shite imasu', es: 'Tengo reserva' },
    { ja: '英語のメニューはありますか？', ro: 'eigo no menyū wa arimasu ka?', es: '¿Tiene carta en inglés?' },
    { ja: 'お会計お願いします', ro: 'o-kaikei onegai shimasu', es: 'La cuenta, por favor' },
    { ja: 'ここまでお願いします', ro: 'koko made onegai shimasu', es: '(Taxi) Hasta aquí, por favor' },
    { ja: 'レギュラー満タンでお願いします', ro: 'regyurā mantan de onegai shimasu', es: 'Gasolina normal, lleno, por favor' }
  ],

  glossary: [
    { ja: '中古', ro: 'chūko', es: 'Usado' },
    { ja: '美品', ro: 'bihin', es: 'Como nuevo' },
    { ja: 'ジャンク', ro: 'janku', es: 'Vendido tal cual, sin garantía (puede no funcionar)' },
    { ja: '箱なし', ro: 'hako nashi', es: 'Sin caja' },
    { ja: '税込 / 税抜', ro: 'zeikomi / zeinuki', es: 'IVA incluido / sin IVA' },
    { ja: '止まれ', ro: 'tomare', es: 'STOP (triángulo rojo invertido)' }
  ],

  info: [
    {
      id: 'taxfree', title: 'Tax-free: cambia el 1 nov 2026',
      items: [
        'Ahora se paga el precio con el 10 % de impuesto y la devolución llega después de que la aduana compruebe los artículos al salir de Japón.',
        'Hay que enseñar las compras en aduana antes de facturar: lo comprado tax-free, en el equipaje de mano o accesible.',
        'Desaparecen las bolsas selladas y el límite para consumibles. El mínimo de compra no cambia.',
        'Preguntar en cada tienda cómo devuelven el dinero (tarjeta, app…) y guardar todos los tickets.'
      ]
    },
    {
      id: 'transport', title: 'Transporte',
      items: [
        'Tarjeta IC (ICOCA, Suica, PASMO): vale para metro, tren, buses y konbinis en todo el país.',
        'El JR Pass no compensa con esta ruta: comprar los billetes sueltos (Osaka→Kioto y Kioto→Tokio).',
        'Google Maps funciona muy bien con el transporte japonés: los botones «Cómo llegar» abren la ruta en transporte público.',
        'Taxis: app GO. Las puertas se abren solas; no hay que tocarlas.',
        'Si el vuelo de llegada aterriza en Tokio: Shinkansen Tokio → Shin-Osaka (≈2 h 30) y metro a Namba.',
        'Takkyūbin (Yamato): envío de maletas entre alojamientos en 1–2 días desde cualquier konbini.'
      ]
    },
    {
      id: 'driving', title: 'Conducir en Japón',
      items: [
        'Se conduce por la izquierda. Límite general 40–60 km/h en ciudad y 80–100 km/h en autopista.',
        'Alcohol: tolerancia prácticamente cero, y los acompañantes también pueden ser sancionados.',
        'Stop: triángulo rojo invertido «止まれ». Parada total antes de cada paso a nivel.',
        'Peajes con tarjeta ETC: carril morado, no hace falta parar.',
        'El GPS del coche acepta números de teléfono o Mapcode. También se puede conectar el móvil (CarPlay / Android Auto).',
        'Parkings de monedas: una placa sube bajo el coche y se paga en la máquina al salir.'
      ]
    },
    {
      id: 'money', title: 'Dinero y compras',
      items: [
        'La tarjeta se acepta casi en todas partes, pero templos, puestos, rastros y algunos restaurantes piden efectivo.',
        'Cajeros de 7-Eleven y Japan Post aceptan tarjetas extranjeras.',
        'Cámaras usadas: revisar hongos en el objetivo con la linterna y pedir probarla («dōsa kakunin»).'
      ]
    },
    {
      id: 'weather', title: 'Clima y luz',
      items: [
        'Osaka y Kioto: unos 16 °C de día y 7–9 °C de noche. Tokio, algo más fresco.',
        'Fuji: puede bajar de 0 °C al amanecer. Llevar abrigo de verdad, gorro y guantes.',
        'Anochece entre las 16:30 y las 16:55: planificar lo exterior para antes.',
        'Momiji: la previsión de 2026 retrasa el rojo de Kioto hasta principios de diciembre; Katsuō-ji y Minō suelen ir antes. Los ginkgos de Tokio amarillean a finales de noviembre.'
      ]
    },
    {
      id: 'manners', title: 'Costumbres',
      items: [
        'Hablar bajo y no llamar por teléfono en el tren.',
        'Casi no hay papeleras: llevar una bolsa para la basura.',
        'En algunas calles (Nishiki, Kiyomizu) se pide no comer caminando.',
        'Quitarse los zapatos donde haya tarima o estantes para calzado.'
      ]
    }
  ],

  emergency: [
    { label: 'Policía', num: '110' },
    { label: 'Ambulancia y bomberos', num: '119' },
    { label: 'Japan Visitor Hotline (JNTO, 24 h, inglés)', num: '050-3816-2787' },
    { label: 'Emergencia consular de España (24 h)', num: '080-4368-2817' },
    { label: 'Embajada de España en Tokio (centralita)', num: '03-3583-8531' }
  ]
};
