# 🤖 LAISY — Intelligence Artificielle pour l'Automatisation d'Entreprise

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-blue?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.10-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.18.1-ec4899?logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![Status](https://img.shields.io/badge/status-in%20progress-blueviolet)

> **LAISY** est une entreprise spécialisée dans l'Intelligence Artificielle appliquée à l'automatisation des processus en entreprise. Nous aidons les PME et startups à optimiser leurs opérations internes grâce à des solutions IA sur mesure.

---

## 🎯 Vision Produit

**LAISY** révolutionne la façon dont les entreprises gèrent leurs processus internes. Notre site présente nos solutions d'IA pour automatiser et optimiser les tâches répétitives, libérant ainsi le temps de vos équipes pour des missions à plus forte valeur ajoutée.

**Notre mission :** Transformer les entreprises grâce à l'IA, en proposant des solutions accessibles et efficaces pour l'automatisation des processus.

---

## ✨ Services

- **Automatisation de tâches répétitives** (rédaction de documents, gestion des communications internes)
- **IA générative** pour créer des contenus personnalisés (offres, mails, synthèses)
- **Chatbots intelligents** pour répondre aux questions courantes des employés et candidats
- **Analyse automatisée de données** pour optimiser les processus internes
- **Solutions sur mesure** adaptées aux besoins spécifiques de chaque entreprise

---

## 🚀 Tech Stack

- **Next.js 15** (App Router, SSR/CSR, TypeScript)
- **React 19**
- **TailwindCSS 4** (utility-first, custom theme)
- **Framer Motion 12** (animations, transitions)
- **next-intl** (i18n FR/EN)
- **Formspree** (contact form backend)
- **ESLint, Prettier** (code quality)

---

## 🗂️ Structure du Projet

```
/laisy
  ├─ src/
  │   ├─ app/
  │   │   ├─ [section]/page.tsx   # Pages principales (home, services, expertise, about, contact, pricing)
  │   │   └─ components/          # Composants UI réutilisables
  │   ├─ locales/                 # Fichiers de traduction (fr, en)
  │   └─ types/                   # Types TypeScript
  ├─ public/                      # Assets statiques (images, icônes, logo)
  ├─ memory-bank/                 # Contexte projet & documentation (méthodologie Cursor)
  ├─ tailwind.config.js           # Configuration TailwindCSS
  ├─ next.config.ts               # Configuration Next.js
  └─ ...
```

---

## 🌍 Support Multilingue

- Contenu traduit en français et anglais
- Sélecteur de langue dans le footer
- Facilement extensible pour d'autres langues

---

## 📬 Formulaire de Contact

- Intégré avec [Formspree](https://formspree.io/) pour la livraison d'emails
- Feedback animé de succès/erreur
- Entièrement accessible et traduit

---

## 🧩 Composants Principaux

- `Header` — Logo sticky, navigation et bouton contact
- `Footer` — Navigation, sélecteur de langue, liens sociaux
- `AnimatedSection` — Animation fade/slide-in pour n'importe quel bloc
- `ServiceCard`, `ExpertiseBlock`, `TeamMember` — Cartes modulaires animées
- `NeonBackgroundElements` — Particules SVG néon animées
- `BackgroundImages` — Images décoratives flottantes
- `ContactForm` — Accessible, animé, alimenté par Formspree
- `PricingCard` — Cartes de tarification pour les services

---

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

> _Créé avec passion pour l'innovation et l'efficacité d'entreprise._
