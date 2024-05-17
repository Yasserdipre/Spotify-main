import type { Data, SQL } from "@/lib/dataType";
import { db, Albumns, Artists, like, and, eq } from "astro:db";


export const insertDB = async (Values : Data[], data : any ) => {
    try {
      await db.insert(data).values(Values);
      console.log("Data inserted successfully");
      return false;
    } catch (error) {
      console.error("Error inserting Songs: ", error);
      return true; 
    }
  }


  export const getAlbumnId = async (name: string, artists: { [key: string]: string }) => {
    try {
      const album = await db.select({ id: Albumns.id }).from(Albumns).where(like(Albumns.title, name));
      
      if (album.length === 0) {
        console.error(`No album found with name: ${name}`);
        return null;
      }
  
      return album[0].id;
    } catch (error) {
      console.error("Error getting album ID: ", error);
      return null;
    }
  };
  

  export const getArtistsId = async (artist: { [key: string]: string }) => {
    const name = artist.principal;
    try {
      const artistData = await db.select({ id: Artists.id }).from(Artists).where(like(Artists.name, name));
      
      if (artistData.length === 0) {
        console.error(`No artist found with name: ${name}`);
        return null;
      }
  
      return artistData[0].id;
    } catch (error) {
      console.error("Error getting artist ID: ", error);
      return null;
    }
  };
  