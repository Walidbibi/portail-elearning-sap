# Backlog du portail

Ce fichier est le point d'échange entre les agents et Walid. Chaque agent lit la story, fait son travail, puis laisse une ligne dans son « Journal » et met à jour le statut. Le suivant reprend à partir de là.

## Le circuit

| Statut | Qui agit | Ce qu'il produit |
|---|---|---|
| (avant la story) | agent `persona-pm` (mode besoins) et Walid | un besoin dans `besoins.md` |
| À affiner | agent `po` | la story, ses critères d'acceptation |
| Prête pour maquette | agent `ux-ui` | `maquettes/US-XXX-<sujet>.html` |
| Maquette prête | **Walid** | validation ou demandes de reprise dans le journal |
| Validée | session principale (dev) | le code, testé en local |
| À tester | agent `persona-pm` (mode test) | `rapports/<date>-<sujet>.md` |
| Prête à publier | **Walid** | « publie » |
| Fait | | en ligne |

Une story sans maquette (données, outillage) passe directement de « À affiner » à « Validée » après accord de Walid.

## Format d'une story

```
### US-001 · Titre court
- Statut : À affiner
- Priorité : haute | moyenne | basse (décidée par Walid)
- Taille : S | M | L
- Maquette nécessaire : oui | non
- Dépend de : US-…
- Sert : B-…

En tant que …, je veux … afin de …

Critères d'acceptation
- [ ] …
- [ ] …

Journal
- 2026-11-24 · po · story créée
```

## Stories

### Note du PO sur le besoin servi

Les stories US-001 à US-018 viennent d'une demande directe de Walid, le 2026-11-24 : « Version anglaise du portail. D'abord séparer le texte et la mise en page, ensuite traduire. » Ce besoin est inscrit dans `besoins.md` sous le numéro B-001 (2026-11-24). Le texte proposé par le PO est conservé ci-dessous pour mémoire.

```
### B-001 · Un portail lisible en anglais
- Source : Walid
- Importance : important (à confirmer par Walid)
- Couvert par : US-001 à US-018

Situation : le portail peut devenir public et être montré à des recruteurs ou à des équipes internationales.
Ce qui bloque : tout le texte est en français et mêlé au code des pages. Traduire aujourd'hui, c'est dupliquer chaque page.
Ce que je voudrais pouvoir faire : basculer tout le portail en anglais d'un clic, après avoir séparé le texte de la mise en page.
```

Les priorités indiquées sont des propositions. Walid décide.

## Lot 1 · Séparer le texte et la mise en page

Règle commune au lot : aucun changement visible. Chaque story se termine par une comparaison avec les captures de référence de US-001.

### US-001 · Captures de référence avant refonte
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : aucune
- Sert : B-001

En tant que Walid, je veux des captures de toutes les pages avant toute refonte afin de prouver que le lot 1 ne change rien à l'écran.

Critères d'acceptation
- [x] Une capture existe pour l'accueil, les quatre frises et le lecteur (avec un PDF ouvert).
- [x] Chaque page est capturée en thème clair et en thème sombre.
- [x] Chaque page est capturée en largeur bureau (1440 px) et téléphone (390 px).
- [x] Pour chaque frise, une capture montre la popup de la première étape ouverte.
- [x] Une capture montre le glossaire avec une recherche (« cutover ») et un terme déplié.
- [x] Les captures sont rangées dans un dossier de référence, hors du site publié.
- [x] La commande pour refaire les captures est écrite dans le dossier, en une ligne par page.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `outils/captures/captures.mjs` (44 captures), `comparer.mjs` (comparaison pixel par pixel), `LISEZMOI.md` (une commande par page). Images dans `outils/captures/reference/`, exclues de git donc non publiées. Stabilité vérifiée : deux passages identiques au pixel. Pas de test persona-pm : aucun changement visible. Suite : Walid valide la publication ; US-002 peut démarrer.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critères remplis. Détail : nommer dans `LISEZMOI.md` le commit d'où vient la référence. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-002 · Fichier de libellés : accueil, glossaire, lecteur
- Statut : Fait
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non
- Dépend de : US-001
- Sert : B-001

En tant que Walid, je veux que tous les textes d'interface et de l'accueil soient dans un seul fichier de libellés afin de pouvoir les traduire sans toucher aux pages.

