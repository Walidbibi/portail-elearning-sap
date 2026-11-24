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
- Statut : Prête à publier
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

### US-002 · Fichier de libellés : accueil, glossaire, lecteur
- Statut : Prête à publier
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

### US-003 · Manifeste des documents
- Statut : Prête à publier
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

### US-004 · Glossaire en JSON
- Statut : Validée
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-003
- Sert : B-001

En tant que Walid, je veux que les termes du glossaire soient dans un fichier `glossaire.json` afin de pouvoir les traduire et les enrichir sans toucher au code.

Critères d'acceptation
- [ ] `glossaire.json` contient les 136 termes, chacun avec des champs nommés : terme, nom complet, catégorie, définition, pour le DP, documents.
- [ ] Les libellés des 7 catégories sont dans le fichier de libellés de US-002.
- [ ] Le glossaire est chargé par `fetch`, sur toutes les pages.
- [ ] La recherche donne les mêmes résultats qu'avant sur trois essais notés dans le journal (par exemple « cutover », « donnees », « RICEFW »).
- [ ] Si le fichier ne se charge pas, le glossaire affiche un message clair au lieu d'une liste vide.
- [ ] `glossaire-data.js` est supprimé, ou ne contient plus de données.
- [ ] Le `CLAUDE.md` décrit le nouveau format d'un terme.
- [ ] Rendu identique aux captures de US-001.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette

### US-005 · Gabarit de frise unique, appliqué au greenfield
- Statut : Validée
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non
- Dépend de : US-002
- Sert : B-001

En tant que Walid, je veux un seul code d'affichage pour les frises et un fichier JSON par frise afin de corriger ou traduire une frise sans dupliquer le code.

