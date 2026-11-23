# Portail SAP du DP — contexte du projet

Ce fichier donne à Claude Code tout le contexte du projet. Le lire en entier avant toute modification.

## Le propriétaire et l'objectif

- Propriétaire : Walid, Program Manager IT côté intégrateur, qui pilote le delivery d'un domaine logistique (EWM, MM, WM) dans un programme SAP ECC vers S/4HANA. Il n'est pas expert technique SAP.
- Objectif immédiat : un site personnel de révision qui rassemble tous les supports de formation SAP construits avec Claude, avec un glossaire consultable en permanence.
- Objectif à terme : un portail d'eLearning pour des chefs de projet et directeurs de programme SAP.
- Langue : français, vouvoiement. Il préfère des réponses directes et franches, et l'exécution plutôt que les longues discussions.

## Règles non négociables

1. **Aucune information propre à un client.** Pas de nom de client, de système interne (SID), d'interface interne, de site ou d'organisation réelle. Les exemples utilisent des entreprises fictives : Nordval (roll-out), Calvane (greenfield), Ternova (brownfield), Alvéa (bluefield). Le site peut devenir public un jour : tout doit pouvoir être montré à un recruteur.
2. **Exactitude.** Les faits SAP datés (fins de maintenance, noms de produits, outils) sont à vérifier avant publication. En cas de doute, le dire plutôt qu'inventer. Les chiffres des exemples fil rouge sont fictifs et doivent rester présentés comme tels.
3. **Style d'écriture.** Phrases courtes, voix active, termes techniques expliqués ou présents dans le glossaire. Pas d'emoji.
4. **Design.** Police IBM Plex Sans (texte) et IBM Plex Mono (étiquettes). Couleurs définies en variables CSS avec un thème clair et un thème sombre (`prefers-color-scheme`). Pages utilisables sur téléphone (pas de défilement horizontal de la page).

## Structure actuelle

```
index.html                 accueil : parcours conseillé, frises, autres supports
shared/glossaire-data.js   données : documents (SAP_DOCS), catégories, 136 termes (SAP_GLOSSAIRE)
shared/glossaire.js        composant glossaire, inclus sur toutes les pages
frises/rollout.html        frise roll-out (Diagnose, Adjust, Deploy)
frises/greenfield.html     frise greenfield (SAP Activate)
frises/brownfield.html     frise brownfield (SAP Activate)
frises/bluefield.html      frise bluefield (SAP Activate)
lecteur.html               lecteur PDF page par page (PDF.js), lecteur.html?doc=documents/<fichier>.pdf
documents/                 les 9 supports en PDF, anonymisés (le plan de formation a été retiré du site)
```

Le site fonctionne en ouvrant `index.html` dans un navigateur, sans compilation. Le lecteur PDF demande un serveur (même local : `python3 -m http.server 8080`) et une connexion internet (PDF.js vient de cdnjs). `SAP_HREF` dans `glossaire-data.js` envoie tout PDF local vers le lecteur.

### Le glossaire

- Fixé à droite sur grand écran (au-delà de 1100 px), tiroir sur petit écran. Bouton « Masquer », bouton flottant « Glossaire », raccourci « / ».
- Chaque terme est une ligne de `SAP_GLOSSAIRE` : `[terme, nom complet, catégorie, définition, « pour le DP », [clés de documents]]`.
- Catégories : `meth`, `proc`, `tech`, `data`, `test`, `run`, `agile` (libellés dans `SAP_CAT`).
- Les clés de documents renvoient à `SAP_DOCS`. Un lien local (sans `http`) est résolu par rapport à la racine du site.
- La recherche ignore les accents et cherche aussi dans les définitions.

### Les frises

- Chaque frise est une page autonome : le contenu est dans son script, dans les constantes `PH` (phases), `S` (étapes et gates), `ORDER`, `TL` (positions sur la chronologie), `GT` (gates), `PSPAN` (étendue des phases), `ML` (mois), `IC` (icônes SVG).
- Chaque étape de `S` contient : `t` titre, `s` sous-titre, `obj` objectif, `act` activités, `pre` prérequis, `liv` livrables, `own` qui porte, `ai` apport de l'IA, `aig` gain estimé, `r` risques `[risque, parade]`, `ex` exemple fil rouge (affiché en fin de popup).
- Popups avec navigation Précédent / Suivant et bouton « Suivre l'exemple pas à pas ».
- Bouton « ← Portail » en haut de chaque frise.

## Les autres supports (à récupérer en PDF)

Ces documents existent comme artefacts privés sur claude.ai. Claude Code ne peut pas les lire : Walid doit les exporter en PDF et les déposer dans `documents/`.

| Clé `SAP_DOCS` | Document | Type |
|---|---|---|
| synth | Formation SAP · Synthèse (FR) | Deck |
| synthEN | SAP Training · Summary (EN) | Deck |
| mig | Migration ECC vers S/4HANA (FR) | Deck |
| migEN | ECC to S/4HANA Migration (EN) | Deck |
| fiche | Fiche de révision | Doc |
| act | ACT100 · Livre de révision (SAP Activate) | Doc |
| act2 | ACT200 · Livre de révision (SAP Activate Agile) | Doc |
| simu | Simulation d'entretien (questions et bonnes réponses) | Doc |
| script | Script de narration eLearning | Doc |

Hors site, volontairement : un schéma de paysage logistique propre au client (confidentiel). Un schéma des rôles d'un programme SAP existe aussi ; il faut le relire et retirer toute information propre au client avant de l'ajouter.

## Ce qui est prévu

1. **Hébergement** : décidé le 23/11/2026, dépôt public `Walidbibi/portail-elearning-sap` sur le compte personnel, publié avec GitHub Pages. Pour un accès restreint plus tard : Cloudflare Pages + Cloudflare Access (gratuit jusqu'à 50 utilisateurs).
2. **Mise à jour sans code** : Walid remplace un PDF en déposant un fichier du même nom dans `documents/` via l'interface GitHub ; le site se met à jour seul.
3. **Manifeste des documents** : les liens claude.ai sont déjà remplacés par des PDF locaux ; reste à sortir `SAP_DOCS` vers un `documents.json` (titre, description, type, fichier). Ajouter un document = déposer le fichier + une ligne dans le manifeste. Option : une GitHub Action qui vérifie que chaque fichier du manifeste existe.
4. **Glossaire en JSON** : sortir les données de `glossaire-data.js` vers `glossaire.json`, chargé par `fetch` (le site devra alors être servi par un serveur, même local).
5. **Frises industrialisées** : un seul gabarit HTML + un fichier JSON par frise, au lieu de quatre pages qui dupliquent le code.
6. **eLearning** : quiz par module, suivi de progression, accès par compte.

## Points ouverts

- Les PDF sont des copies anonymisées des supports claude.ai (les originaux citent le client, l'employeur et des sites réels). Si un original change, il faut refaire l'export puis l'anonymisation avant de remplacer le PDF.
- Intégration éventuelle du schéma des rôles, après nettoyage.
