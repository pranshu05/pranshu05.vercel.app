import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const getDiscordStatusIcon = (data) => {
    switch (data?.discord_status) {
        case 'online':
            return <span className="dot online" title="online"></span>
        case 'idle':
            return <span className="dot idle" title="idle"></span>
        case 'dnd':
            return <span className="dot dnd" title="dnd"></span>
        case 'offline':
            return <span className="dot offline" title="offline"></span>
        default:
            return null
    }
}

export const DiscordStatus = () => {
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
            <a href="https://discordapp.com/users/754381104034742415">
                Pranshu05#4726
            </a>
            {getDiscordStatusIcon(data.data)}
        </p>
    )
}
