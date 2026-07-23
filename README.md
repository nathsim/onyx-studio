# onyx studio 🖤

Application de studio Pilates / Yoga : **mêmes fonctionnalités** qu'une app de réservation type
Paradox Studio (bsport), mais avec une **identité 100% originale** — design sombre premium
**noir + doré**, typo Outfit, navigation à 5 onglets, cartes avec barres de progression.

**100% locale** : aucune base de données, aucun serveur distant. Toutes les données (compte, crédits,
réservations, factures…) vivent dans le `localStorage` du navigateur.

## Lancer l'app

Double-clique sur **`demarrer.bat`** (ou le raccourci « onyx studio » du Bureau) → le serveur démarre
et le navigateur s'ouvre sur `http://localhost:4519`.

(ou en ligne de commande : `node server.js`)

## Installer comme une vraie application 📲

L'app est une **PWA** : dans Chrome/Edge, clique sur l'icône **« Installer »** dans la barre d'adresse
(ou menu ⋮ → « Installer onyx studio »), ou utilise le bouton « 📲 Installer l'application » dans le
Profil. Elle s'ouvre alors dans sa propre fenêtre avec sa propre icône, et fonctionne même hors-ligne
(service worker). ⚠️ Le serveur local doit tourner pour le premier chargement.

## Comptes intégrés

| Rôle | Email | Mot de passe |
|---|---|---|
| Membre démo (données remplies) | `demo@onyx-studio.fr` | `demo1234` |
| **Gérant (espace admin)** | `admin@onyx-studio.fr` | `admin1234` |

## Espace gérant ⚙️

En te connectant avec le compte gérant (ou via Profil → « Espace gérant ») tu peux **modifier l'app
sans toucher au code** :
- **Les cours** : créer / renommer / supprimer, emoji, durée, prix en crédits, photo
- **Le planning hebdo** : ajouter / retirer des créneaux jour par jour
- **Les tarifs** : packs de crédits (prix, crédits, validité) et abonnements
- **Les profs** : ajouter / retirer (protégé si le prof a des cours planifiés)
- **Les membres** : liste avec crédits/résas, **offrir des crédits** 🎁 (avec message), supprimer un compte
- **Annonces 📣** : publie un message → bannière + notification chez tous les membres
- **Taux de remplissage** : nombre de résas par créneau + **liste des inscrit·e·s** (tape sur un créneau)
- **Graphique d'activité** : réservations des 8 dernières semaines sur le dashboard
- **Le shop éditable** : ajoute/modifie/supprime les produits
- **Sauvegarde 💾 / Restauration 📥** : exporte tout (comptes + config) en .json et réimporte-le
- **Marque & infos** : renomme le studio (nom, slogan, adresse) — tout se met à jour en direct
- **Stats** : membres, revenus simulés, réservations, cours le plus populaire
- **Dupliquer un jour** : copie tout le planning d'un jour vers un autre en 2 taps
- **Réinitialiser** : retour à la config d'origine en un clic

Tout est stocké dans `localStorage` (`onyx_config_v1`) et s'applique à tous les comptes.

## Fonctionnalités

- **Comptes locaux** : connexion + **création de compte** (validations, erreurs), multi-comptes sur le même PC,
  session persistante, 🎁 2 crédits offerts à l'inscription — compte démo : `demo@onyx-studio.fr` / `demo1234`
