// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkReadingTime } from './src/modules/reading-time.mts';

// https://astro.build/config
export default defineConfig({
	site: 'https://kjl.dev/',
	redirects: {
		'/components': {
			destination: '/projects',
			status: 301,
		},
		'/components/[...slug]': {
			destination: '/projects/[...slug]',
			status: 301,
		},
	},
	integrations: [preact(), mdx()],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [remarkReadingTime, remarkGfm],
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
