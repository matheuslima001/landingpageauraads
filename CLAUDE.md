# AuraBot — Landing Page

Landing page de produto para o **AuraBot**, bot de arbitragem de criptomoedas que opera simultaneamente em Gate.io, BingX, MEXC e Bitget. Página estática voltada a conversão (CTA de teste por R$49,90), com headline, prova social, mecanismo, FAQ e checkout externo.

## Stack & filosofia

HTML + CSS + JavaScript puros. **Sem framework, sem bundler, sem etapa de build.** Os scripts são carregados como ES modules nativos via `<script type="module">`.

Por quê:

- Zero dependência de toolchain — qualquer editor + servidor estático basta.
- Deploy é um `rsync`/upload de pasta em qualquer host (Netlify, S3, Cloudflare Pages, Nginx).
- Performance previsível, sem overhead de framework numa página single-screen.
- Onboarding instantâneo: quem souber HTML/CSS/JS edita direto.

## Estrutura do projeto

```
landingpageauraads/
├── index.html                  # HTML semântico, sem <style>/<script> inline. Importa os módulos.
├── assets/
│   ├── css/
│   │   ├── base.css            # Reset, tokens (:root), tipografia base, utilitários, .fade-in
│   │   ├── layout.css          # Navbar, footer, container/section, grids genéricos
│   │   ├── components.css      # .btn (+variantes), cards, badges, acordeão FAQ, chips
│   │   └── sections.css        # Estilos específicos por seção (hero, problema, mecanismo, etc.)
│   └── js/
│       ├── main.js             # Entrypoint (type="module"). Chama init() de cada módulo.
│       ├── animations.js       # IntersectionObserver para revelar .fade-in (com stagger por irmãos)
│       ├── navbar.js           # Aplica .scrolled na navbar via scroll listener (glassmorphism)
│       └── faq.js              # Acordeão exclusivo (abre um, fecha os outros)
├── images/
│   ├── testimonials/           # testimonial-01.{png,webp,avif} … prints de clientes
│   └── product/                # mockupoficial.{png,webp,avif} — mockup do hero (LCP)
├── .gitignore
├── README.md
└── CLAUDE.md
```

## Como rodar localmente

Os ES modules **exigem servidor HTTP** — abrir `index.html` direto pelo `file://` quebra os `import`/`export` por política de CORS do navegador. Sirva a pasta com qualquer servidor estático:

```bash
# opção 1 — Python
python -m http.server 8000

# opção 2 — Node
npx serve .
```

Depois acesse `http://localhost:8000`.

## Design system

Tokens definidos em `assets/css/base.css` como variáveis CSS no `:root`. Use sempre via `var(--token)` — não hardcode valores hex.

| Token              | Valor       | Uso                                |
|--------------------|-------------|------------------------------------|
| `--bg`             | `#0a0a0a`   | Fundo principal                    |
| `--surface-1`      | `#111111`   | Cards e painéis                    |
| `--surface-2`      | `#1a1a1a`   | Elementos elevados                 |
| `--green`          | `#00ff88`   | Cor de destaque / CTA              |
| `--green-dark`     | `#00cc6a`   | Hover de gradientes verdes         |
| `--text`           | `#ffffff`   | Texto principal                    |
| `--text-secondary` | `#a0a0a0`   | Texto secundário / subtítulos      |

**Fonte:** Inter (Google Fonts) — pesos 400, 500, 600, 700, 800. Único recurso externo permitido.

**Breakpoint:** `@media (max-width: 768px)` é o único breakpoint formal. Não introduzir intermediários sem justificativa.

## Seções da página

