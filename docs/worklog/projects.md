# Projects 섹션 작업 로그

## 담당 섹션
Selected Projects — 대표 프로젝트 카드 그리드 섹션 (page.tsx의 4번 섹션)

---

## 생성한 파일 목록

| 파일 경로 | 역할 |
|---|---|
| `src/app/components/Projects.tsx` | 섹션 컴포넌트 (Server Component) |
| `src/app/components/Projects.module.css` | 컴포넌트 전용 CSS Module |
| `src/app/data/projects.json` | 프로젝트 데이터 (JSON-driven) |
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
> - `description`: 실제 프로젝트 소개 문구로 교체 필요
> - `tagline`: 실제 한 줄 정의로 다듬기 필요
> - `link`: 실제 프로젝트 URL 또는 GitHub 링크로 교체 필요 (현재 모두 `"#"`)
> - `tags`: 실제 사용 스택으로 검증 및 수정 필요
