import fs from 'fs';
import path from 'path';
import { Albumns, Songs, Artists, db, eq } from "astro:db"; 
import { randomUUID } from "node:crypto";
import { getArtistsId, getAlbumnId } from 'db/querys';
import { colors } from '@/lib/color';

export async function POST({ request }: { request: any }) {
  const formData = await request.formData();
  const albumArtist = formData.get('albumArtist');
  const albumTitle = formData.get('albumTitle');
  const albumCover = formData.get('albumCover');
  const albumGenre = formData.get('albumGenre');

  if (!albumArtist) {
    return new Response('Artist name is required', { status: 400 });
  }

  if (!albumTitle) {
    return new Response('Album title is required', { status: 400 });
  }

  // Build the base directory path
  const baseDir = path.join(process.cwd(), 'public', 'music');
  const artistDir = path.join(baseDir, albumArtist);

  // Create artist directory if it does not exist
  if (!fs.existsSync(artistDir)) {
    fs.mkdirSync(artistDir, { recursive: true });
  }

  // Create album directory inside artist directory
  const albumDir = path.join(artistDir, albumTitle);
  if (!fs.existsSync(albumDir)) {
    fs.mkdirSync(albumDir, { recursive: true });

    try {
        const existingArtist = await getArtistsId({principal: albumArtist})
        const existingAlbum = await getAlbumnId(albumTitle,{principal: albumArtist})
        console.log(existingAlbum)
      
        if (existingAlbum) {
          // Update existing artist
          await db.update(Albumns)
            .set({
              title: albumTitle,
              genre: albumGenre,
              cover: albumCover,
              artists: {principal : albumArtist},
              artistId: existingArtist
            })
            .where(eq(Albumns.artistId, existingArtist));
        } else {
          // Insert new artist
          await db.insert(Albumns).values({
            id: randomUUID(),
            title: albumTitle,
            tipo: "Album",
            cover: albumCover,
            color: getRandomColor(colors),
            genre: albumGenre,
            artists: {principal : albumArtist},
            artistId: existingArtist
        })
        }
} catch (error) {
    console.error("Error insertando al album:", error);
}
    return new Response('Album directory created successfully', { status: 200 });
  } else {
    return new Response('Album directory already exists', { status: 400 });
  }
}


function getRandomColor(colors : any) {
    const colorKeys = Object.keys(colors);
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return colors[randomKey];
  }