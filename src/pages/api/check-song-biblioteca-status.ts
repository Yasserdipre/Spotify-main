import { db, Artists, like, Users, SongBiblioteca, eq, and } from "astro:db";


export async function GET({ params, request }: { params: any; request: any }) {
  // Obtener el parámetro "title" de los parámetros de la URL
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  const sessionStr = urlObject.searchParams.get("session");
  const session = JSON.parse(sessionStr)
  let state;
  console.log("id Song: ", id)
  if (session) {

    const userId = await db
      .select({ id: Users.id })
      .from(Users)
      .where(
        and(
          eq(Users.name, session?.user.name),
          eq(Users.email, session?.user.email)
        )
      );
  
    const songBibliotecaData = await db
      .select()
      .from(SongBiblioteca)
      .where(
        and(
          eq(SongBiblioteca.songId, id),
          eq(SongBiblioteca.userId, userId[0].id)
        )
      );
    console.log("user ID: ", userId)
    console.log("SongData: ", songBibliotecaData)

    if (songBibliotecaData.length > 0) {
      state = false;
    } else state = true;
  }

  
  return new Response(JSON.stringify({state}), {
    headers: { "content-type": "application/json" },
  });
}









