module.exports = {
    title: 'Soundlinks Developers',
    description: 'Just playing around',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
    ],
    themeConfig: {
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
        ],
        lastUpdated: 'Last Updated',
    }
}
