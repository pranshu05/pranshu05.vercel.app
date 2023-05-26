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
            <p className="go-back-home">
               &larr; <Link to="/">home.</Link>
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
