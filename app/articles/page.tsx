import { Metadata } from 'next';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { Product } from '@/types';

const products = productsData as Product[];

export const metadata: Metadata = {
    title: 'Collection Mastour Oversize | Robes, Abayas, Ensembles',
    description: 'Découvrez notre collection complète de vêtements modestes et oversized. Robes longues, abayas fluides et ensembles élégants.',
};

export default function ArticlesPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <span className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2 block">Catalogue</span>
                    <SectionTitle title="Toute la Collection" subtitle="Des pièces uniques pensées pour vous sublimer en toute modestie." />
                </div>

                {/* Filters could go here - keeping it simple for MVP */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
