# Test du lot 1 · Séparer le texte et la mise en page (US-001 à US-008)

- Date : 2026-11-24
- Testeur : persona-pm (mode test)
- Lu : `CLAUDE.md`, `README.md`, `backlog.md` (US-001 à US-008), `besoins.md` (B-001), `shared/libelles.js`, `shared/libelles/fr.json`, `shared/documents.js`, `shared/glossaire.js`, `shared/frise.js` (début), `index.html`, `frises/greenfield.html`, `frises/greenfield.json`, `documents.json`, `glossaire.json` (début), `outils/verifier.mjs`, `.github/workflows/verifier.yml`, `outils/captures/LISEZMOI.md`, captures de référence (accueil téléphone clair, popup greenfield téléphone sombre).
- Limite : pas de navigateur. Ce qui suit vient des fichiers et du code, pas d'un essai à l'écran.

## Verdict

Prêt avec réserves.

Rien ne change à l'écran, et les textes sont bien sortis du code. Mais la promesse « mettre à jour sans code et sans risque » n'est pas encore tenue pour un propriétaire non développeur : le mode d'emploi est dans un fichier fait pour Claude, le contrôle passe après la publication, et deux pannes donnent une page muette ou illisible.

## Points classés par gravité

### Bloquant

Aucun pour publier ce lot. Le site public sera servi par GitHub Pages, donc le visiteur ne verra pas les problèmes d'ouverture locale.

### Gênant

1. **Double-clic sur `index.html` : une page illisible, sans explication.**
   Endroit : `shared/libelles.js` ligne 24, `shared/documents.js` ligne 10, `index.html`.
   Ce que je verrais d'après le code : « accueil.titre », « accueil.intro », « accueil.parcoursTitre » à la place des titres ; trois sections vides, sans aucune carte ; un glossaire titré « glossaire.titre » avec des filtres « categories.meth »… et, en guise d'aide, la clé « glossaire.erreur ». Le seul message qui explique le problème (« vérifiez que le site est servi par un serveur ») est lui-même dans `fr.json`, donc il ne s'affiche jamais dans ce cas. L'explication n'existe que dans la console du navigateur, que je n'ouvre pas.
   Je trouve acceptable de ne plus ouvrir par double-clic (Q1 tranchée). Pas acceptable de ne pas le dire à l'écran : j'aurais cru le site cassé.
   Suggestion : un message écrit en dur dans la page, qui ne dépend d'aucun fichier, et qui s'affiche quand les textes ne se chargent pas : « Ce site doit être ouvert par un serveur. Voir README.md. »

2. **Le README ne m'aurait pas prévenu.**
   Endroit : `README.md`, section « Consulter en local ».
   Il donne la commande, mais ne dit pas : que le double-clic ne marche plus ; dans quel dossier lancer la commande ; qu'il faut laisser le terminal ouvert ; comment arrêter. Rien non plus sur les fichiers de données ni sur le contrôle `node outils/verifier.mjs`. La section « Mettre à jour un document » ne parle que de remplacer un PDF.
   Suggestion : une phrase « Le double-clic sur index.html ne marche plus : … », et une section « Modifier le contenu » qui renvoie vers un mode d'emploi.

3. **Le mode d'emploi du propriétaire est dans `CLAUDE.md`.**
   Endroit : `CLAUDE.md`, sections « Le manifeste », « Le glossaire », « Les frises ».
   Ce fichier parle à Claude Code et mélange contexte, règles, structure et plan. Pour corriger une définition le soir sur mon téléphone, je ne penserais pas à l'ouvrir. La consigne « lancer `node outils/verifier.mjs` avant de publier » est cachée dans « Ce qui est prévu », point 3, pas dans les marches à suivre.
   Suggestion : un court `MODE-EMPLOI.md` (ou une section du README) avec les quatre gestes, chacun terminé par « lancer le contrôle ».

