// Writes 900px-wide thumbnails of public/certificates/*.webp to
// public/certificates/thumbs/. Cards load these; the lightbox loads the original.
import sharp from "sharp";
import { readdir, mkdir, access } from "node:fs/promises";
import { join } from "node:path";

const src = "public/certificates";
const out = join(src, "thumbs");
await mkdir(out, { recursive: true });

for (const name of await readdir(src)) {
  if (!name.endsWith(".webp")) continue;
  const dest = join(out, name);
  try {
    await access(dest);
    continue;
  } catch {}
  await sharp(join(src, name)).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 72 }).toFile(dest);
  console.log("thumb", dest);
}
