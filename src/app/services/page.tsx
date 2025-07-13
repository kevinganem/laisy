"use client";
import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import ServiceCard from "../components/ServiceCard";
import { FaBug, FaGamepad, FaCheckCircle, FaRocket, FaWrench, FaShieldAlt, FaStar, FaClock, FaSmile, FaRobot, FaBrain, FaComments, FaChartLine, FaCogs } from "react-icons/fa";
import { useLanguage } from "../components/LanguageProvider";
import { getPublicAssetPath } from "../utils/getPublicAssetPath";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  FaBug: <FaBug size={40} />,
  FaGamepad: <FaGamepad size={40} />,
  FaCheckCircle: <FaCheckCircle size={40} />,
  FaRocket: <FaRocket size={40} />,
  FaWrench: <FaWrench size={40} />,
  FaShieldAlt: <FaShieldAlt size={40} className="text-[#1F2937]" />,
  FaStar: <FaStar size={28} className="text-[#57f287]" />,
  FaClock: <FaClock size={28} className="text-[#5865f2]" />,
  FaSmile: <FaSmile size={28} className="text-[#eb459e]" />,
  FaRobot: <FaRobot size={40} className="text-[#3B82F6]" />,
  FaBrain: <FaBrain size={40} className="text-[#8B5CF6]" />,
  FaComments: <FaComments size={40} className="text-[#06B6D4]" />,
  FaChartLine: <FaChartLine size={40} className="text-[#10B981]" />,
  FaCogs: <FaCogs size={40} className="text-[#F59E0B]" />,
};

/**
 * ServicesPage component
 * Lists all AI automation services with animated appearance and call-to-action.
 * Uses AnimatedSection for scroll-based reveal animations.
 */
const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const services = t('services.list');
  const whyKeepia = t('services.why');
  return (
    <div className="flex flex-col gap-24 pt-16 sm:pt-24">
      {/* Hero section with service overview and demo video */}
      <AnimatedSection>
        <div className="relative max-w-5xl w-full mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20 min-h-[320px] mb-4">
          <div className="flex-1 flex flex-col gap-4 items-center justify-center z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-neon leading-tight text-center" dangerouslySetInnerHTML={{ __html: t('services.hero') as string }} />
            <p className="text-lg md:text-xl text-gray-200 max-w-xl text-center">
              {t('services.description') as string}
            </p>
          </div>
          <div className="flex-1 flex justify-center items-center z-10">
          <video
              src={getPublicAssetPath('/cardVideo_keyboard.mp4')}
              autoPlay
              loop
              muted
              playsInline
              className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] object-cover rounded-3xl shadow-2xl border-4 border-[#5865f2] bg-[#23272a]"
              aria-label="AI Automation Demo"
            />
          </div>
          {/* Animated background particles */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" className="absolute inset-0 animate-pulse" style={{ filter: 'blur(2px)' }}>
              <circle cx="20%" cy="30%" r="18" fill="#5865f2" fillOpacity="0.18" />
              <circle cx="80%" cy="60%" r="12" fill="#57f287" fillOpacity="0.15" />
              <circle cx="60%" cy="20%" r="8" fill="#eb459e" fillOpacity="0.13" />
              <circle cx="40%" cy="80%" r="10" fill="#5865f2" fillOpacity="0.12" />
            </svg>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Services grid displaying all AI automation services */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Array.isArray(services) && services.map((s, i) => (
            <ServiceCard
              key={i}
              icon={iconMap[s.icon]}
              title={s.title}
              description={s.desc}
              className="min-h-[260px] md:min-h-[320px] bg-[#0a1333]/80 border border-[#5865f2]/20 rounded-3xl shadow-2xl hover:scale-[1.03] transition-transform duration-300"
            />
          ))}
        </div>
      </AnimatedSection>
      
      {/* Why choose KEEPIA: highlights unique selling points */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap gap-8 justify-center">
            {Array.isArray(whyKeepia) && whyKeepia.map((w, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#23272a]/80 px-6 py-4 rounded-2xl shadow-lg border border-[#5865f2]/20">
                {iconMap[Object.keys(iconMap)[i+6]]}
                <span className="text-white text-lg font-semibold">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      {/* Call-to-action section */}
      <AnimatedSection delay={0.2}>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl text-white font-bold drop-shadow-neon">{t('services.cta') as string}</p>
          <Link href="/contact" className="bg-[#5865f2] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#4752c4] transition-colors text-lg">{t('services.ctaBtn') as string}</Link>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default ServicesPage; 