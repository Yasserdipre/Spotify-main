import ytdl from 'ytdl-core';
import { createWriteStream, unlinkSync, existsSync, mkdirSync } from 'fs';
import { promisify } from 'util';
import path from 'path';
import { Albumns, Songs, Artists, db, eq } from 'astro:db';
import { randomUUID } from 'crypto';
import { getArtistsId, getSongId, getAlbumnId } from 'db/querys';
import { parseFile } from 'music-metadata';

const unlinkAsync = promisify(unlinkSync);

export async function POST({ request } : {request : any}) {
  try {
    const formData = await request.formData();
    const url = formData.get('url');
    const titleSong = formData.get('titleSong');
    const imageSong = formData.get('imageSong');
    const artistsSong = formData.get('artistsSong');
    const albumSong = formData.get('albumSong');
    console.log(url, titleSong, artistsSong, albumSong)

    if (!url || !titleSong || !artistsSong || !albumSong) {
      console.log("ok")
      return new Response(JSON.stringify({ error: 'URL, titleSong, artistsSong, and albumSong are required' }), { status: 400 });
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    console.log(format)
    const fileName = `${titleSong}.mp3`;
    const baseDir = path.join(process.cwd(), 'public', 'music');
    const musicDir = path.join(baseDir, artistsSong, albumSong);
    
    if (!existsSync(musicDir)) {
      mkdirSync(musicDir, { recursive: true });
    }
    
    const filePath = path.join(musicDir, fileName);

    if (existsSync(filePath)) {
      return new Response('File already exists', { status: 400 });
    }

    await new Promise((resolve, reject) => {
      ytdl(url, { format })
        .pipe(createWriteStream(filePath))
        .on('finish', resolve)
        .on('error', reject);
    });

    const durationTime = info.videoDetails.lengthSeconds;
    const duration = convertDurationToString(durationTime);
    const existingArtist = await getArtistsId({ principal: artistsSong });
    const existingAlbum = await getAlbumnId(albumSong, { principal: artistsSong });
    const existingSong = await getSongId(titleSong, existingArtist);

    if (existingSong) {
      await db.update(Songs)
        .set({
          title: titleSong,
          image: imageSong,
          artists: { principal: artistsSong },
          artistId: existingArtist,
          duration: duration
        })
        .where(eq(Songs.artistId, existingArtist));
    } else {
      await db.insert(Songs).values({
        id: randomUUID(),
        title: titleSong,
        tipo: 'Cancion',
        album: albumSong,
        image: imageSong,
        albumId: existingAlbum,
        artists: { principal: artistsSong },
        artistId: existingArtist,
        duration: duration
      });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp3"`);

    return new Response(filePath, { headers });

  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

function convertDurationToString(durationInSeconds: any) {
  durationInSeconds = Math.max(durationInSeconds - 1, 0); // Asegura que la duración no sea negativa
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

