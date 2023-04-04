import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Quote = () => {
    const [verse, setVerse] = useState('')
    const [chapter, setChapter] = useState('')
    const [verseNumber, setVerseNumber] = useState('')

    useEffect(() => {
        const randomChapter = Math.floor(Math.random() * 17) + 2
        const options = {
            method: 'GET',
            url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${randomChapter}/verses/`,
            headers: {
                'X-RapidAPI-Key':
                    '89a832a4d8msh9fe27013e09ac56p1c3d0ajsn108af9c5fee6',
                'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
            },
        }

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data.length)
                const randomIndex = Math.floor(
                    Math.random() * response.data.length
                )
                const selectedVerse = response.data[randomIndex]
                setVerse(selectedVerse.translations[4].description)
                setChapter(selectedVerse.chapter_number)
                setVerseNumber(selectedVerse.verse_number)
            })
            .catch(function (error) {
                console.error(error)
            })
    }, [])

    if (!verse || !chapter || !verseNumber) return <div>loading...</div>

    return (
        <div className="gita-quote">
            <img
                src="https://user-images.githubusercontent.com/62856848/194565916-2f0d5a4e-a038-4dcf-ba8d-1fd4f789a4a0.png"
                className="gita-img"
                alt="lord shri krishna"
            />
            <h3 className="quote-text">{verse}</h3>
            <h4 className="quote-auth">
                ~ Bhagavad Gita {chapter} : {verseNumber}
            </h4>
        </div>
    )
}
