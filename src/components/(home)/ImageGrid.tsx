/* eslint-disable @next/next/no-img-element */
const images = ['/home-1.webp', '/home-2.webp', '/home-3.webp', '/home-4.webp', '/home-5.webp', '/home-6.webp'];

const HomeImageGrid: React.FC = () => (
    <div className="flex justify-center gap-5 overflow-auto py-4">
        {images.map((src, index) => (
            <div key={index} className={`w-52 flex-none overflow-hidden rounded-lg ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}>
                <img className="w-full h-auto rounded-lg grayscale" width={1000} height={1000} src={src} alt="" loading="lazy" />
            </div>
        ))}
    </div>
);

export default HomeImageGrid;