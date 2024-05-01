import { allPlaylists, songs as allSongs } from "@/lib/data";
import { db, Songs } from "astro:db";

export async function GET({ params, request }) {
  // get the id from the url search params
  const { url } = request
  const urlObject = new URL(url)
  const id = urlObject.searchParams.get('id')
  const Song = await db.select().from(Songs);
  Song.map((song)=> console.log(song))

  const playlist = allPlaylists.find((playlist) => playlist.id === id)
  const songs = allSongs.filter(song => song.albumId === playlist?.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "content-type": "application/json" },
  })
}