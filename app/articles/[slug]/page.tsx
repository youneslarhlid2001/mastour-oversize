import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import ProductExperience from '@/components/ProductExperience';
import { currentPrice, hasPhoto, inStock, products, relatedProducts } from '@/lib/catalog';
import { SITE_URL } from '@/lib/site';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.id === slug);

    if (!product) {
        return { title: 'Produit non trouvé' };
    }

    return {
        title: product.name,
        description: product.description.substring(0, 160),
        alternates: { canonical: `/articles/${product.id}` },
        openGraph: hasPhoto(product) ? { images: product.images } : undefined,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = products.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        ...(hasPhoto(product) ? { image: product.images.map((src) => `${SITE_URL}${src}`) } : {}),
        description: product.description,
        sku: product.id,
        category: product.category,
        brand: {
            '@type': 'Brand',
            name: 'Mastour Oversize',
        },
        offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/articles/${product.id}`,
            priceCurrency: 'EUR',
            price: currentPrice(product),
            availability: inStock(product) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className="page-x label flex gap-2 py-3 text-ink-soft" aria-label="Fil d’Ariane">
                <Link href="/articles" className="hover:text-thread">Collection</Link>
                <span aria-hidden="true">/</span>
                <Link href={`/articles?categorie=${product.category}`} className="hover:text-thread">{product.category}</Link>
            </nav>

            <ProductExperience product={product} />

            <section className="border-t border-line py-14 md:py-20" aria-labelledby="related-title">
                <div className="page-x">
                    <h2 id="related-title" className="display text-[clamp(2.5rem,5vw,5rem)]">Vous aimerez <em>aussi</em></h2>
                    <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
                        {relatedProducts(product).map((related) => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
