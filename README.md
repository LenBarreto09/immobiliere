# Immobilière
Mini application immobilière - Annonces immobilières

## Architecture

Le projet utilise une architecture en couches (Layered Architecture) avec séparation claire des responsabilités et support de la scalabilité.

### Frontend
- Design System avec des tokens CSS pour des composants scalables
- Génération de variants, changements de thème, design responsive et maintenabilité
- Un seul endroit pour mettre à jour partout - auto-documentation

### Backend
- API REST avec Fastify
- Validation avec Zod : validation des requêtes, paramètres et auto-typage des DTOs
- Architecture en couches : Routes → Services → Repository
- Stockage local en mémoire (facilement remplaçable par une base de données)

**Note sur les données :** Les données mockées initiales ne sont pas modifiées ou éditées directement. Seules les nouvelles propriétés créées via l'API sont ajoutées au stockage en mémoire. Les données mockées servent uniquement de données de départ pour le développement.

## Comment lancer le projet

### Prérequis
- Node.js (version 18+)
- npm

### Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd immobiliere
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   npm run build
   npm run start
   ```
   Le serveur backend démarrera sur http://localhost:3002

3. **Frontend** (dans un nouveau terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   L'application frontend sera disponible sur http://localhost:5173

### Développement

- **Backend dev mode**: `npm run dev` (avec rechargement automatique)
- **Frontend dev mode**: `npm run dev` (avec Vite HMR)

### Fonctionnalités

- Affichage des propriétés immobilières
- Détails d'une propriété
- Création de nouvelles propriétés
- Interface responsive

### Architecture choisie (pourquoi)

Le projet utilise une **architecture en couches** :
- **Routes** : Gestion HTTP et validation des entrées
- **Services** : Logique métier et transformation des données
- **Repository** : Abstraction de la couche de données (facilement remplaçable)

Cette architecture permet :
- Séparation claire des responsabilités
- Évolutivité (ajout de nouvelles fonctionnalités)
- Maintenance facilitée

**Zod pour la validation** :
- Validation automatique des données d'entrée
- Auto-typage des DTOs (pas de duplication)
- Messages d'erreur détaillés
- Sécurité des types de bout en bout

## Ce que j'aurais ajouté avec plus de temps

- Base de données (PostgreSQL/MySQL)
- Upload d'images
- Tests unitaires et d'intégration
- Pagination avancée
- CI/CD pipeline
- Documentation API (Swagger)
- Map location
