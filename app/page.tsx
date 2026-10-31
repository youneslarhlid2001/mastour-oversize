import { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import CopyCode from '@/components/CopyCode';
import Garment from '@/components/Garment';
import InstagramCTA from '@/components/InstagramCTA';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, discountPercent, products, promotions } from '@/lib/catalog';
import { backdropFor } from '@/lib/colors';

const categoryHeroes: Record<string, { id: string; color: string; note: string }> = {
    Robes: { id: 'robe-satin-emeraude', color: 'Émeraude', note: 'Fluides, longues, du lin au satin' },
    Abayas: { id: 'abaya-papillon-noire', color: 'Noir', note: 'Papillon, brodée ou du quotidien' },
    Ensembles: { id: 'ensemble-mastour-beige', color: 'Beige clair', note: 'Deux pièces, tuniques et palazzos' },
    Kimonos: { id: 'kimono-velours-taupe', color: 'Prune', note: 'Soie de Médine, velours, dentelle' },
};

const steps = [
    { title: 'Choisissez', text: 'Votre pièce, son coloris et votre taille. Ajoutez-en plusieurs à votre sélection si vous le souhaitez.' },
    { title: 'Envoyez', text: 'Votre message de commande est prêt et copié. Collez-le dans la conversation Instagram qui s’ouvre.' },
    { title: 'Confirmez', text: 'Nous validons la disponibilité et le total. Vous réglez par virement ou PayPal.' },
    { title: 'Recevez', text: 'Expédition sous 24 h, puis 48 à 72 h ouvrées en France métropolitaine, avec suivi.' },
];

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Home() {
    const featured = products.filter((p) => p.featured).slice(0, 4);
    const discounted = products.filter((p) => discountPercent(p) > 0);
    const welcome = promotions.find((p) => p.id === 'offre-bienvenue');

    return (
        <>
            {/* Ouverture : le titre déborde sur l'image */}
            <section className="page-x relative overflow-hidden pb-14 pt-8 md:pt-10 lg:min-h-[calc(100dvh-6rem)]">
                <h1 className="display relative z-20 text-[clamp(3.6rem,13.4vw,16rem)]">
                    <span className="rise block">Une mode</span>
                    <span className="rise block" style={delay(120)}>
                        qui <em className="text-thread">respire.</em>
                    </span>
                </h1>

                <div className="relative z-10 mt-[-1.5rem] grid gap-8 lg:mt-[-8vw] lg:grid-cols-12">
                    <div className="order-2 pb-2 lg:order-1 lg:col-span-5 lg:pt-[11vw]">
                        <p className="rise max-w-[34ch] text-lg leading-relaxed md:text-xl" style={delay(260)}>
                            Des coupes oversize pensées pour la femme moderne, alliant pudeur et liberté de mouvement.
                        </p>
                        <div className="rise mt-7 flex flex-wrap items-center gap-6" style={delay(360)}>
                            <Link href="/articles" className="btn">
                                Découvrir la collection <ArrowRight size={18} strokeWidth={1.5} />
                            </Link>
                            <Link href="/about" className="stitch-link text-sm">La marque</Link>
                        </div>
                    </div>

                    <figure className="unveil relative order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
                        <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                                src="/images/hero.webp"
                                alt="Silhouette de dos en robe ample rose, marchant dans les hautes herbes au coucher du soleil"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 42vw"
                                className="object-cover"
                            />
                        </div>
                    </figure>
                </div>

                {/* Le fil part du bord et passe derrière la photo */}
                <svg
                    className="sew pointer-events-none absolute inset-x-0 bottom-[4%] z-0 hidden h-[34%] w-full lg:block"
                    viewBox="0 0 1000 300"
                    preserveAspectRatio="none"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M-10 120 C 120 300 300 300 430 190 S 560 20 700 80 S 900 260 1010 160"
                        stroke="var(--thread)"
                        strokeWidth="2"
                        strokeDasharray="11 8"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </section>

            {/* Le nom : définition */}
            <section className="overflow-hidden bg-wine text-on-wine">
                <div className="page-x grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-6">
                    <div className="reveal lg:col-span-7">
                        <p lang="ar" dir="rtl" className="text-left font-arabic text-[clamp(7rem,21vw,20rem)] leading-[1]">
                            مستور
                        </p>
                        <p className="mt-4 font-display text-3xl italic md:text-4xl">
                            mastour <span className="not-italic opacity-60">adj.</span>
                        </p>
                        <p className="mt-2 max-w-[28ch] font-display text-3xl leading-[1.15] md:text-4xl">
                            Couvert, préservé, gardé avec pudeur.
                        </p>
                    </div>
                    <div className="reveal flex flex-col justify-between gap-8 lg:col-span-4 lg:col-start-9">
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <Image
                                src="/images/philosophy.webp"
                                alt="Robe ample rose poudré, branches fleuries en arrière-plan"
                                fill
                                sizes="(max-width: 1024px) 100vw, 30vw"
                                className="object-cover object-top"
                            />
                        </div>
                        <div>
                            <p className="leading-relaxed opacity-90">
                                Nous croyons que la modestie ne doit jamais se faire au détriment du style ou du confort. Nos créations sont le fruit d’une recherche constante des matières les plus nobles et des coupes les plus flatteuses.
                            </p>
                            <Link href="/about" className="stitch-link mt-5 inline-block text-sm">Notre histoire</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Index des catégories */}
            <section className="pt-16 md:pt-24" aria-labelledby="categories-title">
                <div className="page-x mb-6 flex items-baseline justify-between">
                    <h2 id="categories-title" className="label font-mono">La collection</h2>
                    <span className="label text-ink-soft">{products.length} pièces</span>
                </div>
                <ul className="border-t border-ink">
                    {CATEGORIES.map((category) => {
                        const hero = categoryHeroes[category];
                        const count = products.filter((p) => p.category === category).length;
                        return (
                            <li key={category} className="border-b border-ink">
                                <Link
                                    href={`/articles?categorie=${category}`}
                                    className="page-x group relative flex items-center justify-between gap-4 overflow-hidden py-3 transition-colors duration-300 hover:bg-clay md:py-4"
                                >
                                    <span className="display text-[clamp(3.5rem,13vw,13rem)] leading-[0.98] transition-transform duration-500 group-hover:translate-x-3 group-hover:italic">
                                        {category}
                                        <sup className="ml-2 align-super font-mono text-xs not-italic tracking-normal">{count}</sup>
                                    </span>
                                    <span className="hidden max-w-[16rem] flex-1 text-sm lg:block">{hero.note}</span>
                                    <span
                                        className="grain relative h-[clamp(5rem,13vw,12rem)] w-[clamp(4rem,10vw,9rem)] shrink-0 overflow-hidden transition-transform duration-500 group-hover:-rotate-2"
                                        style={{ background: backdropFor(hero.color) }}
                                    >
                                        <Garment productId={hero.id} color={hero.color} className="absolute inset-0 h-full w-full" />
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Favoris */}
            <section className="py-16 md:py-24" aria-labelledby="favoris-title">
                <div className="page-x mb-8 flex items-end justify-between gap-6">
                    <h2 id="favoris-title" className="display text-[clamp(3rem,7vw,7rem)]">
                        Nos <em>favoris</em>
                    </h2>
                    <Link href="/articles" className="stitch-link whitespace-nowrap pb-1 text-sm">Tout voir</Link>
                </div>
                <div className="page-x no-scrollbar flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,4vw,4rem)] gap-3 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible">
                    {featured.map((product, i) => (
                        <div key={product.id} className={`w-[72vw] shrink-0 snap-start md:w-auto ${i % 2 === 1 ? 'md:mt-16' : ''}`}>
                            <ProductCard product={product} sizes="(max-width: 768px) 72vw, 25vw" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Comment commander */}
            <section className="bg-paper-deep py-16 md:py-24" aria-labelledby="commander-title">
                <div className="page-x">
                    <h2 id="commander-title" className="display max-w-[12ch] text-[clamp(3rem,7vw,7rem)]">
                        Commander, en <em>quatre points</em>.
                    </h2>
                    <div className="stitch mt-12 hidden md:block" />
                    <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
                        {steps.map((step, i) => (
                            <li key={step.title} className="reveal">
                                <span className="label text-thread">Point {i + 1}</span>
                                <h3 className="mt-2 text-3xl md:text-4xl">{step.title}</h3>
                                <p className="mt-2 max-w-[32ch] text-[0.9375rem] leading-relaxed text-ink-soft">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                    <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
                        {[
                            ['80 €', 'Livraison offerte dès ce montant, en France métropolitaine'],
                            ['24 h', 'Pour vous répondre sur Instagram'],
                            ['48-72 h', 'Délai de livraison ouvré après expédition'],
                            ['14 jours', 'Pour retourner ou échanger'],
                        ].map(([value, text]) => (
                            <div key={value}>
                                <dt className="font-display text-3xl md:text-4xl">{value}</dt>
                                <dd className="mt-1 text-sm text-ink-soft">{text}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* Offres */}
            {(discounted.length > 0 || welcome) && (
                <section className="bg-clay py-16 text-[#2b1216] [--ink-soft:#3f2320] [--line:rgb(43_18_22/0.35)] [--thread:#5a1206] md:py-24 dark:text-on-wine dark:[--ink-soft:#f3ebdd] dark:[--line:rgb(243_235_221/0.4)] dark:[--thread:#ffe1d3]" aria-labelledby="offres-title">
                    <div className="page-x grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <h2 id="offres-title" className="display text-[clamp(3rem,7vw,7rem)]">
                                Prix <em>doux</em>
                            </h2>
                            {welcome && (
                                <div className="mt-8 max-w-sm">
                                    <p className="text-lg leading-snug">-10&nbsp;% sur votre première commande via Instagram.</p>
                                    {welcome.code && (
                                        <div className="mt-4 inline-block">
                                            <CopyCode code={welcome.code} />
                                        </div>
                                    )}
                                    <p className="mt-3 text-sm">À indiquer dans votre message de commande.</p>
                                </div>
                            )}
                            <Link href="/articles?promo=1" className="mt-8 flex w-fit items-center gap-2 text-sm underline underline-offset-4">
                                Toutes les pièces à prix réduit <ArrowUpRight size={16} strokeWidth={1.5} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:col-span-6 lg:col-start-7">
                            {discounted.slice(0, 2).map((product) => (
                                <ProductCard key={product.id} product={product} sizes="(max-width: 1024px) 50vw, 25vw" />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <InstagramCTA />
        </>
    );
}
