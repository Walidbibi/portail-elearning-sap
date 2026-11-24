# Test du lot 2 · Version anglaise du portail (US-009 à US-018)

Date : 2026-11-24
Testeur : persona-pm (mode test)
Matière : captures `outils/captures/reference-en/` et `reference/` (bureau et téléphone, clair et sombre), maquette `maquettes/US-009-version-anglaise.html`, `shared/libelles/en.json`, `documents.json`, `glossaire.en.json`, `frises/*.en.json`. Pas de navigateur : clavier, mémoire du choix et lecteurs d'écran non essayés en vrai.

Je me suis mis dans deux peaux. D'abord un chef de projet anglophone qui découvre le portail. Ensuite le même chef de projet, francophone, qui passe d'une langue à l'autre.

## Verdict

Prêt avec réserves.

Le parcours en anglais se tient. Je sais où je suis et quoi ouvrir. Deux choses me gênent vraiment : dans le glossaire, le nom français d'un terme ressemble à un nom complet anglais ; et le vocabulaire change d'un endroit à l'autre sur quelques mots clés. Rien ne bloque la publication.

## Points

### Bloquant

Aucun.

### Gênant

1. **Glossaire : le nom français se lit comme un nom complet anglais.**
   Endroit : glossaire en anglais, sur toutes les pages. Exemples visibles dans les captures : « Cutover Bascule », « Batch Lot », « Alert threshold Seuil d'alerte », « Archiving Archivage », « Downtime window Fenêtre de coupure », « Dress rehearsal Répétition générale », « Open items Données ouvertes », « Rollback Retour arrière », « Bill of materials Nomenclature, BOM ».
   En anglophone, je lis « Cutover Bascule » comme « ART Agile Release Train » : je crois que « Bascule » est le nom complet. Rien ne me dit que c'est du français.
   Cause visible dans les fichiers : dans `glossaire.en.json`, le champ `nomComplet` contient le nom français. Le repère « FR » n'apparaît que si le nom français n'est pas déjà affiché. Il n'apparaît donc presque jamais.
   La maquette validée (écran 3) montre l'inverse : « Cutover [FR] Bascule », et dit « On le distingue ainsi d'un nom complet ». La livraison n'est pas conforme sur ce point.
   Suggestion : quand `nomComplet` égale le nom français, afficher ce nom avec le repère « FR » et ne pas l'afficher comme nom complet.

2. **Glossaire : doublon sur AMS.**
   Endroit : terme « AMS ». Affiché : « Application Management Services, TMA » puis, en dessous, « [FR] TMA / AMS ». TMA apparaît deux fois, sans explication.
   Suggestion : `nomComplet` = « Application Management Services », et le repère « FR TMA » seul.

3. **ACT100 et ACT200 : « Study guide » sur la carte, « Revision Book » sur le document.**
   Endroit : cartes 3 et 4 du « Recommended path ». Le titre dit « ACT100 · Study guide ». L'aperçu, juste au-dessus, montre « SAP Activate (ACT100) – Revision Book ». ACT200 : « Revision book », avec une minuscule.
   J'ai cru un instant qu'il y avait deux documents différents.
   Suggestion : choisir un seul nom. Le plus simple : titrer les cartes « ACT100 · Revision book », puisque le PDF ne changera pas. Sinon, noter quelque part que les deux désignent le même livre.

4. **« Fix » dans les frises, « Countermeasure » dans le glossaire, pour la même idée.**
   Endroit : popups des quatre frises (« Risk · … / Fix · … », `frise.parade` dans `en.json`) ; glossaire, terme « Watermelon effect » (« Countermeasure: … »).
   En gestion de projet anglophone, le mot courant dans un registre des risques est « Mitigation ». « Fix » évoque la correction d'un bug, après coup.
   Suggestion : « Mitigation · » dans les popups, et le même mot dans le glossaire.

