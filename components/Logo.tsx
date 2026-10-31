// Mot-symbole : composé dans la police de titrage, sans fichier image
export default function Logo({ className = '' }: { className?: string }) {
    return (
        <span className={`inline-flex items-baseline gap-[0.3em] font-display leading-none ${className}`} aria-label="Mastour Oversize">
            <span aria-hidden="true" className="text-[1.5em] tracking-[-0.02em]">Mastour</span>
            <span aria-hidden="true" className="text-[1.05em] italic text-thread">oversize</span>
        </span>
    );
}
