import { db, Artists, Albumns, Songs, like } from "astro:db";

// Función para calcular la similitud de subcadenas
function substringSimilarity(a: string, b: string, type: string): number {
    const pairs: string[] = [];
    let score = 0;
    let maxLength = Math.max(a.length, b.length);

    for (let i = 0; i < maxLength - 1; i++) {
        const pair = a.slice(i, i + 2);
        const index = b.indexOf(pair);
        
        if (index !== -1) {
            pairs.push(pair);
            b = b.slice(0, index) + b.slice(index + 2);
        }
    }
    
    if (type === "artist") {
        score = 2 * pairs.length / (a.length + b.length);
    } else {
        score = pairs.length / maxLength;
    }

    return score;
}

export async function GET({ params, request }: { params: any; request: any }) {
    // Obtener el parámetro "title" de los parámetros de la URL
    const { url } = request;
    const urlObject = new URL(url);
    const title = urlObject.searchParams.get("title");

    // Consultar artistas, álbumes y canciones que coincidan con el título proporcionado
    const artists = await db.select().from(Artists).where(like(Artists.name, `%${title}%`)).limit(1);
    const albums = await db.select().from(Albumns).where(like(Albumns.title, `%${title}%`)).limit(1);
    const songs = await db.select().from(Songs).where(like(Songs.title, `%${title}%`)).limit(1);

    // Devolver resultados
    if (artists.length > 0) {
        return new Response(JSON.stringify(artists), {
            headers: { "content-type": "application/json" },
        });
    } else if (albums.length > 0) {
        return new Response(JSON.stringify(albums), {
            headers: { "content-type": "application/json" },
        });
    } else if (songs.length > 0) {
        return new Response(JSON.stringify(songs), {
            headers: { "content-type": "application/json" },
        });
    } else {
        // Si no se encuentran coincidencias exactas o parciales, buscar la más similar
        let mostSimilarItem: any = null;
        let maxSimilarity = 0;

        // Buscar la similitud en los artistas
        artists.forEach((artist: any) => {
            const sim = substringSimilarity(title.toLowerCase(), artist.name.toLowerCase(), "artist");
            if (sim > maxSimilarity) {
                maxSimilarity = sim;
                mostSimilarItem = artist;
            }
        });

        // Buscar la similitud en los álbumes
        albums.forEach((album: any) => {
            const sim = substringSimilarity(title.toLowerCase(), album.title.toLowerCase(), "album");
            if (sim > maxSimilarity) {
                maxSimilarity = sim;
                mostSimilarItem = album;
            }
        });

        // Buscar la similitud en las canciones solo si no se encontró un álbum o artista
        if (!mostSimilarItem) {
            songs.forEach((song: any) => {
                const sim = substringSimilarity(title.toLowerCase(), song.title.toLowerCase(), "song");
                if (sim > maxSimilarity) {
                    maxSimilarity = sim;
                    mostSimilarItem = song;
                }
            });
        }

        // Devolver el álbum, canción o artista encontrado más similar
        return new Response(JSON.stringify(mostSimilarItem), {
            headers: { "content-type": "application/json" },
        });
    }
}
