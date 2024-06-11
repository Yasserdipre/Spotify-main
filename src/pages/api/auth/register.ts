// src/pages/api/auth/register.js
import { db, Users, like } from 'astro:db';
import bcrypt from 'bcrypt'
import { randomUUID } from "node:crypto";

export async function POST({ request }: { request: any }) {
  try {
    const { name, email, password } = await request.json();
    console.log(name, email, password);
    const image = "https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-150x150.png"
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(hashedPassword);

    const existingUser = await db.select().from(Users).where(like(Users.name, name));
    if (existingUser.length > 0) {
      if (existingUser && bcrypt.compareSync(password, existingUser[0].password)) {
        return new Response('Invalid credentials', { status: 401 });
      } 
    }

    try {
      await db.insert(Users).values({
        id: randomUUID(),
        name: name,
        email: email,
        password: hashedPassword,
        image: image
      });
    } catch (error) {
      console.log("Error when data was inserted: ", error)
    }

    try {
      const user = await db.select().from(Users).where(like(Users.email, email));
  
    if (user && bcrypt.compareSync(password, user[0].password)) {
      return new Response(JSON.stringify({ id: user[0].id, name: user[0].name, email: user[0].email, password: password }), { status: 201 });
    } else {
      return new Response('Invalid credentials', { status: 401 });
    }
    } catch (error) {
      console.error("Error al verificar:", error)
    }

  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}