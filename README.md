# Mastour Oversize

Site vitrine e-commerce de la marque Mastour Oversize, avec Next.js 16, Tailwind CSS 4 et TypeScript. Les commandes se font par message Instagram.

## 🚀 Démarrage Rapide

1.  **Installation des dépendances :**
    ```bash
    npm install
    ```

2.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```
    Ouvrez `http://localhost:3000` pour voir le site.

3.  **Construction pour la production :**
    ```bash
    npm run build
    npm start
    ```

## 📦 Gestion des Produits

Les produits sont gérés via le fichier `data/products.json`.

**Pour ajouter un produit :**
1.  Ouvrez `data/products.json`.
2.  Ajoutez un nouvel objet dans le tableau en suivant ce modèle :
    ```json
    {
      "id": "reference-unique-produit",
      "name": "Nom du Produit",
      "price": 49.99,
      "sizes": ["S", "M", "L"],
      "category": "Robes",
      "description": "Description détaillée...",
      "images": ["/images/products/votre-image.webp"],
      "colors": ["Camel", "Kaki"],
      "stock": { "S": 5, "M": 8, "L": 6 },
      "featured": true,
      "promotion": false
    }
    ```
3.  Déposez les images correspondantes dans `public/images/products/`.

**Photos et illustrations :** tant que `images` pointe vers `placeholder-product.svg`, la fiche affiche un vêtement dessiné dont la couleur suit le coloris choisi. Dès qu'une vraie photo est renseignée, elle remplace le dessin, sans autre modification.

**Nouveau coloris :** ajoutez sa teinte dans `lib/colors.ts`. **Nouveau modèle dessiné :** choisissez sa silhouette dans `FIGURES`, en haut de `components/Garment.tsx`.

## 🏷️ Gestion des Promotions

Les promotions sont gérées via `data/promotions.json`.

```json
{
  "id": "promo-ete",
  "title": "Solde d'été",
  "description": "-20% sur tout...",
  "code": "ETE2026",
  "link": "/promotions",
  "active": true
}
```

`"active": false` retire l'offre du site sans la supprimer. Les pièces à prix réduit se règlent produit par produit avec `promotion` et `discountPrice`.

## 🎨 Personnalisation

-   **Couleurs & Thème :** variables CSS en haut de `app/globals.css` (clair et sombre).
-   **Bandeau d'annonces :** tableau en haut de `components/AnnouncementBar.tsx`.
-   **Liens, email, Instagram, seuil de livraison offerte :** `lib/site.ts`.
-   **Contact :** le formulaire prépare un email dans la messagerie de la cliente, il n'y a pas de backend d'envoi.

## 🔍 SEO

-   Le site génère automatiquement `sitemap.xml` et `robots.txt`.
-   Les métadonnées sont configurées dans chaque page.
-   Les données structurées (JSON-LD) sont intégrées pour les produits.
-   Définissez `NEXT_PUBLIC_SITE_URL` sur Vercel quand le domaine définitif est en place (par défaut : `https://mastour-oversize.vercel.app`).

## ☁️ Déploiement Vercel

1.  Poussez le code sur GitHub.
2.  Importez le projet dans Vercel.
3.  Le déploiement se fait automatiquement.
