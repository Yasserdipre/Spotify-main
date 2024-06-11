import { db, like, Users, and, eq } from 'astro:db';
import bcrypt from 'bcrypt';

export async function POST({ request } : {request : any}) {
    const formData = await request.formData();
    const sessionJson = formData.get('session');
    const session = JSON.parse(sessionJson);
    const password = formData.get('oldPassword')
    const newPassword = formData.get('newPassword')
    const process = formData.get('process')
    console.log("Session: ", session)
  try {
    const user = await db.select().from(Users).where(and(eq(Users.email, session.email), eq(Users.name, session.name)));
    console.log(user)
    
  if (user && bcrypt.compareSync(password, user[0].password)) {
    console.log(process)
    
    if (process === "changePassword") {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await db.update(Users)
            .set({
                password: hashedPassword
            }).where(eq(Users.id, user[0].id))
    }
    else if (process === "userChange") {
        const newUser = formData.get('newUser');
        console.log(newUser)
        console.log("ok")
        await db.update(Users)
            .set({
                name: newUser
            }).where(eq(Users.id, user[0].id))
    }

    return new Response(JSON.stringify({ response: "ok" }), { status: 200 });

  } else {
    return new Response('Invalid credentials', { status: 400 });
  }
  } catch (error) {
    console.error("Error al verificar:", error)
  }

  return new Response('Invalid credentials', { status: 401 });
 
}
