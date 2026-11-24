/* Langue et libellés de l'interface.
   Langue : ?lang=fr|en dans l'adresse, sinon le choix mémorisé, sinon la langue du navigateur
   (français donne FR, toute autre langue donne EN).
   Libellés : shared/libelles/fr.json, puis <langue>.json par-dessus ; un texte absent en anglais
   s'affiche en français, une clé absente partout s'affiche telle quelle.
   SAP_T('cle.sous-cle', {variable}) rend le texte. Dans le HTML : data-t (texte), data-t-aria (aria-label),
   data-t-placeholder ; <div data-langue></div> reçoit le sélecteur FR / EN.
   Les JSON sont toujours revalidés (cache: no-cache) : après une publication, jamais d'anciens textes.
   SAP_LANGUE vaut 'fr' ou 'en'. SAP_LIBELLES est une promesse résolue quand tout est appliqué. */
(function(){
const me=document.currentScript;
const LANGUES=['fr','en'],CLE='sap-langue';
const lire=()=>{try{return localStorage.getItem(CLE);}catch(e){return null;}};
const ecrire=l=>{try{localStorage.setItem(CLE,l);}catch(e){}};
const param=new URLSearchParams(location.search).get('lang');
let langue;
if(LANGUES.includes(param)){langue=param;ecrire(param);}
else if(LANGUES.includes(lire()))langue=lire();
else langue=/^fr\b/i.test(navigator.language||'')?'fr':'en';
document.documentElement.lang=langue;
window.SAP_LANGUE=langue;

const L={};
const aplatir=(o,p)=>{for(const[k,v]of Object.entries(o)){const c=p?p+'.'+k:k;if(v&&typeof v==='object')aplatir(v,c);else L[c]=String(v);}};
const T=(k,v)=>{const s=L[k];if(s===undefined)return k;return v?s.replace(/\{(\w+)\}/g,(m,n)=>n in v?v[n]:m):s;};
const charger=l=>fetch(new URL('libelles/'+l+'.json',me.src),{cache:'no-cache'})
  .then(r=>{if(!r.ok)throw new Error(r.status);return r.json();})
  .then(o=>aplatir(o,''))
  .catch(e=>console.warn('Libellés '+l+' introuvables : '+(l==='fr'?'les clés s\'affichent à la place des textes.':'le français est affiché.'),e));

// Sélecteur FR / EN : choisir une langue la mémorise et recharge la même page.
function changer(l){
  ecrire(l);
  const u=new URL(location.href);
  if(u.searchParams.has('lang'))u.searchParams.set('lang',l);
  location.replace(u.href);
}
const css=`.lang{display:inline-flex;flex:none;border:1px solid var(--line,#D5DBE4);border-radius:9px;background:var(--surface,#fff);overflow:hidden}
.lang button{all:unset;box-sizing:border-box;cursor:pointer;min-width:44px;height:40px;padding:0 10px;display:grid;place-items:center;font-family:"IBM Plex Mono",ui-monospace,Menlo,Consolas,monospace;font-size:13px;font-weight:500;letter-spacing:.04em;color:var(--muted,#5A6577)}
.lang button+button{border-left:1px solid var(--line,#D5DBE4)}
.lang button[aria-pressed="true"]{background:var(--ink,#17202E);color:var(--surface,#fff);cursor:default}
.lang button:hover:not([aria-pressed="true"]){background:var(--soft,var(--bg,#EBEFF5));color:var(--ink,#17202E)}
.lang button:focus-visible{outline:3px solid var(--focus,#E07A2F);outline-offset:-3px}
.lang .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}`;
function selecteurs(){
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  document.querySelectorAll('[data-langue]').forEach(el=>{
    el.className='lang';el.setAttribute('role','group');el.setAttribute('aria-label',T('langue.groupe'));
    el.innerHTML=LANGUES.map(l=>`<button type="button" lang="${l}" aria-pressed="${l===langue}">${l.toUpperCase()}<span class="sr"> ${T('langue.'+l)}</span></button>`).join('');
    el.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&b.lang!==langue)changer(b.lang);});
  });
}

function appliquer(racine){
  racine=racine||document;
  racine.querySelectorAll('[data-t]').forEach(e=>{e.textContent=T(e.dataset.t);});
  racine.querySelectorAll('[data-t-aria]').forEach(e=>{e.setAttribute('aria-label',T(e.dataset.tAria));});
  racine.querySelectorAll('[data-t-placeholder]').forEach(e=>{e.setAttribute('placeholder',T(e.dataset.tPlaceholder));});
}
const domPret=()=>document.readyState==='loading'?new Promise(r=>document.addEventListener('DOMContentLoaded',r,{once:true})):null;
window.SAP_T=T;
window.SAP_APPLIQUER=appliquer;
window.SAP_LIBELLES=charger('fr')
  .then(()=>langue==='fr'?null:charger(langue))
  .then(domPret)
  .then(()=>{appliquer();selecteurs();return T;});
})();
