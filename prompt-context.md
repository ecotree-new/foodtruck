# 푸드트럭 중앙회 랜딩 페이지 — 작업 컨텍스트

## 프로젝트 개요
한국 세계음식 푸드트럭 중앙회 공식 웹사이트의 프론트엔드 랜딩 페이지.
경로: `/Users/jay/Desktop/foodtruck/`

## 완료된 작업

### 1. 프로젝트 초기화
- `create-next-app@latest`로 Next.js 16 프로젝트 생성 (App Router, TypeScript, Tailwind v4, src/ 디렉토리)
- `framer-motion` 설치 (사이드 메뉴 애니메이션)

### 2. 디자인 시스템 (`src/app/globals.css`)
- Tailwind CSS v4의 `@theme inline` 문법으로 디자인 토큰 정의
- CSS 변수: 브랜드 색상(`#FF6B26` 오렌지), 배경, 텍스트 색상
- 타이포그래피 스케일: display(96/64px) → title(48/40px) → heading(32/24px) → body(20/16px) → label(14px)
- 커스텀 breakpoint `menu: 1120px` (`@custom-variant menu`)
- 컨테이너 유틸리티 `.container-foodtruck` (max-width 1280px, 반응형 패딩)
- ecotree 프로젝트의 `globals.css` 패턴을 참조하여 구축

### 3. 상수 파일 (`src/lib/constants.ts`)
- `NAV_ITEMS`: 5개 메인 메뉴 + 서브메뉴 (중앙회 안내, 푸드트럭 산업, 다회용기, 알림·자료, 문의하기)
- `COMPANY_INFO`: 회사명, 대표, 사업자번호, 전화, 이메일, 주소 (일부 미입력)
- `FOOTER_LINKS`: 서비스 링크(문의하기, 오시는길) + 법적 링크(이용약관, 개인정보처리방침)

### 4. 루트 레이아웃 (`src/app/layout.tsx`)
- `<html lang="ko">`, Pretendard 폰트 CDN 링크
- Header + Footer 컴포넌트 포함
- 메타데이터 설정

### 5. Header 컴포넌트 (`src/components/layout/Header.tsx`)
- **데스크톱(>1120px)**: 고정 헤더(z-50), 로고 좌측 + 네비게이션 우측, hover 시 서브메뉴 드롭다운 표시
- **모바일(≤1120px)**: 로고 + 햄버거 버튼, 클릭 시 오른쪽에서 사이드 메뉴 슬라이드 인 (Framer Motion `AnimatePresence`)
- 모바일 사이드 메뉴: 서브메뉴 chevron 토글, 배경 오버레이(backdrop), body scroll 방지
- 현재 경로 기반 active 상태 표시 (브랜드 색상)
- `menu:` 커스텀 variant로 breakpoint 제어

### 6. Footer 컴포넌트 (`src/components/layout/Footer.tsx`)
- 다크 배경(`#1E1F23`), 로고(brightness-0 invert로 흰색 변환)
- 모바일(<768px): 로고 + 단일 열 정보
- 데스크톱(≥768px): 로고 + 3열 배치 (회사정보 / 연락처+링크 / 법적링크)
- chevron 아이콘 링크 (문의하기, 오시는길)
- 구분선 + Copyright (동적 연도)

### 7. 메인 페이지 (`src/app/page.tsx`)
- 다크 배경 히어로 섹션 (전체 뷰포트 높이)
- "한국 세계음식 **푸드트럭** 중앙회" 타이틀 (브랜드 색상 강조)
- 서브 텍스트 + "문의하기" CTA 버튼

### 8. 로고
- `/Users/jay/Downloads/foodtruck/screenshot/header/logo.svg` → `public/logo.svg`로 복사

## 참조한 프로젝트
- **ecotree** (`/Users/jay/Desktop/ecotree/`): 동일한 기술 스택(Next.js + Tailwind v4 + Framer Motion)의 기존 프로젝트
  - `app/globals.css` → 디자인 시스템 패턴
  - `components/layout/Header.tsx` → 반응형 헤더 패턴
  - `components/layout/Footer.tsx` → 반응형 푸터 패턴
  - `lib/constants.ts` → 상수 구조 패턴
  - `app/layout.tsx` → 레이아웃 패턴

## 남은 작업 (미구현)
- `COMPANY_INFO`의 대표, 사업자번호, 전화, 주소 등 실제 정보 입력
- 각 서브 페이지 구현 (중앙회 안내, 푸드트럭 산업, 다회용기, 알림·자료, 문의하기)
- 히어로 섹션 실제 디자인 (이미지/영상 등)
- OG 이미지, 파비콘 등 메타 에셋
- 스크린샷 기반 디자인 구현 (`/Users/jay/Downloads/foodtruck/screenshot/` 참조)

## 기술적 참고사항
- Tailwind v4는 `@theme inline` 블록 안에 커스텀 테마 변수를 정의
- `@custom-variant`로 커스텀 breakpoint를 Tailwind 클래스로 사용 가능 (예: `menu:flex`)
- ecotree에서는 `lg:` (1024px)를 메뉴 breakpoint로 사용했으나, 푸드트럭은 메뉴 항목이 더 많아 `menu:` (1120px) 사용
- `.env.local` 파일은 .gitignore에 포함됨 (bcrypt 해시의 `$` 문자 이스케이프 주의)
