"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// ✏️ Configure your announcements here
const announcements = [
    '🚚 Livraison offerte dès 80€ d\'achat en France métropolitaine',
    '✨ Nouvelle collection disponible — Découvrez nos dernières pièces',
    '🎉 Code BIENVENUE10 — 10% sur votre première commande',
];

const STORAGE_KEY = 'mastour-announcement-dismissed';

export default function AnnouncementBar() {
    const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
    const [currentIndex, setCurrentIndex] = useState(0);

    // Check localStorage on mount
    useEffect(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored !== 'true') {
            setDismissed(false);
        }
    }, []);

    // Rotate announcements every 5 seconds
    useEffect(() => {
        if (dismissed || announcements.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % announcements.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [dismissed]);

    const handleDismiss = () => {
        setDismissed(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
    };

    if (dismissed) return null;

    return (
        <div className="bg-gray-900 text-white relative z-50">
            <div className="container mx-auto px-4 flex items-center justify-center py-2 relative">
                <p className="text-xs sm:text-sm font-medium text-center tracking-wide animate-fade-in" key={currentIndex}>
                    {announcements[currentIndex]}
                </p>
                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Fermer l'annonce"
                >
                    <X size={14} className="text-white/70 hover:text-white" />
                </button>
            </div>
        </div>
    );
}
