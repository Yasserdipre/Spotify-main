import { defineConfig } from "auth-astro";
import Twitch from "@auth/core/providers/twitch"
import Google from "@auth/core/providers/google"
import Github from "@auth/core/providers/github"
import { db, Users, Sessions, VerificationTokens, VerificationTokens, and, eq } from "astro:db";
import { randomUUID } from "node:crypto";

export default defineConfig({
    providers: [
        Twitch({
            clientId: import.meta.env.TWITCH_CLIENT_ID,
            clientSecret: import.meta.env.TWITCH_CLIENTE_SECRET
        }),

        Google({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET
        }),
        Github({
            clientId: import.meta.env.GITHUB_CLIENT_ID,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET
        })
    ],
     callbacks: {
            session: ({ session, token, }) => {
              if (session) {
                insert(session, token)
              }
              return session;

              
            },
            
          },
          
})


const insert = async (session, token) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await db.select().from(Users).where(and(eq(Users.email, session.user.email)));
        
        let userId;
        if (existingUser.length === 0) {
            // Si el usuario no existe, insertarlo en la tabla de usuarios
            const id = randomUUID();
            await db.insert(Users).values([{ id: id, name: session.user.name, email: session.user.email, image: session.user.image }]);
            userId = id;
        } else {
            // Si el usuario ya existe, obtener su ID
            userId = existingUser[0].id;
        }

        // Verificar si la sesión ya existe en la base de datos
        const existingSession = await db.select().from(Sessions).where(and(eq(Sessions.sessionToken, token.jti), eq(Sessions.userId, userId)));
        // Insertar la sesión solo si no existe en la base de datos
        if (existingSession.length === 0) {
            await db.insert(Sessions).values([{ sessionToken: token.jti, userId: userId, expires: session.expires }]);
        }

        // Verificar si el token de verificación ya existe en la base de datos
        const existingVerificationToken = await db.select().from(VerificationTokens).where(eq(VerificationTokens.identifier, token.sub));
        // Insertar el token de verificación solo si no existe en la base de datos
        if (existingVerificationToken.length === 0) {
            await db.insert(VerificationTokens).values([{ identifier: token.sub, iat: token.iat, expires: session.expires }]);
        }
        
        console.log("Sesión y tokens insertados correctamente.");
    } catch (error) {
        console.error("Error al insertar sesión y tokens:", error);
    }
}
