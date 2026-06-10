# Journey Section — Work Log

## 담당 섹션
JOURNEY — 수직 타임라인, 성장 흐름 중심

## 생성한 파일 목록
- `src/app/components/Journey.tsx` — 섹션 컴포넌트
- `src/app/components/Journey.module.css` — 자체 스타일 모듈
- `src/app/data/journey.json` — 타임라인 데이터
- `docs/worklog/journey.md` — 이 파일

## journey.json 스키마
```ts
type JourneyItem = {
  year: string;        // "2020" | "2023" | "2025" | "2026 ~ 현재"
  title: string;       // 기관/프로그램 명칭
  description: string; // 활동 내용 및 성장 포인트 (1-2 문장)
};

type JourneyData = JourneyItem[];
```

### 실제 데이터 항목 (4건)
| year | title |
|------|-------|
| 2020 | 구리·남양주교육지원청 도농발명교육센터 |
| 2023 | KAIST IP 영재기업인교육원 |
| 2025 | 단국대학교부속소프트웨어고등학교 입학 |
| 2026 ~ 현재 | AI·SW Maestro 17기 |

## 컴포넌트 인터페이스
```tsx
// props 없음 — SERVER component
export default function Journey(): JSX.Element
```
- `"use client"` 없음 (서버 컴포넌트)
- 데이터는 `import journeyData from "../data/journey.json"` 정적 임포트

## 주요 className / 구조
```
<section.journey>
  <div.journeyContent>
    <h3.groupTitle>JOURNEY</h3>
    <div.timeline>
      {journeyData.map((item, index) =>
        <div.timelineItem key={index}>
          <div.timelinePoint />          ← 초록 원형 노드
          <div.timelineBody>
            <span.timelinePeriod>       ← 연도
            <h4.timelineTitle>          ← 기관명
            <p.timelineDesc>            ← 설명
          </div>
        </div>
      )}
    </div>
  </div>
</section>
```

## 스타일 노트
- 배경: `#151515` — page.module.css `.history` 섹션과 동일
- 텍스트: `#f5f5f5` (제목) / `#c0c0c0` (설명) / `#9b9b9b` (연도) / `#b0b0b0` (섹션 레이블)
- 포인트 색상: `#94f083` (그린 액센트), `box-shadow: 0 0 10px rgba(148,240,131,0.3)` 글로우
- `.groupTitle::before`: 16×2px 그린 대시 — page.module.css와 동일 패턴
- `.timeline`: `border-left: 1px solid rgba(255,255,255,0.1)` 수직선
- hover: `.timelinePoint` → `scale(1.25)` + `background-color: #94f083`
- 최대 폭: `max-width: 800px`, 수직 패딩 `120px`
- 반응형: `@media (max-width: 768px)` — 패딩 축소, 폰트 크기 축소

## 주의사항 / TODO
- `page.tsx`는 수정하지 않았음. 이 컴포넌트를 page.tsx에 추가하려면 별도 작업 필요
- journey.json 경로: `src/app/data/journey.json` (profile.json과 동일 디렉토리)
- CSS 모듈은 page.module.css를 import하지 않고 Journey.module.css에 자체 복사/적용
- 추후 Intersection Observer 기반 scroll-in 애니메이션 추가 고려 (현재는 "use client" 없이 서버 컴포넌트 유지)
