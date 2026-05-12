// =========================================================================
// main.js — entrypoint. Importa e inicializa cada módulo.
// =========================================================================

import { init as initNavbar }    from './navbar.js';
import { init as initAnims }     from './animations.js';
import { init as initFaq }       from './faq.js';
import { init as initVariant }   from './variant.js';

// URL central do checkout. Trocar aqui propaga em todos os data-checkout.
const CHECKOUT_URL = 'https://pay.aurabot.com.br/teste-7-dias';

function wireCheckout() {
  const links = document.querySelectorAll('[data-checkout]');
  links.forEach((el) => {
    el.setAttribute('href', CHECKOUT_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

function boot() {
  wireCheckout();
  initVariant();   // antes do animations pra que o texto correto seja medido
  initNavbar();
  initAnims();
  initFaq();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
