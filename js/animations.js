document.addEventListener("DOMContentLoaded", () => {
  const readMoreBtn = document.getElementById("read-more");
  const articles = Array.from(document.querySelectorAll(".article-grid .featured"));
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Limit initial articles to 5 on mobile
  if (isMobile && articles.length > 5) {
    articles.forEach((article, index) => {
      if (index >= 5) {
        article.style.display = "none";
      }
    });

    readMoreBtn.style.display = "block";

    readMoreBtn.addEventListener("click", () => {
      articles.forEach(article => {
        article.style.display = "block";
      });
      readMoreBtn.style.display = "none";
    });
  } else {
    // If not mobile, show all and hide button
    readMoreBtn.style.display = "none";
  }

  // Intersection Observer for fade-in animation
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
  });

  // Theme toggle logic
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Optional: toggle overlay fade
    const overlay = document.getElementById("dark-overlay");
    if (body.classList.contains("dark-mode")) {
      overlay.classList.add("visible");
    } else {
      overlay.classList.remove("visible");
    }
  });
});
