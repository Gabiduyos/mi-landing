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
      label: 'Alojamiento Osaka · 15–19 nov',
      name: '白樺の宿 Dōtonbori (Airbnb · HMM8X4YS4N)',
      addr: '道頓堀1丁目東4-13, Chūō-ku, Osaka 542-0071',
      q: '道頓堀1丁目東4-13 大阪市中央区',
      ll: [34.66868, 135.50924],
      note: 'Llegada desde las 16:00 (caja de llaves; instrucciones 48 h antes) · salida antes de las 11:00. Estación: Nipponbashi (Sakaisuji / Sennichimae / Kintetsu). Cancelación gratis hasta el 10 nov.'
    },
    kyoto: {
      label: 'Alojamiento Kioto · 19–21 nov',
      name: 'K-style Nishijin Backpackers (Airbnb · HMWACK2EFF)',
      addr: '769 Makurachō, Kamigyō-ku, Kioto 602-8488',
      q: '769 Makurachō, Kamigyo Ward, Kyoto 602-8488',
      ll: [35.0290, 135.7430],
      approx: true,
      note: 'Habitación con litera. Llegada desde las 16:00 · salida antes de las 10:00. Escribir al anfitrión para el proceso de llegada. Reembolso parcial si se cancela antes del 12 nov.'
    },
    tokyo: {
      label: 'Alojamiento Tokio · 21–29 nov',
      name: 'Peter Pan · Allcomein (Airbnb · HMSNFHTNEK)',
      addr: '2-31-10 Taitō (Peter Pan), Taitō-ku, Tokio 110-0016',
      q: '2-chōme-31-10 Taitō, Taito City, Tokyo 110-0016',
      ll: [35.7062, 139.7818],
      approx: true,
      note: 'Llegada desde las 15:00 (cerradura inteligente) · salida antes de las 10:00. Cancelación GRATIS solo hasta el 22 oct a las 15:00. Preguntar por aparcamiento para el coche (24–29 nov).'
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
          id: 'kix', t: '12:10', kind: 'move', far: true, name: 'Llegada a Kansai (KIX) · vuelo MU225', ja: '関西国際空港',
          q: 'Kansai International Airport', ll: [34.4352, 135.2440],
          note: 'Vuelo MU225 desde Shanghái (sale 8:55). Nankai Rapi:t o Express hasta Namba (≈40–45 min) y 10 min a pie hasta Dōtonbori 1-chōme.',
          tips: ['Activar la tarjeta IC (ICOCA/Suica) y la eSIM antes de salir del aeropuerto.', 'Check-in a partir de las 16:00: si llegáis antes, dejar maletas en consigna de Namba.']
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
          tips: ['Cena: kushikatsu (brochetas rebozadas). Regla de la casa: no mojar dos veces en la salsa común.'],
          photo: { when: 'al anochecer', tip: 'Calle Jan-Jan Yokochō con la torre Tsūtenkaku iluminada al fondo: la foto retro de Osaka.', lens: '50–85 mm para comprimir los carteles contra la torre.' }
        },
        {
          id: 'dotonbori', t: '19:30', kind: 'sight', name: 'Dōtonbori de noche', ja: '道頓堀',
          q: 'Glico Sign Dotonbori', ll: [34.6688, 135.5013], how: 'Metro Sakaisuji Ebisuchō → Nipponbashi + a pie · ≈15 min',
          note: 'Cartel de Glico desde el puente Ebisubashi, cangrejo gigante y takoyaki.',
          tips: ['Al lado: Hōzenji Yokochō, callejón empedrado con farolillos y una estatua cubierta de musgo.'],
          photo: { when: 'hora azul, 16:50–17:30', tip: 'Desde el puente Ebisubashi, con el cartel de Glico y su reflejo en el canal. Luego, Hōzenji Yokochō: farolillos y piedra mojada.', lens: '24–35 mm; ISO 1600–3200 a mano con el estabilizador. Para Hōzenji, un fijo luminoso (35 mm f/1.8).' }
        },        {
          id: 'gm-bookoff-super-bazaar-25gou-y', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR 25gou Yao Nagahata Store',
          q: 'BOOKOFF SUPER BAZAAR 25gou Yao Nagahata Store', ll: [34.61217, 135.59657], how: 'Tren · ≈11 km (lejos del centro)',
          note: 'De tu lista «Compras · Segunda mano Osaka». Extra en las afueras (a 9 km de Shinsekai y torre Tsūtenkaku). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'tombori', t: '20:00', kind: 'sight', name: 'Barco por el canal de Dōtonbori', ja: 'とんぼりリバークルーズ（太左衛門橋船着場）',
          q: 'Tombori River Cruise Tazaemonbashi', ll: [34.6689, 135.5030], approx: true, how: 'A pie · ≈5 min',
          note: 'Tombori River Cruise: 20 min bajo los puentes, con el cartel de Glico y los neones. 2.000 ¥ por persona. Salidas cada media hora; las de noche, de 17:00 a 21:00. Embarque en el muelle Tazaemonbashi, delante del Don Quijote con la noria.',
          tips: ['Las entradas son con hora y por la noche se agotan: comprarlas al pasar por la taquilla del muelle después del check-in, o antes online (Klook y similares, ≈10 % más barato).', 'Si el jet lag pesa, se puede hacer el día 2 por la noche: el muelle está a 5 min de casa.'],
          photo: { when: '20:00, de noche', tip: 'Desde el barco, los carteles reflejados en el agua y la gente saludando desde el puente Ebisubashi.', lens: '24–35 mm con el diafragma abierto e ISO 3200–6400: el barco se mueve, mejor 1/125 s o más rápido.' }
        },
        {
          id: 'gm-hard-off-yaominami-store', t: '', kind: 'shop', opt: true, name: 'Hard Off Yaominami store',
          q: 'Hard Off Yaominami store', ll: [34.58774, 135.60692], how: 'Tren · ≈3 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 12 km de Shinsekai y torre Tsūtenkaku). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-treasure-factory-matsubara', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Matsubara',
          q: 'Treasure Factory Matsubara', ll: [34.57506, 135.54936], how: 'Tren · ≈5 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 9 km de Shinsekai y torre Tsūtenkaku). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-hard-off-sakai-shinkanaoka', t: '', kind: 'shop', opt: true, name: 'Hard Off Sakai Shinkanaoka',
          q: 'Hard Off Sakai Shinkanaoka', ll: [34.56381, 135.51373], how: 'Tren · ≈3 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 10 km de Shinsekai y torre Tsūtenkaku). Solo si os sobra tiempo al final del día.'
        },

        {
          id: 'gm-gl-nta-osaka-shinsaibashi-an', t: '', kind: 'shop', name: 'glänta osaka shinsaibashi (anillos)',
          q: 'glänta osaka shinsaibashi (anillos)', ll: [34.66972, 135.50138], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Dōtonbori de noche (103 m).'
        },
        {
          id: 'gm-bookoff-plus-namba-ebisubash', t: '', kind: 'shop', opt: true, name: 'BOOKOFF PLUS Namba Ebisubashi Store',
          q: 'BOOKOFF PLUS Namba Ebisubashi Store', ll: [34.66781, 135.50141], how: 'A pie · ≈3 min',
          note: 'De tu lista «Compras». Cerca de Dōtonbori de noche (110 m).'
        },
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
        '«OS Camera Service» está cerca de la estación de Umeda: pasa al día 3, con el resto de tiendas de cámaras de Umeda.',
        'Añadida Camera no Naniwa (tienda principal), a 3 min del Pokémon Center.'
      ],
      rain: 'Casi todo es interior o bajo galería cubierta.',
      stops: [
        {
          id: 'd2-start', t: '9:20', kind: 'home', lodge: 'osaka', name: 'Salida de casa',
          how: 'A pie · ≈5 min', go: 'Kuromon Market',
          note: 'Salir hacia el este por la calle Sakaisuji: el mercado de Kuromon empieza a la altura de la estación de Nipponbashi. No hace falta metro.'
        },
        {
          id: 'kuromon', t: '9:30', kind: 'food', name: 'Mercado de Kuromon', ja: '黒門市場',
          q: 'Kuromon Market', ll: [34.6656, 135.5067], how: 'A pie desde el alojamiento',
          note: 'Desayuno de puestos: wagyu en brocheta, vieiras, fruta. Turístico y algo caro, pero está al lado.'
        },
        {
          id: 'gm-tokiwa-camera', t: '', kind: 'shop', opt: true, name: 'Tokiwa camera',
          q: 'Tokiwa camera', ll: [34.66628, 135.50592], how: 'A pie · ≈2 min',
          note: 'De tu lista «Foto vintage · Segunda mano Osaka». Cerca de Mercado de Kuromon (104 m).'
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
          id: 'gm-suruga-ya-ota-road-anime-and', t: '', kind: 'shop', opt: true, name: 'SURUGA-YA Ota-Road Anime and Hobby Store',
          q: 'SURUGA-YA Ota-Road Anime and Hobby Store', ll: [34.66193, 135.50509], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Nipponbashi Den Den Town (Otaroad) (152 m).'
        },
        {
          id: 'gm-jungle', t: '', kind: 'shop', opt: true, name: 'Jungle',
          q: 'Jungle', ll: [34.66174, 135.5061], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Nipponbashi Den Den Town (Otaroad) (180 m).'
        },
        {
          id: 'naniwa-shinsai', t: '14:30', kind: 'shop', name: 'Camera no Naniwa (tienda principal)', ja: 'カメラのナニワ 心斎橋本店',
          q: 'カメラのナニワ 心斎橋本店', ll: [34.6745, 135.5005], approx: true, how: 'A pie · ≈15 min',
          note: 'Cámaras y objetivos nuevos y usados, junto a la salida 5–6 del metro Shinsaibashi.'
        },
        {
          id: 'gm-medicom-toy-west', t: '', kind: 'shop', name: 'MEDICOM TOY WEST',
          q: 'MEDICOM TOY WEST', ll: [34.67389, 135.50089], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Camera no Naniwa (tienda principal) (77 m).'
        },
        {
          id: 'gm-bookoff-osaka-shinsaibashi-s', t: '', kind: 'shop', opt: true, name: 'BOOKOFF Osaka Shinsaibashi Store',
          q: 'BOOKOFF Osaka Shinsaibashi Store', ll: [34.67649, 135.50158], how: 'A pie · ≈4 min',
          note: 'De tu lista «Compras». Cerca de Camera no Naniwa (tienda principal) (242 m).'
        },
        {
          id: 'gm-osaka-hobby-center', t: '', kind: 'shop', name: 'Osaka Hobby Center',
          q: 'Osaka Hobby Center', ll: [34.67831, 135.50138], how: 'A pie · ≈3 min',
          note: '★ De tu lista «Quiero ir». Cerca de Camera no Naniwa (tienda principal) (430 m).'
        },
        {
          id: 'pkdx-osaka', t: '15:00', kind: 'shop', name: 'Pokémon Center Osaka DX', ja: 'ポケモンセンターオーサカDX（大丸心斎橋店 本館9F）',
          q: 'Pokémon Center Osaka DX Daimaru Shinsaibashi', ll: [34.6727, 135.5011], how: 'A pie · 3 min',
          note: 'Planta 9 de Daimaru Shinsaibashi. Al lado está el Pokémon Café, solo con reserva.',
          tips: ['Las reservas del café abren 31 días antes a las 18:00 de Japón (11:00 en España peninsular) y vuelan en minutos.']
        },
        {
          id: 'gm-allu-sinsaibashi-store', t: '', kind: 'shop', opt: true, name: 'ALLU Sinsaibashi store',
          q: 'ALLU Sinsaibashi store', ll: [34.67142, 135.50161], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Pokémon Center Osaka DX (149 m).'
        },
        {
          id: 'grandchaos', t: '16:30', kind: 'shop', name: 'Mandarake Grand Chaos', ja: 'まんだらけ グランドカオス',
          q: 'Mandarake Grand Chaos', ll: [34.6718, 135.4981], approx: true, how: 'A pie · ≈8 min (Amerikamura)',
          note: 'La Mandarake más grande de Osaka, en el barrio juvenil de Amerika-mura.'
        },
        {
          id: 'gm-kindal-shinsaibashi-amerikam', t: '', kind: 'shop', opt: true, name: 'kindal shinsaibashi amerikamura',
          q: 'kindal shinsaibashi amerikamura', ll: [34.67199, 135.49758], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Mandarake Grand Chaos (52 m).'
        },
        {
          id: 'gm-bb-amemura-american-village-', t: '', kind: 'shop', name: 'BB Amemura / American Village Freemarket',
          q: 'BB Amemura / American Village Freemarket', ll: [34.67273, 135.49767], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Mandarake Grand Chaos (111 m).'
        },
        {
          id: 'gm-calico', t: '', kind: 'shop', opt: true, name: 'CALICO',
          q: 'CALICO', ll: [34.67321, 135.49689], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Mandarake Grand Chaos (191 m).'
        },
        {
          id: 'gm-the-silver-ball-planet', t: '', kind: 'shop', name: 'THE SILVER BALL PLANET',
          q: 'THE SILVER BALL PLANET', ll: [34.6725, 135.49865], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Mandarake Grand Chaos (92 m).'
        },
        {
          id: 'gm-chappie-used-clothing', t: '', kind: 'shop', opt: true, name: 'Chappie Used Clothing',
          q: 'Chappie Used Clothing', ll: [34.6698, 135.49735], how: 'A pie · ≈4 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Mandarake Grand Chaos (232 m).'
        },
        {
          id: 'uranamba', t: '19:00', kind: 'food', name: 'Cena en Ura-Namba', ja: '裏なんば',
          q: 'Ura Namba', ll: [34.6653, 135.5040], approx: true, how: 'A pie · ≈15 min',
          note: 'Callejuelas con izakayas pequeñas detrás de Namba, más de barrio que Dōtonbori.',
          photo: { when: 'de noche', tip: 'Callejones con farolillos rojos y vapor de las cocinas. Pedir permiso antes de fotografiar a la gente de las barras.', lens: '35 mm f/1.8 a f/2, ISO 3200–6400.' }
        },
        {
          id: 'gm-treasure-factory-higashiosak', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Higashiosaka',
          q: 'Treasure Factory Higashiosaka', ll: [34.67029, 135.59506], how: 'Tren · ≈8 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 8 km de Mercado de Kuromon). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-treasure-factory-higashi-osa', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Higashi-Osaka Minowa',
          q: 'Treasure Factory Higashi-Osaka Minowa', ll: [34.68885, 135.61738], how: 'Tren · ≈3 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 10 km de Mercado de Kuromon). Solo si os sobra tiempo al final del día.'
        },
      ]
    },

    {
      n: 3, date: '2026-11-17', phase: 'osaka', base: 'osaka', mode: 'transit',
      title: 'Acuario, Umeda y atardecer en el Sky Building',
      sub: 'Bahía por la mañana; tiendas de Umeda y puesta de sol a 173 m de altura.',
      temp: [16, 9],
      changes: [
        'Tiendas de Umeda (Animate, Pokémon Center Osaka, cámaras) agrupadas aquí, a 10 min del Sky Building.',
        'Aquí está OS Camera Service, la tienda de tu PDF (la información publicada es antigua: comprobar horario).'
      ],
      rain: 'Todo el día funciona con lluvia, salvo la terraza al aire libre del Sky Building.',
      stops: [
        {
          id: 'd3-start', t: '9:05', kind: 'home', lodge: 'osaka', name: 'Salida de casa',
          how: 'Metro Sakaisuji + Chūō · ≈35 min', go: 'Osaka Aquarium Kaiyukan',
          note: 'Estación Nipponbashi (3 min a pie). Línea Sakaisuji (marrón) dirección Tenjimbashisuji 6-chōme, 2 paradas hasta Sakaisuji-Hommachi. Cambio a la línea Chūō (verde) dirección Cosmosquare, 6 paradas hasta Ōsakakō. Salida 1 y ≈10 min a pie hasta el acuario. Pagar con la tarjeta IC.'
        },
        {
          id: 'kaiyukan', t: '9:45', kind: 'sight', name: 'Acuario Kaiyukan', ja: '海遊館',
          q: 'Osaka Aquarium Kaiyukan', ll: [34.6545, 135.4290], how: 'A pie · ≈10 min desde la estación Ōsakakō',
          note: 'Tiburón ballena en el tanque central de 9 m de profundidad. Abre a las 10:00; dedicarle ≈2,5 h.',
          tips: ['Entrada online con fecha para saltarse la cola de taquilla.'],
          photo: { when: 'con poca gente, al abrir', tip: 'El tiburón ballena pasando delante del cristal del tanque central. Sin flash.', lens: 'El objetivo más luminoso que tengáis; pegar el parasol al cristal para evitar reflejos.' }
        },
        {
          id: 'tempozan', t: '12:30', kind: 'sight', opt: true, name: 'Noria de Tempozan', ja: '天保山大観覧車',
          q: 'Tempozan Ferris Wheel', ll: [34.6563, 135.4313], how: 'A pie · 3 min',
          note: 'Opcional: vistas de la bahía. Comida en Tempozan Marketplace (zona retro Naniwa Kuishinbo Yokochō).'
        },
        {
          id: 'mrhiro', t: '13:30', kind: 'sight', name: 'Mr. Hiro Car Studio', ja: 'MR.HIRO CAR STUDIO',
          q: 'Mr. Hiro Car Studio', ll: [34.65668, 135.47187], how: 'Taxi ≈10 min (o metro Chūō a Bentenchō + JR Loop a Taishō + 15 min a pie)',
          note: '★ De tu lista «Quiero ir». Garaje y cafetería de coches JDM (RX-7, AE86 de Initial D, Skyline…): ver los coches y tomar algo, ≈1 h. Abre a las 9:00. Dirección: 4-12-21 Izuo, Taishō-ku.',
          tips: ['Los coches se pueden alquilar (Klook, desde ≈208 € por 6 h), pero hoy solo vamos de visita.'],
          photo: { when: 'primera hora de la tarde', tip: 'Los coches JDM en fila delante del garaje y detalles de llantas, faros y logos.', lens: '35 mm para el conjunto; 85 mm para detalles con fondo desenfocado.' }
        },
        {
          id: 'gm-hard-off-osaka-taisho-store', t: '14:40', kind: 'shop', opt: true, name: 'Hard Off Osaka Taisho Store',
          q: 'Hard Off Osaka Taisho Store', ll: [34.64701, 135.4714], how: 'A pie · ≈15 min o taxi 5 min',
          note: 'De tu lista «Segunda mano Osaka». Al lado de Mr. Hiro: aprovechar si os apetece antes de ir a Umeda.'
        },
        {
          id: 'umeda', t: '15:30', kind: 'shop', name: 'Tiendas de Umeda', ja: '梅田',
          q: 'Yodobashi Umeda', ll: [34.7046, 135.4962], how: 'JR Loop Line desde Taishō hasta Ōsaka · ≈15 min',
          note: 'Anime, Pokémon y cámaras en un radio de 10 minutos a pie. Primera ronda antes del atardecer; después del Sky Building se puede seguir hasta la cena (muchas cierran a las 21:00).',
          shops: [
            { n: 'Animate Umeda', ja: 'アニメイト梅田', q: 'Animate Umeda' },
            { n: 'Pokémon Center Osaka (Daimaru Umeda 13F)', ja: 'ポケモンセンターオーサカ', q: 'Pokémon Center Osaka Daimaru Umeda' },
            { n: 'Yodobashi Camera Umeda', ja: 'ヨドバシカメラ梅田', q: 'Yodobashi Camera Multimedia Umeda' },
            { n: 'Kamera no Naniwa (usadas)', ja: 'カメラのナニワ', q: 'カメラのナニワ 梅田' },
            { n: 'Yaotomi (carrete y usadas)', ja: '八百富写真機店', q: '八百富写真機店 大阪駅前' },
            { n: 'OS Camera Service (la de tu PDF)', ja: 'OSカメラサービス', q: 'OSカメラサービス 梅田' }
          ]
        },
        {
          id: 'gm-komehyo-umeda', t: '', kind: 'shop', opt: true, name: 'Komehyo Umeda',
          q: 'Komehyo Umeda', ll: [34.70541, 135.49633], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Tiendas de Umeda (91 m).'
        },
        {
          id: 'gm-naniwa-camera-umeda-used-buy', t: '', kind: 'shop', opt: true, name: 'Naniwa Camera Umeda Used Buyback Center',
          q: 'Naniwa Camera Umeda Used Buyback Center', ll: [34.70458, 135.4975], how: 'A pie · ≈2 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Tiendas de Umeda (118 m).'
        },
        {
          id: 'gm-os-camera-service', t: '', kind: 'shop', name: 'OS Camera Service (ＯＳカメラサービス)',
          q: 'OS Camera Service (ＯＳカメラサービス)', ll: [34.70872, 135.50155], how: 'A pie · ≈8 min',
          note: '★ De tu lista «Quiero ir». Cerca de Tiendas de Umeda (668 m).'
        },
        {
          id: 'umedasky', t: '16:30', kind: 'sight', name: 'Umeda Sky Building', ja: '梅田スカイビル 空中庭園展望台',
          q: 'Umeda Sky Building', ll: [34.7053, 135.4903], how: 'A pie · ≈10 min por el túnel bajo las vías',
          note: 'Puesta de sol ≈16:55. Llegar 30–40 min antes para coger sitio en la terraza circular y quedarse a ver las luces. Abre hasta las 22:30.',
          photo: { when: 'puesta de sol ≈16:55', tip: 'El mirador Floating Garden con la ciudad hacia el oeste. Desde abajo, las escaleras mecánicas en tubo de cristal entre las dos torres.', lens: '16–35 mm para el tubo; 24–70 mm en el mirador, apoyando la cámara en la barandilla.' }
        },
        {
          id: 'shinumeda', t: '18:30', kind: 'food', name: 'Shin-Umeda Shokudōgai', ja: '新梅田食道街',
          q: 'Shin Umeda Shokudogai', ll: [34.7024, 135.4987], approx: true, how: 'A pie · ≈10 min',
          note: 'Galería de bares y restaurantes bajo las vías del tren. Okonomiyaki, kushikatsu, izakayas.'
        },        {
          id: 'gm-matsumoto-camera', t: '', kind: 'shop', opt: true, name: 'Matsumoto Camera',
          q: 'Matsumoto Camera', ll: [34.69915, 135.49769], how: 'A pie · ≈5 min',
          note: 'De tu lista «Foto vintage». Cerca de Shin-Umeda Shokudōgai (372 m).'
        },
        {
          id: 'gm-camera-bayashi', t: '', kind: 'shop', opt: true, name: 'Camera Ōbayashi',
          q: 'Camera Ōbayashi', ll: [34.69908, 135.49596], how: 'A pie · ≈2 min',
          note: 'De tu lista «Foto vintage · Segunda mano Osaka». Cerca de Shin-Umeda Shokudōgai (445 m).'
        },
        {
          id: 'gm-lashinbang-osaka-umeda', t: '', kind: 'shop', opt: true, name: 'Lashinbang - Osaka Umeda',
          q: 'Lashinbang - Osaka Umeda', ll: [34.70603, 135.50196], how: 'A pie · ≈12 min',
          note: 'De tu lista «Segunda mano Osaka». Cerca de Shin-Umeda Shokudōgai (500 m).'
        },
        {
          id: 'gm-railway-lost-item-market', t: '', kind: 'shop', opt: true, name: 'Railway Lost Item Market',
          q: 'Railway Lost Item Market', ll: [34.69689, 135.51168], how: 'A pie · ≈17 min',
          note: 'De tu lista «Saved places». Cerca de Shin-Umeda Shokudōgai (1.3 km). Tu nota: Objetos perdidos.'
        },

        {
          id: 'gm-treasure-factory-settsu', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Settsu',
          q: 'Treasure Factory Settsu', ll: [34.76164, 135.55355], how: 'Tren · ≈8 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 8 km de Tiendas de Umeda). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-hard-off-off-house-minamiset', t: '', kind: 'shop', opt: true, name: 'Hard Off Off House Minamisettsu Ekimae',
          q: 'Hard Off Off House Minamisettsu Ekimae', ll: [34.76413, 135.56985], how: 'A pie · ≈20 min',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 9 km de Tiendas de Umeda). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-bookoff-super-bazaar-2', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR',
          q: 'BOOKOFF SUPER BAZAAR', ll: [34.75865, 135.58973], how: 'Tren · ≈2 km (lejos del centro)',
          note: 'De tu lista «Compras · Segunda mano Osaka». Extra en las afueras (a 10 km de Shin-Umeda Shokudōgai). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-hard-off-kadoma-shikenjo-mae', t: '', kind: 'shop', opt: true, name: 'Hard Off Kadoma Shikenjo-mae',
          q: 'Hard Off Kadoma Shikenjo-mae', ll: [34.7327, 135.5937], how: 'Tren · ≈3 km (lejos del centro)',
          note: 'De tu lista «Segunda mano Osaka». Extra en las afueras (a 9 km de Shin-Umeda Shokudōgai). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-bookoff-super-bazaar-amagasa', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Amagasaki Nishikoya',
          q: 'BOOKOFF SUPER BAZAAR Amagasaki Nishikoya', ll: [34.76925, 135.38059], how: 'Tren · ≈20 km (lejos del centro)',
          note: '★ De tu lista «Quiero ir». Extra en las afueras (a 12 km de Umeda Sky Building). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-bookoff-nishinomiya-kitaguch', t: '', kind: 'shop', opt: true, name: 'BOOKOFF Nishinomiya-kitaguchi',
          q: 'BOOKOFF Nishinomiya-kitaguchi', ll: [34.7422, 135.35349], how: 'Tren · ≈4 km (lejos del centro)',
          note: '★ De tu lista «Quiero ir». Extra en las afueras (a 12 km de Noria de Tempozan). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-bookoff-super-bazaar-kobe', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Kobe',
          q: 'BOOKOFF SUPER BAZAAR Kobe', ll: [34.65109, 135.15165], how: 'Tren · ≈21 km (lejos del centro)',
          note: '★ De tu lista «Quiero ir». Extra en las afueras (a 25 km de Acuario Kaiyukan). Solo si os sobra tiempo al final del día.'
        },
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
          id: 'd4-start', t: '7:45', kind: 'home', lodge: 'osaka', name: 'Salida de casa',
          how: 'A pie + metro Midōsuji · ≈50 min', go: 'Minoh-Kayano Station',
          note: 'A pie ≈10 min hasta la estación de Namba (línea Midōsuji, roja). Coger un tren con destino Minō-Kayano (箕面萱野): va directo, ≈40 min. Ojo, algunos trenes acaban antes, en Senri-Chūō o Esaka: mirar el cartel del andén.'
        },
        {
          id: 'kayano', t: '8:30', kind: 'move', name: 'Estación Minō-Kayano', ja: '箕面萱野駅',
          q: 'Minoh-Kayano Station', ll: [34.8295, 135.4886], approx: true, how: 'Metro Midōsuji directo desde Namba · ≈40 min',
          note: 'Bus Hankyū hacia Hokusetsu Reien, bajar en Katsuō-ji (≈20–25 min, 2–3 buses por hora: mirar horario).'
        },
        {
          id: 'katsuoji', t: '9:30', kind: 'sight', name: 'Templo Katsuō-ji', ja: '勝尾寺',
          q: 'Katsuoji Temple', ll: [34.8684, 135.4917], how: 'Bus Hankyū · ≈25 min',
          note: 'Miles de daruma por escaleras, muros y faroles. Temporada de arces del 1 nov al 13 dic. Entre semana 8:00–17:00; entrada 500 ¥.',
          tips: ['Tradición: comprar un daruma de la victoria, pintar un ojo al pedir el deseo y el otro cuando se cumpla.'],
          photo: { when: 'mañana', tip: 'Miles de daruma rojos en escaleras, muros y tejados, con arces de otoño.', lens: '85 mm o macro para los daruma; 24 mm para el conjunto.' }
        },
        {
          id: 'minofalls', t: '12:30', kind: 'sight', name: 'Cascada de Minō', ja: '箕面大滝',
          q: 'Minoh Falls', ll: [34.8533, 135.4717], how: 'Taxi ≈15 min (pedir con la app GO) o sendero Tōkai ≈1 h 30',
          note: 'Cascada de 33 m rodeada de arces. Bajada a pie de 2,8 km (≈45 min) junto al río hasta la estación.',
          tips: ['Probar momiji tempura: hojas de arce rebozadas y fritas, típicas de Minō.'],
          photo: { when: 'mediodía con nubes', tip: 'Cascada de 33 m enmarcada por arces rojos.', lens: 'Velocidad lenta (1/4–1/2 s) apoyando la cámara, o filtro ND, para el agua sedosa.' }
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
        },
        {
          id: 'gm-bookoff-super-bazaar', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR',
          q: 'BOOKOFF SUPER BAZAAR', ll: [34.81409, 135.67275], how: 'Tren · ≈19 km (lejos del centro)',
          note: 'De tu lista «Compras · Segunda mano Osaka». Extra en las afueras (a 18 km de Templo Katsuō-ji). Solo si os sobra tiempo al final del día.'
        },
      ]
    },

    {
      n: 5, date: '2026-11-19', phase: 'kyoto', base: 'kyoto', mode: 'transit',
      title: 'Kioto clásico: Higashiyama y Gion',
      sub: 'En kimono: ruta en bajada desde Kiyomizu-dera hasta Gion al atardecer.',
      temp: [16, 7],
      changes: [
        'Ruta en sentido único (cuesta abajo): Kiyomizu → Ninenzaka → pagoda Yasaka → Gion, sin desandar.',
        'La iluminación nocturna de otoño de Kiyomizu suele empezar hacia el 20–22 nov. Si este año se anuncia antes, mejor venir de noche.'
      ],
      rain: 'Museo Nacional de Kioto o el mercado cubierto de Nishiki.',
      stops: [
        {
          id: 'd5-start', t: '9:00', kind: 'home', lodge: 'osaka', name: 'Salida de casa',
          how: 'A pie + metro + JR · ≈55 min', go: 'Kyoto Station',
          note: 'Salida del Airbnb antes de las 11:00 (con mochilas). A pie ≈10 min hasta Namba, línea Midōsuji (roja) dirección Umeda, 3 paradas hasta Umeda. Andar ≈5 min hasta la estación JR Osaka y coger el JR Special Rapid (新快速) hasta Kioto, ≈30 min.'
        },
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
          id: 'kimono', t: '12:30', kind: 'sight', name: 'Alquiler de kimono para las fotos', ja: '着物レンタル 岡本 清水寺店',
          q: '着物レンタル岡本 清水寺店', ll: [34.9968, 135.7820], approx: true, how: 'Bus o taxi desde Kamigyō · ≈25 min',
          note: 'Okamoto (tienda de Kiyomizu), al pie de las cuestas: os vestís aquí y hacéis toda la ruta de la tarde en kimono. Desde ≈3.300 ¥ por persona; peinado ≈1.500 ¥ más. Devolución hacia las 17:30–18:00: cenar en Pontochō después, ya sin kimono.',
          tips: [
            'Reservar online con antelación: suele haber 10–20 % de descuento y en noviembre (otoño) se llenan.',
            'Mejores fotos en orden de paso: escaleras de Ninenzaka, pagoda Yasaka desde Yasaka-dōri, Nene-no-michi y el canal de Shirakawa.',
            'En noviembre hace fresco: camiseta térmica de cuello ancho debajo (no se ve) y calcetines finos para los tabi.',
            'Lo barato suele ser yukata de algodón; si queréis seda o un kimono de más calidad, mirar planes «premium».'
          ],
          shops: [
            { n: 'Okamoto · Kiyomizu (≈3.300 ¥)', ja: '岡本 清水寺店', q: '着物レンタル岡本 清水寺店' },
            { n: 'Yumeyakata · Gojō (≈3.850 ¥, mucha variedad)', ja: '夢館 五条店', q: '夢館 五条店' },
            { n: 'Maiko-ya · Gion (≈5.500 ¥, más cuidado)', ja: '舞妓屋', q: 'Maikoya Gion kimono' },
            { n: 'Wargo · Kyoto Tower (≈3.300 ¥, junto a la estación)', ja: 'わーゴ 京都タワー店', q: 'Kimono rental wargo Kyoto Tower' },
            { n: 'Akahime · Arashiyama (≈3.000 ¥, para el día 7)', ja: '赤姫 嵐山', q: 'Akahime kimono Arashiyama' }
          ],
          photo: { when: '12:30–17:30', tip: 'Las fotos en kimono: escaleras de Ninenzaka, pagoda Yasaka desde Yasaka-dōri y el canal de Shirakawa al final del día.', lens: '85 mm f/1.8 para retratos con fondo desenfocado; 24–35 mm para calles.' }
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
          note: 'La foto clásica de Kioto, desde la calle Yasaka-dōri.',
          photo: { when: 'tarde, antes de las 16:30', tip: 'La pagoda al fondo de la cuesta de Yasaka-dōri. Bajar unos metros por la calle para tenerla centrada entre las casas.', lens: '70–135 mm para comprimir la calle contra la pagoda.' }
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
          note: 'Sauces, canal y casas de té. La zona más fotogénica de Gion de noche.',
          photo: { when: 'hora azul ≈17:00', tip: 'Puente Tatsumi y el canal con farolillos y sauces: de las fotos más bonitas de Gion.', lens: '24–35 mm; ISO alto a mano.' }
        },
        {
          id: 'pontocho', t: '18:30', kind: 'food', name: 'Cena en Pontochō', ja: '先斗町',
          q: 'Pontocho Alley', ll: [35.0053, 135.7707], how: 'A pie · 5 min',
          note: 'Callejón estrecho junto al río Kamo. Muchos sitios piden reserva: mirar antes de ir.'
        },
        {
          id: 'gm-hurricane-teramachi-kyogoku', t: '', kind: 'shop', name: 'Hurricane Teramachi Kyogoku (ハリケーン寺町京極店)',
          q: 'Hurricane Teramachi Kyogoku (ハリケーン寺町京極店)', ll: [35.006, 135.76712], how: 'A pie · ≈4 min',
          note: '★ De tu lista «Quiero ir». Cerca de Cena en Pontochō (335 m).'
        },
        {
          id: 'gm-photo-house-k', t: '', kind: 'shop', opt: true, name: 'Photo House K',
          q: 'Photo House K', ll: [35.00931, 135.76871], how: 'A pie · ≈5 min',
          note: 'De tu lista «Foto vintage». Cerca de Cena en Pontochō (481 m).'
        },
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
          id: 'd6-start', t: '6:10', kind: 'home', lodge: 'kyoto', name: 'Salida de casa',
          how: 'Taxi ≈25 min (o bus + JR ≈50 min)', go: 'Fushimi Inari Taisha',
          note: 'A esa hora lo más cómodo es taxi (≈3.500–4.000 ¥ entre los dos; pedirlo por GO o Uber, o pararlo en Senbon-dōri). En transporte: bus urbano hasta la estación de Kioto y JR Nara Line 2 paradas hasta Inari (sale justo enfrente del torii).'
        },
        {
          id: 'inari', t: '6:45', kind: 'sight', name: 'Fushimi Inari-taisha', ja: '伏見稲荷大社',
          q: 'Fushimi Inari Taisha', ll: [34.9671, 135.7727], how: 'Metro a Kioto + JR Nara hasta Inari · ≈30 min (o taxi ≈25 min)',
          note: 'Abierto 24 h. Amanecer ≈6:35: los Senbon Torii están casi vacíos para grabar. Subir al menos hasta el cruce de Yotsutsuji (≈45 min) por las vistas.',
          photo: { when: 'amanecer, antes de las 7:30', tip: 'Túnel de torii sin gente: subir 15–20 min por encima de Senbon Torii; cuanto más arriba, más vacío.', lens: '35 mm; foto en vertical para la perspectiva del túnel.' }
        },
        {
          id: 'gm-toys-kameta', t: '', kind: 'shop', name: 'Toys Kameta',
          q: 'Toys Kameta', ll: [34.95727, 135.76936], how: 'A pie · ≈15 min',
          note: '★ De tu lista «Quiero ir». Cerca de Fushimi Inari-taisha (1.1 km).'
        },
        {
          id: 'tofukuji', t: '9:00', kind: 'sight', opt: true, name: 'Templo Tōfuku-ji', ja: '東福寺',
          q: 'Tofukuji Temple', ll: [34.9762, 135.7740], how: 'A pie · ≈20 min',
          note: 'Opcional. El puente Tsūtenkyō sobre un mar de arces es de los mejores momiji de Kioto. Con la previsión de 2026 el 20 nov puede estar a medio color.',
          photo: { when: 'al abrir (9:00)', tip: 'Arces del valle Sengyokukan. Desde otoño de 2019 está prohibido hacer fotos sobre el puente Tsūten-kyō: hacerla desde el puente Gaun-kyō, mirando hacia él.', lens: '24–70 mm.' }
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
          tips: ['Guardar mapas y bolsas de papel: se los comen. Pueden dar cabezazos si ven comida.'],
          photo: { when: 'mañana', tip: 'Ciervos con luz suave entre los árboles. Agacharse a la altura de sus ojos.', lens: '85 mm o 70–200 mm con el diafragma abierto.' }
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
        'Sábado en pleno otoño: reservar el Shinkansen en cuanto se abra la venta, un mes antes.',
        'El 21 de cada mes hay mercadillo de antigüedades en Tō-ji, a 15 min a pie de la estación: cabe antes del Shinkansen.'
      ],
      rain: 'Con lluvia, quedarse solo con Kinkaku-ji y salir antes hacia Tokio.',
      stops: [
        {
          id: 'd7-start', t: '6:30', kind: 'home', lodge: 'kyoto', name: 'Salida de casa',
          how: 'A pie + tranvía Randen · ≈45 min', go: 'Arashiyama Bamboo Grove',
          note: 'Dejar la habitación antes de las 10:00 (ver el plan del día para las mochilas). A pie ≈15 min hasta Kitano-Hakubaichō. Tranvía Randen (嵐電) línea Kitano, cambio en Katabiranotsuji a la línea Arashiyama, hasta la estación de Arashiyama (≈25 min). El bambú está a ≈10 min a pie.'
        },
        {
          id: 'bamboo', t: '7:15', kind: 'sight', name: 'Bosque de bambú de Arashiyama', ja: '竹林の小径',
          q: 'Arashiyama Bamboo Grove', ll: [35.0170, 135.6713], how: 'JR Sagano desde Nijō · ≈12 min, o taxi ≈25 min',
          note: 'Abierto siempre. A las 7:00 aún no llegan los grupos: el mejor momento para grabar.',
          photo: { when: '7:00, antes que los grupos', tip: 'El camino de bambú desde abajo, hacia arriba. Ir hasta el tramo final junto a Ōkōchi Sansō, que está más vacío.', lens: '16–24 mm en vertical.' }
        },
        {
          id: 'tenryuji', t: '8:30', kind: 'sight', name: 'Jardín de Tenryū-ji', ja: '天龍寺',
          q: 'Tenryuji Temple', ll: [35.0156, 135.6737], how: 'A pie · 3 min',
          note: 'Jardín zen Patrimonio de la Humanidad. Abre a las 8:30; su puerta norte da al bambú.'
        },
        {
          id: 'togetsukyo', t: '9:30', kind: 'sight', name: 'Puente Togetsukyō', ja: '渡月橋',
          q: 'Togetsukyo Bridge', ll: [35.0129, 135.6778], how: 'A pie · 8 min',
          note: 'Puente sobre el río Katsura con las montañas de arces detrás.',
          photo: { when: 'mañana', tip: 'El puente con la montaña de Arashiyama en colores de otoño. Bajar a la orilla del río, aguas abajo.', lens: '24–70 mm.' }
        },
        {
          id: 'kinkakuji', t: '10:15', kind: 'sight', name: 'Kinkaku-ji (Pabellón Dorado)', ja: '金閣寺（鹿苑寺）',
          q: 'Kinkakuji', ll: [35.0394, 135.7292], how: 'Taxi ≈20 min (≈2.500 ¥)',
          note: 'Abre a las 9:00. La visita es un recorrido de sentido único de unos 45 min.',
          photo: { when: 'a primera hora (abre 9:00)', tip: 'El Pabellón Dorado reflejado en el estanque desde el primer mirador. Con el día sin viento sale el reflejo completo.', lens: '24–70 mm; filtro polarizador para controlar los reflejos.' }
        },
        {
          id: 'd7-home', t: '11:15', kind: 'home', lodge: 'kyoto', name: 'Recoger mochilas',
          how: 'Taxi o bus · ≈15 min'
        },
        {
          id: 'toji', t: '11:45', kind: 'shop', opt: true, name: 'Mercadillo Kōbō-san en Tō-ji', ja: '東寺 弘法市',
          q: 'Toji Temple Kyoto', ll: [34.9806, 135.7477], how: 'Metro + a pie · ≈25 min',
          note: 'Solo los días 21: antigüedades, kimonos usados, cerámica y cacharros alrededor de la pagoda de cinco pisos. Efectivo.',
          tips: ['A 15 min a pie de la estación de Kioto. Con mochila, mejor dejarla antes en las taquillas de la estación.']
        },
        {
          id: 'shinkansen', t: '13:00', kind: 'move', name: 'Shinkansen Kioto → Tokio', ja: '京都駅 新幹線',
          q: 'Kyoto Station Shinkansen', ll: [34.9858, 135.7588], how: 'Metro Karasuma · ≈15 min',
          note: 'Nozomi ≈2 h 15. Asiento E: ventanilla del lado del Fuji. Comprar ekiben (bentō de tren) en la estación.',
          tips: ['Maletas de más de 160 cm (alto + ancho + fondo) obligan a reservar asiento con espacio para equipaje.']
        },
        {
          id: 'd7-tokyo', t: '15:45', kind: 'home', lodge: 'tokyo', name: 'Check-in en Taitō',
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
            { n: 'Mandarake Complex', ja: 'まんだらけコンプレックス', q: 'Mandarake Complex Akihabara' },
            { n: 'Surugaya (suele ser más barato)', ja: '駿河屋', q: '駿河屋 秋葉原' },
            { n: 'BEEP (ordenadores retro)', ja: 'BEEP', q: 'BEEP Akihabara' },
            { n: 'Retro Game Camp', ja: 'レトロゲームキャンプ', q: 'レトロゲームキャンプ 秋葉原' }
          ]
        },
        {
          id: 'gm-amiami', t: '', kind: 'shop', opt: true, name: 'AmiAmi',
          q: 'AmiAmi', ll: [35.69795, 139.77146], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Akihabara (85 m).'
        },
        {
          id: 'gm-lashinbang-akihabara', t: '', kind: 'shop', name: 'Lashinbang Akihabara',
          q: 'Lashinbang Akihabara', ll: [35.69791, 139.77196], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Akihabara (106 m).'
        },
        {
          id: 'gm-lashinbang-akihabara-2', t: '', kind: 'shop', name: 'Lashinbang Akihabara 2',
          q: 'Lashinbang Akihabara 2', ll: [35.69946, 139.77046], how: 'A pie · ≈3 min',
          note: '★ De tu lista «Quiero ir». Cerca de Akihabara (114 m).'
        },
        {
          id: 'gm-hard-off-akihabara-1st-store', t: '', kind: 'shop', opt: true, name: 'HARD OFF Akihabara 1st store',
          q: 'HARD OFF Akihabara 1st store', ll: [35.70055, 139.77056], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Akihabara (216 m).'
        },
        {
          id: 'gm-suruga-ya-akihabara-main-bui', t: '', kind: 'shop', opt: true, name: 'SURUGA-YA Akihabara Main Building',
          q: 'SURUGA-YA Akihabara Main Building', ll: [35.70064, 139.7705], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Akihabara (227 m).'
        },
        {
          id: 'gm-trader-headquarters', t: '', kind: 'shop', name: 'TRADER Headquarters',
          q: 'TRADER Headquarters', ll: [35.70016, 139.77165], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Akihabara (165 m).'
        },
        {
          id: 'gm-anime-figure-store', t: '', kind: 'shop', name: 'Anime figure store',
          q: 'Anime figure store', ll: [35.70149, 139.77184], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Akihabara (314 m).'
        },
        {
          id: 'gm-suruga-ya-anime-hobby-store', t: '', kind: 'shop', opt: true, name: 'Suruga-ya Anime & Hobby Store',
          q: 'Suruga-ya Anime & Hobby Store', ll: [35.70156, 139.77182], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Akihabara (321 m).'
        },
        {
          id: 'gm-imtiaz-s-camera-market', t: '', kind: 'shop', name: 'Imtiaz\'s Camera Market',
          q: 'Imtiaz\'s Camera Market', ll: [35.70228, 139.77145], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Akihabara (397 m).'
        },
        {
          id: 'gm-akihabara-nisshin-camera-hea', t: '', kind: 'shop', opt: true, name: 'Akihabara Nisshin camera head office',
          q: 'Akihabara Nisshin camera head office', ll: [35.69639, 139.77513], how: 'A pie · ≈10 min',
          note: 'De tu lista «Compras». Cerca de Akihabara (433 m).'
        },
        {
          id: 'gm-coredo-muromachi-1', t: '', kind: 'shop', opt: true, name: 'COREDO Muromachi 1',
          q: 'COREDO Muromachi 1', ll: [35.68652, 139.77403], how: 'A pie · ≈14 min',
          note: 'De tu lista «Saved places». Cerca de Akihabara (1.4 km). Tu nota: Evento Pokémon.'
        },
        {
          id: 'gm-hard-off-hobby-off-ueno-okac', t: '', kind: 'shop', opt: true, name: 'Hard Off & Hobby Off Ueno Okachimachi Store',
          q: 'Hard Off & Hobby Off Ueno Okachimachi Store', ll: [35.70871, 139.7741], how: 'Tren · ≈2 km (metro o JR)',
          note: 'De tu lista «Compras». Cerca de Akihabara (1.1 km).'
        },
      ]
    },

    {
      n: 8, date: '2026-11-22', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Rastro de Ōi, teamLab y la bahía',
      sub: 'Lo primero del domingo: el gran rastro de antigüedades de Ōi. Después arte digital y atardecer en la bahía.',
      temp: [15, 7],
      changes: [
        'El rastro de Ōi pasa al domingo 22 a primera hora: es lo más importante del día.',
        'teamLab Planets está en Toyosu, no en Odaiba. Se enlaza con Odaiba en el tren Yurikamome.',
        'La Doraemon Future Department Store de DiverCity está cerrada por reforma (1 oct – principios de dic.). Su tienda temporal en Tokyo Dome City abre hasta el 23 nov: hoy da tiempo.',
        'La estatua del Gundam Unicorn de DiverCity se desmontó en agosto de 2026.',
        'El Pokémon Center Tokyo DX está en Nihonbashi (no en Odaiba): ver día 15.'
      ],
      rain: 'El rastro se cancela con lluvia. Plan B: teamLab por la mañana y tienda Doraemon por la tarde.',
      stops: [
        {
          id: 'd8-start', t: '8:05', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'JR + monorraíl · ≈35 min', go: '大井競馬場 フリーマーケット',
          note: 'Estación JR Okachimachi (≈7 min a pie). JR Keihin-Tōhoku o Yamanote dirección Shinagawa/Tokio, ≈12 min hasta Hamamatsuchō. Cambio al Tokyo Monorail (dirección Haneda), local hasta Ōi Keibajō-mae (≈7 min); el rastro está junto a la estación.'
        },
        {
          id: 'oiflea', t: '8:45', kind: 'shop', name: 'Tokyo City Flea Market (Ōi)', ja: '大井競馬場フリーマーケット',
          q: '大井競馬場 フリーマーケット', ll: [35.5937, 139.7440], approx: true, how: 'JR a Hamamatsuchō + monorraíl a Ōi Keibajō-mae · ≈35 min',
          note: 'Llegar a la apertura (≈9:00): lo mejor de antigüedades y cámaras se vende pronto. Se cancela si llueve o hay carreras: mirar la web o redes la víspera.',
          tips: ['Efectivo en billetes pequeños y monedas. Regatear con educación y sin insistir.'],
          photo: { when: '9:00–11:00', tip: 'Detalles de los puestos: cámaras viejas, cerámica, juguetes. Preguntar antes: «Shashin ii desu ka?» (¿puedo hacer una foto?).', lens: '35 mm discreto.' }
        },
        {
          id: 'teamlab', t: '13:30', kind: 'sight', name: 'teamLab Planets', ja: 'チームラボプラネッツ TOKYO',
          q: 'teamLab Planets TOKYO', ll: [35.6491, 139.7899], how: 'Tren · ≈40 min',
          note: 'Se va descalzo y en algunas salas el agua llega a las rodillas: pantalón que se pueda remangar. Entrada con hora: en festivo se agota.',
          photo: { when: 'toda la visita', tip: 'Salas de espejos y agua. Los suelos reflejan: con falda, pedir los pantalones cortos que prestan.', lens: 'El gran angular más abierto que tengáis, o el móvil; nada de trípode.' }
        },
        {
          id: 'odaiba', t: '16:00', kind: 'sight', name: 'Atardecer en Odaiba', ja: 'お台場海浜公園',
          q: 'Odaiba Seaside Park', ll: [35.6298, 139.7745], how: 'Yurikamome desde Shin-Toyosu · ≈20 min',
          note: 'Puesta de sol ≈16:30 con el Rainbow Bridge y la réplica de la Estatua de la Libertad.',
          tips: ['En la Yurikamome, primer vagón: la vista frontal del recorrido por la bahía merece la pena.', 'The Gundam Base Tokyo sigue abierta en la 7.ª planta de DiverCity, a 5 min del parque.'],
          photo: { when: '16:30–17:15', tip: 'Rainbow Bridge con la ciudad detrás desde la playa de Odaiba Seaside Park; las luces del puente se encienden al anochecer.', lens: '24–70 mm apoyado en la barandilla, 1–2 s.' }
        },
        {
          id: 'gm-otakara-market-odaiba', t: '', kind: 'shop', name: 'Otakara @ Market Odaiba',
          q: 'Otakara @ Market Odaiba', ll: [35.62921, 139.77591], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Atardecer en Odaiba (144 m).'
        },
        {
          id: 'doraemon', t: '17:45', kind: 'shop', name: 'Doraemon: tienda temporal', ja: 'ドラえもん未来デパート（東京ドームシティ期間限定店）',
          q: 'Tokyo Dome City', ll: [35.7056, 139.7519], how: 'Yurikamome + JR · ≈45 min',
          note: 'En Tokyo Dome City (zona Central Park), del 9 oct al 23 nov, 11:00–19:00. Si no llega a tiempo, la tienda online vende desde el 12 nov.'
        },
        {
          id: 'gm-trefacstyle-togoshi-ginza', t: '', kind: 'shop', opt: true, name: 'TreFacStyle Togoshi Ginza',
          q: 'TreFacStyle Togoshi Ginza', ll: [35.61515, 139.71689], how: 'Tren · ≈11 km (lejos del centro)',
          note: 'De tu lista «Compras». Extra en las afueras (a 3 km de Tokyo City Flea Market (Ōi)). Solo si os sobra tiempo al final del día.'
        },
        {
          id: 'gm-hobby-off-musashikoyama-palm', t: '', kind: 'shop', opt: true, name: 'Hobby Off musashikoyama-palm',
          q: 'Hobby Off musashikoyama-palm', ll: [35.61727, 139.70743], how: 'A pie · ≈12 min',
          note: 'De tu lista «Compras». Extra en las afueras (a 4 km de Tokyo City Flea Market (Ōi)). Solo si os sobra tiempo al final del día.'
        },
      ]
    },

    {
      n: 9, date: '2026-11-23', phase: 'tokyo', base: 'tokyo', mode: 'transit',
      title: 'Shibuya, Shinjuku y Nakano',
      sub: 'Festivo nacional: antigüedades de Ōedo (opcional) y tiendas en línea: Shibuya → Shinjuku → Nakano.',
      temp: [15, 7],
      changes: [
        'La Tokyu Kabukichō Tower está en Shinjuku, no en Shibuya. Reordenado para no cruzar la ciudad dos veces.',
        'Pasa al lunes 23 (festivo) para dejar el domingo al rastro de Ōi. Shinjuku vuelve por la noche, cuando luce el neón.',
        'Desde Ueno, la línea Ginza llega directa a Shibuya.',
        'El 23 hay Ōedo Antique Market en el Tokyo International Forum (el mayor rastro de antigüedades al aire libre de Japón): opcional a primera hora. Kōenji queda a una parada de Nakano.'
      ],
      rain: 'Todo funciona con lluvia; cambiar el cruce de Shibuya por la vista desde una cafetería.',
      stops: [
        {
          id: 'd9-start', t: '8:00', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'JR · ≈20 min', go: 'Tokyo International Forum',
          note: 'Estación JR Okachimachi (≈7 min a pie). JR Yamanote o Keihin-Tōhoku dirección Tokio, 4 paradas hasta Yūrakuchō. El Tokyo International Forum está a 1 min de la salida Kokusai Forum.'
        },
        {
          id: 'oedo', t: '8:30', kind: 'shop', opt: true, name: 'Ōedo Antique Market', ja: '大江戸骨董市（東京国際フォーラム）',
          q: 'Oedo Antique Market Tokyo International Forum', ll: [35.6767, 139.7637], how: 'JR Yamanote a Yūrakuchō · ≈10 min',
          note: 'Unos 250 puestos de antigüedades, 9:00–16:00. Se cancela con lluvia: confirmar en su web la víspera. Luego metro Ginza directo a Shibuya.',
          photo: { when: '9:00–11:00', tip: 'Puestos de antigüedades entre los edificios de cristal del Tokyo International Forum. Pedir permiso antes de fotografiar los objetos.', lens: '35 mm.' }
        },
        {
          id: 'gm-uniqlo-tokyo-ginza', t: '', kind: 'shop', name: 'Uniqlo Tokyo (Ginza)',
          q: 'Uniqlo Tokyo (Ginza)', ll: [35.67376, 139.76513], how: 'A pie · ≈5 min',
          note: '★ De tu lista «Quiero ir». Cerca de Ōedo Antique Market (351 m).'
        },
        {
          id: 'gm-lemon-sha-ginza-kyokai-store', t: '', kind: 'shop', opt: true, name: 'Lemon-sha Ginza-kyokai Store',
          q: 'Lemon-sha Ginza-kyokai Store', ll: [35.67291, 139.76427], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Ōedo Antique Market (424 m).'
        },
        {
          id: 'gm-sankyo-camera', t: '', kind: 'shop', name: 'Sankyo Camera',
          q: 'Sankyo Camera', ll: [35.67019, 139.76691], how: 'A pie · ≈5 min',
          note: '★ De tu lista «Quiero ir». Cerca de Ōedo Antique Market (779 m).'
        },
        {
          id: 'gm-crayon-shin-chan-official-sh', t: '', kind: 'shop', opt: true, name: 'Crayon Shin-chan Official shop',
          q: 'Crayon Shin-chan Official shop', ll: [35.6813, 139.76834], how: 'A pie · ≈16 min',
          note: 'De tu lista «Compras». Cerca de Ōedo Antique Market (663 m).'
        },
        {
          id: 'gm-pok-mon-center-tokyo-dx', t: '', kind: 'shop', opt: true, name: 'Pokémon Center Tokyo DX',
          q: 'Pokémon Center Tokyo DX', ll: [35.68029, 139.77427], how: 'A pie · ≈7 min',
          note: 'De tu lista «Compras». Cerca de Ōedo Antique Market (1.0 km).'
        },
        {
          id: 'hachiko', t: '10:30', kind: 'sight', name: 'Hachikō y el cruce de Shibuya', ja: 'ハチ公像・スクランブル交差点',
          q: 'Hachiko Statue', ll: [35.6591, 139.7006], how: 'Metro Ginza directo (desde Ueno o Ginza) · ≈30 min',
          note: 'Para verlo desde arriba: Shibuya Sky (con reserva) o la azotea de Magnet by Shibuya109.',
          photo: { when: 'mediodía o anochecer', tip: 'El cruce desde arriba: Shibuya Sky (con reserva) o la azotea de Magnet by Shibuya109.', lens: '16–24 mm; 1/4 s apoyado para el «río» de gente.' }
        },
        {
          id: 'gm-square-enix-garden', t: '', kind: 'shop', name: 'SQUARE ENIX GARDEN',
          q: 'SQUARE ENIX GARDEN', ll: [35.65726, 139.70162], how: 'A pie · ≈3 min',
          note: '★ De tu lista «Quiero ir». Cerca de Hachikō y el cruce de Shibuya (225 m).'
        },
        {
          id: 'gm-2nd-street-daikanyama', t: '', kind: 'shop', opt: true, name: '2nd Street Daikanyama',
          q: '2nd Street Daikanyama', ll: [35.64817, 139.70296], how: 'A pie · ≈13 min',
          note: 'De tu lista «Compras». Cerca de Hachikō y el cruce de Shibuya (1.2 km).'
        },
        {
          id: 'gm-osawa-camera', t: '', kind: 'shop', opt: true, name: 'Osawa Camera',
          q: 'Osawa Camera', ll: [35.64668, 139.70861], how: 'A pie · ≈7 min',
          note: 'De tu lista «Compras». Cerca de Hachikō y el cruce de Shibuya (1.6 km).'
        },
        {
          id: 'gm-tokyo-used-camera', t: '', kind: 'shop', opt: true, name: 'TOKYO USED CAMERA',
          q: 'TOKYO USED CAMERA', ll: [35.64788, 139.71019], how: 'A pie · ≈3 min',
          note: 'De tu lista «Compras». Cerca de Hachikō y el cruce de Shibuya (1.5 km).'
        },
        {
          id: 'parco', t: '11:30', kind: 'shop', name: 'Shibuya PARCO', ja: '渋谷PARCO',
          q: 'Shibuya PARCO', ll: [35.6620, 139.6987], how: 'A pie · ≈7 min',
          note: 'Planta 6: Pokémon Center Shibuya, Nintendo TOKYO, Capcom Store y Jump Shop. En la 5.ª abre en noviembre la Gundam Base Shibuya (fecha por confirmar).',
          shops: [
            { n: 'Mandarake Shibuya', ja: 'まんだらけ渋谷店', q: 'Mandarake Shibuya' }
          ]
        },
        {
          id: 'gm-2nd-street', t: '', kind: 'shop', opt: true, name: '2nd Street',
          q: '2nd Street', ll: [35.66136, 139.70105], how: 'A pie · ≈3 min',
          note: 'De tu lista «Compras». Cerca de Shibuya PARCO (225 m).'
        },
        {
          id: 'gm-salomon-shibuya-store', t: '', kind: 'shop', name: 'SALOMON Shibuya Store',
          q: 'SALOMON Shibuya Store', ll: [35.66515, 139.70321], how: 'A pie · ≈6 min',
          note: '★ De tu lista «Quiero ir». Cerca de Shibuya PARCO (539 m).'
        },
        {
          id: 'gm-sootang-hobby-omotesando', t: '', kind: 'shop', name: 'SOOTANG HOBBY Omotesando',
          q: 'SOOTANG HOBBY Omotesando', ll: [35.6686, 139.7073], how: 'A pie · ≈7 min',
          note: '★ De tu lista «Quiero ir». Cerca de Shibuya PARCO (1.1 km).'
        },
        {
          id: 'gm-liberty-walk-tokyo', t: '', kind: 'shop', name: 'LIBERTY WALK TOKYO',
          q: 'LIBERTY WALK TOKYO', ll: [35.66949, 139.70823], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Shibuya PARCO (1.2 km).'
        },
        {
          id: 'gm-japanime-art-gallery-tokyo', t: '', kind: 'shop', name: 'Japanime Art Gallery Tokyo',
          q: 'Japanime Art Gallery Tokyo', ll: [35.67122, 139.70492], how: 'A pie · ≈5 min',
          note: '★ De tu lista «Quiero ir». Cerca de Shibuya PARCO (1.2 km).'
        },
        {
          id: 'gm-treasure-factory-style-shimo', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Style Shimokitazawa',
          q: 'Treasure Factory Style Shimokitazawa', ll: [35.66029, 139.66845], how: 'Tren · ≈4 km (metro o JR)',
          note: 'De tu lista «Compras». Cerca de Shibuya PARCO (2.8 km).'
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
          id: 'gm-yodobashi-camera-shinjuku-we', t: '', kind: 'shop', opt: true, name: 'Yodobashi Camera Shinjuku West Main Store',
          q: 'Yodobashi Camera Shinjuku West Main Store', ll: [35.68988, 139.69795], how: 'A pie · ≈3 min',
          note: 'De tu lista «Compras». Cerca de Cámaras en Shinjuku (217 m).'
        },
        {
          id: 'gm-shinjuku-used-camera-market', t: '', kind: 'shop', opt: true, name: 'Shinjuku used camera market',
          q: 'Shinjuku used camera market', ll: [35.68971, 139.6969], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Cámaras en Shinjuku (238 m).'
        },
        {
          id: 'gm-used-camera-box', t: '', kind: 'shop', name: 'Used camera BOX',
          q: 'Used camera BOX', ll: [35.68948, 139.69665], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Cámaras en Shinjuku (269 m).'
        },
        {
          id: 'nakano', t: '15:15', kind: 'shop', name: 'Nakano Broadway', ja: '中野ブロードウェイ',
          q: 'Nakano Broadway', ll: [35.7090, 139.6656], how: 'JR Chūō rápido · ≈5 min',
          note: 'Mandarake (una veintena de locales), Lashinbang, relojes y juguetes retro. Muchas tiendas abren a las 12:00 y cierran a las 20:00.',
          shops: [
            { n: 'Fujiya Camera (usadas y «junk»)', ja: 'フジヤカメラ', q: 'フジヤカメラ 中野' }
          ]
        },
        {
          id: 'gm-lashinbang-nakano-kaitori', t: '', kind: 'shop', name: 'Lashinbang Nakano Kaitori',
          q: 'Lashinbang Nakano Kaitori', ll: [35.70893, 139.66578], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Nakano Broadway (18 m).'
        },
        {
          id: 'gm-yth-nakano-broadway-c-maras-', t: '', kind: 'shop', name: 'YTH Nakano Broadway (cámaras usadas)',
          q: 'YTH Nakano Broadway (cámaras usadas)', ll: [35.70963, 139.66554], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Nakano Broadway (70 m).'
        },
        {
          id: 'gm-fujiya-camera-junk-hall', t: '', kind: 'shop', opt: true, name: 'FUJIYA Camera Junk Hall',
          q: 'FUJIYA Camera Junk Hall', ll: [35.70667, 139.66603], how: 'A pie · ≈4 min',
          note: 'De tu lista «Compras · Foto vintage». Cerca de Nakano Broadway (262 m).'
        },
        {
          id: 'gm-fujiya-camera-video-gallery', t: '', kind: 'shop', opt: true, name: 'Fujiya Camera Video Gallery',
          q: 'Fujiya Camera Video Gallery', ll: [35.70671, 139.66656], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras · Foto vintage». Cerca de Nakano Broadway (269 m).'
        },
        {
          id: 'koenji', t: '17:15', kind: 'shop', opt: true, name: 'Kōenji (ropa vintage)', ja: '高円寺',
          q: 'Koenji Station', ll: [35.7053, 139.6497], how: 'JR Chūō · 1 parada',
          note: 'Galerías cubiertas y callejones con tiendas de ropa usada baratas. Abren hasta las 20:00 aprox.'
        },
        {
          id: 'gm-hard-off', t: '', kind: 'shop', opt: true, name: 'Hard Off',
          q: 'Hard Off', ll: [35.70673, 139.64987], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Kōenji (ropa vintage) (159 m).'
        },
        {
          id: 'gm-trefacstyle-koenji-1', t: '', kind: 'shop', opt: true, name: 'TreFacStyle Koenji 1',
          q: 'TreFacStyle Koenji 1', ll: [35.70254, 139.65196], how: 'A pie · ≈7 min',
          note: 'De tu lista «Compras». Cerca de Kōenji (ropa vintage) (369 m).'
        },
        {
          id: 'kabukicho', t: '19:00', kind: 'sight', name: 'Kabukichō y Tokyu Kabukichō Tower', ja: '東急歌舞伎町タワー',
          q: 'Tokyu Kabukicho Tower', ll: [35.6958, 139.7005], how: 'JR Chūō · ≈5 min',
          note: 'Neones, la cabeza de Godzilla del Hotel Gracery y la torre nueva de Kabukichō.',
          photo: { when: 'de noche', tip: 'La cabeza de Godzilla del Hotel Gracery vista desde la calle Shinjuku Tōhō, y los neones de Kabukichō Ichiban-gai.', lens: '24–70 mm.' }
        },
        {
          id: 'omoide', t: '20:00', kind: 'food', name: 'Omoide Yokochō', ja: '思い出横丁',
          q: 'Omoide Yokocho', ll: [35.6930, 139.6997], how: 'A pie · ≈8 min',
          note: 'Yakitori en el «callejón del humo». Después, copa en Golden Gai.',
          photo: { when: 'de noche', tip: 'Callejón de humo y farolillos. Algunos locales no dejan hacer fotos: respetarlo y no fotografiar de cerca a los clientes.', lens: '35 mm f/1.8, ISO 3200–6400.' }
        },
        {
          id: 'gm-shinjuku-kitamura-camera', t: '', kind: 'shop', name: 'Shinjuku Kitamura Camera',
          q: 'Shinjuku Kitamura Camera', ll: [35.69166, 139.70244], how: 'A pie · ≈4 min',
          note: '★ De tu lista «Quiero ir». Cerca de Omoide Yokochō (291 m).'
        },
        {
          id: 'gm-2nd-street-shinjuku-2', t: '', kind: 'shop', opt: true, name: '2nd Street Shinjuku 2',
          q: '2nd Street Shinjuku 2', ll: [35.69048, 139.70367], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Omoide Yokochō (457 m).'
        },
        {
          id: 'gm-2nd-street-shinjuku', t: '', kind: 'shop', opt: true, name: '2nd Street Shinjuku',
          q: '2nd Street Shinjuku', ll: [35.69056, 139.70425], how: 'A pie · ≈2 min',
          note: 'De tu lista «Compras». Cerca de Omoide Yokochō (495 m).'
        },
        {
          id: 'gm-lashinbang-shinjuku-marui-an', t: '', kind: 'shop', name: 'Lashinbang Shinjuku Marui Annex',
          q: 'Lashinbang Shinjuku Marui Annex', ll: [35.69008, 139.70592], how: 'A pie · ≈2 min',
          note: '★ De tu lista «Quiero ir». Cerca de Omoide Yokochō (652 m).'
        },
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
          id: 'd10-start', t: '6:50', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'Metro Hibiya + JR Keiyō · ≈35 min', go: 'Maihama Station',
          note: 'Truco para evitar el pasillo de 15 min de Tokyo Station: estación Naka-Okachimachi (≈5 min a pie), línea Hibiya (gris) dirección Naka-Meguro, 5 paradas hasta Hatchōbori. Allí la línea JR Keiyō dirección Soga/Kaihin-Makuhari hasta Maihama (≈15 min).'
        },
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
          ],
          photo: { when: 'anochecer', tip: 'Mediterranean Harbor con el volcán Mount Prometheus detrás, cuando se encienden las luces del puerto.', lens: '24–70 mm. En el parque no se permiten trípodes ni palos de selfie.' }
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
          id: 'd11-start', t: '7:10', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'A pie · ≈10 min', go: 'レンタカー 上野駅',
          note: 'Hasta la oficina de alquiler junto a la estación de Ueno. Llevar pasaportes, carnés españoles y el Permiso Internacional. Volver a por las maletas si no caben a pie: hoy se duerme en Kawaguchiko.'
        },
        {
          id: 'rentacar', t: '7:30', kind: 'move', name: 'Recogida del coche (25–29 nov)', ja: 'レンタカー（上野）',
          q: 'レンタカー 上野駅', ll: [35.7128, 139.7768], approx: true,
          note: 'Devolución el 29 en el aeropuerto de Narita (pedir «乗り捨て», devolución en otra oficina). Tarjeta ETC para peajes y GPS en inglés. Carné español + Permiso Internacional. Si la oficina abre tarde, recogerlo la tarde del 24 al volver de Disney.'
        },
        {
          id: 'chureito', t: '10:00', kind: 'sight', name: 'Pagoda Chūreitō', ja: '新倉山浅間公園（忠霊塔）',
          q: 'Chureito Pagoda', ll: [35.5012, 138.8019], how: 'Desde Taitō: Shuto → Chūō Expressway → Kawaguchiko IC · ≈2 h',
          note: 'La foto de la pagoda con el Fuji detrás. 398 escalones hasta el mirador; aparcamiento junto al parque.',
          tips: ['Salir antes de las 8:00 evita lo peor del tráfico de salida de Tokio.'],
          photo: { when: '9:00–10:00', tip: 'La pagoda roja con el Fuji detrás desde el mirador de arriba (398 escalones). Por la mañana suele estar despejado.', lens: '70–200 mm para que el Fuji salga grande detrás de la pagoda.' }
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
          note: 'Túnel de arces en la orilla norte. A finales de noviembre puede quedar color.',
          photo: { when: 'tarde', tip: 'Túnel de arces rojos junto al lago Kawaguchiko, con el Fuji si está despejado.', lens: '24–70 mm.' }
        },
        {
          id: 'oishi', t: '15:45', kind: 'sight', name: 'Parque Ōishi', ja: '大石公園',
          q: 'Oishi Park Kawaguchiko', ll: [35.5266, 138.7428], approx: true, how: 'Coche · ≈5 min',
          note: 'El Fuji al otro lado del lago. Puesta de sol ≈16:35; abrigarse, al anochecer se baja de 5 °C.',
          photo: { when: 'atardecer', tip: 'El Fuji al otro lado del lago, con el agua delante.', lens: '70–200 mm o 24–70 mm; trípode si lo lleváis en el coche.' }
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
          note: 'Si se duerme en Kawaguchiko: el Fuji se tiñe de rosa con las primeras luces.',
          photo: { when: 'amanecer ≈6:25', tip: 'El Fuji reflejado en el lago desde la orilla norte, si no hay viento.', lens: '24–70 mm con trípode.' }
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
          id: 'gm-surugaya-tachikawa', t: '', kind: 'shop', opt: true, name: 'Surugaya Tachikawa',
          q: 'Surugaya Tachikawa', ll: [35.70055, 139.41224], how: 'Coche · ≈7 km',
          note: '★ De tu lista «Quiero ir». Cerca de Eco Town Hachiōji (6.8 km).'
        },
        {
          id: 'gm-book-off-aeon-hashimoto', t: '', kind: 'shop', opt: true, name: 'BOOK OFF AEON Hashimoto',
          q: 'BOOK OFF AEON Hashimoto', ll: [35.59603, 139.34485], how: 'Coche · ≈13 km',
          note: '★ De tu lista «Quiero ir». Cerca de Eco Town Hachiōji (7.4 km).'
        },
        {
          id: 'machida', t: '14:00', kind: 'shop', name: 'BOOKOFF SUPER BAZAAR Machida', ja: 'ブックオフ スーパーバザー 町田',
          q: 'BOOKOFF SUPER BAZAAR 町田', ll: [35.5450, 139.4455], approx: true, how: 'Ruta 16 hacia el sur · ≈40 min',
          note: 'Libros, juegos, figuras, ropa y electrónica en varias plantas.'
        },
        {
          id: 'gm-bookoff-super-bazaar-machida', t: '', kind: 'shop', name: 'BOOKOFF SUPER BAZAAR Machida Main',
          q: 'BOOKOFF SUPER BAZAAR Machida Main', ll: [35.54212, 139.44844], how: 'Coche · ≈1 km',
          note: '★ De tu lista «Quiero ir». Cerca de BOOKOFF SUPER BAZAAR Machida (417 m).'
        },
        {
          id: 'gm-bookoff-super-bazaar-machida-2', t: '', kind: 'shop', name: 'BOOKOFF SUPER BAZAAR Machida Annex',
          q: 'BOOKOFF SUPER BAZAAR Machida Annex', ll: [35.54123, 139.44964], how: 'Coche · ≈1 km',
          note: '★ De tu lista «Quiero ir». Cerca de BOOKOFF SUPER BAZAAR Machida (563 m).'
        },
        {
          id: 'gm-bookoff-plus-machida-asahima', t: '', kind: 'shop', opt: true, name: 'BOOKOFF PLUS Machida asahimachi Store',
          q: 'BOOKOFF PLUS Machida asahimachi Store', ll: [35.55374, 139.44202], how: 'Coche · ≈2 km',
          note: 'De tu lista «Compras». Cerca de BOOKOFF SUPER BAZAAR Machida (1.0 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-tama-na', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Tama Nagayama Store',
          q: 'BOOKOFF SUPER BAZAAR Tama Nagayama Store', ll: [35.6136, 139.44332], how: 'Coche · ≈7 km',
          note: 'De tu lista «Compras». Cerca de BOOKOFF SUPER BAZAAR Machida (7.6 km).'
        },
        {
          id: 'gm-hobby-off-fujisawa', t: '', kind: 'shop', opt: true, name: 'Hobby Off Fujisawa',
          q: 'Hobby Off Fujisawa', ll: [35.3395, 139.48368], how: 'Coche · ≈31 km',
          note: '★ De tu lista «Quiero ir». Cerca de BOOKOFF SUPER BAZAAR Machida (23.1 km).'
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
          id: 'd13-start', t: '8:45', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'Coche · ≈1 h', go: 'Lala Garden Kasukabe',
          note: 'Meter «ララガーデン春日部» en el GPS. Ruta: Shuto Expressway Ruta 6 (Misato) y después la nacional 4 o la Tokyo Gaikan. Salir antes de las 9:00 evita el atasco de salida.'
        },
        {
          id: 'buriburi', t: '10:00', kind: 'shop', name: 'Crayon Shin-chan Buriburi Cinema Studio', ja: 'ブリブリシネマスタジオ（ララガーデン春日部 3F）',
          q: 'Lala Garden Kasukabe', ll: [35.9770, 139.7520], approx: true, how: 'Coche · ≈1 h',
          note: 'Recreativo temático en la 3.ª planta de Lala Garden Kasukabe: pósters de las películas, photo spots con la familia Nohara y tienda. 10:00–20:00, entrada libre.',
          tips: ['Los datos publicados son antiguos: confirmar que sigue abierto antes de ir.', 'Por Kasukabe hay tapas de alcantarilla y carteles de Shin-chan.']
        },
        {
          id: 'gm-bookoff-super-bazaar-arakawa', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Arakawaoki Store',
          q: 'BOOKOFF SUPER BAZAAR Arakawaoki Store', ll: [36.03638, 140.1742], how: 'Coche · ≈39 km',
          note: 'De tu lista «Compras». Cerca de Crayon Shin-chan Buriburi Cinema Studio (39.0 km).'
        },
        {
          id: 'omiya', t: '11:45', kind: 'shop', name: 'Hard Off / Off House Ōmiya', ja: 'ハードオフ・オフハウス 大宮',
          q: 'ハードオフ 大宮', ll: [35.9064, 139.6240], approx: true, how: 'Coche · ≈40 min',
          note: 'Consolas, cámaras y la sección «junk» (vendido tal cual, sin garantía).'
        },
        {
          id: 'gm-hard-off-saitama-kamikomachi', t: '', kind: 'shop', opt: true, name: 'Hard Off Saitama Kamikomachi',
          q: 'Hard Off Saitama Kamikomachi', ll: [35.89591, 139.61187], how: 'Coche · ≈2 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (1.6 km).'
        },
        {
          id: 'gm-hard-off-off-house-saitama-o', t: '', kind: 'shop', opt: true, name: 'Hard-Off/Off-House Saitama Omiya Nishi',
          q: 'Hard-Off/Off-House Saitama Omiya Nishi', ll: [35.90425, 139.57482], how: 'Coche · ≈3 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (4.5 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-omiya-s', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Omiya Stellar Town Store',
          q: 'BOOKOFF SUPER BAZAAR Omiya Stellar Town Store', ll: [35.93368, 139.62179], how: 'Coche · ≈5 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (3.0 km).'
        },
        {
          id: 'gm-hard-off-off-house-omiya-miy', t: '', kind: 'shop', opt: true, name: 'Hard Off / Off House Omiya Miyahara',
          q: 'Hard Off / Off House Omiya Miyahara', ll: [35.93654, 139.62332], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (3.3 km).'
        },
        {
          id: 'gm-furuhonichiba-kawaguchi', t: '', kind: 'shop', opt: true, name: 'Furuhonichiba Kawaguchi',
          q: 'Furuhonichiba Kawaguchi', ll: [35.84415, 139.70413], how: 'Coche · ≈13 km',
          note: '★ De tu lista «Quiero ir». Cerca de Hard Off / Off House Ōmiya (10.0 km).'
        },
        {
          id: 'gm-hard-off-niiza-store', t: '', kind: 'shop', opt: true, name: 'Hard off Niiza store',
          q: 'Hard off Niiza store', ll: [35.79542, 139.57262], how: 'Coche · ≈13 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (13.2 km).'
        },
        {
          id: 'gm-hard-off-tsurugashima-interc', t: '', kind: 'shop', opt: true, name: 'Hard-off Tsurugashima Interchange Store',
          q: 'Hard-off Tsurugashima Interchange Store', ll: [35.94538, 139.39433], how: 'Coche · ≈23 km',
          note: 'De tu lista «Compras». Cerca de Hard Off / Off House Ōmiya (21.3 km).'
        },
        {
          id: 'gotokuji', t: '14:15', kind: 'sight', name: 'Templo Gōtokuji', ja: '豪徳寺',
          q: 'Gotokuji Temple', ll: [35.6486, 139.6475], how: 'Shuto · ≈1 h 15',
          note: 'Cientos de maneki-neko blancos con la pata levantada. Recinto 6:00–17:00, entrada libre.',
          tips: ['No tiene aparcamiento para visitantes: parking de monedas cerca.', 'Zona residencial y templo en uso: silencio y nada de drones.', 'Shimokitazawa, el barrio vintage, queda a 10 min: buen final de día.'],
          photo: { when: 'antes de las 15:00', tip: 'Cientos de maneki-neko blancos en las estanterías del templo.', lens: '50 mm o macro, diafragma abierto para desenfocar las filas de gatos.' }
        },
        {
          id: 'gm-wattmann-kawasaki-kajigaya', t: '', kind: 'shop', opt: true, name: 'Wattmann Kawasaki Kajigaya',
          q: 'Wattmann Kawasaki Kajigaya', ll: [35.59387, 139.59311], how: 'Coche · ≈8 km',
          note: 'De tu lista «Compras». Cerca de Templo Gōtokuji (7.8 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-tsunash', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Tsunashima Tarumachi Store',
          q: 'BOOKOFF SUPER BAZAAR Tsunashima Tarumachi Store', ll: [35.53198, 139.64171], how: 'Coche · ≈8 km',
          note: 'De tu lista «Compras». Cerca de Templo Gōtokuji (13.0 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-kawasak', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Kawasaki Minatocho',
          q: 'BOOKOFF SUPER BAZAAR Kawasaki Minatocho', ll: [35.53363, 139.71782], how: 'Coche · ≈7 km',
          note: '★ De tu lista «Quiero ir». Cerca de Templo Gōtokuji (14.3 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-seiyu-o', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR SEIYU Omori Store',
          q: 'BOOKOFF SUPER BAZAAR SEIYU Omori Store', ll: [35.58833, 139.73032], how: 'Coche · ≈6 km',
          note: 'De tu lista «Compras». Cerca de Templo Gōtokuji (10.1 km).'
        },
        {
          id: 'gm-bookoff-kichijoji-eki-kitagu', t: '', kind: 'shop', opt: true, name: 'BOOKOFF Kichijoji-eki-kitaguchi Store',
          q: 'BOOKOFF Kichijoji-eki-kitaguchi Store', ll: [35.70477, 139.58072], how: 'Coche · ≈19 km',
          note: 'De tu lista «Compras». Cerca de Templo Gōtokuji (8.7 km).'
        },
        {
          id: 'gm-hard-off-kichijoji', t: '', kind: 'shop', opt: true, name: 'HARD OFF KICHIJOJI',
          q: 'HARD OFF KICHIJOJI', ll: [35.70679, 139.58077], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Templo Gōtokuji (8.9 km).'
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
      sub: 'Ruta de compras en coche por Ikebukuro y el norte de Tokio, y tarde en Sumida y Asakusa.',
      temp: [14, 6],
      changes: [
        'Añadido Sensō-ji: estáis alojados en Taitō y no aparecía en el plan.',
        'Cafe Capyba y el Pokémon Center de Skytree Town están a 1 km uno del otro, a 10 min de Asakusa.'
      ],
      rain: 'Skytree Town y Sensō-ji funcionan igual con lluvia.',
      stops: [
        {
          id: 'd14-start', t: '9:30', kind: 'home', lodge: 'tokyo', name: 'Salida de casa',
          how: 'Coche · ≈25 min', go: 'Sunshine City Ikebukuro',
          note: 'Por la avenida Kasuga-dōri. Aparcar en el parking de Sunshine City y hacer las tiendas de Ikebukuro a pie; luego seguir en coche hacia Itabashi y Adachi.'
        },
        {
          id: 'gm-yodobashi-hd-ikebukuro-bldgs', t: '', kind: 'shop', opt: true, name: 'Yodobashi HD Ikebukuro bldgs.',
          q: 'Yodobashi HD Ikebukuro bldgs.', ll: [35.72903, 139.71173], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (25 m).'
        },
        {
          id: 'gm-mandarake-nayuta', t: '', kind: 'shop', opt: true, name: 'Mandarake Nayuta',
          q: 'Mandarake Nayuta', ll: [35.73161, 139.71238], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (292 m).'
        },
        {
          id: 'gm-lashinbang-ikebukuro-charact', t: '', kind: 'shop', opt: true, name: 'Lashinbang Ikebukuro Character Palace',
          q: 'Lashinbang Ikebukuro Character Palace', ll: [35.73097, 139.71555], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (390 m).'
        },
        {
          id: 'gm-bookoff-ikebukuro-sunshine-6', t: '', kind: 'shop', name: 'BOOKOFF Ikebukuro Sunshine 60',
          q: 'BOOKOFF Ikebukuro Sunshine 60', ll: [35.72968, 139.71577], how: 'Coche · ≈1 km',
          note: '★ De tu lista «Quiero ir». Cerca de Ikebukuro (351 m).'
        },
        {
          id: 'gm-mandarake-lalala-ikebukuro', t: '', kind: 'shop', opt: true, name: 'Mandarake LaLaLa Ikebukuro',
          q: 'Mandarake LaLaLa Ikebukuro', ll: [35.73079, 139.71811], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (590 m).'
        },
        {
          id: 'gm-centro-pok-mon-mega-tokio-y-', t: '', kind: 'shop', opt: true, name: 'Centro Pokémon Mega Tokio y Dulces Pikachu',
          q: 'Centro Pokémon Mega Tokio y Dulces Pikachu', ll: [35.72891, 139.71932], how: 'Coche · ≈1 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (666 m).'
        },
        {
          id: 'gm-treasure-factory-kami-itabas', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Kami-itabashi',
          q: 'Treasure Factory Kami-itabashi', ll: [35.76214, 139.67027], how: 'Coche · ≈6 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (5.3 km).'
        },
        {
          id: 'gm-hard-off-oizumigakuen', t: '', kind: 'shop', opt: true, name: 'HARD OFF Oizumigakuen',
          q: 'HARD OFF Oizumigakuen', ll: [35.7568, 139.59692], how: 'Coche · ≈7 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (10.9 km).'
        },
        {
          id: 'gm-treasure-factory-adachi-nish', t: '', kind: 'shop', opt: true, name: 'Treasure Factory Adachi-Nishiarai',
          q: 'Treasure Factory Adachi-Nishiarai', ll: [35.78119, 139.77042], how: 'Coche · ≈16 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (4.5 km).'
        },
        {
          id: 'gm-hobby-off-kitasenju', t: '', kind: 'shop', opt: true, name: 'Hobby Off Kitasenju',
          q: 'Hobby Off Kitasenju', ll: [35.74732, 139.80122], how: 'Coche · ≈5 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (217 m).'
        },
        {
          id: 'gm-bookoff', t: '', kind: 'shop', opt: true, name: 'BOOKOFF',
          q: 'BOOKOFF', ll: [35.78477, 139.89928], how: 'Coche · ≈10 km',
          note: 'De tu lista «Compras». Cerca de Ikebukuro (9.9 km).'
        },
        {
          id: 'gm-bookoff-super-bazaar-matsudo', t: '', kind: 'shop', opt: true, name: 'BOOKOFF SUPER BAZAAR Matsudo',
          q: 'BOOKOFF SUPER BAZAAR Matsudo', ll: [35.78362, 139.9009], how: 'Coche · ≈1 km',
          note: '★ De tu lista «Quiero ir». Cerca de Ikebukuro (10.0 km).'
        },
        {
          id: 'd14-home', t: '13:00', kind: 'home', lodge: 'tokyo', name: 'Descargar compras en el alojamiento'
        },
        {
          id: 'capyba', t: '15:30', kind: 'sight', name: 'Cafe Capyba', ja: 'cafe capyba（東向島）',
          q: 'cafe capyba 東向島', ll: [35.7193, 139.8146], approx: true, how: 'Metro/Tobu · ≈20 min',
          note: 'Café con capibaras. Sábados 10:00–17:30; consumición obligatoria; desde 6 años.',
          tips: ['Reserva obligatoria; se abre 2 semanas antes (≈14 nov). Puede cerrar sin aviso si los animales no están bien.']
        },
        {
          id: 'gm-daikeien', t: '', kind: 'shop', opt: true, name: 'Daikeien',
          q: 'Daikeien', ll: [35.76223, 139.96939], how: 'Coche · ≈15 km',
          note: 'De tu lista «Saved places». Cerca de Cafe Capyba (14.9 km).'
        },
        {
          id: 'skytree', t: '17:00', kind: 'shop', name: 'Tokyo Skytree Town', ja: '東京スカイツリータウン（ソラマチ）',
          q: 'Tokyo Solamachi', ll: [35.7101, 139.8107], how: 'A pie · ≈15 min',
          note: 'Pokémon Center Skytree Town en la 4.ª planta de Solamachi. Subir a la torre es opcional.',
          photo: { when: 'hora azul', tip: 'Skytree reflejada en el canal Kitajukken, a 5 min a pie de la torre.', lens: '24–35 mm, 1–2 s apoyado.' }
        },
        {
          id: 'sensoji', t: '19:00', kind: 'sight', name: 'Sensō-ji de noche', ja: '浅草寺',
          q: 'Sensoji Temple', ll: [35.7148, 139.7967], how: 'A pie cruzando el río · ≈20 min',
          note: 'Templo y pagoda iluminados, casi sin gente. Cena en Hoppy-dōri (guisos y cerveza en la calle).',
          photo: { when: 'de noche', tip: 'La pagoda y la puerta Hōzōmon iluminadas, casi sin gente; el farolillo gigante de Kaminarimon desde abajo.', lens: '16–35 mm.' }
        }
      ]
    },

    {
      n: 15, date: '2026-11-29', phase: 'car', base: 'tokyo', mode: 'car',
      title: 'Ueno, Akihabara y vuelo desde Narita',
      sub: 'Mañana corta cerca de casa, coche a Narita y vuelo MU522 a las 16:55.',
      temp: [14, 6],
      changes: [
        'Vuelo MU522 Narita → Shanghái a las 16:55 (conexión MU249 → Barcelona el 1 dic a la 1:20). Hay que estar en el aeropuerto hacia las 14:00.',
        'Salida del Airbnb antes de las 10:00: maletas al coche y paseo final con el coche aparcado en Ueno.',
        'Con el nuevo tax-free (desde el 1 nov 2026) hay que enseñar las compras en aduana antes de facturar: llegar con margen.'
      ],
      rain: 'Museo Nacional de Tokio en Ueno o tiendas de Akihabara.',
      stops: [
        {
          id: 'd15-checkout', t: '9:30', kind: 'home', lodge: 'tokyo', name: 'Check-out (antes de las 10:00)',
          note: 'Cargar maletas en el coche. Aparcamiento por horas (コインパーキング) cerca de Ueno.'
        },
        {
          id: 'uenopark', t: '10:00', kind: 'sight', name: 'Parque de Ueno', ja: '上野恩賜公園',
          q: 'Ueno Park', ll: [35.7148, 139.7731], how: 'Coche · 5 min',
          note: 'A finales de noviembre los ginkgos se ponen amarillos.',
          photo: { when: 'mañana', tip: 'Ginkgos amarillos a finales de noviembre en el paseo central del parque.', lens: '24–70 mm.' }
        },
        {
          id: 'ameyoko', t: '10:45', kind: 'shop', name: 'Ameyoko', ja: 'アメ横',
          q: 'Ameyoko', ll: [35.7103, 139.7745], how: 'A pie · 5 min',
          note: 'Mercado callejero bajo las vías: snacks, especias, cosmética y zapatillas.'
        },
        {
          id: 'akiba2', t: '11:30', kind: 'shop', opt: true, name: 'Akihabara (último repaso)', ja: '秋葉原',
          q: 'Akihabara Station', ll: [35.6995, 139.7712], how: 'Coche o a pie · 10 min',
          note: 'Domingo: Chūō-dōri es peatonal desde ≈13:00. Salir hacia Narita como tarde a las 12:30.'
        },
        {
          id: 'narita-car', t: '13:30', kind: 'move', name: 'Devolver el coche en Narita', ja: '成田空港 レンタカー返却',
          q: 'Narita Airport rent a car return', ll: [35.7720, 140.3929], approx: true, how: 'Higashi-Kantō Expressway · ≈1 h',
          note: 'Llenar el depósito cerca del aeropuerto (ガソリンスタンド). La oficina lleva en furgoneta a la terminal.'
        },
        {
          id: 'airport', t: '16:55', kind: 'move', far: true, name: 'Vuelo MU522 Narita → Shanghái', ja: '成田国際空港',
          q: 'Narita International Airport Terminal 2', ll: [35.7720, 140.3929],
          note: 'China Eastern: terminal 2 (confirmar en la app). Conexión MU249 Shanghái → Barcelona, 1 dic 1:20 → 7:40.'
        }
      ]
    }
  ],

  // Errores del PDF original y cambios principales (d = día afectado).
  summary: [
    { d: 4, t: 'El Crayon Shin-chan Buriburi Cinema Studio está en Kasukabe (Saitama), no en Osaka. Movido al día 13, que ya va a Saitama.' },
    { d: 9, t: 'La Tokyu Kabukichō Tower está en Shinjuku, no en Shibuya. Día reordenado: Shibuya → Shinjuku → Nakano → Shinjuku de noche.' },
    { d: 8, t: 'teamLab Planets está en Toyosu y el Pokémon Center Tokyo DX en Nihonbashi; ninguno en Odaiba.' },
    { d: 8, t: 'La Doraemon Future Department Store de Odaiba está cerrada por reforma hasta diciembre. Su tienda temporal en Tokyo Dome City abre hasta el 23 nov: se visita el 22.' },
    { d: 8, t: 'La estatua del Gundam Unicorn de Odaiba se retiró en agosto de 2026.' },
    { d: 2, t: 'El Pokémon Center Osaka DX está en Daimaru Shinsaibashi (9F), a 20 min a pie de Den Den Town.' },
    { d: 3, t: 'Animate Umeda y las tiendas de cámaras de Umeda, juntas con el Umeda Sky Building.' },
    { d: 3, t: '«OS Camera Service» está cerca de la estación de Umeda: va al día 3 con las demás tiendas de cámaras.' },
    { d: 7, t: 'El 21 nov hay mercadillo de antigüedades en Tō-ji (Kioto), a 15 min de la estación: añadido como opcional antes del Shinkansen.' },
    { d: 9, t: 'Lunes 23 (festivo): Ōedo Antique Market opcional por la mañana y Kōenji (vintage) a una parada de Nakano.' },
    { d: 7, t: 'El PDF tenía dos «Día 7». Ahora es un único día Kioto → Tokio, con Arashiyama y Kinkaku-ji.' },
    { d: 4, t: 'Envío de maletas Osaka → Tokio para hacer Kioto solo con mochila.' },
    { d: 11, t: 'Fuji por la mañana, que es cuando suele estar despejado, y noche propuesta en Kawaguchiko.' },
    { d: 13, t: 'Cafe Capyba está en Sumida, a 10 min de Asakusa: pasa al día 14, sin coche.' },
    { d: 14, t: 'Añadido Sensō-ji: estáis alojados en Taitō y no aparecía.' },
    { d: 15, t: 'Nuevo sistema tax-free desde el 1 nov 2026: compras a mano y margen extra en el aeropuerto.' },
    { d: 1, t: 'Datos reales de Trip.com: llegada a Kansai a las 12:10 (MU225) y alojamiento exacto en Dōtonbori 1-chōme, a 10 min de Namba.' },
    { d: 8, t: 'Domingo 22: el rastro de Ōi es lo primero del día, seguido de teamLab y Odaiba. Shibuya–Shinjuku–Nakano pasa al lunes 23.' },
    { d: 11, t: 'Tokio a pie y en tren del 21 al 24 (Disney en tren). Coche del 25 al 29 para el Fuji y las rutas de tiendas de las afueras.' },
    { d: 15, t: 'Vuelo MU522 desde Narita a las 16:55: devolución del coche en el aeropuerto y salida de Ueno hacia las 12:30.' },
    { d: 2, t: '117 tiendas y sitios de tus listas de Google Maps añadidos como paradas en el día de su zona, ordenados por cercanía. Los de «Quiero ir» van fijos; el resto, como opcionales.' }
  ],

  // Reservas y trámites. due = fecha límite recomendada (o fecha de apertura si opens:true).
  bookings: [
    { id: 'cancel-tokyo', due: '2026-10-22', crit: true, title: 'Airbnb Tokio: fin de la cancelación gratis', who: 'Airbnb · HMSNFHTNEK',
      body: 'Hasta el 22 oct a las 15:00 se puede cancelar gratis el alojamiento de Taitō (21–29 nov). Después, solo reembolso parcial hasta el 14 nov. Si estáis contentos con él, no hay que hacer nada.' },
    { id: 'tombori-bk', due: '2026-11-15', title: 'Barco de Dōtonbori · 15 nov 20:00', who: 'Taquilla del muelle Tazaemonbashi o Klook',
      body: 'Entradas con hora (2.000 ¥ por persona). Se venden el mismo día en el muelle; por la noche se agotan. Comprarlas por la tarde o antes online.' },
    { id: 'kimono-bk', due: '2026-11-05', title: 'Kimono en Kioto · 19 nov', who: 'Web de Okamoto, Yumeyakata o Maiko-ya',
      body: 'Reservar plan para 2 a las 12:30 en la tienda de Kiyomizu. Reservando con antelación suele haber 10–20 % de descuento; añadir peinado si se quiere (≈1.500 ¥).' },
    { id: 'flights', due: '2026-11-14', done: true, title: 'Vuelos China Eastern · 2 pasajeros', who: 'Trip.com · reserva 1598740088554566',
      body: 'Ida: MU250 BCN 14 nov 10:20 → Shanghái 15 nov 5:30 · MU225 Shanghái 8:55 → Osaka KIX 12:10. Vuelta: MU522 Tokio NRT 29 nov 16:55 → Shanghái 19:45 · MU249 Shanghái 1 dic 1:20 → BCN 7:40. Seguro incluido.' },
    { id: 'airbnb-osaka', due: '2026-11-15', done: true, title: 'Airbnb Osaka · 15–19 nov', who: 'Airbnb · HMM8X4YS4N',
      body: '道頓堀1丁目東4-13. Llegada 16:00, salida 11:00. Cancelación gratis hasta el 10 nov.' },
    { id: 'airbnb-kyoto', due: '2026-11-19', done: true, title: 'Airbnb Kioto · 19–21 nov', who: 'Airbnb · HMWACK2EFF',
      body: '769 Makurachō, Kamigyō. Llegada 16:00, salida 10:00. Escribir al anfitrión para la llegada.' },
    { id: 'airbnb-tokyo', due: '2026-11-21', done: true, title: 'Airbnb Tokio · 21–29 nov', who: 'Airbnb · HMSNFHTNEK',
      body: '2-31-10 Taitō. Llegada 15:00, salida 10:00. Cerradura inteligente.' },
    { id: 'idp', due: '2026-10-23', crit: true, title: 'Permiso Internacional de Conducción', who: 'DGT · cita previa',
      body: 'Imprescindible para alquilar el coche (25–29 nov). España está en la Convención de Ginebra de 1949, así que es válido en Japón durante un año. Llevar también el carné español.' },
    { id: 'disney', due: '2026-10-20', crit: true, title: 'Entradas Tokyo DisneySea · 24 nov', who: 'Web o app oficial de Tokyo Disney Resort',
      body: 'Entrada con fecha y precio variable (≈7.900–10.900 ¥). Instalar la app para Premier Access.' },
    { id: 'teamlab', due: '2026-10-25', crit: true, title: 'teamLab Planets · 22 nov', who: 'Web oficial de teamLab',
      body: 'Domingo: las franjas se agotan. Elegir sobre las 13:30, después del rastro de Ōi.' },
    { id: 'car', due: '2026-10-31', crit: true, title: 'Coche de alquiler 25–29 nov', who: 'Toyota / Times / Nippon Rent-a-Car',
      body: 'Recogida en Ueno el 25 a primera hora (o la tarde del 24) y devolución en el aeropuerto de Narita el 29 antes de las 14:00. Pedir tarjeta ETC. Preguntar al Airbnb de Taitō por aparcamiento.' },
    { id: 'shinkansen', due: '2026-10-21', opens: true, crit: true, title: 'Shinkansen Kioto → Tokio · 21 nov', who: 'App smartEX',
      body: 'La venta abre un mes antes, a las 10:00 de Japón (3:00 en España peninsular). Asiento E para ver el Fuji. Si llevas maleta grande, asiento con espacio para equipaje.' },
    { id: 'ryokan', due: '2026-10-25', title: 'Ryokan en Kawaguchiko · noche del 25 nov', who: 'Booking / Jalan / Rakuten Travel',
      body: 'Recomendado: con onsen y vistas al Fuji. Ver amanecer y ahorrar 2 h de coche nocturno.' },
    { id: 'pokecafe', due: '2026-10-16', opens: true, title: 'Pokémon Café Osaka · 16 nov (opcional)', who: 'Web oficial del Pokémon Café',
      body: 'Abre 31 días antes a las 18:00 de Japón (11:00 en España peninsular). Se llena en minutos.' },
    { id: 'ghibli', due: '2026-10-20', title: 'Museo Ghibli (opcional)', who: 'Lawson Ticket (web internacional)',
      body: 'Las entradas de noviembre salieron el 10 oct. Si interesa, mirar si quedan huecos sueltos.' },
    { id: 'nintendo-museum', due: '2026-11-05', title: 'Nintendo Museum, Uji (opcional)', who: 'Web oficial · cuenta Nintendo',
      body: 'El sorteo ya pasó; a veces ponen a la venta anulaciones por orden de llegada. Encaja en el día 6.' },
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
    { id: 'flea', due: '2026-11-22', title: 'Comprobar el rastro de Ōi · 22 nov', who: 'Web o redes de Tokyo City Flea Market',
      body: 'Confirmar que se celebra el domingo 22 y el horario (suele abrir sobre las 9:00). Se cancela si llueve o si hay carreras.' },
    { id: 'oedo', due: '2026-11-22', title: 'Comprobar Ōedo Antique Market · 23 nov', who: 'Web oficial (antique-market.jp)',
      body: 'Opcional el lunes 23 por la mañana en el Tokyo International Forum. Se cancela con lluvia.' }
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
