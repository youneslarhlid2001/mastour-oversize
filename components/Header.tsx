"use client";

import Link from 'next/link';
import { Menu, X, Instagram, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Auto-close on route change
    useEffect(() => {
        closeMenu();
    }, [pathname]);

    // Scroll lock when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Accueil' },
        { href: '/articles', label: 'Collection' },
        { href: '/promotions', label: 'Promotions' },
        { href: '/about', label: 'La Marque' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">

                    {/* Mobile Menu Button - Left */}
                    <button
                        className="md:hidden text-gray-800 z-50 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo - Monogram on mobile, Full on desktop */}
                    <Link href="/" className="flex items-center" onClick={closeMenu}>
                        <Logo variant="monogram" colorScheme="dark" width={40} height={40} className="md:hidden" />
                        <Logo variant="full" colorScheme="dark" width={180} height={70} className="hidden md:block" />
                    </Link>

                    {/* Desktop Nav - Center */}
                    <nav className="hidden md:flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm uppercase tracking-widest hover:text-rose-main transition-colors pb-1 border-b-2 ${pathname === link.href ? 'border-rose-main text-rose-main' : 'border-transparent text-gray-600'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA - Right */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://instagram.com/mastouroversize"
                            target="_blank"
                            className={`hidden sm:flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm transition-all ${isScrolled
                                ? 'bg-rose-main text-white hover:bg-rose-dark shadow-md'
                                : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            <Instagram size={16} />
                            <span>Suivre</span>
                        </Link>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
                        >
                            {theme === 'dark' ? (
                                <Sun size={18} className="text-amber-400" />
                            ) : (
                                <Moon size={18} className="text-gray-600" />
                            )}
                        </button>

                        {/* Mobile Placeholder to balance layout */}
                        <div className="w-0 md:hidden"></div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeMenu}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-[280px] bg-white shadow-2xl transform transition-transform duration-400 ease-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Menu Header with Logo */}
                <div className="px-6 pt-8 pb-6 border-b border-gray-100">
                    <Logo variant="compact" colorScheme="dark" width={160} height={30} />
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${pathname === link.href
                                        ? 'bg-rose-50 text-rose-main border-l-3 border-rose-main'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Menu Footer */}
                <div className="px-6 py-6 border-t border-gray-100 space-y-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        {theme === 'dark' ? (
                            <><Sun size={18} className="text-amber-400" /> Mode clair</>
                        ) : (
                            <><Moon size={18} /> Mode sombre</>
                        )}
                    </button>

                    {/* Instagram */}
                    <Link
                        href="https://instagram.com/mastouroversize"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-medium text-sm hover:shadow-lg transition-all"
                        onClick={closeMenu}
                    >
                        <Instagram size={18} />
                        @mastouroversize
                    </Link>
                </div>
            </div>
        </>
    );
}

