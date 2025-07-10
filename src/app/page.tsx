"use client";
import React from "react";
import AnimatedSection from "./components/AnimatedSection";
import { useLanguage } from './components/LanguageProvider';
import Link from 'next/link';
import Image from 'next/image';
import { getPublicAssetPath } from "./utils/getPublicAssetPath";

/**
 * HomePage component
 * Displays the main landing page with a hero section and alternating feature cards.
 * Uses AnimatedSection for scroll-based reveal animations.
 * Modern AI/tech inspired design with responsive layout.
 */
const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const homeCards = t('homeCards');

  return (
    <div className="flex flex-col gap-30 pt-16 sm:pt-24">
      {/* Hero section with main value proposition and call-to-action buttons */}
      <AnimatedSection>
        <div className="max-w-5xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 min-h-[420px]">
          <div className="flex flex-col gap-6 items-center justify-center flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-neon leading-tight uppercase">
              {t('hero.home') as string}
            </h1>
            <p className="text-base md:text-l text-gray-200 max-w-xl mx-auto">
              {t('hero.description') as string}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center">
              <Link href="/services" className="bg-[#5865f2] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#4752c4] transition-colors text-lg w-full sm:w-auto text-center">{t('hero.services') as string}</Link>
              <Link href="/contact" className="bg-[#23272a] text-white px-8 py-3 rounded-xl font-semibold border border-[#5865f2] hover:bg-[#313338] transition-colors text-lg w-full sm:w-auto text-center">{t('hero.contact') as string}</Link>
            </div>
          </div>
          <div className="flex justify-center items-center flex-1">
            <video
              src={getPublicAssetPath('/hero_home.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-[#5865f2] bg-[#23272a]"
              aria-label="AI Automation Demo"
            />
          </div>
        </div>
      </AnimatedSection>
      
      {/* Feature cards section with alternating layout */}
      <div className="flex flex-col gap-30 items-center">
        {Array.isArray(homeCards) && homeCards.map((card, idx) => {
          const isEven = idx % 2 === 0;
          const flexDirection = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
          const imagePadding = isEven ? 'md:pr-10' : 'md:pl-10';
          return (
            <AnimatedSection key={idx} delay={0.1 * idx}>
              <div className="relative flex w-full max-w-5xl">
                <div className={`flex flex-col ${flexDirection} w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2.5rem] shadow-2xl mx-auto transition-transform duration-300 hover:scale-[1.03] items-center min-h-96 md:min-h-112 gap-4 md:gap-0 p-6 md:p-10`}>
                  {/* Feature card text content */}
                  <div className="flex-1 flex flex-col justify-center gap-4 px-6 md:px-12 pt-8 pb-2 md:py-0 order-1 w-full">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-neon leading-tight text-center md:text-left uppercase">{card.title}</h2>
                    <p className="text-base md:text-l text-gray-200 max-w-2xl text-center md:text-left">{card.text}</p>
                  </div>
                  {/* Feature card image with responsive positioning */}
                  <div className={`flex-shrink-0 flex items-center justify-center order-2 mt-2 md:mt-0 ${imagePadding}`}>
                    <div className="w-80 h-64 md:w-96 md:h-80 flex items-center justify-center rounded-[2rem] overflow-hidden border-4 border-[#5865f2] bg-[#232946]/80 drop-shadow-neon">
                      <Image
                        src={getPublicAssetPath(card.image as string)}
                        alt={card.alt}
                        width={320}
                        height={240}
                        className="w-full h-full object-cover rounded-[2rem]"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
