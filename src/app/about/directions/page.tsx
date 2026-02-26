'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOMEPAGE_IMAGES } from '@/lib/r2-images';
import { COMPANY_INFO } from '@/lib/constants';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => object;
        LatLng: new (lat: number, lng: number) => object;
        Marker: new (options: object) => object;
      };
    };
  }
}

const LOCATION = {
  lat: 37.03516,
  lng: 127.2496,
};

const CONTACT_ITEMS = [
  {
    label: '주소',
    icon: HOMEPAGE_IMAGES.about.directions.icon_01,
    value: COMPANY_INFO.address,
  },
  {
    label: '전화',
    icon: HOMEPAGE_IMAGES.about.directions.icon_02,
    value: COMPANY_INFO.phone,
    href: `tel:${COMPANY_INFO.phone}`,
  },
  {
    label: '메일',
    icon: HOMEPAGE_IMAGES.about.directions.icon_03,
    value: COMPANY_INFO.email,
    href: `mailto:${COMPANY_INFO.email}`,
  },
];

export default function DirectionsPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const kakaoMapApiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    if (!kakaoMapApiKey) {
      console.warn('Kakao Map API key is not set');
      return;
    }

    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    document.head.appendChild(script);
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapRef.current, options);

    new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
    });

    setMapLoaded(true);
  };

  return (
    <main>
      {/* 히어로 배너 */}
      <section className="relative h-[240px] md:h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src={HOMEPAGE_IMAGES.about.directions.title}
          alt="오시는 길 배경"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-[24px] md:text-title-1 font-bold text-text-primary">
          오시는 길
        </h1>
      </section>

      {/* 지도 + 연락처 */}
      <section className="bg-bg-inverse py-16 md:py-24">
        <div className="container-content">
          {/* 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <p className="text-[10px] md:text-[24px] font-medium text-brand-primary mb-4 md:mb-6">
              Location
            </p>
            <h2 className="text-[14px] md:text-[24px] font-semibold text-text-inverse leading-relaxed">
              신뢰로 이어가는 푸드트럭의 내일,
              <br />
              중앙회로 오시는 길입니다.
            </h2>
          </motion.div>

          {/* 콘텐츠 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row lg:gap-16"
          >
            {/* 좌측 — 카카오맵 */}
            <div className="lg:max-w-[841px] flex-1 overflow-hidden mb-8 lg:mb-0 border border-[#CACACA]">
              <div
                ref={mapRef}
                className="w-full h-[500px] bg-[#E5E7EB]"
              >
                {!mapLoaded && (
                  <div className="w-full h-full flex items-center justify-center text-[#727783]">
                    지도를 불러오는 중...
                  </div>
                )}
              </div>
            </div>

            {/* 우측 — 연락처 */}
            <div className="lg:w-[320px] flex-shrink-0 flex flex-col justify-center">
              <Image
                src="/logo.svg"
                alt="한국 세계음식 푸드트럭 중앙회"
                width={200}
                height={38}
                className="brightness-0 mb-10"
              />
              <div className="space-y-8">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="pb-8 border-b border-[#DDE7FF]">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <span className="text-[14px] lg:text-body-2 font-medium text-text-inverse w-10">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[14px] lg:text-body-2 text-text-inverse hover:text-brand-primary transition-colors ml-2"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-[14px] lg:text-body-2 text-text-inverse ml-2">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
