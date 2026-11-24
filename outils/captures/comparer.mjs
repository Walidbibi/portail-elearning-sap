// Compare deux dossiers de captures, pixel par pixel. Aucune dépendance.
// Usage : node outils/captures/comparer.mjs [avant] [après]   (défaut : reference apres)
// Sort avec le code 1 si une capture diffère ou manque.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = dirname(fileURLToPath(import.meta.url));
const [a = 'reference', b = 'apres'] = process.argv.slice(2);
const AVANT = resolve(ICI, a), APRES = resolve(ICI, b);

// Décode un PNG 8 bits non entrelacé (ce que produit Chrome) en octets bruts.
function decoder(fichier) {
  const buf = readFileSync(fichier);
  let p = 8, w, h, type, idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), nom = buf.toString('ascii', p + 4, p + 8), d = buf.subarray(p + 8, p + 8 + len);
    if (nom === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); type = d[9]; if (d[8] !== 8 || d[12]) throw new Error(`${fichier} : PNG non pris en charge`); }
    if (nom === 'IDAT') idat.push(d);
    p += 12 + len;
  }
  const bpp = { 2: 3, 6: 4, 0: 1, 4: 2 }[type];
  const brut = inflateSync(Buffer.concat(idat)), ligne = w * bpp, px = Buffer.alloc(ligne * h);
  for (let y = 0; y < h; y++) {
    const f = brut[y * (ligne + 1)], src = y * (ligne + 1) + 1, o = y * ligne;
    for (let x = 0; x < ligne; x++) {
      const v = brut[src + x], g = x >= bpp ? px[o + x - bpp] : 0, hh = y ? px[o - ligne + x] : 0, gh = y && x >= bpp ? px[o - ligne + x - bpp] : 0;
      let r;
      if (f === 0) r = v; else if (f === 1) r = v + g; else if (f === 2) r = v + hh; else if (f === 3) r = v + ((g + hh) >> 1);
      else { const pp = g + hh - gh, pa = Math.abs(pp - g), pb = Math.abs(pp - hh), pc = Math.abs(pp - gh); r = v + (pa <= pb && pa <= pc ? g : pb <= pc ? hh : gh); }
      px[o + x] = r & 255;
    }
  }
  return { w, h, bpp, px };
}

let ecarts = 0;
const noms = readdirSync(AVANT).filter(f => f.endsWith('.png')).sort();
for (const f of noms) {
  if (!existsSync(join(APRES, f))) { console.log(`MANQUE      ${f}`); ecarts++; continue; }
  const x = decoder(join(AVANT, f)), y = decoder(join(APRES, f));
  if (x.w !== y.w || x.h !== y.h) { console.log(`TAILLE      ${f} : ${x.w}x${x.h} puis ${y.w}x${y.h}`); ecarts++; continue; }
  if (x.bpp !== y.bpp) { console.log(`FORMAT      ${f}`); ecarts++; continue; }
  let diff = 0;
  for (let i = 0; i < x.px.length; i += x.bpp) { for (let c = 0; c < x.bpp; c++) if (x.px[i + c] !== y.px[i + c]) { diff++; break; } }
  if (diff) { console.log(`DIFFÉRENT   ${f} : ${diff} pixels (${(100 * diff / (x.w * x.h)).toFixed(3)} %)`); ecarts++; }
}
console.log(ecarts ? `${ecarts} écart(s) sur ${noms.length} captures` : `Identique : ${noms.length} captures`);
process.exit(ecarts ? 1 : 0);
