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
      case 'Moderate or heavy rain with thunder':
         return <span>🌩️</span>
      case 'Patchy freezing drizzle possible':
         return <span>🌨️</span>
      case 'Thundery outbreaks possible':
         return <span>🌩️</span>
      case 'Blowing snow':
         return <span>🌨️</span>
      case 'Blizzard':
         return <span>❄️</span>
      case 'Fog':
         return <span>🌁</span>
      case 'Hail':
         return <span>🌧️</span>
      case 'Heavy rain':
         return <span>🌧️</span>
      case 'Heavy snow':
         return <span>❄️</span>
      case 'Heavy sleet':
         return <span>🌨️</span>
      case 'Heavy showers':
         return <span>🌧️</span>
      case 'Thunderstorms':
         return <span>🌩️</span>
      default:
         return null
   }
}