"use client";
import React from 'react';
import { FaDiscord, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import Image from 'next/image';
import { getPublicAssetPath } from '../utils/getPublicAssetPath';
import Link from 'next/link';

/**
 * Footer component for the application.
 * Contains site navigation, language selector, and social links.
 * Uses TailwindCSS for styling and is fully responsive.
 * The left section contains the logo and language selector.
 * The right section contains navigation links (Product, Policies).
 * Social links and copyright are displayed at the bottom.
 */
const Footer: React.FC = () => {
  const { language, setLanguage, languages, t } = useLanguage();

  const footerLinks = [
    {
      title: t('footer.product') as string,
      links: [
        { label: t('nav.services') as string, href: '/services' },
        { label: t('nav.expertise') as string, href: '/expertise' },
        { label: t('nav.contact') as string, href: '/contact' },
        { label: t('nav.about') as string, href: '/about' },
      ],
    },
    {
      title: t('footer.policies') as string,
      links: [
        { label: t('footer.terms') as string, href: '/policies/terms' },
        { label: t('footer.privacy') as string, href: '/policies/privacy' },
        { label: t('footer.cookies') as string, href: '/policies/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaDiscord />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaLinkedin />, url: '#' },
    { icon: <FaGithub />, url: '#' },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-[#232946] via-[#3a1c71] to-[#5865f2] pt-16 pb-8 px-4 mt-24 rounded-t-[2.5rem] shadow-inner relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
        {/* Main row: left = logo + language selector, right = navigation links */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-4">
          {/* Left section: logo above language selector */}
          <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 justify-start">
            {/* Company logo, decorative but with alt for accessibility */}
            <Image src={getPublicAssetPath('/logo.png')} alt="bugket logo" width={64} height={64} className="w-16 h-16 mb-2" />
            <div className="flex flex-col items-center md:items-start">
              {/* Language selector label */}
              <span className="text-white/70 font-medium text-base mb-1">{t('footer.language') as string}</span>
              {/* Language dropdown selector */}
              <div className="w-40 bg-white/10 rounded-2xl p-2 flex flex-row items-center gap-2 shadow-lg">
                <select
                  className="flex-1 bg-[#5865f2]/30 text-white font-semibold rounded-lg px-3 py-2 outline-none border border-white/20 focus:ring-2 focus:ring-[#5865f2] transition-all text-base appearance-none"
                  size={1}
                  style={{ minHeight: 36 }}
                  aria-label="Select language"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#5865f2]/60 text-white py-1 px-3 text-base">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Right section: navigation links (Product, Policies) */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12 text-white w-full max-w-3xl mx-auto">
              {footerLinks.map((col) => (
                <div key={col.title} className="flex flex-col items-center md:items-start">
                  <h4 className="font-bold mb-3 text-lg text-center md:text-left">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map((link: { label: string; href: string }) => (
                      <li key={col.title + '-' + link.label}>
                        <Link
                          href={link.href}
                          className="hover:underline text-white/90 transition-colors text-center md:text-left block min-w-[80px]"
                          tabIndex={0}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Social media links row */}
      <div className="flex justify-center gap-6 text-2xl text-white/80 mb-8 mt-10">
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.url}
            className="hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Social link"
          >
            {s.icon}
          </a>
        ))}
      </div>
      {/* Copyright notice */}
      <div className="text-center text-white/60 text-sm mt-6 relative z-10">
        &copy; {new Date().getFullYear()} bugket. {t('footer.rights') as string }
      </div>
      {/* Large background text for branding */}
      <span
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[12vw] md:text-[9vw] font-extrabold text-white opacity-10 leading-none z-0 whitespace-nowrap"
        style={{ letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        bugket
      </span>
    </footer>
  );
};

export default Footer; 