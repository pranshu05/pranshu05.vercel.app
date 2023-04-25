const axios = require('axios')
const geoip = require('geoip-lite')

const webhookHandler = async (req, res) => {
    // Get the visitor's IP address
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // Get the visitor's location and country flag
    const geo = geoip.lookup(ip)
    const flag = geo.country.toLowerCase()

    // Format the message
    const WEBHOOK_URL = process.env.WEBHOOK_URL
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    const location = req.headers.referer
    const message = `${date}, ${time}, ${ip}, ${geo.city}, ${geo.region}, :flag_${flag}: --> ${location}`

    // Send the message to the Discord webhook
    await axios
        .post(WEBHOOK_URL, { content: message })
        .then((response) => {
            console.log('Message sent to Discord')
        })
        .catch((error) => {
            console.log('Error sending message to Discord', error)
        })

    res.status(200).send('Webhook triggered successfully')
}

export default webhookHandler
