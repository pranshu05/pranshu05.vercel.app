import React, { useEffect, useState } from 'react'

export const TimeStatus = () => {
    const [time, setTime] = useState('')
    const [awake, setAwake] = useState(true)

    function updateTime() {
        let current = new Date().toLocaleString('en-In', {
            timeZone: 'Asia/Kolkata',
        })
        let timeString = `${current.slice(-11, -3)} ${current
            .slice(-2)
            .toUpperCase()}`
        setTime(timeString)
        setTimeout(updateTime, 1000)

        if (new Date().getHours() < 7) setAwake(false)
    }

    useEffect(() => {
        updateTime()
    })

    return (
        <div className="time">
            <p>
                {awake ? '👨‍💻' : '💤'}{' '}
                {new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                })}{' '}
                • {time}
            </p>
        </div>
    )
}
