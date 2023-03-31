import React from 'react'
import { useEffect, useState } from 'react'

const TimeStatus = () => {
    const [time, setTime] = useState('00:00:00 p.m.')
    const [awake, setAwake] = useState(true)

    function updateTime() {
        let current = new Date().toLocaleString('en-In', {
            timeZone: 'Asia/Kolkata',
        })
        setTime(`${current.slice(-11, -6)}${current.slice(-3, -1)}.m`)
        setTimeout(updateTime, 60 * 1000)

        if (new Date().getHours() < 7) setAwake(false)
    }
    useEffect(() => {
        updateTime()
    })
    return (
        <div className="time">
            <p>
                It's currently {time} for me, so I'm probably{' '}
                {awake ? 'awake' : 'sleeping'} .
            </p>
        </div>
    )
}

export default TimeStatus
