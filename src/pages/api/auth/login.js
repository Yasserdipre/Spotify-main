import { db, like, Users } from 'astro:db';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
  const { email, password } = await request.json();
  const user = await db.select().from(Users).where(like(Users.email, email));

  if (user && bcrypt.compareSync(password, user[0].password)) {
    return new Response(JSON.stringify({ id: user[0].id, name: user[0].name, email: user[0].email }), { status: 200 });
  } else {
    return new Response('Invalid credentials', { status: 401 });
  }
}
