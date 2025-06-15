# 项目总目录

<template>
  <div>
    <ul id="projects-list"></ul>
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
        const projectsList = data.projectsList || [];
        const listElement = document.getElementById('projects-list');
        projectsList.forEach(project => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = project.path;
          a.textContent = project.name;
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