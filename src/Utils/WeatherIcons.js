import React from 'react'

export function getWeatherIcon(weather) {
   if (weather === null) {
      return null
   }

   const lowercaseWeather = weather.toLowerCase()

   if (lowercaseWeather.includes('sunny')) {
      return (
         <span role="img" aria-label="Sunny">
            ☀️
         </span>
      )
   } else if (lowercaseWeather.includes('clear')) {
      return (
         <span role="img" aria-label="Clear">
            🌞
         </span>
      )
   } else if (lowercaseWeather.includes('partly cloudy')) {
      return (
         <span role="img" aria-label="Partly cloudy">
            ⛅️
         </span>
      )
   } else if (lowercaseWeather.includes('cloudy')) {
      return (
         <span role="img" aria-label="Cloudy">
            ☁️
         </span>
      )
   } else if (lowercaseWeather.includes('overcast')) {
      return (
         <span role="img" aria-label="Overcast">
            🌥️
         </span>
      )
   } else if (lowercaseWeather.includes('mist')) {
      return (
         <span role="img" aria-label="Mist">
            🌫️
         </span>
      )
   } else if (lowercaseWeather.includes('foggy')) {
      return (
         <span role="img" aria-label="Mist">
            🌫️
         </span>
      )
   } else if (lowercaseWeather.includes('smoke')) {
      return (
         <span role="img" aria-label="Smoke">
            🌫️
         </span>
      )
   } else if (lowercaseWeather.includes('rain')) {
      return (
         <span role="img" aria-label="Rain">
            🌧️
         </span>
      )
   } else if (lowercaseWeather.includes('shower')) {
      return (
         <span role="img" aria-label="Rain">
            🌧️
         </span>
      )
   } else if (lowercaseWeather.includes('drizzle')) {
      return (
         <span role="img" aria-label="Rain">
            🌧️
         </span>
      )
   } else if (lowercaseWeather.includes('snow')) {
      return (
         <span role="img" aria-label="Snow">
            ❄️
         </span>
      )
   } else if (lowercaseWeather.includes('thunder')) {
      return (
         <span role="img" aria-label="Thunderstorm">
            🌩️
         </span>
      )
   } else if (lowercaseWeather.includes('storm')) {
      return (
         <span role="img" aria-label="Thunderstorm">
            🌩️
         </span>
      )
   } else if (lowercaseWeather.includes('hail')) {
      return (
         <span role="img" aria-label="Hail">
            🌧️
         </span>
      )
   } else {
      return null
   }
}
