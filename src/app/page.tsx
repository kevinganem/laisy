"use client";
import React from "react";
import AnimatedSection from "./components/AnimatedSection";
import { useLanguage } from './components/LanguageProvider';

/**
 * HomePage component
 * Displays the main landing page with a hero section and alternating feature cards.
 * Uses AnimatedSection for scroll-based reveal animations.
 * Layout and style inspired by Discord/gaming UI.
 */
const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const homeCards = t('homeCards');

  return (
    <div className="flex flex-col gap-30">
      {/* Hero section: main value proposition and call-to-action */}
      <AnimatedSection>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 min-h-[420px]">
          <div className="flex-1 flex flex-col gap-6 items-start md:items-start justify-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-neon leading-tight text-left md:text-left">
              {t('hero.home') as string}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl text-left md:text-left">
              {t('hero.description') as string}
            </p>
            <div className="flex gap-4 mt-2">
              <a href="/services" className="bg-[#5865f2] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#4752c4] transition-colors text-lg">{t('hero.services') as string}</a>
              <a href="/contact" className="bg-[#23272a] text-white px-8 py-3 rounded-xl font-semibold border border-[#5865f2] hover:bg-[#313338] transition-colors text-lg">{t('hero.contact') as string}</a>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80"
              alt="QA Gaming Illustration"
              className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-[#5865f2] bg-[#23272a]"
              draggable={false}
            />
          </div>
        </div>
      </AnimatedSection>
      {/* Cards section: alternating image/text feature highlights */}
      <div className="flex flex-col gap-30 items-center">
        {Array.isArray(homeCards) && homeCards.map((card, idx) => (
          <AnimatedSection key={idx} delay={0.1 * idx}>
            <div className="relative flex w-full max-w-5xl min-h-[440px]">
              <div className={`flex flex-col md:flex-row w-full bg-gradient-to-br from-[#232946]/80 via-[#3a1c71]/70 to-[#5865f2]/30 bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] shadow-2xl min-h-[440px] max-w-5xl mx-auto transition-transform duration-300 hover:scale-[1.03] items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}> 
                {/* Main image (alternates left/right on desktop) */}
                <div className="flex-shrink-0 flex items-center justify-center h-full px-8 md:px-12 py-8 md:py-0">
                  <div className="w-[260px] h-[200px] md:w-[320px] md:h-[240px] flex items-center justify-center rounded-[2rem] overflow-hidden border-4 border-[#5865f2] bg-[#232946]/80 drop-shadow-neon">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover rounded-[2rem]"
                      draggable={false}
                    />
                  </div>
                </div>
                {/* Text content for each feature card */}
                <div className="flex-1 flex flex-col justify-center gap-4 px-8 md:px-12 py-8 md:py-0">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-neon leading-tight">{card.title}</h2>
                  <p className="text-lg md:text-xl text-gray-200 max-w-2xl">{card.text}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