5. **« Warning thresholds » sur la carte, « Alert threshold » dans le glossaire.**
   Endroit : `documents.json`, `simu.en.description` (« including warning thresholds ») ; glossaire, terme « Alert threshold ».
   Un débutant cherche « warning threshold » dans le glossaire et ne trouve rien.
   Suggestion : « including alert thresholds ».

6. **Côté francophone : les livres ACT anglais n'ont pas de repère de langue.**
   Endroit : accueil en français, section « Versions anglaises et supports annexes ». « SAP Training · Summary (EN) » et « ECC to S/4HANA Migration (EN) » portent « (EN) » et une description française (« Version anglaise du deck de synthèse »). « ACT100 · Study guide » et « ACT200 · Study guide » n'ont ni « (EN) » ni description française : titre et description sont en anglais.
   En francophone, je ne comprends pas tout de suite que c'est la version anglaise du livre ACT100 que j'ai en carte 3.
   Suggestion : titres « ACT100 · Study guide (EN) » et descriptions « Version anglaise du livre de révision ACT100 » (idem ACT200), comme pour la synthèse et la migration.

7. **Le lecteur dit « en français », pas pourquoi.**
   Endroit : bandeau du lecteur, document sans version anglaise (fiche, simulation, script).
   Le bandeau « This document is in French. » est clair et bien placé. Mais l'anglophone se demande si c'est un oubli. La question Q7 dit que la traduction viendra plus tard.
   Suggestion : « This document is in French. No English version yet. » quand il n'y a pas de version anglaise.

### Détail

8. **« For the Program Director » partout, « PD » une fois.**
   Endroit : `glossaire.en.json`, terme « Alert threshold », champ `pourLeDP` : « The reflex expected of a PD in an interview. » Le sigle PD n'est défini nulle part en anglais.
   Suggestion : « The reflex expected of a program director in an interview. »

9. **« What AI brings » sur l'accueil, « How AI helps » dans les popups.**
   Endroit : `en.json`, `accueil.frisesSousTitre` ; `frise.apportIA`.
   Suggestion : aligner sur « How AI helps », par exemple « Each approach as an illustrated timeline: a running example, how AI helps, and the main failure risks. »

10. **Catégories du glossaire différentes de la maquette.**
    Endroit : `en.json`, `categories`. Maquette : « Methodology and governance », « Agile and steering ». Livré : « Method & governance », « Agile & delivery ». Les textes de la maquette étaient indicatifs : je le signale pour que Walid tranche en connaissance de cause. « Agile & delivery » me parle mieux.

11. **Greenfield : « migration » dans le titre, « new implementation » partout ailleurs.**
    Endroit : frise greenfield. Surtitre « New S/4HANA implementation », titre « A greenfield migration to S/4HANA, from A to Z », carte « New implementation, starting from the standard ». Je ne juge pas le fond SAP ; en lecteur, je me demande si c'est une migration ou non. Le français a le même écart.

12. **Libellés de barres serrés dans la frise roll-out.**
    Endroit : frise roll-out, bureau. « Acceptance » touche la ligne pointillée de G2, « Training » mord sur le bout de sa barre, « Handover to run » touche son icône. Greenfield : « Run and innovation » touche son icône. Le français a les mêmes frottements (« Formation », « Préparation bascule »). Lisible, mais le critère « sans chevaucher leurs voisins » est limite.

13. **Formulations de l'interface un peu littérales.** Propositions :
    - `accueil.intro` : « All the materials built to understand and run an SAP program, in the order to read them. » → « Every resource built to understand and run an SAP program, in reading order. »
    - `accueil.pied` : « Everything opens in the portal: documents in a page-by-page reader, with a button to download them. » → « Documents open in a page-by-page reader inside the portal, with a download button. »
    - `lecteur.erreurInconnu` : « This document does not exist. » → « Document not found. »
    - `simu.en.titre` : « Interview simulation » → « Mock interview ». Description : « Typical questions and good answers » → « Typical questions and model answers ».
    - `script.en.description` : « The text to read aloud to turn the decks into eLearning. » → « The voice-over script that turns the decks into eLearning modules. »
    - `fiche.en.description` : « to reread before an interview » → « for a last review before an interview ».
    - `blue.en.description` : « keep part, redesign the rest » → « keep some, redesign the rest ».
    - Frise greenfield, étape 1, risque : « no criteria to arbitrate afterwards » sonne comme du français traduit. Texte de Walid : je le signale seulement. Piste : « no criteria for later trade-offs ».

