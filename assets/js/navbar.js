// =========================================================================
// navbar.js — glassmorphism ao rolar (.scrolled). Defensivo: no-op se a
// navbar não existir.
// =========================================================================

export function init() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Scroll → .scrolled (glassmorphism)
  let ticking = false;
  const update = () => {
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else                    navbar.classList.remove('scrolled');
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();

  // Hamburger / mobile menu
  const burger = navbar.querySelector('.navbar-hamburger');
  const menu   = navbar.querySelector('.navbar-mobile-menu');
  if (!burger || !menu) return;

  const close = () => {
    navbar.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('hidden', '');
  };
  const open = () => {
    navbar.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    menu.removeAttribute('hidden');
  };

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    if (isOpen) close(); else open();
  });

  // Fecha ao clicar num link do menu (navegação por âncora)
  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', close);
  });

  // Fecha com ESC ou quando o viewport cresce acima do breakpoint mobile
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (e) => { if (e.matches) close(); });
}
