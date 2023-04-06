import './App.css'
import { HomePage } from './Pages/HomePage'
import { AboutMePage } from './Pages/AboutMePage'
import { ContactPage } from './Pages/ContactPage'
import { ImageGalleryPage } from './Pages/ImageGalleryPage'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

function App() {
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
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
