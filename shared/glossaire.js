/* Glossaire partagé : panneau fixé à droite sur grand écran, tiroir sur petit écran.
   Inclus sur toutes les pages du portail, après shared/libelles.js et shared/documents.js. Raccourci : « / ». */
(function(){
const me=document.currentScript;const BASE=new URL('..',me.src);
Promise.all([window.SAP_LIBELLES||Promise.resolve(k=>k),window.SAP_DOCUMENTS||Promise.resolve({documents:{}})]).then(function([T,M]){
const D=M.documents;
const CAT=window.SAP_CAT||{},G=window.SAP_GLOSSAIRE||[];
const abs=u=>u.startsWith('http')?u:new URL(u,BASE).href;
const tgt=u=>u.startsWith('http')?' target="_blank" rel="noopener"':'';
const css=`
:root{--gl-bg:#FFFFFF;--gl-page:#F3F5F8;--gl-ink:#17202E;--gl-muted:#5A6577;--gl-line:#D5DBE4;--gl-soft:#EBEFF5;--gl-accent:#1B7287;--gl-accent-soft:#E0F0F3;--gl-mark:#FCE9B8;--gl-focus:#E07A2F;--gl-shadow:0 12px 40px rgba(17,26,40,.22);--gl-w:380px}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--gl-bg:#1B212B;--gl-page:#12161D;--gl-ink:#E9EDF3;--gl-muted:#A3ADBD;--gl-line:#323B49;--gl-soft:#222936;--gl-accent:#5FC0D4;--gl-accent-soft:#16303A;--gl-mark:#5A4710;--gl-shadow:0 12px 40px rgba(0,0,0,.55)}}
:root[data-theme="dark"]{--gl-bg:#1B212B;--gl-page:#12161D;--gl-ink:#E9EDF3;--gl-muted:#A3ADBD;--gl-line:#323B49;--gl-soft:#222936;--gl-accent:#5FC0D4;--gl-accent-soft:#16303A;--gl-mark:#5A4710;--gl-shadow:0 12px 40px rgba(0,0,0,.55)}
#gl{position:fixed;top:0;right:0;bottom:0;width:var(--gl-w);background:var(--gl-bg);color:var(--gl-ink);border-left:1px solid var(--gl-line);display:flex;flex-direction:column;z-index:15;font-family:"IBM Plex Sans",-apple-system,"Segoe UI",Arial,sans-serif;font-size:15px;line-height:1.55}
#gl *{box-sizing:border-box}
body.gl-pinned{padding-right:var(--gl-w)}
.gl-head{padding:18px 18px 10px;padding-top:max(18px,env(safe-area-inset-top,0px));padding-right:max(18px,env(safe-area-inset-right,0px));border-bottom:1px solid var(--gl-line)}
.gl-title{margin:0 0 10px;font-size:17px;font-weight:700;display:flex;justify-content:space-between;align-items:center;gap:8px}
.gl-count{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--gl-muted);font-weight:500;margin-left:6px}
.gl-hide{all:unset;cursor:pointer;font-size:13px;color:var(--gl-muted);padding:4px 8px;border-radius:6px}
.gl-hide:hover{background:var(--gl-soft);color:var(--gl-ink)}
#gl-q{width:100%;font:inherit;font-size:15px;padding:9px 12px;border:1px solid var(--gl-line);border-radius:8px;background:var(--gl-page);color:var(--gl-ink)}
.gl-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.gl-chip{all:unset;cursor:pointer;font-size:12.5px;padding:3px 9px;border-radius:20px;border:1px solid var(--gl-line);color:var(--gl-muted)}
.gl-chip[aria-pressed="true"]{background:var(--gl-accent);border-color:var(--gl-accent);color:var(--gl-bg)}
.gl-list{overflow-y:auto;flex:1;padding:6px 10px 24px;padding-bottom:max(24px,env(safe-area-inset-bottom,0px))}
.gl-letter{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:12px;color:var(--gl-muted);padding:12px 8px 4px;position:sticky;top:0;background:var(--gl-bg)}
.gl-term-btn{all:unset;box-sizing:border-box;cursor:pointer;width:100%;display:block;padding:8px}
.gl-term-btn:hover{background:var(--gl-soft);border-radius:8px}
.gl-term-btn b{font-weight:600}
.gl-f{color:var(--gl-muted);font-size:13px;margin-left:6px}
.gl-body{padding:0 8px 12px;font-size:14px}
.gl-body p{margin:0 0 6px}
.gl-dp{background:var(--gl-accent-soft);border-radius:8px;padding:7px 10px;font-size:13.5px}
.gl-dp-l{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--gl-accent)}
.gl-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.gl-link{font-size:12.5px;text-decoration:none;color:var(--gl-ink);border:1px solid var(--gl-line);border-radius:6px;padding:2px 8px}
.gl-link:hover{border-color:var(--gl-accent)}
#gl mark{background:var(--gl-mark);color:inherit;border-radius:2px}
.gl-empty{color:var(--gl-muted);padding:16px 8px;font-size:14px}
#gl-open{all:unset;cursor:pointer;position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:max(16px,env(safe-area-inset-bottom,0px));z-index:14;background:var(--gl-ink);color:var(--gl-bg);font-family:"IBM Plex Sans",-apple-system,"Segoe UI",Arial,sans-serif;font-weight:600;font-size:15px;padding:11px 16px;border-radius:24px;box-shadow:var(--gl-shadow)}
#gl :focus-visible,#gl-open:focus-visible{outline:3px solid var(--gl-focus);outline-offset:2px}
body.gl-pinned #gl-open{display:none}
body:not(.gl-pinned) #gl{box-shadow:var(--gl-shadow);transform:translateX(105%);transition:transform .2s;width:min(var(--gl-w),100%);z-index:30}
body:not(.gl-pinned) #gl.open{transform:none}
@media (prefers-reduced-motion:reduce){#gl{transition:none!important}}
`;
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const aside=document.createElement('aside');aside.id='gl';aside.setAttribute('aria-label',T('glossaire.titre'));
aside.innerHTML=`<div class="gl-head"><div class="gl-title"><span>${esc(T('glossaire.titre'))}<span class="gl-count" id="gl-count"></span></span><button class="gl-hide" id="gl-hide" type="button">${esc(T('glossaire.masquer'))}</button></div>
<input id="gl-q" type="search" placeholder="${esc(T('glossaire.recherche'))}" autocomplete="off" aria-label="${esc(T('glossaire.rechercheAria'))}">
<div class="gl-chips" id="gl-chips"></div></div><div class="gl-list" id="gl-list" aria-live="polite"></div>`;
const openBtn=document.createElement('button');openBtn.id='gl-open';openBtn.type='button';openBtn.textContent=T('glossaire.ouvrir');
document.body.append(aside,openBtn);
const list=aside.querySelector('#gl-list'),q=aside.querySelector('#gl-q'),chips=aside.querySelector('#gl-chips'),count=aside.querySelector('#gl-count');
let cat='all';const opened=new Set();
const norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const hl=(t,qq)=>{if(!qq)return esc(t);const i=norm(t).indexOf(qq);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+qq.length))+'</mark>'+esc(t.slice(i+qq.length));};
chips.innerHTML=[['all',T('glossaire.tout')],...Object.entries(CAT)].map(([k,v])=>`<button type="button" class="gl-chip" data-c="${k}" aria-pressed="${k==='all'}">${v}</button>`).join('');
chips.addEventListener('click',e=>{const b=e.target.closest('.gl-chip');if(!b)return;cat=b.dataset.c;chips.querySelectorAll('.gl-chip').forEach(c=>c.setAttribute('aria-pressed',c===b));render();});
const items=G.map((g,i)=>({i,t:g[0],f:g[1],c:g[2],d:g[3],dp:g[4],l:g[5]||[]})).sort((a,b)=>norm(a.t).localeCompare(norm(b.t)));
function render(){
  const qq=norm(q.value.trim());
  const its=items.filter(g=>(cat==='all'||g.c===cat)&&(!qq||norm(g.t+' '+g.f+' '+g.d+' '+g.dp).includes(qq)));
  count.textContent=its.length+' / '+G.length;
  if(!its.length){list.innerHTML=`<p class="gl-empty">${esc(T('glossaire.aucun',{q:q.value}))}</p>`;return;}
  const auto=qq&&its.length<=3;let h='',L='';
  for(const g of its){
    const c=norm(g.t)[0].toUpperCase(),letter=/[A-Z]/.test(c)?c:'#';
    if(letter!==L){L=letter;h+=`<div class="gl-letter">${letter}</div>`;}
    const o=opened.has(g.i)||auto;
    h+=`<div><button type="button" class="gl-term-btn" data-i="${g.i}" aria-expanded="${o}"><b>${hl(g.t,qq)}</b>${g.f?`<span class="gl-f">${hl(g.f,qq)}</span>`:''}</button>`;
    if(o){h+=`<div class="gl-body"><p>${hl(g.d,qq)}</p>${g.dp?`<p class="gl-dp"><span class="gl-dp-l">${esc(T('glossaire.pourLeDP'))}</span>${esc(g.dp)}</p>`:''}${g.l.filter(k=>D[k]).length?`<div class="gl-links">${g.l.filter(k=>D[k]).map(k=>{const u=abs((window.SAP_HREF||(x=>x))(D[k].fichier));return `<a class="gl-link" href="${u}"${tgt(D[k].fichier)}>${T('types.'+D[k].type)} · ${esc(D[k].titre)}</a>`;}).join('')}</div>`:''}</div>`;}
    h+='</div>';
  }
  list.innerHTML=h;
}
list.addEventListener('click',e=>{const b=e.target.closest('.gl-term-btn');if(!b)return;const i=+b.dataset.i;opened.has(i)?opened.delete(i):opened.add(i);render();const nb=list.querySelector(`.gl-term-btn[data-i="${i}"]`);if(nb)nb.focus();});
q.addEventListener('input',render);
/* pinned on wide screens unless the viewer hid it; drawer otherwise */
const KEY='sap-gl-hidden';let hidden=false;try{hidden=localStorage.getItem(KEY)==='1';}catch(e){}
const wide=()=>window.matchMedia('(min-width: 1100px)').matches;
function layout(){document.body.classList.toggle('gl-pinned',wide()&&!hidden);if(document.body.classList.contains('gl-pinned'))aside.classList.remove('open');}
function show(){if(wide()){hidden=false;try{localStorage.setItem(KEY,'0');}catch(e){}layout();}else{aside.classList.add('open');}q.focus();q.select();}
function hide(){if(wide()){hidden=true;try{localStorage.setItem(KEY,'1');}catch(e){}layout();}else{aside.classList.remove('open');}openBtn.focus();}
aside.querySelector('#gl-hide').addEventListener('click',hide);
openBtn.addEventListener('click',show);
window.addEventListener('resize',layout);
document.addEventListener('keydown',e=>{
  const t=e.target;const typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable);
  if(e.key==='/'&&!typing){e.preventDefault();show();}
  else if(e.key==='Escape'&&aside.classList.contains('open')){aside.classList.remove('open');}
});
layout();render();
});
})();
