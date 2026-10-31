"use client";

import Link from 'next/link';
import { Instagram, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';
import { setSelectionOpen, useSelection } from '@/lib/selection';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS } from '@/lib/site';

export default function Header() {
    const [menuPath, setMenuPath] = useState<string | null>(null);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { items } = useSelection();

    // Le menu se referme tout seul dès que la route change
    const isMenuOpen = menuPath === pathname;

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

    const themeLabel = theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre';

    return (
        <>
            <header className="site-chrome page-x sticky top-0 z-40 grid h-16 grid-cols-[1fr_auto_1fr] items-center bg-paper/90 backdrop-blur-md">
                <div className="flex items-center">
                    <button
                        type="button"
                        onClick={() => setMenuPath(pathname)}
                        aria-label="Ouvrir le menu"
                        aria-expanded={isMenuOpen}
                        className="label -ml-2 cursor-pointer p-2 lg:hidden"
                    >
                        Menu
                    </button>
                    <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={isActive(link.href) ? 'page' : undefined}
                                className={`text-sm transition-colors hover:text-thread ${isActive(link.href) ? 'stitch-link text-thread' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <Link href="/" aria-label="Mastour Oversize, accueil">
                    <Logo className="text-base md:text-lg" />
                </Link>

                <div className="flex items-center justify-end gap-1 md:gap-3">
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram @${INSTAGRAM_HANDLE}`}
                        className="hidden p-2 transition-colors hover:text-thread sm:block"
                    >
                        <Instagram size={18} strokeWidth={1.5} />
                    </a>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={themeLabel}
                        title={themeLabel}
                        className="hidden cursor-pointer p-2 transition-colors hover:text-thread sm:block"
                    >
                        {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectionOpen(true)}
                        className="label -mr-2 flex cursor-pointer items-center gap-1.5 p-2 transition-colors hover:text-thread"
                    >
                        <span className="hidden sm:inline">Ma sélection</span>
                        <span className="sm:hidden">Sélection</span>
                        <span className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.625rem] tracking-normal ${items.length > 0 ? 'bg-thread text-white' : 'border border-line'}`}>
                            {items.length}
                        </span>
                    </button>
                </div>
                <div className="stitch absolute inset-x-0 bottom-0 opacity-40" />
            </header>

            {/* Menu plein écran */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-wine text-on-wine lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
                    <div className="page-x flex h-16 shrink-0 items-center justify-between">
                        <span className="label">Menu</span>
                        <button type="button" onClick={() => setMenuPath(null)} aria-label="Fermer le menu" className="-mr-2 cursor-pointer p-2">
                            <X size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                    <nav className="page-x flex flex-1 flex-col justify-center gap-2 py-6" aria-label="Navigation mobile">
                        {[{ href: '/', label: 'Accueil' }, ...NAV_LINKS].map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuPath(null)}
                                className="display rise text-[clamp(3rem,15vw,5rem)] leading-[1.02]"
                                style={{ '--d': `${i * 50}ms` } as React.CSSProperties}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="page-x flex items-center justify-between py-6">
                        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="label flex items-center gap-2">
                            <Instagram size={16} strokeWidth={1.5} /> @{INSTAGRAM_HANDLE}
                        </a>
                        <button type="button" onClick={toggleTheme} className="label flex cursor-pointer items-center gap-2">
                            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
                            {theme === 'dark' ? 'Clair' : 'Sombre'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
