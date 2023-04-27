import './App.css'
import { HomePage } from './Pages/HomePage'
import { AboutMePage } from './Pages/AboutMePage'
import { ContactPage } from './Pages/ContactPage'
import { ImageGalleryPage } from './Pages/ImageGalleryPage'
import { LinksPage } from './Pages/Linkspage'
import { MusicPage } from './Pages/Musicpage'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
    useEffect(() => {
        axios
            .get('https://pranshu05.vercel.app/api/webhook')
            .then((response) => {
                console.log('Webhook triggered successfully')
            })
            .catch((error) => {
                console.log('Error triggering webhook', error)
            })
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/about" element={<AboutMePage />} />
                    <Route exact path="/contact" element={<ContactPage />} />
                    <Route
                        exact
                        path="/gallery"
                        element={<ImageGalleryPage />}
                    />
                    <Route exact path="/links" element={<LinksPage />} />
                    <Route exact path="/music" element={<MusicPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
