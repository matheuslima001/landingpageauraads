// =========================================================================
// faq.js — acordeão exclusivo (abrir um fecha os outros) com aria-expanded.
// =========================================================================

export function init() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item, idx) => {
    const btn    = item.querySelector('.faq-question');
    const panel  = item.querySelector('.faq-answer');
    if (!btn || !panel) return;

    const panelId = `faq-panel-${idx}`;
    panel.id = panelId;
    btn.setAttribute('aria-controls', panelId);
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos
      items.forEach((other) => {
        other.classList.remove('open');
        const b = other.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Abre o atual (se não estava aberto)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
