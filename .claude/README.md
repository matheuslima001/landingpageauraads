# .claude/

Skills locais do repositório, descobertas automaticamente por Claude Code quando este projeto é aberto.

## Como funciona

Skills em `.claude/skills/<nome>/SKILL.md` são lidas pelo Claude Code no início da sessão e ficam disponíveis como contexto adicional. Cada SKILL.md tem frontmatter com `name`, `description` e `when_to_use` — esses campos ajudam o agente a decidir quando aplicar a skill.

Skills são **conhecimento contextual do projeto**, não automações. Elas instruem o Claude sobre padrões, decisões e anti-patterns deste codebase específico — coisas que ele não conseguiria inferir só lendo o código.

## Skills disponíveis

| Skill | Quando entra |
|---|---|
| [`aura-design-system`](skills/aura-design-system/SKILL.md) | Qualquer edição visual/copy/marca no projeto |
| [`frontend-design`](skills/frontend-design/SKILL.md) | Decisões de hierarquia visual, tipografia, espaçamento, "premium feel" |
| [`mechanism-diagrams`](skills/mechanism-diagrams/SKILL.md) | Criar/editar diagramas de fluxo (`.flow-diagram`, `.mech-step`) |

## Quando adicionar uma nova skill

- Quando um padrão se repete em 3+ lugares e precisa ser ensinado, não apenas exemplificado.
- Quando uma decisão de produto/marca tem razões não óbvias pelo código.
- Quando uma ferramenta externa (ex.: Claude Design, Lighthouse) tem expectativas específicas sobre o repo.

Skills não devem duplicar o `CLAUDE.md`. O `CLAUDE.md` é o panorama; skills são profundidades específicas.

## Formato

```markdown
---
name: kebab-case-slug
description: Uma frase curta — é o que o agente lê pra decidir relevância.
when_to_use: Condições específicas de ativação.
---

# Título legível

Conteúdo: instruções diretas, exemplos concretos, anti-patterns.
```