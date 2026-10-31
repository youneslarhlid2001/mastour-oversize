"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import Garment from '@/components/Garment';
import { formatPrice, currentPrice, hasPhoto, products } from '@/lib/catalog';

interface TrayProps {
    fittingIds: string[];
    activeId: string;
    onPick: (id: string) => void;
}

function normalize(text: string) {
    return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function HangerTray({ fittingIds, activeId, onPick }: TrayProps) {
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState('');
    const rail = useRef<HTMLDivElement>(null);

    const scroll = (direction: 1 | -1) => {
        rail.current?.scrollBy({ left: direction * 240, behavior: 'smooth' });
    };

    const needle = normalize(query.trim());
    const shown = products.filter((p) => normalize(`${p.name} ${p.category}`).includes(needle));

    return (
        <div className="fit-glass absolute inset-x-0 bottom-0 z-20 rounded-[1.25rem] px-3 pb-3 pt-2.5 sm:px-4">
            <div className="flex h-8 items-center justify-between gap-3">
                <p className="text-base font-medium">Sur le cintre</p>
                {searching ? (
                    <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
                        <input
                            type="search"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Robe, abaya, kimono…"
                            aria-label="Rechercher un article"
                            className="h-8 w-full max-w-56 rounded-full bg-[var(--fit-card)] px-3 text-sm outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => { setSearching(false); setQuery(''); }}
                            aria-label="Fermer la recherche"
                            className="cursor-pointer p-1"
                        >
                            <X size={18} strokeWidth={1.6} />
                        </button>
                    </div>
                ) : (
                    <button type="button" onClick={() => setSearching(true)} aria-label="Rechercher un article" className="cursor-pointer p-1">
                        <Search size={18} strokeWidth={1.6} />
                    </button>
                )}
            </div>

            <div className="mt-1.5 flex items-center gap-1">
                <button type="button" onClick={() => scroll(-1)} aria-label="Articles précédents" className="hidden shrink-0 cursor-pointer p-1 sm:block">
                    <ChevronLeft size={18} strokeWidth={1.6} />
                </button>
                <div ref={rail} className="no-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto">
                    {shown.map((p) => {
                        const fitting = fittingIds.includes(p.id);
                        return (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => onPick(p.id)}
                                aria-pressed={fitting}
                                aria-label={`Essayer ${p.name}, ${formatPrice(currentPrice(p))}`}
                                title={p.name}
                                className={`relative h-[4.5rem] w-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-2xl transition-colors ${fitting ? 'bg-[var(--fit-card)] shadow-sm' : 'hover:bg-[var(--fit-card)]'} ${p.id === activeId ? 'ring-[1.5px] ring-inset ring-[var(--fit-ink)]' : ''}`}
                            >
                                {hasPhoto(p) ? (
                                    <Image src={p.images[0]} alt="" fill sizes="72px" className="object-cover" />
                                ) : (
                                    <Garment productId={p.id} category={p.category} color={p.colors?.[0]} className="mx-auto h-full w-auto p-1" />
                                )}
                            </button>
                        );
                    })}
                    {shown.length === 0 && (
                        <p className="flex h-[4.5rem] items-center px-2 text-sm text-[var(--fit-soft)]">Aucun article pour « {query} ».</p>
                    )}
                </div>
                <button type="button" onClick={() => scroll(1)} aria-label="Articles suivants" className="hidden shrink-0 cursor-pointer p-1 sm:block">
                    <ChevronRight size={18} strokeWidth={1.6} />
                </button>
            </div>
        </div>
    );
}
