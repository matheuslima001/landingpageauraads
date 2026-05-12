const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  if (prefersReducedMotion()) {
    elements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Stagger entre irmãos do mesmo parent dá ritmo natural à entrada
        const siblings = Array.from(el.parentNode.children).filter((c) =>
          c.classList.contains('fade-in')
        );
        const index = siblings.indexOf(el);
        const delay = Math.min(index * 100, 500);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('revealed');
        obs.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

export function initTestimonialsMarquee() {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  if (prefersReducedMotion()) return;

  // Clonamos os filhos para criar o loop seamless do marquee (translate -50%)
  Array.from(track.children).forEach((child) => {
    const clone = child.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}

export function initCounters() {
  const counters = document.querySelectorAll('.proof-number[data-target]');
  if (!counters.length) return;
  if (prefersReducedMotion()) return;

  const proofBar = document.querySelector('.proof-bar');
  if (!proofBar) return;

  const format = (value, fmt) =>
    fmt === 'thousands' ? value.toLocaleString('pt-BR') : String(value);

  const render = (el, value) => {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    el.textContent = prefix + format(value, el.dataset.format) + suffix;
  };

  // Zera antes de entrar na viewport pra não piscar valor final
  counters.forEach((el) => render(el, 0));

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const duration = 1800;

  const animate = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOutQuart(t));
      render(el, value);
      if (t < 1) requestAnimationFrame(tick);
      else render(el, target);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach(animate);
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(proofBar);
}
