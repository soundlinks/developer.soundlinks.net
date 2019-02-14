module.exports = {
    title: 'Soundlinks Developers',
    description: 'SDK & API docs for developers to enlarge the power of Soundlinks',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
    ],
    locales: {
        '/': {
            lang: 'en-US',
        },
        '/zh/': {
            lang: 'zh-CN',
        },
    },
    themeConfig: {
        displayAllHeaders: true,
        search: false,
        repo: 'soundlinks/developer.soundlinks.net',
        docsDir: 'docs',
        editLinks: true,
        locales: {
            '/': {
                nav: [
                    {
                        text: 'Start here',
                        link: '/introduction/',
                    },
                    {
                        text: 'Contact',
                        items: [
                            {
                                text: 'Email',
                                link: 'mailto:dev@soundlinks.net',
                            },
                            {
                                text: 'GitHub',
                                link: 'https://github.com/soundlinks/developer.soundlinks.net/issues/new',
                            },
                            {
                                text: 'Telegram',
                                link: 'https://t.me/Soundchains_Community',
                            },
                        ],
                    },
                ],
                sidebar: [
                    '/introduction/',
                    '/ios/',
                    '/android/',
                    '/token/',
                    '/api/',
                ],
                selectText: 'Language',
                label: 'English',
                lastUpdated: 'Last updated at',
                editLinkText: 'Help us edit this page',
            },
            '/zh/': {
                nav: [
                    {
                        text: '开始使用',
                        link: '/zh/introduction/',
                    },
                    {
                        text: '联系我们',
                        items: [
                            {
                                text: 'Email',
                                link: 'mailto:dev@soundlinks.net',
                            },
                            {
                                text: 'GitHub',
                                link: 'https://github.com/soundlinks/developer.soundlinks.net/issues/new',
                            },
                            {
                                text: 'Telegram',
                                link: 'https://t.me/Soundchains_Community',
                            },
                        ],
                    },
                ],
                sidebar: [
                    '/zh/introduction/',
                    '/zh/ios/',
                    '/zh/android/',
                    '/zh/token/',
                    '/zh/api/',
                ],
                selectText: '语言',
                label: '简体中文',
                lastUpdated: '最后更新于',
                editLinkText: '帮助修改本页',
            },
        },
    },
};