Critères d'acceptation
- [ ] Un script et une feuille de style partagés dessinent la frise et ouvrent les popups.
- [ ] Le contenu du greenfield est dans un fichier JSON : en-tête de page (surtitre, titre, introduction, exemple fil rouge, bandeau « En continu », causes d'échec, note), phases, étapes et gates, ordre, positions, mois, icônes.
- [ ] Le nom de l'entreprise fil rouge (« Calvane ») vient du JSON, plus du code.
- [ ] Les textes communs à toutes les frises (Activités, Prérequis, Livrables, Apport de l'IA, Gain, Risques d'échec, Dans l'exemple, Qui porte, Étape, Quality gate, Transverse, Précédent, Suivant, Fermer, « ← Portail », légende, textes pour lecteurs d'écran) viennent du fichier de libellés.
- [ ] L'adresse `frises/greenfield.html` reste valide.
- [ ] Navigation Précédent / Suivant, bouton « Suivre l'exemple pas à pas », clavier (Entrée, Espace, Échap) : comportement identique.
- [ ] Rendu identique aux captures de US-001, popup comprise.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette

### US-006 · Frises brownfield et bluefield sur le gabarit
- Statut : Validée
- Priorité : haute (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-005
- Sert : B-001

En tant que Walid, je veux que les frises brownfield et bluefield utilisent le gabarit afin de n'avoir plus qu'un code à maintenir pour les frises SAP Activate.

Critères d'acceptation
- [ ] Le contenu de chaque frise est dans son propre fichier JSON, au même format que le greenfield.
- [ ] Les deux pages ne contiennent plus de code d'affichage propre.
- [ ] Les adresses `frises/brownfield.html` et `frises/bluefield.html` restent valides.
- [ ] Rendu identique aux captures de US-001, popups comprises.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette

### US-007 · Frise roll-out sur le gabarit
- Statut : Validée
- Priorité : haute (proposée)
- Taille : M
- Maquette nécessaire : non
- Dépend de : US-006
- Sert : B-001

En tant que Walid, je veux que la frise roll-out utilise aussi le gabarit afin que les quatre frises partagent le même code.

Critères d'acceptation
- [ ] Le gabarit accepte un nombre de phases variable (cinq pour le roll-out, six pour SAP Activate).
- [ ] Le gabarit accepte des gates nommées autrement que « Quality gate » (G1 à G3 pour le roll-out), avec leur libellé dans le JSON.
- [ ] Le contenu du roll-out est dans son fichier JSON.
- [ ] L'adresse `frises/rollout.html` reste valide.
- [ ] Le `CLAUDE.md` décrit le format JSON d'une frise et la marche à suivre pour en ajouter une.
- [ ] Rendu identique aux captures de US-001, popups comprises.
- [ ] Les quatre frises sont de nouveau comparées aux captures en fin de story.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette

### US-008 · Contrôle automatique des fichiers de données
- Statut : Validée
- Priorité : basse (proposée)
- Taille : S
- Maquette nécessaire : non
- Dépend de : US-004, US-007
- Sert : B-001

En tant que Walid, je veux qu'une vérification automatique signale un fichier manquant ou un JSON cassé afin de pouvoir mettre à jour le site sans code et sans risque.

Critères d'acceptation
- [ ] Une GitHub Action se lance à chaque envoi sur la branche principale.
- [ ] Elle échoue si un fichier cité dans le manifeste n'existe pas.
- [ ] Elle échoue si un JSON du site est mal formé.
- [ ] Elle échoue si un terme du glossaire cite une clé de document absente du manifeste.
- [ ] Le message d'échec nomme le fichier et la ligne en cause, en français.

Journal
- 2026-11-24 · po · story créée
- 2026-11-24 · session principale · passée en « Validée » sur accord de Walid (« ok attaque »), sans maquette

### Questions du lot 1 (tranchées par Walid)

- Q1 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Faut-il accepter que le site ne s'ouvre plus par simple double-clic sur `index.html` ? Le chargement des JSON par `fetch` demande un serveur, comme le lecteur aujourd'hui. Option recommandée : oui. GitHub Pages sert le site, et `python3 -m http.server 8080` suffit en local. Autre option : garder les données dans des fichiers `.js`, qui marchent sans serveur mais sont moins faciles à éditer.
- Q2 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Le contrôle automatique (US-008) est-il voulu dès maintenant ? Option recommandée : oui, mais après le reste du lot. Il protège les mises à jour sans code.

## Lot 2 · Traduire

Règles communes au lot :
- Les noms fictifs (Nordval, Calvane, Ternova, Alvéa) restent identiques.
- Les termes SAP gardent leur nom anglais officiel (phases, outils, produits). Les faits datés ne changent pas à la traduction.
- Aucune page ne présente de défilement horizontal en anglais, sur téléphone comme sur bureau.

### US-009 · Sélecteur de langue FR / EN et choix mémorisé
- Statut : À affiner
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

### US-010 · Interface et accueil en anglais
- Statut : À affiner
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
- [ ] Walid a relu les textes de l'accueil et le nom du portail.

Journal
- 2026-11-24 · po · story créée

### US-011 · Glossaire en anglais
- Statut : À affiner
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

### US-012 · Règle pour les documents sans version anglaise
- Statut : À affiner
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
- [ ] En anglais, les 7 autres documents portent l'étiquette « In French ».
- [ ] En anglais, aucun document n'apparaît deux fois sur l'accueil.
- [ ] Les liens du glossaire vers un document suivent la même règle.
- [ ] En français, l'accueil reste identique aux captures de US-001.

Journal
- 2026-11-24 · po · story créée

### US-013 · Lecteur PDF : signaler la langue du document
- Statut : À affiner
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

### US-014 · Frise greenfield en anglais
- Statut : À affiner
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
- [ ] Walid a relu l'en-tête de page et deux popups.

Journal
- 2026-11-24 · po · story créée

### US-015 · Frise brownfield en anglais
- Statut : À affiner
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

### US-016 · Frise bluefield en anglais
- Statut : À affiner
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

### US-017 · Frise roll-out en anglais
- Statut : À affiner
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

### US-018 · Aperçus anglais des cartes
- Statut : À affiner
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

### Questions du lot 2 (tranchées par Walid)

- Q3 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Adresse des pages anglaises. Option recommandée : les mêmes pages, la langue venant du choix mémorisé, et `?lang=en` pour partager un lien. Pas de duplication, cohérent avec le lot 1. Autre option : un dossier `/en/` avec des copies des pages, mieux référencé par les moteurs de recherche mais à maintenir en double.
- Q4 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Langue à la première visite. Option recommandée : la langue du navigateur (français donne FR, toute autre langue donne EN). Autre option : français pour tous.
- Q5 · Nom du portail et libellé « Pour le DP » en anglais. **Tranchée par Walid le 2026-11-24 :** « SAP Program Director's Portal » et « For the Program Director ». « For the PM » est écarté : PM désigne aussi le project manager et le module SAP Plant Maintenance.
- Q6 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Variante d'anglais et formats. Option recommandée : anglais américain, comme la documentation SAP (« program », « organization »). Montants au format « €9M », dates au format « April 1 ». Les montants restent en euros.
- Q7 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Documents français : faut-il les traduire ? Option recommandée : non pour l'instant. On applique la règle de US-012 (étiquette « In French » et renvoi vers la version anglaise quand elle existe). Traduire un PDF demande de refaire l'export depuis claude.ai puis l'anonymisation : à traiter plus tard, document par document, en commençant par la fiche de révision et la simulation d'entretien.
- Q8 · **Tranchée par Walid le 2026-11-24 : option recommandée retenue.** Relecture des traductions. Option recommandée : Walid relit l'accueil et une frise (US-010, US-014) avant que les autres soient traduites. Les suivantes reprennent les choix de vocabulaire validés.

## Journal du backlog

- 2026-11-24 · po · 18 stories créées (US-001 à US-018) depuis la demande de Walid « version anglaise du portail ». Lot 1 (US-001 à US-008) sans maquette ; lot 2 avec maquette pour US-009, US-010, US-012, US-013. Statut « À affiner » en attente des questions Q1 à Q8 et de l'inscription du besoin B-001 dans `besoins.md`. Suite : Walid répond aux questions et fixe les priorités ; le lot 1 peut démarrer par US-001 dès l'accord de Walid (pas de maquette).
- 2026-11-24 · session principale · Q5 tranchée par Walid : « SAP Program Director's Portal » et « For the Program Director ». Critère de US-010 mis à jour. Restent Q1 à Q4 et Q6 à Q8.
- 2026-11-24 · session principale · Walid retient les options recommandées pour Q1 à Q4 et Q6 à Q8 (Q5 déjà tranchée). Besoin B-001 inscrit dans `besoins.md`. Statuts inchangés (« À affiner ») : restent l'accord de Walid sur les stories et les priorités. Suite : lot 1 sans maquette, US-001 passe en « Validée » dès l'accord de Walid.
- 2026-11-24 · session principale · US-001 à US-008 passées en « Validée » sur accord de Walid. US-001 livrée, en « Prête à publier ». Suite : US-002 (fichier de libellés).
- 2026-11-24 · session principale · US-002 livrée, en « Prête à publier ». Suite : US-003 (manifeste des documents).
- 2026-11-24 · session principale · US-003 livrée, en « Prête à publier ». Suite : US-004 (glossaire en JSON).
