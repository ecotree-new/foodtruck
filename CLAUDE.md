# 한국 세계음식 푸드트럭 중앙회 - 랜딩 페이지

## 기술 스택
- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (`@theme inline` 문법, `@custom-variant`)
- **Font**: Pretendard (CDN)
- **Animation**: Framer Motion (모바일 사이드 메뉴)
- **Package Manager**: npm

## 프로젝트 구조

```
src/
├── app/
│   ├── globals.css          # 디자인 시스템 (CSS 변수, Tailwind 테마, 컨테이너)
│   ├── layout.tsx           # 루트 레이아웃 (Pretendard, Header, Footer)
│   └── page.tsx             # 메인 페이지 (히어로 섹션)
├── components/
│   └── layout/
│       ├── Header.tsx       # 반응형 헤더 (데스크톱 nav + 모바일 사이드메뉴)
│       └── Footer.tsx       # 반응형 푸터 (다크 배경, 회사 정보)
└── lib/
    └── constants.ts         # NAV_ITEMS, COMPANY_INFO, FOOTER_LINKS
public/
└── logo.svg                 # 로고
```

## 디자인 시스템

### 색상
- **Brand**: `--brand-primary: #FF6B26` (오렌지), `--brand-soft: #FFC4A9`
- **배경**: `--bg-default: #242527` (다크), `--bg-inverse: #FBFBFB` (라이트)
- **텍스트**: `--text-primary: #FFFFFF`, `--text-inverse: #111111`, `--text-subtle: #898DA1`

### 반응형 Breakpoints
- `sm: 360px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1920px`
- **커스텀**: `menu: 1120px` — 네비게이션 전환 기준 (`@custom-variant menu`)

### 컨테이너
- `.container-foodtruck` — max-width 1280px, 모바일 24px / 태블릿 48px / 데스크톱 0px 패딩

## 주요 패턴

### Header (1120px 기준)
- **데스크톱(>1120px)**: 고정 헤더, hover 시 서브메뉴 드롭다운
- **모바일(≤1120px)**: 햄버거 → 오른쪽 슬라이드 사이드 메뉴, chevron 토글 서브메뉴, backdrop 오버레이, body scroll 방지

### Footer
- 다크 배경(`#1E1F23`), 로고 `brightness-0 invert`로 흰색 변환
- 모바일: 2열 (로고 + 정보), 데스크톱: 로고 + 3열 정보

### Tailwind v4 커스텀 variant 사용법
```css
@custom-variant menu (@media (min-width: 1120px));
```
→ `hidden menu:flex`, `menu:hidden` 패턴으로 사용

## 참고
- ecotree 프로젝트(`/Users/jay/Desktop/ecotree/`)의 디자인 패턴을 참조하여 구축
- `COMPANY_INFO`의 대표, 사업자번호, 전화, 주소 등은 추후 채워야 함

## 명령어
- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint
