# ECC / S/4HANA : ce qui change en logistique, et le lien avec la finance

Dossier de contenu de l'expert SAP, 26/11/2026. Besoin : B-007 (« ce qui change entre l'ancien système et S/4HANA »).
Il complète le deck « Migration ECC vers S/4HANA » (`mig`) sans le recopier. Le deck donne la vue d'ensemble : chemins de migration, calendrier, grands blocs. Ce dossier descend au niveau du domaine logistique : à quelle étape d'un flux le changement se voit, qui il touche, ce qu'il coûte au projet.

Exemple fil rouge : la vanne de carburant des flux du portail (1 240 vannes à 500 € achetées, 12 vannes à 900 € vendues). Chiffres fictifs.

---

## 0. Proposition : quatre schémas, une piste fusionnée

Mise à jour du 26/11/2026 : un schéma 0 de vue générale s'ajoute en tête, à la demande de Walid. Les schémas 1 à 3 ne changent pas.

| Rang | Schéma | Forme | Pourquoi ce rang |
|---|---|---|---|
| 0 | ECC et S/4HANA en un coup d'œil | Deux colonnes ECC / S/4HANA reliées par six dimensions, plus un bandeau « Passer de l'un à l'autre » en pied | La porte d'entrée. Un DP débutant en SAP doit d'abord savoir ce qui distingue les deux produits avant de lire le détail logistique. Il renvoie vers les schémas 1 à 3 et vers les scénarios de mise en œuvre. |
| 1 | Ce qui change, étape par étape (P2P et O2C) | Bascule « ECC / S/4HANA » ajoutée aux deux flux existants | Répond mot pour mot à B-007. Le DP suit déjà ces flux : il voit le changement là où il se produit. Coût de développement le plus bas : on enrichit `flux-p2p` et `flux-o2c`, on ne crée pas de page. |
| 2 | L'entrepôt : WM, Stock Room Management, EWM embarqué, EWM décentralisé | Matrice de quatre options + trois questions de décision | C'est le domaine du DP logistique, et le sujet le plus coûteux d'une conversion. Des dates d'usage ont changé en 2026 et le deck n'est plus à jour sur ce point (voir section 4). |
| 3 | Disparaît, remplacé, devient obligatoire | Tableau à trois colonnes ; chaque carte a une bascule avant / après et un niveau d'effort | Donne la liste à suivre en comité. Absorbe la piste « architecture avant / après » : les tables (MATDOC, ACDOCA, Business Partner) y sont des cartes, expliquées par leur conséquence projet et non par leur structure. |

Piste écartée comme schéma séparé : l'architecture avant / après (tables d'agrégats contre ACDOCA, MATDOC). Seule, elle parle aux architectes, pas au DP. Elle est fusionnée dans le schéma 3 (cartes « Agrégats de stock », « Universal Journal », « Business Partner »).

Règle commune aux schémas 1 à 3 : chaque élément cliquable a quatre rubriques, dans cet ordre : « En ECC », « En S/4HANA », « Qui est touché », « Pour le DP ». Le schéma 0 remplace « Qui est touché » par « Ce que ça change concrètement », plus parlant pour une vue générale ; la cible touchée y figure en étiquette (« Qui le voit »). Les termes en gras renvoient au glossaire.

---

## Schéma 0 · ECC et S/4HANA en un coup d'œil

