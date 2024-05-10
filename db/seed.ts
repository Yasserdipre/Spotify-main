import { Albumns, Songs, Artists, db } from "astro:db";
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
    insertDB(artitsWithIds, Artists)
    console.log("Artists inserted successfully");
    errorResultFirst = false;
  } catch (error) {
    console.error("Error inserting albums: ", error);
    errorResultFirst = true;
    return;
  }

 
  if (errorResultFirst == false) {

    const promises = AlbumnData.map(async (album) => ({
      ...album,
      id: randomUUID(),
      artistId: await getArtistsId(album.artists),
    }));
    
    let errorResult: boolean | null = null;
    const albumnsWithIds= await Promise.all(promises);
    try {
      insertDB(albumnsWithIds, Albumns);
      console.log("Albums inserted successfully");
      errorResult = false;
    } catch (error) {
      console.error("Error inserting albums: ", error);
      errorResult = true;
      return;
    }
     
    if (errorResult == false) {
      try {
        const promises = SongsData.map(async (song) => ({
          ...song,
          id: randomUUID(),
          albumId: await getAlbumnId(song.album, song.artists),
          artistId: await getArtistsId(song.artists)
        }));

        const songsWithIdsAndAlbumnId = await Promise.all(promises);
        console.log(songsWithIdsAndAlbumnId)
        try {
          let insert = await insertDB(songsWithIdsAndAlbumnId, Songs);
        } catch (error) {
          console.error("Error inserting Songs: ", error);
          return;
        }
      } catch (error) {
        console.error("Error inserting songs: ", error);
      }
    }
  }
}
