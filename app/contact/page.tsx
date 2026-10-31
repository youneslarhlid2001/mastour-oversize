import { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import PageIntro from '@/components/PageIntro';
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Une question sur une pièce, une taille ou une commande ? Écrivez-nous sur Instagram ou par email.',
    alternates: { canonical: '/contact' },
};

export default function ContactPage() {
    return (
        <>
            <PageIntro eyebrow="Contact" title={<>Parlons <em className="text-thread">tissu.</em></>}>
                <p>Une question sur une pièce, une taille ou une commande ? Nous sommes à votre écoute.</p>
            </PageIntro>

            <section className="page-x grid gap-12 pb-20 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start justify-between gap-4 border-t border-ink py-5"
                    >
                        <span>
                            <span className="label block text-ink-soft">Le plus rapide : réponse sous 24 h</span>
                            <span className="mt-1 block font-display text-3xl transition-colors group-hover:text-thread md:text-4xl">@{INSTAGRAM_HANDLE}</span>
                        </span>
                        <ArrowUpRight size={22} strokeWidth={1.5} className="mt-1 shrink-0" />
                    </a>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-start justify-between gap-4 border-t border-line py-5">
                        <span>
                            <span className="label block text-ink-soft">Email</span>
                            <span className="mt-1 block break-all font-display text-2xl transition-colors group-hover:text-thread md:text-3xl">{CONTACT_EMAIL}</span>
                        </span>
                        <ArrowUpRight size={22} strokeWidth={1.5} className="mt-1 shrink-0" />
                    </a>
                    <div className="grid grid-cols-2 gap-6 border-y border-line py-5">
                        <div>
                            <span className="label block text-ink-soft">Siège</span>
                            <span className="mt-1 block">Paris, France</span>
                        </div>
                        <div>
                            <span className="label block text-ink-soft">Service client</span>
                            <span className="mt-1 block">Lundi au vendredi, 9 h à 18 h</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                    <ContactForm />
                </div>
            </section>
        </>
    );
}
