# Jalon — contexte du projet

Ce fichier donne à Claude Code tout le contexte du projet. Le lire en entier avant toute modification.

## Le propriétaire et l'objectif

- Propriétaire : Walid, Program Manager IT côté intégrateur, qui pilote le delivery d'un domaine logistique (EWM, MM, WM) dans un programme SAP ECC vers S/4HANA. Il n'est pas expert technique SAP.
- Objectif immédiat : un site personnel de révision qui rassemble tous les supports de formation SAP construits avec Claude, avec un glossaire consultable en permanence.
- Objectif à terme : un portail d'eLearning pour des chefs de projet et directeurs de programme SAP.
- Langue : français, vouvoiement. Il préfère des réponses directes et franches, et l'exécution plutôt que les longues discussions.

## Le nom et l'identité

- Les pages greenfield, brownfield, bluefield et roll-out s'appellent « scénarios de mise en œuvre » (« implementation scenarios ») depuis le 24/11/2026 ; leurs fichiers gardent le nom `frises/`.
- Le portail s'appelle **Jalon**, en français et en anglais. Signature : « Piloter un programme SAP » / « Running SAP programs ».
- « SAP » ne forme jamais le nom ni le logotype. Les règles de marque de SAP (https://www.sap.com/about/legal/trademark.html, lues le 24/11/2026) interdisent aussi la marque dans un slogan : Walid a choisi de garder la signature avec « SAP », en connaissance du risque.
- Mention de marque obligatoire en pied d'accueil (phrase d'attribution officielle de SAP, site ni affilié ni approuvé), et symbole ® à la première mention de « SAP » sur l'accueil.
- Logotype : losange ambre posé sur une ligne de temps, suivi du mot « Jalon » (`shared/marque/`). L'ambre (`--jalon`) est réservé au jalon et au repère de l'exemple fil rouge (décision de Walid, Q12, 24/11/2026) : ne pas l'utiliser ailleurs.
- À faire par Walid avant une diffusion large : vérifier que « Jalon » n'est pas déjà déposé (INPI, EUIPO, classe 41).

## Règles non négociables

1. **Aucune information propre à un client.** Pas de nom de client, de système interne (SID), d'interface interne, de site ou d'organisation réelle. Les exemples utilisent des entreprises fictives : Nordval (roll-out), Calvane (greenfield), Ternova (brownfield), Alvéa (bluefield). Le site peut devenir public un jour : tout doit pouvoir être montré à un recruteur.
2. **Exactitude.** Les faits SAP datés (fins de maintenance, noms de produits, outils) sont à vérifier avant publication. En cas de doute, le dire plutôt qu'inventer. Les chiffres des exemples fil rouge sont fictifs et doivent rester présentés comme tels.
3. **Style d'écriture.** Phrases courtes, voix active, termes techniques expliqués ou présents dans le glossaire. Pas d'emoji.
4. **Design.** Police IBM Plex Sans (texte) et IBM Plex Mono (étiquettes), hébergées sur le site (`shared/polices/`, version 1.1.0, licence OFL) : aucun CDN ni Google Fonts. Toutes les couleurs sont dans `shared/theme.css`, thème clair et sombre (`prefers-color-scheme`) ; `verifier.mjs` refuse une couleur écrite ailleurs. `theme.css` déclare aussi l'échelle de 8 tailles (`--t-12` à `--t-32`) et les rayons (`--r-6`, `--r-10`, `--r-14`, `--r-pastille`). Pages utilisables sur téléphone (pas de défilement horizontal de la page), cibles d'au moins 40 px, contraste AA.

## Structure actuelle

