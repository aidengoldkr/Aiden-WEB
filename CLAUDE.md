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

Personal portfolio for 김건우 / Aidengoldkr (Kunwoo Kim), built on **Next.js 14 App Router** with TypeScript and React 18. No external UI/state/i18n libraries — styling is plain CSS Modules, internationalization is hand-rolled via React Context.

### Pages (routes)

- `src/app/page.tsx` — home. A thin Server Component that just composes section components (`Hero`, `Hello`, `Journey`, `Projects`, `Elsewhere`, `Footer`) plus three global overlay widgets (`LangToggle`, `SideNav`, `ScrollReveal`). All real markup lives in the components.
- `src/app/projects/page.tsx` — `/projects`, a full list of every project (the home `Projects` section only shows selected ones and links here via an "ALL WORKS" CTA).
- `src/app/layout.tsx` — root layout. Holds all SEO metadata (Open Graph, Twitter card, robots, icons) and viewport config; `metadataBase`/canonical point at `https://aidengoldkr.dev`; `<html lang="ko">`. **Wraps everything in `<LanguageProvider>`** — this is what makes the language context available app-wide. Per-route metadata (e.g. the Projects title) lives in nested layouts like `src/app/projects/layout.tsx`.

### Internationalization (KO / EN)

This is the single most important pattern to understand before editing any component.

- `src/app/context/LanguageContext.tsx` — `LanguageProvider` + `useLanguage()`. Language is `"ko" | "en"`, defaults to `"ko"`, and is persisted to `localStorage` under `preferred_language`.
- `src/app/components/widgets/LangToggle.tsx` — the KOR | ENG switch (fixed top bar) that calls `setLanguage`.
- **Any component that renders user-facing text is a Client Component (`'use client'`)** so it can call `useLanguage()`. Components pick their data with the idiom:
  ```ts
  const data = language === "ko" ? dataKo : dataEn;
  ```
- **Content data is paired JSON: `foo.json` (Korean) and `foo_en.json` (English).** They must share the same shape. When you add/remove a field or list item, edit *both* files or the EN view breaks. Short inline strings (e.g. a "Back"/"이전으로" label) are sometimes ternaried directly in the component instead of living in JSON.

### Content data (`src/app/data/`) — the source of truth

To change portfolio content, edit JSON, not JSX. Each file (and its `_en` twin) is consumed directly by the matching component:

- `profile.json` — `awards[]` (`{ year, items[] }`), `experience[]` (strings), `certificates[]` (strings). Rendered in the "MORE RECORDS" block of `Journey`.
- `journey.json` — the timeline: array of `{ year, summary, records[] }`, each record `{ label, items[] }`. `Journey` sorts these by the digits in `year` and maps the first four to fixed phase labels (Idea / Business / Product / Execution), so **order and count of timeline entries matter**.
- `intro.json` — `Hello` section: `{ greeting, headline, description, tags[], stats[] }`. `description` is injected with `dangerouslySetInnerHTML`, so it may contain HTML.
- `projects.json` — array of `{ name, tagline, description, tags[] }`. Used by both the home `Projects` section and the `/projects` page.
- `social.json` — `Elsewhere` (CONTACT) cards: array of `{ label, url, action }`. The **platform icon/style is derived from `label`** (case-insensitive substring match in `Elsewhere.tsx`'s `getPlatform`: soomgo / tech blog / linkedin / instagram / github → else gmail). A `url` of `"#"` is treated as "no link" (no `target=_blank`).

### Scroll-reveal animation system

Entrance animations are driven by **data attributes**, not per-component logic. `src/app/components/widgets/ScrollReveal.tsx` is a single mount-once client component that `IntersectionObserver`s every `[data-reveal]` element and toggles the `is-visible` class (defined in `globals.css`). It respects `prefers-reduced-motion` (reveals everything immediately).

Authoring attributes on any element:
- `data-reveal` (or `data-reveal="card" | "soft"`) — mark as animated.
- `data-reveal-delay="120"` — stagger in ms (commonly `String(index * N)` in a `.map`).
- `data-reveal-trigger="high"` — fire later (deeper into viewport).
- `data-reveal-source="key"` + `data-reveal-after="key"` — chain: the `after` element reveals when the `source` element scrolls into view (used so the achievements block follows the timeline).

### Other notable components

- `components/Projects.tsx` — the home projects section uses a **pinned horizontal-scroll** effect on desktop: it inflates its own section height and translates a track on scroll, measured from real `scrollWidth` via `ResizeObserver`. On mobile (`≤768px`) it falls back to a plain vertical list. Cards without a real image render an abstract `Preview` (4 variants chosen by index).
- `components/widgets/SideNav.tsx` — scroll-spy dot nav; its `SECTIONS` ids (`hero`, `hello`, `journey`, `projects`, `elsewhere`) **must match the `id=` on the corresponding `<section>`s**.

### Styling & assets

- One CSS Module per component (`Foo.module.css` next to `Foo.tsx`); home and projects pages each have a `page.module.css`.
- `src/app/globals.css` — global resets, dark background (`#202020`), the `.is-visible` reveal transitions, and the **Pretendard** webfont via a jsDelivr `@import` (the project does **not** use `next/font`, despite the stock README).
- Images: `next/image` `src` paths like `/asset/...` resolve from `public/`, so runtime-referenced static assets must live under `public/`. Images imported directly into a component (e.g. `import soomgoImg from "../asset/soomgo.jpg"`) may live under `src/app/asset/`.

### Conventions

- Import alias `@/*` maps to `./src/*` (`tsconfig.json`). TypeScript `strict` is on.
- This is the **canonical project** (`aiden-next-web`). A sibling legacy project `../aiden-web` (Vite/JSX) exists in the parent directory — do not confuse the two; work here unless told otherwise.
