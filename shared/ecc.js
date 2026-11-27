/* De ECC à S/4HANA (lot 5) : popup commune et affichage des schémas 0, 2 et 3.
   Chaque page porte <main id="ecc" data-schema="0|2|3"></main> et son contenu dans
   <script type="application/json" id="ecc-data">. Textes d'interface : libellés « ecc » de shared/libelles.
   Dans les textes, **terme** devient un bouton qui ouvre le glossaire sur ce terme.
   Liens du JSON : chemins depuis la racine du site (un PDF passe par SAP_HREF, donc par le lecteur).
   À charger après libelles.js, documents.js, entete.js et glossaire.js. */
(function(){
const me=document.currentScript;
const BASE=new URL('..',me.src);
const D=JSON.parse(document.getElementById('ecc-data').textContent);
const root=document.getElementById('ecc');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const md=s=>esc(s).replace(/\*\*(.+?)\*\*/g,(m,t)=>`<button type="button" class="gl-mot" data-gl-terme="${t}">${t}</button>`);
const href=u=>/^https?:/.test(u)?u:new URL((window.SAP_HREF||(x=>x))(u),BASE).href;
const LOS='<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><rect x="2" y="2" width="6" height="6" transform="rotate(45 5 5)" fill="var(--jalon)"/></svg>';
const ARR='<svg viewBox="0 0 160 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M4 5H154M148 1L155 5L148 9"/></svg>';
let T=k=>k;

const rub=(cls,titre,html)=>`<div class="rub ${cls}"><h3>${esc(titre)}</h3><p>${html}</p></div>`;
const fil=t=>t?`<div class="fr"><div class="frl">${LOS}${esc(T('ecc.exemple'))}</div><p>${md(t)}</p></div>`:'';
const eff=(lbl,n)=>`<span class="eff"><span class="bars" aria-hidden="true">${[1,2,3].map(i=>`<i class="${i<=n?'f':''}"></i>`).join('')}</span>${esc(T('ecc.effort',{n:lbl}))}</span>`;
const plus=()=>D.plus&&D.plus.length?`<nav class="plus" aria-labelledby="plus-t"><h2 id="plus-t">${esc(T('ecc.plus'))}</h2><div class="pop-l">${D.plus.map(([l,u])=>`<a class="b" href="${href(u)}">${esc(l)}</a>`).join('')}</div></nav>`:'';
const lien=l=>l?` <a class="ln" href="${href(l[1])}">${esc(l[0])} →</a>`:'';

/* ---------- popup commune ----------
   ouvrir(liste, i, origine, rendu, nom) : rendu(élément, i, liste) rend {eb, titre, tags, corps} ;
   nom(élément) donne le libellé des boutons Précédent / Suivant. Échap ferme, le focus revient à l'origine. */
const dlg=document.createElement('dialog');dlg.className='pop';dlg.setAttribute('aria-labelledby','pop-t');
let P=null;
function popRender(){
  const it=P.liste[P.i],r=P.rendu(it,P.i,P.liste);
  dlg.innerHTML=`<div class="pop-h"><div class="eb">${esc(r.eb)}</div><h2 id="pop-t">${esc(r.titre)}</h2><div class="tags">${r.tags||''}</div><button type="button" class="pop-x" aria-label="${esc(T('ecc.fermer'))}">×</button></div>
  <div class="pop-b">${r.corps}</div>
  <div class="pop-f"><button type="button" class="b" data-pop="-1"${P.i===0?' disabled':''}>← ${esc(P.i>0?P.nom(P.liste[P.i-1]):T('ecc.precedent'))}</button><button type="button" class="b" data-pop="1"${P.i===P.liste.length-1?' disabled':''}>${esc(P.i<P.liste.length-1?P.nom(P.liste[P.i+1]):T('ecc.suivant'))} →</button><span class="cnt">${esc(T('ecc.surN',{i:P.i+1,n:P.liste.length}))}</span></div>`;
}
function ouvrir(liste,i,origine,rendu,nom){
  P={liste,i,origine,rendu,nom};popRender();
  if(!dlg.open)dlg.showModal();
  dlg.querySelector('.pop-x').focus();
}
dlg.addEventListener('click',e=>{
  if(e.target===dlg){dlg.close();return;}
  if(e.target.closest('.pop-x')){dlg.close();return;}
  const b=e.target.closest('[data-pop]');
  if(b&&!b.disabled){P.i=Math.max(0,Math.min(P.liste.length-1,P.i+ +b.dataset.pop));popRender();
    const n=dlg.querySelector(`[data-pop="${b.dataset.pop}"]`);(n&&!n.disabled?n:dlg.querySelector('.pop-x')).focus();}
});
// le focus revient à l'élément cliqué, sauf si le glossaire vient de le prendre
dlg.addEventListener('close',()=>{const gl=document.getElementById('gl');
  if(gl&&gl.contains(document.activeElement))return;
  if(P&&P.origine&&document.contains(P.origine))P.origine.focus();});

/* ---------- schéma 0 : ECC et S/4HANA en un coup d'œil ---------- */
function schema0(){
  const R=D.rangees,B=D.bandeau,tous=R.concat([B]);
  const mois=new Intl.DateTimeFormat(D.lang,{month:'short',year:'numeric'}).format(new Date());
  let h=`<div class="eb">${esc(D.eb)}</div><h1>${esc(D.titre)}</h1><p class="msg">${md(D.message)}</p>
  <div class="s0-head" aria-hidden="true"><div class="col"><b>${esc(D.colEcc[0])}</b><span>${esc(D.colEcc[1])}</span></div><div></div><div class="col s4"><b>${esc(D.colS4[0])}</b><span>${esc(D.colS4[1])}</span></div></div>
  <ol class="s0-rows">`;
  R.forEach((r,i)=>{h+=`<li><button type="button" class="s0-row" data-i="${i}" aria-label="${esc(T('ecc.s0.rangeeAria',{dim:r.dimension,ecc:r.ecc,s4:r.s4,qui:r.qui.join(', ')}))}">
    <span class="v ecc"><span class="lab">ECC :</span>${esc(r.ecc)}</span>
    <span class="dim"><span class="nm">${esc(r.dimension)}</span>${ARR}<span class="qui">${esc(T('ecc.quiVoit'))} : <b>${r.qui.map(esc).join(' · ')}</b></span></span>
    <span class="v s4"><span class="lab">S/4HANA :</span>${esc(r.s4)}</span><span class="ouv" aria-hidden="true">${esc(T('ecc.s0.detail'))} →</span></button></li>`;});
  h+=`</ol><section class="s0-band" aria-labelledby="band-t"><button type="button" class="bh" data-i="${R.length}"><h2 id="band-t">${esc(B.dimension)}</h2><span>${esc(B.sousTitre)} ${esc(T('ecc.quiVoit'))} : <b>${B.qui.map(esc).join(' · ')}</b>. ${esc(T('ecc.s0.cliquez'))}</span></button>
    <ol class="ech"><li class="now"><b>${esc(mois.charAt(0).toUpperCase()+mois.slice(1))}</b><span>${esc(T('ecc.aujourdhui'))}</span></li>${B.echeances.map(e=>`<li${e[2]?` class="${e[2]}"`:''}><b>${esc(e[0])}</b><span>${esc(e[1])}</span></li>`).join('')}</ol>
    <div class="chem"><span class="lbl">${esc(B.cheminsTitre)}</span>${B.chemins.map(c=>`<a class="b" href="${href(c[2])}">${esc(c[0])} <small>${esc(c[1])}</small></a>`).join('')}</div></section>
  ${plus()}<p class="dated">${esc(D.date)}</p>`;
  root.innerHTML=h;
  const rendu=(it,i)=>{const band=i===R.length;
    let tags=`<span class="tag"><i>${esc(T('ecc.quiVoit'))}</i>${it.qui.map(esc).join(' · ')}</span>`;
    if(!band)tags+=`<span class="tag"><i>ECC</i>${esc(it.ecc)}</span><span class="tag"><i>S/4HANA</i>${esc(it.s4)}</span>`;
    let corps=rub('ecc',T('ecc.enEcc'),md(it.enEcc))+rub('s4',T('ecc.enS4'),md(it.enS4))+rub('',T('ecc.concret'),md(it.concret));
    if(band)corps+=`<div class="pop-l">${B.chemins.map(c=>`<a class="b" href="${href(c[2])}">${esc(c[0])} · ${esc(c[1])}</a>`).join('')}</div>`;
    corps+=fil(it.exemple)+rub('dp',T('ecc.dp'),md(it.dp));
    return {eb:band?T('ecc.s0.bandeau'):T('ecc.s0.rangee',{i:i+1,n:R.length}),titre:band?B.titre:it.dimension,tags,corps};};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-i]');if(b)ouvrir(tous,+b.dataset.i,b,rendu,x=>x.dimension);});
}

/* ---------- schéma 2 : l'entrepôt ----------
   Règles d'estompage dans le JSON de chaque option : "ecarte" et "etudier", listes de {si, pourquoi}.
   si : conditions séparées par « & », de la forme q1=oui, q2!=oui, ou « * » (au moins une réponse). */
function schema2(){
  const Q=D.questions,O=D.options,REP=Q.map(()=>null);
  const vrai=si=>si.split('&').every(c=>{c=c.trim();if(c==='*')return REP.some(Boolean);
    const m=c.match(/^q(\d)(!?=)(oui|non)$/);if(!m)return false;const v=REP[+m[1]-1];return m[2]==='='?v===m[3]:v!==m[3];});
  const etat=o=>({off:(o.ecarte||[]).filter(r=>vrai(r.si)).map(r=>r.pourquoi),fit:(o.etudier||[]).filter(r=>vrai(r.si)).map(r=>r.pourquoi)});
  const statut=o=>{const e=etat(o),any=REP.some(Boolean);
    if(e.off.length)return ['off',T('ecc.s2.ecartee'),e.off[0]];
    if(e.fit.length)return ['fit',T('ecc.s2.etudier'),e.fit[0]];
    return any?['',T('ecc.s2.nonTranchee'),T('ecc.s2.nonTrancheeTexte')]:['',T('ecc.s2.repondez'),T('ecc.s2.repondezTexte')];};
  const pos=s=>{const [y,m,d]=s.split('-').map(Number);const a=D.ligne.de,n=D.ligne.a-a;return ((y-a)+(m-1)/12+(d-1)/365)/n*100;};
  const auj=new Date(),iso=auj.toISOString().slice(0,10),dateFr=new Intl.DateTimeFormat(D.lang,{day:'2-digit',month:'2-digit',year:'numeric'}).format(auj);
  root.innerHTML=`<div class="eb">${esc(D.eb)}</div><h1>${esc(D.titre)}</h1><p class="lead">${md(D.intro)}</p>
  <ul class="qs" id="qs"></ul>
  <div class="qbar"><button type="button" class="b" id="raz">${esc(T('ecc.s2.effacer'))}</button><span>${esc(D.avertissement)}</span></div>
  <ul class="opts" id="opts"></ul><p class="sr" id="annonce" aria-live="polite"></p>
  <section class="tl" aria-labelledby="tl-t"><h2 id="tl-t">${esc(T('ecc.s2.ligne',{de:D.ligne.de,a:D.ligne.a}))}</h2><div class="tlw" id="tlw" aria-hidden="true"></div><ol class="tll" id="tll"></ol></section>
  <p class="dated">${esc(D.date)}</p>${plus()}`;
  // ligne de temps : une frise sur grand écran, une liste sur téléphone
  let w='<div class="axe"></div>';
  for(let y=D.ligne.de;y<=D.ligne.a;y++)w+=`<span class="yr" style="left:${pos(y+'-01-01')}%">${y}</span>`;
  D.ligne.evenements.forEach(e=>{const p=pos(e.date);const old=e.ancien?' old':'';
    w+=`<span class="pt${old}" style="left:${p}%"></span>`+(e.haut?`<span class="lk" style="left:${p}%;top:82px;height:18px"></span>`:`<span class="lk" style="left:${p}%;top:124px;height:8px"></span>`);
    w+=`<div class="ev ${e.haut?'up':'dn'}${old}" style="left:${Math.min(Math.max(p,9),91)}%"><b>${esc(e.libelle)}</b>${esc(e.texte)}</div>`;});
  const pn=pos(iso);
  if(pn>=0&&pn<=100)w+=`<span class="now" style="left:${pn}%"></span><span class="nowl" style="left:${pn}%">${esc(T('ecc.aujourdhui'))}</span>`;
  document.getElementById('tlw').innerHTML=w;
  const liste=D.ligne.evenements.map(e=>({...e})).concat([{date:iso,libelle:dateFr,texte:T('ecc.aujourdhui'),now:1}]).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:0);
  document.getElementById('tll').innerHTML=liste.map(e=>`<li class="${e.now?'now':e.ancien?'old':''}"><b>${esc(e.libelle)}</b><span>${esc(e.texte)}</span></li>`).join('');
  function render(annoncer){
    document.getElementById('qs').innerHTML=Q.map((q,i)=>`<li><span class="q" id="q${i}"><b>${esc(q[0])}</b>${esc(q[1])}</span><span class="seg" role="group" aria-labelledby="q${i}"><button type="button" data-q="${i}" data-r="oui" aria-pressed="${REP[i]==='oui'}">${esc(T('ecc.s2.oui'))}</button><button type="button" data-q="${i}" data-r="non" aria-pressed="${REP[i]==='non'}">${esc(T('ecc.s2.non'))}</button></span></li>`).join('');
    document.getElementById('opts').innerHTML=O.map((o,i)=>{const [c,l,t]=statut(o);
      return `<li><button type="button" class="opt${o.k==='A'?' a':''}${c?' '+c:''}" data-o="${i}"><span class="ol">${esc(T('ecc.s2.option',{k:o.k}))}</span><b>${esc(o.t)}</b><span class="lim"><i>${esc(T('ecc.dateLimite'))}</i>${esc(o.lim)}</span>${eff(o.eff,o.n)}<span class="cas">${esc(o.cas)}</span><span class="st">${esc(l)}<span>${esc(t)}</span></span></button></li>`;}).join('');
    if(annoncer)document.getElementById('annonce').textContent=O.map(o=>T('ecc.s2.option',{k:o.k})+' : '+statut(o)[1]).join('. ')+'.';
  }
  const rendu=o=>{const e=etat(o);
    let tags=`<span class="tag"><i>${esc(T('ecc.dateLimite'))}</i>${esc(o.lim)}</span>${eff(o.eff,o.n)}`;
    if(e.off.length)tags+=`<span class="tag"><i>${esc(T('ecc.s2.vosReponses'))}</i>${esc(T('ecc.s2.ecartee'))}</span>`;
    return {eb:T('ecc.s2.optionSur',{k:o.k}),titre:o.t,tags,
      corps:`<div class="duo">${rub('ecc',T('ecc.enEcc'),md(o.ecc))}${rub('s4',T('ecc.enS4'),md(o.s4))}</div>`+rub('',T('ecc.qui'),md(o.qui))+rub('dp',T('ecc.dp'),md(o.dp))};};
  root.addEventListener('click',e=>{
    const q=e.target.closest('[data-q]');
    if(q){const i=+q.dataset.q;REP[i]=REP[i]===q.dataset.r?null:q.dataset.r;render(true);root.querySelector(`[data-q="${i}"][data-r="${q.dataset.r}"]`).focus();return;}
    if(e.target.closest('#raz')){REP.fill(null);render(true);return;}
    const o=e.target.closest('[data-o]');if(o)ouvrir(O,+o.dataset.o,o,rendu,x=>T('ecc.s2.option',{k:x.k}));
  });
  render(false);
}

