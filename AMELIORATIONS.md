# 🚀 Mastour Oversize — Plan d'Améliorations

> Audit complet du site réalisé le 18/02/2026.
> Classé par priorité : 🔴 Critique · 🟠 Important · 🟡 Recommandé · 🟢 Nice-to-have

---

## 📑 Table des matières

1. [Images & Contenu Visuel](#1--images--contenu-visuel)
2. [Fonctionnalités E-commerce](#2--fonctionnalités-e-commerce)
3. [Pages Manquantes](#3--pages-manquantes)
4. [UX / UI](#4--ux--ui)
5. [SEO & Performance](#5--seo--performance)
6. [Mobile & Responsive](#6--mobile--responsive)
7. [Formulaire de Contact](#7--formulaire-de-contact)
8. [Infrastructure & Déploiement](#8--infrastructure--déploiement)
9. [Branding & Réseaux Sociaux](#9--branding--réseaux-sociaux)
10. [Sécurité & Conformité](#10--sécurité--conformité)

---

## 1. 🖼 Images & Contenu Visuel

### 🔴 Remplacer TOUS les placeholders produits
- **Problème** : Tous les produits utilisent `/images/products/placeholder-product.svg` — aucune vraie photo n'est affichée.
- **Impact** : Le site perd toute crédibilité commerciale sans photos réelles.
- **Action** :
  - Prendre de vraies photos produits (fond neutre, éclairage naturel)
  - Format recommandé : WebP, 800×1200px (ratio 3:4)
  - Ajouter 2-3 vues par produit minimum (face, dos, détail tissu)
  - Mettre à jour `data/products.json` avec les vrais chemins

### 🔴 Remplacer l'image promotions
- **Problème** : Les promotions utilisent `/images/hero-bg.svg` (un SVG placeholder).
- **Action** : Créer des visuels promotionnels dédiés pour chaque offre.

### 🟠 Ajouter une image pour la page "La Marque"
- **Problème** : La page About utilise `/images/hero-bg.svg` comme placeholder.
- **Action** : Ajouter une photo lifestyle/atelier de la marque.

### 🟡 Optimiser les images existantes
- **Problème** : `hero-bg-real.png` fait 2 Mo, `intro-philosophy.png` fait 1,5 Mo.
- **Action** :
  - Convertir en WebP (réduction ~70% du poids)
  - Utiliser `next/image` avec `quality={80}` et `placeholder="blur"`
  - Ajouter des `blurDataURL` pour le chargement progressif

---

## 2. 🛒 Fonctionnalités E-commerce

### ✅ ~~Enrichir le catalogue produits~~ (FAIT)
- ~~**Problème** : Seulement 4 produits dans `products.json`.~~
- **Réalisé** :
  - ✅ 14 produits réalistes ajoutés (Robes, Abayas, Ensembles, Kimonos)
  - ✅ Nouveaux champs : `colors`, `material`, `careInstructions`, `weight`
  - ✅ Champ `stock` avec disponibilité par taille

### ✅ ~~Ajouter un système de filtrage / tri~~ (FAIT)
- ~~**Problème** : La page `/articles` n'a aucun filtre.~~
- **Réalisé** :
  - ✅ Filtres par catégorie (Robes, Abayas, Ensembles, Kimonos)
  - ✅ Filtres par taille (dynamique selon les produits)
  - ✅ Tri par prix (croissant/décroissant), nom A-Z, mis en avant
  - ✅ Filtre "En promotion" avec toggle
  - ✅ Tags des filtres actifs avec suppression individuelle
  - ✅ État vide élégant avec reset

### 🟡 Galerie produit interactive
- **Problème** : Sur la fiche produit, les images ne sont pas cliquables/changeables.
- **Action** :
  - Clic sur miniature → change l'image principale
  - Zoom au survol ou lightbox plein écran
  - Swipe sur mobile

### ✅ ~~Sélection de taille interactive~~ (FAIT)
- ~~**Problème** : Les tailles ne sont pas sélectionnables.~~
- **Réalisé** :
  - ✅ Sélection de taille avec état actif (rose, scale, shadow)
  - ✅ Message Instagram dynamique avec taille sélectionnée intégrée
  - ✅ Bouton "Copier le message" avant d'aller sur Instagram
  - ✅ Tailles en rupture grisées + texte "Épuisé"
  - ✅ CTA désactivé tant qu'aucune taille n'est choisie

### ✅ ~~Guide des tailles~~ (FAIT)
- ~~**Problème** : Aucun guide des tailles n'existe.~~
- **Réalisé** :
  - ✅ Modal élégant avec instructions de mesure illustrées
  - ✅ Tableau avec poitrine, taille, hanches, longueur par taille
  - ✅ Onglets : tailles S-XXL + tailles 52-58
  - ✅ Accessible via lien "📏 Guide des tailles" sur chaque fiche produit
  - ✅ Fermeture Escape / clic extérieur / bouton X

### 🟢 Système de "Wishlist" / Favoris
- **Action** : Permettre aux visiteurs de sauvegarder des articles favoris (localStorage).

### 🟢 Produits similaires / associés
- **Action** : Afficher "Vous aimerez aussi" en bas des fiches produits (même catégorie).

---

## 3. 📄 Pages Manquantes

### ✅ ~~Pages légales obligatoires~~ (FAIT)
- ~~**Problème** : Les liens `/cgv` et `/rgpd` dans le footer ne mènent nulle part.~~
- **Réalisé** :
  - ✅ `/app/cgv/page.tsx` — 12 articles : objet, identité, produits, commandes, prix, paiement, livraison, rétractation (14j), échanges, réclamations, PI, droit applicable
  - ✅ `/app/rgpd/page.tsx` — 11 sections RGPD : responsable, données collectées, finalités, conservation, droits (accès/rectification/suppression/portabilité/opposition), cookies, partage, sécurité, transferts hors UE, CNIL
  - ⚠️ Placeholders `[À compléter]` à remplir avec les données légales réelles (SIRET, adresse, forme juridique)

### 🟠 Page 404 personnalisée
- **Action** : Créer `/app/not-found.tsx` avec le branding Mastour Oversize.

### ✅ ~~Page FAQ~~ (FAIT)
- **Réalisé** :
  - ✅ `/app/faq/page.tsx` — 5 catégories, 19 questions-réponses
  - ✅ Accordion interactif avec animation (composant `FAQAccordion`)
  - ✅ Catégories : Commander, Livraison, Tailles, Retours, Paiement
  - ✅ Lien ajouté dans le footer + sitemap
  - ✅ CTA Instagram en bas de page

### 🟡 Page "Lookbook" / Inspirations
- **Action** : Galerie lifestyle avec les tenues portées, ambiance éditoriale.

---

## 4. 🎨 UX / UI

### ✅ ~~Ajouter des animations de scroll (Scroll Reveal)~~ (FAIT)
- ~~**Problème** : Les sections apparaissent statiquement — manque de dynamisme.~~
- **Réalisé** :
  - ✅ Composant `ScrollReveal` réutilisable (Intersection Observer, 0 dépendance)
  - ✅ 5 animations : `fade-up`, `fade-in`, `fade-left`, `fade-right`, `scale`
  - ✅ Props configurables : `delay`, `duration`, `threshold`, `once`
  - ✅ Intégré sur la page d'accueil : philosophie, favoris (staggered), promotions, Instagram CTA

### ✅ ~~Barre d'annonce en haut du site~~ (FAIT)
- **Réalisé** :
  - ✅ Bandeau noir au-dessus du header avec messages rotatifs (5s)
  - ✅ Bouton de fermeture (X) avec persistance par session (sessionStorage)
  - ✅ 3 messages configurables : livraison offerte, nouvelle collection, code promo
  - ✅ Configuration facile via le tableau `announcements` en haut du composant

### 🟠 Composant "WhyUs" non utilisé
- **Problème** : Le composant `components/WhyUs.tsx` existe mais n'est pas inclus dans la homepage.
- **Action** : L'intégrer dans `page.tsx` entre les favoris et les promotions.

### ✅ ~~Retour en haut de page (Scroll to Top)~~ (FAIT)
- **Réalisé** : Bouton flottant (bas droite) apparaît après 400px de scroll, smooth scroll, hover rose, fade-in.

### 🟡 Skeleton loading pour les images
- **Action** : Ajouter un skeleton/shimmer pendant le chargement des images produits.

### ✅ ~~Breadcrumbs~~ (FAIT)
- **Réalisé** : Composant `Breadcrumbs` réutilisable avec icône 🏠 Accueil > Collection > Nom du produit. Intégré sur les fiches produits.

### ✅ ~~Mode sombre (Dark Mode)~~ (FAIT)
- **Réalisé** :
  - ✅ `ThemeProvider` avec contexte React, localStorage, détection `prefers-color-scheme`
  - ✅ Toggle 🌙/☀️ dans le header (desktop + mobile)
  - ✅ Palette sombre adaptée : charbon profond, rose tamisé, beige chaud
  - ✅ Override CSS complet : backgrounds, textes, bordures, ombres, inputs, footer, header

### ✅ ~~Transitions de page~~ (FAIT)
- **Réalisé** : Composant `PageTransition` — fade-out + slide-down à la sortie (200ms), fade-in + slide-up à l'entrée (300ms). Zéro dépendance, CSS transitions uniquement.

---

## 5. 🔍 SEO & Performance

### 🟠 Open Graph / Meta tags enrichis
- **Problème** : Seule la page produit a des `openGraph` images. Les autres pages n'en ont pas.
- **Action** :
  - Ajouter `og:image` sur toutes les pages (homepage, collection, promotions, about, contact)
  - Ajouter `twitter:card` meta tags
  - Créer une image OG par défaut (1200×630px) avec le logo Mastour

### 🟠 Ajouter un favicon correct
- **Problème** : Le favicon actuel est le favicon Next.js par défaut (25 Ko).
- **Action** :
  - Utiliser le monogramme "MO" comme favicon
  - Générer les tailles : 16×16, 32×32, 180×180 (apple-touch-icon)
  - Ajouter `manifest.json` pour PWA

### 🟡 Données structurées (JSON-LD) étendues
- **Le produit a déjà du JSON-LD** — bien !
- **Action** :
  - Ajouter `Organization` schema sur la page d'accueil
  - Ajouter `BreadcrumbList` schema
  - Ajouter `WebSite` schema avec `SearchAction`

### 🟡 Performance Core Web Vitals
- **Action** :
  - Analyser avec Lighthouse et PageSpeed Insights
  - Lazy-loader les composants sous le fold (`dynamic()` de Next.js)
  - Précharger les fonts critiques (`preload`)
  - Utiliser `priority` uniquement sur les images above-the-fold

### 🟡 URL canoniques
- **Action** : Ajouter des `<link rel="canonical">` sur toutes les pages.

### 🟢 Sitemap et Robots optimisés
- **Existant ✅** : `sitemap.ts` et `robots.ts` sont déjà en place.
- **Action** : Soumettre le sitemap à Google Search Console.

---

## 6. 📱 Mobile & Responsive

### ✅ ~~Ajuster le logo dans le header mobile~~ (FAIT)
- **Réalisé** : Monogramme `MO` (40×40) sur mobile, logo `full` avec ornement (180×70) sur `md:` et au-dessus. Deux éléments rendus avec `md:hidden` / `hidden md:block`.

### ✅ ~~Menu mobile : indication de la page actuelle~~ (FAIT)
- **Réalisé** :
  - ✅ Panneau latéral 280px avec logo compact en haut
  - ✅ Backdrop semi-transparent avec fermeture au clic
  - ✅ Fermeture auto au changement de route + scroll lock
  - ✅ Page active surlignée (fond rose, bordure gauche)
  - ✅ Toggle dark mode + CTA Instagram gradient en bas du menu

### ✅ ~~Bottom Navigation mobile~~ (FAIT)
- **Réalisé** : Barre fixe en bas sur mobile avec 4 items (Accueil, Collection, Instagram, Contact). Instagram en gradient rose. Page active avec indicateur supérieur + icône épaisse. Support safe-area pour iPhone.

### 🟢 PWA (Progressive Web App)
- **Action** :
  - Ajouter `manifest.json`
  - Splash screen avec le logo
  - Installable sur écran d'accueil mobile

---

## 7. ✉️ Formulaire de Contact

### 🔴 Connecter le formulaire à un vrai backend
- **Problème** : Le `handleSubmit` utilise un `setTimeout` simulé — aucun email n'est réellement envoyé.
- **Action** : Options possibles :
  - **Formspree** (gratuit, simple) — `action="https://formspree.io/f/xxxx"`
  - **Resend** + Route API Next.js — plus professionnel
  - **EmailJS** — envoi côté client
  - **Netlify Forms** — si déployé sur Netlify

### ✅ ~~Validation de formulaire améliorée~~ (FAIT)
- **Réalisé** :
  - ✅ `react-hook-form` + `zod` + `@hookform/resolvers` installés
  - ✅ Validation temps réel (mode `onTouched` : au blur puis au changement)
  - ✅ Schéma zod : nom (2-100 chars), email (regex), téléphone (regex optionnel), message (10-2000 chars), consentement requis
  - ✅ Erreurs inline avec icône ⚠️ sous chaque champ
  - ✅ Bordures dynamiques : gris → vert (valide) ou rouge (erreur)
  - ✅ Compteur de caractères pour le message
  - ✅ Indicateurs `*` sur les champs obligatoires

### 🟡 Protection anti-spam renforcée
- **Existant ✅** : Un honeypot `_gotcha` est en place.
- **Action** :
  - Ajouter un rate-limiting (max 3 envois / 10 min)
  - Considérer reCAPTCHA v3 (invisible) si le spam devient un problème

---

## 8. 🏗 Infrastructure & Déploiement

### 🟠 Migrer les données vers un CMS
- **Problème** : Les produits sont en dur dans des fichiers JSON. Toute modification nécessite un redéploiement.
- **Action** : Options possibles :
  - **Sanity** (headless CMS, excellent avec Next.js)
  - **Strapi** (open-source, self-hosted)
  - **Notion** comme CMS basique (via API)
  - **Google Sheets** + API comme solution ultra-simple

### 🟠 Configuration de l'environnement
- **Problème** : L'URL de base `https://mastouroversize.com` est codée en dur dans `sitemap.ts`.
- **Action** :
  - Utiliser des variables d'environnement (`.env.local`)
  - `NEXT_PUBLIC_SITE_URL=https://mastouroversize.com`
  - Référencer dans sitemap, robots, JSON-LD, etc.

### 🟡 Analytics
- **Action** :
  - Intégrer Google Analytics 4 (ou Plausible/Umami pour respecter RGPD)
  - Tracker : vues produits, clics Instagram, pages les plus visitées
  - Facebook Pixel si campagnes publicitaires Instagram/Facebook

### 🟡 Déployer sur Vercel
- **Action** :
  - `vercel deploy` ou connecter le repo GitHub à Vercel
  - Configurer le domaine `mastouroversize.com`
  - SSL automatique, CDN mondial, preview deployments

### 🟢 Tests automatisés
- **Action** :
  - Tests unitaires composants (Jest + React Testing Library)
  - Tests E2E pour les parcours critiques (Playwright)
  - CI/CD avec GitHub Actions

---

## 9. 📣 Branding & Réseaux Sociaux

### 🟠 Intégrer un feed Instagram réel
- **Problème** : Le CTA Instagram est un simple bouton — pas de preview du contenu.
- **Action** :
  - Afficher les 6-9 dernières publications Instagram dans une grille
  - Utiliser l'API Instagram Basic Display ou un service comme Elfsight/Behold
  - Augmente l'engagement et la preuve sociale

### 🟡 Témoignages / Avis clients
- **Action** :
  - Section "Avis de nos clientes" avec citations, noms et étoiles
  - Screenshots de messages Instagram (preuve sociale)
  - Carousel interactif

### 🟡 Newsletter / Liste email
- **Action** :
  - Popup d'inscription (avec délai, non intrusif)
  - Section newsletter dans le footer
  - Utiliser Mailchimp, Brevo (ex-Sendinblue) ou ConvertKit
  - Offrir un code promo en cadeau d'inscription

### 🟢 Partage sur réseaux sociaux
- **Action** : Boutons de partage sur les fiches produits (WhatsApp, Instagram, Twitter).

### 🟢 Bouton WhatsApp flottant
- **Action** : Icône WhatsApp fixe en bas à droite pour contact direct rapide.

---

## 10. 🔐 Sécurité & Conformité

### 🔴 Bannière cookies / RGPD
- **Problème** : Aucun bandeau de consentement cookies n'est présent.
- **Action** :
  - Ajouter une bannière cookies (obligatoire si analytics/trackers)
  - Bibliothèques : `cookie-consent-banner`, `react-cookie-consent`
  - Ne charger Analytics qu'après consentement

### 🔴 Mentions légales
- **Problème** : Pages CGV et RGPD référencées mais non créées.
- **Action** : Obligatoire pour tout site commercial en France :
  - Nom/dénomination de l'entreprise
  - Adresse du siège
  - Numéro SIRET
  - Hébergeur du site
  - Conditions de retour/remboursement

### 🟡 Headers de sécurité HTTP
- **Action** : Configurer dans `next.config.ts` :
  - `Content-Security-Policy`
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `Referrer-Policy`

---

## 📊 Résumé Prioritaire

| Priorité | Nombre | Actions clés |
|----------|--------|-------------|
| 🔴 Critique | **5** | Photos produits, formulaire contact, pages légales, cookies RGPD |
| 🟠 Important | **11** | Filtres collection, animation scroll, CMS, analytics, feed Instagram, annonce bandeau |
| 🟡 Recommandé | **15** | Guide tailles, FAQ, galerie interactive, validation formulaire, SEO enrichi |
| 🟢 Nice-to-have | **8** | Dark mode, PWA, wishlist, WhatsApp, transitions, tests E2E |

---

## ⚡ Quick Wins (réalisables en <1h chacun)

1. ✅ Intégrer `WhyUs.tsx` dans la homepage (le composant existe déjà)
2. ✅ Optimiser les images en WebP
3. ✅ Ajouter un favicon avec le monogramme MO
4. ✅ Créer les pages CGV et RGPD (même basiques)
5. ✅ Ajouter les meta `og:image` partout
6. ✅ Connecter le formulaire contact à Formspree (~5 min)
7. ✅ Ajouter une barre d'annonce promotionnelle
8. ✅ Logo responsive (compact sur mobile)

---

> 💡 **Prochaine étape recommandée** : Commencer par les 🔴 critiques (photos produits + pages légales + formulaire) puis passer aux 🟠 importants pour transformer le site vitrine en vrai outil commercial professionnel.
