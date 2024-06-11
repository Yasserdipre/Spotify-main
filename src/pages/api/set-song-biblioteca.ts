import { db, SongBiblioteca, eq, Songs, and, Users } from "astro:db";
import { randomUUID } from "node:crypto";

export async function POST({ request }) {
  try {
    // Obtener los datos del cuerpo de la solicitud POST
    const body = await request.json();
    
    // Asegúrate de que el cuerpo de la solicitud contenga el ID de la canción
    if (!body.songId) {
      throw new Error("Song ID not provided in the request body");
    }
    if (!body.session) {
      throw new Error("Session not provided in the request body");
    }

    const songId = body.songId;
    const title = body.title;
    const session = body.session.user;

    // Obtener los datos de la canción desde la base de datos
    const songData = await db.select({
      albumnId: Songs.albumId,
      title: Songs.title,
      artistId: Songs.artistId
    }).from(Songs).where(and(eq(Songs.title, title), eq(Songs.id, songId)));
    
    // Verificar si se encontraron datos de la canción
    if (songData.length === 0) {
      throw new Error("Song not found in the database");
    }

    const userId = await db.select({id : Users.id}).from(Users).where(and(eq(Users.name, session.name), eq(Users.email, session.email)))
    console.log(userId)
    // Preparar los datos para insertar
    const data = {
      id: randomUUID(),
      artistId: songData[0].artistId,
      albumnId: songData[0].albumnId,
      songId: songId,
      userId: userId[0].id
    };

    console.log(data)

    if (body.operation === "create") {
      await db.insert(SongBiblioteca).values(data);
      console.log("Song added to biblioteca", data);
    } else if (body.operation === "delete") {
      await db.delete(SongBiblioteca).where(and(eq(SongBiblioteca.songId, songId), eq(SongBiblioteca.userId, data.userId)));
      console.log("Song removed from biblioteca", songId);
    }

    // Devolver una respuesta con la información obtenida
    return new Response(JSON.stringify({ status: "ok" }), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el procesamiento de la solicitud
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