Critères d'acceptation
- [x] Un fichier de libellés français existe (par exemple `shared/libelles/fr.json`), avec une clé par texte.
- [x] L'accueil lit dans ce fichier : surtitre, titre, introduction, titres et sous-titres de section, pied de page, titre de l'onglet.
- [x] Le glossaire lit dans ce fichier : titre, bouton « Masquer », bouton flottant, texte d'aide de la recherche, compteur, libellé « Pour le DP » (aujourd'hui écrit dans le CSS), textes pour lecteurs d'écran.
- [x] Le lecteur lit dans ce fichier : « ← Portail », « Télécharger », « Chargement… », aide clavier, les trois messages d'erreur, textes pour lecteurs d'écran, titre de l'onglet.
- [x] Une recherche des mots français de l'interface dans `index.html`, `lecteur.html` et `shared/glossaire.js` ne trouve plus de texte en dur (hors commentaires).
- [x] Si une clé manque, la page affiche la clé elle-même et non un vide, pour repérer l'oubli.
- [x] Rendu identique aux captures de US-001 pour l'accueil, le glossaire et le lecteur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `shared/libelles/fr.json` (34 clés) et `shared/libelles.js` (chargeur, attributs `data-t`, `data-t-aria`, `data-t-placeholder`, fonction `SAP_T`). « Pour le DP » sort du CSS vers une balise. Les frises chargent aussi `libelles.js`, pour leur glossaire. Captures : 44 sur 44 identiques à la référence. Vérifié dans le navigateur : titres d'onglet, textes pour lecteurs d'écran, message « document introuvable », recherche sans résultat, clé absente affichée telle quelle, aucune erreur en console. Suite : US-003.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Ouvert par double-clic, la page n'affiche que des clés et aucune explication (le message d'aide est lui-même dans `fr.json`). Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-003 · Manifeste des documents
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-002
- Sert : B-001

En tant que Walid, je veux que la liste des documents soit dans un fichier `documents.json` afin d'ajouter un support en déposant un fichier et une ligne, sans toucher au code.

Critères d'acceptation
- [x] `documents.json` contient les 13 entrées actuelles de `SAP_DOCS` : clé, type, titre, description, fichier.
- [x] Les libellés de type (Deck, Doc, Frise, Certification, Pratique) sont dans le fichier de libellés de US-002.
- [x] L'ordre des trois sections de l'accueil (parcours conseillé, frises, autres supports) est décrit dans le manifeste, plus dans le script de l'accueil.
- [x] `SAP_DOCS` n'existe plus dans `glossaire-data.js`.
- [x] Le lecteur n'ouvre toujours que les fichiers PDF listés dans le manifeste, sous `documents/`.
- [x] Les liens « documents » des termes du glossaire fonctionnent tous.
- [x] Le `CLAUDE.md` décrit le format du manifeste et la marche à suivre pour ajouter un document.
- [x] Rendu identique aux captures de US-001.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `documents.json` (13 documents, ordre des trois sections de l'accueil), `shared/documents.js` (chargeur et `SAP_HREF`), libellés de type dans `fr.json` sous `types`. `SAP_DOCS`, `SAP_KL` et `SAP_U` (inutilisé) retirés de `glossaire-data.js`. Captures : 44 sur 44 identiques (un écart de 1 à 2 pixels au premier passage a disparu à la relance). Vérifié : les 129 liens du glossaire (8 documents) répondent, le lecteur refuse un fichier hors manifeste, aucune erreur en console. CLAUDE.md décrit le manifeste et l'ajout d'un document. Suite : US-004.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critères remplis. Gênant : `documents.json` cassé donne un accueil vide sans message ; marche à suivre sans mention des virgules, de la règle des clés ni du contrôle. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-004 · Glossaire en JSON
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-003
- Sert : B-001

En tant que Walid, je veux que les termes du glossaire soient dans un fichier `glossaire.json` afin de pouvoir les traduire et les enrichir sans toucher au code.

Critères d'acceptation
- [x] `glossaire.json` contient les 136 termes, chacun avec des champs nommés : terme, nom complet, catégorie, définition, pour le DP, documents.
- [x] Les libellés des 7 catégories sont dans le fichier de libellés de US-002.
- [x] Le glossaire est chargé par `fetch`, sur toutes les pages.
- [x] La recherche donne les mêmes résultats qu'avant sur trois essais notés dans le journal (par exemple « cutover », « donnees », « RICEFW »).
- [x] Si le fichier ne se charge pas, le glossaire affiche un message clair au lieu d'une liste vide.
- [x] `glossaire-data.js` est supprimé, ou ne contient plus de données.
- [x] Le `CLAUDE.md` décrit le nouveau format d'un terme.
- [x] Rendu identique aux captures de US-001.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `glossaire.json` (136 termes, champs nommés, un terme par ligne), chargé par `fetch` dans `shared/glossaire.js` ; libellés des 7 catégories et message d'erreur dans `fr.json` ; `glossaire-data.js` supprimé et retiré des 6 pages. Recherche identique avant / après : « cutover » 2 termes (Cutover, Deploy) ; « donnees » 18 termes (Archivage … SRA) ; « RICEFW » 2 termes (RICEFW, Service Interface) ; « fit-to-standard » 2 termes (Explore, Fit-to-standard). Fichier absent : message « Le glossaire n'a pas pu se charger… », l'accueil reste utilisable. Captures : 44 sur 44 identiques. Outil de capture renforcé : attente de la fin de construction de la page (sinon faux écart sur les aperçus), écarts de 5 pixels ou moins classés en bruit, zone de l'écart affichée. CLAUDE.md et l'agent persona-pm mis à jour. Suite : US-005.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critère « message clair » rempli sauf en double-clic (la clé `glossaire.erreur` s'affiche) ; le message vise le serveur alors qu'en ligne la cause probable est un JSON cassé. Tri alphabétique automatique non dit dans CLAUDE.md. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-005 · Gabarit de frise unique, appliqué au greenfield
- Statut : Fait
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non
- Dépend de : US-002
- Sert : B-001

En tant que Walid, je veux un seul code d'affichage pour les frises et un fichier JSON par frise afin de corriger ou traduire une frise sans dupliquer le code.

Critères d'acceptation
- [x] Un script et une feuille de style partagés dessinent la frise et ouvrent les popups.
- [x] Le contenu du greenfield est dans un fichier JSON : en-tête de page (surtitre, titre, introduction, exemple fil rouge, bandeau « En continu », causes d'échec, note), phases, étapes et gates, ordre, positions, mois, icônes.
- [x] Le nom de l'entreprise fil rouge (« Calvane ») vient du JSON, plus du code.
- [x] Les textes communs à toutes les frises (Activités, Prérequis, Livrables, Apport de l'IA, Gain, Risques d'échec, Dans l'exemple, Qui porte, Étape, Quality gate, Transverse, Précédent, Suivant, Fermer, « ← Portail », légende, textes pour lecteurs d'écran) viennent du fichier de libellés.
- [x] L'adresse `frises/greenfield.html` reste valide.
- [x] Navigation Précédent / Suivant, bouton « Suivre l'exemple pas à pas », clavier (Entrée, Espace, Échap) : comportement identique.
- [x] Rendu identique aux captures de US-001, popup comprise.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `shared/frise.js` et `shared/frise.css` (gabarit commun), `frises/greenfield.json` (contenu extrait par script, sans recopie), 25 textes communs dans `fr.json` sous `frise` ; `frises/greenfield.html` réduit à une page courte, même adresse. « Risque · » et « Parade · » sortis du CSS. Le gabarit gère déjà largeur, mois et position du go-live : brownfield et bluefield n'ont plus qu'à fournir leur JSON. Captures : 44 sur 44 identiques (un premier écart de 115 pixels, lettres décalées d'une fraction de pixel sur « Exemple fil rouge », corrigé). Comparaison ancienne / nouvelle page dans le navigateur : 22 popups parcourues par Suivant, Précédent, Échap, Entrée, Espace sur le go-live, bandeau « En continu », titre d'onglet, textes pour lecteurs d'écran et textes de la chronologie : aucune différence. Aucune erreur en console. Suite : US-006.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critères remplis. Gênant : champs abrégés (`obj`, `act`, `own`, `aig`…), `eq`, `id` et `x1` non expliqués ; `frise.erreur` vise la mauvaise cause. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-006 · Frises brownfield et bluefield sur le gabarit
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-005
- Sert : B-001

En tant que Walid, je veux que les frises brownfield et bluefield utilisent le gabarit afin de n'avoir plus qu'un code à maintenir pour les frises SAP Activate.

Critères d'acceptation
- [x] Le contenu de chaque frise est dans son propre fichier JSON, au même format que le greenfield.
- [x] Les deux pages ne contiennent plus de code d'affichage propre.
- [x] Les adresses `frises/brownfield.html` et `frises/bluefield.html` restent valides.
- [x] Rendu identique aux captures de US-001, popups comprises.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `frises/brownfield.json` (Ternova) et `frises/bluefield.json` (Alvéa), extraits par script ; les deux pages sont la page courte du greenfield avec leur fichier de contenu. Aucun changement du gabarit nécessaire. Captures : 44 sur 44 identiques. Comparaison ancienne / nouvelle page pour chaque frise : 22 popups, navigation, clavier, bandeau, titres, textes et formes de la chronologie : aucune différence. Aucune erreur en console. Suite : US-007.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critères remplis. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-007 · Frise roll-out sur le gabarit
- Statut : Fait
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non
- Dépend de : US-006
- Sert : B-001

En tant que Walid, je veux que la frise roll-out utilise aussi le gabarit afin que les quatre frises partagent le même code.

Critères d'acceptation
- [x] Le gabarit accepte un nombre de phases variable (cinq pour le roll-out, six pour SAP Activate).
- [x] Le gabarit accepte des gates nommées autrement que « Quality gate » (G1 à G3 pour le roll-out), avec leur libellé dans le JSON.
- [x] Le contenu du roll-out est dans son fichier JSON.
- [x] L'adresse `frises/rollout.html` reste valide.
- [x] Le `CLAUDE.md` décrit le format JSON d'une frise et la marche à suivre pour en ajouter une.
- [x] Rendu identique aux captures de US-001, popups comprises.
- [x] Les quatre frises sont de nouveau comparées aux captures en fin de story.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `frises/rollout.json` (Nordval, 5 phases, gates G1 à G3) ; le gabarit accepte trois réglages facultatifs : `nomGate` (« Gate de passage »), `couleurs` (couleur de chaque phase dans la palette), `couleurParade`. `rollout.html` est la page courte commune. Écart de l'original conservé : dans le roll-out, l'étiquette « Parade » est verte ; elle est rouge dans les trois autres frises. À trancher par Walid. Comparaison ancienne / nouvelle page : 19 étapes, navigation, clavier, bandeau, textes, formes et couleurs calculées de la chronologie et des popups : aucune différence. Comparaison finale des quatre frises et de toutes les pages : 44 captures sur 44 identiques. L'outil de capture attend désormais les cartes de l'accueil et répète le chargement des aperçus (faux écarts intermittents sur l'accueil, stable sur trois passages). CLAUDE.md décrit le format JSON d'une frise et l'ajout d'une frise. Suite : US-008.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critères remplis. Ajouter une frise reste un geste de développeur (icônes SVG obligatoires, `x1`, aperçu par Chrome headless) : à dire dans le mode d'emploi. Couleur de « Parade » à trancher : à inscrire dans les questions du lot. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### US-008 · Contrôle automatique des fichiers de données
- Statut : Fait
- Priorité : basse (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-004, US-007
- Sert : B-001

En tant que Walid, je veux qu'une vérification automatique signale un fichier manquant ou un JSON cassé afin de pouvoir mettre à jour le site sans code et sans risque.

Critères d'acceptation
- [x] Une GitHub Action se lance à chaque envoi sur la branche principale. (Constaté le 2026-11-24 sur GitHub : exécution réussie au premier envoi.)
- [x] Elle échoue si un fichier cité dans le manifeste n'existe pas.
- [x] Elle échoue si un JSON du site est mal formé.
- [x] Elle échoue si un terme du glossaire cite une clé de document absente du manifeste.
- [x] Le message d'échec nomme le fichier et la ligne en cause, en français.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette
- 2026-11-24 · session principale · livrée : `outils/verifier.mjs` (Node, sans dépendance) et `.github/workflows/verifier.yml` (à chaque envoi et pull request sur main). Contrôles : 7 JSON bien formés (ligne et colonne de l'erreur) ; fichiers du manifeste présents, PDF rangés sous `documents/` ; sections de l'accueil ; types et catégories connus ; clés de documents du glossaire ; termes en double ; cohérence de chaque frise (ordre, positions, gates, go-live, icônes, phases, étape transverse) ; textes d'interface utilisés présents dans `fr.json`. Aperçu manquant : simple avertissement. Messages en français, avec annotation GitHub sur le fichier et la ligne. Testé sur une copie du site avec 5 erreurs injectées (JSON cassé, PDF absent, clé de document inconnue, étape inconnue dans une frise, texte supprimé) : toutes trouvées à la bonne ligne, code de sortie 1 ; site réel : aucune erreur. Non vérifié : l'exécution sur GitHub, qui demande un envoi (push). Suite : lot 1 terminé ; Walid valide la publication, puis maquette ux-ui de US-009.
- 2026-11-24 · persona-pm · testé avec le lot 1 : prêt avec réserves. Critère « l'Action se lance à chaque envoi » coché sans preuve (journal : non vérifié). Le contrôle passe après la publication : « sans risque » devient « avec alerte ». Messages clairs ; ajouter « regardez aussi la fin de la ligne précédente » pour un JSON mal formé. Rapport : [rapports/2026-11-24-lot-1-separation-texte.md](rapports/2026-11-24-lot-1-separation-texte.md)
- 2026-11-24 · session principale · publiée sur accord de Walid (« Oui, publie »)

### Questions du lot 1 (tranchées par Walid)

- Q1 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Faut-il accepter que le site ne s'ouvre plus par simple double-clic sur `index.html` ? Le chargement des JSON par `fetch` demande un serveur, comme le lecteur aujourd'hui. Option recommandée : oui. GitHub Pages sert le site, et `python3 -m http.server 8080` suffit en local. Autre option : garder les données dans des fichiers `.js`, qui marchent sans serveur mais sont moins faciles à éditer.
- Q2 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Le contrôle automatique (US-008) est-il voulu dès maintenant ? Option recommandée : oui, mais après le reste du lot. Il protège les mises à jour sans code.

## Lot 2 · Traduire

Règles communes au lot :
- Les noms fictifs (Nordval, Calvane, Ternova, Alvéa) restent identiques.
- Les termes SAP gardent leur nom anglais officiel (phases, outils, produits). Les faits datés ne changent pas à la traduction.
- Aucune page ne présente de défilement horizontal en anglais, sur téléphone comme sur bureau.

### US-009 · Sélecteur de langue FR / EN et choix mémorisé
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : oui
- Dépend de : US-007, Q3, Q4
- Sert : B-001

En tant que visiteur, je veux choisir le français ou l'anglais sur n'importe quelle page afin de lire le portail dans ma langue sans chercher.

Critères d'acceptation
- [ ] Un sélecteur FR / EN est visible sur l'accueil, les frises et le lecteur, à l'endroit fixé par la maquette.
- [ ] Le sélecteur est utilisable au clavier et annoncé par les lecteurs d'écran.
- [ ] Le choix est mémorisé dans le navigateur et s'applique aux pages suivantes et à la visite suivante.
- [ ] L'adresse avec `?lang=en` ou `?lang=fr` force la langue, pour partager un lien (selon la réponse à Q3).
- [ ] À la première visite, la langue suit la règle décidée par Walid (Q4).
- [ ] L'attribut `lang` de la page et le titre de l'onglet suivent la langue choisie.
- [ ] Un fichier de libellés anglais vide ou incomplet n'empêche rien : tout texte manquant s'affiche en français.
- [ ] Changer de langue ne fait pas perdre la position : la même page reste ouverte.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Prête pour maquette » sur accord de Walid (« Oui, démarre ») ; maquette commune du lot 2 confiée à ux-ui
- 2026-11-24 · ux-ui · maquette prête : [maquettes/US-009-version-anglaise.html](maquettes/US-009-version-anglaise.html), écran 1 (sélecteur sur l'accueil, une frise et le lecteur, bureau et téléphone ; variantes A en haut de page / B flottant en bas à gauche). Suite : validation de Walid.
- 2026-11-24 · Walid · maquette validée (« Ok je valide »), les 10 recommandations retenues ; story en « Validée »
- 2026-11-24 · session principale · livrée : sélecteur FR / EN sur l'accueil, les frises et le lecteur (`shared/libelles.js`, `<div data-langue>`), choix mémorisé, `?lang=`, langue du navigateur à la première visite, `lang` de la page et titre d'onglet suivis, texte anglais manquant affiché en français, même page après changement. Vérifié dans le navigateur (clic, mémoire, retour au français dans le lecteur sur le même document), sans débordement sur téléphone en français ni en anglais.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Sélecteur conforme à la maquette sur les captures ; clavier, mémoire et `?lang=` non vérifiables sans navigateur. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-010 · Interface et accueil en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : oui (la même que US-009 : l'accueil et une frise en anglais)
- Dépend de : US-009, Q5, Q6
- Sert : B-001

En tant que visiteur anglophone, je veux l'accueil, le glossaire, le lecteur et les boutons des frises en anglais afin de naviguer sans connaître le français.

Critères d'acceptation
- [ ] Le fichier de libellés anglais contient toutes les clés du fichier français.
- [ ] Le portail s'appelle « SAP Program Director's Portal » et le libellé « Pour le DP » devient « For the Program Director » (Q5).
- [ ] Les titres et descriptions des 13 documents existent en anglais dans le manifeste.
- [ ] Les libellés des 7 catégories du glossaire existent en anglais.
- [ ] Aucun bouton ni étiquette ne déborde ou ne passe à la ligne de façon imprévue, sur téléphone et sur bureau.
- [x] Walid a relu les textes de l'accueil et le nom du portail.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Prête pour maquette » sur accord de Walid (« Oui, démarre ») ; maquette commune du lot 2 confiée à ux-ui
- 2026-11-24 · ux-ui · maquette prête : [maquettes/US-009-version-anglaise.html](maquettes/US-009-version-anglaise.html), écrans 2 et 3 (accueil et glossaire en anglais, type « Timeline », nom français affiché à côté du terme). Textes anglais indicatifs, à relire par Walid. Suite : validation de Walid.
- 2026-11-24 · Walid · maquette validée (« Ok je valide »), les 10 recommandations retenues ; story en « Validée »
- 2026-11-24 · session principale · livrée : `shared/libelles/en.json` (toutes les clés de fr.json, textes de la maquette validée et des traductions de Walid), titres et descriptions anglais des documents dans `documents.json` (bloc `en`), catégories anglaises. Reste : relecture de l'accueil par Walid (Q8).
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Critère « Walid a relu » non rempli. Gênant : « warning thresholds » face à « Alert threshold » ; « Fix » face à « Countermeasure ». Reformulations proposées pour en.json et documents.json. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-011 · Glossaire en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (contenu seul, dans le glossaire existant)
- Dépend de : US-010
- Sert : B-001

En tant que visiteur anglophone, je veux les 136 définitions du glossaire en anglais afin de comprendre le jargon SAP dans ma langue.

Critères d'acceptation
- [ ] Chaque terme a en anglais : nom complet, définition, « pour le DP ».
- [ ] Les termes qui ont un nom anglais officiel le gardent. Les termes français (par exemple « bascule ») ont un équivalent anglais, et le terme français reste trouvable par la recherche.
- [ ] En anglais, la recherche porte sur les textes anglais et ignore toujours les accents.
- [ ] Un terme sans traduction s'affiche en français plutôt que de disparaître.
- [ ] Les liens vers les documents suivent la règle de US-012.
- [ ] Walid a relu un échantillon de 15 termes, dont tous ceux qui citent une date ou un nom de produit.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · traduction fournie par Walid : artefact « SAP Program Director Glossary (EN) » (https://claude.ai/artifact/MSH7TmrtZqBFQcoGscnMUs) : 136 termes dans le même ordre que glossaire.json, mêmes catégories, définition et « pour le DP » complets ; 37 termes renommés avec le nom français affiché à côté ; pas de clés de documents (reprendre celles du français). Contrôlé : aucun texte resté en français, aucun nom client.
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« Oui, démarre ») : contenu seul, sans maquette ; fichiers anglais préparés tout de suite, branchés après US-009
- 2026-11-24 · session principale · livrée : `glossaire.en.json` branché ; terme sans traduction affiché en français ; recherche anglaise qui trouve aussi le nom français (« bascule » donne Cutover) ; repère FR quand le nom français n'est pas déjà affiché ; liens vers les documents selon la règle de US-012. Reste : relecture de 15 termes par Walid.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Gênant : le nom français s'affiche comme un nom complet, sans repère FR (« Cutover Bascule », « Batch Lot »), non conforme à l'écran 3 de la maquette ; doublon TMA sur AMS. Relecture des 15 termes non faite. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-012 · Règle pour les documents sans version anglaise
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : oui
- Dépend de : US-010, Q7
- Sert : B-001

En tant que visiteur anglophone, je veux savoir avant d'ouvrir un document s'il est en français afin de ne pas être surpris, et trouver la version anglaise quand elle existe.

Règle proposée (à confirmer par Walid, Q7) :
- Chaque document a une langue dans le manifeste. Un document français peut pointer vers sa version anglaise (`synth` vers `synthEN`, `mig` vers `migEN`).
- En anglais, une carte qui a une version anglaise ouvre la version anglaise. Les doublons disparaissent : la section « Versions anglaises » n'apparaît plus.
- En anglais, un document sans version anglaise reste visible, avec une étiquette « In French ».
- En français, rien ne change.

Critères d'acceptation
- [ ] Le manifeste porte pour chaque document sa langue et, si elle existe, la clé de sa version dans l'autre langue.
- [ ] En anglais, les cartes « Formation SAP · Synthèse » et « Migration ECC vers S/4HANA » ouvrent `synthEN` et `migEN`.
- [ ] En anglais, les documents restés en français (fiche de révision, simulation d'entretien, script de narration) portent l'étiquette « In French ». ACT100 et ACT200 ont une version anglaise (artefacts de Walid) : à exporter en PDF, contrôler et ajouter au manifeste.
- [ ] En anglais, aucun document n'apparaît deux fois sur l'accueil.
- [ ] Les liens du glossaire vers un document suivent la même règle.
- [ ] En français, l'accueil reste identique aux captures de US-001.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Prête pour maquette » sur accord de Walid (« Oui, démarre ») ; maquette commune du lot 2 confiée à ux-ui
- 2026-11-24 · ux-ui · maquette prête : [maquettes/US-009-version-anglaise.html](maquettes/US-009-version-anglaise.html), écran 2 (plus de section « Versions anglaises », étiquette « In French » : variantes A sur l'aperçu / B à côté du type). À noter : ACT100 et ACT200 existent en anglais, donc seuls 3 documents portent l'étiquette (le critère « les 7 autres documents » est à mettre à jour) ; leurs PDF anglais restent à déposer. Suite : validation de Walid.
- 2026-11-24 · Walid · maquette validée (« Ok je valide »), les 10 recommandations retenues ; story en « Validée »
- 2026-11-24 · session principale · règle branchée : langue et `versionEn` dans `documents.json`, cartes Synthèse et Migration vers leur version anglaise, plus de doublon, étiquette « In French », mêmes règles pour les liens du glossaire. Reste avant « À tester » : exporter ACT100 et ACT200 en anglais (artefacts de Walid), les contrôler (aucune info client) et les ajouter au manifeste.
- 2026-11-24 · session principale · ACT100 et ACT200 anglais exportés des artefacts de Walid (`documents/act100-study-guide-en.pdf`, 46 pages ; `documents/act200-study-guide-en.pdf`, 17 pages), texte extrait et contrôlé : aucun nom client (seul l'auteur, comme en français). Ajoutés au manifeste (`actEN`, `act2EN`, `versionEn` sur `act` et `act2`) avec leurs aperçus. En anglais, seuls la fiche de révision, la simulation d'entretien et le script de narration portent « In French ». Point ouvert : ces deux PDF sont en orthographe britannique (environ 40 et 23 occurrences : programme, organised, centre…), alors que Q6 retient l'anglais américain.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Critères remplis d'après les captures. Gênant : cartes « Study guide », couverture « Revision Book » ; en français, ACT100 / ACT200 anglais sans « (EN) » ni description française. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-013 · Lecteur PDF : signaler la langue du document
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : oui
- Dépend de : US-012
- Sert : B-001

En tant que visiteur anglophone, je veux que le lecteur me dise quand un document est en français afin de comprendre pourquoi, et de passer à la version anglaise si elle existe.

Critères d'acceptation
- [ ] En anglais, un document français affiche un bandeau court : « This document is in French. »
- [ ] Si une version anglaise existe, le bandeau propose un lien vers elle.
- [ ] Le bandeau ne cache pas la page et tient sur téléphone sans défilement horizontal.
- [ ] Un lien direct vers un document anglais ne montre aucun bandeau.
- [ ] Le lecteur n'ouvre toujours que les fichiers listés dans le manifeste.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Prête pour maquette » sur accord de Walid (« Oui, démarre ») ; maquette commune du lot 2 confiée à ux-ui
- 2026-11-24 · ux-ui · maquette prête : [maquettes/US-009-version-anglaise.html](maquettes/US-009-version-anglaise.html), écran 4 (bandeau d'une ligne sous la barre du lecteur, dans le flux, sans bouton fermer ; lien « Open the English version → » quand elle existe). Suite : validation de Walid.
- 2026-11-24 · Walid · maquette validée (« Ok je valide »), les 10 recommandations retenues ; story en « Validée »
- 2026-11-24 · session principale · livrée : bandeau « This document is in French. » sous la barre du lecteur, lien « Open the English version → » quand une version anglaise existe ; aucun bandeau sur un document anglais ; lecteur toujours limité au manifeste.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Bandeau conforme, tient sur téléphone. Gênant : sans version anglaise, rien ne dit pourquoi le document est en français (proposer « No English version yet. »). Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-014 · Frise greenfield en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (contenu seul ; mise en page couverte par la maquette de US-009)
- Dépend de : US-010, Q6
- Sert : B-001

En tant que visiteur anglophone, je veux la frise greenfield en anglais afin de suivre une implémentation SAP Activate de A à Z.

Critères d'acceptation
- [ ] Un fichier JSON anglais existe pour le greenfield, avec les mêmes clés que le français.
- [ ] Toutes les étapes et gates sont traduites : titre, sous-titre, objectif, activités, prérequis, livrables, qui porte, apport de l'IA, gain, risques, exemple.
- [ ] Les libellés des barres de la chronologie tiennent sans chevaucher leurs voisins.
- [ ] Les chiffres de l'exemple fil rouge restent identiques et présentés comme fictifs.
- [ ] Les montants et dates suivent le format décidé (Q6).
- [x] Walid a relu l'en-tête de page et deux popups.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · traduction fournie par Walid : artefact « SAP greenfield approach (EN) » (https://claude.ai/artifact/4gCZnnTa5BQjP341z3w8vn) : 22 étapes, structure identique à greenfield.json. Contrôlé : aucun texte resté en français, aucun nom client.
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« Oui, démarre ») : contenu seul, sans maquette ; fichiers anglais préparés tout de suite, branchés après US-009
- 2026-11-24 · session principale · livrée : la frise greenfield charge `frises/<nom>.en.json` en anglais (le français si le fichier manque) ; libellés des barres sans chevauchement constaté sur les captures anglaises.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Formats Q6 respectés, chiffres fictifs signalés. Relecture de Walid non faite. Gênant : « Fix » (Parade) à remplacer par « Mitigation ». Détail : titre « migration » face à « new implementation ». Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-015 · Frise brownfield en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (contenu seul)
- Dépend de : US-014
- Sert : B-001

En tant que visiteur anglophone, je veux la frise brownfield en anglais afin de comprendre une conversion de système ECC.

Critères d'acceptation
- [ ] Mêmes critères que US-014, appliqués au brownfield et à l'exemple Ternova.
- [ ] Les termes de conversion gardent leur nom SAP officiel en anglais.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · traduction fournie par Walid : artefact « SAP brownfield approach (EN) » (https://claude.ai/artifact/QUbcavCMmkohcsdZTp1VfZ) : 22 étapes, structure identique à brownfield.json. Contrôlé : aucun texte resté en français, aucun nom client.
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« Oui, démarre ») : contenu seul, sans maquette ; fichiers anglais préparés tout de suite, branchés après US-009
- 2026-11-24 · session principale · livrée : la frise brownfield charge `frises/<nom>.en.json` en anglais (le français si le fichier manque) ; libellés des barres sans chevauchement constaté sur les captures anglaises.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Relecture de Walid non faite ; « Fix » à aligner (« Mitigation »). Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-016 · Frise bluefield en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (contenu seul)
- Dépend de : US-014
- Sert : B-001

En tant que visiteur anglophone, je veux la frise bluefield en anglais afin de comprendre une transition sélective.

Critères d'acceptation
- [ ] Mêmes critères que US-014, appliqués au bluefield et à l'exemple Alvéa.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · traduction fournie par Walid : artefact « SAP bluefield approach (EN) » (https://claude.ai/artifact/4yhJd84oYqtnYEjecAa43M) : 22 étapes, structure identique à bluefield.json. Contrôlé : aucun texte resté en français, aucun nom client.
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« Oui, démarre ») : contenu seul, sans maquette ; fichiers anglais préparés tout de suite, branchés après US-009
- 2026-11-24 · session principale · livrée : la frise bluefield charge `frises/<nom>.en.json` en anglais (le français si le fichier manque) ; libellés des barres sans chevauchement constaté sur les captures anglaises.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Relecture de Walid non faite ; « Fix » à aligner (« Mitigation »). Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-017 · Frise roll-out en anglais
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (contenu seul)
- Dépend de : US-014
- Sert : B-001

En tant que visiteur anglophone, je veux la frise roll-out en anglais afin de comprendre le déploiement d'un core model site par site.

Critères d'acceptation
- [ ] Mêmes critères que US-014, appliqués au roll-out et à l'exemple Nordval.
- [ ] Les noms des phases et des gates du roll-out (Diagnose, Adjust, Deploy, G1 à G3) sont vérifiés et cohérents avec la version française.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · traduction fournie par Walid : artefact « SAP roll-out approach (EN) » (https://claude.ai/artifact/AeNu6YWM39KAabXjgt4M3j) : 19 étapes, structure identique à rollout.json ; gates nommées « Gate ». Contrôlé : aucun texte resté en français, aucun nom client.
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« Oui, démarre ») : contenu seul, sans maquette ; fichiers anglais préparés tout de suite, branchés après US-009
- 2026-11-24 · session principale · livrée : la frise roll-out charge `frises/<nom>.en.json` en anglais (le français si le fichier manque) ; libellés des barres sans chevauchement constaté sur les captures anglaises.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt avec réserves. Phases et gates G1 à G3 cohérentes avec le français. Libellés serrés : « Acceptance » touche G2, « Training » mord sur sa barre, « Handover to run » touche son icône (même chose en français). Relecture de Walid non faite. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### US-018 · Aperçus anglais des cartes
- Statut : Fait
- Priorité : basse (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-012, US-017
- Sert : B-001

En tant que visiteur anglophone, je veux que l'aperçu de chaque carte montre la page dans ma langue afin que l'image corresponde à ce que j'ouvre.

Critères d'acceptation
- [ ] Les quatre frises ont un aperçu capturé en anglais.
- [ ] En anglais, les cartes `synth` et `mig` montrent l'aperçu de leur version anglaise.
- [ ] Les documents français gardent leur aperçu français.
- [ ] Un aperçu manquant ne casse pas la carte (comportement actuel conservé).

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur demande de Walid (« Corrige ça »), puis livrée : aperçus anglais des quatre frises `apercus/<clé>.en.jpg` (Chrome sans fenêtre, 1080 × 673 réduit à 720, comme les français), affichés en anglais avec repli sur l'aperçu français ; aperçus français refaits pour montrer le sélecteur ; synthèse, migration, ACT100 et ACT200 montrent déjà l'aperçu de leur version anglaise. Le contrôle signale une frise sans aperçu anglais.
- 2026-11-24 · persona-pm · testé avec le lot 2 : prêt. Critères remplis d'après les captures ; cas « aperçu manquant » non vérifiable sans navigateur. Rapport : [rapports/2026-11-24-lot-2-version-anglaise.md](rapports/2026-11-24-lot-2-version-anglaise.md)
- 2026-11-24 · Walid · relecture validée et publication accordée (« ok je valide ») ; publiée

### Questions du lot 2 (tranchées par Walid)

- Q3 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Adresse des pages anglaises. Option recommandée : les mêmes pages, la langue venant du choix mémorisé, et `?lang=en` pour partager un lien. Pas de duplication, cohérent avec le lot 1. Autre option : un dossier `/en/` avec des copies des pages, mieux référencé par les moteurs de recherche mais à maintenir en double.
- Q4 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Langue à la première visite. Option recommandée : la langue du navigateur (français donne FR, toute autre langue donne EN). Autre option : français pour tous.
- Q5 · Nom du portail et libellé « Pour le DP » en anglais. **Tranchée par Walid le 2026-11-24 :** « SAP Program Director's Portal » et « For the Program Director ». « For the PM » est écarté : PM désigne aussi le project manager et le module SAP Plant Maintenance.
- Q6 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Variante d'anglais et formats. Option recommandée : anglais américain, comme la documentation SAP (« program », « organization »). Montants au format « €9M », dates au format « April 1 ». Les montants restent en euros.
- Q7 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Documents français : faut-il les traduire ? Option recommandée : non pour l'instant. On applique la règle de US-012 (étiquette « In French » et renvoi vers la version anglaise quand elle existe). Traduire un PDF demande de refaire l'export depuis claude.ai puis l'anonymisation : à traiter plus tard, document par document, en commençant par la fiche de révision et la simulation d'entretien.
- Q8 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Relecture des traductions. Option recommandée : Walid relit l'accueil et une frise (US-010, US-014) avant que les autres soient traduites. Les suivantes reprennent les choix de vocabulaire validés.

## Lot 3 · Identité Jalon et confort de visite

Sources : `rapports/2026-11-24-audit-ux-ui.md` (constats et valeurs), `maquettes/identite-portail.html` (écrans 1 à 9), 14 choix validés par Walid le 2026-11-24 (« Oui, toutes », voir le Journal du backlog). Ces choix ne sont pas rouverts ici.

### Note du PO sur le besoin servi

Le lot 3 vient d'une demande directe de Walid, le 2026-11-24 : audit UX/UI, identité et nom du portail. Aucun besoin de `besoins.md` ne le couvre. Le PO propose le texte ci-dessous, à inscrire sous le numéro B-002 par la session principale (le PO ne modifie que le champ « Couvert par »).

```
### B-002 · Un portail qui inspire confiance et se lit partout
- Source : Walid
- Importance : important (à confirmer par Walid)
- Couvert par : US-019 à US-039

Situation : le portail est public. Walid peut l'envoyer à un recruteur ou à une équipe, qui l'ouvre souvent sur téléphone.
Ce qui bloque : pas de nom ni de logo, un nom qui ressemble à un produit SAP, des textes illisibles en thème sombre, des boutons trop petits, un accueil très long sur téléphone.
Ce que je voudrais pouvoir faire : montrer un portail qui a une identité claire, lisible par tous, agréable sur bureau comme sur téléphone.
```

Règles communes au lot :
- Maquette de référence : `maquettes/identite-portail.html`, validée par Walid. Aucune nouvelle maquette n'est demandée.
- Chaque story est vérifiée en thème clair et sombre, en français et en anglais, à 375 px et à 1440 px de large.
- Aucune page ne défile horizontalement à 375 px.
- `node outils/verifier.mjs` passe sans erreur avant chaque envoi.
- Les captures de référence FR et EN (`outils/captures/`) sont refaites à la fin de chaque story qui change l'écran. Les aperçus des frises sont refaits si une frise change.
- Tout nouveau texte d'interface est dans `fr.json` et `en.json`.
- Le site est en ligne uniquement (GitHub Pages). Walid ne modifie pas les fichiers lui-même : tout passe par Claude.

Ordre de développement proposé : US-019 à US-023 (accessibilité, livrables tout de suite), US-024, US-025, US-027, US-028, US-029, US-026, US-030, US-031, puis US-032 à US-037. US-035 ne dépend que de US-021 : elle peut être avancée.

### Bloc A · Correctifs d'accessibilité

### US-019 · Contrastes des phases de frise et de l'étiquette « Frise »
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 2, palette, et écran 5, frise greenfield)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur, je veux lire les noms des phases et l'étiquette « Frise » dans les deux thèmes afin de ne pas deviner la phase d'une étape.

Critères d'acceptation
- [ ] Thème sombre : le texte des six bandeaux de phase passe en `#12161D` (au lieu du blanc). Chaque couleur de phase atteint au moins 4,5:1 ; les six ratios sont notés au journal.
- [ ] Thème sombre : les pictogrammes posés sur les pastilles de couleur atteignent au moins 3:1.
- [ ] Thème clair : la couleur de Realize passe de `#A86E12` à `#8F5C0C`. Texte blanc dessus : au moins 4,5:1 (attendu 5,7:1).
- [ ] Thème clair : les six bandeaux de phase atteignent au moins 4,5:1 avec leur texte ; les ratios sont notés au journal.
- [ ] L'étiquette de type « Frise » / « Timeline » des cartes de l'accueil utilise `#8F5C0C` en clair : au moins 4,5:1 sur la carte. En sombre, son ratio est vérifié et noté.
- [ ] Les quatre frises sont corrigées, roll-out compris (couleurs choisies par `couleurs` dans son JSON).
- [ ] Les aperçus FR et EN des quatre frises sont refaits.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 6) ; statut « Validée »
- 2026-11-24 · session principale · livrée : Realize `#8F5C0C` en clair, texte et pictogrammes de phase `#12161D` en sombre, étiquette « Frise » `#8F5C0C`. Ratios mesurés, clair texte blanc : Discover / Cadrage 5,91 ; Prepare 6,20 ; Explore / Diagnose 5,52 ; Realize / Adjust 5,67 ; Deploy 5,75 ; Run 5,61. Sombre texte `#12161D` : 7,53 ; 7,68 ; 8,61 ; 9,02 ; 7,33 ; 8,65 (pictogrammes idem). Étiquette « Frise » : 5,67 en clair, 8,04 en sombre. Couleurs constatées dans le navigateur (roll-out compris). Aperçus FR et EN des quatre frises refaits. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : bandes de phase lisibles en clair et en sombre, rien de contraire aux critères. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-020 · Couleur du contour de focus
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 2, palette, nuancier « Focus »)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur qui navigue au clavier, je veux voir nettement l'élément actif afin de savoir où j'en suis sur la page.

Critères d'acceptation
- [ ] Le contour de focus passe de `#E07A2F` à `#C25E12` en clair et à `#F0A35E` en sombre.
- [ ] Ratio du contour sur le fond de page : au moins 3:1 dans les deux thèmes (attendu 3,9:1 en clair, 8,7:1 en sombre).
- [ ] Le changement s'applique à toutes les pages : accueil, quatre frises, popups, lecteur, glossaire, schéma des rôles FR et EN.
- [ ] Schéma des rôles : la règle `.n:focus{outline:none}` disparaît. Un rôle sélectionné au clavier montre le même contour que le reste du site.
- [ ] Un parcours au clavier (Tab) de l'accueil, d'une frise, du lecteur et du schéma montre un contour visible sur chaque élément actif.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 6) ; statut « Validée »
- 2026-11-24 · session principale · livrée : focus `#C25E12` en clair (3,92 sur `#F3F5F8`, 4,28 sur blanc), `#F0A35E` en sombre (8,73 sur `#12161D`) sur l'accueil, les frises, le lecteur, le glossaire, le sélecteur et le schéma des rôles ; `.n:focus{outline:none}` du schéma remplacé par un contour visible au clavier. Constaté dans le navigateur dans les deux thèmes. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : pas de navigation clavier possible sans navigateur, je m'en remets au journal. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-021 · Cibles tactiles de 40 px : glossaire et lecteur
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 7, lecteur, et écran 8, glossaire)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur sur téléphone, je veux des boutons assez grands afin de toucher le bon du premier coup.

Hors de cette story : les pastilles de catégorie du glossaire. À 40 px sur quatre lignes, elles repousseraient la liste de près de 180 px. Elles passent à 40 px dans US-035, sur une seule ligne.

Critères d'acceptation
- [ ] Glossaire : le bouton « Masquer » / « Hide » mesure au moins 40 px de haut (27 px aujourd'hui).
- [ ] Glossaire : chaque lien vers un document mesure au moins 40 px de haut (24 px aujourd'hui), sans se chevaucher.
- [ ] Lecteur : les boutons de page mesurent au moins 40 × 40 px (38 px aujourd'hui).
- [ ] Lecteur : le lien de retour mesure au moins 40 px de haut (31 px aujourd'hui).
- [ ] Les tailles sont mesurées dans le navigateur et notées au journal.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 6) ; statut « Validée »
- 2026-11-24 · session principale · livrée : mesures dans le navigateur : « Masquer » 40 px, lien de document du glossaire 40 px, boutons de page du lecteur 40 × 40 px, lien de retour du lecteur 40 px. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : boutons confortables, rien de contraire aux critères. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-022 · Tiroir du glossaire sur téléphone
- Statut : Fait
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 8, note « Sur téléphone »)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur sur téléphone, je veux un glossaire qui couvre l'écran et se ferme simplement afin de ne pas croire à un défaut d'affichage.

Critères d'acceptation
- [ ] À 375 px et à 390 px, le tiroir ouvert couvre toute la largeur : aucune bande de page visible (10 px aujourd'hui à 390 px).
- [ ] En mode tiroir (sous 1100 px), un voile assombrit la page derrière le glossaire, dans les deux thèmes.
- [ ] Toucher le voile ferme le glossaire. La touche Échap aussi.
- [ ] Sur téléphone, le bouton « Masquer » devient « Fermer » / « Close ».
- [ ] À la fermeture, le focus revient au bouton flottant « Glossaire ».
- [ ] Chaque page réserve en bas une marge égale à la hauteur du bouton flottant : la dernière ligne de contenu n'est plus cachée par lui.
- [ ] Au-delà de 1100 px, le glossaire épinglé ne change pas.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 6) ; statut « Validée »
- 2026-11-24 · session principale · livrée : à 390 px, tiroir 390 px (pleine largeur), voile visible, fermeture par le voile et par Échap, focus rendu au bouton « Glossaire », libellé « Fermer ✕ » / « Close ✕ » en mode tiroir, marge basse de 72 px ; glossaire épinglé inchangé au-delà de 1100 px. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : tiroir plein écran et « Fermer » nets. Détail : « Pour le DP », sigle non expliqué. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-023 · Indice de glissement de la frise sur téléphone
- Statut : Fait
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 6, variante A)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur sur téléphone, je veux savoir que la frise continue hors de l'écran afin de voir toutes les étapes, pas seulement les six premières.

Critères d'acceptation
- [ ] Au-dessus de la frise, sur téléphone, une ligne indique « Faites glisser la frise » / texte anglais dans `en.json`, et l'étendue de la chronologie (par exemple « M-15 → M+2 »), lue dans le JSON de la frise.
- [ ] Un dégradé en bord droit montre que la frise continue. Il disparaît quand on arrive au bout.
- [ ] Sur téléphone, la frise fait 760 px de large au lieu de 980 px.
- [ ] À 760 px, aucun libellé ne chevauche un voisin de plus qu'aujourd'hui, sur les quatre frises, en FR et en EN (les libellés serrés du roll-out, notés au lot 2, ne doivent pas empirer).
- [ ] Le bouton flottant « Glossaire » ne cache aucune partie de la frise, page défilée jusqu'en bas.
- [ ] Sur bureau, la frise ne change pas.
- [ ] Le dégradé ne gêne ni le toucher ni la lecture d'écran (il est décoratif).
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal de la page.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 10, variante A) ; statut « Validée »
- 2026-11-24 · session principale · livrée : sur téléphone, frise de 760 px, indice « Faites glisser la frise · M-15 → M+2 » (« Swipe the timeline » en anglais), dégradé au bord droit (opacité 1) qui disparaît au bout (opacité 0) ; indice caché sur bureau ; page sans débordement à 390 px. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : indice clair. Gênant : en cours de défilement, le bouton « Glossaire » couvre la chronologie là où l'on fait glisser (point 3). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### Bloc B · Socle

### US-024 · Un seul fichier de couleurs partagé
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 2, palette)
- Dépend de : US-019, US-020
- Sert : B-002

En tant que Walid, je veux que les couleurs soient définies une seule fois afin qu'une retouche s'applique partout sans dérive entre les pages.

Critères d'acceptation
- [ ] Un fichier `shared/theme.css` définit toutes les couleurs, en thème clair et sombre, avec un seul nom par couleur.
- [ ] Il contient la palette validée (accent A) : encre `#17202E` / `#E9EDF3`, sarcelle `#1B7287` / `#5FC0D4`, bleu nuit de marque `#16213A` / `#0D1526`, ambre du jalon `#B45309` / `#F2B05E`, focus et Realize de US-019 et US-020, fond `#F3F5F8` / `#12161D`, surface `#FFFFFF` / `#1B212B`.
- [ ] Il déclare aussi l'échelle de 8 tailles (12, 13, 14, 15, 17, 20, 24, 32 px) et les rayons (6, 10, 14 px, pastille pleine), pour les stories suivantes.
- [ ] L'accueil, le lecteur, `frise.css`, le glossaire et les deux fichiers du schéma des rôles chargent ce fichier. Leurs ensembles de couleurs propres disparaissent.
- [ ] Le lecteur prend le fond commun (`#F3F5F8` / `#12161D` au lieu de `#E6EAF0` / `#0E1218`).
- [ ] Le schéma des rôles garde ses teintes propres jusqu'à US-037, mais déclarées dans `theme.css`.
- [ ] `outils/verifier.mjs` signale une couleur écrite en dur dans une page ou un script, hors `theme.css`. Les fichiers de données JSON ne sont pas concernés.
- [ ] Captures FR et EN : seules différences attendues, le fond du lecteur. Toute autre différence est expliquée au journal.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 4 et 14) ; statut « Validée »
- 2026-11-24 · session principale · livrée : `shared/theme.css` (palette validée, marque `#16213A` / `#0D1526`, jalon `#B45309` / `#F2B05E`, échelle de 8 tailles et 4 rayons, teintes du schéma préfixées `--sch-`) chargé par toutes les pages ; ensembles de couleurs de l'accueil, du lecteur, de `frise.css`, du glossaire et des schémas supprimés ; ombre de la popup renommée `--shadow-fort`. `verifier.mjs` refuse toute couleur en dur hors `theme.css` (0 trouvée). Captures : seul le lecteur change (fond commun) ; l'accueil anglais montre un écart de rendu d'image de 14 000 pixels, invisible à l'œil (zone de l'aperçu « Interview simulation »), stable. Au passage, défaut corrigé : le bandeau de langue du lecteur, vide, restait visible en français (bande grise sous la barre, depuis US-013).
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : couleurs cohérentes d'une page à l'autre, rien de contraire aux critères. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-025 · Polices IBM Plex hébergées sur le site
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (aucun changement visible attendu)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur, je veux que le site ne transmette pas mon adresse IP à Google afin de le consulter sans fuite de données.

Critères d'acceptation
- [ ] Les fichiers woff2 d'IBM Plex Sans et IBM Plex Mono sont copiés dans le site (par exemple `shared/polices/`), comme PDF.js.
- [ ] Les poids copiés couvrent ceux utilisés par le site. IBM Plex Mono a son poids 700 : plus de faux gras sur `#tl .gl-t`.
- [ ] La licence des polices (SIL Open Font License) est copiée à côté des fichiers.
- [ ] Aucune page ne charge plus rien depuis `fonts.googleapis.com` ni `fonts.gstatic.com`. `outils/verifier.mjs` le contrôle.
- [ ] Les polices s'affichent sans texte invisible pendant le chargement (`font-display: swap`).
- [ ] Captures FR et EN identiques à la référence, hors écarts de rendu de quelques pixels notés au journal.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 14) ; statut « Validée »
- 2026-11-24 · session principale · livrée : IBM Plex Sans 400, 500, 600, 700 et IBM Plex Mono 500, 700 (paquet officiel IBM, version 1.1.0 de 2024, la 2.0.0 n'ayant que six jours) dans `shared/polices/` avec la licence SIL OFL, déclarées dans `theme.css` avec `font-display: swap` ; plus aucun appel à Google Fonts sur les 8 pages (contrôlé dans le navigateur et par `verifier.mjs`). Captures : même police, seule la flèche « ← » change légèrement de dessin (version IBM). `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : rien de visible à redire. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-026 · Favicon et aperçu de partage
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 2, logotype A, favicon 16 et 24 px)
- Dépend de : US-028, US-029
- Sert : B-002

En tant que Walid, je veux qu'un lien vers le portail s'affiche avec un titre, une description et une image afin de faire bonne impression quand je l'envoie à un recruteur.

Critères d'acceptation
- [ ] Chaque page a un favicon tiré du monogramme A (losange ambre sur la ligne), lisible à 16 px, en clair et en sombre.
- [ ] Un fichier d'icône pour l'écran d'accueil du téléphone existe (`apple-touch-icon`).
- [ ] Chaque page a des balises de partage : titre, description, image, adresse (Open Graph), et leur équivalent pour les cartes de réseaux sociaux.
- [ ] Titre et description suivent la langue par défaut de la page ; le texte anglais est prêt dans `en.json` si le partage se fait avec `?lang=en`.
- [ ] L'image de partage (1200 × 630 px) montre le nom « Jalon », le logotype et la signature, sans logo ni bleu SAP.
- [ ] Les adresses des balises sont absolues, vers le site GitHub Pages.
- [ ] Un aperçu de partage est vérifié avec un outil de prévisualisation en ligne ; le résultat est noté au journal.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 3 et 14) ; statut « Validée »
- 2026-11-24 · session principale · livrée : favicon SVG, favicon 32 px et apple-touch-icon 180 px tirés du monogramme sur fond bleu nuit ; image de partage `shared/marque/partage.png` 1200 × 630 (nom, logotype, signature FR et EN, sans logo ni bleu SAP), générée depuis `outils/partage.html` ; balises Open Graph et carte de réseau social sur les 8 pages, adresses absolues vers GitHub Pages. Reste : vérifier l'aperçu avec un outil de prévisualisation en ligne, possible seulement après publication. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée (lot 3, « Prêt avec réserves ») : image de partage réussie. Critère non rempli : vérification de l'aperçu en ligne, désormais possible puisque c'est publié (point 6). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-027 · Mention de marque SAP en pied de page
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 1, encadré « Risque de marque », écrans 3 et 4, pied de page)
- Dépend de : aucune
- Sert : B-002

En tant que Walid, je veux dire clairement que le site est indépendant de SAP afin de ne pas laisser croire à un site officiel.

Critères d'acceptation
- [ ] Le pied de page de l'accueil affiche : « Site indépendant. SAP, S/4HANA et SAP Activate sont des marques de SAP SE ; ce site n'est ni affilié à SAP SE ni approuvé par elle. »
- [ ] La version anglaise est dans `en.json` et dit la même chose.
- [ ] Sur téléphone, la mention tient sans débordement (version courte de l'écran 4 acceptée).
- [ ] La phrase actuelle sur les exemples fictifs reste en place.
- [ ] Les règles d'usage des marques publiées par SAP sont relues avant publication. La source et la date de lecture sont notées au journal. Si elles demandent une autre formulation, Walid tranche avant publication.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 14) ; statut « Validée »
- 2026-11-24 · session principale · règles lues sur https://www.sap.com/about/legal/trademark.html (date d'effet : 12 janvier 2026), sections « Partner and other third-party use », « Proper use of trademarks », « Trademark attribution », « Other dos and don'ts ». À retenir : (1) pas de « SAP » dans un nom, un slogan, un nom de domaine ou un logo, ce qui touche la signature validée « Piloter un programme SAP » ; (2) phrase d'attribution obligatoire : « <marques> is/are the trademark(s) or registered trademark(s) of SAP SE or its affiliates in Germany and in other countries » ; (3) symbole ® à la première mention dans le titre et le texte, avec un nom commun (« SAP® software ») ; (4) aucune mention ne doit laisser croire à un parrainage ou une affiliation. Décisions demandées à Walid avant publication.
- 2026-11-24 · session principale · livrée : mention en pied d'accueil, FR et EN, construite sur la phrase d'attribution officielle de SAP (marques de SAP SE ou de ses sociétés affiliées en Allemagne et dans d'autres pays ; site ni affilié, ni parrainé, ni approuvé), sous la phrase sur les exemples fictifs ; symbole ® à la première mention de « SAP » sur l'accueil (surtitre). Sans débordement à 390 px. La signature garde « SAP » par décision de Walid. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : mention lisible en FR et EN. Détail : sur bureau, la signature de l'en-tête est la vraie première mention de « SAP », sans ®. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### Bloc C · Identité

### US-028 · Nom « Jalon » et signature partout
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 1, le nom)
- Dépend de : aucune
- Sert : B-002

En tant que visiteur, je veux un nom court et une signature claire afin de retenir le portail et de comprendre son sujet d'un coup d'œil.

Critères d'acceptation
- [ ] Le nom est « Jalon » en français et en anglais.
- [ ] La signature est « Piloter un programme SAP » en français, « Running SAP programs » en anglais.
- [ ] « Portail SAP du DP » et « SAP Program Director's Portal » ne figurent plus dans le site publié (pages, `fr.json`, `en.json`, `frise.css`, schéma des rôles FR et EN). Une recherche le prouve, notée au journal.
- [ ] Le titre d'onglet de l'accueil est « Jalon · Piloter un programme SAP » / « Jalon · Running SAP programs ». Les autres pages ont « <nom de la page> · Jalon ».
- [ ] « SAP » n'apparaît jamais dans le nom, seulement dans la signature.
- [ ] Le libellé « Pour le DP » / « For the Program Director » du glossaire ne change pas.
- [ ] Les retours « ← Portail » restent en place : ils disparaissent avec US-030.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Rappel : vérification du nom à l'INPI et à l'EUIPO (classe 41) avant toute diffusion large (choix 1). Ce n'est pas un critère de la story, mais un point à suivre par Walid.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 1 et 2) ; statut « Validée »
- 2026-11-24 · session principale · livrée : nom « Jalon », signature « Piloter un programme SAP » / « Running SAP programs » (`portail.nom`, `portail.signature`) ; onglets « Jalon · Piloter un programme SAP » sur l'accueil, « <page> · Jalon » ailleurs (frises, lecteur, schémas). Recherche de « Portail SAP du DP » et « SAP Program Director's Portal » dans les pages, scripts, JSON et schémas : 0 résultat. Le titre de l'accueil dit « Jalon » en attendant le bandeau d'entrée (US-032). `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : nom et signature clairs sur bureau, FR et EN. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-029 · Logotype Jalon
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 2, logotype A)
- Dépend de : US-024
- Sert : B-002

En tant que visiteur, je veux un signe reconnaissable afin d'identifier le portail sur chaque page et dans un onglet.

Critères d'acceptation
- [ ] Le logotype A existe en SVG dans le site : losange ambre posé sur une ligne de temps, suivi du mot « Jalon ».
- [ ] Le mot « Jalon » est converti en tracés : le logotype ne dépend pas de la police.
- [ ] Un monogramme seul (losange sur la ligne) existe pour les petites tailles et reste lisible à 16 px.
- [ ] Le logotype a une version claire (ambre `#B45309`) et une version sombre (ambre `#F2B05E`), prises dans `theme.css`.
- [ ] Il n'utilise ni bleu SAP ni forme rappelant un logo SAP.
- [ ] Il porte un texte alternatif « Jalon » pour les lecteurs d'écran.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 3) ; statut « Validée »
- 2026-11-24 · session principale · livrée : `shared/marque/logotype.svg` (losange ambre sur la ligne, puis « Jalon »), `monogramme.svg`, versions claire et sombre, texte alternatif « Jalon », ni bleu ni forme SAP. Écart : le mot « Jalon » est écrit avec IBM Plex Sans Bold (hébergée sur le site), pas encore converti en tracés : aucun outil de conversion de police n'est installé sur le Mac ; l'installer (fontTools) demande l'accord de Walid. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : logotype sobre et reconnaissable ; tracés hors champ (décision de Walid). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-030 · En-tête commun sur toutes les pages
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écrans 3, 5, 6, 7 et 9, en-têtes)
- Dépend de : US-021, US-024, US-028, US-029
- Sert : B-002

En tant que visiteur, je veux le même en-tête partout afin de savoir où je suis et de revenir à l'accueil sans chercher.

Critères d'acceptation
- [ ] Un seul code dessine l'en-tête, pour l'accueil, les quatre frises, le lecteur et le schéma des rôles FR et EN.
- [ ] L'en-tête contient : le logotype (lien vers l'accueil), un fil d'Ariane, le sélecteur FR / EN à droite.
- [ ] Sur l'accueil bureau, la signature suit le logotype ; il n'y a pas de fil d'Ariane.
- [ ] Le fil d'Ariane nomme la section d'origine et la page : « Frises / Greenfield », « Parcours / Formation SAP · Synthèse », « Parcours / Rôles ». Le lien de section ramène à la bonne section de l'accueil.
- [ ] Les liens « ← Portail » disparaissent des frises, du lecteur et du schéma.
- [ ] Lecteur bureau : boutons de page, numéro de page, « Télécharger le PDF » et sélecteur sont dans l'en-tête, comme l'écran 7.
- [ ] Sur téléphone, le logotype se réduit au monogramme ; le fil d'Ariane et le sélecteur tiennent sur une ligne à 375 px, en FR et en EN.
- [ ] Chaque lien et bouton de l'en-tête mesure au moins 40 px de haut.
- [ ] Le fil d'Ariane est annoncé aux lecteurs d'écran (« Fil d'Ariane » / texte anglais dans `en.json`).
- [ ] Les captures FR et EN sont refaites ; les aperçus des frises aussi.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 7) ; statut « Validée »
- 2026-11-24 · session principale · livrée : `shared/entete.js` dessine l'en-tête des 8 pages : logotype (lien vers l'accueil, « Jalon, accueil »), signature sur l'accueil, fil d'Ariane ailleurs (« Frises / Greenfield », « Parcours / Les rôles… », « Annexes » dans le lecteur), lien de section vers l'ancre de l'accueil, sélecteur FR / EN à droite ; liens « ← Portail » supprimés ; sur téléphone, monogramme seul. Tous les liens et boutons font 40 px ; aucun débordement à 375 px en FR et EN. Le logo du schéma des rôles mesurait 91 px (règle `svg{width:100%}` du schéma) : corrigé. Aperçus des frises et du schéma refaits (thème clair forcé). Écart : dans le lecteur, les commandes de page restent dans la barre existante, avec le monogramme et la section à la place du retour ; le fil d'Ariane ne répète pas le titre, déjà affiché. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : fil d'Ariane et retour à la bonne section clairs. Gênant : sur téléphone, et dans le lecteur sur bureau, le nom « Jalon » n'apparaît nulle part (losange seul), alors que la maquette validée (écran 4) le montre (point 1). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-031 · CLAUDE.md et README au nom de Jalon
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (documentation)
- Dépend de : US-024, US-025, US-028, US-030
- Sert : B-002

