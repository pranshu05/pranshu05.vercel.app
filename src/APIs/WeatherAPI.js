import { useState, useEffect } from 'react'
import { getWeatherIcon } from '../Utils/WeatherIcons'

export const Weather = () => {
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
        <span>
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
        </span>
    )
}
