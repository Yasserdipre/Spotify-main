import { allPlaylists as allAlbums } from "@/lib/data"; // Importa la lista de álbumes desde el archivo de datos

export async function GET({ params, request }: { params: any; request: any }) {
  // Obtener el parámetro "title" de los parámetros de la URL
  const { url } = request;
  const urlObject = new URL(url);
  const title = urlObject.searchParams.get("title");

  // Filtrar los álbumes que contienen el título proporcionado
  const filteredAlbums = allAlbums.filter((album) =>
    album.title.toLowerCase().includes(title.toLowerCase())
  );

  // Crear un conjunto para almacenar los álbumes únicos por su ID
  const uniqueAlbumsMap = new Map<string, Playlist>();

  // Agregar los álbumes filtrados al conjunto, usando el ID como clave para asegurar la unicidad
  filteredAlbums.forEach((album) => {
    uniqueAlbumsMap.set(album.id, album);
  });

  // Convertir los valores del mapa nuevamente a un array de objetos de álbumes
  const uniqueAlbumsArray = Array.from(uniqueAlbumsMap.values());

  return new Response(JSON.stringify(uniqueAlbumsArray), {
    headers: { "content-type": "application/json" },
  });
}
