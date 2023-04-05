export function getWeatherIcon(weather) {
    switch (weather) {
        case 'Sunny':
            return <span>☀️</span>
        case 'Clear':
            return <span>🌞</span>
        case 'Partly cloudy':
            return <span>⛅️</span>
        case 'Cloudy':
            return <span>☁️</span>
        case 'Overcast':
            return <span>🌥️</span>
        case 'Mist':
            return <span>🌫️</span>
        case 'Patchy rain possible':
            return <span>🌦️</span>
        case 'Patchy snow possible':
            return <span>🌨️</span>
        case 'Patchy sleet possible':
            return <span>🌨️</span>
        case 'Patchy freezing drizzle possible':
            return <span>🌨️</span>
        case 'Thundery outbreaks possible':
            return <span>🌩️</span>
        case 'Blowing snow':
            return <span>🌨️</span>
        case 'Blizzard':
            return <span>❄️</span>
        default:
            return null
    }
}
