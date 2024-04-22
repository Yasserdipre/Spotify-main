// AlbumSearch.js
import React, { useState, useEffect } from "react";

const AlbumSearch = ({ searchQuery, setCurrentMusic, setIsPlaying }) => {
    const [albumResults, setAlbumResults] = useState([]);

    const handleButtonClick = (album, index) => {
        fetch(`/api/get-info-playlist.json?id=${album.albumId}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                console.log(playlist);
                setIsPlaying(true);
                setCurrentMusic({ songs: songs, playlist: playlist, song: songs[0] });
            });
            console.log(album.albumId)
    };

    useEffect(() => {
        const handleAlbumSearch = async () => {
            if (searchQuery.trim() === "") {
                setAlbumResults([]);
                return;
            }

            try {
                const response = await fetch(`/api/get-albums?title=${searchQuery}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setAlbumResults(data);
                } else {
                    setAlbumResults([]);
                }
            } catch (error) {
                console.error("Error searching albums:", error);
            }
        };

        handleAlbumSearch();
    }, [searchQuery]); // Ejecutar handleAlbumSearch cada vez que searchQuery cambie

    return (
        <div className="mb-16">
            {albumResults.length > 0 && (
                    <div className="text-left">
                        <p className="ml-4 mt-6 text-white text-4xl">Albums</p>
                    </div>
                )}
            <div>
    <div>
        <div className="flex">
        {albumResults.map((album, index) => (
    <div key={index} className="text-white text-lg mx-3 relative">
        <article className="group relative hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30 rounded-md ransi transition-all duration-300">
            <a href={`/playlist/${album.id}`} className="playlist-item transition-all duration-300 flex relative p-2 overflow-hidden gap-2 pb-6 rounded-md w-44 flex-col">
                <picture className="aspect-square w-full h-auto flex-none">
                    <img src={album.cover} alt={`Cover of ${album.title}`} className="object-cover w-full h-full rounded-md" />
                </picture>
                <div className="flex flex-auto flex-col px-2">
                    <h4 className="text-white text-sm">{album.title}</h4>
                    <span className="text-xs text-gray-400">{album.artists.join(', ')}</span>
                </div>
            </a>
            <button onClick={() => handleButtonClick(album, index)} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400 absolute bottom-20 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-300">
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

        </div>
    );
};

export default AlbumSearch;
