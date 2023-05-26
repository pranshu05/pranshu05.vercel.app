import { NavBar } from '../components/NavBar'
import { Links } from '../components/Links'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export const LinksPage = () => {
   return (
      <div>
         <NavBar />
         <div className="links-page-cont">
            <p className="go-back-home">
               &larr; <Link to="/">home.</Link>
            </p>
            <Links />
            <Footer />
         </div>
      </div>
   )
}
