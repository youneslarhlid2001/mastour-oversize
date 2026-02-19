"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionTitle from '@/components/SectionTitle';

const contactSchema = z.object({
    name: z
        .string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
    email: z
        .string()
        .min(1, 'L\'email est requis')
        .email('Format d\'email invalide (ex: nom@domaine.com)'),
    phone: z
        .string()
        .optional()
        .refine(
            (val) => !val || /^[\d\s+\-().]{8,20}$/.test(val),
            'Numéro de téléphone invalide'
        ),
    message: z
        .string()
        .min(10, 'Le message doit contenir au moins 10 caractères')
        .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
    consent: z
        .boolean()
        .refine((val) => val === true, 'Vous devez accepter le traitement de vos données'),
    _gotcha: z.string().max(0).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500 animate-fade-in">
            <AlertCircle size={12} />
            {message}
        </p>
    );
}

export default function ContactPage() {
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, touchedFields },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: 'onTouched',     // validate on blur, then on change
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
            consent: false,
            _gotcha: '',
        },
    });

    const messageValue = watch('message');
    const messageLength = messageValue?.length || 0;

    const onSubmit = async (data: ContactFormData) => {
        if (data._gotcha) return; // Spam

        // Simulate sending
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setSuccess(true);
        reset();
    };

    const inputClass = (fieldName: keyof ContactFormData) =>
        `w-full px-4 py-3 rounded-xl bg-gray-50 border transition-all outline-none ${errors[fieldName]
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : touchedFields[fieldName] && !errors[fieldName]
                ? 'border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                : 'border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
        }`;

    return (
        <div className="bg-white min-h-screen py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50 -z-10 skew-x-12 translate-x-1/4"></div>

            <div className="container mx-auto px-4 max-w-6xl">
                <SectionTitle title="Contactez-nous" subtitle="Nous sommes à votre écoute pour toute question." />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Info Side */}
                    <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-12 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-8 font-display">Informations</h3>
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold opacity-80 mb-1">Email</h4>
                                        <p className="text-lg">contact@mastouroversize.com</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold opacity-80 mb-1">Instagram</h4>
                                        <p className="text-lg">@mastouroversize</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold opacity-80 mb-1">Siège</h4>
                                        <p className="text-lg">Paris, France</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12 opacity-80 text-sm">
                            <p>Horaires du service client :</p>
                            <p>Lundi - Vendredi : 09h - 18h</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-12">
                        {success ? (
                            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in text-green-600">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <Send size={40} className="text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                                <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-8 text-rose-500 underline hover:text-rose-700"
                                >
                                    Envoyer un autre message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom Complet <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name')}
                                        className={inputClass('name')}
                                        placeholder="Votre nom"
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            {...register('email')}
                                            className={inputClass('email')}
                                            placeholder="votre@email.com"
                                        />
                                        <FieldError message={errors.email?.message} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone <span className="text-gray-400 font-normal">(optionnel)</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            {...register('phone')}
                                            className={inputClass('phone')}
                                            placeholder="06 12 34 56 78"
                                        />
                                        <FieldError message={errors.phone?.message} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                            Message <span className="text-red-400">*</span>
                                        </label>
                                        <span className={`text-xs ${messageLength > 0 && messageLength < 10
                                                ? 'text-red-400'
                                                : messageLength >= 10
                                                    ? 'text-green-500'
                                                    : 'text-gray-400'
                                            }`}>
                                            {messageLength}/2000
                                        </span>
                                    </div>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        {...register('message')}
                                        className={`${inputClass('message')} resize-none`}
                                        placeholder="Comment pouvons-nous vous aider ? (min. 10 caractères)"
                                    ></textarea>
                                    <FieldError message={errors.message?.message} />
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <div className="flex items-center h-5 mt-0.5">
                                        <input
                                            id="consent"
                                            type="checkbox"
                                            {...register('consent')}
                                            className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-gray-300 rounded cursor-pointer"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <label htmlFor="consent" className="text-sm font-medium text-gray-700 cursor-pointer">
                                            J&apos;accepte que mes données soient utilisées pour me recontacter.
                                            <span className="text-red-400"> *</span>
                                        </label>
                                        <p className="text-gray-500 text-xs mt-1">Vos données sont protégées selon notre politique RGPD.</p>
                                        <FieldError message={errors.consent?.message} />
                                    </div>
                                </div>

                                {/* Honeypot field */}
                                <input
                                    type="text"
                                    {...register('_gotcha')}
                                    style={{ position: 'absolute', opacity: 0, zIndex: -10 }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Envoi en cours...</span>
                                    ) : (
                                        <>Envoyer le message <Send size={18} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
