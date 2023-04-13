import React, { useState } from 'react'
import axios from 'axios'
import { FaPaperPlane } from 'react-icons/fa'

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
                url: `https://formspree.io/f/xbjeprqd`,
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
                    <h4>NAME</h4>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <h4>EMAIL</h4>
                    <input
                        type="email"
                        name="_replyto"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <h4>MESSAGE</h4>
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </label>
                {status === 'success' && (
                    <p>
                        Thanks for contacting! Message submitted successfully!{' '}
                        <br />
                    </p>
                )}
                {status === 'error' && (
                    <p>
                        There was an error submitting your form. Please try
                        again later.
                        <br />
                    </p>
                )}
                <button type="submit">
                    SUBMIT <FaPaperPlane />
                </button>
            </form>
        </div>
    )
}

export default ContactForm
