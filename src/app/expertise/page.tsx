"use client";
import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import ExpertiseBlock from "../components/ExpertiseBlock";
import { useLanguage } from "../components/LanguageProvider";
import { FaCogs, FaUsers, FaChartLine, FaVrCardboard, FaNetworkWired, FaRobot, FaWindows, FaShieldAlt, FaRocket } from "react-icons/fa";
import { SiEpicgames, SiSteam } from "react-icons/si";
import { getPublicAssetPath } from "../utils/getPublicAssetPath";

/**
 * ExpertisePage component
 * Highlights the team's skills, experience, and tools in AI automation and business transformation.
 * Uses AnimatedSection for scroll-based reveal animations.
 */
const ExpertisePage: React.FC = () => {
  const { t } = useLanguage();

  interface ExpertiseItem {
    icon: React.ReactNode;
    title: string;
    desc: string;
  }
  interface StatItem {
    value: string;
    label: string;
  }
  interface HistoryItem {
    year: string;
    event: string;
  }
  interface ToolItem {
    icon: React.ReactNode;
    name: string;
  }

  const expertise = t('expertise.list') as ExpertiseItem[];
  const stats = t('expertise.stats') as StatItem[];
  const history = t('expertise.history') as HistoryItem[];
  const tools = t('expertise.tools') as (ToolItem | string)[];

  const iconMap: Record<string, React.ReactNode> = {
    FaCogs: <FaCogs size={40} className="text-[#F59E0B]" />,
    FaUsers: <FaUsers size={40} className="text-[#06B6D4]" />,
    FaChartLine: <FaChartLine size={40} className="text-[#10B981]" />,
    FaVrCardboard: <FaVrCardboard size={40} className="text-[#8B5CF6]" />,
    FaNetworkWired: <FaNetworkWired size={40} className="text-[#3B82F6]" />,
    FaRobot: <FaRobot size={40} className="text-[#3B82F6]" />,
    FaShieldAlt: <FaShieldAlt size={40} className="text-[#1F2937]" />,
    FaRocket: <FaRocket size={40} className="text-[#eb459e]" />,
    WinGDK: <FaWindows size={36} className="text-[#fff]" />,
    'Epic Games': <SiEpicgames size={36} />,
    Steam: <SiSteam size={36} />,
  };

  return (
    <div className="flex flex-col gap-24 pt-16 sm:pt-24">
      {/* Hero section with expertise overview and demo video */}
      <AnimatedSection>
        <div className="relative max-w-5xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 min-h-[320px] mb-4">
          <div className="flex-1 flex flex-col gap-4 items-center justify-center z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-neon leading-tight text-center" dangerouslySetInnerHTML={{ __html: t('expertise.hero') as string }} />
            <p className="text-lg md:text-xl text-gray-200 max-w-xl text-center">
              {t('expertise.description') as string}
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center z-10">
          <video
              src={getPublicAssetPath('/hero_expertise.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-[#5865f2] bg-[#23272a]"
              aria-label="AI Expertise Demo"
            />
          </div>
          {/* Animated background particles */}
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
      
      {/* Key statistics about LAISY's AI experience */}
      <AnimatedSection>
        <div className="flex flex-wrap gap-8 justify-center">
          {Array.isArray(stats) && stats.map((s: StatItem, i) => (
            <div key={i} className="bg-white/10 border border-white/10 rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg">
              <span className="text-3xl md:text-4xl font-extrabold text-[#57f287] drop-shadow-neon">{s.value}</span>
              <span className="text-gray-200 text-sm mt-2 uppercase tracking-widest">{s.label}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
      
      {/* Company timeline: LAISY.'s history and milestones */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col items-center gap-8">
          {/* Responsive timeline: vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row gap-0 md:gap-8 items-center justify-center w-full md:overflow-x-auto pb-2">
            {/* Mobile: compact vertical timeline */}
            <div className="relative flex flex-col items-center w-full md:hidden py-4">
              {/* Central vertical line */}
              <span className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#5865f2] via-[#57f287] to-[#eb459e] rounded-full z-0" />
              {Array.isArray(history) && history.map((h: HistoryItem, i) => (
                <div key={i} className="relative flex flex-col items-center w-full mb-6 z-10">
                  {/* Year badge on central line */}
                  <div className="flex items-center justify-center w-full">
                    <span className="bg-[#5865f2] text-white font-bold px-4 py-2 rounded-xl shadow-neon border-2 border-white/20 z-10 text-base text-center">{h.year}</span>
                  </div>
                  {/* Event text below badge */}
                  <div className="mt-2 flex justify-center w-full">
                    <span className="bg-black/60 text-white font-bold px-4 py-2 rounded-xl shadow-md text-base text-center">{h.event}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Desktop: horizontal timeline */}
            <div className="hidden md:flex flex-row gap-8 items-center justify-center w-full overflow-x-auto pb-2">
              {Array.isArray(history) && history.map((h: HistoryItem, i) => (
                <div key={i} className="flex flex-col items-center min-w-[160px]">
                  <span className="bg-[#5865f2] text-white px-4 py-2 rounded-full text-base font-bold shadow-neon mb-2">{h.year}</span>
                  <span className="text-white text-sm bg-black/40 px-3 py-2 rounded-xl shadow-md text-center">{h.event}</span>
                  <span className="w-16 h-1 bg-gradient-to-r from-[#5865f2] via-[#57f287] to-[#eb459e] my-2 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Expertise blocks: grid of AI specialties */}
      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array.isArray(expertise) && expertise.map((e: ExpertiseItem, i) => (
            <ExpertiseBlock
              key={i}
              icon={iconMap[e.icon as string]}
              title={e.title}
              description={e.desc}
              className="bg-[#0a1333]/80 border border-[#5865f2]/20 rounded-3xl shadow-2xl hover:scale-[1.03] transition-transform duration-300 min-h-[220px]"
            />
          ))}
        </div>
      </AnimatedSection>
      
      {/* Tools & technologies: AI platforms and development tools */}
      <AnimatedSection delay={0.3}>
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {Array.isArray(tools) && tools.map((t: ToolItem | string, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-[#23272a]/80 px-6 py-4 rounded-2xl shadow-lg border border-[#5865f2]/20">
              {iconMap[typeof t === 'string' ? t : t.name]}
              <span className="text-white text-sm font-semibold mt-1">{typeof t === 'string' ? t : t.name}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ExpertisePage; 