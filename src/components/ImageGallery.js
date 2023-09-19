import { useState, useEffect } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import imagesData from '../Utils/Images.json'

export function ImageGallery({ onModelOpen }) {
   const [model, setModel] = useState(false)
   const [tempimgsrc, setTempImgSrc] = useState('')
   const [showPlaceholder, setShowPlaceholder] = useState(true)

   const getImg = (source) => {
      setTempImgSrc(source)
      setModel(true)
      onModelOpen(true)
      document.body.style.overflow = 'hidden'

      const top = window.pageYOffset || document.documentElement.scrollTop

      document.querySelector('.model').style.top = top - 50 + 'px'
   }

   useEffect(() => {
      const timeout = setTimeout(() => {
         setShowPlaceholder(false)
      }, 3000)

      return () => {
         clearTimeout(timeout)
      }
   }, )

   return (
      <div className="image-gallery">
         <div className={model ? 'model open' : 'model'}>
            <img src={tempimgsrc} alt="n" />
            <FaWindowClose
               onClick={() => {
                  setModel(false)
                  onModelOpen(false)
                  document.body.style.overflow = 'auto'
               }}
            />
         </div>
         {imagesData.map((image, index) => (
            <div
               className="image-card"
               key={index}
               onClick={() => {
                  getImg(image.source)
               }}
            >
               {showPlaceholder ? (
                  <div style={{ width: '100%', height: '100px' }}>
                     <div className="gradient" />
                  </div>
               ) : (
                  <img src={image.source} alt="" loading="lazy" />
               )}
               <div className="image-location">📍 {image.location}</div>
            </div>
         ))}
      </div>
   )
}