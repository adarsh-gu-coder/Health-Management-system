const landingPage = document.getElementById("landingPage");
const passwordPage = document.getElementById("passwordPage");
const surprisePage = document.getElementById("surprisePage");
const continueButton = document.getElementById("continueButton");
const passwordInput = document.getElementById("passwordInput");
const unlockButton = document.getElementById("unlockButton");
const passwordMessage = document.getElementById("passwordMessage");
const lockIcon = document.getElementById("lockIcon");
const floatingLayer = document.getElementById("floatingLayer");
const soundToggle = document.getElementById("soundToggle");
const bgMusic = document.getElementById("bgMusic");
const quoteText = document.getElementById("quoteText");
const loveCounter = document.getElementById("loveCounter");

const secretPassword = "adarsh2910";
const quotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "You are the chapter I never want to end.",
  "In every lifetime, I would still choose you.",
  "My heart found its home in you.",
  "Being with you makes ordinary moments unforgettable."
];

function showPage(page) {
  [landingPage, passwordPage, surprisePage].forEach((item) => item.classList.remove("active"));
  page.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  revealVisibleItems();
}

function tryMusic() {
  if (!bgMusic.querySelector("source").getAttribute("src")) return;
  bgMusic.volume = 0.35;
  bgMusic.play().then(() => {
    soundToggle.textContent = "♪ Playing";
  }).catch(() => {
    soundToggle.textContent = "♪ Muted";
  });
}

continueButton.addEventListener("click", () => {
  showPage(passwordPage);
  tryMusic();
  setTimeout(() => passwordInput.focus(), 600);
});

function unlockSurprise() {
  if (passwordInput.value.trim() !== secretPassword) {
    passwordMessage.textContent = "Nice try... but this heart belongs only to Manali ❤";
    passwordPage.querySelector(".lock-card").classList.remove("shake");
    void passwordPage.offsetWidth;
    passwordPage.querySelector(".lock-card").classList.add("shake");
    return;
  }

  passwordMessage.textContent = "Unlocked with love...";
  lockIcon.textContent = "❤";
  burstHearts();
  setTimeout(() => {
    showPage(surprisePage);
    startCounter();
  }, 1100);
}

unlockButton.addEventListener("click", unlockSurprise);
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") unlockSurprise();
});

soundToggle.addEventListener("click", () => {
  if (!bgMusic.querySelector("source").getAttribute("src")) {
    soundToggle.textContent = "Add song file";
    setTimeout(() => {
      soundToggle.textContent = "♪ Muted";
    }, 1400);
    return;
  }

  bgMusic.muted = !bgMusic.muted;
  if (!bgMusic.muted) tryMusic();
  soundToggle.textContent = bgMusic.muted ? "♪ Muted" : "♪ Playing";
});

function createFloatingItem(content, size, duration) {
  const item = document.createElement("span");
  item.className = "float-item";
  item.textContent = content;
  item.style.left = `${Math.random() * 100}%`;
  item.style.fontSize = `${size}px`;
  item.style.animationDuration = `${duration}s`;
  item.style.color = content === "❤" ? "rgba(217, 79, 134, 0.55)" : "rgba(201, 151, 90, 0.55)";
  floatingLayer.appendChild(item);
  setTimeout(() => item.remove(), duration * 1000);
}

setInterval(() => {
  createFloatingItem(Math.random() > 0.32 ? "❤" : "✦", 14 + Math.random() * 22, 7 + Math.random() * 6);
}, 480);

function burstHearts() {
  for (let index = 0; index < 32; index += 1) {
    setTimeout(() => {
      createFloatingItem("❤", 18 + Math.random() * 24, 2.5 + Math.random() * 2);
    }, index * 20);
  }
}

window.addEventListener("pointermove", (event) => {
  if (Math.random() > 0.55) return;
  const sparkle = document.createElement("span");
  sparkle.className = "trail";
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 850);
});

document.querySelectorAll(".reason-card").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
});

let quoteIndex = 0;
setInterval(() => {
  quoteText.classList.add("switching");
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.textContent = quotes[quoteIndex];
    quoteText.classList.remove("switching");
  }, 360);
}, 4200);

function startCounter() {
  const start = new Date("2024-10-29T00:00:00");
  const now = new Date();
  const days = Math.max(1, Math.floor((now - start) / 86400000));
  let current = 0;
  const step = Math.max(1, Math.ceil(days / 90));

  const timer = setInterval(() => {
    current += step;
    if (current >= days) {
      current = days;
      clearInterval(timer);
    }
    loveCounter.textContent = current.toLocaleString();
  }, 24);
}

function revealVisibleItems() {
  document.querySelectorAll(".reveal").forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) item.classList.add("visible");
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
window.addEventListener("load", revealVisibleItems);
window.addEventListener("scroll", revealVisibleItems, { passive: true });