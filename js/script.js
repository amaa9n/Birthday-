const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const quotesSection = document.getElementById("quotes");
const photosSection = document.getElementById("photos");
const finalSection = document.getElementById("final");
const typedQuote = document.getElementById("typedQuote");
const bgMusic1 = document.getElementById("bgMusic1");
const bgMusic2 = document.getElementById("bgMusic2");

const quotes = [
  "You make my world brighter just by being in it ❤️",
  "Every moment with you is my favorite memory 💖",
  "Your smile is the reason my heart beats faster 💕",
  "With you, every day feels like a celebration 🎉",
  "You are the poem my heart never stops writing ✨",
  "Loving you is the best thing I ever did 💞",
  "Your happiness is my greatest wish 🌹",
  "In your eyes, I see my forever 💍",
  "You are my today and all of my tomorrows 🌸",
  "Happy Birthday Mariyam, my love, my life ❤️"
];

// Floating icons
function createFloatingIcons() {
  const icons = ["🎁","❤️","💝","💖","💓","💘"];
  for (let i = 0; i < 20; i++) {
    const icon = document.createElement("div");
    icon.className = "icon";
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.animationDuration = 5 + Math.random() * 5 + "s";
    document.getElementById("floating-icons").appendChild(icon);
  }
}
createFloatingIcons();

// Typewriter effect
function typeWriter(text, callback) {
  let i = 0;
  typedQuote.textContent = "";
  const speed = 70; // slower speed
  function typing() {
    if (i < text.length) {
      typedQuote.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      setTimeout(callback, 1200);
    }
  }
  typing();
}

// Card stack setup
function setupCards() {
  const cardStack = document.getElementById("cardStack");
  for (let i = quotes.length - 1; i >= 0; i--) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="assets/photos/photo${i+1}.jpg" alt="photo${i+1}">`;
    cardStack.appendChild(card);
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    let startX, currentX, moveX;
    card.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });
    card.addEventListener("touchmove", e => {
      currentX = e.touches[0].clientX;
      moveX = currentX - startX;
      card.style.transform = `translateX(${moveX}px) rotate(${moveX/10}deg)`;
    });
    card.addEventListener("touchend", () => {
      if (Math.abs(moveX) > 80) {
        card.style.transform = `translateX(${moveX*2}px) rotate(${moveX/10}deg)`;
        card.style.opacity = 0;
        setTimeout(() => card.remove(), 300);
      } else {
        card.style.transform = `translateX(0) rotate(0)`;
      }
    });
  });
}

// Flow
startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  quotesSection.classList.remove("hidden");
  bgMusic1.play();

  let q = 0;
  function nextQuote() {
    if (q < quotes.length) {
      typeWriter(quotes[q], nextQuote);
      q++;
    } else {
      quotesSection.classList.add("hidden");
      photosSection.classList.remove("hidden");
      bgMusic1.pause();
      bgMusic2.play();
      setupCards();
      setTimeout(() => {
        photosSection.classList.add("hidden");
        finalSection.classList.remove("hidden");
      }, 40000); // after 40s show final message
    }
  }
  nextQuote();
});
