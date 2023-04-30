import React, { useState, useEffect } from 'react'
import { MdMusicNote, MdMusicOff } from 'react-icons/md'

const AudioPlayer = ({ isMuted, toggleMute }) => {
   const [audio] = useState(
      new Audio(
         'https://cf-media.sndcdn.com/NdQrQwShSlBh.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vTmRRclF3U2hTbEJoLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjgyODQ0NzE0fX19XX0_&Signature=L6b3rjBsMR4imFyx28hKXaCMCK340cVx7T2diNotsd9mmodba4olE6i~NTkG4SLsAtaVbAsHFBbk635AffgVNOGXS~VXHXgSqs0QL~cJOowO7GfQxVIHvAIBoR~qPSM0x3mWst0I2Ek9Zm6GY1cWrfS0o4TQu3PTKr8MVdW736pzQhh-RXLaBviHAzSUly8PGwS4QawIn8XXBuONNxScoYj~zWRXboPB~k0PavQIidJaxWUMgTGFeRGnqIpkckQLip6IPsN3x3L1kFEHCQT6op1176Q9dFkLubUKEq~j3eweZ9~aYoWTu23Hi3eX-GQU6s9kyFoqQzpmiKdq5F1czA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ'
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
