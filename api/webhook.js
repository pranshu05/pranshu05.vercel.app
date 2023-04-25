const webhookHandler = async (req, res) => {
    try {
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const WEBHOOK_URL = process.env.WEBHOOK_URL

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
        const locationData = await locationResponse.json()
        const { country_name, country_code } = locationData

        const location = req.headers.referer
        const message = `\`\`\`md\n ${date} ${time} (${ip}) ==> [${location}] \n [${country_name}, ${country_code}]\`\`\``

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
