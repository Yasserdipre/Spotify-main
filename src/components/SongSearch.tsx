// SongSearch.js
import React, { useState } from "react";
import PrincipalResult from "./PrincipalResult";

const SongSearch = ({ searchResults, setCurrentMusic, setIsPlaying, currentMusic, searchQuery }) => {
    const [hoveredSong, setHoveredSong] = useState(null);

    const handleButtonClick = (song, index) => {
        fetch(`/api/get-info-playlist.json?id=${searchResults[index].albumId}`)
            .then(res => res.json())
            .then(data => {
                const { songs, playlist } = data;
                console.log(playlist);
                setIsPlaying(true);
                setCurrentMusic({ songs: searchResults, playlist: playlist, song: song });
            });
    };

    return (
        <div className="flex">
            <div className="w-1/2">
                {searchResults.length > 0 && (
                    <div className="text-left">
                        <p className="ml-4 mt-16 text-white text-4xl">Resultado Principal</p>
                    </div>
                )}
                <PrincipalResult setCurrentMusic={setCurrentMusic} setIsPlaying={setIsPlaying} searchQuery={searchQuery}/>
            </div>
            <div className="w-1/2 pt-20">
                {searchResults.length > 0 && (
                    <div className="text-left">
                        <p className="ml-4 mt-2 text-white text-4xl pb-3">Canciones</p>
                    </div>
                )}
                <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
                    <tbody>
                        {searchResults.map((song, index) => (
                            <tr
                                key={`${song.id}_${index}`}
                                data-index={index}
                                className={`border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 ${
                                    currentMusic && currentMusic.song && currentMusic.song.id === song.id ? 'bg-slate-100/5' : ''
                                }`}
                                onMouseEnter={() => setHoveredSong(song)}
                                onMouseLeave={() => setHoveredSong(null)}
                            >   
                                <td className="px-4 py-2">
                                    <div className="flex gap-3 relative">
                                        <picture className="cursor-pointer" onClick={() => handleButtonClick(song, index)}>
                                            <img
                                                src={song.image}
                                                alt={song.title}
                                                className="w-11 h-11"
                                            />
                                            {hoveredSong === song && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-50 w-11">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="2.5em" // Tamaño del SVG
                                                        height="2.5em" // Tamaño del SVG
                                                        viewBox="0 0 24 24"
                                                        fill="white"
                                                    >
                                                        <path d="M8 5.14v14l11-7z"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </picture>
                                        <div className="flex flex-col">
                                            <button className="" onClick={() => handleButtonClick(song)}>
                                                <h3 className="p-0 ml-0 text-left">{song.title}</h3>
                                            </button>
                                            <h3 className="">{song.album}</h3>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SongSearch;
