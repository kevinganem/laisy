# 🕹️ bugket — Game QA Testing Studio Website

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-blue?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.18.1-ec4899?logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Status](https://img.shields.io/badge/status-in%20progress-blueviolet)

> **bugket** is a modern, immersive website for a video game QA testing company. Inspired by Discord's design language, it showcases services, expertise, team, and contact in a playful, professional, and animated way.

---

## 🎮 Product Vision

**bugket** helps game studios deliver flawless games. This site is a digital showcase for bugket's QA expertise, services, and team, designed to:
- Attract and reassure potential clients
- Present a clear, engaging value proposition
- Make contact easy and appealing

---

## ✨ Features

- **Immersive UI/UX** inspired by Discord and gaming culture
- **Animated backgrounds** (neon particles, floating SVGs, glassmorphism)
- **Sticky navigation** and modern layout
- **Multi-language support** (EN, FR, ES, DE)
- **Animated sections and cards** (Framer Motion)
- **Modular, reusable components**
- **Accessible & responsive** (WCAG AA, mobile/tablet ready)
- **Contact form** with email delivery (Formspree integration)
- **SEO & performance optimized**

---

## 🚀 Tech Stack

- **Next.js 15** (App Router, SSR/CSR, TypeScript)
- **React 19**
- **TailwindCSS 4** (utility-first, custom theme)
- **Framer Motion 12** (animations, transitions)
- **next-intl** (i18n)
- **Formspree** (contact form backend)
- **ESLint, Prettier** (code quality)

---

## 🗂️ Project Structure

```
/bugket
  ├─ src/
  │   ├─ app/
  │   │   ├─ [section]/page.tsx   # Main pages (home, services, expertise, about, contact)
  │   │   └─ components/          # Reusable UI components
  │   ├─ locales/                 # i18n translation files (en, fr, es, de)
  │   └─ types/                   # TypeScript types
  ├─ public/                      # Static assets (images, icons, logo)
  ├─ memory-bank/                 # Project context & documentation (Cursor methodology)
  ├─ tailwind.config.js           # TailwindCSS config
  ├─ next.config.ts               # Next.js config
  └─ ...
```

---


## 🌍 Multi-language Support

- All content is translatable (EN, FR, ES, DE)
- Easily add new languages in `/src/locales/`
- Language selector in the footer

---

## 📬 Contact Form

- Integrated with [Formspree](https://formspree.io/) for email delivery
- Animated success/error feedback
- Fully accessible and translatable

---

## 🧩 Main Components

- `Header` — Sticky logo, navigation, and contact button
- `Footer` — Navigation, language selector, social links
- `AnimatedSection` — Fade/slide-in animation for any block
- `ServiceCard`, `ExpertiseBlock`, `TeamMember` — Modular, animated cards
- `NeonBackgroundElements` — Animated SVG neon particles
- `BackgroundImages` — Floating decorative images
- `ContactForm` — Accessible, animated, Formspree-powered

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

> _Made with passion for games and quality._
