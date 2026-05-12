# Método Dólar Automático — Landing Page

[![CI](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)
[![Lighthouse CI](../../actions/workflows/lighthouse.yml/badge.svg)](../../actions/workflows/lighthouse.yml)

Landing page do **Método Dólar Automático** — produto de acumulação automática de USDT via arbitragem entre Gate.io, BingX, MEXC, Bitget e OurBit. A execução é feita pela **Aura**, o sistema operacional do Método. Página estática em HTML, CSS e JavaScript puros, sem framework e sem etapa de build.

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
│   │   ├── layout.css      # Navbar, footer, container, disclaimer
│   │   ├── components.css  # .btn, cards base, FAQ, chips, window-chrome
│   │   └── sections.css    # Hero, tagline, mecanismo, comparativo, etc.
│   └── js/
│       ├── main.js         # Entrypoint: importa e inicializa os módulos
│       ├── animations.js   # IntersectionObserver para .fade-in, marquee, contadores
│       ├── navbar.js       # Efeito glassmorphism ao rolar
│       ├── faq.js          # Acordeão com aria-expanded/aria-controls
├── images/
│   ├── product/            # mockupoficial.{png,webp,avif} — mockup do hero (LCP)
│   └── testimonials/       # testimonial-01..16.{png,webp,avif} — prints de clientes
├── .gitignore
├── CLAUDE.md
└── README.md
```

## Marca

| Termo | Uso correto | Errado |
|---|---|---|
| **Método Dólar Automático** | Produto vendido. Carro-chefe. R$49,90 pagamento único, 7 dias de acesso. | "Método Aura", "App Aura" |
| **Aura** | Sistema operacional do Método. Inicial maiúscula, feminino. | AURA, AuraBot, "o Aura" |

**Tagline:** *"O Método é nosso. A Aura executa. Você só vê o saldo."*

## Compliance

Por descrever um produto com componente financeiro, a copy do site evita por completo: "bot", "robô", "IA", "inteligência artificial", "renda passiva", "lucro garantido", "transforme sua vida". Toda referência ao funcionamento descreve **mecanismo** (arbitragem entre exchanges, acumulação de USDT), nunca **promessa de retorno**. O disclaimer CVM completo fica no rodapé.

## Design tokens

Definidos em `assets/css/base.css` como custom properties em `:root`.

| Token              | Valor       | Uso                                  |
|--------------------|-------------|--------------------------------------|
| `--bg`             | `#0a0a0a`   | Fundo principal                      |
| `--surface-1`      | `#111111`   | Cards e painéis                      |
| `--surface-2`      | `#1a1a1a`   | Elementos elevados                   |
| `--green`          | `#00ff88`   | Destaque, CTA, dados positivos       |
| `--green-dark`     | `#00cc6a`   | Hover do botão primário              |
| `--text`           | `#ffffff`   | Texto principal                      |
| `--text-secondary` | `#a0a0a0`   | Texto secundário, subtítulos         |

**Tipografia:** Inter (Google Fonts) — pesos 400/500/600/700/800, body e UI. JetBrains Mono — dados, tickers, badges, valores numéricos. Ambas carregadas com `font-display: swap`.

## Convenções

- **Idioma:** todo conteúdo visível em pt-BR.
- **Animações:** classe `.fade-in` + `IntersectionObserver` em `animations.js`. Não criar mecanismos paralelos. Respeitar `prefers-reduced-motion`.
- **Botões:** `.btn` é a base; combine com `.btn-primary`, `.btn-outline`, `.btn-large`, `.btn-block`.
- **CSS responsivo:** breakpoint principal em `@media (max-width: 768px)`.
- **Imagens:** depoimentos em `images/testimonials/`, produto em `images/product/`. A imagem do hero usa `fetchpriority="high"`; o resto usa `loading="lazy"`. Todas servidas via `<picture>` com AVIF + WebP + PNG fallback.
- **Checkout:** a URL fica em uma única constante (`CHECKOUT_URL`) em `assets/js/main.js`, propagada para todos os links com atributo `data-checkout`. **Trocar pelo URL real antes do deploy** — atualmente está um placeholder.

## CI / qualidade

A esteira do GitHub Actions roda em todo push pra `main` e em todo pull request:

- **`ci.yml`** (rápido, bloqueante):
  - `html-validate` — valida `index.html` contra o preset `html-validate:recommended`.
  - `lychee` — checa links internos e externos (config em `.github/lychee.toml`).
  - `axe-core/cli` — testes de acessibilidade (WCAG 2 A/AA + best-practice) contra a página servida localmente.
- **`lighthouse.yml`** (mais lento, informativo via `continue-on-error`): Lighthouse CI em PRs com thresholds em `lighthouserc.json` — performance ≥ 80, a11y ≥ 90 (erro), best-practices ≥ 90, SEO ≥ 90.

Todos os workflows rodam **sem secrets** e sem dependência de serviços pagos. O `dependabot.yml` mantém as actions atualizadas semanalmente. Não há `package.json` no repo — as ferramentas são invocadas via `npx --yes <pkg>@<versão pinada>`.

## Contribuição

- Mantenha indentação de 2 espaços (vide `.editorconfig`).
- Comentários só onde o **porquê** não é óbvio pelo nome do símbolo.
- Não introduza framework, bundler ou dependência de build.
- Não altere a paleta de cores nem a tipografia sem alinhamento.
- Verifique localmente: html-validate (`npx --yes html-validate@9 index.html`), e teste a página em mobile + desktop.
