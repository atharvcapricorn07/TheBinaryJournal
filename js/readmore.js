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

  let isMobile = window.innerWidth <= 768;
  let readMoreExpanded = false;

  function moveArticlesToWrapper() {
    for (let i = 5; i < articles.length; i++) {
      if (!hiddenWrapper.contains(articles[i])) {
        hiddenWrapper.appendChild(articles[i]);
      }
    }
  }

  function moveArticlesBack() {
    for (let i = 5; i < articles.length; i++) {
      if (hiddenWrapper.contains(articles[i])) {
        container.insertBefore(articles[i], hiddenWrapper);
      }
    }
  }

  function updateLayout() {
    const currentlyMobile = window.innerWidth <= 768;

    // If layout type didn't change, don't do anything
    if (currentlyMobile === isMobile) return;

    isMobile = currentlyMobile;

    if (isMobile) {
      moveArticlesToWrapper();
      hiddenWrapper.style.display = readMoreExpanded ? 'block' : 'none';
      readMoreBtn.style.display = 'block';
      readMoreBtn.textContent = readMoreExpanded ? 'Read Less' : 'Read More';
    } else {
      moveArticlesBack();
      hiddenWrapper.style.display = 'none';
      readMoreBtn.style.display = 'none';
      readMoreExpanded = false;
    }
  }

  function initialize() {
    if (isMobile) {
      moveArticlesToWrapper();
      hiddenWrapper.style.display = 'none';
      readMoreBtn.style.display = 'block';
      readMoreBtn.textContent = 'Read More';
    } else {
      readMoreBtn.style.display = 'none';
    }
  }

  readMoreBtn.addEventListener('click', () => {
    readMoreExpanded = !readMoreExpanded;
    hiddenWrapper.style.display = readMoreExpanded ? 'block' : 'none';
    readMoreBtn.textContent = readMoreExpanded ? 'Read Less' : 'Read More';
  });

  initialize();
  window.addEventListener('resize', updateLayout);
});
