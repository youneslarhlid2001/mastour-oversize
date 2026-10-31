import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageIntro from '@/components/PageIntro';

export const metadata: Metadata = {
    title: 'La marque',
    description: 'Notre histoire, nos valeurs et notre engagement pour une mode modeste, moderne et élégante.',
    alternates: { canonical: '/about' },
};

const values = [
    { name: 'Modestie', text: 'Le respect des préceptes, sans artifice.' },
    { name: 'Qualité', text: 'Des tissus durables et des finitions soignées.' },
    { name: 'Accessibilité', text: 'La mode pour toutes, à prix juste.' },
];

export default function AboutPage() {
    return (
        <>
            <PageIntro eyebrow="La marque" title={<>Une vision moderne de la <em className="text-thread">modestie.</em></>} />

            <section className="page-x grid gap-10 pb-16 md:pb-24 lg:grid-cols-12">
                <div className="relative aspect-[3/4] overflow-hidden lg:col-span-5">
                    <Image
                        src="/images/hero.webp"
                        alt="Silhouette de dos en robe ample rose, dans les hautes herbes"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
                    <h2 className="text-4xl md:text-5xl">Notre histoire</h2>
                    <p className="mt-6 text-lg leading-relaxed">
                        Mastour Oversize est née d’une volonté simple : proposer aux femmes musulmanes des vêtements alliant pudeur, confort et style. Nous croyons que s’habiller selon ses valeurs ne doit jamais être un compromis sur l’élégance.
                    </p>
                    <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                        Chaque pièce de nos collections est pensée pour offrir des coupes amples qui ne marquent pas les formes, tout en utilisant des tissus fluides et respirants adaptés à toutes les saisons.
                    </p>
                </div>
            </section>

            <section className="bg-wine py-16 text-on-wine md:py-24" aria-labelledby="valeurs-title">
                <div className="page-x">
                    <h2 id="valeurs-title" className="label font-mono">Nos valeurs</h2>
                    <ul className="mt-8">
                        {values.map((value) => (
                            <li key={value.name} className="reveal grid gap-2 border-t border-on-wine/25 py-6 md:grid-cols-12 md:items-baseline">
                                <span className="display text-[clamp(3rem,8vw,8rem)] leading-none md:col-span-8">{value.name}</span>
                                <span className="text-lg md:col-span-4">{value.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="page-x flex flex-wrap items-center justify-between gap-6 py-14">
                <p className="font-display text-3xl md:text-4xl">Découvrez les pièces.</p>
                <Link href="/articles" className="btn">Voir la collection</Link>
            </section>
        </>
    );
}
