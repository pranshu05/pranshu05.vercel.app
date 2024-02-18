/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from "react-icons/md";

interface Image {
    urls: { regular: string };
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<Image[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const fetchImagesFromUnsplash = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/users/pranshu05/photos', {
                params: { client_id: 'IpuBMtdoSBFo8bS7L1gevS7rRFBdEDN9Wp7du9QFh1A', per_page: 30 },
            });
            setImageData(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const openFullscreen = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeFullscreen = () => setSelectedImageIndex(null);

    const navigateImage = (step: number) => {
        if (selectedImageIndex !== null) {
            const newIndex = selectedImageIndex + step;
            if (newIndex >= 0 && newIndex < imageData.length) {
                setSelectedImageIndex(newIndex);
            }
        }
    };

    useEffect(() => {
        fetchImagesFromUnsplash();
    }, []);

    return (
        <div className="columns-2 md:columns-3 gap-2 md:gap-4">
            {imageData.map((image, index) => (
                <div key={index} className='mb-2 md:mb-4' onClick={() => openFullscreen(index)}>
                    <img className="w-full h-auto rounded-lg grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0 cursor-pointer" src={image.urls.regular} alt="" loading="lazy" />
                </div>
            ))}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop backdrop-blur-sm" onClick={closeFullscreen}>
                    <div className="relative h-dvh w-dvw flex items-center">
                        <img className="max-w-full max-h-full my-auto mx-auto rounded-lg" src={imageData[selectedImageIndex]?.urls.regular} alt="" />
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