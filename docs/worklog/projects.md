# Projects 섹션 작업 로그

## 담당 섹션
Selected Projects — 대표 프로젝트 쇼케이스 (page.tsx의 4번 섹션)

> **2026-06-10 전면 리디자인:** 기존 2×2 카드 그리드 → **가로 스크롤형 sticky 쇼케이스**로 교체.
> 데이터 구조(`projects.json`)는 그대로 유지하고 렌더링 컴포넌트 + 스타일만 교체. 상세는 아래 "리디자인" 섹션 참고.

---

## 생성한 파일 목록

| 파일 경로 | 역할 |
|---|---|
| `src/app/components/Projects.tsx` | 섹션 컴포넌트 (**Client Component** — 스크롤 연동) |
| `src/app/components/Projects.module.css` | 컴포넌트 전용 CSS Module |
| `src/app/data/projects.json` | 프로젝트 데이터 (JSON-driven, 구조 불변) |
| `src/app/projects/page.tsx` + `page.module.css` | "View All Projects" CTA 대상 `/projects` 라우트 (플레이스홀더) |
| `docs/worklog/projects.md` | 본 작업 로그 |

---

## projects.json 스키마

```ts
interface Project {
  name: string;          // 프로젝트명
  tagline: string;       // 한 줄 정의 (한국어)
  description: string;  // 짧은 설명 — 문제 해결 중심
  tags: string[];        // 기술 태그 배열
  link?: string;         // 프로젝트 링크 (optional, 현재 "#")
}
```

### 현재 등록된 프로젝트

- **ToDit** — 작업 기록 관리 서비스
- **inPaser** — AI 기반 텍스트 파싱/분류 서비스
- **ON-Alim** — 알림 통합 서비스 (AI·SW 마에스트로 17기)
- **Dankook Racing** — 레이싱팀 차량 데이터 모니터링 시스템

---

## 컴포넌트 인터페이스

```tsx
// Props 없음 — 데이터는 projects.json에서 직접 import
export default function Projects(): JSX.Element
```

- Server Component (`"use client"` 없음)
- `import styles from "./Projects.module.css"`
- `import projectsData from "../data/projects.json"`
- Root element: `<section className={styles.projects} id="projects">`

---

## 주요 className / 구조

```
section.projects
  div.projectsInner
    h3.groupTitle          ← "SELECTED PROJECTS" (::before green dash)
    div.projectsGrid       ← CSS Grid 2col desktop / 1col mobile
      a.projectCard        ← map over projectsData, key={index}
        div.cardHeader
          h4.projectName
          span.arrowIcon   ← "↗", hover 시 이동 + opacity 1
        p.projectTagline   ← green (#94f083)
        p.projectDescription
        div.tagList
          span.tag         ← map over p.tags
```

---

## 스타일 노트

### page.module.css에서 재사용한 패턴
- `.focusCard` 카드 미학 그대로 계승: `rgba(255,255,255,0.02)` bg, `1px solid rgba(255,255,255,0.05)` border, `border-radius: 20px`
- Hover: `translateY(-8px)` + green border (`rgba(148,240,131,0.3)`)
- `transition: cubic-bezier(0.16, 1, 0.3, 1)` — 기존 페이지와 동일한 easing
- `.groupTitle` + `::before` 초록 대시 — `page.module.css`와 동일한 스펙으로 재구현

### 배경 / 컬러
- 섹션 배경: `#202020` (hero와 동일, history는 `#151515`)
- 텍스트: `#f5f5f5` (이름), `#94f083` (tagline/포인트), `#a0a0a0` (설명), `#c0c0c0` (태그)
- 태그 칩: `rgba(255,255,255,0.05)` bg + `rgba(255,255,255,0.1)` border

### 반응형
- `@media (max-width: 1024px)`: 1열 그리드
- `@media (max-width: 768px)`: 패딩 축소, 카드 패딩 축소, 글씨 크기 조정

