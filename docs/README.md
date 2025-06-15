# 博客情况

<template>
  <div>
    <span id="articles-count">{{ stats.articles -1 || 0 }}</span>篇文章、
    <span id="notes-count">{{ stats.notes - 1 || 0 }}</span>篇笔记、
    <span id="projects-count">{{ stats.projects -1 || 0 }}</span>个项目。
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: {}
    };
  },
  mounted() {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.stats = data.stats || {};
      })
      .catch(error => {
        console.error('Error fetching data.json:', error);
      });
  }
};
</script>
