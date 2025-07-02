# README - Projet Raccourcisseur d'URL Laravel + React + Vite + PostgreSQL

---

## Description

Ce projet est un raccourcisseur d'URL avec un backend Laravel (API REST) et un frontend React TypeScript utilisant Vite.  
La base de données utilisée est PostgreSQL.

---

## Prérequis

- PHP >= 8.0 avec extensions PDO, pdo_pgsql et fileinfo activées
- Composer
- Node.js et npm
- PostgreSQL installé et en fonctionnement
- (Optionnel) Docker si tu veux lancer PostgreSQL dans un container

---

## Installation et configuration

### 1. Backend Laravel

1. Clone ou copie le projet Laravel dans un dossier `backend`.

2. Dans le dossier `backend`, installe les dépendances PHP :
```bash
composer install
Copie le fichier .env.example en .env :

bash
Copier
Modifier
cp .env.example .env
Ouvre .env et configure la connexion à PostgreSQL :

env
Copier
Modifier
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nom_de_ta_base
DB_USERNAME=ton_utilisateur
DB_PASSWORD=ton_mot_de_passe
Vérifie que les extensions PHP nécessaires sont activées dans php.ini :

extension=pdo_pgsql

extension=pgsql

extension=fileinfo

Génère la clé d’application Laravel :

bash
Copier
Modifier
php artisan key:generate
Lance les migrations pour créer les tables dans PostgreSQL :

bash
Copier
Modifier
php artisan migrate
Lance le serveur Laravel local :

bash
Copier
Modifier
php artisan serve
Le backend sera accessible sur : http://127.0.0.1:8000

2. Frontend React + Vite
Dans le dossier frontend, installe les dépendances Node.js :

bash
Copier
Modifier
npm install
Crée ou modifie le fichier .env dans frontend pour définir l'URL de l'API backend :

env
Copier
Modifier
VITE_API_URL=http://127.0.0.1:8000/api
Lance le serveur de développement React :

bash
Copier
Modifier
npm run dev
Le frontend sera accessible sur http://localhost:5173 (par défaut).

Utilisation
Dans l’interface React, entre une URL complète à raccourcir, puis clique sur Raccourcir.

Le lien raccourci s’affiche, ainsi qu’un historique des liens déjà créés avec leur nombre de clics.

Cliquer sur un lien raccourci redirige vers l’URL originale.

Dépannage
Erreur PDO "could not find driver" :
Vérifie que l’extension pdo_pgsql est activée dans php.ini.

Erreur CORS (quand React appelle Laravel) :
Installe et configure le package Laravel CORS :

bash
Copier
Modifier
composer require fruitcake/laravel-cors
php artisan vendor:publish --tag="cors"
Puis dans config/cors.php, autorise l’origine http://localhost:5173.

Erreur d’extensions PHP manquantes :
Active fileinfo dans php.ini en décommentant extension=fileinfo.

Le frontend ne trouve pas l’API :
Vérifie que VITE_API_URL dans .env frontend correspond bien à l’URL où Laravel tourne.

Remarques
Ce projet utilise React + TypeScript + Vite pour un frontend moderne, et Laravel 8.x comme API backend.

La base PostgreSQL est utilisée en production locale, assure-toi qu’elle est correctement configurée.

Le style frontend utilise du CSS en JS avec un design simple et épuré.

Commandes utiles résumé
Backend (dans backend/)
bash
Copier
Modifier
composer install
cp .env.example .env
# modifier .env pour PostgreSQL
php artisan key:generate
php artisan migrate
php artisan serve
Frontend (dans frontend/)
bash
Copier
Modifier
npm install
# créer/modifier .env avec VITE_API_URL
npm run dev