```
index.html                 accueil : parcours conseillé, De ECC à S/4HANA, principaux flux logistiques, scénarios de mise en œuvre, certification SAP Activate, supports annexes
shared/theme.css           toutes les couleurs (clair, sombre), polices, tailles et rayons
shared/polices/            IBM Plex Sans et Mono (woff2) et leur licence
shared/entete.js           en-tête commun : logotype, fil d'Ariane, sélecteur FR / EN (data-entete sur chaque page)
shared/marque/             logotype, monogramme, favicon (SVG et PNG), image de partage partage.png (refaite depuis outils/partage.html)
documents.json             manifeste : la liste des documents et l'ordre des sections de l'accueil
shared/documents.js        chargeur du manifeste (SAP_DOCUMENTS) et SAP_HREF
glossaire.json             les 314 termes du glossaire, un terme par ligne
shared/glossaire.js        composant glossaire, inclus sur toutes les pages
shared/libelles.js         chargeur des textes d'interface (SAP_T, attributs data-t), inclus avant glossaire.js
shared/libelles/fr.json    textes d'interface (accueil, glossaire, lecteur, frises) ; en.json pour l'anglais
glossaire.en.json          glossaire anglais, relié au français par termeFr ; nomFr = nom français affiché avec le repère FR
frises/<nom>.en.json       contenu anglais de chaque frise, même structure que <nom>.json
outils/captures/           captures avant / après et comparaison pixel par pixel (voir LISEZMOI.md)
outils/version.mjs         pose le même numéro de version (?v=) sur les scripts et le style de toutes les pages, à lancer avant chaque publication
outils/verifier.mjs        contrôle des données : JSON bien formés, fichiers présents, clés cohérentes, textes existants
.github/workflows/verifier.yml   lance outils/verifier.mjs à chaque envoi sur main
frises/rollout.html        frise roll-out (Diagnose, Adjust, Deploy), contenu dans frises/rollout.json
frises/greenfield.html     frise greenfield (SAP Activate), contenu dans frises/greenfield.json
shared/frise.js, frise.css gabarit commun des frises (dessin de la chronologie, popups)
frises/brownfield.html     frise brownfield (SAP Activate), contenu dans frises/brownfield.json
frises/bluefield.html      frise bluefield (SAP Activate), contenu dans frises/bluefield.json
schemas/                   schémas interactifs (rôles d'un programme SAP), une page par langue (data-langue-fixe, lien rel=alternate vers l'autre langue)
schemas/flux-<nom>.html     principaux flux logistiques (p2p, ptp, o2c, r2r), FR et -en.html ; contenu en JSON dans la page, affichage dans shared/flux.js et flux.css ; P2P et O2C ont la vue « ECC → S/4HANA » (champ s4 de chaque étape, ?vue=s4 l'ouvre)
schemas/ecc-<nom>.html      De ECC à S/4HANA : ecc-s4hana (schéma 0), ecc-entrepot (schéma 2), ecc-changements (schéma 3), FR ; contenu en JSON dans la page (id ecc-data), affichage et popup commune dans shared/ecc.js et ecc.css
contenus/ecc-vs-s4hana.md  dossier de l'expert SAP, source des textes des quatre schémas ECC / S/4HANA (toute retouche de fond passe par l'expert)
lecteur.html               lecteur PDF page par page (PDF.js), lecteur.html?doc=documents/<fichier>.pdf
apercus/<clé>.jpg          aperçu de chaque carte (1re page du PDF via `qlmanage -t`, réduit à 720 px de haut ; frises et schéma des rôles : Chrome headless 1080 × 673 sur `?lang=fr`, avec `--blink-settings=preferredColorScheme=1` pour forcer le thème clair, réduit à 720 de large), à refaire si le support change
apercus/<clé>.en.jpg       aperçu anglais d'une frise (même capture sur `?lang=en`)
documents/                 les supports en PDF, anonymisés (le plan de formation et le script de narration ont été retirés du site)
```

Le site ne demande aucune compilation, mais il doit être servi par un serveur, même local (`python3 -m http.server 8080`) : les textes et le manifeste sont chargés par `fetch`. PDF.js est copié dans `shared/pdfjs/` (version 3.11.174), aucun CDN. `SAP_HREF` dans `shared/documents.js` envoie tout PDF local vers le lecteur.

### La langue (français et anglais)

- Le sélecteur FR / EN est sur chaque page (`<div data-langue></div>`), rempli par `shared/libelles.js`. Langue : `?lang=fr|en` dans l'adresse, sinon le choix mémorisé dans le navigateur, sinon la langue du navigateur (français donne FR, toute autre langue donne EN). Changer de langue recharge la même page.
- Les textes anglais viennent de `shared/libelles/en.json`, `glossaire.en.json` et `frises/<nom>.en.json`. Un texte ou un terme absent en anglais s'affiche en français ; une frise sans fichier anglais s'affiche en français.
- Documents : en anglais, un document qui a une version anglaise (`versionEn`) est remplacé par elle, et cette version n'apparaît pas une seconde fois sur l'accueil. Un document resté en français porte l'étiquette « In French », et le lecteur l'annonce par un bandeau.
- Le contrôle (`node outils/verifier.mjs`) vérifie que chaque fichier anglais reste aligné sur le français.

