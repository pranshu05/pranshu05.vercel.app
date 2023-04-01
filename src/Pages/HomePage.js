import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import { Footer } from '../components/Footer'
import { GitHub } from '../components/GitHub'

export const HomePage = () => {
    return (
        <div className="home-page-cont">
            <AboutMe />
            <Projects />
            <GitHub />
            <Footer />
        </div>
    )
}
