// =========================================================================
// flow-ticker.js — micro-animação do diagrama de execução do hero.
// Atualiza timestamp (HH:MM:SS.mmm) e faz a última casa dos preços "respirar".
// Pausa quando o diagrama está fora do viewport. Respeita prefers-reduced-motion.
// =========================================================================

const TS_INTERVAL  = 90;    // ms — pulso do timestamp
const TICK_INTERVAL = 1400; // ms — pulso dos preços

function pad(n, w = 2) {
  const s = String(n);
  return s.length >= w ? s : '0'.repeat(w - s.length) + s;
}

// Timestamp determinístico ancorado: 14:32:07.412 + drift
function buildClock(initial = '14:32:07.412') {
  const [hms, ms] = initial.split('.');
  const [h, m, s] = hms.split(':').map(Number);
  let t = (((h * 60) + m) * 60 + s) * 1000 + Number(ms || 0);
  return () => {
    t += TS_INTERVAL;
    const totalSec = Math.floor(t / 1000);
    const hh = pad(Math.floor(totalSec / 3600) % 24);
    const mm = pad(Math.floor(totalSec / 60) % 60);
    const ss = pad(totalSec % 60);
    const mmm = pad(t % 1000, 3);
    return `${hh}:${mm}:${ss}.${mmm}`;
  };
}

// Mantém o preço base e faz a última casa decimal oscilar 0..9
function makePriceTicker(el) {
  const base = el.textContent.trim();          // ex.: "$0,11402"
  const match = base.match(/^(.*)(\d)$/);
  if (!match) return null;
  const [, prefix, lastDigit] = match;
  const center = Number(lastDigit);
  let prev = center;
  return () => {
    // anda ±1 em torno do centro, clamp 0..9
    const delta = Math.floor(Math.random() * 3) - 1;
    let next = prev + delta;
    if (next < Math.max(0, center - 2)) next = center - 1;
    if (next > Math.min(9, center + 2)) next = center + 1;
    el.textContent = `${prefix}${next}`;
    if (next > prev)      el.dataset.flowTick = 'up';
    else if (next < prev) el.dataset.flowTick = 'down';
    prev = next;
    // Limpa o estado de cor após o transition
    setTimeout(() => { delete el.dataset.flowTick; }, 220);
  };
}

export function init() {
  const figure = document.querySelector('.flow-diagram');
  if (!figure) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tsEl = figure.querySelector('[data-flow-ts]');
  const priceEls = figure.querySelectorAll('[data-flow-price]');
  if (!tsEl && !priceEls.length) return;

  const tickClock = tsEl ? buildClock(tsEl.textContent.trim()) : null;
  const tickers = Array.from(priceEls).map(makePriceTicker).filter(Boolean);

  let tsTimer = null;
  let priceTimer = null;

  const start = () => {
    if (tickClock && !tsTimer) {
      tsTimer = setInterval(() => { tsEl.textContent = tickClock(); }, TS_INTERVAL);
    }
    if (tickers.length && !priceTimer) {
      priceTimer = setInterval(() => { tickers.forEach((fn) => fn()); }, TICK_INTERVAL);
    }
  };

  const stop = () => {
    if (tsTimer)    { clearInterval(tsTimer);    tsTimer = null; }
    if (priceTimer) { clearInterval(priceTimer); priceTimer = null; }
  };

  // Só anima quando visível — evita custo desnecessário
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) start();
      else                      stop();
    });
  }, { threshold: 0.1 });
  io.observe(figure);

  // Pausa quando a aba perde foco
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (figure.getBoundingClientRect().top < window.innerHeight) start();
  });
}
