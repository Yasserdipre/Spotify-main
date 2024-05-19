import { Albumns, Songs, Artists } from "astro:db";
import { randomUUID } from "node:crypto";
import { AlbumnData, SongsData, ArtistsData } from "../src/lib/songsData";
import { insertDB, getAlbumnId, getArtistsId } from "./querys";

export default async function seed() {
  const artitsWithIds = ArtistsData.map((artists) => ({
    ...artists,
    id: randomUUID(),
  }));
  let errorResultFirst: boolean | null = null;
  try {
    await insertDB(artitsWithIds, Artists);
    console.log("Artists inserted successfully");
    errorResultFirst = false;
  } catch (error) {
    console.error("Error inserting artists: ", error);
    errorResultFirst = true;
    return;
  }

  if (errorResultFirst === false) {
    const promises = AlbumnData.map(async (album) => {
      const artistId = await getArtistsId(album.artists);
      if (!artistId) {
        throw new Error(`No artist found for album: ${album.title}`);
      }
      return {
        ...album,
        id: randomUUID(),
        artistId,
      };
    });

    let errorResult: boolean | null = null;
    const albumnsWithIds = await Promise.all(promises);
    try {
      await insertDB(albumnsWithIds, Albumns);
      console.log("Albums inserted successfully");
      errorResult = false;
    } catch (error) {
      console.error("Error inserting albums: ", error);
      errorResult = true;
      return;
    }

    if (errorResult === false) {
      const promises = SongsData.map(async (song) => {
        const albumId = await getAlbumnId(song.album, song.artists);
        const artistId = await getArtistsId(song.artists);
        if (!albumId || !artistId) {
          throw new Error(`No album or artist found for song: ${song.title}`);
        }
        return {
          ...song,
          id: randomUUID(),
          albumId,
          artistId,
        };
      });

      const songsWithIdsAndAlbumnId = await Promise.all(promises);
      try {
        await insertDB(songsWithIdsAndAlbumnId, Songs);
        console.log("Songs inserted successfully");
      } catch (error) {
        console.error("Error inserting songs: ", error);
      }
    }
  }
}
