"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { discountPercent, formatPrice, currentPrice, hasPhoto } from '@/lib/catalog';
import { backdropFor, colorHex } from '@/lib/colors';
import Garment from '@/components/Garment';

interface ProductCardProps {
    product: Product;
    sizes?: string;
}

export default function ProductCard({ product, sizes = '(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw' }: ProductCardProps) {
    const [color, setColor] = useState(product.colors?.[0]);
    const discount = discountPercent(product);
    const href = color && color !== product.colors?.[0]
        ? `/articles/${product.id}?coloris=${encodeURIComponent(color)}`
        : `/articles/${product.id}`;

    return (
        <article className="group">
            <Link href={href} className="block">
                <div className="grain relative aspect-[3/4] overflow-hidden transition-colors duration-500" style={{ background: backdropFor(color) }}>
                    {hasPhoto(product) ? (
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes={sizes}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <Garment
                            productId={product.id}
                            category={product.category}
                            color={color}
                            label={`${product.name}, ${color ?? ''}`}
                            className="absolute inset-x-[6%] top-[3%] h-[97%] w-[88%]"
                        />
                    )}
                    {discount > 0 && (
                        <span className="tag absolute right-3 top-3 z-10">-{discount}&nbsp;%</span>
                    )}
                </div>

                <div className="mt-3 flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg leading-tight transition-colors group-hover:text-thread md:text-xl">{product.name}</h3>
                    <p className="whitespace-nowrap font-mono text-[0.8125rem]">
                        {discount > 0 && (
                            <>
                                <span className="sr-only">Prix réduit&nbsp;: </span>
                                <del className="mr-2 text-ink-soft">{formatPrice(product.price)}</del>
                            </>
                        )}
                        <span className={discount > 0 ? 'text-thread' : ''}>{formatPrice(currentPrice(product))}</span>
                    </p>
                </div>
            </Link>

            {product.colors && product.colors.length > 1 && (
                <div className="mt-1.5 flex items-center" role="group" aria-label={`Coloris de ${product.name}`}>
                    {product.colors.map((c) => (
                        <button
                            key={c}
                            type="button"
                            onClick={() => setColor(c)}
                            onMouseEnter={() => setColor(c)}
                            onFocus={() => setColor(c)}
                            aria-label={c}
                            aria-pressed={c === color}
                            title={c}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center first:-ml-1.5"
                        >
                            <span
                                className={`block h-3.5 w-3.5 rounded-full border border-line transition-shadow ${c === color ? 'shadow-[0_0_0_2px_var(--paper),0_0_0_3px_var(--ink)]' : ''}`}
                                style={{ background: colorHex(c) }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </article>
    );
}
