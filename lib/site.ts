export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mastour-oversize.vercel.app';

export const INSTAGRAM_HANDLE = 'mastouroversize';
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;
// Ouvre directement la conversation plutôt que le profil
export const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_HANDLE}`;

export const CONTACT_EMAIL = 'contact@mastouroversize.com';

// Livraison offerte en France métropolitaine à partir de ce montant
export const FREE_SHIPPING_FROM = 80;

export const NAV_LINKS = [
    { href: '/articles', label: 'Collection' },
    { href: '/promotions', label: 'Offres' },
    { href: '/about', label: 'La Marque' },
    { href: '/faq', label: 'Aide' },
    { href: '/contact', label: 'Contact' },
];
