export function init() {
  const row     = document.querySelector('.testimonials-row');
  const btnPrev = document.getElementById('tCarouselPrev');
  const btnNext = document.getElementById('tCarouselNext');
  const counter = document.getElementById('tCarouselCounter');

  if (!row || !btnPrev || !btnNext) return;

  // Apenas cards reais (sem os duplicados do loop infinito)
  const cards = Array.from(row.querySelectorAll('.testimonial-card:not([aria-hidden="true"])'));
  const total = cards.length;
  let current = 0;

  function updateCounter() {
    if (counter) counter.textContent = `${current + 1} / ${total}`;
  }

  // Usa offsetLeft do card para calcular posição real, independente de padding
  function goTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    const card = cards[current];
    const target = card.offsetLeft - Math.round((row.clientWidth - card.offsetWidth) / 2);
    row.scrollLeft = Math.max(0, target); // CSS scroll-behavior:smooth cuida da animação
    updateCounter();
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // Atualiza o contador ao deslizar com o dedo
  let scrollTimer;
  row.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const center = row.scrollLeft + row.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      current = closest;
      updateCounter();
    }, 80);
  }, { passive: true });

  updateCounter();
}
