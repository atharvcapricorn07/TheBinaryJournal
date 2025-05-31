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

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function moveArticlesToWrapper() {
    for (let i = 5; i < articles.length; i++) {
      hiddenWrapper.appendChild(articles[i]);
    }
  }

  function moveArticlesBack() {
    for (let i = 5; i < articles.length; i++) {
      container.insertBefore(articles[i], hiddenWrapper);
    }
  }

  function setupInitialLayout() {
    if (isMobile()) {
      moveArticlesToWrapper();
      hiddenWrapper.style.display = 'none';
      readMoreBtn.style.display = 'block';
    } else {
      moveArticlesBack();
      readMoreBtn.style.display = 'none';
    }
  }

  readMoreBtn.addEventListener('click', () => {
    hiddenWrapper.style.display = 'block';
    readMoreBtn.remove(); // remove the button permanently
  });

  setupInitialLayout();

  // Only handle full switch between mobile/desktop
  let lastIsMobile = isMobile();
  window.addEventListener('resize', () => {
    const currentIsMobile = isMobile();
    if (currentIsMobile !== lastIsMobile) {
      lastIsMobile = currentIsMobile;
      setupInitialLayout();
    }
  });
});
