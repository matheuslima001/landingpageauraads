---
name: aura-design-system
description: Design system, marca e regras de copy do projeto AURA / Método Dólar Automático. Fonte de verdade pra qualquer decisão visual ou textual.
when_to_use: Sempre que editar index.html, CSS, JS, imagens, copy ou meta tags deste repo. Antes de gerar qualquer markup ou texto novo visível ao usuário.
---

# Aura Design System

Esta skill tem prioridade sobre instruções estéticas genéricas. Se algo em [`frontend-design`](../frontend-design/SKILL.md) conflita com o que está aqui, **este arquivo vence**.

## Arquitetura de marca (não negociável)

| Termo | Uso correto | Errado |
|---|---|---|
| **Método Dólar Automático** | O produto vendido. Carro-chefe. R$49,90, pagamento único, 7 dias. | "Método Aura", "App Aura", "AuraBot" |
| **Aura** | Sistema operacional do Método. Sempre inicial maiúscula. Feminino. | AURA, AuraBot, "o Aura", "Aura.io" |

Concordância: *"a Aura executa"*, *"a Aura cuida da ordem"*, *"diferente das ferramentas comuns"* (nunca "outros bots").

**Tagline-pivô:** *"O Método é nosso. A Aura executa. Você só vê o saldo."* — vive em `.tagline-block`, seção centralizada pós-hero.

## Modelo de cobrança

R$49,90 é **pagamento único** por 7 dias de acesso. NÃO existe plano mensal, recorrência, renovação automática, cartão salvo, ou cobrança pós-trial. Toda referência a preço deve reforçar "pagamento único, sem cobrança recorrente". Mencionar R$197/mês ou recorrência é **erro de produto**.

## Exchanges (5, não 4)

Lista oficial e completa: **Gate.io, BingX, MEXC, Bitget, OurBit**. Sempre nessa ordem em chips e listas. Atualizar TODOS os pontos quando algo mudar: hero sub, mecanismo, FAQ, JSON-LD, meta tags, chips, log do flow-diagram.

## Compliance — palavras banidas no body visível

Removidos sem exceção:

- **bot**, **robô**, **robot** — ativa gatilho de scam (bot de Telegram).
- **IA**, **inteligência artificial** — não é ML; é matemática de spread. Usar é mentira técnica.
- **renda passiva**, **lucro garantido**, **rendimento garantido** — promessa de retorno, problema com CVM.
- **transforme sua vida**, **fique rico**, **multiplique seu dinheiro** — estética de curso de "trader Lambo".

CVM: descreva **mecanismo** ("acumulação de USDT via arbitragem entre exchanges"), **nunca prometa retorno** ("rende X%", "lucro de Y reais"). Disclaimer completo no rodapé (`.footer-disclaimer`).

## Tokens de design

Definidos em `assets/css/base.css` como custom properties no `:root`. Use sempre via `var(--token)` — não hardcode hex.

```css
--bg:             #0a0a0a   /* Fundo principal                 */
--surface-1:      #111111   /* Cards e painéis                 */
--surface-2:      #1a1a1a   /* Elementos elevados              */
--green:          #00ff88   /* CTA, dados positivos, destaque  */
--green-dark:     #00cc6a   /* Hover de gradientes verdes      */
--text:           #ffffff   /* Texto principal                 */
--text-secondary: #a0a0a0   /* Texto secundário, subtítulos    */
--font-sans:      'Inter', system-ui, sans-serif
--font-mono:      'JetBrains Mono', ui-monospace, monospace
```

**Verde é dado, não decoração.** Aparece em ≤3 pontos por composição: CTA primário (quando aplicável), valores numéricos positivos, status indicators (dot pulsante). CTA principal pode ser branco sobre preto — usar verde demais grita "afiliado cripto".

**Hairlines em vez de sombras grosseiras:** bordas `1px solid rgba(255,255,255,0.06)` em vez de `box-shadow` chamativo. Glow só onde há dado vivo (dot pulsante, número de destaque).

## Tipografia

