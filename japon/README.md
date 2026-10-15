# Ruta Japón 2026

App web (móvil primero) con el itinerario revisado del viaje a Japón del 15 al 29 de noviembre de 2026: mapa de cada día, rutas a Google Maps, reservas pendientes e información práctica. Funciona sin conexión una vez abierta.

## Qué hace

- **Días**: un billete por día con mapa, paradas numeradas y horario. Cada parada tiene:
  - **Cómo llegar**: abre Google Maps desde tu posición, en transporte público, a pie o en coche según el tramo.
  - **Desde la anterior**: la ruta entre dos paradas seguidas.
  - **Japonés**: muestra el nombre en grande para enseñarlo al taxista.
  - **Hecho**: pone un sello 済 y se recuerda en el móvil.
- Salida y puesta de sol calculadas para cada día, temperatura orientativa y plan B si llueve.
- **Volver a casa**: ruta al alojamiento de esa noche.
- **Mapa**: todo el viaje, filtrable por etapa, con tu ubicación.
- **Reservas**: lista ordenada por urgencia según la fecha de hoy (entradas, Shinkansen, coche, permiso de conducir…).
- **Info**: qué se ha corregido del PDF, direcciones exactas de los alojamientos (se pueden pegar coordenadas), tax-free, conducir en Japón, frases útiles y teléfonos de emergencia.

## Cómo abrirla

Es una página estática: no necesita compilación.

- **GitHub Pages**: en el repositorio, *Settings → Pages → Deploy from a branch*, rama `main` y carpeta `/ (root)`. Tras fusionar esta rama, la app queda en `https://<usuario>.github.io/mi-landing/japon/`.
- **En local**: `python3 -m http.server` dentro de `japon/` y abrir `http://localhost:8000`.
- En el móvil, «Añadir a pantalla de inicio» la instala como app.

## Editar el itinerario

Todo el contenido está en `data.js` (días, paradas, reservas, frases). Cada parada lleva:

| Campo | Para qué sirve |
| --- | --- |
| `t` | Hora prevista |
| `q` | Texto que se busca en Google Maps (más fiable que las coordenadas) |
| `ll` | Coordenadas del pin `[lat, lng]`; `approx: true` si es aproximado |
| `how` | Cómo llegar desde la parada anterior |
| `opt` | Parada opcional |

## Créditos

- Mapas © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright), con [Leaflet](https://leafletjs.com) 1.9.4 (incluido en `vendor/`, licencia BSD-2).
- Costa de respaldo sin conexión: [Natural Earth](https://www.naturalearthdata.com) (dominio público).
