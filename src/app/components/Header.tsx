"use client";
import React from 'react';
import { useLanguage } from './LanguageProvider';

/**
 * Header component for the main navigation bar.
 * Contains a sticky logo (top-left), a sticky contact button (top-right), and a centered navigation menu.
 * Uses TailwindCSS for styling and is fully responsive.
 */
const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      {/* Sticky logo and brand name at the top-left, both clickable */}
      <div className="fixed top-4 left-0 z-50 flex items-center h-16 pl-6 py-2">
        <a href="/" className="flex items-center group focus:outline-none" aria-label="Go to home">
          <img
            src="/logo.png"
            alt="bugket logo"
            className="w-9 h-9 md:w-10 md:h-10 object-contain mr-2 transition-transform duration-200 group-hover:scale-105"
            style={{ minWidth: 32, minHeight: 32 }}
          />
          <span className="text-2xl md:text-2xl font-extrabold text-white tracking-wide drop-shadow-neon ml-1 group-hover:text-[#5865f2] transition-colors duration-200 select-none">
            bugket
          </span>
        </a>
      </div>
      {/* Sticky contact button at the top-right */}
      <div className="fixed top-4 right-0 z-50 flex items-center h-16 pr-8 py-2">
        <a
          href="/contact"
          className="bg-white text-[#23272a] font-bold px-7 py-2 rounded-full shadow-md border border-white/80 hover:bg-gray-200 transition-colors duration-200 text-lg"
        >
          {t('nav.contact')}
        </a>
      </div>
      {/* Centered navigation menu (not sticky) */}
      <header className="w-full flex justify-center mt-4 mb-8">
        <nav className="bg-transparent max-w-4xl w-[95vw] flex items-center justify-center gap-8 px-8 py-3 mx-auto rounded-2xl" aria-label="Main navigation">
          <ul className="flex gap-6 text-white font-medium">
            {[
              { href: '/', label: t('nav.home') },
              { href: '/services', label: t('nav.services') },
              { href: '/expertise', label: t('nav.expertise') },
              { href: '/about', label: t('nav.about') },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="relative px-2 py-1 transition-colors duration-200 hover:text-[#57f287]"
                  tabIndex={0}
                >
                  <span className="z-10 relative">{label}</span>
                  {/* Animated underline on hover */}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header; 