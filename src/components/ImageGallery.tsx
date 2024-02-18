/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Image {
    urls: { regular: string; };
}

const ImageGallery: React.FC = () => {
    const [imageData, setImageData] = useState<Image[]>([]);

    const fetchImagesFromUnsplash = async () => {
        try {
            const response = await axios.get('https://api.unsplash.com/users/pranshu05/photos', {
                params: {
                    client_id: 'IpuBMtdoSBFo8bS7L1gevS7rRFBdEDN9Wp7du9QFh1A',
                    per_page: 30,
                },
            });

            setImageData(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImagesFromUnsplash();
    }, []);

    return (
        <div className="columns-2 md:columns-3 gap:2 md:gap-4">
            {imageData.map((image, index) => (
                <div className="mb-2 md:mb-4" key={index}>
                    <img className='h-auto max-w-full rounded-lg grayscale transition-all duration-300 ease-in-out transform hover:grayscale-0' src={image.urls.regular} alt="" loading="lazy" />
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;