// Floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHeart, 500);

// Dragging frames
const frames = document.querySelectorAll(".photo-quote");

frames.forEach(frameWrap => {
  const frame = frameWrap.querySelector(".frame");
  
  let isDragging = false;
  let offsetX, offsetY;

  frame.addEventListener("mousedown", startDrag);
  frame.addEventListener("touchstart", startDrag);

  function startDrag(e) {
    isDragging = true;
    const rect = frameWrap.getBoundingClientRect();
    offsetX = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    offsetY = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", stopDrag);
  }

  function drag(e) {
    if (!isDragging) return;
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - offsetX;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - offsetY;
    frameWrap.style.left = x + "px";
    frameWrap.style.top = y + "px";
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", drag);
    document.removeEventListener("touchend", stopDrag);
  }
});      this.speed = 1 + Math.random()*2;
      this.opacity = 0.5 + Math.random()*0.5;
    }
    draw(){
      ctx.fillStyle = `rgba(255,0,100,${this.opacity})`;
      ctx.beginPath();
      ctx.moveTo(this.x,this.y);
      ctx.bezierCurveTo(this.x,this.y-this.size,this.x+this.size,this.y-this.size,this.x+this.size,this.y);
      ctx.bezierCurveTo(this.x+this.size,this.y+this.size,this.x,this.y+this.size,this.x,this.y);
      ctx.fill();
    }
    update(){
      this.y -= this.speed;
      if(this.y<-20){ this.y=canvas.height+20; this.x=Math.random()*canvas.width; }
      this.draw();
    }
  }

  for(let i=0;i<80;i++) hearts.push(new Heart());
  function animate(){ ctx.clearRect(0,0,canvas.width,canvas.height); hearts.forEach(h=>h.update()); requestAnimationFrame(animate); }
  animate();
});    step();
  }

});
