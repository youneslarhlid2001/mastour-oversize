import { Metadata } from 'next';
import PageIntro from '@/components/PageIntro';

export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité et protection des données personnelles de Mastour Oversize, conformément au RGPD.',
};

export default function RGPDPage() {
    return (
        <>
            <PageIntro eyebrow="Protection des données" title="Confidentialité">
                <p className="text-base">Dernière mise à jour : février 2026. Conforme au RGPD (UE 2016/679).</p>
            </PageIntro>

            <div className="page-x pb-20">
                <div className="legal max-w-3xl">

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
                        <h2>1. Responsable du traitement</h2>
                        <div className="card">
                            <p><strong>Responsable :</strong> Mastour Oversize</p>
                            <p><strong>Adresse :</strong> [Adresse à compléter]</p>
                            <p><strong>Email :</strong> contact@mastouroversize.com</p>
                            <p><strong>Instagram :</strong> @mastouroversize</p>
                        </div>
                        <p className="draft">
                            ⚠️ Les informations entre crochets doivent être complétées avec vos données réelles.
                        </p>
                    </section>

                    {/* Article 2 */}
                    <section>
                        <h2>2. Données collectées</h2>
                        <p>Nous pouvons collecter les données suivantes :</p>

                        <div>
                            <div className="card">
                                <h3 className="font-sans font-semibold text-ink">Via le formulaire de contact</h3>
                                <ul>
                                    <li>Nom et prénom</li>
                                    <li>Adresse email</li>
                                    <li>Contenu du message</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h3 className="font-sans font-semibold text-ink">Via les commandes Instagram</h3>
                                <ul>
                                    <li>Nom et prénom</li>
                                    <li>Adresse de livraison</li>
                                    <li>Numéro de téléphone</li>
                                    <li>Identifiant Instagram</li>
                                </ul>
                            </div>

                            <div className="card">
                                <h3 className="font-sans font-semibold text-ink">Données de navigation (si analytics activé)</h3>
                                <ul>
                                    <li>Adresse IP (anonymisée)</li>
                                    <li>Type de navigateur et appareil</li>
                                    <li>Pages visitées et durée</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Article 3 */}
                    <section>
                        <h2>3. Finalités du traitement</h2>
                        <p>Vos données sont traitées pour les finalités suivantes :</p>

                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Finalité</th>
                                        <th>Base légale</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Traitement des commandes</td>
                                        <td>Exécution contractuelle</td>
                                    </tr>
                                    <tr>
                                        <td>Réponse aux demandes de contact</td>
                                        <td>Intérêt légitime</td>
                                    </tr>
                                    <tr>
                                        <td>Livraison des produits</td>
                                        <td>Exécution contractuelle</td>
                                    </tr>
                                    <tr>
                                        <td>Amélioration du site</td>
                                        <td>Consentement (cookies)</td>
                                    </tr>
                                    <tr>
                                        <td>Obligations légales et comptables</td>
                                        <td>Obligation légale</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Article 4 */}
                    <section>
                        <h2>4. Durée de conservation</h2>
                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type de données</th>
                                        <th>Durée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Données clients (commandes)</td>
                                        <td>5 ans (obligation comptable)</td>
                                    </tr>
                                    <tr>
                                        <td>Formulaire de contact</td>
                                        <td>12 mois après le dernier échange</td>
                                    </tr>
                                    <tr>
                                        <td>Données de navigation</td>
                                        <td>13 mois maximum</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Article 5 */}
                    <section>
                        <h2>5. Vos droits</h2>
                        <p>
                            Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :
                        </p>

                        <ul>
                            {[
                                ['Droit d\'accès', 'Obtenir une copie de vos données'],
                                ['Droit de rectification', 'Corriger des données inexactes'],
                                ['Droit à l\'effacement', 'Demander la suppression de vos données'],
                                ['Droit à la limitation', 'Limiter le traitement de vos données'],
                                ['Droit à la portabilité', 'Recevoir vos données dans un format standard'],
                                ['Droit d\'opposition', 'Vous opposer au traitement de vos données'],
                            ].map(([title, desc]) => (
                                <li key={title}><strong>{title}</strong> : {desc}</li>
                            ))}
                        </ul>

                        <p>
                            Pour exercer vos droits, contactez-nous à{' '}
                            <strong>contact@mastouroversize.com</strong> ou via Instagram. Nous répondrons
                            dans un délai maximum de <strong>30 jours</strong>.
                        </p>
                    </section>

                    {/* Article 6 */}
                    <section>
                        <h2>6. Cookies</h2>
                        <p>
                            Le site mastouroversize.com peut utiliser des cookies pour améliorer votre
                            expérience de navigation. Les cookies sont de petits fichiers stockés sur votre
                            appareil.
                        </p>

                        <div className="overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Finalité</th>
                                        <th>Consentement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Essentiels</td>
                                        <td>Fonctionnement du site</td>
                                        <td>Non requis</td>
                                    </tr>
                                    <tr>
                                        <td>Analytiques</td>
                                        <td>Mesure d&apos;audience</td>
                                        <td>Requis</td>
                                    </tr>
                                    <tr>
                                        <td>Marketing</td>
                                        <td>Publicité ciblée</td>
                                        <td>Requis</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>
                            Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres
                            de votre navigateur.
                        </p>
                    </section>

                    {/* Article 7 */}
                    <section>
                        <h2>7. Partage des données</h2>
                        <p>
                            Vos données ne sont <strong>jamais vendues</strong> à des tiers. Elles peuvent
                            être partagées uniquement avec :
                        </p>
                        <ul>
                            <li><strong>Transporteurs</strong> : pour assurer la livraison de vos commandes</li>
                            <li><strong>Prestataires de paiement</strong> : pour le traitement sécurisé des paiements</li>
                            <li><strong>Hébergeur du site</strong> : Vercel Inc., pour l&apos;hébergement du site web</li>
                        </ul>
                    </section>

                    {/* Article 8 */}
                    <section>
                        <h2>8. Sécurité des données</h2>
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
                            protéger vos données contre tout accès non autorisé, modification, divulgation ou
                            destruction. Le site utilise le protocole <strong>HTTPS</strong> pour sécuriser
                            les échanges de données.
                        </p>
                    </section>

                    {/* Article 9 */}
                    <section>
                        <h2>9. Transfert hors UE</h2>
                        <p>
                            Dans le cadre de l&apos;hébergement du site (Vercel), certaines données peuvent
                            être traitées en dehors de l&apos;Union Européenne. Dans ce cas, des garanties
                            appropriées sont mises en place (clauses contractuelles types approuvées par la
                            Commission Européenne).
                        </p>
                    </section>

                    {/* Article 10 */}
                    <section>
                        <h2>10. Réclamation</h2>
                        <p>
                            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
                            réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de
                            l&apos;Informatique et des Libertés) :
                        </p>
                        <div className="card">
                            <p><strong>CNIL</strong></p>
                            <p>3 Place de Fontenoy, TSA 80715</p>
                            <p>75334 Paris Cedex 07</p>
                            <p>Site : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline">www.cnil.fr</a></p>
                        </div>
                    </section>

                    {/* Article 11 */}
                    <section>
                        <h2>11. Modification de la politique</h2>
                        <p>
                            Nous nous réservons le droit de modifier la présente politique de confidentialité
                            à tout moment. La date de dernière mise à jour est indiquée en haut de cette page.
                            Nous vous encourageons à la consulter régulièrement.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}
