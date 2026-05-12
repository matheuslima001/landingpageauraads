// A página hoje não renderiza .navbar — o handler fica registrado e ativa
// glassmorphism automaticamente quando o markup for adicionado.
export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 24;
  let ticking = false;

  const update = () => {
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    requestAnimationFrame(update);
    ticking = true;
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
}
