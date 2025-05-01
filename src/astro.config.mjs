// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeExternalLinks from 'rehype-external-links';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://kjl.dev/',
    integrations: [preact(), mdx()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeGithubAlerts,
            [
                rehypeExternalLinks,
                {
                    target: '_blank',
                },
            ],
        ],
    },
});