14. **Intro de l'accueil sur téléphone.**
    Endroit : accueil, 390 px. « The glossary stays open on the right… press “/” » est faux sur téléphone (tiroir, pas de clavier). Le français a le même texte. Hors lot, à noter pour plus tard.

## Critères d'acceptation non remplis ou non vérifiables

- **US-009** : rien de contraire vu dans les captures. Sélecteur FR | EN en haut à droite sur l'accueil et les frises, à droite de « Download » dans le lecteur, conforme à la maquette. Non vérifiable sans navigateur : clavier, mémoire du choix, `?lang=`, première visite. Le code montre un groupe nommé « Language » et des boutons `aria-pressed`, ce qui va dans le bon sens.
- **US-010** : « Walid a relu les textes de l'accueil et le nom du portail » : pas fait (journal : « Reste : relecture »). Les autres critères me semblent remplis.
- **US-011** : « Walid a relu un échantillon de 15 termes » : pas fait. Le repère FR n'est pas conforme à la maquette (point 1). Les autres critères me semblent remplis : « bascule » est bien trouvable, les liens vers les documents portent « In French » quand il le faut.
- **US-012** : remplis d'après les captures. Neuf cartes en anglais, pas de doublon, trois étiquettes « In French ». Réserve côté français : point 6.
- **US-013** : remplis d'après les captures. Bandeau dans le flux, une ligne sur bureau, deux sur téléphone, sans débordement, lien vers la version anglaise. Le critère « lecteur limité au manifeste » n'est pas vérifiable sans navigateur.
- **US-014** : « Walid a relu l'en-tête et deux popups » : pas fait. Libellés des barres : correct en greenfield, un frottement (point 12). Montants (« €9M ») et dates (« April 1 ») au format Q6, chiffres signalés comme fictifs.
- **US-015, US-016** : même réserve de relecture par Walid. Rien d'autre vu.
- **US-017** : relecture de Walid non faite. Libellés serrés (point 12). Phases Diagnose, Adjust, Deploy et gates G1 à G3 cohérentes avec le français ; légende « Gate » face à « Gate de passage » en français, cela me va.
- **US-018** : remplis. Les quatre frises ont un aperçu anglais, la fiche, la simulation et le script gardent l'aperçu français. Je n'ai pas pu vérifier le cas « aperçu manquant ».

## Besoin B-001

Couvert pour l'essentiel. Le portail bascule en anglais d'un clic, sur chaque page, sans perdre la page ouverte. Trois documents restent en français, par décision de Walid (Q7), et ils sont bien signalés. Ce qui manque pour qu'un recruteur anglophone ne bute sur rien : le repère FR du glossaire (point 1) et les quelques mots qui changent d'un endroit à l'autre (points 3, 4, 5).

## Ce qui marche bien

- Le sélecteur FR | EN : visible, au même endroit partout, l'état actif se voit d'un coup d'œil.
- L'accueil anglais sans doublon : neuf cartes, plus de suffixe « (EN) ».
- L'étiquette « In French » à côté du type, sur la carte et dans les liens du glossaire : je sais avant de cliquer.
- Le bandeau du lecteur : court, dans le flux, avec le lien vers la version anglaise.
- Les frises en anglais se lisent bien, sur téléphone comme sur bureau. « Owner », « Running example », « Timeline » sont stables d'un bout à l'autre.
- Les aperçus des frises sont en anglais : l'image correspond à ce que j'ouvre.