En tant que Walid, je veux que la documentation du projet suive la nouvelle identité afin que chaque session de Claude parte des bonnes règles.

Critères d'acceptation
- [ ] `CLAUDE.md` nomme le portail « Jalon », avec sa signature FR et EN, et rappelle que « SAP » ne forme jamais le nom.
- [ ] `CLAUDE.md` décrit `shared/theme.css` (seul endroit des couleurs), l'échelle de 8 tailles et les 3 rayons.
- [ ] `CLAUDE.md` indique que les polices sont hébergées sur le site et qu'aucun CDN n'est utilisé.
- [ ] `CLAUDE.md` décrit l'en-tête commun et le logotype (fichiers, usage de l'ambre réservé au jalon).
- [ ] `CLAUDE.md` rappelle la mention de marque SAP et le point INPI / EUIPO à suivre.
- [ ] La structure de fichiers de `CLAUDE.md` est à jour.
- [ ] `README.md` utilise le nouveau nom.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité ; statut « Validée »
- 2026-11-24 · session principale · livrée : CLAUDE.md au nom de Jalon (section « Le nom et l'identité » : signature, règles de marque SAP et choix de Walid, logotype, ambre réservé au jalon, rappel INPI / EUIPO), règle de design mise à jour (theme.css, polices hébergées, échelle, 40 px, AA), structure de fichiers à jour ; README au nom de Jalon avec la mention de marque. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · relue (lot 3, « Prêt avec réserves ») : détail, `CLAUDE.md` décrit encore le schéma des rôles comme à intégrer (« Les autres supports », « Points ouverts »). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### Bloc D · Écrans

### US-032 · Accueil bureau : bandeau d'entrée
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 3, bandeau)
- Dépend de : US-030
- Sert : B-002

