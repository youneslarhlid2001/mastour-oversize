import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isDiscounted = product.promotion && product.discountPrice;

    return (
        <Link
            href={`/articles/${product.id}`}
            className="group block relative overflow-hidden rounded-xl border border-rose-50 hover:shadow-lg transition-all duration-300 bg-white"
        >
            {/* Badge Promo */}
            {isDiscounted && (
                <span className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                    PROMO
                </span>
            )}

            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden">
                <Image
                    src={product.images[0] || '/images/products/placeholder-product.svg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 text-rose-700 px-4 py-2 rounded-full font-medium text-sm shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        Voir Détails <ArrowRight size={14} />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-gray-900 font-medium text-lg leading-tight mb-1 truncate group-hover:text-rose-600 transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3 capitalize">{product.category}</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {isDiscounted ? (
                            <div className="flex items-center gap-2">
                                <span className="text-rose-600 font-bold text-lg">{product.discountPrice?.toFixed(2)}€</span>
                                <span className="text-gray-400 line-through text-xs">{product.price.toFixed(2)}€</span>
                            </div>
                        ) : (
                            <span className="text-gray-900 font-bold text-lg">{product.price.toFixed(2)}€</span>
                        )}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        <ShoppingBag size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
