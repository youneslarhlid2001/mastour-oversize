"use client";

import { useState, useEffect } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

const standardSizes = [
    { size: 'S', poitrine: '86-90', taille: '66-70', hanches: '92-96', longueur: '135' },
    { size: 'M', poitrine: '90-94', taille: '70-74', hanches: '96-100', longueur: '137' },
    { size: 'L', poitrine: '94-98', taille: '74-78', hanches: '100-104', longueur: '139' },
    { size: 'XL', poitrine: '98-102', taille: '78-82', hanches: '104-108', longueur: '141' },
    { size: 'XXL', poitrine: '102-106', taille: '82-86', hanches: '108-112', longueur: '143' },
];

const numberedSizes = [
    { size: '52', poitrine: '92-96', taille: '72-76', hanches: '98-102', longueur: '137' },
    { size: '54', poitrine: '96-100', taille: '76-80', hanches: '102-106', longueur: '139' },
    { size: '56', poitrine: '100-104', taille: '80-84', hanches: '106-110', longueur: '141' },
    { size: '58', poitrine: '104-108', taille: '84-88', hanches: '110-114', longueur: '143' },
];

const tips = [
    'Mesurez-vous en sous-vêtements pour plus de précision.',
    'En cas de doute entre deux tailles, prenez la taille au-dessus pour un confort oversize.',
    'La mention « One Size » convient généralement du S au XL grâce à la coupe ample.',
    'Les mesures sont indicatives et peuvent varier légèrement selon les modèles.',
];

export default function SizeGuide({ isOpen, onClose }: SizeGuideProps) {
    const [activeTab, setActiveTab] = useState<'standard' | 'numbered'>('standard');

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const currentSizes = activeTab === 'standard' ? standardSizes : numberedSizes;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-2">
                        <Ruler size={20} className="text-rose-main" />
                        <h2 className="text-lg font-bold text-gray-900">Guide des tailles</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="px-6 py-5 space-y-6">
                    {/* How to measure */}
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-rose-800 mb-2">📏 Comment se mesurer ?</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-start gap-2">
                                <span className="text-rose-main font-bold text-xs mt-0.5">1</span>
                                <p className="text-xs text-gray-600"><strong>Poitrine</strong> : tour de poitrine au point le plus fort</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-rose-main font-bold text-xs mt-0.5">2</span>
                                <p className="text-xs text-gray-600"><strong>Taille</strong> : tour de taille au point le plus fin</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-rose-main font-bold text-xs mt-0.5">3</span>
                                <p className="text-xs text-gray-600"><strong>Hanches</strong> : tour de hanches au point le plus large</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-rose-main font-bold text-xs mt-0.5">4</span>
                                <p className="text-xs text-gray-600"><strong>Longueur</strong> : de l&#39;épaule à l&#39;ourlet</p>
                            </div>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('standard')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'standard'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Tailles S - XXL
                        </button>
                        <button
                            onClick={() => setActiveTab('numbered')}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'numbered'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Tailles 52 - 58
                        </button>
                    </div>

                    {/* Size Table */}
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Taille</th>
                                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Poitrine</th>
                                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Taille</th>
                                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hanches</th>
                                    <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Long.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSizes.map((row, idx) => (
                                    <tr
                                        key={row.size}
                                        className={`border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-rose-50/40 transition-colors`}
                                    >
                                        <td className="px-4 py-3 font-bold text-gray-900">{row.size}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{row.poitrine}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{row.taille}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{row.hanches}</td>
                                        <td className="px-4 py-3 text-center text-gray-600">{row.longueur}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider">
                        Mesures en centimètres (cm)
                    </p>

                    {/* Tips */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">💡 Nos conseils</h3>
                        <ul className="space-y-1.5">
                            {tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                                    <span className="text-rose-main mt-0.5">•</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
