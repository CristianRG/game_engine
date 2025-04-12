import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '@cristianrg/game_engine',
    description: 'A game engine built with TypeScript',
    lang: 'en-US',
    lastUpdated: true,
    base: '/game_engine/',
    themeConfig: {
        nav: [
            { text: 'GitHub', link: 'https://github.com/CristianRG/game_engine' },
            { text: 'Guide', link: '/guide/quick-start' },
            // { text: 'API', link: '/api'},
            // { text: 'Examples', link: '/examples'},
        ],
        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Quick Start', link: '/guide/quick-start' }, 
                ],
            },
            {
                text: 'Installation',
                items: [
                    { text: 'CDN', link: '/installation/cdn' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'Component', link: '/api/component' },
                    { text: 'Entity', link: '/api/entity' },
                    { text: 'GameObject', link: '/api/gameobject' },
                    { text: 'System', link: '/api/system' },
                    // { text: 'Entities & GameObjects', link: '/api/entities-and-gameobjects' },
                    // { text: 'System', link: '/api/system' },
                    // { text: 'GlobalState', link: '/api/globalstate' },
                ],
            },
            // {
            //     text: 'Examples',
            //     items: [
            //         { text: 'Basic Example', link: '/examples/basic-example' },
            //         { text: 'Advanced Example', link: '/examples/advanced-example' },
            //     ],
            // },
        ]
    },
})