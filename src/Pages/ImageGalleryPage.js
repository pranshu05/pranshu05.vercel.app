import { ImageGallery } from '../components/ImageGallery'
import { Link } from 'react-router-dom'

export const ImageGalleryPage = () => {
    return (
        <div>
            <div className="gallery-page-cont">
                <p className="go-back-home">
                    &larr; Go back <Link to="/">home.</Link>
                </p>
                <h1>My photography</h1>
                <ImageGallery />
            </div>
        </div>
    )
}
