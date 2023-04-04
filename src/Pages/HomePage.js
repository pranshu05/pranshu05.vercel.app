import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'
import { Link } from 'react-router-dom'
import { GitaQuote } from '../components/Gita'

export const HomePage = () => {
    return (
        <div className="home-page-cont">
            <AboutMe />
            <Projects />
            <GitHub />
            <div className="contact-redirect-heading">
                <h2>
                    Stop stalking! Start <Link to="/contact">talking.</Link>
                </h2>
            </div>
            <GitaQuote />
            <Footer />
        </div>
    )
}
