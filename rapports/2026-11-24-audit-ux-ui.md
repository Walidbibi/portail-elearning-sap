# Audit UX/UI du portail · 2026-11-24

Auteur : agent ux-ui. Demande de Walid : audit complet (couleur, police, présentation), identité et nom.
Matière : captures `outils/captures/reference/` et `reference-en/` (bureau 1440 px, téléphone 390 px, clair et sombre), aperçus `apercus/`, code de `index.html`, `lecteur.html`, `shared/frise.css`, `shared/glossaire.js`, `shared/libelles.js`, `schemas/roles-programme-sap.html`.
Maquette associée : `maquettes/identite-portail.html`.

Gravité : **Haute** = gêne réelle ou non-conformité AA. **Moyenne** = nuit à l'image ou à la lecture. **Basse** = finition.
Contrastes calculés selon WCAG 2.1 (luminance relative). Valeurs arrondies.

## Synthèse

Le site est propre, cohérent dans ses polices et déjà pensé pour le sombre. Il lui manque une identité : pas de logo, pas d'en-tête commun, pas de favicon, un nom qui ressemble à un produit SAP. Trois défauts d'accessibilité sont nets : libellés de phases illisibles en sombre, contour de focus trop pâle, cibles tactiles du glossaire trop petites. L'accueil souffre de grilles à 3 colonnes pour 4 cartes, qui laissent des cartes orphelines.

## 1. Couleurs

Haute
- Frises, thème sombre, bandeau des phases (`#tl .ph{fill:#fff}`) : texte blanc sur `--c2 #5FC0D4`, `--c3 #E3AE52`, `--c5 #6CC58F`. Contraste de 1,7 à 2,2:1 pour un texte de 14 px. Illisible (capture `greenfield-bureau-sombre`). Même défaut pour les pictogrammes blancs (`#tl .ic{stroke:#fff}`) sur les pastilles claires.
- Frises, thème clair, phase Realize : blanc sur `--c3 #A86E12` = 4,3:1 pour 14 px gras. Sous le seuil AA (4,5:1). La même couleur sert à l'étiquette « FRISE » des cartes (`--k-frise`, 11 px) : 4,3:1, sous le seuil.
- Couleur de focus `#E07A2F` : 3,0:1 sur blanc, 2,7:1 sur le fond `#F3F5F8`. Le contour est dessiné hors de la carte (`outline-offset:2px`), donc sur le fond : sous le seuil de 3:1 des composants (WCAG 1.4.11).

Moyenne
- Accueil, thème sombre : les aperçus PDF restent blancs (`apercus/fiche.jpg`, `act.jpg`, `simu.jpg`). Six rectangles blancs éblouissants sur fond `#12161D`. Aucune atténuation.
- Aperçus hétérogènes : deux couvertures de deck bleu nuit à empattements, des pages de document blanches, des captures de frise minuscules. Les cartes ne parlent pas la même langue visuelle.
- Couleurs définies cinq fois : `index.html`, `lecteur.html` (fond `#E6EAF0` au lieu de `#F3F5F8`), `frise.css` (noms `--c0` à `--c5`), `glossaire.js` (préfixe `--gl-`), schéma des rôles (palette à part). Risque de dérive à chaque retouche.
- Schéma des rôles : palette propre (fond crème `#F7F6F2`, texte `#14213D`, violet `#534AB7`, vert `#0F6E56`, gris chaud `#5F5E5A`). On change de site en l'ouvrant.
- Popup, bouton « Précédent » désactivé à `opacity:.35` : un pavé gris délavé qui ressemble à une erreur d'affichage, surtout en sombre.

Basse
- « Parade » verte dans le roll-out, rouge ailleurs (point déjà ouvert au backlog).
- L'accent sarcelle `#1B7287` et le bleu des decks `#3460A8` sont proches : deux bleus sans rôle distinct.

Ce qui marche
- Palette sombre bien réglée : texte secondaire `#A3ADBD` sur `#1B212B` = 7,1:1, accent `#5FC0D4` = 7,7:1.
- Couleur par type de document et par phase : bon repérage.
- Encadré « Apport de l'IA » violet et encadré « Pour le DP » sarcelle : identifiables d'un coup d'œil.

## 2. Typographie

Moyenne
- Échelle trop fine : 17 tailles différentes (10 ; 10,5 ; 11 ; 11,5 ; 12 ; 12,5 ; 13 ; 13,5 ; 14 ; 14,5 ; 15 ; 17 ; 19 ; 22 ; 25 ; 26 ; 30 px). Les écarts de 0,5 px ne se voient pas et brouillent la hiérarchie.
- Accueil : h1 30 px, h2 19 px, titre de carte 15 px gras. Le h2 est trop proche du titre de carte : les sections ne se détachent pas.
- Titres de niveau 1 différents d'une page à l'autre : 30 px gras 700 (accueil, frises), 26 px 600 (schéma des rôles), 15 px dans le lecteur.
- Polices chargées depuis Google Fonts. Pour un site public en Europe, cela transmet l'adresse IP des visiteurs à Google ; un tribunal allemand l'a sanctionné en 2022. PDF.js est déjà copié en local : faire de même pour IBM Plex (fichiers woff2).

