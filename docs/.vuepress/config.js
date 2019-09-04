module.exports = {
    title: 'Soundlinks Developers',
    description: 'SDK & API docs for developers to enlarge the power of Soundlinks',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },
    themeConfig: {
        displayAllHeaders: true,
        search: false,
        // repo: 'soundlinks/developer.soundlinks.net',
        docsDir: 'docs',
        editLinks: true,
        locales: {
            '/': {
                nav: [
                    {
                        text: '开始使用',
                        link: '/introduction/',
                    },
                    {
                        text: '联系我们',
                        items: [
                            {
                                text: 'Email',
                                link: 'mailto:dev@soundlinks.net',
                            },
                            {
                                text: 'Issues',
                                link: 'https://github.com/soundlinks/developer.soundlinks.net/issues/new',
                            },
                        ],
                    },
                ],
                sidebar: [
                    '/introduction/',
                    '/ios/',
                    '/api/',
                ],
                selectText: '语言',
                label: '简体中文',
                lastUpdated: '最后更新于',
                editLinkText: '帮助修改本页',
            },
        },
    },
};
