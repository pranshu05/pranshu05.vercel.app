import { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'

export function ImageGallery() {
    const images = [
        {
            source: 'https://user-images.githubusercontent.com/70943732/233824664-e35abaac-8e1c-4282-8eeb-a2861c537b3a.png',
            location: 'Gandhinagar, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230519369-3f9337c6-79d7-40ff-8fd0-387b51786f80.png',
            location: 'Gandhinagar, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230339477-0d79f5de-85c9-4d16-a164-34e07f7bbbc0.JPG',
            location: 'Kutch, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230340003-37a9dd44-5498-44ef-9514-76f7e79c9104.jpg',
            location: 'Kutch, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230339875-f5a831b5-371a-439d-88f6-8d5cbf01c6e6.jpg',
            location: 'Kutch, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230340054-1ab5e452-52d2-4843-8724-3cb184422795.jpg',
            location: 'Kutch, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230319306-b2058995-69ce-4fae-8a48-9bed99e29372.png',
            location: 'Diu, IN',
        },
        {
            source: 'https://media.discordapp.net/attachments/940588039837720626/1092988464548544572/IMG_6083.JPG?width=925&height=616',
            location: 'Diu, IN',
        },
        {
            source: 'https://media.discordapp.net/attachments/959479592773615636/980880588498145320/DSCN9776.JPG?width=821&height=616',
            location: 'Ladakh, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230319706-55f01a8e-f3ee-40bb-b1a6-c78756741e1d.png',
            location: 'Udaipur, IN',
        },
        {
            source: 'https://media.discordapp.net/attachments/959479592773615636/1072847655211909170/a.png?width=821&height=616',
            location: 'Udaipur, IN',
        },
        {
            source: 'https://user-images.githubusercontent.com/70943732/230320152-6290e4f4-8bb2-4c62-b69f-9e3773f25e11.png',
            location: 'Udaipur, IN',
        },
    ]

    const [model, setModel] = useState(false)
    const [tempimgsrc, setTempImgSrc] = useState('')
    const getImg = (source) => {
        setTempImgSrc(source)
        setModel(true)
        document.body.style.overflow = 'hidden'
    }

    return (
        <div className="image-gallery">
            <div className={model ? 'model open' : 'model'}>
                <img src={tempimgsrc} alt="n" />
                <FaWindowClose
                    onClick={() => {
                        setModel(false)
                        document.body.style.overflow = 'auto'
                    }}
                />
            </div>
            {images.map((image, index) => (
                <div
                    className="image-card"
                    key={index}
                    onClick={() => {
                        getImg(image.source)
                    }}
                >
                    <img src={image.source} alt="" />
                    <div className="image-location">📍 {image.location}</div>
                </div>
            ))}
        </div>
    )
}
