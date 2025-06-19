import { useEffect, useState } from "react"

export default function CRTOverlay() {
    const [noise, setNoise] = useState("")

    useEffect(() => {
        const generateNoise = () => {
            const canvas = document.createElement("canvas")
            canvas.width = 200
            canvas.height = 200
            const ctx = canvas.getContext("2d")

            if (ctx) {
                const imageData = ctx.createImageData(canvas.width, canvas.height)
                const data = imageData.data

                for (let i = 0; i < data.length; i += 4) {
                    const noise = Math.random() * 255
                    data[i] = noise
                    data[i + 1] = noise
                    data[i + 2] = noise
                    data[i + 3] = Math.random() * 50
                }

                ctx.putImageData(imageData, 0, 0)
                setNoise(canvas.toDataURL())
            }
        }

        generateNoise()
        const interval = setInterval(generateNoise, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="crt-overlay">
            <div className="crt-scanlines" />
            <div className="crt-screen" />
            {noise && (<div className="crt-noise" style={{ backgroundImage: `url(${noise})`, }} />)}
            <div className="crt-glow" />
        </div>
    )
}