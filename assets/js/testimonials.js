export function init() {
  const row     = document.querySelector('.testimonials-row');
  const btnPrev = document.getElementById('tCarouselPrev');
  const btnNext = document.getElementById('tCarouselNext');
  const counter = document.getElementById('tCarouselCounter');

  if (!row || !btnPrev || !btnNext) return;

  if (!window.matchMedia('(max-width: 768px)').matches) return;

  const cards = Array.from(row.querySelectorAll('.testimonial-card:not([aria-hidden="true"])'));
  const total = cards.length;
  let current = 0;

  function cardWidth() {
    return cards[0].offsetWidth + 12; // 12px = gap
  }

  function updateCounter() {
    if (counter) counter.textContent = `${current + 1} / ${total}`;
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    row.scrollTo({ left: current * cardWidth(), behavior: 'smooth' });
    updateCounter();
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Atualiza contador ao deslizar com o dedo
  let scrollTimer;
  row.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      current = Math.round(row.scrollLeft / cardWidth());
      current = Math.max(0, Math.min(current, total - 1));
      updateCounter();
    }, 80);
  }, { passive: true });

  updateCounter();
}