### Ce qu'il montre
La différence générale entre les deux produits, en six dimensions et un passage. À gauche, ECC (l'ERP historique de SAP). À droite, S/4HANA (son successeur, lancé en 2015). Chaque dimension relie les deux colonnes par une flèche. En pied, un bandeau montre comment on passe de l'un à l'autre : les échéances de maintenance et les trois chemins de migration.

Le message central, à afficher sous le titre : « S/4HANA n'est pas une nouvelle version d'ECC. C'est un nouveau produit, sur une seule base de données, avec un modèle de données plus simple. Le passage est un programme, pas une montée de version. »

### Dimensions retenues, fusionnées, écartées
- Retenues (6 rangées) : base de données ; modèle de données ; interface ; analytique ; extension ; déploiement et rythme de mise à jour.
- Fusionnée : le rythme de mise à jour rejoint le déploiement. Il en dépend (deux versions par an en cloud public, une tous les deux ans sur site et en cloud privé) : séparés, les deux éléments se répétaient.
- Déplacée : fin de maintenance et chemins de migration ne sont pas une différence entre les produits mais le passage de l'un à l'autre. Ils forment le bandeau de pied, qui renvoie aux scénarios de mise en œuvre du portail.
- Écartée : aucune.

### Forme
- En-tête : deux titres de colonne. « ECC · SAP ERP 6.0 » (gris neutre) et « S/4HANA » (couleur de la palette). Sous chaque titre, une ligne : « L'ERP historique, toutes bases de données » / « Le successeur, sur HANA seule, depuis 2015 ».
- Six rangées. Chaque rangée a trois zones : à gauche la valeur ECC (cinq mots au plus), au centre une pastille avec le nom de la dimension et une flèche vers la droite, à droite la valeur S/4HANA. Une étiquette « Qui le voit » (Utilisateurs, Finance, Équipe IT, Contrat) se place sous la pastille, avec un mot et pas seulement une couleur.
- Clic (ou Entrée) sur n'importe quelle zone d'une rangée : popup avec quatre rubriques, dans cet ordre : « En ECC », « En S/4HANA », « Ce que ça change concrètement », « Pour le DP ». Navigation Précédent / Suivant entre les rangées, puis vers le bandeau.
- Bandeau de pied « Passer de l'un à l'autre » : une petite ligne de temps (fin 2027, fin 2030, 2033 à 2035, fin 2040) et trois boutons « Greenfield », « Brownfield », « Bluefield » qui ouvrent les scénarios de mise en œuvre (`frises/greenfield.html`, `frises/brownfield.html`, `frises/bluefield.html`). Clic sur le bandeau : popup avec les mêmes quatre rubriques.
- Pied : « Pour aller plus loin » : schéma 1 (ce qui change étape par étape), schéma 2 (l'entrepôt), schéma 3 (disparaît, remplacé, obligatoire), deck `mig`. Mention « Dates lues le 26/11/2026 ».
- Téléphone : les rangées s'empilent. Chaque carte porte le nom de la dimension, puis « ECC : … » et « S/4HANA : … » sur deux lignes.
- Exemple fil rouge : dans les popups, le paragraphe sur la vanne de carburant porte le repère ambre du fil rouge (seul usage de l'ambre).
- Champs JSON proposés par élément : `id`, `dimension`, `qui` (liste), `ecc` (libellé court), `s4` (libellé court), `enEcc`, `enS4`, `concret`, `exemple` (facultatif), `dp`.

### S0.1 Français

**Rangée 1 · Base de données** · ECC : « Toutes bases (Oracle, DB2, SQL Server…) » → S/4HANA : « HANA seule, en mémoire » · Qui le voit : Équipe IT, Contrat
- En ECC : ECC tourne sur la base de données choisie par l'entreprise : Oracle, IBM DB2, Microsoft SQL Server, SAP ASE, SAP MaxDB ou SAP HANA. La base stocke les données sur disque et garde des tables de totaux pour répondre vite.
- En S/4HANA : S/4HANA ne tourne que sur **HANA**, la base de SAP qui garde les données en mémoire et les range par colonnes. Elle calcule les totaux à la demande, sans tables intermédiaires. C'est ce qui permet le modèle de données simplifié (rangée 2).
- Ce que ça change concrètement : changer de produit oblige à changer de base, si l'entreprise n'est pas déjà sur HANA. Un ECC déjà sur HANA (« Suite on HANA ») reste un ECC : la base seule ne fait pas S/4HANA. La taille de la mémoire dépend du volume de données : moins de données anciennes, moins de mémoire à payer.
- Exemple : si l'ECC de Ternova (fictif, scénario brownfield) tourne sur une autre base que HANA, sa conversion comprend aussi la migration de base vers HANA, faite en même temps (DMO).
- Pour le DP : trois sujets sur le chemin critique technique dès le cadrage. Le dimensionnement (**Sizing**), qui fixe le coût d'infrastructure. L'**Archivage** des données anciennes, qui réduit la mémoire et la **Fenêtre de coupure**. La migration de base (**DMO**) si l'ERP n'est pas déjà sur HANA. Faire chiffrer les trois avant de signer le budget.

**Rangée 2 · Modèle de données** · ECC : « Tables multiples, agrégats, réconciliations » → S/4HANA : « Tables uniques, calcul à la volée » · Qui le voit : Finance, Équipe IT
- En ECC : une même opération s'écrit dans plusieurs tables. Un mouvement de stock va dans une table d'en-tête, une table de postes et des tables de stock agrégé. Une écriture de coût va d'un côté en comptabilité générale (**FI**), de l'autre en contrôle de gestion (**CO**). Clients et fournisseurs ont chacun leur fiche.
- En S/4HANA : une table par grand objet. Les mouvements de stock vont dans **MATDOC**. Les écritures de FI et de CO vont ensemble dans le **Universal Journal**. Clients et fournisseurs deviennent des **Business Partner**. Les tables d'agrégats disparaissent : HANA calcule les totaux à la lecture.
- Ce que ça change concrètement : moins de réconciliations entre la logistique, la comptabilité et le contrôle de gestion. Mais tout programme spécifique qui écrivait dans les anciennes tables doit être repris, et les fiches clients et fournisseurs doivent être converties avant la migration (**CVI**).
- Exemple : la réception des 1 240 vannes de carburant à 500 € (chiffres fictifs). En ECC, elle s'écrit dans quatre à cinq tables : document article, stock agrégé, pièce comptable de 620 000 €. En S/4HANA, une ligne dans MATDOC pour le stock et des lignes dans le Universal Journal pour la valeur, où la finance et le contrôle de gestion lisent les mêmes données.
- Pour le DP : c'est la dimension la plus coûteuse d'une conversion, et la moins visible au comité. Demander tôt deux chiffres : le nombre de programmes spécifiques touchés (analyse **ATC**) et le nombre de fiches clients et fournisseurs en erreur de conversion. Le détail est dans le schéma 3.

**Rangée 3 · Interface** · ECC : « SAP GUI, écrans par transaction » → S/4HANA : « Fiori, applications par rôle » · Qui le voit : Utilisateurs
- En ECC : l'utilisateur travaille dans **SAP GUI**, un logiciel installé sur le poste. Il ouvre des transactions par leur code (par exemple ME21N pour créer une commande d'achat) et passe d'un écran dense à l'autre.
- En S/4HANA : **Fiori** est l'interface cible : des applications web, dans un navigateur, sur ordinateur, tablette ou téléphone. Chaque utilisateur voit les applications de son rôle (**Business Roles / Business Catalogs**). Sur site et en cloud privé, SAP GUI reste utilisable pour de nombreuses transactions. En cloud public, l'accès passe par Fiori.
- Ce que ça change concrètement : c'est le changement que tout le monde voit le premier jour. Les gestes changent, les droits d'accès se refont par rôle, la formation change de nature.
- Exemple : en ECC, le magasinier saisit la réception des vannes sur un poste fixe en SAP GUI. En S/4HANA, il peut la confirmer sur une application Fiori, depuis une tablette, au quai de réception.
- Pour le DP : décider tôt, rôle par rôle, qui passe à Fiori au démarrage et qui garde SAP GUI. Sans cette décision, on forme deux fois et on refait les rôles deux fois. Le chantier des rôles et habilitations est souvent sous-estimé : le chiffrer à part.

**Rangée 4 · Analytique** · ECC : « Rapports la nuit, entrepôt de données séparé » → S/4HANA : « Analytique embarquée, temps réel » · Qui le voit : Utilisateurs, Finance
- En ECC : les rapports opérationnels sont lents sur les gros volumes. On copie donc les données, souvent la nuit, dans un entrepôt de données séparé (**BW**) pour les analyser. Les chiffres du matin sont ceux de la veille.
- En S/4HANA : l'**Analytique embarquée** lit les données directement dans le système, en temps réel, grâce à HANA. Les rapports opérationnels (stock, commandes en retard, marge) n'ont plus besoin de copie. Un entrepôt de données reste utile pour consolider plusieurs systèmes ou de longs historiques ; **SAP Analytics Cloud** sert aux tableaux de bord et à la planification.
- Ce que ça change concrètement : une partie des rapports BW et des rapports spécifiques n'a plus de raison d'être. Le reporting change de forme pour le métier : moins de fichiers du matin, plus d'indicateurs à jour dans les applications.
- Exemple : la vente de 12 vannes à 900 € (chiffres fictifs). En ECC, la marge (10 800 € de chiffre d'affaires, 6 000 € de coût, 4 800 € de marge) apparaît dans le rapport du lendemain. En S/4HANA, elle est visible dès la sortie de marchandises et la facture.
- Pour le DP : inscrire l'inventaire des rapports au périmètre, dès le cadrage : lesquels garder, lesquels remplacer par l'analytique embarquée, lesquels supprimer. Désigner un responsable du reporting. Sinon le métier découvre au démarrage que ses rapports du lundi ont disparu.

**Rangée 5 · Extension** · ECC : « Code Z, modifications du standard » → S/4HANA : « Clean Core : extensions prévues, BTP » · Qui le voit : Équipe IT, Contrat
- En ECC : l'entreprise adapte le système par du **Développement Z** : programmes spécifiques, et parfois modifications du code standard de SAP. Après quinze ou vingt ans, un ECC compte souvent des milliers d'objets spécifiques (**Dette technique**).
- En S/4HANA : SAP pousse le **Clean Core** : ne pas modifier le standard, étendre seulement par des moyens prévus. Trois niveaux : l'extension sans code par un utilisateur avancé (**Key User Extensibility**, dite « in-app »), le développement dans le système avec des règles strictes (**ABAP Cloud**, **API publiée**), et le développement à côté du système, sur **BTP** (**Extension side-by-side**). En cloud public, seules ces voies sont ouvertes.
- Ce que ça change concrètement : chaque développement spécifique d'ECC doit être jugé : supprimé (le standard le fait), refait selon les règles du Clean Core, ou gardé tel quel en sachant qu'il ralentira les montées de version.
- Exemple : Ternova (fictif) veut un champ « numéro de certification » sur la fiche de la vanne. En ECC, un développeur ajoute un champ Z à la table et modifie l'écran. En S/4HANA, un utilisateur avancé ajoute le champ par Key User Extensibility, sans code, et le champ survit aux montées de version.
- Pour le DP : le volume de code spécifique est un des premiers chiffres à obtenir, et l'une des premières décisions de gouvernance. Donner à la **Design authority** le mandat de refuser un développement qui contourne le standard. Le coût d'un spécifique ne s'arrête pas au projet : il se paie à chaque montée de version.

**Rangée 6 · Déploiement et rythme de mise à jour** · ECC : « Sur site, packages d'amélioration » → S/4HANA : « Sur site, cloud privé ou public ; versions régulières » · Qui le voit : Contrat, Équipe IT
- En ECC : le système est installé **On-premise** (chez l'entreprise ou chez un hébergeur). Les nouveautés arrivent par des packages d'amélioration (**EhP**) que l'entreprise installe quand elle veut. Le dernier, l'EhP 8, date de 2016 : ECC ne reçoit plus de nouveautés.
- En S/4HANA : trois modes. Sur site, géré par l'entreprise. En cloud privé (**SAP Cloud ERP**, version Private, vendue dans **RISE with SAP**) : un système dédié, hébergé et opéré en partie par SAP. En cloud public (SAP Cloud ERP, version publique) : un système partagé, standard, sans code dans le cœur (**Cloud public / Cloud privé**). Le rythme suit le mode. Sur site et en cloud privé : une nouvelle version tous les deux ans depuis la version 2023, maintenue sept ans, avec des **Feature Pack Stack** tous les six mois pendant ses deux premières années ; l'entreprise choisit quand monter. En cloud public : deux versions par an, imposées par SAP.
- Ce que ça change concrètement : le choix du mode change le contrat (licence ou abonnement), la répartition des rôles avec SAP et le droit d'adapter le système. Après le démarrage, la **Montée de version** devient régulière : ce n'est plus un projet tous les dix ans, c'est un cycle.
- Exemple : Calvane et Ternova (fictifs) ont choisi le cloud privé via RISE (voir leurs scénarios). Calvane, qui part de zéro, aurait pu viser le cloud public : il aurait alors accepté un standard strict et deux montées de version par an.
- Pour le DP : le mode de déploiement se décide avant le choix du chemin de migration, car il le contraint (le cloud public n'accepte qu'une nouvelle implémentation). Après le démarrage, prévoir au budget de run une équipe et un calendrier de tests de non-régression pour chaque montée de version. Plus le cœur est propre (rangée 5), plus ce cycle coûte peu.

**Bandeau · Passer de l'un à l'autre** · Échéances et chemins · Qui le voit : Direction, Contrat
- En ECC : maintenance standard jusqu'à fin 2027. Maintenance étendue payante de 2028 à fin 2030 (**Maintenance étendue**). Au-delà, seulement pour des systèmes déplacés en cloud privé avant fin 2030 : la **Transition option**, de 2031 à 2033, et jusqu'à fin 2035 sous conditions depuis octobre 2026.
- En S/4HANA : SAP s'engage à maintenir S/4HANA au moins jusqu'à fin 2040. Chaque version sur site ou en cloud privé est maintenue sept ans, ce qui oblige à monter de version au moins une fois dans cette période.
- Ce que ça change concrètement : trois chemins pour passer. **Greenfield** : nouvelle implémentation, on repart du standard et on ne reprend que les données utiles. **Brownfield** : conversion du système existant, avec son paramétrage, son code et son historique. **Bluefield** : transition sélective, on garde une partie et on reconçoit le reste. Un bouton par chemin ouvre le scénario de mise en œuvre du portail.
- Exemple : les quatre entreprises fictives du portail suivent chacune un chemin : Calvane (greenfield), Ternova (brownfield), Alvéa (bluefield), Nordval (roll-out d'un modèle déjà en place vers un nouveau site).
- Pour le DP : partir de l'échéance et rétroplanifier. Pour un programme qui démarre fin 2026, fin 2027 est très proche : la maintenance étendue devient souvent l'hypothèse réaliste, et son surcoût entre dans le **Business case**. Le choix du chemin se fait par un comité de direction, sur la base du SAP Readiness Check et de l'ambition de transformation, pas par l'équipe technique seule.

### S0.2 English

Header line: "S/4HANA is not a new version of ECC. It is a new product, on a single database, with a simpler data model. Moving to it is a programme, not an upgrade."

Column titles: "ECC · SAP ERP 6.0" / "The legacy ERP, any database"; "S/4HANA" / "The successor, HANA only, since 2015".

**Row 1 · Database** · ECC: "Any database (Oracle, DB2, SQL Server…)" → S/4HANA: "HANA only, in memory" · Who sees it: IT team, Contract
- In ECC: ECC runs on the database the company chose: Oracle, IBM DB2, Microsoft SQL Server, SAP ASE, SAP MaxDB or SAP HANA. The database stores data on disk and keeps totals tables to answer fast.
- In S/4HANA: S/4HANA runs only on **HANA**, SAP's database that keeps data in memory, organised by columns. It computes totals on demand, without intermediate tables. This is what makes the simplified data model possible (row 2).
- What it changes in practice: changing product means changing database, unless the company is already on HANA. An ECC already on HANA ("Suite on HANA") is still an ECC: the database alone does not make S/4HANA. Memory size depends on data volume: less old data, less memory to pay for.
- Example: if the ECC of Ternova (fictitious, brownfield scenario) runs on a database other than HANA, its conversion also includes the database migration to HANA, done at the same time (DMO).
- For the PD: three topics on the technical critical path from scoping. **Sizing**, which sets the infrastructure cost. **Archiving** of old data, which reduces memory and the **downtime window**. Database migration (**DMO**) if the ERP is not already on HANA. Have all three costed before signing the budget.

**Row 2 · Data model** · ECC: "Many tables, aggregates, reconciliations" → S/4HANA: "Single tables, computed on the fly" · Who sees it: Finance, IT team
- In ECC: one transaction is written to several tables. A stock movement goes to a header table, an item table and aggregated stock tables. A cost posting goes to financial accounting (**FI**) on one side and controlling (**CO**) on the other. Customers and vendors each have their own record.
- In S/4HANA: one table per major object. Stock movements go to **MATDOC**. FI and CO postings go together into the **Universal Journal**. Customers and vendors become **Business Partners**. Aggregate tables are gone: HANA computes totals when reading.
- What it changes in practice: fewer reconciliations between logistics, accounting and controlling. But every custom program that wrote to the old tables must be reworked, and customer and vendor records must be converted before the migration (**CVI**).
- Example: receipt of the 1,240 fuel valves at €500 (fictitious figures). In ECC, it is written to four or five tables: material document, aggregated stock, €620,000 accounting document. In S/4HANA, one line in MATDOC for stock and lines in the Universal Journal for value, where finance and controlling read the same data.
- For the PD: the most expensive dimension of a conversion, and the least visible to the steering committee. Ask early for two figures: the number of custom programs affected (**ATC** analysis) and the number of customer and vendor records failing conversion. Details are in diagram 3.

**Row 3 · User interface** · ECC: "SAP GUI, screens by transaction" → S/4HANA: "Fiori, apps by role" · Who sees it: Users
- In ECC: users work in **SAP GUI**, software installed on the PC. They open transactions by code (for example ME21N to create a purchase order) and move between dense screens.
- In S/4HANA: **Fiori** is the target interface: web apps in a browser, on PC, tablet or phone. Each user sees the apps of their role (**Business Roles / Business Catalogs**). On premise and in private cloud, SAP GUI remains usable for many transactions. In public cloud, access goes through Fiori.
- What it changes in practice: this is the change everyone sees on day one. Gestures change, access rights are rebuilt by role, training changes in nature.
- Example: in ECC, the warehouse clerk enters the valve receipt on a fixed PC in SAP GUI. In S/4HANA, they can confirm it in a Fiori app, from a tablet, at the receiving dock.
- For the PD: decide early, role by role, who moves to Fiori at go-live and who keeps SAP GUI. Without that decision, you train twice and build roles twice. Roles and authorisations are often underestimated: cost them separately.

**Row 4 · Analytics** · ECC: "Overnight reports, separate data warehouse" → S/4HANA: "Embedded analytics, real time" · Who sees it: Users, Finance
- In ECC: operational reports are slow on large volumes. Data is therefore copied, often overnight, into a separate data warehouse (**BW**) for analysis. The morning figures are yesterday's.
- In S/4HANA: **Embedded analytics** reads data directly in the system, in real time, thanks to HANA. Operational reports (stock, late orders, margin) no longer need a copy. A data warehouse remains useful to consolidate several systems or long histories; **SAP Analytics Cloud** serves dashboards and planning.
- What it changes in practice: part of the BW reports and custom reports lose their purpose. Reporting changes shape for the business: fewer morning files, more up-to-date indicators inside the apps.
- Example: the sale of 12 valves at €900 (fictitious figures). In ECC, the margin (€10,800 revenue, €6,000 cost, €4,800 margin) shows in the next day's report. In S/4HANA, it is visible as soon as the goods issue and invoice are posted.
- For the PD: put the report inventory in scope from scoping: which to keep, which to replace with embedded analytics, which to drop. Name a reporting owner. Otherwise the business finds out at go-live that its Monday reports are gone.

**Row 5 · Extensions** · ECC: "Z code, changes to the standard" → S/4HANA: "Clean Core: planned extensions, BTP" · Who sees it: IT team, Contract
- In ECC: the company adapts the system with **Z developments**: custom programs, and sometimes changes to SAP's standard code. After fifteen or twenty years, an ECC often holds thousands of custom objects (**technical debt**).
- In S/4HANA: SAP pushes the **Clean Core**: do not modify the standard, extend only through planned means. Three levels: no-code extension by a key user (**Key User Extensibility**, called "in-app"), development inside the system under strict rules (**ABAP Cloud**, **published APIs**), and development next to the system, on **BTP** (**side-by-side extension**). In public cloud, only these routes are open.
- What it changes in practice: each ECC custom development must be judged: dropped (the standard does it), rebuilt under Clean Core rules, or kept as is, knowing it will slow down upgrades.
- Example: Ternova (fictitious) wants a "certification number" field on the valve record. In ECC, a developer adds a Z field to the table and changes the screen. In S/4HANA, a key user adds the field through Key User Extensibility, without code, and the field survives upgrades.
- For the PD: the volume of custom code is one of the first figures to get, and one of the first governance decisions. Give the **design authority** the mandate to refuse any development that bypasses the standard. The cost of custom code does not stop at the project: it is paid at every upgrade.

**Row 6 · Deployment and update rhythm** · ECC: "On premise, enhancement packages" → S/4HANA: "On premise, private or public cloud; regular releases" · Who sees it: Contract, IT team
- In ECC: the system is installed **on premise** (at the company or a hosting provider). New features come through enhancement packages (**EhP**) that the company installs when it wants. The last one, EhP 8, dates from 2016: ECC no longer receives new features.
- In S/4HANA: three modes. On premise, run by the company. Private cloud (**SAP Cloud ERP**, Private version, sold in **RISE with SAP**): a dedicated system, hosted and partly operated by SAP. Public cloud (SAP Cloud ERP, public version): a shared, standard system, with no code in the core (**public cloud / private cloud**). The rhythm follows the mode. On premise and in private cloud: a new release every two years since release 2023, maintained for seven years, with **Feature Pack Stacks** every six months during its first two years; the company chooses when to upgrade. In public cloud: two releases a year, set by SAP.
- What it changes in practice: the choice of mode changes the contract (licence or subscription), the split of roles with SAP and the right to adapt the system. After go-live, **upgrades** become regular: no longer a project every ten years, but a cycle.
- Example: Calvane and Ternova (fictitious) chose private cloud through RISE (see their scenarios). Calvane, starting from scratch, could have aimed for public cloud: it would then have accepted a strict standard and two upgrades a year.
- For the PD: the deployment mode is decided before the migration path, because it constrains it (public cloud only accepts a new implementation). After go-live, budget a run team and a regression test calendar for each upgrade. The cleaner the core (row 5), the cheaper this cycle.

**Banner · Moving from one to the other** · Deadlines and paths · Who sees it: Executives, Contract
- In ECC: mainstream maintenance until end 2027. Paid extended maintenance from 2028 to end 2030 (**extended maintenance**). Beyond that, only for systems moved to private cloud before end 2030: the **transition option**, 2031 to 2033, and up to end 2035 under conditions since October 2026.
- In S/4HANA: SAP commits to maintaining S/4HANA at least until end 2040. Each on-premise or private cloud release is maintained for seven years, which forces at least one upgrade within that period.
- What it changes in practice: three paths. **Greenfield**: new implementation, starting from the standard and taking only useful data. **Brownfield**: conversion of the existing system, with its configuration, code and history. **Bluefield**: selective transition, keeping part and redesigning the rest. One button per path opens the portal's implementation scenario.
- Example: each of the portal's four fictitious companies follows a path: Calvane (greenfield), Ternova (brownfield), Alvéa (bluefield), Nordval (roll-out of a model already in place to a new site).
- For the PD: start from the deadline and plan backwards. For a programme starting at the end of 2026, end 2027 is very close: extended maintenance often becomes the realistic assumption, and its extra cost goes into the **business case**. The path is chosen by an executive committee, based on the SAP Readiness Check and the transformation ambition, not by the technical team alone.

---

## 1. Schéma 1 · Ce qui change, étape par étape (P2P et O2C)

### Ce qu'il montre
Les deux flux existants, avec les mêmes étapes et le même exemple. Une bascule en haut de page « Voir ce qui change en S/4HANA » ajoute sur chaque étape une pastille d'impact (Faible / Moyen / Fort, fourchette permise, avec un mot de précision : « préalable », « côté finance », « selon l'entrepôt » ; décision du 26/11/2026 sur la maquette) et, dans la popup, un bloc « ECC → S/4HANA ».

### Forme
- Bascule à deux positions dans l'en-tête du flux : « Le flux » (vue actuelle) / « ECC → S/4HANA ».
- Pastille d'impact sur chaque étape quand la bascule est active. Trois niveaux, avec un mot et pas seulement une couleur (accessibilité).
- Clic sur l'étape : la popup existante affiche en plus le bloc ci-dessous, avant « À surveiller ».
- Champs JSON proposés par étape : `s4.impact` (`faible|moyen|fort`), `s4.de` (bas de la fourchette, facultatif), `s4.precision` (facultatif), `s4.ecc`, `s4.s4`, `s4.qui`, `s4.dp`.

### 1.1 Procure-to-Pay (P2P) · français

**Étape 1 · Besoin d'achat** · Impact : faible
- En ECC : le calcul des besoins (**MRP**, transaction MD01) tourne en lot, souvent la nuit. Les demandes d'achat sortent le matin.
- En S/4HANA : **MRP Live** calcule dans la base HANA, en minutes. Le planificateur suit ses alertes dans des applications **Fiori**. La demande d'achat ne change pas.
- Qui est touché : planificateurs, approvisionneurs.
- Pour le DP : peu d'effort de construction. L'effort est dans les tests : comparer les propositions d'achat ECC et S/4HANA sur un même jeu de données. Un écart non expliqué fait perdre la confiance des planificateurs.

**Étape 2 · Commande au fournisseur** · Impact : fort (préalable)
- En ECC : le fournisseur est une fiche fournisseur, séparée de la fiche client même s'il s'agit de la même entreprise.
- En S/4HANA : le fournisseur est un **Business Partner**. Une seule fiche porte ses rôles (fournisseur, client). La commande elle-même change peu ; les applications Fiori d'achat deviennent l'écran courant.
- Qui est touché : acheteurs, équipe données de base, équipe interfaces (tout échange qui lit les fiches fournisseurs).
- Pour le DP : la conversion des fiches (**CVI**) est un préalable bloquant d'un brownfield. Lancer le nettoyage des fournisseurs des mois avant la conversion. Indicateur : nombre de fiches en erreur de conversion, à suivre chaque semaine.

**Étape 3 · Réception de la marchandise** · Impact : fort
- En ECC : chaque **entrée de marchandises** écrit un document article en deux tables (en-tête et postes) et met à jour des tables de stock agrégé. L'entrepôt tourne souvent avec **LE-WM**, dans l'ERP.
- En S/4HANA : le document article est écrit dans une seule table, **MATDOC**. Le stock se calcule à la volée, sans tables d'agrégats. L'entrepôt passe à **EWM** (ou à Stock Room Management, voir schéma 2). Le reste de l'étape (livraison entrante, **ASN**) ne change pas.
- Qui est touché : magasiniers (nouveaux écrans, nouveaux terminaux si EWM), équipe développement (programmes spécifiques qui lisent les anciennes tables), équipe reporting.
- Pour le DP : SAP fournit des vues de compatibilité, donc le code qui lit les anciennes tables fonctionne en général ; celui qui y écrit doit être corrigé. Faire mesurer ce point par l'analyse de code (**ATC**) dès le cadrage. Le vrai coût de l'étape est le passage à EWM, souvent un projet dans le projet.

**Étape 4 · Contrôle qualité** · Impact : faible
- En ECC : **QM** crée le lot de contrôle à la réception ; la décision d'emploi libère ou bloque le stock.
- En S/4HANA : même logique. Avec EWM, le contrôle peut se faire dans l'entrepôt, et la libération du stock passe par l'échange entre QM et EWM.
- Qui est touché : contrôleurs qualité, équipe EWM.
- Pour le DP : faire tester le circuit complet réception, contrôle, libération, rangement. C'est là que QM et EWM se croisent et que les défauts d'intégration apparaissent.

**Étape 5 · Facture du fournisseur** · Impact : fort (côté finance)
- En ECC : le rapprochement à trois (commande, réception, facture) passe par le compte d'attente **GR/IR**. La facture écrit en comptabilité générale (FI). Le contrôle de gestion (CO) tient ses propres tables : les écarts de prix et les coûts se rapprochent entre FI et CO à la clôture.
- En S/4HANA : même rapprochement à trois. Mais chaque écriture va dans une seule table, le **Universal Journal** (ACDOCA), où FI et CO écrivent ensemble. Le stock est valorisé par le **Material Ledger**, obligatoire.
- Qui est touché : comptabilité fournisseurs, contrôle de gestion, équipe reporting financier.
- Pour le DP : la logistique produit les écritures, la finance les lit. Tout changement de valorisation (prix standard, prix moyen) se voit en finance. Exiger des tests qui vérifient le montant de l'écriture, pas seulement que la transaction passe. Nettoyer le compte GR/IR avant la bascule : les écarts anciens migrent sinon avec le reste.

**Étape 6 · Paiement** · Impact : faible
- En ECC : programme de paiement, fichier vers la banque.
- En S/4HANA : même programme de paiement, avec des applications Fiori de suivi. Le fournisseur payé est un Business Partner.
- Qui est touché : trésorerie, comptabilité fournisseurs.
- Pour le DP : faire retester les formats bancaires et les coordonnées bancaires converties avec les Business Partners. Une erreur ici se voit chez le fournisseur.

### 1.2 Order-to-Cash (O2C) · français

**Étape 1 · Commande client** · Impact : fort (préalable)
- En ECC : le client est une fiche client. Les remises de fin d'année (ristournes) se gèrent par des accords de ristourne SD.
- En S/4HANA : le client est un **Business Partner**. Les accords de ristourne SD sont remplacés par les contrats de conditions et le **Settlement Management**. La saisie de commande reste proche.
- Qui est touché : service client, administration des ventes, équipe données de base, contrôle de gestion (ristournes).
- Pour le DP : les accords de ristourne en cours doivent être soldés avant la bascule, puis recréés sous la nouvelle forme. Caler la date de conversion sur le calendrier des ristournes.

**Étape 2 · Disponibilité et crédit** · Impact : fort
- En ECC : contrôle de disponibilité (**ATP**) classique. Contrôle de crédit dans SD (gestion du crédit FI-AR).
- En S/4HANA : l'ATP devient l'ATP avancé (**aATP**), avec des règles d'allocation et de confirmation par lots de commandes. Le contrôle de crédit passe à **SAP Credit Management** (composant FSCM), seul outil disponible.
- Qui est touché : service client, credit managers, planificateurs.
- Pour le DP : la gestion du crédit est un vrai chantier (limites à reprendre, nouveaux rôles, nouveaux écrans). Ne pas la ranger dans « technique ». Côté ATP : faire valider les règles de confirmation par le métier ; elles changent les dates promises, donc le taux de livraison à l'heure (**OTD**).

**Étape 3 · Livraison sortante** · Impact : faible à fort selon l'entrepôt
- En ECC : la **livraison sortante** déclenche un ordre de transfert dans LE-WM, ou part vers un EWM séparé par interface.
- En S/4HANA : avec **EWM embarqué**, la livraison passe à l'entrepôt dans le même système, sans interface externe. Avec **EWM décentralisé**, l'interface demeure.
- Qui est touché : service expéditions, équipe EWM, équipe interfaces.
- Pour le DP : le choix d'entrepôt (schéma 2) décide de la charge de cette étape. Suivre le nombre de livraisons non transmises à l'entrepôt pendant les tests et l'**hypercare**.

**Étape 4 · Préparation et sortie** · Impact : fort
- En ECC : prélèvement par ordres de transfert LE-WM ; **sortie de marchandises** écrite dans les tables d'en-tête et de postes.
- En S/4HANA : prélèvement par tâches EWM, avec **Handling Units** ; la sortie s'écrit dans **MATDOC**, le coût des ventes dans le **Universal Journal**.
- Qui est touché : préparateurs, chefs d'équipe entrepôt, équipe matériel (terminaux, imprimantes d'étiquettes).
- Pour le DP : formation des opérateurs et matériel sur le chemin critique de la bascule entrepôt. Prévoir des répétitions en entrepôt réel, pas seulement en salle.

**Étape 5 · Facturation** · Impact : faible à moyen
- En ECC : la facture SD crée la créance, le chiffre d'affaires et la TVA ; l'impression passe par le système de messages (NAST).
- En S/4HANA : même logique comptable, écrite dans le Universal Journal. Les éditions peuvent passer au nouvel output management (règles BRF+) ; l'ancien système de messages reste possible selon les cas (à vérifier sur le catalogue des simplification items pour la version cible).
- Qui est touché : facturation, équipe éditions et formulaires.
- Pour le DP : chaque formulaire (facture, bon de livraison) est à retester. Leur nombre est souvent sous-estimé au cadrage.

**Étape 6 · Encaissement** · Impact : faible
- En ECC : lettrage des paiements clients sur les créances.
- En S/4HANA : même logique, avec des applications Fiori et le Business Partner. Le reporting client devient en temps réel (plus d'attente du rapport de la nuit).
- Qui est touché : comptabilité clients, credit managers.
- Pour le DP : peu de risque propre. Surveiller les créances ouvertes reprises à la bascule (**réconciliation** des soldes).

### 1.3 Procure-to-Pay (P2P) · English

**Step 1 · Purchase need** · Impact: low
- In ECC: material requirements planning (**MRP**, transaction MD01) runs in batch, often overnight. Purchase requisitions come out in the morning.
- In S/4HANA: **MRP Live** runs inside the HANA database, in minutes. Planners follow their alerts in **Fiori** apps. The purchase requisition does not change.
- Who is affected: planners, buyers.
- For the PD: little build effort. The effort is in testing: compare ECC and S/4HANA purchase proposals on the same data set. An unexplained gap costs the planners' trust.

**Step 2 · Order to supplier** · Impact: high (prerequisite)
- In ECC: the supplier is a vendor record, separate from the customer record even for the same company.
- In S/4HANA: the supplier is a **Business Partner**. One record carries its roles (supplier, customer). The purchase order itself changes little; Fiori purchasing apps become the usual screen.
- Who is affected: buyers, master data team, interface team (any exchange that reads vendor records).
- For the PD: converting the records (**CVI**) is a blocking prerequisite of a brownfield. Start supplier clean-up months before the conversion. Indicator: number of records failing conversion, tracked weekly.

**Step 3 · Goods receipt** · Impact: high
- In ECC: each **goods receipt** writes a material document in two tables (header and items) and updates aggregated stock tables. The warehouse often runs on **LE-WM**, inside the ERP.
- In S/4HANA: the material document goes into a single table, **MATDOC**. Stock is computed on the fly, with no aggregate tables. The warehouse moves to **EWM** (or Stock Room Management, see diagram 2). The rest of the step (inbound delivery, **ASN**) does not change.
- Who is affected: warehouse clerks (new screens, new devices if EWM), development team (custom programs reading the old tables), reporting team.
- For the PD: SAP provides compatibility views, so code that reads the old tables usually still works; code that writes to them must be fixed. Have this measured by code analysis (**ATC**) during scoping. The real cost of this step is the move to EWM, often a project within the project.

**Step 4 · Quality inspection** · Impact: low
- In ECC: **QM** creates the inspection lot at receipt; the usage decision releases or blocks the stock.
- In S/4HANA: same logic. With EWM, inspection can happen in the warehouse, and stock release goes through the QM–EWM exchange.
- Who is affected: quality inspectors, EWM team.
- For the PD: have the full chain tested: receipt, inspection, release, putaway. That is where QM and EWM meet and integration defects show up.

**Step 5 · Supplier invoice** · Impact: high (finance side)
- In ECC: three-way match (order, receipt, invoice) goes through the **GR/IR** clearing account. The invoice posts to financial accounting (FI). Controlling (CO) keeps its own tables: price differences and costs are reconciled between FI and CO at closing.
- In S/4HANA: same three-way match. But every posting goes into one table, the **Universal Journal** (ACDOCA), where FI and CO post together. Stock is valued by the **Material Ledger**, which is mandatory.
- Who is affected: accounts payable, controlling, financial reporting team.
- For the PD: logistics produces the postings, finance reads them. Any change in valuation (standard price, moving average) shows in finance. Require tests that check the posting amount, not just that the transaction goes through. Clean the GR/IR account before cutover, or old differences migrate with everything else.

**Step 6 · Payment** · Impact: low
- In ECC: payment program, file to the bank.
- In S/4HANA: same payment program, with Fiori monitoring apps. The paid supplier is a Business Partner.
- Who is affected: treasury, accounts payable.
- For the PD: retest bank formats and the bank details converted with the Business Partners. A mistake here is seen by the supplier.

### 1.4 Order-to-Cash (O2C) · English

**Step 1 · Sales order** · Impact: high (prerequisite)
- In ECC: the customer is a customer record. Year-end rebates are handled by SD rebate agreements.
- In S/4HANA: the customer is a **Business Partner**. SD rebate agreements are replaced by condition contracts and **Settlement Management**. Order entry stays close to ECC.
- Who is affected: customer service, sales administration, master data team, controlling (rebates).
- For the PD: open rebate agreements must be settled before cutover, then recreated in the new form. Align the conversion date with the rebate calendar.

**Step 2 · Availability and credit** · Impact: high
- In ECC: classic availability check (**ATP**). Credit check in SD (FI-AR credit management).
- In S/4HANA: ATP becomes advanced ATP (**aATP**), with allocation rules and batch confirmation of orders. Credit checks move to **SAP Credit Management** (FSCM component), the only option available.
- Who is affected: customer service, credit managers, planners.
- For the PD: credit management is a real workstream (limits to migrate, new roles, new screens). Do not file it under "technical". On ATP: have the business validate the confirmation rules; they change promised dates, hence on-time delivery (**OTD**).

**Step 3 · Outbound delivery** · Impact: low to high depending on the warehouse
- In ECC: the **outbound delivery** triggers a transfer order in LE-WM, or goes to a separate EWM through an interface.
- In S/4HANA: with **embedded EWM**, the delivery reaches the warehouse in the same system, with no external interface. With **decentralized EWM**, the interface remains.
- Who is affected: shipping, EWM team, interface team.
- For the PD: the warehouse choice (diagram 2) sets the load of this step. Track deliveries not passed to the warehouse during testing and **hypercare**.

**Step 4 · Picking and issue** · Impact: high
- In ECC: picking by LE-WM transfer orders; **goods issue** written to header and item tables.
- In S/4HANA: picking by EWM tasks, with **Handling Units**; the goods issue goes to **MATDOC**, the cost of goods sold to the **Universal Journal**.
- Who is affected: pickers, warehouse team leads, hardware team (scanners, label printers).
- For the PD: operator training and hardware sit on the critical path of the warehouse cutover. Plan rehearsals in the real warehouse, not only in a training room.

**Step 5 · Billing** · Impact: low to medium
- In ECC: the SD invoice creates the receivable, revenue and VAT; printing goes through the message system (NAST).
- In S/4HANA: same accounting logic, posted to the Universal Journal. Outputs can move to the new output management (BRF+ rules); the old message system remains possible in some cases (to be checked in the simplification item catalog for the target release).
- Who is affected: billing, forms and output team.
- For the PD: every form (invoice, delivery note) must be retested. Their number is often underestimated at scoping.

**Step 6 · Cash collection** · Impact: low
- In ECC: customer payments are cleared against receivables.
- In S/4HANA: same logic, with Fiori apps and the Business Partner. Customer reporting becomes real time (no waiting for the overnight report).
- Who is affected: accounts receivable, credit managers.
- For the PD: little specific risk. Watch the open receivables taken over at cutover (**reconciliation** of balances).

---

## 2. Schéma 2 · L'entrepôt : quelle cible pour un LE-WM d'ECC

### Ce qu'il montre
Un entrepôt géré en LE-WM dans ECC a quatre devenirs en S/4HANA. Le schéma les place côte à côte, avec leur date limite, leur effort et leur cas d'usage, et aide à choisir par trois questions.

### Forme
- En haut : trois questions à bascule (oui / non). Les options compatibles restent en avant, les autres s'estompent.
  - Q1 « Le système S/4HANA tourne-t-il sous contrat cloud (RISE with SAP) ? »
  - Q2 « L'entrepôt est-il automatisé, à fort volume, ou doit-il tourner même si l'ERP s'arrête ? »
  - Q3 « Les processus entrepôt sont-ils simples (pas de vagues, pas de gestion des ressources) ? »
- Règles d'estompage (relues sur la maquette le 26/11/2026). A : écartée si Q1 = non (voie fermée depuis le 31/05/2026), « sursis » si Q1 = oui. B : écartée si Q2 = oui ou Q3 = non (liste des fonctions absentes à vérifier dans la note 2881166), retenue si Q3 = oui et Q2 ≠ oui. C : jamais écartée ; si l'entrepôt doit tourner quand l'ERP s'arrête, préférer D. D : écartée si Q2 = non, retenue si Q2 = oui. Le cas « tout non » ne laisse que C : c'est juste. La phrase « Aide à la réflexion, pas une décision » reste obligatoire.
- En dessous : quatre colonnes cliquables. Chaque colonne porte une étiquette de date limite et une jauge d'effort (Faible / Moyen / Fort, en mots).
- En pied : un repère « Aujourd'hui » sur une ligne de temps 2025 à 2031, avec les deux échéances (31 mai 2026, fin 2030).

### 2.1 Français

**Option A · LE-WM gardé en compatibilité** · Date limite : 31/05/2026 hors contrat cloud (passée), fin 2030 sous contrat cloud · Effort : faible
- En ECC : LE-WM est le module d'entrepôt historique, dans l'ERP.
- En S/4HANA : LE-WM fait partie des « compatibility packs » (note SAP 2269324). SAP y accorde un droit d'usage limité dans le temps, pas seulement une maintenance limitée. Sous contrat cloud (RISE with SAP, Cloud ERP Private), le droit court jusqu'à fin 2030. Hors contrat cloud, SAP indique l'arrêt d'usage fin mai 2026 pour ces éléments.
- Qui est touché : tout l'entrepôt, plus tard, au moment de la sortie.
- Pour le DP : ce n'est pas une cible, c'est un sursis. Il repousse le projet entrepôt, il ne l'annule pas. Si le programme choisit cette voie, inscrire dès maintenant au plan la migration vers B, C ou D avant fin 2030, avec son budget. Hors RISE, la voie est fermée depuis le 31/05/2026 : vérifier la situation contractuelle avec le compte SAP.

**Option B · Stock Room Management** · Date limite : aucune annoncée (fait partie de S/4HANA) · Effort : faible à moyen
- En ECC : n'existe pas sous ce nom.
- En S/4HANA : reprise de LE-WM dans S/4HANA (disponible depuis 1909), avec le même modèle de données et des fonctions en moins (par exemple pas de gestion des tâches et des ressources). Licence incluse dans S/4HANA selon les sources secondaires (à vérifier).
- Qui est touché : peu de changement pour les magasiniers ; l'équipe doit vérifier que les fonctions utilisées existent encore.
- Pour le DP : la voie la plus courte pour un entrepôt simple. Faire produire tôt la liste des fonctions LE-WM utilisées et la confronter à la note SAP 2881166 (FAQ Stock Room Management). Chaque fonction absente est un écart à arbitrer.

**Option C · EWM embarqué** · Date limite : suit S/4HANA · Effort : moyen à fort
- En ECC : n'existe pas ; EWM existait comme système séparé (SCM EWM).
- En S/4HANA : EWM tourne dans le système S/4HANA lui-même. Une version « basique » est incluse dans la licence S/4HANA ; les fonctions avancées (gestion de la main-d'œuvre, automatisme, kitting…) demandent une licence en plus (à vérifier sur le contrat).
- Qui est touché : magasiniers et chefs d'équipe (nouveaux processus, nouveaux terminaux), équipe EWM (nouvelle compétence), équipe matériel.
- Pour le DP : la cible standard de SAP. Pas d'interface ERP–entrepôt à maintenir. Mais c'est une refonte des processus entrepôt : la traiter comme un projet dans le projet, avec ses ateliers, ses tests de bout en bout, sa formation et sa bascule par entrepôt.

**Option D · EWM décentralisé** · Date limite : suit la version S/4HANA du système EWM ; l'ancien SCM EWM 9.5 s'arrête fin 2027 (à vérifier sur la Product Availability Matrix) · Effort : fort
- En ECC : SCM EWM séparé, relié à ECC par les livraisons.
- En S/4HANA : EWM tourne sur un système S/4HANA à part, relié à l'ERP (ECC ou S/4HANA) par les livraisons. Il peut être migré séparément de l'ERP.
- Qui est touché : comme C, plus l'équipe interfaces et l'équipe d'exploitation (un système de plus à faire tourner).
- Pour le DP : utile pour un entrepôt très automatisé, à gros volume, ou qui doit continuer à expédier si l'ERP s'arrête. Il permet aussi de découpler le calendrier : migrer l'entrepôt avant ou après l'ERP. En échange : un système, des interfaces et une équipe d'exploitation de plus. Si un SCM EWM 9.5 existe déjà, sa fin de maintenance est une deuxième échéance à tenir.

**Ligne de temps (pied du schéma)**
- 31/12/2025 : fin du droit d'usage des compatibility packs annoncée à l'origine.
- 31/05/2026 : fin effective hors contrat cloud, pour les éléments autres que LE-TRA, CS et PP-PI.
- 31/12/2027 : fin de la maintenance standard d'ECC ; fin annoncée de SCM EWM 9.5 (à vérifier).
- 31/12/2030 : fin du droit d'usage des compatibility packs sous contrat cloud ; fin de la maintenance étendue d'ECC.

### 2.2 English

Questions:
- Q1 "Does the S/4HANA system run under a cloud contract (RISE with SAP)?"
- Q2 "Is the warehouse automated, high-volume, or required to keep running if the ERP stops?"
- Q3 "Are the warehouse processes simple (no waves, no resource management)?"

**Option A · LE-WM kept in compatibility** · Deadline: 31/05/2026 without a cloud contract (passed), end of 2030 under a cloud contract · Effort: low
- In ECC: LE-WM is the legacy warehouse module, inside the ERP.
- In S/4HANA: LE-WM is part of the "compatibility packs" (SAP Note 2269324). SAP grants a time-limited right to use them, not just time-limited maintenance. Under a cloud contract (RISE with SAP, Cloud ERP Private), the right runs until end 2030. Without a cloud contract, SAP states that use of these items stops at the end of May 2026.
- Who is affected: the whole warehouse, later, when leaving it.
- For the PD: this is not a target, it is a reprieve. It postpones the warehouse project, it does not cancel it. If the programme takes this route, put the move to B, C or D in the plan now, before end 2030, with its budget. Outside RISE, the route has been closed since 31/05/2026: check the contract position with the SAP account team.

**Option B · Stock Room Management** · Deadline: none announced (part of S/4HANA) · Effort: low to medium
- In ECC: does not exist under this name.
- In S/4HANA: LE-WM carried into S/4HANA (available since 1909), with the same data model and fewer functions (for example no task and resource management). Licence included in S/4HANA according to secondary sources (to be checked).
- Who is affected: little change for warehouse clerks; the team must check that the functions in use still exist.
- For the PD: the shortest route for a simple warehouse. Have the list of LE-WM functions in use produced early and checked against SAP Note 2881166 (Stock Room Management FAQ). Each missing function is a gap to arbitrate.

**Option C · Embedded EWM** · Deadline: follows S/4HANA · Effort: medium to high
- In ECC: does not exist; EWM existed as a separate system (SCM EWM).
- In S/4HANA: EWM runs inside the S/4HANA system itself. A "basic" version is included in the S/4HANA licence; advanced functions (labour management, automation, kitting…) need an extra licence (to be checked in the contract).
- Who is affected: warehouse clerks and team leads (new processes, new devices), EWM team (new skill), hardware team.
- For the PD: SAP's standard target. No ERP–warehouse interface to maintain. But it is a redesign of warehouse processes: run it as a project within the project, with its own workshops, end-to-end tests, training and cutover per warehouse.

**Option D · Decentralized EWM** · Deadline: follows the S/4HANA release of the EWM system; the older SCM EWM 9.5 ends at end 2027 (to be checked in the Product Availability Matrix) · Effort: high
- In ECC: separate SCM EWM, linked to ECC by deliveries.
- In S/4HANA: EWM runs on its own S/4HANA system, linked to the ERP (ECC or S/4HANA) by deliveries. It can be migrated separately from the ERP.
- Who is affected: as for C, plus the interface team and operations team (one more system to run).
- For the PD: useful for a highly automated, high-volume warehouse, or one that must keep shipping if the ERP stops. It also decouples the calendar: move the warehouse before or after the ERP. In exchange: one more system, more interfaces and one more operations team. If an SCM EWM 9.5 already exists, its end of maintenance is a second deadline to hold.

**Timeline (footer)**
- 31/12/2025: originally announced end of compatibility pack use rights.
- 31/05/2026: actual end without a cloud contract, for items other than LE-TRA, CS and PP-PI.
- 31/12/2027: end of ECC mainstream maintenance; announced end of SCM EWM 9.5 (to be checked).
- 31/12/2030: end of compatibility pack use rights under a cloud contract; end of ECC extended maintenance.

---

## 3. Schéma 3 · Disparaît, remplacé, devient obligatoire

### Ce qu'il montre
Les changements imposés par S/4HANA qui touchent la logistique et sa finance, rangés en trois colonnes. C'est la traduction DP de la liste des **simplification items** : pas toute la liste (plusieurs centaines d'éléments), seulement ceux qu'un DP logistique retrouve en comité.

### Forme
- Trois colonnes : « Disparaît », « Remplacé par », « Devient obligatoire ».
- Chaque carte porte : un nom, une étiquette de domaine (MM, SD, WM, FI/CO, Données), une jauge d'effort (Faible / Moyen / Fort) et une étiquette « Préalable à la conversion » quand c'est le cas.
- Filtre en haut : par domaine, et « Préalables seulement ».
- Clic sur une carte : popup avec une bascule « ECC / S/4HANA » qui montre l'avant et l'après, puis « Qui est touché » et « Pour le DP ».
- Pied : « La liste exacte dépend de votre système : elle sort du **SAP Readiness Check** et du **Simplification Item Check**. »

### 3.1 Français

#### Colonne « Disparaît »

**Carte 1 · Tables d'agrégats de stock** · MM · Effort : moyen
- En ECC : le document article est écrit en deux tables (en-tête MKPF, postes MSEG) ; des tables d'agrégats tiennent les quantités en stock à jour, pour aller vite sur des bases classiques.
- En S/4HANA : une seule table, **MATDOC**. Le stock se calcule à la lecture, HANA est assez rapide. Les anciennes tables restent lisibles par des vues de compatibilité.
- Qui est touché : développeurs (programmes spécifiques), équipe reporting, interfaces qui lisent le stock.
- Pour le DP : effort caché dans le code spécifique. Demander le nombre de programmes qui écrivent dans ces tables (rapport ATC). Celui qui lit seulement passe en général ; celui qui écrit doit être repris.

**Carte 2 · Tables d'index et de totaux de la finance** · FI/CO · Effort : moyen
- En ECC : FI et CO écrivent dans des tables séparées, avec des tables de totaux et d'index pour accélérer les états. Les deux doivent être réconciliés.
- En S/4HANA : les écritures vont dans le **Universal Journal** (ACDOCA) ; totaux et index se calculent à la volée.
- Qui est touché : comptables, contrôleurs de gestion, reporting financier, interfaces vers la consolidation.
- Pour le DP : les réconciliations FI / CO disparaissent, ce qui est un gain. Mais la conversion des données financières exige des comptes propres avant la bascule : caler la date sur le calendrier de clôture et prévoir des contrôles de soldes avant / après.

**Carte 3 · Fiches clients et fournisseurs séparées** · Données · Effort : fort · Préalable
- En ECC : une fiche client et une fiche fournisseur distinctes, même pour une entreprise qui est les deux.
- En S/4HANA : une seule fiche, le **Business Partner**, avec des rôles.
- Qui est touché : équipe données de base, achats, ventes, comptabilité, interfaces.
- Pour le DP : préalable bloquant d'un brownfield. La conversion (**CVI**) se fait dans ECC, avant la conversion du système. Le nettoyage (doublons, adresses, coordonnées bancaires) prend des mois. Chemin critique fréquent.

**Carte 4 · LE-WM** · WM · Effort : fort
- En ECC : gestion d'entrepôt dans l'ERP.
- En S/4HANA : n'est plus que dans les compatibility packs, avec un droit d'usage limité (voir schéma 2).
- Qui est touché : tout l'entrepôt.
- Pour le DP : décision à prendre dès le cadrage. Renvoi au schéma 2.

#### Colonne « Remplacé par »

**Carte 5 · Gestion du crédit SD → SAP Credit Management** · SD/FI · Effort : moyen à fort
- En ECC : limites de crédit et contrôle dans SD (gestion du crédit FI-AR).
- En S/4HANA : l'ancienne gestion du crédit n'existe plus. Son équivalent est SAP Credit Management (FSCM), avec un score, des règles et un dossier de crédit par Business Partner.
- Qui est touché : credit managers, service client, comptabilité clients.
- Pour le DP : traiter comme un chantier fonctionnel avec ses ateliers et sa reprise de données (limites, historiques). Un blocage de crédit mal paramétré arrête les expéditions dès le premier jour.

**Carte 6 · Ristournes SD → contrats de conditions (Settlement Management)** · SD · Effort : moyen
- En ECC : accords de ristourne dans SD.
- En S/4HANA : contrats de conditions, réglés par le Settlement Management. C'est la cible obligatoire.
- Qui est touché : administration des ventes, contrôle de gestion, achats (ristournes fournisseurs).
- Pour le DP : solder les accords en cours avant la bascule ; recréer les nouveaux. Caler la date de conversion sur le calendrier des ristournes.

**Carte 7 · ATP → ATP avancé (aATP)** · SD/PP · Effort : moyen
- En ECC : contrôle de disponibilité classique, allocation de produits limitée.
- En S/4HANA : **aATP** : confirmation par lots de commandes, règles d'allocation, priorités par client. Le périmètre exact remplacé dépend de la version (à vérifier sur le catalogue des simplification items).
- Qui est touché : service client, planificateurs, direction commerciale (qui est servi en premier).
- Pour le DP : les règles de priorité sont une décision métier, pas un paramétrage. Les faire valider en comité. Suivre l'OTD avant et après.

**Carte 8 · MRP classique → MRP Live** · PP/MM · Effort : faible
- En ECC : MRP en lot, la nuit.
- En S/4HANA : **MRP Live**, en minutes. L'ancien MRP reste disponible pour certains cas.
- Qui est touché : planificateurs.
- Pour le DP : gain rapide à montrer au métier. Tester les résultats sur un jeu de données identique.

**Carte 9 · Messages NAST → output management** · SD/MM · Effort : moyen
- En ECC : éditions (commandes, factures, bons de livraison) par le système de messages NAST.
- En S/4HANA : nouvel output management (règles BRF+) proposé ; l'ancien système reste possible selon les cas (à vérifier pour la version cible).
- Qui est touché : équipe éditions, utilisateurs qui impriment ou envoient des documents.
- Pour le DP : compter les formulaires au cadrage. Chaque formulaire est un objet à retester, parfois à refaire.

**Carte 10 · SAP GUI → Fiori** · Tous · Effort : moyen
- En ECC : écrans SAP GUI.
- En S/4HANA : **Fiori** devient l'interface cible ; SAP GUI reste utilisable pour beaucoup de transactions.
- Qui est touché : tous les utilisateurs, la formation.
- Pour le DP : décider tôt quels rôles passent à Fiori au démarrage. Sinon la formation se fait deux fois.

#### Colonne « Devient obligatoire »

**Carte 11 · Base HANA** · Technique · Effort : moyen · Préalable
- En ECC : toute base (Oracle, DB2, SQL Server…).
- En S/4HANA : **HANA** uniquement.
- Qui est touché : équipe Basis, hébergeur.
- Pour le DP : dimensionnement (**sizing**) et migration de base (**DMO**) sur le chemin critique technique. La migration de base se fait pendant la conversion ; le préalable, c'est le dimensionnement et l'archivage. Le volume de données fixe la fenêtre d'arrêt : archiver avant.

**Carte 12 · Universal Journal et Material Ledger** · FI/CO/MM · Effort : moyen · Préalable
- En ECC : la valorisation du stock en plusieurs devises (Material Ledger) est optionnelle.
- En S/4HANA : le **Material Ledger** est actif pour la valorisation du stock ; toutes les écritures vont dans le Universal Journal.
- Qui est touché : contrôle de gestion, comptabilité, logistique (valorisation des mouvements).
- Pour le DP : préalable : dans ECC, rapprocher les comptes et passer les contrôles de cohérence de la finance avant la conversion ; une période mal clôturée bloque la migration des données financières. Ensuite, la logistique change ses chiffres en finance sans changer ses gestes. Prévoir des tests de valorisation sur des mouvements réels (réception, sortie, inventaire) et la signature du contrôle de gestion.

**Carte 13 · Business Partner** · Données · Effort : fort · Préalable
- Voir carte 3. Elle figure aussi ici parce qu'elle est obligatoire avant la conversion.

**Carte 14 · Numéro d'article long (jusqu'à 40 caractères)** · MM/Interfaces · Effort : faible à moyen
- En ECC : numéro d'article jusqu'à 18 caractères.
- En S/4HANA : le champ peut aller jusqu'à 40 caractères ; l'extension s'active ou non (à vérifier selon la version et le choix du programme).
- Qui est touché : interfaces, éditions, partenaires externes.
- Pour le DP : décision d'architecture à prendre une fois. Si elle est activée, chaque interface qui transporte un numéro d'article est à retester.

### 3.2 English

#### Column "Goes away"

**Card 1 · Stock aggregate tables** · MM · Effort: medium
- In ECC: the material document is written in two tables (header MKPF, items MSEG); aggregate tables keep stock quantities up to date, for speed on classic databases.
- In S/4HANA: one table, **MATDOC**. Stock is computed when read; HANA is fast enough. The old tables stay readable through compatibility views.
- Who is affected: developers (custom programs), reporting team, interfaces reading stock.
- For the PD: effort hidden in custom code. Ask for the number of programs that write to these tables (ATC report). Reading code usually passes; writing code must be reworked.

**Card 2 · Finance index and totals tables** · FI/CO · Effort: medium
- In ECC: FI and CO post to separate tables, with totals and index tables to speed up reports. Both must be reconciled.
- In S/4HANA: postings go to the **Universal Journal** (ACDOCA); totals and indexes are computed on the fly.
- Who is affected: accountants, controllers, financial reporting, interfaces to consolidation.
- For the PD: FI/CO reconciliations disappear, which is a gain. But converting financial data needs clean books before cutover: align the date with the closing calendar and plan before/after balance checks.

**Card 3 · Separate customer and vendor records** · Data · Effort: high · Prerequisite
- In ECC: separate customer and vendor records, even for a company that is both.
- In S/4HANA: one record, the **Business Partner**, with roles.
- Who is affected: master data team, purchasing, sales, accounting, interfaces.
- For the PD: blocking prerequisite of a brownfield. The conversion (**CVI**) happens in ECC, before the system conversion. Clean-up (duplicates, addresses, bank details) takes months. A frequent critical path.

**Card 4 · LE-WM** · WM · Effort: high
- In ECC: warehouse management inside the ERP.
- In S/4HANA: only in the compatibility packs, with a limited right of use (see diagram 2).
- Who is affected: the whole warehouse.
- For the PD: decide during scoping. See diagram 2.

#### Column "Replaced by"

**Card 5 · SD credit management → SAP Credit Management** · SD/FI · Effort: medium to high
- In ECC: credit limits and checks in SD (FI-AR credit management).
- In S/4HANA: the old credit management no longer exists. Its equivalent is SAP Credit Management (FSCM), with a score, rules and a credit file per Business Partner.
- Who is affected: credit managers, customer service, accounts receivable.
- For the PD: run it as a functional workstream with its own workshops and data migration (limits, history). A badly set credit block stops shipments on day one.

**Card 6 · SD rebates → condition contracts (Settlement Management)** · SD · Effort: medium
- In ECC: rebate agreements in SD.
- In S/4HANA: condition contracts, settled by Settlement Management. This is the mandatory target.
- Who is affected: sales administration, controlling, purchasing (supplier rebates).
- For the PD: settle open agreements before cutover; recreate them in the new form. Align the conversion date with the rebate calendar.

**Card 7 · ATP → advanced ATP (aATP)** · SD/PP · Effort: medium
- In ECC: classic availability check, limited product allocation.
- In S/4HANA: **aATP**: batch confirmation of orders, allocation rules, customer priorities. The exact scope replaced depends on the release (to be checked in the simplification item catalog).
- Who is affected: customer service, planners, sales management (who gets served first).
- For the PD: priority rules are a business decision, not configuration. Have them approved by the steering committee. Track OTD before and after.

**Card 8 · Classic MRP → MRP Live** · PP/MM · Effort: low
- In ECC: batch MRP, overnight.
- In S/4HANA: **MRP Live**, in minutes. Classic MRP remains available for some cases.
- Who is affected: planners.
- For the PD: a quick win to show the business. Test results on an identical data set.

**Card 9 · NAST messages → output management** · SD/MM · Effort: medium
- In ECC: outputs (orders, invoices, delivery notes) through the NAST message system.
- In S/4HANA: new output management (BRF+ rules) offered; the old system remains possible in some cases (to be checked for the target release).
- Who is affected: forms team, users who print or send documents.
- For the PD: count the forms at scoping. Each form is an object to retest, sometimes to rebuild.

**Card 10 · SAP GUI → Fiori** · All · Effort: medium
- In ECC: SAP GUI screens.
- In S/4HANA: **Fiori** becomes the target interface; SAP GUI remains usable for many transactions.
- Who is affected: all users, training.
- For the PD: decide early which roles move to Fiori at go-live. Otherwise training happens twice.

#### Column "Becomes mandatory"

**Card 11 · HANA database** · Technical · Effort: medium · Prerequisite
- In ECC: any database (Oracle, DB2, SQL Server…).
- In S/4HANA: **HANA** only.
- Who is affected: Basis team, hosting provider.
- For the PD: **sizing** and database migration (**DMO**) sit on the technical critical path. The database migration happens during the conversion; the prerequisite is sizing and archiving. Data volume sets the downtime window: archive first.

**Card 12 · Universal Journal and Material Ledger** · FI/CO/MM · Effort: medium · Prerequisite
- In ECC: multi-currency stock valuation (Material Ledger) is optional.
- In S/4HANA: the **Material Ledger** is active for stock valuation; all postings go to the Universal Journal.
- Who is affected: controlling, accounting, logistics (valuation of movements).
- For the PD: prerequisite: in ECC, reconcile the books and run the finance consistency checks before the conversion; a badly closed period blocks the financial data migration. Then, logistics changes its numbers in finance without changing its gestures. Plan valuation tests on real movements (receipt, issue, inventory) and sign-off by controlling.

**Card 13 · Business Partner** · Data · Effort: high · Prerequisite
- See card 3. It also appears here because it is mandatory before conversion.

**Card 14 · Long material number (up to 40 characters)** · MM/Interfaces · Effort: low to medium
- In ECC: material number up to 18 characters.
- In S/4HANA: the field can hold up to 40 characters; the extension is switched on or not (to be checked by release and programme choice).
- Who is affected: interfaces, forms, external partners.
- For the PD: an architecture decision taken once. If switched on, every interface carrying a material number must be retested.

---

## 4. Faits datés vérifiés

Lus le 26/11/2026.

| Fait | Valeur | Source | Statut |
|---|---|---|---|
| Fin de la maintenance standard des applications cœur de SAP Business Suite 7 (dont ECC 6.0) | Fin 2027 | SAP News, 04/02/2020, « SAP S/4HANA maintenance 2040 » : https://news.sap.com/2020/02/sap-s4hana-maintenance-2040-clarity-choice-sap-business-suite-7/ | Vérifié |
| Maintenance étendue optionnelle | Début 2028 à fin 2030, +2 points sur la base de maintenance | Même source | Vérifié |
| Maintenance étendue : périmètre | ECC 6.0 EhP 6 à 8 ; EhP 0 à 5 en maintenance « customer-specific » | SAP, « Compatibility Packs in SAP S/4HANA », présentation publique du 04/02/2026 (groupes d'utilisateurs) : https://assets.dm.ux.sap.com/sap-user-groups/pdfs/260204_compatibility_packs_extension.pdf | Vérifié (schéma de la présentation) |
| Maintenance S/4HANA | Engagement jusqu'à fin 2040 | SAP News, 04/02/2020 (ci-dessus) | Vérifié |
| SAP ERP, private edition, transition option | Continuité 2031 à 2033 ; systèmes déplacés en SAP ERP private edition avant le 31/12/2030 ; HANA seul ; 2 To minimum ; plan « max success » obligatoire | SAP News, 08/2025 : https://news.sap.com/2025/08/rise-with-sap-journey-sap-erp-private-edition-transition-option-updates/ | Vérifié |
| Transition option : mise à jour du 13/10/2026 | Les abonnements peuvent aller jusqu'au 31/12/2035, sous conditions supplémentaires (note SAP 3591251) | Même page, mise à jour du 13/10/2026 | Vérifié (conditions détaillées : à vérifier dans la note, non publique) |
| Compatibility packs : nature | Droit d'usage limité dans le temps (pas seulement la maintenance), note SAP 2269324, environ 100 éléments | Présentation SAP du 04/02/2026 (ci-dessus) | Vérifié |
| Compatibility packs : échéances | Fin du droit d'usage hors contrat cloud : 31/05/2026 (sauf LE-TRA, CS, PP-PI) ; sous contrat cloud : fin 2030 ; à l'origine : fin 2025 | Présentation SAP du 04/02/2026 | Vérifié. Le classement exact de LE-WM dans la matrice : à vérifier dans la note 2269324 (portail SAP, non public). |
| Stock Room Management | Disponible depuis S/4HANA 1909 ; même modèle de données que LE-WM, fonctions en moins ; FAQ en note 2881166 | Blogs SAP Community (2020) et SAP Press, notes 2577428 et 2881166 citées | Sources secondaires : à vérifier dans les notes |
| EWM embarqué basique inclus, avancé sous licence | Basique dans la licence S/4HANA ; avancé en licence supplémentaire | SAP Press, SAP Community | Sources secondaires : à vérifier sur le contrat |
| SCM EWM 9.5 (EWM séparé historique) | Fin de maintenance standard au 31/12/2027 selon la Product Availability Matrix citée par la communauté SAP ; une source tierce (mai 2026) parle de fin standard 2025 et étendue 2027 | SAP Community, Westernacher, Swisslog | À vérifier dans la Product Availability Matrix |
| MATDOC remplace MKPF / MSEG ; plus de tables d'agrégats | Note SAP 2206980 | Articles de la base de connaissances SAP (aperçus publics), SAP Community | Vérifié dans le principe ; la note complète n'est pas publique |
| Gestion du crédit FI-AR remplacée par SAP Credit Management (FIN-FSCM-CR) | Simplification item | SAP Community, SAP Insider | Sources secondaires : à vérifier dans le catalogue des simplification items |
| Ristournes SD remplacées par les contrats de conditions (Settlement Management), cible obligatoire | Simplification item | SAP Community | Idem |
| Output management (BRF+), aATP, numéro d'article à 40 caractères | — | Non vérifiés lors de cette lecture | À vérifier dans le catalogue des simplification items (https://launchpad.support.sap.com/#/sic/, accès S-user) |

#### Faits du schéma 0

Lus le 26/11/2026. Les échéances d'ECC et l'engagement 2040 reprennent les lignes du tableau ci-dessus.

| Fait | Valeur | Source | Statut |
|---|---|---|---|
| Lancement de S/4HANA, base HANA seule | 03/02/2015 ; « built only for SAP HANA » | Communiqué de presse SAP du 03/02/2015 (diffusé par PR Newswire) : https://prnewswire.com/news-releases/sap-unveils-the-next-generation-of-enterprise-software-with-a-new-business-suite-sap-s4hana-300029487.html | Vérifié (résumé de recherche ; page non ouverte en entier) |
| Rythme sur site et cloud privé | Une version tous les deux ans à partir de S/4HANA 2023 ; sept ans de maintenance standard par version (cinq avant) ; feature packs tous les six mois pendant les deux premières années | SAP News, 15/09/2022, « Neue Release- und Wartungsstrategie für SAP S/4HANA » : https://news.sap.com/germany/2022/09/sap-s4hana-release-maintenance-strategie/ (version anglaise : https://news.sap.com/2022/09/new-sap-s4hana-release-maintenance-strategy/, non ouverte : erreur réseau) | Vérifié |
| Rythme en cloud public | Deux montées de version par an (semestrielles), imposées par SAP | Base de connaissances SAP, KBA 3398892 (aperçu public) : https://userapps.support.sap.com/sap/support/knowledge/en/3398892 ; SAP Learning, « Navigating Release Upgrades » | Vérifié dans le principe (résumé de recherche) ; calendrier exact : à vérifier |
| Noms des offres cloud | Depuis le printemps 2025 : « SAP Cloud ERP » (édition publique) et « SAP Cloud ERP Private » (édition privée) ; les noms techniques S/4HANA Cloud Public / Private Edition restent dans les contrats | Pages produit sap.com (« SAP S/4HANA Cloud Public Edition, a foundational application of SAP Cloud ERP ») ; analyse d'un partenaire (timetoact-group.com) | Nom affiché sur sap.com vérifié ; date et portée du changement : sources secondaires, à vérifier |
| Dernier package d'amélioration d'ECC | EhP 8 pour SAP ERP 6.0, 2016 | Guide de mise à jour SAP (help.sap.com, version 1.0 du 20/01/2016) ; Wikipedia | Année probable ; date de disponibilité générale exacte : à vérifier |
| Cloud public : nouvelle implémentation seulement | Pas de conversion d'un ECC vers le cloud public | Glossaire du portail (terme « Cloud public / Cloud privé », source livres ACT) | Repris du portail ; non relu sur source SAP à cette date : à vérifier |
| Cloud public : accès par Fiori, pas de code dans le cœur | — | Connaissance d'intégrateur | À vérifier sur la documentation SAP Cloud ERP (cas particuliers d'accès SAP GUI) |

### Écarts avec le contenu existant du portail (à corriger par Walid ou la session principale)

1. **Deck `mig`, diapositive « Le compte à rebours ECC »** : il annonce la transition option sur 2031–2033. SAP a ouvert le 13/10/2026 la possibilité d'aller jusqu'au 31/12/2035, sous conditions. À mettre à jour à la prochaine révision du deck.
2. **Deck `mig`, tableau « Ce qui change concrètement »** : « EWM (WM en compatibilité) ». Hors contrat cloud, le droit d'usage des compatibility packs a pris fin le 31/05/2026. Formulation proposée : « EWM ou Stock Room Management ; WM en compatibilité seulement sous contrat cloud, jusqu'à fin 2030 ».
3. **Glossaire, terme `LE-WM`** : « abandonnée dans S/4HANA au profit d'EWM » est incomplet. Proposition : « Gestion d'entrepôt classique d'ECC. Dans S/4HANA, elle n'existe plus que dans les compatibility packs (usage limité : fin mai 2026 hors contrat cloud, fin 2030 sous contrat cloud). Successeurs : EWM ou Stock Room Management. » ; pourLeDP : « Décision à prendre dès le cadrage : c'est souvent un projet dans le projet. »
4. **Glossaire, terme `ECC`** : la définition est juste ; on peut ajouter « maintenance étendue payante jusqu'à fin 2030, option RISE au-delà sous conditions ».

---

## 5. Termes à ajouter au glossaire

Vérifiés absents de `glossaire.json` (296 termes) le 26/11/2026. Déjà présents et réutilisés : Universal Journal, Business Partner, CVI, EWM, EWM embarqué, EWM décentralisé, LE-WM, Material Ledger, MRP Live, Simplification item, SAP Readiness Check, Simplification Item Check, ATC, DMO, Fiori, HANA, Sizing.

Format : `terme` · `nomComplet` · `categorie` · `definition` · `pourLeDP` · `documents`.

| Terme FR | nomComplet | cat. | Définition FR | Pour le DP FR |
|---|---|---|---|---|
| MATDOC | Table des documents article | tech | Table unique de S/4HANA où s'écrivent tous les mouvements de stock. Elle remplace les tables d'en-tête et de postes d'ECC et les tables d'agrégats de stock. | Le code spécifique qui écrivait dans les anciennes tables doit être repris : à mesurer dès le cadrage. |
| Compatibility pack | Compatibility scope | proc | Fonctions d'ECC encore livrées dans S/4HANA pour une durée limitée (note SAP 2269324). Le droit de les utiliser expire à une date fixée : fin mai 2026 hors contrat cloud, fin 2030 sous contrat cloud. | Un sursis, pas une cible : inscrire au plan la sortie et son budget. |
| Stock Room Management | | proc | Reprise simplifiée de LE-WM dans S/4HANA (depuis 1909), avec le même modèle de données et moins de fonctions. | Voie la plus courte pour un entrepôt simple ; vérifier tôt que les fonctions utilisées existent. |
| Maintenance étendue | Extended maintenance | run | Maintenance payante d'ECC après la fin de la maintenance standard : de 2028 à fin 2030, environ deux points de plus sur la redevance, sans nouveauté. | Chaque année de retard coûte cette prime : à mettre dans le business case. |
| Transition option | SAP ERP, private edition, transition option | run | Abonnement RISE qui prolonge un ECC au-delà de 2030 (2031 à 2033, jusqu'à 2035 sous conditions depuis octobre 2026). Réservé aux grands systèmes déplacés en cloud privé avant fin 2030. | Pas un report pour tous : conditions strictes et prix majoré. |
| aATP | Advanced Available-to-Promise | proc | Contrôle de disponibilité de S/4HANA : confirme les commandes par lots, avec des règles d'allocation et de priorité par client. | Les règles de priorité sont une décision métier à faire valider. |
| ATP | Available-to-Promise | proc | Ce que l'entreprise peut promettre à un client à une date donnée, en tenant compte du stock et des entrées prévues. | Une date promise sans contrôle de disponibilité fait chuter l'OTD. |
| SAP Credit Management | FSCM Credit Management | proc | Gestion du crédit client de S/4HANA. Elle remplace la gestion du crédit d'ECC : score, limites, dossier de crédit par Business Partner. | Un chantier fonctionnel à part entière ; un blocage mal réglé arrête les expéditions. |
| Settlement Management | Contrats de conditions | proc | Outil de S/4HANA qui gère les ristournes clients et fournisseurs par des contrats de conditions. Il remplace les accords de ristourne d'ECC. | Solder les accords en cours avant la bascule. |
| Output management | Gestion des éditions | tech | Mécanisme de S/4HANA qui décide quels documents imprimer ou envoyer (factures, bons de livraison), par des règles BRF+. Il succède au système de messages d'ECC (NAST). | Compter les formulaires au cadrage : chacun est à retester. |
| Compte GR/IR | Goods Receipt / Invoice Receipt | proc | Compte d'attente entre la réception d'une marchandise et l'arrivée de sa facture. | À nettoyer avant la bascule, sinon les écarts anciens migrent. |
| Product Availability Matrix | PAM | run | Référentiel SAP des versions de chaque produit et de leurs dates de maintenance. | La source à citer pour toute date de fin de maintenance. |

| Terme EN | nomComplet | Definition EN | For the PD EN |
|---|---|---|---|
| MATDOC | Material document table | Single S/4HANA table where all stock movements are written. It replaces ECC's header and item tables and its stock aggregate tables. | Custom code that wrote to the old tables must be reworked: measure it during scoping. |
| Compatibility pack | Compatibility scope | ECC functions still shipped in S/4HANA for a limited time (SAP Note 2269324). The right to use them expires on a set date: end of May 2026 without a cloud contract, end 2030 under a cloud contract. | A reprieve, not a target: put the exit and its budget in the plan. |
| Stock Room Management | | Simplified carry-over of LE-WM into S/4HANA (since 1909), with the same data model and fewer functions. | Shortest route for a simple warehouse; check early that the functions in use exist. |
| Extended maintenance | | Paid ECC maintenance after mainstream maintenance ends: 2028 to end 2030, about two points more on the fee, no new features. | Each year of delay costs this premium: put it in the business case. |
| Transition option | SAP ERP, private edition, transition option | RISE subscription that extends an ECC beyond 2030 (2031 to 2033, up to 2035 under conditions since October 2026). Reserved for large systems moved to private cloud before end 2030. | Not a postponement for everyone: strict conditions and a higher price. |
| aATP | Advanced Available-to-Promise | S/4HANA availability check: confirms orders in batches, with allocation and customer priority rules. | Priority rules are a business decision to be approved. |
| ATP | Available-to-Promise | What the company can promise a customer for a given date, based on stock and planned receipts. | A promised date without an availability check drives OTD down. |
| SAP Credit Management | FSCM Credit Management | S/4HANA customer credit management. It replaces ECC credit management: score, limits, credit file per Business Partner. | A full functional workstream; a badly set block stops shipments. |
| Settlement Management | Condition contracts | S/4HANA tool managing customer and supplier rebates through condition contracts. It replaces ECC rebate agreements. | Settle open agreements before cutover. |
| Output management | | S/4HANA mechanism deciding which documents to print or send (invoices, delivery notes), through BRF+ rules. It succeeds ECC's message system (NAST). | Count the forms at scoping: each one must be retested. |
| GR/IR account | Goods Receipt / Invoice Receipt | Clearing account between receipt of goods and arrival of their invoice. | Clean it before cutover, or old differences migrate. |
| Product Availability Matrix | PAM | SAP reference listing each product's releases and maintenance dates. | The source to quote for any end-of-maintenance date. |

Catégories proposées : `proc` (processus), `tech`, `run`. `documents` : `["mig"]` pour tous, plus la clé du futur schéma quand il sera déclaré dans `documents.json`.

Mise à jour du 26/11/2026 : les douze termes ci-dessus sont maintenant dans `glossaire.json` (308 termes).

### Termes du schéma 0 à ajouter

Vérifiés absents de `glossaire.json` (308 termes) le 26/11/2026. Déjà présents et réutilisés : HANA, Sizing, Archivage, Fenêtre de coupure, DMO, FI, CO, MATDOC, Universal Journal, Business Partner, CVI, ATC, Fiori, Business Roles / Business Catalogs, SAP Analytics Cloud, Développement Z, Dette technique, Clean Core, Key User Extensibility, ABAP Cloud, API publiée, BTP, Extension side-by-side, Design authority, On-premise, SAP Cloud ERP, RISE with SAP, Cloud public / Cloud privé, Montée de version, Maintenance étendue, Transition option, Greenfield, Brownfield, Bluefield, Business case. Attention : le terme « Feature » existe déjà (catégorie agile) ; le nouveau terme s'appelle donc « Feature Pack Stack ».

| Terme FR | nomComplet | cat. | Définition FR | Pour le DP FR |
|---|---|---|---|---|
| SAP GUI | Interface graphique SAP | tech | Logiciel installé sur le poste, par lequel on utilise ECC : des écrans par transaction, ouverts par un code. Encore utilisable dans S/4HANA sur site et en cloud privé. | Décider rôle par rôle qui garde SAP GUI au démarrage, sinon la formation se fait deux fois. |
| BW | SAP Business Warehouse | tech | Entrepôt de données de SAP. Il copie les données de l'ERP, souvent la nuit, pour les analyser et les consolider. | Inventorier les rapports BW au cadrage : une partie passe à l'analytique embarquée. |
| Analytique embarquée | Embedded Analytics | tech | Rapports et indicateurs calculés directement dans S/4HANA, en temps réel, sans copie vers un entrepôt de données. | Nommer un responsable du reporting et décider quels rapports garder, remplacer ou supprimer. |
| EhP | Enhancement Package | run | Package d'amélioration d'ECC : de nouvelles fonctions que l'entreprise installe quand elle veut. Le dernier, l'EhP 8, date de 2016. | ECC ne reçoit plus de nouveautés : toute innovation SAP passe par S/4HANA. |
| Feature Pack Stack | FPS | run | Livraison semestrielle de nouvelles fonctions pour une version de S/4HANA sur site ou en cloud privé, pendant ses deux premières années. | À intégrer au calendrier de run : chaque installation demande des tests de non-régression. |
| Suite on HANA | SAP Business Suite on HANA | tech | ECC installé sur la base HANA, sans le modèle de données de S/4HANA. | Ce n'est pas S/4HANA : la conversion reste à faire, mais la migration de base est déjà faite. |

| Terme EN | nomComplet | Definition EN | For the PD EN |
|---|---|---|---|
| SAP GUI | SAP graphical user interface | Software installed on the PC, used to work in ECC: screens by transaction, opened by a code. Still usable in S/4HANA on premise and in private cloud. | Decide role by role who keeps SAP GUI at go-live, or training happens twice. |
| BW | SAP Business Warehouse | SAP's data warehouse. It copies ERP data, often overnight, for analysis and consolidation. | Inventory BW reports at scoping: some move to embedded analytics. |
| Embedded analytics | | Reports and indicators computed directly in S/4HANA, in real time, with no copy to a data warehouse. | Name a reporting owner and decide which reports to keep, replace or drop. |
| EhP | Enhancement Package | ECC enhancement package: new functions the company installs when it wants. The last one, EhP 8, dates from 2016. | ECC no longer gets new features: all SAP innovation goes through S/4HANA. |
| Feature Pack Stack | FPS | Half-yearly delivery of new functions for an S/4HANA on-premise or private cloud release, during its first two years. | Put it in the run calendar: each installation needs regression tests. |
| Suite on HANA | SAP Business Suite on HANA | ECC installed on the HANA database, without the S/4HANA data model. | It is not S/4HANA: the conversion is still ahead, but the database migration is done. |

`documents` : `["mig"]`, plus la clé du schéma 0 quand il sera déclaré.

---

## 6. Points ouverts pour Walid

1. Le schéma 1 enrichit des pages existantes (`flux-p2p`, `flux-o2c`) au lieu d'en créer une : à valider, car cela change le contenu JSON des deux flux FR et EN.
2. Les notes SAP (2269324, 2881166, 2206980, 3591251) et le catalogue des simplification items demandent un compte S-user : les points marqués « à vérifier » ne peuvent être confirmés que par quelqu'un qui y a accès.
3. Les dates du schéma 2 évoluent vite (deux changements en 2026). Proposer une mention « Dates lues le 26/11/2026 » visible en pied de schéma.
4. Schéma 0 : une page à part (porte d'entrée de B-007) ou un bloc en tête de la page des schémas 1 à 3 ? Recommandation : une page à part, carte « Parcours conseillé » de l'accueil, avec liens vers les trois autres.
5. Schéma 0 : trois points restent « à vérifier » (calendrier exact des montées de version du cloud public, date de l'EhP 8, accès SAP GUI en cloud public). Ils ne changent pas le message du schéma.
