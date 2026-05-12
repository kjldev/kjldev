import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

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
			status: z.enum(['thinking', 'in-progress', 'live', 'retired', 'want', 'collaborator']),
			order: z.number(),
			image: image().optional(),
			links: z
				.array(
					z
						.object({
							name: z.string(),
							url: z.string(),
							image: image().optional(),
							emoji: z.string().optional(),
						})
						.refine((link) => !!link.image !== !!link.emoji, {
							message: 'Each link must have either an image or an emoji, but not both',
						}),
				)
				.optional(),
			tags: z.array(z.string()),
			hasContent: z.boolean(),
			remoteReadme: z.string().optional(),
		}),
});

export const collections = { projects };
