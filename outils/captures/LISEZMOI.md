# Captures de référence

Ces outils prouvent qu'une refonte ne change rien à l'écran. On photographie le site avant la refonte, puis après, et on compare les deux pixel par pixel.

Il faut Node 22 ou plus récent et Google Chrome. Aucun paquet n'est à installer. Le script lance lui-même un serveur local (port 8765) et un Chrome sans fenêtre.

## Ce qui est capturé

44 images : chaque page à deux largeurs (bureau 1440 px, téléphone 390 px) et dans deux thèmes (clair, sombre).

- Accueil, frises et lecteur : la page entière (le lecteur : l'écran visible, avec la synthèse ouverte).
- Glossaire : recherche « cutover » et un terme déplié.
- Popups : la première étape de chaque frise ouverte.

Les images vont dans `reference/` (ou `apres/`). Ces dossiers sont exclus de git, donc ils ne sont pas publiés. Pour refaire une référence perdue, revenir au dernier commit d'avant la refonte et relancer le script.

## Commandes, à lancer depuis la racine du site

Toutes les pages :

```bash
node outils/captures/captures.mjs
```

Une page à la fois :

```bash
node outils/captures/captures.mjs accueil
```

```bash
node outils/captures/captures.mjs glossaire
```

```bash
node outils/captures/captures.mjs lecteur
```

```bash
node outils/captures/captures.mjs greenfield
```

```bash
node outils/captures/captures.mjs brownfield
```

```bash
node outils/captures/captures.mjs bluefield
```

```bash
node outils/captures/captures.mjs rollout
```

Une frise inclut sa popup. La langue est le français par défaut ; ajouter `--langue en` pour l'anglais (référence anglaise : `--out reference-en`). Pour capturer après une modification, ajouter `--out apres` (ou `--out apres-en --langue en`), puis comparer :

```bash
node outils/captures/comparer.mjs reference apres
```

La comparaison affiche « Identique » ou la liste des images qui diffèrent, avec le nombre de pixels.

## À savoir

- Les polices IBM Plex viennent de Google Fonts. Sans connexion internet, les captures changent.
- Deux passages successifs sur le même code donnent des images identiques (vérifié le 2026-11-24).
- Il arrive qu'une image diffère de 1 ou 2 pixels sans lien avec le code, à cause du lissage d'un bord arrondi. La comparaison classe les écarts de 5 pixels ou moins en « BRUIT » et ne les compte pas comme des régressions. La zone de chaque écart est indiquée, pour aller voir.
- Le script attend que la page ait fini de se construire (nombre d'éléments stable) avant de capturer, car l'accueil et le glossaire se remplissent après le chargement de fichiers JSON.
