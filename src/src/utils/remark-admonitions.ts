import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, Blockquote, Paragraph, Text } from 'mdast';
import type { Node } from 'unist';
import { Image } from 'astro:assets';
import { jsx } from 'preact/jsx-runtime';

const remarkAdmonitions: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visit(tree, 'blockquote', (node: Node) => {
			// Cast to Blockquote to access children
			const bq = node as Blockquote & { data?: Record<string, unknown> };
			const firstChild = bq.children[0];
			if (firstChild?.type === 'paragraph') {
				const para = firstChild as Paragraph;
				const textNode = para.children[0] as Text;
				if (textNode?.type === 'text') {
					const txt = textNode.value;
					const match = txt.match(/^\[!([A-Za-z0-9_-]+)\]\s*/);
					if (match) {
						const type = match[1].toLowerCase();

						// Resolve the icon path dynamically
						const iconPath = new URL(
							`./assets/status/gfm-${type}.svg`,
							import.meta.url
						).pathname;
						const fallbackIconPath = new URL(
							`./assets/status/gfm-note.svg`,
							import.meta.url
						).pathname;

						// Use Astro's dynamic image import for the icon
						const icon = `<img src="${iconPath}" onerror="this.onerror=null;this.src='${fallbackIconPath}';" alt="${type}" width="16" height="16" />`;
						const colorClass = `admonition-${type}`;

						// Remove the matched text from the original text node
						textNode.value = txt.slice(match[0].length);

						// Inject the SVG icon and wrap the content
						para.children.unshift({
							type: 'html',
							value: `<div class="admonition-icon">${icon}</div>`,
						});

						bq.data = {
							hName: 'blockquote',
							hProperties: {
								className: ['admonition', colorClass],
							},
						};
					}
				}
			}
		});
	};
};

export default remarkAdmonitions;
