import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWindowClose } from 'react-icons/fa';

export function ImageGallery({ onModelOpen }) {
  const [model, setModel] = useState(false);
  const [tempimgsrc, setTempImgSrc] = useState('');
  const [imageData, setImageData] = useState([]);

  const fetchImagesFromUnsplash = async () => {
    try {
      const response = await axios.get(
         `https://api.unsplash.com/users/pranshu05/photos`,
        {
          params: {
            client_id: 'IpuBMtdoSBFo8bS7L1gevS7rRFBdEDN9Wp7du9QFh1A',
            per_page: 10,
          },
        }
      );

      setImageData(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image) => {
    setTempImgSrc(image.urls.regular);
    setModel(true);
    onModelOpen(true);
    document.body.style.overflow = 'hidden';

    const top = window.pageYOffset || document.documentElement.scrollTop;
    document.querySelector('.model').style.top = top - 50 + 'px';
  };

  useEffect(() => {
    fetchImagesFromUnsplash();
  }, []);

  return (
    <div className="image-gallery">
      <div className={model ? 'model open' : 'model'}>
        <img src={tempimgsrc} alt="n" />
        <FaWindowClose
          onClick={() => {
            setModel(false);
            onModelOpen(false);
            document.body.style.overflow = 'auto';
          }}
        />
      </div>
      {imageData.map((image, index) => (
        <div
          className="image-card"
          key={index}
          onClick={() => {
            handleImageClick(image);
          }}
        >
          <img src={tempimgsrc} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
