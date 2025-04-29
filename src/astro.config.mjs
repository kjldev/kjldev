// @ts-check
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';
import rehypeComponents from 'rehype-components';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeAdmonitions from './src/utils/remark-admonitions';
import remarkAdmonitions from './src/utils/remark-admonitions';

// https://astro.build/config
export default defineConfig({
	site: 'https://kjl.dev/',
	integrations: [preact()],
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [
			remarkGfm,
			remarkDirective,
			remarkAdmonitions,
			//rehypeAdmonitions,
			//remarkGithubAdmonitionsToDirectives,
		],
		rehypePlugins: [
			rehypeAdmonitions,
			rehypeAccessibleEmojis,
			// rehypeAccessibleEmojis,
			// [
			// 	rehypeComponents,
			// 	{
			// 		// any AST node named "admonition" becomes your Blockquote component
			// 		components: {
			// 			admonition: './src/components/Admonition.astro',
			// 		},
			// 	},
			// ],
		],
	},
});
