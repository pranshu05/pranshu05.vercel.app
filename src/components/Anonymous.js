import React, { useState } from 'react'
import axios from 'axios'

const DISCORD_WEBHOOK_URL =
    'https://discord.com/api/webhooks/1101001754281254943/LC3tzwvPVngBYbhYa4lrfGQ6fmTgeGCOiPsncK1L77Ej6hae_T_YK0HHaOyUUSqJf3NN'

const AnonymousMessage = () => {
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(DISCORD_WEBHOOK_URL, {
                content: message,
            })
            setIsSuccess(true)
        } catch (error) {
            console.error(error)
            setIsError(true)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            {isSuccess && <p>Your message was sent successfully!</p>}
            {isError && (
                <p>
                    Sorry, there was an error sending your message. Please try
                    again later.
                </p>
            )}
        </div>
    )
}

export default AnonymousMessage
