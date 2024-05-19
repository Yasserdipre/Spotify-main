import fs from 'fs';
import path from 'path';
import { Artists, db, eq } from "astro:db";
import { randomUUID } from "node:crypto";

export async function POST({ request }: { request: any }) {
  const formData = await request.formData();
  const artistName = formData.get('artistName');
  const artistImage = formData.get('artistImage');
  const genreArtist = formData.get('genreArtist');

  if (!artistName) {
    return new Response('Artist name is required', { status: 400 });
  }

  // Build the base directory path
  const baseDir = path.join(process.cwd(), 'public', 'music');
  const artistDir = path.join(baseDir, artistName);

  // Create artist directory if it does not exist
  if (!fs.existsSync(artistDir)) {
    fs.mkdirSync(artistDir, { recursive: true });
  }

  try {
    const existingArtist = await db.select().from(Artists).where(eq(Artists.name, artistName)).limit(1);

    if (existingArtist.length > 0) {
      // Update existing artist
      await db.update(Artists)
        .set({
          name: artistName,
          genre: genreArtist,
          image: artistImage,
        })
        .where(eq(Artists.id, existingArtist[0].id));
      return new Response('Artist updated successfully', { status: 200 });
    } else {
      // Insert new artist
      await db.insert(Artists).values({
        id: randomUUID(),
        name: artistName,
        tipo: "Artista",
        genre: genreArtist,
        image: artistImage,
        listeners: 0
      });
      return new Response('Artist created successfully', { status: 200 });
    }
  } catch (error) {
    console.error("Error processing artist:", error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
