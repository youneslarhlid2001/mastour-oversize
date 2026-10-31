"use client";

import { FormEvent, useState } from 'react';
import { Mail } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/site';

const subjects = ['Une commande', 'Une taille ou une pièce', 'Livraison ou retour', 'Autre chose'];

const fieldClass = 'mt-2 w-full border-0 border-b border-ink bg-transparent py-2 text-lg outline-none transition-colors focus:border-thread focus-visible:outline-none';

// Pas de backend : le message s'ouvre dans la messagerie de la cliente.
export default function ContactForm() {
    const [mailto, setMailto] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const subject = `${data.get('subject')} - ${data.get('name')}`;
        const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(String(data.get('message')))}`;
        setMailto(url);
        window.location.href = url;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <h2 className="text-4xl leading-none md:text-5xl">Écrire un message</h2>

            <div>
                <label htmlFor="name" className="label">Votre nom</label>
                <input id="name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} />
            </div>

            <div>
                <label htmlFor="subject" className="label">Sujet</label>
                <select id="subject" name="subject" className={`${fieldClass} cursor-pointer`}>
                    {subjects.map((s) => <option key={s} value={s} className="bg-paper text-ink">{s}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="message" className="label">Message</label>
                <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} className={`${fieldClass} resize-y`} />
            </div>

            <button type="submit" className="btn w-full sm:w-auto">
                <Mail size={18} strokeWidth={1.5} /> Préparer l’email
            </button>

            <p className="text-sm text-ink-soft" aria-live="polite">
                {mailto ? (
                    <>
                        Votre messagerie vient de s’ouvrir avec le message prêt à envoyer. Rien ne s’est passé&nbsp;?{' '}
                        <a href={mailto} className="stitch-link text-ink">Réessayer</a> ou écrivez-nous à {CONTACT_EMAIL}.
                    </>
                ) : (
                    'Le message s’ouvre dans votre messagerie : il part une fois que vous l’envoyez.'
                )}
            </p>
        </form>
    );
}
