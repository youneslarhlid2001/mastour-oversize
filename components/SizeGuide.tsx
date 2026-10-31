"use client";

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { numberedSizes, sizeTips, standardSizes } from '@/lib/sizes';

interface SizeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    highlight?: string | null;
}

const measures = [
    ['Poitrine', 'au point le plus fort'],
    ['Taille', 'au point le plus fin'],
    ['Hanches', 'au point le plus large'],
    ['Longueur', 'de l’épaule à l’ourlet'],
];

export default function SizeGuide({ isOpen, onClose, highlight }: SizeGuideProps) {
    const [tab, setTab] = useState<'standard' | 'numbered'>(
        highlight && numberedSizes.some((s) => s.size === highlight) ? 'numbered' : 'standard',
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    const rows = tab === 'standard' ? standardSizes : numberedSizes;

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
            aria-labelledby="size-guide-title"
            className="modal m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl"
        >
            <div className="p-6 md:p-8">
                <div className="flex items-start justify-between">
                    <h2 id="size-guide-title" className="text-4xl leading-none">Guide des tailles</h2>
                    <button type="button" onClick={onClose} aria-label="Fermer" className="-mr-2 -mt-2 cursor-pointer p-2">
                        <X size={22} strokeWidth={1.5} />
                    </button>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {measures.map(([name, how]) => (
                        <div key={name}>
                            <dt className="label text-thread">{name}</dt>
                            <dd className="text-ink-soft">{how}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-6 flex gap-6 border-b border-line" role="tablist" aria-label="Type de taille">
                    {[['standard', 'S à XXL'], ['numbered', '52 à 58']].map(([key, name]) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={tab === key}
                            onClick={() => setTab(key as 'standard' | 'numbered')}
                            className={`-mb-px cursor-pointer border-b-2 pb-2 text-sm ${tab === key ? 'border-thread text-thread' : 'border-transparent text-ink-soft'}`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full font-mono text-[0.8125rem]">
                        <caption className="sr-only">Mesures en centimètres</caption>
                        <thead>
                            <tr className="text-left text-ink-soft">
                                {['Taille', 'Poitrine', 'Taille', 'Hanches', 'Long.'].map((h, i) => (
                                    <th key={i} scope="col" className="py-3 pr-4 font-normal">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.size} className={`border-t border-line ${row.size === highlight ? 'bg-paper-deep text-thread' : ''}`}>
                                    <th scope="row" className="py-3 pl-1 pr-4 text-left font-normal">{row.size}</th>
                                    <td className="py-3 pr-4">{row.poitrine}</td>
                                    <td className="py-3 pr-4">{row.taille}</td>
                                    <td className="py-3 pr-4">{row.hanches}</td>
                                    <td className="py-3 pr-1">{row.longueur}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="label mt-2 text-ink-soft">Mesures en centimètres</p>

                <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                    {sizeTips.map((tip) => (
                        <li key={tip} className="flex gap-3">
                            <span className="stitch mt-[0.6em] w-5 shrink-0" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </dialog>
    );
}
