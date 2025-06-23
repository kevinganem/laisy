"use client";
import React from 'react';
import { useLanguage } from '../../components/LanguageProvider';

const CookiesPage = () => {
  const { t } = useLanguage();
  const sections = t('policies.cookies.sections');
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 text-white">
      <h1 className="text-4xl font-bold mb-6">{t('policies.cookies_title') as string }</h1>
      <div className="max-w-2xl text-lg text-white/90 space-y-6">
        {Array.isArray(sections) && sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
};

export default CookiesPage; 