### Le manifeste des documents

`documents.json` contient deux blocs :

- `documents` : une entrée par support, sous une clé courte (`synth`, `mig`…). Champs : `type` (`deck`, `doc`, `frise`, `schema`, `act`, `prat`, libellés dans `shared/libelles/fr.json` sous `types`), `titre`, `description`, `fichier` (chemin depuis la racine du site), `langue` (`fr`, `en` ou `fr en`), `versionEn` (clé de la version anglaise), `en` (titre et description en anglais).
- `vueS4` (facultatif) : `true` pour un flux qui a la vue « ECC → S/4HANA » ; sa carte d'accueil porte l'étiquette.
- `accueil` : l'ordre des cartes dans les six sections de l'accueil (`parcours`, `ecc`, `flux`, `frises`, `certification`, `autres`), par clé. Une nouvelle section demande aussi son bloc dans `index.html`, ses libellés et son ancre dans `ANCRES` de `shared/entete.js`.

Ajouter un document :

1. Déposer le PDF dans `documents/` (nom en minuscules, sans espace ni accent).
2. Ajouter une entrée dans `documents` avec une nouvelle clé.
3. Ajouter la clé dans une section de `accueil` pour qu'une carte apparaisse.
4. Optionnel : un aperçu `apercus/<clé>.jpg` (sinon la carte s'affiche sans image).

Le lecteur n'ouvre que les PDF listés dans le manifeste et rangés sous `documents/`.

### Publier

1. `node outils/version.mjs` : nouveau numéro de version sur les scripts et le style, pour que le navigateur ne garde pas d'anciens scripts (GitHub Pages autorise 10 minutes de cache).
2. `node outils/verifier.mjs` : aucune erreur.
3. Accord de Walid, commit, envoi sur `main`. Les fichiers JSON sont toujours revalidés par le navigateur (`cache: 'no-cache'`), ils n'ont pas besoin de numéro.

### Le glossaire

- Fixé à droite sur grand écran (au-delà de 1100 px), tiroir sur petit écran. Bouton « Masquer », bouton flottant « Glossaire », raccourci « / ».
- Les termes sont dans `glossaire.json`, tableau `termes`, un terme par ligne. Champs : `terme`, `nomComplet` (peut être vide), `categorie`, `definition`, `pourLeDP` (peut être vide), `documents` (liste de clés de `documents.json`). Exemple :
  `{"terme":"Cutover","nomComplet":"Bascule","categorie":"test","definition":"…","pourLeDP":"…","documents":["synth","rollout"]}`
- Catégories : `meth`, `proc`, `tech`, `data`, `test`, `run`, `agile` (libellés dans `shared/libelles/fr.json`, sous `categories`).
- Si `glossaire.json` ne se charge pas, le panneau affiche un message d'erreur au lieu de la liste.
- Les clés de documents renvoient à `documents.json`. Un lien local (sans `http`) est résolu par rapport à la racine du site.
- La recherche ignore les accents et cherche aussi dans les définitions.
- Dans le contenu des schémas, `**terme**` devient un bouton qui ouvre le glossaire sur ce terme (`data-gl-terme`). `verifier.mjs` refuse un terme absent du glossaire.

### De ECC à S/4HANA (lot 5, B-007)

Section de l'accueil juste après le parcours conseillé (`accueil.ecc` : `s0`, `s2`, `s3`), pastille « Nouveau », puis une ligne qui renvoie à la vue « ECC → S/4HANA » de P2P et O2C. Textes repris de `contenus/ecc-vs-s4hana.md`, sans réécriture.

- Schéma 0, `schemas/ecc-s4hana.html` : six rangées ECC / S/4HANA (`rangees` : `id`, `dimension`, `qui`, `ecc`, `s4`, `enEcc`, `enS4`, `concret`, `exemple`, `dp`) et le bandeau « Passer de l'un à l'autre » (`bandeau` : mêmes champs, plus `echeances` et `chemins`).
- Schéma 2, `schemas/ecc-entrepot.html` : trois questions, quatre options. Les règles d'estompage sont dans le JSON de chaque option : `ecarte` et `etudier`, listes de `{si, pourquoi}` ; `si` vaut par exemple `q1=non`, `q3=oui&q2!=oui`, ou `*` (au moins une réponse). Ligne de temps : `ligne.evenements` (`date` ISO, `ancien` pour une date dépassée) ; le repère « Aujourd'hui » suit la date du jour.
- Schéma 3, `schemas/ecc-changements.html` : 13 cartes en trois colonnes (`c` : `dis`, `rep`, `obl`), `dom` (domaines du filtre, `*` = tous), `pre` (préalable à la conversion), `lien` facultatif.
- Schéma 1 : dans `schemas/flux-p2p.html` et `flux-o2c.html`, chaque étape a un champ `s4` : `impact` (`faible`, `moyen`, `fort`), `de` (bas de la fourchette, facultatif), `precision` (facultatif), `ecc`, `s4`, `qui`, `dp`, `lien`. La bascule n'apparaît que si le flux a ces données.
- Popup commune (`shared/ecc.js`) : Précédent / Suivant, Échap, focus rendu à l'élément cliqué, panneau du bas sur téléphone. Textes d'interface sous `ecc` dans `shared/libelles/fr.json`.
- Les dates sont celles lues le 26/11/2026 par l'expert SAP ; les points « à vérifier » du dossier restent affichés comme tels.

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
| `couleurParade` (facultatif) | couleur de l'étiquette « Parade », indice de la palette ; `--c5` (vert) par défaut, choisi par Walid le 24/11/2026 |
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

Les popups ont une navigation Précédent / Suivant, un bouton « Suivre l'exemple pas à pas » et l'en-tête commun de Jalon en haut de page (logotype, fil d'Ariane, FR / EN). Clavier : Entrée ou Espace sur un élément de la chronologie, Échap pour fermer.

## Les autres supports (à récupérer en PDF)

Ces documents existent comme artefacts privés sur claude.ai. Claude Code peut les lire et les exporter (outil Artifact, connecteur des documents), puis les anonymiser avant de les déposer dans `documents/`. Les decks ne s'exportent pas toujours : Walid les exporte alors lui-même en PDF.

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

Hors site, volontairement : un schéma de paysage logistique propre au client (confidentiel). Le schéma des rôles d'un programme SAP est intégré (`schemas/`, FR et EN), après contrôle : aucune information client.

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
3. **Manifeste des documents** : fait le 24/11/2026 (`documents.json`, US-003). Contrôle automatique fait (US-008) : avant de publier une modification des données, lancer `node outils/verifier.mjs` ; GitHub le relance à chaque envoi et signale le fichier et la ligne en cause.
4. **Glossaire en JSON** : fait le 24/11/2026 (`glossaire.json`, US-004).
5. **Frises industrialisées** : un seul gabarit + un fichier JSON par frise. Fait pour les quatre frises (US-005 à US-007).
6. **eLearning** : quiz par module, suivi de progression, accès par compte.

## Points ouverts

- Vérifier que « Jalon » n'est pas déjà déposé (INPI, EUIPO, classe 41) avant une diffusion large : à faire par Walid.
- Convertir le mot « Jalon » du logotype en tracés : demande d'installer fontTools, en attente de l'accord de Walid.
- Contrôler l'aperçu de partage avec LinkedIn Post Inspector.
- Lot 5 (De ECC à S/4HANA) : le deck `mig` n'est pas à jour sur deux points (transition option jusqu'en 2035 sous conditions ; compatibility packs arrêtés le 31/05/2026 hors contrat cloud), alors que le schéma 0 y renvoie. Publié quand même sur décision de Walid du 27/11/2026 ; à corriger par Walid (US-058). Versions anglaises à faire (US-055 à US-057). Durée de la pastille « Nouveau » : selon Q8 du lot 4, pas encore tranchée.
- Lot 4 : Walid choisit parmi les besoins B-003 à B-010 de `besoins.md` (B-007, flux logistiques, en partie couvert par la section « Principaux flux logistiques »).
- Flux Order-to-Cash : l'exemple cite « une compagnie aérienne » ; à remplacer par « un client industriel » si Walid le souhaite.
- Les PDF sont des copies anonymisées des supports claude.ai (les originaux citent le client, l'employeur et des sites réels). Si un original change, il faut refaire l'export puis l'anonymisation avant de remplacer le PDF.