| ID / classe        | Descrição                                                          |
|--------------------|--------------------------------------------------------------------|
| `.navbar`          | Navbar fixa, glassmorphism ao rolar (classe `.scrolled`)           |
| `.hero`            | Headline + mockup do scanner; fundo com grid Tron animado          |
| `.magic-block`     | Bloco de texto-âncora pós-hero                                     |
| `.proof-bar`       | 4 KPIs com counters animados (`data-target`, `data-suffix`, etc.)  |
| `#depoimentos`     | Marquee horizontal infinito com prints de clientes                 |
| `#problema`        | Por que traders perdem oportunidades manualmente (grid 3 cards)    |
| `#mecanismo`       | Identificação → Execução → Resultado                               |
| `.risk-section`    | Por que arbitragem é baixo risco (grid 2x2)                        |
| `.exchanges-bar`   | Chips das 4 exchanges suportadas                                   |
| `#funcionalidades` | Grid de features do produto                                        |
| `#como-comecar`    | Onboarding em 3 passos                                             |
| `#pricing`         | Plano único — R$49,90 por 7 dias, depois R$197/mês                 |
| `#faq`             | Perguntas frequentes com acordeão                                  |
| `.cta-section`     | CTA final                                                          |
| `.footer`          | Logo, copyright, links institucionais                              |

## Convenções de código

- **Idioma:** todo texto visível em pt-BR. Não traduzir.
- **HTML:** semântico. `index.html` não deve conter `<style>` nem `<script>` inline (exceto `<noscript>` para fallback do `.fade-in` e o `<script>` externo de UTM tracking no `<head>`).
- **CSS — responsabilidades:**
  - Tokens, reset, tipografia, utilitários (`.fade-in`) → `base.css`.
  - Estrutura compartilhada (navbar, footer, section wrapper) → `layout.css`.
  - Componentes reutilizáveis (`.btn`, cards, chips, acordeão) → `components.css`.
  - Tudo específico de uma seção (`.hero-grid`, `.proof-bar`, `.mech-step`, …) → `sections.css`.
  - Não cruzar: estilo de componente reutilizável nunca vai em `sections.css`, e vice-versa.
- **JS — módulos ES:**
  - Cada módulo exporta uma função `init()` (`export function init() { … }`).
  - `main.js` importa e dispara: `import { init as initFaq } from './faq.js'; initFaq();`.
  - Nada de IIFEs globais, nada de variáveis no `window`.
  - Sem libs externas. Sem npm. Só APIs nativas do browser.
- **Animações:** `.fade-in` + IntersectionObserver em `animations.js`, com stagger automático por ordem entre irmãos. Não criar mecanismos paralelos. Respeitar `prefers-reduced-motion` (já tratado).
- **Botões:** classe base `.btn`, combinando com `.btn-primary` (verde, gradiente, glow), `.btn-outline` (transparente, borda) e/ou `.btn-large`. CTAs de checkout usam o atributo `data-checkout` — o JS injeta a URL central e `target="_blank"`.
- **Responsividade:** mobile-first nos breakpoints específicos. O único breakpoint geral é `@media (max-width: 768px)`.
- **Acessibilidade:**
  - `alt` descritivo em toda imagem (depoimentos, mockups).
  - `aria-label` / `aria-hidden` em controles e elementos decorativos (grid de fundo, contadores).
  - Foco visível preservado nos botões e links da navbar/FAQ.
  - Toggle do FAQ é `<button>`, não `<div>`.
- **Imagens:**
  - Nomes em kebab-case, semânticos (`testimonial-03.png`, `mockupoficial.png`). Cada imagem em PNG + WebP + AVIF, servidas via `<picture>`.
  - Depoimentos em `images/testimonials/`, mockups de produto em `images/product/`.
  - Sempre `loading="lazy"` em imagens abaixo da dobra.
  - Renomear arquivo exige atualizar todas as referências no HTML.

## O que evitar

- Adicionar framework (React/Vue/Svelte/Alpine), bundler (Vite/Webpack/Rollup) ou qualquer etapa de build.
- Reintroduzir CSS ou JS inline no `index.html` (exceto o `<noscript>` de fallback e o script de UTM tracking já presente).
- Adicionar bibliotecas externas — só Google Fonts. Se precisar de algo, escreva nativo.
- Mudar paleta, tipografia ou breakpoint sem motivo explícito documentado.
- Traduzir conteúdo para inglês.
- Renomear arquivos de imagem sem atualizar todas as referências.
- Criar novos mecanismos de animação em paralelo ao `.fade-in`.
- Colocar lógica de uma seção dentro de `base.css`/`layout.css`/`components.css` (e vice-versa).
