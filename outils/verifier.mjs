// Contrôle des fichiers de données du portail. Aucune dépendance (Node 18+).
// Usage, depuis la racine du site : node outils/verifier.mjs
// Sort avec le code 1 s'il trouve une erreur. Lancé par .github/workflows/verifier.yml à chaque envoi.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GITHUB = !!process.env.GITHUB_ACTIONS;
const erreurs = [], avertissements = [];

const rel = f => relative(RACINE, f).split('\\').join('/');
function signaler(liste, niveau, fichier, ligne, message) {
  liste.push({ fichier, ligne, message });
  const ou = ligne ? `${fichier}, ligne ${ligne}` : fichier;
  console.log(`${niveau === 'error' ? 'ERREUR' : 'ATTENTION'}  ${ou} : ${message}`);
  // annotation affichée par GitHub sur le fichier en cause
  if (GITHUB) console.log(`::${niveau} file=${fichier}${ligne ? `,line=${ligne}` : ''}::${message}`);
}
const erreur = (f, l, m) => signaler(erreurs, 'error', f, l, m);
const attention = (f, l, m) => signaler(avertissements, 'warning', f, l, m);

// Numéro de la première ligne qui contient le texte cherché (1 si introuvable).
function ligneDe(texte, cherche, apres = '') {
  const i = texte.indexOf(cherche, apres ? Math.max(0, texte.indexOf(apres)) : 0);
  return i < 0 ? 1 : texte.slice(0, i).split('\n').length;
}

// Lit un JSON ; en cas d'erreur de syntaxe, donne la ligne et la colonne.
function lireJSON(chemin) {
  const f = rel(chemin);
  if (!existsSync(chemin)) { erreur(f, 0, 'fichier introuvable'); return null; }
  const texte = readFileSync(chemin, 'utf8');
  try { return { texte, data: JSON.parse(texte) }; }
  catch (e) {
    let ligne = 0, col = 0;
    const lc = e.message.match(/line (\d+) column (\d+)/);
    const pos = e.message.match(/position (\d+)/);
    if (lc) { ligne = +lc[1]; col = +lc[2]; }
    else if (pos) { const avant = texte.slice(0, +pos[1]).split('\n'); ligne = avant.length; col = avant.at(-1).length + 1; }
    erreur(f, ligne, `JSON mal formé${col ? `, colonne ${col}` : ''} (virgule, guillemet ou accolade en trop ou manquante). Détail : ${e.message}`);
    return null;
  }
}

// 1. Tous les JSON du site sont bien formés
const jsons = ['documents.json', 'glossaire.json',
  ...readdirSync(join(RACINE, 'shared', 'libelles')).filter(f => f.endsWith('.json')).map(f => `shared/libelles/${f}`),
  ...readdirSync(join(RACINE, 'frises')).filter(f => f.endsWith('.json')).map(f => `frises/${f}`)];
const J = {};
for (const f of jsons) J[f] = lireJSON(join(RACINE, f));

// Libellés français, aplatis en « cle.sous-cle »
const LIB = {};
const LIB_OK = !!J['shared/libelles/fr.json']; // si le fichier est illisible, on ne contrôle pas les textes (erreur déjà signalée)
(function aplatir(o, p) { for (const [k, v] of Object.entries(o || {})) { const c = p ? `${p}.${k}` : k; if (v && typeof v === 'object') aplatir(v, c); else LIB[c] = v; } })(J['shared/libelles/fr.json']?.data, '');

// 2. Manifeste des documents
const M = J['documents.json'];
const docs = M?.data?.documents || {};
if (M) {
  const f = 'documents.json';
  if (!M.data.documents) erreur(f, 1, 'bloc « documents » absent');
  for (const [cle, d] of Object.entries(docs)) {
    const l = ligneDe(M.texte, `"${cle}": {`);
    for (const champ of ['type', 'titre', 'description', 'fichier'])
      if (!d[champ]) erreur(f, l, `le document « ${cle} » n'a pas de champ « ${champ} »`);
    if (d.fichier && !/^https?:/.test(d.fichier)) {
      if (!existsSync(join(RACINE, d.fichier))) erreur(f, ligneDe(M.texte, `"${d.fichier}"`), `le fichier « ${d.fichier} » du document « ${cle} » n'existe pas`);
      if (/\.pdf$/i.test(d.fichier) && !/^documents\/[\w.-]+\.pdf$/.test(d.fichier))
        erreur(f, ligneDe(M.texte, `"${d.fichier}"`), `« ${d.fichier} » : un PDF doit être rangé dans documents/, avec un nom sans espace ni accent, sinon le lecteur refuse de l'ouvrir`);
    }
    if (LIB_OK && d.type && LIB['types.' + d.type] === undefined) erreur(f, l, `le type « ${d.type} » du document « ${cle} » n'a pas de libellé dans shared/libelles/fr.json (types)`);
    if (!existsSync(join(RACINE, 'apercus', `${cle}.jpg`))) attention(f, l, `pas d'aperçu apercus/${cle}.jpg : la carte s'affichera sans image`);
  }
  for (const [section, cles] of Object.entries(M.data.accueil || {}))
    for (const cle of cles) if (!docs[cle]) erreur(f, ligneDe(M.texte, `"${section}"`), `la section « ${section} » de l'accueil cite le document « ${cle} », absent du bloc « documents »`);
}

