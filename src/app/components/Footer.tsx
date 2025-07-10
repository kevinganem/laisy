"use client";
import React from 'react';
import { FaDiscord, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from './LanguageProvider';
import Link from 'next/link';
import { useToast } from './Toast';
import Logo from './Logo';

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
  const toast = useToast();

  const footerLinks = [
    {
      title: t('footer.product') as string,
      links: [
        { label: t('nav.services') as string, href: '/services' },
        { label: t('nav.expertise') as string, href: '/expertise' },
        { label: t('nav.pricing') as string, href: '/pricing' },
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
    <>
      {/* Mobile footer component */}
      <FooterMobile />
      {/* Desktop footer (hidden on mobile) */}
      <footer className="hidden md:block w-full bg-[#0a1333]/80 pt-16 pb-8 px-4 mt-24 rounded-t-[2.5rem] shadow-inner relative overflow-hidden">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">
          {/* Main footer row: logo/language selector on left, navigation on right */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mb-4">
            {/* Left section: logo and language selector */}
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-4 justify-start">
              {/* Company logo with accessibility alt text */}
              <Logo size={84} className="w-20 h-20" animated={false} />
              {/* Language selector label */}
              <span className="text-white/70 font-medium text-base mb-1">{t('footer.language') as string}</span>
              {/* Language dropdown selector */}
              <div className="relative w-40">
                <select
                  className="w-full bg-white/10 rounded-2xl p-3 pr-10 text-white font-semibold border border-white/20 focus:ring-2 focus:ring-[#5865f2] transition-all text-base appearance-none"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  aria-label="Select language"
                  style={{ minHeight: 40 }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#5865f2]/60 text-white py-1 px-3 text-base">
                      {lang.label}
                    </option>
                  ))}
                </select>
                {/* Dropdown arrow */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            </div>
            {/* Right section: navigation links grid */}
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
        {/* Social media links section */}
        <div className="flex justify-center gap-6 text-2xl text-white/80 mb-8 mt-10">
          {socialLinks.map((s, i) => (
            <button
              key={i}
              type="button"
              className="hover:text-white transition-colors focus:outline-none"
              aria-label="Social link soon"
              onClick={() => toast.show(t('social.soon') as string)}
              tabIndex={0}
            >
              {s.icon}
            </button>
          ))}
        </div>
        {/* Copyright notice */}
        <div className="text-center text-white/60 text-sm mt-6 relative z-10">
          &copy; {new Date().getFullYear()} LAISY {t('footer.rights') as string }
        </div>
        {/* Large background branding text */}
        <span
          className="pointer-events-none select-none absolute bottom-0 left-0 right-0 w-full text-[16vw] font-extrabold text-white opacity-10 leading-none z-0 text-center whitespace-nowrap"
          style={{ letterSpacing: '-0.05em' }}
          aria-hidden="true"
        >
          LAISY.
        </span>
      </footer>
    </>
  );
};

/* FooterMobile component for mobile view */
function FooterMobile() {
  const { language, setLanguage, languages, t } = useLanguage();
  const [openSection, setOpenSection] = React.useState<string | null>(null);
  const toast = useToast();
  const footerLinks = [
    {
      title: t('footer.product') as string,
      links: [
        { label: t('nav.services') as string, href: '/services' },
        { label: t('nav.expertise') as string, href: '/expertise' },
        { label: t('nav.pricing') as string, href: '/pricing' },
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
    <footer className="md:hidden w-full bg-[#0a1333]/80 pt-8 pb-14 px-2 flex flex-col items-center gap-6 relative overflow-hidden">
      {/* Company logo */}
      <div className="flex flex-col items-center mb-2">
        <Logo size={56} className="w-14 h-14" animated={false} />
      </div>
      {/* Language selector */}
      <div className="w-11/12 max-w-xs mx-auto mb-2">
        <label className="text-white/70 font-medium text-base mb-1 block">{t('footer.language') as string}</label>
        <div className="relative">
          <select
            className="w-full bg-white/10 rounded-2xl p-3 pr-10 text-white font-semibold border border-white/20 focus:ring-2 focus:ring-[#5865f2] transition-all text-base appearance-none"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            aria-label="Select language"
            style={{ minHeight: 40 }}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-[#5865f2]/60 text-white py-1 px-3 text-base">
                {lang.label}
              </option>
            ))}
          </select>
          {/* Dropdown arrow */}
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </div>
      {/* Accordion navigation menu */}
      <div className="w-11/12 max-w-xs mx-auto flex flex-col gap-2">
        {footerLinks.map((col) => (
          <div key={col.title} className="border-b border-white/15">
            <button
              className="w-full flex justify-between items-center py-3 text-white font-bold text-lg focus:outline-none"
              onClick={() => setOpenSection(openSection === col.title ? null : col.title)}
              aria-expanded={openSection === col.title}
            >
              <span>{col.title}</span>
              <svg className={`transform transition-transform ${openSection === col.title ? 'rotate-180' : ''}`} width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <ul className={`flex flex-col gap-1 pl-2 pb-2 transition-all ${openSection === col.title ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}> 
              {col.links.map((link) => (
                <li key={col.title + '-' + link.label}>
                  <Link href={link.href} className="block py-1 px-2 text-white/90 rounded hover:bg-[#5865f2]/20 transition-colors text-base">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Social media links */}
      <div className="flex justify-center gap-6 text-2xl text-white/80 mt-4 mb-6">
        {socialLinks.map((s, i) => (
          <button
            key={i}
            type="button"
            className="hover:text-white transition-colors focus:outline-none"
            aria-label="Social link soon"
            onClick={() => toast.show(t('social.soon') as string)}
            tabIndex={0}
          >
            {s.icon}
          </button>
        ))}
      </div>
      {/* Large background branding text */}
      <span
        className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 text-[14vw] font-extrabold text-white opacity-10 leading-none z-0 whitespace-nowrap"
        style={{ letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        LAISY.
      </span>
    </footer>
  );
}

export default Footer; 