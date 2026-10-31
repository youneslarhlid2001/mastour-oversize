"use client";

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, currentPrice } from '@/lib/catalog';
import { SIZE_ORDER, sizeLabel } from '@/lib/sizes';

const SORTS = [
    { value: 'selection', label: 'Notre sélection' },
    { value: 'prix-croissant', label: 'Prix croissant' },
    { value: 'prix-decroissant', label: 'Prix décroissant' },
    { value: 'nom', label: 'Nom A-Z' },
];

function CatalogView({ products, params }: { products: Product[]; params: URLSearchParams }) {
    const category = params.get('categorie');
    const size = params.get('taille');
    const promoOnly = params.get('promo') === '1';
    const sort = params.get('tri') ?? 'selection';

    const setParam = (key: string, value: string | null) => {
        const next = new URLSearchParams(params.toString());
        if (value) next.set(key, value);
        else next.delete(key);
        const query = next.toString();
        window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
    };

    const sizes = useMemo(() => {
        const present = new Set(products.flatMap((p) => p.sizes));
        return SIZE_ORDER.filter((s) => present.has(s));
    }, [products]);

    const visible = useMemo(() => {
        const result = products.filter((p) =>
            (!category || p.category === category)
            && (!size || p.sizes.includes(size))
            && (!promoOnly || (p.promotion && p.discountPrice)));

        switch (sort) {
            case 'prix-croissant':
                return result.sort((a, b) => currentPrice(a) - currentPrice(b));
            case 'prix-decroissant':
                return result.sort((a, b) => currentPrice(b) - currentPrice(a));
            case 'nom':
                return result.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
            default:
                return result.sort((a, b) => Number(b.featured) - Number(a.featured));
        }
    }, [products, category, size, promoOnly, sort]);

    const hasFilters = Boolean(category || size || promoOnly);

    const reset = () => {
        window.history.replaceState(null, '', window.location.pathname);
    };

    const chip = (active: boolean) =>
        `h-9 cursor-pointer whitespace-nowrap border px-3 font-mono text-xs transition-colors ${active ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`;

    return (
        <>
            {/* Catégories, en grand */}
            <nav className="page-x no-scrollbar flex gap-x-6 gap-y-1 overflow-x-auto pb-1 md:flex-wrap" aria-label="Catégories">
                {[null, ...CATEGORIES].map((c) => {
                    const active = category === c;
                    const count = c ? products.filter((p) => p.category === c).length : products.length;
                    return (
                        <button
                            key={c ?? 'all'}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setParam('categorie', c)}
                            className={`display cursor-pointer whitespace-nowrap text-[clamp(2.25rem,4.9vw,5.5rem)] leading-[1.05] transition-colors ${active ? 'italic text-thread' : 'text-ink/55 hover:text-ink'}`}
                        >
                            {c ?? 'Tout'}
                            <sup className="ml-1 font-mono text-xs not-italic tracking-normal">{count}</sup>
                        </button>
                    );
                })}
            </nav>

            {/* Filtres */}
            <div className="page-x z-30 mt-6 flex flex-col gap-3 border-y border-line bg-paper/95 py-3 backdrop-blur-md md:sticky md:top-16 md:flex-row md:items-center md:gap-6">
                <div className="no-scrollbar flex min-w-0 items-center gap-2 overflow-x-auto">
                    <span className="label mr-1 text-ink-soft">Taille</span>
                    {sizes.map((s) => (
                        <button
                            key={s}
                            type="button"
                            aria-pressed={size === s}
                            onClick={() => setParam('taille', size === s ? null : s)}
                            className={chip(size === s)}
                        >
                            {sizeLabel(s)}
                        </button>
                    ))}
                    <span className="mx-2 h-5 w-px shrink-0 bg-line" />
                    <button type="button" aria-pressed={promoOnly} onClick={() => setParam('promo', promoOnly ? null : '1')} className={chip(promoOnly)}>
                        Prix réduits
                    </button>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 md:ml-auto">
                    <span className="label whitespace-nowrap text-ink-soft" aria-live="polite">
                        {visible.length} pièce{visible.length > 1 ? 's' : ''}
                    </span>
                    <select
                        id="tri"
                        aria-label="Trier"
                        value={sort}
                        onChange={(e) => setParam('tri', e.target.value === 'selection' ? null : e.target.value)}
                        className="h-9 cursor-pointer border border-line bg-paper px-2 font-mono text-xs"
                    >
                        {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Grille */}
            <div className="page-x py-8 md:py-12">
                {visible.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-14 xl:grid-cols-4">
                        {visible.map((product) => (
                            <div key={product.id} className="reveal">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <p className="display text-5xl">Aucune pièce trouvée.</p>
                        <p className="mt-4 text-ink-soft">Essayez une autre taille ou une autre catégorie.</p>
                    </div>
                )}
                {hasFilters && (
                    <div className="mt-12 text-center">
                        <button type="button" onClick={reset} className="stitch-link cursor-pointer text-sm">Effacer les filtres</button>
                    </div>
                )}
            </div>
        </>
    );
}

function WithParams({ products }: { products: Product[] }) {
    const params = useSearchParams();
    return <CatalogView products={products} params={new URLSearchParams(params.toString())} />;
}

export default function Catalog({ products }: { products: Product[] }) {
    return (
        <Suspense fallback={<CatalogView products={products} params={new URLSearchParams()} />}>
            <WithParams products={products} />
        </Suspense>
    );
}
