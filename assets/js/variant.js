// =========================================================================
// variant.js — toggle de variações do hero (A/B).
// Lê data-variant-a / data-variant-b dos elementos marcados e troca via
// botão. Persiste a escolha em localStorage.
// =========================================================================

const STORAGE_KEY = 'aura.hero.variant';

function applyVariant(variant) {
  const elements = document.querySelectorAll('[data-variant-a][data-variant-b]');
  elements.forEach((el) => {
    const html = el.dataset['variant' + variant.toUpperCase()];
    if (html != null) el.innerHTML = html;
  });

  // Atualiza estado dos botões
  document.querySelectorAll('.hero-variant-toggle button[data-variant]').forEach((btn) => {
    const isActive = btn.dataset.variant === variant;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

export function init() {
  const buttons = document.querySelectorAll('.hero-variant-toggle button[data-variant]');
  if (!buttons.length) return;

  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved === 'b' ? 'b' : 'a';
  applyVariant(initial);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const variant = btn.dataset.variant;
      applyVariant(variant);
      try { localStorage.setItem(STORAGE_KEY, variant); } catch (e) { /* ignore quota */ }
    });
  });
}
