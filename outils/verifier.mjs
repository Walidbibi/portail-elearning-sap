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
const jsons = ['documents.json', 'glossaire.json', ...(existsSync(join(RACINE, 'glossaire.en.json')) ? ['glossaire.en.json'] : []),
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
    if (d.langue === 'fr en' && !existsSync(join(RACINE, 'apercus', `${cle}.en.jpg`))) attention(f, l, `pas d'aperçu anglais apercus/${cle}.en.jpg : la version anglaise montrera l'aperçu français`);
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

// 4 bis. Versions anglaises : chaque fichier .en.json reste aligné sur son fichier français
for (const fj of jsons.filter(f => /^frises\/.+\.en\.json$/.test(f))) {
  const ffr = fj.replace('.en.json', '.json');
  if (!J[fj] || !J[ffr]) { if (!existsSync(join(RACINE, ffr))) erreur(fj, 1, `pas de fichier français correspondant (${ffr})`); continue; }
  const E = J[fj].data, F = J[ffr].data, t = J[fj].texte;
  const memes = (a, b) => JSON.stringify(Object.keys(a || {})) === JSON.stringify(Object.keys(b || {}));
  if (!memes(E.etapes, F.etapes)) erreur(fj, ligneDe(t, '"etapes"'), `les étapes ne sont pas les mêmes que dans ${ffr}`);
  for (const champ of ['ordre', 'positions', 'gates', 'icones', 'etenduePhases'])
    if (JSON.stringify(champ === 'positions' ? Object.values(E[champ] || {}).map(v => v.slice(0, 2)) : champ === 'gates' ? Object.values(E[champ] || {}).map(v => v[0]) : E[champ])
      !== JSON.stringify(champ === 'positions' ? Object.values(F[champ] || {}).map(v => v.slice(0, 2)) : champ === 'gates' ? Object.values(F[champ] || {}).map(v => v[0]) : F[champ]))
      erreur(fj, ligneDe(t, `"${champ}"`), `« ${champ} » diffère de ${ffr} : la chronologie anglaise ne correspondrait plus`);
  if ((E.phases || []).length !== (F.phases || []).length) erreur(fj, ligneDe(t, '"phases"'), `nombre de phases différent de ${ffr}`);
  for (const [k, d] of Object.entries(E.etapes || {})) {
    const f = (F.etapes || {})[k]; if (!f) continue;
    for (const c of ['act', 'pre', 'liv', 'ai', 'r']) if ((d[c] || []).length !== (f[c] || []).length)
      erreur(fj, ligneDe(t, `"${k}": {`), `l'étape « ${k} » n'a pas le même nombre d'éléments dans « ${c} » qu'en français (${(d[c] || []).length} contre ${(f[c] || []).length})`);
  }
}
const GE = J['glossaire.en.json'];
if (GE && G) {
  const f = 'glossaire.en.json', te = GE.data.termes || [], tf = G.data.termes || [];
  if (te.length !== tf.length) erreur(f, 1, `${te.length} termes en anglais pour ${tf.length} en français`);
  te.forEach((t, i) => {
    const l = ligneDe(GE.texte, `"terme":${JSON.stringify(t.terme)}`);
    if (tf[i] && t.termeFr !== tf[i].terme) erreur(f, l, `le terme « ${t.terme} » est au rang ${i + 1} mais renvoie à « ${t.termeFr} », alors que le français a « ${tf[i].terme} » à ce rang`);
    if (!t.definition) erreur(f, l, `le terme « ${t.terme} » n'a pas de définition`);
    if (t.categorie !== (tf[i] || {}).categorie) erreur(f, l, `le terme « ${t.terme} » n'a pas la même catégorie qu'en français`);
    for (const k of t.documents || []) if (!docs[k]) erreur(f, l, `le terme « ${t.terme} » cite le document « ${k} », absent de documents.json`);
  });
}

// 4 ter. Libellés anglais : mêmes clés que le français ; langues et versions anglaises du manifeste
const LEN = J['shared/libelles/en.json'];
if (LEN && LIB_OK) {
  const cles = {}; (function a(o, p) { for (const [k, v] of Object.entries(o || {})) { const c = p ? `${p}.${k}` : k; if (v && typeof v === 'object') a(v, c); else cles[c] = v; } })(LEN.data, '');
  for (const c of Object.keys(LIB)) if (cles[c] === undefined) attention('shared/libelles/en.json', 1, `le texte « ${c} » n'existe pas en anglais : le français s'affichera`);
  for (const c of Object.keys(cles)) if (LIB[c] === undefined) erreur('shared/libelles/en.json', ligneDe(LEN.texte, `"${c.split('.').pop()}"`), `le texte « ${c} » n'existe pas en français`);
}
for (const [cle, d] of Object.entries(docs)) {
  const l = M ? ligneDe(M.texte, `"${cle}": {`) : 1;
  if (d.langue && !/^(fr|en|fr en)$/.test(d.langue)) erreur('documents.json', l, `langue « ${d.langue} » du document « ${cle} » : attendu fr, en ou « fr en »`);
  if (d.versionEn && !docs[d.versionEn]) erreur('documents.json', l, `le document « ${cle} » renvoie vers la version anglaise « ${d.versionEn} », absente du manifeste`);
  if (d.versionEn && docs[d.versionEn] && docs[d.versionEn].langue !== 'en') erreur('documents.json', l, `la version anglaise « ${d.versionEn} » du document « ${cle} » n'a pas la langue « en »`);
}

// 4 quater. Scripts et style versionnés (outils/version.mjs) : même numéro partout
{
  const versions = new Map();
  for (const p of ['index.html', 'lecteur.html', ...['frises', 'schemas'].flatMap(d => readdirSync(join(RACINE, d)).filter(f => f.endsWith('.html')).map(f => `${d}/${f}`))]) {
    const t = readFileSync(join(RACINE, p), 'utf8');
    for (const m of t.matchAll(/(?:src|href)="(?:\.\.\/)?(shared\/(?!pdfjs\/)[\w.-]+\.(?:js|css))(\?v=([\w.-]+))?"/g)) {
      if (!m[3]) erreur(p, ligneDe(t, m[1]), `« ${m[1]} » n'a pas de numéro de version : lancer node outils/version.mjs avant de publier`);
      else versions.set(m[3], (versions.get(m[3]) || []).concat(p));
    }
  }
  if (versions.size > 1) erreur('index.html', 1, `numéros de version différents selon les pages (${[...versions.keys()].join(', ')}) : lancer node outils/version.mjs`);
}

// 4 quinquies. Couleurs : seulement dans shared/theme.css (les JSON de données ne sont pas concernés)
for (const f of ['index.html', 'lecteur.html', ...['frises', 'schemas'].flatMap(d => readdirSync(join(RACINE, d)).filter(x => x.endsWith('.html')).map(x => `${d}/${x}`)),
  ...readdirSync(join(RACINE, 'shared')).filter(x => /\.(js|css)$/.test(x) && x !== 'theme.css').map(x => `shared/${x}`)]) {
  const t = readFileSync(join(RACINE, f), 'utf8');
  for (const m of t.matchAll(/(?<![\w&"'(=])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g))
    erreur(f, ligneDe(t, m[0]), `couleur ${m[0]} écrite en dur : la déclarer dans shared/theme.css et utiliser sa variable`);
}

// 4 sexies. Polices hébergées sur le site : aucun appel à Google Fonts
for (const f of ['index.html', 'lecteur.html', ...['frises', 'schemas'].flatMap(d => readdirSync(join(RACINE, d)).filter(x => x.endsWith('.html')).map(x => `${d}/${x}`)),
  ...readdirSync(join(RACINE, 'shared')).filter(x => /\.(js|css)$/.test(x)).map(x => `shared/${x}`)]) {
  const t = readFileSync(join(RACINE, f), 'utf8');
  const m = t.match(/fonts\.(googleapis|gstatic)\.com/);
  if (m) erreur(f, ligneDe(t, m[0]), `appel à ${m[0]} : les polices IBM Plex sont hébergées dans shared/polices/`);
}
for (const m of readFileSync(join(RACINE, 'shared', 'theme.css'), 'utf8').matchAll(/url\("(polices\/[^"]+)"\)/g))
  if (!existsSync(join(RACINE, 'shared', m[1]))) erreur('shared/theme.css', 1, `la police « ${m[1]} » n'existe pas`);

// 5. Chaque texte d'interface utilisé existe dans shared/libelles/fr.json
const sources = ['index.html', 'lecteur.html', ...['frises', 'schemas'].flatMap(d => readdirSync(join(RACINE, d)).filter(f => f.endsWith('.html')).map(f => `${d}/${f}`)),
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
