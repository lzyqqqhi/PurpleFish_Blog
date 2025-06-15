# 文章总目录

<template>
  <div>
    <ul id="articles-list"></ul>
  </div>
</template>

<script>
export default {
  mounted() {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        const articlesList = data.articlesList || [];
        const listElement = document.getElementById('articles-list');
        articlesList.forEach(article => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = article.path;
          a.textContent = article.name;
          li.appendChild(a);
          listElement.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error fetching data.json:', error);
      });
  }
}
</script>