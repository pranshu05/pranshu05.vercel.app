import { useState, useEffect } from 'react'
import { TimeStatus } from '../APIs/TimeStatusAPI'
import { SpotifyPlayer } from './Spotify'
import { getWeatherIcon } from '../Utils/WeatherIcons'
import AnonymousMessage from './Anonymous'
import {
   FaGithub,
   FaLinkedin,
   FaYoutube,
   FaDiscord,
   FaTwitter,
} from 'react-icons/fa'

export const Home = () => {
   const [temp, setTemp] = useState(null)
   const [weather, setWeather] = useState(null)

   useEffect(() => {
      fetch(
         'http://api.weatherapi.com/v1/current.json?key=c39ef2dad5e24511884124359232903&q=Gandhinagar&aqi=no'
      )
         .then((response) => response.json())
         .then((results) => {
            setTemp(results.current.temp_c)
            setWeather(results.current.condition.text)
         })
   }, [])

   return (
      <div className="home">
         <div className="h-left">
            <h1 style={{ fontSize: '400%' }} className="moving-gradient">
               Pranshu
            </h1>
            <p
               style={{
                  color: '#818181',
                  padding: '0',
                  fontSize: 'larger',
                  marginTop: '0',
                  fontWeight: 'bold',
               }}
            >
               FullStack Developer based in{' '}
               <a
                  href="https://hi.wikipedia.org/wiki/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4"
                  aria-label="bharat"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Bharat
               </a>
               , He/Him
            </p>
            <div className="top-abt-links">
               <a
                  href="https://github.com/pranshu05"
                  aria-label="github"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaGithub />
               </a>
               <a
                  href="https://twitter.com/pranshu_05"
                  aria-label="twitter"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaTwitter />
               </a>
               <a
                  href="https://linkedin.com/in/pranshu05"
                  aria-label="linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaLinkedin />
               </a>
               <a
                  href="https://discord.gg/aGrgpT8nmZ"
                  aria-label="discord"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaDiscord />
               </a>
               <a
                  href="https://www.youtube.com/channel/UCvxmP7_IDK5vPrCuNOLj_ag"
                  aria-label="youtube"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <FaYoutube />
               </a>
            </div>
            <TimeStatus />
            <p>
               {getWeatherIcon(weather)} Currently{' '}
               <strong>
                  {temp !== null ? temp : <span className="gradient text" />} °C{' '}
               </strong>{' '}
               <small>
                  (
                  {weather !== null ? (
                     weather
                  ) : (
                     <span className="gradient text" />
                  )}
                  )
               </small>{' '}
               in{' '}
               <strong>
                  <a
                     href="https://en.wikipedia.org/wiki/Gandhinagar"
                     aria-label="city"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Gandhinagar
                  </a>
               </strong>
               .
            </p>
            <br />
         </div>
         <div className="h-right">
            <SpotifyPlayer />
            <br />
            <AnonymousMessage />
         </div>
      </div>
   )
}
