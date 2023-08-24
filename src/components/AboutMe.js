import { Tech } from './Technologies'
import { useState, useEffect } from 'react'

export const AboutMe = () => {
   const BIRTHDATE = new Date('2005-10-04')
   const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365
   const [ageInPoints, setAgeInPoints] = useState(
      (new Date() - BIRTHDATE) / MS_PER_YEAR
   )

   useEffect(() => {
      const intervalId = setInterval(() => {
         setAgeInPoints((new Date() - BIRTHDATE) / MS_PER_YEAR)
      }, 10)
      return () => clearInterval(intervalId)
   })
   const ageInYearsFormatted = ageInPoints.toFixed(9)

   return (
      <div className="about-me" id="about-me">
         <h2> Hi! I'm Pranshu ✌️</h2>
         <p>
            I'm a {ageInYearsFormatted} y/o B.Tech frsher and self-taught
            developer based in {}
            <a
               href="https://hi.wikipedia.org/wiki/India"
               aria-label="india"
               target="_blank"
               rel="noopener noreferrer"
            >
               Bharat
            </a>
            . I started coding when I was 14 during the COVID lockdown and have
            gained expertise in creating Discord bots using{' '}
            <a
               href="https://discord.js.org/#/"
               aria-label="discord.js"
               target="_blank"
               rel="noopener noreferrer"
            >
               discord.js
            </a>{' '}
            as well as web development. Along the way, I've learned various
            programming languages.
         </p>
         <br />
         <h2>What Do I Do 💭</h2>
         <p>
            I am passionate about everything related to technology, including
            designing and developing software, understanding the various
            components of the internet and how they work together,
            cybersecurity, systems, programming, and more. I am constantly
            striving to expand my knowledge in these areas and apply it to gain
            a deeper understanding of the technology that surrounds us.
         </p>
         <br />
         <Tech />
         <br />
      </div>
   )
}
