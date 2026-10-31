"use client";

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Check, Instagram, Plus } from 'lucide-react';
import { Product } from '@/types';
import Garment from '@/components/Garment';
import SizeGuide from '@/components/SizeGuide';
import { currentPrice, discountPercent, formatPrice, hasPhoto, inStock } from '@/lib/catalog';
import { backdropFor, colorHex } from '@/lib/colors';
import { addToSelection, buildOrderMessage, copyText } from '@/lib/selection';
import { lengthFor, sizeLabel } from '@/lib/sizes';
import { INSTAGRAM_DM_URL } from '@/lib/site';

function Experience({ product, initialColor }: { product: Product; initialColor?: string }) {
    const onlySize = product.sizes.length === 1 ? product.sizes[0] : null;
    const [color, setColor] = useState(initialColor ?? product.colors?.[0]);
    const [size, setSize] = useState<string | null>(onlySize);
    const [missingSize, setMissingSize] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const [copied, setCopied] = useState(false);

    const discount = discountPercent(product);
    const available = inStock(product);
    const length = lengthFor(size);

    const add = () => {
        if (!size) {
            setMissingSize(true);
            return;
        }
        addToSelection({ productId: product.id, size, color });
    };

    const order = (e: React.MouseEvent) => {
        if (!size) {
            e.preventDefault();
            setMissingSize(true);
            return;
        }
        copyText(buildOrderMessage([{ productId: product.id, size, color }]));
        setCopied(true);
        setTimeout(() => setCopied(false), 8000);
    };

    return (
        <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            {/* Planche */}
            <div className="lg:sticky lg:top-16 lg:h-[calc(100dvh-8.5rem)]">
                <div
                    className="grain relative aspect-[4/5] h-full w-full overflow-hidden transition-colors duration-500 lg:aspect-auto"
                    style={{ background: backdropFor(color) }}
                >
                    {hasPhoto(product) ? (
                        <Image
                            src={product.images[activeImage]}
                            alt={product.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover"
                        />
                    ) : (
                        <Garment
                            productId={product.id}
                            category={product.category}
                            color={color}
                            label={`${product.name}, coloris ${color ?? ''}`}
                            className="absolute inset-y-[3%] left-1/2 h-[96%] w-auto -translate-x-1/2"
                        />
                    )}

                    {length && (
                        <div className="absolute bottom-[4%] right-[5%] top-[11%] z-10 flex items-center gap-2">
                            <span className="label rounded-sm bg-paper px-1.5 py-1 text-[#2b1216]">Long. {length}&nbsp;cm</span>
                            <span className="stitch-v h-full" />
                        </div>
                    )}

                    {discount > 0 && <span className="tag absolute left-4 top-4 z-10">-{discount}&nbsp;%</span>}

                    {hasPhoto(product) && product.images.length > 1 && (
                        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                            {product.images.map((src, i) => (
                                <button
                                    key={src + i}
                                    type="button"
                                    onClick={() => setActiveImage(i)}
                                    aria-label={`Vue ${i + 1}`}
                                    aria-pressed={i === activeImage}
                                    className={`relative h-16 w-12 cursor-pointer overflow-hidden border ${i === activeImage ? 'border-thread' : 'border-paper'}`}
                                >
                                    <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Fiche */}
            <div className="page-x py-8 lg:py-14">
                <p className="label text-thread">{product.category}</p>
                <h1 className="display mt-3 text-[clamp(2.75rem,5.4vw,5.25rem)] leading-[0.94]">{product.name}</h1>

                <p className="mt-5 flex flex-wrap items-baseline gap-3 font-mono text-lg">
                    {discount > 0 && (
                        <>
                            <span className="sr-only">Prix réduit&nbsp;: </span>
                            <del className="text-base text-ink-soft">{formatPrice(product.price)}</del>
                        </>
                    )}
                    <span className={discount > 0 ? 'text-thread' : ''}>{formatPrice(currentPrice(product))}</span>
                    <span className="label ml-auto text-ink-soft">{available ? 'En stock' : 'Épuisé'}</span>
                </p>

                <p className="mt-6 max-w-[58ch] leading-relaxed text-ink-soft">{product.description}</p>

                {product.colors && product.colors.length > 0 && (
                    <fieldset className="mt-8">
                        <legend className="label mb-3">
                            Coloris <span className="text-ink-soft">/ {color}</span>
                        </legend>
                        <div className="-ml-1 flex flex-wrap gap-1">
                            {product.colors.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    aria-pressed={c === color}
                                    aria-label={c}
                                    title={c}
                                    className="flex h-11 w-11 cursor-pointer items-center justify-center"
                                >
                                    <span
                                        className={`block h-7 w-7 rounded-full border border-line transition-shadow ${c === color ? 'shadow-[0_0_0_3px_var(--paper),0_0_0_4px_var(--ink)]' : ''}`}
                                        style={{ background: colorHex(c) }}
                                    />
                                </button>
                            ))}
                        </div>
                        {!hasPhoto(product) && (
                            <p className="mt-2 text-xs text-ink-soft">Illustration du modèle. Le coloris réel peut légèrement varier.</p>
                        )}
                    </fieldset>
                )}

                <fieldset className="mt-7">
                    <div className="mb-3 flex items-baseline justify-between">
                        <legend className="label">Taille</legend>
                        <button type="button" onClick={() => setGuideOpen(true)} className="stitch-link cursor-pointer text-sm">
                            Guide des tailles
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => {
                            const count = product.stock?.[s];
                            const out = count === 0;
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    disabled={out}
                                    aria-pressed={s === size}
                                    onClick={() => { setSize(s); setMissingSize(false); }}
                                    className={`h-12 min-w-14 cursor-pointer border px-4 font-mono text-[0.8125rem] transition-colors disabled:cursor-not-allowed disabled:text-ink-soft disabled:line-through ${s === size ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}
                                >
                                    {sizeLabel(s)}
                                </button>
                            );
                        })}
                    </div>
                    <p className={`mt-2 min-h-5 text-sm ${missingSize ? 'text-thread' : 'text-ink-soft'}`} aria-live="polite">
                        {missingSize && 'Choisissez votre taille pour continuer.'}
                        {!missingSize && size && product.stock?.[size] !== undefined && product.stock[size] <= 4 && `Plus que ${product.stock[size]} en ${sizeLabel(size)}.`}
                    </p>
                </fieldset>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <a
                        href={INSTAGRAM_DM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={order}
                        className="btn"
                    >
                        <Instagram size={18} strokeWidth={1.5} /> Commander
                    </a>
                    <button type="button" onClick={add} className="btn btn-ghost">
                        <Plus size={18} strokeWidth={1.5} /> Ajouter à ma sélection
                    </button>
                </div>

                <p className="mt-3 flex items-start gap-2 text-sm text-ink-soft" aria-live="polite">
                    {copied ? (
                        <>
                            <Check size={16} className="mt-0.5 shrink-0 text-thread" />
                            Message copié. Collez-le dans la conversation Instagram qui vient de s’ouvrir.
                        </>
                    ) : (
                        'Votre message de commande est copié automatiquement. Il ne reste qu’à le coller sur Instagram.'
                    )}
                </p>

                <div className="mt-10 border-t border-line">
                    {[
                        ['Matière', product.material],
                        ['Entretien', product.careInstructions],
                        ['Poids', product.weight],
                        ['Référence', product.id],
                    ].filter(([, value]) => value).map(([name, value]) => (
                        <div key={name} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3 text-sm">
                            <span className="label pt-0.5 text-ink-soft">{name}</span>
                            <span>{value}</span>
                        </div>
                    ))}
                    <details className="border-b border-line">
                        <summary className="flex items-center justify-between py-3 text-sm">
                            <span className="label text-ink-soft">Livraison et retours</span>
                            <Plus size={16} strokeWidth={1.5} className="plus" />
                        </summary>
                        <div className="space-y-2 pb-4 text-sm leading-relaxed text-ink-soft">
                            <p>Expédition sous 24&nbsp;h après paiement, puis 48 à 72&nbsp;h ouvrées en France métropolitaine.</p>
                            <p>Livraison offerte dès 80&nbsp;€ en France métropolitaine. Livraison en Europe sur devis.</p>
                            <p>Retour ou échange de taille sous 14 jours, article non porté et avec ses étiquettes. Frais de retour à votre charge.</p>
                        </div>
                    </details>
                </div>
            </div>

            <SizeGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} highlight={size} />
        </div>
    );
}

function WithColorParam({ product }: { product: Product }) {
    const requested = useSearchParams().get('coloris') ?? undefined;
    const initial = requested && product.colors?.includes(requested) ? requested : undefined;
    return <Experience key={initial} product={product} initialColor={initial} />;
}

export default function ProductExperience({ product }: { product: Product }) {
    return (
        <Suspense fallback={<Experience product={product} />}>
            <WithColorParam product={product} />
        </Suspense>
    );
}
