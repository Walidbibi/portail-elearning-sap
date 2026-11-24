/* Glossaire partagé : panneau fixé à droite sur grand écran, tiroir sur petit écran.
   Inclus sur toutes les pages du portail, après shared/libelles.js et shared/documents.js.
   Les termes viennent de glossaire.json, à la racine du site. Raccourci : « / ». */
(function(){
const me=document.currentScript;const BASE=new URL('..',me.src);
const lireTermes=nom=>{const u=new URL(nom,BASE);return fetch(u,{cache:'no-cache'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).then(j=>j.termes).catch(e=>{console.warn('Glossaire introuvable ('+u+').',e);return null;});};
// En anglais : glossaire.en.json, relié au français par termeFr ; un terme sans traduction reste en français.
const EN=window.SAP_LANGUE==='en';
const chargerTermes=EN?Promise.all([lireTermes('glossaire.json'),lireTermes('glossaire.en.json')]).then(([fr,en])=>{
  if(!fr)return en;if(!en)return fr;
  const parFr=new Map(en.map(e=>[e.termeFr,e]));
  return fr.map(f=>{const e=parFr.get(f.terme);return e&&e.definition?{...e,documents:f.documents,termeFr:f.terme}:f;});
}):lireTermes('glossaire.json');
Promise.all([window.SAP_LIBELLES||Promise.resolve(k=>k),window.SAP_DOCUMENTS||Promise.resolve({documents:{}}),chargerTermes]).then(function([T,M,termes]){
const G=termes||[];
const doc=k=>M.doc?M.doc(k):null;
const CAT=Object.fromEntries(['meth','proc','tech','data','test','run','agile'].map(c=>[c,T('categories.'+c)]));
const abs=u=>u.startsWith('http')?u:new URL(u,BASE).href;
const tgt=u=>u.startsWith('http')?' target="_blank" rel="noopener"':'';
const css=`
:root{--gl-w:380px}
#gl{position:fixed;top:0;right:0;bottom:0;width:var(--gl-w);background:var(--surface);color:var(--ink);border-left:1px solid var(--line);display:flex;flex-direction:column;z-index:15;font-family:"IBM Plex Sans",-apple-system,"Segoe UI",Arial,sans-serif;font-size:15px;line-height:1.55}
#gl *{box-sizing:border-box}
body.gl-pinned{padding-right:var(--gl-w)}
.gl-head{padding:18px 18px 10px;padding-top:max(18px,env(safe-area-inset-top,0px));padding-right:max(18px,env(safe-area-inset-right,0px));border-bottom:1px solid var(--line)}
.gl-title{margin:0 0 10px;font-size:17px;font-weight:700;display:flex;justify-content:space-between;align-items:center;gap:8px}
.gl-count{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--muted);font-weight:500;margin-left:6px}
.gl-hide{all:unset;cursor:pointer;font-size:13px;color:var(--muted);padding:0 10px;min-height:40px;display:inline-flex;align-items:center;border-radius:6px}
.gl-hide:hover{background:var(--soft);color:var(--ink)}
#gl-q{width:100%;font:inherit;font-size:15px;padding:9px 12px;border:1px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)}
.gl-chips{display:flex;flex-wrap:nowrap;gap:6px;margin-top:10px;overflow-x:auto;padding-bottom:4px;scrollbar-width:thin}
.gl-chip{all:unset;box-sizing:border-box;cursor:pointer;flex:none;min-height:40px;display:inline-flex;align-items:center;font-size:13px;padding:0 12px;border-radius:var(--r-pastille);border:1px solid var(--line);color:var(--muted);white-space:nowrap}
.gl-chip[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--surface);font-weight:600}
.gl-chip[aria-pressed="true"]::before{content:"✓";margin-right:6px}
.gl-list{overflow-y:auto;flex:1;padding:6px 10px 24px;padding-bottom:max(24px,env(safe-area-inset-bottom,0px))}
.gl-letter{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--muted);padding:12px 8px 4px;position:sticky;top:0;background:var(--surface)}
.gl-term-btn{all:unset;box-sizing:border-box;cursor:pointer;width:100%;display:block;padding:8px}
.gl-term-btn:hover{background:var(--soft);border-radius:8px}
.gl-term-btn b{font-weight:600}
.gl-f{color:var(--muted);font-size:13px;margin-left:6px}
.gl-fr{display:inline-flex;align-items:baseline;gap:5px;color:var(--muted);font-size:13px;margin-left:6px}
.gl-fr i{font-style:normal;font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.05em;border:1px solid var(--line);border-radius:3px;padding:0 4px;line-height:15px}
.gl-link .infr{margin-left:6px;font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:4px;padding:0 5px;line-height:16px;white-space:nowrap}
.gl-body{padding:0 8px 12px;font-size:14px}
.gl-body p{margin:0 0 6px}
.gl-dp{background:var(--accent-soft);border-radius:8px;padding:7px 10px;font-size:13.5px}
.gl-dp-l{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--accent)}
.gl-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.gl-link{font-size:12.5px;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:0 10px;min-height:40px;display:inline-flex;align-items:center;box-sizing:border-box}
.gl-link:hover{border-color:var(--accent)}
#gl mark{background:var(--mark);color:inherit;border-radius:2px}
.gl-empty{color:var(--muted);padding:16px 8px;font-size:14px}
#gl-open{all:unset;cursor:pointer;position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:14;background:var(--ink);color:var(--surface);font-family:"IBM Plex Sans",-apple-system,"Segoe UI",Arial,sans-serif;font-weight:600;font-size:15px;padding:11px 16px;border-radius:24px;box-shadow:var(--shadow)}
#gl :focus-visible,#gl-open:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
body.gl-pinned #gl-open{display:none}
#gl-open{display:inline-flex;align-items:center;gap:8px}
#gl-open svg{flex:none}
@media (max-width:600px){#gl-open{width:48px;height:48px;padding:0;justify-content:center;border-radius:50%}#gl-open .gl-open-t{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}}
body:not(.gl-pinned) #gl{box-shadow:var(--shadow);transform:translateX(105%);transition:transform .2s;width:min(var(--gl-w),100%);z-index:30}
body:not(.gl-pinned) #gl.open{transform:none}
/* tiroir : pleine largeur sur téléphone, voile derrière, marge basse pour le bouton flottant */
@media (max-width:480px){body:not(.gl-pinned) #gl{width:100%;border-left:0}}
#gl-voile{position:fixed;inset:0;background:rgba(10,15,25,.45);z-index:29}
#gl-voile[hidden]{display:none}
body:not(.gl-pinned){padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}
@media (prefers-reduced-motion:reduce){#gl{transition:none!important}}
`;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const aside=document.createElement('aside');aside.id='gl';aside.setAttribute('aria-label',T('glossaire.titre'));
aside.innerHTML=`<div class="gl-head"><div class="gl-title"><span>${esc(T('glossaire.titre'))}<span class="gl-count" id="gl-count"></span></span><button class="gl-hide" id="gl-hide" type="button">${esc(T('glossaire.masquer'))}</button></div>
<input id="gl-q" type="search" placeholder="${esc(T('glossaire.recherche'))}" autocomplete="off" aria-label="${esc(T('glossaire.rechercheAria'))}">
<div class="gl-chips" id="gl-chips"></div></div><div class="gl-list" id="gl-list" aria-live="polite"></div>`;
const openBtn=document.createElement('button');openBtn.id='gl-open';openBtn.type='button';
// icône de livre + libellé ; sur téléphone, l'icône seule (le libellé reste lu par les lecteurs d'écran)
openBtn.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/><path d="M8 7h8M8 11h6"/></svg><span class="gl-open-t">'+esc(T('glossaire.ouvrir'))+'</span>';
const voile=document.createElement('div');voile.id='gl-voile';voile.hidden=true;voile.setAttribute('aria-hidden','true');
document.body.append(voile,aside,openBtn);
const list=aside.querySelector('#gl-list'),q=aside.querySelector('#gl-q'),chips=aside.querySelector('#gl-chips'),count=aside.querySelector('#gl-count');
let cat='all';const opened=new Set();
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const hl=(t,qq)=>{if(!qq)return esc(t);const i=norm(t).indexOf(qq);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+qq.length))+'</mark>'+esc(t.slice(i+qq.length));};
// pastilles courtes sur une ligne qui défile ; le nom complet reste en infobulle et pour les lecteurs d'écran
chips.innerHTML=[['all',T('glossaire.tout'),T('glossaire.tout')],...Object.entries(CAT).map(([k,v])=>[k,T('categoriesCourtes.'+k),v])].map(([k,court,long])=>`<button type="button" class="gl-chip" data-c="${k}" aria-pressed="${k==='all'}" title="${esc(long)}" aria-label="${esc(long)}">${esc(court)}</button>`).join('');
chips.addEventListener('click',e=>{const b=e.target.closest('.gl-chip');if(!b)return;cat=b.dataset.c;chips.querySelectorAll('.gl-chip').forEach(c=>c.setAttribute('aria-pressed',c===b));render();});
const items=G.map((g,i)=>({i,t:g.terme,f:g.nomComplet||'',fr:g.nomFr||'',c:g.categorie,d:g.definition,dp:g.pourLeDP||'',l:g.documents||[]})).sort((a,b)=>norm(a.t).localeCompare(norm(b.t)));
function render(){
  if(!termes){count.textContent='';list.innerHTML=`<p class="gl-empty">${esc(T('glossaire.erreur'))}</p>`;return;}
  const qq=norm(q.value.trim());
  const its=items.filter(g=>(cat==='all'||g.c===cat)&&(!qq||norm(g.t+' '+g.f+' '+g.fr+' '+g.d+' '+g.dp).includes(qq)));
  count.textContent=its.length+' / '+G.length;
  if(!its.length){list.innerHTML=`<p class="gl-empty">${esc(T('glossaire.aucun',{q:q.value}))}</p>`;return;}
  const auto=qq&&its.length<=3;let h='',L='';
  for(const g of its){
    const c=norm(g.t)[0].toUpperCase(),letter=/[A-Z]/.test(c)?c:'#';
    if(letter!==L){L=letter;h+=`<div class="gl-letter">${letter}</div>`;}
    const o=opened.has(g.i)||auto;
    h+=`<div><button type="button" class="gl-term-btn" data-i="${g.i}" aria-expanded="${o}"><b>${hl(g.t,qq)}</b>${g.f?`<span class="gl-f">${hl(g.f,qq)}</span>`:''}${g.fr?`<span class="gl-fr" lang="fr"><i>${esc(T('glossaire.marqueFr'))}</i>${hl(g.fr,qq)}</span>`:''}</button>`;
    if(o){h+=`<div class="gl-body"><p>${hl(g.d,qq)}</p>${g.dp?`<p class="gl-dp"><span class="gl-dp-l">${esc(T('glossaire.pourLeDP'))}</span>${esc(g.dp)}</p>`:''}${g.l.map(doc).filter(Boolean).length?`<div class="gl-links">${g.l.map(doc).filter(Boolean).map(d=>{const u=abs((window.SAP_HREF||(x=>x))(d.fichier));return `<a class="gl-link" href="${u}"${tgt(d.fichier)}>${T('types.'+d.type)} · ${esc(d.titre)}${d.enFrancais?`<span class="infr" lang="en">${esc(T('documents.enFrancais'))}</span>`:''}</a>`;}).join('')}</div>`:''}</div>`;}
    h+='</div>';
  }
  list.innerHTML=h;
}
list.addEventListener('click',e=>{const b=e.target.closest('.gl-term-btn');if(!b)return;const i=+b.dataset.i;opened.has(i)?opened.delete(i):opened.add(i);render();const nb=list.querySelector(`.gl-term-btn[data-i="${i}"]`);if(nb)nb.focus();});
q.addEventListener('input',render);
/* pinned on wide screens unless the viewer hid it; drawer otherwise */
const KEY='sap-gl-hidden';let hidden=false;try{hidden=localStorage.getItem(KEY)==='1';}catch(e){}
const wide=()=>window.matchMedia('(min-width: 1100px)').matches;
const btnHide=aside.querySelector('#gl-hide');
function layout(){const pin=wide()&&!hidden;document.body.classList.toggle('gl-pinned',pin);if(pin){aside.classList.remove('open');voile.hidden=true;}
  btnHide.textContent=T(pin?'glossaire.masquer':'glossaire.fermer');}
function show(){if(wide()){hidden=false;try{localStorage.setItem(KEY,'0');}catch(e){}layout();}else{aside.classList.add('open');voile.hidden=false;}q.focus();q.select();}
function hide(){if(wide()){hidden=true;try{localStorage.setItem(KEY,'1');}catch(e){}layout();}else{aside.classList.remove('open');voile.hidden=true;}openBtn.focus();}
btnHide.addEventListener('click',hide);
voile.addEventListener('click',hide);
openBtn.addEventListener('click',show);
window.addEventListener('resize',layout);
document.addEventListener('keydown',e=>{
  const t=e.target;const typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);
  if(e.key==='/'&&!typing){e.preventDefault();show();}
  else if(e.key==='Escape'&&aside.classList.contains('open')){hide();}
});
layout();render();
});
})();
