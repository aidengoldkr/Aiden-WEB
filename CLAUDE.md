# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (hot reload)
npm run build    # Production build
npm run start    # Serve the production build (run after build)
npm run lint     # next lint (ESLint)
```

There is no test suite configured.

## Architecture

Single-page personal portfolio for 김건우 / Aidengoldkr, built on **Next.js 14 App Router** with TypeScript and React 18. No external UI/state libraries — styling is plain CSS Modules.

- `src/app/page.tsx` — the entire portfolio page (Server Component). Three stacked `<section>`s: hero, hello/intro, and history. The history section renders **entirely from data** (see below) by `.map()`-ing over arrays.
- `src/app/data/profile.json` — **the content source of truth.** Career/education, awards (grouped by year), experience, and certificates all live here. To update portfolio content, edit this JSON, not the JSX. The shape is consumed directly in `page.tsx`: `career[]` (period/title/description), `awards[]` (year + items[]), `experience[]` (strings), `certificates[]` (strings).
- `src/app/layout.tsx` — root layout; holds all SEO metadata (Open Graph, Twitter card, robots, icons) and viewport config. `metadataBase` and canonical URLs point at `https://aidengoldkr.dev`. `<html lang="ko">`. Content is Korean.
- `src/app/page.module.css` — scoped styles for the page (~500 lines, the bulk of the styling).
- `src/app/globals.css` — global resets, base styles, and dark background (`#202020`). Loads the **Pretendard** webfont via a jsDelivr `@import` (the project does not use `next/font`, despite what the stock README says).
- `src/app/asset/` and `public/` — images. Note `next/image` `src` paths (e.g. `/asset/profile.png`) resolve from `public/`, so static assets referenced at runtime must live under `public/`.

### Conventions

- Import alias `@/*` maps to `./src/*` (see `tsconfig.json`).
- TypeScript `strict` mode is on.
- This is the **canonical project** (`aiden-next-web`). A sibling legacy project `../aiden-web` (Vite/JSX) exists in the parent directory — do not confuse the two; work here unless told otherwise.
