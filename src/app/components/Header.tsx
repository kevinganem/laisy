"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';

/**
 * Header component for the main navigation bar.
 * Contains a sticky logo (top-left), a sticky contact button (top-right), and a centered navigation menu.
 * Uses TailwindCSS for styling and is fully responsive.
 */
const Header: React.FC = () => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const navLinks = [
    { href: '/', key: 'home' },
    { href: '/services', key: 'services' },
    { href: '/expertise', key: 'expertise' },
    { href: '/about', key: 'about' },
  ];

  return (
    <>
      {/* Sticky logo and brand name at the top-left, both clickable */}
      <div className="fixed top-4 left-0 z-50 flex items-center h-16 pl-6 py-2">
        <Link href="/" className="flex items-center group focus:outline-none" aria-label="Go to home">
          <Image
            src={getPublicAssetPath('/logo.png')}
            alt="bugket logo"
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10 object-contain mr-2 transition-transform duration-200 group-hover:scale-105"
            style={{ minWidth: 32, minHeight: 32 }}
          />
          <span className="text-2xl md:text-2xl font-extrabold text-white tracking-wide drop-shadow-neon ml-1 group-hover:text-[#5865f2] transition-colors duration-200 select-none">
            bugket
          </span>
        </Link>
      </div>
      {/* Sticky contact button and burger at the top-right (mobile only) */}
      <div className="fixed top-4 right-0 z-50 flex items-center h-16 pr-4 md:pr-8 py-2 gap-2 md:gap-0">
        <Link
          href="/contact"
          className="bg-white text-[#23272a] font-bold px-7 py-2 rounded-full shadow-md border border-white/80 hover:bg-gray-200 transition-colors duration-200 text-lg md:mr-0 mr-2"
        >
          {t('nav.contact') as string}
        </Link>
        {/* Hamburger menu button (mobile only) */}
        <button
          className="flex md:hidden items-center justify-center w-11 h-11 rounded-full bg-[#23272a]/80 border border-white/20 shadow-lg hover:bg-[#313338] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>
      {/* Desktop navigation */}
      <header className="w-full flex justify-center mt-4 mb-8">
        <nav className="bg-transparent max-w-4xl w-[95vw] items-center justify-center gap-8 px-8 py-3 mx-auto rounded-2xl hidden md:flex" aria-label="Main navigation">
          <ul className="flex gap-6 text-white font-medium">
            {navLinks.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative px-2 py-1 transition-colors duration-200 hover:text-[#57f287]"
                  tabIndex={0}
                >
                  <span className="z-10 relative">{t(`nav.${key}`) as string}</span>
                  {/* Animated underline on hover */}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] flex md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-[#232946] via-[#3a1c71] to-[#5865f2] opacity-95 backdrop-blur-xl" />
          <div
            ref={menuRef}
            id="mobile-menu"
            className="relative w-full h-full flex flex-col justify-start items-center pt-8 px-6 gap-8"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            {/* Top row: logo left, close right */}
            <div className="w-full flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center group focus:outline-none" aria-label="Go to home" onClick={() => setMenuOpen(false)}>
                <Image
                  src={getPublicAssetPath('/logo.png')}
                  alt="bugket logo"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain mr-2"
                  style={{ minWidth: 32, minHeight: 32 }}
                />
                <span className="text-2xl font-extrabold text-white tracking-wide drop-shadow-neon ml-1 group-hover:text-[#5865f2] transition-colors select-none">
                  bugket
                </span>
              </Link>
              <button
                className="p-2 rounded-full hover:bg-[#313338]/60 focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Navigation links */}
            <nav className="flex flex-col gap-4 w-full items-center mt-4" aria-label="Mobile navigation">
              {navLinks.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white text-2xl font-bold py-3 px-6 w-full text-center rounded-2xl hover:bg-[#5865f2]/20 transition-colors shadow-md"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${key}`) as string}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default Header; 