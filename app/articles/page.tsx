import { Metadata } from 'next';
import Catalog from '@/components/Catalog';
import { products } from '@/lib/catalog';

export const metadata: Metadata = {
    title: 'La collection : robes, abayas, ensembles, kimonos',
    description: 'Toute la collection Mastour Oversize. Robes longues, abayas fluides, ensembles élégants et kimonos, en coupes amples.',
    alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
    return (
        <div className="pt-8 md:pt-12">
            <h1 className="sr-only">La collection Mastour Oversize</h1>
            <Catalog products={products} />
        </div>
    );
}
