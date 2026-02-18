"use client";

import Link from 'next/link';
import { Menu, X, Instagram } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { href: '/', label: 'Accueil' },
        { href: '/articles', label: 'Collection' },
        { href: '/promotions', label: 'Promotions' },
        { href: '/about', label: 'La Marque' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-rose-600 tracking-tighter" onClick={closeMenu}>
                    MASTOUR<span className="text-gray-800 font-light">OVERSIZE</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`font-medium transition-colors ${pathname === link.href ? 'text-rose-600 font-bold' : 'text-gray-600 hover:text-rose-500'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://instagram.com/mastouroversize"
                        target="_blank"
                        className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                        <Instagram size={18} />
                        <span>Suivre</span>
                    </Link>

                    <button
                        className="md:hidden text-gray-700 z-50 relative"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden animate-fade-in pt-24 h-screen w-screen overflow-y-auto">
                    <nav className="flex flex-col items-center gap-8 p-8 text-xl">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${pathname === link.href ? 'text-rose-600 font-bold' : 'text-gray-800 hover:text-rose-500'
                                    }`}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            href="https://instagram.com/mastouroversize"
                            target="_blank"
                            className="mt-4 flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                            onClick={closeMenu}
                        >
                            <Instagram size={20} />
                            <span>Suivre sur Instagram</span>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
