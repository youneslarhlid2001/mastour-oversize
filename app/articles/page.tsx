import { Metadata } from 'next';
import productsData from '@/data/products.json';
import SectionTitle from '@/components/SectionTitle';
import ProductFilters from '@/components/ProductFilters';
import { Product } from '@/types';

const products = productsData as unknown as Product[];

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

                <ProductFilters products={products} />
            </div>
        </div>
    );
}
