import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Check, Instagram, Ruler, ShoppingBag } from 'lucide-react';
import productsData from '@/data/products.json';
import { Product } from '@/types';
import SectionTitle from '@/components/SectionTitle';

const products = productsData as Product[];

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

    // Instagram message template
    const message = `Bonjour, je souhaite commander le produit "${product.name}" (Ref: ${product.id}). Est-il disponible en taille ... ?`;
    const instagramUrl = `https://instagram.com/mastouroversize`; // No direct DM pre-fill widely supported, standard profile link

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
                <Link href="/articles" className="inline-flex items-center text-gray-500 hover:text-rose-600 mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Retour à la collection
                </Link>

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
                    <div className="flex flex-col h-full justify-center">
                        <div>
                            <span className="text-rose-500 font-medium tracking-wide text-sm uppercase mb-2 block">{product.category}</span>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-3xl font-bold text-gray-900">
                                    {price?.toFixed(2)}€
                                </div>
                                {isDiscounted && (
                                    <div className="text-xl text-gray-400 line-through decoration-rose-500 decoration-2">
                                        {product.price.toFixed(2)}€
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-b border-gray-100 py-6 mb-8">
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full w-fit mb-6">
                                    <Check size={16} /> En stock - Livraison 48h
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Ruler size={18} /> Tailles disponibles
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map(size => (
                                            <span key={size} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-medium min-w-[3rem] text-center hover:border-rose-300 hover:text-rose-600 cursor-default cursor-pointer transition-colors bg-white">
                                                {size}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto bg-rose-50 p-6 rounded-2xl border border-rose-100">
                            <h3 className="font-bold text-rose-800 mb-2">Comment commander ?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Les commandes se font exclusivement sur Instagram. Cliquez ci-dessous pour nous envoyer un message avec la référence.
                            </p>
                            <Link
                                href={instagramUrl}
                                target="_blank"
                                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                            >
                                <Instagram size={24} />
                                Commander sur Instagram
                            </Link>
                            <div className="mt-3 text-center">
                                <span className="text-xs text-gray-400">Réf: {product.id} (à mentionner)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