En tant que chef de projet qui découvre le portail, je veux comprendre en quelques secondes à quoi il sert et par où commencer afin de ne pas me perdre.

Critères d'acceptation
- [ ] Un bandeau bleu nuit remplace le surtitre gris : surtitre « Pour les directeurs de programme et chefs de projet », titre « Piloter un programme SAP, jalon par jalon. », texte d'introduction, comme l'écran 3.
- [ ] Le titre anglais est « Running an SAP program, one milestone at a time. » ; les autres textes anglais sont dans `en.json`.
- [ ] Bouton « Commencer le parcours → » : il mène à la première carte du parcours.
- [ ] Bouton « Chercher un terme / » : il ouvre le glossaire et place le curseur dans la recherche.
- [ ] La ligne de chiffres (supports, frises, termes, FR / EN) est calculée à partir de `documents.json` et du glossaire, pas écrite en dur.
- [ ] Le motif de losanges du bandeau est décoratif (ignoré par les lecteurs d'écran). Un seul losange est ambre.
- [ ] Texte du bandeau : au moins 4,5:1 sur le bleu nuit, dans les deux thèmes.
- [ ] Sur téléphone, le bandeau suit la version courte de l'écran 4 (titre, phrase courte, un bouton).
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 8) ; statut « Validée »
- 2026-11-24 · session principale · livrée : bandeau bleu nuit (surtitre « Pour les directeurs de programme et chefs de projet », titre « Piloter un programme SAP®, jalon par jalon. » / « Running an SAP® program, one milestone at a time. », introduction, « Commencer le parcours → » vers le parcours, « Chercher un terme / » qui ouvre le glossaire curseur dans la recherche), chiffres calculés (8 supports · 4 frises · 136 termes · FR / EN), motif de losanges décoratif avec un seul ambre. Contrastes sur `#16213A` / `#0D1526` : texte 16,0 / 18,2 ; texte secondaire 8,9 / 8,7 ; surtitre ambre 8,5 / 9,7. Téléphone : titre, phrase courte calculée, un bouton pleine largeur. Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : en dix secondes je sais quoi et pour qui. Manque une ligne sur l'auteur du site (point 5). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-033 · Accueil bureau : grilles à 4 colonnes, vignettes de frise, lignes
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 3, sections)
- Dépend de : US-024, US-030
- Sert : B-002

