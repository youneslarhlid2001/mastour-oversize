"use client";

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronDown, ChevronLeft, Instagram, Menu, Moon, ShoppingBag, Sun, X } from 'lucide-react';
import { Product } from '@/types';
import FittingStage from '@/components/FittingStage';
import Garment from '@/components/Garment';
import HangerTray from '@/components/HangerTray';
import Logo from '@/components/Logo';
import MeasuresCard from '@/components/MeasuresCard';
import SizeGuide from '@/components/SizeGuide';
import { useTheme } from '@/components/ThemeProvider';
import { currentPrice, discountPercent, formatPrice, hasPhoto, inStock, products } from '@/lib/catalog';
import { colorHex } from '@/lib/colors';
import { fallNote, Measures, measuresAreValid, recommendSize, useMeasures } from '@/lib/fitting';
import { addToSelection, buildOrderMessage, copyText, setSelectionOpen, useSelection } from '@/lib/selection';
import { lengthFor, sizeLabel } from '@/lib/sizes';
import { FREE_SHIPPING_FROM, INSTAGRAM_DM_URL, NAV_LINKS } from '@/lib/site';

interface Fit {
    productId: string;
    color?: string;
    size: string | null;
}

function productById(id: string) {
    return products.find((p) => p.id === id) as Product;
}

function isOut(product: Product, size: string) {
    return product.stock?.[size] === 0;
}

