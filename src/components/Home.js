import { useState, useEffect } from 'react'
import { TimeStatus } from '../APIs/TimeStatusAPI'
import { SpotifyPlayer } from './Spotify'
import { getWeatherIcon } from '../APIs/WeatherIconsAPI'
import { Link } from 'react-router-dom'
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
            <h1 style={{ fontSize: '400%' }} class="moving-gradient">
                Pranshu
            </h1>
            <h3 style={{ color: '#818181' }}>
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
                <strong>{temp !== null ? temp : 'Loading...'} °C </strong>(
                {weather !== null ? weather : 'Loading...'}) in{' '}
                <strong>Gandhinagar.</strong>
            </p>
            <br />
            <SpotifyPlayer />
            <br />
            <h2>
                know more <Link to="/about">About Me</Link>
            </h2>
        </div>
    )
}
