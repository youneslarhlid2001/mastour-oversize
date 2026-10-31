"use client";

import { useState } from 'react';
import { Measures, measuresAreValid, saveMeasures, useMeasures } from '@/lib/fitting';

const FIELDS: { key: keyof Measures; label: string; example: string }[] = [
    { key: 'poitrine', label: 'Poitrine', example: '92' },
    { key: 'taille', label: 'Tour de taille', example: '72' },
    { key: 'hanches', label: 'Hanches', example: '98' },
    { key: 'hauteur', label: 'Hauteur', example: '165' },
];

interface MeasuresCardProps {
    onConfirm: (values: Measures) => void;
    result: React.ReactNode;
}

export default function MeasuresCard({ onConfirm, result }: MeasuresCardProps) {
    const saved = useMeasures();
    const [draft, setDraft] = useState<Measures | null>(null);
    const [invalid, setInvalid] = useState(false);
    const values = draft ?? saved;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!measuresAreValid(values)) {
            setInvalid(true);
            return;
        }
        setInvalid(false);
        saveMeasures(values);
        onConfirm(values);
    };

    return (
        <form id="mesures" onSubmit={submit} className="fit-card scroll-mt-4" noValidate>
            <h2 className="font-sans text-lg font-medium leading-tight">
                Vos mesures <span className="text-sm font-normal text-[var(--fit-soft)]">en cm</span>
            </h2>
            <div className="mt-3 grid gap-x-4 gap-y-2 min-[360px]:grid-cols-2">
                {FIELDS.map((field) => (
                    <label key={field.key} className="flex items-center justify-between gap-2 text-[0.8125rem] font-medium leading-tight">
                        {field.label}
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            value={values[field.key]}
                            placeholder={field.example}
                            onChange={(e) => {
                                setDraft({ ...values, [field.key]: e.target.value.replace(/\D/g, '') });
                                setInvalid(false);
                            }}
                            className="fit-input"
                        />
                    </label>
                ))}
            </div>
            <button type="submit" className="fit-cta mt-3 w-full">Confirmer</button>
            <div className="mt-2 text-[0.8125rem] leading-snug text-[var(--fit-soft)]" aria-live="polite">
                {invalid ? 'Indiquez au moins la poitrine, la taille ou les hanches, avec des valeurs plausibles en centimètres.' : result}
            </div>
        </form>
    );
}
