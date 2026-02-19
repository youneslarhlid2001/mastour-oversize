import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Check } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import SizeSelector from '@/components/SizeSelector';
import Breadcrumbs from '@/components/Breadcrumbs';

const products = productsData as unknown as Product[];

interface Props {
    params: { slug: string };
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
        title: `${product.name} - Mastour Oversize`,
        description: product.description.substring(0, 160),
        openGraph: {
            images: product.images,
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = products.find((p) => p.id === slug);

    if (!product) {
        notFound();
    }

    const isDiscounted = product.promotion && product.discountPrice;
    const price = isDiscounted ? product.discountPrice : product.price;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.id,
        brand: {
            '@type': 'Brand',
            name: 'Mastour Oversize',
        },
        offers: {
            '@type': 'Offer',
            url: `https://mastouroversize.com/articles/${product.id}`,
            priceCurrency: 'EUR',
            price: isDiscounted ? product.discountPrice : product.price,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <div className="bg-white min-h-screen py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-6xl">
                <Breadcrumbs items={[
                    { label: 'Collection', href: '/articles' },
                    { label: product.name },
                ]} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Gallery - Mobile stacking, Desktop grid/stack */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-rose-50/50">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {isDiscounted && (
                                <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold px-3 py-1 rounded-md shadow-md">
                                    PROMO
                                </span>
                            )}
                        </div>

                        {/* Thumbnails if multiple */}
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-rose-100 cursor-pointer hover:border-rose-400 opacity-80 hover:opacity-100 transition-all">
                                        <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-6">
                        {/* --- ABOVE THE FOLD: Key info + CTA --- */}
                        <div>
                            <span className="text-rose-500 font-medium tracking-wide text-sm uppercase mb-1 block">{product.category}</span>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-2xl font-bold text-gray-900">
                                    {price?.toFixed(2)}€
                                </div>
                                {isDiscounted && (
                                    <div className="text-lg text-gray-400 line-through decoration-rose-500 decoration-2">
                                        {product.price.toFixed(2)}€
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium bg-green-50 px-2.5 py-1 rounded-full ml-auto">
                                    <Check size={14} /> En stock
                                </div>
                            </div>

                            {/* Couleurs - compact inline */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">Coloris :</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {product.colors.map(color => (
                                            <span key={color} className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-xs text-gray-600 font-medium">
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Interactive Size Selector + Instagram CTA */}
                        <SizeSelector
                            productName={product.name}
                            productId={product.id}
                            sizes={product.sizes}
                            stock={product.stock}
                        />

                        {/* --- BELOW THE FOLD: Details --- */}
                        <div className="border-t border-gray-100 pt-6 space-y-4">
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {product.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {/* Matière */}
                                {product.material && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 font-semibold uppercase tracking-wide text-xs min-w-[65px]">Matière</span>
                                        <span className="text-gray-700 text-xs">{product.material}</span>
                                    </div>
                                )}

                                {/* Poids */}
                                {product.weight && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-gray-400 font-semibold uppercase tracking-wide text-xs min-w-[65px]">Poids</span>
                                        <span className="text-gray-700 text-xs">{product.weight}</span>
                                    </div>
                                )}
                            </div>

                            {/* Entretien */}
                            {product.careInstructions && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide block mb-1">Entretien</span>
                                    <p className="text-gray-600 text-xs leading-relaxed">{product.careInstructions}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
