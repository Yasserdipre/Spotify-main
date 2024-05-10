import React, { useState, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";

const PrincipalResult = ({ searchQuery }) => {
    const [results, setResults] = useState<any[]>([]);
    const { setCurrentMusic, setIsPlaying } = usePlayerStore(state => state);


    const handleSongButtonClick = (music) => {
        fetch(`/api/get-info-playlist.json?id=${music.albumId}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                console.log(songs)
                console.log(playlist)
                console.log(results)
                setIsPlaying(true);
                setCurrentMusic({ songs: songs, playlist: playlist, song: results });
            });
    };

    const handleAlbumButtonClick = (music) => {
        fetch(`/api/get-info-playlist.json?id=${music.id}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                console.log("Song: ",songs)
                console.log("playlist: ", playlist)
                setIsPlaying(true);
                setCurrentMusic({ songs: songs, playlist: playlist, song: songs[0] });
            });
    };

    const handleArtistButtonClick = (music) => {
      fetch(`/api/get-artists-info?id=${music.id}`)
          .then(res => res.json())
          .then(data => {
              const { songs, playlist } = data;
              setIsPlaying(true);
              setCurrentMusic({ songs: songs, playlist: playlist, song: songs[0] });
          });
  };


    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery.trim() === "") {
                setResults([]);
                return;
            }
    
            try {
              const response = await fetch(`/api/get-principal-music?title=${searchQuery}`);
              const query = await response.json();
             if(query){
              const data = query[0]
  
              if (data) {
                  setResults(data);
                  console.log(data)
              } else {
                  setResults([]);
              }
             }
              
          } catch (error) {
                console.error("Error searching albums:", error);
            }
        };
    
        fetchData();
    
    }, [searchQuery]);
    

    return (
      <div className="mb-16 mt-2">
        <div>
          <div className="">
            <div className="text-white text-lg mx-3 relative">
              {results !== undefined && results.tipo === 'Album' ? (
                <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md ransi transition-all duration-300 w-auto">
                  <a href={`/playlist/${results.id}`} className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-auto flex-col">
                    <picture className="aspect-square w-36 h-auto flex-none">
                      <img src={results.cover} alt={`Cover of ${results.title}`} className="object-cover w-28 h-28 rounded-md" />
                    </picture>
                    <div className="flex flex-auto flex-col px-2 w-96">
                      <h4 className="text-white text-4xl">{results.title}</h4>
                      <div className="flex">
                        <span className="text-xs text-gray-400">Album</span>
                        <span className="text-xs text-white ml-2">&#8226;</span>
                        <span className="text-xs text-white ml-2">{results.artists.principal}</span>
                      </div>
                    </div>
                  </a>
                  <button onClick={() => handleAlbumButtonClick(results)} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 absolute bottom-8 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                    <svg className="w-4 h-4" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                      <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                    </svg>
                  </button>
                </article>
              ) : (
                results !== undefined && results.tipo === 'Cancion' ? (
                  <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md ransi transition-all duration-300 w-auto">
                    <a href={`/playlist/${results.id}`} className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-auto flex-col">
                      <picture className="aspect-square w-36 h-auto flex-none">
                        <img src={results.image} alt={`Cover of ${results.title}`} className="object-cover w-28 h-28 rounded-md" />
                      </picture>
                      <div className="flex flex-auto flex-col px-2 w-96">
                        <h4 className="text-white text-4xl">{results.title}</h4>
                        <div className="flex">
                          <span className="text-xs text-gray-400">Cancion</span>
                          <span className="text-xs text-white ml-2">&#8226;</span>
                          <span className="text-xs text-white ml-2">{results.artists.principal}</span>
                        </div>
                      </div>
                    </a>
                    <button onClick={() => handleSongButtonClick(results)} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 absolute bottom-8 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                      <svg className="w-4 h-4" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>
                    </button>
                  </article>
                ) : (
                  results !== undefined && results.tipo === 'Artista' ? (
                    <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md ransi transition-all duration-300 w-auto">
                      <a href={`/artists/${results.id}`} className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-auto flex-col">
                        <picture className="aspect-square w-36 h-auto flex-none">
                          <img src={results.image} alt={`Cover of ${results.name}`} className="object-cover w-28 h-28 rounded-md" />
                        </picture>
                        <div className="flex flex-auto flex-col px-2 w-96">
                          <h4 className="text-white text-4xl">{results.name}</h4>
                          <div className="flex">
                            <span className="text-xs text-gray-400">Artista</span>
                            <span className="text-xs text-white ml-2">&#8226;</span>
                            <span className="text-xs text-white ml-2">{results.genre}</span>
                          </div>
                        </div>
                      </a>
                      <button onClick={() => handleArtistButtonClick(results)} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 absolute bottom-8 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                      <svg className="w-4 h-4" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>
                    </button>
                    </article>
                  ) : null
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
    
    
};

export default PrincipalResult;
