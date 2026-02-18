import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import promotionsData from '@/data/promotions.json';
import SectionTitle from '@/components/SectionTitle';
import { Promotion } from '@/types';

const promotions = promotionsData as Promotion[];

export const metadata: Metadata = {
    title: 'Promotions - Mastour Oversize',
    description: 'Profitez de nos offres exceptionnelles sur les robes, abayas et ensembles mastour.',
};

export default function PromotionsPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4">
                <SectionTitle title="Promotions en cours" subtitle="Faites-vous plaisir avec nos offres limitées." />

                {promotions.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <h3 className="text-xl font-bold mb-4">Aucune promotion en ce moment.</h3>
                        <p className="mb-8">Inscrivez-vous à notre newsletter ou suivez-nous sur Instagram pour être alertée.</p>
                        <Link href="/" className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600">Retour à l'accueil</Link>
                    </div>
                ) : (
                    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {promotions.map((promo) => (
                            <div key={promo.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={promo.image || '/images/hero-bg.webp'}
                                        alt={promo.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md">OFFRE LIMITÉE</div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate group-hover:text-rose-600 transition-colors">{promo.title}</h3>
                                    <p className="text-gray-600 mb-4 h-20 overflow-hidden text-ellipsis line-clamp-3 leading-relaxed">{promo.description}</p>
                                    {promo.code && (
                                        <div className="mb-4 bg-rose-50 border-2 border-dashed border-rose-200 p-3 rounded text-center">
                                            <span className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Code Promo</span>
                                            <span className="block text-lg font-mono font-bold text-gray-800">{promo.code}</span>
                                        </div>
                                    )}
                                    <Link
                                        href={promo.link}
                                        className="block w-full text-center bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-rose-600 transition-colors shadow-md"
                                    >
                                        Voir l'offre
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
