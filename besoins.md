# Besoins des utilisateurs

Ce que les utilisateurs du portail attendent, avec leurs mots. Le PO s'en sert pour écrire les stories dans `backlog.md`.

Deux sources, toujours indiquées :
- **Walid** : besoins réels, vécus sur un programme SAP. Ils priment.
- **persona-pm** : besoins simulés par l'agent qui joue un chef de projet senior débutant en SAP. Ce sont des hypothèses à confirmer.

## Format d'un besoin

```
### B-001 · Titre court
- Source : Walid | persona-pm
- Importance : vital | important | confort
- Couvert par : US-… (rempli par le PO)

Situation : quand, avec qui, sous quelle pression.
Ce qui bloque : …
Ce que je voudrais pouvoir faire : …

Suivi
- 2026-11-24 · persona-pm · besoin exprimé
```

## Besoins

### B-001 · Un portail lisible en anglais
- Source : Walid
- Importance : important
- Couvert par : US-001 à US-018

Situation : le portail peut devenir public et être montré à des recruteurs ou à des équipes internationales.
Ce qui bloque : tout le texte est en français et mêlé au code des pages. Traduire aujourd'hui, c'est dupliquer chaque page.
Ce que je voudrais pouvoir faire : basculer tout le portail en anglais d'un clic, après avoir séparé le texte de la mise en page.

Suivi
- 2026-11-24 · Walid · besoin exprimé (« Version anglaise du portail. D'abord séparer le texte et la mise en page, ensuite traduire. »)
- 2026-11-24 · po · stories US-001 à US-018 dans `backlog.md`

### B-002 · Un portail qui inspire confiance et se lit partout
- Source : Walid
- Importance : important (à confirmer par Walid)
- Couvert par : US-019 à US-037

Situation : le portail est public. Walid peut l'envoyer à un recruteur ou à une équipe, qui l'ouvre souvent sur téléphone.
Ce qui bloque : pas de nom ni de logo, un nom qui ressemble à un produit SAP, des textes illisibles en thème sombre, des boutons trop petits, un accueil très long sur téléphone.
Ce que je voudrais pouvoir faire : montrer un portail qui a une identité claire, lisible par tous, agréable sur bureau comme sur téléphone.

Suivi
- 2026-11-24 · Walid · besoin exprimé (« rendre l'appli plus agréable à visiter, donner une identité au portail, un nom »)
- 2026-11-24 · po · stories US-019 à US-037 dans `backlog.md`
