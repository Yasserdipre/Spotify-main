import { db, Albumns, Users, AlbumnBiblioteca, inArray, eq, and } from 'astro:db';

export async function GET({ request }: { request: any }) {
  try {
    const { url } = request;
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get("id");
    const sessionStr = urlObject.searchParams.get("session");
    const session = JSON.parse(sessionStr)
    if (!session?.user) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const userResult = await db
      .select({ id: Users.id })
      .from(Users)
      .where(and(eq(Users.name, session.user.name), eq(Users.email, session.user.email)));

    if (userResult.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      });
    }

    const userId = userResult[0].id;
    const albumnIdResult = await db
      .select({ albumnId: AlbumnBiblioteca.albumnId })
      .from(AlbumnBiblioteca)
      .where(eq(AlbumnBiblioteca.userId, userId));

    if (albumnIdResult.length === 0) {
      return new Response(JSON.stringify({ albumns: [] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }

    const albumnIds = albumnIdResult.map(item => item.albumnId);
    const Albumn = await db
      .select()
      .from(Albumns)
      .where(inArray(Albumns.id, albumnIds));

      console.log("este", Albumn)

    return new Response(JSON.stringify({ albumns: Albumn }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching albumns:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
