import { useState, useEffect } from 'react'
import { GitaVerse } from '../APIs/GitaVerseAPI'

export const Gita = () => {
    const [verse, setVerse] = useState('')
    const [chapter, setChapter] = useState('')
    const [verseNumber, setVerseNumber] = useState('')

    useEffect(() => {
        async function fetchVerse() {
            const { verse, chapter, verseNumber } = await GitaVerse()
            setVerse(verse)
            setChapter(chapter)
            setVerseNumber(verseNumber)
        }
        fetchVerse()
    }, [])

    if (!verse || !chapter || !verseNumber) return <div>loading...</div>

    return (
        <div className="gita-quote">
            <img
                src="https://user-images.githubusercontent.com/62856848/194565916-2f0d5a4e-a038-4dcf-ba8d-1fd4f789a4a0.png"
                className="gita-img"
                alt="lord shri krishna"
            />
            <h4 className="quote-text">{verse}</h4>
            <h5 className="quote-auth">
                ~ Bhagavad Gita {chapter} : {verseNumber}
            </h5>
        </div>
    )
}