En tant que visiteur sur bureau, je veux un accueil équilibré et lisible afin de voir tous les supports sans carte isolée ni image éblouissante.

Critères d'acceptation
- [ ] Parcours conseillé et frises : 4 colonnes sur bureau, glossaire épinglé compris. Aux largeurs intermédiaires, 2 colonnes. Jamais 3 : aucune carte seule sur sa ligne.
- [ ] Le numéro d'étape du parcours passe dans le corps de la carte : il ne masque plus l'aperçu ni son titre.
- [ ] Chaque titre de section porte un compteur (« 4 étapes », « 4 démarches ») calculé à partir des données.
- [ ] Les cartes de frise montrent une vignette schématique : bandes de phases proportionnelles, nom de l'exemple suivi de « (fictif) ». Les données viennent du JSON de chaque frise, pas d'une recopie.
- [ ] Certification SAP Activate et Supports annexes passent en lignes sans aperçu, côte à côte sur bureau.
- [ ] « Supports annexes » reçoit le sous-titre « Pour s'entraîner et pour produire l'eLearning. » et son équivalent anglais.
- [ ] En sombre, les aperçus PDF sont posés sur un fond mat et atténués : plus de rectangle blanc éblouissant.
- [ ] Les titres de section passent à 24 px, les titres de carte restent nettement plus petits (échelle de `theme.css`).
- [ ] L'étiquette « In French » reste visible en anglais.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px, 1100 px et 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 8) ; statut « Validée »
- 2026-11-24 · session principale · livrée : grilles à 4 colonnes, 2 sous 820 px de contenu (requête de conteneur), jamais 3 ; numéro d'étape dans le corps de la carte ; compteurs « 4 étapes » / « 4 démarches » calculés ; vignettes de frise tirées du JSON de chaque frise (bandes de phases proportionnelles, nom seulement pour la phase la plus longue pour éviter les noms tronqués, exemple « (fictif) ») ; certification et annexes en lignes côte à côte ; sous-titre des annexes ; aperçus sur fond mat et atténués en sombre ; titres de section 24 px. Vérifié à 1100 px (2 colonnes) et 1440 px (4 colonnes), FR et EN. Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves »), avec la ligne « Exemple : Calvane (fictif), fabricant de pompes » : exemples fictifs enfin compris. Gênant : les lignes grises des vignettes ressemblent à un chargement (point 2) ; « fictif » absent de la popup et du pied de page (point 4). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-034 · Accueil téléphone compact
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 4)
- Dépend de : US-033
- Sert : B-002

