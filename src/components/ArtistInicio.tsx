// AlbumSearch.js
import React from "react";
import { usePlayerStore } from '@/store/playerStore';

const ArtistsInicio = ({ artistData, title }) => {
    const { setCurrentMusic, setIsPlaying } = usePlayerStore(state => state);

    const handleButtonClick = async (artist) => {
        try {
            const response = await fetch(`/api/get-info-playlist.json?id=${artist.id}`);
            const data = await response.json();
            const { songs, playlist } = data;
            console.log(playlist);
            setIsPlaying(true);
            setCurrentMusic({ songs: songs, playlist: playlist, song: songs[0] });
        } catch (error) {
            console.error("Error fetching playlist info:", error);
        }
    };

    return (
        <div className="mb-3">
            <div className="mt-6">
                <div className="flex flex-wrap gap-4">
                    {artistData.map((artist, index) => (
                        <div key={index} className="text-white text-lg relative">
                            <article className="group relative transition-all duration-300 w-44 hover:w-52">
                                <a href={`/artists/${artist.id}`} className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md flex-col">
                                    <picture className="aspect-square w-full h-auto flex-none">
                                        <img src={artist.image} alt={`Cover of ${artist.name}`} className="object-cover w-full h-full rounded-full" />
                                    </picture>
                                    <div className="flex flex-auto flex-col px-2">
                                        <h4 className="text-white text-sm">{artist.name}</h4>
                                        <span className="text-xs text-gray-400">Artista</span>
                                    </div>
                                </a>
                                <button onClick={() => handleButtonClick(artist)} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
                                    <svg className="w-4 h-4" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                                    </svg>
                                </button>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistsInicio;
