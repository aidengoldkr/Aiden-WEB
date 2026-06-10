# Hello 섹션 작업 로그

## 담당 섹션
`Hello` — 자기소개(Self-Introduction) 섹션

---

## 생성한 파일 목록

| 파일 | 설명 |
|------|------|
| `src/app/components/Hello.tsx` | Hello 섹션 서버 컴포넌트 |
| `src/app/components/Hello.module.css` | Hello 섹션 전용 CSS Module |
| `src/app/data/intro.json` | 섹션 데이터 (소개문, 태그, 통계) |
| `docs/worklog/hello.md` | 본 작업 로그 |

---

## intro.json 데이터 구조 (스키마)

```json
{
  "greeting": "string",           // 인사 문구 (e.g. "Hello World! 👋")
  "headline": "string",           // 핵심 한 줄 소개 (Korean)
  "description": "string",        // HTML 허용 본문 (strong 태그 포함 가능)
  "tags": ["string"],             // 태그 칩 배열
  "stats": [
    { "value": "string", "label": "string" }  // 통계 항목 배열
  ]
}
```

---

## 컴포넌트 인터페이스

```tsx
export default function Hello()   // props 없음, Server Component
```

- import: `Image` (next/image), `styles` (Hello.module.css), `introData` (../data/intro.json)
- 루트 요소: `<section className={styles.hello}>`

---

## 주요 className / 구조

```
section.hello
  └── div.helloContent
        ├── div.profileWrapper          // 그라디언트 테두리 래퍼
        │     └── Image.profileImage    // next/image, 240×240, priority
        └── div.helloDetails
              ├── h2.helloWorld         // introData.greeting
              ├── p.helloHeadline       // introData.headline
              ├── p.helloDescription    // introData.description (dangerouslySetInnerHTML)
              ├── div.tagList
              │     └── span.tagChip × N   // introData.tags.map(...)
              └── div.statsList
                    └── div.statItem × N   // introData.stats.map(...)
                          ├── span.statValue
                          └── span.statLabel
```

---

## 스타일 노트

| 항목 | 값 |
|------|----|
| 배경 | `linear-gradient(180deg, #202020 0%, #151515 100%)` |
| 프로필 그라디언트 보더 | `linear-gradient(135deg, #94f083 0%, #085fac 100%)`, padding 3px |
| 프로필 border-radius | wrapper 32px / image 29px |
| 액센트 색상 (green) | `#94f083` |
| 액센트 색상 (blue) | `#085fac` |
| 기본 텍스트 | `#f5f5f5` |
| 설명 텍스트 | `#c0c0c0` |
| 보조 텍스트 | `#a0a0a0` / `#8d8d8d` |
| 태그 칩 | border 1px rgba(94f083, 0.35), bg rgba(94f083, 0.06), hover 강조 |
| 반응형 breakpoint | 1024px (tablet), 768px (mobile) |
| 모바일 레이아웃 | flex-direction: column, align-items: center, text-align: center |

---

## 주의사항 / TODO

- `description` 필드에 `<strong>` 태그가 포함되어 `dangerouslySetInnerHTML`을 사용.
  - 데이터는 내부 JSON이므로 XSS 위험 없음. 외부 입력 시 sanitize 필요.
- `page.tsx`의 기존 `.hello` 섹션과 역할이 중복될 수 있음.
  - 통합 시 `page.tsx`의 인라인 hello 블록을 `<Hello />` 컴포넌트로 교체 권장.
- `/asset/profile.png` 이미지가 `public/asset/` 경로에 실제로 존재해야 함.
- `min-height: 100vh`로 설정되어 있음. 페이지 전체 높이 조율 필요 시 조정.
