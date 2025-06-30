"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';
import { FaDiscord, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

/**
 * Header component for the main navigation bar.
 * Contains a sticky logo (top-left), a sticky contact button (top-right), and a centered navigation menu.
 * Uses TailwindCSS for styling and is fully responsive.
 */
const Header: React.FC = () => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Close menu when clicking outside the menu area
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

  // Close menu when pressing Escape
  useEffect(() => {
    if (!menuOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  // Add background effect when scrolling (sticky header)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 4);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu mobile si on passe en desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMenuOpen(false);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '/', key: 'home' },
    { href: '/services', key: 'services' },
    { href: '/expertise', key: 'expertise' },
    { href: '/about', key: 'about' },
  ];

  return (
    <>
      {/* Sticky header bar: logo, contact, burger, all with background */}
      <div className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2 h-16 transition-colors duration-300 ${scrolled ? 'bg-[#5865f2]/90 backdrop-blur-md shadow-lg' : ''} md:bg-transparent md:backdrop-blur-none md:shadow-none`}>
        {/* Logo and brand */}
        <Link href="/" className="flex items-center group focus:outline-none" aria-label="Go to home">
          <Image
            src={getPublicAssetPath('/logo.png')}
            alt="bugket logo"
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10 object-contain mr-2 transition-transform duration-200 group-hover:scale-105"
            style={{ minWidth: 32, minHeight: 32 }}
          />
          <span className="text-2xl md:text-2xl font-extrabold text-white tracking-wide drop-shadow-neon ml-1 group-hover:text-[#232946] transition-colors duration-200 select-none">
            bugket
          </span>
        </Link>
        {/* Contact button and burger */}
        <div className="flex items-center gap-2 md:gap-0">
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
      </div>
      {/* Desktop navigation */}
      <header className="w-full flex justify-center mt-4 mb-8">
        <nav className="relative z-50 bg-transparent max-w-4xl w-[95vw] items-center justify-center gap-8 px-8 py-3 mx-auto rounded-2xl hidden md:flex" aria-label="Main navigation">
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
          <div className="absolute inset-0 bg-[#0a1333]" />
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
            <div className="mt-auto w-full flex flex-col items-center">
              <Link href="/contact" className="mb-4 w-full text-center bg-[#5865f2] text-white text-lg font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-[#4752c4] transition-colors">Contact</Link>
              <div className="mb-8 flex justify-center gap-6 text-2xl text-white/80">
                <a href="#" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Discord"><FaDiscord /></a>
                <a href="#" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                <a href="#" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Github"><FaGithub /></a>
              </div>
            </div>
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