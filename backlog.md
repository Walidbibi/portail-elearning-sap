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

_Aucune pour l'instant. Première étape : faire exprimer les besoins (Walid et l'agent `persona-pm`), puis demander à l'agent `po` d'en tirer les stories, avec la feuille de route du `CLAUDE.md`._
