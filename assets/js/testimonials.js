export function init() {
  const row     = document.querySelector('.testimonials-row');
  const btnPrev = document.getElementById('tCarouselPrev');
  const btnNext = document.getElementById('tCarouselNext');
  const counter = document.getElementById('tCarouselCounter');

  if (!row || !btnPrev || !btnNext) return;

  // Só ativa em mobile
  const mq = window.matchMedia('(max-width: 768px)');
  if (!mq.matches) return;

  // Conta apenas os cards reais (não os duplicados aria-hidden)
  const cards = Array.from(row.querySelectorAll('.testimonial-card:not([aria-hidden])'));
  const total = cards.length;
  let current = 0;

  function scrollTo(idx) {
    current = Math.max(0, Math.min(idx, total - 1));
    cards[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    if (counter) counter.textContent = `${current + 1} / ${total}`;
  }

  btnPrev.addEventListener('click', () => scrollTo(current - 1));
  btnNext.addEventListener('click', () => scrollTo(current + 1));

  // Atualiza contador ao deslizar com o dedo
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = cards.indexOf(entry.target);
      if (idx === -1) return;
      current = idx;
      if (counter) counter.textContent = `${current + 1} / ${total}`;
    });
  }, { root: row, threshold: 0.6 });

  cards.forEach(card => io.observe(card));
}
