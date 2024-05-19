// src/pages/api/auth/register.js
import { db, Users } from 'astro:db';
import bcrypt from 'bcrypt'
import { randomUUID } from "node:crypto";

export async function POST({ request } : {request: any}) {
  const { name, email, password } = await request.json();
  console.log(name, email, password)
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword)

  
  await db.insert(Users).values({
    id: randomUUID(), 
    name:name, 
    email: email,
    password: hashedPassword
   });

  return new Response('User registered', { status: 201 });
}
