"use client";
// Fix for TypeScript JSON imports (for translation files)
declare module '*.json';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import en from '../../locales/en.json';
import fr from '../../locales/fr.json';

const TRANSLATIONS: Record<string, Translations> = { en, fr };

// Supported languages and their display labels
const LANGUAGES = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

// Type for translation object (recursive for nested keys)
interface Translations {
  [key: string]: unknown;
}

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => unknown;
  languages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang');
      if (stored && LANGUAGES.some(l => l.code === stored)) {
        return stored;
      }
    }
    return 'fr';
  });
  const [translations, setTranslations] = useState<Translations>(TRANSLATIONS['fr']);

  // Load language from localStorage on mount (persist user preference)
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
    if (stored && LANGUAGES.some(l => l.code === stored)) {
      setLanguageState(stored);
    }
  }, []);

  // Load translations when language changes (dynamic import)
  useEffect(() => {
    setTranslations(TRANSLATIONS[language] || TRANSLATIONS['fr']);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language);
    }
  }, [language]);

  // Change language and persist to localStorage
  const setLanguage = (lang: string) => {
    if (LANGUAGES.some(l => l.code === lang)) {
      setLanguageState(lang);
    }
  };

  // Translation function: supports dot notation for nested keys
  const t = (key: string): unknown => {
    return key.split('.').reduce<unknown>((obj, k) => (obj && typeof obj === 'object' && k in obj ? (obj as Translations)[k] : undefined), translations);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}; 