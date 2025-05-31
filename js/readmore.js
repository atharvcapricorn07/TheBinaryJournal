document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('article-grid');
  const readMoreBtn = document.getElementById('read-more-btn');
  if (!container || !readMoreBtn) return;

  const articles = Array.from(container.querySelectorAll('article.featured'));
  if (articles.length <= 5) {
    readMoreBtn.style.display = 'none';
    return;
  }

  const hiddenWrapper = document.createElement('div');
  hiddenWrapper.id = 'hidden-older-articles';
  hiddenWrapper.style.display = 'none';
  container.appendChild(hiddenWrapper);

  function updateArticleVisibility() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      for (let i = 5; i < articles.length; i++) {
        if (!hiddenWrapper.contains(articles[i])) {
          hiddenWrapper.appendChild(articles[i]);
        }
      }
      hiddenWrapper.style.display = 'none';
      readMoreBtn.style.display = 'block';
      readMoreBtn.textContent = 'Read More';
    } else {
      for (let i = 5; i < articles.length; i++) {
        if (hiddenWrapper.contains(articles[i])) {
          container.insertBefore(articles[i], hiddenWrapper);
        }
      }
      readMoreBtn.style.display = 'none';
      hiddenWrapper.style.display = 'none';
    }
  }

  updateArticleVisibility();
  window.addEventListener('resize', updateArticleVisibility);

  readMoreBtn.addEventListener('click', () => {
    const isHidden = hiddenWrapper.style.display === 'none';
    hiddenWrapper.style.display = isHidden ? 'block' : 'none';
    readMoreBtn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
});
