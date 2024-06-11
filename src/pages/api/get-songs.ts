import { db, Songs, like } from "astro:db";

export async function GET({ params, request }: { params: any; request: any }) {
  // Obtener el parámetro "title" de los parámetros de la URL
  const { url } = request;
  const urlObject = new URL(url);
  const title = urlObject.searchParams.get("title");

  // Filtrar las primeras 5 canciones que contienen el título proporcionado
  const filteredSongs = await db.select().from(Songs).where(like(Songs.title, `%${title}%`)).limit(5);
  return new Response(JSON.stringify(filteredSongs), {
    headers: { "content-type": "application/json" },
  });
}