- **Notifications 🔔** : rappels de séance (aujourd'hui/demain), crédits qui expirent, place libérée
  en liste d'attente, annonces du studio — cloche avec badge + centre de notifications
- **Niveaux & série** : 🌱 Découverte → 🥉 Bronze → 🥈 Argent → 🥇 Or → 💠 Platine, série de semaines 🔥
- **Mes statistiques 📈** : graphique 8 semaines, heures de mouvement, tops (cours/prof), répartition MAT/Reformer
- **Fiches profs** : bio, spécialité, **note moyenne des membres ★**, prochains cours (tape sur un nom de prof)
- **Avis** : note ★ 1-5 + commentaire sur chaque séance passée ; moyennes visibles sur cours et profs
- **« Pour toi » ✨** : recommandations personnalisées selon tes favoris, profs et horaires habituels
- **Parrainage 🤝** : partage ton code membre → 1 crédit offert pour toi et ton filleul·e
- **Réservation récurrente 🔁** : coche « Répéter » → réserve le même créneau sur les 3 semaines suivantes
- **Check-in ✅** : bouton « Je suis là ! » 30 min avant le cours (badge Présent·e ×3 à la clé)
- **Défis du mois 🏆** : Régularité / Curiosité / Reformer power — **+1 crédit offert** par défi réussi
- **Annulation réaliste** : gratuite jusqu'à 2h avant le cours, bloquée ensuite
- **Inviter un ami 📤** : partage une séance (Web Share / copie) avec ton code de parrainage inclus
- **Choix de ta place 🪑** : plan de salle interactif à la réservation (12 tapis / 8 machines),
  places occupées grisées, ta place affichée partout — comme les meilleures apps de studio
- **Coach ✨** : 2 questions (quand ? envie de quoi ?) → 3 cours parfaits proposés
- **Recherche universelle** : la barre de recherche trouve séances, profs et produits (résultats groupés)
- **Classement du mois 🏅** : podium des comptes du PC (séances du mois), toi en surbrillance
- **Rappels système 🔔** : active les vraies notifications Windows/Android depuis le profil
- **Confettis 🎉** à la réservation et à l'inscription (oui c'est important)
- **Accueil** : salutation, wallet crédits, **objectif hebdo avec progression 🔥**, recherche, carrousel, grille des cours, favoris
- **Planning** : bandeau de dates, filtres lieu / professeur, places restantes, cours complets
- **Réservation** : réserver (débit de crédits) / annuler (remboursement), **venir avec un invité (+1)**,
  **liste d'attente** sur les cours complets (position, quitter)
- **Mes séances** : **calendrier mensuel** (points sur tes jours de séance, navigation entre mois, clic sur un jour),
  à venir (itinéraire, annulation, export `.ics`), historique avec **notes ★**, favoris
- **Avis visibles** : les commentaires des membres apparaissent sur les fiches profs
- **Robustesse** : textes saisis échappés partout (noms avec apostrophes, HTML…), scroll conservé, filtres réinitialisables
- **Boutique** : packs de crédits, abonnements mensuels (facturation simulée, résiliation),
  cartes-cadeaux (codes générés), shop produits, panier, paiement **fictif**
- **Inventaire** : mes cartes (barres de progression), mes abonnements, mes factures téléchargeables
- **Profil** : stats, **badges à débloquer** 🎟️🔥💎, pass d'entrée QR, objectif hebdo,
  **couleur de l'app au choix** (doré / violet / menthe / rose), édition des infos

## Différences volontaires avec l'app d'origine

- **Design entièrement différent** : thème sombre noir/doré (vs clair gris/corail), typo Outfit (vs Quicksand)
- **Navigation différente** : 5 onglets plats avec pastille dorée active (vs logo central), onglet Planning dédié
- **Écrans repensés** : accueil avec salutation + wallet + carrousel + grille des cours ;
  planning par jour avec bandeau de dates ; séances avec compte à rebours ; cartes avec barres de progression ;
  abonnements en cartes avec badge « SANS LIMITE »
- Marque, logo, adresse et professeurs **originaux** (rien de copié)
- Export agenda `.ics` réel, codes cadeaux générés, facturation mensuelle simulée

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | coquille de l'app |
| `styles.css` | tout le design |
| `data.js` | marque, cours, planning hebdo, offres |
| `app.js` | logique (routing, état, réservations, panier…) |
| `server.js` | mini serveur statique Node (port 4519) |

## Étape suivante (plus tard)

Transformer en vraie application : PWA installable (manifest + service worker) ou app de bureau (Tauri/Electron),
et éventuellement un vrai backend si besoin de comptes partagés.
