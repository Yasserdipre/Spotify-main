import { db, AlbumnBiblioteca, like, Artists, Albumns, eq, Users, and } from "astro:db";
import { randomUUID } from "node:crypto";

export async function POST({ request } : {request : any}) {
    try {
      // Obtener los datos del cuerpo de la solicitud POST
      const body = await request.json();
      
  
      // Asegúrate de que el cuerpo de la solicitud contenga el ID del artista
      if (!body.albumnId) {
        throw new Error("Albumn ID not provided in the request body");
      }
      if (!body.session) {
        throw new Error("Session not provided in the request body");
      }
  
      // Obtener el ID del artista del cuerpo de la solicitud
      const albumnId = body.albumnId;
      const session = body.session.user;

      const ArtitsId = await db.select({artistId: Albumns.artistId}).from(Albumns).where(like(Albumns.id, albumnId));
      
      const userId = await db.select({id : Users.id}).from(Users).where(and(eq(Users.name, session.name), eq(Users.email, session.email)))
      if (ArtitsId.length > 0) {
          if (body.operation === "create") {
            await db.insert(AlbumnBiblioteca).values({
                id: randomUUID(),
                albumnId: albumnId,
                artistId: ArtitsId[0].artistId,
                userId: userId[0].id
              })
          }
          else if (body.operation === "delete") {
            await db.delete(AlbumnBiblioteca).where(and(eq(AlbumnBiblioteca.albumnId, albumnId), eq(AlbumnBiblioteca.userId, userId[0].id)))
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






