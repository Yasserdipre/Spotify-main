import fs from 'fs';
import path from 'path';
import { Albumns, Songs, Artists, db, eq } from "astro:db"; 
import { randomUUID } from "node:crypto";
import { getArtistsId, getSongId, getAlbumnId } from 'db/querys';
import { parseFile } from 'music-metadata';

export async function POST({ request }: { request: any }) {
  const formData = await request.formData();
  const titleSong = formData.get('titleSong');
  const imageSong = formData.get('imageSong');
  const artistsSong = formData.get('artistsSong');
  const albumSong = formData.get('albumSong');
  const file = formData.get('file');
  console.log(file)
  
  if (!artistsSong || !albumSong) {
    return new Response('Artist and album are required', { status: 400 });
  }

  // Build the base directory path
  const baseDir = path.join(process.cwd(), 'public', 'music');
  let musicDir = path.join(baseDir, artistsSong, albumSong);

  // Check if artist and album directories exist
  if (!fs.existsSync(musicDir)) {
    return new Response('Artist or album directory does not exist', { status: 400 });
  }

  // If titleSong and file are provided, save the file
  if (titleSong && file) {
    const filePath = path.join(musicDir, `${titleSong}.mp3`);

    // Check if the song file already exists
    if (fs.existsSync(filePath)) {
      return new Response('File already exists', { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);
    try {
      const metadata = await parseFile(filePath);
      const durationTime = metadata.format.duration;
      const duration = convertDurationToString(durationTime)
      console.log(durationTime)
      const existingArtist = await getArtistsId({principal: artistsSong})
      const existingAlbum = await getAlbumnId(albumSong,{principal: artistsSong})
      const existingSong = await getSongId(titleSong, existingArtist)
      console.log(existingSong)
    
      if (existingSong) {
        // Update existing artist
        await db.update(Songs)
          .set({
            title: titleSong,
            image: imageSong,
            artists: {principal : artistsSong},
            artistId: existingArtist,
            duration: duration
          })
          .where(eq(Songs.artistId, existingArtist));
      } else {
        // Insert new artist
        await db.insert(Songs).values({
          id: randomUUID(),
          title: titleSong,
          tipo: "Cancion",
          album: albumSong,
          image: imageSong,
          albumId: existingAlbum,
          artists: {principal : artistsSong},
          artistId: existingArtist,
          duration: duration
      })
      }
} catch (error) {
  console.error("Error insertando la Canción:", error);
}
    return new Response('File uploaded successfully', { status: 200 });
  } else if (titleSong || file) {
    return new Response('Both titleSong and file are required', { status: 400 });
  }

  return new Response('No valid data provided', { status: 400 });

}

function convertDurationToString(durationInSeconds : number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}