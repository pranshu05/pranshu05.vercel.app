import { useEffect, useState } from 'react'
import getNowPlayingItem from '../APIs/SpotifyAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import { FaSpotify } from 'react-icons/fa'

export function SpotifyPlayer(props) {
   const [result, setResult] = useState({})

   useEffect(() => {
      Promise.all([
         getNowPlayingItem(
            props.client_id,
            props.client_secret,
            props.refresh_token
         ),
      ]).then((results) => {
         setResult(results[0])
      })
   })

   return result.isPlaying ? (
      <div className="nowplaying">
         <div className="spotify-cont">
            <div className="spotify-track">
               <a
                  href={result.songUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="song url"
               >
                  <div className="song-img">
                     <img
                        src={result.albumImageUrl}
                        alt={`Album cover for ${result.title}`}
                        width=""
                        height=""
                     />
                  </div>
                  <div className="song-info">
                     <div className="song-title">{result.title}</div>
                     <div className="song-artist">
                        <small>
                           by {result.artist} <br /> on {result.albumName}
                        </small>
                     </div>
                     <ProgressBar
                        completed={result.progressMs}
                        maxCompleted={result.durationMs}
                        bgColor="#808080"
                        height="8px"
                        labelColor="#808080"
                        baseBgColor="#121212"
                        transitionDuration="0s"
                     />
                  </div>
               </a>
            </div>
         </div>
      </div>
   ) : (
      <div className="nowplaying">
         <div className="spotify-cont">
            <div className="spotify-track">
               <div
                  className="song-img"
                  style={{
                     fontSize: 'xx-large',
                     alignContent: 'center',
                     textAlign: 'center',
                  }}
               >
                  <FaSpotify />
               </div>
               <div className="song-info">
                  <div className="song-artist" style={{ textAlign: 'center' }}>
                     Not listening to Spotify rn!
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
