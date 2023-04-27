import React, { useState, useEffect } from 'react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'

const AudioPlayer = () => {
    const [isMuted, setIsMuted] = useState(true)
    const [audio] = useState(
        new Audio(
            'https://cdn.pixabay.com/download/audio/2021/11/16/audio_2f1138b529.mp3?filename=rain-and-nostalgia-version-60s-10820.mp3'
        )
    )

    useEffect(() => {
        audio.loop = true
        if (!isMuted) {
            audio.play()
        } else {
            audio.pause()
        }
        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    })

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    return (
        <div className="music-button" onClick={toggleMute}>
            {isMuted ? <MdMusicNote /> : <MdMusicOff />}
        </div>
    )
}

export default AudioPlayer
