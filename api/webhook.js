  
const webhookHandler = async (req, res) => {
    try {
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress

        const WEBHOOK_URL = process.env.REACT_APP_WEBHOOK_URL

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`)
        const locationData = await locationResponse.json()
        const { country_name, country_code, city } = locationData
        const small_code = country_code.toLowerCase()

        const location = req.headers.referer
        const message = `\`${date} ${time} (${ip})\` [${location}] \n [${city}, ${country_name} :flag_${small_code}:]`

        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        })
    } catch (error) {}
}

export default webhookHandler
