import { songs as allSongs } from "@/lib/data";

export async function GET({ params, request }: { params: any; request: any }) {
  // Obtener el parámetro "title" de los parámetros de la URL
  const { url } = request;
  const urlObject = new URL(url);
  const title = urlObject.searchParams.get("title");

  // Filtrar las primeras 5 canciones que contienen el título proporcionado
  const filteredSongs = allSongs.filter((song) =>
    song.title.toLowerCase().includes(title.toLowerCase()) || 
    song.album.toLowerCase().includes(title.toLowerCase())
  ).slice(0, 5); // Obtener solo las primeras 5 canciones

  return new Response(JSON.stringify(filteredSongs), {
    headers: { "content-type": "application/json" },
  });
}





