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
- CSS 변수: 브랜드 색상(`#FF6B26` 오렌지), 배경(`#242527` 다크, `#37383C` raised, `#FBFBFB` 라이트), 텍스트 색상
- 타이포그래피 스케일: display(96/64px) → title(48/40px) → heading(32/24px) → body(20/16px) → label(14px)
- 커스텀 breakpoint `menu: 1120px` (`@custom-variant menu`)
- 컨테이너 유틸리티 2종:
  - `.container-foodtruck` — Header, Footer, 메인 페이지용 (max 1280px, min 672px, 패딩 24px/48px/0px @1376px)
  - `.container-content` — 서브 페이지용 (max 1110px, min 688px, 패딩 24px/40px/0px @1190px)
- ecotree 프로젝트의 `globals.css` 패턴을 참조하여 구축

### 3. 상수 파일 (`src/lib/constants.ts`)
- `NAV_ITEMS`: 5개 메인 메뉴 + 서브메뉴 (중앙회 안내, 푸드트럭 산업, 다회용기, 알림·자료, 문의하기)
- `COMPANY_INFO`: 회사명(세계음식 한국 푸드트럭 중앙회), 대표(김은화), 사업자번호(680-06-04008), 전화(1688-8695), 이메일, 주소
- `FOOTER_LINKS`: 서비스 링크(문의하기, 오시는길) + 법적 링크(이용약관, 개인정보처리방침)

### 4. 루트 레이아웃 (`src/app/layout.tsx`)
- `<html lang="ko">`, Pretendard 폰트 CDN 링크
- Header + Footer 컴포넌트 포함
- 메타데이터 설정

### 5. Header 컴포넌트 (`src/components/layout/Header.tsx`)
- **데스크톱(>1120px)**:
  - 다크 배경(`bg-bg-default`, `#242527`), 흰색 텍스트(`text-text-primary`)
  - 로고 좌측 + 네비게이션 우측, 메뉴 간격 80px(`gap-20`), 텍스트 크기 Body2(`text-body-2`)
  - **메가 메뉴**: hover 시 전체 폭 패널이 열림. 서브메뉴 컬럼이 각 부모 nav 항목 아래에 absolute로 정확히 정렬
  - hover된 메뉴에 오렌지색 하단 바(3px) 인디케이터 표시
  - 메가 메뉴 배경은 별도 absolute 레이어(`z-0`)로 전체 폭 커버, 헤더는 `z-10`
- **모바일(≤1120px)**:
  - 햄버거 버튼 클릭 시 다크 배경 사이드 메뉴가 헤더 바로 아래(`top-16`)에서 슬라이드 인
  - backdrop/dimmed 없음
  - X 닫기 버튼 우측 상단, 메뉴 항목은 chevron 토글로 서브메뉴 펼침/접기
  - 패딩: 모바일 24px(`px-6`), 태블릿 48px(`md:px-12`) — container-foodtruck과 동일
  - 햄버거/X/chevron 아이콘 우측 정렬 통일 (버튼 `pr-0`으로 우측 패딩 제거)
  - body scroll 방지

### 6. Footer 컴포넌트 (`src/components/layout/Footer.tsx`)
- 배경색 `#37383C` (`bg-bg-raised`)
- 3단계 반응형:
  - **Desktop(>=1024px)**: 로고(`brightness-0 invert`) 왼쪽 | 회사정보+연락처 2열 오른쪽 (`justify-between`)
  - **Tablet(768~1024px)**: 로고 상단, 회사정보+연락처 2열 하단
  - **Mobile(<768px)**: 로고 왼쪽 + 정보 전부 오른쪽 단일 컬럼
- 정보 텍스트 색상: `#CACACA`, `font-medium`
- 문의하기/오시는길 링크만 `font-bold` + chevron 아이콘
- 구분선/Copyright 색상: `#898DA1`
- 구분선↔Copyright 간격: 모바일 12px(`mt-3`) / 데스크톱 24px(`mt-6`)
- Copyright: `Copyright © [2026] ecotree All Rights Reserved.`
- `CompanyInfo`/`ContactInfo` 서브컴포넌트로 중복 코드 제거

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

## 디자인 스크린샷
- `/Users/jay/Downloads/foodtruck/screenshot/header/` — 헤더 디자인 (데스크톱 메가 메뉴, 모바일 사이드 메뉴)
- `/Users/jay/Downloads/foodtruck/screenshot/footer/` — 푸터 디자인 (768px, 모바일)

## 남은 작업 (미구현)
- 각 서브 페이지 구현 (중앙회 안내, 푸드트럭 산업, 다회용기, 알림·자료, 문의하기)
- 히어로 섹션 실제 디자인 (이미지/영상 등)
- OG 이미지, 파비콘 등 메타 에셋
- 스크린샷 기반 나머지 섹션 디자인 구현

## 기술적 참고사항
- Tailwind v4는 `@theme inline` 블록 안에 커스텀 테마 변수를 정의
- `@custom-variant`로 커스텀 breakpoint를 Tailwind 클래스로 사용 가능 (예: `menu:flex`)
- ecotree에서는 `lg:` (1024px)를 메뉴 breakpoint로 사용했으나, 푸드트럭은 메뉴 항목이 더 많아 `menu:` (1120px) 사용
- 메가 메뉴: 서브메뉴를 각 nav 항목의 자식으로 absolute 배치하여 정렬 보장, 배경은 별도 레이어
- `.env.local` 파일은 .gitignore에 포함됨 (bcrypt 해시의 `$` 문자 이스케이프 주의)
