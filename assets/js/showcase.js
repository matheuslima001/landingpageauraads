const LABELS = {
  scanner: 'Scanner · oportunidades em tempo real',
  aurabot:  'Execução · 5 corretoras simultâneas',
};

export function init() {
  const tabs    = document.querySelectorAll('.showcase-tab');
  const panels  = document.querySelectorAll('.showcase-panel');
  const address = document.getElementById('showcase-address');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;

      tabs.forEach(t => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });

      panels.forEach(panel => {
        const isActive = panel.id === `showcase-${target}`;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });

      if (address) address.textContent = LABELS[target] ?? '';
    });
  });
}
