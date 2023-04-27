import { useState, useEffect } from 'react'
import axios from 'axios'
import { TbSend } from 'react-icons/tb'

const AnonymousMessage = () => {
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [location, setLocation] = useState(null)
    const [messages, setMessages] = useState([])

    const DISCORD_WEBHOOK_URL =
        'https://discord.com/api/webhooks/1101001754281254943/LC3tzwvPVngBYbhYa4lrfGQ6fmTgeGCOiPsncK1L77Ej6hae_T_YK0HHaOyUUSqJf3NN'

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(
                    'https://api.ipify.org/?format=json'
                )
                const data = await response.json()
                const ip = data.ip
                const locationResponse = await fetch(
                    `https://ipapi.co/${ip}/json/`
                )
                const locationData = await locationResponse.json()
                setLocation(locationData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchLocation()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const small_code = location.country_code.toLowerCase()
            const content = `\`${location.ip}\` [${location.city}, ${location.country_name} :flag_${small_code}:]\`\`\`${message}\`\`\``
            const response = await axios.post(DISCORD_WEBHOOK_URL, {
                content: content,
            })
            console.log(response.data)
            setIsSuccess(true)
            setMessages([
                ...messages,
                {
                    type: 'success',
                    message: 'Your message was sent successfully!',
                },
            ])
        } catch (error) {
            console.error(error)
            setIsError(true)
            setMessages([
                ...messages,
                {
                    type: 'error',
                    message:
                        'Sorry, there was an error sending your message. Please try again later. If you have an ad-blocker enabled, please try disabling it and then sending the message again.',
                },
            ])
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (messages.length > 0) {
                setMessages(messages.slice(1))
            }
        }, 2000)
        return () => clearTimeout(timeout)
    }, [messages])

    return (
        <div>
            <div className="ano-cont">
                <div className="ano-form-cont">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Send anonymous message"
                    />
                </div>
                <div className="ano-button-cont">
                    <TbSend onClick={handleSubmit} />
                </div>
            </div>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.type === 'success' ? 'success' : 'error'}
                >
                    <p>{msg.message}</p>
                </div>
            ))}
        </div>
    )
}

export default AnonymousMessage
