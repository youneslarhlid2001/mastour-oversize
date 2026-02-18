# Mastour Oversize

Site vitrine e-commerce premium pour la marque Mastour Oversize using Next.js 15, Tailwind CSS, and TypeScript.

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
      "featured": true, // Mettre à true pour afficher en page d'accueil
      "promotion": false
    }
    ```
3.  Déposez les images correspondantes dans `public/images/products/`.

## 🏷️ Gestion des Promotions

Les promotions sont gérées via `data/promotions.json`.

**Pour ajouter une offre :**
```json
{
  "id": "promo-ete",
  "title": "Solde d'été",
  "description": "-20% sur tout...",
  "code": "ETE2026",
  "image": "/images/promotions/promo.webp",
  "link": "/promotions"
}
```

## 🎨 Personnalisation

-   **Couleurs & Thème :** Modifiez les variables CSS dans `app/globals.css`.
-   **Images :** Remplacez les images dans `public/images`.
-   **Contact :** Le formulaire de contact est une démo client-side. Pour le rendre fonctionnel, intégrez un service comme [EmailJS](https://www.emailjs.com/).

## 🔍 SEO

-   Le site génère automatiquement `sitemap.xml` et `robots.txt`.
-   Les métadonnées sont configurées dans chaque page.
-   Les données structurées (JSON-LD) sont intégrées pour les produits.

## ☁️ Déploiement Vercel

1.  Poussez le code sur GitHub.
2.  Importez le projet dans Vercel.
3.  Le déploiement se fait automatiquement.
