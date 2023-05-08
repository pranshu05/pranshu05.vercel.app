import React, { useState, useEffect } from 'react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'
import lofiData from '../Utils/lofi.json'

const AudioPlayer = ({ isMuted, toggleMute }) => {
   const [audio] = useState(new Audio())
   const [currentSongIndex, setCurrentSongIndex] = useState(
      Math.floor(Math.random() * lofiData.songs.length)
   )

   const currentSong = lofiData.songs[currentSongIndex]

   useEffect(() => {
      audio.loop = false
      audio.src = currentSong.audio

      if (isMuted) {
         audio.pause()
      } else {
         audio.play()
      }
   }, [audio, currentSong.audio, isMuted])

   useEffect(() => {
      const handleEnded = () => {
         const nextSongIndex = (currentSongIndex + 1) % lofiData.songs.length
         setCurrentSongIndex(nextSongIndex)
      }

      audio.addEventListener('ended', handleEnded)

      return () => {
         audio.removeEventListener('ended', handleEnded)
      }
   }, [audio, currentSongIndex])

   useEffect(() => {
      if (!isMuted) {
         const newCurrentSongIndex = Math.floor(
            Math.random() * lofiData.songs.length
         )
         setCurrentSongIndex(newCurrentSongIndex)
      }
   }, [isMuted])

   return (
      <div className="lofi-cont">
         <div className="music-button" onClick={toggleMute}>
            {isMuted ? <MdMusicNote /> : <MdMusicOff />}
         </div>
         {!isMuted && (
            <div className="lofi-artist">
               {currentSong.name} <br />
               {currentSong.artist}
            </div>
         )}
      </div>
   )
}

export default AudioPlayer
