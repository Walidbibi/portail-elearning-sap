# Test persona-pm · Lot 3 « Identité Jalon et confort de visite »

- Date : 2026-11-24
- Testeur : persona-pm (chef de projet senior, débutant en SAP)
- Périmètre : US-019 à US-037, retrait du script de narration, ligne « Exemple : … (fictif) » sur les cartes de frise de l'accueil
- Matière : captures `outils/captures/reference/` et `reference-en/` (accueil, glossaire, frises et popups, lecteur ; 1440 et 390 px ; clair et sombre), aperçus `apercus/`, image `shared/marque/partage.png`, maquette `maquettes/identite-portail.html`, code de l'accueil et du lecteur. Pas de navigateur : je juge sur captures.
- Hors champ, par décision de Walid : « SAP » dans la signature, adresse du site, orthographe britannique des livres ACT, mot « Jalon » pas encore en tracés, ouverture locale, édition des fichiers à la main.

## Verdict

Prêt avec réserves.

## Mon parcours, en bref

J'arrive sur l'accueil bureau. En dix secondes je lis « Pour les directeurs de programme et chefs de projet », puis « Piloter un programme SAP, jalon par jalon ». Je sais à qui ça s'adresse et de quoi ça parle. Le bouton blanc « Commencer le parcours » est évident. Le site fait sérieux, propre, pas bricolé. Sur téléphone, même impression, mais je ne vois nulle part le nom du site. En anglais, tout suit, sans trou.

## Points bloquants

Aucun.

## Points gênants

### 1. Sur téléphone, le nom « Jalon » n'apparaît nulle part
- Où : en-tête de toutes les pages à 390 px (`accueil-telephone-*.png`, `greenfield-telephone-*.png`, `lecteur-telephone-*.png`). Aussi le lecteur sur bureau (`lecteur-bureau-*.png`) : losange seul, sans le mot.
- Constat : en haut à gauche, un petit losange sur un trait. Rien d'autre. Le seul « jalon » visible est en minuscule dans le titre (« jalon par jalon »). Je ne comprends pas que c'est le nom du site. Or le besoin B-002 part justement d'un recruteur qui ouvre le lien sur son téléphone. La maquette validée (écran 4, téléphone) montre pourtant le losange suivi du mot « Jalon ». C'est le critère de US-030 (« le logotype se réduit au monogramme ») qui l'a retiré.
- Suggestion : afficher le mot « Jalon » à côté du losange sur téléphone, au moins sur l'accueil, comme dans la maquette. La place existe : le sélecteur FR / EN occupe moins de 100 px. Même chose dans le lecteur sur bureau.

### 2. Les vignettes de frise ressemblent à un écran en cours de chargement
- Où : cartes de frise, accueil bureau et téléphone, clair et sombre.
- Constat : sous les bandes de couleur, trois lignes grises sans texte. Je les prends pour un contenu qui ne s'est pas affiché. Sur téléphone, aucune bande n'a de nom de phase : je vois des couleurs, sans savoir ce qu'elles veulent dire.
- Suggestion : retirer les lignes grises, ou les remplacer par une information utile (par exemple l'étendue « M-15 → M+2 », déjà calculée pour l'indice de glissement). Sur téléphone, une vignette plus basse suffit.

### 3. Le bouton « Glossaire » recouvre le contenu pendant le défilement sur téléphone
- Où : accueil téléphone (il couvre la carte Greenfield sur la capture), frise greenfield téléphone (il couvre la chronologie, là où je dois faire glisser).
- Constat : le critère de US-023 est tenu en bas de page. Mais au milieu de la page, le bouton est posé sur la zone que je touche.
- Suggestion : sur téléphone, un bouton plus petit (icône et lettre « / » ou loupe), ou qu'il se rétracte pendant le défilement vers le bas.

