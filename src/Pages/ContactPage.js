import { Contact } from '../components/Contact'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'
import { useEffect } from 'react'
import axios from 'axios'

export const ContactPage = () => {
   useEffect(() => {
      axios.get('https://pranshu05.vercel.app/api/webhook')
   }, [])

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
