import productsData from '@/data/products.json';
import promotionsData from '@/data/promotions.json';
import { Product, Promotion } from '@/types';

export const products = productsData as unknown as Product[];

export const promotions = (promotionsData as Promotion[]).filter((p) => p.active !== false);

export const CATEGORIES = ['Robes', 'Abayas', 'Ensembles', 'Kimonos'];

const priceFormat = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

export function formatPrice(value: number) {
    return priceFormat.format(value);
}

export function currentPrice(product: Product) {
    return product.promotion && product.discountPrice ? product.discountPrice : product.price;
}

export function discountPercent(product: Product) {
    if (!product.promotion || !product.discountPrice) return 0;
    return Math.round((1 - product.discountPrice / product.price) * 100);
}

// Les fiches sans photo réelle affichent un vêtement dessiné (voir Garment)
export function hasPhoto(product: Product) {
    const image = product.images[0];
    return Boolean(image) && !image.includes('placeholder');
}

export function inStock(product: Product) {
    if (!product.stock) return true;
    return Object.values(product.stock).some((count) => count > 0);
}

export function relatedProducts(product: Product, count = 4) {
    const same = products.filter((p) => p.id !== product.id && p.category === product.category);
    const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...same, ...others].slice(0, count);
}