Basse
- IBM Plex Mono chargée en un seul poids (500) : correct, mais le code demande parfois 700 (`#tl .gl-t`), rendu en faux gras.
- Couvertures des decks en police à empattements : seul endroit où elle apparaît.

Ce qui marche
- Le couple IBM Plex Sans / Plex Mono est sobre, lisible, cohérent sur toutes les pages.
- Surtitres en Mono capitales espacées (`.eyebrow`, 12 px, +0,08 em) : signature discrète, à garder.
- Corps 15 px, interligne 1,55, `text-wrap:balance` sur les titres.

## 3. Mise en page et hiérarchie

Haute
- Accueil bureau : grilles à 3 colonnes pour 4 cartes. « Fiche de révision » (parcours) et « Bluefield » (frises) se retrouvent seules sur leur ligne, avec deux tiers de vide à droite.

Moyenne
- Accueil : aucun en-tête. La page commence par un surtitre gris de 12 px. Pas de logo, pas de bloc d'accueil, pas d'appel à l'action (« Commencer le parcours »).
- Accueil : pastille numérotée du parcours (28 px, `top:8px;left:8px`) posée sur l'aperçu. Sur la carte 4, elle masque le titre « Fiche de révision ».
- Rayons d'angle sans règle : 2, 3, 4, 6, 8, 10, 12, 14, 20, 24 px.
- Largeurs maximales différentes : 1080 px (accueil), 1280 px (frises), sans limite (lecteur).

Basse
- Pied de page de l'accueil : une phrase grise isolée, sans mention de marque ni d'auteur.
- Pas de favicon, pas de description ni d'image de partage (balises Open Graph) : un lien envoyé à un recruteur s'affiche sans aperçu.

Ce qui marche
- Grille fluide `minmax(0,1fr)` : aucun débordement constaté.
- Ordre des sections logique : parcours, certification, frises, annexes.

## 4. Cohérence entre pages

Moyenne
- Retour au portail traité trois façons : lien « ← Portail » 14 px gras au-dessus du titre (frises), lien dans une barre (lecteur, placé à droite sur téléphone), lien autonome (schéma). L'accueil n'a pas de barre du tout.
- Le schéma des rôles a ses couleurs, son h1 et son style de focus.
- Le lecteur a son propre fond (`#E6EAF0` clair, `#0E1218` sombre) alors que les autres pages utilisent `#F3F5F8` et `#12161D`.

Ce qui marche
- Sélecteur FR / EN identique partout, à la même place.
- Glossaire identique sur toutes les pages, raccourci « / » partout.

## 5. Accueil

- Haute : cartes orphelines (voir 3).
- Moyenne : identité absente (voir 3). Aperçus des frises illisibles à cette taille (capture de 1440 px réduite à 330 px).
- Moyenne : sur téléphone, la page fait 4 638 px de haut en français : 13 aperçus pleine largeur de 200 px chacun.
- Basse : « Supports annexes » sans sous-titre, contrairement aux trois autres sections.
- Ce qui marche : descriptions courtes et utiles, type en Mono coloré, étiquette « In French » nette.

## 6. Frises

Haute
- Thème sombre : libellés de phases illisibles (voir 1).

Moyenne
- Libellés d'étape placés tantôt dans la barre, tantôt à droite. « Préparation bascule » et « Run et innovation » sont traversés par la ligne rouge du go-live.
- Téléphone : la frise garde 980 px de large dans un cadre défilant. On voit de M-15 à M-10, 6 étapes sur 21, sans indice qu'il faut faire glisser. Le bouton « Glossaire » recouvre la frise.
- Popup bureau : centrée sur toute la fenêtre, elle recouvre le glossaire épinglé à moitié.
- Popup : pastille « Qui porte » en `border-radius:20px` sur deux lignes au téléphone : forme de gélule déformée.

Basse
- Les 5 causes d'échec ressemblent à des boutons (pastilles bordées) mais ne sont pas cliquables.

Ce qui marche
- Chronologie lisible sur bureau, phases colorées, quality gates en losange : le losange est le meilleur motif graphique du site.
- Popups bien structurées (Activités, Prérequis, Livrables, IA, Risques / Parade, Exemple), navigation Précédent / Suivant, compteur « 1 / 21 ».

