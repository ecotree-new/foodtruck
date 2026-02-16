// Navigation menu items
export const NAV_ITEMS = [
  {
    label: '중앙회 안내',
    href: '/about',
    children: [
      { label: '인사말', href: '/about/greeting' },
      { label: 'ESG', href: '/about/esg' },
      { label: '조직 및 지부안내', href: '/about/organization' },
    ],
  },
  {
    label: '푸드트럭 산업',
    href: '/industry',
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
    href: '/notice',
    children: [
      { label: '공지사항', href: '/notice/list' },
      { label: '행사 갤러리', href: '/notice/gallery' },
    ],
  },
  {
    label: '문의하기',
    href: '/contact',
    children: [
      { label: '행사 문의', href: '/contact/event' },
      { label: '중앙회 가입 문의', href: '/contact/join' },
      { label: '오픈채팅', href: '/contact/chat' },
    ],
  },
] as const;

// Footer links
export const FOOTER_LINKS = {
  services: [
    { label: '문의하기', href: '/contact' },
    { label: '오시는길', href: '/about#location' },
  ],
  legal: [
    { label: '이용약관', href: '/terms' },
    { label: '개인정보처리방침', href: '/privacy' },
  ],
} as const;

// Company info
export const COMPANY_INFO = {
  name: '한국 세계음식 푸드트럭 중앙회',
  ceo: '',
  businessNumber: '',
  phone: '',
  email: 'donfoorock@naver.com',
  address: '',
} as const;
