# Hero 섹션 작업 로그

## 담당 섹션
**Hero** — 포트폴리오 최상단 전체화면 소개 섹션

---

## 생성한 파일 목록

| 파일 | 역할 |
|---|---|
| `src/app/components/Hero.tsx` | Hero 섹션 서버 컴포넌트 |
| `src/app/components/Hero.module.css` | Hero 전용 CSS Module (self-contained) |
| `docs/worklog/hero.md` | 이 작업 로그 |

---

## 컴포넌트 인터페이스

```tsx
export default function Hero()   // props 없음, 서버 컴포넌트 ("use client" 없음)
```

---

## 주요 className / 구조

```
<section .hero>
  <div .heroInner>
    <div .langToggle>          ← KOR(active) / ENG 토글 (시각적 전용)
      <span .langBtn .langActive>KOR</span>
      <span .langDivider>/</span>
      <span .langBtn>ENG</span>
    </div>
    <div .heroContent>
      <h1 .mainTitle>
        <span .name>김건우</span>
        <span .slash>/</span>
        <span .handle>Aidengoldkr</span>
      </h1>
      <h3 .subTitle>
        <span .subTitleSide>A </span>Product Builder<span .subTitleSide> in s.Korea</span>
      </h3>
      <div .ctaRow>
        <a .ctaPrimary href="#projects">View Projects</a>
        <a .ctaSecondary href="#elsewhere">Get in touch</a>
      </div>
    </div>
    <div .socials>
      <a .socialLink> GitHub SVG </a>
      <a .socialLink> LinkedIn SVG </a>
      <a .socialLink> Email SVG </a>
    </div>
  </div>
  <div .scrollDown>scroll to detail</div>   ← absolute, float 애니메이션
</section>
```

---

## 스타일 노트

### 색상
| 역할 | 값 |
|---|---|
| 배경 | `#202020` |
| 주 텍스트 | `#f5f5f5` |
| 보조 텍스트 | `#c0c0c0` / `#8d8d8d` |
| 그린 포인트 | `#94f083` |
| 블루 포인트 | `rgb(8, 95, 172)` |

### 타이포그래피
- `.mainTitle` : `clamp(36px, 8vw, 96px)`, `.name` weight 100, `.slash` weight 900 (blue), `.handle` weight 600 (green)
- `.subTitle` : `clamp(14px, 2.5vw, 36px)`
- CTA, 소셜, 랭귀지 토글은 소형 `0.75–0.85rem`

### 애니메이션
- 모든 요소: `fadeInUp` (`opacity 0→1`, `translateY 20px→0`), `cubic-bezier(0.16, 1, 0.3, 1)`
- 딜레이 스태거: langToggle 0s → mainTitle 0.2s → subTitle 0.6s → ctaRow 0.9s → socials 1.1s → scrollDown 1.4s
- scrollDown: 초기 `fadeInUpScroll` (translate(-50%, …) 대응) + 이후 `floatScroll` 무한 반복

### 기타
- `section.hero { min-height: 100vh }` — 직접 설정
- CSS Module은 self-contained (page.module.css 의존 없음)
- keyframes 세 개 모두 Hero.module.css 내부에 복사 정의

---

## 주의사항 / 남은 TODO

- **랭귀지 토글**: 현재 시각적 전용. 실제 KOR/ENG 전환 로직이 필요하면 Client Component로 전환 + `useState` 추가 필요.
- **소셜 href**: 현재 모두 `"#"`. 실제 URL로 교체 필요 (GitHub, LinkedIn 등).
- **CTA href**: `#projects`, `#elsewhere` — 해당 섹션 id가 확정되면 수정.
- **page.tsx 통합**: page.tsx에서 `<Hero />` import 후 기존 `.hero` 섹션과 교체 필요 (다른 에이전트 작업 범위).
