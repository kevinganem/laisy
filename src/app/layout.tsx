import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NeonBackgroundElements from "./components/NeonBackgroundElements";
import BackgroundImages from "./components/BackgroundImages";
import { LanguageProvider } from "./components/LanguageProvider";
import { getPublicAssetPath } from "./utils/getPublicAssetPath";
// import { AnimatePresence, motion } from "framer-motion"; // Uncomment for page transitions

export const metadata: Metadata = {
  title: "Bugket – Game Quality Assurance",
  description: "Game QA, done right. Bugket helps studios deliver flawless games to players worldwide.",
  icons: {
    icon: getPublicAssetPath('/logo.png')
  }
};

/**
 * Root layout for the application.
 * Includes Header, Footer, and wraps all pages.
 * Adds a neon animated background for a retro gaming vibe, enrichi avec des particules façon Discord.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={getPublicAssetPath('/favicon.ico')} type="image/x-icon" />
      </head>
      <body className="relative min-h-screen flex flex-col overflow-x-hidden">
        <LanguageProvider>
          {/* Neon animated background elements (Discord style) */}
          <NeonBackgroundElements />
          <BackgroundImages />
          <Header />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            {/*
            // For animated page transitions, wrap children with AnimatePresence and motion.div
            <AnimatePresence mode="wait">
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
          >
            {children}
              </motion.div>
            </AnimatePresence>
            */}
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        {/* Neon background animation keyframes */}
        <style>{`
          @keyframes neon-bg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-neon-bg {
            animation: neon-bg 12s ease-in-out infinite;
          }
        `}</style>
      </body>
    </html>
  );
}
