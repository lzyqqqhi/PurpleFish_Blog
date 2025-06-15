# 笔记总目录

<template>
  <div>
    <ul id="notes-list"></ul>
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
        const notesList = data.notesList || [];
        const listElement = document.getElementById('notes-list');
        notesList.forEach(note => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = note.path;
          a.textContent = note.name;
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
