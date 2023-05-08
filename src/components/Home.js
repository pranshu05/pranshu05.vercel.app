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
            <h3 style={{ color: '#818181', padding: '0' }}>
               FullStack Developer based in India, He/Him
            </h3>
            <div className="top-abt-links">
               <a href="https://github.com/pranshu05">
                  <FaGithub />
               </a>
               <a href="https://twitter.com/pranshu_05">
                  <FaTwitter />
               </a>
               <a href="https://linkedin.com/in/pranshu05">
                  <FaLinkedin />
               </a>
               <a href="https://discord.gg/aGrgpT8nmZ">
                  <FaDiscord />
               </a>
               <a href="https://www.youtube.com/channel/UCvxmP7_IDK5vPrCuNOLj_ag">
                  <FaYoutube />
               </a>
            </div>
            <TimeStatus />
            <p>
               {getWeatherIcon(weather)} Currently{' '}
               <strong>{temp !== null ? temp : 'Loading...'} °C </strong>{' '}
               <small>({weather !== null ? weather : 'Loading...'})</small> in{' '}
               <strong>
                  <a href="https://en.wikipedia.org/wiki/Gandhinagar">
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
