import { db, Songs, Albumns, like, Artists, eq } from "astro:db";

export async function POST({ request } : {request : any}) {
  try {
    // Obtener los datos del cuerpo de la solicitud POST
    const body = await request.json();

    // Asegúrate de que el cuerpo de la solicitud contenga el ID del artista
    if (!body.artistId) {
      throw new Error("Artist ID not provided in the request body");
    }

    // Obtener el ID del artista del cuerpo de la solicitud
    const artistId = body.artistId;
    const ArtitsCantPrev = await db.select({listeners: Artists.listeners}).from(Artists).where(like(Artists.id, artistId));
    if (ArtitsCantPrev.length > 0) {
        let cant = ArtitsCantPrev[0]?.listeners;
        if (cant !== undefined) {
            const artistsCant = await db.update(Artists).set({listeners: cant + 1}).where(eq(Artists.id, artistId));
        }
    }
    
    
    // Realizar la consulta a la base de datos para obtener la información del álbum y las canciones
   
    // Devolver una respuesta con la información obtenida
    return new Response(JSON.stringify("ok"), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el procesamiento de la solicitud
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
