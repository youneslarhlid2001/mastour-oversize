import { Metadata } from 'next';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';

export const metadata: Metadata = {
    title: 'Qui sommes-nous ? - Mastour Oversize',
    description: 'Notre histoire, nos valeurs et notre engagement pour une mode mastour moderne et élégante.',
};

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <SectionTitle title="La Marque" subtitle="Une vision moderne de la modestie." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative aspect-square rounded-full overflow-hidden border-8 border-rose-50 shadow-2xl">
                        <Image
                            src="/images/hero-bg.svg" // Placeholder until real image
                            alt="Notre Vision"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6 font-display">Notre Histoire</h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-6 font-light">
                            Mastour Oversize est née d'une volonté simple : proposer aux femmes musulmanes des vêtements alliant pudeur, confort et style. Nous croyons que s'habiller selon ses valeurs ne doit jamais être un compromis sur l'élégance.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            Chaque pièce de nos collections est pensée pour offrir des coupes amples (oversize) qui ne marquent pas les formes, tout en utilisant des tissus fluides et respirants adaptés à toutes les saisons.
                        </p>
                    </div>
                </div>

                <div className="bg-rose-50 rounded-3xl p-12 md:p-20 shadow-inner">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-rose-800 mb-4 font-display">Nos Valeurs</h3>
                        <div className="w-24 h-1 bg-rose-300 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-rose-500 text-3xl font-bold">1</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Modestie</h4>
                            <p className="text-gray-600">Le respect des préceptes, sans artifice.</p>
                        </div>
                        <div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-rose-500 text-3xl font-bold">2</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Qualité</h4>
                            <p className="text-gray-600">Des tissus durables et des finitions soignées.</p>
                        </div>
                        <div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-rose-500 text-3xl font-bold">3</div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Accessibilité</h4>
                            <p className="text-gray-600">La mode pour toutes, à prix juste.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
