import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="page-x flex min-h-[70dvh] flex-col justify-center py-16">
            <p className="label text-thread">Erreur 404</p>
            <h1 className="display mt-4 text-[clamp(4rem,14vw,14rem)] leading-[1.05]">Fil <em>perdu.</em></h1>
            <p className="mt-6 max-w-[40ch] text-lg text-ink-soft">Cette page n’existe pas ou plus. Reprenons depuis la collection.</p>
            <div className="mt-8">
                <Link href="/articles" className="btn">Voir la collection</Link>
            </div>
        </section>
    );
}
