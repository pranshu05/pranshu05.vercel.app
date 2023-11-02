import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'
import { ImageGallery } from '../components/ImageGallery'
import { Footer } from '../components/Footer'
import axios from 'axios'

export const ImageGalleryPage = () => {
    const [isModelOpen, setIsModelOpen] = useState(false)
    const [profileInfo, setProfileInfo] = useState({})

    useEffect(() => {
        const fetchProfileInfo = async () => {
            try {
                const response = await axios.get(
                    'https://api.unsplash.com/users/pranshu05',
                    {
                        params: {
                            client_id:
                                'IpuBMtdoSBFo8bS7L1gevS7rRFBdEDN9Wp7du9QFh1A',
                        },
                    }
                )

                setProfileInfo(response.data)
            } catch (error) {
                console.error('Error fetching profile information:', error)
            }
        }

        fetchProfileInfo()
    }, [])

    return (
        <div>
            <NavBar hideNavbar={isModelOpen} />
            <div className="gallery-page-cont">
                <p className="go-back-home">
                    &larr; <Link to="/">home.</Link>
                </p>
                <h1>My Photography</h1>
                <p>
                    <a
                        href={`https://unsplash.com/@pranshu05`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        Visit my Unsplash Profile{' '}
                    </a>{' '}
                </p>
                <ImageGallery onModelOpen={setIsModelOpen} />
                <Footer />
            </div>
        </div>
    )
}
