import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Discord = () => {
    const [data, setData] = useState('')
    useEffect(() => {
        axios
            .get('https://api.lanyard.rest/v1/users/754381104034742415')
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [data])

    return (
        <p>
            I'm currently {data.data?.discord_status} on{' '}
            <a href="https://discordapp.com/users/754381104034742415">
                Discord.
            </a>
        </p>
    )
}

export default Discord
