import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1E1F23] text-white py-10 md:py-12 lg:py-16">
      <div className="container-foodtruck">
        <div className="flex flex-row justify-between gap-6 md:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="한국 세계음식 푸드트럭 중앙회"
              width={160}
              height={40}
              className="w-[140px] md:w-[160px] h-auto brightness-0 invert"
            />
          </div>

          {/* ===== Mobile Layout (<768px) ===== */}
          <div className="flex flex-col text-[12px] text-[#BFBFBF] md:hidden">
            <div className="space-y-1.5">
              <p>회사명 : {COMPANY_INFO.name}</p>
              {COMPANY_INFO.ceo && <p>대표 : {COMPANY_INFO.ceo}</p>}
              {COMPANY_INFO.businessNumber && <p>사업자등록번호 : {COMPANY_INFO.businessNumber}</p>}
            </div>

            <div className="space-y-1.5 mt-6">
              {COMPANY_INFO.phone && <p>대표전화 : {COMPANY_INFO.phone}</p>}
              {COMPANY_INFO.email && <p>대표 메일 : {COMPANY_INFO.email}</p>}
              <Link
                href="/contact"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>문의하기</span>
                <svg
                  className="w-3.5 h-3.5 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {COMPANY_INFO.address && <p className="pt-2">주소 : {COMPANY_INFO.address}</p>}
              <Link
                href="/about#location"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>오시는길</span>
                <svg
                  className="w-3.5 h-3.5 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-col space-y-1.5 mt-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===== Desktop Layout (>=768px) ===== */}
          <div className="hidden md:flex md:flex-row gap-10 lg:gap-16">
            <div className="space-y-2 text-[14px] text-[#BFBFBF]">
              <p>회사명 : {COMPANY_INFO.name}</p>
              {COMPANY_INFO.ceo && <p>대표 : {COMPANY_INFO.ceo}</p>}
              {COMPANY_INFO.businessNumber && <p>사업자등록번호 : {COMPANY_INFO.businessNumber}</p>}
            </div>

            <div className="space-y-2 text-[14px] text-[#BFBFBF]">
              {COMPANY_INFO.phone && <p>대표전화 : {COMPANY_INFO.phone}</p>}
              {COMPANY_INFO.email && <p>대표 메일 : {COMPANY_INFO.email}</p>}
              <Link
                href="/contact"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>문의하기</span>
                <svg
                  className="w-4 h-4 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {COMPANY_INFO.address && <p className="pt-2">주소 : {COMPANY_INFO.address}</p>}
              <Link
                href="/about#location"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>오시는길</span>
                <svg
                  className="w-4 h-4 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="space-y-2 text-[14px]">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 md:my-8 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-[12px] md:text-[14px] text-[#727783]">
          Copyright &copy; {new Date().getFullYear()} 한국 세계음식 푸드트럭 중앙회 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
