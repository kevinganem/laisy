"use client";
import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import TeamMember from "../components/TeamMember";
import { useLanguage } from "../components/LanguageProvider";
import Image from 'next/image';
import { getPublicAssetPath } from "../utils/getPublicAssetPath";

/**
 * About page for bugket.
 * Presents the company's story, mission, and team.
 */
const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const team = t('about.team');
  const values = t('about.values');
  const funFacts = t('about.funFacts');
  return (
    <div className="flex flex-col gap-24 pt-16 sm:pt-24">
      {/* Hero section */}
      <AnimatedSection>
        <div className="relative flex flex-col items-center gap-6 min-h-[260px] mb-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-neon leading-tight text-center" dangerouslySetInnerHTML={{ __html: t('about.hero') as string }} />
          <div className="flex gap-4 md:gap-8 justify-center items-center z-10">
            {Array.isArray(team) && team.map((m, i) => (
              <Image
                key={i}
                src={getPublicAssetPath(m.avatar as string)}
                alt={m.name}
                width={128}
                height={128}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#5865f2] object-cover shadow-lg bg-[#232946]/80"
                draggable={false}
              />
            ))}
          </div>
          {/* Neon particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ filter: 'blur(2px)' }}>
              <circle cx="20%" cy="60%" r="14" fill="#5865f2" fillOpacity="0.18" />
              <circle cx="80%" cy="30%" r="10" fill="#eb459e" fillOpacity="0.15" />
              <circle cx="50%" cy="20%" r="8" fill="#57f287" fillOpacity="0.13" />
              <circle cx="60%" cy="80%" r="10" fill="#5865f2" fillOpacity="0.12" />
            </svg>
          </div>
        </div>
      </AnimatedSection>
      {/* Team section */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Array.isArray(team) && team.map((m, i) => (
            <TeamMember key={i} {...m} className="bg-white/10 border border-white/10 hover:scale-105 transition-transform duration-300 shadow-lg backdrop-blur-md" />
          ))}
        </div>
      </AnimatedSection>
      {/* Values */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-wrap gap-4 justify-center">
          {Array.isArray(values) && values.map((v, i) => (
            <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] text-white font-semibold text-sm shadow-neon animate-pulse">
              {v}
            </span>
          ))}
        </div>
      </AnimatedSection>
      {/* Fun facts */}
      <AnimatedSection delay={0.2}>
        <div className="flex flex-col items-center gap-2">
          {Array.isArray(funFacts) && funFacts.map((f, i) => (
            <span key={i} className="text-white bg-black/40 px-4 py-2 rounded-xl shadow-md text-base font-mono animate-fade-in">
              {f}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AboutPage; 