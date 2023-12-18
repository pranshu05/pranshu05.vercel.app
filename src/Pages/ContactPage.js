import { Contact } from '../components/Contact'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const ContactPage = () => {
   return (
      <div>
         <NavBar />
         <div className='grad-bg' />
         <div className='banner' style={{backgroundImage:'url("https://i.imgur.com/FOAvyvu.png")'}}>
            <h1>Get in touch 📨</h1>
         </div>
         <div className="contact-page-cont">
            <Contact />
            <Footer />
         </div>
      </div>
   )
}
