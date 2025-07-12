// Aurora animada para el fondo de la cabecera (hero)
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'aurora-bg';
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = 0;
  canvas.style.pointerEvents = 'none';
  hero.prepend(canvas);
  hero.style.overflow = 'hidden';

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0, dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = hero.getBoundingClientRect();
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

  // Aurora params
  const bands = [
    { color: 'rgba(0,207,255,0.13)', amp: 60, speed: 0.12, freq: 1.2, phase: 0 },
    { color: 'rgba(0,140,255,0.11)', amp: 44, speed: 0.14, freq: 1.8, phase: 1.7 },
    { color: 'rgba(255,255,255,0.09)', amp: 32, speed: 0.16, freq: 2.2, phase: 3.1 }
  ];

  function drawAurora(time) {
    ctx.clearRect(0, 0, width, height);
    for (let b = 0; b < bands.length; b++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height*0.33);
      for (let x = 0; x <= width; x += 2) {
        const t = time*0.00018 + bands[b].phase;
        const y = height*0.33 + Math.sin(x*0.005*bands[b].freq + t*bands[b].speed) * bands[b].amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = bands[b].color;
      ctx.filter = 'blur(18px)';
      ctx.fill();
      ctx.restore();
    }
    ctx.filter = 'none';
  }

  function animate(time) {
    drawAurora(time || performance.now());
    requestAnimationFrame(animate);
  }
  animate();
})();
