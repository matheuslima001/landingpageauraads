// =========================================================================
// animations.js — scroll-reveal opt-in. Itens com .fade-in iniciam visíveis;
// JS marca os que estão FORA da dobra inicial com [data-prereveal] (que
// força opacity:0 via CSS) e reativa via IntersectionObserver no scroll.
// Se IO não disparar (preview iframe, etc.), fallback de 3s revela tudo.
// =========================================================================

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyStagger(el) {
  const siblings = Array.from(el.parentElement?.children || [])
    .filter((c) => c.classList.contains('fade-in'));
  const idx = Math.min(siblings.indexOf(el), 6);
  el.style.transitionDelay = `${idx * 70}ms`;
}

function setupFadeIn() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length || reducedMotion) return;

  const vh = window.innerHeight;
  const belowFold = [];

  // Pré-esconde só os de baixo. Os de cima ficam visíveis instantaneamente
  // (pra entregar o LCP rápido).
  items.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top >= vh) {
      el.setAttribute('data-prereveal', '');
      belowFold.push(el);
    }
  });

  if (!belowFold.length) return;

  const reveal = (el) => {
    applyStagger(el);
    el.classList.add('revealed');
    // Limpa o attr depois da transição pra deixar o DOM limpo
    setTimeout(() => el.removeAttribute('data-prereveal'), 1000);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  belowFold.forEach((el) => io.observe(el));

  // Fallback de segurança: revela tudo após 3s caso IO não dispare
  // (preview iframes às vezes não reportam visibilidade).
  setTimeout(() => {
    belowFold.forEach((el) => {
      if (!el.classList.contains('revealed')) reveal(el);
    });
  }, 3000);
}

function formatThousands(n) {
  return Number(n).toLocaleString('pt-BR');
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  if (Number.isNaN(target)) return;

  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const format = el.dataset.format;
  const duration = 1400;
  const start = performance.now();
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const value = target * ease(t);
    const rounded = Math.round(value);
    const formatted = format === 'thousands' ? formatThousands(rounded) : rounded;
    el.textContent = `${prefix}${formatted}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

function setupCounters() {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length || reducedMotion) return;

  // Inicializa em zero
  counters.forEach((el) => {
    el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
  });

  const vh = window.innerHeight;
  const animated = new WeakSet();

  // Acima da dobra: anima já
  counters.forEach((el) => {
    if (el.getBoundingClientRect().top < vh) {
      animated.add(el);
      animateCounter(el);
    }
  });

  // Resto: via IO, com fallback
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || animated.has(entry.target)) return;
      animated.add(entry.target);
      animateCounter(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => { if (!animated.has(el)) io.observe(el); });

  setTimeout(() => {
    counters.forEach((el) => {
      if (!animated.has(el)) {
        animated.add(el);
        animateCounter(el);
        io.unobserve(el);
      }
    });
  }, 3000);
}

export function init() {
  setupFadeIn();
  setupCounters();
}