4. **Le contrôle passe après la publication, pas avant.**
   Endroit : `.github/workflows/verifier.yml` ; CLAUDE.md « Ce qui est prévu », point 2 (mise à jour via l'interface GitHub).
   Si je modifie `glossaire.json` dans l'interface GitHub, j'envoie directement sur `main`. D'après ce que je lis, rien ne lie la publication GitHub Pages au résultat du contrôle : le fichier cassé part en ligne, et l'erreur arrive ensuite dans l'onglet Actions. Je ne sais pas si GitHub me prévient par mail. Depuis GitHub, je ne peux pas lancer `node` moi-même.
   La story US-008 promet « sans risque ». C'est « avec alerte ».
   Suggestion : dire clairement ce comportement dans le mode d'emploi ; envisager que la publication attende le contrôle, ou passer par une branche et une pull request.

5. **`documents.json` cassé : accueil vide, sans aucun message.**
   Endroit : `shared/documents.js` ligne 10 (renvoie un manifeste vide), `index.html` lignes 96 à 98.
   Le glossaire et les frises ont un message d'erreur ; l'accueil, non. Un visiteur verrait les titres de section sans aucune carte. C'est la page la plus vue.
   Suggestion : le même type de message que `glossaire.erreur` sur l'accueil.

6. **Les messages d'erreur du site visent la mauvaise cause.**
   Endroit : `shared/libelles/fr.json`, `glossaire.erreur` et `frise.erreur`.
   « Vérifiez que le site est servi par un serveur » : en ligne, la cause probable est un JSON mal formé après une modification, pas le serveur. Le visiteur ne peut rien faire ; le propriétaire ne sait pas quel fichier regarder. « Servi par un serveur » est du jargon de développeur.
   Suggestion : pour le visiteur, « Contenu momentanément indisponible » ; pour le propriétaire, citer le fichier (par exemple `frises/greenfield.json`) et renvoyer au contrôle. `lecteur.erreurPdfjs` cite « PDF.js » : à remplacer par « le lecteur ».

7. **Ajouter une frise n'est pas faisable sans développeur.**
   Endroit : `CLAUDE.md`, « Ajouter une frise » ; `outils/verifier.mjs` ligne 111.
   Il faut un tracé SVG par étape (`icones`), et le contrôle bloque si une icône manque. Il faut régler `largeur` et `x1` sans savoir ce qu'est `x1`. Il faut un aperçu « capture Chrome headless ». Je m'arrêterais là. Ce n'est pas un critère du lot, mais le dire évite une fausse attente.
   Suggestion : écrire en tête « geste développeur » ; ou rendre l'icône facultative, ou piocher dans une liste d'icônes nommées.

8. **Noms de champs des frises : abrégés et mi-français mi-anglais.**
   Endroit : `CLAUDE.md`, tableau des champs ; `frises/greenfield.json`.
   Clairs : `titre`, `intro`, `causes`, `note`, `etenduePhases` (avec le tableau), `ordre`, `positions`. Compréhensibles seulement avec le tableau sous les yeux : `obj`, `act`, `pre`, `liv`, `own`, `ai`, `aig`, `r`, `ex`, `p`, `n`, `t`, `s`. Non expliqués : `eq` dans `phases` (je devine « équivalent SAP Activate » en lisant le roll-out), `id`, `x1`. `name` et `own` sont en anglais au milieu de champs français. `act` est à la fois un champ d'étape, un type de document et une clé de document.
   Pour corriger une étape, je cherche par le texte, pas par `s5` : ça marche, mais le mode d'emploi devrait le dire.
   Suggestion : expliquer `eq`, `id`, `x1` ; indiquer que `p` compte à partir de 0 ; profiter du lot 2 (traduction) pour des noms en clair si ce n'est pas trop tard.

9. **Glossaire et documents : petites hésitations à l'ajout.**
   Endroit : `CLAUDE.md`, « Ajouter un document » et « Le glossaire ».
   - Où insérer un nouveau terme ? Le code trie par ordre alphabétique (`shared/glossaire.js` ligne 65), mais le mode d'emploi ne le dit pas. J'aurais cherché la bonne place.
   - Les virgules entre entrées et les guillemets droits dans un texte ne sont pas mentionnés. Ce sont les erreurs que je ferais.
   - Clé d'un document : quelle règle (minuscules ? `synthEN` est en majuscules) ? Elle sert aussi de nom d'aperçu.
   - Les types `act` (Certification) et `prat` (Pratique) ne se devinent pas.
   - Ajouter une catégorie de glossaire demande du code (liste en dur, `shared/glossaire.js` ligne 10). Non dit.
   Suggestion : trois lignes de plus dans chaque marche à suivre.

10. **Une case cochée sans preuve (US-008).**
    Endroit : `backlog.md`, US-008, premier critère « Une GitHub Action se lance à chaque envoi ». Le journal dit « Non vérifié : l'exécution sur GitHub ». Le fichier `.github/` n'est d'ailleurs pas encore suivi par git.
    Suggestion : décocher ce critère jusqu'au premier envoi, puis le cocher avec la preuve dans le journal.

### Détail

11. **Messages du contrôle : bons, un conseil à ajouter.**
    Endroit : `outils/verifier.mjs` ligne 42.
    L'exemple « le terme « Design authority » cite le document « rolout », absent de documents.json » est parfait : je sais quoi corriger et où. Pour un JSON mal formé, la ligne signalée est souvent celle d'après l'oubli (virgule manquante en fin de ligne précédente). Le « Détail » est en anglais technique.
    Suggestion : ajouter « regardez aussi la fin de la ligne précédente ».

12. **US-001 : d'où vient la référence ?** L'outil de capture a été modifié pendant US-004 et US-007. Le journal ne dit pas si les références ont été refaites, et si oui depuis quel commit d'avant la refonte. `LISEZMOI.md` dit « revenir au dernier commit d'avant la refonte » sans le nommer. Suggestion : nommer ce commit dans `LISEZMOI.md`.

13. **Décision en attente perdue dans un journal.** US-007 : « l'étiquette Parade est verte dans le roll-out, rouge ailleurs. À trancher par Walid. » Ce point n'est pas dans les « Questions du lot 1 ». Suggestion : l'y ajouter (Q9), sinon il sera oublié.

14. **`frises/greenfield.json` est long à lire sur téléphone.** Chaque nombre est sur sa ligne : `etenduePhases` prend 25 lignes pour 6 paires. Le glossaire, un terme par ligne, est plus lisible. Suggestion : même présentation compacte pour les tableaux courts.

15. **Jargon de développeur dans les consignes.** `fetch`, JSON, clé, gabarit, SVG, Node, push, pull request, GitHub Action. Ce n'est pas du jargon SAP, donc hors glossaire, mais le propriétaire n'est pas développeur. Suggestion : un mot d'explication à la première occurrence dans le mode d'emploi.

## Critères d'acceptation non remplis ou douteux

- US-008, « Une GitHub Action se lance à chaque envoi » : non démontré (journal : non vérifié). Voir point 10.
- US-004, « message clair au lieu d'une liste vide » : rempli quand `fr.json` se charge. Faux en ouverture par double-clic : c'est la clé « glossaire.erreur » qui s'affiche. Voir point 1.
- US-002, « la page affiche la clé et non un vide » : rempli. Mais pour l'accueil, une clé visible ne suffit pas à comprendre. Voir point 1.
- Les autres critères de US-001 à US-007 me semblent remplis d'après les fichiers et le journal. Je n'ai trouvé aucun texte français en dur dans `lecteur.html` et `shared/frise.js` (hors commentaires).

## Besoin B-001

Le lot 1 le fait avancer comme annoncé : les textes d'interface (`shared/libelles/fr.json`), la liste des documents, le glossaire et les quatre frises sont hors du code. Le chargeur de libellés choisit déjà le fichier selon la langue de la page. Rien n'est encore visible pour un visiteur anglophone, ce qui est prévu (lot 2).

Un point à trancher avant le lot 2 : comment ranger l'anglais dans `documents.json`, `glossaire.json` et les frises (un fichier par langue, ou deux champs par texte). Rien ne le fixe aujourd'hui. Les stories US-011, US-012 et US-014 en dépendent.

## Ce qui marche bien

- Aucun changement à l'écran, prouvé par 44 captures. Les deux captures regardées sont propres, sans débordement sur téléphone.
- Les messages du contrôle sont en français, citent fichier, ligne et cause. Le résumé final dit la conséquence (« page vide ou lien cassé »).
- Chaque fichier de données porte un champ `_aide` qui renvoie au mode d'emploi.
- Le glossaire, un terme par ligne, se corrige facilement.
- Le journal de chaque story est précis et honnête sur ce qui n'est pas vérifié.
