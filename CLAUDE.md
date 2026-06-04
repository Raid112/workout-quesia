# CLAUDE.md — workout-quesia

## Project Overview

PWA (Progressive Web App) de treino personalizado para a Quésia. Aplicação 100% client-side, sem backend, sem dependências npm — um único arquivo HTML com CSS e JS embutidos, hospedado no GitHub Pages.

- **Repo**: `https://github.com/Raid112/workout-quesia.git`
- **Deploy**: GitHub Pages em `/workout-quesia/`
- **Idioma da UI**: Português brasileiro

## Development

```bash
# Rodar localmente (qualquer servidor HTTP serve)
cd workout-quesia
python -m http.server 8000
# ou: npx http-server

# Abrir no navegador: http://localhost:8000/
```

Não há build, lint, testes ou package.json. O app é servido diretamente como arquivos estáticos.

## Architecture

**Arquivo único (`index.html`, ~1280 linhas)** contendo HTML + CSS + JS.

### Telas (views navegadas por hash)
- `#home` — Duas abas (`wq_active_tab`): **Academia** (4 dias A-D) e **Flexibilidade** (3 sessões); estatísticas e histórico separados por aba; card de Cardio compartilhado; aba Flex tem card "Sinais de parada"
- `#workout` — Execução da sessão ativa (séries, pesos, timer de descanso); sessões de flex não têm peso/PR/cardio, têm headers "Bloco comum"/"Foco do dia" e botões de hold-timer
- `#settings` — Gerenciamento de dados (export/import/reset)

### Módulos JS (objetos no escopo global)
- `TRAININGS` — 4 dias de academia hardcoded (A Glúteo+Posterior, B Upper, C Glúteo+Quadríceps, D Upper+Core), com `note` opcional por exercício (proteção de joelho: ROM restrita, profundidade)
- `FLEX_SESSIONS` — 3 sessões de flexibilidade (Espaçate Frontal, Espaçate Lateral, Dança Ativa); cada uma = `FLEX_COMMON_BLOCK` (bloco comum) + foco; exercícios com `block`, `hold` (segundos do timer) e `rest: null`
- `Storage` — Persistência via localStorage com keys `wq_*` (`wq_config`, `wq_history`, `wq_flex_history`, `wq_in_progress`, `wq_weights`, `wq_weight_history`, `wq_active_screen`, `wq_active_tab`, `wq_cardio`); migrações de nomes de exercícios em flags `wq_names_v2`/`wq_names_v3`; `getConfig()` faz merge com defaults
- `App` — Lógica principal, navegação, event listeners; `currentWorkout.type` = `'gym' | 'flex'`

### PWA
- `manifest.json` — Config PWA (nome "Treinão da Quesia", tema `#0b0710`, standalone)
- `sw.js` — Service worker com cache `treinao-vN` (bump a cada release), estratégia network-first com fallback

## Code Conventions

- Sem framework — vanilla JS, CSS Grid/Flexbox, CSS custom properties (`--bg-deep`, `--gold`, `--purple`, etc.)
- Estética **dark luxury**: fundo preto-arroxeado `#0b0710`, superfícies roxo profundo, dourado `#d4af37` reservado a ação/conquista (botão primário, stats, PR, sets completos), roxo `#9d7bd8` como suporte
- Fontes: Cormorant Garamond (display/títulos), Inter (body e **todos os números** — `tabular-nums`; Cormorant tem algarismos proporcionais e faria o timer pular de largura)
- Ícones dos treinos e da UI: SVG line-art inline (stroke `currentColor` 1.5px, sem fill), definidos no objeto `ICONS`; cor vem do container (`color: var(--gold)`). Sem emojis decorativos
- Técnicas de exercício: "Rest Pause" e "Isometria" têm highlight visual especial
- PR (personal record) é detectado automaticamente ao registrar pesos
- Timer de descanso com contagem visual e notificação sonora
- Celebração ao completar treino: overlay serifado dourado + partículas abstratas (losangos ouro / pontos roxos) em CSS
