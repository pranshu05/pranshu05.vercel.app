import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaDiscord, FaMailBulk, FaTwitter } from 'react-icons/fa'

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
                <FaDiscord /> Pranshu05#4726
            </a>
            {getDiscordStatusIcon(data.data)}
            <br />
            <a href="mailto:pranshu05patel@gmail.com">
                <FaMailBulk /> pranshu05patel@gmail.com
            </a>
            <br />
            <a href="https://twitter.com/pranshu_05">
                <FaTwitter /> Pranshu_05
            </a>
        </p>
    )
}
