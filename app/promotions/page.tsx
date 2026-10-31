import { Metadata } from 'next';
import CopyCode from '@/components/CopyCode';
import PageIntro from '@/components/PageIntro';
import ProductCard from '@/components/ProductCard';
import { discountPercent, products, promotions } from '@/lib/catalog';

export const metadata: Metadata = {
    title: 'Offres',
    description: 'Les offres en cours et les pièces à prix réduit chez Mastour Oversize.',
    alternates: { canonical: '/promotions' },
};

export default function PromotionsPage() {
    const discounted = products.filter((p) => discountPercent(p) > 0);

    return (
        <>
            <PageIntro eyebrow="Offres en cours" title={<>Prix <em className="text-thread">doux</em></>}>
                <p>Les codes s’indiquent directement dans votre message de commande sur Instagram.</p>
            </PageIntro>

            {promotions.length > 0 && (
                <section className="bg-clay py-10 text-[#2b1216] dark:text-on-wine" aria-label="Codes de réduction">
                    <ul className="page-x divide-y divide-current/25">
                        {promotions.map((promo) => (
                            <li key={promo.id} className="flex flex-wrap items-center justify-between gap-6 py-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl">{promo.title}</h2>
                                    <p className="mt-2 text-lg">{promo.description}</p>
                                </div>
                                {promo.code && <CopyCode code={promo.code} />}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="page-x py-14 md:py-20" aria-labelledby="reduits-title">
                <h2 id="reduits-title" className="label font-mono">
                    {discounted.length} pièce{discounted.length > 1 ? 's' : ''} à prix réduit
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-5">
                    {discounted.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </>
    );
}
