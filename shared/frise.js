/* Gabarit commun des frises : dessine la chronologie et ouvre les popups.
   La page déclare son contenu : <script src="../shared/frise.js" data-frise="greenfield.json">.
   Les textes communs viennent de shared/libelles/<langue>.json, sous « frise ». */
(function(){
const me=document.currentScript;
const url=new URL(me.dataset.frise,location.href);
const charger=fetch(url).then(r=>{if(!r.ok)throw new Error(r.status);return r.json();});
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

Promise.all([window.SAP_LIBELLES,charger]).then(([T,F])=>{
  // en-tête de page
  document.title=F.titreOnglet;
  $('f-surtitre').textContent=F.surtitre;
  $('f-titre').textContent=F.titre;
  $('f-intro').textContent=F.intro;
  $('f-exemple').append(' '+F.exemple.description); // même nœud texte qu'avant : pas de décalage des lettres
  $('tl').setAttribute('aria-label',F.chronologieAria);
  $('f-continu').textContent=F.enContinu;
  $('f-causes-titre').textContent=F.causesTitre;
  $('f-causes').insertAdjacentHTML('beforeend',F.causes.map(c=>`<span>${esc(c)}</span>`).join(''));
  $('f-note').textContent=F.note;
  if(F.nomGate)$('f-legende-gate').textContent=F.nomGate;
  if(F.couleurParade!==undefined)document.documentElement.style.setProperty('--parade',`var(--c${F.couleurParade})`);
  dessiner(T,F);
}).catch(e=>{
  console.warn('Frise introuvable ('+url+').',e);
  const T=window.SAP_T||(k=>k);
  $('f-titre').textContent=T('frise.erreur');
});

function dessiner(T,F){
const PH=F.phases,S=F.etapes,ORDER=F.ordre,IC=F.icones,TL=F.positions,GT=F.gates,PSPAN=F.etenduePhases,ML=F.chronologie.mois;
// couleurs : indice de la palette (--c0 à --c5) pour chaque phase ; par défaut, la phase n prend la couleur n
const C=F.couleurs||PH.map((_,i)=>i);
const pcol=p=>`--col:var(--c${C[p]});--tint:var(--t${C[p]})`;
const nomGate=F.nomGate||T('frise.legendeGate');
const SEQ=[].concat(...PH.map((_,p)=>ORDER[p]||[]));
const W=F.chronologie.largeur,X0=24,X1=F.chronologie.x1,MW=(X1-X0)/(ML.length-1),RH=40,TOP=92;
const xm=m=>X0+m*MW;
const svg=$('tl');const NS="http://www.w3.org/2000/svg";
const rows=Object.keys(TL);const H=TOP+rows.length*RH+20;
svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
const el=(t,a,p=svg)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p.appendChild(e);return e;};
// colonnes et en-têtes de phase
PSPAN.forEach(([a,b],p)=>{
  el('rect',{x:xm(a),y:TOP-8,width:xm(b)-xm(a),height:H-TOP,style:`fill:var(--t${C[p]})`,opacity:.55});
  el('rect',{x:xm(a)+1,y:6,width:xm(b)-xm(a)-2,height:28,rx:6,style:`fill:var(--c${C[p]})`});
  const t=el('text',{x:(xm(a)+xm(b))/2,y:25,'text-anchor':'middle',class:'ph'});t.textContent=PH[p].name;
});
// axe des mois
ML.forEach((l,i)=>{const x=xm(i);el('line',{x1:x,y1:44,x2:x,y2:H-6,class:'grid'});const t=el('text',{x:x+4,y:58,class:'mo'});t.textContent=l;});
// ligne du go-live
const G=F.chronologie.golive;
const gl=el('g',{class:'hot',tabindex:0,role:'button','aria-label':T('frise.goliveAria'),'data-k':G.etape});
el('line',{x1:xm(G.mois),y1:62,x2:xm(G.mois),y2:H-6,class:'golive'},gl);
el('path',{d:`M${xm(G.mois)} 64h40l-8 7 8 7h-40z`,class:'flag'},gl);
// quality gates
for(const k in GT){const [m,lab]=GT[k];const x=xm(m);
  const g=el('g',{class:'hot',tabindex:0,role:'button','aria-label':S[k].t,'data-k':k});
  el('line',{x1:x,y1:80,x2:x,y2:H-6,class:'gline'},g);
  el('path',{d:`M${x} 64l11 11-11 11-11-11z`,class:'gate-d'},g);
  const t=el('text',{x:x,y:79,'text-anchor':'middle',class:'gl-t'},g);t.textContent=lab;}
// barres des étapes
rows.forEach((k,i)=>{const [a,b,lab]=TL[k];const d=S[k];const p=d.p;const y=TOP+i*RH+RH/2;
  const g=el('g',{class:'hot bar',tabindex:0,role:'button','aria-label':d.t,'data-k':k,style:pcol(p)});
  const tt=el('title',{},g);tt.textContent=d.t+(d.s?' : '+d.s:'');
  const xa=xm(a),xb=Math.max(xm(b),xa);
  if(xb-xa>4) el('rect',{x:xa,y:y-13,width:xb-xa,height:26,rx:13,class:'b'},g);
  el('circle',{cx:xa,cy:y,r:16,class:'ic-bg'},g);
  el('path',{d:IC[k],transform:`translate(${xa-9} ${y-9}) scale(.75)`,class:'ic'},g);
  const est=lab.length*7.3;let tx,anchor='start';
  if(xb-xa-26>est+8){tx=xa+24;}else if(xb+10+est<W-4){tx=Math.max(xb,xa+16)+10;}else{tx=xa-22;anchor='end';}
  const t=el('text',{x:tx,y:y+4.5,'text-anchor':anchor,class:'bl'},g);t.textContent=lab;
});

// popups
const ov=$('ov'),dlg=$('dlg'),body=$('dlg-body'),X=$('x');
let last=null;
const list=a=>'<ul>'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
function open(k,src){
  const d=S[k];if(!d)return;last=src;
  dlg.style.cssText=pcol(d.p);
  const ph=PH[d.p].name;
  const eb=k==='transverse'?T('frise.transverse'):(d.gate&&!d.n?T('frise.surtitreGate',{gate:nomGate,phase:ph}):T('frise.surtitreEtape',{n:d.n,phase:ph}));
  body.innerHTML=`<div class="dlg-h"><div class="eyebrow">${esc(eb)}</div><h2 id="dlg-title">${esc(d.t)}</h2><p>${esc(d.obj)}</p><span class="owner">${esc(T('frise.quiPorte',{qui:d.own}))}</span></div>
  <div class="grid"><section><h3>${esc(T('frise.activites'))}</h3>${list(d.act)}</section><section><h3>${esc(T('frise.prerequis'))}</h3>${list(d.pre)}</section><section><h3>${esc(T('frise.livrables'))}</h3>${list(d.liv)}</section></div>
  ${d.ai?`<div class="ai"><h3>${esc(T('frise.apportIA'))} <span class="gain">${esc(T('frise.gain',{gain:d.aig}))}</span></h3>${list(d.ai)}</div>`:''}
  <div class="risks"><h3>${esc(T('frise.risques'))}</h3>${d.r.map(r=>`<div class="risk"><div><span class="risk-l">${esc(T('frise.risque'))}</span>${esc(r[0])}</div><div><span class="risk-l">${esc(T('frise.parade'))}</span>${esc(r[1])}</div></div>`).join('')}</div>
  ${d.ex?`<div class="ex"><h3>${esc(T('frise.dansExemple',{entreprise:F.exemple.entreprise}))}</h3><p>${esc(d.ex)}</p></div>`:''}`;
  const i=SEQ.indexOf(k);
  if(i>=0){body.insertAdjacentHTML('beforeend',`<div class="nav"><button type="button" class="nb" ${i===0?'disabled':''} data-go="${SEQ[i-1]||''}">${esc(T('frise.precedent'))}</button><span>${i+1} / ${SEQ.length}</span><button type="button" class="nb" ${i===SEQ.length-1?'disabled':''} data-go="${SEQ[i+1]||''}">${esc(T('frise.suivant'))}</button></div>`);}
  ov.hidden=false;dlg.scrollTop=0;X.focus();
}
function close(){ov.hidden=true;if(last)last.focus();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b&&b.id==='start')return;if(b&&!ov.contains(b))open(b.dataset.k,b);});
X.addEventListener('click',close);
svg.addEventListener('keydown',e=>{const g=e.target.closest('[data-k]');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();open(g.dataset.k,g);}});
body.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g&&g.dataset.go)open(g.dataset.go,last);});
$('start').addEventListener('click',e=>open(SEQ[0],e.currentTarget));
ov.addEventListener('click',e=>{if(e.target===ov)close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ov.hidden)close();});
}
})();
