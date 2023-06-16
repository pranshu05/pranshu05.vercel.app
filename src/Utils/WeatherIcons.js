export function getWeatherIcon(weather) {
   if (weather.includes('Sunny')) {
      return <span>☀️</span>;
   } else if (weather.includes('Clear')) {
      return <span>🌞</span>;
   } else if (weather.includes('Partly cloudy')) {
      return <span>⛅️</span>;
   } else if (weather.includes('Cloudy')) {
      return <span>☁️</span>;
   } else if (weather.includes('Overcast')) {
      return <span>🌥️</span>;
   } else if (weather.includes('Mist') || weather.includes('Foggy')) {
      return <span>🌫️</span>;
   } else if (weather.includes('Smoke')) {
      return <span>🌫️</span>;
   } else if (weather.includes('Rain') || weather.includes('Shower') || weather.includes('Drizzle')) {
      return <span>🌧️</span>;
   } else if (weather.includes('Snow') || weather.includes('Blizzard') || weather.includes('Sleet')) {
      return <span>❄️</span>;
   } else if (weather.includes('Thunder') || weather.includes('Storm')) {
      return <span>🌩️</span>;
   } else if (weather.includes('Hail')) {
      return <span>🌧️</span>;
   } else {
      return null;
   }
}
