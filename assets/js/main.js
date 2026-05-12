import { initAnimations, initTestimonialsMarquee, initCounters } from './animations.js';
import { initNavbar } from './navbar.js';
import { initFaq } from './faq.js';

// URL única do checkout: alterar aqui propaga para todos os CTAs com data-checkout
const CHECKOUT_URL = 'https://pay.kirvano.com/1bac6fe8-7b87-4c81-a80e-fef8de4db39d';

function wireCheckoutLinks() {
  document.querySelectorAll('a[data-checkout]').forEach((el) => {
    el.href = CHECKOUT_URL;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });
}

wireCheckoutLinks();
initNavbar();
initAnimations();
initTestimonialsMarquee();
initCounters();
initFaq();
