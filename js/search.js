document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const articles = document.querySelectorAll('.article-grid article');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    articles.forEach(article => {
      // Get all the text inside the article element
      const textContent = article.innerText.toLowerCase();

      if (textContent.includes(query)) {
        article.style.display = '';
      } else {
        article.style.display = 'none';
      }
    });
  });
});
