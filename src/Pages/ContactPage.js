import { Contact } from '../components/Contact'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const ContactPage = () => {
   return (
      <div>
         <NavBar />
         <div className="contact-page-cont">
            <Contact />
            <Footer />
         </div>
      </div>
   )
}
