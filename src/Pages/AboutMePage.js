import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'
import { Link } from 'react-router-dom'
import { Gita } from '../components/Gita'
import { NavBar } from '../components/NavBar'

export const AboutMePage = () => {
    return (
        <div>
            <NavBar />
            <div className="about-me-page-cont">
                <h1>About</h1>
                <img
                    src="https://user-images.githubusercontent.com/70943732/229968644-a98f6144-2a8d-4fed-bf11-655ac1f84fa6.png"
                    alt="btimg"
                ></img>
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
