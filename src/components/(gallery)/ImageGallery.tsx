/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from 'react-icons/md';

interface UnsplashImage {
    urls: { regular: string };
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<UnsplashImage[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const fetchImagesFromUnsplash = async () => {
        try {
            const totalImages = 100;
            const totalPages = Math.ceil(totalImages / 30);
            const imageRequests: Promise<AxiosResponse<UnsplashImage[]>>[] = [];

            for (let page = 1; page <= totalPages; page++) {
                imageRequests.push(
                    axios.get<UnsplashImage[]>('https://api.unsplash.com/users/pranshu05/photos', {
                        params: { client_id: process.env.UNSPLASH_KEY, per_page: 30, page },
                    })
                );
            }

            const imageResponses = await Promise.all(imageRequests);
            const allImages = imageResponses.flatMap(response => response.data);

            setImageData(allImages);
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
                    <img className="w-full h-auto rounded-lg grayscale transition-all duration-500 ease-in-out transform cursor-pointer" width={1000} height={1000} src={image.urls.regular} alt="" loading="lazy" />
                </div>
            ))}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop backdrop-blur-md" onClick={closeFullscreen}>
                    <div className="relative h-dvh w-dvw flex items-center">
                        <img className="max-w-full max-h-full w-auto h-auto my-auto mx-auto rounded-lg" width={1000} height={1000} src={imageData[selectedImageIndex]?.urls.regular} alt="" />
                        <button className="absolute p-2 left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl bg-zinc-900 rounded-lg" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}><MdNavigateBefore /></button>
                        <button className="absolute p-2 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl bg-zinc-900 rounded-lg" onClick={(e) => { e.stopPropagation(); navigateImage(1); }}><MdNavigateNext /></button>
                        <button className="absolute p-2 top-2 right-2 cursor-pointer text-2xl bg-zinc-900 rounded-lg" onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}><MdOutlineClose /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;