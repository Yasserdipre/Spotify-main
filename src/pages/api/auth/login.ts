import { db, like, Users } from 'astro:db';
import bcrypt from 'bcrypt';

export async function POST({ request } : {request : any}) {
  const { email, password } = await request.json();
  try {
    const user = await db.select().from(Users).where(like(Users.email, email));

  if (user && bcrypt.compareSync(password, user[0].password)) {
    return new Response(JSON.stringify({ id: user[0].id, name: user[0].name, email: user[0].email, password: password }), { status: 200 });
  } else {
    return new Response('Invalid credentials', { status: 401 });
  }
  } catch (error) {
    console.error("Error al verificar:", error)
  }

  return new Response('Invalid credentials', { status: 401 });
 
}
