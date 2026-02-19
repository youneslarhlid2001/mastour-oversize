"use client";

import { useState, useMemo } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

interface ProductFiltersProps {
    products: Product[];
}

export default function ProductFilters({ products }: ProductFiltersProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedSize, setSelectedSize] = useState<string>('all');
    const [promoOnly, setPromoOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Extract unique categories and sizes from products
    const categories = useMemo(() => {
        const cats = [...new Set(products.map(p => p.category))];
        return cats.sort();
    }, [products]);

    const sizes = useMemo(() => {
        const allSizes = products.flatMap(p => p.sizes);
        return [...new Set(allSizes)];
    }, [products]);

    // Filter and sort logic
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Size filter
        if (selectedSize !== 'all') {
            result = result.filter(p => p.sizes.includes(selectedSize));
        }

        // Promo filter
        if (promoOnly) {
            result = result.filter(p => p.promotion && p.discountPrice);
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                break;
            case 'price-desc':
                result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Featured first
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return result;
    }, [products, selectedCategory, selectedSize, promoOnly, sortBy]);

    const activeFilterCount = [
        selectedCategory !== 'all',
        selectedSize !== 'all',
        promoOnly,
    ].filter(Boolean).length;

    const clearFilters = () => {
        setSelectedCategory('all');
        setSelectedSize('all');
        setPromoOnly(false);
        setSortBy('default');
    };

    return (
        <div>
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                {/* Left: Filter toggle + active count */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${isFilterOpen
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                            }`}
                    >
                        <SlidersHorizontal size={16} />
                        Filtrer
                        {activeFilterCount > 0 && (
                            <span className="bg-rose-main text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-gray-500 hover:text-rose-main transition-colors underline underline-offset-2"
                        >
                            Effacer tout
                        </button>
                    )}
                </div>

                {/* Right: Sort + Result count */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        {filteredProducts.length} article{filteredProducts.length !== 1 ? 's' : ''}
                    </span>

                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="appearance-none bg-white border border-gray-200 rounded-full px-5 py-2.5 pr-10 text-sm text-gray-700 font-medium hover:border-gray-400 transition-colors cursor-pointer focus:outline-none focus:border-rose-main"
                        >
                            <option value="default">Mis en avant</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="name-asc">Nom A-Z</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isFilterOpen ? 'max-h-[500px] opacity-100 mb-10' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Category Filter */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                Catégorie
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    Toutes
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                Taille
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedSize('all')}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSize === 'all'
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    Toutes
                                </button>
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all min-w-[2.5rem] text-center ${selectedSize === size
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Promo Toggle */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                Offres
                            </h3>
                            <button
                                onClick={() => setPromoOnly(!promoOnly)}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${promoOnly
                                    ? 'bg-rose-main text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-rose-300'
                                    }`}
                            >
                                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${promoOnly ? 'border-white' : 'border-gray-300'
                                    }`}>
                                    {promoOnly && <span className="w-2 h-2 bg-white rounded-full" />}
                                </span>
                                En promotion uniquement
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="text-xs text-gray-400 uppercase tracking-wider mr-1">Filtres actifs :</span>

                    {selectedCategory !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                            {selectedCategory}
                            <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-main transition-colors">
                                <X size={12} />
                            </button>
                        </span>
                    )}

                    {selectedSize !== 'all' && (
                        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                            Taille : {selectedSize}
                            <button onClick={() => setSelectedSize('all')} className="hover:text-rose-main transition-colors">
                                <X size={12} />
                            </button>
                        </span>
                    )}

                    {promoOnly && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-700 text-xs font-medium px-3 py-1.5 rounded-full">
                            Promo
                            <button onClick={() => setPromoOnly(false)} className="hover:text-rose-900 transition-colors">
                                <X size={12} />
                            </button>
                        </span>
                    )}
                </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="animate-fade-in"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-xl font-serif text-gray-900 mb-3">
                        Aucun article trouvé
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Essayez de modifier vos filtres pour découvrir nos pièces.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}
        </div>
    );
}
