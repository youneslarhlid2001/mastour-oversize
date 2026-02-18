"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
        _gotcha: '' // Honeypot
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.consent) return;
        if (formData._gotcha) return; // Spam detected
        setLoading(true);

        // Simulate sending
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '', consent: false, _gotcha: '' });
        }, 1500);
    };

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
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom Complet</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
                                        placeholder="Votre nom"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none"
                                            placeholder="06 12 34 56 78"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all outline-none resize-none"
                                        placeholder="Comment pouvons-nous vous aider ?"
                                    ></textarea>
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="consent"
                                            name="consent"
                                            type="checkbox"
                                            required
                                            checked={formData.consent}
                                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                            className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-gray-300 rounded cursor-pointer"
                                        />
                                    </div>
                                    <div className="ml-2 text-sm">
                                        <label htmlFor="consent" className="font-medium text-gray-700 cursor-pointer">
                                            J'accepte que mes données soient utilisées pour me recontacter.
                                        </label>
                                        <p className="text-gray-500 text-xs mt-1">Vos données sont protégées selon notre politique RGPD.</p>
                                    </div>
                                </div>

                                {/* Honeypot field */}
                                <input
                                    type="text"
                                    name="_gotcha"
                                    value={formData._gotcha}
                                    onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                                    style={{ position: 'absolute', opacity: 0, zIndex: -10 }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
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
