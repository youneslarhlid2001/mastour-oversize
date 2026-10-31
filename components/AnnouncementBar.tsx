// Modifier les messages ici
const announcements = [
    'Livraison offerte dès 80 € en France métropolitaine',
    'Commande simple, par message Instagram',
    'Expédition sous 24 h après paiement',
    'BIENVENUE10 : -10 % sur votre première commande',
    'Retours sous 14 jours',
];

export default function AnnouncementBar() {
    const items = [...announcements, ...announcements, ...announcements, ...announcements];

    return (
        <div className="overflow-hidden bg-wine py-2 text-on-wine">
            <p className="sr-only">{announcements.join('. ')}</p>
            <div className="marquee label" aria-hidden="true">
                {items.map((text, i) => (
                    <span key={i} className="flex items-center whitespace-nowrap">
                        {text}
                        <span className="mx-6 inline-block h-px w-6 border-t border-dashed border-on-wine/60" />
                    </span>
                ))}
            </div>
        </div>
    );
}
