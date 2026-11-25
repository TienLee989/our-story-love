(() => {
  'use strict';
  const byId = id => document.getElementById(id);
  const defaults = {motion:true, particles:true, type:'mixed', interval:120};
  let settings = {...defaults};
  try { settings = {...defaults, ...JSON.parse(localStorage.getItem('our-story-effects-v1') || '{}')}; } catch {}
  if (![60,120,300,600].includes(Number(settings.interval))) settings.interval=120;
  if (!['mixed','petals','hearts'].includes(settings.type)) settings.type='mixed';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = byId('loveParticles'), dialog = byId('effectsDialog');
  let timer = null, cleanup = null, observer = null, nextBurst = 0;
  const allowed = () => settings.motion && settings.particles && !reduced.matches;
  function clearParticles(){clearTimeout(cleanup);layer.replaceChildren();}
  function burst(){
    if (!allowed() || document.hidden) return;
    clearParticles();
    const count = innerWidth < 700 ? 8 : 14;
    for(let i=0;i<count;i++){
      const p=document.createElement('span');
      const heart=settings.type==='hearts'||(settings.type==='mixed'&&i%4===0);
      p.className='love-particle '+(heart?'fall-heart':'fall-petal');
      if(heart)p.textContent='♥';
      p.style.setProperty('--x', (4+Math.random()*92)+'vw');
      p.style.setProperty('--drift', (Math.random()*120-60)+'px');
      p.style.setProperty('--spin', (Math.random()*260-130)+'deg');
      p.style.setProperty('--duration', (5+Math.random()*2)+'s');
      p.style.setProperty('--delay', (Math.random()*2)+'s');
      p.style.setProperty('--size', (9+Math.random()*8)+'px');
      layer.append(p);
    }
    cleanup=setTimeout(clearParticles,9500);
  }
  let activeUntil=0;
  function schedule(reset=true){
    clearTimeout(timer);timer=null;
    if(!allowed()||document.hidden)return;
    if(reset)activeUntil=Date.now()+180000;
    const now=Date.now();
    if(now<activeUntil){burst();timer=setTimeout(()=>schedule(false),Math.min(10000,activeUntil-now));}
    else {clearParticles();timer=setTimeout(()=>schedule(true),Number(settings.interval)*1000);}
  }
  function reveal(){ document.dispatchEvent(new Event('storymotionchange')); }
  function apply(){
    document.body.classList.toggle('motion-off',!settings.motion||reduced.matches);
    byId('motionEnabled').checked=!!settings.motion;
    byId('particlesEnabled').checked=!!settings.particles;
    byId('particleType').value=settings.type;
    byId('particleInterval').value=String(settings.interval);
    byId('previewEffects').disabled=!allowed();
    byId('effectNote').textContent=reduced.matches?t('Đang ưu tiên chế độ giảm chuyển động của thiết bị.'):allowed()?effectDescription(settings.interval/60):t('Hiệu ứng rơi đang tắt.');
    clearParticles();schedule();reveal();
  }
  function update(){
    settings={motion:byId('motionEnabled').checked,particles:byId('particlesEnabled').checked,type:byId('particleType').value,interval:Number(byId('particleInterval').value)};
    apply();
    try{localStorage.setItem('our-story-effects-v1',JSON.stringify(settings));}catch{byId('effectNote').textContent+=' '+t('Không thể lưu cài đặt trên thiết bị này.');}
  }
  ['motionEnabled','particlesEnabled','particleType','particleInterval'].forEach(id=>byId(id).addEventListener('change',update));
  byId('effectsSettings').addEventListener('click',()=>dialog.showModal());
  byId('effectsClose').addEventListener('click',()=>dialog.close());
  byId('previewEffects').addEventListener('click',()=>{dialog.close();schedule();});
  document.addEventListener('visibilitychange',()=>{clearParticles();schedule();});
  reduced.addEventListener('change',apply);
  document.addEventListener('languagechange',()=>{byId('effectNote').textContent=reduced.matches?t('Đang ưu tiên chế độ giảm chuyển động của thiết bị.'):allowed()?effectDescription(settings.interval/60):t('Hiệu ứng rơi đang tắt.');});
  apply();
})();