En tant que visiteur sur téléphone, je veux un accueil court afin de trouver un support sans faire défiler treize grandes images.

Critères d'acceptation
- [ ] Le parcours s'affiche en lignes compactes : numéro, vignette de 72 px à gauche, type et titre.
- [ ] Les frises s'affichent en 2 × 2, avec leur vignette schématique et le nom de l'exemple.
- [ ] Certification et annexes s'affichent en lignes : type, titre, flèche.
- [ ] Chaque ligne mesure au moins 40 px de haut et se touche sur toute sa largeur.
- [ ] À 390 px, la page fait au plus 2 400 px de haut en français (4 638 px aujourd'hui). La hauteur FR et EN est notée au journal.
- [ ] Une marge basse laisse la dernière ligne visible au-dessus du bouton « Glossaire ».
- [ ] Sur bureau, l'accueil de US-033 ne change pas.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 9) ; statut « Validée »
- 2026-11-24 · session principale · livrée : parcours en lignes (numéro, vignette 72 px, type, titre), frises en 2 × 2, certification et annexes en lignes, lignes de 56 px. Hauteur à 390 px : 1 848 px en français, 1 829 px en anglais (4 638 px avant ; plafond 2 400). Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : accueil court et facile au pouce. Gênant : le bouton « Glossaire » couvre une carte de frise en cours de défilement (point 3). Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-035 · Glossaire : filtres sur une seule ligne
- Statut : Fait
- Priorité : haute (proposée : termine la correction des cibles tactiles)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : écran 8, variante A)
- Dépend de : US-021
- Sert : B-002

En tant que visiteur, je veux filtrer le glossaire d'un seul toucher et voir les termes tout de suite afin de chercher vite, même sur téléphone.

Critères d'acceptation
- [ ] Les pastilles de catégorie mesurent au moins 40 px de haut (25 px aujourd'hui).
- [ ] Elles tiennent sur une seule ligne, qui défile à l'horizontale dans le glossaire. La page, elle, ne défile pas.
- [ ] Les libellés sont raccourcis (« Méthode », « Processus », « Technique », « Données », « Tests », « Run », « Agile ») ; les libellés anglais courts sont dans `en.json`.
- [ ] Le nom complet de la catégorie reste en infobulle et dans l'annonce des lecteurs d'écran.
- [ ] La pastille active est annoncée (`aria-pressed`) et visible sans la couleur seule.
- [ ] La hauteur entre le haut du glossaire et le premier terme baisse nettement (120 px de pastilles aujourd'hui) ; la valeur est notée au journal.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 11, variante A) ; statut « Validée »
- 2026-11-24 · session principale · livrée : pastilles de 40 px sur une ligne qui défile (« Tout, Méthode, Processus, Technique, Données, Tests, Run, Agile » / « All, Method, Processes, Technical, Data, Testing, Run, Agile »), nom complet en infobulle et pour les lecteurs d'écran, pastille active annoncée (`aria-pressed`) et marquée d'un ✓. Haut du glossaire jusqu'au premier terme : 260 px avant, 176 px après. Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : filtres sur une ligne, pastille active visible, rien de contraire aux critères. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-036 · Lecteur sur téléphone
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 7, téléphone)
- Dépend de : US-021, US-030
- Sert : B-002

En tant que visiteur sur téléphone, je veux tourner les pages avec le pouce afin de lire un support sans viser le haut de l'écran.

Critères d'acceptation
- [ ] Sur téléphone, la navigation de page (précédent, numéro, suivant) est en bas de l'écran, au-dessus de la zone sûre.
- [ ] Le bouton de téléchargement garde un libellé court : « PDF ».
- [ ] En haut : retour vers la section d'origine (« ← Parcours », « ← Certification »…) à gauche, sélecteur FR / EN à droite.
- [ ] Sous l'en-tête : le type et le titre du document.
- [ ] Une phrase d'aide invite à tourner le téléphone pour lire plus grand ; texte anglais dans `en.json`.
- [ ] Le bandeau de langue (US-013) reste dans le flux et ne cache pas la page.
- [ ] Chaque bouton mesure au moins 40 × 40 px.
- [ ] Le bouton « Glossaire » ne recouvre pas la barre de navigation du bas.
- [ ] Sur bureau, le lecteur de US-030 ne change pas.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 12) ; statut « Validée »
- 2026-11-24 · session principale · livrée : sur téléphone, barre du bas (précédent, numéro, suivant, « PDF ») collée en bas avec la zone sûre, boutons 40 × 40 px ; en haut « ← Parcours » (section d'origine) et FR / EN ; type et titre dessous ; phrase « Glissez vers la gauche… Tournez le téléphone pour lire plus grand. » ; bandeau de langue toujours dans le flux ; bouton « Glossaire » au-dessus de la barre. Barre de bureau inchangée (comparée à la capture). Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur captures (lot 3, « Prêt avec réserves ») : critères remplis, lecture agréable. Détail : la phrase d'aide pourrait disparaître après la première page. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-037 · Schéma des rôles harmonisé
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 9)
- Dépend de : US-020, US-024, US-030
- Sert : B-002

En tant que visiteur, je veux que le schéma des rôles ressemble au reste du portail afin de ne pas croire que j'ai changé de site.

