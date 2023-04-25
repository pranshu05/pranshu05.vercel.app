import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'
import { Link } from 'react-router-dom'
import { Gita } from '../components/Gita'
import { NavBar } from '../components/NavBar'
import { useEffect } from 'react'
import axios from 'axios'

export const AboutMePage = () => {
    useEffect(() => {
        axios
            .get('https://pranshu05.vercel.app/api/webhook')
            .then((response) => {
                console.log('Webhook triggered successfully')
            })
            .catch((error) => {
                console.log('Error triggering webhook', error)
            })
    }, [])

    return (
        <div>
            <NavBar />
            <div className="about-me-page-cont">
                <p className="go-back-home">
                    &larr; Go back <Link to="/">home.</Link>
                </p>
                <h1>About</h1>
                <AboutMe />
                <Projects />
                <GitHub />
                <div className="contact-redirect-heading">
                    <h2>
                        Stop stalking! Start <Link to="/contact">talking.</Link>
                    </h2>
                </div>
                <Gita />
                <Footer />
            </div>
        </div>
    )
}
