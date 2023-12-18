import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { ImageGallery } from '../components/ImageGallery'
import { Footer } from '../components/Footer'
export const ImageGalleryPage = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)

    return (
        <div>
            <NavBar hideNavbar={isModelOpen} />
            <div className='grad-bg' />
            <div className='grain' />
            <div className='banner' style={{backgroundImage:'url("https://i.imgur.com/hI7qP4z.jpg")'}}>
                <h1>My Photography</h1>
            </div>
            <div className="gallery-page-cont">
                <p className="go-back-home">
                    &larr; <Link to="/">home.</Link>
                </p>
                <p>
                    Visit my
                    <a
                        href={`https://unsplash.com/@pranshu05`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        Unsplash Profile{' '}
                    </a>{' '}
                </p>
                <ImageGallery onModelOpen={setIsModelOpen} />
                <Footer />
            </div>
        </div>
    )
}
