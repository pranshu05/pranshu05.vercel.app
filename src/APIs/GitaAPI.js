import axios from 'axios'

const BASE_URL = 'https://bhagavad-gita3.p.rapidapi.com/v2'

const getRandomChapter = async () => {
    const response = await axios.get(`${BASE_URL}/chapters`)
    const chapters = response.data.chapters
    const randomIndex = Math.floor(Math.random() * chapters.length)
    return chapters[randomIndex]
}

const getRandomVerse = async () => {
    const randomChapter = await getRandomChapter()
    const response = await axios.get(
        `${BASE_URL}/chapters/${randomChapter.chapter_number}/verses/`
    )
    const verses = response.data.verses
    const randomIndex = Math.floor(Math.random() * verses.length)
    const randomVerse = verses[randomIndex]
    return {
        chapter: randomChapter.chapter_number,
        verse: randomVerse.verse_number,
        text: randomVerse.text,
    }
}

export { getRandomVerse }
