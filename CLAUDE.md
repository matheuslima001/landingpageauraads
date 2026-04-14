# AuraBot — Landing Page

Landing page de produto para o **AuraBot**, um bot de arbitragem de criptomoedas. Página estática em HTML puro, sem frameworks ou bundler.

## Estrutura do projeto

```
/
├── index.html        # Toda a aplicação: HTML + CSS + JS inline
└── images/           # Capturas de tela de depoimentos de clientes
```

## Arquitetura

Tudo está em um único arquivo `index.html`. CSS e JavaScript ficam inline dentro do próprio arquivo — não há arquivos separados de estilo ou script.

## Design system

| Token            | Valor       | Uso                          |
|-----------------|-------------|------------------------------|
| `--bg`          | `#0a0a0a`  | Fundo principal              |
| `--surface-1`   | `#111111`  | Cards e painéis              |
| `--surface-2`   | `#1a1a1a`  | Elementos elevados           |
| `--green`       | `#00ff88`  | Cor de destaque / CTA        |
| `--green-dark`  | `#00cc6a`  | Hover states                 |
| `--text`        | `#ffffff`  | Texto principal              |
| `--text-secondary` | `#a0a0a0` | Texto secundário / subtítulos |

**Fonte:** Inter (Google Fonts) — pesos 400, 500, 600, 700, 800.

## Seções da página

| ID / classe       | Descrição                                      |
|------------------|------------------------------------------------|
| `.navbar`        | Navbar fixa com efeito glassmorphism ao rolar  |
| `.hero`          | Headline principal + simulação do painel do bot |
| `#problema`      | Por que traders perdem oportunidades           |
| `#mecanismo`     | Como a arbitragem funciona (Identificação → Execução → Resultado) |
| `#depoimentos`   | Galeria de prints de depoimentos reais         |
| `#funcionalidades` | Grid de features do produto                 |
| `#como-comecar`  | Onboarding em 3 passos                         |
| `#pricing`       | Plano único sem surpresas                      |
| `#faq`           | Perguntas frequentes com acordeão              |
| `.cta-section`   | CTA final                                      |

## Convenções de código

- **Idioma da página:** português (pt-BR) — todo texto visível ao usuário deve estar em pt-BR.
- **Animações:** usar a classe `.fade-in` + IntersectionObserver para revelar elementos ao rolar. Não criar novos mecanismos de animação.
- **Botões:** `.btn` é a base; adicionar `.btn-primary`, `.btn-outline` e/ou `.btn-large` conforme necessário.
- **Responsividade:** breakpoint principal em `@media (max-width: 768px)` já definido no CSS.
- **Imagens de depoimentos:** ficam em `images/` e são referenciadas diretamente no HTML.

## O que não fazer

- Não separar CSS ou JS em arquivos externos — manter tudo em `index.html`.
- Não adicionar dependências externas além do Google Fonts já carregado.
- Não mudar a paleta de cores sem motivo explícito — a identidade visual do produto usa dark + neon green.
- Não traduzir o conteúdo para inglês.
