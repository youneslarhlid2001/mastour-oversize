import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Conditions Générales de Vente - Mastour Oversize',
    description: 'Consultez les conditions générales de vente de Mastour Oversize. Informations sur les commandes, livraisons, retours et remboursements.',
};

export default function CGVPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-12">
                    <span className="text-rose-500 uppercase tracking-widest text-xs font-semibold mb-2 block">Mentions légales</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Conditions Générales de Vente</h1>
                    <p className="text-sm text-gray-400">Dernière mise à jour : février 2026</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-10 text-sm leading-relaxed text-gray-600">

                    {/* Article 1 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 1 — Objet</h2>
                        <p>
                            Les présentes Conditions Générales de Vente (CGV) régissent l&apos;ensemble des ventes
                            réalisées par <strong>Mastour Oversize</strong> via son site internet{' '}
                            <strong>mastouroversize.com</strong> et son compte Instagram{' '}
                            <strong>@mastouroversize</strong>.
                        </p>
                        <p className="mt-2">
                            Toute commande passée implique l&apos;acceptation sans réserve des présentes CGV.
                        </p>
                    </section>

                    {/* Article 2 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 2 — Identité du vendeur</h2>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                            <p><strong>Raison sociale :</strong> Mastour Oversize</p>
                            <p><strong>Forme juridique :</strong> [À compléter — ex : Auto-entrepreneur / SARL / SAS]</p>
                            <p><strong>Siège social :</strong> [Adresse à compléter]</p>
                            <p><strong>SIRET :</strong> [N° SIRET à compléter]</p>
                            <p><strong>Email :</strong> contact@mastouroversize.com</p>
                            <p><strong>Instagram :</strong> @mastouroversize</p>
                        </div>
                        <p className="mt-3 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                            ⚠️ Les informations entre crochets doivent être complétées avec vos données légales réelles.
                        </p>
                    </section>

                    {/* Article 3 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 3 — Produits</h2>
                        <p>
                            Les produits proposés à la vente sont des vêtements de mode modeste pour femmes
                            (robes, abayas, ensembles, kimonos). Les photographies illustrant les produits
                            n&apos;ont pas de valeur contractuelle. Bien que tous les efforts soient faits pour
                            reproduire fidèlement les couleurs, de légères variations peuvent exister dues
                            aux réglages d&apos;écran.
                        </p>
                    </section>

                    {/* Article 4 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 4 — Commandes</h2>
                        <p>
                            Les commandes sont passées exclusivement via <strong>Instagram</strong> en envoyant
                            un message direct à <strong>@mastouroversize</strong> avec la référence du produit
                            souhaité et la taille désirée.
                        </p>
                        <p className="mt-2">La commande est considérée comme confirmée après :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Validation de la disponibilité du produit par le vendeur</li>
                            <li>Accord sur le prix, la taille et le mode de livraison</li>
                            <li>Réception du paiement intégral</li>
                        </ul>
                    </section>

                    {/* Article 5 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 5 — Prix</h2>
                        <p>
                            Les prix sont indiqués en euros (€) toutes taxes comprises (TTC). Mastour Oversize
                            se réserve le droit de modifier ses prix à tout moment, les produits étant facturés
                            sur la base des tarifs en vigueur au moment de la validation de la commande.
                        </p>
                    </section>

                    {/* Article 6 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 6 — Paiement</h2>
                        <p>Le paiement s&apos;effectue selon les modalités convenues lors de la commande :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Virement bancaire</li>
                            <li>PayPal</li>
                            <li>Autre moyen convenu par message</li>
                        </ul>
                        <p className="mt-2">
                            Le paiement intégral est exigé avant l&apos;expédition de la commande.
                        </p>
                    </section>

                    {/* Article 7 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 7 — Livraison</h2>
                        <p>
                            La livraison est effectuée à l&apos;adresse indiquée par le client lors de la
                            commande. Les délais de livraison sont indicatifs et estimés à <strong>48 à 72h
                                ouvrées</strong> pour la France métropolitaine.
                        </p>
                        <p className="mt-2">
                            Mastour Oversize ne saurait être tenu responsable des retards de livraison
                            imputables au transporteur ou en cas de force majeure.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-xl mt-3 space-y-1">
                            <p><strong>Frais de livraison :</strong> variables selon le poids et la destination</p>
                            <p><strong>Livraison offerte :</strong> à partir de 80€ d&apos;achat (France métropolitaine)</p>
                        </div>
                    </section>

                    {/* Article 8 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 8 — Droit de rétractation</h2>
                        <p>
                            Conformément à l&apos;article L.221-18 du Code de la consommation, le client
                            dispose d&apos;un délai de <strong>14 jours</strong> à compter de la réception
                            du produit pour exercer son droit de rétractation, sans avoir à justifier de
                            motifs ni à payer de pénalités.
                        </p>
                        <p className="mt-2">
                            Pour exercer ce droit, le client doit notifier sa décision par message Instagram
                            ou par email à contact@mastouroversize.com.
                        </p>
                        <p className="mt-2">Conditions de retour :</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Le produit doit être retourné dans son état d&apos;origine, non porté, non lavé, avec ses étiquettes</li>
                            <li>Les frais de retour sont à la charge du client</li>
                            <li>Le remboursement est effectué dans un délai de 14 jours après réception du retour</li>
                        </ul>
                    </section>

                    {/* Article 9 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 9 — Échanges</h2>
                        <p>
                            Les échanges de taille sont possibles sous les mêmes conditions que le droit de
                            rétractation, dans la limite des stocks disponibles. Contactez-nous sur Instagram
                            pour organiser un échange.
                        </p>
                    </section>

                    {/* Article 10 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 10 — Réclamations</h2>
                        <p>
                            Pour toute réclamation, le client peut nous contacter via Instagram
                            (@mastouroversize) ou par email à contact@mastouroversize.com. Nous nous engageons
                            à répondre dans un délai de 48 heures ouvrées.
                        </p>
                    </section>

                    {/* Article 11 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 11 — Propriété intellectuelle</h2>
                        <p>
                            L&apos;ensemble des contenus du site mastouroversize.com (textes, images, logos,
                            vidéos) est protégé par le droit de la propriété intellectuelle. Toute reproduction
                            ou utilisation sans autorisation préalable est interdite.
                        </p>
                    </section>

                    {/* Article 12 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Article 12 — Droit applicable</h2>
                        <p>
                            Les présentes CGV sont soumises au droit français. En cas de litige, et après
                            tentative de résolution amiable, les tribunaux français seront compétents.
                        </p>
                        <p className="mt-2">
                            Le client peut également recourir à un médiateur de la consommation conformément
                            aux articles L.611-1 et suivants du Code de la consommation.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
