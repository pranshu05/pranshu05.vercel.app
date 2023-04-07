import React from 'react'
import { Link } from 'react-router-dom'
import { DiscordStatus } from '../APIs/DiscordStatusAPI'
import ContactForm from '../components/ContactForm'

export function Contact() {
    return (
        <div>
            <p className="go-back-home">
                &larr; Go back <Link to="/">home.</Link>
            </p>
            <h1>Get in touch 📨</h1>
            <h2>
                Fill out this form and I'll get back to you as soon as possible!
            </h2>
            <br />
            <ContactForm />
            <br />
            <DiscordStatus />
            <br />
        </div>
    )
}
