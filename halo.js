// Halo de partículas animadas alrededor del bloque .stats con destellos IA
(function() {
  const stats = document.querySelector('.stats');
  if (!stats) return;

  // Crear canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'halo-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = 0;
  stats.style.position = 'relative';
  stats.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = stats.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  // Parámetros del halo
  const PARTICLES = 22;
  const RADIUS = Math.min(220, Math.min(width, height)/2 - 24);
  const COLORS = ['#ff0077', '#00cfff', '#fff'];
  const SPEED = 0.22;

  // Destellos (flares)
  const FLARES = [];
  const MAX_FLARES = 3;
  function spawnFlare(time) {
    if (FLARES.length < MAX_FLARES && Math.random() < 0.028) {
      const angle = Math.random() * Math.PI * 2;
      const r = RADIUS + 12 + Math.random()*12;
      const color = COLORS[Math.floor(Math.random()*COLORS.length)];
      FLARES.push({
        angle,
        r,
        color,
        born: time,
        life: 500 + Math.random()*800
      });
    }
  }

  function drawHalo(time) {
    ctx.clearRect(0, 0, width, height);
    const cx = width/2, cy = height/2;
    // Partículas halo
    for (let i = 0; i < PARTICLES; i++) {
      const angle = (i / PARTICLES) * Math.PI * 2 + (time * SPEED * 0.001);
      const r = RADIUS + 14 * Math.sin(time*0.001 + i);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.save();
      ctx.globalAlpha = 0.66 + 0.22 * Math.sin(time*0.001 + i);
      ctx.beginPath();
      ctx.arc(x, y, 7 + 2*Math.sin(time*0.001 + i), 0, Math.PI*2);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.shadowColor = COLORS[i % COLORS.length];
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.restore();
    }
    // Flares
    for (let i = FLARES.length-1; i >= 0; i--) {
      const flare = FLARES[i];
      const age = time - flare.born;
      if (age > flare.life) {
        FLARES.splice(i, 1);
        continue;
      }
      const alpha = 0.7 * (1 - age/flare.life);
      const size = 18 + 22 * Math.sin(Math.PI * age/flare.life);
      const x = cx + Math.cos(flare.angle) * flare.r;
      const y = cy + Math.sin(flare.angle) * flare.r;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI*2);
      ctx.fillStyle = flare.color;
      ctx.shadowColor = flare.color;
      ctx.shadowBlur = 36;
      ctx.fill();
      ctx.restore();
    }
  }

  function animate(time) {
    spawnFlare(time || performance.now());
    drawHalo(time || performance.now());
    requestAnimationFrame(animate);
  }
  animate();
})();
