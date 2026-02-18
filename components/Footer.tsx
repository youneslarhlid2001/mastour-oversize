import Link from 'next/link';
import { Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-rose-50 text-gray-700 py-12 border-t border-rose-100">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h3 className="text-xl font-bold text-rose-600 mb-4">MASTOUR OVERSIZE</h3>
                    <p className="text-sm leading-relaxed mb-4">
                        Vêtements mastour élégants et modernes. La qualité au service de votre modestie.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <Link href="https://instagram.com/mastouroversize" className="text-gray-500 hover:text-rose-500 transition-colors">
                            <Instagram size={24} />
                        </Link>
                        <Link href="/contact" className="text-gray-500 hover:text-rose-500 transition-colors">
                            <Mail size={24} />
                        </Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Liens Utiles</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/articles" className="hover:text-rose-500 transition-colors">Nos Collections</Link></li>
                        <li><Link href="/promotions" className="hover:text-rose-500 transition-colors">Promotions</Link></li>
                        <li><Link href="/about" className="hover:text-rose-500 transition-colors">À propos</Link></li>
                        <li><Link href="/contact" className="hover:text-rose-500 transition-colors">Contact</Link></li>
                        <li><Link href="/cgv" className="hover:text-rose-500 transition-colors">Mentions Légales</Link></li>
                        <li><Link href="/rgpd" className="hover:text-rose-500 transition-colors">Politique de Confidentialité</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} className="text-rose-500" />
                            contact@mastouroversize.com
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <MapPin size={16} className="text-rose-500" />
                            Paris, France
                        </li>
                        <li className="mt-4">
                            <Link href="/contact" className="inline-block bg-white border border-rose-200 text-rose-500 px-6 py-2 rounded-full text-sm font-semibold hover:bg-rose-50 transition-colors">
                                Nous écrire
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-rose-100 mt-8 pt-8 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Mastour Oversize. Tous droits réservés.
            </div>
        </footer>
    );
}
