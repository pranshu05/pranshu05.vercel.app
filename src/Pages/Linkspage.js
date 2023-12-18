import { NavBar } from '../components/NavBar'
import { Links } from '../components/Links'
import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer'

export const LinksPage = () => {
   return (
      <div>
         <NavBar />
         <div className='grad-bg' />
         <div className='grain' />
         <div className='banner' style={{backgroundImage:'url("https://i.imgur.com/SPqIWBG.png")'}}>
            <h1>My Socials</h1>
         </div>
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
