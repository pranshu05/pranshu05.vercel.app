import { NavBar } from '../components/NavBar'
import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'
import { Link } from 'react-router-dom'

export const HomePage = () => {
    return (
        <div className="home-page-cont">
            <NavBar />
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
    )
}
