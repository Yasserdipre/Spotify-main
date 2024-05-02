import { useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import React from 'react';
import type { SongProps } from '@/lib/dataType';

interface Props {
  songs: SongProps[];
}


const TableComponent: React.FC<Props> = ({ songs }) => {

  const { setCurrentMusic, setIsPlaying, currentMusic } = usePlayerStore(state => state);
  const [hoveredSong, setHoveredSong] = useState<SongProps | null>(null);

  const handleButtonClick = (song: SongProps) => {
    const enlace = window.location.href;
    const id = enlace.split('/').pop();

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data;
        const selectedSong : SongProps[] = songs.find((s: { id: string; }) => s.id === song.id);
      
        if (selectedSong) {
          setIsPlaying(true);
          setCurrentMusic({ songs, playlist, song: selectedSong });
        } else {
          console.error(`No se encontró ninguna canción con el ID ${song.id}`);
        }
      });
  };

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead className="">
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Título</th>
          <th className="px-4 py-2 font-light">Álbum</th>
          <th className="px-4 py-2 font-light"></th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, index) => (
          <tr
            key={song.id}
            className={`border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 ${
              currentMusic && currentMusic.song && currentMusic.song.id === song.id ? 'bg-slate-100/5' : ''
            }`}
            onMouseEnter={() => setHoveredSong(song)}
            onMouseLeave={() => setHoveredSong(null)}
          >
            <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">{index + 1}</td>
            <td className="px-4 py-2">
              <div className="flex gap-3 relative">
                <picture className="cursor-pointer" onClick={() => handleButtonClick(song)}>
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
            <td className="px-4 py-2">{song.album}</td>
            <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">{song.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;


