# GPT Text Tokenizer

Tokens is now a sleek React + Vite experience powered by shadcn/ui components. Visualize GPT tokenization in real time and compare how different formats impact token counts – all in the browser.

## Highlights

- **Tokenizer Playground** – Live encoding with the official `cl100k_base` tokenizer, vivid token chips, and running stats for characters and words.
- **Format Comparison Lab** – Paste CSV/JSON/Markdown/TOML, convert them instantly, and see which form is the most token-efficient with a responsive chart.
- **Portfolio-ready landing page** – A modern dark-first homepage with routing between tools, navigation, and theme toggle.
- **Modern UI** – Built with shadcn tabs, cards, badges, scroll areas, and textarea primitives on top of Tailwind CSS.
- **Local-first** – Everything runs client-side; no API keys or servers required, making a future GitHub Pages deploy straightforward.

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- [gpt-tokenizer](https://www.npmjs.com/package/gpt-tokenizer) for exact GPT token math
- [PapaParse](https://www.papaparse.com/) for CSV parsing

## Getting Started

1. **Install dependencies**

   ```bash
   make install
   ```

2. **Start the dev server**

   ```bash
   make dev
   ```

   Vite serves the app at `http://localhost:5173` by default with hot module reload.

3. **Create a production build**

   ```bash
   make build
   ```

4. **Preview the production bundle**

   ```bash
   make preview
   ```

## Project Structure

```
.
├── index.html
├── src
│   ├── components
│   │   ├── format-comparison.tsx
│   │   ├── tokenizer-panel.tsx
│   │   └── ui/… (shadcn primitives)
│   ├── lib
│   │   └── token-helpers.ts
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── tsconfig*.json
├── vite.config.ts
└── Makefile
```

## Commands

| Command        | Description                            |
| -------------- | -------------------------------------- |
| `make install` | Install dependencies with Bun          |
| `make dev`     | Run Vite dev server                    |
| `make build`   | Type-check and create production build |
| `make preview` | Preview the `dist/` output locally     |
| `make clean`   | Remove the `dist/` directory           |

## Deploy to GitHub Pages

### Quick push via CLI

1. Ensure `git remote` is set and Pages is configured for the `gh-pages` branch.
2. Build & publish:

   ```bash
   bun run deploy
   ```

   This runs the production build, duplicates `dist/index.html` as `dist/404.html` for SPA routing, and pushes `dist/` to the `gh-pages` branch using the [gh-pages](https://github.com/tschaub/gh-pages) helper.

### Continuous deployment via GitHub Actions

The repo includes `.github/workflows/deploy.yml` which builds on every push to `main` and deploys to GitHub Pages automatically. Enable Pages → Source: “GitHub Actions” in the repository settings.

### Base path configuration

When hosting at `https://<user>.github.io/<repo>/`, Vite and React Router must both know the sub-path. This project defaults to `/tokens-codex/` (the current repo). If your repository name changes, override it:

```bash
VITE_BASE_PATH=/your-repo-name/ bun run build
```

The `deploy` script respects `VITE_BASE_PATH`, and the router automatically aligns with `import.meta.env.BASE_URL`.

## Deploying

The build output lives in `dist/` and is a static bundle, so publishing to GitHub Pages is as simple as uploading that folder (e.g., via `gh-pages` or GitHub Actions) whenever you are ready.

## License

MIT
