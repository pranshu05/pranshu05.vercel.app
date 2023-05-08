import { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import imagesData from '../Utils/Images.json'

export function ImageGallery() {
   const [model, setModel] = useState(false)
   const [tempimgsrc, setTempImgSrc] = useState('')

   const getImg = (source) => {
      setTempImgSrc(source)
      setModel(true)
      document.body.style.overflow = 'hidden'

      const top = window.pageYOffset || document.documentElement.scrollTop

      document.querySelector('.model').style.top = top + 15 + 'px'
   }

   return (
      <div className="image-gallery">
         <div className={model ? 'model open' : 'model'}>
            <img src={tempimgsrc} alt="n" />
            <FaWindowClose
               onClick={() => {
                  setModel(false)
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
               <img src={image.source} alt="" loading="lazy" />
               <div className="image-location">📍 {image.location}</div>
            </div>
         ))}
      </div>
   )
}
