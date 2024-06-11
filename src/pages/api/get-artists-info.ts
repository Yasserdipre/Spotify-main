import { db, Songs, Albumns, like } from "astro:db";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  const Album = await db.select().from(Albumns).where(like(Albumns.artistId, id))
  const playlist = Album
  const Song = await db.select().from(Songs).where(like(Songs.albumId, playlist[0].id));
  const songs = Song
  
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  })
}