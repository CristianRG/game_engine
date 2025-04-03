import { defineConfig } from 'vitepress'

export default defineConfig({
    title: '@cristianrg/game_engine',
    description: 'A game engine built with TypeScript',
    lang: 'en-US',
    lastUpdated: true,
    base: '/game_engine/',
    themeConfig: {
        nav: [
            { text: 'Guide', link: '/guide'},
            { text: 'API', link: '/api'},
            { text: 'Examples', link: '/examples'},
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Introduction', link: '/guide/introduction' },
                    { text: 'Getting Started', link: '/guide/getting-started' },
                    { text: 'Basic Concepts', link: '/guide/basic-concepts' },
                    { text: 'Advanced Concepts', link: '/guide/advanced-concepts' },
                ],
            },
            {
                text: 'API',
                items: [
                    { text: 'Engine', link: '/api/engine' },
                    { text: 'Scene', link: '/api/scene' },
                    { text: 'Entity', link: '/api/entity' },
                ],
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Basic Example', link: '/examples/basic-example' },
                    { text: 'Advanced Example', link: '/examples/advanced-example' },
                ],
            },
        ]
    },
})