import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from 'react-icons/md';

interface UnsplashImage {
    urls: { regular: string };
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<UnsplashImage[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isLoading, setLoading] = useState(true);

    const fetchImagesFromUnsplash = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/users/pranshu05/photos', {
                params: { client_id: process.env.UNSPLASH_KEY, per_page: 30 },
            });
            setImageData(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleFullscreen = (index: number) => {
        setSelectedImageIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeFullscreen = () => {
        setSelectedImageIndex(null);
        document.body.style.overflow = 'auto';
    };

    const navigateImage = (step: number) => {
        const newIndex = selectedImageIndex !== null ? selectedImageIndex + step : null;
        (newIndex !== null && newIndex >= 0 && newIndex < imageData.length) && setSelectedImageIndex(newIndex);
    };

    useEffect(() => {
        fetchImagesFromUnsplash();
    }, []);

    return (
        <div className="columns-2 md:columns-3 gap-2 md:gap-4">
            {imageData.map((image, index) => (
                <div key={index} className="mb-2 md:mb-4" onClick={() => handleFullscreen(index)}>
                    <Image className={`w-full h-auto rounded-lg grayscale transition-all duration-500 ease-in-out transform hover:grayscale-0 cursor-pointer ${isLoading ? 'blur-2xl' : 'blur-0'}`} onLoad={() => setLoading(false)} width={1000} height={1000} src={image.urls.regular} alt="" loading="lazy" />
                </div>
            ))}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop backdrop-blur-md" onClick={closeFullscreen}>
                    <div className="relative h-dvh w-dvw flex items-center">
                        <Image className={`max-w-full max-h-full w-auto h-auto my-auto mx-auto rounded-lg ${isLoading ? 'blur-2xl' : 'blur-0'}`} onLoad={() => setLoading(false)} width={1000} height={1000} src={imageData[selectedImageIndex]?.urls.regular} alt="" />
                        <button className="absolute p-4 left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}><MdNavigateBefore /></button>
                        <button className="absolute p-4 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl" onClick={(e) => { e.stopPropagation(); navigateImage(1); }}><MdNavigateNext /></button>
                        <button className="absolute top-0 right-0 p-4 cursor-pointer text-2xl" onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}><MdOutlineClose /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;