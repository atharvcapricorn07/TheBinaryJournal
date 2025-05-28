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

  // Fade-in animation
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
});