function SiteMenu() {
    const { theme, toggleTheme } = useTheme();
    return (
        <details className="relative">
            <summary className="fit-round" aria-label="Menu du site">
                <Menu size={18} strokeWidth={1.6} />
            </summary>
            <nav className="absolute right-0 top-full z-40 mt-2 w-48 rounded-2xl bg-[var(--fit-card)] p-2 text-sm shadow-lg" aria-label="Navigation principale">
                {[{ href: '/', label: 'Accueil' }, ...NAV_LINKS].map((link) => (
                    <Link key={link.href} href={link.href} className="block rounded-xl px-3 py-2 hover:bg-[var(--fit-chip)]">
                        {link.label}
                    </Link>
                ))}
                <button type="button" onClick={toggleTheme} className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-[var(--fit-chip)]">
                    {theme === 'dark' ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
                    {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                </button>
            </nav>
        </details>
    );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <details className="fit-accordion">
            <summary>
                {title}
                <ChevronDown size={16} strokeWidth={1.8} className="chevron shrink-0" />
            </summary>
            <div className="space-y-2 px-3.5 pb-1 pt-2 text-[0.8125rem] leading-relaxed text-[var(--fit-soft)]">{children}</div>
        </details>
    );
}

function Experience({ product, initialColor }: { product: Product; initialColor?: string }) {
    const selection = useSelection();
    const measures = useMeasures();

    const [fits, setFits] = useState<Fit[]>([{
        productId: product.id,
        color: initialColor ?? product.colors?.[0],
        size: product.sizes.length === 1 ? product.sizes[0] : null,
    }]);
    const [activeId, setActiveId] = useState(product.id);
    const [missingSize, setMissingSize] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const fit = fits.find((f) => f.productId === activeId) ?? fits[0];
    const active = productById(fit.productId);
    const discount = discountPercent(active);
    const length = lengthFor(fit.size);
    const hasMeasures = measuresAreValid(measures);
    const recommended = hasMeasures ? recommendSize(active.sizes, measures) : null;

    // Garde l'adresse et le titre alignés sur l'article affiché, pour pouvoir le partager
    const show = (id: string) => {
        setActiveId(id);
        setMissingSize(false);
        window.history.replaceState(null, '', `/articles/${id}`);
        document.title = `${productById(id).name} | Mastour Oversize`;
    };

    const update = (patch: Partial<Fit>) => {
        setFits((list) => list.map((f) => (f.productId === fit.productId ? { ...f, ...patch } : f)));
    };

    const pick = (id: string) => {
        if (!fits.some((f) => f.productId === id)) {
            const next = productById(id);
            const size = next.sizes.length === 1
                ? next.sizes[0]
                : hasMeasures ? recommendSize(next.sizes, measures) : null;
            setFits((list) => [...list, {
                productId: id,
                color: next.colors?.[0],
                size: size && !isOut(next, size) ? size : null,
            }]);
        }
        show(id);
    };

    const remove = (id: string) => {
        const rest = fits.filter((f) => f.productId !== id);
        setFits(rest);
        if (id === activeId) show(rest[rest.length - 1].productId);
    };

    const confirmMeasures = (values: Measures) => {
        const size = recommendSize(active.sizes, values);
        if (size && !isOut(active, size)) {
            update({ size });
            setMissingSize(false);
        }
    };

    // Toutes les pièces doivent avoir une taille : on affiche la première qui en manque une
    const allSized = () => {
        const unsized = fits.find((f) => !f.size);
        if (!unsized) return true;
        show(unsized.productId);
        setMissingSize(true);
        return false;
    };

    const add = () => {
        if (!allSized()) return;
        fits.forEach((f) => addToSelection({ productId: f.productId, size: f.size as string, color: f.color }));
    };

    const order = (e: React.MouseEvent) => {
        if (!allSized()) {
            e.preventDefault();
            return;
        }
        copyText(buildOrderMessage(fits.map((f) => ({ productId: f.productId, size: f.size as string, color: f.color }))));
        setCopied(true);
        setTimeout(() => setCopied(false), 8000);
    };

    const note = fallNote(active, fit.size, measures);

    return (
        <section className="fitting relative isolate flex min-h-dvh items-center overflow-clip px-2 py-3 sm:px-6 lg:px-10 lg:py-8">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                <Image src="/images/philosophy.webp" alt="" fill sizes="100vw" quality={40} className="scale-125 object-cover blur-3xl" />
                <div className="absolute inset-0 bg-black/25 dark:bg-black/60" />
            </div>

            <div className="fit-panel mx-auto w-full max-w-[92rem]">
                <header className="relative z-30 grid grid-cols-[1fr_auto] items-start gap-2 md:grid-cols-[1fr_auto_1fr]">
                    <div>
                        <p className="text-lg font-medium leading-tight sm:text-2xl">Cabine d’essayage</p>
                        <Link href="/articles" className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium hover:underline">
                            <ChevronLeft size={16} strokeWidth={1.8} /> Retour
                        </Link>
                    </div>
                    <Link href="/" aria-label="Mastour Oversize, accueil" className="order-first col-span-2 mb-1 text-center md:order-none md:col-span-1 md:mb-0">
                        <Logo className="text-base md:text-xl" />
                    </Link>
                    <div className="flex items-center justify-end gap-2">
                        <button type="button" onClick={() => setSelectionOpen(true)} className="flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-[var(--fit-card)] px-3 text-sm font-medium sm:px-4">
                            <ShoppingBag size={16} strokeWidth={1.6} />
                            Sélection ({selection.items.length})
                        </button>
                        <SiteMenu />
                    </div>
                </header>

                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(23rem,1fr)] lg:gap-4">
                    {/* Occupe la hauteur de la colonne de droite, sans dépasser l'écran quand un accordéon s'ouvre */}
                    <div className="lg:min-h-[36rem]">
                        <div className="relative h-[35rem] overflow-hidden sm:h-[42rem] lg:sticky lg:top-4 lg:h-[min(100%,calc(100dvh-2rem))]">
                            <FittingStage key={active.id} product={active} color={fit.color} />
                            <HangerTray fittingIds={fits.map((f) => f.productId)} activeId={active.id} onPick={pick} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:gap-4">
                        <div className="order-2 lg:order-1">
                            <MeasuresCard
                                onConfirm={confirmMeasures}
                                result={hasMeasures && (
                                    recommended ? (
                                        <p>
                                            Taille conseillée pour ce modèle : <strong className="font-semibold text-[var(--fit-ink)]">{sizeLabel(recommended)}</strong>
                                            {isOut(active, recommended) && ', épuisée pour le moment'}.
                                            {note && <> {note}</>}
                                        </p>
                                    ) : (
                                        <p>Vos mesures dépassent nos tailles pour ce modèle. Écrivez-nous sur Instagram, nous vous orienterons.</p>
                                    )
                                )}
                            />
                        </div>

                        <div className="fit-card order-1 flex-1 lg:order-2">
                            <p className="text-lg font-medium leading-tight">À l’essayage</p>

                            <div className="mt-3 grid grid-cols-[4.75rem_minmax(0,1fr)] gap-3 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-4">
                                <ul className="flex flex-col gap-2">
                                    {fits.map((f) => {
                                        const p = productById(f.productId);
                                        const current = f.productId === active.id;
                                        return (
                                            <li key={f.productId} className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => show(f.productId)}
                                                    aria-label={`Voir ${p.name}`}
                                                    aria-current={current}
                                                    className={`relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl bg-[var(--fit-chip)] ${current ? 'ring-2 ring-[var(--fit-ink)]' : ''}`}
                                                >
                                                    {hasPhoto(p) ? (
                                                        <Image src={p.images[0]} alt="" fill sizes="88px" className="object-cover" />
                                                    ) : (
                                                        <Garment productId={p.id} category={p.category} color={f.color} className="mx-auto h-full w-auto p-1" />
                                                    )}
                                                </button>
                                                {current && fits.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(f.productId)}
                                                        aria-label={`Retirer ${p.name} de l’essayage`}
                                                        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[var(--fit-ink)] text-[var(--fit-card)]"
                                                    >
                                                        <X size={14} strokeWidth={2.4} />
                                                    </button>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="min-w-0">
                                    <h1 className="font-sans text-[0.9375rem] font-semibold leading-snug">{active.name}</h1>
                                    <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[0.9375rem] font-medium">
                                        {discount > 0 && (
                                            <>
                                                <span className="sr-only">Prix réduit&nbsp;: </span>
                                                <del className="text-[0.8125rem] font-normal text-[var(--fit-soft)]">{formatPrice(active.price)}</del>
                                            </>
                                        )}
                                        {formatPrice(currentPrice(active))}
                                        {discount > 0 && <span className="text-xs">-{discount}&nbsp;%</span>}
                                        <span className="ml-auto text-xs font-normal text-[var(--fit-soft)]">{inStock(active) ? 'En stock' : 'Épuisé'}</span>
                                    </p>

                                    {active.colors && active.colors.length > 0 && (
                                        <fieldset className="mt-3">
                                            <legend className="text-[0.8125rem] font-medium">Coloris</legend>
                                            <div className="mt-1.5 flex flex-wrap items-start gap-1.5">
                                                {active.colors.map((c) => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        onClick={() => update({ color: c })}
                                                        aria-pressed={c === fit.color}
                                                        className="flex w-14 cursor-pointer flex-col items-center text-center text-[0.6875rem] leading-tight"
                                                    >
                                                        <span className={`mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full ${c === fit.color ? 'ring-[1.5px] ring-[var(--fit-ink)]' : ''}`}>
                                                            <span className="block h-6 w-6 rounded-full border border-black/15" style={{ background: colorHex(c) }} />
                                                        </span>
                                                        {c}
                                                    </button>
                                                ))}
                                            </div>
                                        </fieldset>
                                    )}

                                    <fieldset className="mt-3">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <legend className="text-[0.8125rem] font-medium">Taille</legend>
                                            <span className="flex gap-3 text-xs">
                                                <a href="#mesures" className="underline underline-offset-2 lg:hidden">Mes mesures</a>
                                                <button type="button" onClick={() => setGuideOpen(true)} className="cursor-pointer underline underline-offset-2">
                                                    Guide des tailles
                                                </button>
                                            </span>
                                        </div>
                                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                                            {active.sizes.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    disabled={isOut(active, s)}
                                                    aria-pressed={s === fit.size}
                                                    onClick={() => { update({ size: s }); setMissingSize(false); }}
                                                    className={`fit-size ${s === fit.size ? 'is-on' : ''}`}
                                                >
                                                    {sizeLabel(s)}
                                                </button>
                                            ))}
                                        </div>
                                        <p className={`mt-1.5 text-xs empty:hidden ${missingSize ? 'font-medium text-[#b5351a] dark:text-[#f0693f]' : 'text-[var(--fit-soft)]'}`} aria-live="polite">
                                            {missingSize && `Choisissez une taille pour ${active.name}.`}
                                            {!missingSize && fit.size && active.stock?.[fit.size] !== undefined && active.stock[fit.size] <= 4 && `Plus que ${active.stock[fit.size]} en ${sizeLabel(fit.size)}. `}
                                            {!missingSize && length && `Longueur ${length} cm.`}
                                        </p>
                                    </fieldset>

                                    <div className="mt-2 space-y-1.5">
                                        <Accordion title="Description et matière">
                                            <p>{active.description}</p>
                                            {active.material && <p><strong className="font-medium text-[var(--fit-ink)]">Matière :</strong> {active.material}</p>}
                                            {active.careInstructions && <p><strong className="font-medium text-[var(--fit-ink)]">Entretien :</strong> {active.careInstructions}</p>}
                                            {active.weight && <p><strong className="font-medium text-[var(--fit-ink)]">Poids :</strong> {active.weight}</p>}
                                            <p className="break-words"><strong className="font-medium text-[var(--fit-ink)]">Référence :</strong> {active.id}</p>
                                        </Accordion>
                                        {active.stock && (
                                            <Accordion title="Disponibilité">
                                                <ul>
                                                    {active.sizes.map((s) => {
                                                        const count = active.stock?.[s] ?? 0;
                                                        return (
                                                            <li key={s} className="flex justify-between gap-3">
                                                                <span>{sizeLabel(s)}</span>
                                                                <span>{count === 0 ? 'Épuisé' : count <= 4 ? `Plus que ${count}` : 'En stock'}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </Accordion>
                                        )}
                                        <Accordion title="Livraison et retours">
                                            <p>Expédition sous 24&nbsp;h après paiement, puis 48 à 72&nbsp;h ouvrées en France métropolitaine.</p>
                                            <p>Livraison offerte dès {FREE_SHIPPING_FROM}&nbsp;€ en France métropolitaine. Livraison en Europe sur devis.</p>
                                            <p>Retour ou échange de taille sous 14 jours, article non porté et avec ses étiquettes. Frais de retour à votre charge.</p>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>

                            <button type="button" onClick={add} className="fit-cta mt-4 w-full">
                                Ajouter à ma sélection ({fits.length})
                            </button>
                            <a
                                href={INSTAGRAM_DM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={order}
                                className="mt-2 flex items-center justify-center gap-2 py-1 text-[0.8125rem] font-medium hover:underline"
                            >
                                <Instagram size={15} strokeWidth={1.6} /> Commander sur Instagram
                            </a>
                            <p className="text-center text-xs leading-snug text-[var(--fit-soft)]" aria-live="polite">
                                {copied ? (
                                    <span className="inline-flex items-start gap-1.5">
                                        <Check size={14} className="mt-px shrink-0" />
                                        Message copié. Collez-le dans la conversation Instagram qui vient de s’ouvrir.
                                    </span>
                                ) : (
                                    !hasPhoto(active) && 'Illustration du modèle. Le coloris réel peut légèrement varier.'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <SizeGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} highlight={fit.size} />
        </section>
    );
}

function WithColorParam({ product }: { product: Product }) {
    const requested = useSearchParams().get('coloris') ?? undefined;
    // Lu une seule fois : l'adresse change ensuite quand on essaie un autre article
    const [initial] = useState(requested && product.colors?.includes(requested) ? requested : undefined);
    return <Experience product={product} initialColor={initial} />;
}

export default function ProductExperience({ product }: { product: Product }) {
    return (
        <Suspense fallback={<Experience product={product} />}>
            <WithColorParam product={product} />
        </Suspense>
    );
}
