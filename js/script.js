// Romantic Surprise script
const QUOTES = [
  "You are the reason my world is so beautiful.",
  "Every moment with you feels like magic.",
  "You make ordinary things feel extraordinary.",
  "With you, forever isn't long enough.",
  "Your smile is my favorite sunrise."
];

// Special messages for final card (kept in JS so easy to edit)
const FINAL_NAME = 'Mariyam';
const FINAL_DATE = '18 September';
const NUM_PHOTOS = 8; // change according to how many photos you upload (photo1..photo8)

let iconInterval;
document.addEventListener('DOMContentLoaded', ()=>{
  const floating = document.getElementById('floating-icons');
  const quotesSection = document.getElementById('quotes-section');
  const typedText = document.getElementById('typed-text');
  const photosSection = document.getElementById('photos-section');
  const photoWall = document.getElementById('photo-wall');
  const birthdayMessage = document.getElementById('birthday-message');

  // Update final card name/date
  document.querySelector('#birthday-message .card h1').textContent = `${FINAL_NAME} — ${FINAL_DATE}`;

  // create floating icons continuously
  iconInterval = setInterval(()=>createIcon(floating), 600);

  // create few initial icons immediately for nice effect
  for(let i=0;i<6;i++) createIcon(floating);

  async function startQuotesFlow(){
    // stop creating icons
    clearInterval(iconInterval);
    // remove all icons
    floating.innerHTML = '';

    // show quotes box
    quotesSection.classList.remove('hidden');

    // play music1 (user interaction already happened by clicking icon, so browsers permit play)
    const m1 = document.getElementById('music1');
    try{ await m1.play(); }catch(e){ console.warn('autoplay blocked', e); }

    // type all quotes sequentially
    for(const q of QUOTES){
      await typeWriter(q, typedText);
      // add a little gap line after each quote
      typedText.innerHTML += '<br><br>';
      await wait(700);
    }

    // after quotes finish
    await wait(900);
    showPhotos();
  }

  // typewriter returns a promise that resolves when quote is fully typed
  function typeWriter(text, container){
    return new Promise(resolve=>{
      let i=0; container.innerHTML = container.innerHTML; // keep previous content
      function step(){
        if(i < text.length){
          // escape HTML-sensitive characters
          const ch = text[i].replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
          container.innerHTML += ch;
          i++; setTimeout(step, 45 + Math.random()*35);
        } else resolve();
      }
      step();
    });
  }

  // small helper
  function wait(ms){ return new Promise(r=>setTimeout(r, ms)); }

  // Create one floating icon at random horizontal position
  function createIcon(parent){
    const d = document.createElement('div');
    d.className = 'icon';
    d.innerText = Math.random()>0.5? '🎁' : '❤️';
    const left = Math.random()*88 + 2; // keep inside viewport
    d.style.left = `${left}vw`;
    const dur = 4000 + Math.random()*4200; // ms
    d.style.animationDuration = `${dur}ms`;
    d.style.fontSize = `${22 + Math.random()*30}px`;

    // when user clicks any icon -> start the flow
    d.addEventListener('click', function handler(e){
      e.stopPropagation();
      // remove click handlers from icons to avoid double triggers
      parent.querySelectorAll('.icon').forEach(ic=>ic.removeEventListener('click', handler));
      startQuotesFlow();
    });

    parent.appendChild(d);

    // cleanup after animation end
    setTimeout(()=>{ if(d.parentNode) d.remove(); }, dur + 400);
  }

  // Show photos with frame animation and start music2
  async function showPhotos(){
    document.getElementById('quotes-section').classList.add('hidden');
    const m1 = document.getElementById('music1');
    const m2 = document.getElementById('music2');
    try{ m1.pause(); m1.currentTime = 0; }catch(e){}
    try{ await m2.play(); }catch(e){ console.warn('play blocked', e); }

    // populate photos
    photoWall.innerHTML = '';
    for(let i=1;i<=NUM_PHOTOS;i++){
      const frame = document.createElement('div');
      frame.className = 'photo-frame';
      frame.innerHTML = `<div class="tape"></div><img src="assets/photos/photo${i}.jpg" alt="memory ${i}">`;
      photoWall.appendChild(frame);
    }

    photosSection.classList.remove('hidden');

    // animate frames in, staggered
    const frames = Array.from(photoWall.children);
    frames.forEach((f, idx)=>{
      setTimeout(()=> f.classList.add('show'), 180*idx);
    });

    // after a bit, reveal birthday message
    setTimeout(()=>{
      document.getElementById('birthday-message').classList.remove('hidden');
      // scroll to final message smoothly
      setTimeout(()=> window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'}), 600);
    }, 180 * Math.min(NUM_PHOTOS, 6) + 800);
  }

});

// If user wants to change quotes, final name/date or number of photos - edit QUOTES, FINAL_NAME, FINAL_DATE, NUM_PHOTOS at top of the file.
