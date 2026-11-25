'use strict';
// Each album owns its own frame index. Re-rendering preserves its position.
const slidePositions=new Map();
const slideReduced=matchMedia('(prefers-reduced-motion: reduce)');
function albumSlideshow(a,large=false){
 const key=a.id+(large?':detail':':cover'), n=a.photos.length;
 const frame=document.createElement('div');frame.className='album-slideshow'+(large?' album-slideshow-large':'');
 let index=(slidePositions.get(key)||0)%n; let paused=false, busy=false;
 const layers=[0,1].map(()=>{const im=document.createElement('img');im.alt=t('Ảnh kỷ niệm');im.decoding='async';im.loading='lazy';frame.append(im);return im});
 let active=0;layers[0].dataset.src=a.photos[index];layers[0].classList.add('shown');layers[1].alt='';layers[1].setAttribute('aria-hidden','true');
 const indicator=document.createElement('span');indicator.className='slide-indicator';frame.append(indicator);indicator.textContent=`${index+1} / ${n}`;
 const advance=async()=>{if(!frame.dataset.ready||!frame.dataset.visible||n<2||busy||paused||!frame.isConnected||document.hidden||slideReduced.matches||document.body.classList.contains('motion-off')||frame.closest('button')?.matches(':focus-visible')||(!large&&document.getElementById('modal').open))return;
 const r=frame.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
 busy=true;const next=(index+1)%n, incoming=layers[1-active], outgoing=layers[active];incoming.loading='eager';try{incoming.src=await StoryStore.url(a.photos[next]);await incoming.decode()}catch{busy=false;return}if(!frame.isConnected||!frame.dataset.visible||document.hidden||document.body.classList.contains('motion-off')){busy=false;return}incoming.classList.add('shown');outgoing.classList.remove('shown');incoming.alt=t('Ảnh kỷ niệm');incoming.removeAttribute('aria-hidden');outgoing.alt='';outgoing.setAttribute('aria-hidden','true');active=1-active;index=next;slidePositions.set(key,index);indicator.textContent=`${index+1} / ${n}`;busy=false;};
 frame.advanceSlide=advance;
 if(large&&n>1){const b=document.createElement('button');b.type='button';b.className='slide-pause';b.textContent='Ⅱ';b.setAttribute('aria-label',t('Tạm dừng slideshow'));b.onclick=()=>{paused=!paused;b.textContent=paused?'▷':'Ⅱ';b.setAttribute('aria-label',t(paused?'Phát slideshow':'Tạm dừng slideshow'))};frame.append(b)}
 return frame;
}
setInterval(()=>document.querySelectorAll('.album-slideshow').forEach(x=>x.advanceSlide?.()),4500);
