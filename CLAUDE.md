# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `#home` — Seleção de treino, estatísticas, histórico
- `#workout` — Execução do treino ativo (séries, pesos, timer de descanso)
- `#settings` — Gerenciamento de dados (export/import/reset)

### Módulos JS (objetos no escopo global)
- `TRAININGS` — Array com 4 treinos hardcoded (Coxas Completas, Upper, Glúteo, Coxas), cada um com warmup e exercícios com séries/reps/técnica
- `Storage` — Camada de persistência via localStorage com keys prefixadas `wq_*` (`wq_config`, `wq_history`, `wq_in_progress`, `wq_weights`, `wq_weight_history`, `wq_active_screen`)
- `App` — Lógica principal, navegação, event listeners

### PWA
- `manifest.json` — Config PWA (nome "Treinão da Quesia", tema `#2d1b4e`, standalone)
- `sw.js` — Service worker com cache `treinao-v1`, estratégia network-first com fallback

### Assets
- `stickers/` — Imagens PNG 512x512 (estilo chibi/kawaii) usadas como decoração na UI
- `stickers/PROMPT.md` — Prompts de geração das imagens

## Code Conventions

- Sem framework — vanilla JS, CSS Grid/Flexbox, CSS custom properties (`--bg-deep`, `--accent-pink`, etc.)
- Fontes: Quicksand (display), Nunito (body)
- Técnicas de exercício: "Rest Pause" e "Isometria" têm highlight visual especial
- PR (personal record) é detectado automaticamente ao registrar pesos
- Timer de descanso com contagem visual e notificação sonora
- Animações de celebração ao completar treino (confetti + stickers caindo)
