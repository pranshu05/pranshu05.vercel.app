import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'
import Footer from '../components/Footer'

export const HomePage = () => {
    return (
        <div className="home-page-cont">
            <AboutMe />
            <Projects />
            <Footer />
        </div>
    )
}
