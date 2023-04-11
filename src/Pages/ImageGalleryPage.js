import { ImageGallery } from '../components/ImageGallery'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { Footer } from '../components/Footer'

export const ImageGalleryPage = () => {
    return (
        <div>
            <NavBar />
            <div className="gallery-page-cont">
                <p className="go-back-home">
                    &larr; Go back <Link to="/">home.</Link>
                </p>
                <h1>My photography</h1>
                <ImageGallery />
                <Footer />
            </div>
        </div>
    )
}
