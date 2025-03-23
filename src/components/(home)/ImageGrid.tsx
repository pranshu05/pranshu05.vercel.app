/* eslint-disable @next/next/no-img-element */
const images = ["/home-2.webp", "/home-3.webp", "/home-1.webp", "/home-4.webp"]

const HomeImageGrid: React.FC = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2">
        {images.map((src, index) => (
            <div key={index} className="overflow-hidden">
                <img className="w-full h-auto grayscale" width={1000} height={1000} src={src} alt="" loading="lazy" />
            </div>
        ))}
    </div>
)

export default HomeImageGrid