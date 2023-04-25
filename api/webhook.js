const geoip = require('geoip-lite')

const webhookHandler = async (req, res) => {
    try {
        // Get the visitor's IP address
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const WEBHOOK_URL =
            'https://discord.com/api/webhooks/1100272235740139610/iCHXpOVRBUmeMmIi5Zh1PAPZjfHQiVYKmHzkENYCxBOl2aLs-Uef0UngLvAgVJTj-1Qe'

        // Get the visitor's location and country flag
        const geo = geoip.lookup(ip)
        if (!geo) {
            throw new Error(`Failed to lookup location for IP address ${ip}`)
        }
        const flag = geo.country.toLowerCase()

        // Format the message
        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()
        const location = req.headers.referer
        const message = `${date}, ${time}, ${ip}, ${geo.city}, ${geo.region}, :flag_${flag}: --> ${location}`

        // Send the message to the Discord webhook using fetch
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        })
        console.log('Message sent to Discord')
        res.status(200).send('Webhook triggered successfully')
    } catch (error) {
        console.log('Error sending message to Discord', error)
        res.status(500).send('Failed to trigger webhook')
    }
}

export default webhookHandler
