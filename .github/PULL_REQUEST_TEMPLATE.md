<!--
Obrigado pela contribuição! Preencha as seções abaixo para acelerar o review.
Use Conventional Commits em pt-BR no título do PR (ex.: "feat: ...", "fix: ...", "ci: ...").
-->

## Contexto

<!-- Por que esta mudança existe? Qual problema/oportunidade ela atende? -->

## Mudanças

<!-- O que foi alterado, em alto nível. Bullet points são bem-vindos. -->

- 
- 

## Screenshots / vídeos

<!-- Se afeta UI, anexe antes/depois (mobile e desktop, se relevante). Remova a seção se for nao-visual. -->

## Como testar

<!-- Passos pra reproduzir/validar localmente. -->

1. `python -m http.server 8080` (ou `npx serve .`)
2. Abrir `http://localhost:8080`
3. ...

## Checklist

- [ ] Conteúdo visível está em **pt-BR**
- [ ] Copy revisada (sem erros de digitação / concordância)
- [ ] **Acessibilidade**: `alt` em imagens, `aria-*` em controles, foco visível, contraste OK
- [ ] **Performance**: imagens otimizadas, `loading="lazy"` abaixo da dobra, sem CSS/JS bloqueante novo
- [ ] **Responsivo**: testado em mobile (`max-width: 768px`) e desktop
- [ ] **Movimento reduzido**: respeitado (`prefers-reduced-motion: reduce`)
- [ ] Sem framework / bundler / dependência de build introduzidos
- [ ] Sem CSS / JS inline em `index.html` (exceto `<noscript>` e o UTM script existentes)
- [ ] Workflows de CI verdes (html-validate, link-check, accessibility, Lighthouse)
