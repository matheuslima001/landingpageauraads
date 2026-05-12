# AURA — Landing Page

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)
[![Lighthouse CI](../../actions/workflows/lighthouse.yml/badge.svg)](../../actions/workflows/lighthouse.yml)

Landing page de produto do **AURA**, bot de arbitragem de criptomoedas. Página estática em HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

## Como rodar

Como os scripts são carregados como ES modules (`<script type="module">`), abrir o `index.html` direto pelo `file://` não funciona — o navegador bloqueia por CORS. Use qualquer servidor HTTP estático:

```bash
# Python (já vem instalado na maioria dos sistemas)
python -m http.server 8080

# Node (se preferir)
npx serve .
```

Acesse `http://localhost:8080` (ou a porta que o `serve` indicar).

## Estrutura

```
landingpageauraads/
├── index.html              # HTML semântico, referencia os módulos CSS/JS
├── assets/
│   ├── css/
│   │   ├── base.css        # Reset, tokens (:root), tipografia, utilitários (.fade-in)
│   │   ├── layout.css      # Navbar, section shell, footer, container e responsivo de layout
│   │   ├── components.css  # .btn, cards base, FAQ, chips de exchange
│   │   └── sections.css    # Estilos específicos de cada seção (hero, problema, mecanismo, etc.)
│   └── js/
│       ├── main.js         # Entrypoint: importa e inicializa os módulos
│       ├── animations.js   # IntersectionObserver para .fade-in, marquee de depoimentos, contadores animados
│       ├── navbar.js       # Efeito glassmorphism ao rolar (defensivo: no-op se a .navbar não existir)
│       └── faq.js          # Acordeão com aria-expanded/aria-controls
├── images/
│   ├── product/            # mockupoficial.{png,webp,avif} — mockup do hero (LCP)
│   └── testimonials/       # testimonial-01..16.{png,webp,avif} — prints de clientes
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Design tokens

Definidos em `assets/css/base.css` como custom properties em `:root`.

| Token              | Valor       | Uso                                  |
|--------------------|-------------|--------------------------------------|
| `--bg`             | `#0a0a0a`   | Fundo principal                      |
| `--surface-1`      | `#111111`   | Cards e painéis                      |
| `--surface-2`      | `#1a1a1a`   | Elementos elevados                   |
| `--green`          | `#00ff88`   | Destaque, CTA, links                 |
| `--green-dark`     | `#00cc6a`   | Hover do botão primário              |
| `--text`           | `#ffffff`   | Texto principal                      |
| `--text-secondary` | `#a0a0a0`   | Texto secundário, subtítulos         |

**Tipografia:** Inter (Google Fonts), pesos 400/500/600/700/800, carregada com `font-display: swap`.

## Convenções

- **Idioma:** todo conteúdo visível em pt-BR.
- **Animações:** classe `.fade-in` + `IntersectionObserver` em `animations.js`. Não criar mecanismos paralelos.
- **Botões:** `.btn` é a base; combine com `.btn-primary`, `.btn-outline`, `.btn-large`, `.btn-block`.
- **Movimento reduzido:** todas as animações respeitam `prefers-reduced-motion: reduce`.
- **CSS responsivo:** breakpoint principal em `@media (max-width: 768px)`. Cada arquivo de CSS mantém suas próprias regras de mobile colocadas junto dos seletores que sobrescrevem.
- **Imagens:** depoimentos em `images/testimonials/` (`testimonial-NN.png`), produto em `images/product/`. A imagem do hero usa `fetchpriority="high"`; o resto usa `loading="lazy"`.
- **Checkout:** a URL fica em uma única constante (`CHECKOUT_URL`) em `assets/js/main.js`, propagada para todos os links com atributo `data-checkout`.

## CI / qualidade

A esteira do GitHub Actions roda em todo push pra `main` e em todo pull request:

- **`ci.yml`** (rápido, bloqueante):
  - `html-validate` — valida `index.html` contra o preset `html-validate:recommended`.
  - `lychee` — checa links internos e externos (config em `.github/lychee.toml`).
  - `axe-core/cli` — testes de acessibilidade (WCAG 2 A/AA + best-practice) contra a página servida localmente.
- **`lighthouse.yml`** (mais lento, informativo via `continue-on-error`): Lighthouse CI em PRs com thresholds em `lighthouserc.json` — performance ≥ 80, a11y ≥ 90 (erro), best-practices ≥ 90, SEO ≥ 90.

Todos os workflows rodam **sem secrets** e sem dependência de serviços pagos. O `dependabot.yml` mantém as actions atualizadas semanalmente. Não há `package.json` no repo — as ferramentas são invocadas via `npx --yes <pkg>@<versão pinada>` para preservar a filosofia "zero toolchain" descrita no `CLAUDE.md`.

## Contribuição

- Mantenha indentação de 2 espaços (vide `.editorconfig`).
- Comentários só onde o **porquê** não é óbvio pelo nome do símbolo.
- Não introduza framework, bundler ou dependência de build.
- Não altere a paleta de cores nem a tipografia sem alinhamento.
- Verifique localmente: html-validate (`npx --yes html-validate@9 index.html`), e teste a página em mobile + desktop.
