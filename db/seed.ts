import { Albumns, Songs } from "astro:db";
import { randomUUID } from "node:crypto";
import { AlbumnData, SongsData } from "../src/lib/songsData";
import { insertDB, getAlbumnId } from "./querys";

export default async function seed() {
  
  const albumsWithIds = AlbumnData.map((album) => ({
    ...album,
    id: randomUUID(),
  }));
  let errorResult: boolean | null = null;
  try {
    insertDB(albumsWithIds, Albumns)
    console.log("Albums inserted successfully");
    errorResult = false;
  } catch (error) {
    console.error("Error inserting albums: ", error);
    errorResult = true;
    return; 
  }

  if(errorResult == false) {
    try {
      const promises = SongsData.map(async (song) => ({
        ...song,
        id: randomUUID(),
        albumId: await getAlbumnId(song.album, song.artists)
      }));
  
      const songsWithIdsAndAlbumnId = await Promise.all(promises);
      console.log(songsWithIdsAndAlbumnId)
      try {
        let insert = await insertDB(songsWithIdsAndAlbumnId, Songs)
      } catch (error) {
        console.error("Error inserting Songs: ", error);
        return; 
      }
      
      
    } catch (error) {
      console.error("Error inserting songs: ", error);
    }
  }
  }



