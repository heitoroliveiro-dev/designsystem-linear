# 09 · Governança

## Fonte da verdade

| Assunto | Fonte | Gerados (não editar) |
|---|---|---|
| Cores, tipografia, raio, movimento | `tokens/**/*.tokens.json`, `tokens/theme.config.json` | `src/styles/tokens.css`, `src/styles/theme.css`, `tokens/build/*`, `tokens/primitives/color.*.tokens.json` |
| Componentes | `src/components/ui` | — |
| Regras | `docs/` + `AGENTS.md` | — |

## Fluxo de mudança

1. Branch: `feat/…`, `fix/…`, `tokens/…`.
2. Altere a fonte e rode `npm run check` (tokens + typecheck + lint).
3. Atualize o exemplo em `src/app/**` e o guia em `docs/`.
4. Registre no `CHANGELOG.md`.
5. PR: a CI roda `tokens:check` (arquivos gerados em dia), typecheck, lint e build.

## Versionamento (SemVer)

| Mudança | Versão |
|---|---|
| Remover/renomear token ou prop, mudar o significado de uma variante | **major** |
| Novo componente, variante, token | **minor** |
| Ajuste visual sem mudança de API, correção de bug | **patch** |

Ajustar valores de cor também é **patch**, desde que o contraste continue passando.

## Critérios para um novo componente

Entra no sistema se for usado em **≥ 2 contextos**, não tiver regra de negócio e seguir o checklist de [06-componentes](06-componentes.md#checklist-de-um-novo-componente). Caso contrário, fica no projeto.

## Convenções de commit

[Conventional Commits](https://www.conventionalcommits.org/): `feat(button): adiciona size xs`, `fix(tokens): contraste de subtle-foreground`, `docs: …`, `chore: …`.
