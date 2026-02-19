import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const isDiscounted = product.promotion && product.discountPrice;

    return (
        <Link
            href={`/articles/${product.id}`}
            className="group block"
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full bg-[#f0f0f0] overflow-hidden mb-4">
                <Image
                    src={product.images[0] || '/images/products/placeholder-product.svg'}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badge Promo */}
                {isDiscounted && (
                    <span className="absolute top-0 left-0 bg-rose-main text-white text-[10px] uppercase font-bold px-3 py-1.5 tracking-widest">
                        Promo
                    </span>
                )}

                {/* Hover Action */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Plus size={24} strokeWidth={1} />
                    </span>
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-gray-900 font-serif text-lg leading-tight mb-1 group-hover:text-rose-main transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{product.category}</p>

                <div className="flex items-center gap-2 font-medium">
                    {isDiscounted ? (
                        <>
                            <span className="text-rose-800">{product.discountPrice?.toFixed(2)}€</span>
                            <span className="text-gray-400 line-through text-sm font-light">{product.price.toFixed(2)}€</span>
                        </>
                    ) : (
                        <span className="text-gray-900">{product.price.toFixed(2)}€</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
