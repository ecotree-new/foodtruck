'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isMenuActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return false;
  };

  const toggleSubmenu = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50"
        onMouseLeave={() => setHoveredMenu(null)}
      >
        {/* Main Header Bar */}
        <header className="bg-bg-default h-16 relative z-10">
          <div className="container-foodtruck h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="한국 세계음식 푸드트럭 중앙회"
                  width={160}
                  height={40}
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden menu:flex items-center gap-20 h-full">
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.href}
                    className="relative flex items-center h-full cursor-pointer"
                    onMouseEnter={() => setHoveredMenu(item.href)}
                  >
                    <Link
                      href={item.href}
                      className={`
                        text-body-2 leading-6 cursor-pointer transition-colors
                        ${isMenuActive(item)
                          ? 'font-bold text-brand-primary'
                          : 'font-medium text-text-primary hover:text-brand-primary'
                        }
                      `}
                    >
                      {item.label}
                    </Link>

                    {/* Hover indicator bar */}
                    {hoveredMenu === item.href && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary" />
                    )}

                    {/* Submenu column — positioned directly below its parent */}
                    {hoveredMenu && (
                      <div className="absolute top-full left-0 flex flex-col gap-5 pt-6 pb-8">
                        {item.children.length > 0 ? (
                          item.children.map((child) =>
                            child.href.startsWith('http') ? (
                              <a
                                key={child.href}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-label-1 whitespace-nowrap transition-colors text-text-primary hover:text-brand-primary"
                              >
                                {child.label}
                              </a>
                            ) : (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`
                                  text-label-1 whitespace-nowrap transition-colors
                                  ${isActive(child.href)
                                    ? 'text-brand-primary font-semibold'
                                    : 'text-text-primary hover:text-brand-primary'
                                  }
                                `}
                              >
                                {child.label}
                              </Link>
                            )
                          )
                        ) : (
                          <Link
                            href={item.href}
                            className={`
                              text-label-1 whitespace-nowrap transition-colors
                              ${isActive(item.href)
                                ? 'text-brand-primary font-semibold'
                                : 'text-text-primary hover:text-brand-primary'
                              }
                            `}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="menu:hidden py-2 pl-2 pr-0 text-text-primary"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="메뉴 열기"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Mega menu full-width background layer */}
        {hoveredMenu && (
          <div className="hidden menu:block absolute top-16 left-0 right-0 bg-bg-default border-t border-white/10 h-[200px] z-0" />
        )}
      </div>

      {/* Mobile/Tablet Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-16 right-0 bottom-0 w-full md:w-[360px] bg-bg-default z-50 menu:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Close Button */}
                <div className="flex justify-end px-6 md:px-12 pt-3">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-2 pl-2 pr-0 text-text-primary"
                    aria-label="메뉴 닫기"
                  >
                    <motion.svg
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-6 md:px-12 pt-2">
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.children.length > 0 ? (
                          <>
                            {/* Parent with submenu toggle */}
                            <button
                              onClick={() => toggleSubmenu(item.href)}
                              className={`
                                flex items-center justify-between w-full py-4 text-[18px] cursor-pointer
                                ${isMenuActive(item)
                                  ? 'font-bold text-brand-primary'
                                  : 'font-semibold text-text-primary'
                                }
                              `}
                            >
                              <span>{item.label}</span>
                              <svg
                                className={`w-5 h-5 text-text-primary transition-transform duration-200 ${
                                  openSubmenu === item.href ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            {/* Submenu */}
                            <AnimatePresence>
                              {openSubmenu === item.href && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  {item.children.map((child) => (
                                    <li key={child.href}>
                                      {child.href.startsWith('http') ? (
                                        <a
                                          href={child.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className="block py-3 pl-4 text-[16px] text-text-subtle hover:text-brand-primary"
                                        >
                                          {child.label}
                                        </a>
                                      ) : (
                                        <Link
                                          href={child.href}
                                          onClick={() => setIsMobileMenuOpen(false)}
                                          className={`
                                            block py-3 pl-4 text-[16px]
                                            ${isActive(child.href)
                                              ? 'text-brand-primary font-semibold'
                                              : 'text-text-subtle hover:text-brand-primary'
                                            }
                                          `}
                                        >
                                          {child.label}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          /* Link without children */
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`
                              block py-4 text-[18px]
                              ${isMenuActive(item)
                                ? 'font-bold text-brand-primary'
                                : 'font-semibold text-text-primary'
                              }
                            `}
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