// 3. Glossaire
const G = J['glossaire.json'];
if (G) {
  const f = 'glossaire.json';
  const termes = G.data.termes;
  if (!Array.isArray(termes)) erreur(f, 1, 'tableau « termes » absent');
  const vus = new Set();
  for (const t of termes || []) {
    const l = ligneDe(G.texte, `"terme":${JSON.stringify(t.terme)}`);
    if (!t.terme || !t.definition) erreur(f, l, `un terme n'a pas de « terme » ou de « definition »`);
    if (vus.has(t.terme)) erreur(f, l, `le terme « ${t.terme} » est en double`); vus.add(t.terme);
    if (LIB_OK && LIB['categories.' + t.categorie] === undefined) erreur(f, l, `le terme « ${t.terme} » a une catégorie inconnue : « ${t.categorie} » (attendu : meth, proc, tech, data, test, run, agile)`);
    for (const k of t.documents || []) if (!docs[k]) erreur(f, l, `le terme « ${t.terme} » cite le document « ${k} », absent de documents.json`);
  }
}

// 4. Frises : chaque page pointe vers un JSON cohérent
for (const page of readdirSync(join(RACINE, 'frises')).filter(f => f.endsWith('.html'))) {
  const html = readFileSync(join(RACINE, 'frises', page), 'utf8');
  const m = html.match(/data-frise="([^"]+)"/);
  if (!m) { erreur(`frises/${page}`, 1, 'la page ne déclare pas de fichier de contenu (data-frise)'); continue; }
  const fj = `frises/${m[1]}`;
  if (!J[fj]) { if (!existsSync(join(RACINE, fj))) erreur(`frises/${page}`, ligneDe(html, 'data-frise'), `le fichier de contenu « ${fj} » n'existe pas`); continue; }
  const { texte, data: F } = J[fj];
  const E = F.etapes || {};
  for (const champ of ['titreOnglet', 'titre', 'exemple', 'chronologie', 'phases', 'etenduePhases', 'ordre', 'positions', 'gates', 'icones', 'etapes'])
    if (F[champ] === undefined) erreur(fj, 1, `champ « ${champ} » absent`);
  for (const [p, cles] of Object.entries(F.ordre || {})) for (const k of cles) if (!E[k]) erreur(fj, ligneDe(texte, `"${k}"`, '"ordre"'), `la phase ${p} de « ordre » cite l'étape « ${k} », absente de « etapes »`);
  for (const k of Object.keys(F.positions || {})) {
    if (!E[k]) erreur(fj, ligneDe(texte, `"${k}"`, '"positions"'), `« positions » cite l'étape « ${k} », absente de « etapes »`);
    if (!(F.icones || {})[k]) erreur(fj, ligneDe(texte, `"icones"`), `l'étape « ${k} » n'a pas d'icône dans « icones »`);
  }
  for (const k of Object.keys(F.gates || {})) if (!E[k]) erreur(fj, ligneDe(texte, `"${k}"`, '"gates"'), `« gates » cite « ${k} », absente de « etapes »`);
  const g = F.chronologie?.golive;
  if (g && !E[g.etape]) erreur(fj, ligneDe(texte, `"golive"`), `le go-live ouvre l'étape « ${g.etape} », absente de « etapes »`);
  if (F.phases && F.etenduePhases && F.phases.length !== F.etenduePhases.length) erreur(fj, ligneDe(texte, `"etenduePhases"`), `${F.phases.length} phases mais ${F.etenduePhases.length} entrées dans « etenduePhases »`);
  if (F.couleurs && F.phases && F.couleurs.length !== F.phases.length) erreur(fj, ligneDe(texte, `"couleurs"`), `${F.phases.length} phases mais ${F.couleurs.length} couleurs`);
  for (const [k, d] of Object.entries(E)) {
    const l = ligneDe(texte, `"${k}": {`);
    if (F.phases && !F.phases[d.p]) erreur(fj, l, `l'étape « ${k} » est rattachée à une phase inexistante (p = ${d.p})`);
    for (const champ of ['t', 'obj', 'act', 'pre', 'liv', 'own', 'r']) if (d[champ] === undefined) erreur(fj, l, `l'étape « ${k} » n'a pas de champ « ${champ} »`);
  }
  if (!E.transverse) erreur(fj, 1, `étape « transverse » absente : le bandeau « En continu » n'ouvrirait rien`);
}

// 5. Chaque texte d'interface utilisé existe dans shared/libelles/fr.json
const sources = ['index.html', 'lecteur.html', ...readdirSync(join(RACINE, 'frises')).filter(f => f.endsWith('.html')).map(f => `frises/${f}`),
  ...readdirSync(join(RACINE, 'shared')).filter(f => f.endsWith('.js')).map(f => `shared/${f}`)];
for (const f of sources) {
  const t = readFileSync(join(RACINE, f), 'utf8');
  const cles = [...t.matchAll(/data-t(?:-aria|-placeholder)?="([\w.]+)"/g), ...t.matchAll(/\bT\('([\w.]+)'/g)].map(m => m[1]);
  // une clé qui finit par « . » est complétée à l'exécution (types., categories.) : contrôlée plus haut
  if (LIB_OK) for (const c of new Set(cles)) if (!c.endsWith('.') && LIB[c] === undefined) erreur(f, ligneDe(t, c), `le texte « ${c} » n'existe pas dans shared/libelles/fr.json`);
}

console.log(erreurs.length
  ? `\n${erreurs.length} erreur(s), ${avertissements.length} avertissement(s). Corriger les erreurs : le site risque d'afficher une page vide ou un lien cassé.`
  : `\nAucune erreur (${jsons.length} fichiers JSON, ${Object.keys(docs).length} documents, ${G?.data?.termes?.length ?? 0} termes contrôlés${avertissements.length ? `, ${avertissements.length} avertissement(s)` : ''}).`);
process.exit(erreurs.length ? 1 : 0);
