import type { CollectionEntry } from "astro:content";

type Entry = CollectionEntry<"projects"> | CollectionEntry<"products">;

/** Featured entries first; otherwise keep collection order. */
export function featuredFirst<T extends Entry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => Number(b.data.featured) - Number(a.data.featured));
}
