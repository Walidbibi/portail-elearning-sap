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
documents.json             manifeste : la liste des documents et l'ordre des sections de l'accueil
shared/documents.js        chargeur du manifeste (SAP_DOCUMENTS) et SAP_HREF
glossaire.json             les 136 termes du glossaire, un terme par ligne
shared/glossaire.js        composant glossaire, inclus sur toutes les pages
shared/libelles.js         chargeur des textes d'interface (SAP_T, attributs data-t), inclus avant glossaire.js
shared/libelles/fr.json    textes d'interface de l'accueil, du glossaire et du lecteur
outils/captures/           captures avant / après et comparaison pixel par pixel (voir LISEZMOI.md)
frises/rollout.html        frise roll-out (Diagnose, Adjust, Deploy), contenu dans frises/rollout.json
frises/greenfield.html     frise greenfield (SAP Activate), contenu dans frises/greenfield.json
shared/frise.js, frise.css gabarit commun des frises (dessin de la chronologie, popups)
frises/brownfield.html     frise brownfield (SAP Activate), contenu dans frises/brownfield.json
frises/bluefield.html      frise bluefield (SAP Activate), contenu dans frises/bluefield.json
lecteur.html               lecteur PDF page par page (PDF.js), lecteur.html?doc=documents/<fichier>.pdf
apercus/<clé>.jpg          aperçu de chaque carte (1re page du PDF via `qlmanage -t`, capture Chrome headless pour les frises), à refaire si le support change
documents/                 les 9 supports en PDF, anonymisés (le plan de formation a été retiré du site)
```

Le site ne demande aucune compilation, mais il doit être servi par un serveur, même local (`python3 -m http.server 8080`) : les textes et le manifeste sont chargés par `fetch`. PDF.js est copié dans `shared/pdfjs/` (version 3.11.174), aucun CDN. `SAP_HREF` dans `shared/documents.js` envoie tout PDF local vers le lecteur.

### Le manifeste des documents

`documents.json` contient deux blocs :

- `documents` : une entrée par support, sous une clé courte (`synth`, `mig`…). Champs : `type` (`deck`, `doc`, `frise`, `act`, `prat`, libellés dans `shared/libelles/fr.json` sous `types`), `titre`, `description`, `fichier` (chemin depuis la racine du site).
- `accueil` : l'ordre des cartes dans les trois sections de l'accueil (`parcours`, `frises`, `autres`), par clé.

Ajouter un document :

1. Déposer le PDF dans `documents/` (nom en minuscules, sans espace ni accent).
2. Ajouter une entrée dans `documents` avec une nouvelle clé.
3. Ajouter la clé dans une section de `accueil` pour qu'une carte apparaisse.
4. Optionnel : un aperçu `apercus/<clé>.jpg` (sinon la carte s'affiche sans image).

Le lecteur n'ouvre que les PDF listés dans le manifeste et rangés sous `documents/`.

### Le glossaire

- Fixé à droite sur grand écran (au-delà de 1100 px), tiroir sur petit écran. Bouton « Masquer », bouton flottant « Glossaire », raccourci « / ».
- Les termes sont dans `glossaire.json`, tableau `termes`, un terme par ligne. Champs : `terme`, `nomComplet` (peut être vide), `categorie`, `definition`, `pourLeDP` (peut être vide), `documents` (liste de clés de `documents.json`). Exemple :
  `{"terme":"Cutover","nomComplet":"Bascule","categorie":"test","definition":"…","pourLeDP":"…","documents":["synth","rollout"]}`
- Catégories : `meth`, `proc`, `tech`, `data`, `test`, `run`, `agile` (libellés dans `shared/libelles/fr.json`, sous `categories`).
- Si `glossaire.json` ne se charge pas, le panneau affiche un message d'erreur au lieu de la liste.
- Les clés de documents renvoient à `documents.json`. Un lien local (sans `http`) est résolu par rapport à la racine du site.
- La recherche ignore les accents et cherche aussi dans les définitions.

### Les frises

Les quatre frises partagent un gabarit (US-005 à US-007). Chaque page `frises/<nom>.html` est courte et identique aux autres, sauf le nom de son fichier de contenu : `<script src="../shared/frise.js" data-frise="<nom>.json">`. L'affichage est dans `shared/frise.js` et `shared/frise.css`, les textes communs (Activités, Risques d'échec, Précédent…) dans `shared/libelles/fr.json`, sous `frise`.

Champs de `frises/<nom>.json` :

| Champ | Contenu |
|---|---|
| `titreOnglet`, `surtitre`, `titre`, `intro` | en-tête de la page |
| `exemple` | `entreprise` (affichée dans « Dans l'exemple · … ») et `description` (ligne « Exemple fil rouge ») |
| `chronologieAria` | description de la chronologie pour les lecteurs d'écran |
| `enContinu` | texte du bandeau « En continu », qui ouvre l'étape `transverse` |
| `causesTitre`, `causes` | titre et liste des causes d'échec |
| `note` | note de bas de page |
| `nomGate` (facultatif) | nom des gates, « Quality gate » par défaut (« Gate de passage » pour le roll-out) |
| `couleurs` (facultatif) | couleur de chaque phase, en indice de la palette `--c0` à `--c5` ; par défaut la phase n prend la couleur n |
| `couleurParade` (facultatif) | couleur de l'étiquette « Parade », indice de la palette ; `--c4` (rouge) par défaut |
| `chronologie` | `largeur` et `x1` (dimensions du dessin), `mois` (libellés de l'axe, un par mois), `golive` (`mois` : position, `etape` : étape ouverte au clic) |
| `phases` | `[{id, name, eq}]`, une par colonne |
| `etenduePhases` | `[début, fin]` de chaque phase, en mois depuis le début de l'axe |
| `ordre` | étapes de chaque phase, dans l'ordre du parcours « pas à pas » |
| `positions` | pour chaque étape : `[début, fin, libellé court]` sur la chronologie |
| `gates` | pour chaque gate : `[mois, étiquette du losange]` |
| `icones` | tracé SVG de l'icône de chaque étape |
| `etapes` | le contenu des popups, voir ci-dessous |

Chaque étape de `etapes` contient : `p` phase, `n` numéro, `t` titre, `s` sous-titre, `obj` objectif, `act` activités, `pre` prérequis, `liv` livrables, `own` qui porte, `ai` apport de l'IA, `aig` gain estimé, `r` risques `[risque, parade]`, `ex` exemple fil rouge (affiché en fin de popup). Une gate a `gate: 1` et pas de `n`. L'étape `transverse` sert au bandeau « En continu ».

Ajouter une frise :

1. Copier une page existante en `frises/<nom>.html` et changer `data-frise`.
2. Copier le JSON le plus proche en `frises/<nom>.json` et remplacer le contenu. Le bouton « Suivre l'exemple » ouvre la première étape de `ordre`.
3. Ajuster `chronologie.largeur` et `x1` si le nombre de mois change : les frises existantes vont de 1240 à 1320 de large pour 10 à 17 mois.
4. Déclarer la frise dans `documents.json` (type `frise`) et l'ajouter à la section `frises` de l'accueil.
5. Faire un aperçu `apercus/<clé>.jpg`, puis vérifier la page dans un navigateur.

Les popups ont une navigation Précédent / Suivant, un bouton « Suivre l'exemple pas à pas » et le bouton « ← Portail » en haut de page. Clavier : Entrée ou Espace sur un élément de la chronologie, Échap pour fermer.

## Les autres supports (à récupérer en PDF)

Ces documents existent comme artefacts privés sur claude.ai. Claude Code ne peut pas les lire : Walid doit les exporter en PDF et les déposer dans `documents/`.

| Clé du manifeste | Document | Type |
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

## Agents et circuit de travail

Trois agents dans `.claude/agents/`. Ils ne se parlent pas directement : ils échangent par les fichiers. `besoins.md` porte ce que veulent les utilisateurs ; `backlog.md` porte le statut de chaque story et un journal où chaque agent laisse une ligne pour le suivant.

- `persona-pm` : joue l'utilisateur cible (chef de projet senior, débutant en SAP). Mode « besoins » : il exprime ses besoins dans `besoins.md`. Mode « test » : il relit ce qui est livré et rend un rapport dans `rapports/`. Ses besoins sont des hypothèses ; ceux de Walid priment.
- `po` : tire des besoins les stories et leurs critères d'acceptation dans `backlog.md`.
- `ux-ui` : fait une maquette HTML statique dans `maquettes/` avant tout changement visible.
- La session principale joue le chef d'orchestre et le développeur : elle lance l'agent qui correspond au statut de la story, puis développe une story « Validée ».

Walid valide deux fois : la maquette avant le développement, puis la publication. Aucun agent ne passe une story en « Validée » ou ne publie.

Quand Walid dit « fais avancer US-XXX », la session principale lit le statut et enchaîne les étapes jusqu'à la prochaine validation de Walid.

## Ce qui est prévu

1. **Hébergement** : décidé le 23/11/2026, dépôt public `Walidbibi/portail-elearning-sap` sur le compte personnel, publié avec GitHub Pages. Pour un accès restreint plus tard : Cloudflare Pages + Cloudflare Access (gratuit jusqu'à 50 utilisateurs).
2. **Mise à jour sans code** : Walid remplace un PDF en déposant un fichier du même nom dans `documents/` via l'interface GitHub ; le site se met à jour seul.
3. **Manifeste des documents** : fait le 24/11/2026 (`documents.json`, US-003). Reste en option une GitHub Action qui vérifie que chaque fichier du manifeste existe (US-008).
4. **Glossaire en JSON** : fait le 24/11/2026 (`glossaire.json`, US-004).
5. **Frises industrialisées** : un seul gabarit + un fichier JSON par frise. Fait pour les quatre frises (US-005 à US-007).
6. **eLearning** : quiz par module, suivi de progression, accès par compte.

## Points ouverts

- Les PDF sont des copies anonymisées des supports claude.ai (les originaux citent le client, l'employeur et des sites réels). Si un original change, il faut refaire l'export puis l'anonymisation avant de remplacer le PDF.
- Intégration éventuelle du schéma des rôles, après nettoyage.
