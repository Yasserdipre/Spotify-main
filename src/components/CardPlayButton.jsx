import { Pause, Play } from "./Player"
import { usePlayerStore } from '@/store/playerStore'
import { useState } from "react"

export function CardPlayButton ({ id, size = 'small', followButt }) {
  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = usePlayerStore(state => state)

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

  

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
  }


  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


  return (
    <>
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>

    {followButt !== undefined ? (
      <button type="button" className="ml-5 border py-1 px-4 rounded-3xl text-base border-gray-100/[.25] hover:border-gray-100 hover:text-lg" onClick={()=> console.log("Hola")}>{followButt}</button>
    ) : null}

    </>
  )
}