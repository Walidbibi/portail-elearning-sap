// Captures d'écran du portail, pour comparer avant / après une refonte.
// Aucune dépendance : Node 22+ (WebSocket intégré) et Google Chrome.
//
// Usage : node outils/captures/captures.mjs [page] [--out <dossier>]
//   page    : accueil | glossaire | greenfield | brownfield | bluefield | rollout | lecteur | schema | ecc-s4hana | ecc-entrepot | ecc-changements | flux-p2p-s4 | flux-o2c-s4 (toutes si absent)
//   --out   : dossier de sortie, relatif à outils/captures/ (défaut : reference)
//   --langue : fr (défaut) ou en ; la langue est forcée par ?lang= dans l'adresse

import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = resolve(ICI, '..', '..');
const PORT = 8765;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const args = process.argv.slice(2);
const iOut = args.indexOf('--out');
const SORTIE = resolve(ICI, iOut >= 0 ? args[iOut + 1] : 'reference');
const iLangue = args.indexOf('--langue');
const LANGUE = iLangue >= 0 ? args[iLangue + 1] : 'fr';
const filtre = args.find((a, i) => !a.startsWith('--') && (iOut < 0 || i !== iOut + 1) && (iLangue < 0 || i !== iLangue + 1));

const LARGEURS = { bureau: [1440, 900, false], telephone: [390, 844, true] };
const THEMES = ['clair', 'sombre'];
const FRISES = ['greenfield', 'brownfield', 'bluefield', 'rollout'];

// Chaque page : adresse, attente avant capture, capture pleine page ou non, états supplémentaires.
const PAGES = {
  accueil: { url: 'index.html', plein: true, attente: `document.querySelectorAll('.card').length>0` },
  glossaire: {
    url: 'index.html', plein: false, attente: `document.querySelectorAll('.card').length>0&&!!document.querySelector('.gl-term-btn')`,
    action: `(async()=>{
      if(innerWidth<=1100)document.getElementById('gl-open').click();
      const q=document.getElementById('gl-q');q.value='cutover';q.dispatchEvent(new Event('input'));
      await new Promise(r=>setTimeout(r,200));
      document.querySelector('.gl-term-btn').click();
      document.activeElement&&document.activeElement.blur();
    })()`,
  },
  lecteur: { url: 'lecteur.html?doc=documents/formation-sap-synthese.pdf', plein: false, attente: `!!document.querySelector('canvas')` },
  // schéma des rôles : une page par langue (la version anglaise est un autre fichier)
  schema: { url: LANGUE === 'en' ? 'schemas/sap-program-roles.html' : 'schemas/roles-programme-sap.html', plein: true },
  // De ECC à S/4HANA (lot 5) : schémas 0, 2 et 3, la popup commune, et la vue « ECC → S/4HANA » de P2P et O2C
  'ecc-s4hana': { url: 'schemas/ecc-s4hana.html', plein: true, attente: `!!document.querySelector('.s0-row')` },
  'ecc-s4hana-popup': { url: 'schemas/ecc-s4hana.html', plein: false, attente: `!!document.querySelector('.s0-row')`, action: `document.querySelector('.s0-row').click()`, groupe: 'ecc-s4hana' },
  'ecc-entrepot': { url: 'schemas/ecc-entrepot.html', plein: true, attente: `!!document.querySelector('.opt')` },
  'ecc-changements': { url: 'schemas/ecc-changements.html', plein: true, attente: `!!document.querySelector('.c3')` },
  'flux-p2p-s4': { url: 'schemas/flux-p2p.html?vue=s4', plein: true, attente: `!!document.querySelector('.ipg')` },
  'flux-o2c-s4': { url: 'schemas/flux-o2c.html?vue=s4', plein: true, attente: `!!document.querySelector('.ipg')` },
};
for (const f of FRISES) {
  PAGES[f] = { url: `frises/${f}.html`, plein: true };
  PAGES[f + '-popup'] = { url: `frises/${f}.html`, plein: false, action: `document.getElementById('start').click()`, groupe: f };
}

const pause = ms => new Promise(r => setTimeout(r, ms));

async function attendre(cond, ms = 15000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) { if (await cond()) return true; await pause(150); }
  return false;
}

// --- Serveur local et Chrome ---
const serveur = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: RACINE, stdio: 'ignore' });
const profil = mkdtempSync(join(tmpdir(), 'captures-chrome-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profil}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-color-profile=srgb',
  '--font-render-hinting=none', 'about:blank',
], { stdio: 'ignore' });

function fin(code) {
  try { chrome.kill(); } catch {}
  try { serveur.kill(); } catch {}
  setTimeout(() => { try { rmSync(profil, { recursive: true, force: true }); } catch {} process.exit(code); }, 300);
}
process.on('SIGINT', () => fin(130));

