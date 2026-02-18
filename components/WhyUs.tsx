import { ShieldCheck, Heart, Truck } from 'lucide-react';

const reasons = [
    {
        icon: ShieldCheck,
        title: "Qualité Premium",
        description: "Tissus sélectionnés avec soin pour une opacité et un confort irréprochables."
    },
    {
        icon: Truck,
        title: "Livraison Rapide",
        description: "Expédition soignée sous 48h partout en France."
    },
    {
        icon: Heart,
        title: "Service Client Dévoué",
        description: "Une équipe à votre écoute pour vous conseiller sur Instagram."
    }
];

export default function WhyUs() {
    return (
        <section className="py-20 bg-rose-50/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Pourquoi choisir Mastour Oversize ?</h2>
                    <div className="w-16 h-1 bg-rose-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-rose-100/50"
                        >
                            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                                <reason.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{reason.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
