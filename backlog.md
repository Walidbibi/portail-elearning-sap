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
