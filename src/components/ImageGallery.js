export function ImageGallery() {
    const images = [
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

    return (
        <div className="image-gallery">
            {images.map((image, index) => (
                <div className="image-card" key={index}>
                    <img src={image.source} alt="" />
                    <div className="image-location">📍 {image.location}</div>
                </div>
            ))}
        </div>
    )
}
