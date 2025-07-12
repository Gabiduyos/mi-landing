// Fondo de partículas tipo constelación, movimiento suave, líneas finas y opacidad baja
tsParticles.load("tsparticles", {
  background: { color: { value: "#000" } },
  fpsLimit: 60,
  particles: {
    color: { value: "#fff" },
    opacity: { value: 0.23 },
    size: { value: 1.3, random: { enable: true, minimumValue: 0.7 } },
    move: { enable: true, speed: 0.12, direction: "none", outModes: "out" },
    number: { value: 70, density: { enable: true, area: 900 } },
    links: {
      enable: true,
      distance: 120,
      color: "#fff",
      opacity: 0.19,
      width: 1
    },
    shape: { type: "circle" }
  },
  detectRetina: true
});

// Animación de aparición suave para TODAS las secciones principales
function fadeInOnView(selector, delayStep = 80) {
  const els = document.querySelectorAll(selector);
  els.forEach((el, i) => {
    el.classList.add('fade-init');
    el.style.transitionDelay = (i * delayStep) + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  els.forEach(el => io.observe(el));
}

// Animación especial para la imagen del robot o logo-hero
function fadeInRobotImg() {
  const robotImg = document.querySelector('.servicios-flex .logo-hero');
  if (!robotImg) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        robotImg.classList.add('logo-hero-appear');
        io.unobserve(robotImg);
      }
    });
  }, { threshold: 0.18 });
  io.observe(robotImg);
}


document.addEventListener('DOMContentLoaded', () => {
  // Typewriter para el h1 principal
  const h1 = document.querySelector('.hero-content h1');
  if (h1) {
    const fullText = 'Automatiza tu negocio con inteligencia artificial';
    h1.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '|';
    h1.appendChild(cursor);
    let i = 0;
    // Sonido typewriter
    let audioEnabled = false;
    let audio = null;
    function playTypeSound() {
      if (!audioEnabled) return;
      if (!audio) audio = new Audio('typewriter.mp3');
      audio.currentTime = 0;
      audio.play();
    }
    window.addEventListener('pointerdown', () => { audioEnabled = true; }, { once: true });
    function type() {
      if (i < fullText.length) {
        h1.insertBefore(document.createTextNode(fullText[i]), cursor);
        playTypeSound();
        i++;
        setTimeout(type, 32 + Math.random()*45);
      } else {
        cursor.remove(); // Elimina el cursor para que el texto quede limpio
      }
    }
    type();
  }

  fadeInOnView('.hero-content, .hero-bg', 0); // hero instantáneo
  fadeInOnView('.stat', 120);
  fadeInOnView('.servicio', 120);
  fadeInOnView('.contacto', 0);
  fadeInOnView('footer', 0);
  fadeInRobotImg();
});

// Barra de progreso scroll navbar
window.addEventListener('scroll', function() {
  const progress = document.querySelector('.navbar-progress');
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / docHeight) * 100;
  progress.style.width = percent + '%';
});

// FAQ eliminado


// --- Animaciones de entrada (Scroll Reveal) ---
const revealElements = document.querySelectorAll('.clientes-testimonios, .casos-exito, .badges-confianza, .caso, .testimonios blockquote');
function revealOnScroll() {
  const trigger = window.innerHeight * 0.92;
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('resize', revealOnScroll);
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.closest('.faq-item');
    // Cierra otros abiertos
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) openItem.classList.remove('open');
    });
    // Alterna el actual
    item.classList.toggle('open');
  });
});

// --- Chatbot Widget Animación (burbuja salta al hacer click) ---
const chatbotBubble = document.querySelector('.chatbot-bubble');
if (chatbotBubble) {
  chatbotBubble.addEventListener('click', () => {
    chatbotBubble.style.animation = 'float-bubble 0.5s cubic-bezier(.4,0,.2,1), bubble-pop 0.44s cubic-bezier(.4,0,.2,1)';
    setTimeout(() => {
      chatbotBubble.style.animation = '';
    }, 440);
  });
}

// Scroll suave y elegante al hacer clic en navegación (más lento)
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = document.querySelector('.navbar').offsetHeight;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset + 1;
      smoothScrollTo(offsetPosition, 900);
    }
  });
});

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY;
  const change = targetY - startY;
  const startTime = performance.now();
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startY + change * ease);
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }
  requestAnimationFrame(animateScroll);
}

// Glow en header y body al hacer scroll
function handleScrollGlow() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 8) {
    navbar.classList.add('scrolled');
    document.body.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
    document.body.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScrollGlow);
document.addEventListener('DOMContentLoaded', handleScrollGlow);

// validación formulario
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  msg.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
  form.reset();
});