Critères d'acceptation
- [ ] Les deux fichiers (FR et EN) prennent le fond, la surface et l'encre du site (plus de fond crème `#F7F6F2`).
- [ ] Côté client : violet du site `#6A4FA3`. Côté intégrateur : sarcelle `#1B7287`. Instances : gris neutre du site. Les teintes sombres sont prises dans `theme.css`.
- [ ] Chaque texte atteint au moins 4,5:1 sur son fond, dans les deux thèmes ; les ratios des trois familles sont notés au journal.
- [ ] Le titre suit l'échelle du site (32 px sur bureau, 24 px sur téléphone).
- [ ] Le sens des couleurs ne change pas : client, intégrateur, instances restent distincts.
- [ ] Sous 620 px, le schéma se replie en une colonne.
- [ ] Le texte des rôles et l'exemple de la vanne ne changent pas.
- [ ] L'aperçu `apercus/roles.jpg` (et sa version anglaise s'il y en a une) est refait.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · po · validée par Walid le 2026-11-24 avec la maquette d'identité (choix 13) ; statut « Validée »
- 2026-11-24 · session principale · livrée : teintes du schéma alignées sur le site dans `theme.css` (fond, surface, encre du site ; client violet `#6A4FA3`, intégrateur sarcelle `#1B7287`, instances gris). Contrastes titre / sous-titre, clair : instances 14,2 / 5,1 ; client 7,0 / 6,4 ; intégrateur 7,3 / 5,4 ; sombre : 12,4 / 6,4 ; 11,9 / 9,0 ; 11,8 / 9,1. Titre 32 px (24 px sur téléphone). Sous 620 px, liste en une colonne groupée par famille, construite à partir du dessin (`shared/schema.js`), qui ouvre le même panneau. Textes des rôles inchangés. Aperçus FR et EN refaits. Aucun débordement à 375 px, `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testée sur l'aperçu seulement (lot 3, « Prêt avec réserves ») : même allure que le reste du site. Non vérifiable : le schéma n'est pas dans les captures de référence (téléphone, sombre) ; à y ajouter. Rapport : [rapports/2026-11-24-lot-3-identite-jalon.md](rapports/2026-11-24-lot-3-identite-jalon.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### Bloc E · Finitions

### US-038 · Retouches de la frise sur bureau
- Statut : Fait
- Priorité : moyenne (proposée)
- Taille : M
- Maquette nécessaire : non (maquette d'identité validée : écran 5, frise greenfield, bureau)
- Dépend de : US-023, US-024, US-030
- Sert : B-002

En tant que visiteur sur bureau, je veux une frise de scénario où chaque libellé se lit sans obstacle et une popup qui ne se cache pas sous le glossaire afin de suivre les étapes sans effort.

Ces retouches figurent dans l'écran 5 de la maquette mais pas dans les 14 choix. Elles s'appliquent aux quatre scénarios de mise en œuvre (greenfield, brownfield, bluefield, roll-out), tous sur le gabarit `frises/`.

Critères d'acceptation
- [ ] Libellés d'étape : chaque libellé est hors de sa barre, à droite. Pour une barre qui commence après le go-live, le libellé est à gauche de la barre (comme « Préparation bascule » et « Hypercare » dans la maquette).
- [ ] Aucun libellé d'étape n'est traversé par la ligne du go-live ni posé sur une autre barre, sur les quatre scénarios, en FR et en EN, à 1440 px.
- [ ] Sur téléphone (frise de 760 px, US-023), aucun libellé ne chevauche un voisin de plus qu'avant cette story.
- [ ] Exemple fil rouge dans la popup : encadré avec filet gauche de 4 px et titre « Exemple fil rouge · fictif » dans la couleur du jalon (`--jalon`), fond `--soft`, au lieu de la couleur de la phase. Sous réserve de Q12.
- [ ] Le bandeau d'exemple au-dessus de la frise prend le même repère : filet gauche de 4 px et étiquette en `--jalon`. Sous réserve de Q12.
- [ ] Le titre de l'encadré atteint au moins 4,5:1 sur son fond, en clair et en sombre ; ratios notés au journal.
- [ ] Au-delà de 1100 px, glossaire épinglé ouvert : la popup est centrée dans la colonne de contenu et ne recouvre pas le glossaire. Glossaire masqué : elle est centrée dans la fenêtre. Sous 1100 px : comportement inchangé.
- [ ] « Qui porte » : étiquette rectangulaire (rayon 6 px, filet `--line`, fond `--surface`), mot « Qui porte » / « Owner » en IBM Plex Mono, en capitales, couleur `--muted`, suivi du porteur. Le libellé est séparé du porteur dans `fr.json` et `en.json` (aujourd'hui une seule chaîne « Qui porte : {qui} »). Plus de gélule.
- [ ] Bouton « Précédent » désactivé (première étape) : contour en pointillés, texte `--muted`, sans opacité réduite. Le texte atteint au moins 4,5:1. Il reste annoncé comme désactivé aux lecteurs d'écran.
- [ ] Tout nouveau texte d'interface est dans `fr.json` et `en.json`.
- [ ] Captures de référence FR et EN refaites ; aperçus FR et EN des quatre scénarios refaits.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée depuis l'écran 5 de la maquette d'identité (Q9)
- 2026-11-24 · po · validée par Walid le 2026-11-24 (Q9 / Q11) ; statut « Validée ». Les deux critères d'encadré ambre attendent Q12.
- 2026-11-24 · session principale · livrée : libellés d'étape toujours hors des barres (à droite ; à gauche si la barre commence après le go-live, si le libellé traverserait le go-live ou sortirait du dessin), vérifiés par calcul sur les 132 libellés des 8 fichiers FR et EN : aucun hors du dessin ; 8 libellés longs de barres courtes après le go-live passent forcément devant la ligne, interrompue derrière eux par un halo couleur de fond. Encadré « Exemple fil rouge · Calvane (fictif) » à filet ambre sur `--soft` ; bandeau d'exemple au-dessus de la frise avec le même filet. Titre en ambre de texte `--jalon-texte` (`#9A4708` en clair : 5,55:1 ; `#F2B05E` en sombre : 7,75:1), l'ambre de base n'atteignant que 4,35:1. Popup centrée dans la colonne de contenu quand le glossaire est épinglé (mesuré : centre 530 / 530). « Qui porte » en étiquette rectangulaire, libellé séparé (`frise.quiPorteLabel`). « Précédent » désactivé en pointillés, opacité 1 (5,89:1 et 7,14:1). Croix de fermeture 40 px (Q14). Aperçus FR et EN refaits. `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testé sur captures : Prêt avec réserves. Encadré fil rouge de la popup absent des captures, ligne du go-live coupée par « Run et innovation ». Rapport : [rapports/2026-11-24-us-038-039.md](rapports/2026-11-24-us-038-039.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### US-039 · Finition : échelle de tailles et rayons
- Statut : Fait
- Priorité : basse (proposée)
- Taille : S
- Maquette nécessaire : non (maquette d'identité validée : échelle déclarée par US-024)
- Dépend de : US-024, US-035, US-036, US-038
- Sert : B-002

En tant que Walid, je veux que les frises, le lecteur et le glossaire utilisent la même échelle de tailles et de rayons que le reste du site afin qu'une retouche s'applique partout sans dérive.

`shared/theme.css` déclare 8 tailles (`--t-12` à `--t-32`) et les rayons `--r-6`, `--r-10`, `--r-14`, `--r-pastille`. L'accueil, l'en-tête et le schéma les appliquent déjà. Cette story ne change pas l'aspect des pages.

Critères d'acceptation
- [ ] Dans `shared/frise.css`, `lecteur.html` et `shared/glossaire.js`, chaque taille de texte et chaque rayon écrit en dur est remplacé par la variable la plus proche, quand l'écart est de 1 px au plus (par exemple 11 → 12, 12,5 → 12 ou 13, 13,5 → 13 ou 14, 14,5 → 14 ou 15, 25 → 24).
- [ ] Les rayons de pastille (20 px, 24 px sur une gélule) passent à `--r-pastille` sans changement visible.
- [ ] Restent en dur, sans être des écarts : les rayons de 4 px et moins, les cercles (50 %), les lettres des quality gates et des repères SVG sous 12 px.
- [ ] Les valeurs à plus de 1 px de l'échelle (titre 30 px, titre de popup 22 px, rayons 8 px et 12 px, 16 px, 10,5 px) sont traitées selon Q13. Sans réponse, elles restent en dur et sont listées au journal.
- [ ] Captures de référence FR et EN avant et après : aucune différence au-delà d'arrondis de 1 px. Toute autre différence est expliquée au journal.
- [ ] Les quatre scénarios, le lecteur et le glossaire sont vérifiés ; les aperçus ne sont refaits que si une frise change à l'œil.
- [ ] Vérifié en clair et en sombre, en FR et en EN, à 375 px et à 1440 px : aucun débordement horizontal.
- [ ] `node outils/verifier.mjs` passe sans erreur.

Journal
- 2026-11-24 · po · story créée (Q11 : story de finition en fin de lot)
- 2026-11-24 · po · validée par Walid le 2026-11-24 (Q9 / Q11) ; statut « Validée ». Les écarts de plus de 1 px attendent Q13.
- 2026-11-24 · session principale · livrée : 83 tailles et rayons remplacés par les variables de l'échelle dans `frise.css` (49), `lecteur.html` (13) et `glossaire.js` (21). Q13 appliquée : titre de scénario 30 → 32 px, titre de popup 22 → 24 px, rayons 8 → 6 et 12 → 10 px, 16 → 17 px. Restent en dur : rayons de 2 à 4 px, lettres de 10 et 10,5 px (gates, étiquettes). Captures : accueil et schéma ne changent que de 88 pixels (coins du champ de recherche du glossaire, 8 → 6 px). `node outils/verifier.mjs` sans erreur.
- 2026-11-24 · persona-pm · testé sur captures : aucun changement d'aspect gênant vu. Rapport commun avec US-038 : [rapports/2026-11-24-us-038-039.md](rapports/2026-11-24-us-038-039.md)
- 2026-11-24 · Walid · testée, réserves acceptées, publiée ; story en « Fait »

### Questions du lot 3 (à trancher par Walid)

- Q9 · Frise sur bureau. L'écran 5 de la maquette montre des retouches qui ne figurent pas dans les 14 choix : libellés d'étape toujours à droite de la barre (à gauche après le go-live), exemple fil rouge en encadré ambre, popup centrée dans la colonne de contenu (plus sous le glossaire), « Qui porte » en étiquette rectangulaire, bouton « Précédent » désactivé en pointillés au lieu d'un pavé délavé. Option recommandée : une story de plus (US-038, taille M), après US-030. Autre option : les laisser de côté pour l'instant. La couleur de « Parade » (verte dans le roll-out, rouge ailleurs) pourrait être tranchée dans la même story.
- Q10 · Lecteur sur téléphone : geste de balayage pour tourner les pages. La maquette le note « option de développement, à confirmer ». Option recommandée : non dans US-036 (boutons en bas seulement), à ajouter plus tard si le besoin se confirme. Autre option : l'inclure, ce qui fait passer US-036 en taille L.
- Q11 · Échelle de tailles (8 valeurs) et rayons (3 valeurs). US-024 les déclare ; l'accueil, l'en-tête et le schéma les appliquent. Les frises, le lecteur et le glossaire gardent leurs tailles actuelles. Option recommandée : les appliquer à ces pages dans une story de finition à la fin du lot. Autre option : les appliquer au fil des stories qui touchent ces pages.
- Q9 à Q11 tranchées par Walid le 2026-11-24 : options recommandées. Q9 devient US-038, Q11 devient US-039.
- Q12 · Ambre de l'exemple fil rouge (US-038). CLAUDE.md réserve l'ambre (`--jalon`) au jalon : « ne pas l'utiliser ailleurs ». La maquette validée l'utilise pour l'encadré et le bandeau d'exemple, et sa palette le décrit comme « Losange, repère fil rouge. Rare, jamais en fond ». L'accueil l'utilise déjà hors du losange (sur-titre du bandeau, focus des boutons). Option recommandée : suivre la maquette (filet et titre en ambre, jamais en fond) et corriger la phrase de CLAUDE.md en « réservé au jalon et au repère fil rouge ». Autre option : garder la couleur de la phase pour l'encadré et retirer ces deux critères de US-038.
- Q13 · Valeurs à plus de 1 px de l'échelle (US-039) : titre de frise 30 px, titre de popup 22 px, rayons 8 px (boutons, étapes) et 12 px (couloirs, chronologie), 16 px, 10,5 px. La règle « pas de changement au-delà de 1 px » les exclut. Option recommandée : les aligner sur la maquette d'identité validée (32 px, 24 px, rayons 6 px et 10 px), soit 2 px d'écart visible, noté au journal. Autre option : les laisser en dur.
- Q14 · Deux écarts de la maquette, hors du périmètre demandé pour US-038. La croix de fermeture de la popup mesure 36 px (40 px dans la maquette et la règle de US-021). La couleur de « Parade » varie (verte dans le roll-out, rouge ailleurs), point ouvert depuis le lot 2. Option recommandée : passer la croix à 40 px dans US-038 (accessibilité, effort faible) ; laisser « Parade » telle quelle. Autre option : les traiter plus tard.

## Journal du backlog

- 2026-11-24 · po · 18 stories créées (US-001 à US-018) depuis la demande de Walid « version anglaise du portail ». Lot 1 (US-001 à US-008) sans maquette ; lot 2 avec maquette pour US-009, US-010, US-012, US-013. Statut « À affiner » en attente des questions Q1 à Q8 et de l'inscription du besoin B-001 dans `besoins.md`. Suite : Walid répond aux questions et fixe les priorités ; le lot 1 peut démarrer par US-001 dès l'accord de Walid (pas de maquette).
- 2026-11-24 · session principale · Q5 tranchée par Walid : « SAP Program Director's Portal » et « For the Program Director ». Critère de US-010 mis à jour. Restent Q1 à Q4 et Q6 à Q8.
- 2026-11-24 · session principale · Walid retient les options recommandées pour Q1 à Q4 et Q6 à Q8 (Q5 déjà tranchée). Besoin B-001 inscrit dans `besoins.md`. Statuts inchangés (« À affiner ») : restent l'accord de Walid sur les stories et les priorités. Suite : lot 1 sans maquette, US-001 passe en « Validée » dès l'accord de Walid.
- 2026-11-24 · session principale · US-001 à US-008 passées en « Validée » sur accord de Walid. US-001 livrée, en « Prête à publier ». Suite : US-002 (fichier de libellés).
- 2026-11-24 · session principale · US-002 livrée, en « Prête à publier ». Suite : US-003 (manifeste des documents).
- 2026-11-24 · session principale · US-003 livrée, en « Prête à publier ». Suite : US-004 (glossaire en JSON).
- 2026-11-24 · session principale · US-004 livrée, en « Prête à publier ». Suite : US-005 (gabarit de frise, greenfield).
- 2026-11-24 · session principale · US-005 livrée, en « Prête à publier ». Suite : US-006 (brownfield et bluefield sur le gabarit).
- 2026-11-24 · session principale · US-006 livrée, en « Prête à publier ». Suite : US-007 (roll-out sur le gabarit).
- 2026-11-24 · session principale · US-007 livrée, en « Prête à publier ». Les quatre frises partagent le gabarit. Suite : US-008 (contrôle automatique des fichiers de données).
- 2026-11-24 · session principale · US-008 livrée, en « Prête à publier ». Lot 1 terminé (US-001 à US-008), aucun changement visible. Suite : Walid valide la publication (push) ; lot 2 : US-009 passe en « Prête pour maquette » sur accord de Walid.
- 2026-11-24 · session principale · US-001 à US-008 repassées de « Prête à publier » à « À tester » à la demande de Walid : le test persona-pm avait été sauté à tort (le lot change la façon d'ouvrir le site et de mettre à jour les données). Suite : persona-pm en mode test sur le lot 1.
- 2026-11-24 · session principale · Rapport persona-pm du lot 1 (« Prêt avec réserves ») examiné avec Walid. Réserves écartées : Walid ne modifie pas les fichiers lui-même dans GitHub, il passe par Claude, qui lance `node outils/verifier.mjs` avant chaque envoi ; le seul geste direct prévu (remplacer un PDF du même nom) ne touche aucun JSON. Le double-clic en local ne concerne pas le site en ligne. Points 7 et 8 (noms de champs des frises) à revoir avec la décision sur le rangement de l'anglais, au début du lot 2. Suite : publication du lot 1 sur accord de Walid.
- 2026-11-24 · session principale · Lot 1 publié (US-001 à US-008 en « Fait »). Suite : lot 2, décision sur le rangement de l'anglais, puis maquette ux-ui de US-009.
- 2026-11-24 · session principale · Walid a fourni les traductions anglaises du glossaire et des quatre frises (artefacts claude.ai), contrôlées et notées aux journaux de US-011 et US-014 à US-017. Ces stories deviennent de l'intégration, pas de la traduction. Existent aussi en anglais : ACT100 et ACT200 (livres de révision), à prendre en compte dans US-012.
- 2026-11-24 · session principale · Lot 2 démarré. Décision technique (session principale) : un fichier par langue, même structure que le français : `shared/libelles/en.json`, `glossaire.en.json`, `frises/<nom>.en.json` ; texte absent en anglais = texte français affiché. `documents.json` reçoit par document sa langue et la clé de sa version dans l'autre langue (US-012). Rappel du mode de travail : Walid ne modifie pas les fichiers lui-même, il passe par Claude. US-009, US-010, US-012, US-013 en « Prête pour maquette » (une maquette commune) ; US-011, US-014 à US-017 en « Validée ». US-018 reste « À affiner » (après US-012 et US-017). Ouvert : couleur de l'étiquette « Parade » (verte dans le roll-out, rouge ailleurs).
- 2026-11-24 · Walid · maquette du lot 2 validée avec ses 10 recommandations (sélecteur FR | EN sur chaque page, en haut à droite ; dans le lecteur à droite de Download ; « In French » à côté du type ; Frise → Timeline ; « Other resources » ; Study guide, Review sheet ; repère FR dans le glossaire ; bandeau du lecteur dans le flux). US-009, US-010, US-012, US-013 en « Validée ». Critère de US-012 corrigé (3 documents restent en français). Suite : développement de US-009 après le renouvellement de la limite d'usage.
- 2026-11-24 · session principale · Version anglaise branchée : US-009, US-010, US-011, US-013, US-014 à US-017 en « À tester ». US-012 attend les PDF anglais d'ACT100 et ACT200. Nouvelles captures de référence en français (le sélecteur décale chaque page d'environ 20 pixels) et en anglais (`reference-en`). Suite : export ACT100 / ACT200, puis test persona-pm et relecture de Walid (accueil, frise greenfield, 15 termes).
- 2026-11-24 · session principale · US-012 en « À tester » : ACT100 et ACT200 anglais ajoutés. Toutes les stories du lot 2 sauf US-018 sont « À tester ». Ouvert : orthographe britannique des deux livres ACT en anglais.
- 2026-11-24 · session principale · Walid garde l'orthographe britannique des livres ACT100 et ACT200 anglais (option 2 : différence de style, pas d'erreur). US-018 livrée. Tout le lot 2 est « À tester ». Suite : test persona-pm, relecture de Walid, publication.
- 2026-11-24 · session principale · Rapport persona-pm du lot 2 (« Prêt avec réserves », rapports/2026-11-24-lot-2-version-anglaise.md) traité : 1-2) glossaire anglais : le nom français sort du nom complet vers un champ `nomFr`, affiché avec le repère FR comme dans la maquette (40 termes, dont Cutover → FR Bascule, AMS → FR TMA) ; 3, 6) livres ACT anglais nommés « Revision book » comme leur couverture, avec « (EN) » et une description française côté français ; 4) « Fix » devient « Mitigation » dans les popups et le glossaire ; 5) « alert thresholds » ; 7) bandeau du lecteur : « No English version yet. » quand aucune version anglaise n'existe ; détails : « PD » remplacé par « program director », accueil « how AI helps ». Non retenus : titre « migration » du greenfield et intro qui cite le glossaire « à droite » (identiques en français) ; libellés serrés du roll-out (identiques en français). Captures de référence FR et EN refaites. Reste : relectures de Walid (accueil, frise greenfield, 15 termes), puis publication.
- 2026-11-24 · Walid · relectures validées et publication accordée (« ok je valide »). Lot 2 publié : US-009 à US-018 en « Fait ». Le portail existe en français et en anglais.
- 2026-11-24 · session principale · Demande directe de Walid : ACT100 et ACT200 sortent du parcours conseillé vers une section « SAP Activate Certification » de l'accueil (après le parcours, avec sous-titre, en français et en anglais ; en anglais, elle ouvre les versions anglaises). Le parcours garde 3 cartes. Pas de maquette : changement décrit précisément par Walid. Non publié.
- 2026-11-24 · Walid · titre français corrigé en « Certification SAP Activate » ; publication accordée (« Oui, publie »).
- 2026-11-24 · session principale · Correction du décalage de cache après publication (demande de Walid, « Oui, corrige ») : JSON toujours revalidés (`cache: 'no-cache'`), scripts et style versionnés (`?v=`) par `outils/version.mjs`, contrôlé par `verifier.mjs` ; procédure de publication ajoutée à CLAUDE.md. Aucun changement à l'écran (captures FR et EN identiques). Non publié.
- 2026-11-24 · Walid · correction du cache publiée (« Oui, publie »).
- 2026-11-24 · session principale · Demande directe de Walid : schéma des rôles d'un programme SAP (fichiers HTML fournis, FR et EN) ajouté au parcours conseillé avant la fiche de révision, dans `schemas/` avec retour au portail, sélecteur (qui bascule vers l'autre fichier) et glossaire ; contrôlé : aucun nom client, exemple de la vanne déjà public. Revision Sheet anglaise exportée de l'artefact de Walid (10 pages, aucun nom client) et reliée à la fiche (`versionEn`) : en anglais, seuls la simulation d'entretien et le script de narration restent « In French ». Nouveau type de document « schema » (Schéma / Diagram). Non publié.
- 2026-11-24 · Walid · en français, la section « Versions anglaises et supports annexes » devient « Supports annexes » (simulation d'entretien, script de narration) ; les versions anglaises restent accessibles par le sélecteur EN. Non publié.
- 2026-11-24 · Walid · publication accordée (« Oui, publie ») : schéma des rôles, Revision Sheet anglaise, section « Supports annexes ».
- 2026-11-24 · ux-ui · Demande de Walid (audit, identité, nom) : audit dans `rapports/2026-11-24-audit-ux-ui.md`, maquette dans [`maquettes/identite-portail.html`](maquettes/identite-portail.html) (nom proposé « Jalon », logotype en losange, palette, accueil, frise, lecteur, glossaire, schéma des rôles, bureau et téléphone). 14 choix à trancher par Walid en fin de maquette. Aucune story créée : à faire par le po après les choix de Walid ; les correctifs d'accessibilité peuvent former un lot à part.
- 2026-11-24 · Walid · audit UX/UI (rapports/2026-11-24-audit-ux-ui.md) et maquette d'identité (maquettes/identite-portail.html) validés, les 14 recommandations retenues (« Oui, toutes ») : nom « Jalon » (vérification INPI / EUIPO avant diffusion large), signature « Piloter un programme SAP » / « Running SAP programs », logotype A (losange ambre sur une ligne de temps), accent A (sarcelle + bleu nuit de marque, ambre réservé au jalon), IBM Plex Sans seule, correctifs d'accessibilité en premier et en lot séparé, en-tête commun, accueil refondu (bandeau, 4 colonnes), accueil téléphone compact, frise téléphone A (glisser avec indice), filtres du glossaire A, lecteur téléphone (boutons en bas, libellé PDF), schéma des rôles harmonisé, socle (couleurs partagées, polices IBM Plex hébergées, favicon, Open Graph, mention de marque SAP). Suite : le PO découpe le lot 3.
- 2026-11-24 · po · Lot 3 « Identité Jalon et confort de visite » écrit : 19 stories (US-019 à US-037), toutes en « Validée » sur la décision de Walid du 2026-11-24 (maquette d'identité et 14 choix), sans nouvelle maquette. Bloc A accessibilité US-019 à US-023 (sans dépendance, livrables tout de suite) ; bloc B socle US-024 à US-027 ; bloc C identité US-028 à US-031 ; bloc D écrans US-032 à US-037. US-026 (favicon, partage) attend le nom et le logotype : elle se développe après US-029. Besoin B-002 proposé dans la note du lot, à inscrire dans `besoins.md`. Questions ouvertes Q9 (retouches de la frise sur bureau, hors des 14 choix), Q10 (balayage dans le lecteur), Q11 (échelle de tailles sur les frises, le lecteur et le glossaire). Suite : session principale, US-019.
- 2026-11-24 · Walid · Q9 à Q11 du lot 3 : recommandations du PO retenues (« Oui, démarre ») : US-038 retouches de la frise bureau après US-030 ; pas de balayage dans le lecteur ; story de finition des tailles et rayons en fin de lot.
- 2026-11-24 · session principale · Bloc accessibilité livré : US-019 à US-023 en « À tester ». Non publié.
- 2026-11-24 · Walid · bloc accessibilité (US-019 à US-023) publié (« Oui, publie et enchaîne »).
- 2026-11-24 · Walid · décisions après lecture des règles de marque SAP : (1) signature gardée avec « SAP » (« Piloter un programme SAP »), en connaissance du risque (les règles SAP interdisent la marque dans un slogan) ; (2) symbole ® à la première mention sur l'accueil et phrase d'attribution en pied de page, PDF inchangés ; (3) adresse du site inchangée pour l'instant (dépôt `portail-elearning-sap`) ; (4) polices IBM Plex téléchargées depuis le paquet officiel IBM (npm, via jsDelivr) pour US-025.
- 2026-11-24 · session principale · Bloc socle livré : US-024, US-025, US-027 en « À tester ». Non publié. Suite : bloc identité (US-028 nom Jalon).
- 2026-11-24 · Walid · bloc socle (US-024, US-025, US-027) publié (« Oui, publie et enchaîne »).
- 2026-11-24 · session principale · Bloc identité livré : US-026, US-028 à US-031 en « À tester ». Non publié. Ouvert : conversion du mot « Jalon » en tracés (outil à installer, accord de Walid).
- 2026-11-24 · session principale · Bloc écrans livré : US-032 à US-037 en « À tester ». Non publié, comme le bloc identité. Restent à écrire par le PO : US-038 (retouches de la frise bureau, Q9) et la story de finition des tailles et rayons (Q11).
- 2026-11-24 · Walid · blocs identité (US-026, US-028 à US-031) et écrans (US-032 à US-037) publiés (« Oui, publie »).
- 2026-11-24 · Walid · script de narration retiré du site (« il sert à rien ») : manifeste, accueil, PDF et aperçu ; sous-titre des supports annexes adapté. Récupérable dans l'historique git.
- 2026-11-24 · Walid · cartes de frise de l'accueil : le nom seul de l'entreprise (« Nordval (fictif) ») ne disait pas qu'il s'agit d'un exemple ; remplacé par une ligne « Exemple : Calvane (fictif), fabricant de pompes » sous la description, tirée du JSON de chaque frise ; pas de durée, à la demande de Walid. Non publié.
- 2026-11-24 · session principale · Suite du rapport persona-pm du lot 3 (rapports/2026-11-24-lot-3-identite-jalon.md), sur accord de Walid : « Frises » renommées « Scénarios de mise en œuvre » / « Implementation scenarios » (choix d'expert SAP demandé par Walid) ; mot « Jalon » visible sur téléphone et dans le lecteur ; vignettes sans lignes grises ; bouton « Glossaire » en icône sur téléphone ; « (fictif) » dans les popups et entreprises fictives nommées en pied d'accueil ; « Pour le directeur de programme » ; ® sur la signature de l'en-tête ; étiquette « Pratique » en gris ardoise ; CLAUDE.md à jour ; schéma des rôles ajouté aux captures (48 par langue) ; image de partage refaite. Pas d'« À propos » pour l'instant (Walid). Non publié.
- 2026-11-24 · po · Bloc E « Finitions » écrit, après US-037 : US-038 retouches de la frise sur bureau (M, écran 5 de la maquette, Q9) et US-039 échelle de tailles et rayons sur les frises, le lecteur et le glossaire (S, Q11), en « Validée » sur la décision de Walid (Q9 / Q11). B-002 couvert par US-019 à US-039. Questions ouvertes : Q12 (ambre de l'exemple fil rouge contre la règle de CLAUDE.md), Q13 (valeurs à plus de 1 px de l'échelle), Q14 (croix de popup à 40 px, couleur de « Parade »). Suite : Walid tranche Q12 avant les critères d'encadré de US-038 ; US-039 se développe après US-038.
- 2026-11-24 · Walid · Q12 à Q14 : recommandations du PO retenues (« ok j'accepte ») : ambre réservé au jalon et au repère fil rouge (CLAUDE.md corrigé) ; valeurs à plus de 1 px alignées sur la maquette (titres 32 et 24 px, rayons 6 et 10 px) ; croix de fermeture des popups portée à 40 px dans US-038. « Parade » est déjà verte partout (décision antérieure), rien à faire.
- 2026-11-24 · session principale · US-038 et US-039 livrées, en « À tester ». Non publiées, avec les corrections du test du lot 3.
- 2026-11-24 · Walid · publication accordée (« Oui, publie ») : corrections du test du lot 3 (scénarios de mise en œuvre, Jalon sur téléphone, fictif, détails) et US-038, US-039.
- 2026-11-24 · Walid · remarques directes : bouton « Chercher un terme » retiré du bandeau (le glossaire est déjà ouvert par défaut) ; croix de fermeture (40 px, « Fermer le document ») ajoutée à droite de la barre du lecteur : retour à la page précédente du site, sinon à la section d'origine de l'accueil. Non publié.
- 2026-11-24 · Walid · lot 3 clos (« Oui, les deux ») : US-019 à US-039 en « Fait », réserves des tests acceptées (libellés devant le go-live avec halo, libellés à gauche de quatre barres). Publication du bouton retiré et de la croix du lecteur.
