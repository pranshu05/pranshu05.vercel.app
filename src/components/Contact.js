import React from 'react'
import { Link } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import AnonymousMessage from './Anonymous'

export function Contact() {
   return (
      <div>
         <p className="go-back-home">
            &larr; <Link to="/">home.</Link>
         </p>
         <h1>Get in touch 📨</h1>
         <ContactForm />
         <AnonymousMessage />
      </div>
   )
}