### 의도적으로 배제한 것 (plan.md 방향성 준수)
- 그라데이션 배경 없음
- 박스 섀도우 없음 (과한 그림자 금지)
- 글래스모피즘 효과 없음
- 과한 애니메이션 없음 — translateY(-8px) + border-color 변경만

---

## TODO

> **실제 프로젝트 설명/링크가 플레이스홀더입니다.**
>
> `src/app/data/projects.json`의 모든 항목에서:
> - `description` / `tagline`: 실제 문구로 교체·다듬기
> - `tags`: 실제 사용 스택으로 검증
> - 각 프로젝트 대표 이미지가 생기면 우측 abstract preview를 실제 이미지로 교체 가능
>
> `/projects` 라우트는 데이터 기반 단순 리스트의 **플레이스홀더 페이지**입니다.

---

## 리디자인 (2026-06-10) — 가로 스크롤 sticky 쇼케이스

### 동작 방식
- 섹션이 **뷰포트보다 세로로 긴** 높이를 가짐(JS가 `innerHeight + 가로이동량`으로 계산).
- 내부 `.sticky` 컨테이너가 `position: sticky; top: 0; height: 100vh; overflow: hidden`로 **화면에 고정(pin)**.
- 세로 스크롤량을 `window.scrollY - sectionTop`으로 읽어 `.track`을 **가로 `translate3d`** — 1:1 매핑으로 자연스러운 속도.
- 섹션 끝(가로 이동 완료) 후 sticky 해제 → 다음 섹션으로 일반 세로 스크롤 복귀.
- **Framer Motion 미설치** → 순수 CSS sticky + 스크롤 리스너(`useEffect`) 방식으로 구현.

### ⚠️ 중요: page.module.css `.page` overflow 제거
- `position: sticky`는 조상 요소에 `overflow`가 `visible`이 아니면(=`overflow-x: hidden`만 있어도) 그 조상이 스크롤 컨테이너가 되어 **뷰포트 기준 고정이 깨짐**.
- 따라서 `src/app/page.module.css`의 `.page`에서 `overflow-x: hidden; overflow-y: auto;` **제거**.
- 가로 오버플로(트랙)는 `.sticky { overflow: hidden }`이 직접 클리핑하므로 가로 스크롤바는 생기지 않음.

### 레이아웃
```
section.projects            ← JS가 height 지정(데스크탑) / auto(모바일)
  div.sticky                ← 100vh 고정, overflow hidden
    div.header              ← 라벨 + 큰 제목 + 짧은 설명 (상단 고정)
    div.trackViewport       ← 카드 세로 중앙 정렬
      div.track             ← inline transform: translate3d(x,0,0)
        article.card × 4    ← 70vw / 58vh, 좌측 텍스트 + 우측 abstract preview
          span.cardNumber   ← 01·02·03 큰 번호, 연한 워터마크
        a.ctaCard           ← "View All Projects →" → <Link href="/projects">
```

### 카드 디자인
- 너비 `70vw`(max 1040px), 높이 `58vh`(min 420px), 테두리 `1px solid rgba(255,255,255,0.08)`.
- 좌측: 프로젝트명(크게) / tagline(초록 `#94f083`) / 설명(회색 `#a0a0a0`) / 태그 pill.
- 우측 `.cardPreview`: 이미지가 없으므로 index별 **abstract preview 4종** — 코드 패널 / 라인 그래프(SVG) / 그리드 도트 / 바.
- hover: `translateY(-6px)` + border 색상만 변경(과한 효과 없음).

### 모바일 (`max-width: 768px`)
- sticky/translate 해제 → **세로 카드 리스트** fallback. 카드 `flex-direction: column`, 높이 auto, 미리보기 하단 배치.

### 검증
- `npm run build` 통과. `/projects` 정적 생성 확인. `/`는 클라이언트 컴포넌트화로 번들 소폭 증가(6.5kB → 9kB).
