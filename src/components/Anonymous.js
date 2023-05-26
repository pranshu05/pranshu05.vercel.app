import { useState, useEffect } from 'react'
import axios from 'axios'
import { TbSend } from 'react-icons/tb'

const AnonymousMessage = () => {
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])

   const DISCORD_WEBHOOK_URL =
      'https://discord.com/api/webhooks/1101001754281254943/LC3tzwvPVngBYbhYa4lrfGQ6fmTgeGCOiPsncK1L77Ej6hae_T_YK0HHaOyUUSqJf3NN'

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!message || message.trim().length === 0) {
         setMessages([
            ...messages,
            {
               type: 'error',
               message: 'Please enter a message to send.',
            },
         ])
         return
      }

      try {
         const content = `\`\`\`${message}\`\`\``
         const response = await axios.post(DISCORD_WEBHOOK_URL, {
            content: content,
         })
         console.log(response.data)
         setMessages([
            ...messages,
            {
               type: 'success',
               message: 'Your message was sent successfully!',
            },
         ])
      } catch (error) {
         console.error(error)
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
      }, 3000)
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
