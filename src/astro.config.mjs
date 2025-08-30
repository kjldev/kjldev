// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeExternalLinks from 'rehype-external-links';
import { remarkReadingTime } from './src/modules/reading-time.mts';
import expressiveCode from 'astro-expressive-code';

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
	integrations: [
		expressiveCode({
			themes: ['github-light', 'github-dark'],
			useDarkModeMediaQuery: false,
			themeCssSelector: (theme) => {
				// Ensure proper theme mapping
				if (theme.name === 'github-dark') {
					return '.dark';
				}
				if (theme.name === 'github-light') {
					return ':not(.dark)';
				}
				// Fallback
				return ':root';
			},
			styleOverrides: {
				borderRadius: '0.5rem',
				frames: {
					shadowColor: '#0001',
				},
			},
		}),
		preact(),
		mdx(),
	],
	vite: {
		// @ts-ignore
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
