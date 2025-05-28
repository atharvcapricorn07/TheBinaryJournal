document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const toggleButton = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply theme class first
  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Then set label based on actual class
  toggleButton.textContent = document.body.classList.contains("dark-mode")
    ? "Toggle Light Mode"
    : "Toggle Dark Mode";

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleButton.textContent = isDark ? "Toggle Light Mode" : "Toggle Dark Mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Fade-in animation for articles
  const cards = document.querySelectorAll(".article-grid .featured.initial");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
      card.classList.remove("initial");
    }, 100 * index);
  });

  // Read More button logic
  const allCards = document.querySelectorAll(".article-grid .featured");
  const readMoreBtn = document.getElementById("read-more-btn");

  if (window.innerWidth <= 480 && allCards.length > 5) {
    allCards.forEach((card, index) => {
      if (index >= 5) {
        card.style.display = "none";
      }
    });
    readMoreBtn.style.display = "block";

    readMoreBtn.addEventListener("click", () => {
      allCards.forEach((card) => {
        card.style.display = "flex";
      });
      readMoreBtn.style.display = "none";
    });
  }

  // --- Easter Egg Logic ---

  const eggBtn = document.getElementById("egg-easter-egg");
  const gooeyOverlay = document.getElementById("gooey-overlay");
  const secretPrompt = document.getElementById("secret-code-prompt");
  const secretInput = document.getElementById("secret-code-input");
  const secretSubmit = document.getElementById("secret-code-submit");
  const secretError = document.getElementById("secret-code-error");

  // Hide secret prompt and gooey overlay initially
  gooeyOverlay.style.display = "none";
  secretPrompt.style.display = "none";

  eggBtn.addEventListener("click", () => {
    // Prevent multiple clicks
    eggBtn.disabled = true;

    // Show gooey overlay and animate flow
    gooeyOverlay.style.display = "block";
    gooeyOverlay.classList.add("gooey-flow");

    // After animation ends (about 4 seconds), show secret input
    setTimeout(() => {
      // Stop gooey animation
      gooeyOverlay.classList.remove("gooey-flow");

      // Show secret code prompt
      secretPrompt.style.display = "flex";
      secretInput.focus();
    }, 4000);
  });

  secretSubmit.addEventListener("click", checkSecretCode);
  secretInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkSecretCode();
    }
  });

  function checkSecretCode() {
    const code = secretInput.value.trim().toLowerCase();
    if (code === "skibidi") {
      // Correct code: fade out everything and open game
      secretError.style.display = "none";
      secretPrompt.style.pointerEvents = "none";

      // Fade out overlay and prompt smoothly
      gooeyOverlay.style.transition = "opacity 1.5s ease";
      secretPrompt.style.transition = "opacity 1.5s ease";

      gooeyOverlay.style.opacity = 0;
      secretPrompt.style.opacity = 0;

      setTimeout(() => {
        // Option 1: Redirect to flappy bird game page
        window.location.href = "games/flappy_bird.html";

        // Option 2: If you want to embed the game, add it here instead
      }, 1600);
    } else {
      // Wrong code
      secretError.style.display = "block";
      secretInput.value = "";
      secretInput.focus();
    }
  }
});
