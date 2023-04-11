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
            <div className="con">
                <div className="con-left">
                    <h1>Get in touch 📨</h1>
                    <h4>
                        Fill out this form and I'll get back to you as soon as
                        possible! Or contact me via my e-mail or DM me on
                        Twitter/Discord.
                    </h4>
                    <br />
                    <ContactForm />
                </div>
                <div className="con-right">
                    <DiscordStatus />
                </div>
            </div>
        </div>
    )
}
