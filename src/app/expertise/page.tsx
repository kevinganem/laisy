"use client";
import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import ExpertiseBlock from "../components/ExpertiseBlock";
import { useLanguage } from "../components/LanguageProvider";

/**
 * ExpertisePage component
 * Highlights the team's skills, experience, and tools in game QA testing.
 * Uses AnimatedSection for scroll-based reveal animations.
 */
const ExpertisePage: React.FC = () => {
  const { t } = useLanguage();
  const expertise = t('expertise.list') as any[];
  const stats = t('expertise.stats') as any[];
  const history = t('expertise.history') as any[];
  const tools = t('expertise.tools') as any[];
  return (
    <div className="flex flex-col gap-24">
      {/* Hero section: expertise pitch and illustration */}
      <AnimatedSection>
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 min-h-[320px] mb-4 mx-auto">
          <div className="flex-1 flex flex-col gap-4 items-center justify-center z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-neon leading-tight text-center" dangerouslySetInnerHTML={{ __html: t('expertise.hero') as string }} />
            <p className="text-lg md:text-xl text-gray-200 max-w-xl text-center">
              {t('expertise.description') as string}
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center z-10">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
              alt="QA Dashboard Illustration"
              className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-cover rounded-3xl shadow-2xl border-4 border-[#57f287] bg-[#23272a]"
              draggable={false}
            />
          </div>
          {/* Neon particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ filter: 'blur(2px)' }}>
              <circle cx="25%" cy="40%" r="18" fill="#5865f2" fillOpacity="0.18" />
              <circle cx="75%" cy="60%" r="12" fill="#57f287" fillOpacity="0.15" />
              <circle cx="60%" cy="25%" r="8" fill="#eb459e" fillOpacity="0.13" />
              <circle cx="40%" cy="80%" r="10" fill="#57f287" fillOpacity="0.12" />
            </svg>
          </div>
        </div>
      </AnimatedSection>
      {/* Stats: key numbers about bugket's QA experience */}
      <AnimatedSection>
        <div className="flex flex-wrap gap-8 justify-center">
          {Array.isArray(stats) && stats.map((s, i) => (
            <div key={i} className="bg-white/10 border border-white/10 rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg">
              <span className="text-3xl md:text-4xl font-extrabold text-[#57f287] drop-shadow-neon">{(s as any).value}</span>
              <span className="text-gray-200 text-sm mt-2 uppercase tracking-widest">{(s as any).label}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
      {/* Timeline: bugket's company history */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-row gap-8 items-center justify-center w-full overflow-x-auto pb-2">
            {Array.isArray(history) && history.map((h, i) => (
              <div key={i} className="flex flex-col items-center min-w-[160px]">
                <span className="bg-[#5865f2] text-white px-4 py-2 rounded-full text-base font-bold shadow-neon mb-2">{(h as any).year}</span>
                <span className="text-white text-sm bg-black/40 px-3 py-2 rounded-xl shadow-md text-center">{(h as any).event}</span>
                <span className="w-16 h-1 bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] my-2 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      {/* Expertise blocks: grid of QA specialties */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array.isArray(expertise) && expertise.map((e, i) => (
            <ExpertiseBlock
              key={i}
              icon={e.icon}
              title={e.title}
              description={e.desc}
              className="bg-gradient-to-br from-[#232946]/80 via-[#3a1c71]/70 to-[#5865f2]/30 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#5865f2]/20 hover:scale-[1.03] transition-transform duration-300 min-h-[220px]"
            />
          ))}
        </div>
      </AnimatedSection>
      {/* Tools & technologies: icons of platforms and tools */}
      <AnimatedSection delay={0.3}>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {Array.isArray(tools) && tools.map((t, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-[#23272a]/80 px-6 py-4 rounded-2xl shadow-lg border border-[#5865f2]/20">
              {typeof t === 'string' ? null : (t as any).icon}
              <span className="text-white text-sm font-semibold mt-1">{typeof t === 'string' ? t : (t as any).name}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ExpertisePage; 