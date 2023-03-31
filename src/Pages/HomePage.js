import { Projects } from '../components/Projects'
import { AboutMe } from '../components/AboutMe'

export const HomePage = () => {
    return (
        <div className="home-page-cont">
            <AboutMe />
            <Projects />
        </div>
    )
}
