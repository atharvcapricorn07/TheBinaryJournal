document.addEventListener("DOMContentLoaded", () => {
  const articles = document.querySelectorAll(".article-grid .featured");
  const readMoreBtn = document.getElementById("read-more");

  // Always show all articles for debugging
  articles.forEach(article => {
    article.style.display = "block";
  });

  // Hide the "Read More" button since all articles are shown
  if (readMoreBtn) {
    readMoreBtn.style.display = "none";
  }

  // Fade-in animation
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-visible");
          entry.target.classList.remove("initial");
        }
      });
    },
    { threshold: 0.1 }
  );

  articles.forEach(article => {
    observer.observe(article);
  });

  // Theme toggle logic
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const overlay = document.getElementById("dark-overlay");

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    overlay.classList.toggle("visible");

    // Optionally store theme preference
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    overlay.classList.add("visible");
  }
});
