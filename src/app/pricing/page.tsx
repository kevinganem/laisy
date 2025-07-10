'use client';

import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import AnimatedSection from '../components/AnimatedSection';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = t('pricing.plans') as PricingPlan[];

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleChoose = (planName: string) => {
    setSelectedPlan(planName);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
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

        {/* Pricing Cards */}
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

        {/* Modal ContactForm */}
        <Modal isOpen={modalOpen} onClose={handleCloseModal}>
          <ContactForm selectedPlan={selectedPlan || undefined} onClose={handleCloseModal} className="max-w-lg w-full p-8 text-lg" />
        </Modal>

        {/* Additional Info */}
        <AnimatedSection delay={0.8}>
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">
              {t('pricing.customSolution') as string}
            </p>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              onClick={() => handleChoose(t('pricing.customSolution') === 'Besoin d\'une solution personnalisée ?' ? 'Demande personnalisée' : 'Custom request')}
            >
              {t('hero.contact') as string}
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
} 