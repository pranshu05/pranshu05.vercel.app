import React from 'react'
import { Link } from 'react-router-dom'
import { DiscordStatus } from '../APIs/DiscordStatusAPI'
import ContactForm from '../components/ContactForm'

export function Contact() {
   return (
      <div>
         <p className="go-back-home">
            &larr; <Link to="/">home.</Link>
         </p>
         <h1>Get in touch 📨</h1>
         <p style={{ fontWeight: 'bold', fontSize: 'medium' }}>
            Fill out this form and I'll get back to you as soon as possible! Or
            contact me via my e-mail or DM me on Twitter/Discord.
         </p>
         <br />
         <div className="con">
            <div className="con-left">
               <ContactForm />
            </div>
            <div className="con-right">
               <DiscordStatus />
            </div>
         </div>
      </div>
   )
}
