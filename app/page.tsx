import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import productsData from '@/data/products.json';
import promotionsData from '@/data/promotions.json';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import InstagramCTA from '@/components/InstagramCTA';
import ScrollReveal from '@/components/ScrollReveal';

const products = productsData as unknown as Product[];

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero Section - Editorial Style (no scroll reveal, already animated via CSS) */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-real.png"
            alt="Collection Mastour Oversize"
            fill
            className="object-cover object-top scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 opacity-90 animate-fade-in-up">Nouvelle Collection</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight animate-fade-in-up delay-100">
            L&apos;Élégance <br /> <span className="italic font-light">Naturelle</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light text-white/90 leading-relaxed animate-fade-in-up delay-200">
            Une mode qui respire. Des coupes oversize pensées pour la femme moderne, alliant pudeur et liberté de mouvement.
          </p>

          <div className="animate-fade-in-up delay-300">
            <Link
              href="/articles"
              className="group inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-medium transition-all hover:bg-rose-50"
            >
              Découvrir la Collection
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy / Intro */}
      <section className="py-24 bg-beige-light">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-left" duration={800}>
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-rose-200/20"></div>
              <Image
                src="/images/intro-philosophy.png"
                alt="Détail tissu"
                fill
                className="object-cover object-top"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-right" delay={200} duration={800}>
            <div>
              <span className="text-rose-main uppercase tracking-widest text-xs font-bold mb-4 block">Notre Philosophie</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-gray-900 leading-tight">
                Le confort sans <br /><span className="italic text-rose-dark">compromis</span>.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Chez Mastour Oversize, nous croyons que la modestie ne doit jamais se faire au détriment du style ou du confort. Nos créations sont le fruit d&apos;une recherche constante des matières les plus nobles et des coupes les plus flatteuses.
              </p>
              <Link href="/about" className="text-gray-900 font-bold border-b border-gray-900 pb-1 hover:text-rose-main hover:border-rose-main transition-all">
                En savoir plus sur la marque
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Collection - Curated Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <ScrollReveal animation="fade-up">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2">Nos Favoris</h2>
                <p className="text-gray-500 font-light">Les pièces iconiques de la saison.</p>
              </div>
              <Link href="/articles" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-rose-main transition-colors">
                Tout voir <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product, index) => (
              <ScrollReveal key={product.id} animation="fade-up" delay={index * 120} duration={700}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-in" delay={400}>
            <div className="mt-16 text-center md:hidden">
              <Link href="/articles" className="inline-block border border-gray-300 px-8 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors">
                Voir toute la collection
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Promotions - Magazine Style */}
      {promotionsData.length > 0 && (
        <section className="py-24 bg-rose-light overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-[2rem] p-8 md:p-16 relative shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <ScrollReveal animation="fade-up" duration={800}>
                  <div>
                    <span className="inline-block bg-rose-main text-white text-xs font-bold px-3 py-1 rounded-full mb-6">OFFRE LIMITÉE</span>
                    <h3 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-gray-900">{promotionsData[0].title}</h3>
                    <p className="text-xl text-gray-600 mb-8 font-light italic">&quot;{promotionsData[0].description}&quot;</p>

                    {promotionsData[0].code && (
                      <div className="flex items-center gap-4 mb-8">
                        <div className="bg-gray-50 px-6 py-3 rounded-lg border border-gray-200 font-mono text-xl text-gray-800">
                          {promotionsData[0].code}
                        </div>
                        <span className="text-sm text-gray-400">À utiliser au checkout</span>
                      </div>
                    )}

                    <Link
                      href={promotionsData[0].link}
                      className="inline-block bg-gray-900 text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                      En profiter maintenant
                    </Link>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="scale" delay={300} duration={900}>
                  <div className="relative h-[400px] w-full rounded-xl overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl">
                    <Image
                      src={promotionsData[0].image || '/images/hero-bg-real.png'}
                      alt="Promotion"
                      fill
                      className="object-cover"
                    />
                  </div>
                </ScrollReveal>
              </div>

              {/* Decor */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            </div>
          </div>
        </section>
      )}

      {/* Instagram */}
      <ScrollReveal animation="fade-up" duration={800}>
        <InstagramCTA />
      </ScrollReveal>
    </>
  );
}

