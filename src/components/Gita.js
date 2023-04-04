import { useState, useEffect } from 'react'
import { getRandomVerse } from '../APIs/GitaAPI'

export const GitaQuote = () => {
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        const fetchQuote = async () => {
            const randomVerse = await getRandomVerse()
            setQuote(randomVerse)
        }

        fetchQuote()
    }, [])

    if (!quote) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <p>Chapter: {quote.chapter}</p>
            <p>Verse: {quote.verse}</p>
            <p>Text: {quote.text}</p>
        </div>
    )
}
