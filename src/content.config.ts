import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const photography = defineCollection({
	loader: glob({ base: './src/content/photography', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		imageUrl: z.string(),
		imageAlt: z.string(),
		tags: z.array(z.string()).optional(),
		camera: z.string().optional(),
		lens: z.string().optional(),
		settings: z.string().optional(),
	}),
});

const art = defineCollection({
	loader: glob({ base: './src/content/art', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		imageUrl: z.string(),
		imageAlt: z.string(),
		medium: z.string().optional(),
		dimensions: z.string().optional(),
		tags: z.array(z.string()).optional(),
	}),
});

const learnings = defineCollection({
	loader: glob({ base: './src/content/learnings', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		source: z.string().optional(),
		difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
	}),
});

export const collections = { blog, photography, art, learnings };
