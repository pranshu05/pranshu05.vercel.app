import React, { useState, useEffect } from 'react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'

const AudioPlayer = ({ isMuted, toggleMute }) => {
   const [audio] = useState(
      new Audio(
         'https://cdn.pixabay.com/download/audio/2021/11/16/audio_2f1138b529.mp3?filename=rain-and-nostalgia-version-60s-10820.mp3'
      )
   )

   useEffect(() => {
      audio.loop = true
      if (isMuted) {
         audio.pause()
      } else {
         audio.play()
      }
   }, [isMuted, audio])

   return (
      <div className="music-button" onClick={toggleMute}>
         {isMuted ? <MdMusicNote /> : <MdMusicOff />}
      </div>
   )
}

export default AudioPlayer
