module.exports = {
    title: 'Soundlinks Developers',
    description: 'SDK & API docs for developers to enlarge the power of Soundlinks.',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
    ],
    themeConfig: {
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
                        text: 'GitHub',
                        link: 'https://github.com/soundlinks/developer.soundlinks.net/issues/new',
                    },
                    {
                        text: 'Telegram',
                        link: 'https://t.me/Soundchains_Community',
                    },
                ],
            },
            {
                text: 'Soundlinks',
                link: 'https://soundlinks.net',
            },
        ],
        search: false,
        sidebar: [
            '/introduction/',
            '/ios/',
            '/android/',
            '/result/',
            '/encoding/',
        ],
        displayAllHeaders: true,
        lastUpdated: 'Last Updated',
    }
}
