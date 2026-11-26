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
- Couvert par : US-019 à US-039

Situation : le portail est public. Walid peut l'envoyer à un recruteur ou à une équipe, qui l'ouvre souvent sur téléphone.
Ce qui bloque : pas de nom ni de logo, un nom qui ressemble à un produit SAP, des textes illisibles en thème sombre, des boutons trop petits, un accueil très long sur téléphone.
Ce que je voudrais pouvoir faire : montrer un portail qui a une identité claire, lisible par tous, agréable sur bureau comme sur téléphone.

Suivi
- 2026-11-24 · Walid · besoin exprimé (« rendre l'appli plus agréable à visiter, donner une identité au portail, un nom »)
- 2026-11-24 · po · stories US-019 à US-037 dans `backlog.md`

### B-003 · Mes questions de comité, prêtes en trente secondes
- Source : persona-pm
- Importance : vital
- Couvert par : US-040 à US-048

Situation : comité de pilotage demain matin. L'intégrateur présente l'avancement d'Explore et dit « fit-to-standard terminé à 90 % ». Je révise le soir, sur téléphone.
Ce qui bloque : les risques et parades existent, mais dispersés dans les popups des frises, étape par étape, et dans la simulation d'entretien en PDF. Je ne sais pas les retrouver vite. Je ne sais pas quelles questions poser pour vérifier que ce « 90 % » est réel.
Ce que je voudrais pouvoir faire : pour la phase où en est mon projet, voir d'un coup d'œil les questions à poser à l'intégrateur, les preuves à demander et les signaux d'alerte. Le relire en cinq minutes avant d'entrer en salle.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-004 · Me tester pour savoir ce que j'ai retenu
- Source : persona-pm
- Importance : vital
- Couvert par :

Situation : je révise par tranches de dix minutes, entre deux réunions. J'ai un entretien pour un poste de directeur de programme SAP dans trois semaines.
Ce qui bloque : je lis, mais je ne sais pas ce que j'ai retenu. Le glossaire et les supports se lisent ; rien ne m'interroge. Le quiz est annoncé « à terme », il n'existe pas encore.
Ce que je voudrais pouvoir faire : répondre à quelques questions courtes par sujet (phases, rôles, bascule, tests, vocabulaire), voir la bonne réponse et le lien vers le support, et revenir sur ce que j'ai raté. Savoir où j'en suis sans créer de compte.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-005 · Des ordres de grandeur pour challenger un planning et un budget
- Source : persona-pm
- Importance : important
- Couvert par :

Situation : l'intégrateur me présente un planning de bascule et un chiffrage. Je dois les défendre ou les contester devant le sponsor.
Ce qui bloque : les exemples fil rouge donnent des chiffres, mais ils sont fictifs, et c'est normal. Je n'ai aucun repère pour dire « c'est court » ou « c'est cher » : combien de migrations à blanc, combien de répétitions de bascule, quelle part de l'effort sur les tests, quelle durée d'hypercare. Je ne sais pas non plus ce qui est une règle reconnue et ce qui dépend du projet.
Ce que je voudrais pouvoir faire : disposer de repères, avec leur source ou la mention « dépend du projet », et une liste de questions pour challenger un planning et un chiffrage. Je préfère « on ne sait pas » à un chiffre inventé.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-006 · Comprendre une recette qui dérape
- Source : persona-pm
- Importance : important
- Couvert par :

Situation : en Realize, le responsable de tests me montre un tableau d'anomalies. Le nombre d'anomalies ouvertes monte, la date de fin de recette ne bouge pas.
Ce qui bloque : le glossaire définit SIT, UAT, sévérité, critères d'entrée et de sortie. Mais je ne sais pas lire un tableau de bord de recette : quels indicateurs regarder, quelle tendance doit m'inquiéter, quand dire stop.
Ce que je voudrais pouvoir faire : savoir quoi regarder dans un suivi de tests, reconnaître une recette en dérive, et connaître les options pour réagir (décaler, réduire le périmètre, renforcer), avec leurs conséquences.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-007 · Voir un flux logistique de bout en bout
- Source : persona-pm
- Importance : important
- Couvert par :

Situation : je pilote le domaine logistique. En atelier, les consultants enchaînent livraison entrante, entrée de marchandises, Handling Unit, EWM, sortie de marchandises.
Ce qui bloque : chaque terme est dans le glossaire, isolé. Je ne vois pas l'enchaînement : qui fait quoi, dans quel ordre, quel module intervient, et ce qui change entre l'ancien système et S/4HANA. Je n'ai pas pu lire les PDF ; c'est peut-être dans le deck de synthèse ou de migration. Si oui, je ne l'ai pas trouvé depuis le site.
Ce que je voudrais pouvoir faire : suivre un flux simple (de la commande d'achat à la mise en stock, de la commande client à l'expédition) étape par étape, avec les termes du glossaire au bon endroit. Comprendre où se situent les risques de mon domaine.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé
- 2026-11-24 · Walid · en cours de son côté : il prépare des schémas explicatifs des flux logistiques. Pas de story à créer avant leur livraison ; à intégrer comme le schéma des rôles (contrôle des informations client, version FR et EN).

### B-008 · Comparer les quatre scénarios côte à côte
- Source : persona-pm
- Importance : important
- Couvert par :

Situation : le sponsor me demande pourquoi le programme a choisi un brownfield et pas un greenfield. Ou bien un recruteur me pose la question en entretien.
Ce qui bloque : il y a quatre frises très riches, mais chacune se lit seule. Pour comparer, je dois ouvrir quatre pages et naviguer de popup en popup.
Ce que je voudrais pouvoir faire : voir les quatre scénarios sur une même vue : quand on les choisit, ce qui coûte le plus, les risques principaux, la durée relative, ce que vit le métier. Pouvoir expliquer le choix en deux minutes.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-009 · Trouver une réponse vite, et savoir quoi lire selon mon temps
- Source : persona-pm
- Importance : important
- Couvert par :

Situation : en réunion, un consultant dit un mot que je ne connais pas. Ou j'ai vingt minutes dans le train.
Ce qui bloque : le glossaire cherche dans 136 termes, mais pas dans les PDF ni dans les frises. Si le mot n'y est pas, je ne sais pas si c'est un oubli du site ou un mot sans importance. Et je ne sais pas par quoi commencer quand j'ai peu de temps : le parcours conseillé ne dit pas combien de temps prend chaque support.
Ce que je voudrais pouvoir faire : chercher un mot dans tout le portail et tomber sur le bon passage. Signaler un mot absent du glossaire. Choisir quoi lire selon le temps dont je dispose.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé

### B-010 · Recruter et évaluer les profils SAP de mon équipe
- Source : persona-pm
- Importance : confort
- Couvert par :

Situation : je dois recruter un consultant logistique et valider le key user proposé par le métier. Je fais passer l'entretien seul.
Ce qui bloque : la simulation d'entretien me prépare comme candidat, pas comme recruteur. Le schéma des rôles dit qui fait quoi, mais pas comment reconnaître un bon profil.
Ce que je voudrais pouvoir faire : pour chaque rôle clé, savoir ce que j'attends, les questions à poser, et les réponses qui doivent m'alerter, sans avoir à juger moi-même le fond technique.

Suivi
- 2026-11-24 · persona-pm · besoin exprimé
