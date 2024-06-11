import { db, Songs, Albumns, like } from "astro:db";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  let Song = await db.select().from(Songs).where(like(Songs.albumId, id));
  let Album = await db.select().from(Albumns).where(like(Albumns.id, id))
  if (Song.length === 0) {
    Song = await db.select().from(Songs).where(like(Songs.artistId, id));
    Album = await db.select().from(Albumns).where(like(Albumns.artistId, id))
  }
  const playlist = Album
  const songs = Song
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  })
}