const QUOTES = [
  "You are the reason my world is so beautiful.",
  "Every moment with you feels like magic.",
  "You make ordinary things feel extraordinary.",
  "With you, forever isn't long enough.",
  "Your smile is my favorite sunrise."
];
const QUOTES_FONT = ['quote1','quote2','quote3','quote4','quote5'];
const FINAL_NAME = 'Mariyam';
const FINAL_DATE = '18 September';
const NUM_PHOTOS = 8;

let iconInterval;
document.addEventListener('DOMContentLoaded', ()=>{
  const floating = document.getElementById('floating-icons');
  const quotesSection = document.getElementById('quotes-section');
  const typedWrap = document.getElementById('typed-wrap');
  const carouselSection = document.getElementById('carousel-section');
  const carouselContainer = document.getElementById('carousel-container');
  const carouselQuote = document.getElementById('carousel-quote');

  iconInterval = setInterval(()=>createIcon(floating), 600);
  for(let i=0;i<6;i++) createIcon(floating);

  async function startQuotesFlow(){
    clearInterval(iconInterval); floating.innerHTML='';
    quotesSection.classList.remove('hidden');

    const m1 = document.getElementById('music1');
    try{ await m1.play(); m1.volume=0.7; }catch(e){}

    for(let i=0;i<QUOTES.length;i++){
      await typeWriter(QUOTES[i], typedWrap, QUOTES_FONT[i%QUOTES_FONT.length]);
      typedWrap.innerHTML += '<br><br>';
      await wait(1200);
    }
    await wait(900);
    showCarousel();
  }

  function typeWriter(text, container, fontClass){
    return new Promise(resolve=>{
      container.innerHTML = `<span class='${fontClass}'></span>`;
      const span = container.querySelector('span');
      let i=0;
      function step(){
        if(i<text.length){ span.innerHTML += text[i]; i++; setTimeout(step,90); }
        else resolve();
      }
      step();
    });
  }

  function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

  function createIcon(parent){
    const d=document.createElement('div'); d.className='icon';
    d.innerText = Math.random()>0.5?'🎁':'❤️';
    d.style.left = `${Math.random()*88+2}vw`; d.style.fontSize=`${26+Math.random()*30}px`;
    d.addEventListener('click', e=>{ e.stopPropagation(); parent.querySelectorAll('.icon').forEach(ic=>ic.remove()); startQuotesFlow(); });
    parent.appendChild(d);
    setTimeout(()=>{ if(d.parentNode)d.remove(); }, 6000);
  }

  let currentIndex=0; let frames=[];

  function showCarousel(){
    quotesSection.classList.add('hidden'); carouselSection.classList.remove('hidden');
    const m1=document.getElementById('music1'), m2=document.getElementById('music2');
    try{ m1.pause(); m1.currentTime=0; m2.play(); m2.volume=0.7; }catch(e){}

    carouselContainer.innerHTML='';
    for(let i=1;i<=NUM_PHOTOS;i++){
      const frame=document.createElement('div'); frame.className='carousel-frame';
      frame.innerHTML=`<img src='assets/photos/photo${i}.jpg'>`; carouselContainer.appendChild(frame);
    }
    frames = Array.from(carouselContainer.children);
    updateCarousel();

    let startY=0;
    carouselContainer.addEventListener('touchstart', e=>startY=e.touches[0].clientY);
    carouselContainer.addEventListener('touchend', e=>{
      let endY=e.changedTouches[0].clientY;
      if(endY-startY>30) currentIndex--; else if(startY-endY>30) currentIndex++;
      currentIndex=(currentIndex+frames.length)%frames.length; updateCarousel();
    });
  }

  function updateCarousel(){
    frames.forEach((f,i)=>{
      const offset=i-currentIndex;
      f.style.transform=`translateX(${offset*240}px) translateZ(${-Math.abs(offset)*180}px) scale(${offset===0?1:0.85}) rotateY(${offset*15}deg)`;
      f.classList.add('show');
      f.style.zIndex=100-Math.abs(offset);
    });
    typeQuote(QUOTES[currentIndex%QUOTES.length], carouselQuote);
  }

  function typeQuote(text, container){
    container.innerHTML=''; let i=0;
    function step(){ if(i<text.length){ container.innerHTML+=text[i]; i++; setTimeout(step,90);} }
    step();
  }
});    typeQuote(QUOTES[currentIndex % QUOTES.length]);
  }

  function typeQuote(text){
    carouselQuote.innerHTML='';
    let i=0;
    function step(){ if(i<text.length){ carouselQuote.innerHTML+=text[i]; i++; setTimeout(step,50);} }
    step();
  }

});
