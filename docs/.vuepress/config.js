const path = require('path');
module.exports = {
    base:'/docs/.vuepress/dist',
    title: 'PurpleFish’s Blog',
    description: '这是一个基于 VuePress 的博客',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '笔记', link: '/notes/' },
            { text: '文章', link: '/articles/' },
            { text: '项目集', link: '/projects/' }
        ]
    },
    plugins: [
        [
            'stat',
            {
                paths: [
                    { dir: path.resolve(__dirname, '../articles'), name: '文章' },
                    { dir: path.resolve(__dirname, '../notes'), name: '笔记' },
                    { dir: path.resolve(__dirname, '../projects'), name: '项目' }
                ]
            }
        ]
    ]
}