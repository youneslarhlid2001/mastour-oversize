import Link from 'next/link';
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';

const columns = [
    {
        title: 'Boutique',
        links: [
            { href: '/articles', label: 'La collection' },
            { href: '/articles?categorie=Robes', label: 'Robes' },
            { href: '/articles?categorie=Abayas', label: 'Abayas' },
            { href: '/articles?categorie=Ensembles', label: 'Ensembles' },
            { href: '/articles?categorie=Kimonos', label: 'Kimonos' },
            { href: '/promotions', label: 'Offres' },
        ],
    },
    {
        title: 'Maison',
        links: [
            { href: '/about', label: 'La marque' },
            { href: '/faq', label: 'Questions fréquentes' },
            { href: '/contact', label: 'Contact' },
        ],
    },
    {
        title: 'Légal',
        links: [
            { href: '/cgv', label: 'Conditions générales de vente' },
            { href: '/rgpd', label: 'Politique de confidentialité' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="overflow-hidden bg-wine text-on-wine">
            <div className="page-x grid gap-10 pb-10 pt-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <p className="max-w-[17ch] font-display text-3xl leading-[1.1]">Vêtements amples, élégants et modernes.</p>
                    <div className="mt-6 space-y-1 text-sm opacity-80">
                        <p>Paris, France</p>
                        <p><a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">{CONTACT_EMAIL}</a></p>
                        <p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">@{INSTAGRAM_HANDLE}</a></p>
                    </div>
                </div>
                {columns.map((column) => (
                    <div key={column.title}>
                        <h2 className="label mb-4 font-mono opacity-70">{column.title}</h2>
                        <ul className="space-y-2 text-sm">
                            {column.links.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:underline">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="page-x label flex flex-wrap justify-between gap-2 pb-4 opacity-70">
                <span>© {new Date().getFullYear()} Mastour Oversize</span>
                <span>Prix en euros, TTC</span>
            </div>

            <p className="display select-none whitespace-nowrap text-center text-[26vw] leading-[0.92]" aria-hidden="true">
                Mastour
            </p>
        </footer>
    );
}
