---
name: mechanism-diagrams
description: Padrões para diagramas de fluxo / mecanismo (source → engine → target) no estilo Stripe / Mercury / Plaid. Aplica-se ao .flow-diagram do hero e ao .mech-step da seção mecanismo.
when_to_use: Ao criar ou editar visualizações que descrevem fluxo de dados, dinheiro, ordens ou execução. Em particular `.flow-diagram` no hero e `.mech-step` na seção mecanismo deste repo.
---

# Mechanism Diagrams

Diagramas de fluxo que tornam o mecanismo do produto visualmente óbvio. Essa skill cobre quando usar, anatomia, regras visuais, e quando NÃO usar.

## Quando usar

- O produto opera entre 2+ sistemas externos (exchanges, contas bancárias, APIs).
- A pessoa precisa entender "como funciona" em < 5 segundos pra confiar.
- O mecanismo É o diferencial (não é detalhe técnico, é o produto).

No projeto AURA: a Aura intermedia 5 exchanges, capturando spread. Esse é exatamente o caso. O `.flow-diagram` do hero existe pra isso.

## Quando NÃO usar

- Quando o produto é uma UI única (use screenshot da UI, não diagrama).
- Quando o "fluxo" é só uma chamada de API (não tem 3 atores distintos).
- Quando o público alvo não entende abstração de fluxo (B2C massivo de baixa literacia técnica).

## Anatomia padrão

```
[ Source ]  ──→  [ Engine ]  ──→  [ Target ]
   nome              nome              nome
   meta              ●  status         meta
   valor                               valor (destacado)
```

Três nós, duas setas, uma caption embaixo com o resultado (spread, latência, status). Mais que 3 nós vira fluxograma, menos que 3 é par.

## Regras visuais (deste projeto)

Baseado no `.flow-diagram` real do repo (`assets/css/sections.css`):

- **Container:** `background: #0f0f0f`, `border: 1px solid rgba(255,255,255,0.06)`, `border-radius: 16px`, `padding: 32px`. Glow verde sutil: `box-shadow: 0 30px 80px 20px rgba(0,255,136,0.06)`.
- **Nós (`.flow-node`):** `padding: 14px 16px`, `border-radius: 10px`, `background: rgba(255,255,255,0.02)`, hairline `rgba(255,255,255,0.06)`. Centralizados.
- **Engine (Aura) (`.flow-engine`):** mesmo formato mas com hint verde — `background: rgba(0,255,136,0.04)`, `border: 1px solid rgba(0,255,136,0.18)`. Tem dot pulsante 8px com glow verde.
- **Setas (`.flow-arrow`):** SVG inline, tracejada (`stroke-dasharray: 3 3`), `stroke-width: 1.25`, cor `#555`. Pontas usam `stroke-linejoin: round`.
- **Tipografia interna:**
  - Nome da exchange (`.flow-node-name`): 13px peso 500 branco, tracking +0.01em.
  - Par (`.flow-node-pair`): 10-11px peso 400 cinza `#666`, **uppercase**, tracking +0.06em — vira eyebrow técnico.
  - Preço (`.flow-node-price`): 15px peso 500, **classe `.mono` + tabular-nums**. Source branco, target verde (`var(--green)`).
- **Caption (`.flow-caption`):** centralizada, 13px peso 400, label "spread" em `#666`, valor verde em peso 500, par em mono uppercase 11px com tracking aberto.
- **Disclaimer (`.flow-disclaimer`):** 12px `#666` centralizado, max-width 560px, line-height 1.5. Texto fixo: *"Exemplo de operação real. Spreads variam. Há dias sem operação."*

## Padrões de mobile

Em `@media (max-width: 768px)`:

- Grid `flow-row` colapsa pra 1 coluna (`grid-template-columns: 1fr`).
- Setas rotacionam 90° (`transform: rotate(90deg)`) — apontam pra baixo.
- Nós e engine ganham `max-width: 220px` pra não esticar full-bleed.
- `.flow-caption` recebe `flex-wrap: wrap` pra não estourar.

## Micro-animações

- **Dot pulsante:** `animation: flow-pulse 1.8s ease-in-out infinite`, escala 1 ↔ 0.85, opacidade 1 ↔ 0.55. Comunica "ao vivo" sem ser irritante.
- **Cuidado com loops contínuos.** Setas com gradiente animado, packet viajando — só se for muito sutil e o frame-time for baixo. Respeitar `prefers-reduced-motion: reduce` desligando tudo.
- **Variação de valor:** se rotacionar prices/spreads pra dar sensação de "vivo", trocar a cada 4-8 segundos (não menor) e com transição suave de opacidade (não jump).

## Anti-patterns deste padrão

- **Mostrar dashboard genérico em vez de diagrama.** Dashboard = "vendendo software". Diagrama = "vendendo o mecanismo".
- **Setas grossas, coloridas, com animação chamativa.** Stripe usa setas finas e tracejadas; faz parecer engenharia, não decoração.
- **3 nós com background verde.** Verde só no engine (Aura) — os outros nós ficam neutros. Diferenciação visual.
- **Caption com 4+ pieces de info.** Limite 3 (label + valor + par). Mais que isso vira ruído.
- **Ícones de exchange em emoji/PNG colorido.** Texto vence em tipografia premium. Logos só em trust-bar separada, monocromáticos.
- **Browser chrome em volta do diagrama.** Não é screenshot, é diagrama. Não precisa de moldura de janela.
- **Tooltip/popover ao hover.** O diagrama deve se explicar sozinho — se precisa de tooltip, simplifica o diagrama.

## Conexão com a seção `#mecanismo`

O `.flow-diagram` do hero é a versão **resumida** (1 operação, estática) do que a seção `#mecanismo` expande em 3 cards (`.mech-step` Identificação → Execução → Resultado). Não duplique informação entre eles — o hero atrai, o mecanismo explica.

## Referências externas

- **stripe.com/payments** — fluxo end-to-end de pagamento, padrão clássico source-engine-target.
- **stripe.com/billing** — fluxo de subscription, vários atores.
- **mercury.com** — flow de dinheiro entre contas, tipografia premium.
- **plaid.com** — integração bancária, domina o gênero.
- **brex.com/products/spend** — flow de aprovação corporativa.

Esses são pra **inspiração de qualidade**, não pra copiar literalmente. O diagrama do AURA tem identidade própria (dark + verde) — herde os princípios (hairlines, mono, hierarquia), não a paleta.