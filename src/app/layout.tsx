import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConstellationBackground from "./components/ConstellationBackground";
import { LanguageProvider } from "./components/LanguageProvider";
import { getPublicAssetPath } from "./utils/getPublicAssetPath";
import { ToastProvider } from './components/Toast';


export const metadata: Metadata = {
  title: "LAISY – Intelligence Artificielle pour l'Automatisation d'Entreprise",
  description: "Solutions d'IA pour automatiser vos processus en entreprise. LAISY aide les PME et startups à optimiser leurs opérations internes grâce à l'intelligence artificielle.",
  icons: {
    icon: getPublicAssetPath('/logo.png')
  }
};

/**
 * Root layout for the application.
 * Includes Header, Footer, and wraps all pages.
 * Adds animated background and decorative elements.
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
        <meta property="og:image" content={getPublicAssetPath('/logo.png')} />
        <meta name="twitter:image" content={getPublicAssetPath('/logo.png')} />
      </head>
      <body className="relative min-h-screen flex flex-col overflow-x-hidden">
        <LanguageProvider>
          <ToastProvider>
            {/* Animated constellation background */}
            <ConstellationBackground />
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </ToastProvider>
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
