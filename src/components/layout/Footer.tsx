import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/lib/constants';

function ContactInfo({ iconSize = 'w-4 h-4' }: { iconSize?: string }) {
  return (
    <>
      <p>대표 전화 : {COMPANY_INFO.phone}</p>
      <p>대표 메일 : {COMPANY_INFO.email}</p>
      <Link
        href="/contact"
        className="flex items-center gap-0.5 font-bold text-[#CACACA] hover:text-[#F5F5F5] transition-colors group"
      >
        <span>문의하기</span>
        <svg
          className={`${iconSize} text-[#CACACA] group-hover:text-[#F5F5F5] transition-colors`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      <p className="pt-2">주소 : {COMPANY_INFO.address}</p>
      <Link
        href="/about#location"
        className="flex items-center gap-0.5 font-bold text-[#CACACA] hover:text-[#F5F5F5] transition-colors group"
      >
        <span>오시는길</span>
        <svg
          className={`${iconSize} text-[#CACACA] group-hover:text-[#F5F5F5] transition-colors`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </>
  );
}

function CompanyInfo() {
  return (
    <>
      <p>회사명 : {COMPANY_INFO.name}</p>
      <p>대표이사 : {COMPANY_INFO.ceo}</p>
      <p>사업자등록번호 : {COMPANY_INFO.businessNumber}</p>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-raised text-white font-medium py-10 md:py-12 lg:py-16">
      <div className="container-foodtruck">

        {/* ===== Desktop (>=1024px) — 로고 왼쪽 | 회사정보 + 연락처 오른쪽 ===== */}
        <div className="hidden lg:flex justify-between gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="한국 세계음식 푸드트럭 중앙회"
              width={180}
              height={45}
              className="h-auto brightness-0 invert"
            />
          </div>

          <div className="flex gap-16 lg:gap-24">
            <div className="space-y-2 text-[14px] text-[#CACACA]">
              <CompanyInfo />
            </div>
            <div className="space-y-2 text-[14px] text-[#CACACA]">
              <ContactInfo />
            </div>
          </div>
        </div>

        {/* ===== Tablet (768px~1024px) — 로고 위, 회사정보+연락처 2열 아래 ===== */}
        <div className="hidden md:flex md:flex-col lg:hidden">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="한국 세계음식 푸드트럭 중앙회"
              width={160}
              height={40}
              className="h-auto brightness-0 invert"
            />
          </div>

          <div className="flex gap-16 mt-6">
            <div className="space-y-2 text-[14px] text-[#CACACA]">
              <CompanyInfo />
            </div>
            <div className="space-y-2 text-[14px] text-[#CACACA]">
              <ContactInfo />
            </div>
          </div>
        </div>

        {/* ===== Mobile (<768px) — 로고 왼쪽 + 정보 오른쪽 단일 컬럼 ===== */}
        <div className="flex gap-6 md:hidden">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="한국 세계음식 푸드트럭 중앙회"
              width={120}
              height={30}
              className="h-auto brightness-0 invert"
            />
          </div>

          <div className="text-[12px] text-[#CACACA]">
            <div className="space-y-1.5">
              <CompanyInfo />
            </div>
            <div className="space-y-1.5 mt-4">
              <ContactInfo iconSize="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-8 md:mt-10 border-[#898DA1]" />

        {/* Copyright */}
        <div className="mt-3 md:mt-6 text-center text-[12px] md:text-[14px] text-[#898DA1]">
          Copyright &copy; [{new Date().getFullYear()}] ecotree All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
