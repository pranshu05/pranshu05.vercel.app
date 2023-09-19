import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { ImageGallery } from '../components/ImageGallery'
import { Footer } from '../components/Footer'

export const ImageGalleryPage = () => {
   const [isModelOpen, setIsModelOpen] = useState(false)

   return (
      <div>
         <NavBar hideNavbar={isModelOpen} />
         <div className="gallery-page-cont">
            <p className="go-back-home">
               &larr; <Link to="/">home.</Link>
            </p>
            <h1>My Photography</h1>
            <ImageGallery onModelOpen={setIsModelOpen} />
            <Footer />
         </div>
      </div>
   )
}
