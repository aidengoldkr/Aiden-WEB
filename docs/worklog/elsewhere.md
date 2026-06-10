# Worklog — Elsewhere Section

## 담당 섹션
ELSEWHERE — 외부 링크 섹션 (GitHub, Tech Blog, LinkedIn)

## 생성한 파일 목록
- `src/app/components/Elsewhere.tsx` — 서버 컴포넌트
- `src/app/components/Elsewhere.module.css` — CSS Modules 스타일
- `src/app/data/social.json` — 링크 데이터

## social.json 스키마
```json
[
  {
    "label": string,   // 표시 이름 (예: "GitHub")
    "action": string,  // 행동 설명 문구 (예: "View development logs")
    "url": string      // 실제 URL 또는 "#" (플레이스홀더)
  }
]
```

## 컴포넌트 인터페이스
```tsx
export default function Elsewhere()
// props 없음 — NO "use client" — 서버 컴포넌트
```
- `import styles from "./Elsewhere.module.css"`
- `import socialData from "../data/social.json"`
- 루트 엘리먼트: `<section className={styles.elsewhere} id="elsewhere">`
- Hero CTA에서 `href="#elsewhere"` 로 스크롤 링크 가능

## 주요 className / 구조
```
<section.elsewhere#elsewhere>
  <div.elsewhereContent>
    <h3.groupTitle>ELSEWHERE</h3>
    <div.linkGrid>
      <a.linkCard href={item.url}>          ← map((item, index))
        <div.linkIcon> [inline SVG] </div>
        <div.linkBody>
          <span.linkLabel>{item.label}</span>
          <span.linkAction>{item.action}</span>
        </div>
        <div.linkArrow> [arrow SVG] </div>
      </a>
    </div>
  </div>
</section>
```

## 스타일 노트
- `page.module.css`의 `.groupTitle` / `.focusCard` 패턴을 그대로 미러링
- 배경 색상: `#202020` (섹션), `rgba(255,255,255,0.02)` (카드)
- 텍스트: `#f5f5f5` (label), `#8d8d8d` (action/muted)
- 그린 액센트: `#94f083`
- Hover: `translateY(-6px)` + `border-color: rgba(148,240,131,0.35)`
- Transition: `cubic-bezier(0.16, 1, 0.3, 1)` — 기존 페이지와 동일
- 아이콘: inline SVG (외부 라이브러리 없음)
- 반응형: `@media (max-width: 900px)` → 1열 그리드, `@media (max-width: 768px)` → 패딩 축소

## TODO
- **Tech Blog url**: 현재 `"#"` 플레이스홀더 — 블로그 개설 후 실제 URL로 교체 필요
- **LinkedIn url**: 현재 `"#"` 플레이스홀더 — LinkedIn 프로필 URL로 교체 필요
