"use client";
import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import ContactForm from "../components/ContactForm";
import { FaDiscord, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import { useToast } from "../components/Toast";
import { useLanguage } from "../components/LanguageProvider";

const iconMap: Record<string, React.ReactNode> = {
  FaDiscord: <FaDiscord className="text-2xl" />,
  FaTwitter: <FaTwitter className="text-2xl" />,
  FaLinkedin: <FaLinkedin className="text-2xl" />,
};

/**
 * Contact page for LAISY.
 * Contains a contact form and company contact information.
 */
const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const socials = t('contact.socials');
  const { show } = useToast();

  return (
    <div className="flex flex-col gap-8 pt-16 sm:pt-24">
      {/* Hero section */}
      <AnimatedSection>
        <div className="relative flex flex-col items-center gap-6 min-h-24 mb-4">
          <div className="flex items-center gap-4 z-10">
            <span className="bg-[#5865f2] p-4 rounded-full shadow-lg animate-bounce">
              <FaCommentDots className="text-white text-3xl" />
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-neon leading-tight" dangerouslySetInnerHTML={{ __html: t('contact.hero') as string }} />
          </div>
          {/* Neon particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ filter: 'blur(2px)' }}>
              <circle cx="30%" cy="60%" r="12" fill="#5865f2" fillOpacity="0.18" />
              <circle cx="70%" cy="30%" r="10" fill="#57f287" fillOpacity="0.15" />
              <circle cx="50%" cy="20%" r="8" fill="#eb459e" fillOpacity="0.13" />
              <circle cx="60%" cy="80%" r="10" fill="#5865f2" fillOpacity="0.12" />
            </svg>
          </div>
        </div>
      </AnimatedSection>
      {/* Contact form */}
      <AnimatedSection>
        <div className="flex justify-center">
          <ContactForm className="max-w-lg w-full p-8 text-lg" />
        </div>
      </AnimatedSection>
      {/* Socials */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          {Array.isArray(socials) && socials.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => show(t('social.soon') as string)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] text-white font-semibold text-lg shadow-neon hover:scale-105 transition-transform duration-300 focus:outline-none"
              aria-label={s.label}
            >
              {iconMap[s.icon] || null} {s.label}
            </button>
          ))}
        </div>
      </AnimatedSection>
      {/* Location card */}
      <AnimatedSection delay={0.2}>
        <div className="flex flex-col items-center gap-2 bg-white/10 border border-white/10 rounded-2xl p-8 max-w-md mx-auto shadow-lg backdrop-blur-md">
          <span className="flex items-center gap-2 text-[#57f287] text-xl font-bold drop-shadow-neon">
            <FaMapMarkerAlt /> {t('contact.location') as string}
          </span>
          <span className="text-gray-200 text-sm">{t('contact.remote') as string}</span>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ContactPage; 