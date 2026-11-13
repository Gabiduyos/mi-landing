# Filmmaker Academy Pro

Academia audiovisual interactiva, en español y **100 % offline**, pensada para estudiar durante un vuelo de 13 horas: Sony A7 IV, exposición, S-Log3/S-Cinetone, luz, fotografía, cinematografía, iluminación, ópticas, preproducción, edición, color, VFX/sonido y entrega.

## Qué incluye

- **13 módulos** de ≈ 60 min (62 lecciones) + **2 módulos extra** (equipo DJI y filtros; rodar en Japón). Cada módulo: lecciones, casos reales, errores habituales, ejercicio, checklist, resumen descargable y examen.
- **8 simuladores funcionales** con 23 retos verificados sobre el estado real del simulador:
  A Exposición · B S-Log3 · C Cámara virtual A7 IV · D Iluminación · E Ópticas · F Montaje · G Color (con scopes) · H Rodajes bajo presión.
  Cada uno declara qué es cálculo real y qué es modelo didáctico.
- **19 escenarios de luz** con 11 apartados cada uno.
- **Examen final** con tres encargos (videoclip nocturno, HYROX, anuncio de gimnasio): ajustes de cámara evaluados por cálculo de exposición, decisiones puntuadas con explicación y justificación autoevaluada con rúbrica.
- **137 preguntas** con explicación, repetición espaciada (10 min → 10 días), detección de puntos débiles, niveles y XP.
- **Biblioteca avanzada** (21 temas), chuletas, 24 misiones reales, mapa de menús de la A7 IV, registro de memorias M1–M3 (foto y vídeo) y bibliografía descargable.
- **Modo avión**: verificación real de recursos en caché, prueba práctica con la red bloqueada y checklist de vuelo.

## Arquitectura

HTML + CSS + módulos ES nativos, **sin dependencias ni compilación**. Motivo: es una PWA de contenido y simuladores en `<canvas>`/SVG; sin framework pesa 0,6 MB en 44 archivos, arranca al instante en un iPhone y se despliega como archivos estáticos (igual que `../japon/`).

```
academia/
  index.html · manifest.webmanifest · sw.js · precache-manifest.js (generado)
  css/app.css
  js/app.js        carcasa, enrutador por hash, pantallas de aprendizaje
  js/views.js      A7 IV, escenarios, exámenes, biblioteca, progreso, modo avión
  js/core.js       banco de preguntas, progreso, motor de test
  js/store.js      estado en localStorage, repetición espaciada, niveles
  js/ui.js         mini-marcado de lecciones, utilidades
  js/figs.js       ilustraciones SVG locales
  js/sims/         un archivo por simulador + expo.js (matemática de exposición)
  js/content/      m01…m15, escenarios, biblioteca, menús, extras
  tools/build-manifest.mjs
```

### Tras cualquier cambio

```
node tools/build-manifest.mjs   # regenera la lista de precarga y la versión
```

Sin este paso, el service worker no detecta la actualización ni guarda archivos nuevos.

### Probar en local

```
python3 -m http.server 8765      # desde la raíz del repositorio
# http://localhost:8765/academia/
```

## Instalar en iPhone

1. Abre `https://<tu-dominio>/academia/` en **Safari** (en Vercel: `https://mi-landing-five.vercel.app/academia/` cuando esté en `main`).
2. Compartir → **Añadir a pantalla de inicio**.
3. Abre la app desde el icono, con conexión, y entra en **Modo avión**.
4. Pulsa **VERIFICAR MODO AVIÓN** (deben faltar 0 recursos) y **Ejecutar prueba sin conexión**.
5. Activa el modo avión del teléfono, cierra la app del todo y ábrela de nuevo.

### Limitaciones de iOS que conviene conocer

- La app instalada tiene almacenamiento **separado** de Safari: estudia siempre desde el icono.
- iOS puede purgar datos de sitios poco usados o si falta espacio. Repite la verificación el día anterior y antes de embarcar, y exporta tu progreso (Mi progreso → Exportar).
- `navigator.storage.persist()` se solicita, pero iOS puede ignorarlo.
- Las descargas (resúmenes, bibliografía) pasan por la hoja de compartir de iOS; «Copiar» funciona siempre.
- No hay vídeo ni audio que descargar: todo el material es texto, SVG y canvas.

## Qué se ha verificado y qué no

Verificado con Chromium (emulación de iPhone 13 y escritorio):

- 247 rutas sin errores de consola ni pantallas vacías.
- Los 23 retos de simulador son alcanzables; evaluadores de montaje y examen final.
- Exámenes, repaso espaciado, conversaciones, memorias y persistencia tras recargar.
- Service worker: 44/44 recursos en caché; con la red cortada, recarga, navegación y apertura en pestaña nueva.

**No verificado:** un iPhone físico con Safari/WebKit. El comportamiento offline usa APIs estándar que WebKit soporta, pero la comprobación real es el paso 5 de la instalación.

## Fuentes y rigor

Cada afirmación relevante está etiquetada como especificación oficial, principio técnico, consejo práctico, opinión de usuarios, técnica debatida o preferencia estética. Varias fuentes (Guía de ayuda de Sony, CineD, Sony Cine) no pudieron abrirse desde el entorno de construcción y se citan a partir de resultados de búsqueda: contrasta las cifras críticas con el original. Bibliografía completa en la app (Biblioteca → Fuentes).

## Pendiente / ideas

- Prueba en iPhone real.
- Fotografías reales de ejemplo (hoy todas las imágenes son esquemas y escenas sintéticas, y se indican como tales).
- Más bancos de preguntas por módulo y más incidencias del simulador H.
