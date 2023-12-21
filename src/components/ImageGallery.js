import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWindowClose, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export function ImageGallery({ onModelOpen }) {
  const [model, setModel] = useState(false);
  const [tempimgsrc, setTempImgSrc] = useState('');
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchImagesFromUnsplash = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/users/pranshu05/photos`,
        {
          params: {
            client_id: 'IpuBMtdoSBFo8bS7L1gevS7rRFBdEDN9Wp7du9QFh1A',
          },
        }
      );

      setImageData(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image, index) => {
    setTempImgSrc(image.urls.regular);
    setCurrentIndex(index);
    setModel(true);
    onModelOpen(true);
    document.body.style.overflow = 'hidden';

    const top = window.pageYOffset || document.documentElement.scrollTop;
    document.querySelector('.model').style.top = top - 350 + 'px';
  };

  const handlePrevClick = () => {
    const prevIndex = (currentIndex - 1 + imageData.length) % imageData.length;
    setTempImgSrc(imageData[prevIndex].urls.regular);
    setCurrentIndex(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (currentIndex + 1) % imageData.length;
    setTempImgSrc(imageData[nextIndex].urls.regular);
    setCurrentIndex(nextIndex);
  };

  useEffect(() => {
    fetchImagesFromUnsplash();
  }, []);

  return (
    <div className="image-gallery">
      <div className={model ? 'model open' : 'model'}>
        <img src={tempimgsrc} alt="n" />
        <div className='close-svg'>
          <FaWindowClose
            onClick={() => {
              setModel(false);
              onModelOpen(false);
              document.body.style.overflow = 'auto';
            }}
          />
        </div>
        <div className="navigation">
          <FaArrowLeft id='left' onClick={handlePrevClick} />
          <FaArrowRight id='right' onClick={handleNextClick} />
        </div>
      </div>
      {imageData.map((image, index) => (
        <div
          className="image-card"
          key={index}
          onClick={() => {
            handleImageClick(image, index);
          }}
        >
          <img src={image.urls.regular} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
