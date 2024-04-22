import { allPlaylists, songs, Playlist, Song } from "@/lib/data";

// Función para calcular la similitud de subcadenas
function substringSimilarity(a: string, b: string): number {
    const pairs: string[] = [];
    let score = 0;
    for (let i = 0; i < a.length - 1; i++) {
        const pair = a.slice(i, i + 2);
        const index = b.indexOf(pair);
        if (index !== -1) {
            pairs.push(pair);
            b = b.slice(0, index) + b.slice(index + 2);
        }
    }
    score = 2 * pairs.length / (a.length + b.length);
    return score;
}

export async function GET({ params, request }: { params: any; request: any }) {
    // Obtener el parámetro "title" de los parámetros de la URL
    const { url } = request;
    const urlObject = new URL(url);
    const title = urlObject.searchParams.get("title");

    // Si la cadena de búsqueda tiene solo un carácter, buscar la primera coincidencia que contenga ese carácter
    if (title.length === 1) {
        // Buscar en la lista de álbumes
        const albumMatch = allPlaylists.find((album) => album.title.toLowerCase().includes(title.toLowerCase()));
        if (albumMatch) {
            return new Response(JSON.stringify(albumMatch), {
                headers: { "content-type": "application/json" },
            });
        }

        // Buscar en la lista de canciones
        const songMatch = songs.find((song) => song.title.toLowerCase().includes(title.toLowerCase()));
        if (songMatch) {
            return new Response(JSON.stringify(songMatch), {
                headers: { "content-type": "application/json" },
            });
        }
    }

    // Buscar la coincidencia exacta en la lista de álbumes
    let exactAlbumMatch = allPlaylists.find((album) => album.title.toLowerCase() === title.toLowerCase());
    if (exactAlbumMatch) {
        return new Response(JSON.stringify(exactAlbumMatch), {
            headers: { "content-type": "application/json" },
        });
    }

    // Buscar la coincidencia exacta en la lista de canciones
    let exactSongMatch = songs.find((song) => song.title.toLowerCase() === title.toLowerCase());
    if (exactSongMatch) {
        return new Response(JSON.stringify(exactSongMatch), {
            headers: { "content-type": "application/json" },
        });
    }

    // Buscar el álbum o canción que mejor coincide con el título proporcionado
    let mostSimilarItem: Playlist | Song | null = null;
    let maxSimilarity = 0;

    // Buscar en la lista de álbumes
    allPlaylists.forEach((album) => {
        const sim = substringSimilarity(title.toLowerCase(), album.title.toLowerCase());
        if (sim > maxSimilarity) {
            maxSimilarity = sim;
            mostSimilarItem = album;
        }
    });

    // Buscar en la lista de canciones solo si no se encontró un álbum
    if (!mostSimilarItem) {
        songs.forEach((song) => {
            const sim = substringSimilarity(title.toLowerCase(), song.title.toLowerCase());
            if (sim > maxSimilarity) {
                maxSimilarity = sim;
                mostSimilarItem = song;
            }
        });
    }

    // Devolver el álbum o canción encontrado
    return new Response(JSON.stringify(mostSimilarItem), {
        headers: { "content-type": "application/json" },
    });
}
