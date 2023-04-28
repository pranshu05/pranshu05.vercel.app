import axios from 'axios'

const API_KEY = process.env.REACT_APP_GITA_VERSE_API_KEY

export const GitaVerse = async () => {
   const randomChapter = Math.floor(Math.random() * 17) + 2
   const options = {
      method: 'GET',
      url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${randomChapter}/verses/`,
      headers: {
         'X-RapidAPI-Key': API_KEY,
         'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
      },
   }
   try {
      const response = await axios.request(options)
      const randomIndex = Math.floor(Math.random() * response.data.length)
      const selectedVerse = response.data[randomIndex]
      const verse = selectedVerse.translations[4].description
      const chapter = selectedVerse.chapter_number
      const verseNumber = selectedVerse.verse_number
      return {
         verse,
         chapter,
         verseNumber,
      }
   } catch (error) {
      console.error(error)
   }
}