/* ---------- schéma 3 : disparaît, remplacé, devient obligatoire ---------- */
function schema3(){
  const C=D.cartes,S={dom:null,pre:false,vis:C};
  root.innerHTML=`<div class="eb">${esc(D.eb)}</div><h1>${esc(D.titre)}</h1><p class="lead">${md(D.intro)}</p>
  <div class="flt"><span class="lbl" id="dom-l">${esc(T('ecc.s3.domaine'))}</span>
    <span class="chips" id="dom" role="group" aria-labelledby="dom-l">${[['',T('ecc.s3.tous')]].concat(D.domaines.map(d=>[d,d])).map(([k,l])=>`<button type="button" class="chipb" data-d="${esc(k)}" aria-pressed="${k===''}">${esc(l)}</button>`).join('')}</span>
    <label class="chk"><input type="checkbox" id="pre"> ${esc(T('ecc.s3.prealables'))}</label>
    <span class="nb3" id="nb" aria-live="polite"></span></div>
  <div class="cols" id="cols"></div>
  <p class="pied3">${md(D.pied)}</p>${plus()}`;
  function render(){
    S.vis=C.filter(c=>(!S.dom||c.dom.includes(S.dom)||c.dom.includes('*'))&&(!S.pre||c.pre));
    document.getElementById('nb').textContent=T(S.vis.length>1?'ecc.s3.compte':'ecc.s3.compteUn',{n:S.vis.length,total:C.length});
    document.getElementById('cols').innerHTML=D.colonnes.map(([k,l])=>{const cs=S.vis.filter(c=>c.c===k);
      return `<section class="col3 ${k}" aria-labelledby="col-${k}"><div class="colh"><h2 id="col-${k}">${esc(l)}</h2><span>${cs.length}</span></div>${cs.length?`<ul>${cs.map(c=>`<li><button type="button" class="c3" data-c="${c.n}"><b>${esc(c.t)}</b><span class="tags"><span class="tag">${esc(c.lbl)}</span>${eff(c.eff,c.e)}${c.pre?`<span class="prea">${esc(T('ecc.prealable'))}</span>`:''}</span></button></li>`).join('')}</ul>`:`<p class="vide">${esc(T('ecc.s3.vide'))}</p>`}</section>`;}).join('');
  }
  const rendu=c=>{const col=D.colonnes.find(x=>x[0]===c.c)[1];
    return {eb:T('ecc.s3.carte',{col,n:c.n}),titre:c.t,
      tags:`<span class="tag">${esc(c.lbl)}</span>${eff(c.eff,c.e)}${c.pre?`<span class="prea">${esc(T('ecc.prealable'))}</span>`:''}`,
      corps:`<div class="duo">${rub('ecc',T('ecc.enEcc'),md(c.ecc))}${rub('s4',T('ecc.enS4'),md(c.s4))}</div>`+rub('',T('ecc.qui'),md(c.qui))+rub('dp',T('ecc.dp'),md(c.dp)+lien(c.lien))};};
  root.addEventListener('click',e=>{
    const d=e.target.closest('[data-d]');
    if(d){S.dom=d.dataset.d||null;root.querySelectorAll('#dom button').forEach(x=>x.setAttribute('aria-pressed',x===d));render();return;}
    const c=e.target.closest('[data-c]');if(c){const i=S.vis.findIndex(x=>x.n===+c.dataset.c);ouvrir(S.vis,i,c,rendu,x=>x.t);}
  });
  root.addEventListener('change',e=>{if(e.target.id==='pre'){S.pre=e.target.checked;render();}});
  render();
}

(window.SAP_LIBELLES||Promise.resolve(k=>k)).then(t=>{
  T=t;document.body.appendChild(dlg);
  ({0:schema0,2:schema2,3:schema3})[root.dataset.schema]();
});
})();
