import { useState, useEffect } from 'react'
import {
    FaGithub,
    FaLinkedin,
    FaYoutube,
    FaDiscord,
    FaTwitter,
} from 'react-icons/fa'

export const TopAbtMe = () => {
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
        <div className="top-abt-me">
            <h1> Hi! I'm Pranshu ✌️</h1>
            <p>
                I am a developer and high-school student based in India. I
                specialize in creating discord bots using{' '}
                <a href="https://discord.js.org/#/">discord.js</a> and web
                development. Currently 🌡️ {temp !== null ? temp : 'Loading...'}{' '}
                °C out here with ☁️ {weather !== null ? weather : 'Loading...'}
            </p>
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
        </div>
    )
}
