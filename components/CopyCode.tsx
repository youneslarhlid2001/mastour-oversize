"use client";

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { copyText } from '@/lib/selection';

export default function CopyCode({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await copyText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copier le code ${code}`}
            className="flex cursor-pointer items-center gap-3 border border-dashed border-current px-4 py-3 font-mono text-lg tracking-wider transition-colors hover:text-thread"
        >
            {code}
            {copied ? <Check size={16} /> : <Copy size={16} strokeWidth={1.5} />}
            <span className="sr-only" aria-live="polite">{copied ? 'Code copié' : ''}</span>
        </button>
    );
}
