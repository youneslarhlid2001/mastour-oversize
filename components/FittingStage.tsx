"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Product } from '@/types';
import Garment from '@/components/Garment';
import { hasPhoto } from '@/lib/catalog';

const ZOOM_MAX = 2.2;
const ZOOM_STEP = 0.3;
const TURN_MAX = 36;
const TURN_STEP = 18;

// Points de détail, en proportion de la silhouette
const SPOTS = [
    { x: 0.575, y: 0.33, title: 'Matière', field: 'material' },
    { x: 0.425, y: 0.69, title: 'Entretien', field: 'careInstructions' },
] as const;

// Grossissement de la loupe par rapport à sa propre largeur
const LENS_SCALE = 3.4;
const FIGURE_RATIO = 720 / 400;

function TurnArrow({ side, onClick, label }: { side: 'left' | 'right'; onClick: () => void; label: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className={`group/turn absolute bottom-[36%] z-10 hidden h-24 w-[22%] max-w-40 cursor-pointer text-[var(--fit-ink)] sm:block ${side === 'left' ? 'left-[12%]' : 'right-[12%] -scale-x-100'}`}
        >
            <svg viewBox="0 0 150 90" fill="none" className="h-full w-full transition-transform group-hover/turn:-translate-y-1" aria-hidden="true">
                <path d="M144 86 C70 86 6 72 6 48 C6 26 40 12 74 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.65" />
                <path d="M62 3 L76 8 L65 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}

interface StageProps {
    product: Product;
    color?: string;
}

export default function FittingStage({ product, color }: StageProps) {
    const [zoom, setZoom] = useState(1);
    const [origin, setOrigin] = useState({ x: 50, y: 30 });
    const [turn, setTurn] = useState(0);
    const [view, setView] = useState(0);
    const [spotIndex, setSpotIndex] = useState(0);

    const photo = hasPhoto(product);
    const views = photo ? product.images.length : 1;
    const spots = SPOTS.filter((spot) => product[spot.field]);
    const spot = spots[spotIndex] ?? spots[0];

    // Avec plusieurs photos, les flèches changent de vue ; sinon la silhouette pivote
    const rotate = (direction: 1 | -1) => {
        if (views > 1) {
            setView((v) => (v + direction + views) % views);
            return;
        }
        setTurn((t) => Math.max(-TURN_MAX, Math.min(TURN_MAX, t + direction * TURN_STEP)));
    };

    const followPointer = (e: React.PointerEvent<HTMLDivElement>) => {
        if (zoom === 1) return;
        const box = e.currentTarget.getBoundingClientRect();
        setOrigin({ x: ((e.clientX - box.left) / box.width) * 100, y: ((e.clientY - box.top) / box.height) * 100 });
    };

    const figureLabel = `${product.name}${color ? `, coloris ${color}` : ''}`;

    return (
        <div className="absolute inset-0">
            <div className="fit-floor absolute inset-0" aria-hidden="true" />

            <div className="absolute inset-0" onPointerMove={followPointer} onPointerDown={followPointer}>
                <div
                    className="relative mx-auto aspect-[400/720] h-full max-w-full transition-transform duration-500 ease-out"
                    style={{
                        transform: `perspective(1400px) rotateY(${turn}deg) scale(${zoom})`,
                        transformOrigin: `${origin.x}% ${origin.y}%`,
                    }}
                >
                    {photo ? (
                        <Image
                            src={product.images[view] ?? product.images[0]}
                            alt={figureLabel}
                            fill
                            priority
                            sizes="(max-width: 1024px) 90vw, 40vw"
                            className="object-contain"
                        />
                    ) : (
                        <Garment productId={product.id} category={product.category} color={color} label={figureLabel} worn className="h-full w-full" />
                    )}

                    {spots.map((s, i) => (
                        <button
                            key={s.field}
                            type="button"
                            onMouseEnter={() => setSpotIndex(i)}
                            onFocus={() => setSpotIndex(i)}
                            onClick={() => setSpotIndex(i)}
                            aria-label={`${s.title} : ${product[s.field]}`}
                            aria-pressed={s === spot}
                            className="fit-spot absolute z-10 -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%` }}
                        />
                    ))}
                </div>
            </div>

            {spot && (
                <div className="pointer-events-none absolute right-1 top-1 z-10 w-[6.5rem] sm:right-[4%] sm:top-[2%] sm:w-[9.5rem]">
                    <div className="relative aspect-square overflow-hidden rounded-full border-2 border-[var(--fit-ink)] bg-[var(--fit-card)]" aria-hidden="true">
                        {photo ? (
                            <div
                                className="absolute inset-0 bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${product.images[view] ?? product.images[0]})`,
                                    backgroundSize: `${LENS_SCALE * 100}%`,
                                    backgroundPosition: `${spot.x * 100}% ${spot.y * 100}%`,
                                }}
                            />
                        ) : (
                            <div
                                className="absolute"
                                style={{
                                    width: `${LENS_SCALE * 100}%`,
                                    aspectRatio: '400 / 720',
                                    left: `${(0.5 - spot.x * LENS_SCALE) * 100}%`,
                                    top: `${(0.5 - spot.y * LENS_SCALE * FIGURE_RATIO) * 100}%`,
                                }}
                            >
                                <Garment productId={product.id} category={product.category} color={color} worn className="h-full w-full" />
                            </div>
                        )}
                    </div>
                    <p className="mt-2 hidden text-center text-xs leading-snug text-[var(--fit-soft)] sm:block">
                        <span className="font-semibold text-[var(--fit-ink)]">{spot.title}</span>
                        <br />
                        {product[spot.field]}
                    </p>
                </div>
            )}

            <div className="absolute left-1 top-[34%] z-10 flex flex-col gap-3">
                <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
                    disabled={zoom >= ZOOM_MAX}
                    aria-label="Zoomer"
                    className="fit-round"
                >
                    <ZoomIn size={18} strokeWidth={1.6} />
                </button>
                <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(1, z - ZOOM_STEP))}
                    disabled={zoom <= 1}
                    aria-label="Dézoomer"
                    className="fit-round"
                >
                    <ZoomOut size={18} strokeWidth={1.6} />
                </button>
            </div>

            <TurnArrow side="left" onClick={() => rotate(-1)} label={views > 1 ? 'Vue précédente' : 'Faire pivoter vers la gauche'} />
            <TurnArrow side="right" onClick={() => rotate(1)} label={views > 1 ? 'Vue suivante' : 'Faire pivoter vers la droite'} />
        </div>
    );
}
