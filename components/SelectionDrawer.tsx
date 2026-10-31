"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Instagram, X } from 'lucide-react';
import Garment from '@/components/Garment';
import { backdropFor } from '@/lib/colors';
import { currentPrice, formatPrice, products } from '@/lib/catalog';
import {
    buildOrderMessage,
    copyText,
    removeFromSelection,
    selectionTotal,
    setSelectionOpen,
    useSelection,
} from '@/lib/selection';
import { sizeLabel } from '@/lib/sizes';
import { FREE_SHIPPING_FROM, INSTAGRAM_DM_URL } from '@/lib/site';

export default function SelectionDrawer() {
    const { items, open } = useSelection();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const total = selectionTotal(items);
    const remaining = FREE_SHIPPING_FROM - total;
    const message = items.length > 0 ? buildOrderMessage(items) : '';

    const copy = async () => {
        await copyText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={() => setSelectionOpen(false)}
            onClick={(e) => { if (e.target === dialogRef.current) setSelectionOpen(false); }}
            aria-labelledby="selection-title"
            className="drawer m-0 ml-auto h-dvh max-h-none w-full max-w-md"
        >
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h2 id="selection-title" className="text-3xl leading-none">Ma sélection</h2>
                    <button type="button" onClick={() => setSelectionOpen(false)} aria-label="Fermer" className="-mr-2 cursor-pointer p-2">
                        <X size={22} strokeWidth={1.5} />
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                        <p className="text-ink-soft">Votre sélection est vide. Ajoutez une pièce pour préparer votre message de commande.</p>
                        <Link href="/articles" onClick={() => setSelectionOpen(false)} className="btn">Voir la collection</Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                            {items.map((item, index) => {
                                const product = products.find((p) => p.id === item.productId);
                                if (!product) return null;
                                return (
                                    <li key={`${item.productId}-${index}`} className="flex gap-4 py-4">
                                        <div className="grain relative h-24 w-[4.5rem] shrink-0 overflow-hidden" style={{ background: backdropFor(item.color) }}>
                                            <Garment productId={product.id} category={product.category} color={item.color} className="absolute inset-0 h-full w-full" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-display text-lg leading-tight">{product.name}</p>
                                            <p className="mt-1 text-sm text-ink-soft">
                                                {[item.color, sizeLabel(item.size)].filter(Boolean).join(' · ')}
                                            </p>
                                            <p className="mt-1 font-mono text-[0.8125rem]">{formatPrice(currentPrice(product))}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeFromSelection(index)}
                                            aria-label={`Retirer ${product.name}`}
                                            className="-mr-2 h-fit cursor-pointer p-2 text-ink-soft transition-colors hover:text-thread"
                                        >
                                            <X size={16} strokeWidth={1.5} />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="space-y-4 border-t border-line bg-paper-deep px-5 py-5">
                            <div className="flex items-baseline justify-between">
                                <span className="text-sm">Total hors livraison</span>
                                <span className="font-mono">{formatPrice(total)}</span>
                            </div>
                            <p className="text-sm text-ink-soft">
                                {remaining > 0
                                    ? `Encore ${formatPrice(remaining)} pour la livraison offerte en France métropolitaine.`
                                    : 'Livraison offerte en France métropolitaine.'}
                            </p>
                            <a
                                href={INSTAGRAM_DM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={copy}
                                className="btn w-full"
                            >
                                <Instagram size={18} strokeWidth={1.5} /> Commander sur Instagram
                            </a>
                            <button type="button" onClick={copy} className="label flex w-full cursor-pointer items-center justify-center gap-2 py-1 transition-colors hover:text-thread">
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Message copié' : 'Copier le message'}
                            </button>
                            <p className="text-center text-xs text-ink-soft" aria-live="polite">
                                {copied
                                    ? 'Il ne reste qu’à le coller dans la conversation Instagram.'
                                    : 'Le message est copié au clic : collez-le dans la conversation.'}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </dialog>
    );
}
