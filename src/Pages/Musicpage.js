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
            <div className="music-page-cont">
                <p className="go-back-home">
                    &larr; Go back <Link to="/">home.</Link>
                </p>
                <Music />
                <Footer />
            </div>
        </div>
    )
}
