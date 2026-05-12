---
name: frontend-design
description: Princípios de design frontend nível Linear/Stripe/Vercel — hierarquia, tipografia, restrição cromática, hairlines. Aplicáveis quando o design system específico (aura-design-system) não dita explicitamente.
when_to_use: Ao montar/iterar UI, definir hierarquia visual, decidir tipografia e espaçamento, ou avaliar "premium feel". Sempre verifique antes a skill aura-design-system — ela vence em conflitos.
---

# Frontend Design — princípios sêniores

Princípios destilados das escolas Linear / Stripe / Vercel / Arc / Raycast / Mercury. Não é dogma — é direção. O [`aura-design-system`](../aura-design-system/SKILL.md) sobrescreve quando colide.

## Filosofia em uma frase

**"Uma tela bem feita vence dez telas medianas."** Restrição cromática, tipografia editorial, respiro generoso. Premium não é decoração — é remoção.

## Hierarquia visual

- **Uma única âncora por dobra.** Tem o protagonista, e tem tudo o resto. Nada compete pelo olho.
- **Eyebrow → H1 → sub → CTA.** Padrão sólido pra hero. Eyebrow em uppercase tracking aberto (`tracking: 0.08em`, `font-size: 13px`) é o "olá, antes do título" que produtos premium usam.
- **Salto de tipografia agressivo.** H1 64-80px / body 16-18px / eyebrow 13px. Hierarquia rasa é amadora.
- **Tracking negativo em headlines grandes.** `letter-spacing: -0.02em` a `-0.03em` em ≥48px. Inter foi desenhado pra isso.

## Tipografia

- **Uma fonte sans (UI) + uma mono (dados).** Mais que duas é confusão.
- **Body 16-18px, line-height 1.5-1.6.** Menor que isso vira fricção de leitura.
- **Peso 600 em headlines, 400-500 em body, 500 em UI/CTAs.** Peso 700+ só em raros pontos focais.
- **Font-feature-settings em dados numéricos:** `'tnum' 1` (tabular-nums) pra alinhamento em colunas; `'zero' 1` pra distinguir zero de letra O.

## Restrição cromática

- **2-3 cores no máximo numa composição.** Fundo, texto, acento. Acento aparece em **≤2-3 pontos** — o resto é monocromático.
- **Cor de acento ≠ cor de background.** Botão verde sobre área verde = ruim. Verde sobre dark, dark sobre branco — alto contraste, baixo número de elementos.
- **CTA primário branco sobre preto > CTA verde neon.** Stripe e Linear fazem branco. Botão verde grita "afiliado/lead magnet".

## Espaçamento e respiro

- **Grid 8/16/24/32/48/64/96/128.** Pular números (ex.: 13, 27) é cheiro de "ajustei até parecer certo, não pensei".
- **Padding interno generoso em cards/seções.** Apertado é amador. Linear usa 32-48px em cards.
- **Respiro entre seções: 96-160px desktop, 64-96px mobile.** Páginas premium têm muito espaço vertical.
- **Container largura máxima 1200-1280px** centralizado com gutters de 24-32px. Largura total cheia é raro (só hero full-bleed em alguns layouts).

## Bordas, sombras e elevação

- **Hairlines, não sombras.** `1px solid rgba(255,255,255,0.06)` em dark mode, ou `rgba(0,0,0,0.08)` em light. Sombra grosseira (≥10px blur) é estética 2018.
- **Glow sutil só em dado vivo.** Dot pulsante, valor numérico positivo, status "ao vivo". Spread baixíssimo (4-6% alpha), spread grande (60-100px).
- **Radius 8-16px** em cards/botões. 4-6px é "OS antigo", 24px+ é "consumer app".

## Estados e micro-interações

- **Hover/focus discreto.** Botão primário em hover: brilho 2-3% mais, não 30%. Anel de foco 2px no acento.
- **Transitions 150-300ms cubic-bezier(.16,1,.3,1)** ou similar (ease-out forte no fim). Padrão Linear/Apple.
- **Respeite `prefers-reduced-motion`** — `transition: none` e desligar loops.
- **Stagger ao revelar** (`.fade-in` com IntersectionObserver) é elegante; reveal em massa é cheio de "tudo de uma vez". 50-100ms de delay por irmão.

## Padrões de hero

Três variações boas:

1. **Texto + asset único à direita.** Hero clássico Linear/Vercel. Asset = 1 peça (card flutuante, diagrama, mockup focado). NÃO composição de devices.
2. **Texto centralizado, sem asset.** Stripe/Linear quando o ponto é a tese. Tipografia gigante carrega tudo.
3. **Texto + diagrama de fluxo abaixo.** Stripe quando o produto É o fluxo. Ver [`mechanism-diagrams`](../mechanism-diagrams/SKILL.md).

Anti-pattern em hero: mockup multi-device com reflexo de chão.

## Padrões de "trust bar"

Logos de empresas/exchanges/integrações abaixo do CTA: monocromáticos (cinza `#666`), todos no mesmo tom, escala uniforme, espaçamento generoso. Label discreto à esquerda ("Usado por" / "Funciona em cima de"). Stripe e Vercel são referência.

## Padrões de feature grid

- **2 ou 3 colunas, nunca 4.** 4 fica apertado, vira lista.
- **Mobile: sempre 1 coluna.** Cards de 2 col em 768px ficam estreitos e ilegíveis.
- **Mesmo modelo por card:** ícone/eyebrow → título → 1-2 frases → CTA opcional.
- **Texto bem mais escuro/claro do que o título.** Hierarquia dentro do card precisa ser tão clara quanto da página.

## Padrões de pricing

- **Mostrar preço o quanto antes.** Esconder preço sinaliza algo a esconder. R$49,90 visível no hero/navbar.
- **Card único quando há plano único.** Tabela de 3 colunas pra plano único = malabarismo.
- **Comparativo "X vs alternativa manual" mata 2 objeções de uma vez** ("vale a pena?" + "é diferente de fazer na mão?").

## Acessibilidade

- Foco visível sempre (`:focus-visible`).
- Contraste WCAG AA mínimo (texto secundário em dark mode: `#a0a0a0` sobre `#0a0a0a` passa AA, falha AAA).
- `<button>` para ações, `<a>` para destinos. `role` ARIA só se nativo não cobrir.
- Tap targets ≥ 44×44px em mobile.

## Anti-patterns universais

- Composição de 4 devices (monitor + laptop + 2 celulares + reflexo). Estética ThemeForest.
- Gradiente roxo-rosa, partículas flutuantes, halos azuis girando. Estética cassino.
- Emojis decorativos em UI (🚀💰🎯). Só em microcopy contextual quando o tom permite.
- 4+ cores diferentes na mesma composição.
- Tipografia stretched vertical/horizontal. Inter já tem peso 800 — não force.
- Loading spinner como "feature". Loading state silencioso é melhor.
- Fotos humanas stocky (homem de braço cruzado, terno, sorrindo pra câmera). Sai do nicho.

## Referências mantidas como ponteiros

Para ver no próprio site (web capture ou navegação):

- **linear.app/homepage** — restrição cromática, asset único no hero, eyebrow uppercase.
- **stripe.com/payments** — peso editorial da tipografia, escala dramática.
- **vercel.com/home** — eyebrow antes do h1, hairlines, hierarquia.
- **mercury.com** — flow visualizations, dados em mono.
- **plaid.com** — diagramas de integração no hero.
- **arc.net** — micro-interações sutis, restrição cromática.
- **raycast.com** — produto-é-o-asset hero, sem decoração.