## 7. Lecteur

- Moyenne : boutons de page `.ib` de 38 × 38 px (sous 40 px). Lien « ← Portail » de 31 px de haut.
- Moyenne : téléphone, le lien « ← Portail » passe en haut à droite, le bouton Télécharger perd son libellé (icône seule), et la page de 16:9 laisse 60 % de l'écran vide.
- Basse : aide clavier « Flèches ← → … » en 12,5 px gris tout en bas, peu visible.
- Ce qui marche : barre compacte, saisie directe du numéro de page, flèches latérales de 44 px sur bureau, bandeau de langue dans le flux.

## 8. Glossaire

Haute
- Cibles trop petites : pastilles de catégorie 25 px de haut (`padding:3px 9px`, 12,5 px), bouton « Masquer » 27 px, liens vers les documents 24 px.

Moyenne
- Téléphone : le tiroir fait `min(380px,100%)`. À 390 px, une bande de 10 px de la page reste visible à gauche, sans voile : on croit à un bug.
- Six pastilles de catégorie sur quatre lignes : 120 px de hauteur avant le premier terme.

Ce qui marche
- Recherche sans accents, surlignage, compteur « 2 / 136 », encadré « Pour le DP », liens vers les supports. Lettres collantes A, B, C.

## 9. Schéma des rôles

- Moyenne : palette et fond à part (voir 1).
- Moyenne : focus clavier faible : `.n:focus{outline:none}` et seul le trait passe à 2,5 px.
- Ce qui marche : schéma clair (client en violet, intégrateur en vert, instances en gris), exemple de la vanne, retour au portail et glossaire présents.

## 10. Téléphone

- Moyenne : accueil très long (4 638 px), frise peu exploitable, lecteur peu rempli (voir 5, 6, 7).
- Basse : bouton flottant « Glossaire » posé sur le contenu, sans marge basse réservée en fin de page.
- Ce qui marche : aucune page ne défile horizontalement ; zones sûres (`env(safe-area-inset-*)`) gérées ; popups en plein écran lisibles.

## 11. Thème sombre

- Haute : phases de frise (voir 1).
- Moyenne : aperçus blancs (voir 1).
- Ce qui marche : les cinq ensembles de variables ont leur version sombre ; `color-scheme:dark` déclaré ; forçage `data-theme` prévu.

## 12. Accessibilité

| Point | Où | Valeur | Seuil | Verdict |
|---|---|---|---|---|
| Libellés de phase, sombre | frises | 1,7 à 2,2:1 | 4,5:1 | Non conforme |
| Libellé Realize, clair | frises | 4,3:1 | 4,5:1 | Non conforme |
| Étiquette « FRISE » | accueil | 4,3:1 | 4,5:1 | Non conforme |
| Contour de focus | toutes | 2,7:1 sur le fond | 3:1 | Non conforme |
| Pastilles de catégorie | glossaire | 25 px | 40 px | Trop petit |
| « Masquer » | glossaire | 27 px | 40 px | Trop petit |
| Liens vers les supports | glossaire | 24 px | 40 px | Trop petit |
| Boutons de page | lecteur | 38 px | 40 px | Trop petit |
| Focus des rôles | schéma | trait 2,5 px | contour visible | Faible |
| Sélecteur FR / EN | toutes | 44 × 40 px | 40 px | Conforme |
| Bouton « Glossaire » | toutes | 46 px | 40 px | Conforme |
| Texte secondaire | toutes | 5,4 à 7,1:1 | 4,5:1 | Conforme |

Ce qui marche aussi : `:focus-visible` posé sur presque tous les contrôles, `prefers-reduced-motion` respecté, libellés ARIA sur les boutons à icône.

## Correctifs proposés (détail dans la maquette)

1. Libellés de phase : texte `#12161D` en sombre ; Realize clair passe à `#8F5C0C` (5,7:1), étiquette « FRISE » aussi.
2. Focus : `#C25E12` en clair (3,9:1 sur le fond), `#F0A35E` en sombre (8,7:1).
3. Cibles : pastilles, « Masquer », liens du glossaire et boutons du lecteur à 40 px minimum.
4. Un seul fichier de variables partagé (`shared/theme.css`) pour toutes les pages, schéma compris.
5. Échelle de tailles réduite à 8 valeurs : 12, 13, 14, 15, 17, 20, 24, 32 px. Rayons : 6, 10, 14 px et pastille pleine.
6. En-tête commun : logo, fil d'Ariane, sélecteur de langue.
7. Accueil : 4 colonnes pour le parcours et les frises, aperçus sur fond mat en sombre, cartes en lignes compactes sur téléphone.
8. Identité : nom, logotype en losange, favicon, mention de marque en pied de page, polices auto-hébergées.