### 4. Les exemples fictifs : clair sur les cartes, moins ailleurs
- Où : cartes de frise (bien), popup de frise (« Dans l'exemple · Calvane », sans « fictif »), pied de l'accueil, schéma des rôles (« la réception d'une vanne de carburant »), deck de synthèse (« une pièce d'avion »).
- Constat : sur l'accueil, « Exemple : Calvane (fictif), fabricant de pompes » est parfait. Je comprends tout de suite. Mais si on m'envoie un lien direct vers une étape, la popup dit « Calvane » sans plus. Le pied de page dit « contenu générique », pas « entreprises et chiffres fictifs ». Et je croise deux autres fils rouges (la vanne, la pièce d'avion) sans savoir s'ils sont liés aux quatre entreprises.
- Suggestion : ajouter « (fictif) » dans l'intitulé de la popup. Une phrase en pied d'accueil : « Nordval, Calvane, Ternova et Alvéa sont des entreprises fictives ; leurs chiffres aussi. » Sur la carte du schéma des rôles, dire en trois mots ce qu'est « l'exemple de la vanne ».

### 5. Personne derrière le site
- Où : accueil, bandeau et pied de page.
- Constat : je sais à qui s'adresse le site. Je ne sais pas qui l'a fait ni pourquoi. Pour un recruteur, c'est la première question. Un site sans auteur inspire moins confiance.
- Suggestion : une ligne « À propos » en pied d'accueil (qui, pourquoi, avec quels outils). Walid décide du niveau de détail personnel.

### 6. L'aperçu de partage n'a pas été vérifié
- Où : US-026, critère « vérifié avec un outil de prévisualisation en ligne ».
- Constat : l'image `partage.png` est réussie (nom, logotype, signature FR et EN, phrase claire). Mais le journal dit que la vérification reste à faire après publication. La publication est faite.
- Suggestion : faire la vérification maintenant et la noter au journal. C'est ce que verra un recruteur dans une messagerie.

## Détails

- Glossaire, encadré « Pour le DP » : le sigle « DP » n'est expliqué nulle part et n'est pas dans le glossaire. Suggestion : « Pour le directeur de programme », ou ajouter « DP » au glossaire.
- Accueil bureau : la signature « PILOTER UN PROGRAMME SAP » dans l'en-tête précède le titre « Piloter un programme SAP®… ». Le ® arrive donc à la deuxième mention, pas à la première. Et les deux phrases se répètent à 100 px d'écart. Suggestion : poser le ® sur la signature de l'en-tête, ou laisser Walid trancher.
- Bouton « Chercher un terme / » : le petit cadre avec « / » ne dit rien à quelqu'un qui ne connaît pas le raccourci. Il est expliqué dans le texte juste au-dessus, donc acceptable. Une infobulle « raccourci clavier » suffirait.
- Étiquette « PRATIQUE » en rouge (supports annexes) : dans les frises, le rouge signale un risque. Je lis presque une alerte.
- Lecteur téléphone : la phrase « Glissez vers la gauche… Tournez le téléphone… » prend deux lignes à chaque ouverture. Elle pourrait disparaître après la première page tournée.
- Aperçus `roles.jpg` et `green.en.jpg` : on y voit le bouton « Glossaire » et l'en-tête. Ce n'est pas gênant sur l'accueil (vignette réduite), mais l'image serait plus nette sans.
- Schéma des rôles : il n'est pas dans le jeu de captures de référence. Je n'ai pas pu vérifier le repli en une colonne sous 620 px ni le thème sombre (US-037). Suggestion : l'ajouter à `outils/captures/`.
- `CLAUDE.md` (US-031, « structure à jour ») : la section « Les autres supports » et les « Points ouverts » disent encore que le schéma des rôles reste à nettoyer avant intégration. Il est intégré.
- Capture du glossaire épinglé sur bureau : le panneau s'arrête à 900 px de haut sur la capture pleine page. C'est sans doute l'effet de la capture, pas un défaut ; je le signale pour que personne ne s'en inquiète.

## Réponses aux sept questions

1. **Première impression** : bonne. Sur bureau, en dix secondes je sais quoi et pour qui. Le bleu nuit et le losange ambre donnent un air de produit fini, pas de page perso. La signature est claire. Réserve : sur téléphone, le nom manque (point 1), et l'auteur manque partout (point 5).
2. **Parcours** : clair. « Commencer le parcours » est le bouton évident. Les étapes numérotées 1 à 4 me guident. Le fil d'Ariane « Jalon / Frises / Greenfield » me dit où je suis, et « Frises » ramène à la bonne section. Dans le lecteur téléphone, « ← Parcours » est parfait. Seule hésitation : sur téléphone, je ne devine pas que le petit losange ramène à l'accueil.
3. **Exemples fil rouge** : oui, sur l'accueil, c'est enfin compris : « Exemple : Calvane (fictif), fabricant de pompes ». Dans la frise aussi (« Exemple fil rouge : Calvane (fictif)… »). Reste la popup et le pied de page (point 4).
4. **Lisibilité et confort** : le thème sombre est lisible partout ; les bandes de phase se lisent bien. L'accueil téléphone est court et se parcourt vite. Le lecteur téléphone avec la barre en bas est agréable. Le glossaire en plein écran avec « Fermer » est net. Les boutons ont une taille confortable. Gêne : le bouton flottant (point 3).
5. **Cohérence** : bonne entre pages (même en-tête, mêmes couleurs, mêmes étiquettes) et entre langues (tout est traduit, l'étiquette « In French » et le bandeau du lecteur préviennent bien). Écart : le lecteur sur bureau n'affiche que le losange, alors que les frises affichent « Jalon ».
6. **Critères d'acceptation non remplis** : voir le tableau ci-dessous.
7. **B-002** : largement couvert. Identité claire sur bureau, lisible en sombre, boutons corrects, accueil téléphone court. Pas entièrement : sur téléphone, là où B-002 situe le recruteur, l'identité se réduit à un losange sans nom.

## Critères d'acceptation

| Story | Ce qui ne me semble pas rempli |
|---|---|
| US-019 à US-022, US-024, US-025, US-035 | Rien vu de contraire sur les captures. Ratios et mesures : je fais confiance au journal. |
| US-023 | Rempli à la lettre (bas de page). En cours de défilement, le bouton « Glossaire » couvre la frise (point 3). |
| US-026 | Vérification de l'aperçu avec un outil en ligne : pas faite (point 6). |
| US-027 | Rempli. Le ® ne tombe pas sur la toute première mention de « SAP » de la page (détail). |
| US-028 | Rempli. |
| US-029 | Rempli, hors conversion en tracés (écartée par Walid). |
| US-030 | Écart noté au journal : lecteur bureau sans le mot « Jalon ». Sur téléphone, le monogramme seul est conforme au critère mais contraire à la maquette validée (point 1). |
| US-031 | « Structure à jour » : deux passages de `CLAUDE.md` décrivent encore le schéma des rôles comme à intégrer (détail). |
| US-032 | Rempli. |
| US-033 | Rempli. Sous-titre des annexes changé après le retrait du script, sur demande de Walid : normal. Vignettes peu parlantes (point 2). |
| US-034 | Rempli. |
| US-036 | Rempli. |
| US-037 | Non vérifiable par moi : pas de capture du schéma sur téléphone ni en sombre. |

## Les deux changements récents

- **Retrait du script de narration** : propre. Il n'apparaît plus sur l'accueil, ni dans le manifeste, ni dans les sous-titres. Le compteur dit « 7 supports ». La section « Supports annexes » ne contient plus qu'une ligne : elle paraît un peu vide sur bureau, à côté de la certification, mais ce n'est pas gênant.
- **Ligne « Exemple : Calvane (fictif), fabricant de pompes »** : c'est le changement le plus utile pour moi. Il est clair en FR et en EN (« Example: Calvane (fictional), pump manufacturer »), séparé par un pointillé, et cohérent avec la frise.

## Ce qui marche bien

- Le bandeau d'accueil : public, sujet, bouton d'entrée, tout est dit en un écran.
- Le fil d'Ariane et le retour à la bonne section.
- L'accueil téléphone : court, en lignes, facile au pouce.
- Le lecteur téléphone : barre en bas, « PDF », retour « ← Parcours ».
- Le glossaire téléphone : plein écran, « Fermer », filtres sur une ligne.
- Le thème sombre, sans rectangle blanc éblouissant.
- L'anglais : complet, et honnête sur ce qui reste en français.
- L'image de partage : sobre et explicite.
