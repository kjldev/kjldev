// Import the glob loader
import { glob } from 'astro/loaders';
// Import utilities from 'astro:content'
import { z, defineCollection } from 'astro:content';

// Define a 'loader' and a 'schema' for each collection.
const projects = defineCollection({
	loader: glob({
		pattern: '**/[^_]*.{md,mdx}',
		base: './src/collections/projects',
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			status: z.enum(['thinking', 'in-progress', 'live', 'retired', 'want']),
			order: z.number(),
			image: image().optional(),
			links: z
				.array(
					z.object({
						name: z.string(),
						url: z.string(),
						image: image(),
					})
				)
				.optional(),
			tags: z.array(z.string()),
			hasContent: z.boolean(),
		}),
});

export const collections = { projects };