- **Inter** — UI, body, headlines. Pesos 400/500/600/700/800. Tracking negativo (`-0.02em` a `-0.03em`) em headlines grandes.
- **JetBrains Mono** — dados numéricos, tickers, badges, pares de moeda, timestamps, percentuais, valores monetários. Classe utilitária `.mono` já existe (`base.css`) e ativa `font-feature-settings: 'zero', 'ss01'`. Para números tabulares (alinhamento de colunas), adicione `font-feature-settings: 'tnum' 1`.

Não introduzir tipografia nova. Não usar Inter pra dado numérico — sempre Mono.

## Breakpoint

Único formal: `@media (max-width: 768px)`. Mobile-first. Não criar intermediários sem motivo documentado.

## Componentes e padrões reais do repo

Catálogo dos componentes que já existem — referencie e estenda, não recrie:

- `.btn` + variantes (`.btn-primary` verde glow, `.btn-outline` ghost, `.btn-large`, `.btn-block`).
- `.navbar` — fixa, glassmorphism ao scroll (classe `.scrolled`).
- `.hero` — com variant toggle A/B controlado por `assets/js/variant.js` (atributos `data-variant-a` / `data-variant-b` no `<h1>` e `<p>`).
- `.flow-diagram` — fluxo Bitget → Aura → OurBit no hero. Ver [`mechanism-diagrams`](../mechanism-diagrams/SKILL.md).
- `.tagline-block` — manifesto centralizado.
- `.proof-bar` — KPIs com counters animados (`data-target`, `data-suffix`, `data-format`).
- `.mech-step` — cards Identificação → Execução → Resultado.
- `.exchanges-bar` — 5 chips das exchanges.
- `.faq-item` — acordeão `<button>` com `aria-expanded`/`aria-controls`, transição via grid-row.

## CSS — responsabilidades

- `base.css` — tokens, reset, tipografia, utilitários (`.fade-in`, `.mono`, `.text-green`).
- `layout.css` — estrutura compartilhada (navbar, footer, container, disclaimer).
- `components.css` — componentes reutilizáveis (`.btn`, cards, chips, acordeão, window-chrome).
- `sections.css` — específico de seção (hero, tagline, mech, comparativo, etc.).

Nunca cruzar: estilo de componente reutilizável não vai em `sections.css`, e vice-versa.

## JS — convenção

ES modules nativos. Cada módulo exporta `init()`, chamado por `main.js`. Nada de IIFE global, nada de `window.X`. Sem libs externas, sem npm. `CHECKOUT_URL` única no topo de `main.js`, propagada via `data-checkout`.

## Acessibilidade

- `<h1>` único na página (no hero).
- `aria-label` em landmarks, `aria-hidden="true"` em decorativos (dots, separadores, SVGs).
- Botões interativos (FAQ toggle) são `<button>`, não `<div>`.
- Foco visível `:focus-visible { outline: 2px solid var(--green); outline-offset: 3px; }`.
- `prefers-reduced-motion: reduce` desliga `.fade-in`, animações de dot pulsante, scroll-behavior.
- Imagens com `alt` descritivo (não "imagem 1"). Mockup do hero com `fetchpriority="high"`, resto `loading="lazy"`.

## Anti-patterns

- Mockup multi-device (monitor + laptop + 2 celulares + reflexo de chão) → estética "ThemeForest 2018". Não fazer.
- Browser chrome fake com URL no hero asset → infantiliza. Linear/Stripe não fazem.
- Cores neon em backgrounds, gradientes roxo-rosa, partículas, ícones flutuantes → estética cassino cripto.
- "Robô do trader Lambo" / fotos humanas com braços cruzados / relógio caro → tira do nicho.
- Inline `<style>` ou `<script>` no `index.html` (exceto `<noscript>` de fallback e o UTM tracking já presente).
- Framework, bundler ou step de build. Repositório é zero-toolchain.
- Renomear imagem sem atualizar todas as referências.

## Quando algo conflitar

Em ordem de precedência:
1. **Esta skill** (aura-design-system).
2. `CLAUDE.md` (panorama).
3. [`frontend-design`](../frontend-design/SKILL.md) (princípios gerais).
4. Boas práticas de mercado.

Pergunte antes de quebrar 1 ou 2.