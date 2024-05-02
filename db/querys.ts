import type { Data, SQL } from "@/lib/dataType";
import { db, eq, Albumns } from "astro:db";
import { and } from "drizzle-orm";


export const insertDB = async (Values : Data[], data : SQL ) => {
    try {
      await db.insert(data).values(Values);
      console.log("Songs inserted successfully");
      return false;
    } catch (error) {
      console.error("Error inserting Songs: ", error);
      return true; 
    }
  }


export const getAlbumnId = async (name: string, artists : {[key: string]: string }) => {
  console.log(name)  
  try {
      const album = await db.select({id: Albumns.id}).from(Albumns).where(and(eq(Albumns.title, name), eq(Albumns.artists, artists)));
      return album[0].id ? album[0].id : null ;
    } catch (error) {
      console.error("Error getting album ID: ", error);
      return null;
    }
  }