const UAParser = require('ua-parser-js')

const webhookHandler = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
        const locationData = await locationResponse.json()
        const { country_name, country_code, city } = locationData
        const small_code = country_code.toLowerCase()

        const refererUrl = req.headers.referer
        const path = refererUrl ? new URL(refererUrl).pathname : 'unknown'

        const uaParser = new UAParser()
        const uaString = req.headers['user-agent']
        const uaData = uaParser.setUA(uaString).getResult()
        const isBot = uaData.device && uaData.device.type === 'bot'

        const message = `\`${date} ${time} (${ip}) [${path}]\`\n[${city}, ${country_name} :flag_${small_code}:] ${
            isBot ? ':robot_face: BOT DETECTED' : ''
        }`

        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        })
        res.status(200).send('Webhook triggered successfully')
    } catch (error) {
        res.status(500).send('Failed to trigger webhook')
    }
}

export default webhookHandler
