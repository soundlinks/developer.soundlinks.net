module.exports = {
    title: 'Soundlinks Developers',
    description: 'Just playing around',
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
                text: '联系方式',
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
            '/encoding/',
        ],
        lastUpdated: 'Last Updated',
    }
}
