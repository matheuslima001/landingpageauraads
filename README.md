# AURA — Landing Page

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
│   ├── product/            # mockupoficial.png, mockup2.png, mockupaura.png, dashboard-aura.png
│   └── testimonials/       # testimonial-01.png ... testimonial-16.png
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

## Contribuição

- Mantenha indentação de 2 espaços.
- Comentários só onde o **porquê** não é óbvio pelo nome do símbolo.
- Não introduza framework, bundler ou dependência de build.
- Não altere a paleta de cores nem a tipografia sem alinhamento.
