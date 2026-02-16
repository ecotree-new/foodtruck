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

  const toggleSubmenu = (href: string) => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
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
            <nav
              className="hidden menu:flex items-center gap-8"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setHoveredMenu(item.href)}
                >
                  <Link
                    href={item.href}
                    className={`
                      text-[16px] leading-6 py-5 cursor-pointer transition-colors
                      ${isActive(item.href)
                        ? 'font-bold text-brand-primary'
                        : 'font-medium text-text-inverse hover:text-brand-primary'
                      }
                    `}
                  >
                    {item.label}
                  </Link>

                  {/* Desktop Submenu Dropdown */}
                  {item.children.length > 0 && hoveredMenu === item.href && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`
                              block px-4 py-2.5 text-[14px] transition-colors
                              ${isActive(child.href)
                                ? 'text-brand-primary font-semibold bg-orange-50'
                                : 'text-text-inverse hover:text-brand-primary hover:bg-gray-50'
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="menu:hidden p-2"
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

      {/* Mobile/Tablet Side Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 menu:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[360px] bg-white z-50 menu:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header: Logo + Close */}
                <div className="flex items-center justify-between h-16 px-5">
                  <Link
                    href="/"
                    className="flex-shrink-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image
                      src="/logo.svg"
                      alt="한국 세계음식 푸드트럭 중앙회"
                      width={160}
                      height={40}
                    />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2"
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
                <nav className="flex-1 overflow-y-auto px-5 pt-4">
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
                                ${isActive(item.href)
                                  ? 'font-bold text-brand-primary'
                                  : 'font-semibold text-text-inverse'
                                }
                              `}
                            >
                              <span>{item.label}</span>
                              <svg
                                className={`w-5 h-5 transition-transform duration-200 ${
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
                              ${isActive(item.href)
                                ? 'font-bold text-brand-primary'
                                : 'font-semibold text-text-inverse'
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
