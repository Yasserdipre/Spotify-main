
import { usePlayerStore } from '@/store/playerStore';

import React from 'react';

import { type Song } from '@/lib/data';

interface Props {
  songs: Song[];
}

const TableComponent: React.FC<Props> = ({ songs }) => {
  const { setCurrentMusic, setIsPlaying, currentMusic } = usePlayerStore(state => state);
  const handleButtonClick = (song: Song) => {
    const enlace = window.location.href;
    const id = enlace.charAt(enlace.length - 1);

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[song.id-1] })
      })
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
          <tr key={song.id} className={`border-spacing-0 text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 ${currentMusic && currentMusic.song && currentMusic.song.id === song.id ? 'bg-slate-100/5' : ''}`}>
            <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">{index + 1}</td>
            <td className="px-4 py-2">
              <div className="flex gap-3">
                <picture className="">
                  <img src={song.image} alt={song.title} className="w-11 h-11 cursor-pointer" onClick={() => handleButtonClick(song)} />
                </picture>
                <div className="flex flex-col">
                  <button className='' onClick={() => handleButtonClick(song)}><h3 className="p-0 m-0">{song.title}</h3></button>

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
}

export default TableComponent;


