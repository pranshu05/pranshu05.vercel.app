import { NavBar } from '../components/NavBar'
import { Links } from '../components/Links'
import { Link } from 'react-router-dom'

export const LinksPage = () => {
    return (
        <div>
            <NavBar />
            <div className="links-page-cont">
                <p className="go-back-home">
                    &larr; Go back <Link to="/">home.</Link>
                </p>
                <Links />
            </div>
        </div>
    )
}
