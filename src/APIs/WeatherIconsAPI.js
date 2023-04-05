export function getWeatherIcon(weather) {
    if (weather.includes('Rain') && weather.includes('Thunder')) {
        return <span>⛈️</span>
    } else if (weather.includes('Thunder') && weather.includes('Snow')) {
        return <span>🌨️🌩️</span>
    } else if (weather.includes('Rain')) {
        return <span>🌧️</span>
    } else if (weather.includes('Thunder')) {
        return <span>🌩️</span>
    } else if (weather === 'Sunny') {
        return <span>☀️</span>
    } else if (weather === 'Clear') {
        return <span>🌞</span>
    } else if (weather === 'Partly cloudy') {
        return <span>⛅️</span>
    } else if (weather === 'Cloudy') {
        return <span>☁️</span>
    } else if (weather === 'Overcast') {
        return <span>🌥️</span>
    } else if (weather === 'Mist') {
        return <span>🌫️</span>
    } else if (weather.includes('Snow')) {
        return <span>❄️</span>
    } else if (weather === 'Fog') {
        return <span>🌁</span>
    } else if (weather === 'Hail') {
        return <span>🌧️</span>
    } else if (weather.includes('Showers')) {
        return <span>🌧️</span>
    } else if (weather.includes('Drizzle')) {
        return <span>🌦️</span>
    } else {
        return null
    }
}
