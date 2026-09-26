import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
  }),
});

const redirects = defineCollection({
  loader: file('./src/data/redirects.json'),
  schema: z.object({
    slug: z.string(),
    rUrl: z.url()
  })
});

const tree = defineCollection({
  loader: glob({base: './src/content/tree', pattern: '**/*.json'}),
  schema: z.object({ 
    title: z.string(),
    description: z.string().optional(),
    links: z.array( 
      z.object({
        name: z.string(),
        description: z.string().optional(),
        openInNewTab: z.boolean().optional(),
        url: z.url()
      }))})
});

export const collections = {
  blog,
  redirects,
  tree
};