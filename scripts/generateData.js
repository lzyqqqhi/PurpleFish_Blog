const fs = require('fs');
const path = require('path');

// 统计指定目录下的 Markdown 文件数量
const countMarkdownFiles = (dir) => {
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile() && file.endsWith('.md')) {
      count++;
    } else if (stats.isDirectory()) {
      count += countMarkdownFiles(filePath);
    }
  }
  return count;
};

// 生成笔记列表
const generateNotesList = () => {
  const notesDir = path.resolve(__dirname, '../docs/notes');
  const files = fs.readdirSync(notesDir);
  return files
    .filter(file => file !== 'README.md' && file.endsWith('.md'))
    .map(file => ({
      name: file.replace('.md', ''),
      path: `/notes/${file.replace('.md', '/')}`
    }));
};

// 获取统计信息和笔记列表
const articlesCount = countMarkdownFiles(path.resolve(__dirname, '../docs/articles'));
const notesCount = countMarkdownFiles(path.resolve(__dirname, '../docs/notes'));
const projectsCount = countMarkdownFiles(path.resolve(__dirname, '../docs/projects'));
const notesList = generateNotesList();

// 写入数据到 JSON 文件
const data = {
  stats: {
    articles: articlesCount,
    notes: notesCount,
    projects: projectsCount
  },
  notesList: notesList
};

const publicDir = path.resolve(__dirname, '../docs/.vuepress/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(
  path.resolve(publicDir, 'data.json'),
  JSON.stringify(data, null, 2)
);