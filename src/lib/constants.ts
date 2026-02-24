// Navigation menu items
export const NAV_ITEMS = [
  {
    label: '중앙회 안내',
    href: '/about/greeting',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: 'ESG', href: '/about/esg' },
      { label: '조직 및 지부안내', href: '/about/organization' },
      { label: '오시는 길', href: '/about/directions' },
    ],
  },
  {
    label: '푸드트럭 산업',
    href: '/industry/operation',
    children: [
      { label: '운영', href: '/industry/operation' },
      { label: '세계 음식', href: '/industry/world-food' },
      { label: '입점 프로세스', href: '/industry/process' },
    ],
  },
  {
    label: '다회용기',
    href: '/reusable',
    children: [],
  },
  {
    label: '알림·자료',
    href: '/notice/list',
    children: [
      { label: '공지사항', href: '/notice/list' },
      { label: '행사 갤러리', href: '/notice/gallery' },
    ],
  },
  {
    label: '문의하기',
    href: '/contact/event',
    children: [
      { label: '행사 문의', href: '/contact/event' },
      { label: '중앙회 가입 문의', href: '/contact/join' },
      { label: '오픈채팅', href: 'https://open.kakao.com/o/sEn0Abhi' },
    ],
  },
] as const;

// Footer links
export const FOOTER_LINKS = {
  services: [
    { label: '문의하기', href: '/contact' },
    { label: '오시는길', href: '/about/directions' },
  ],
  legal: [
    { label: '이용약관', href: '/terms' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
} as const;

// Company info
export const COMPANY_INFO = {
  name: '한국세계음식푸드트럭중앙회',
  ceo: '최동현',
  businessNumber: '743-06-03300',
  phone: '1688-8695',
  email: 'donfoorock@naver.com',
  address: '경기도 안성시 대덕면 소마니길 183, 나동',
} as const;

// ──────────────────────────────────────────
// 다회용기 페이지 (/reusable)
// ──────────────────────────────────────────

const REUSABLE_R2 = 'https://pub-8ba77ae4d6be44b2b12c9762cc3ef01a.r2.dev/homepage/reusable';

export const REUSABLE_HERO = {
  title: '다회용기 운영의 기준을 만들다.',
  subtitle: '에코트리는 다회용기 운영의 전 과정을 직접 설계하고 관리합니다.',
  video: `${REUSABLE_R2}/hero-video.mp4`,
} as const;

export const REUSABLE_RENTAL_FLOW = {
  label: '대여 플로우',
  title: '필요한 만큼 빌리고, 사용 후까지 책임집니다',
  steps: [
    {
      id: 1,
      number: '01',
      title: '대여',
      description: '행사 일정과 규모에 맞춰 필요한 수량의 다회용기를 대여합니다. 옵션과 수량 확정 후 대여를 진행합니다.',
      image: `${REUSABLE_R2}/rental-flow/step-01.webp`,
    },
    {
      id: 2,
      number: '02',
      title: '세척',
      description: '에코트리만의 전용 세척 공정으로 위생적으로 세척을 진행합니다.',
      image: `${REUSABLE_R2}/rental-flow/step-02.webp`,
    },
    {
      id: 3,
      number: '03',
      title: '살균 및 소독',
      description: '세척이 끝난 용기는 살균·소독 공정을 한 번 더 거칩니다. 건조 및 정리 후 포장을 합니다.',
      image: `${REUSABLE_R2}/rental-flow/step-03.webp`,
    },
    {
      id: 4,
      number: '04',
      title: '수거 및 배송',
      description: '사용한 다회용기는 수거 후 다시 에코트리로 반납됩니다.',
      image: `${REUSABLE_R2}/rental-flow/step-04.webp`,
    },
  ],
} as const;

export const REUSABLE_BUSINESS_RANGE = {
  label: '사업 범위',
  title: '다양한 공간과 행사에서 함께합니다.',
  cards: [
    { id: 1, title: '지자체 행사', image: `${REUSABLE_R2}/business-range/local-event.webp` },
    { id: 2, title: '기업 행사', image: `${REUSABLE_R2}/business-range/corporate-event.webp` },
    { id: 3, title: '스포츠 경기', image: `${REUSABLE_R2}/business-range/sports.webp` },
    { id: 4, title: '페스티벌', image: `${REUSABLE_R2}/business-range/festival.webp` },
    { id: 5, title: '장례식장', image: `${REUSABLE_R2}/business-range/funeral.webp` },
  ],
} as const;

export const REUSABLE_WASHING_PROCESS = {
  title: '세척 순서',
  subtitle: '위생 기준에 따라 단계별로 관리됩니다.',
  steps: [
    { id: 1, title: '불림', description: '세척물을 예열로 불려\n다음 세척 효율을 높임' },
    { id: 2, title: '수류 초음파\n버블 세척', description: '물 흐름으로 큰 이물질을\n털어내 1차 오염 제거' },
    { id: 3, title: '고온·고압세척', description: '초음파·버블로 미세 오염을\n분해해 틈새까지 세척' },
    { id: 4, title: 'UV살균', description: 'UV로 살균 처리해 위생 강화' },
    { id: 5, title: '고온 열풍 소독', description: '고온 열풍으로 소독 후 빠르게\n건조해 물기 남김 없이 마무리' },
    { id: 6, title: '전수검사', description: '모든 제품 상태를 전수 확인해\n불량·오염 재유입 차단' },
    { id: 7, title: '포장', description: '재오염을 방지하도록\n밀봉 포장해 출고/보관' },
  ],
} as const;

export const REUSABLE_WASHING_FACILITY = {
  title: '세척 시설 안내',
  subtitle: '전용 세척 시설에서 위생적으로 관리됩니다.',
  cards: [
    {
      id: 1,
      number: '01',
      title: '애벌 세척대',
      description: '음식물 잔여물·기름때 등 굵은 오염 1차 제거',
      image: `${REUSABLE_R2}/washing-facility/facility-01.webp`,
    },
    {
      id: 2,
      number: '02',
      title: '초음파 세척대',
      description: '미세 오염을 진동으로 분해해 틈새까지 깨끗하게 세척',
      image: `${REUSABLE_R2}/washing-facility/facility-02.webp`,
    },
    {
      id: 3,
      number: '03',
      title: '외류형 세척대',
      description: '세척 중 발생한 이물 및 거품을 외부로 배출하며 순환 세척',
      image: `${REUSABLE_R2}/washing-facility/facility-03.webp`,
    },
    {
      id: 4,
      number: '04',
      title: '고압살균세척대',
      description: '고압 살균으로 마무리 단계 청결도 향상',
      image: `${REUSABLE_R2}/washing-facility/facility-04.webp`,
    },
  ],
} as const;

export const REUSABLE_POST_WASHING = {
  title: '세척 후 마무리까지 완벽하게',
  subtitle: '안심하고 다시 사용할 수 있도록 관리됩니다.',
  cards: [
    {
      id: 1,
      title: '살균 건조실',
      description: '세척 후 살균 건조로 수분을 제거',
      image: `${REUSABLE_R2}/post-washing/drying-room.webp`,
    },
    {
      id: 2,
      title: '진공 포장기',
      description: '진공 포장으로 상태 유지',
      image: `${REUSABLE_R2}/post-washing/vacuum-packer.webp`,
    },
  ],
} as const;

// ──────────────────────────────────────────
// 문의하기 페이지 (/contact)
// ──────────────────────────────────────────

// 행사 문의 - 행사 종류
export const EVENT_TYPES_EVENT = [
  { value: '', label: '행사 종류를 선택하세요.' },
  { value: 'university', label: '대학교 축제' },
  { value: 'regional', label: '지역 축제' },
  { value: 'corporate', label: '기업 행사' },
  { value: 'other', label: '기타' },
] as const;

// 중앙회 가입 문의 - 가입 유형
export const EVENT_TYPES_JOIN = [
  { value: '', label: '가입 유형을 선택하세요.' },
  { value: 'individual', label: '개인' },
  { value: 'group', label: '단체' },
  { value: 'branch', label: '지부' },
  { value: 'other', label: '기타' },
] as const;

// 지역 옵션
export const REGIONS = [
  { value: '', label: '지역을 선택하세요.' },
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'sejong', label: '세종' },
  { value: 'gangwon', label: '강원' },
  { value: 'chungbuk', label: '충북' },
  { value: 'chungnam', label: '충남' },
  { value: 'jeonbuk', label: '전북' },
  { value: 'jeonnam', label: '전남' },
  { value: 'gyeongbuk', label: '경북' },
  { value: 'gyeongnam', label: '경남' },
  { value: 'jeju', label: '제주' },
] as const;

// 이메일 도메인
export const EMAIL_DOMAINS = [
  { value: '', label: '직접 선택' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'daum.net', label: 'daum.net' },
  { value: 'kakao.com', label: 'kakao.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
] as const;

// ──────────────────────────────────────────
// 다회용기 페이지 — 통계
// ──────────────────────────────────────────

export const REUSABLE_STATS = {
  title: '데이터로 확인되는 친환경 성과',
  subtitle: '에코트리의 행사 운영은 환경 개선으로 이어진 실제 성과를 만들어냅니다.',
  backgroundImage: 'https://pub-8ba77ae4d6be44b2b12c9762cc3ef01a.r2.dev/homepage/reusable/stats-bg.webp',
  stats: [
    { id: 1, label: '탄소 절감 수', value: 1250, unit: '톤' },
    { id: 2, label: '플라스틱 감소', value: 85, unit: '%' },
    { id: 3, label: '일회용품 대체', value: 500000, unit: '개' },
    { id: 4, label: '운영 행사 수', value: 200, unit: '+' },
  ],
} as const;
