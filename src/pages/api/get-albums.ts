import { db, Albumns, like } from "astro:db";


export async function GET({ params, request }: { params: any; request: any }) {
  // Obtener el parámetro "title" de los parámetros de la URL
  const { url } = request;
  const urlObject = new URL(url);
  const title = urlObject.searchParams.get("title");

  // Filtrar los álbumes que contienen el título proporcionado
  const filteredAlbums = await db.select().from(Albumns).where(like(Albumns.title, `%${title}%`)).limit(7);
  return new Response(JSON.stringify(filteredAlbums), {
    headers: { "content-type": "application/json" },
  });
}
