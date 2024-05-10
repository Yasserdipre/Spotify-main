import type { Data, SQL } from "@/lib/dataType";
import { db, eq, Albumns, Artists, like } from "astro:db";
import { and } from "drizzle-orm";


export const insertDB = async (Values : Data[], data : SQL ) => {
    try {
      await db.insert(data).values(Values);
      console.log("Data inserted successfully");
      return false;
    } catch (error) {
      console.error("Error inserting Songs: ", error);
      return true; 
    }
  }


export const getAlbumnId = async (name: string, artists : {[key: string]: string }) => {
  try {
      const album = await db.select({id: Albumns.id}).from(Albumns).where(and(eq(Albumns.title, name), eq(Albumns.artists, artists)));
      console.log(album)
      return album[0].id ? album[0].id : null ;
    } catch (error) {
      console.error("Error getting album ID: ", error);
      return null;
    }
  }

  export const getArtistsId = async (artist : {[key: string]: string })  => {
    console.log(artist)
    const name = artist.principal
    try {
        const artist = await db.select({id: Artists.id}).from(Artists).where(like(Artists.name, name));
        return artist[0].id ? artist[0].id : null ;
      } catch (error) {
        console.error("Error getting artists ID: ", error);
        return null;
      }
    }