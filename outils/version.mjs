// Met un numéro de version sur les scripts et la feuille de style du portail (shared/…?v=…),
// pour que le navigateur ne mélange jamais une page nouvelle et un script ancien après une publication.
// À lancer avant chaque publication : node outils/version.mjs
// Sans argument, le numéro est la date et l'heure (AAAAMMJJHHMM). Le contrôle (verifier.mjs)
// vérifie ensuite que toutes les pages portent le même numéro.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const d = new Date(), z = n => String(n).padStart(2, '0');
const version = process.argv[2] || `${d.getFullYear()}${z(d.getMonth() + 1)}${z(d.getDate())}${z(d.getHours())}${z(d.getMinutes())}`;

const pages = ['index.html', 'lecteur.html', ...readdirSync(join(RACINE, 'frises')).filter(f => f.endsWith('.html')).map(f => `frises/${f}`)];
// shared/<fichier>.js ou .css, avec ou sans ?v=… ; PDF.js est exclu (version fixe, jamais modifié)
const motif = /((?:src|href)="(?:\.\.\/)?shared\/(?!pdfjs\/)[\w.-]+\.(?:js|css))(?:\?v=[\w.-]*)?"/g;
let total = 0;
for (const p of pages) {
  const f = join(RACINE, p), t = readFileSync(f, 'utf8');
  let n = 0;
  const u = t.replace(motif, (_, debut) => { n++; return `${debut}?v=${version}"`; });
  if (u !== t) writeFileSync(f, u);
  total += n;
  console.log(`  ${p} : ${n} référence(s)`);
}
console.log(`Version ${version} posée sur ${total} références.`);
