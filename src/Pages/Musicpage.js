import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { Music } from '../components/Music'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

export const MusicPage = () => {
    useEffect(() => {
        axios.get('https://pranshu05.vercel.app/api/webhook')
    }, [])

    return (
        <div>
            <NavBar />
            <div className="grad-bg" />
            <div className="grain" />
            <div
                className="banner"
                style={{
                    backgroundImage: 'url("https://i.imgur.com/98DHuSX.png")',
                }}
            >
                <h1>Listening Activity</h1>
            </div>
            <div className="music-page-cont">
                <p className="go-back-home">
                    &larr; <Link to="/">home.</Link>
                </p>
                <p>
                    Visit my
                    <a
                        href={`https://www.last.fm/user/pranshu05`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        Last.fm Profile{' '}
                    </a>{' '}
                </p>
                <Music />
                <Footer />
            </div>
        </div>
    )
}
