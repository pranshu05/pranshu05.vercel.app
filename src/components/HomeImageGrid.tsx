/* eslint-disable @next/next/no-img-element */
import React from 'react';

const images = [
    '/home-1.jpg',
    '/home-2.jpg',
    '/home-3.jpg',
    '/home-4.jpg',
    '/home-5.jpg',
    '/home-6.jpg',
    '/home-7.jpg',
];

const HomeImageGrid: React.FC = () => {
    return (
        <div className="columns-2 md:columns-3 my-2 gap-2 md:gap-4">
            {images.map((src, index) => (
                <div key={index} className="mb-2 md:mb-4">
                    <img className="h-auto max-w-full rounded-lg grayscale  transition-all duration-300 ease-in-out transform hover:grayscale-0" src={src} alt="" />
                </div>
            ))}
        </div>
    );
};

export default HomeImageGrid;