import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GitaQuote = () => {
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        const fetchQuote = async () => {
            const tokenResponse = await axios.post(
                'https://bhagavadgita.io/auth/oauth/token',
                new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: process.env.gita_client_id,
                    client_secret: process.env.gita_client_secret,
                })
            )

            const token = tokenResponse.data.access_token

            const quoteResponse = await axios.get(
                'https://bhagavadgita.io/api/v1/verses/random',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setQuote({
                chapter: quoteResponse.data.chapter_number,
                verse: quoteResponse.data.verse_number,
                text: quoteResponse.data.text,
            })
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

export default GitaQuote
