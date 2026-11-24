/* Manifeste des documents : charge documents.json (à la racine du site).
   SAP_DOCUMENTS est une promesse qui rend {accueil, documents}.
   SAP_HREF(fichier) : un PDF local s'ouvre dans le lecteur, le reste tel quel. */
(function(){
const me=document.currentScript;
const url=new URL('../documents.json',me.src);
window.SAP_HREF=u=>(!/^https?:/.test(u)&&/\.pdf$/i.test(u))?'lecteur.html?doc='+encodeURIComponent(u):u;
window.SAP_DOCUMENTS=fetch(url)
  .then(r=>{if(!r.ok)throw new Error(r.status);return r.json();})
  .catch(e=>{console.warn('Manifeste introuvable ('+url+').',e);return {};})
  .then(m=>({accueil:m.accueil||{},documents:m.documents||{}}));
})();
