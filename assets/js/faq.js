export function initFaq() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach((btn) => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    if (answer && !answer.id) {
      answer.id = `faq-answer-${Math.random().toString(36).slice(2, 9)}`;
    }
    btn.setAttribute('aria-expanded', 'false');
    if (answer) btn.setAttribute('aria-controls', answer.id);

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
