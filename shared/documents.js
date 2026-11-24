/* Manifeste des documents : charge documents.json (à la racine du site).
   SAP_DOCUMENTS est une promesse qui rend {accueil, documents, doc(cle), section(nom)} :
   - doc(cle) donne le document tel qu'il s'affiche dans la langue en cours. En anglais, un document
     qui a une version anglaise (versionEn) est remplacé par elle ; un document resté en français
     porte enFrancais = true ; titre et description viennent du bloc « en » quand il existe.
   - section(nom) donne les clés d'une section de l'accueil, sans doublon dans la langue en cours.
   SAP_HREF(fichier) : un PDF local s'ouvre dans le lecteur, le reste tel quel. */
(function(){
const me=document.currentScript;
const url=new URL('../documents.json',me.src);
window.SAP_HREF=u=>(!/^https?:/.test(u)&&/\.pdf$/i.test(u))?'lecteur.html?doc='+encodeURIComponent(u):u;
window.SAP_DOCUMENTS=fetch(url)
  .then(r=>{if(!r.ok)throw new Error(r.status);return r.json();})
  .catch(e=>{console.warn('Manifeste introuvable ('+url+').',e);return {};})
  .then(m=>{
    const documents=m.documents||{},accueil=m.accueil||{};
    const en=window.SAP_LANGUE==='en';
    function doc(cle){
      let k=cle,d=documents[k];if(!d)return null;
      if(en&&d.versionEn&&documents[d.versionEn]){k=d.versionEn;d=documents[k];}
      const t=en&&d.en?d.en:d;
      return {cle:k,type:d.type,fichier:d.fichier,titre:t.titre||d.titre,description:t.description||d.description,
              enFrancais:en&&(d.langue||'fr').split(' ').indexOf('en')<0,langue:d.langue||'fr'};
    }
    // en anglais, une version anglaise déjà affichée ailleurs n'apparaît pas une seconde fois
    const cibles=new Set(Object.values(documents).map(d=>d.versionEn).filter(Boolean));
    function section(nom){
      return (accueil[nom]||[]).filter(k=>documents[k]&&!(en&&cibles.has(k)));
    }
    return {accueil,documents,doc,section};
  });
})();
