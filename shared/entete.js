/* En-tête commun de Jalon (US-030) : logotype (lien vers l'accueil), fil d'Ariane, sélecteur FR / EN.
   La page déclare : <header data-entete="accueil"></header> (signature, pas de fil d'Ariane)
   ou <header data-entete data-doc="green"></header> (fil d'Ariane : section de l'accueil / titre du document)
   ou, dans la barre du lecteur, <span data-entete="lecteur"></span> (monogramme et section seulement).
   À charger après libelles.js et documents.js. Le squelette est posé tout de suite, pour que libelles.js
   y place le sélecteur ; le fil d'Ariane est rempli quand les libellés et le manifeste sont chargés. */
(function(){
const me=document.currentScript;
const BASE=new URL('..',me.src);
const accueil=new URL('index.html',BASE).href;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// monogramme : ligne de temps (couleur du texte) et losange ambre (réservé au jalon)
const MARQUE='<svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M2 16H30" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="10.5" y="10.5" width="11" height="11" transform="rotate(45 16 16)" fill="var(--jalon)"/></svg>';
const css=`.jl-hb{display:flex;align-items:center;gap:14px;min-height:60px;padding:8px max(16px,env(safe-area-inset-right,0px)) 8px max(16px,env(safe-area-inset-left,0px));background:var(--surface);border-bottom:1px solid var(--line);font-family:var(--sans);color:var(--ink);box-sizing:border-box;min-width:0}
.jl-logo{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:var(--ink);min-height:40px;flex:none;border-radius:6px}
.jl-logo svg{display:block;flex:none;width:30px;height:30px}
.jl-mot{font-weight:700;font-size:20px;letter-spacing:-.01em;line-height:1}
.jl-sig{font-family:var(--mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border-left:1px solid var(--line);padding-left:12px;line-height:1.3}
.jl-ariane{display:flex;align-items:center;gap:6px;font-size:14px;color:var(--muted);min-width:0;flex:0 1 auto}
.jl-ariane a{color:inherit;text-decoration:none;display:inline-flex;align-items:center;min-height:40px;white-space:nowrap;border-radius:4px}
.jl-ariane a:hover{color:var(--ink);text-decoration:underline}
.jl-ariane b{color:var(--ink);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.jl-sp{flex:1}
.jl-logo:focus-visible,.jl-ariane a:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
.jl-lecteur{display:inline-flex;align-items:center;gap:8px;min-width:0;flex:none}
.jl-lecteur .jl-ariane{font-size:14px}
@media (max-width:600px){.jl-sig{display:none}.jl-hb{gap:10px}.jl-mot{font-size:18px}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const logo=(avecMot)=>`<a class="jl-logo" href="${accueil}" data-t-aria="entete.accueil">${MARQUE}${avecMot?'<span class="jl-mot">Jalon</span>':''}</a>`;
const zones=[...document.querySelectorAll('[data-entete]')];
zones.forEach(z=>{
  const type=z.dataset.entete;
  if(type==='lecteur'){z.className='jl-lecteur';z.innerHTML=logo(true)+'<nav class="jl-ariane" data-t-aria="entete.ariane"></nav>';return;}
  z.classList.add('jl-hb');
  z.innerHTML=logo(true)+(type==='accueil'?'<span class="jl-sig" data-t="entete.signature"></span>':'<nav class="jl-ariane" data-t-aria="entete.ariane"></nav>')+'<span class="jl-sp"></span><div data-langue></div>';
});

// section de l'accueil qui contient un document (ou dont un document a cette version anglaise)
const ANCRES={parcours:'path',flux:'flux',certification:'certification',frises:'frises',autres:'other'};
function section(M,cle){
  for(const s of Object.keys(ANCRES)){
    const cles=(M.accueil[s]||[]);
    if(cles.includes(cle)||cles.some(k=>(M.documents[k]||{}).versionEn===cle))return s;
  }
  return null;
}
Promise.all([window.SAP_LIBELLES,window.SAP_DOCUMENTS]).then(([T,M])=>{
  zones.forEach(z=>{
    const nav=z.querySelector('.jl-ariane');if(!nav)return;
    let cle=z.dataset.doc;
    if(!cle){const src=new URLSearchParams(location.search).get('doc');cle=Object.keys(M.documents).find(k=>M.documents[k].fichier===src);}
    if(!cle)return;
    const s=section(M,cle),d=M.doc(cle);
    const lien=s?`<span aria-hidden="true">/</span><a href="${accueil}#${ANCRES[s]}">${esc(T('entete.'+s))}</a>`:'';
    nav.innerHTML=z.dataset.entete==='lecteur'?lien:lien+(d?`<span aria-hidden="true">/</span><b>${esc(d.titre)}</b>`:'');
  });
});
})();
