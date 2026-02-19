"use client";

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!visible) return null;

    return (
        <button
            onClick={scrollUp}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gray-900/80 text-white shadow-lg backdrop-blur-sm hover:bg-rose-main hover:scale-110 transition-all duration-300 animate-fade-in cursor-pointer"
        >
            <ArrowUp size={20} />
        </button>
    );
}
