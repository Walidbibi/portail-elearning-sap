/* Schéma des rôles : version téléphone en une colonne (US-037).
   Sous 620 px, le dessin à deux colonnes est remplacé par une liste des rôles, groupée par famille
   (instances, côté client, côté intégrateur), construite à partir du dessin lui-même : aucun texte recopié.
   Toucher un rôle ouvre le même panneau de détail que le dessin. */
(function(){
const svg=document.querySelector('main svg[role="img"]');if(!svg)return;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const css=`.sch-liste{display:none;margin:0 0 4px}
.sch-liste h2{font-size:var(--t-15);margin:18px 0 8px;color:var(--sch-text)}
.sch-liste ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.sch-liste button{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;min-height:48px;padding:8px 12px;border-radius:8px;border:1px solid}
.sch-liste button b{display:block;font-size:var(--t-14);font-weight:600}
.sch-liste button span{display:block;font-size:var(--t-12)}
.sch-liste .g button{background:var(--sch-gray-f);border-color:var(--sch-gray-s)}.sch-liste .g b{color:var(--sch-gray-t)}.sch-liste .g span{color:var(--sch-gray-st)}
.sch-liste .p button{background:var(--sch-pur-f);border-color:var(--sch-pur-s)}.sch-liste .p b{color:var(--sch-pur-t)}.sch-liste .p span{color:var(--sch-pur-st)}
.sch-liste .c button{background:var(--sch-tea-f);border-color:var(--sch-tea-s)}.sch-liste .c b{color:var(--sch-tea-t)}.sch-liste .c span{color:var(--sch-tea-st)}
.sch-liste button[aria-pressed="true"]{border-width:2.5px}
.sch-liste button:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
@media (max-width:620px){main svg[role="img"]{display:none}.sch-liste{display:block}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const libelles=[...svg.querySelectorAll('text.lbl')].map(t=>t.textContent);
const familles=[['g',document.documentElement.lang==='en'?'Governance bodies':'Instances de gouvernance'],['p',libelles[0]||''],['c',libelles[1]||'']];
const nav=document.createElement('nav');nav.className='sch-liste';nav.setAttribute('aria-label',svg.querySelector('title')?.textContent||'');
nav.innerHTML=familles.map(([f,titre])=>{
  const roles=[...svg.querySelectorAll(`g.n.${f}`)];
  return `<h2>${esc(titre)}</h2><ul class="${f}">`+roles.map(g=>`<li><button type="button" data-k="${g.dataset.k}" aria-pressed="false"><b>${esc(g.querySelector('.t').textContent)}</b><span>${esc(g.querySelector('.s').textContent)}</span></button></li>`).join('')+'</ul>';
}).join('');
svg.after(nav);
nav.addEventListener('click',e=>{const b=e.target.closest('button[data-k]');if(!b)return;
  svg.querySelector(`g.n[data-k="${b.dataset.k}"]`).dispatchEvent(new MouseEvent('click',{bubbles:true}));
  nav.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  document.getElementById('panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});});
})();
