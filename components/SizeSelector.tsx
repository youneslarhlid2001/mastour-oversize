"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Ruler, Check, Copy } from 'lucide-react';
import SizeGuide from './SizeGuide';

interface SizeSelectorProps {
    productName: string;
    productId: string;
    sizes: string[];
    stock?: Record<string, number>;
}

export default function SizeSelector({ productName, productId, sizes, stock }: SizeSelectorProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

    const instagramUrl = 'https://instagram.com/mastouroversize';

    // Build dynamic Instagram message
    const buildMessage = () => {
        const sizePart = selectedSize ? `en taille ${selectedSize}` : '(taille à préciser)';
        return `Bonjour, je souhaite commander le produit "${productName}" (Réf: ${productId}) ${sizePart}. Est-il disponible ? Merci !`;
    };

    const handleCopyMessage = async () => {
        const msg = buildMessage();
        try {
            await navigator.clipboard.writeText(msg);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = msg;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <>
            {/* Size Selection */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Ruler size={18} /> Tailles disponibles
                    </h3>
                    <div className="flex items-center gap-3">
                        {selectedSize && (
                            <span className="text-sm font-normal text-rose-main">
                                Sélectionnée : <strong>{selectedSize}</strong>
                            </span>
                        )}
                        <button
                            onClick={() => setSizeGuideOpen(true)}
                            className="text-xs text-gray-400 hover:text-rose-main underline underline-offset-2 transition-colors"
                        >
                            📏 Guide des tailles
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {sizes.map(size => {
                        const stockCount = stock?.[size];
                        const isLowStock = stockCount !== undefined && stockCount > 0 && stockCount <= 4;
                        const isOutOfStock = stockCount !== undefined && stockCount === 0;
                        const isSelected = selectedSize === size;

                        return (
                            <div key={size} className="flex flex-col items-center gap-1">
                                <button
                                    disabled={isOutOfStock}
                                    onClick={() => setSelectedSize(isSelected ? null : size)}
                                    className={`px-4 py-2 border rounded-lg font-medium min-w-[3rem] text-center transition-all duration-200 ${isOutOfStock
                                        ? 'border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through'
                                        : isSelected
                                            ? 'border-rose-main bg-rose-main text-white shadow-md scale-105'
                                            : 'border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600 cursor-pointer bg-white'
                                        }`}
                                >
                                    {size}
                                </button>
                                {isLowStock && !isSelected && (
                                    <span className="text-[10px] text-amber-600 font-medium">
                                        Plus que {stockCount}
                                    </span>
                                )}
                                {isOutOfStock && (
                                    <span className="text-[10px] text-red-400 font-medium">
                                        Épuisé
                                    </span>
                                )}
                                {isSelected && isLowStock && (
                                    <span className="text-[10px] text-amber-600 font-medium">
                                        Plus que {stockCount}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Prompt to select size */}
                {!selectedSize && (
                    <p className="text-xs text-gray-400 mt-3 italic">
                        ↑ Sélectionnez votre taille pour préparer votre commande
                    </p>
                )}
            </div>

            {/* Order CTA */}
            <div className="mt-auto bg-rose-50 p-6 rounded-2xl border border-rose-100">
                <h3 className="font-bold text-rose-800 mb-2">Comment commander ?</h3>
                <p className="text-sm text-gray-600 mb-4">
                    {selectedSize
                        ? `Votre taille ${selectedSize} est prête. Copiez le message ci-dessous et envoyez-le nous sur Instagram !`
                        : 'Sélectionnez votre taille, puis copiez le message et envoyez-le nous sur Instagram.'
                    }
                </p>

                {/* Pre-filled message preview */}
                <div className="bg-white border border-rose-100 rounded-xl p-4 mb-4 relative group">
                    <p className="text-sm text-gray-700 leading-relaxed pr-8">
                        {buildMessage()}
                    </p>
                    <button
                        onClick={handleCopyMessage}
                        className={`absolute top-3 right-3 p-2 rounded-lg transition-all ${copied
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                            }`}
                        title="Copier le message"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    {copied && (
                        <span className="absolute -top-8 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-full animate-fade-in shadow-md">
                            Message copié !
                        </span>
                    )}
                </div>

                <Link
                    href={instagramUrl}
                    target="_blank"
                    className={`w-full font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg ${selectedSize
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed hover:translate-y-0 hover:shadow-lg'
                        }`}
                    onClick={(e) => {
                        if (!selectedSize) {
                            e.preventDefault();
                        }
                    }}
                >
                    <Instagram size={24} />
                    {selectedSize ? 'Commander sur Instagram' : 'Choisissez une taille'}
                </Link>

                <div className="mt-3 text-center">
                    <span className="text-xs text-gray-400">Réf: {productId} (à mentionner)</span>
                </div>
            </div>

            {/* Size Guide Modal */}
            <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
        </>
    );
}
