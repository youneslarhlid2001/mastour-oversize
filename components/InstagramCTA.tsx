import Link from 'next/link';
import { Instagram, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function InstagramCTA() {
    return (
        <section className="bg-gradient-to-br from-rose-50 to-white py-16 text-center">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-bold text-rose-600 mb-6 font-display tracking-tight">
                    Rejoignez la communauté
                </h2>
                <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                    Découvrez nos nouveautés en exclusivité, nos conseils mode et l'inspiration quotidienne sur notre compte Instagram.
                </p>

                <Link
                    href="https://instagram.com/mastouroversize"
                    target="_blank"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
                >
                    <Instagram size={24} className="group-hover:rotate-12 transition-transform" />
                    <span>Suivez-nous sur Instagram</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
