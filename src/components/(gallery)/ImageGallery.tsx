/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { MdNavigateBefore, MdNavigateNext, MdOutlineClose } from 'react-icons/md';

interface UnsplashImage {
    urls: { regular: string };
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<UnsplashImage[]>([])
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchImages = async () => {
        try {
            const response = await fetch("/api/unsplash-images")
            const data = await response.json()

            if (response.ok) {
                setImageData(data.images)
            } else {
                setError(data.error || "Failed to fetch images")
            }
        } catch (err) {
            setError("Network error occurred while fetching images")
        } finally {
            setLoading(false)
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
        if (selectedImageIndex !== null) {
            const newIndex = (selectedImageIndex + step + imageData.length) % imageData.length;
            setSelectedImageIndex(newIndex);
        }
    };

    useEffect(() => {
        fetchImages()
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mx-auto">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-zinc-800 rounded-lg animate-pulse"></div>
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-8 text-zinc-400"><p>{error}</p></div>
        )
    }

    if (!imageData.length) {
        return (
            <div className="text-center py-8 text-zinc-400"><p>No images found.</p></div>
        )
    }

    return (
        <div>
            <Masonry breakpointCols={{ default: 3, 768: 2, }} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {imageData.map((image, index) => (
                    <div key={index} className="relative mb-2" onClick={() => handleFullscreen(index)}>
                        <img className="w-full h-auto grayscale transition-all duration-500 ease-in-out transform cursor-pointer" src={image.urls.regular} alt="" loading="lazy" />
                    </div>
                ))}
            </Masonry>
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop backdrop-blur-md" onClick={closeFullscreen}>
                    <div className="relative h-dvh w-dvw flex items-center">
                        <img className="max-w-full max-h-full w-auto h-auto my-auto mx-auto" src={imageData[selectedImageIndex]?.urls.regular} alt="" />
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm lg:text-lg" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}><MdNavigateBefore /></button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm lg:text-lg" onClick={(e) => { e.stopPropagation(); navigateImage(1); }}><MdNavigateNext /></button>
                        <button className="absolute top-2 right-2 cursor-pointer text-sm lg:text-lg" onClick={(e) => { e.stopPropagation(); closeFullscreen(); }}><MdOutlineClose /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageGallery;