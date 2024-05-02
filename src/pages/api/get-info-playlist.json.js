import { allPlaylists, songs as allSongs } from "@/lib/data";
import { db, Songs, Albumns, like } from "astro:db";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  const Song = await db.select().from(Songs).where(like(Songs.albumId, id));
  const Album = await db.select().from(Albumns).where(like(Albumns.id, id))

  const playlist = Album
  const songs = Song
  
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  })
}