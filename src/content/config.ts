import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        html_path: z.string(),
        css_path: z.string(),
        js_path: z.string(),
    }),
});

export const collections = { projects };
