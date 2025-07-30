'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';
import { FaArrowLeft } from 'react-icons/fa';
import { FaBrain, FaCalendarCheck, FaRocket, FaChartBar, FaComments, FaFileInvoice, FaCalendarAlt, FaCommentDots, FaUserTie, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import Modal from '../components/Modal';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

// --- PackCard component to avoid hook order issues ---
type PackCardProps = {
  pack: {
    key: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
  };
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
};

function PackCard({ pack, isSelected, disabled, onClick }: PackCardProps) {
  return (
    <button
      className={`
        relative flex flex-col h-full items-center bg-[#0a1333]/80 rounded-2xl border-2 transition-all duration-200 shadow-lg
        p-6 min-h-[220px] sm:min-h-[220px] md:min-h-[220px] lg:min-h-[220px]
        w-full max-w-[340px] justify-start group focus:outline-none
        ${isSelected ? 'border-[#8B5CF6] scale-105 shadow-2xl shadow-[#8B5CF6]/20' : 'border-[#23272a] hover:border-[#8B5CF6] hover:scale-105'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <div className="mb-3 flex items-center justify-center w-full relative">
        {pack.icon}
      </div>
      <div className="font-bold text-lg text-white mb-1 text-center">{pack.title}</div>
      <div
        className="text-gray-300 text-sm text-center mb-2"
        style={{ minHeight: '3.5em' }}
      >
        {pack.desc}
      </div>
      {isSelected && (
        <span className="absolute top-2 right-2 text-[#8B5CF6]">
          <FaCheckCircle className="w-5 h-5" />
        </span>
      )}
    </button>
  );
}

export default function PricingPage() {
  const { t } = useLanguage();
  const plans = t('pricing.plans') as PricingPlan[];

  // Stepper state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: formule, 2: packs, 3: recap, 4: contact
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedPacks, setSelectedPacks] = useState<string[]>([]);

  // State for pack detail modal
  const [openPack, setOpenPack] = useState<null | { title: string; desc: string; icon: React.ReactNode }>(null);

  // Handler for choosing a plan
  const handleChoose = (planName: string) => {
    setSelectedPlan(planName);
    setStep(2); // Go to pack selection
    setSelectedPacks([]); // Reset packs
  };
  const handleCloseModal = () => {
    setSelectedPlan(null);
    setSelectedPacks([]);
    setStep(1);
  };

  // Packs data (multilingue)
  const allPacks = [
    {
      key: 'cv',
      icon: <FaBrain className="w-7 h-7 text-[#8B5CF6]" />,
      title: t('packs.cv.title') as string,
      desc: t('packs.cv.desc') as string,
    },
    {
      key: 'leaves',
      icon: <FaCalendarCheck className="w-7 h-7 text-[#57f287]" />,
      title: t('packs.leaves.title') as string,
      desc: t('packs.leaves.desc') as string,
    },
    {
      key: 'onboarding',
      icon: <FaRocket className="w-7 h-7 text-[#eb459e]" />,
      title: t('packs.onboarding.title') as string,
      desc: t('packs.onboarding.desc') as string,
    },
    {
      key: 'reporting',
      icon: <FaChartBar className="w-7 h-7 text-[#3B82F6]" />,
      title: t('packs.reporting.title') as string,
      desc: t('packs.reporting.desc') as string,
    },
    {
      key: 'reminders',
      icon: <FaComments className="w-7 h-7 text-[#F59E42]" />,
      title: t('packs.reminders.title') as string,
      desc: t('packs.reminders.desc') as string,
    },
    {
      key: 'docs',
      icon: <FaFileInvoice className="w-7 h-7 text-[#10B981]" />,
      title: t('packs.docs.title') as string,
      desc: t('packs.docs.desc') as string,
    },
    {
      key: 'booking',
      icon: <FaCalendarAlt className="w-7 h-7 text-[#5865f2]" />,
      title: t('packs.booking.title') as string,
      desc: t('packs.booking.desc') as string,
    },
    {
      key: 'interviews',
      icon: <FaCommentDots className="w-7 h-7 text-[#F59E42]" />,
      title: t('packs.interviews.title') as string,
      desc: t('packs.interviews.desc') as string,
    },
    {
      key: 'assistant',
      icon: <FaUserTie className="w-7 h-7 text-[#5865f2]" />,
      title: t('packs.assistant.title') as string,
      desc: t('packs.assistant.desc') as string,
    },
    {
      key: 'dashboard',
      icon: <FaChartLine className="w-7 h-7 text-[#3B82F6]" />,
      title: t('packs.dashboard.title') as string,
      desc: t('packs.dashboard.desc') as string,
    },
  ];

  // Helper: get max packs by plan
  const getMaxPacks = (plan: string | null) => {
    if (!plan) return 0;
    if (plan.toLowerCase().includes('starter')) return 1;
    if (plan.toLowerCase().includes('croissance') || plan.toLowerCase().includes('growth')) return 3;
    if (plan.toLowerCase().includes('autonomie') || plan.toLowerCase().includes('autonomy')) return 6;
    return 1;
  };

  // Stepper steps data (factorized)
  const stepsData = [
    { label: t('stepTitles.plan'), icon: '💡' },
    { label: t('stepTitles.services'), icon: '🧩' },
    { label: t('stepTitles.recap'), icon: '📋' },
    { label: t('stepTitles.contact'), icon: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section: always visible */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              dangerouslySetInnerHTML={{ __html: t('pricing.hero') as string }}
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('pricing.description') as string}
            </p>
          </div>
        </AnimatedSection>

        {/* Stepper logic */}
        {step === 1 && (
          <>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto bg-transparent items-stretch">
              {plans.map((plan, index) => {
                // Determine the emoji based on the plan name (fr or en)
                let icon = "";
                if (["Starter"].includes(plan.name)) icon = "🌱";
                else if (["Croissance", "Growth"].includes(plan.name)) icon = "🚀";
                else if (["Autonomie", "Autonomy"].includes(plan.name)) icon = "🤖";

                // Extract setup and monthly price
                const [setup, monthly] = plan.price.split("/").map(s => s.trim());

                return (
                  <AnimatedSection key={plan.name} delay={index * 0.2}>
                    <div
                      className={`relative flex flex-col items-center bg-[#0a1333]/80 rounded-3xl border transition-all duration-300 shadow-xl p-8 w-full h-full min-h-[640px] max-w-[420px] mx-auto
                        ${plan.popular ? 'border-2 border-[#8B5CF6] shadow-2xl shadow-[#8B5CF6]/30 scale-105 z-10 p-12 min-h-[700px] max-w-[460px]' : 'border-[#5865f2]/20 hover:border-[#3B82F6] hover:shadow-2xl hover:shadow-[#3B82F6]/20'}
                      `}
                      style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}
                    >
                      {/* Popular badge */}
                      {plan.popular && (
                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Most popular
                        </span>
                      )}
                      {/* Icon + name */}
                      <div className="flex flex-col items-center mb-4 mt-2">
                        <span className="text-4xl mb-2">{icon}</span>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{plan.name}</h3>
                      </div>
                      {/* Price */}
                      <div className="flex flex-col items-center mb-2">
                        <span className="text-sm text-[#57f287] font-semibold bg-[#23272a] px-3 py-1 rounded-full mb-1">{setup} {t('pricing.setup') as string}</span>
                        <span className="text-4xl font-extrabold text-white">
                          {monthly && monthly.replace(/[^0-9€$.,/a-zA-Z]/g, "")}
                          <span className="text-lg text-gray-400 font-medium align-baseline ml-1">{t('pricing.month') as string}</span>
                        </span>
                      </div>
                      {/* Description */}
                      <p className="text-gray-300 text-base mt-2 mb-4 text-center italic">{plan.description}</p>
                      {/* Avantages */}
                      <ul className="space-y-3 mb-8 w-full">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-200 text-base">
                            <svg className="w-5 h-5 text-[#10B981] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {/* CTA */}
                      <button
                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 text-lg shadow-lg mt-auto
                          ${plan.popular
                            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:from-[#a78bfa] hover:to-[#60a5fa] transform hover:scale-105'
                            : 'bg-[#23272a]/80 text-white border border-[#5865f2]/40 hover:bg-[#23272a]/90 hover:border-[#3B82F6]'}
                        `}
                        onClick={() => handleChoose(plan.name)}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
            {/* Contact Us button: only visible in step 1 */}
            <AnimatedSection delay={0.8}>
              <div className="text-center mt-16">
                <p className="text-gray-400 mb-4">
                  {t('pricing.customSolution') as string}
                </p>
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  onClick={() => {
                    setSelectedPlan(t('pricing.customSolution') === "Besoin d'une solution personnalisée ?" ? 'Demande personnalisée' : 'Custom request');
                    setSelectedPacks([]);
                    setStep(4);
                  }}
                >
                  {t('hero.contact') as string}
                </button>
              </div>
            </AnimatedSection>
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            {/* Stepper visual: only show during step 2, above packs */}
            <nav aria-label="Progress" className="mb-8 flex justify-center w-full">
              <ol className="flex gap-4 md:gap-8 w-full max-w-2xl">
                {stepsData.map((stepObj, idx) => {
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum;
                  return (
                    <li key={stepObj.label ? String(stepObj.label) : `step-${idx}`} className="flex-1 flex flex-col items-center relative">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                          ${isActive ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-[#8B5CF6] scale-110 shadow-lg' :
                            isCompleted ? 'bg-[#23272a] text-[#8B5CF6] border-[#8B5CF6]' :
                            'bg-[#23272a] text-gray-400 border-[#23272a]'}
                        `}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className="text-2xl">{String(stepObj.icon)}</span>
                      </div>
                      <span className={`mt-2 text-xs font-semibold tracking-wide
                        ${isActive ? 'text-[#8B5CF6]' : isCompleted ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>{String(stepObj.label)}</span>
                      {/* Connector line */}
                      {idx < 3 && (
                        <span className={`absolute top-5 left-full w-8 h-1 md:w-16 md:h-1 rounded bg-gradient-to-r
                          ${isCompleted ? 'from-[#8B5CF6] to-[#3B82F6]' : 'from-[#23272a] to-[#23272a]'}`}
                          style={{ zIndex: 0 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            {/* Pack counter badge */}
            <div className="mb-4 text-center">
              <span className="inline-block bg-[#23272a] text-[#8B5CF6] font-bold px-4 py-2 rounded-full text-base shadow">
                {selectedPacks.length} / {getMaxPacks(selectedPlan)} {t('packs.counter') as string}
              </span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mb-8 justify-items-center items-stretch">
                {allPacks.map((pack) => (
                  <PackCard
                    key={pack.key}
                    pack={pack}
                    isSelected={selectedPacks.includes(pack.key)}
                    disabled={!selectedPacks.includes(pack.key) && selectedPacks.length >= getMaxPacks(selectedPlan)}
                    onClick={() => {
                      if (!selectedPacks.includes(pack.key) && selectedPacks.length < getMaxPacks(selectedPlan)) {
                        setSelectedPacks([...selectedPacks, pack.key]);
                      } else if (selectedPacks.includes(pack.key)) {
                        setSelectedPacks(selectedPacks.filter((k) => k !== pack.key));
                      }
                    }}
                  />
                ))}
              </div>
              <div className="flex w-full max-w-5xl justify-between items-center mt-4">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23272a] text-white hover:bg-[#313338] transition-colors text-base font-semibold"
                  onClick={() => setStep(1)}
                >
                  <FaArrowLeft /> {t('packs.back') as string}
                </button>
                <button
                  className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300
                    ${selectedPacks.length === getMaxPacks(selectedPlan) ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:from-[#a78bfa] hover:to-[#60a5fa] transform hover:scale-105' : 'bg-[#23272a]/80 text-white border border-[#5865f2]/40 opacity-60 cursor-not-allowed'}`}
                  onClick={() => selectedPacks.length === getMaxPacks(selectedPlan) && setStep(3)}
                  disabled={selectedPacks.length !== getMaxPacks(selectedPlan)}
                >
                  {t('packs.next') as string}
                </button>
              </div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            {/* Stepper visual: show in step 3 above recap */}
            <nav aria-label="Progress" className="mb-8 flex justify-center w-full">
              <ol className="flex gap-4 md:gap-8 w-full max-w-2xl">
                {stepsData.map((stepObj, idx) => {
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum;
                  return (
                    <li key={stepObj.label ? String(stepObj.label) : `step-${idx}`} className="flex-1 flex flex-col items-center relative">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                          ${isActive ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-[#8B5CF6] scale-110 shadow-lg' :
                            isCompleted ? 'bg-[#23272a] text-[#8B5CF6] border-[#8B5CF6]' :
                            'bg-[#23272a] text-gray-400 border-[#23272a]'}
                      `}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className="text-2xl">{String(stepObj.icon)}</span>
                      </div>
                      <span className={`mt-2 text-xs font-semibold tracking-wide
                        ${isActive ? 'text-[#8B5CF6]' : isCompleted ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>{String(stepObj.label)}</span>
                      {/* Connector line */}
                      {idx < 3 && (
                        <span className={`absolute top-5 left-full w-8 h-1 md:w-16 md:h-1 rounded bg-gradient-to-r
                          ${isCompleted ? 'from-[#8B5CF6] to-[#3B82F6]' : 'from-[#23272a] to-[#23272a]'}`}
                          style={{ zIndex: 0 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="bg-[#0a1333]/80 rounded-2xl shadow-xl p-8 w-full max-w-3xl mb-8">
              <div className="mb-6">
                <div className="text-gray-400 text-sm mb-1">{t('packs.selectedPlan') as string}</div>
                <div className="font-bold text-xl text-white mb-2">{selectedPlan}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">{t('packs.counter') as string}</div>
                <ul className="space-y-2">
                  {selectedPacks.map((key) => {
                    const pack = allPacks.find((p) => p.key === key);
                    if (!pack || !pack.icon || !pack.title || !pack.desc) return null;
                    return (
                      <li key={key} className="flex items-center gap-3 text-white bg-[#23272a]/60 rounded-lg px-4 py-2">
                        <span>{pack.icon}</span>
                        <span className="font-semibold">{String(pack.title)}</span>
                        <span className="text-gray-300 text-xs ml-2">{String(pack.desc)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex w-full max-w-3xl justify-between items-center mt-4">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23272a] text-white hover:bg-[#313338] transition-colors text-base font-semibold"
                onClick={() => setStep(2)}
              >
                <FaArrowLeft /> {t('packs.back') as string}
              </button>
              <button
                className="px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white hover:from-[#a78bfa] hover:to-[#60a5fa] transform hover:scale-105 transition-all duration-300"
                onClick={() => setStep(4)}
              >
                {t('packs.nextContact') as string}
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            {/* Stepper visual: show in step 4 above contact form */}
            <nav aria-label="Progress" className="mb-8 flex justify-center w-full">
              <ol className="flex gap-4 md:gap-8 w-full max-w-2xl">
                {stepsData.map((stepObj, idx) => {
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum;
                  return (
                    <li key={stepObj.label ? String(stepObj.label) : `step-${idx}`} className="flex-1 flex flex-col items-center relative">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                          ${isActive ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-[#8B5CF6] scale-110 shadow-lg' :
                            isCompleted ? 'bg-[#23272a] text-[#8B5CF6] border-[#8B5CF6]' :
                            'bg-[#23272a] text-gray-400 border-[#23272a]'}
                      `}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span className="text-2xl">{String(stepObj.icon)}</span>
                      </div>
                      <span className={`mt-2 text-xs font-semibold tracking-wide
                        ${isActive ? 'text-[#8B5CF6]' : isCompleted ? 'text-[#8B5CF6]' : 'text-gray-400'}`}>{String(stepObj.label)}</span>
                      {/* Connector line */}
                      {idx < 3 && (
                        <span className={`absolute top-5 left-full w-8 h-1 md:w-16 md:h-1 rounded bg-gradient-to-r
                          ${isCompleted ? 'from-[#8B5CF6] to-[#3B82F6]' : 'from-[#23272a] to-[#23272a]'}`}
                          style={{ zIndex: 0 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <div className="w-full max-w-3xl">
              <ContactForm
                prefillPlan={selectedPlan}
                prefillPacks={selectedPacks.map((key) => {
                  const pack = allPacks.find((p) => p.key === key);
                  return pack ? String(pack.title) : key;
                })}
                onClose={handleCloseModal}
              />
            </div>
            <div className="flex w-full max-w-3xl justify-start items-center mt-4">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#23272a] text-white hover:bg-[#313338] transition-colors text-base font-semibold"
                onClick={() => setStep(3)}
              >
                <FaArrowLeft /> {t('packs.back') as string}
              </button>
            </div>
          </div>
        )}

        {/* Additional Info */}
        {/* The old 'Contact Us' button below all steps is removed */}
      </div>

      {/* Modal for full pack description */}
      <Modal isOpen={!!openPack} onClose={() => setOpenPack(null)}>
        {openPack && (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-4xl mb-2">{openPack.icon}</div>
            <div className="font-bold text-xl text-white">{openPack.title}</div>
            <div className="text-gray-300 text-base whitespace-pre-line">{openPack.desc}</div>
          </div>
        )}
      </Modal>
    </div>
  );
} 