"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Instagram, Mail } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/articles', label: 'Collection', icon: ShoppingBag },
    { href: 'https://instagram.com/mastouroversize', label: 'Instagram', icon: Instagram, external: true },
    { href: '/contact', label: 'Contact', icon: Mail },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-100 md:hidden safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = !item.external && pathname === item.href;
                    const Icon = item.icon;

                    if (item.external) {
                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1 px-3 py-1 text-gray-400 hover:text-rose-main transition-colors"
                            >
                                <div className="p-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600">
                                    <Icon size={16} className="text-white" />
                                </div>
                                <span className="text-[10px] font-medium">
                                    {item.label}
                                </span>
                            </a>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${isActive ? 'text-rose-main' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute top-0 w-8 h-0.5 bg-rose-main rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