try {
  const fPort = join(profil, 'DevToolsActivePort');
  if (!await attendre(() => existsSync(fPort))) throw new Error('Chrome ne démarre pas');
  const portCdp = readFileSync(fPort, 'utf8').split('\n')[0];
  if (!await attendre(async () => { try { await fetch(`http://127.0.0.1:${PORT}/`); return true; } catch { return false; } }))
    throw new Error('Le serveur local ne démarre pas');

  const cibles = await (await fetch(`http://127.0.0.1:${portCdp}/json/list`)).json();
  const ws = new WebSocket(cibles.find(c => c.type === 'page').webSocketDebuggerUrl);
  await new Promise((ok, ko) => { ws.onopen = ok; ws.onerror = ko; });
  let id = 0; const enCours = new Map(); const ecouteurs = [];
  ws.onmessage = m => {
    const d = JSON.parse(m.data);
    if (d.id && enCours.has(d.id)) { const { ok, ko } = enCours.get(d.id); enCours.delete(d.id); d.error ? ko(new Error(d.error.message)) : ok(d.result); }
    else if (d.method) ecouteurs.forEach(f => f(d));
  };
  const cdp = (method, params = {}) => new Promise((ok, ko) => { const i = ++id; enCours.set(i, { ok, ko }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluer = async expr => (await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;

  await cdp('Page.enable');
  await cdp('Runtime.enable');
  const SANS_ANIM = '*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}';

  mkdirSync(SORTIE, { recursive: true });
  let n = 0;
  for (const [nom, p] of Object.entries(PAGES)) {
    if (filtre && nom !== filtre && p.groupe !== filtre) continue;
    for (const [largeur, [w, h, mobile]] of Object.entries(LARGEURS)) {
      for (const theme of THEMES) {
        await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile });
        await cdp('Emulation.setEmulatedMedia', { features: [
          { name: 'prefers-color-scheme', value: theme === 'clair' ? 'light' : 'dark' },
          { name: 'prefers-reduced-motion', value: 'reduce' },
        ] });
        const charge = new Promise(r => { const f = d => { if (d.method === 'Page.loadEventFired') { ecouteurs.splice(ecouteurs.indexOf(f), 1); r(); } }; ecouteurs.push(f); });
        await cdp('Page.navigate', { url: `http://127.0.0.1:${PORT}/${p.url}${p.url.includes('?') ? '&' : '?'}lang=${LANGUE}` });
        await charge;
        await evaluer(`(()=>{try{localStorage.clear()}catch(e){};const s=document.createElement('style');s.textContent=${JSON.stringify(SANS_ANIM)};document.head.appendChild(s)})()`);
        await evaluer('document.fonts.ready.then(()=>true)');
        // Les pages construisent leur contenu après des fetch : on attend que le nombre d'éléments se stabilise.
        // Contenu propre à la page (cartes, canvas…) : construit après des fetch.
        if (p.attente && !await attendre(() => evaluer(p.attente))) console.warn(`  attention : ${nom} pas prêt`);
        await evaluer(`new Promise(r=>{let n=-1,k=0;const t=setInterval(()=>{const m=document.getElementsByTagName('*').length;if(m===n){if(++k>=5){clearInterval(t);r(true);}}else{n=m;k=0;}},100);})`);
        // Les aperçus sont en chargement différé : on les charge tous, on attend leur décodage,
        // et on recommence tant que le nombre d'images change. Puis deux images d'animation pour l'affichage.
        await evaluer(`(async()=>{let n=-1;while(document.images.length!==n){n=document.images.length;
          await Promise.all([...document.images].map(i=>{i.loading='eager';return i.complete?0:new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true})})}));
          await Promise.all([...document.images].map(i=>i.decode().catch(()=>0)));}
          await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return true;})()`);
        if (p.action) await evaluer(p.action);
        await pause(p.attente ? 1200 : 400);

        let clip;
        if (p.plein) {
          const hauteur = await evaluer('Math.ceil(document.documentElement.scrollHeight)');
          clip = { x: 0, y: 0, width: w, height: hauteur, scale: 1 };
        }
        const { data } = await cdp('Page.captureScreenshot', { format: 'png', ...(clip ? { clip, captureBeyondViewport: true } : {}) });
        const fichier = `${nom}-${largeur}-${theme}.png`;
        writeFileSync(join(SORTIE, fichier), Buffer.from(data, 'base64'));
        console.log(`  ${fichier}`);
        n++;
      }
    }
  }
  console.log(`${n} captures dans ${SORTIE}`);
  ws.close();
  fin(0);
} catch (e) {
  console.error('Échec :', e.message);
  fin(1);
}
