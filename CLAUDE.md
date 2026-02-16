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
│       ├── Header.tsx       # 반응형 헤더 (메가 메뉴 + 모바일 사이드메뉴)
│       └── Footer.tsx       # 반응형 푸터 (3단계 반응형)
└── lib/
    └── constants.ts         # NAV_ITEMS, COMPANY_INFO, FOOTER_LINKS
public/
└── logo.svg                 # 로고
```

## 디자인 시스템

### 색상
- **Brand**: `--brand-primary: #FF6B26` (오렌지), `--brand-soft: #FFC4A9`
- **배경**: `--bg-default: #242527` (헤더/다크), `--bg-raised: #37383C` (푸터), `--bg-inverse: #FBFBFB` (라이트)
- **텍스트**: `--text-primary: #FFFFFF`, `--text-inverse: #111111`, `--text-subtle: #898DA1`
- **푸터 정보**: `#CACACA` (회사정보/연락처), `#898DA1` (구분선/Copyright)

### 반응형 Breakpoints
- `sm: 360px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1920px`
- **커스텀**: `menu: 1120px` — 네비게이션 전환 기준 (`@custom-variant menu`)

### 컨테이너
- `.container-foodtruck` — max-width 1280px, 모바일 24px / 태블릿 48px / 데스크톱 0px 패딩

## 주요 패턴

### Header (1120px 기준)
- **데스크톱(>1120px)**: 다크 배경(`#242527`), 흰색 텍스트(Body2), 메뉴 간격 80px(`gap-20`)
- **메가 메뉴**: hover 시 전체 폭 패널, 서브메뉴가 부모 nav 항목 아래에 absolute로 정렬, 오렌지 하단 바 인디케이터
- **모바일(≤1120px)**: 다크 배경 사이드 메뉴(헤더 바로 아래 `top-16`), backdrop 없음, chevron 토글 서브메뉴, body scroll 방지
- **버튼 정렬**: 햄버거/X/chevron 아이콘 우측 정렬 통일 (`pr-0`으로 우측 패딩 제거)

### Footer (`#37383C` 배경)
- 3단계 반응형:
  - **Desktop(>=1024px)**: 로고 왼쪽 | 회사정보+연락처 2열 오른쪽
  - **Tablet(768~1024px)**: 로고 상단, 회사정보+연락처 2열 하단
  - **Mobile(<768px)**: 로고 왼쪽 + 정보 전부 오른쪽 단일 컬럼
- 텍스트 `font-medium`, 문의하기/오시는길만 `font-bold`
- 구분선↔Copyright 간격: 모바일 12px / 데스크톱 24px

### Tailwind v4 커스텀 variant 사용법
```css
@custom-variant menu (@media (min-width: 1120px));
```
→ `hidden menu:flex`, `menu:hidden` 패턴으로 사용

## 회사 정보
- 회사명: 세계음식 한국 푸드트럭 중앙회
- 대표이사: 김은화
- 사업자등록번호: 680-06-04008
- 대표 전화: 1688-8695
- 이메일: donfoorock@naver.com
- 주소: 경기도 안성시 대덕면 소현리 10

## 참고
- ecotree 프로젝트(`/Users/jay/Desktop/ecotree/`)의 디자인 패턴을 참조하여 구축
- 디자인 스크린샷: `/Users/jay/Downloads/foodtruck/screenshot/`

## 명령어
- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint
