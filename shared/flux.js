/* Principaux flux logistiques : affichage commun des huit pages (quatre flux, FR et EN).
   Chaque page porte son contenu dans <script type="application/json" id="flux-data"> et un squelette :
   #ctl (boutons), #dg (dessin), #hint, #det (détail de l'étape), #bd (ce que voit la comptabilité).
   Couleur du flux : "k" (1 bleu, 2 vert, 3 brun, 4 violet), traduite en jetons de theme.css.
   Vue « ECC → S/4HANA » (US-051) : si des étapes ont un champ s4 {impact, de, precision, ecc, s4, qui, dp, lien},
   une bascule « Le flux » / « ECC → S/4HANA » s'ajoute au-dessus du dessin ; ?vue=s4 l'ouvre sur cette vue.
   Ses textes viennent des libellés (ecc.bascule), chargés après ce script. */
(function(){
const me=document.currentScript,BASE=new URL('..',me.src);
const D=JSON.parse(document.getElementById('flux-data').textContent);
const U=D.ui,$=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=n=>new Intl.NumberFormat(D.lang).format(n);
const COULEURS={1:'--c1',2:'--c5',3:'--c3',4:'--k-act'};
document.querySelector('main').style.setProperty('--k',`var(${COULEURS[D.k]||'--c1'})`);
$('hint').textContent=U.hint;
$('prev').textContent='← '+U.prev;$('next').textContent=U.next+' →';
let s=0,timer=null;const N=D.steps.length;
// vue ECC → S/4HANA
const S4=D.steps.some(st=>st.s4);let vueS4=false,T=null;
const NIV={faible:1,moyen:2,fort:3};
const niv=k=>T('ecc.bascule.'+k);
const impLbl=x=>x.de?T('ecc.bascule.plage',{de:niv(x.de),a:niv(x.impact).toLowerCase()}):niv(x.impact);
const jauge=n=>`<span class="bars" aria-hidden="true">${[1,2,3].map(i=>`<i class="${i<=n?'f':''}"></i>`).join('')}</span>`;
const ipHtml=(x,prec)=>`<span class="ip ${x.impact}${x.de?' plage':''}">${jauge(NIV[x.impact])}${esc(T('ecc.bascule.impact',{n:impLbl(x)}))}${prec&&x.precision?' · '+esc(x.precision):''}</span>`;
const md=t=>esc(t).replace(/\*\*(.+?)\*\*/g,(m,x)=>`<button type="button" class="gl-mot" data-gl-terme="${x}">${x}</button>`);
// géométrie du dessin : une bande par équipe, une colonne par étape
const LW=132,CW=158,LH=92,NW=136,NH=64,PT=6,L=D.lanes.length;
const W=LW+N*CW+8,H=PT*2+L*LH;
function wrap(t,max){const w=t.split(' ');const lines=[];let cur='';for(const x of w){if((cur+' '+x).trim().length>max&&cur){lines.push(cur);cur=x}else cur=(cur+' '+x).trim()}if(cur)lines.push(cur);return lines}
const nx=i=>LW+i*CW+(CW-NW)/2,ny=l=>PT+l*LH+(LH-NH)/2;
function dessin(){
  let h=`<svg viewBox="0 0 ${W} ${H}" width="${W}" style="width:100%;min-width:${Math.min(W,760)}px" role="group" aria-label="${esc(D.title)}"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round"/></marker></defs>`;
  D.lanes.forEach((ln,l)=>{h+=`<rect class="band${l%2?' alt':''}" x="0" y="${PT+l*LH}" width="${W}" height="${LH}" rx="6"/><text class="ln" x="10" y="${PT+l*LH+LH/2-3}">${esc(ln[0])}</text><text class="lm" x="10" y="${PT+l*LH+LH/2+13}">${esc(ln[1])}</text>`});
  for(let i=0;i<N-1;i++){const a=D.steps[i],b=D.steps[i+1];const x1=nx(i)+NW,y1=ny(a.lane)+NH/2,x2=nx(i+1),y2=ny(b.lane)+NH/2,xm=(x1+x2)/2;
    h+=`<path class="ar" data-a="${i}" d="M${x1} ${y1} H${xm} V${y2} H${x2-1}" marker-end="url(#ah)"/>`}
  D.steps.forEach((st,i)=>{const x=nx(i),y=ny(st.lane);const lines=wrap(st.t,20).slice(0,3);const v=vueS4&&st.s4;const lh=14,top=y+NH/2-(lines.length*lh)/2+10-(v?5:0);
    h+=`<g class="nd" data-i="${i}" tabindex="0" role="button" aria-label="${esc(U.step)} ${i+1} : ${esc(st.t)}${v?' · '+esc(T('ecc.bascule.impactAria',{n:impLbl(st.s4)})):''}"><rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="10"/>`+lines.map((t,j)=>`<text class="nt" x="${x+NW/2}" y="${top+j*lh}">${esc(t)}</text>`).join('')+`<g class="nb"><circle cx="${x+4}" cy="${y+4}" r="11"/><text x="${x+4}" y="${y+8}">${i+1}</text></g>`;
    // pastille d'impact : un mot et une jauge, jamais la couleur seule
    if(v){const t=impLbl(st.s4),w=Math.round(t.length*6.5)+34,px=x+NW/2-w/2,py=y+NH-9;
      h+=`<g class="ipg ${st.s4.impact}${st.s4.de?' plage':''}" aria-hidden="true"><rect x="${px}" y="${py}" width="${w}" height="18" rx="9"/>${[0,1,2].map(k=>`<rect class="bar${k<NIV[st.s4.impact]?' f':''}" x="${px+8+k*5}" y="${py+5}" width="3" height="8" rx="1"/>`).join('')}<text x="${px+26+(w-34)/2}" y="${py+13}">${esc(t)}</text></g>`;}
    h+='</g>'});
  $('dg').innerHTML=h+'</svg>';
  const lg=$('leg');
  if(lg){lg.hidden=!vueS4;if(vueS4){const c={faible:0,moyen:0,fort:0};D.steps.forEach(st=>st.s4&&c[st.s4.impact]++);
    lg.innerHTML=`<span>${esc(T('ecc.bascule.legende'))}</span>`+['fort','moyen','faible'].filter(k=>c[k]).map(k=>`<span class="ip ${k}">${jauge(NIV[k])}${esc(niv(k))} · ${esc(T(c[k]>1?'ecc.bascule.etapes':'ecc.bascule.etape',{n:c[k]}))}</span>`).join('')+`<span>${esc(T('ecc.bascule.pointilles'))}</span>`;}}
}
function cum(k,upto){const b=D.board.find(x=>x.k===k);let v=b.base;for(let i=0;i<=upto;i++)v+=(D.steps[i].delta[k]||0);return v}
function render(){
  const st=D.steps[s];
  document.querySelectorAll('.nd').forEach(n=>{const i=+n.dataset.i;n.classList.toggle('on',i===s);n.classList.toggle('done',i<s);n.setAttribute('aria-pressed',i===s)});
  document.querySelectorAll('.ar').forEach(a=>a.classList.toggle('done',+a.dataset.a<s));
  $('cnt').textContent=U.step+' '+(s+1)+' '+U.of+' '+N;
  $('prev').disabled=s===0;$('next').disabled=s===N-1;
  $('play').textContent=timer?U.pause:U.play;
  let h=`<h2>${s+1}. ${esc(st.t)}</h2><div class="meta"><span class="chip"><i>${esc(U.who)}</i>${esc(st.who)}</span><span class="chip"><i>${esc(U.mod)}</i>${esc(st.mod)}</span><span class="chip"><i>${esc(U.doc)}</i>${esc(st.doc)}</span></div><p class="what">${esc(st.what)}</p><div class="grid">`;
  h+=`<div class="box"><h3>${esc(U.sap)}</h3><ul>${st.sap.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
  h+=`<div class="box"><h3>${esc(U.ex)}</h3><p>${esc(st.ex)}</p></div>`;
  if(st.acct)h+=`<div class="box w2"><h3>${esc(U.entry)}</h3><div class="entry"><div class="side"><b>${esc(U.debit)}</b>${esc(st.acct.d)}</div><div class="amt">${fmt(st.acct.a)} ${esc(U.unit)} →</div><div class="side"><b>${esc(U.credit)}</b>${esc(st.acct.c)}</div></div><p class="small">${esc(U.entryNote)}</p></div>`;
  else h+=`<div class="box w2"><h3>${esc(U.entry)}</h3><p>${esc(st.noAcct||'')}</p></div>`;
  if(vueS4&&st.s4){const x=st.s4,l=x.lien?`<p class="lien"><a href="${new URL(x.lien[1],BASE).href}">${esc(x.lien[0])} →</a></p>`:'';
    h+=`<div class="box w2 s4b"><div class="s4h"><h3>${esc(T('ecc.bascule.titre'))}</h3>${ipHtml(x,true)}</div><div class="avap"><div class="e"><b>${esc(T('ecc.enEcc'))}</b><p>${md(x.ecc)}</p></div><div class="fl" aria-hidden="true">→</div><div class="s"><b>${esc(T('ecc.enS4'))}</b><p>${md(x.s4)}</p></div></div><div class="qd"><div><h4>${esc(T('ecc.qui'))}</h4><p>${md(x.qui)}</p></div><div class="dp"><h4>${esc(T('ecc.dp'))}</h4><p>${md(x.dp)}</p>${l}</div></div></div>`;}
  h+=`<div class="box watch"><h3>${esc(U.watch)}</h3><p>${esc(st.watch)}</p></div>`;
  h+=`<div class="box"><h3>${esc(U.terms)}</h3><div class="terms">${st.terms.map((t,j)=>`<button type="button" class="tm" data-j="${j}" aria-expanded="false">${esc(t[0])}</button>`).join('')}</div><p class="def" id="def" hidden></p></div></div>`;
  $('det').innerHTML=h;
  const hasBase=D.board.some(b=>b.base);
  let b=`<h2>${esc(U.board)}</h2><p class="bn">${esc(hasBase?U.bnoteBase:U.bnote)}</p><div class="bg">`;
  D.board.forEach(bd=>{const v=cum(bd.k,s);let mx=1;for(let i=-1;i<N;i++){const x=i<0?bd.base:cum(bd.k,i);mx=Math.max(mx,Math.abs(x))}
    const d=st.delta[bd.k]||0;
    b+=`<div class="bc${d?' ch':''}"><div class="bl">${esc(bd.l)}</div><div class="bv${v<0?' neg':''}">${fmt(v)} ${esc(U.unit)}</div><div class="bt"><span class="${v<0?'neg':''}" style="width:${Math.round(Math.abs(v)/mx*100)}%"></span></div><div class="dl">${d?(d>0?'+':'−')+fmt(Math.abs(d))+' '+esc(U.unit)+' · '+esc(U.changed):''}</div></div>`});
  $('bd').innerHTML=b+'</div>';
}
function go(i){s=Math.max(0,Math.min(N-1,i));render()}
function stop(){if(timer){clearInterval(timer);timer=null}}
$('dg').addEventListener('click',e=>{const n=e.target.closest('.nd');if(!n)return;stop();go(+n.dataset.i)});
$('dg').addEventListener('keydown',e=>{const n=e.target.closest&&e.target.closest('.nd');if(n&&(e.key==='Enter'||e.key===' ')){e.preventDefault();stop();go(+n.dataset.i)}});
$('prev').onclick=()=>{stop();go(s-1)};$('next').onclick=()=>{stop();go(s+1)};
$('play').onclick=()=>{if(timer){stop();render();return}if(s>=N-1)s=0;timer=setInterval(()=>{if(s>=N-1){stop();render();return}go(s+1)},3200);render()};
$('det').addEventListener('click',e=>{const t=e.target.closest('.tm');if(!t)return;const open=t.getAttribute('aria-expanded')==='true';document.querySelectorAll('.tm').forEach(x=>x.setAttribute('aria-expanded','false'));const d=$('def');if(open){d.hidden=true}else{t.setAttribute('aria-expanded','true');const term=D.steps[s].terms[+t.dataset.j];d.innerHTML='<b>'+esc(term[0])+'</b> : '+esc(term[1]);d.hidden=false}});
// flèches gauche / droite : étape précédente / suivante, sauf dans un champ (recherche du glossaire)
document.addEventListener('keydown',e=>{const c=e.target.closest&&e.target.closest('button,input,textarea,select,[contenteditable]');if(c)return;
  if(e.key==='ArrowRight'){e.preventDefault();stop();go(s+1)}else if(e.key==='ArrowLeft'){e.preventDefault();stop();go(s-1)}});
dessin();render();
// la bascule n'apparaît que si le flux a des données s4 ; elle attend les libellés (chargés après ce script)
function bascule(){
  const v=$('vue');
  v.innerHTML=`<span class="lbl" id="vue-l">${esc(T('ecc.bascule.vue'))}</span><span class="seg" role="group" aria-labelledby="vue-l"><button type="button" data-vue="0" aria-pressed="${!vueS4}">${esc(T('ecc.bascule.flux'))}</button><button type="button" data-vue="1" aria-pressed="${vueS4}">${esc(T('ecc.bascule.s4'))}</button></span><span class="aide">${esc(T(vueS4?'ecc.bascule.aideS4':'ecc.bascule.aideFlux'))}</span>`;
}
if(S4)document.addEventListener('DOMContentLoaded',()=>(window.SAP_LIBELLES||Promise.resolve(k=>k)).then(t=>{
  T=t;
  const v=document.createElement('div');v.className='vue';v.id='vue';
  const card=document.querySelector('main .card');card.parentNode.insertBefore(v,card);
  const lg=document.createElement('div');lg.className='leg';lg.id='leg';lg.hidden=true;$('hint').after(lg);
  vueS4=new URLSearchParams(location.search).get('vue')==='s4';
  v.addEventListener('click',e=>{const b=e.target.closest('[data-vue]');if(!b)return;vueS4=b.dataset.vue==='1';bascule();dessin();render();v.querySelector(`[data-vue="${b.dataset.vue}"]`).focus();});
  bascule();dessin();render();
}));
})();
