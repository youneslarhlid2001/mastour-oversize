import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import productsData from '@/data/products.json';
import promotionsData from '@/data/promotions.json';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import WhyUs from '@/components/WhyUs';
import InstagramCTA from '@/components/InstagramCTA';
import SectionTitle from '@/components/SectionTitle';

const products = productsData as Product[]; // Type cleanup

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-real.png"
            alt="Collection Mastour Oversize"
            fill
            className="object-cover object-center"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/40 to-black/20 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur border border-white/30 text-sm font-medium tracking-wider mb-6 uppercase">Nouvelle Collection 2026</span>
          <h1 className="text-4xl md:text-7xl font-bold mb-6 font-display tracking-tight leading-tight">
            L'Élégance de la<br /><span className="text-rose-200">Simplicité</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-light text-rose-50 leading-relaxed">
            Des coupes oversize, des tissus fluides et une allure résolument moderne pour la femme mastour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="bg-white text-rose-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-rose-50 transition-all transform hover:-translate-y-1"
            >
              Découvrir la Collection
            </Link>
            <Link
              href="https://instagram.com/mastouroversize"
              target="_blank"
              className="bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Rejoindre Instagram
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
          <ArrowRight className="rotate-90" size={32} />
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative SVG */}
        <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
          <Image src="/floral-pattern.svg" alt="" width={400} height={400} />
        </div>

        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nos Coups de Cœur"
            subtitle="Une sélection de pièces incontournables pour votre garde-robe mastour."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-rose-600 font-bold hover:text-rose-700 transition-colors border-b-2 border-rose-200 hover:border-rose-600 pb-1"
            >
              Voir toute la collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions if any */}
      {promotionsData.length > 0 && (
        <section className="py-20 bg-rose-50 border-y border-rose-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative h-96 rounded-2xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-0 transform md:rotate-2 hover:rotate-0 transition-all duration-500">
                <Image
                  src={promotionsData[0].image || '/images/hero-bg.webp'}
                  alt={promotionsData[0].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <span className="bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">OFFRE SPÉCIALE</span>
                    <h3 className="text-2xl font-bold">{promotionsData[0].title}</h3>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 md:pl-12">
                <SectionTitle title="Promotions en cours" />
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100">
                  <h3 className="text-2xl font-bold text-rose-600 mb-2">{promotionsData[0].title}</h3>
                  <p className="text-gray-600 mb-6 text-lg">{promotionsData[0].description}</p>
                  {promotionsData[0].code && (
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 mb-6 flex flex-col items-center">
                      <span className="text-gray-500 text-sm mb-1 uppercase tracking-wide">Code Promo</span>
                      <span className="text-2xl font-mono font-bold text-gray-800 select-all">{promotionsData[0].code}</span>
                    </div>
                  )}
                  <Link
                    href={promotionsData[0].link}
                    className="block w-full bg-gray-900 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
                  >
                    Profiter de l'offre
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Us Section */}
      <WhyUs />

      {/* Instagram CTA */}
      <InstagramCTA />
    </>
  );
}
