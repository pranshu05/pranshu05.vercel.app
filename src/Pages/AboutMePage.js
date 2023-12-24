import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { useEffect } from 'react'
import axios from 'axios'

export const AboutMePage = () => {
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
                    backgroundImage: 'url("https://i.imgur.com/O2wIpFN.jpg")',
                }}
            >
                <h1>About</h1>
            </div>
            <div className="about-me-page-cont">
                <p className="go-back-home">
                    &larr; <Link to="/">home.</Link>
                </p>
                <AboutMe />
                <Projects />
                <GitHub />
                <div className="contact-redirect-heading">
                    <h2>
                        Stop stalking! Start <Link to="/contact">talking.</Link>
                    </h2>
                </div>
                <Footer />
            </div>
        </div>
    )
}
