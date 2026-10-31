import { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import PageIntro from '@/components/PageIntro';
import { INSTAGRAM_DM_URL } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Questions fréquentes',
    description: 'Retrouvez les réponses à vos questions sur les commandes, la livraison, les retours, les tailles et le paiement chez Mastour Oversize.',
};

const faqCategories = [
    {
        title: 'Commander',
        questions: [
            {
                question: 'Comment passer une commande ?',
                answer: 'Les commandes se font exclusivement via Instagram. Rendez-vous sur la fiche produit qui vous intéresse, sélectionnez votre taille, puis cliquez sur « Commander ». Le message avec la référence, le coloris et la taille est copié : collez-le dans la conversation Instagram qui s’ouvre. Vous pouvez aussi nous contacter directement sur @mastouroversize.',
            },
            {
                question: 'Puis-je commander plusieurs articles à la fois ?',
                answer: 'Bien sûr ! Ajoutez vos pièces à « Ma sélection » : un seul message regroupe les références et tailles de tous les articles souhaités. Nous calculerons le total et les frais de livraison en conséquence.',
            },
            {
                question: 'Est-ce que je peux réserver un article ?',
                answer: 'Nous ne proposons pas de système de réservation. Les articles sont disponibles tant qu\'ils sont en stock. Nous vous conseillons de commander rapidement si un produit vous plaît, surtout si le stock est limité.',
            },
            {
                question: 'Comment savoir si un article est disponible ?',
                answer: 'La disponibilité est indiquée sur chaque fiche produit avec le stock par taille. Les tailles épuisées sont grisées et marquées « Épuisé ». Pour une confirmation en temps réel, n\'hésitez pas à nous écrire sur Instagram.',
            },
        ],
    },
    {
        title: 'Livraison',
        questions: [
            {
                question: 'Quels sont les délais de livraison ?',
                answer: 'La livraison est estimée à 48-72h ouvrées pour la France métropolitaine après expédition. L\'expédition est généralement effectuée sous 24h après confirmation du paiement.',
            },
            {
                question: 'Quels sont les frais de livraison ?',
                answer: 'Les frais de livraison varient selon le poids et la destination. La livraison est offerte à partir de 80€ d\'achat pour la France métropolitaine. Les tarifs exacts vous seront communiqués lors de la commande.',
            },
            {
                question: 'Livrez-vous en dehors de la France ?',
                answer: 'Oui, nous livrons dans toute l\'Europe et dans certains pays hors UE. Les frais et délais varient selon la destination. Contactez-nous sur Instagram pour un devis personnalisé.',
            },
            {
                question: 'Comment suivre ma commande ?',
                answer: 'Un numéro de suivi vous sera communiqué par message Instagram dès l\'expédition de votre colis. Vous pourrez suivre votre livraison en temps réel via le site du transporteur.',
            },
        ],
    },
    {
        title: 'Tailles & Guide',
        questions: [
            {
                question: 'Comment choisir ma taille ?',
                answer: 'Un guide des tailles est disponible sur chaque fiche produit (lien « Guide des tailles »). Il contient un tableau de mesures détaillé (poitrine, taille, hanches, longueur) et des conseils pour bien vous mesurer.',
            },
            {
                question: 'Que signifie « Taille unique » ?',
                answer: 'Les articles en taille unique sont conçus avec une coupe ample qui convient généralement du S au XL. C\'est l\'avantage de la coupe oversize : elle s\'adapte à de nombreuses morphologies.',
            },
            {
                question: 'Je suis entre deux tailles, que faire ?',
                answer: 'En cas de doute, nous recommandons de prendre la taille au-dessus pour un confort oversize optimal. N\'hésitez pas à nous envoyer vos mensurations sur Instagram, nous vous conseillerons personnellement.',
            },
            {
                question: 'Les tailles sont-elles fidèles ?',
                answer: 'Nos articles suivent un tableau de tailles standard. Cependant, la coupe oversize fait que les vêtements sont volontairement plus amples qu\'un vêtement classique. Référez-vous toujours au guide des tailles pour chaque produit.',
            },
        ],
    },
    {
        title: 'Retours & Échanges',
        questions: [
            {
                question: 'Puis-je retourner un article ?',
                answer: 'Oui, conformément à la loi, vous disposez d\'un délai de 14 jours après réception pour exercer votre droit de rétractation. L\'article doit être retourné dans son état d\'origine : non porté, non lavé, avec ses étiquettes.',
            },
            {
                question: 'Un échange de taille est-il possible ?',
                answer: 'Oui, les échanges de taille sont possibles dans la limite des stocks disponibles. Contactez-nous sur Instagram dans les 14 jours suivant la réception pour organiser l\'échange.',
            },
            {
                question: 'Qui prend en charge les frais de retour ?',
                answer: 'Les frais de retour sont à la charge du client. Nous vous recommandons d\'utiliser un envoi suivi pour garantir que le colis nous parvienne.',
            },
            {
                question: 'Quand serai-je remboursé(e) ?',
                answer: 'Le remboursement est effectué dans un délai de 14 jours après réception et vérification de l\'article retourné, via le même moyen de paiement utilisé lors de la commande.',
            },
        ],
    },
    {
        title: 'Paiement',
        questions: [
            {
                question: 'Quels modes de paiement acceptez-vous ?',
                answer: 'Nous acceptons le virement bancaire et PayPal. D\'autres modalités peuvent être convenues par message. Le paiement intégral est requis avant l\'expédition.',
            },
            {
                question: 'Le paiement est-il sécurisé ?',
                answer: 'Oui, notre site est en HTTPS et les paiements passent par des plateformes sécurisées (PayPal, virements bancaires). Nous ne stockons aucune donnée bancaire.',
            },
            {
                question: 'Proposez-vous le paiement en plusieurs fois ?',
                answer: 'Pour le moment, nous ne proposons pas le paiement en plusieurs fois. Le règlement se fait en une seule fois avant l\'expédition.',
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <>
            <PageIntro eyebrow="Aide" title={<>Questions <em className="text-thread">fréquentes</em></>} />

            <div className="page-x grid gap-12 pb-20 lg:grid-cols-12">
                <div className="space-y-12 lg:col-span-8">
                    {faqCategories.map((category) => (
                        <section key={category.title}>
                            <h2 className="mb-4 text-3xl md:text-4xl">{category.title}</h2>
                            <FAQAccordion questions={category.questions} />
                        </section>
                    ))}
                </div>

                <aside className="lg:col-span-3 lg:col-start-10">
                    <div className="bg-wine p-6 text-on-wine lg:sticky lg:top-24">
                        <p className="font-display text-2xl leading-tight">Pas trouvé votre réponse ?</p>
                        <p className="mt-3 text-sm opacity-90">Notre équipe vous répond en moins de 24 h sur Instagram.</p>
                        <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-5 w-full">
                            Nous écrire
                        </a>
                    </div>
                </aside>
            </div>
        </>
    );
}
