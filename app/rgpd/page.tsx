import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité & RGPD - Mastour Oversize',
    description: 'Politique de confidentialité et protection des données personnelles de Mastour Oversize, conformément au RGPD.',
};

export default function RGPDPage() {
    return (
        <div className="bg-white min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="mb-12">
                    <span className="text-rose-500 uppercase tracking-widest text-xs font-semibold mb-2 block">Protection des données</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Politique de Confidentialité</h1>
                    <p className="text-sm text-gray-400">Dernière mise à jour : février 2026 — Conforme au RGPD (UE 2016/679)</p>
                </div>

                <div className="prose prose-gray max-w-none space-y-10 text-sm leading-relaxed text-gray-600">

                    {/* Introduction */}
                    <section>
                        <p>
                            <strong>Mastour Oversize</strong> accorde une importance majeure à la protection
                            de vos données personnelles. La présente politique de confidentialité vous informe
                            sur la manière dont vos données sont collectées, traitées et protégées conformément
                            au Règlement Général sur la Protection des Données (RGPD).
                        </p>
                    </section>

                    {/* Article 1 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">1. Responsable du traitement</h2>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                            <p><strong>Responsable :</strong> Mastour Oversize</p>
                            <p><strong>Adresse :</strong> [Adresse à compléter]</p>
                            <p><strong>Email :</strong> contact@mastouroversize.com</p>
                            <p><strong>Instagram :</strong> @mastouroversize</p>
                        </div>
                        <p className="mt-3 text-xs text-amber-600 bg-amber-50 p-3 rounded-lg">
                            ⚠️ Les informations entre crochets doivent être complétées avec vos données réelles.
                        </p>
                    </section>

                    {/* Article 2 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">2. Données collectées</h2>
                        <p>Nous pouvons collecter les données suivantes :</p>

                        <div className="mt-4 space-y-3">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Via le formulaire de contact</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Nom et prénom</li>
                                    <li>Adresse email</li>
                                    <li>Contenu du message</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Via les commandes Instagram</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Nom et prénom</li>
                                    <li>Adresse de livraison</li>
                                    <li>Numéro de téléphone</li>
                                    <li>Identifiant Instagram</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Données de navigation (si analytics activé)</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Adresse IP (anonymisée)</li>
                                    <li>Type de navigateur et appareil</li>
                                    <li>Pages visitées et durée</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Article 3 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">3. Finalités du traitement</h2>
                        <p>Vos données sont traitées pour les finalités suivantes :</p>

                        <div className="overflow-x-auto mt-4 rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Finalité</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Base légale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3">Traitement des commandes</td>
                                        <td className="px-4 py-3 text-gray-500">Exécution contractuelle</td>
                                    </tr>
                                    <tr className="border-t border-gray-100 bg-gray-50/50">
                                        <td className="px-4 py-3">Réponse aux demandes de contact</td>
                                        <td className="px-4 py-3 text-gray-500">Intérêt légitime</td>
                                    </tr>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3">Livraison des produits</td>
                                        <td className="px-4 py-3 text-gray-500">Exécution contractuelle</td>
                                    </tr>
                                    <tr className="border-t border-gray-100 bg-gray-50/50">
                                        <td className="px-4 py-3">Amélioration du site</td>
                                        <td className="px-4 py-3 text-gray-500">Consentement (cookies)</td>
                                    </tr>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3">Obligations légales et comptables</td>
                                        <td className="px-4 py-3 text-gray-500">Obligation légale</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Article 4 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">4. Durée de conservation</h2>
                        <div className="overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type de données</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Durée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3">Données clients (commandes)</td>
                                        <td className="px-4 py-3 text-gray-500">5 ans (obligation comptable)</td>
                                    </tr>
                                    <tr className="border-t border-gray-100 bg-gray-50/50">
                                        <td className="px-4 py-3">Formulaire de contact</td>
                                        <td className="px-4 py-3 text-gray-500">12 mois après le dernier échange</td>
                                    </tr>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3">Données de navigation</td>
                                        <td className="px-4 py-3 text-gray-500">13 mois maximum</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Article 5 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">5. Vos droits</h2>
                        <p>
                            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {[
                                { icon: '👁', title: 'Droit d\'accès', desc: 'Obtenir une copie de vos données' },
                                { icon: '✏️', title: 'Droit de rectification', desc: 'Corriger des données inexactes' },
                                { icon: '🗑', title: 'Droit à l\'effacement', desc: 'Demander la suppression de vos données' },
                                { icon: '⏸', title: 'Droit à la limitation', desc: 'Limiter le traitement de vos données' },
                                { icon: '📦', title: 'Droit à la portabilité', desc: 'Recevoir vos données dans un format standard' },
                                { icon: '🚫', title: 'Droit d\'opposition', desc: 'Vous opposer au traitement de vos données' },
                            ].map((right) => (
                                <div key={right.title} className="bg-gray-50 p-3 rounded-xl flex items-start gap-3">
                                    <span className="text-lg">{right.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-xs">{right.title}</p>
                                        <p className="text-xs text-gray-500">{right.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="mt-4">
                            Pour exercer vos droits, contactez-nous à{' '}
                            <strong>contact@mastouroversize.com</strong> ou via Instagram. Nous répondrons
                            dans un délai maximum de <strong>30 jours</strong>.
                        </p>
                    </section>

                    {/* Article 6 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h2>
                        <p>
                            Le site mastouroversize.com peut utiliser des cookies pour améliorer votre
                            expérience de navigation. Les cookies sont de petits fichiers stockés sur votre
                            appareil.
                        </p>

                        <div className="overflow-x-auto mt-4 rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Finalité</th>
                                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Consentement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3 font-medium">Essentiels</td>
                                        <td className="px-4 py-3 text-gray-500">Fonctionnement du site</td>
                                        <td className="px-4 py-3 text-green-600 font-medium">Non requis</td>
                                    </tr>
                                    <tr className="border-t border-gray-100 bg-gray-50/50">
                                        <td className="px-4 py-3 font-medium">Analytiques</td>
                                        <td className="px-4 py-3 text-gray-500">Mesure d&apos;audience</td>
                                        <td className="px-4 py-3 text-amber-600 font-medium">Requis</td>
                                    </tr>
                                    <tr className="border-t border-gray-100">
                                        <td className="px-4 py-3 font-medium">Marketing</td>
                                        <td className="px-4 py-3 text-gray-500">Publicité ciblée</td>
                                        <td className="px-4 py-3 text-amber-600 font-medium">Requis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3">
                            Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres
                            de votre navigateur.
                        </p>
                    </section>

                    {/* Article 7 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">7. Partage des données</h2>
                        <p>
                            Vos données ne sont <strong>jamais vendues</strong> à des tiers. Elles peuvent
                            être partagées uniquement avec :
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Transporteurs</strong> : pour assurer la livraison de vos commandes</li>
                            <li><strong>Prestataires de paiement</strong> : pour le traitement sécurisé des paiements</li>
                            <li><strong>Hébergeur du site</strong> : Vercel Inc., pour l&apos;hébergement du site web</li>
                        </ul>
                    </section>

                    {/* Article 8 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">8. Sécurité des données</h2>
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                            protéger vos données contre tout accès non autorisé, modification, divulgation ou
                            destruction. Le site utilise le protocole <strong>HTTPS</strong> pour sécuriser
                            les échanges de données.
                        </p>
                    </section>

                    {/* Article 9 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">9. Transfert hors UE</h2>
                        <p>
                            Dans le cadre de l&apos;hébergement du site (Vercel), certaines données peuvent
                            être traitées en dehors de l&apos;Union Européenne. Dans ce cas, des garanties
                            appropriées sont mises en place (clauses contractuelles types approuvées par la
                            Commission Européenne).
                        </p>
                    </section>

                    {/* Article 10 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">10. Réclamation</h2>
                        <p>
                            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
                            réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de
                            l&apos;Informatique et des Libertés) :
                        </p>
                        <div className="bg-gray-50 p-4 rounded-xl mt-3 space-y-1">
                            <p><strong>CNIL</strong></p>
                            <p>3 Place de Fontenoy, TSA 80715</p>
                            <p>75334 Paris Cedex 07</p>
                            <p>Site : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-rose-500 underline">www.cnil.fr</a></p>
                        </div>
                    </section>

                    {/* Article 11 */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">11. Modification de la politique</h2>
                        <p>
                            Nous nous réservons le droit de modifier la présente politique de confidentialité
                            à tout moment. La date de dernière mise à jour est indiquée en haut de cette page.
                            Nous vous encourageons à la consulter régulièrement.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
