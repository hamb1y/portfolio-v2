import { defineCollection, z } from 'astro:content';

const achievements = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.coerce.date().optional(),
    priority: z.number().default(0),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    link: z.string().url().optional(),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.coerce.date(),
    readTime: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    emoji: z.string(),
    name: z.string(),
    description: z.string(),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    siteTitle: z.string(),
    name: z.string(),
    siteDesc: z.string(),
    socials: z.array(
      z.object({
        name: z.string(),
        url: z.string().url(),
        icon: z.string().optional(),
      })
    ),
  }),
});

const hobbies = defineCollection({
  type: 'data',
  schema: z.object({
    emoji: z.string(),
    name: z.string(),
    description: z.string(),
  }),
});

const projectContent = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    link: z.string().optional(),
  }),
});

export const collections = {
  achievements,
  projects,
  blog,
  skills,
  site,
  hobbies,
  projectContent,
};