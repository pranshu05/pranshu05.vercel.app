import React, { useState } from 'react'
import axios from 'axios'

function ContactForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://formspree.io/f/xbjeprqd',
                data: {
                    name,
                    email,
                    message,
                },
            })
            if (response.status === 200) {
                setStatus('success')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        name="_replyto"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Message
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </label>
                {status === 'success' && (
                    <p>
                        Thanks for contacting! Message submitted successfully!
                    </p>
                )}
                {status === 'error' && (
                    <p>
                        There was an error submitting your form. Please try
                        again later.
                    </p>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ContactForm
