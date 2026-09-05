# Codeloom

Site for Codeloom, Jones Middle School's Python programming club — club info, the full curriculum, and a self-serve practice area with an in-browser Python IDE and a difficulty-tagged question bank.

Fully static: no accounts, no backend, no database. Python runs client-side via [Pyodide](https://pyodide.org) in a Web Worker.

## Stack

- Vite + React + TypeScript
- Tailwind CSS
- React Router (client-side routing)
- CodeMirror 6 for the code editor
- Pyodide (loaded from CDN) for in-browser Python execution

## Local development

```bash
npm install
npm run dev
```

## Content

Curriculum, the practice problem bank, and the meeting schedule are plain data files — edit these directly, no code changes needed:

- `src/data/curriculum.json`
- `src/data/problems.json`
- `src/data/schedule.json`

## Build & deploy

```bash
npm run build
```

Outputs a static site to `dist/`. Deployed on [Vercel](https://vercel.com) — `vercel.json` rewrites all paths to `index.html` so client-side routes (e.g. `/curriculum/unit-5`) work on direct load and refresh.
