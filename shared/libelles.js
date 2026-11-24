/* Libellés de l'interface : chargés depuis shared/libelles/<langue>.json.
   SAP_T('cle.sous-cle', {variable}) rend le texte ; une clé absente s'affiche telle quelle.
   Dans le HTML : data-t (texte), data-t-aria (aria-label), data-t-placeholder.
   SAP_LIBELLES est une promesse résolue quand les libellés sont chargés et appliqués. */
(function(){
const me=document.currentScript;
const langue=(document.documentElement.lang||'fr').slice(0,2);
const url=new URL('libelles/'+langue+'.json',me.src);
const L={};
const aplatir=(o,p)=>{for(const[k,v]of Object.entries(o)){const c=p?p+'.'+k:k;if(v&&typeof v==='object')aplatir(v,c);else L[c]=String(v);}};
const T=(k,v)=>{const s=L[k];if(s===undefined)return k;return v?s.replace(/\{(\w+)\}/g,(m,n)=>n in v?v[n]:m):s;};
function appliquer(racine){
  racine=racine||document;
  racine.querySelectorAll('[data-t]').forEach(e=>{e.textContent=T(e.dataset.t);});
  racine.querySelectorAll('[data-t-aria]').forEach(e=>{e.setAttribute('aria-label',T(e.dataset.tAria));});
  racine.querySelectorAll('[data-t-placeholder]').forEach(e=>{e.setAttribute('placeholder',T(e.dataset.tPlaceholder));});
}
const domPret=()=>document.readyState==='loading'?new Promise(r=>document.addEventListener('DOMContentLoaded',r,{once:true})):null;
window.SAP_T=T;
window.SAP_APPLIQUER=appliquer;
window.SAP_LIBELLES=fetch(url)
  .then(r=>{if(!r.ok)throw new Error(r.status);return r.json();})
  .then(o=>aplatir(o,''))
  .catch(e=>console.warn('Libellés introuvables ('+url+') : les clés s\'affichent à la place des textes.',e))
  .then(domPret)
  .then(()=>{appliquer();return T;});
})();
